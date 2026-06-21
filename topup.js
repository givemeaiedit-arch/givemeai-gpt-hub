import {
  getFirebaseServices,
  isFirebaseConfigured,
  signInWithGoogle,
  watchAuth,
} from "./auth-shared.js";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const SUBMIT_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/submitTopupSlip";

const DEFAULT_CHECKOUT_MESSAGE =
  "เลือกแพ็ก สแกน QR แนบสลิป แล้วกด “โอนแล้ว” เพื่อส่งให้แอดมินตรวจสอบ";
const PENDING_MEMBER_MESSAGE = "รอแอดมินอนุมัติแพ็กสมาชิกอยู่";
const ADMIN_EMAIL = "givemeai.edit@gmail.com";

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
const liveNotice = document.querySelector("#topupLiveNotice");
const liveNoticeIcon = document.querySelector("#topupLiveNoticeIcon");
const liveNoticeTitle = document.querySelector("#topupLiveNoticeTitle");
const liveNoticeText = document.querySelector("#topupLiveNoticeText");
const historyButton = document.querySelector("#topupHistoryButton");
const historyBox = document.querySelector("#topupHistoryBox");
const historyCount = document.querySelector("#topupHistoryCount");
const historyTableBody = document.querySelector("#topupHistoryTableBody");
const pendingCount = document.querySelector("#topupPendingCount");
const approvedCount = document.querySelector("#topupApprovedCount");
const rejectedCount = document.querySelector("#topupRejectedCount");
const accountState = document.querySelector("#topupAccountState");

let selectedPlan = plans[0] || null;
let currentUser = null;
let currentProfile = null;
let currentOrders = [];
let slipDataUrl = "";
let stopUserDocWatch = null;
let stopOrderWatch = null;

plans.forEach((plan) => {
  const button = plan.querySelector("button");
  if (button && !plan.dataset.defaultButtonLabel) {
    plan.dataset.defaultButtonLabel = button.textContent.trim();
  }
});

function setStatus(message, tone = "muted") {
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function timestampToDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
  const date = timestampToDate(value);
  if (!date) return "-";
  return date.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  });
}

function getOrderSortTime(order) {
  return (
    timestampToDate(order.updatedAt)?.getTime() ||
    timestampToDate(order.approvedAt)?.getTime() ||
    timestampToDate(order.rejectedAt)?.getTime() ||
    timestampToDate(order.createdAt)?.getTime() ||
    0
  );
}

function sortOrders(orders) {
  return [...orders].sort((left, right) => getOrderSortTime(right) - getOrderSortTime(left));
}

function isAdminUser(user) {
  return normalizeEmail(user?.email) === ADMIN_EMAIL;
}

function getMemberLevel(profile, user) {
  if (isAdminUser(user)) return "master";
  if (!profile) return "free";

  const values = [
    profile.plan,
    profile.tier,
    profile.memberLevel,
    profile.subscriptionStatus,
  ].map(normalizeValue);

  if (Boolean(profile.proLifetime) || values.includes("master")) return "master";

  const expiresAt = timestampToDate(profile.proExpiresAt);
  if (expiresAt && expiresAt.getTime() < Date.now()) return "free";

  if (values.includes("pro") || values.includes("active")) return "pro";
  return "free";
}

function isCreditPlan(planId) {
  return String(planId || "").startsWith("credit");
}

function hasPendingMemberOrder() {
  return currentOrders.some((order) => order.status === "pending" && !isCreditPlan(order.packageId));
}

function getPlanLockReason(plan) {
  if (!plan) return "";
  const planId = plan.dataset.plan || "";
  if (isCreditPlan(planId)) return "";

  if (hasPendingMemberOrder()) return PENDING_MEMBER_MESSAGE;

  const memberLevel = getMemberLevel(currentProfile, currentUser);
  if (memberLevel === "master") {
    return planId === "pro-lifetime" ? "คุณสมัครแพ็กเกจนี้อยู่" : "คุณมีแพ็ก Master อยู่แล้ว";
  }
  if (memberLevel === "pro" && planId === "pro-monthly") {
    return "คุณสมัครแพ็กเกจนี้อยู่";
  }
  return "";
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

function resetSlip() {
  slipDataUrl = "";
  if (slipInput) slipInput.value = "";
  if (slipPreview) slipPreview.hidden = true;
  if (slipImage) slipImage.removeAttribute("src");
}

function updateSelectedSummary() {
  if (!selectedPlan) return;
  const payload = getPlanPayload();
  const lockReason = getPlanLockReason(selectedPlan);

  if (title) title.textContent = payload.title;
  if (detail) detail.textContent = payload.detail;
  if (price) price.textContent = String(payload.price);
  if (qrImage) {
    qrImage.src = payload.qr;
    qrImage.alt = `QR สำหรับแพ็ก ${payload.price} บาท`;
  }

  if (slipInput) slipInput.disabled = Boolean(lockReason);

  if (lockReason) {
    if (submitButton) {
      submitButton.textContent = lockReason;
      submitButton.disabled = true;
    }
    resetSlip();
    setStatus(lockReason, "warning");
    return;
  }

  if (submitButton) {
    submitButton.textContent = "โอนแล้ว";
    submitButton.disabled = false;
  }

  if (hasPendingMemberOrder()) {
    setStatus(PENDING_MEMBER_MESSAGE, "warning");
    return;
  }
  if (currentOrders.some((order) => order.status === "pending")) {
    setStatus("มีรายการรอแอดมินตรวจอยู่ คุณยังเลือกแพ็กเครดิตเพิ่มได้ตามต้องการ", "muted");
    return;
  }
  setStatus(DEFAULT_CHECKOUT_MESSAGE, "muted");
}

function renderPlanAvailability() {
  plans.forEach((plan) => {
    const button = plan.querySelector("button");
    const defaultLabel = plan.dataset.defaultButtonLabel || "เลือกแพ็กนี้";
    const lockReason = getPlanLockReason(plan);
    const locked = Boolean(lockReason);
    plan.classList.toggle("is-locked", locked);
    if (button) {
      button.disabled = locked;
      button.textContent = locked ? lockReason : defaultLabel;
    }
  });
  updateSelectedSummary();
}

function renderAccountState() {
  if (!accountState) return;
  if (!currentUser) {
    accountState.hidden = true;
    accountState.textContent = "";
    accountState.dataset.plan = "free";
    return;
  }

  const memberLevel = getMemberLevel(currentProfile, currentUser);
  let message = "บัญชีนี้ยังเป็น Free Member สามารถเติม Credit เพิ่มได้ตลอด";

  if (memberLevel === "pro") {
    const expiresAt = timestampToDate(currentProfile?.proExpiresAt);
    message = expiresAt
      ? `คุณใช้งาน Pro อยู่ ถึง ${formatDate(expiresAt)}`
      : "คุณใช้งาน Pro อยู่";
  } else if (memberLevel === "master") {
    message = "คุณใช้งาน Master อยู่แบบไม่หมดอายุ";
  }

  accountState.hidden = false;
  accountState.dataset.plan = memberLevel;
  accountState.textContent = message;
}

function getOrderStatusLabel(order) {
  if (order.status === "approved") return "อนุมัติแล้ว";
  if (order.status === "rejected") return "ปฏิเสธแล้ว";
  return "รอตรวจสลิป";
}

function renderLiveNotice() {
  if (!liveNotice || !liveNoticeTitle || !liveNoticeText || !liveNoticeIcon) return;
  if (!currentUser || !currentOrders.length) {
    liveNotice.hidden = true;
    if (historyButton) historyButton.hidden = true;
    return;
  }

  const latestOrder = currentOrders[0];
  const packageLabel = latestOrder.packageLabel || latestOrder.packageId || "รายการล่าสุด";

  liveNotice.hidden = false;
  liveNotice.dataset.state = latestOrder.status || "pending";
  if (historyButton) historyButton.hidden = false;

  if (latestOrder.status === "approved") {
    liveNoticeIcon.textContent = "✓";
    liveNoticeTitle.textContent = `อนุมัติรายการ ${packageLabel} แล้ว`;
    liveNoticeText.textContent = "ระบบเติมสิทธิ์ให้เรียบร้อยแล้ว สามารถกดดูรายการย้อนหลังได้ด้านล่าง";
    return;
  }

  if (latestOrder.status === "rejected") {
    liveNoticeIcon.textContent = "!";
    liveNoticeTitle.textContent = `ปฏิเสธรายการ ${packageLabel}`;
    liveNoticeText.textContent =
      "แอดมินตรวจสลิปแล้วไม่ผ่าน กรุณาแนบสลิปใหม่อีกครั้ง หรือติดต่อแอดมินเพื่อตรวจสอบ";
    return;
  }

  liveNoticeIcon.textContent = "…";
  liveNoticeTitle.textContent = `รออนุมัติรายการ ${packageLabel}`;
  liveNoticeText.textContent =
    "ตอนนี้อยู่ในช่วงทดสอบระบบ กรุณารอสักครู่ ให้แอดมินตรวจเช็ค ไม่เกิน 15 นาทีค่ะ";
}

function renderOrderHistory() {
  if (!historyBox || !historyTableBody || !historyCount) return;
  if (!currentUser || !currentOrders.length) {
    historyBox.hidden = true;
    historyCount.textContent = "";
    historyTableBody.innerHTML = "";
    if (pendingCount) pendingCount.textContent = "0";
    if (approvedCount) approvedCount.textContent = "0";
    if (rejectedCount) rejectedCount.textContent = "0";
    return;
  }

  historyBox.hidden = false;
  historyCount.textContent = `(${currentOrders.length} รายการ)`;
  const counts = currentOrders.reduce(
    (accumulator, order) => {
      if (order.status === "approved") accumulator.approved += 1;
      else if (order.status === "rejected") accumulator.rejected += 1;
      else accumulator.pending += 1;
      return accumulator;
    },
    { pending: 0, approved: 0, rejected: 0 },
  );

  if (pendingCount) pendingCount.textContent = String(counts.pending);
  if (approvedCount) approvedCount.textContent = String(counts.approved);
  if (rejectedCount) rejectedCount.textContent = String(counts.rejected);

  historyTableBody.innerHTML = currentOrders
    .map((order) => {
      const reviewedAt =
        order.status === "approved"
          ? formatDate(order.approvedAt || order.updatedAt)
          : order.status === "rejected"
            ? formatDate(order.rejectedAt || order.updatedAt)
            : "รอแอดมินตรวจสลิป";

      return `
        <tr>
          <td>
            <div class="topup-history-package">
              <strong>${escapeHtml(order.packageLabel || order.packageId || "-")}</strong>
              <small>${escapeHtml(order.packageId || "-")}</small>
            </div>
          </td>
          <td><strong>${escapeHtml(String(order.price || 0))} บาท</strong></td>
          <td>${escapeHtml(formatDate(order.createdAt))}</td>
          <td><span class="topup-order-status-pill" data-status="${escapeHtml(order.status)}">${escapeHtml(getOrderStatusLabel(order))}</span></td>
          <td>${escapeHtml(reviewedAt)}</td>
        </tr>
      `;
    })
    .join("");
}

function refreshTopupUi() {
  renderAccountState();
  renderPlanAvailability();
  renderLiveNotice();
  renderOrderHistory();
}

function stopRealtimeWatchers() {
  if (typeof stopUserDocWatch === "function") stopUserDocWatch();
  if (typeof stopOrderWatch === "function") stopOrderWatch();
  stopUserDocWatch = null;
  stopOrderWatch = null;
}

function subscribeTopupData(user) {
  stopRealtimeWatchers();
  currentProfile = null;
  currentOrders = [];

  if (!user || !isFirebaseConfigured()) {
    refreshTopupUi();
    return;
  }

  const services = getFirebaseServices();
  if (!services?.db) {
    refreshTopupUi();
    return;
  }

  stopUserDocWatch = onSnapshot(doc(services.db, "users", user.uid), (snapshot) => {
    currentProfile = snapshot.exists() ? snapshot.data() || {} : {};
    refreshTopupUi();
  });

  stopOrderWatch = onSnapshot(
    query(collection(services.db, "topupOrders"), where("uid", "==", user.uid)),
    (snapshot) => {
      currentOrders = sortOrders(snapshot.docs.map((entry) => {
        const data = entry.data() || {};
        return {
          id: entry.id,
          packageId: String(data.packageId || ""),
          packageLabel: String(data.packageLabel || data.packageId || "-"),
          packageType: String(data.packageType || ""),
          price: Number(data.price || 0),
          status: normalizeValue(data.status || "pending"),
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
          approvedAt: data.approvedAt || null,
          rejectedAt: data.rejectedAt || null,
        };
      }));
      refreshTopupUi();
    },
  );
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

  const credential = await signInWithGoogle();
  currentUser = credential?.user || currentUser;
  if (!currentUser) {
    throw new Error("กรุณา Login Gmail ก่อนส่งสลิป");
  }
  return currentUser;
}

async function submitTopupSlip() {
  const user = await ensureLogin();
  const lockReason = getPlanLockReason(selectedPlan);
  if (lockReason) {
    throw new Error(lockReason);
  }
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
    selectedPlan = plan;
    plans.forEach((item) => item.classList.toggle("is-selected", item === plan));
    updateSelectedSummary();
    focusPaymentPanel();
  });
});

historyButton?.addEventListener("click", () => {
  if (!historyBox) return;
  historyBox.hidden = false;
  historyBox.open = true;
  historyBox.scrollIntoView({ behavior: "smooth", block: "start" });
});

slipInput?.addEventListener("change", async () => {
  const file = slipInput.files?.[0];
  if (!file || slipInput.disabled) return;
  try {
    setStatus("กำลังเตรียมรูปสลิป...", "muted");
    slipDataUrl = await compressSlip(file);
    if (slipImage) slipImage.src = slipDataUrl;
    if (slipPreview) slipPreview.hidden = false;
    setStatus("แนบสลิปเรียบร้อยแล้ว กด “โอนแล้ว” เพื่อส่งให้แอดมินตรวจสอบ", "success");
  } catch (error) {
    resetSlip();
    setStatus(error.message || "แนบสลิปไม่สำเร็จ", "warning");
  }
});

submitButton?.addEventListener("click", async () => {
  const lockReason = getPlanLockReason(selectedPlan);
  if (lockReason) {
    setStatus(lockReason, "warning");
    return;
  }

  try {
    submitButton.disabled = true;
    setStatus("กำลังส่งคำขอให้แอดมินตรวจสอบ...", "muted");
    await submitTopupSlip();
    resetSlip();
    setStatus("ส่งสลิปเรียบร้อยแล้ว รอแอดมินอนุมัติรายการ", "success");
  } catch (error) {
    setStatus(error.message || "ส่งคำขอเติมเงินไม่สำเร็จ", "warning");
  } finally {
    updateSelectedSummary();
  }
});

changePlanButton?.addEventListener("click", showPlanList);

watchAuth(({ user }) => {
  currentUser = user || null;
  subscribeTopupData(currentUser);
});

plans.forEach((item) => item.classList.toggle("is-selected", item === selectedPlan));
refreshTopupUi();
