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

let allUsers = [];
let allHistory = [];
let currentAdmin = null;

function isAdminUser(user) {
  return ADMIN_EMAILS.has(String(user?.email || "").trim().toLowerCase());
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
  return data.photoURL || data.googlePhotoURL || data.photoURL || fallbackAvatar;
}

function setAdminStatus(message, tone = "muted") {
  if (!adminStatus) return;
  adminStatus.textContent = message;
  adminStatus.dataset.tone = tone;
}

function setEmptyTable(body, message) {
  if (!body) return;
  body.innerHTML = `<tr><td colspan="6">${escapeHtml(message)}</td></tr>`;
}

function filterData() {
  const keyword = adminSearchInput?.value?.trim().toLowerCase() || "";
  if (!keyword) {
    return { users: allUsers, history: allHistory };
  }

  const users = allUsers.filter((item) => {
    const haystack = `${item.email} ${item.displayName}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const history = allHistory.filter((item) => {
    const haystack = `${item.userEmail} ${item.displayName} ${item.fileName} ${item.productName}`.toLowerCase();
    return haystack.includes(keyword);
  });

  return { users, history };
}

function renderUsers(users) {
  if (adminUsersLabel) adminUsersLabel.textContent = `${users.length} users`;

  if (!users.length) {
    setEmptyTable(adminUsersBody, "ยังไม่มีผู้ใช้");
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
    setEmptyTable(adminHistoryBody, "ยังไม่มีประวัติ Check Ads");
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

function renderAll() {
  const { users, history } = filterData();
  renderUsers(users);
  renderHistory(history);

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
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
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

async function loadAdminData() {
  if (!isFirebaseConfigured()) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  const services = getFirebaseServices();
  const usersQuery = query(collection(services.db, "users"), orderBy("updatedAt", "desc"), limit(100));
  const historyQuery = query(collection(services.db, "adCheckHistory"), orderBy("checkedAt", "desc"), limit(200));

  setAdminStatus("กำลังโหลดข้อมูลหลังบ้าน...", "loading");

  const [usersSnapshot, historySnapshot] = await Promise.all([
    getDocs(usersQuery),
    getDocs(historyQuery),
  ]);

  allUsers = usersSnapshot.docs.map(normalizeUserDoc);
  allHistory = historySnapshot.docs.map(normalizeHistoryDoc);

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
          <small>UID: ${escapeHtml(profile.uid)}</small>
        </div>
        <span>${history.length} checks</span>
      </div>
    `;
  }

  if (!history.length) {
    setEmptyTable(adminUserHistoryBody, "ผู้ใช้นี้ยังไม่มีประวัติ Check Ads");
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

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-user]");
  if (!button) return;
  loadUserProfile(button.dataset.adminUser);
});

adminSearchInput?.addEventListener("input", renderAll);

watchAuth(async ({ user, configured }) => {
  currentAdmin = null;

  if (!configured) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  if (!user) {
    allUsers = [];
    allHistory = [];
    renderAll();
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    return;
  }

  if (!isAdminUser(user)) {
    allUsers = [];
    allHistory = [];
    renderAll();
    setAdminStatus("บัญชีนี้ไม่ใช่ Admin จึงดูข้อมูลหลังบ้านไม่ได้", "error");
    return;
  }

  currentAdmin = user;

  try {
    await loadAdminData();
  } catch (error) {
    setAdminStatus(error.message || "โหลดข้อมูล Admin ไม่สำเร็จ", "error");
  }
});
