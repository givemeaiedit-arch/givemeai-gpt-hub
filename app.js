import {
  ADMIN_EMAIL,
  isAdminEmail,
  isFirebaseConfigured,
  redeemVipCode,
  signInWithGoogle,
  signOutUser,
  watchAuth,
} from "./auth-shared.js";
import { trackEvent } from "./analytics.js";
import { GPTS } from "./gpt-data.js";
import {
  setFavorite,
  watchAnnouncement,
  watchFavorites,
  watchGptSettings,
} from "./hub-state.js";

const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const adminLink = document.querySelector("#adminLink");
const toast = document.querySelector("#toast");
const cardsGrid = document.querySelector("#cards");
const allCards = [...document.querySelectorAll(".card")];
const protectedCards = [...document.querySelectorAll(".card[data-protected='true']")];
const defaultOrder = new Map(GPTS.map((gpt, index) => [gpt.id, index + 1]));

let currentUser = null;
let currentProfile = null;
let currentIsAdmin = false;
let gptSettings = {};
let favoriteIds = new Set();
let unsubscribeFavorites = null;

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
  return "รอใส่ VIP Code";
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
  const topbar = document.querySelector(".topbar");
  topbar?.insertAdjacentElement("afterend", status);
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
  status.innerHTML = `
    <strong>ยังไม่เป็น VIP</strong>
    <span>กรอกรหัส VIP 5 หลักที่ได้รับจาก Admin เพื่อปลดล็อก GPT สมาชิก</span>
    <div class="vip-redeem">
      <input id="vipCodeInput" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="5" pattern="[0-9]{5}" placeholder="เช่น 12345" />
      <button class="primary-button" id="redeemCodeButton" type="button">ปลดล็อก VIP</button>
    </div>
    <small>หลังกรอกสำเร็จ Code จะผูกกับ Gmail นี้อัตโนมัติ และใช้ซ้ำไม่ได้</small>
  `;
}

function ensureAnnouncementBanner() {
  let banner = document.querySelector("#announcementBanner");
  if (banner) return banner;

  banner = document.createElement("div");
  banner.id = "announcementBanner";
  banner.className = "announcement-banner";
  banner.setAttribute("role", "status");
  const linksSection = document.querySelector("#links");
  linksSection?.insertAdjacentElement("afterbegin", banner);
  return banner;
}

function setAnnouncement(announcement) {
  const banner = ensureAnnouncementBanner();
  const message = String(announcement?.message || "").trim();
  const show = Boolean(announcement?.enabled && message);
  banner.textContent = show ? message : "";
  banner.classList.toggle("show", show);
}

function ensureFavoriteButtons() {
  allCards.forEach((card) => {
    if (card.dataset.upcoming === "true") return;
    if (card.querySelector(".favorite-button")) return;
    const button = document.createElement("button");
    button.className = "favorite-button";
    button.type = "button";
    button.setAttribute("aria-label", "ปักหมุด GPT");
    button.textContent = "☆";
    card.appendChild(button);
  });
}

function setFavoriteUi() {
  allCards.forEach((card) => {
    if (card.dataset.upcoming === "true") return;
    const button = card.querySelector(".favorite-button");
    if (!button) return;
    const active = favoriteIds.has(card.dataset.gptId);
    button.hidden = !currentUser;
    button.classList.toggle("is-active", active);
    button.textContent = active ? "★" : "☆";
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function getCardOrder(card) {
  if (card.dataset.upcoming === "true") {
    const upcomingOrder = Number(card.dataset.order);
    return Number.isFinite(upcomingOrder) ? 900 + upcomingOrder : 999;
  }
  const settingOrder = Number(gptSettings[card.dataset.gptId]?.order);
  if (Number.isFinite(settingOrder)) return settingOrder;
  return defaultOrder.get(card.dataset.gptId) || 999;
}

function renderCardSettings() {
  if (!cardsGrid) return;

  const sortedCards = [...allCards].sort((a, b) => {
    const favoriteDiff = Number(favoriteIds.has(b.dataset.gptId)) - Number(favoriteIds.has(a.dataset.gptId));
    if (favoriteDiff !== 0) return favoriteDiff;
    return getCardOrder(a) - getCardOrder(b);
  });

  sortedCards.forEach((card) => {
    const hiddenForUsers = card.dataset.upcoming !== "true" && gptSettings[card.dataset.gptId]?.visible === false;
    card.classList.toggle("is-admin-hidden", hiddenForUsers && currentIsAdmin);
    card.dataset.hiddenByAdmin = hiddenForUsers && !currentIsAdmin ? "true" : "false";
    cardsGrid.appendChild(card);
  });

  window.applyCardSearch?.();
  setFavoriteUi();
}

function ensureLockOverlay(card) {
  let overlay = card.querySelector(".member-lock");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.className = "member-lock";
  overlay.innerHTML = `
    <strong>สำหรับผู้ที่สมัครแล้ว</strong>
    <span>เข้าสู่ระบบด้วย Gmail และกรอก VIP Code เพื่อเปิดใช้เครื่องมือนี้</span>
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
      copy.title = approved ? "คัดลอกลิงก์" : "ปลดล็อกด้วย VIP Code หลังสมัคร";
      copy.dataset.copy = approved ? copy.dataset.copyOriginal : "";
    }
  });
}

function updateAuthUi(user, profile) {
  currentUser = user;
  currentProfile = profile;
  currentIsAdmin = Boolean(user && isAdminEmail(user.email));
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
  setFavoriteUi();
  renderCardSettings();
}

ensureFavoriteButtons();
prepareProtectedCards();
setProtectedAccess(false);
renderCardSettings();

watchAnnouncement(setAnnouncement);
watchGptSettings((settings) => {
  gptSettings = settings;
  renderCardSettings();
});

allCards.forEach((card) => {
  const button = card.querySelector(".favorite-button");
  button?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!currentUser) {
      showToast("กรุณาเข้าสู่ระบบก่อนปักหมุด GPT");
      return;
    }

    const gptId = card.dataset.gptId || "";
    const next = !favoriteIds.has(gptId);
    try {
      await setFavorite(currentUser.uid, gptId, next);
      showToast(next ? "ปักหมุด GPT แล้ว" : "ยกเลิกปักหมุดแล้ว");
    } catch (error) {
      showToast(`บันทึก Favorite ไม่สำเร็จ: ${error.message}`);
    }
  });
});

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

document.addEventListener("click", async (event) => {
  const button = event.target.closest("#redeemCodeButton");
  if (!button || !currentUser) return;

  const input = document.querySelector("#vipCodeInput");
  const code = input?.value || "";
  button.disabled = true;
  try {
    await redeemVipCode(currentUser, code);
    currentProfile = {
      ...(currentProfile || {}),
      status: "approved",
      vipCode: code.trim(),
      approvedBy: "VIP_CODE",
    };
    updateAuthUi(currentUser, currentProfile);
    showToast("ปลดล็อก VIP สำเร็จแล้ว");
  } catch (error) {
    showToast(`ปลดล็อกไม่สำเร็จ: ${error.message}`);
  } finally {
    button.disabled = false;
  }
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

    if (unsubscribeFavorites) {
      unsubscribeFavorites();
      unsubscribeFavorites = null;
    }

    if (user) {
      unsubscribeFavorites = watchFavorites(user.uid, (favorites) => {
        favoriteIds = favorites;
        renderCardSettings();
      });
    } else {
      favoriteIds = new Set();
      renderCardSettings();
    }
  });
}
