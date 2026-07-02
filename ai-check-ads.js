import { signInWithGoogle, watchAuth } from "./auth-shared.js";

const adsImageInput = document.querySelector("#adsImageInput");
const clearAdsImageButton = document.querySelector("#clearAdsImageButton");
const uploadTrigger = document.querySelector("#uploadTrigger");
const heroLoginButton = document.querySelector("#heroLoginButton");
const auditGuestNotice = document.querySelector("#auditGuestNotice");
const auditUploadCard = document.querySelector("#auditUploadCard");
const auditUploadHint = document.querySelector("#auditUploadHint");
const auditSkeletonGrid = document.querySelector("#auditSkeletonGrid");
const auditLoadingCallout = document.querySelector("#auditLoadingCallout");
const auditResultsGrid = document.querySelector("#auditResultsGrid");
const runAuditButton = document.querySelector("#runAuditButton");
const adsPreviewImage = document.querySelector("#adsPreviewImage");
const previewOverlayTitle = document.querySelector("#previewOverlayTitle");
const previewOverlayText = document.querySelector("#previewOverlayText");
const auditStatusBadge = document.querySelector("#auditStatusBadge");
const auditScoreValue = document.querySelector("#auditScoreValue");
const auditScoreBar = document.querySelector("#auditScoreBar");
const auditPotential = document.querySelector("#auditPotential");
const auditRequestStatus = document.querySelector("#auditRequestStatus");
const auditUpgradeNotice = document.querySelector("#auditUpgradeNotice");
const auditUpgradeLink = document.querySelector("#auditUpgradeLink");
const apiEndpointInput = document.querySelector("#apiEndpointInput");
const productNameInput = document.querySelector("#productNameInput");
const targetMarketInput = document.querySelector("#targetMarketInput");
const objectiveInput = document.querySelector("#objectiveInput");
const notesInput = document.querySelector("#notesInput");
const auditAdminSettings = document.querySelector("#auditAdminSettings");
const adminOnlyElements = [...document.querySelectorAll(".admin-only")];
const auditSummaryList = document.querySelector("#auditSummaryList");
const primaryAudienceDemographic = document.querySelector("#primaryAudienceDemographic");
const primaryAudienceInterests = document.querySelector("#primaryAudienceInterests");
const primaryAudienceBehaviors = document.querySelector("#primaryAudienceBehaviors");
const primaryAudiencePain = document.querySelector("#primaryAudiencePain");
const primaryAudienceSignals = document.querySelector("#primaryAudienceSignals");
const secondaryAudienceList = document.querySelector("#secondaryAudienceList");
const audienceSizeNumber = document.querySelector("#audienceSizeNumber");
const audienceSizeConfidence = document.querySelector("#audienceSizeConfidence");
const audienceSizeRationale = document.querySelector("#audienceSizeRationale");
const signalClarity = document.querySelector("#signalClarity");
const signalUnderstoodList = document.querySelector("#signalUnderstoodList");
const signalConfusingList = document.querySelector("#signalConfusingList");
const strengthsList = document.querySelector("#strengthsList");
const weaknessesList = document.querySelector("#weaknessesList");
const fixesList = document.querySelector("#fixesList");
const fixPromptOutput = document.querySelector("#fixPromptOutput");
const copyFixPromptButton = document.querySelector("#copyFixPromptButton");
const generateFixImageButton = document.querySelector("#generateFixImageButton");
const generatedImageStatus = document.querySelector("#generatedImageStatus");
const generatedFixImage = document.querySelector("#generatedFixImage");
const generatedImageEmpty = document.querySelector("#generatedImageEmpty");
const generatedCard = document.querySelector(".audit-generated-card");
let resetFixPromptButton = null;
let viewOriginalImageButton = null;
let viewGeneratedImageButton = null;
let compareImagesButton = null;
let downloadGeneratedImageButton = document.querySelector("#downloadGeneratedImageButton");
let auditImageModal = null;
let auditImageModalTitle = null;
let auditImageModalBody = null;
const weaknessInsightGroup = weaknessesList?.closest(".audit-insight-group");
const fixesInsightGroup = fixesList?.closest(".audit-insight-group");
const hookOptionsList = document.querySelector("#hookOptionsList");
const finalVerdictStatus = document.querySelector("#finalVerdictStatus");
const finalVerdictReason = document.querySelector("#finalVerdictReason");
const auditStars = document.querySelector("#auditStars");
const AD_CHECK_USAGE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/getAdCheckUsage";
const GENERATE_FIX_IMAGE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/generateAdFixImage";
const UPDATE_GENERATED_PREVIEW_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/updateGeneratedAdPreview";

let selectedImageDataUrl = "";
let selectedImagePreviewDataUrl = "";
let selectedMimeType = "image/jpeg";
let selectedFileName = "";
let selectedFileSize = 0;
let selectedImageWidth = 0;
let selectedImageHeight = 0;
let currentUser = null;
let usagePill = null;
let uploadPreviewImage = null;
let uploadDropzone = null;
let uploadUiReady = false;
let freeLimitExhausted = false;
let generatedImageDataUrl = "";
let generatedImageFileName = "generated-ad-fix.png";
let currentAuditResult = null;
let defaultFixPrompt = "";
let generateProgressTimer = null;
let generateProgressValue = 0;

const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const PRO_UPGRADE_URL = "https://www.facebook.com/AiCreativesN/";
const FREE_LIMIT_MESSAGE =
  "ใช้สิทธิ์ตรวจเช็คฟรีครบแล้ว สามารถเติมเงินเพิ่มในหน้าเติมเงิน หรือสมัคร Pro 289 บาทต่อเดือน เพื่อใช้ Check Ads ได้วันละ 15 ครั้ง พร้อมคอร์สเรียน AI มากกว่า 20 บทและเครื่องมือ AI ใหม่ ๆ ในอนาคต หากต้องการราคาพิเศษสำหรับองค์กร ติดต่อ Admin ได้ค่ะ ที่ page AI ภาพนี้ให้หน่อย";
const AUTO_PRODUCT_PLACEHOLDER = "ให้ AI ดูจากภาพโฆษณาและระบุชื่อสินค้าหรือประเภทสินค้าที่ใกล้เคียงที่สุด";

const metricMeta = {
  hook_scroll_stop: 15,
  audience_signal: 15,
  pain_desire_clarity: 10,
  offer_strength: 15,
  creative_clarity: 10,
  proof_trust: 10,
  objection_handling: 10,
  cta: 5,
  andromeda_readiness: 10,
};

function setRequestStatus(message, tone = "muted") {
  if (!auditRequestStatus) return;
  auditRequestStatus.textContent = message;
  auditRequestStatus.dataset.tone = tone;
}

function createActionButton(className, id, text) {
  const button = document.createElement("button");
  button.className = className;
  button.id = id;
  button.type = "button";
  button.textContent = text;
  return button;
}

function ensureAuditUiEnhancements() {
  updateCreditButtonLabels();
  if (fixPromptOutput) {
    fixPromptOutput.readOnly = false;
    defaultFixPrompt = fixPromptOutput.value;
  }
  if (generatedCard) {
    generatedCard.hidden = true;
  }

  if (copyFixPromptButton && !resetFixPromptButton) {
    resetFixPromptButton = createActionButton("soft-button audit-reset-button", "resetFixPromptButton", "คืนค่า Prompt");
    copyFixPromptButton.insertAdjacentElement("afterend", resetFixPromptButton);
  }

  const previewHeading = document.querySelector(".audit-preview-card .audit-card-heading");
  if (previewHeading && !viewOriginalImageButton) {
    viewOriginalImageButton = createActionButton("soft-button audit-view-button", "viewOriginalImageButton", "ดูภาพใหญ่");
    previewHeading.append(viewOriginalImageButton);
  }

  const generatedActions = document.querySelector(".audit-generated-actions");
  if (generatedActions) {
    if (!viewGeneratedImageButton) {
      viewGeneratedImageButton = createActionButton("soft-button audit-view-button", "viewGeneratedImageButton", "ดูภาพใหญ่");
      viewGeneratedImageButton.hidden = true;
      generatedActions.insertBefore(viewGeneratedImageButton, downloadGeneratedImageButton || null);
    }
    if (!compareImagesButton) {
      compareImagesButton = createActionButton("soft-button audit-compare-button", "compareImagesButton", "เปรียบเทียบ");
      compareImagesButton.hidden = true;
      generatedActions.insertBefore(compareImagesButton, downloadGeneratedImageButton || null);
    }
  }

  if (!downloadGeneratedImageButton && generatedActions) {
    downloadGeneratedImageButton = createActionButton("soft-button audit-download-button", "downloadGeneratedImageButton", "ดาวน์โหลดรูป");
    downloadGeneratedImageButton.hidden = true;
    generatedActions.append(downloadGeneratedImageButton);
  } else if (downloadGeneratedImageButton) {
    downloadGeneratedImageButton.textContent = "ดาวน์โหลดรูป";
  }

  if (!auditImageModal) {
    auditImageModal = document.createElement("div");
    auditImageModal.className = "audit-image-modal";
    auditImageModal.id = "auditImageModal";
    auditImageModal.hidden = true;
    auditImageModal.innerHTML = `
      <div class="audit-image-modal-panel" role="dialog" aria-modal="true" aria-labelledby="auditImageModalTitle">
        <div class="audit-image-modal-head">
          <h2 id="auditImageModalTitle">ดูภาพ</h2>
          <button class="soft-button" id="closeImageModalButton" type="button">ปิด</button>
        </div>
        <div class="audit-image-modal-body" id="auditImageModalBody"></div>
      </div>
    `;
    document.body.append(auditImageModal);
    auditImageModalTitle = auditImageModal.querySelector("#auditImageModalTitle");
    auditImageModalBody = auditImageModal.querySelector("#auditImageModalBody");
    auditImageModal.querySelector("#closeImageModalButton")?.addEventListener("click", closeImageModal);
    auditImageModal.addEventListener("click", (event) => {
      if (event.target === auditImageModal) closeImageModal();
    });
  }
}

function updateCreditButtonLabels() {
  const isAdmin = isAdminUser(currentUser);
  if (runAuditButton) {
    runAuditButton.textContent = isAdmin ? "วิเคราะห์เลย (Admin ไม่ใช้ Credit)" : "วิเคราะห์เลย ใช้ 1 เครดิต";
  }
  if (generateFixImageButton) {
    generateFixImageButton.textContent = isAdmin
      ? "Generate แก้รูปใหม่ + พร้อมวิเคราะห์ (Admin ไม่ใช้ Credit)"
      : "Generate แก้รูปใหม่ + พร้อมวิเคราะห์ ใช้ 1 เครดิต";
  }
}

function setUpgradeNotice(visible, message = FREE_LIMIT_MESSAGE, url = PRO_UPGRADE_URL) {
  if (!auditUpgradeNotice) return;
  auditUpgradeNotice.hidden = !visible;
  const copy = auditUpgradeNotice.querySelector("p");
  if (copy) copy.textContent = message;
  if (auditUpgradeLink) auditUpgradeLink.href = url || PRO_UPGRADE_URL;
}

function isFreeLimitExhausted(usage) {
  if (!usage || usage.plan !== "free") return false;
  return Number(usage.remaining || 0) <= 0 && Number(usage.credits || 0) <= 0;
}

function setUsagePill(usage) {
  if (!usagePill) return;

  if (!currentUser || !usage) {
    usagePill.hidden = true;
    usagePill.textContent = "";
    return;
  }

  usagePill.hidden = false;
  usagePill.dataset.plan = usage.plan || "free";
  usagePill.textContent = usage.plan === "admin" ? "Admin ไม่ใช้ Credit" : String(usage.label || "");
}

function isAdminUser(user) {
  return ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase());
}

function setResultPanelsVisible(visible) {
  if (auditResultsGrid) auditResultsGrid.hidden = !visible;
}

function setSkeletonVisible(visible) {
  if (auditLoadingCallout) auditLoadingCallout.hidden = !visible;
  if (auditSkeletonGrid) {
    auditSkeletonGrid.hidden = !visible;
    auditSkeletonGrid.setAttribute("aria-hidden", visible ? "false" : "true");
  }
}

function scrollToLoadingState() {
  const target = auditLoadingCallout || auditSkeletonGrid;
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function startGenerateProgress() {
  stopGenerateProgress();
  generateProgressValue = 0;
  updateGenerateProgress(0);
  generateProgressTimer = window.setInterval(() => {
    generateProgressValue = Math.min(95, generateProgressValue + Math.ceil((96 - generateProgressValue) * 0.12));
    updateGenerateProgress(generateProgressValue);
  }, 650);
}

function updateGenerateProgress(value) {
  if (auditLoadingCallout) {
    auditLoadingCallout.innerHTML = `
      <span>กำลังสร้างรูปใหม่ พร้อมวิเคราะห์ทันที</span>
      <b>${value}%</b>
      <i class="audit-loading-meter"><em style="width: ${value}%"></em></i>
    `;
  }
}

function stopGenerateProgress(finalValue = 100) {
  if (generateProgressTimer) {
    window.clearInterval(generateProgressTimer);
    generateProgressTimer = null;
  }
  if (finalValue !== null) updateGenerateProgress(finalValue);
}

function resetFixPrompt() {
  if (!fixPromptOutput) return;
  fixPromptOutput.value = defaultFixPrompt || buildFixPrompt(currentAuditResult || {});
  setRequestStatus("คืนค่า Prompt แล้ว", "success");
}

function updateGuestGate() {
  const loggedIn = Boolean(currentUser);
  const canUpload = loggedIn && !freeLimitExhausted;
  if (uploadTrigger) uploadTrigger.hidden = !canUpload;
  if (runAuditButton) runAuditButton.hidden = !canUpload;
  if (clearAdsImageButton) clearAdsImageButton.hidden = !canUpload;
  if (auditGuestNotice) auditGuestNotice.hidden = loggedIn;
  if (auditUploadCard) {
    auditUploadCard.hidden = freeLimitExhausted;
    auditUploadCard.dataset.locked = canUpload ? "false" : "true";
  }
  if (uploadDropzone) uploadDropzone.dataset.locked = canUpload ? "false" : "true";
  if (auditUploadHint) {
    auditUploadHint.textContent = canUpload
      ? "อัปโหลดรูปโฆษณาแล้วกดวิเคราะห์ได้ทันที"
      : "กรุณา Login Gmail ก่อนใช้งาน";
  }
}

function updateAdminUi() {
  const isAdmin = isAdminUser(currentUser);
  if (auditAdminSettings) auditAdminSettings.hidden = !isAdmin;
  adminOnlyElements.forEach((element) => {
    element.hidden = !isAdmin;
  });
  updateCreditButtonLabels();
  updateGuestGate();
}

function openImagePicker() {
  if (!currentUser || !adsImageInput) return;
  adsImageInput.value = "";
  adsImageInput.click();
}

function initUploadUi() {
  if (!auditUploadCard || uploadUiReady) return;

  uploadDropzone = document.querySelector("#auditUploadDropzone");
  uploadPreviewImage = document.querySelector("#auditSelectedImage");
  usagePill = document.querySelector("#auditUsagePill");

  if (!uploadDropzone) return;
  uploadUiReady = true;

  uploadDropzone.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("#uploadTrigger")) return;
    openImagePicker();
  });

  uploadTrigger?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openImagePicker();
  });

  uploadDropzone.addEventListener("keydown", (event) => {
    if (!currentUser) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openImagePicker();
    }
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    uploadDropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      if (!currentUser) return;
      uploadDropzone.dataset.drag = "true";
    });
  });

  ["dragleave", "dragend", "drop"].forEach((eventName) => {
    uploadDropzone.addEventListener(eventName, () => {
      uploadDropzone.dataset.drag = "false";
    });
  });

  uploadDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    if (!currentUser) return;
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    adsImageInput.files = transfer.files;
    adsImageInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function setDefaultPreview() {
  selectedImageDataUrl = "";
  selectedImagePreviewDataUrl = "";
  selectedMimeType = "image/jpeg";
  selectedFileName = "";
  selectedFileSize = 0;
  selectedImageWidth = 0;
  selectedImageHeight = 0;
  if (adsPreviewImage) adsPreviewImage.src = "assets/banners/โฆษณา.png";
  if (uploadPreviewImage) uploadPreviewImage.src = "assets/banners/โฆษณา.png";
  if (previewOverlayTitle) previewOverlayTitle.textContent = "พร้อมเชื่อม API วิเคราะห์ภาพ";
  if (previewOverlayText) previewOverlayText.textContent = "เมื่ออัปโหลดรูป ระบบจะแสดงรูปค้างไว้และพร้อมกดวิเคราะห์ทันที";
  if (auditStatusBadge) auditStatusBadge.textContent = "Mock Result";
  setUpgradeNotice(false);
  setSkeletonVisible(false);
  setResultPanelsVisible(false);
  setRequestStatus("ยังไม่ได้ส่ง request", "muted");
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("read-failed"));
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image-load-failed"));
    image.src = dataUrl;
  });
}

async function createHistoryPreview(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") return "";
  const image = await loadImageFromDataUrl(dataUrl);
  const maxSize = 420;
  const scale = Math.min(maxSize / image.naturalWidth, maxSize / image.naturalHeight, 1);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.76);
}

async function saveGeneratedPreview(fileName, imageDataUrl, idToken) {
  if (!fileName || !imageDataUrl || !idToken) return;

  const generatedImagePreviewDataUrl = String(imageDataUrl).startsWith("data:image/")
    ? await createHistoryPreview(imageDataUrl).catch(() => "")
    : "";
  const generatedImageUrl = /^https?:\/\//i.test(String(imageDataUrl)) ? String(imageDataUrl) : "";

  if (!generatedImagePreviewDataUrl && !generatedImageUrl && !selectedImagePreviewDataUrl) return;

  await fetch(UPDATE_GENERATED_PREVIEW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      fileName,
      generatedImagePreviewDataUrl,
      generatedImageUrl,
      sourceImagePreviewDataUrl: selectedImagePreviewDataUrl || "",
      sourceFileName: selectedFileName || "",
    }),
  }).catch(() => {});
}

async function refreshUsage() {
  if (!currentUser) {
    freeLimitExhausted = false;
    setUsagePill(null);
    setUpgradeNotice(false);
    updateGuestGate();
    return;
  }

  try {
    const idToken = await currentUser.getIdToken();
    const response = await fetch(AD_CHECK_USAGE_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result?.error || "usage-failed");
    const usage = result.usage || null;
    freeLimitExhausted = isFreeLimitExhausted(usage);
    setUsagePill(usage);
    setUpgradeNotice(freeLimitExhausted);
    if (freeLimitExhausted) {
      setSkeletonVisible(false);
      setResultPanelsVisible(false);
      setDefaultPreview();
      setUpgradeNotice(true);
      setRequestStatus("ใช้สิทธิ์ตรวจเช็คฟรีครบแล้ว", "error");
    }
    updateGuestGate();
  } catch {
    freeLimitExhausted = false;
    setUsagePill(null);
    updateGuestGate();
  }
}

function listToHtml(items) {
  return (items || [])
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function personaToHtml(items) {
  return (items || [])
    .map(
      (item, index) => `
        <li>
          <b>${index + 1}</b>
          <div>
            <strong>${item.title || "-"}</strong>
            <span>${item.description || "-"}</span>
          </div>
        </li>
      `,
    )
    .join("");
}

function formatAudienceNumber(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "0";
  return Math.round(number).toLocaleString("th-TH");
}

function renderStars(score) {
  if (!auditStars) return;
  const filled = Math.max(1, Math.min(5, Math.round(Number(score || 0) / 20)));
  auditStars.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const isOff = index >= filled ? ' class="is-off"' : "";
    return `<span${isOff}>★</span>`;
  }).join("");
}

function renderMetric(key, value) {
  const max = metricMeta[key];
  if (!max) return;
  const bar = document.querySelector(`#metric-${key}`);
  const text = document.querySelector(`#metric-text-${key}`);
  const numeric = Number(value || 0);
  const width = Math.max(0, Math.min(100, (numeric / max) * 100));
  if (bar) bar.style.width = `${width}%`;
  if (text) text.textContent = `${numeric}/${max}`;
}

function sanitizeMetaSafePromptText(value) {
  return String(value || "")
    .replace(/before\s*\/\s*after/gi, "หลักฐานความน่าเชื่อถือที่ไม่เกินจริง")
    .replace(/before-after/gi, "หลักฐานความน่าเชื่อถือที่ไม่เกินจริง")
    .replace(/เห็นผลทันที/g, "สื่อสารประโยชน์อย่างระมัดระวัง")
    .replace(/หายขาด/g, "ช่วยดูแลหรือสนับสนุนตามความเหมาะสม")
    .replace(/รับประกันผล/g, "เพิ่มโอกาสให้ผลลัพธ์ดีขึ้น")
    .replace(/การันตี/g, "เพิ่มความมั่นใจ")
    .replace(/100%/g, "อย่างเหมาะสม")
    .replace(/รวยเร็ว/g, "เห็นแนวทางที่เป็นไปได้")
    .replace(/กำไรแน่นอน/g, "เพิ่มโอกาสทางธุรกิจ")
    .replace(/รีบซื้อเดี๋ยวนี้/g, "สนใจสอบถามเพิ่มเติม");
}

function buildFixPrompt(data) {
  const productName =
    data?.history?.productName ||
    productNameInput?.value?.trim() ||
    previewOverlayTitle?.textContent?.trim() ||
    "สินค้านี้";
  const fixes = Array.isArray(data?.fixes_now) ? data.fixes_now.filter(Boolean) : [];
  const strengths = Array.isArray(data?.strengths) ? data.strengths.filter(Boolean) : [];
  const verdict = data?.final_verdict?.reason || "";

  const fixLines = fixes.length
    ? fixes.map((item, index) => `${index + 1}. ${sanitizeMetaSafePromptText(item)}`).join("\n")
    : "1. ปรับข้อความขายให้ชัดขึ้น\n2. เพิ่มความน่าเชื่อถือของภาพ\n3. ทำ CTA ให้ชัดขึ้น";
  const keepLines = strengths.length
    ? strengths.map((item) => `- ${sanitizeMetaSafePromptText(item)}`).join("\n")
    : "- คงสินค้าเดิม\n- คงโทนภาพเดิม\n- คงคอนเซ็ปต์เดิม";

  return [
    `ช่วยแก้ไขภาพโฆษณาของ ${productName} ให้พร้อมใช้เป็นสื่อ Meta Ads มากขึ้น โดยคงสินค้าเดิม แบรนด์เดิม และโทนภาพเดิมไว้`,
    "",
    "แนวทางแก้ไขจากผลวิเคราะห์:",
    fixLines,
    "",
    "สิ่งที่ควรรักษาไว้:",
    keepLines,
    "",
    verdict ? `เป้าหมายการแก้ไข: ${sanitizeMetaSafePromptText(verdict)}` : "เป้าหมายการแก้ไข: เพิ่มความชัด ความน่าเชื่อถือ และทำให้ CTA สุภาพ ชัดเจน น่ากดสอบถาม",
    "",
    "ต้องปรับให้ผ่านเกณฑ์เหล่านี้:",
    "- มองแวบแรก 1-2 วินาทีต้องรู้ว่าสินค้าหรือบริการคืออะไร และช่วยเรื่องใดแบบสุภาพ",
    "- มี one clear promise เพียงแกนเดียว ไม่ยัดหลายข้อความจนสับสน",
    "- เพิ่ม proof/trust ที่ไม่เกินจริง เช่น รีวิวจริง จำนวนผู้ใช้จริง เครื่องหมายรับรอง หรือจุดเด่นที่ตรวจสอบได้",
    "- CTA ต้องชัดและสุภาพ เช่น สนใจสอบถามเพิ่มเติม, ดูรายละเอียด, ทักเพื่อรับข้อมูล",
    "- ตัวหนังสือต้องอ่านง่ายบนมือถือและลำดับสายตาต้องชัด",
    "",
    "ข้อห้ามสำคัญเพื่อให้ปลอดภัยกับ Meta/Facebook Ads:",
    "- ห้ามระบุคุณลักษณะส่วนบุคคลของผู้ชมโดยตรง เช่น อ้วน เป็นหนี้ แก่ ผมร่วง เป็นโรค หรือมีปัญหาส่วนตัว",
    "- ห้ามใช้ Before-After ที่เกินจริงหรือทำให้รู้สึกแย่กับตัวเอง",
    "- ห้ามกล่าวอ้างผลลัพธ์เกินจริง เช่น เห็นผลทันที หายขาด รวยเร็ว กำไรแน่นอน รับประกัน 100%",
    "- ห้ามทำปุ่มปลอม แจ้งเตือนปลอม แชทปลอม หรือองค์ประกอบที่ทำให้เข้าใจผิด",
    "- ห้ามใช้คำกดดันรุนแรง เช่น รีบซื้อเดี๋ยวนี้ ไม่ซื้อจะเสียใจ หรือคำดูถูกผู้ชม",
    "- หากเป็นสุขภาพ ความงาม การเงิน หรือรายได้ ให้ใช้ถ้อยคำระมัดระวัง เช่น ช่วยเพิ่มโอกาส, ผลลัพธ์ขึ้นอยู่กับแต่ละบุคคล, สนใจสอบถามเพิ่มเติม",
    "- ห้ามใช้สินค้าต้องห้ามหรือสื่อสารในทางละเมิดนโยบาย",
    "",
    "ข้อกำหนดภาพ:",
    "- คงสินค้าเดิม แบรนด์เดิม และโทนภาพเดิม",
    "- ลดองค์ประกอบที่ไม่ช่วยขายหรือทำให้สัญญาณโฆษณาสับสน",
    "- ใช้ภาษาไทยที่สุภาพ น่าเชื่อถือ ไม่ clickbait และไม่โจมตี self-image",
    "",
    "ขอผลลัพธ์เป็นภาพโฆษณาเวอร์ชันปรับปรุงที่ดูน่าเชื่อถือ สะอาด อ่านง่าย และเหมาะกับการนำไปทดสอบยิง Ads",
  ].join("\n");
}

async function copyFixPrompt() {
  const prompt = fixPromptOutput?.value?.trim();
  if (!prompt) {
    setRequestStatus("ยังไม่มี Prompt สำหรับคัดลอก", "error");
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(prompt);
    } else {
      fixPromptOutput.focus();
      fixPromptOutput.select();
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
    }
    setRequestStatus("คัดลอก Prompt สำหรับแก้ไขแล้ว", "success");
  } catch {
    setRequestStatus("คัดลอก Prompt ไม่สำเร็จ กรุณาลองใหม่", "error");
  }
}

async function generateFixImage() {
  const prompt = fixPromptOutput?.value?.trim();
  if (!prompt) {
    setRequestStatus("ยังไม่มี Prompt สำหรับ Generate รูปใหม่", "error");
    return;
  }

  if (!selectedImageDataUrl) {
    setRequestStatus("กรุณาอัปโหลดรูปโฆษณาก่อน Generate รูปใหม่", "error");
    return;
  }

  if (!currentUser) {
    setRequestStatus("กรุณา Login Gmail ก่อน Generate รูปใหม่", "error");
    return;
  }

  let idToken = "";
  try {
    idToken = await currentUser.getIdToken();
  } catch {
    setRequestStatus("ยืนยันสิทธิ์ Gmail ไม่สำเร็จ กรุณา Login ใหม่อีกครั้ง", "error");
    return;
  }

  try {
    generateFixImageButton.disabled = true;
    generateFixImageButton.textContent = "กำลังสร้างและวิเคราะห์...";
    if (generatedCard) {
      generatedCard.hidden = false;
    }
    setResultPanelsVisible(false);
    setSkeletonVisible(true);
    startGenerateProgress();
    scrollToLoadingState();
    generatedImageDataUrl = "";
    if (downloadGeneratedImageButton) downloadGeneratedImageButton.hidden = true;
    if (generatedFixImage) {
      generatedFixImage.hidden = true;
      generatedFixImage.removeAttribute("src");
    }
    if (generatedImageEmpty) {
      generatedImageEmpty.hidden = false;
      generatedImageEmpty.innerHTML = `
        <strong>กำลัง Generate รูปใหม่</strong>
        <p>กำลังสร้างรูปใหม่ พร้อมวิเคราะห์ทันที</p>
      `;
    }
    if (generatedImageStatus) generatedImageStatus.textContent = "Generating...";
    setRequestStatus("กำลังสร้างรูปใหม่ พร้อมวิเคราะห์ทันที", "loading");

    const response = await fetch(GENERATE_FIX_IMAGE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        prompt,
        imageBase64: selectedImageDataUrl.split(",")[1],
        mimeType: selectedMimeType,
        fileName: selectedFileName,
        fileSize: selectedFileSize,
        sourceImageWidth: selectedImageWidth,
        sourceImageHeight: selectedImageHeight,
        productName: productNameInput?.value?.trim() || AUTO_PRODUCT_PLACEHOLDER,
        targetMarket: targetMarketInput?.value?.trim() || "TH",
        objective: objectiveInput?.value?.trim() || "meta_ads_conversion",
      }),
    });

    const raw = await response.text();
    let result = {};
    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      throw new Error("backend ตอบกลับไม่ใช่ JSON ที่อ่านได้");
    }

    if (!response.ok) {
      throw new Error(result?.error || "Generate รูปใหม่ไม่สำเร็จ");
    }

    stopGenerateProgress(100);
    generatedImageDataUrl = result.imageDataUrl || "";
    generatedImageFileName = result.fileName || generatedImageFileName;
    if (generatedImageDataUrl && generatedImageFileName) {
      await saveGeneratedPreview(generatedImageFileName, generatedImageDataUrl, idToken);
    }
    if (generatedImageDataUrl && generatedFixImage) {
      generatedFixImage.src = generatedImageDataUrl;
      generatedFixImage.hidden = false;
    }
    if (generatedImageEmpty) generatedImageEmpty.hidden = Boolean(generatedImageDataUrl);
    if (!generatedImageDataUrl && generatedImageEmpty) {
      generatedImageEmpty.hidden = false;
      generatedImageEmpty.innerHTML = `
        <strong>ใช้ผลวิเคราะห์เดิม</strong>
        <p>ชื่อไฟล์รูปนี้เคยถูกวิเคราะห์แล้ว ระบบจึงดึงผลเดิมมาแสดงโดยไม่สร้างรูปซ้ำ</p>
      `;
    }
    if (downloadGeneratedImageButton) downloadGeneratedImageButton.hidden = !generatedImageDataUrl;
    if (viewGeneratedImageButton) viewGeneratedImageButton.hidden = !generatedImageDataUrl;
    if (compareImagesButton) compareImagesButton.hidden = !generatedImageDataUrl;
    if (generatedImageStatus) generatedImageStatus.textContent = result.reusedHistory ? "ใช้ผลเดิม" : "Generated + Analyzed";
    if (result.analysis) {
      renderAudit(result.analysis, { generatedMode: true });
    }
    if (result.usage) {
      setUsagePill(result.usage);
      freeLimitExhausted = isFreeLimitExhausted(result.usage);
      updateGuestGate();
    }
    setRequestStatus(result.reusedHistory ? "พบชื่อไฟล์รูปนี้ในประวัติ จึงดึงผลเดิมมาแสดงแล้ว" : "Generate รูปใหม่และวิเคราะห์สำเร็จแล้ว", "success");
  } catch (error) {
    stopGenerateProgress(null);
    setSkeletonVisible(false);
    if (generatedImageEmpty) {
      generatedImageEmpty.hidden = false;
      generatedImageEmpty.innerHTML = `
        <strong>Generate ไม่สำเร็จ</strong>
        <p>${error.message || "กรุณาลองใหม่อีกครั้ง"}</p>
      `;
    }
    if (generatedImageStatus) generatedImageStatus.textContent = "Error";
    setRequestStatus(error.message || "Generate รูปใหม่ไม่สำเร็จ", "error");
  } finally {
    generateFixImageButton.disabled = false;
    updateCreditButtonLabels();
  }
}

function downloadGeneratedImage() {
  if (!generatedImageDataUrl) {
    setRequestStatus("ยังไม่มีรูป Generate สำหรับดาวน์โหลด", "error");
    return;
  }

  const link = document.createElement("a");
  link.href = generatedImageDataUrl;
  link.download = generatedImageFileName || "generated-ad-fix.png";
  document.body.append(link);
  link.click();
  link.remove();
  setRequestStatus(`ดาวน์โหลดรูปแล้ว: ${link.download}`, "success");
}

function openImageModal(mode) {
  if (!auditImageModal || !auditImageModalBody) return;
  const originalSrc = selectedImageDataUrl || adsPreviewImage?.src || "";
  const generatedSrc = generatedImageDataUrl || generatedFixImage?.src || "";

  if (mode === "original" && !originalSrc) {
    setRequestStatus("ยังไม่มีรูปเก่าสำหรับดูภาพใหญ่", "error");
    return;
  }
  if (mode === "generated" && !generatedSrc) {
    setRequestStatus("ยังไม่มีรูปใหม่สำหรับดูภาพใหญ่", "error");
    return;
  }
  if (mode === "compare" && (!originalSrc || !generatedSrc)) {
    setRequestStatus("ต้องมีทั้งรูปเก่าและรูปใหม่ก่อนเปรียบเทียบ", "error");
    return;
  }

  auditImageModalTitle.textContent =
    mode === "compare" ? "เปรียบเทียบรูปเก่า / รูปใหม่" : mode === "generated" ? "รูปใหม่ที่ Generate" : "รูปเดิม";
  auditImageModalBody.innerHTML = mode === "compare"
    ? `
      <figure>
        <figcaption>รูปเดิม</figcaption>
        <img src="${originalSrc}" alt="รูปเดิม" />
      </figure>
      <figure>
        <figcaption>รูปใหม่</figcaption>
        <img src="${generatedSrc}" alt="รูปใหม่" />
      </figure>
    `
    : `<figure><img src="${mode === "generated" ? generatedSrc : originalSrc}" alt="ดูภาพใหญ่" /></figure>`;
  auditImageModal.hidden = false;
  document.body.classList.add("is-audit-modal-open");
}

function closeImageModal() {
  if (!auditImageModal) return;
  auditImageModal.hidden = true;
  if (auditImageModalBody) auditImageModalBody.innerHTML = "";
  document.body.classList.remove("is-audit-modal-open");
}

function renderAudit(data, options = {}) {
  currentAuditResult = data;
  setSkeletonVisible(false);
  setResultPanelsVisible(true);
  if (auditResultsGrid) {
    auditResultsGrid.classList.toggle("is-generated-comparison", Boolean(options.generatedMode));
  }
  if (generatedCard) {
    generatedCard.hidden = !options.generatedMode;
  }
  if (auditStatusBadge) auditStatusBadge.textContent = "Analyzed";
  if (auditScoreValue) auditScoreValue.textContent = String(data.overall_score ?? 0);
  if (auditScoreBar) auditScoreBar.style.width = `${Math.max(0, Math.min(100, Number(data.overall_score || 0)))}%`;
  if (auditPotential) auditPotential.textContent = data.creative_potential || "-";
  renderStars(data.overall_score || 0);

  if (auditSummaryList) auditSummaryList.innerHTML = listToHtml(data.summary_3_lines);

  if (primaryAudienceDemographic) primaryAudienceDemographic.textContent = data.primary_audience?.demographic || "-";
  if (primaryAudienceInterests) primaryAudienceInterests.textContent = (data.primary_audience?.interests || []).join(", ") || "-";
  if (primaryAudienceBehaviors) primaryAudienceBehaviors.textContent = (data.primary_audience?.behaviors || []).join(", ") || "-";
  if (primaryAudiencePain) primaryAudiencePain.textContent = (data.primary_audience?.pain_desire || []).join(", ") || "-";
  if (primaryAudienceSignals) primaryAudienceSignals.textContent = (data.primary_audience?.creative_signals || []).join(", ") || "-";

  if (secondaryAudienceList) {
    secondaryAudienceList.innerHTML = personaToHtml(data.secondary_audiences?.length ? data.secondary_audiences : [
      { title: "ไม่พบกลุ่มรองเด่นชัด", description: "โมเดลยังไม่แยก persona รองเพิ่มเติมจากภาพนี้" },
    ]);
  }

  if (audienceSizeNumber) {
    const min = formatAudienceNumber(data.audience_size_estimate?.min || 0);
    const max = formatAudienceNumber(data.audience_size_estimate?.max || 0);
    audienceSizeNumber.textContent = `${min} - ${max} คน`;
  }
  if (audienceSizeConfidence) audienceSizeConfidence.textContent = data.audience_size_estimate?.confidence || "-";
  if (audienceSizeRationale) audienceSizeRationale.textContent = data.audience_size_estimate?.rationale || "-";

  if (signalClarity) signalClarity.textContent = data.andromeda_signal_check?.clarity || "-";
  if (signalUnderstoodList) signalUnderstoodList.innerHTML = listToHtml(data.andromeda_signal_check?.understood_signals);
  if (signalConfusingList) signalConfusingList.innerHTML = listToHtml(data.andromeda_signal_check?.confusing_signals);

  Object.entries(metricMeta).forEach(([key]) => {
    renderMetric(key, data.category_scores?.[key]);
  });

  if (strengthsList) strengthsList.innerHTML = listToHtml(data.strengths);
  if (weaknessInsightGroup) weaknessInsightGroup.hidden = Boolean(options.generatedMode);
  if (fixesInsightGroup) fixesInsightGroup.hidden = Boolean(options.generatedMode);
  if (weaknessesList) weaknessesList.innerHTML = listToHtml(data.weaknesses);
  if (fixesList) fixesList.innerHTML = listToHtml(data.fixes_now);
  const generatedPrompt = buildFixPrompt(data);
  defaultFixPrompt = generatedPrompt;
  if (fixPromptOutput) fixPromptOutput.value = generatedPrompt;
  if (hookOptionsList) hookOptionsList.innerHTML = listToHtml(data.hook_options);

  if (finalVerdictStatus) finalVerdictStatus.textContent = data.final_verdict?.status || "-";
  if (finalVerdictReason) finalVerdictReason.textContent = data.final_verdict?.reason || "-";
}

function applyMockAudit() {
  renderAudit({
    overall_score: 78,
    creative_potential: "สูง",
    summary_3_lines: [
      "สื่อ pain และผลลัพธ์ได้ไว เห็นประโยชน์ใน 1-2 วินาที",
      "มี offer และ proof ดี แต่ CTA ยังไม่แรงพอ",
      "audience signal ค่อนข้างชัด แต่ยังเพิ่มความเฉพาะกลุ่มได้อีก",
    ],
    primary_audience: {
      demographic: "ผู้หญิง 18-30 ปี ในไทย",
      interests: ["Skincare", "Beauty", "Self-care", "รีวิว"],
      behaviors: ["ชอบคอนเทนต์ before/after", "อ่านรีวิว", "เทียบราคาและผลลัพธ์"],
      pain_desire: ["สิว", "รอยสิว", "ผิวหมอง", "อยากเห็นผลไว"],
      creative_signals: ["ข้อความผลลัพธ์", "ภาพนางแบบ", "ราคา", "รีวิว"],
    },
    secondary_audiences: [
      { title: "ผู้หญิง 25-35 ปี", description: "ทำงานออฟฟิศ สนใจผิวหน้าและการดูแลตัวเอง" },
      { title: "วัยรุ่น / นักศึกษา 16-22 ปี", description: "เริ่มมีสิว ชอบคอนเทนต์ TikTok / IG ที่เห็นผลไว" },
      { title: "ผู้ชาย 18-28 ปี", description: "เริ่มดูแลผิวและสนใจสินค้าที่ใช้ง่าย ราคาไม่แรง" },
    ],
    audience_size_estimate: {
      min: 1500000,
      max: 4000000,
      confidence: "กลาง-สูง",
      rationale: "ประเมินจาก creative signal และลักษณะ pain ที่กว้างพอในตลาดไทย",
    },
    andromeda_signal_check: {
      clarity: "ค่อนข้างชัด เหมาะกับ pain เรื่องสิว / ผิวใส / ผลลัพธ์เร็ว",
      understood_signals: ["ผู้หญิงวัยรุ่นถึงวัยทำงาน", "ปัญหาสิว ผิวไม่ใส", "ต้องการผลลัพธ์เร็ว"],
      confusing_signals: ["proof จริงยังน้อย", "รายละเอียดข้อกังวลยังตอบไม่ครบ", "CTA ยังไม่ชัดพอ"],
    },
    category_scores: {
      hook_scroll_stop: 13,
      audience_signal: 13,
      pain_desire_clarity: 9,
      offer_strength: 12,
      creative_clarity: 8,
      proof_trust: 7,
      objection_handling: 6,
      cta: 3,
      andromeda_readiness: 7,
    },
    strengths: [
      "เปิดภาพช่วยผลลัพธ์ชัด ดูน่าสนใจ",
      "สื่อ pain และ benefit ได้เร็ว",
      "มีราคาและรีวิวช่วยเพิ่มความน่าเชื่อถือ",
    ],
    weaknesses: [
      "ยังไม่มี handling objection มากพอ",
      "CTA ยังทั่วไป ไม่เร่งการตัดสินใจ",
      "proof เชิงลึกยังน้อยถ้าต้องการ scale",
    ],
    fixes_now: [
      "เพิ่ม before / after หรือรีวิว 1-2 เคส",
      "เพิ่มประโยคตอบข้อกังวล เช่น ผิวแพ้ง่ายใช้ได้ไหม",
      "ปรับ CTA ให้ชัดขึ้น เช่น ทักเพื่อรับโปรวันนี้",
    ],
    hook_options: [
      "สิวขึ้นทุกวัน? ลองตัวนี้ 7 วันเห็นผล",
      "ก่อนนอน 1 หยด ตื่นมาผิวใสขึ้น",
      "ผิวอ่อนล้า ฟื้นลุคให้ดูสดขึ้นเร็ว",
      "เซรั่มลดสิวที่ใช้แล้วอยากบอกต่อ",
      "ถ้าอยากผิวใสไว ลองเริ่มจากตัวนี้",
    ],
    final_verdict: {
      status: "ควรแก้ก่อนรัน",
      reason: "ภาพรวมดี แต่ควรเพิ่ม Proof, objection handling และ CTA ที่ชัดขึ้นก่อนยิงงบจริง",
    },
  });
}

async function analyzeWithBackend() {
  const endpoint = apiEndpointInput?.value?.trim();
  if (!endpoint) {
    setRequestStatus("กรุณาระบุ backend endpoint ก่อน", "error");
    return;
  }

  if (!selectedImageDataUrl) {
    setRequestStatus("กรุณาอัปโหลดรูปโฆษณาก่อนกดวิเคราะห์", "error");
    return;
  }

  if (!currentUser) {
    setRequestStatus("กรุณา Login Gmail ก่อนใช้งาน", "error");
    return;
  }

  let user = currentUser;
  if (!user) {
    setRequestStatus("กรุณา Login Gmail ก่อน Check Ads", "error");
    try {
      const credential = await signInWithGoogle();
      user = credential.user;
      currentUser = user;
      updateAdminUi();
    } catch {
      setRequestStatus("ยังไม่ได้ Login Gmail จึงยังส่งวิเคราะห์ไม่ได้", "error");
      return;
    }
  }

  let idToken = "";
  try {
    idToken = await user.getIdToken();
  } catch {
    setRequestStatus("ยืนยันสิทธิ์ Gmail ไม่สำเร็จ กรุณา Login ใหม่อีกครั้ง", "error");
    return;
  }

  const payload = {
    imageBase64: selectedImageDataUrl.split(",")[1],
    imagePreviewDataUrl: selectedImagePreviewDataUrl || "",
    mimeType: selectedMimeType,
    fileName: selectedFileName,
    fileSize: selectedFileSize,
    productName:
      productNameInput?.value?.trim() || AUTO_PRODUCT_PLACEHOLDER,
    targetMarket: targetMarketInput?.value?.trim() || "TH",
    objective: objectiveInput?.value?.trim() || "meta_ads_conversion",
    notes: notesInput?.value?.trim() || "-",
  };

  try {
    runAuditButton.disabled = true;
    setResultPanelsVisible(false);
    setSkeletonVisible(true);
    if (auditLoadingCallout) {
      auditLoadingCallout.textContent = "รอสักครู่ AI กำลังวิเคราะห์";
    }
    scrollToLoadingState();
    runAuditButton.textContent = "กำลังวิเคราะห์...";
    if (auditStatusBadge) auditStatusBadge.textContent = "Loading";
    setUpgradeNotice(false);
    setRequestStatus("กำลังส่งรูปไป backend เพื่อวิเคราะห์...", "loading");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(payload),
    });

    const raw = await response.text();
    let result = null;

    try {
      result = raw ? JSON.parse(raw) : {};
    } catch {
      throw new Error("backend ตอบกลับไม่ใช่ JSON ที่อ่านได้");
    }

    if (!response.ok) {
      const backendError = new Error(result?.error || "วิเคราะห์ไม่สำเร็จ");
      backendError.code = result?.code || "";
      backendError.upgradeUrl = result?.upgradeUrl || "";
      throw backendError;
    }

    renderAudit(result);
    setUsagePill(result.usage || null);
    const analyzedProductName = [result.history?.productName, payload.productName]
      .map((value) => String(value || "").trim())
      .find((value) => value && value !== AUTO_PRODUCT_PLACEHOLDER) || "สินค้าในภาพโฆษณา";
    if (previewOverlayTitle) previewOverlayTitle.textContent = analyzedProductName;
    if (previewOverlayText) previewOverlayText.textContent = "ชื่อสินค้าที่ใช้วิเคราะห์";
    if (result.history?.fromHistory) {
      setRequestStatus(`ไฟล์ชื่อนี้ (${result.history.fileName}) เคย Check ไปแล้ว ระบบดึงประวัติเดิมมาให้ดู`, "success");
    } else {
      const pointText = result.scoreAward?.awarded ? ` ได้รับ +${result.scoreAward.points} คะแนน` : "";
      setRequestStatus(`วิเคราะห์สำเร็จและบันทึกประวัติแล้ว${pointText}`, "success");
    }
  } catch (error) {
    setSkeletonVisible(false);
    if (auditStatusBadge) auditStatusBadge.textContent = "Error";
    await refreshUsage();
    if (error.code === "FREE_LIMIT_REACHED") {
      setUpgradeNotice(true, error.message || FREE_LIMIT_MESSAGE, error.upgradeUrl || PRO_UPGRADE_URL);
    }
    setRequestStatus(error.message || "เกิดข้อผิดพลาดระหว่างวิเคราะห์", "error");
  } finally {
    runAuditButton.disabled = false;
    updateCreditButtonLabels();
  }
}

adsImageInput?.addEventListener("change", async (event) => {
  if (freeLimitExhausted) {
    if (adsImageInput) adsImageInput.value = "";
    setUpgradeNotice(true);
    updateGuestGate();
    return;
  }

  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const dataUrl = await readImage(file);
    selectedImageDataUrl = dataUrl;
    selectedImagePreviewDataUrl = await createHistoryPreview(dataUrl).catch(() => "");
    selectedMimeType = file.type || "image/jpeg";
    selectedFileName = file.name || "";
    selectedFileSize = file.size || 0;
    const sourceImage = await loadImageFromDataUrl(dataUrl).catch(() => null);
    selectedImageWidth = sourceImage?.naturalWidth || 0;
    selectedImageHeight = sourceImage?.naturalHeight || 0;
    if (adsPreviewImage) adsPreviewImage.src = dataUrl;
    if (uploadPreviewImage) uploadPreviewImage.src = dataUrl;
    if (previewOverlayTitle) previewOverlayTitle.textContent = "ภาพพร้อมวิเคราะห์";
    if (previewOverlayText) previewOverlayText.textContent = `ไฟล์: ${file.name} พร้อมแสดงค้างไว้และใช้วิเคราะห์ทันที`;
    if (auditStatusBadge) auditStatusBadge.textContent = "Uploaded";
    setUpgradeNotice(false);
    setRequestStatus("อัปโหลดรูปแล้ว กดวิเคราะห์เลยได้ทันที", "success");
  } catch {
    initUploadUi();
    setDefaultPreview();
    setRequestStatus("อ่านไฟล์รูปไม่สำเร็จ", "error");
  }
});

clearAdsImageButton?.addEventListener("click", () => {
  if (adsImageInput) adsImageInput.value = "";
  generatedImageDataUrl = "";
  generatedImageFileName = "generated-ad-fix.png";
  if (auditResultsGrid) auditResultsGrid.classList.remove("is-generated-comparison");
  if (generatedCard) generatedCard.hidden = true;
  if (generatedFixImage) {
    generatedFixImage.hidden = true;
    generatedFixImage.removeAttribute("src");
  }
  if (viewGeneratedImageButton) viewGeneratedImageButton.hidden = true;
  if (compareImagesButton) compareImagesButton.hidden = true;
  if (downloadGeneratedImageButton) downloadGeneratedImageButton.hidden = true;
  initUploadUi();
  setDefaultPreview();
  applyMockAudit();
  setResultPanelsVisible(false);
});

runAuditButton?.addEventListener("click", analyzeWithBackend);
copyFixPromptButton?.addEventListener("click", copyFixPrompt);
generateFixImageButton?.addEventListener("click", generateFixImage);

heroLoginButton?.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch {
    setRequestStatus("Login Gmail ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
  }
});

watchAuth(async ({ user }) => {
  currentUser = user;
  updateAdminUi();
  await refreshUsage();
});

ensureAuditUiEnhancements();
resetFixPromptButton?.addEventListener("click", resetFixPrompt);
viewOriginalImageButton?.addEventListener("click", () => openImageModal("original"));
viewGeneratedImageButton?.addEventListener("click", () => openImageModal("generated"));
compareImagesButton?.addEventListener("click", () => openImageModal("compare"));
downloadGeneratedImageButton?.addEventListener("click", downloadGeneratedImage);

initUploadUi();
setDefaultPreview();
applyMockAudit();
setResultPanelsVisible(false);
setSkeletonVisible(false);
