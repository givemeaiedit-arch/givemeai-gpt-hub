import {
  isFirebaseConfigured,
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
const systemMessage = document.querySelector("#systemMessage");

function setMessage(message) {
  if (systemMessage) systemMessage.textContent = message;
}

function setAuthUi(user) {
  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;

  if (userAvatar) userAvatar.src = user?.photoURL || "assets/favicon.png";
  if (userName) userName.textContent = user?.displayName || user?.email || "ผู้ใช้ Gmail";
  if (userStatus) userStatus.textContent = user?.email || "เข้าสู่ระบบแล้ว";
  setMessage(user ? "เข้าสู่ระบบเรียบร้อย พร้อมสร้างเว็บใหม่ต่อได้" : "พร้อมเริ่มออกแบบเว็บใหม่จากหน้านี้");
}

loginButton?.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    setMessage(error.message === "Firebase is not configured." ? "ยังไม่ได้ตั้งค่า Firebase" : "เข้าสู่ระบบไม่สำเร็จ");
  }
});

logoutButton?.addEventListener("click", async () => {
  await signOutUser();
  setMessage("ออกจากระบบแล้ว");
});

if (!isFirebaseConfigured()) {
  loginButton?.setAttribute("disabled", "true");
  setMessage("ยังไม่ได้ตั้งค่า Firebase");
} else {
  watchAuth(({ user }) => setAuthUi(user));
}
