import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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

const loginButton = document.querySelector("#loginButton");
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
  adminMessage.style.borderColor = error ? "rgba(255, 107, 107, 0.45)" : "";
  adminMessage.style.background = error ? "rgba(255, 107, 107, 0.12)" : "";
}

async function copyText(text) {
  const value = String(text || "").trim();
  if (!value) return;
  await navigator.clipboard.writeText(value);
  showToast(`Copy Code แล้ว: ${value}`);
}

function setActiveAdminPage(pageId) {
  adminTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.adminTab === pageId);
  });
  adminPages.forEach((page) => {
    page.classList.toggle("is-active", page.id === pageId);
  });
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
      <td>${user.vipCode || user.approvedBy || "-"}</td>
      <td>
        <div class="row-actions">
          <button class="danger-button" type="button" data-action="revoked" data-uid="${user.uid}">ปิดสิทธิ์</button>
        </div>
      </td>
    `;
    usersBody.appendChild(tr);
  }
}

function renderVipCodes() {
  if (!vipCodesBody) return;
  const sorted = [...vipCodes].sort((a, b) => {
    const statusScore = { active: 0, used: 1 };
    const byStatus = (statusScore[a.status] ?? 9) - (statusScore[b.status] ?? 9);
    if (byStatus !== 0) return byStatus;
    return String(a.code || a.id || "").localeCompare(String(b.code || b.id || ""));
  });

  vipCodesBody.innerHTML = "";
  if (vipCodesEmpty) vipCodesEmpty.hidden = sorted.length > 0;

  for (const code of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${code.code || code.id}</strong>
        <small>${code.id}</small>
      </td>
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
  if (!ordersBody) return;
  const sorted = [...orders].sort((a, b) => {
    const aTime = typeof a.createdAt?.toMillis === "function" ? a.createdAt.toMillis() : 0;
    const bTime = typeof b.createdAt?.toMillis === "function" ? b.createdAt.toMillis() : 0;
    return bTime - aTime;
  });

  ordersBody.innerHTML = "";
  if (ordersEmpty) ordersEmpty.hidden = sorted.length > 0;

  for (const order of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${order.id}</strong>
        <small>${order.provider || "mock"}</small>
      </td>
      <td>
        <strong>${order.email || "-"}</strong>
        <small>${order.displayName || order.uid || "-"}</small>
      </td>
      <td>${order.amount || 0} ${order.currency || "THB"}</td>
      <td><span class="status ${order.status || "pending"}">${order.status || "pending"}</span></td>
      <td>${formatDate(order.createdAt)}</td>
      <td>${formatDate(order.paidAt)}</td>
    `;
    ordersBody.appendChild(tr);
  }
}

function renderCommunityRequests() {
  if (!communityRequestsBody) return;
  const sorted = [...communityRequests].sort((a, b) => {
    const aTime = typeof a.updatedAt?.toMillis === "function" ? a.updatedAt.toMillis() : 0;
    const bTime = typeof b.updatedAt?.toMillis === "function" ? b.updatedAt.toMillis() : 0;
    return bTime - aTime;
  });

  communityRequestsBody.innerHTML = "";
  if (communityRequestsEmpty) communityRequestsEmpty.hidden = sorted.length > 0;

  for (const request of sorted) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${request.facebookName || "-"}</strong>
        <small>${request.displayName || request.uid || "-"}</small>
      </td>
      <td>${request.email || "-"}</td>
      <td><span class="status ${request.status || "pending"}">${request.status || "pending"}</span></td>
      <td>${formatDate(request.updatedAt || request.createdAt)}</td>
    `;
    communityRequestsBody.appendChild(tr);
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

function startVipCodesListener() {
  if (unsubscribeVipCodes) return;
  const svc = getFirebaseServices();
  if (!svc) return;

  unsubscribeVipCodes = onSnapshot(
    collection(svc.db, "vipCodes"),
    (snapshot) => {
      vipCodes = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      renderVipCodes();
    },
    (error) => {
      setMessage(`อ่าน VIP Code ไม่สำเร็จ: ${error.message}`, true);
    },
  );
}

function startOrdersListener() {
  if (unsubscribeOrders) return;
  const svc = getFirebaseServices();
  if (!svc) return;

  unsubscribeOrders = onSnapshot(
    collection(svc.db, "orders"),
    (snapshot) => {
      orders = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      renderOrders();
    },
    (error) => {
      setMessage(`อ่าน Orders ไม่สำเร็จ: ${error.message}`, true);
    },
  );
}

function startCommunityRequestsListener() {
  if (unsubscribeCommunityRequests) return;
  const svc = getFirebaseServices();
  if (!svc) return;

  unsubscribeCommunityRequests = onSnapshot(
    collection(svc.db, "communityRequests"),
    (snapshot) => {
      communityRequests = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      renderCommunityRequests();
    },
    (error) => {
      setMessage(`อ่านรายชื่อขอเข้ากลุ่มไม่สำเร็จ: ${error.message}`, true);
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

function stopVipCodesListener() {
  if (!unsubscribeVipCodes) return;
  unsubscribeVipCodes();
  unsubscribeVipCodes = null;
}

function stopOrdersListener() {
  if (!unsubscribeOrders) return;
  unsubscribeOrders();
  unsubscribeOrders = null;
}

function stopCommunityRequestsListener() {
  if (!unsubscribeCommunityRequests) return;
  unsubscribeCommunityRequests();
  unsubscribeCommunityRequests = null;
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

adminTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveAdminPage(tab.dataset.adminTab);
  });
});

logoutButton?.addEventListener("click", async () => {
  await signOutUser();
  showToast("ออกจากระบบแล้ว");
});

userSearch?.addEventListener("input", renderUsers);

vipCodeInput?.addEventListener("input", () => {
  vipCodeInput.value = vipCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
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

generateCodeButton?.addEventListener("click", () => {
  if (vipCodeInput) vipCodeInput.value = generateVipCode();
});

copyLatestCodeButton?.addEventListener("click", () => copyText(vipCodeInput?.value));
copyLatestCodeInlineButton?.addEventListener("click", () => copyText(latestCodeText?.textContent));

saveCodeButton?.addEventListener("click", async () => {
  if (!currentUser) return;
  saveCodeButton.disabled = true;
  try {
    const code = await createVipCode({
      code: vipCodeInput?.value || generateVipCode(),
      adminEmail: currentUser.email,
    });
    if (vipCodeInput) vipCodeInput.value = code;
    if (copyLatestCodeButton) copyLatestCodeButton.disabled = false;
    if (latestCodeText) latestCodeText.textContent = code;
    latestCodeBox?.classList.add("show");
    showToast(`สร้าง VIP Code แล้ว: ${code}`);
  } catch (error) {
    const message = error.code === "permission-denied"
      ? "สร้าง VIP Code ไม่สำเร็จ: ต้อง Publish Firestore Rules เวอร์ชันใหม่ก่อน"
      : `สร้าง VIP Code ไม่สำเร็จ: ${error.message}`;
    showToast(message);
  } finally {
    saveCodeButton.disabled = false;
  }
});

vipCodesBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-code]");
  if (!button) return;
  await copyText(button.dataset.copyCode);
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
      stopVipCodesListener();
      stopOrdersListener();
      stopCommunityRequestsListener();
      stopAdminConfigListeners();
      return;
    }

    if (!user) {
      adminPanel.hidden = true;
      setMessage(`กรุณาเข้าสู่ระบบด้วย Gmail admin: ${ADMIN_EMAIL}`);
      stopUsersListener();
      stopAnalyticsListener();
      stopVipCodesListener();
      stopOrdersListener();
      stopCommunityRequestsListener();
      stopAdminConfigListeners();
      return;
    }

    if (!isAdminEmail(user.email)) {
      adminPanel.hidden = true;
      setMessage("บัญชีนี้ไม่ใช่ Admin จึงไม่มีสิทธิ์ดูหรืออนุมัติผู้ใช้", true);
      stopUsersListener();
      stopAnalyticsListener();
      stopVipCodesListener();
      stopOrdersListener();
      stopCommunityRequestsListener();
      stopAdminConfigListeners();
      return;
    }

    adminMessage.classList.remove("show");
    adminPanel.hidden = false;
    startUsersListener();
    startAnalyticsListener();
    startVipCodesListener();
    startOrdersListener();
    startCommunityRequestsListener();
    startAdminConfigListeners();
  });
}
