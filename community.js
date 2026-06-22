import { watchAuth } from "./auth-shared.js";
import { getResolvedProfile } from "./profile-store.js";

const SUBMIT_COMMUNITY_REQUEST_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/submitCommunityRequest";
const ADMIN_EMAIL = "givemeai.edit@gmail.com";
const PRO_REQUIRED_MESSAGE = "สำหรับสมาชิกระดับ Pro ขึ้นไปเท่านั้น";

const groupButton = document.querySelector("#communityGroupButton");
const notifyButton = document.querySelector("#communityNotifyButton");
const facebookNameInput = document.querySelector("#communityFacebookName");
const statusNode = document.querySelector("#communityStatus");
const accessLabel = document.querySelector("#communityAccessLabel");

let currentUser = null;
let currentProfile = null;

function normalizeAccessValue(value) {
  return String(value || "").trim().toLowerCase();
}

function setStatus(message, tone = "muted") {
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.dataset.tone = tone;
}

function hasProAccess() {
  if (normalizeAccessValue(currentUser?.email) === ADMIN_EMAIL) return true;

  const values = [
    currentProfile?.plan,
    currentProfile?.tier,
    currentProfile?.memberLevel,
    currentProfile?.subscriptionStatus,
  ].map(normalizeAccessValue);

  if (values.includes("admin") || values.includes("master")) return true;
  if (!values.includes("pro") && !values.includes("active")) return false;

  const expiresAt = currentProfile?.proExpiresAt?.toDate?.()
    || (currentProfile?.proExpiresAt ? new Date(currentProfile.proExpiresAt) : null);
  return !expiresAt || Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() > Date.now();
}

function syncCommunityUi() {
  const isSignedIn = Boolean(currentUser);
  const isPro = hasProAccess();

  if (accessLabel) {
    accessLabel.textContent = !isSignedIn
      ? "กรุณา Login ก่อน"
      : isPro
        ? "พร้อมแจ้งแอดมิน"
        : "ต้องเป็น Pro ขึ้นไป";
  }

  if (notifyButton) notifyButton.disabled = !isPro;
  if (facebookNameInput) facebookNameInput.disabled = !isPro;

  if (!isSignedIn) {
    setStatus("กรุณา Login Gmail ก่อนใช้งานปุ่มเข้ากลุ่มและแจ้งชื่อ Facebook", "warning");
    return;
  }

  if (!isPro) {
    setStatus("บัญชีนี้ยังไม่ใช่สมาชิก Pro ขึ้นไป กรุณาอัปเกรดก่อนเข้ากลุ่มเรียนรู้", "warning");
    return;
  }

  setStatus("บัญชีนี้มีสิทธิ์เข้ากลุ่มแล้ว กดเข้ากลุ่ม Facebook แล้วแจ้งชื่อให้แอดมินได้เลย", "success");
}

groupButton?.addEventListener("click", (event) => {
  if (hasProAccess()) return;
  event.preventDefault();
  window.alert(PRO_REQUIRED_MESSAGE);
});

notifyButton?.addEventListener("click", async () => {
  if (!hasProAccess()) {
    window.alert(PRO_REQUIRED_MESSAGE);
    return;
  }

  const facebookName = facebookNameInput?.value?.trim() || "";
  if (facebookName.length < 2) {
    setStatus("กรุณากรอกชื่อ Facebook ที่ใช้กดขอเข้ากลุ่ม", "error");
    facebookNameInput?.focus();
    return;
  }

  try {
    notifyButton.disabled = true;
    setStatus("กำลังแจ้งแอดมิน...", "loading");
    const idToken = await currentUser.getIdToken();
    const response = await fetch(SUBMIT_COMMUNITY_REQUEST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ facebookName }),
    });
    const result = await response.json();
    if (!response.ok || result?.ok === false) {
      throw new Error(result?.error || "ส่งคำขอไม่สำเร็จ");
    }

    setStatus("แจ้งแอดมินเรียบร้อยแล้ว กรุณารอแอดมินตรวจคำขอใน Facebook", "success");
  } catch (error) {
    setStatus(error.message || "ส่งคำขอไม่สำเร็จ", "error");
  } finally {
    notifyButton.disabled = !hasProAccess();
  }
});

watchAuth(async ({ user }) => {
  currentUser = user;
  currentProfile = user ? await getResolvedProfile(user) : null;
  syncCommunityUi();
});
