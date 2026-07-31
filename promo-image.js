import { collection, getDocs, limit, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices, signInWithGoogle, watchAuth } from "./auth-shared.js";

const USAGE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/getAdCheckUsage";
const GENERATE_PROMO_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/generatePromoImage";
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);

const promoGuestNotice = document.querySelector("#promoGuestNotice");
const promoLoginButton = document.querySelector("#promoLoginButton");
const promoUsagePill = document.querySelector("#promoUsagePill");
const promoDropzone = document.querySelector("#promoDropzone");
const promoImageInput = document.querySelector("#promoImageInput");
const promoPreviewPanel = document.querySelector("#promoPreviewPanel");
const promoPreviewImage = document.querySelector("#promoPreviewImage");
const promoClearImageButton = document.querySelector("#promoClearImageButton");
const promoProductName = document.querySelector("#promoProductName");
const promoPrice = document.querySelector("#promoPrice");
const promoDetails = document.querySelector("#promoDetails");
const promoStyle = document.querySelector("#promoStyle");
const promoAspectRatio = document.querySelector("#promoAspectRatio");
const promoReferenceInput = document.querySelector("#promoReferenceInput");
const promoReferenceList = document.querySelector("#promoReferenceList");
const generatePromoButton = document.querySelector("#generatePromoButton");
const promoRequestStatus = document.querySelector("#promoRequestStatus");
const promoLoadingPanel = document.querySelector("#promoLoadingPanel");
const promoResultCard = document.querySelector("#promoResultCard");
const promoResultImage = document.querySelector("#promoResultImage");
const downloadPromoImageButton = document.querySelector("#downloadPromoImageButton");
const copyPromoPromptButton = document.querySelector("#copyPromoPromptButton");
const promoPromptOutput = document.querySelector("#promoPromptOutput");
const promoHistoryList = document.querySelector("#promoHistoryList");
const promoHistoryCount = document.querySelector("#promoHistoryCount");
const promoDetailModal = document.querySelector("#promoDetailModal");
const promoDetailDialog = promoDetailModal?.querySelector(".promo-detail-dialog");
const promoDetailImage = document.querySelector("#promoDetailImage");
const promoDetailImageEmpty = document.querySelector("#promoDetailImageEmpty");
const promoDetailSourceImage = document.querySelector("#promoDetailSourceImage");
const promoDetailSourceCard = promoDetailSourceImage?.closest(".promo-detail-source-card");
const promoDetailTitle = document.querySelector("#promoDetailTitle");
const promoDetailMeta = document.querySelector("#promoDetailMeta");
const promoDetailPrompt = document.querySelector("#promoDetailPrompt");
const copyHistoryPromptButton = document.querySelector("#copyHistoryPromptButton");
const reuseHistoryButton = document.querySelector("#reuseHistoryButton");
const promoFormCard = document.querySelector("#promoFormCard");

let currentUser = null;
let promoUsage = null;
let promoUsageState = "idle";
let isGeneratingPromo = false;
let historyItems = [];
let activeHistoryItem = null;
let selectedImageDataUrl = "";
let selectedImagePreviewDataUrl = "";
let selectedFileName = "";
let selectedMimeType = "";
let selectedImageWidth = 0;
let selectedImageHeight = 0;
let selectedReferenceImages = [];

function setStatus(message, tone = "") {
  if (!promoRequestStatus) return;
  promoRequestStatus.textContent = message;
  promoRequestStatus.dataset.tone = tone;
}

function updateGenerateState() {
  const hasRequiredText = promoProductName?.value.trim() && promoDetails?.value.trim();
  const ready = Boolean(
    currentUser && selectedImageDataUrl && hasRequiredText && hasAvailablePromoCredit() && !isGeneratingPromo,
  );
  if (generatePromoButton) {
    generatePromoButton.disabled = !ready;
  }
  updateCreditButtonLabel();
}

function isAdminUser(user) {
  return ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase());
}

function hasAvailablePromoCredit() {
  return Boolean(
    isAdminUser(currentUser) ||
      (promoUsageState === "ready" &&
        (Number(promoUsage?.remaining || 0) > 0 || Number(promoUsage?.credits || 0) > 0)),
  );
}

function applyPromoUsage(usage) {
  promoUsage = usage || null;
  promoUsageState = promoUsage ? "ready" : "error";
  if (promoUsagePill) {
    promoUsagePill.textContent =
      promoUsage?.plan === "admin"
        ? "Admin ไม่ใช้ Credit"
        : promoUsage?.label || `Credit คงเหลือ ${promoUsage?.credits || 0}`;
    promoUsagePill.dataset.plan = promoUsage?.plan || "free";
  }
  updateGenerateState();
}

function updateCreditButtonLabel() {
  if (!generatePromoButton) return;
  if (isGeneratingPromo) {
    generatePromoButton.textContent = "กำลัง Generate รูป...";
  } else if (isAdminUser(currentUser)) {
    generatePromoButton.textContent = "Generate รูป (Admin ไม่ใช้ Credit)";
  } else if (currentUser && promoUsageState === "loading") {
    generatePromoButton.textContent = "กำลังตรวจสอบ Credit...";
  } else if (currentUser && promoUsageState === "error") {
    generatePromoButton.textContent = "ตรวจสอบ Credit ไม่สำเร็จ";
  } else if (
    currentUser &&
    promoUsageState === "ready" &&
    Number(promoUsage?.remaining || 0) <= 0 &&
    Number(promoUsage?.credits || 0) <= 0
  ) {
    generatePromoButton.textContent = "Credit หมด กรุณาเติม Credit";
  } else {
    generatePromoButton.textContent = "Generate รูป ใช้ 1 Credit";
  }
}

function normalizeAspectRatio(value) {
  const text = String(value || "").trim().toLowerCase().replace("x", ":");
  const match = text.match(/^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)$/);
  if (!match) return "";
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return "";
  return `${match[1]}:${match[2]}`;
}

function renderReferenceImages() {
  if (!promoReferenceList) return;
  promoReferenceList.hidden = selectedReferenceImages.length === 0;
  promoReferenceList.innerHTML = selectedReferenceImages
    .map(
      (item, index) => `
        <div class="promo-reference-chip">
          <img src="${item.previewDataUrl || item.dataUrl}" alt="" />
          <span>${escapeHtml(item.fileName || `Ref ${index + 1}`)}</span>
          <button type="button" data-remove-reference="${index}" aria-label="ลบรูปอ้างอิง">×</button>
        </div>
      `,
    )
    .join("");
}

async function loadUsage() {
  if (!currentUser || !promoUsagePill) return;
  promoUsage = null;
  promoUsageState = "loading";
  promoUsagePill.textContent = "กำลังตรวจสอบ Credit...";
  updateGenerateState();
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch(USAGE_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || "โหลด Credit ไม่สำเร็จ");
    applyPromoUsage(data.usage || data);
  } catch (error) {
    promoUsage = null;
    promoUsageState = "error";
    promoUsagePill.textContent = error.message || "โหลด Credit ไม่สำเร็จ";
    promoUsagePill.dataset.plan = "free";
    setStatus("ตรวจสอบ Credit ไม่สำเร็จ กรุณารีเฟรชหน้าแล้วลองอีกครั้ง", "error");
  } finally {
    updateGenerateState();
  }
}

function formatHistoryDate(value) {
  const date = value?.toDate?.() || (value ? new Date(value) : null);
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("th-TH", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getHistoryResultImage(item) {
  return item?.generatedImagePreviewDataUrl || item?.generatedImageUrl || item?.imageDataUrl || "";
}

function getHistorySourceImage(item) {
  return item?.sourceImagePreviewDataUrl || item?.imagePreviewDataUrl || "";
}

function renderHistory(items) {
  if (!promoHistoryList) return;
  historyItems = items;
  if (promoHistoryCount) promoHistoryCount.textContent = `${items.length} รายการ`;
  if (!items.length) {
    promoHistoryList.innerHTML = '<p class="promo-history-empty">ยังไม่มีประวัติ Generate รูป</p>';
    return;
  }

  promoHistoryList.innerHTML = items
    .map((item) => {
      const title = escapeHtml(item.productName || "รูปโปรโมท");
      const subtitle = escapeHtml([item.price, item.style].filter(Boolean).join(" · ") || item.fileName || "");
      const image = getHistoryResultImage(item) || getHistorySourceImage(item);
      const safeDate = escapeHtml(formatHistoryDate(item.createdAt));
      const safeId = escapeHtml(item.id || "");
      return `
        <button class="promo-history-item" type="button" data-history-id="${safeId}">
          <div class="promo-history-thumb">
            ${image ? `<img src="${image}" alt="" loading="lazy" />` : "<span>AI</span>"}
          </div>
          <div>
            <strong>${title}</strong>
            <p>${subtitle}</p>
            <small>${safeDate}</small>
          </div>
        </button>
      `;
    })
    .join("");
}

function openHistoryDetail(item) {
  if (!item || !promoDetailModal) return;
  activeHistoryItem = item;
  const resultImage = getHistoryResultImage(item);
  const sourceImage = getHistorySourceImage(item);
  const title = item.productName || "รูปโปรโมท";
  if (promoDetailImage) {
    promoDetailImage.src = resultImage || "";
    promoDetailImage.hidden = !resultImage;
  }
  if (promoDetailImageEmpty) {
    promoDetailImageEmpty.hidden = Boolean(resultImage);
  }
  if (promoDetailSourceImage) {
    promoDetailSourceImage.src = sourceImage || "";
    promoDetailSourceImage.hidden = !sourceImage;
  }
  if (promoDetailSourceCard) {
    promoDetailSourceCard.hidden = !sourceImage;
  }
  if (promoDetailTitle) promoDetailTitle.textContent = title;
  if (promoDetailPrompt) promoDetailPrompt.value = item.prompt || "ไม่มีข้อมูล Prompt ในรายการนี้";
  if (promoDetailMeta) {
    const rows = [
      ["ราคา / โปรโมชัน", item.price || "-"],
      ["สไตล์", item.style || "-"],
      ["ไฟล์", item.fileName || "-"],
      ["เวลา", formatHistoryDate(item.createdAt) || "-"],
    ];
    promoDetailMeta.innerHTML = rows
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
  }
  promoDetailModal.hidden = false;
  if (promoDetailDialog) promoDetailDialog.scrollTop = 0;
  document.body.classList.add("modal-open");
}

function reuseHistoryItem(item) {
  if (!item) return;

  if (promoProductName) promoProductName.value = item.productName || "";
  if (promoPrice) promoPrice.value = item.price || "";
  if (promoDetails) promoDetails.value = item.details || "";
  if (promoStyle) promoStyle.value = item.style || "";
  if (promoAspectRatio) promoAspectRatio.value = item.aspectRatio || "";

  const sourceImage = getHistorySourceImage(item);
  if (sourceImage) {
    const mimeTypeMatch = sourceImage.match(/^data:([^;,]+)/i);
    selectedImageDataUrl = sourceImage;
    selectedImagePreviewDataUrl = sourceImage;
    selectedFileName = item.sourceFileName || item.fileName || "history-source-image.jpg";
    selectedMimeType = mimeTypeMatch?.[1] || "image/jpeg";
    selectedImageWidth = 0;
    selectedImageHeight = 0;
    if (promoImageInput) promoImageInput.value = "";
    if (promoPreviewImage) promoPreviewImage.src = sourceImage;
    if (promoPreviewPanel) promoPreviewPanel.hidden = false;
    if (promoDropzone) promoDropzone.hidden = true;
  } else {
    clearImage();
  }

  selectedReferenceImages = [];
  if (promoReferenceInput) promoReferenceInput.value = "";
  renderReferenceImages();
  if (promoResultCard) promoResultCard.hidden = true;
  if (promoResultImage) promoResultImage.removeAttribute("src");
  if (promoPromptOutput) promoPromptOutput.value = "";

  closeHistoryDetail();
  updateGenerateState();

  const missingSourceMessage = sourceImage ? "" : " กรุณาอัปโหลดภาพต้นฉบับอีกครั้ง";
  const missingReferencesMessage = item.referenceImageCount
    ? ` รูปอ้างอิงเดิม ${item.referenceImageCount} รูปไม่ได้ถูกบันทึกไว้ กรุณาเลือกใหม่`
    : "";
  setStatus(
    `ใส่ข้อมูลเดิมในฟอร์มแล้ว${missingSourceMessage}${missingReferencesMessage} ระบบยังไม่ได้สร้างภาพและยังไม่ใช้ Credit`,
    sourceImage ? "success" : "error",
  );
  promoFormCard?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => promoProductName?.focus({ preventScroll: true }), 350);
}

function closeHistoryDetail() {
  if (!promoDetailModal) return;
  promoDetailModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function createPreviewDataUrl(dataUrl, maxSize = 360) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round((img.naturalWidth || 1) * scale));
      canvas.height = Math.max(1, Math.round((img.naturalHeight || 1) * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.78));
    };
    img.onerror = () => resolve("");
    img.src = dataUrl;
  });
}

async function loadPromoHistory() {
  if (!promoHistoryList || !currentUser) {
    if (promoHistoryList) {
      promoHistoryList.innerHTML = '<p class="promo-history-empty">Login เพื่อดูประวัติรูปที่เคย Generate</p>';
    }
    if (promoHistoryCount) promoHistoryCount.textContent = "-";
    return;
  }

  try {
    const svc = getFirebaseServices();
    if (!svc?.db) throw new Error("Firebase ยังไม่พร้อม");
    const historyQuery = query(
      collection(svc.db, "users", currentUser.uid, "promoImageHistory"),
      orderBy("createdAt", "desc"),
      limit(8),
    );
    const snapshot = await getDocs(historyQuery);
    renderHistory(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    if (promoHistoryCount) promoHistoryCount.textContent = "-";
    promoHistoryList.innerHTML = `<p class="promo-history-empty">โหลด History ไม่สำเร็จ: ${error.message || "ไม่ทราบสาเหตุ"}</p>`;
  }
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
      reject(new Error("กรุณาเลือกไฟล์รูปภาพ PNG, JPG หรือ WEBP"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({
          dataUrl: String(reader.result || ""),
          fileName: file.name || "promo-source-image",
          mimeType: file.type || "image/jpeg",
          width: img.naturalWidth || 0,
          height: img.naturalHeight || 0,
        });
      };
      img.onerror = () => reject(new Error("อ่านขนาดรูปไม่สำเร็จ"));
      img.src = String(reader.result || "");
    };
    reader.onerror = () => reject(new Error("อ่านไฟล์รูปไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}

async function handleFile(file) {
  try {
    setStatus("กำลังอ่านรูปที่อัปโหลด...", "loading");
    const image = await readImageFile(file);
    selectedImageDataUrl = image.dataUrl;
    selectedImagePreviewDataUrl = await createPreviewDataUrl(image.dataUrl);
    selectedFileName = image.fileName;
    selectedMimeType = image.mimeType;
    selectedImageWidth = image.width;
    selectedImageHeight = image.height;

    if (promoPreviewImage) promoPreviewImage.src = selectedImageDataUrl;
    if (promoPreviewPanel) promoPreviewPanel.hidden = false;
    if (promoDropzone) promoDropzone.hidden = true;
    setStatus("อัปโหลดรูปแล้ว ใส่รายละเอียดแล้วกด Generate รูปได้เลย", "success");
    updateGenerateState();
  } catch (error) {
    setStatus(error.message || "อัปโหลดรูปไม่สำเร็จ", "error");
  }
}

async function handleReferenceFiles(files) {
  const incoming = Array.from(files || []).slice(0, Math.max(0, 4 - selectedReferenceImages.length));
  if (!incoming.length) return;

  try {
    setStatus("กำลังอ่านรูปอ้างอิงเพิ่มเติม...", "loading");
    for (const file of incoming) {
      const image = await readImageFile(file);
      selectedReferenceImages.push({
        dataUrl: image.dataUrl,
        previewDataUrl: await createPreviewDataUrl(image.dataUrl, 160),
        fileName: image.fileName,
        mimeType: image.mimeType,
      });
    }
    renderReferenceImages();
    setStatus(`เพิ่มรูปอ้างอิงแล้ว ${selectedReferenceImages.length}/4 รูป`, "success");
  } catch (error) {
    setStatus(error.message || "อ่านรูปอ้างอิงไม่สำเร็จ", "error");
  } finally {
    if (promoReferenceInput) promoReferenceInput.value = "";
  }
}

function clearImage() {
  selectedImageDataUrl = "";
  selectedImagePreviewDataUrl = "";
  selectedFileName = "";
  selectedMimeType = "";
  selectedImageWidth = 0;
  selectedImageHeight = 0;
  if (promoImageInput) promoImageInput.value = "";
  if (promoPreviewImage) promoPreviewImage.removeAttribute("src");
  if (promoPreviewPanel) promoPreviewPanel.hidden = true;
  if (promoDropzone) promoDropzone.hidden = false;
  updateGenerateState();
}

async function generatePromoImage() {
  if (!currentUser) {
    setStatus("กรุณา Login Gmail ก่อนใช้งาน", "error");
    return;
  }
  if (!hasAvailablePromoCredit()) {
    const message =
      promoUsageState === "error"
        ? "ตรวจสอบ Credit ไม่สำเร็จ กรุณารีเฟรชหน้าแล้วลองอีกครั้ง"
        : promoUsageState === "ready"
          ? "Credit และสิทธิ์ใช้ฟรีหมดแล้ว กรุณาเติม Credit ก่อน Generate รูป"
          : "กำลังตรวจสอบ Credit กรุณารอสักครู่";
    setStatus(message, "error");
    return;
  }
  if (!selectedImageDataUrl) {
    setStatus("กรุณาอัปโหลดภาพสินค้าก่อน", "error");
    return;
  }

  const productName = promoProductName?.value.trim() || "";
  const price = promoPrice?.value.trim() || "";
  const details = promoDetails?.value.trim() || "";
  const style = promoStyle?.value.trim() || "";
  const aspectRatio = normalizeAspectRatio(promoAspectRatio?.value || "");
  if (!productName || !details) {
    setStatus("กรุณาใส่ชื่อสินค้าและรายละเอียดก่อน Generate", "error");
    return;
  }

  try {
    isGeneratingPromo = true;
    updateGenerateState();
    if (promoLoadingPanel) promoLoadingPanel.hidden = false;
    if (promoResultCard) promoResultCard.hidden = true;
    setStatus("กำลังสร้างภาพโปรโมท ใช้เวลาไม่นานครับ...", "loading");
    promoLoadingPanel?.scrollIntoView({ behavior: "smooth", block: "center" });

    const token = await currentUser.getIdToken();
    const response = await fetch(GENERATE_PROMO_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageDataUrl: selectedImageDataUrl,
        imagePreviewDataUrl: selectedImagePreviewDataUrl,
        fileName: selectedFileName,
        mimeType: selectedMimeType,
        imageWidth: selectedImageWidth,
        imageHeight: selectedImageHeight,
        aspectRatio,
        referenceImageDataUrls: selectedReferenceImages.map((item) => item.dataUrl),
        productName,
        price,
        details,
        style,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data?.error || "Generate รูปไม่สำเร็จ");
      error.code = data?.code || "";
      throw error;
    }

    if (promoResultImage) promoResultImage.src = data.imageDataUrl;
    if (downloadPromoImageButton) {
      downloadPromoImageButton.href = data.imageDataUrl;
      downloadPromoImageButton.download = data.fileName || "promo-image.png";
    }
    if (promoPromptOutput) promoPromptOutput.value = data.prompt || "";
    if (promoResultCard) promoResultCard.hidden = false;
    setStatus("Generate รูปโปรโมทสำเร็จแล้ว", "success");
    if (data.usage) {
      applyPromoUsage(data.usage);
    } else {
      await loadUsage();
    }
    renderHistory([
      {
        productName,
        price,
        details,
        style,
        aspectRatio,
        referenceImageCount: selectedReferenceImages.length,
        fileName: data.fileName,
        sourceFileName: selectedFileName,
        sourceImagePreviewDataUrl: selectedImagePreviewDataUrl,
        imagePreviewDataUrl: selectedImagePreviewDataUrl,
        generatedImagePreviewDataUrl: data.generatedImagePreviewDataUrl || data.imageDataUrl,
        createdAt: new Date(),
      },
    ]);
    await loadPromoHistory();
    promoResultCard?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const message =
      error.code === "NO_CREDIT"
        ? "Credit ไม่พอ กรุณาเติม Credit ก่อน Generate รูป"
        : error.message || "Generate รูปไม่สำเร็จ";
    setStatus(message, "error");
  } finally {
    isGeneratingPromo = false;
    if (promoLoadingPanel) promoLoadingPanel.hidden = true;
    updateGenerateState();
  }
}

promoLoginButton?.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    setStatus(error.message || "Login ไม่สำเร็จ", "error");
  }
});

promoDropzone?.addEventListener("click", () => promoImageInput?.click());
promoDropzone?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    promoImageInput?.click();
  }
});
promoDropzone?.addEventListener("dragover", (event) => {
  event.preventDefault();
  promoDropzone.dataset.drag = "true";
});
promoDropzone?.addEventListener("dragleave", () => {
  promoDropzone.dataset.drag = "false";
});
promoDropzone?.addEventListener("drop", (event) => {
  event.preventDefault();
  promoDropzone.dataset.drag = "false";
  const file = event.dataTransfer?.files?.[0];
  if (file) handleFile(file);
});
promoImageInput?.addEventListener("change", () => {
  const file = promoImageInput.files?.[0];
  if (file) handleFile(file);
});
promoReferenceInput?.addEventListener("change", () => {
  handleReferenceFiles(promoReferenceInput.files);
});
promoReferenceList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-reference]");
  if (!button) return;
  const index = Number(button.dataset.removeReference);
  selectedReferenceImages = selectedReferenceImages.filter((_, itemIndex) => itemIndex !== index);
  renderReferenceImages();
});
promoClearImageButton?.addEventListener("click", clearImage);
generatePromoButton?.addEventListener("click", generatePromoImage);
copyPromoPromptButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promoPromptOutput?.value || "");
    copyPromoPromptButton.textContent = "คัดลอกแล้ว";
    setTimeout(() => {
      copyPromoPromptButton.textContent = "คัดลอก Prompt ที่ใช้";
    }, 1400);
  } catch {
    setStatus("คัดลอก Prompt ไม่สำเร็จ", "error");
  }
});

promoHistoryList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history-id]");
  if (!button) return;
  const item = historyItems.find((entry) => entry.id === button.dataset.historyId);
  openHistoryDetail(item);
});

document.querySelectorAll("[data-promo-modal-close]").forEach((element) => {
  element.addEventListener("click", closeHistoryDetail);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !promoDetailModal?.hidden) {
    closeHistoryDetail();
  }
});

copyHistoryPromptButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(activeHistoryItem?.prompt || "");
    copyHistoryPromptButton.textContent = "คัดลอกแล้ว";
    setTimeout(() => {
      copyHistoryPromptButton.textContent = "คัดลอก Prompt";
    }, 1400);
  } catch {
    setStatus("คัดลอก Prompt จาก History ไม่สำเร็จ", "error");
  }
});

reuseHistoryButton?.addEventListener("click", () => {
  reuseHistoryItem(activeHistoryItem);
});

[promoProductName, promoDetails, promoAspectRatio].forEach((input) => {
  input?.addEventListener("input", updateGenerateState);
});

watchAuth(async ({ user }) => {
  currentUser = user || null;
  promoUsage = null;
  promoUsageState = currentUser ? "loading" : "idle";
  updateGenerateState();
  if (promoGuestNotice) promoGuestNotice.hidden = Boolean(currentUser);
  if (currentUser) {
    setStatus("กำลังตรวจสอบ Credit...", "loading");
    await loadUsage();
    await loadPromoHistory();
    if (promoUsageState === "ready") {
      const hasAvailableCredit = hasAvailablePromoCredit();
      setStatus(
        hasAvailableCredit
          ? "พร้อมใช้งาน อัปโหลดรูปและกรอกรายละเอียดได้เลย"
          : "Credit และสิทธิ์ใช้ฟรีหมดแล้ว กรุณาเติม Credit ก่อน Generate รูป",
        hasAvailableCredit ? "success" : "error",
      );
    }
  } else {
    if (promoUsagePill) {
      promoUsagePill.textContent = "Login เพื่อดู Credit";
      promoUsagePill.dataset.plan = "free";
    }
    await loadPromoHistory();
    setStatus("กรุณา Login Gmail ก่อนใช้งาน", "error");
  }
  updateGenerateState();
});
