import { signInWithGoogle, watchAuth } from "./auth-shared.js";

const USAGE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/getAdCheckUsage";
const GENERATE_PROMO_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/generatePromoImage";

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
const generatePromoButton = document.querySelector("#generatePromoButton");
const promoRequestStatus = document.querySelector("#promoRequestStatus");
const promoLoadingPanel = document.querySelector("#promoLoadingPanel");
const promoResultCard = document.querySelector("#promoResultCard");
const promoResultImage = document.querySelector("#promoResultImage");
const downloadPromoImageButton = document.querySelector("#downloadPromoImageButton");
const copyPromoPromptButton = document.querySelector("#copyPromoPromptButton");
const promoPromptOutput = document.querySelector("#promoPromptOutput");

let currentUser = null;
let selectedImageDataUrl = "";
let selectedFileName = "";
let selectedMimeType = "";
let selectedImageWidth = 0;
let selectedImageHeight = 0;

function setStatus(message, tone = "") {
  if (!promoRequestStatus) return;
  promoRequestStatus.textContent = message;
  promoRequestStatus.dataset.tone = tone;
}

function updateGenerateState() {
  const hasRequiredText = promoProductName?.value.trim() && promoDetails?.value.trim();
  const ready = Boolean(currentUser && selectedImageDataUrl && hasRequiredText);
  if (generatePromoButton) {
    generatePromoButton.disabled = !ready;
  }
}

async function loadUsage() {
  if (!currentUser || !promoUsagePill) return;
  try {
    const token = await currentUser.getIdToken();
    const response = await fetch(USAGE_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || "โหลด Credit ไม่สำเร็จ");
    promoUsagePill.textContent = data.label || `Credit คงเหลือ ${data.credits || 0}`;
    promoUsagePill.dataset.plan = data.plan || "free";
  } catch (error) {
    promoUsagePill.textContent = error.message || "โหลด Credit ไม่สำเร็จ";
    promoUsagePill.dataset.plan = "free";
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

function clearImage() {
  selectedImageDataUrl = "";
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
  if (!selectedImageDataUrl) {
    setStatus("กรุณาอัปโหลดภาพสินค้าก่อน", "error");
    return;
  }

  const productName = promoProductName?.value.trim() || "";
  const price = promoPrice?.value.trim() || "";
  const details = promoDetails?.value.trim() || "";
  const style = promoStyle?.value.trim() || "";
  if (!productName || !details) {
    setStatus("กรุณาใส่ชื่อสินค้าและรายละเอียดก่อน Generate", "error");
    return;
  }

  try {
    generatePromoButton.disabled = true;
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
        fileName: selectedFileName,
        mimeType: selectedMimeType,
        imageWidth: selectedImageWidth,
        imageHeight: selectedImageHeight,
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
    await loadUsage();
    promoResultCard?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const message =
      error.code === "NO_CREDIT"
        ? "Credit ไม่พอ กรุณาเติม Credit ก่อน Generate รูป"
        : error.message || "Generate รูปไม่สำเร็จ";
    setStatus(message, "error");
  } finally {
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

[promoProductName, promoDetails].forEach((input) => {
  input?.addEventListener("input", updateGenerateState);
});

watchAuth(async ({ user }) => {
  currentUser = user || null;
  if (promoGuestNotice) promoGuestNotice.hidden = Boolean(currentUser);
  if (currentUser) {
    setStatus("พร้อมใช้งาน อัปโหลดรูปและกรอกรายละเอียดได้เลย", "success");
    await loadUsage();
  } else {
    if (promoUsagePill) {
      promoUsagePill.textContent = "Login เพื่อดู Credit";
      promoUsagePill.dataset.plan = "free";
    }
    setStatus("กรุณา Login Gmail ก่อนใช้งาน", "error");
  }
  updateGenerateState();
});
