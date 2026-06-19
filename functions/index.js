import { readFile } from "node:fs/promises";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const openAiApiKey = defineSecret("OPENAI_API_KEY");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
const OPENAI_FAST_MODEL = process.env.OPENAI_FAST_MODEL || "gpt-4.1-mini";
const promptUrl = new URL("./openai/ai-check-ads-prompt.md", import.meta.url);
const schemaUrl = new URL("./openai/ai-check-ads-schema.json", import.meta.url);
const adminAuth = getAuth();
const adminDb = getFirestore();

function setCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
}

function sendJson(res, status, payload) {
  setCors(res);
  res.status(status).json(payload);
}

function interpolateUserPrompt(template, payload) {
  return template
    .replace("{{productName}}", payload.productName || "ไม่ระบุ")
    .replace("{{targetMarket}}", payload.targetMarket || "TH")
    .replace("{{objective}}", payload.objective || "meta_ads_conversion")
    .replace("{{notes}}", payload.notes || "-");
}

function extractSystemAndUserTemplate(markdown) {
  const systemSplit = markdown.split("USER TEMPLATE");
  const systemText = systemSplit[0].replace(/^SYSTEM/i, "").trim();
  const userTemplate = systemSplit[1]?.trim() || "";
  return { systemText, userTemplate };
}

function extractOutputText(responseJson) {
  if (typeof responseJson.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text;
  }

  const chunks = [];
  for (const item of responseJson.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (Buffer.isBuffer(req.body)) {
    return JSON.parse(req.body.toString("utf8"));
  }

  if (typeof req.body === "string" && req.body.trim()) {
    return JSON.parse(req.body);
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function toFileKey(fileName) {
  const normalized = String(fileName || "unnamed-file")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
  return Buffer.from(normalized, "utf8").toString("base64url").slice(0, 120) || "unnamed-file";
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

async function verifySignedInUser(req) {
  const authHeader = req.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    throw new Error("กรุณา Login Gmail ก่อน Check Ads");
  }

  const decoded = await adminAuth.verifyIdToken(match[1]);
  return {
    uid: decoded.uid,
    email: decoded.email || "",
    displayName: decoded.name || decoded.email?.split("@")[0] || "ผู้ใช้ Gmail",
    photoURL: decoded.picture || "",
  };
}

async function ensureUserProfile(user) {
  await adminDb.collection("users").doc(user.uid).set(
    {
      email: user.email,
      emailLower: normalizeEmail(user.email),
      googleDisplayName: user.displayName,
      googlePhotoURL: user.photoURL,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

function buildHistoryResponse(data) {
  return {
    ...(data.result || {}),
    history: {
      fromHistory: true,
      fileName: data.fileName || "",
      productName: data.productName || "",
      checkedAt: timestampToIso(data.checkedAt),
      checkedBy: data.userEmail || "",
    },
  };
}

async function getExistingAdCheck(user, fileName) {
  if (!fileName) return null;
  const fileKey = toFileKey(fileName);
  const userHistoryRef = adminDb
    .collection("users")
    .doc(user.uid)
    .collection("adCheckHistory")
    .doc(fileKey);
  const globalHistoryRef = adminDb.collection("adCheckHistory").doc(`${user.uid}_${fileKey}`);
  const snapshot = await userHistoryRef.get();
  if (!snapshot.exists) return null;
  const data = snapshot.data() || {};
  const duplicateUpdate = {
    duplicateHits: FieldValue.increment(1),
    lastDuplicateAt: FieldValue.serverTimestamp(),
  };
  await Promise.all([
    userHistoryRef.set(duplicateUpdate, { merge: true }),
    globalHistoryRef.set(duplicateUpdate, { merge: true }),
  ]);
  return buildHistoryResponse(data);
}

async function saveAdCheckHistory(user, payload, result) {
  const fileName = String(payload.fileName || "unnamed-file").trim() || "unnamed-file";
  const fileKey = toFileKey(fileName);
  const checkedAt = FieldValue.serverTimestamp();
  const historyData = {
    uid: user.uid,
    userEmail: user.email,
    userEmailLower: normalizeEmail(user.email),
    displayName: user.displayName,
    photoURL: user.photoURL,
    fileName,
    fileKey,
    fileSize: Number(payload.fileSize || 0),
    mimeType: payload.mimeType || "",
    productName: payload.productName || "",
    targetMarket: payload.targetMarket || "TH",
    objective: payload.objective || "meta_ads_conversion",
    notes: payload.notes || "",
    result,
    score: Number(result.overall_score || 0),
    checkedAt,
    updatedAt: checkedAt,
    duplicateHits: 0,
  };

  const userHistoryRef = adminDb
    .collection("users")
    .doc(user.uid)
    .collection("adCheckHistory")
    .doc(fileKey);
  const globalHistoryRef = adminDb.collection("adCheckHistory").doc(`${user.uid}_${fileKey}`);

  await Promise.all([
    userHistoryRef.set(historyData, { merge: true }),
    globalHistoryRef.set(historyData, { merge: true }),
  ]);
}

async function analyzeCreative(payload) {
  const apiKey = openAiApiKey.value();
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY secret");
  }

  if (!payload?.imageBase64) {
    throw new Error("Missing imageBase64");
  }

  const [promptMarkdown, schemaText] = await Promise.all([
    readFile(promptUrl, "utf8"),
    readFile(schemaUrl, "utf8"),
  ]);

  const schema = JSON.parse(schemaText);
  const { systemText, userTemplate } = extractSystemAndUserTemplate(promptMarkdown);
  const mimeType = payload.mimeType || "image/jpeg";
  const userText = interpolateUserPrompt(userTemplate, payload);

  const openaiPayload = {
    model: OPENAI_MODEL,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: systemText,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: userText,
          },
          {
            type: "input_image",
            image_url: `data:${mimeType};base64,${payload.imageBase64}`,
            detail: "high",
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "ad_creative_audit",
        strict: true,
        schema,
      },
    },
  };

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(openaiPayload),
  });

  const responseJson = await apiResponse.json();
  if (!apiResponse.ok) {
    const message = responseJson?.error?.message || "OpenAI request failed";
    throw new Error(message);
  }

  const outputText = extractOutputText(responseJson);
  if (!outputText) {
    throw new Error("No model output returned");
  }

  return JSON.parse(outputText);
}

async function analyzeCreativeForUser(req, payload) {
  const user = await verifySignedInUser(req);
  await ensureUserProfile(user);

  const existing = await getExistingAdCheck(user, payload.fileName);
  if (existing) {
    return existing;
  }

  const result = await analyzeCreative(payload);
  await saveAdCheckHistory(user, payload, result);
  return {
    ...result,
    history: {
      fromHistory: false,
      fileName: payload.fileName || "",
      productName: payload.productName || "",
      checkedBy: user.email,
    },
  };
}

async function extractProductNameFromCreative(payload) {
  const apiKey = openAiApiKey.value();
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY secret");
  }

  if (!payload?.imageBase64) {
    throw new Error("Missing imageBase64");
  }

  const mimeType = payload.mimeType || "image/jpeg";
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      productName: {
        type: "string",
      },
      brandName: {
        type: "string",
      },
      confidence: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
      evidence: {
        type: "string",
      },
    },
    required: ["productName", "brandName", "confidence", "evidence"],
  };

  const openaiPayload = {
    model: OPENAI_FAST_MODEL,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "Read the uploaded Thai or English ad image and extract the most likely product name. " +
              "Return JSON only. If no product name is visible, infer a short practical product category from the image. " +
              "Use Thai when the image is Thai. Keep productName short enough for a form field.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Extract productName and brandName from this ad image.",
          },
          {
            type: "input_image",
            image_url: `data:${mimeType};base64,${payload.imageBase64}`,
            detail: "low",
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "ad_product_name",
        strict: true,
        schema,
      },
    },
  };

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(openaiPayload),
  });

  const responseJson = await apiResponse.json();
  if (!apiResponse.ok) {
    const message = responseJson?.error?.message || "OpenAI request failed";
    throw new Error(message);
  }

  const outputText = extractOutputText(responseJson);
  if (!outputText) {
    throw new Error("No model output returned");
  }

  return JSON.parse(outputText);
}

export const analyzeAdCreative = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [openAiApiKey],
    timeoutSeconds: 120,
    memory: "512MiB",
  },
  async (req, res) => {
    setCors(res);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const result = await analyzeCreativeForUser(req, payload);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 400, {
        error: error.message || "Unknown error",
      });
    }
  },
);

export const extractProductName = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [openAiApiKey],
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (req, res) => {
    setCors(res);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const result = await extractProductNameFromCreative(payload);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 400, {
        error: error.message || "Unknown error",
      });
    }
  },
);
