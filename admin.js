import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  ADMIN_EMAIL,
  createVipCode,
  generateVipCode,
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

const loginButtons = [...document.querySelectorAll("#loginButton, .js-login")];
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const adminMessage = document.querySelector("#adminMessage");
const adminPanel = document.querySelector("#adminPanel");
const adminTabs = [...document.querySelectorAll("[data-admin-tab]")];
const adminPages = [...document.querySelectorAll(".admin-page")];
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
const vipCodeInput = document.querySelector("#vipCodeInput");
const generateCodeButton = document.querySelector("#generateCodeButton");
const saveCodeButton = document.querySelector("#saveCodeButton");
const copyLatestCodeButton = document.querySelector("#copyLatestCodeButton");
const copyLatestCodeInlineButton = document.querySelector("#copyLatestCodeInlineButton");
const latestCodeBox = document.querySelector("#latestCodeBox");
const latestCodeText = document.querySelector("#latestCodeText");
const vipCodesBody = document.querySelector("#vipCodesBody");
const vipCodesEmpty = document.querySelector("#vipCodesEmpty");
const ordersBody = document.querySelector("#ordersBody");
const ordersEmpty = document.querySelector("#ordersEmpty");
const communityRequestsBody = document.querySelector("#communityRequestsBody");
const communityRequestsEmpty = document.querySelector("#communityRequestsEmpty");

let currentUser = null;
let users = [];
let analyticsEvents = [];
let vipCodes = [];
let orders = [];
let communityRequests = [];
let announcement = null;
let gptSettings = {};
let pricingPage = null;
let unsubscribeUsers = null;
let unsubscribeAnalytics = null;
let unsubscribeVipCodes = null;
let unsubscribeOrders = null;
let unsubscribeCommunityRequests = null;
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
  adminMessage.style.borderColor = error ? "rgba(255, 113, 113, 0.45)" : "";
  adminMessage.style.background = error ? "rgba(255, 113, 113, 0.12)" : "";
}

async function copyText(text) {
  const value = String(text || "").trim();
  if (!value) return;
  await navigator.clipboard.writeText(value);
  showToast(`Copy Code แล้ว: ${value}`);
}

function setActiveAdminPage(pageId) {
  adminTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.adminTab === pageId));
  adminPages.forEach((page) => page.classList.toggle("is-active", page.id === pageId));
}

function formatDate(value) {
  if (!value) return "-";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
}

function updateAuthUi(user, profile) {
  const admin = Boolean(user && isAdminEmail(user.email));
  loginButtons.forEach((button) => (button.hidden = Boolean(user)));
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
  return sorted.filter((user) => `${user.email || ""} ${user.displayName || ""} ${user.status || ""}`.toLowerCase().includes(query));
}

function renderUsers() {
  const rows = filteredUsers();
  usersBody.innerHTML = "";
  emptyState.hidden = rows.length > 0;
  for (const user of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${user.email || "-"}</strong><small>${user.displayName || user.uid}</small></td>
      <td><span class="status ${user.status || "pending"}">${user.status || "pending"}</span></td>
      <td>${formatDate(user.createdAt)}</td>
      <td>${user.vipCode || user.approvedBy || "-"}</td>
      <td><div class="row-actions"><button class="danger-button" type="button" data-action="revoked" data-uid="${user.uid}">ปิดสิทธิ์</button></div></td>
    `;
    usersBody.appendChild(tr);
  }
}

function renderVipCodes() {
  const sorted = [...vipCodes].sort((a, b) => {
    const score = { active: 0, used: 1 };
    const byStatus = (score[a.status] ?? 9) - (score[b.status] ?? 9);
    if (byStatus !== 0) return byStatus;
    return String(a.code || a.id || "").localeCompare(String(b.code || b.id || ""));
  });
  vipCodesBody.innerHTML = "";
  vipCodesEmpty.hidden = sorted.length > 0;
  for (const code of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${code.code || code.id}</strong><small>${code.id}</small></td>
      <td>${code.email || code.usedBy || "-"}</td>
      <td><span class="status ${code.status || "active"}">${code.status || "active"}</span></td>
      <td>${formatDate(code.usedAt || code.createdAt)}</td>
      <td>${code.usedBy || "-"}</td>
      <td><button class="ghost-button" type="button" data-copy-code="${code.code || code.id}">Copy</button></td>
    `;
    vipCodesBody.appendChild(tr);
  }
}

function renderOrders() {
  const sorted = [...orders].sort((a, b) => {
    const aTime = typeof a.createdAt?.toMillis === "function" ? a.createdAt.toMillis() : 0;
    const bTime = typeof b.createdAt?.toMillis === "function" ? b.createdAt.toMillis() : 0;
    return bTime - aTime;
  });
  ordersBody.innerHTML = "";
  ordersEmpty.hidden = sorted.length > 0;
  for (const order of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${order.id}</strong><small>${order.provider || "mock"}</small></td>
      <td><strong>${order.email || "-"}</strong><small>${order.displayName || order.uid || "-"}</small></td>
      <td>${order.amount || 0} ${order.currency || "THB"}</td>
      <td><span class="status ${order.status || "pending"}">${order.status || "pending"}</span></td>
      <td>${formatDate(order.createdAt)}</td>
      <td>${formatDate(order.paidAt)}</td>
    `;
    ordersBody.appendChild(tr);
  }
}

function renderCommunityRequests() {
  const sorted = [...communityRequests].sort((a, b) => {
    const aTime = typeof a.updatedAt?.toMillis === "function" ? a.updatedAt.toMillis() : 0;
    const bTime = typeof b.updatedAt?.toMillis === "function" ? b.updatedAt.toMillis() : 0;
    return bTime - aTime;
  });
  communityRequestsBody.innerHTML = "";
  communityRequestsEmpty.hidden = sorted.length > 0;
  for (const request of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${request.facebookName || "-"}</strong><small>${request.displayName || request.uid || "-"}</small></td>
      <td>${request.email || "-"}</td>
      <td><span class="status ${request.status || "pending"}">${request.status || "pending"}</span></td>
      <td>${formatDate(request.updatedAt || request.createdAt)}</td>
    `;
    communityRequestsBody.appendChild(tr);
  }
}

function renderAnalytics() {
  const counts = Object.fromEntries(GPTS.map((gpt) => [gpt.id, { gpt_open: 0, copy_link: 0, detail_view: 0, locked_click: 0 }]));
  const totals = { gpt_open: 0, signup_cta: 0, locked_click: 0 };
  for (const event of analyticsEvents) {
    if (event.type in totals) totals[event.type] += 1;
    if (event.gptId && counts[event.gptId] && event.type in counts[event.gptId]) counts[event.gptId][event.type] += 1;
  }
  totalOpenCount.textContent = totals.gpt_open;
  signupCtaCount.textContent = totals.signup_cta;
  lockedClickCount.textContent = totals.locked_click;
  analyticsBody.innerHTML = "";
  for (const gpt of GPTS) {
    const row = counts[gpt.id];
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><strong>${GPTS_BY_ID[gpt.id]?.title || gpt.id}</strong><small>${gpt.id}</small></td><td>${row.gpt_open}</td><td>${row.copy_link}</td><td>${row.detail_view}</td><td>${row.locked_click}</td>`;
    analyticsBody.appendChild(tr);
  }
}

function renderAnnouncement() {
  announcementEnabled.checked = Boolean(announcement?.enabled);
  announcementMessage.value = announcement?.message || "";
}

function renderPricingPage() {
  if (!pricingPage) return;
  pricingPriceInput.value = pricingPage.price || "";
  pricingHeadlineInput.value = pricingPage.headline || "";
  pricingDescriptionInput.value = pricingPage.description || "";
  pricingBenefitsInput.value = (pricingPage.benefits || []).join("\n");
  pricingCtaInput.value = pricingPage.ctaText || "";
  pricingFacebookInput.value = pricingPage.facebookUrl || "";
}

function renderGptSettings() {
  gptSettingsBody.innerHTML = "";
  GPTS.forEach((gpt, index) => {
    const setting = gptSettings[gpt.id] || {};
    const order = Number.isFinite(Number(setting.order)) ? Number(setting.order) : index + 1;
    const visible = setting.visible !== false;
    const tr = document.createElement("tr");
    tr.dataset.gptId = gpt.id;
    tr.innerHTML = `
      <td><strong>${gpt.title}</strong><small>${gpt.id}</small></td>
      <td><input class="order-input" type="number" min="1" step="1" value="${order}" data-field="order" /></td>
      <td><input type="checkbox" ${visible ? "checked" : ""} data-field="visible" /></td>
      <td><button class="primary-button" type="button" data-action="save-gpt-setting">บันทึก</button></td>
    `;
    gptSettingsBody.appendChild(tr);
  });
}

function listenCollection(name, setData, render, errorLabel) {
  const svc = getFirebaseServices();
  if (!svc) return null;
  return onSnapshot(
    collection(svc.db, name),
    (snapshot) => {
      setData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
      render();
    },
    (error) => setMessage(`อ่าน${errorLabel}ไม่สำเร็จ: ${error.message}`, true),
  );
}

function startListeners() {
  unsubscribeUsers ||= listenCollection("users", (value) => (users = value), renderUsers, "รายชื่อผู้ใช้");
  unsubscribeAnalytics ||= listenCollection("analyticsEvents", (value) => (analyticsEvents = value), renderAnalytics, "สถิติ");
  unsubscribeVipCodes ||= listenCollection("vipCodes", (value) => (vipCodes = value), renderVipCodes, " VIP Code");
  unsubscribeOrders ||= listenCollection("orders", (value) => (orders = value), renderOrders, " Orders");
  unsubscribeCommunityRequests ||= listenCollection("communityRequests", (value) => (communityRequests = value), renderCommunityRequests, "รายชื่อขอเข้ากลุ่ม");
  unsubscribePricingPage ||= watchPricingPage((value) => {
    pricingPage = value;
    renderPricingPage();
  });
  unsubscribeAnnouncement ||= watchAnnouncement((value) => {
    announcement = value;
    renderAnnouncement();
  });
  unsubscribeGptSettings ||= watchGptSettings((settings) => {
    gptSettings = settings;
    renderGptSettings();
  });
}

function stopListeners() {
  [unsubscribeUsers, unsubscribeAnalytics, unsubscribeVipCodes, unsubscribeOrders, unsubscribeCommunityRequests, unsubscribePricingPage, unsubscribeAnnouncement, unsubscribeGptSettings]
    .filter(Boolean)
    .forEach((unsubscribe) => unsubscribe());
  unsubscribeUsers = unsubscribeAnalytics = unsubscribeVipCodes = unsubscribeOrders = unsubscribeCommunityRequests = unsubscribePricingPage = unsubscribeAnnouncement = unsubscribeGptSettings = null;
}

loginButtons.forEach((button) => button.addEventListener("click", () => signInWithGoogle()));
logoutButton?.addEventListener("click", () => signOutUser());
userSearch?.addEventListener("input", renderUsers);

adminTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveAdminPage(tab.dataset.adminTab);
  });
});

vipCodeInput?.addEventListener("input", () => {
  vipCodeInput.value = vipCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
});
generateCodeButton?.addEventListener("click", () => {
  vipCodeInput.value = generateVipCode();
});
copyLatestCodeButton?.addEventListener("click", () => copyText(vipCodeInput?.value));
copyLatestCodeInlineButton?.addEventListener("click", () => copyText(latestCodeText?.textContent));

saveCodeButton?.addEventListener("click", async () => {
  if (!currentUser) return;
  saveCodeButton.disabled = true;
  try {
    const code = await createVipCode({ code: vipCodeInput?.value || generateVipCode(), adminEmail: currentUser.email });
    vipCodeInput.value = code;
    copyLatestCodeButton.disabled = false;
    latestCodeText.textContent = code;
    latestCodeBox.classList.add("show");
    showToast(`สร้าง VIP Code แล้ว: ${code}`);
  } catch (error) {
    showToast(error.code === "permission-denied" ? "สร้าง VIP Code ไม่สำเร็จ: ต้อง Publish Firestore Rules เวอร์ชันใหม่ก่อน" : `สร้าง VIP Code ไม่สำเร็จ: ${error.message}`);
  } finally {
    saveCodeButton.disabled = false;
  }
});

vipCodesBody?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy-code]");
  if (button) copyText(button.dataset.copyCode);
});

usersBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !currentUser) return;
  button.disabled = true;
  try {
    await setUserStatus(button.dataset.uid, button.dataset.action, currentUser.email);
    showToast("ปิดสิทธิ์แล้ว");
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
      price: pricingPriceInput.value,
      headline: pricingHeadlineInput.value,
      description: pricingDescriptionInput.value,
      benefits: pricingBenefitsInput.value,
      ctaText: pricingCtaInput.value,
      facebookUrl: pricingFacebookInput.value,
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
    await saveAnnouncement({ enabled: announcementEnabled.checked, message: announcementMessage.value, adminEmail: currentUser.email });
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
  loginButtons.forEach((button) => button.setAttribute("disabled", "true"));
  adminPanel.hidden = true;
  setMessage(`ต้องเติมค่า Firebase ใน firebase-config.js ก่อนใช้งาน Admin Panel: ${ADMIN_EMAIL}`, true);
} else {
  watchAuth(({ user, profile, error }) => {
    currentUser = user;
    updateAuthUi(user, profile);
    if (error) {
      adminPanel.hidden = true;
      setMessage(`ตรวจสอบสิทธิ์ไม่สำเร็จ: ${error.message}`, true);
      stopListeners();
      return;
    }
    if (!user) {
      adminPanel.hidden = true;
      setMessage(`กรุณาเข้าสู่ระบบด้วย Gmail admin: ${ADMIN_EMAIL}`);
      stopListeners();
      return;
    }
    if (!isAdminEmail(user.email)) {
      adminPanel.hidden = true;
      setMessage("บัญชีนี้ไม่ใช่ Admin จึงไม่มีสิทธิ์ดูหรือแก้ไขข้อมูลหลังบ้าน", true);
      stopListeners();
      return;
    }
    adminMessage.classList.remove("show");
    adminPanel.hidden = false;
    startListeners();
  });
}
