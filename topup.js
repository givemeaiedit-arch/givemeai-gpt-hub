import { isFirebaseConfigured, signInWithGoogle, watchAuth } from "./auth-shared.js";

const SUBMIT_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/submitTopupSlip";

const plans = [...document.querySelectorAll(".topup-plan")];
const title = document.querySelector("#selectedPlanTitle");
const detail = document.querySelector("#selectedPlanDetail");
const price = document.querySelector("#selectedPlanPrice");
const qrImage = document.querySelector("#selectedQrImage");
const submitButton = document.querySelector("#createTopupOrderButton");
const changePlanButton = document.querySelector("#changeTopupPlanButton");
const status = document.querySelector("#topupOrderStatus");
const slipInput = document.querySelector("#topupSlipInput");
const slipPreview = document.querySelector("#topupSlipPreview");
const slipImage = document.querySelector("#topupSlipImage");
const summaryCard = document.querySelector(".topup-summary-card");
const shell = document.querySelector(".topup-shell");
const planGrid = document.querySelector(".topup-grid");

let selectedPlan = plans[0] || null;
let currentUser = null;
let slipDataUrl = "";

function setStatus(message, tone = "muted") {
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function getPlanPayload() {
  return {
    id: selectedPlan?.dataset.plan || "",
    title: selectedPlan?.dataset.title || "",
    detail: selectedPlan?.dataset.detail || "",
    price: Number(selectedPlan?.dataset.price || 0),
    qr: selectedPlan?.dataset.qr || "",
  };
}

function renderSelectedPlan(plan) {
  if (!plan) return;
  selectedPlan = plan;
  plans.forEach((item) => item.classList.toggle("is-selected", item === plan));
  const payload = getPlanPayload();
  if (title) title.textContent = payload.title;
  if (detail) detail.textContent = payload.detail;
  if (price) price.textContent = String(payload.price);
  if (qrImage) {
    qrImage.src = payload.qr;
    qrImage.alt = `QR สำหรับแพ็ก ${payload.price} บาท`;
  }
  setStatus("เลือกแพ็กแล้ว สแกน QR แนบสลิป แล้วกด “โอนแล้ว” เพื่อส่งให้แอดมินตรวจสอบ", "muted");
}

function focusPaymentPanel() {
  shell?.classList.add("is-checkout-mode");
  if (window.matchMedia("(max-width: 760px)").matches) {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }
  summaryCard?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showPlanList() {
  shell?.classList.remove("is-checkout-mode");
  planGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("อ่านไฟล์สลิปไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("ไฟล์สลิปไม่ใช่รูปภาพที่อ่านได้"));
    image.src = dataUrl;
  });
}

async function compressSlip(file) {
  const rawDataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(rawDataUrl);
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

  let quality = 0.78;
  let output = canvas.toDataURL("image/jpeg", quality);
  while (output.length > 850000 && quality > 0.45) {
    quality -= 0.08;
    output = canvas.toDataURL("image/jpeg", quality);
  }
  if (output.length > 950000) {
    throw new Error("ไฟล์สลิปใหญ่เกินไป กรุณาเลือกรูปที่ชัดแต่ขนาดเล็กลง");
  }
  return output;
}

async function ensureLogin() {
  if (currentUser) return currentUser;
  if (!isFirebaseConfigured()) {
    throw new Error("ยังไม่ได้ตั้งค่า Firebase Login");
  }
  await signInWithGoogle();
  if (!currentUser) {
    throw new Error("กรุณา Login Gmail ก่อนส่งสลิป");
  }
  return currentUser;
}

async function submitTopupSlip() {
  const user = await ensureLogin();
  if (!slipDataUrl) {
    throw new Error("กรุณาแนบสลิปโอนเงินก่อนกดโอนแล้ว");
  }

  const token = await user.getIdToken();
  const response = await fetch(SUBMIT_TOPUP_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      packageId: getPlanPayload().id,
      slipDataUrl,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || "ส่งคำขอเติมเงินไม่สำเร็จ");
  }
  return result;
}

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    renderSelectedPlan(plan);
    focusPaymentPanel();
  });
});

slipInput?.addEventListener("change", async () => {
  const file = slipInput.files?.[0];
  if (!file) return;
  try {
    setStatus("กำลังเตรียมรูปสลิป...", "muted");
    slipDataUrl = await compressSlip(file);
    if (slipImage) slipImage.src = slipDataUrl;
    if (slipPreview) slipPreview.hidden = false;
    setStatus("แนบสลิปเรียบร้อยแล้ว กด “โอนแล้ว” เพื่อส่งให้แอดมินตรวจสอบ", "success");
  } catch (error) {
    slipDataUrl = "";
    if (slipPreview) slipPreview.hidden = true;
    setStatus(error.message || "แนบสลิปไม่สำเร็จ", "warning");
  }
});

submitButton?.addEventListener("click", async () => {
  try {
    submitButton.disabled = true;
    setStatus("กำลังส่งคำขอให้แอดมินตรวจสอบ...", "muted");
    await submitTopupSlip();
    setStatus(
      "ตอนนี้อยู่ในช่วงทดสอบระบบ กรุณารอสักครู่ ให้แอดมินตรวจเช็ค ไม่เกิน 15 นาทีค่ะ",
      "success",
    );
  } catch (error) {
    setStatus(error.message || "ส่งคำขอเติมเงินไม่สำเร็จ", "warning");
  } finally {
    submitButton.disabled = false;
  }
});

changePlanButton?.addEventListener("click", showPlanList);

watchAuth(({ user }) => {
  currentUser = user;
});

renderSelectedPlan(selectedPlan);
