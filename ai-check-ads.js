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
  "ใช้สิทธิ์ตรวจเช็คฟรีครบแล้ว หากต้องการตรวจสอบเพิ่มเติม ติดต่อ Admin Page เพื่ออัปเกรดเป็น Pro 290 บาทต่อเดือน รับสิทธิ์ใช้เครื่องมือ Check Ads ได้วันละ 10 ครั้ง พร้อมคอร์สเรียน AI มากกว่า 20 บท และเครื่องมือ AI ใหม่ ๆ ในอนาคต";

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
      { title: "ไม่พบกลุ่มรองเด่นชัด", description: "โมเดลยังไม่แยก persona รองเพิ่มเติมจากภาพนี้" },
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
    mimeType: selectedMimeType,
    fileName: selectedFileName,
    fileSize: selectedFileSize,
    productName:
      productNameInput?.value?.trim() || "ให้ AI ดูจากภาพโฆษณาและระบุชื่อสินค้าหรือประเภทสินค้าที่ใกล้เคียงที่สุด",
    targetMarket: targetMarketInput?.value?.trim() || "TH",
    objective: objectiveInput?.value?.trim() || "meta_ads_conversion",
    notes: notesInput?.value?.trim() || "-",
  };

  try {
    runAuditButton.disabled = true;
    setResultPanelsVisible(false);
    setSkeletonVisible(true);
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
    setRequestStatus(error.message || "เกิดข้อผิดพลาดระหว่างวิเคราะห์", "error");
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
    setRequestStatus("อ่านไฟล์รูปไม่สำเร็จ", "error");
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
    setRequestStatus("Login Gmail ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", "error");
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
