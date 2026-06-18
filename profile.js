import { isFirebaseConfigured, watchAuth } from "./auth-shared.js";
import {
  getProfileDashboard,
  resetCustomProfile,
  saveCustomProfile,
} from "./profile-store.js";

const profileLoginState = document.querySelector("#profileLoginState");
const profilePreview = document.querySelector("#profilePreview");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileEmail = document.querySelector("#profileEmail");
const profilePhotoInput = document.querySelector("#profilePhotoInput");
const profileSaveButton = document.querySelector("#profileSaveButton");
const profileResetButton = document.querySelector("#profileResetButton");
const profileStatus = document.querySelector("#profileStatus");
const learningHistoryList = document.querySelector("#learningHistoryList");
const toolUsageList = document.querySelector("#toolUsageList");
const learningCount = document.querySelector("#learningCount");
const toolCount = document.querySelector("#toolCount");

let currentUser = null;
let pendingPhotoDataUrl = "";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function setStatus(message, tone = "muted") {
  if (!profileStatus) return;
  profileStatus.textContent = message;
  profileStatus.dataset.tone = tone;
}

function renderHistoryList(container, items, type) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <li class="history-empty">
        <strong>ยังไม่มีข้อมูล</strong>
        <p>${type === "learning" ? "เริ่มเปิดหน้าคอร์สเพื่อให้ระบบบันทึกประวัติการเรียน" : "กดใช้งานเครื่องมือในหน้าเครื่องมือทั้งหมดเพื่อให้ระบบนับการใช้งาน"}</p>
      </li>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <li class="history-item">
          <div class="history-copy">
            <strong>${item.title}</strong>
            <p>${item.subtitle || item.status || ""}</p>
            <small>ล่าสุด: ${formatDate(item.lastVisitedAt)}</small>
          </div>
          <div class="history-meta">
            <b>${type === "learning" ? `${item.progress || 0}%` : `${item.uses || 0} ครั้ง`}</b>
            <span>${type === "learning" ? `${item.views || 0} ครั้ง` : item.status || "พร้อมใช้งาน"}</span>
          </div>
        </li>
      `,
    )
    .join("");
}

async function renderProfile(user) {
  currentUser = user;

  if (!isFirebaseConfigured()) {
    setStatus("ยังไม่ได้ตั้งค่า Firebase", "warning");
  }

  if (!user) {
    if (profileLoginState) profileLoginState.textContent = "เข้าสู่ระบบด้วย Gmail เพื่อจัดการโปรไฟล์";
    if (profileEmail) profileEmail.textContent = "ยังไม่ได้เข้าสู่ระบบ";
    if (profileDisplayName) profileDisplayName.value = "";
    if (profilePreview) profilePreview.src = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
    if (profileSaveButton) profileSaveButton.disabled = true;
    if (profileResetButton) profileResetButton.disabled = true;
    if (learningCount) learningCount.textContent = "0";
    if (toolCount) toolCount.textContent = "0";
    renderHistoryList(learningHistoryList, [], "learning");
    renderHistoryList(toolUsageList, [], "tool");
    return;
  }

  const dashboard = await getProfileDashboard(user);
  pendingPhotoDataUrl = dashboard.profile.photoURL || "";

  if (profileLoginState) profileLoginState.textContent = "กำลังใช้โปรไฟล์ของบัญชีนี้";
  if (profileEmail) profileEmail.textContent = dashboard.profile.email || user.email || "-";
  if (profileDisplayName) profileDisplayName.value = dashboard.profile.displayName || "";
  if (profilePreview) profilePreview.src = dashboard.profile.photoURL || "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
  if (profileSaveButton) profileSaveButton.disabled = false;
  if (profileResetButton) profileResetButton.disabled = false;
  if (learningCount) learningCount.textContent = String(dashboard.learningHistory.length);
  if (toolCount) toolCount.textContent = String(dashboard.toolUsage.length);

  renderHistoryList(learningHistoryList, dashboard.learningHistory, "learning");
  renderHistoryList(toolUsageList, dashboard.toolUsage, "tool");
  setStatus("พร้อมแก้ไขชื่อและรูปโปรไฟล์", "success");
}

async function fileToDataUrl(file) {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const scale = Math.max(size / imageBitmap.width, size / imageBitmap.height);
  const width = imageBitmap.width * scale;
  const height = imageBitmap.height * scale;
  const x = (size - width) / 2;
  const y = (size - height) / 2;
  context.drawImage(imageBitmap, x, y, width, height);
  return canvas.toDataURL("image/jpeg", 0.88);
}

profilePhotoInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    pendingPhotoDataUrl = await fileToDataUrl(file);
    if (profilePreview) profilePreview.src = pendingPhotoDataUrl;
    setStatus("เลือกรูปใหม่แล้ว กดบันทึกเพื่อใช้งาน", "success");
  } catch {
    setStatus("อัปโหลดรูปไม่สำเร็จ", "warning");
  }
});

profileSaveButton?.addEventListener("click", async () => {
  if (!currentUser) {
    setStatus("กรุณาเข้าสู่ระบบก่อน", "warning");
    return;
  }

  const nextName = profileDisplayName?.value?.trim() || currentUser.displayName || currentUser.email?.split("@")[0] || "ผู้ใช้ Gmail";
  const nextPhoto = pendingPhotoDataUrl || "";

  const saved = await saveCustomProfile(currentUser, {
    displayName: nextName,
    photoURL: nextPhoto,
  });

  if (!saved) {
    setStatus("บันทึกลง Firebase ไม่สำเร็จ", "warning");
    return;
  }

  await renderProfile(currentUser);
  setStatus("บันทึกโปรไฟล์ลง Firebase เรียบร้อย", "success");
});

profileResetButton?.addEventListener("click", async () => {
  if (!currentUser) {
    setStatus("กรุณาเข้าสู่ระบบก่อน", "warning");
    return;
  }

  const reset = await resetCustomProfile(currentUser);
  if (!reset) {
    setStatus("รีเซ็ตโปรไฟล์ใน Firebase ไม่สำเร็จ", "warning");
    return;
  }

  if (profilePhotoInput) profilePhotoInput.value = "";
  pendingPhotoDataUrl = "";
  await renderProfile(currentUser);
  setStatus("รีเซ็ตกลับไปใช้ข้อมูลจากบัญชี Google แล้ว", "success");
});

watchAuth(({ user }) => {
  renderProfile(user);
});
