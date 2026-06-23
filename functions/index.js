import { readFile } from "node:fs/promises";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

initializeApp();

const openAiApiKey = defineSecret("OPENAI_API_KEY");
const thunderApiKey = defineSecret("THUNDER_API_KEY");
const telegramBotToken = defineSecret("TELEGRAM_BOT_TOKEN");
const telegramAdminChatId = defineSecret("TELEGRAM_ADMIN_CHAT_ID");
const telegramWebhookSecret = defineSecret("TELEGRAM_WEBHOOK_SECRET");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const OPENAI_FAST_MODEL = process.env.OPENAI_FAST_MODEL || "gpt-5.4-mini";
const promptUrl = new URL("./openai/ai-check-ads-prompt.md", import.meta.url);
const schemaUrl = new URL("./openai/ai-check-ads-schema.json", import.meta.url);
const adminAuth = getAuth();
const adminDb = getFirestore();
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const PRIMARY_ADMIN_EMAIL = "givemeai.edit@gmail.com";
const PRO_UPGRADE_URL = "https://www.facebook.com/AiCreativesN/";
const ADMIN_PANEL_URL = "https://givemeaiedit-arch.github.io/givemeai-gpt-hub/admin.html";
const AD_CHECK_POINTS = 15;
const AD_CHECK_SCORE_KEYS = [
  "hook_scroll_stop",
  "audience_signal",
  "pain_desire_clarity",
  "offer_strength",
  "creative_clarity",
  "proof_trust",
  "objection_handling",
  "cta",
  "andromeda_readiness",
];
const TOPUP_REJECT_REASON = "ตรวจสลิปไม่ผ่าน";
const TOPUP_PACKAGES = {
  "credit-50": {
    price: 49,
    credits: 8,
    label: "Credit Check ADS 8 ครั้ง",
    type: "credit",
  },
  "credit-100": {
    price: 99,
    credits: 20,
    label: "Credit Check ADS 20 ครั้ง",
    type: "credit",
  },
  "credit-200": {
    price: 199,
    credits: 45,
    label: "Credit Check ADS 45 ครั้ง",
    type: "credit",
  },
  "pro-monthly": {
    price: 289,
    credits: 0,
    days: 30,
    label: "Pro รายเดือน",
    type: "pro-monthly",
  },
  "pro-lifetime": {
    price: 889,
    credits: 0,
    label: "Pro ตลอดชีพ",
    type: "pro-lifetime",
  },
};
TOPUP_PACKAGES["credit-50"].label = "Credit Check ADS 8 ครั้ง";
TOPUP_PACKAGES["credit-100"].label = "Credit Check ADS 20 ครั้ง";
TOPUP_PACKAGES["credit-200"].label = "Credit Check ADS 45 ครั้ง";
TOPUP_PACKAGES["pro-monthly"].label = "Pro 30 วัน";
TOPUP_PACKAGES["pro-lifetime"].label = "Master ตลอดชีพ";
TOPUP_PACKAGES["pro-lifetime"].type = "master-lifetime";
const FREE_LIMIT_EXCEEDED_MESSAGE =
  "ใช้สิทธิ์ตรวจเช็คฟรีครบแล้ว สามารถเติมเงินเพิ่มในหน้าเติมเงิน หรือสมัคร Pro 289 บาทต่อเดือน เพื่อใช้ Check Ads ได้วันละ 10 ครั้ง พร้อมคอร์สเรียน AI มากกว่า 20 บทและเครื่องมือ AI ใหม่ ๆ ในอนาคต หากต้องการราคาพิเศษสำหรับองค์กร ติดต่อ Admin ได้ค่ะ ที่ page AI ภาพนี้ให้หน่อย";

const THUNDER_VERIFY_URL = "https://api.thunder.in.th/v2/verify/bank";

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

function readSecretValue(secretParam) {
  try {
    return String(secretParam?.value?.() || "").trim();
  } catch {
    return "";
  }
}

function getNestedValue(source, path) {
  return String(path || "")
    .split(".")
    .filter(Boolean)
    .reduce((value, key) => (value && typeof value === "object" ? value[key] : undefined), source);
}

function pickFirstValue(source, paths) {
  for (const path of paths) {
    const value = getNestedValue(source, path);
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }
  return undefined;
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const text = String(value || "").trim().toLowerCase();
  if (!text) return null;
  if (["true", "1", "yes", "ok", "matched", "pass", "success"].includes(text)) return true;
  if (["false", "0", "no", "mismatch", "fail", "failed"].includes(text)) return false;
  return null;
}

function normalizeNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = String(value ?? "")
    .replace(/[^0-9.\-]/g, "")
    .trim();
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeText(value) {
  const text = String(value ?? "").trim();
  return text || "";
}

function buildThunderVerificationSummary(result) {
  if (result.status === "error") {
    return result.message || "ตรวจสลิปไม่สำเร็จ";
  }
  if (result.amountMatched === false) {
    return `ยอดในสลิปไม่ตรงกับแพ็ก ${result.expectedAmount} บาท`;
  }
  if (result.duplicate === true) {
    return "พบว่าสลิปนี้อาจถูกใช้ซ้ำ ควรตรวจเพิ่มก่อนอนุมัติ";
  }
  if (result.amountMatched === true) {
    return `ยอดตรง ${result.expectedAmount} บาท และไม่พบสลิปซ้ำ`;
  }
  return "ตรวจสลิปแล้ว แต่ยังควรให้แอดมินตรวจทานอีกครั้ง";
}

function extractThunderErrorPayload(responseJson, fallbackStatus) {
  const message =
    normalizeText(responseJson?.error?.message) ||
    normalizeText(responseJson?.message) ||
    normalizeText(responseJson?.error) ||
    "Thunder ตรวจสลิปไม่สำเร็จ";
  const code =
    normalizeText(responseJson?.error?.code) ||
    normalizeText(responseJson?.code) ||
    normalizeText(responseJson?.status) ||
    normalizeText(fallbackStatus) ||
    "THUNDER_VERIFY_FAILED";
  return { message, code };
}

function toFileKey(fileName) {
  const normalized = String(fileName || "unnamed-file")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
  return Buffer.from(normalized, "utf8").toString("base64url").slice(0, 120) || "unnamed-file";
}

function sanitizeImagePreviewDataUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (!/^data:image\/(?:png|jpe?g|webp);base64,/i.test(text)) return "";
  return text.length <= 280000 ? text : "";
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

function getTelegramSecretValue(secretParam) {
  try {
    const value = secretParam?.value?.();
    return String(value || "").trim();
  } catch {
    return "";
  }
}

function escapeTelegramText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function legacyNotifyTelegramTopupPending(order) {
  const botToken = getTelegramSecretValue(telegramBotToken);
  const chatId = getTelegramSecretValue(telegramAdminChatId);
  if (!botToken || !chatId) {
    return { ok: false, skipped: true, reason: "missing_telegram_config" };
  }

  const message = [
    "มีคำขอเติมเงินใหม่",
    ``,
    `แพ็ก: ${order.packageLabel || order.packageId || "-"}`,
    `ราคา: ${order.price || 0} บาท`,
    `ผู้ใช้: ${order.displayName || "-"}`,
    `อีเมล: ${order.email || "-"}`,
    `เวลา: ${order.createdAtIso || "-"}`,
    `Order ID: ${order.orderId || "-"}`,
    ``,
    `เปิดหลังบ้าน: ${ADMIN_PANEL_URL}`,
  ]
    .map(escapeTelegramText)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram notify failed: ${response.status} ${text}`);
  }

  return response.json();
}

function formatBangkokDate(value) {
  const iso = timestampToIso(value);
  if (!iso) return "-";
  return new Date(iso).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  });
}

function parseSlipDataUrl(value) {
  const match = String(value || "").match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i);
  if (!match) {
    const error = new Error("Invalid slip image data");
    error.statusCode = 400;
    throw error;
  }

  const mimeType = match[1].toLowerCase() === "image/jpg" ? "image/jpeg" : match[1].toLowerCase();
  return {
    mimeType,
    extension: mimeType.split("/")[1] || "jpg",
    buffer: Buffer.from(match[2], "base64"),
  };
}

function buildTelegramTopupKeyboard(orderId) {
  return {
    inline_keyboard: [
      [
        { text: "อนุมัติ", callback_data: `topup:approve:${orderId}` },
        { text: "ปฏิเสธ", callback_data: `topup:reject:${orderId}` },
      ],
      [{ text: "เปิด Admin Panel", url: ADMIN_PANEL_URL }],
    ],
  };
}

function getTopupStatusLabel(status) {
  if (status === "approved") return "อนุมัติแล้ว";
  if (status === "rejected") return "ปฏิเสธแล้ว";
  return "รอตรวจสลิป";
}

function buildTelegramTopupCaption(order) {
  const lines = [
    `<b>${escapeTelegramText(getTopupStatusLabel(order.status || "pending"))}</b>`,
    "",
    `แพ็ก: ${escapeTelegramText(order.packageLabel || order.packageId || "-")}`,
    `ราคา: ${escapeTelegramText(order.price || 0)} บาท`,
    `ผู้ใช้: ${escapeTelegramText(order.displayName || "-")}`,
    `อีเมล: ${escapeTelegramText(order.email || "-")}`,
    `เวลา: ${escapeTelegramText(order.createdAtIso || "-")}`,
    `Order ID: <code>${escapeTelegramText(order.orderId || "-")}</code>`,
  ];

  if (order.status === "approved") {
    lines.push(`อนุมัติโดย: ${escapeTelegramText(order.reviewedByEmail || "-")}`);
  }
  if (order.status === "rejected") {
    lines.push(`ปฏิเสธโดย: ${escapeTelegramText(order.reviewedByEmail || "-")}`);
    lines.push(`เหตุผล: ${escapeTelegramText(order.rejectReason || TOPUP_REJECT_REASON)}`);
  }

  lines.push("", `เปิดหลังบ้าน: ${escapeTelegramText(ADMIN_PANEL_URL)}`);
  return lines.join("\n");
}

async function callTelegramApi(method, payload, options = {}) {
  const botToken = getTelegramSecretValue(telegramBotToken);
  if (!botToken) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN secret");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    body: options.formData ? payload : JSON.stringify(payload),
    headers: options.formData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram ${method} failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function notifyTelegramTopupPending(order) {
  const chatId = getTelegramSecretValue(telegramAdminChatId);
  if (!getTelegramSecretValue(telegramBotToken) || !chatId) {
    return { ok: false, skipped: true, reason: "missing_telegram_config" };
  }

  const slip = parseSlipDataUrl(order.slipDataUrl);
  const form = new FormData();
  form.set("chat_id", chatId);
  form.set("caption", buildTelegramTopupCaption({ ...order, status: "pending" }));
  form.set("parse_mode", "HTML");
  form.set("reply_markup", JSON.stringify(buildTelegramTopupKeyboard(order.orderId)));
  form.set(
    "photo",
    new Blob([slip.buffer], { type: slip.mimeType }),
    `slip-${order.orderId}.${slip.extension}`,
  );
  return callTelegramApi("sendPhoto", form, { formData: true });
}

async function answerTelegramCallbackQuery(callbackQueryId, text, showAlert = false) {
  if (!callbackQueryId) return;
  await callTelegramApi("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text: String(text || "").slice(0, 180),
    show_alert: Boolean(showAlert),
  });
}

async function updateTelegramTopupMessage(order, messageContext = null) {
  const chatId = messageContext?.chatId || order.telegramChatId;
  const messageId = messageContext?.messageId || order.telegramMessageId;
  if (!chatId || !messageId || !getTelegramSecretValue(telegramBotToken)) {
    return { ok: false, skipped: true, reason: "missing_message_context" };
  }

  return callTelegramApi("editMessageCaption", {
    chat_id: chatId,
    message_id: messageId,
    caption: buildTelegramTopupCaption(order),
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [] },
  });
}

async function notifyTelegramTopupReviewed(order) {
  const chatId = getTelegramSecretValue(telegramAdminChatId);
  if (!getTelegramSecretValue(telegramBotToken) || !chatId || order?.alreadyProcessed) {
    return { ok: false, skipped: true, reason: "skip_review_notice" };
  }

  const isApproved = String(order?.status || "").toLowerCase() === "approved";
  const statusText = isApproved ? "อนุมัติรายการเติมเงินแล้ว" : "ปฏิเสธรายการเติมเงินแล้ว";
  const lines = [
    `${isApproved ? "✅" : "❌"} ${statusText}`,
    "",
    `แพ็กเกจ: ${order?.packageLabel || order?.packageId || "-"}`,
    `ราคา: ${Number(order?.price || 0)} บาท`,
    `ผู้ใช้: ${order?.displayName || "-"}`,
    `อีเมล: ${order?.email || "-"}`,
    `ดำเนินการโดย: ${order?.reviewedByEmail || PRIMARY_ADMIN_EMAIL}`,
    `เวลาส่งสลิป: ${order?.createdAtIso || "-"}`,
    `Order ID: ${order?.orderId || "-"}`,
  ];

  if (!isApproved) {
    lines.push(`เหตุผล: ${order?.rejectReason || TOPUP_REJECT_REASON}`);
  }

  lines.push("", `เปิดหลังบ้าน: ${ADMIN_PANEL_URL}`);

  return callTelegramApi("sendMessage", {
    chat_id: chatId,
    text: lines.map(escapeTelegramText).join("\n"),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
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
  const userRef = adminDb.collection("users").doc(user.uid);
  const snapshot = await userRef.get();
  const patch = {
    email: user.email,
    emailLower: normalizeEmail(user.email),
    googleDisplayName: user.displayName,
    googlePhotoURL: user.photoURL,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (!snapshot.exists) {
    patch.createdAt = FieldValue.serverTimestamp();
  }

  await userRef.set(patch, { merge: true });
}

function isAdminEmail(email) {
  return ADMIN_EMAILS.has(normalizeEmail(email));
}

function isProProfile(profileData) {
  const expiresAt = profileData?.proExpiresAt?.toDate?.() || null;
  if (expiresAt && expiresAt.getTime() < Date.now()) {
    return false;
  }

  const values = [
    profileData?.plan,
    profileData?.tier,
    profileData?.memberLevel,
    profileData?.subscriptionStatus,
  ].map((value) => normalizeEmail(value));
  return values.includes("pro") || values.includes("master") || values.includes("admin");
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
  const adCheckCredits = Math.max(0, Number(profileData.adCheckCredits || 0));
  const isAdmin = isAdminEmail(user.email);
  const isPrivileged = isAdmin || isProProfile(profileData);
  return {
    userRef,
    plan: isAdmin ? "admin" : isPrivileged ? "pro" : "free",
    dailyLimit: isAdmin ? 999 : isPrivileged ? 10 : 1,
    adCheckCredits,
    isAdmin,
    isPrivileged,
  };
}

async function getAdCheckUsageSummary(user) {
  const usage = await getUserUsageProfile(user);
  const usedToday = usage.isAdmin
    ? 0
    : usage.isPrivileged
    ? await countTodayAdChecks(usage.userRef)
    : (await hasAnyAdCheck(usage.userRef)) ? 1 : 0;
  const remaining = usage.isAdmin ? usage.dailyLimit : Math.max(0, usage.dailyLimit - usedToday);

  return {
    plan: usage.plan,
    dailyLimit: usage.dailyLimit,
    usedToday,
    remaining,
    credits: usage.adCheckCredits,
    label: usage.isAdmin
      ? "Admin ใช้งานได้ไม่จำกัด"
      : usage.isPrivileged
      ? `วันนี้ Check ได้อีก ${remaining}/${usage.dailyLimit}`
      : usage.adCheckCredits > 0
        ? `มี Credit Check ADS เหลือ ${usage.adCheckCredits} ครั้ง`
      : remaining > 0
        ? "ยังมีสิทธิ์ทดลองใช้ฟรี 1/1"
        : "ใช้สิทธิ์ทดลองใช้ฟรีครบแล้ว",
  };
}

async function notifyTelegramCommunityRequest(request) {
  const chatId = getTelegramSecretValue(telegramAdminChatId);
  if (!getTelegramSecretValue(telegramBotToken) || !chatId) {
    return { ok: false, skipped: true, reason: "missing_telegram_config" };
  }

  const lines = [
    "มีคนแจ้งขอเข้าร่วมกลุ่มรายใหม่",
    "",
    `ชื่อ Facebook: ${request.facebookName || "-"}`,
    `ผู้ใช้: ${request.displayName || "-"}`,
    `อีเมล: ${request.email || "-"}`,
    `เวลา: ${request.createdAtIso || "-"}`,
    `Request ID: ${request.requestId || "-"}`,
    "",
    `เปิดหลังบ้าน: ${ADMIN_PANEL_URL}`,
  ];

  return callTelegramApi("sendMessage", {
    chat_id: chatId,
    text: lines.map(escapeTelegramText).join("\n"),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}

async function createCommunityRequestForUser(user, payload) {
  await ensureUserProfile(user);
  const usage = await getUserUsageProfile(user);
  if (!usage.isPrivileged) {
    const error = new Error("สำหรับสมาชิกระดับ Pro ขึ้นไปเท่านั้น");
    error.statusCode = 403;
    error.code = "PRO_REQUIRED";
    throw error;
  }

  const facebookName = String(payload?.facebookName || "").trim();
  if (facebookName.length < 2 || facebookName.length > 120) {
    const error = new Error("กรุณากรอกชื่อ Facebook ให้ถูกต้อง");
    error.statusCode = 400;
    throw error;
  }

  const now = new Date();
  const requestRef = adminDb.collection("communityRequests").doc();
  const request = {
    requestId: requestRef.id,
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || user.email?.split("@")[0] || "",
    photoURL: user.photoURL || "",
    facebookName,
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdAtIso: now.toISOString(),
  };

  await requestRef.set(request);
  try {
    await notifyTelegramCommunityRequest(request);
  } catch (error) {
    console.error("Telegram community request notify failed", error);
  }

  return {
    requestId: requestRef.id,
    facebookName,
    status: "new",
  };
}

function getTopupPackage(packageId) {
  const plan = TOPUP_PACKAGES[String(packageId || "")];
  if (!plan) {
    const error = new Error("ไม่พบแพ็กเติมเงินที่เลือก");
    error.statusCode = 400;
    throw error;
  }
  return plan;
}

function assertAdminUser(user) {
  if (!isAdminEmail(user.email)) {
    const error = new Error("บัญชีนี้ไม่มีสิทธิ์จัดการรายการเติมเงิน");
    error.statusCode = 403;
    throw error;
  }
}

function validateSlipDataUrl(value) {
  const slipDataUrl = String(value || "");
  if (!/^data:image\/(png|jpe?g|webp);base64,/i.test(slipDataUrl)) {
    const error = new Error("กรุณาแนบสลิปเป็นไฟล์รูปภาพ");
    error.statusCode = 400;
    throw error;
  }
  if (slipDataUrl.length > 950000) {
    const error = new Error("ไฟล์สลิปใหญ่เกินไป กรุณาย่อรูปแล้วส่งใหม่");
    error.statusCode = 413;
    throw error;
  }
  return slipDataUrl;
}

async function callThunderVerifySlip(order) {
  const apiKey = readSecretValue(thunderApiKey);
  if (!apiKey) {
    const error = new Error("ยังไม่ได้ตั้งค่า THUNDER_API_KEY ใน Firebase Functions");
    error.statusCode = 500;
    throw error;
  }

  const slip = parseSlipDataUrl(order.slipDataUrl);
  const form = new FormData();
  form.set(
    "image",
    new Blob([slip.buffer], { type: slip.mimeType }),
    `slip-${order.orderId || "topup"}.${slip.extension}`,
  );
  form.set("checkDuplicate", "true");
  form.set("matchAmount", String(Number(order.price || 0)));

  const response = await fetch(THUNDER_VERIFY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  });

  let responseJson = {};
  try {
    responseJson = await response.json();
  } catch {
    responseJson = {};
  }

  if (!response.ok || responseJson?.success === false) {
    const thunderError = extractThunderErrorPayload(responseJson, response.status);
    const wrapped = new Error(
      thunderError.code ? `${thunderError.message} (${thunderError.code})` : thunderError.message,
    );
    wrapped.statusCode = response.status;
    wrapped.code = thunderError.code || "THUNDER_VERIFY_FAILED";
    throw wrapped;
  }

  const payload = responseJson?.data || responseJson?.result || responseJson;
  const amountInSlip = normalizeNumber(
    pickFirstValue(payload, [
      "amountInSlip",
      "amount",
      "slipAmount",
      "rawSlip.amount.amount",
      "data.amount",
      "rawSlip.amount",
    ]),
  );
  let amountMatched = normalizeBoolean(
    pickFirstValue(payload, [
      "isAmountMatched",
      "amountMatched",
      "matchedAmount",
      "rawSlip.isAmountMatched",
    ]),
  );
  if (amountMatched === null && amountInSlip !== null) {
    amountMatched = Math.abs(amountInSlip - Number(order.price || 0)) < 0.01;
  }

  const duplicate = normalizeBoolean(
    pickFirstValue(payload, ["isDuplicate", "duplicate", "rawSlip.isDuplicate"]),
  );
  const matchedAccountRaw = pickFirstValue(payload, [
    "matchedAccount",
    "isAccountMatched",
    "accountMatched",
    "rawSlip.matchedAccount",
  ]);
  const matchedAccount =
    normalizeBoolean(matchedAccountRaw) ??
    (matchedAccountRaw && typeof matchedAccountRaw === "object" ? true : null);

  const result = {
    provider: "thunder",
    status: "success",
    statusCode: normalizeText(responseJson?.code || responseJson?.status || "OK"),
    message: normalizeText(responseJson?.message || responseJson?.description || ""),
    expectedAmount: Number(order.price || 0),
    amountInSlip,
    amountMatched,
    duplicate,
    matchedAccount,
    receiverName: normalizeText(
      pickFirstValue(payload, [
        "receiverName",
        "receiver.name",
        "accountName",
        "bankAccountName",
        "rawSlip.receiver.account.name.th",
        "rawSlip.receiver.account.name.en",
        "rawSlip.receiverName",
      ]),
    ),
    transactionRef: normalizeText(
      pickFirstValue(payload, [
        "transRef",
        "reference",
        "referenceId",
        "qrTransactionId",
        "rawSlip.transRef",
      ]),
    ),
    paidAt: normalizeText(
      pickFirstValue(payload, [
        "paidAt",
        "transDate",
        "transactionDate",
        "date",
        "rawSlip.date",
        "rawSlip.transDate",
      ]),
    ),
  };

  result.suggestion =
    result.amountMatched === true && result.duplicate !== true
      ? "approve"
      : result.amountMatched === false
        ? "review_amount"
        : result.duplicate === true
          ? "review_duplicate"
          : "manual_review";
  result.summary = buildThunderVerificationSummary(result);
  return result;
}

async function verifyTopupSlipWithThunder(adminUser, orderId) {
  assertAdminUser(adminUser);
  const cleanOrderId = String(orderId || "").trim();
  if (!cleanOrderId) {
    const error = new Error("ไม่พบรหัสรายการเติมเงิน");
    error.statusCode = 400;
    throw error;
  }

  const orderRef = adminDb.collection("topupOrders").doc(cleanOrderId);
  const snapshot = await orderRef.get();
  if (!snapshot.exists) {
    const error = new Error("ไม่พบรายการเติมเงินนี้");
    error.statusCode = 404;
    throw error;
  }

  const order = snapshot.data() || {};
  if (!order.slipDataUrl) {
    const error = new Error("รายการนี้ยังไม่มีรูปสลิปให้ตรวจ");
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await callThunderVerifySlip({
      ...order,
      orderId: cleanOrderId,
    });
    await orderRef.set(
      {
        slipVerification: {
          provider: result.provider,
          status: result.status,
          statusCode: result.statusCode,
          message: result.message,
          expectedAmount: result.expectedAmount,
          amountInSlip: result.amountInSlip,
          amountMatched: result.amountMatched,
          duplicate: result.duplicate,
          matchedAccount: result.matchedAccount,
          receiverName: result.receiverName,
          transactionRef: result.transactionRef,
          paidAt: result.paidAt,
          suggestion: result.suggestion,
          summary: result.summary,
          verifiedAt: FieldValue.serverTimestamp(),
          verifiedByUid: adminUser.uid,
          verifiedByEmail: adminUser.email,
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      ok: true,
      orderId: cleanOrderId,
      ...result,
    };
  } catch (error) {
    await orderRef.set(
      {
        slipVerification: {
          provider: "thunder",
          status: "error",
          statusCode: error.code || "THUNDER_VERIFY_FAILED",
          message: error.message || "Thunder ตรวจสลิปไม่สำเร็จ",
          suggestion: "manual_review",
          summary: error.message || "Thunder ตรวจสลิปไม่สำเร็จ",
          verifiedAt: FieldValue.serverTimestamp(),
          verifiedByUid: adminUser.uid,
          verifiedByEmail: adminUser.email,
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    throw error;
  }
}

async function autoReviewTopupOrder(orderId) {
  const actor = {
    uid: "system:auto-thunder",
    email: PRIMARY_ADMIN_EMAIL,
    source: "auto_thunder",
  };

  let verificationResult = null;
  let decision = "reject";
  let rejectReason = TOPUP_REJECT_REASON;

  try {
    verificationResult = await verifyTopupSlipWithThunder(actor, orderId);
    if (verificationResult.suggestion === "approve") {
      decision = "approve";
    } else {
      rejectReason = verificationResult.summary || verificationResult.message || TOPUP_REJECT_REASON;
    }
  } catch (error) {
    rejectReason = error.message || "ตรวจสลิปอัตโนมัติไม่สำเร็จ";
  }

  const result = await reviewTopupOrder(decision, actor, orderId, { rejectReason });
  await updateTelegramTopupMessage(result);
  await notifyTelegramTopupReviewed(result);
  return {
    ...result,
    autoReviewed: true,
    verification: verificationResult,
  };
}

async function createTopupOrderForUser(user, payload) {
  const packageId = String(payload.packageId || "");
  const plan = getTopupPackage(packageId);
  const slipDataUrl = validateSlipDataUrl(payload.slipDataUrl);
  const orderRef = adminDb.collection("topupOrders").doc();
  const createdAt = new Date();

  await orderRef.set({
    uid: user.uid,
    email: user.email,
    emailLower: normalizeEmail(user.email),
    displayName: user.displayName,
    photoURL: user.photoURL,
    packageId,
    packageLabel: plan.label,
    packageType: plan.type,
    price: plan.price,
    credits: plan.credits || 0,
    days: plan.days || 0,
    status: "pending",
    slipDataUrl,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  try {
    const notifyResult = await notifyTelegramTopupPending({
      orderId: orderRef.id,
      packageId,
      packageLabel: plan.label,
      price: plan.price,
      displayName: user.displayName,
      email: user.email,
      slipDataUrl,
      createdAtIso: createdAt.toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Bangkok",
      }),
    });
    const message = notifyResult?.result;
    if (message?.message_id) {
      await orderRef.set(
        {
          telegramChatId: String(message.chat?.id || ""),
          telegramMessageId: String(message.message_id || ""),
        },
        { merge: true },
      );
    }
  } catch (error) {
    console.error("Telegram topup notify failed", error);
  }

  const autoResult = await autoReviewTopupOrder(orderRef.id);

  return {
    orderId: orderRef.id,
    packageId,
    price: plan.price,
    status: autoResult.status,
    autoReviewed: true,
    message:
      autoResult.status === "approved"
        ? "ระบบตรวจสลิปและอนุมัติรายการให้อัตโนมัติแล้ว"
        : autoResult.rejectReason || "ระบบตรวจสลิปอัตโนมัติไม่ผ่าน",
    rejectReason: autoResult.rejectReason || "",
  };
}

async function legacyApproveTopupOrderForAdmin(adminUser, orderId) {
  assertAdminUser(adminUser);
  const cleanOrderId = String(orderId || "").trim();
  if (!cleanOrderId) {
    const error = new Error("ไม่พบรหัสรายการเติมเงิน");
    error.statusCode = 400;
    throw error;
  }

  const orderRef = adminDb.collection("topupOrders").doc(cleanOrderId);

  return adminDb.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderRef);
    if (!orderSnapshot.exists) {
      const error = new Error("ไม่พบรายการเติมเงินนี้");
      error.statusCode = 404;
      throw error;
    }

    const order = orderSnapshot.data() || {};
    if (order.status === "approved") {
      return { orderId: cleanOrderId, alreadyApproved: true };
    }
    if (order.status !== "pending") {
      const error = new Error("รายการนี้ไม่อยู่ในสถานะรอตรวจสอบ");
      error.statusCode = 409;
      throw error;
    }

    const plan = getTopupPackage(order.packageId);
    const userRef = adminDb.collection("users").doc(order.uid);
    const userPatch = {
      email: order.email,
      emailLower: normalizeEmail(order.email),
      googleDisplayName: order.displayName || "",
      googlePhotoURL: order.photoURL || "",
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (plan.type === "credit") {
      userPatch.adCheckCredits = FieldValue.increment(plan.credits);
    } else {
      userPatch.plan = "pro";
      userPatch.tier = "pro";
      userPatch.memberLevel = "pro";
      userPatch.subscriptionStatus = "active";
      userPatch.dailyAdCheckLimit = 10;
      userPatch.proActivatedAt = FieldValue.serverTimestamp();
      userPatch.proSource = "topup";
      userPatch.proTopupOrderId = cleanOrderId;
      if (plan.type === "pro-monthly") {
        userPatch.proExpiresAt = Timestamp.fromDate(
          new Date(Date.now() + plan.days * 24 * 60 * 60 * 1000),
        );
      } else {
        userPatch.proLifetime = true;
        userPatch.proExpiresAt = FieldValue.delete();
      }
    }

    transaction.set(userRef, userPatch, { merge: true });
    transaction.set(
      orderRef,
      {
        status: "approved",
        approvedAt: FieldValue.serverTimestamp(),
        approvedByUid: adminUser.uid,
        approvedByEmail: adminUser.email,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      orderId: cleanOrderId,
      packageId: order.packageId,
      price: plan.price,
      status: "approved",
    };
  });
}

async function reviewTopupOrder(decision, actor, orderId, options = {}) {
  const cleanDecision = String(decision || "").trim().toLowerCase();
  const cleanOrderId = String(orderId || "").trim();
  const rejectReason = normalizeText(options.rejectReason) || TOPUP_REJECT_REASON;
  if (!["approve", "reject"].includes(cleanDecision)) {
    const error = new Error("Invalid topup review action");
    error.statusCode = 400;
    throw error;
  }
  if (!cleanOrderId) {
    const error = new Error("ไม่พบรหัสรายการเติมเงิน");
    error.statusCode = 400;
    throw error;
  }

  const orderRef = adminDb.collection("topupOrders").doc(cleanOrderId);
  return adminDb.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderRef);
    if (!orderSnapshot.exists) {
      const error = new Error("ไม่พบรายการเติมเงินนี้");
      error.statusCode = 404;
      throw error;
    }

    const order = orderSnapshot.data() || {};
    if (String(order.status || "pending").toLowerCase() !== "pending") {
      return {
        orderId: cleanOrderId,
        packageId: order.packageId || "",
        packageLabel: order.packageLabel || order.packageId || "",
        price: Number(order.price || 0),
        status: String(order.status || "pending").toLowerCase(),
        alreadyProcessed: true,
        displayName: order.displayName || "",
        email: order.email || "",
        createdAtIso: formatBangkokDate(order.createdAt),
        reviewedByEmail:
          order.approvedByEmail || order.rejectedByEmail || actor.email || PRIMARY_ADMIN_EMAIL,
        rejectReason: order.rejectedReason || rejectReason,
        telegramChatId: String(order.telegramChatId || ""),
        telegramMessageId: String(order.telegramMessageId || ""),
        reviewSource: order.reviewSource || actor.source || "admin",
      };
    }

    const plan = getTopupPackage(order.packageId);
    if (cleanDecision === "approve") {
      const userRef = adminDb.collection("users").doc(order.uid);
      const userPatch = {
        email: order.email,
        emailLower: normalizeEmail(order.email),
        googleDisplayName: order.displayName || "",
        googlePhotoURL: order.photoURL || "",
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (plan.type === "credit") {
        userPatch.adCheckCredits = FieldValue.increment(plan.credits);
      } else {
        const accessLevel = plan.type === "master-lifetime" ? "master" : "pro";
        userPatch.plan = accessLevel;
        userPatch.tier = accessLevel;
        userPatch.memberLevel = accessLevel;
        userPatch.subscriptionStatus = "active";
        userPatch.dailyAdCheckLimit = 10;
        userPatch.proActivatedAt = FieldValue.serverTimestamp();
        userPatch.proSource = "topup";
        userPatch.proTopupOrderId = cleanOrderId;
        if (plan.type === "pro-monthly") {
          userPatch.proExpiresAt = Timestamp.fromDate(
            new Date(Date.now() + plan.days * 24 * 60 * 60 * 1000),
          );
        } else {
          userPatch.proLifetime = true;
          userPatch.proExpiresAt = FieldValue.delete();
        }
      }

      transaction.set(userRef, userPatch, { merge: true });
    }

    transaction.set(
      orderRef,
      cleanDecision === "approve"
        ? {
            status: "approved",
            approvedAt: FieldValue.serverTimestamp(),
            approvedByUid: actor.uid || "",
            approvedByEmail: actor.email || PRIMARY_ADMIN_EMAIL,
            reviewSource: actor.source || "admin",
            updatedAt: FieldValue.serverTimestamp(),
          }
        : {
            status: "rejected",
            rejectedAt: FieldValue.serverTimestamp(),
            rejectedByUid: actor.uid || "",
            rejectedByEmail: actor.email || PRIMARY_ADMIN_EMAIL,
            rejectedReason: rejectReason,
            reviewSource: actor.source || "admin",
            updatedAt: FieldValue.serverTimestamp(),
          },
      { merge: true },
    );

    return {
      orderId: cleanOrderId,
      packageId: order.packageId || "",
      packageLabel: order.packageLabel || order.packageId || "",
      price: plan.price,
      status: cleanDecision === "approve" ? "approved" : "rejected",
      displayName: order.displayName || "",
      email: order.email || "",
      createdAtIso: formatBangkokDate(order.createdAt),
      reviewedByEmail: actor.email || PRIMARY_ADMIN_EMAIL,
      rejectReason,
      telegramChatId: String(order.telegramChatId || ""),
      telegramMessageId: String(order.telegramMessageId || ""),
      reviewSource: actor.source || "admin",
    };
  });
}

async function approveTopupOrderForAdmin(adminUser, orderId) {
  assertAdminUser(adminUser);
  const result = await reviewTopupOrder(
    "approve",
    { uid: adminUser.uid, email: adminUser.email, source: "admin_panel" },
    orderId,
  );
  await updateTelegramTopupMessage(result);
  await notifyTelegramTopupReviewed(result);
  return result;
}

async function rejectTopupOrderForAdmin(adminUser, orderId) {
  assertAdminUser(adminUser);
  const result = await reviewTopupOrder(
    "reject",
    { uid: adminUser.uid, email: adminUser.email, source: "admin_panel" },
    orderId,
  );
  await updateTelegramTopupMessage(result);
  await notifyTelegramTopupReviewed(result);
  return result;
}

async function processTelegramTopupAction(callbackQuery) {
  const callbackData = String(callbackQuery?.data || "");
  const callbackQueryId = callbackQuery?.id || "";
  const chatId = String(callbackQuery?.message?.chat?.id || "");
  const messageId = String(callbackQuery?.message?.message_id || "");
  const match = callbackData.match(/^topup:(approve|reject):([A-Za-z0-9_-]+)$/);

  if (!match) {
    await answerTelegramCallbackQuery(callbackQueryId, "รูปแบบคำสั่งไม่ถูกต้อง", true);
    return;
  }
  if (chatId !== getTelegramSecretValue(telegramAdminChatId)) {
    await answerTelegramCallbackQuery(callbackQueryId, "ไม่มีสิทธิ์ใช้งานปุ่มนี้", true);
    return;
  }

  const [, decision, orderId] = match;
  try {
    const result = await reviewTopupOrder(
      decision,
      {
        uid: `telegram:${chatId}`,
        email: `${PRIMARY_ADMIN_EMAIL} (telegram)`,
        source: "telegram",
      },
      orderId,
    );
    await updateTelegramTopupMessage(result, { chatId, messageId });
    await notifyTelegramTopupReviewed(result);
    await answerTelegramCallbackQuery(
      callbackQueryId,
      result.alreadyProcessed
        ? `รายการนี้${getTopupStatusLabel(result.status)}ไปแล้ว`
        : decision === "approve"
          ? "อนุมัติรายการเรียบร้อย"
          : "ปฏิเสธรายการเรียบร้อย",
    );
  } catch (error) {
    console.error("Telegram topup action failed", error);
    await answerTelegramCallbackQuery(
      callbackQueryId,
      error.message || "จัดการรายการไม่สำเร็จ",
      true,
    );
  }
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
  if (usage.isAdmin) {
    return usage;
  }

  if (usage.isPrivileged) {
    const usedToday = await countTodayAdChecks(usage.userRef);
    if (usedToday >= usage.dailyLimit) {
      throw buildLimitErrorPayload(
        "วันนี้ใช้สิทธิ์ Pro สำหรับ Check Ads ครบ 10 ครั้งแล้ว กรุณากลับมาใช้งานใหม่ในวันถัดไป หรือติดต่อ Admin Page หากต้องการเพิ่มสิทธิ์พิเศษ",
      );
    }
    return usage;
  }

  if (usage.adCheckCredits > 0) {
    return { ...usage, usesCredit: true };
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
      imagePreviewDataUrl: data.imagePreviewDataUrl || "",
    },
  };
}

async function getExistingAdCheck(user, fileName, imagePreviewDataUrl = "") {
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
  const sanitizedPreview = sanitizeImagePreviewDataUrl(imagePreviewDataUrl);
  if (!data.imagePreviewDataUrl && sanitizedPreview) {
    await Promise.all([
      userHistoryRef.set({ imagePreviewDataUrl: sanitizedPreview, updatedAt: FieldValue.serverTimestamp() }, { merge: true }),
      globalHistoryRef.set({ imagePreviewDataUrl: sanitizedPreview, updatedAt: FieldValue.serverTimestamp() }, { merge: true }),
    ]);
    data.imagePreviewDataUrl = sanitizedPreview;
  }
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
  const imagePreviewDataUrl = sanitizeImagePreviewDataUrl(payload.imagePreviewDataUrl);
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
    imagePreviewDataUrl,
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

  return { fileKey, fileName };
}

async function awardAdCheckScore(user, fileKey, fileName) {
  const scoreId = `${user.uid}_ad-check_${fileKey}`;
  const scoreRef = adminDb.collection("lessonScores").doc(scoreId);
  const existing = await scoreRef.get();
  if (existing.exists) {
    return { awarded: false, points: 0 };
  }

  await scoreRef.set({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lessonId: `ad-check-${fileKey}`,
    lessonTitle: `AI Check Ads: ${fileName}`,
    points: AD_CHECK_POINTS,
    source: "ai-check-ads",
    createdAt: FieldValue.serverTimestamp(),
  });

  return { awarded: true, points: AD_CHECK_POINTS };
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

  return normalizeAdCreativeResult(JSON.parse(outputText));
}

function normalizeAdCreativeResult(result) {
  if (!result?.category_scores) return result;
  const score = AD_CHECK_SCORE_KEYS.reduce((total, key) => total + Number(result.category_scores[key] || 0), 0);
  const overallScore = Math.max(0, Math.min(100, Math.round(score)));
  result.overall_score = overallScore;

  if (overallScore >= 81) {
    result.creative_potential = "สูง";
  } else if (overallScore >= 71) {
    result.creative_potential = "ค่อนข้างสูง";
  } else if (overallScore >= 61) {
    result.creative_potential = "กลาง";
  } else {
    result.creative_potential = "ต่ำ";
  }

  return result;
}

async function analyzeCreativeForUser(req, payload) {
  const user = await verifySignedInUser(req);
  await ensureUserProfile(user);

  const existing = await getExistingAdCheck(user, payload.fileName, payload.imagePreviewDataUrl);
  if (existing) {
    return {
      ...existing,
      usage: await getAdCheckUsageSummary(user),
    };
  }

  const quota = await enforceAdCheckQuota(user);

  const result = await analyzeCreative(payload);
  const savedHistory = await saveAdCheckHistory(user, payload, result);
  if (quota.usesCredit) {
    await quota.userRef.set(
      {
        adCheckCredits: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }
  const scoreAward = await awardAdCheckScore(user, savedHistory.fileKey, savedHistory.fileName);
  return {
    ...result,
    history: {
      fromHistory: false,
      fileName: payload.fileName || "",
      productName: payload.productName || "",
      checkedBy: user.email,
    },
    scoreAward,
    usage: await getAdCheckUsageSummary(user),
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

export const submitTopupSlip = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [telegramBotToken, telegramAdminChatId, thunderApiKey],
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
      const result = await createTopupOrderForUser(user, payload);
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const approveTopupOrder = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [telegramBotToken],
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
      const adminUser = await verifySignedInUser(req);
      const payload = await readJsonBody(req);
      const result = await approveTopupOrderForAdmin(adminUser, payload.orderId);
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const rejectTopupOrder = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [telegramBotToken],
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
      const adminUser = await verifySignedInUser(req);
      const payload = await readJsonBody(req);
      const result = await rejectTopupOrderForAdmin(adminUser, payload.orderId);
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const verifyTopupSlip = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [thunderApiKey],
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
      const adminUser = await verifySignedInUser(req);
      const payload = await readJsonBody(req);
      const result = await verifyTopupSlipWithThunder(adminUser, payload.orderId);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        ok: false,
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const telegramTopupWebhook = onRequest(
  {
    region: "asia-southeast1",
    cors: false,
    secrets: [telegramBotToken, telegramAdminChatId, telegramWebhookSecret],
    timeoutSeconds: 60,
    memory: "256MiB",
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }

    const expectedSecret = getTelegramSecretValue(telegramWebhookSecret);
    const headerSecret = String(req.get("x-telegram-bot-api-secret-token") || "");
    if (!expectedSecret || headerSecret !== expectedSecret) {
      res.status(403).send("Forbidden");
      return;
    }

    try {
      const payload = await readJsonBody(req);
      if (payload?.callback_query) {
        await processTelegramTopupAction(payload.callback_query);
      }
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("telegramTopupWebhook failed", error);
      res.status(200).json({ ok: false });
    }
  },
);

export const submitCommunityRequest = onRequest(
  {
    region: "asia-southeast1",
    cors: true,
    secrets: [telegramBotToken, telegramAdminChatId],
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
      const payload = await readJsonBody(req);
      const result = await createCommunityRequestForUser(user, payload);
      sendJson(res, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        ok: false,
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);

export const getAdCheckUsage = onRequest(
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

    if (req.method !== "GET" && req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    try {
      const user = await verifySignedInUser(req);
      await ensureUserProfile(user);
      const usage = await getAdCheckUsageSummary(user);
      sendJson(res, 200, { ok: true, usage });
    } catch (error) {
      sendJson(res, error.statusCode || 400, {
        error: error.message || "Unknown error",
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  },
);
