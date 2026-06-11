import {
  ADMIN_EMAIL,
  isAdminEmail,
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  watchAuth,
} from "./auth-shared.js";
import { trackEvent } from "./analytics.js";

const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const adminLink = document.querySelector("#adminLink");
const toast = document.querySelector("#toast");
const protectedCards = [...document.querySelectorAll(".card[data-protected='true']")];

let currentUser = null;
let currentProfile = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function getStatusLabel(profile) {
  if (!currentUser) return "ยังไม่ได้เข้าสู่ระบบ";
  if (isAdminEmail(currentUser.email)) return "Admin";
  if (!profile) return "กำลังตรวจสอบสิทธิ์";
  if (profile.status === "approved") return "อนุมัติแล้ว";
  if (profile.status === "revoked") return "ถูกปิดสิทธิ์";
  return "รอ Admin อนุมัติ";
}

function ensureSystemNote() {
  let note = document.querySelector("#systemNote");
  if (note) return note;

  note = document.createElement("div");
  note.id = "systemNote";
  note.className = "system-note";
  const toolbar = document.querySelector(".toolbar");
  toolbar?.insertAdjacentElement("afterend", note);
  return note;
}

function setSystemNote(message) {
  const note = ensureSystemNote();
  if (!note) return;
  note.textContent = message || "";
  note.classList.toggle("show", Boolean(message));
}

function ensureMemberStatus() {
  let status = document.querySelector("#memberStatus");
  if (status) return status;

  status = document.createElement("div");
  status.id = "memberStatus";
  status.className = "member-status";
  const toolbar = document.querySelector(".toolbar");
  toolbar?.insertAdjacentElement("afterend", status);
  return status;
}

function setMemberStatus(user, profile, approved) {
  const status = ensureMemberStatus();
  if (!status) return;

  status.hidden = !user;
  if (!user) {
    status.textContent = "";
    status.className = "member-status";
    return;
  }

  if (isAdminEmail(user.email)) {
    status.className = "member-status approved";
    status.textContent = "Admin - ปลดล็อกทุก GPT แล้ว";
    return;
  }

  if (approved) {
    status.className = "member-status approved";
    status.textContent = "อนุมัติแล้ว - ใช้งาน GPT สมาชิกได้";
    return;
  }

  if (profile?.status === "revoked") {
    status.className = "member-status revoked";
    status.innerHTML = `ถูกปิดสิทธิ์ - ติดต่อ Admin <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>`;
    return;
  }

  status.className = "member-status pending";
  status.innerHTML = `รออนุมัติจาก Admin - ติดต่อ Email เพื่อสมัคร <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>`;
}

function ensureLockOverlay(card) {
  let overlay = card.querySelector(".member-lock");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.className = "member-lock";
  overlay.innerHTML = `
    <strong>สำหรับผู้ที่สมัครแล้ว</strong>
    <span>เข้าสู่ระบบด้วย Gmail และรออนุมัติจาก Admin ก่อนเปิดใช้เครื่องมือนี้</span>
    <a href="pricing.html">ดูรายละเอียดการสมัคร</a>
  `;
  card.appendChild(overlay);
  return overlay;
}

function prepareProtectedCards() {
  protectedCards.forEach((card) => {
    const link = card.querySelector(".primary-button");
    const copy = card.querySelector(".copy-button");
    if (link && !link.dataset.gptUrl) {
      link.dataset.gptUrl = link.href;
    }
    if (copy && !copy.dataset.copyOriginal) {
      copy.dataset.copyOriginal = copy.dataset.copy || "";
    }
    ensureLockOverlay(card);
  });
}

function setProtectedAccess(approved) {
  protectedCards.forEach((card) => {
    const link = card.querySelector(".primary-button");
    const copy = card.querySelector(".copy-button");
    const overlay = ensureLockOverlay(card);

    card.classList.toggle("is-locked", !approved);
    overlay.hidden = approved;

    if (link) {
      link.href = approved ? link.dataset.gptUrl : "pricing.html";
      link.target = approved ? "_blank" : "_self";
      link.rel = approved ? "noopener" : "";
      link.setAttribute("aria-disabled", approved ? "false" : "true");
    }

    if (copy) {
      copy.disabled = !approved;
      copy.title = approved ? "คัดลอกลิงก์" : "ปลดล็อกหลังสมัครและได้รับอนุมัติ";
      copy.dataset.copy = approved ? copy.dataset.copyOriginal : "";
    }
  });
}

function updateAuthUi(user, profile) {
  currentUser = user;
  currentProfile = profile;
  const approved = Boolean(user && (isAdminEmail(user.email) || profile?.status === "approved"));

  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (adminLink) adminLink.hidden = !(user && isAdminEmail(user.email));

  if (userBadge) userBadge.hidden = !user;
  if (userAvatar) {
    userAvatar.src = user?.photoURL || "assets/favicon.png";
  }
  if (userName) {
    userName.textContent = user?.displayName || user?.email || "Guest";
  }
  if (userStatus) {
    userStatus.textContent = getStatusLabel(profile);
  }

  setProtectedAccess(approved);
  setMemberStatus(user, profile, approved);
}

prepareProtectedCards();
setProtectedAccess(false);

protectedCards.forEach((card) => {
  const link = card.querySelector(".primary-button");
  link?.addEventListener("click", (event) => {
    if (!card.classList.contains("is-locked")) return;
    event.preventDefault();
    trackEvent("locked_click", card.dataset.gptId || "");
    window.location.href = "pricing.html";
  });
});

document.querySelectorAll(".card .primary-button").forEach((link) => {
  link.addEventListener("click", () => {
    const card = link.closest(".card");
    if (!card || card.classList.contains("is-locked")) return;
    trackEvent("gpt_open", card.dataset.gptId || "");
  });
});

document.querySelectorAll(".card .copy-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.dataset.copy) return;
    const card = button.closest(".card");
    trackEvent("copy_link", card?.dataset.gptId || "");
  });
});

loginButton?.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    showToast(error.message === "Firebase is not configured." ? "ยังไม่ได้ตั้งค่า Firebase" : "เข้าสู่ระบบไม่สำเร็จ");
  }
});

logoutButton?.addEventListener("click", async () => {
  await signOutUser();
  showToast("ออกจากระบบแล้ว");
});

if (!isFirebaseConfigured()) {
  loginButton?.setAttribute("disabled", "true");
  setSystemNote(`ต้องเติมค่า Firebase ใน firebase-config.js ก่อนใช้งานระบบสมาชิก Admin: ${ADMIN_EMAIL}`);
} else {
  watchAuth(({ user, profile, configured, error }) => {
    if (!configured) {
      setSystemNote(`ต้องเติมค่า Firebase ใน firebase-config.js ก่อนใช้งานระบบสมาชิก Admin: ${ADMIN_EMAIL}`);
      return;
    }

    if (error) {
      setSystemNote("เชื่อมต่อ Firebase ได้ แต่ตรวจสอบสิทธิ์ผู้ใช้ไม่สำเร็จ กรุณาตรวจ Firestore rules และ config");
    } else {
      setSystemNote("");
    }

    updateAuthUi(user, profile);
  });
}
