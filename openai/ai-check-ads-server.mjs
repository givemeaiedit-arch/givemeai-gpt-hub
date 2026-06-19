import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const PORT = Number(process.env.PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";

const baseDir = resolve(process.cwd(), "openai");
const promptPath = resolve(baseDir, "ai-check-ads-prompt.md");
const schemaPath = resolve(baseDir, "ai-check-ads-schema.json");

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  });
  res.end(JSON.stringify(payload, null, 2));
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

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function analyzeCreative(payload) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  if (!payload?.imageBase64) {
    throw new Error("Missing imageBase64");
  }

  const [promptMarkdown, schemaText] = await Promise.all([
    readFile(promptPath, "utf8"),
    readFile(schemaPath, "utf8"),
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
      Authorization: `Bearer ${OPENAI_API_KEY}`,
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

  return {
    raw: responseJson,
    parsed: JSON.parse(outputText),
  };
}

createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  if (req.method === "POST" && req.url === "/api/ai-check-ads/analyze") {
    try {
      const payload = await readRequestBody(req);
      const result = await analyzeCreative(payload);
      return json(res, 200, result.parsed);
    } catch (error) {
      return json(res, 400, {
        error: error.message || "Unknown error",
      });
    }
  }

  return json(res, 404, {
    error: "Not found",
  });
}).listen(PORT, () => {
  console.log(`AI Check Ads backend running on http://127.0.0.1:${PORT}`);
});
