import { readFile } from "node:fs/promises";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const openAiApiKey = defineSecret("OPENAI_API_KEY");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const OPENAI_FAST_MODEL = process.env.OPENAI_FAST_MODEL || "gpt-5.4-mini";
const promptUrl = new URL("./openai/ai-check-ads-prompt.md", import.meta.url);
const schemaUrl = new URL("./openai/ai-check-ads-schema.json", import.meta.url);
const adminAuth = getAuth();
const adminDb = getFirestore();
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const PRO_UPGRADE_URL = "https://www.facebook.com/AiCreativesN/";
const FREE_LIMIT_EXCEEDED_MESSAGE =
  "ใช้สิทธิ์ตรวจเช็คฟรีครบแล้ว หากต้องการตรวจสอบเพิ่มเติม ติดต่อ Admin Page เพื่ออัปเกรดเป็น Pro 290 บาทต่อเดือน รับสิทธิ์ใช้เครื่องมือ Check Ads ได้วันละ 10 ครั้ง พร้อมเข้าถึงคอร์สเรียน AI มากกว่า 20 บท และเครื่องมือ AI ใหม่ ๆ ในอนาคต";

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

function isAdminEmail(email) {
  return ADMIN_EMAILS.has(normalizeEmail(email));
}

function isProProfile(profileData) {
  const values = [
    profileData?.plan,
    profileData?.tier,
    profileData?.memberLevel,
    profileData?.subscriptionStatus,
  ].map((value) => normalizeEmail(value));
  return values.includes("pro") || values.includes("admin");
}

function buildLimitErrorPayload(message) {
  const error = new Error(message);
  error.statusCode = 403;
  error.code = "FREE_LIMIT_REACHED";
  error.upgradeUrl = PRO_UPGRADE_URL;
  return error;
}

async function getUserUsageProfile(user) {
  const userRef = adminDb.collection("users").doc(user.uid);
  const snapshot = await userRef.get();
  const profileData = snapshot.exists ? snapshot.data() || {} : {};
  const isPrivileged = isAdminEmail(user.email) || isProProfile(profileData);
  return {
    userRef,
    plan: isPrivileged ? "pro" : "free",
    dailyLimit: isPrivileged ? 10 : 1,
    isPrivileged,
  };
}

function generateRandomProCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let output = "";
  for (let index = 0; index < 5; index += 1) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }
  return output;
}

async function createUniqueProCode(adminUser) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = generateRandomProCode();
    const codeRef = adminDb.collection("proCodes").doc(code);
    const existing = await codeRef.get();
    if (existing.exists) continue;

    await codeRef.set({
      code,
      status: "available",
      createdAt: FieldValue.serverTimestamp(),
      createdByUid: adminUser.uid,
      createdByEmail: adminUser.email,
      redeemedByUid: "",
      redeemedByEmail: "",
      redeemedByDisplayName: "",
    });

    return code;
  }

  throw new Error("ไม่สามารถสร้าง Pro Code ใหม่ได้");
}

async function redeemProCodeForUser(user, rawCode) {
  const code = String(rawCode || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (code.length !== 5) {
    const error = new Error("กรุณากรอก Pro Code 5 หลัก");
    error.statusCode = 400;
    throw error;
  }

  const codeRef = adminDb.collection("proCodes").doc(code);
  const userRef = adminDb.collection("users").doc(user.uid);

  return adminDb.runTransaction(async (transaction) => {
    const [codeSnapshot, userSnapshot] = await Promise.all([
      transaction.get(codeRef),
      transaction.get(userRef),
    ]);

    if (!codeSnapshot.exists) {
      const error = new Error(`ไม่พบ Pro Code ${code}`);
      error.statusCode = 404;
      throw error;
    }

    const codeData = codeSnapshot.data() || {};
    const redeemedByUid = codeData.redeemedByUid || "";

    if (redeemedByUid && redeemedByUid !== user.uid) {
      const error = new Error(`Pro Code ${code} ถูกใช้ไปแล้ว`);
      error.statusCode = 409;
      throw error;
    }

    const userData = userSnapshot.exists ? userSnapshot.data() || {} : {};
    const alreadyPro =
      isAdminEmail(user.email) ||
      isProProfile({
        plan: userData.plan,
        tier: userData.tier,
        memberLevel: userData.memberLevel,
        subscriptionStatus: userData.subscriptionStatus,
      });

    transaction.set(
      userRef,
      {
        email: user.email,
        emailLower: normalizeEmail(user.email),
        googleDisplayName: user.displayName,
        googlePhotoURL: user.photoURL,
        plan: "pro",
        tier: "pro",
        memberLevel: "pro",
        subscriptionStatus: "active",
        proCode: code,
        proActivatedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    if (!redeemedByUid) {
      transaction.set(
        codeRef,
        {
          status: "redeemed",
          redeemedAt: FieldValue.serverTimestamp(),
          redeemedByUid: user.uid,
          redeemedByEmail: user.email,
          redeemedByDisplayName: user.displayName || user.email?.split("@")[0] || "",
        },
        { merge: true },
      );
    }

    return {
      code,
      alreadyPro,
      alreadyRedeemedBySameUser: redeemedByUid === user.uid,
    };
  });
}

async function hasAnyAdCheck(userRef) {
  const snapshot = await userRef.collection("adCheckHistory").limit(1).get();
  return !snapshot.empty;
}

async function countTodayAdChecks(userRef) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const snapshot = await userRef
    .collection("adCheckHistory")
    .where("checkedAt", ">=", Timestamp.fromDate(start))
    .limit(10)
    .get();
  return snapshot.size;
}

async function enforceAdCheckQuota(user) {
  const usage = await getUserUsageProfile(user);
  if (usage.isPrivileged) {
    const usedToday = await countTodayAdChecks(usage.userRef);
    if (usedToday >= usage.dailyLimit) {
      throw buildLimitErrorPayload(
        "วันนี้ใช้สิทธิ์ Pro สำหรับ Check Ads ครบ 10 ครั้งแล้ว กรุณากลับมาใช้งานใหม่ในวันถัดไป หรือติดต่อ Admin Page หากต้องการเพิ่มสิทธิ์พิเศษ",
      );
    }
    return usage;
  }

  if (await hasAnyAdCheck(usage.userRef)) {
    throw buildLimitErrorPayload(FREE_LIMIT_EXCEEDED_MESSAGE);
  }

  return usage;
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

  await enforceAdCheckQuota(user);

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
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
        upgradeUrl: error.upgradeUrl || "",
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
      const user = await verifySignedInUser(req);
      await ensureUserProfile(user);
      const payload = await readJsonBody(req);
      const result = await extractProductNameFromCreative(payload);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
        upgradeUrl: error.upgradeUrl || "",
      });
    }
  },
);

export const generateProCode = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
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
      const user = await verifySignedInUser(req);
      await ensureUserProfile(user);

      if (!isAdminEmail(user.email)) {
        sendJson(res, 403, { error: "บัญชีนี้ไม่มีสิทธิ์สร้าง Pro Code" });
        return;
      }

      const code = await createUniqueProCode(user);
      sendJson(res, 200, {
        ok: true,
        code,
        message: `สร้าง Pro Code สำเร็จ: ${code}`,
      });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const redeemProCode = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
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
      const user = await verifySignedInUser(req);
      await ensureUserProfile(user);
      const payload = await readJsonBody(req);
      const result = await redeemProCodeForUser(user, payload.code);

      sendJson(res, 200, {
        ok: true,
        code: result.code,
        memberLevel: "pro",
        message: result.alreadyRedeemedBySameUser
          ? `Pro Code ${result.code} ถูกใช้กับบัญชีนี้อยู่แล้ว`
          : `เปิดสิทธิ์ Pro สำเร็จด้วย Code ${result.code}`,
      });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);
