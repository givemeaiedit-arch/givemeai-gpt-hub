import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  ADMIN_EMAIL,
  getFirebaseServices,
  isAdminEmail,
  isFirebaseConfigured,
  setUserStatus,
  signInWithGoogle,
  signOutUser,
  watchAuth,
} from "./auth-shared.js";
import { GPTS, GPTS_BY_ID } from "./gpt-data.js";
import {
  saveAnnouncement,
  saveGptSetting,
  savePricingPage,
  watchAnnouncement,
  watchGptSettings,
  watchPricingPage,
} from "./hub-state.js";

const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const adminMessage = document.querySelector("#adminMessage");
const adminPanel = document.querySelector("#adminPanel");
const usersBody = document.querySelector("#usersBody");
const emptyState = document.querySelector("#emptyState");
const userSearch = document.querySelector("#userSearch");
const toast = document.querySelector("#toast");
const totalOpenCount = document.querySelector("#totalOpenCount");
const signupCtaCount = document.querySelector("#signupCtaCount");
const lockedClickCount = document.querySelector("#lockedClickCount");
const analyticsBody = document.querySelector("#analyticsBody");
const announcementEnabled = document.querySelector("#announcementEnabled");
const announcementMessage = document.querySelector("#announcementMessage");
const saveAnnouncementButton = document.querySelector("#saveAnnouncementButton");
const gptSettingsBody = document.querySelector("#gptSettingsBody");
const pricingPriceInput = document.querySelector("#pricingPriceInput");
const pricingHeadlineInput = document.querySelector("#pricingHeadlineInput");
const pricingDescriptionInput = document.querySelector("#pricingDescriptionInput");
const pricingBenefitsInput = document.querySelector("#pricingBenefitsInput");
const pricingCtaInput = document.querySelector("#pricingCtaInput");
const pricingFacebookInput = document.querySelector("#pricingFacebookInput");
const savePricingButton = document.querySelector("#savePricingButton");

let currentUser = null;
let users = [];
let analyticsEvents = [];
let announcement = null;
let gptSettings = {};
let pricingPage = null;
let unsubscribeUsers = null;
let unsubscribeAnalytics = null;
let unsubscribeAnnouncement = null;
let unsubscribeGptSettings = null;
let unsubscribePricingPage = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function setMessage(message, error = false) {
  adminMessage.textContent = message;
  adminMessage.classList.add("show");
  adminMessage.style.borderColor = error ? "rgba(255, 107, 107, 0.45)" : "";
  adminMessage.style.background = error ? "rgba(255, 107, 107, 0.12)" : "";
}

function formatDate(value) {
  if (!value) return "-";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
}

function updateAuthUi(user, profile) {
  const admin = Boolean(user && isAdminEmail(user.email));
  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;
  if (userAvatar) userAvatar.src = user?.photoURL || "assets/favicon.png";
  if (userName) userName.textContent = user?.displayName || user?.email || "Guest";
  if (userStatus) userStatus.textContent = admin ? "Admin" : profile?.status || "pending";
}

function filteredUsers() {
  const query = (userSearch?.value || "").trim().toLowerCase();
  const sorted = [...users].sort((a, b) => {
    const score = { pending: 0, approved: 1, revoked: 2 };
    const byStatus = (score[a.status] ?? 9) - (score[b.status] ?? 9);
    if (byStatus !== 0) return byStatus;
    return String(a.email || "").localeCompare(String(b.email || ""));
  });

  if (!query) return sorted;
  return sorted.filter((user) =>
    `${user.email || ""} ${user.displayName || ""} ${user.status || ""}`.toLowerCase().includes(query),
  );
}

function renderUsers() {
  const rows = filteredUsers();
  usersBody.innerHTML = "";
  emptyState.hidden = rows.length > 0;

  for (const user of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${user.email || "-"}</strong>
        <small>${user.displayName || user.uid}</small>
      </td>
      <td><span class="status ${user.status || "pending"}">${user.status || "pending"}</span></td>
      <td>${formatDate(user.createdAt)}</td>
      <td>${user.approvedBy || "-"}</td>
      <td>
        <div class="row-actions">
          <button class="primary-button" type="button" data-action="approved" data-uid="${user.uid}">อนุมัติ</button>
          <button class="danger-button" type="button" data-action="revoked" data-uid="${user.uid}">ปิดสิทธิ์</button>
        </div>
      </td>
    `;
    usersBody.appendChild(tr);
  }
}

function renderAnalytics() {
  if (!analyticsBody) return;

  const counts = Object.fromEntries(
    GPTS.map((gpt) => [
      gpt.id,
      {
        gpt_open: 0,
        copy_link: 0,
        detail_view: 0,
        locked_click: 0,
      },
    ]),
  );
  const totals = {
    gpt_open: 0,
    signup_cta: 0,
    locked_click: 0,
  };

  for (const event of analyticsEvents) {
    if (event.type in totals) totals[event.type] += 1;
    if (event.gptId && counts[event.gptId] && event.type in counts[event.gptId]) {
      counts[event.gptId][event.type] += 1;
    }
  }

  totalOpenCount.textContent = totals.gpt_open;
  signupCtaCount.textContent = totals.signup_cta;
  lockedClickCount.textContent = totals.locked_click;
  analyticsBody.innerHTML = "";

  for (const gpt of GPTS) {
    const row = counts[gpt.id];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${GPTS_BY_ID[gpt.id]?.title || gpt.id}</strong>
        <small>${gpt.id}</small>
      </td>
      <td>${row.gpt_open}</td>
      <td>${row.copy_link}</td>
      <td>${row.detail_view}</td>
      <td>${row.locked_click}</td>
    `;
    analyticsBody.appendChild(tr);
  }
}

function renderAnnouncement() {
  if (announcementEnabled) announcementEnabled.checked = Boolean(announcement?.enabled);
  if (announcementMessage) announcementMessage.value = announcement?.message || "";
}

function renderPricingPage() {
  if (!pricingPage) return;
  if (pricingPriceInput) pricingPriceInput.value = pricingPage.price || "";
  if (pricingHeadlineInput) pricingHeadlineInput.value = pricingPage.headline || "";
  if (pricingDescriptionInput) pricingDescriptionInput.value = pricingPage.description || "";
  if (pricingBenefitsInput) pricingBenefitsInput.value = (pricingPage.benefits || []).join("\n");
  if (pricingCtaInput) pricingCtaInput.value = pricingPage.ctaText || "";
  if (pricingFacebookInput) pricingFacebookInput.value = pricingPage.facebookUrl || "";
}

function renderGptSettings() {
  if (!gptSettingsBody) return;
  gptSettingsBody.innerHTML = "";

  GPTS.forEach((gpt, index) => {
    const setting = gptSettings[gpt.id] || {};
    const order = Number.isFinite(Number(setting.order)) ? Number(setting.order) : index + 1;
    const visible = setting.visible !== false;
    const tr = document.createElement("tr");
    tr.dataset.gptId = gpt.id;
    tr.innerHTML = `
      <td>
        <strong>${gpt.title}</strong>
        <small>${gpt.id}</small>
      </td>
      <td><input class="order-input" type="number" min="1" step="1" value="${order}" data-field="order" /></td>
      <td><input class="visible-toggle" type="checkbox" ${visible ? "checked" : ""} data-field="visible" /></td>
      <td><button class="primary-button" type="button" data-action="save-gpt-setting">บันทึก</button></td>
    `;
    gptSettingsBody.appendChild(tr);
  });
}

function startUsersListener() {
  if (unsubscribeUsers) return;
  const svc = getFirebaseServices();
  if (!svc) return;

  unsubscribeUsers = onSnapshot(
    collection(svc.db, "users"),
    (snapshot) => {
      users = snapshot.docs.map((docSnap) => ({ uid: docSnap.id, ...docSnap.data() }));
      renderUsers();
    },
    (error) => {
      setMessage(`อ่านรายชื่อผู้ใช้ไม่สำเร็จ: ${error.message}`, true);
    },
  );
}

function startAnalyticsListener() {
  if (unsubscribeAnalytics) return;
  const svc = getFirebaseServices();
  if (!svc) return;

  unsubscribeAnalytics = onSnapshot(
    collection(svc.db, "analyticsEvents"),
    (snapshot) => {
      analyticsEvents = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      renderAnalytics();
    },
    (error) => {
      setMessage(`อ่านสถิติไม่สำเร็จ: ${error.message}`, true);
    },
  );
}

function startAdminConfigListeners() {
  const svc = getFirebaseServices();
  if (!svc) return;

  if (!unsubscribePricingPage) {
    unsubscribePricingPage = watchPricingPage((value) => {
      pricingPage = value;
      renderPricingPage();
    });
  }

  if (!unsubscribeAnnouncement) {
    unsubscribeAnnouncement = watchAnnouncement((value) => {
      announcement = value;
      renderAnnouncement();
    });
  }

  if (!unsubscribeGptSettings) {
    unsubscribeGptSettings = watchGptSettings((settings) => {
      gptSettings = settings;
      renderGptSettings();
    });
  }
}

function stopUsersListener() {
  if (!unsubscribeUsers) return;
  unsubscribeUsers();
  unsubscribeUsers = null;
}

function stopAnalyticsListener() {
  if (!unsubscribeAnalytics) return;
  unsubscribeAnalytics();
  unsubscribeAnalytics = null;
}

function stopAdminConfigListeners() {
  if (unsubscribePricingPage) {
    unsubscribePricingPage();
    unsubscribePricingPage = null;
  }
  if (unsubscribeAnnouncement) {
    unsubscribeAnnouncement();
    unsubscribeAnnouncement = null;
  }
  if (unsubscribeGptSettings) {
    unsubscribeGptSettings();
    unsubscribeGptSettings = null;
  }
}

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

userSearch?.addEventListener("input", renderUsers);

usersBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !currentUser) return;
  button.disabled = true;
  try {
    await setUserStatus(button.dataset.uid, button.dataset.action, currentUser.email);
    showToast(button.dataset.action === "approved" ? "อนุมัติแล้ว" : "ปิดสิทธิ์แล้ว");
  } catch (error) {
    showToast(`บันทึกไม่สำเร็จ: ${error.message}`);
  } finally {
    button.disabled = false;
  }
});

savePricingButton?.addEventListener("click", async () => {
  if (!currentUser) return;
  savePricingButton.disabled = true;
  try {
    await savePricingPage({
      price: pricingPriceInput?.value,
      headline: pricingHeadlineInput?.value,
      description: pricingDescriptionInput?.value,
      benefits: pricingBenefitsInput?.value,
      ctaText: pricingCtaInput?.value,
      facebookUrl: pricingFacebookInput?.value,
      adminEmail: currentUser.email,
    });
    showToast("บันทึกหน้า Pricing แล้ว");
  } catch (error) {
    showToast(`บันทึกหน้า Pricing ไม่สำเร็จ: ${error.message}`);
  } finally {
    savePricingButton.disabled = false;
  }
});

saveAnnouncementButton?.addEventListener("click", async () => {
  if (!currentUser) return;
  saveAnnouncementButton.disabled = true;
  try {
    await saveAnnouncement({
      enabled: announcementEnabled?.checked,
      message: announcementMessage?.value,
      adminEmail: currentUser.email,
    });
    showToast("บันทึกประกาศแล้ว");
  } catch (error) {
    showToast(`บันทึกประกาศไม่สำเร็จ: ${error.message}`);
  } finally {
    saveAnnouncementButton.disabled = false;
  }
});

gptSettingsBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action='save-gpt-setting']");
  if (!button || !currentUser) return;

  const row = button.closest("tr[data-gpt-id]");
  const orderInput = row?.querySelector("[data-field='order']");
  const visibleInput = row?.querySelector("[data-field='visible']");
  if (!row || !orderInput || !visibleInput) return;

  button.disabled = true;
  try {
    await saveGptSetting(row.dataset.gptId, {
      order: Number(orderInput.value || 999),
      visible: visibleInput.checked,
      adminEmail: currentUser.email,
    });
    showToast("บันทึกการตั้งค่า GPT แล้ว");
  } catch (error) {
    showToast(`บันทึกการตั้งค่าไม่สำเร็จ: ${error.message}`);
  } finally {
    button.disabled = false;
  }
});

if (!isFirebaseConfigured()) {
  loginButton?.setAttribute("disabled", "true");
  adminPanel.hidden = true;
  setMessage(`ต้องเติมค่า Firebase ใน firebase-config.js ก่อนใช้งาน Admin Panel: ${ADMIN_EMAIL}`, true);
} else {
  watchAuth(({ user, profile, error }) => {
    currentUser = user;
    updateAuthUi(user, profile);

    if (error) {
      adminPanel.hidden = true;
      setMessage(`ตรวจสอบสิทธิ์ไม่สำเร็จ: ${error.message}`, true);
      stopUsersListener();
      stopAnalyticsListener();
      stopAdminConfigListeners();
      return;
    }

    if (!user) {
      adminPanel.hidden = true;
      setMessage(`กรุณาเข้าสู่ระบบด้วย Gmail admin: ${ADMIN_EMAIL}`);
      stopUsersListener();
      stopAnalyticsListener();
      stopAdminConfigListeners();
      return;
    }

    if (!isAdminEmail(user.email)) {
      adminPanel.hidden = true;
      setMessage("บัญชีนี้ไม่ใช่ Admin จึงไม่มีสิทธิ์ดูหรืออนุมัติผู้ใช้", true);
      stopUsersListener();
      stopAnalyticsListener();
      stopAdminConfigListeners();
      return;
    }

    adminMessage.classList.remove("show");
    adminPanel.hidden = false;
    startUsersListener();
    startAnalyticsListener();
    startAdminConfigListeners();
  });
}
