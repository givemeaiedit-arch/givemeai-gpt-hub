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

let currentUser = null;
let users = [];
let unsubscribeUsers = null;

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

function stopUsersListener() {
  if (!unsubscribeUsers) return;
  unsubscribeUsers();
  unsubscribeUsers = null;
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
      return;
    }

    if (!user) {
      adminPanel.hidden = true;
      setMessage(`กรุณาเข้าสู่ระบบด้วย Gmail admin: ${ADMIN_EMAIL}`);
      stopUsersListener();
      return;
    }

    if (!isAdminEmail(user.email)) {
      adminPanel.hidden = true;
      setMessage("บัญชีนี้ไม่ใช่ Admin จึงไม่มีสิทธิ์ดูหรืออนุมัติผู้ใช้", true);
      stopUsersListener();
      return;
    }

    adminMessage.classList.remove("show");
    adminPanel.hidden = false;
    startUsersListener();
  });
}
