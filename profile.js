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
const lessonScoreList = document.querySelector("#lessonScoreList");
const adCheckHistoryList = document.querySelector("#adCheckHistoryList");
const learningCount = document.querySelector("#learningCount");
const toolCount = document.querySelector("#toolCount");
const scoreTotal = document.querySelector("#scoreTotal");
const adsCheckCount = document.querySelector("#adsCheckCount");

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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "-";
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  if (size >= 1024) return `${Math.round(size / 1024)} KB`;
  return `${size} B`;
}

function formatObjective(value) {
  const map = {
    meta_ads_conversion: "Meta Ads Conversion",
    meta_ads_leads: "Meta Ads Leads",
    meta_ads_messages: "Meta Ads Messages",
    awareness: "Awareness",
  };
  return map[String(value || "").trim()] || value || "-";
}

function getScoreTone(score) {
  const numericScore = Number(score || 0);
  if (numericScore >= 81) return "excellent";
  if (numericScore >= 71) return "good";
  if (numericScore >= 61) return "fair";
  return "low";
}

function buildListMarkup(items, emptyText) {
  if (!Array.isArray(items) || !items.length) {
    return `<li>${escapeHtml(emptyText)}</li>`;
  }

  return items
    .slice(0, 4)
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderHistoryList(container, items, type) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <li class="history-empty">
        <strong>ยังไม่มีข้อมูล</strong>
        <p>${
          type === "learning"
            ? "เริ่มเปิดหน้าคอร์สเพื่อให้ระบบบันทึกประวัติการเรียน"
            : "กดใช้งานเครื่องมือในหน้าเครื่องมือทั้งหมด เพื่อให้ระบบนับการใช้งาน"
        }</p>
      </li>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <li class="history-item">
          <div class="history-copy">
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.subtitle || item.status || "")}</p>
            <small>ล่าสุด: ${escapeHtml(formatDate(item.lastVisitedAt))}</small>
          </div>
          <div class="history-meta">
            <b>${type === "learning" ? `${Number(item.progress || 0)}%` : `${Number(item.uses || 0)} ครั้ง`}</b>
            <span>${
              type === "learning"
                ? `${Number(item.views || 0)} ครั้ง`
                : escapeHtml(item.status || "พร้อมใช้งาน")
            }</span>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderScoreList(container, items) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <li class="history-empty">
        <strong>ยังไม่มีคะแนนสะสม</strong>
        <p>เข้าไปเรียนแต่ละบทแล้วกดรับคะแนนหลังเรียนจบ ระบบจะบันทึก 50 คะแนนต่อบทให้ทันที</p>
      </li>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <li class="history-item">
          <div class="history-copy">
            <strong>${escapeHtml(item.title)}</strong>
            <p>รับคะแนนจากบทเรียน</p>
            <small>ล่าสุด: ${escapeHtml(formatDate(item.createdAt))}</small>
          </div>
          <div class="history-meta">
            <b>+${Number(item.points || 0)}</b>
            <span><a href="${item.page}">เปิดบทเรียนอีกครั้ง</a></span>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderAdCheckHistory(container, items) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <div class="history-empty">
        <strong>ยังไม่มีประวัติ AI Check Ads</strong>
        <p>เมื่อคุณอัปโหลดภาพและกดวิเคราะห์ ระบบจะบันทึกผล คะแนน และรายละเอียดไว้ให้ย้อนกลับมาดูในหน้านี้</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const result = item.result || {};
      const score = Number(item.score || result.overall_score || 0);
      const tone = getScoreTone(score);
      const summaryLines = Array.isArray(result.summary_3_lines) ? result.summary_3_lines : [];
      const strengths = Array.isArray(result.strengths) ? result.strengths : [];
      const weaknesses = Array.isArray(result.weaknesses) ? result.weaknesses : [];
      const fixes = Array.isArray(result.fixes_now) ? result.fixes_now : [];
      const hooks = Array.isArray(result.hook_options) ? result.hook_options : [];
      const audience = result.primary_audience || {};
      const audienceHighlights = [
        audience.demographic,
        Array.isArray(audience.interests) && audience.interests.length ? audience.interests.slice(0, 3).join(", ") : "",
      ]
        .filter(Boolean)
        .join(" • ");

      return `
        <details class="ad-history-card">
          <summary class="ad-history-summary">
            <div class="ad-history-thumb">
              ${
                item.imagePreviewDataUrl
                  ? `<img src="${item.imagePreviewDataUrl}" alt="${escapeHtml(item.productName || item.fileName || "Ad preview")}" />`
                  : `<span>ไม่มีรูปเก่า</span>`
              }
            </div>

            <div class="ad-history-copy">
              <small>AI Check Ads</small>
              <h3>${escapeHtml(item.productName || item.fileName || "งานวิเคราะห์โฆษณา")}</h3>
              <p>${escapeHtml(result.final_verdict?.status || result.creative_potential || "ดูสรุปผลและรายละเอียดการวิเคราะห์")}</p>
              <div class="ad-history-tags">
                <span>${escapeHtml(item.fileName || "-")}</span>
                <span>${escapeHtml(formatDate(item.checkedAt))}</span>
                <span>${escapeHtml(item.targetMarket || "TH")}</span>
              </div>
            </div>

            <div class="ad-history-score" data-tone="${tone}">
              <strong>${score}</strong>
              <small>/100</small>
            </div>

            <div class="ad-history-toggle">ดูรายละเอียด</div>
          </summary>

          <div class="ad-history-body">
            <div class="ad-history-facts">
              <article>
                <span>ชื่อไฟล์</span>
                <strong>${escapeHtml(item.fileName || "-")}</strong>
              </article>
              <article>
                <span>ชื่อสินค้า</span>
                <strong>${escapeHtml(item.productName || "ให้ AI ดูจากภาพ")}</strong>
              </article>
              <article>
                <span>ขนาดไฟล์</span>
                <strong>${escapeHtml(formatFileSize(item.fileSize))}</strong>
              </article>
              <article>
                <span>วิเคราะห์เมื่อ</span>
                <strong>${escapeHtml(formatDate(item.checkedAt))}</strong>
              </article>
              <article>
                <span>เป้าหมาย</span>
                <strong>${escapeHtml(formatObjective(item.objective))}</strong>
              </article>
              <article>
                <span>ตลาด</span>
                <strong>${escapeHtml(item.targetMarket || "TH")}</strong>
              </article>
              <article>
                <span>ดึงประวัติซ้ำ</span>
                <strong>${escapeHtml(String(item.duplicateHits || 0))} ครั้ง</strong>
              </article>
              <article>
                <span>ศักยภาพ</span>
                <strong>${escapeHtml(result.creative_potential || "-")}</strong>
              </article>
            </div>

            ${
              item.notes && item.notes !== "-"
                ? `
                  <div class="ad-history-note">
                    <span>หมายเหตุที่ส่งไปพร้อมการวิเคราะห์</span>
                    <p>${escapeHtml(item.notes)}</p>
                  </div>
                `
                : ""
            }

            <div class="ad-history-panel-grid">
              <section class="ad-history-panel">
                <h4>สรุปผล</h4>
                <ul>${buildListMarkup(summaryLines, "ยังไม่มีสรุป 3 บรรทัด")}</ul>
              </section>

              <section class="ad-history-panel">
                <h4>กลุ่มเป้าหมายหลัก</h4>
                <p>${escapeHtml(audienceHighlights || "ยังไม่มีข้อมูลกลุ่มเป้าหมายหลัก")}</p>
              </section>

              <section class="ad-history-panel">
                <h4>จุดแข็ง</h4>
                <ul>${buildListMarkup(strengths, "ยังไม่มีข้อมูลจุดแข็ง")}</ul>
              </section>

              <section class="ad-history-panel">
                <h4>จุดอ่อน</h4>
                <ul>${buildListMarkup(weaknesses, "ยังไม่มีข้อมูลจุดอ่อน")}</ul>
              </section>

              <section class="ad-history-panel">
                <h4>สิ่งที่ควรแก้ทันที</h4>
                <ul>${buildListMarkup(fixes, "ยังไม่มีข้อเสนอแนะเพิ่มเติม")}</ul>
              </section>

              <section class="ad-history-panel">
                <h4>Hook ที่แนะนำ</h4>
                <ul>${buildListMarkup(hooks, "ยังไม่มีตัวอย่าง Hook เพิ่มเติม")}</ul>
              </section>
            </div>

            <div class="ad-history-verdict" data-tone="${tone}">
              <strong>${escapeHtml(result.final_verdict?.status || "สรุปภาพรวม")}</strong>
              <p>${escapeHtml(result.final_verdict?.reason || "ระบบบันทึกผลการวิเคราะห์ชุดนี้ไว้เรียบร้อยแล้ว")}</p>
            </div>
          </div>
        </details>
      `;
    })
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
    if (scoreTotal) scoreTotal.textContent = "0";
    if (adsCheckCount) adsCheckCount.textContent = "0";
    renderHistoryList(learningHistoryList, [], "learning");
    renderScoreList(lessonScoreList, []);
    renderHistoryList(toolUsageList, [], "tool");
    renderAdCheckHistory(adCheckHistoryList, []);
    return;
  }

  const dashboard = await getProfileDashboard(user);
  pendingPhotoDataUrl = dashboard.profile.photoURL || "";

  if (profileLoginState) profileLoginState.textContent = "กำลังใช้โปรไฟล์ของบัญชีนี้";
  if (profileEmail) profileEmail.textContent = dashboard.profile.email || user.email || "-";
  if (profileDisplayName) profileDisplayName.value = dashboard.profile.displayName || "";
  if (profilePreview) {
    profilePreview.src = dashboard.profile.photoURL || "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
  }
  if (profileSaveButton) profileSaveButton.disabled = false;
  if (profileResetButton) profileResetButton.disabled = false;
  if (learningCount) learningCount.textContent = String(dashboard.learningHistory.length);
  if (toolCount) toolCount.textContent = String(dashboard.toolUsage.length);
  if (scoreTotal) scoreTotal.textContent = String(dashboard.totalPoints || 0);
  if (adsCheckCount) adsCheckCount.textContent = String((dashboard.adCheckHistory || []).length);

  renderHistoryList(learningHistoryList, dashboard.learningHistory, "learning");
  renderScoreList(lessonScoreList, dashboard.lessonScores || []);
  renderHistoryList(toolUsageList, dashboard.toolUsage, "tool");
  renderAdCheckHistory(adCheckHistoryList, dashboard.adCheckHistory || []);
  setStatus("พร้อมแก้ไขชื่อ รูปโปรไฟล์ และดูประวัติการใช้งานทั้งหมด", "success");
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
