import { signInWithGoogle, watchAuth } from "./auth-shared.js";

const adsImageInput = document.querySelector("#adsImageInput");
const clearAdsImageButton = document.querySelector("#clearAdsImageButton");
const uploadTrigger = document.querySelector("#uploadTrigger");
const heroLoginButton = document.querySelector("#heroLoginButton");
const auditGuestNotice = document.querySelector("#auditGuestNotice");
const auditUploadCard = document.querySelector("#auditUploadCard");
const auditUploadHint = document.querySelector("#auditUploadHint");
const auditSkeletonGrid = document.querySelector("#auditSkeletonGrid");
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
const hookOptionsList = document.querySelector("#hookOptionsList");
const finalVerdictStatus = document.querySelector("#finalVerdictStatus");
const finalVerdictReason = document.querySelector("#finalVerdictReason");
const auditStars = document.querySelector("#auditStars");
const AD_CHECK_USAGE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/getAdCheckUsage";

let selectedImageDataUrl = "";
let selectedMimeType = "image/jpeg";
let selectedFileName = "";
let selectedFileSize = 0;
let currentUser = null;
let usagePill = null;
let uploadPreviewImage = null;
let uploadDropzone = null;

const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const PRO_UPGRADE_URL = "https://www.facebook.com/AiCreativesN/";
const FREE_LIMIT_MESSAGE =
  "เนเธเนเธชเธดเธ—เธเธดเนเธ•เธฃเธงเธเน€เธเนเธเธเธฃเธตเธเธฃเธเนเธฅเนเธง เธซเธฒเธเธ•เนเธญเธเธเธฒเธฃเธ•เธฃเธงเธเธชเธญเธเน€เธเธดเนเธกเน€เธ•เธดเธก เธ•เธดเธ”เธ•เนเธญ Admin Page เน€เธเธทเนเธญเธญเธฑเธเน€เธเธฃเธ”เน€เธเนเธ Pro 290 เธเธฒเธ—เธ•เนเธญเน€เธ”เธทเธญเธ เธฃเธฑเธเธชเธดเธ—เธเธดเนเนเธเนเน€เธเธฃเธทเนเธญเธเธกเธทเธญ Check Ads เนเธ”เนเธงเธฑเธเธฅเธฐ 10 เธเธฃเธฑเนเธ เธเธฃเนเธญเธกเน€เธเนเธฒเธ–เธถเธเธเธญเธฃเนเธชเน€เธฃเธตเธขเธ AI เธกเธฒเธเธเธงเนเธฒ 20 เธเธ— เนเธฅเธฐเน€เธเธฃเธทเนเธญเธเธกเธทเธญ AI เนเธซเธกเน เน เนเธเธญเธเธฒเธเธ•";

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

function setUpgradeNotice(visible, message = FREE_LIMIT_MESSAGE, url = PRO_UPGRADE_URL) {
  if (!auditUpgradeNotice) return;
  auditUpgradeNotice.hidden = !visible;
  const copy = auditUpgradeNotice.querySelector("p");
  if (copy) copy.textContent = message;
  if (auditUpgradeLink) auditUpgradeLink.href = url || PRO_UPGRADE_URL;
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
  usagePill.textContent = usage.label || "";
}

function isAdminUser(user) {
  return ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase());
}

function setResultPanelsVisible(visible) {
  if (auditResultsGrid) auditResultsGrid.hidden = !visible;
}

function setSkeletonVisible(visible) {
  if (auditSkeletonGrid) {
    auditSkeletonGrid.hidden = !visible;
    auditSkeletonGrid.setAttribute("aria-hidden", visible ? "false" : "true");
  }
}

function updateGuestGate() {
  const loggedIn = Boolean(currentUser);
  if (uploadTrigger) uploadTrigger.hidden = !loggedIn;
  if (runAuditButton) runAuditButton.hidden = !loggedIn;
  if (clearAdsImageButton) clearAdsImageButton.hidden = !loggedIn;
  if (auditGuestNotice) auditGuestNotice.hidden = loggedIn;
  if (auditUploadCard) auditUploadCard.dataset.locked = loggedIn ? "false" : "true";
  if (uploadDropzone) uploadDropzone.dataset.locked = loggedIn ? "false" : "true";
  if (auditUploadHint) {
    auditUploadHint.textContent = loggedIn
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
  updateGuestGate();
}

function initUploadUi() {
  if (!auditUploadCard) return;

  uploadDropzone = document.querySelector("#auditUploadDropzone");
  uploadPreviewImage = document.querySelector("#auditSelectedImage");
  usagePill = document.querySelector("#auditUsagePill");

  if (!uploadDropzone) return;

  uploadDropzone.addEventListener("click", () => {
    if (currentUser) adsImageInput?.click();
  });

  uploadDropzone.addEventListener("keydown", (event) => {
    if (!currentUser) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      adsImageInput?.click();
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
  selectedMimeType = "image/jpeg";
  selectedFileName = "";
  selectedFileSize = 0;
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

async function refreshUsage() {
  if (!currentUser) {
    setUsagePill(null);
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
    setUsagePill(result.usage || null);
  } catch {
    setUsagePill(null);
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

function formatCompactNumber(value) {
  const number = Number(value || 0);
  if (number >= 1000000) return `${(number / 1000000).toFixed(number % 1000000 === 0 ? 0 : 1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(number % 1000 === 0 ? 0 : 1)}K`;
  return String(number);
}

function renderStars(score) {
  if (!auditStars) return;
  const filled = Math.max(1, Math.min(5, Math.round(Number(score || 0) / 20)));
  auditStars.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const isOff = index >= filled ? ' class="is-off"' : "";
    return `<span${isOff}>โ…</span>`;
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

function renderAudit(data) {
  setSkeletonVisible(false);
  setResultPanelsVisible(true);
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
      { title: "เนเธกเนเธเธเธเธฅเธธเนเธกเธฃเธญเธเน€เธ”เนเธเธเธฑเธ”", description: "เนเธกเน€เธ”เธฅเธขเธฑเธเนเธกเนเนเธขเธ persona เธฃเธญเธเน€เธเธดเนเธกเน€เธ•เธดเธกเธเธฒเธเธ เธฒเธเธเธตเน" },
    ]);
  }

  if (audienceSizeNumber) {
    const min = formatCompactNumber(data.audience_size_estimate?.min || 0);
    const max = formatCompactNumber(data.audience_size_estimate?.max || 0);
    audienceSizeNumber.textContent = `${min} - ${max}`;
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
  if (weaknessesList) weaknessesList.innerHTML = listToHtml(data.weaknesses);
  if (fixesList) fixesList.innerHTML = listToHtml(data.fixes_now);
  if (hookOptionsList) hookOptionsList.innerHTML = listToHtml(data.hook_options);

  if (finalVerdictStatus) finalVerdictStatus.textContent = data.final_verdict?.status || "-";
  if (finalVerdictReason) finalVerdictReason.textContent = data.final_verdict?.reason || "-";
}

function applyMockAudit() {
  renderAudit({
    overall_score: 78,
    creative_potential: "เธชเธนเธ",
    summary_3_lines: [
      "เธชเธทเนเธญ pain เนเธฅเธฐเธเธฅเธฅเธฑเธเธเนเนเธ”เนเนเธง เน€เธซเนเธเธเธฃเธฐเนเธขเธเธเนเนเธ 1-2 เธงเธดเธเธฒเธ—เธต",
      "เธกเธต offer เนเธฅเธฐ proof เธ”เธต เนเธ•เน CTA เธขเธฑเธเนเธกเนเนเธฃเธเธเธญ",
      "audience signal เธเนเธญเธเธเนเธฒเธเธเธฑเธ” เนเธ•เนเธขเธฑเธเน€เธเธดเนเธกเธเธงเธฒเธกเน€เธเธเธฒเธฐเธเธฅเธธเนเธกเนเธ”เนเธญเธตเธ",
    ],
    primary_audience: {
      demographic: "เธเธนเนเธซเธเธดเธ 18-30 เธเธต เนเธเนเธ—เธข",
      interests: ["Skincare", "Beauty", "Self-care", "เธฃเธตเธงเธดเธง"],
      behaviors: ["เธเธญเธเธเธญเธเน€เธ—เธเธ•เน before/after", "เธญเนเธฒเธเธฃเธตเธงเธดเธง", "เน€เธ—เธตเธขเธเธฃเธฒเธเธฒเนเธฅเธฐเธเธฅเธฅเธฑเธเธเน"],
      pain_desire: ["เธชเธดเธง", "เธฃเธญเธขเธชเธดเธง", "เธเธดเธงเธซเธกเธญเธ", "เธญเธขเธฒเธเน€เธซเนเธเธเธฅเนเธง"],
      creative_signals: ["เธเนเธญเธเธงเธฒเธกเธเธฅเธฅเธฑเธเธเน", "เธ เธฒเธเธเธฒเธเนเธเธ", "เธฃเธฒเธเธฒ", "เธฃเธตเธงเธดเธง"],
    },
    secondary_audiences: [
      { title: "เธเธนเนเธซเธเธดเธ 25-35 เธเธต", description: "เธ—เธณเธเธฒเธเธญเธญเธเธเธดเธจ เธชเธเนเธเธเธดเธงเธซเธเนเธฒเนเธฅเธฐเธเธฒเธฃเธ”เธนเนเธฅเธ•เธฑเธงเน€เธญเธ" },
      { title: "เธงเธฑเธขเธฃเธธเนเธ / เธเธฑเธเธจเธถเธเธฉเธฒ 16-22 เธเธต", description: "เน€เธฃเธดเนเธกเธกเธตเธชเธดเธง เธเธญเธเธเธญเธเน€เธ—เธเธ•เน TikTok / IG เธ—เธตเนเน€เธซเนเธเธเธฅเนเธง" },
      { title: "เธเธนเนเธเธฒเธข 18-28 เธเธต", description: "เน€เธฃเธดเนเธกเธ”เธนเนเธฅเธเธดเธงเนเธฅเธฐเธชเธเนเธเธชเธดเธเธเนเธฒเธ—เธตเนเนเธเนเธเนเธฒเธข เธฃเธฒเธเธฒเนเธกเนเนเธฃเธ" },
    ],
    audience_size_estimate: {
      min: 1500000,
      max: 4000000,
      confidence: "เธเธฅเธฒเธ-เธชเธนเธ",
      rationale: "เธเธฃเธฐเน€เธกเธดเธเธเธฒเธ creative signal เนเธฅเธฐเธฅเธฑเธเธฉเธ“เธฐ pain เธ—เธตเนเธเธงเนเธฒเธเธเธญเนเธเธ•เธฅเธฒเธ”เนเธ—เธข",
    },
    andromeda_signal_check: {
      clarity: "เธเนเธญเธเธเนเธฒเธเธเธฑเธ” เน€เธซเธกเธฒเธฐเธเธฑเธ pain เน€เธฃเธทเนเธญเธเธชเธดเธง / เธเธดเธงเนเธช / เธเธฅเธฅเธฑเธเธเนเน€เธฃเนเธง",
      understood_signals: ["เธเธนเนเธซเธเธดเธเธงเธฑเธขเธฃเธธเนเธเธ–เธถเธเธงเธฑเธขเธ—เธณเธเธฒเธ", "เธเธฑเธเธซเธฒเธชเธดเธง เธเธดเธงเนเธกเนเนเธช", "เธ•เนเธญเธเธเธฒเธฃเธเธฅเธฅเธฑเธเธเนเน€เธฃเนเธง"],
      confusing_signals: ["proof เธเธฃเธดเธเธขเธฑเธเธเนเธญเธข", "เธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเนเธญเธเธฑเธเธงเธฅเธขเธฑเธเธ•เธญเธเนเธกเนเธเธฃเธ", "CTA เธขเธฑเธเนเธกเนเธเธฑเธ”เธเธญ"],
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
      "เน€เธเธดเธ”เธ เธฒเธเธเนเธงเธขเธเธฅเธฅเธฑเธเธเนเธเธฑเธ” เธ”เธนเธเนเธฒเธชเธเนเธ",
      "เธชเธทเนเธญ pain เนเธฅเธฐ benefit เนเธ”เนเน€เธฃเนเธง",
      "เธกเธตเธฃเธฒเธเธฒเนเธฅเธฐเธฃเธตเธงเธดเธงเธเนเธงเธขเน€เธเธดเนเธกเธเธงเธฒเธกเธเนเธฒเน€เธเธทเนเธญเธ–เธทเธญ",
    ],
    weaknesses: [
      "เธขเธฑเธเนเธกเนเธกเธต handling objection เธกเธฒเธเธเธญ",
      "CTA เธขเธฑเธเธ—เธฑเนเธงเนเธ เนเธกเนเน€เธฃเนเธเธเธฒเธฃเธ•เธฑเธ”เธชเธดเธเนเธ",
      "proof เน€เธเธดเธเธฅเธถเธเธขเธฑเธเธเนเธญเธขเธ–เนเธฒเธ•เนเธญเธเธเธฒเธฃ scale",
    ],
    fixes_now: [
      "เน€เธเธดเนเธก before / after เธซเธฃเธทเธญเธฃเธตเธงเธดเธง 1-2 เน€เธเธช",
      "เน€เธเธดเนเธกเธเธฃเธฐเนเธขเธเธ•เธญเธเธเนเธญเธเธฑเธเธงเธฅ เน€เธเนเธ เธเธดเธงเนเธเนเธเนเธฒเธขเนเธเนเนเธ”เนเนเธซเธก",
      "เธเธฃเธฑเธ CTA เนเธซเนเธเธฑเธ”เธเธถเนเธ เน€เธเนเธ เธ—เธฑเธเน€เธเธทเนเธญเธฃเธฑเธเนเธเธฃเธงเธฑเธเธเธตเน",
    ],
    hook_options: [
      "เธชเธดเธงเธเธถเนเธเธ—เธธเธเธงเธฑเธ? เธฅเธญเธเธ•เธฑเธงเธเธตเน 7 เธงเธฑเธเน€เธซเนเธเธเธฅ",
      "เธเนเธญเธเธเธญเธ 1 เธซเธขเธ” เธ•เธทเนเธเธกเธฒเธเธดเธงเนเธชเธเธถเนเธ",
      "เธเธดเธงเธญเนเธญเธเธฅเนเธฒ เธเธทเนเธเธฅเธธเธเนเธซเนเธ”เธนเธชเธ”เธเธถเนเธเน€เธฃเนเธง",
      "เน€เธเธฃเธฑเนเธกเธฅเธ”เธชเธดเธงเธ—เธตเนเนเธเนเนเธฅเนเธงเธญเธขเธฒเธเธเธญเธเธ•เนเธญ",
      "เธ–เนเธฒเธญเธขเธฒเธเธเธดเธงเนเธชเนเธง เธฅเธญเธเน€เธฃเธดเนเธกเธเธฒเธเธ•เธฑเธงเธเธตเน",
    ],
    final_verdict: {
      status: "เธเธงเธฃเนเธเนเธเนเธญเธเธฃเธฑเธ",
      reason: "เธ เธฒเธเธฃเธงเธกเธ”เธต เนเธ•เนเธเธงเธฃเน€เธเธดเนเธก Proof, objection handling เนเธฅเธฐ CTA เธ—เธตเนเธเธฑเธ”เธเธถเนเธเธเนเธญเธเธขเธดเธเธเธเธเธฃเธดเธ",
    },
  });
}

async function analyzeWithBackend() {
  const endpoint = apiEndpointInput?.value?.trim();
  if (!endpoint) {
    setRequestStatus("เธเธฃเธธเธ“เธฒเธฃเธฐเธเธธ backend endpoint เธเนเธญเธ", "error");
    return;
  }

  if (!selectedImageDataUrl) {
    setRequestStatus("เธเธฃเธธเธ“เธฒเธญเธฑเธเนเธซเธฅเธ”เธฃเธนเธเนเธเธฉเธ“เธฒเธเนเธญเธเธเธ”เธงเธดเน€เธเธฃเธฒเธฐเธซเน", "error");
    return;
  }

  if (!currentUser) {
    setRequestStatus("เธเธฃเธธเธ“เธฒ Login Gmail เธเนเธญเธเนเธเนเธเธฒเธ", "error");
    return;
  }

  let user = currentUser;
  if (!user) {
    setRequestStatus("เธเธฃเธธเธ“เธฒ Login Gmail เธเนเธญเธ Check Ads", "error");
    try {
      const credential = await signInWithGoogle();
      user = credential.user;
      currentUser = user;
      updateAdminUi();
    } catch {
      setRequestStatus("เธขเธฑเธเนเธกเนเนเธ”เน Login Gmail เธเธถเธเธขเธฑเธเธชเนเธเธงเธดเน€เธเธฃเธฒเธฐเธซเนเนเธกเนเนเธ”เน", "error");
      return;
    }
  }

  let idToken = "";
  try {
    idToken = await user.getIdToken();
  } catch {
    setRequestStatus("เธขเธทเธเธขเธฑเธเธชเธดเธ—เธเธดเน Gmail เนเธกเนเธชเธณเน€เธฃเนเธ เธเธฃเธธเธ“เธฒ Login เนเธซเธกเนเธญเธตเธเธเธฃเธฑเนเธ", "error");
    return;
  }

  const payload = {
    imageBase64: selectedImageDataUrl.split(",")[1],
    mimeType: selectedMimeType,
    fileName: selectedFileName,
    fileSize: selectedFileSize,
    productName:
      productNameInput?.value?.trim() || "เนเธซเน AI เธ”เธนเธเธฒเธเธ เธฒเธเนเธเธฉเธ“เธฒเนเธฅเธฐเธฃเธฐเธเธธเธเธทเนเธญเธชเธดเธเธเนเธฒเธซเธฃเธทเธญเธเธฃเธฐเน€เธ เธ—เธชเธดเธเธเนเธฒเธ—เธตเนเนเธเธฅเนเน€เธเธตเธขเธเธ—เธตเนเธชเธธเธ”",
    targetMarket: targetMarketInput?.value?.trim() || "TH",
    objective: objectiveInput?.value?.trim() || "meta_ads_conversion",
    notes: notesInput?.value?.trim() || "-",
  };

  try {
    runAuditButton.disabled = true;
    setResultPanelsVisible(false);
    setSkeletonVisible(true);
    runAuditButton.textContent = "เธเธณเธฅเธฑเธเธงเธดเน€เธเธฃเธฒเธฐเธซเน...";
    if (auditStatusBadge) auditStatusBadge.textContent = "Loading";
    setUpgradeNotice(false);
    setRequestStatus("เธเธณเธฅเธฑเธเธชเนเธเธฃเธนเธเนเธ backend เน€เธเธทเนเธญเธงเธดเน€เธเธฃเธฒเธฐเธซเน...", "loading");

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
      throw new Error("backend เธ•เธญเธเธเธฅเธฑเธเนเธกเนเนเธเน JSON เธ—เธตเนเธญเนเธฒเธเนเธ”เน");
    }

    if (!response.ok) {
      const backendError = new Error(result?.error || "เธงเธดเน€เธเธฃเธฒเธฐเธซเนเนเธกเนเธชเธณเน€เธฃเนเธ");
      backendError.code = result?.code || "";
      backendError.upgradeUrl = result?.upgradeUrl || "";
      throw backendError;
    }

    renderAudit(result);
    setUsagePill(result.usage || null);
    if (previewOverlayTitle) previewOverlayTitle.textContent = "วิเคราะห์จาก OpenAI สำเร็จ";
    if (previewOverlayText) previewOverlayText.textContent = "ผลลัพธ์หน้านี้ถูกเติมจาก JSON response ที่ backend ส่งกลับมาแล้ว";
    if (result.history?.fromHistory) {
      setRequestStatus(`ไฟล์ชื่อนี้ (${result.history.fileName}) เคย Check ไปแล้ว ระบบดึงประวัติเดิมมาให้ดู`, "success");
    } else {
      setRequestStatus("วิเคราะห์สำเร็จและบันทึกประวัติแล้ว", "success");
    }
  } catch (error) {
    setSkeletonVisible(false);
    if (auditStatusBadge) auditStatusBadge.textContent = "Error";
    await refreshUsage();
    if (error.code === "FREE_LIMIT_REACHED") {
      setUpgradeNotice(true, error.message || FREE_LIMIT_MESSAGE, error.upgradeUrl || PRO_UPGRADE_URL);
    }
    setRequestStatus(error.message || "เน€เธเธดเธ”เธเนเธญเธเธดเธ”เธเธฅเธฒเธ”เธฃเธฐเธซเธงเนเธฒเธเธงเธดเน€เธเธฃเธฒเธฐเธซเน", "error");
  } finally {
    runAuditButton.disabled = false;
    runAuditButton.textContent = "วิเคราะห์เลย";
  }
}

adsImageInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const dataUrl = await readImage(file);
    selectedImageDataUrl = dataUrl;
    selectedMimeType = file.type || "image/jpeg";
    selectedFileName = file.name || "";
    selectedFileSize = file.size || 0;
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
    setRequestStatus("เธญเนเธฒเธเนเธเธฅเนเธฃเธนเธเนเธกเนเธชเธณเน€เธฃเนเธ", "error");
  }
});

clearAdsImageButton?.addEventListener("click", () => {
  if (adsImageInput) adsImageInput.value = "";
  initUploadUi();
  setDefaultPreview();
  applyMockAudit();
  setResultPanelsVisible(false);
});

runAuditButton?.addEventListener("click", analyzeWithBackend);

heroLoginButton?.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch {
    setRequestStatus("Login Gmail เนเธกเนเธชเธณเน€เธฃเนเธ เธเธฃเธธเธ“เธฒเธฅเธญเธเนเธซเธกเนเธญเธตเธเธเธฃเธฑเนเธ", "error");
  }
});

watchAuth(async ({ user }) => {
  currentUser = user;
  updateAdminUi();
  await refreshUsage();
});

initUploadUi();
setDefaultPreview();
applyMockAudit();
setResultPanelsVisible(false);
setSkeletonVisible(false);
