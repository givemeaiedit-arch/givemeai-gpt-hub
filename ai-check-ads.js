const adsImageInput = document.querySelector("#adsImageInput");
const clearAdsImageButton = document.querySelector("#clearAdsImageButton");
const runAuditButton = document.querySelector("#runAuditButton");
const adsPreviewImage = document.querySelector("#adsPreviewImage");
const previewOverlayTitle = document.querySelector("#previewOverlayTitle");
const previewOverlayText = document.querySelector("#previewOverlayText");
const auditStatusBadge = document.querySelector("#auditStatusBadge");
const auditScoreValue = document.querySelector("#auditScoreValue");
const auditScoreBar = document.querySelector("#auditScoreBar");
const auditPotential = document.querySelector("#auditPotential");

function setDefaultPreview() {
  if (adsPreviewImage) adsPreviewImage.src = "assets/banners/โฆษณา.png";
  if (previewOverlayTitle) previewOverlayTitle.textContent = "พร้อมเชื่อม API วิเคราะห์ภาพ";
  if (previewOverlayText) previewOverlayText.textContent = "ตอนนี้แสดงภาพตัวอย่างก่อน เมื่ออัปโหลดรูป ระบบจะพรีวิวภาพจริงในช่องนี้";
  if (auditStatusBadge) auditStatusBadge.textContent = "Mock Result";
  if (auditScoreValue) auditScoreValue.textContent = "78";
  if (auditScoreBar) auditScoreBar.style.width = "78%";
  if (auditPotential) auditPotential.textContent = "สูง";
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("read-failed"));
    reader.readAsDataURL(file);
  });
}

adsImageInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const dataUrl = await readImage(file);
    if (adsPreviewImage) adsPreviewImage.src = dataUrl;
    if (previewOverlayTitle) previewOverlayTitle.textContent = "ภาพพร้อมวิเคราะห์";
    if (previewOverlayText) previewOverlayText.textContent = `ไฟล์: ${file.name} พร้อมใช้เป็น input สำหรับ OpenAI vision ในขั้นถัดไป`;
    if (auditStatusBadge) auditStatusBadge.textContent = "Uploaded";
  } catch {
    setDefaultPreview();
  }
});

clearAdsImageButton?.addEventListener("click", () => {
  if (adsImageInput) adsImageInput.value = "";
  setDefaultPreview();
});

runAuditButton?.addEventListener("click", () => {
  if (auditStatusBadge) auditStatusBadge.textContent = "Ready for API";
  if (previewOverlayTitle) previewOverlayTitle.textContent = "หน้ารายงานพร้อมต่อ API";
  if (previewOverlayText) previewOverlayText.textContent = "โครง UI และตำแหน่งผลลัพธ์พร้อมแล้ว เหลือผูก OpenAI API และ prompt วิเคราะห์รูป";
  if (auditScoreValue) auditScoreValue.textContent = "82";
  if (auditScoreBar) auditScoreBar.style.width = "82%";
  if (auditPotential) auditPotential.textContent = "ค่อนข้างสูง";
});

setDefaultPreview();
