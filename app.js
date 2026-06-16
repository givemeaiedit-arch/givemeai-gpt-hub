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
const memberDashboardLevel = document.querySelector("#memberDashboardLevel");
const memberDashboardAccess = document.querySelector("#memberDashboardAccess");
const memberDashboardUpdate = document.querySelector("#memberDashboardUpdate");
const memberDashboardAccount = document.querySelector("#memberDashboardAccount");
const memberDashboardStatus = document.querySelector("#memberDashboardStatus");
const memberDashboardPrimary = document.querySelector("#memberDashboardPrimary");
const memberUpgradeButton = document.querySelector("#memberUpgradeButton");
const memberDashboardHelp = document.querySelector("#memberDashboardHelp");
const toast = document.querySelector("#toast");
const cardsGrid = document.querySelector("#cards");
const allCards = [...document.querySelectorAll(".card")];
const protectedCards = [...document.querySelectorAll(".card[data-protected='true']")];
const searchInputs = [...document.querySelectorAll("#search, #globalSearch")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const viewButtons = [...document.querySelectorAll("[data-view]")];
const visibleCount = document.querySelector("#visibleCount");
const defaultOrder = new Map(GPTS.map((gpt, index) => [gpt.id, index + 1]));

let currentUser = null;
let currentProfile = null;
let currentIsAdmin = false;
let gptSettings = {};
let favoriteIds = new Set();
let activeFilter = "all";
let unsubscribeFavorites = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function getSearchValue() {
  return searchInputs.find((input) => input?.value.trim())?.value.trim().toLowerCase() || "";
}

function getStatusLabel(profile) {
  if (!currentUser) return "ยังไม่ได้เข้าสู่ระบบ";
  if (isAdminEmail(currentUser.email)) return "ระดับสมาชิก: Admin";
  if (!profile) return "กำลังตรวจสอบสิทธิ์";
  if (profile.status === "approved") return "ระดับสมาชิก: Member";
  if (profile.status === "revoked") return "ถูกปิดสิทธิ์";
  return "ระดับสมาชิก: Free";
}

function setDashboardLink(link, href, text) {
  if (!link) return;
  link.href = href;
  link.textContent = text;
}

function updateMemberDashboard(user, profile, approved) {
  const admin = Boolean(user && isAdminEmail(user.email));
  const revoked = profile?.status === "revoked";
  const accountText = user?.email || "เข้าสู่ระบบด้วย Gmail";

  if (memberDashboardAccount) memberDashboardAccount.textContent = accountText;

  if (admin) {
    if (memberDashboardLevel) memberDashboardLevel.textContent = "Admin";
    if (memberDashboardAccess) memberDashboardAccess.textContent = "ปลดล็อกทุก GPT และ Admin Panel";
    if (memberDashboardUpdate) memberDashboardUpdate.textContent = "จัดการระบบได้";
    if (memberDashboardStatus) memberDashboardStatus.textContent = "สถานะ: Admin ใช้งานได้ทุกระบบ";
    setDashboardLink(memberDashboardPrimary, "admin.html", "เปิด Admin Panel");
    setDashboardLink(memberUpgradeButton, "pricing.html", "ดูแพ็กสมาชิก");
    if (memberDashboardHelp) memberDashboardHelp.textContent = "บัญชี Admin สามารถจัดการสมาชิก, VIP Code, Orders และเนื้อหาหน้าเว็บได้";
    return;
  }

  if (approved) {
    if (memberDashboardLevel) memberDashboardLevel.textContent = "Member";
    if (memberDashboardAccess) memberDashboardAccess.textContent = "ปลดล็อก GPT สมาชิก";
    if (memberDashboardUpdate) memberDashboardUpdate.textContent = "อัปเดตต่อเนื่อง";
    if (memberDashboardStatus) memberDashboardStatus.textContent = "สถานะ: จ่ายแล้ว ใช้งาน GPT สมาชิกได้";
    setDashboardLink(memberDashboardPrimary, "#links", "เปิดเครื่องมือ GPT");
    setDashboardLink(memberUpgradeButton, "pricing.html", "อัปเกรดระดับสมาชิก");
    if (memberDashboardHelp) memberDashboardHelp.textContent = "ต้องการบทเรียนเสริมเพิ่มเติม? อัปเกรดเป็น Pro ได้จากหน้าสมัครสมาชิก";
    return;
  }

  if (revoked) {
    if (memberDashboardLevel) memberDashboardLevel.textContent = "ถูกปิดสิทธิ์";
    if (memberDashboardAccess) memberDashboardAccess.textContent = "ใช้งาน Free เท่านั้น";
    if (memberDashboardUpdate) memberDashboardUpdate.textContent = "ติดต่อ Admin";
    if (memberDashboardStatus) memberDashboardStatus.textContent = "สถานะ: ถูกปิดสิทธิ์";
    setDashboardLink(memberDashboardPrimary, "pricing.html", "ดูรายละเอียดสมาชิก");
    setDashboardLink(memberUpgradeButton, "https://www.facebook.com/AiCreativesN/", "ติดต่อ Admin");
    if (memberDashboardHelp) memberDashboardHelp.textContent = "บัญชีนี้ถูกปิดสิทธิ์ กรุณาติดต่อแอดมินเพื่อเปิดใช้งานอีกครั้ง";
    return;
  }

  if (memberDashboardLevel) memberDashboardLevel.textContent = user ? "Free" : "Guest";
  if (memberDashboardAccess) memberDashboardAccess.textContent = "Free 2 GPT";
  if (memberDashboardUpdate) memberDashboardUpdate.textContent = "สมัครเพื่อปลดล็อก";
  if (memberDashboardStatus) memberDashboardStatus.textContent = user ? "สถานะ: ยังไม่ได้ชำระ Member" : "สถานะ: ยังไม่ได้เข้าสู่ระบบ";
  setDashboardLink(memberDashboardPrimary, "pricing.html", user ? "สมัคร Member" : "เข้าสู่ระบบ / สมัครสมาชิก");
  setDashboardLink(memberUpgradeButton, "pricing.html", "อัปเกรดระดับสมาชิก");
  if (memberDashboardHelp) memberDashboardHelp.textContent = "Member 390 บาทขึ้นไปจะปลดล็อก GPT สมาชิกและกดเข้ากลุ่มเรียนรู้ได้";
}

function setSystemNote(message) {
  const note = document.querySelector("#systemNote");
  if (!note) return;
  note.textContent = message || "";
  note.classList.toggle("show", Boolean(message));
}

function setMemberStatus(user, profile, approved) {
  const status = document.querySelector("#memberStatus");
  if (!status) return;

  status.hidden = !user;
  status.className = "member-status";

  if (!user) {
    status.textContent = "";
    return;
  }

  if (isAdminEmail(user.email)) {
    status.classList.add("approved", "show");
    status.textContent = "ระดับสมาชิก: Admin - ปลดล็อกทุก GPT แล้ว";
    return;
  }

  if (approved) {
    status.classList.add("approved", "show");
    status.textContent = "ระดับสมาชิก: Member - ใช้งาน GPT สมาชิกได้";
    return;
  }

  if (profile?.status === "revoked") {
    status.classList.add("revoked", "show");
    status.innerHTML = `ถูกปิดสิทธิ์ - ติดต่อ Admin <a href="https://www.facebook.com/AiCreativesN/" target="_blank" rel="noopener">Fanpage</a>`;
    return;
  }

  status.classList.add("pending", "show");
  status.innerHTML = `
    <strong>ยังไม่เป็น Member</strong>
    <span>กรอก VIP Code 5 หลักที่ได้รับจาก Admin เพื่อปลดล็อก GPT สมาชิก</span>
    <div class="vip-redeem">
      <input id="vipCodeInput" type="text" inputmode="text" autocomplete="one-time-code" maxlength="5" pattern="[A-Za-z0-9]{5}" placeholder="เช่น A7K2Q" />
      <button class="primary-button" id="redeemCodeButton" type="button">ปลดล็อก Member</button>
      <a class="ghost-button vip-signup-button" href="pricing.html">สมัครสมาชิก</a>
    </div>
    <small>1 Code ใช้ได้กับ 1 Gmail เท่านั้น</small>
  `;
}

function setAnnouncement(announcement) {
  const banner = document.querySelector("#announcementBanner");
  if (!banner) return;
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

function applyCardSearch() {
  const value = getSearchValue();
  let total = 0;

  allCards.forEach((card) => {
    const text = `${card.textContent || ""} ${card.dataset.search || ""}`.toLowerCase();
    const hiddenByAdmin = card.dataset.hiddenByAdmin === "true";
    const isVip = card.dataset.protected === "true";
    const isUpcoming = card.dataset.upcoming === "true";
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "free" && !isVip && !isUpcoming) ||
      (activeFilter === "vip" && isVip && !isUpcoming) ||
      (activeFilter === "latest" && isUpcoming);
    const show = !hiddenByAdmin && matchesFilter && (!value || text.includes(value));
    card.hidden = !show;
    if (show) total += 1;
  });

  if (visibleCount) visibleCount.textContent = String(total);
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

  applyCardSearch();
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
    if (link && !link.dataset.gptUrl) link.dataset.gptUrl = link.href;
    if (copy && !copy.dataset.copyOriginal) copy.dataset.copyOriginal = copy.dataset.copy || "";
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
  if (userAvatar) userAvatar.src = user?.photoURL || "assets/favicon.png";
  if (userName) userName.textContent = user?.displayName || user?.email || "Guest";
  if (userStatus) userStatus.textContent = getStatusLabel(profile);

  setProtectedAccess(approved);
  updateMemberDashboard(user, profile, approved);
  setMemberStatus(user, profile, approved);
  setFavoriteUi();
  renderCardSettings();
}

function attachCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const link = button.dataset.copy;
      if (!link) return;
      try {
        await navigator.clipboard.writeText(link);
      } catch {
        const temp = document.createElement("textarea");
        temp.value = link;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
      }
      const card = button.closest(".card");
      if (card) trackEvent("copy_link", card.dataset.gptId || "");
      showToast("คัดลอกลิงก์แล้ว");
    });
  });
}

ensureFavoriteButtons();
prepareProtectedCards();
attachCopyButtons();
setProtectedAccess(false);
renderCardSettings();

searchInputs.forEach((input) => {
  input?.addEventListener("input", () => {
    searchInputs.forEach((other) => {
      if (other !== input) other.value = input.value;
    });
    applyCardSearch();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    applyCardSearch();
  });
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    cardsGrid?.classList.toggle("is-list-view", button.dataset.view === "list");
  });
});

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
    showToast("ปลดล็อก Member สำเร็จแล้ว");
  } catch (error) {
    showToast(`ปลดล็อกไม่สำเร็จ: ${error.message}`);
  } finally {
    button.disabled = false;
  }
});

document.addEventListener("input", (event) => {
  if (event.target?.id !== "vipCodeInput") return;
  event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
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

    setSystemNote(error ? "เชื่อมต่อ Firebase ได้ แต่ตรวจสอบสิทธิ์ผู้ใช้ไม่สำเร็จ กรุณาตรวจ Firestore rules และ config" : "");
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
