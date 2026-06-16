import {
  isAdminEmail,
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  watchAuth,
} from "./auth-shared.js";

const loginButtons = [...document.querySelectorAll("#loginButton, .js-login")];
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const adminLink = document.querySelector("#adminLink");
const accountLevel = document.querySelector("#accountLevel");
const accountAccess = document.querySelector("#accountAccess");
const accountEmail = document.querySelector("#accountEmail");

function statusText(user, profile) {
  if (!user) return "ยังไม่ได้เข้าสู่ระบบ";
  if (isAdminEmail(user.email)) return "Admin";
  if (profile?.status === "approved") return "Member";
  if (profile?.status === "revoked") return "ถูกปิดสิทธิ์";
  return "Free";
}

function accessText(user, profile) {
  if (!user) return "เข้าสู่ระบบเพื่อดูสิทธิ์";
  if (isAdminEmail(user.email)) return "ปลดล็อกทุก GPT และ Admin Panel";
  if (profile?.status === "approved") return "ใช้ GPT สมาชิกและเข้ากลุ่มเรียนรู้ได้";
  if (profile?.status === "revoked") return "บัญชีถูกปิดสิทธิ์ กรุณาติดต่อ Admin";
  return "ใช้ Free GPT ได้ 2 ตัว และสมัครเพื่อปลดล็อกเพิ่ม";
}

loginButtons.forEach((button) => button.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    alert(error.message === "Firebase is not configured." ? "ยังไม่ได้ตั้งค่า Firebase" : "เข้าสู่ระบบไม่สำเร็จ");
  }
}));

logoutButton?.addEventListener("click", () => signOutUser());

if (!isFirebaseConfigured()) {
  loginButtons.forEach((button) => button.setAttribute("disabled", "true"));
}

watchAuth(({ user, profile }) => {
  loginButtons.forEach((button) => {
    button.hidden = Boolean(user);
  });
  if (logoutButton) logoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;
  if (adminLink) adminLink.hidden = !(user && isAdminEmail(user.email));
  if (userAvatar) userAvatar.src = user?.photoURL || "assets/favicon.png";
  if (userName) userName.textContent = user?.displayName || user?.email || "Guest";
  if (userStatus) userStatus.textContent = statusText(user, profile);
  if (accountLevel) accountLevel.textContent = statusText(user, profile);
  if (accountAccess) accountAccess.textContent = accessText(user, profile);
  if (accountEmail) accountEmail.textContent = user?.email || "ยังไม่ได้เข้าสู่ระบบ";
});
