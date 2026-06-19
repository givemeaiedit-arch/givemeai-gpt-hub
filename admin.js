import { watchAuth, getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
const GENERATE_PRO_CODE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/generateProCode";

const adminStatus = document.querySelector("#adminStatus");
const adminUserCount = document.querySelector("#adminUserCount");
const adminCheckCount = document.querySelector("#adminCheckCount");
const adminLatestTime = document.querySelector("#adminLatestTime");
const adminUsersBody = document.querySelector("#adminUsersBody");
const adminHistoryBody = document.querySelector("#adminHistoryBody");
const adminUserHistoryBody = document.querySelector("#adminUserHistoryBody");
const adminProfileDetail = document.querySelector("#adminProfileDetail");
const adminUsersLabel = document.querySelector("#adminUsersLabel");
const adminHistoryLabel = document.querySelector("#adminHistoryLabel");
const adminSearchInput = document.querySelector("#adminSearchInput");
const proCodesLabel = document.querySelector("#proCodesLabel");
const proCodesBody = document.querySelector("#proCodesBody");
const generateProCodeButton = document.querySelector("#generateProCodeButton");
const proCodeStatus = document.querySelector("#proCodeStatus");

let allUsers = [];
let allHistory = [];
let allProCodes = [];
let currentAdmin = null;

function isAdminUser(user) {
  return ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase());
}

function normalizeAccessValue(value) {
  return String(value || "").trim().toLowerCase();
}

function getMemberLevel(data) {
  const values = [
    data?.plan,
    data?.tier,
    data?.memberLevel,
    data?.subscriptionStatus,
  ].map(normalizeAccessValue);

  if (values.includes("admin")) return "Admin";
  if (values.includes("pro") || values.includes("active")) return "Pro";
  return "Free";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toIsoString(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return "";
}

function formatDate(value) {
  const iso = toIsoString(value);
  if (!iso) return "-";
  return new Date(iso).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getProfileName(data) {
  return data.displayName || data.googleDisplayName || data.email?.split("@")[0] || "ผู้ใช้ Gmail";
}

function getProfilePhoto(data) {
  return data.photoURL || data.googlePhotoURL || fallbackAvatar;
}

function setAdminStatus(message, tone = "muted") {
  if (!adminStatus) return;
  adminStatus.textContent = message;
  adminStatus.dataset.tone = tone;
}

function setProCodeStatus(message, tone = "muted") {
  if (!proCodeStatus) return;
  proCodeStatus.textContent = message;
  proCodeStatus.dataset.tone = tone;
}

function setEmptyTable(body, message, columnCount = 6) {
  if (!body) return;
  body.innerHTML = `<tr><td colspan="${columnCount}">${escapeHtml(message)}</td></tr>`;
}

function filterData() {
  const keyword = adminSearchInput?.value?.trim().toLowerCase() || "";
  if (!keyword) {
    return { users: allUsers, history: allHistory, proCodes: allProCodes };
  }

  const users = allUsers.filter((item) => {
    const haystack = `${item.email} ${item.displayName} ${item.memberLevel}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const history = allHistory.filter((item) => {
    const haystack = `${item.userEmail} ${item.displayName} ${item.fileName} ${item.productName}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const proCodes = allProCodes.filter((item) => {
    const haystack =
      `${item.code} ${item.statusLabel} ${item.redeemedByEmail} ${item.createdByEmail}`.toLowerCase();
    return haystack.includes(keyword);
  });

  return { users, history, proCodes };
}

function renderUsers(users) {
  if (adminUsersLabel) adminUsersLabel.textContent = `${users.length} users`;

  if (!users.length) {
    setEmptyTable(adminUsersBody, "ยังไม่มีผู้ใช้", 5);
    return;
  }

  adminUsersBody.innerHTML = users
    .map(
      (user) => `
        <tr>
          <td>
            <div class="leaderboard-user">
              <img src="${escapeHtml(user.photoURL)}" alt="" />
              <span>${escapeHtml(user.displayName)}</span>
            </div>
          </td>
          <td>${escapeHtml(user.email || "-")}</td>
          <td>${escapeHtml(user.memberLevel)}</td>
          <td>${formatDate(user.updatedAt)}</td>
          <td><button class="soft-button admin-small-button" type="button" data-admin-user="${escapeHtml(user.uid)}">ดูโปรไฟล์</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderHistory(history) {
  if (adminHistoryLabel) adminHistoryLabel.textContent = `${history.length} checks`;

  if (!history.length) {
    setEmptyTable(adminHistoryBody, "ยังไม่มีประวัติ Check Ads", 6);
    return;
  }

  adminHistoryBody.innerHTML = history
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.checkedAt)}</td>
          <td>${escapeHtml(item.userEmail || "-")}</td>
          <td>${escapeHtml(item.fileName || "-")}</td>
          <td>${escapeHtml(item.productName || "-")}</td>
          <td>${Number(item.score || 0)}/100</td>
          <td><button class="soft-button admin-small-button" type="button" data-admin-user="${escapeHtml(item.uid)}">ดูโปรไฟล์</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderProCodes(codes) {
  if (proCodesLabel) proCodesLabel.textContent = `${codes.length} codes`;

  if (!codes.length) {
    setEmptyTable(proCodesBody, "ยังไม่มี Pro Code", 5);
    return;
  }

  proCodesBody.innerHTML = codes
    .map(
      (item) => `
        <tr>
          <td><strong>${escapeHtml(item.code)}</strong></td>
          <td>${escapeHtml(item.statusLabel)}</td>
          <td>${formatDate(item.createdAt)}</td>
          <td>${escapeHtml(item.redeemedByEmail || "-")}</td>
          <td>
            <button class="soft-button admin-small-button" type="button" data-copy-code="${escapeHtml(item.code)}">Copy</button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderAll() {
  const { users, history, proCodes } = filterData();
  renderUsers(users);
  renderHistory(history);
  renderProCodes(proCodes);

  if (adminUserCount) adminUserCount.textContent = String(allUsers.length);
  if (adminCheckCount) adminCheckCount.textContent = String(allHistory.length);
  if (adminLatestTime) adminLatestTime.textContent = formatDate(allHistory[0]?.checkedAt);
}

function normalizeUserDoc(entry) {
  const data = entry.data() || {};
  return {
    uid: entry.id,
    email: data.email || "",
    displayName: getProfileName(data),
    photoURL: getProfilePhoto(data),
    memberLevel: getMemberLevel(data),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    plan: data.plan || "",
    tier: data.tier || "",
    subscriptionStatus: data.subscriptionStatus || "",
    proCode: data.proCode || "",
  };
}

function normalizeHistoryDoc(entry) {
  const data = entry.data() || {};
  return {
    id: entry.id,
    uid: data.uid || "",
    userEmail: data.userEmail || "",
    displayName: data.displayName || data.userEmail || "",
    photoURL: data.photoURL || fallbackAvatar,
    fileName: data.fileName || "",
    productName: data.productName || "",
    score: Number(data.score || data.result?.overall_score || 0),
    duplicateHits: Number(data.duplicateHits || 0),
    checkedAt: data.checkedAt,
    targetMarket: data.targetMarket || "",
    objective: data.objective || "",
  };
}

function normalizeProCodeDoc(entry) {
  const data = entry.data() || {};
  const redeemedByEmail = data.redeemedByEmail || "";
  const status = String(data.status || (redeemedByEmail ? "redeemed" : "available")).toLowerCase();
  return {
    id: entry.id,
    code: data.code || entry.id,
    status,
    statusLabel: status === "redeemed" ? "ใช้แล้ว" : "พร้อมใช้",
    createdAt: data.createdAt,
    createdByEmail: data.createdByEmail || "",
    redeemedByEmail,
    redeemedAt: data.redeemedAt,
  };
}

async function loadAdminData() {
  if (!isFirebaseConfigured()) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  const services = getFirebaseServices();
  const usersQuery = query(collection(services.db, "users"), orderBy("updatedAt", "desc"), limit(100));
  const historyQuery = query(collection(services.db, "adCheckHistory"), orderBy("checkedAt", "desc"), limit(200));
  const proCodesQuery = query(collection(services.db, "proCodes"), orderBy("createdAt", "desc"), limit(200));

  setAdminStatus("กำลังโหลดข้อมูลหลังบ้าน...", "loading");

  const [usersSnapshot, historySnapshot, proCodesSnapshot] = await Promise.all([
    getDocs(usersQuery),
    getDocs(historyQuery),
    getDocs(proCodesQuery),
  ]);

  allUsers = usersSnapshot.docs.map(normalizeUserDoc);
  allHistory = historySnapshot.docs.map(normalizeHistoryDoc);
  allProCodes = proCodesSnapshot.docs.map(normalizeProCodeDoc);

  renderAll();
  setAdminStatus("โหลดข้อมูล Admin สำเร็จ", "success");
}

async function loadUserProfile(uid) {
  if (!uid || !currentAdmin) return;

  const services = getFirebaseServices();
  const userSnapshot = await getDoc(doc(services.db, "users", uid));
  const profile = userSnapshot.exists() ? normalizeUserDoc(userSnapshot) : { uid, displayName: "-", email: "-" };
  const historySnapshot = await getDocs(
    query(collection(services.db, "users", uid, "adCheckHistory"), orderBy("checkedAt", "desc"), limit(50)),
  );
  const history = historySnapshot.docs.map(normalizeHistoryDoc);

  if (adminProfileDetail) {
    adminProfileDetail.innerHTML = `
      <div class="admin-profile-summary">
        <img src="${escapeHtml(profile.photoURL || fallbackAvatar)}" alt="" />
        <div>
          <strong>${escapeHtml(profile.displayName)}</strong>
          <p>${escapeHtml(profile.email || "-")}</p>
          <small>ระดับสมาชิก: ${escapeHtml(profile.memberLevel || "Free")}</small>
          <small>Pro Code: ${escapeHtml(profile.proCode || "-")}</small>
        </div>
        <span>${history.length} checks</span>
      </div>
    `;
  }

  if (!history.length) {
    setEmptyTable(adminUserHistoryBody, "ผู้ใช้นี้ยังไม่มีประวัติ Check Ads", 5);
    return;
  }

  adminUserHistoryBody.innerHTML = history
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.checkedAt)}</td>
          <td>${escapeHtml(item.fileName || "-")}</td>
          <td>${escapeHtml(item.productName || "-")}</td>
          <td>${Number(item.score || 0)}/100</td>
          <td>${Number(item.duplicateHits || 0)}</td>
        </tr>
      `,
    )
    .join("");
}

async function copyText(value) {
  if (!value) return;
  await navigator.clipboard.writeText(value);
}

async function generateProCode() {
  if (!currentAdmin) {
    setProCodeStatus("กรุณา Login ด้วยบัญชี Admin", "error");
    return;
  }

  try {
    if (generateProCodeButton) generateProCodeButton.disabled = true;
    setProCodeStatus("กำลังสร้าง Pro Code...", "loading");
    const idToken = await currentAdmin.getIdToken();
    const response = await fetch(GENERATE_PRO_CODE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "สร้าง Pro Code ไม่สำเร็จ");
    }

    setProCodeStatus(`สร้าง Pro Code สำเร็จ: ${result.code}`, "success");
    await loadAdminData();
  } catch (error) {
    setProCodeStatus(error.message || "สร้าง Pro Code ไม่สำเร็จ", "error");
  } finally {
    if (generateProCodeButton) generateProCodeButton.disabled = false;
  }
}

document.addEventListener("click", async (event) => {
  const userButton = event.target.closest("[data-admin-user]");
  if (userButton) {
    await loadUserProfile(userButton.dataset.adminUser);
    return;
  }

  const copyButton = event.target.closest("[data-copy-code]");
  if (copyButton) {
    try {
      await copyText(copyButton.dataset.copyCode);
      setProCodeStatus(`คัดลอก Code ${copyButton.dataset.copyCode} แล้ว`, "success");
    } catch {
      setProCodeStatus("คัดลอก Code ไม่สำเร็จ", "error");
    }
  }
});

adminSearchInput?.addEventListener("input", renderAll);
generateProCodeButton?.addEventListener("click", generateProCode);

watchAuth(async ({ user, configured }) => {
  currentAdmin = null;

  if (!configured) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  if (!user) {
    allUsers = [];
    allHistory = [];
    allProCodes = [];
    renderAll();
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    setProCodeStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    return;
  }

  if (!isAdminUser(user)) {
    allUsers = [];
    allHistory = [];
    allProCodes = [];
    renderAll();
    setAdminStatus("บัญชีนี้ไม่ใช่ Admin จึงดูข้อมูลหลังบ้านไม่ได้", "error");
    setProCodeStatus("บัญชีนี้ไม่ใช่ Admin", "error");
    return;
  }

  currentAdmin = user;
  await loadAdminData();
});
