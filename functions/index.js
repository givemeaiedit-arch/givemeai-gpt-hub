import { readFile } from "node:fs/promises";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

const openAiApiKey = defineSecret("OPENAI_API_KEY");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
const OPENAI_FAST_MODEL = process.env.OPENAI_FAST_MODEL || "gpt-4.1-mini";
const promptUrl = new URL("./openai/ai-check-ads-prompt.md", import.meta.url);
const schemaUrl = new URL("./openai/ai-check-ads-schema.json", import.meta.url);

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
      const result = await analyzeCreative(payload);
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
