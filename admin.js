import { watchAuth, getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
const APPROVE_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/approveTopupOrder";
const REJECT_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/rejectTopupOrder";
const VERIFY_TOPUP_SLIP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/verifyTopupSlip";

const adminStatus = document.querySelector("#adminStatus");
const adminUserCount = document.querySelector("#adminUserCount");
const adminCheckCount = document.querySelector("#adminCheckCount");
const adminLatestTime = document.querySelector("#adminLatestTime");
const adminTodaySignupCount = document.querySelector("#adminTodaySignupCount");
const adminTodayPaidCount = document.querySelector("#adminTodayPaidCount");
const adminTodayPackageBreakdown = document.querySelector("#adminTodayPackageBreakdown");
const adminViewsToday = document.querySelector("#adminViewsToday");
const adminVisitorsToday = document.querySelector("#adminVisitorsToday");
const adminViewsWeek = document.querySelector("#adminViewsWeek");
const adminVisitorsWeek = document.querySelector("#adminVisitorsWeek");
const adminViewsMonth = document.querySelector("#adminViewsMonth");
const adminVisitorsMonth = document.querySelector("#adminVisitorsMonth");
const adminUsersBody = document.querySelector("#adminUsersBody");
const adminHistoryBody = document.querySelector("#adminHistoryBody");
const adminTrafficBody = document.querySelector("#adminTrafficBody");
const adminUserHistoryBody = document.querySelector("#adminUserHistoryBody");
const adminProfileDetail = document.querySelector("#adminProfileDetail");
const adminUsersLabel = document.querySelector("#adminUsersLabel");
const adminHistoryLabel = document.querySelector("#adminHistoryLabel");
const adminTrafficLabel = document.querySelector("#adminTrafficLabel");
const adminSearchInput = document.querySelector("#adminSearchInput");
const topupOrdersLabel = document.querySelector("#topupOrdersLabel");
const topupOrdersBody = document.querySelector("#topupOrdersBody");
const communityRequestsLabel = document.querySelector("#communityRequestsLabel");
const communityRequestsBody = document.querySelector("#communityRequestsBody");
const adminPromptsLabel = document.querySelector("#adminPromptsLabel");
const adminPromptsBody = document.querySelector("#adminPromptsBody");
const promptAdminForm = document.querySelector("#promptAdminForm");
const promptEditId = document.querySelector("#promptEditId");
const promptTitleInput = document.querySelector("#promptTitleInput");
const promptCategoryInput = document.querySelector("#promptCategoryInput");
const promptBusinessInput = document.querySelector("#promptBusinessInput");
const promptTagsInput = document.querySelector("#promptTagsInput");
const promptSummaryInput = document.querySelector("#promptSummaryInput");
const promptTextInput = document.querySelector("#promptTextInput");
const promptCoverInput = document.querySelector("#promptCoverInput");
const promptCoverPreview = document.querySelector("#promptCoverPreview");
const promptRatingInput = document.querySelector("#promptRatingInput");
const promptUsesInput = document.querySelector("#promptUsesInput");
const promptFeaturedInput = document.querySelector("#promptFeaturedInput");
const newPromptButton = document.querySelector("#newPromptButton");
const deletePromptButton = document.querySelector("#deletePromptButton");
const promptAdminStatus = document.querySelector("#promptAdminStatus");
const adminSlipDialog = document.querySelector("#adminSlipDialog");
const adminSlipDialogClose = document.querySelector("#adminSlipDialogClose");
const adminSlipDialogDone = document.querySelector("#adminSlipDialogDone");
const adminSlipDialogImage = document.querySelector("#adminSlipDialogImage");
const adminSlipDialogTitle = document.querySelector("#adminSlipDialogTitle");
const adminSlipDialogMeta = document.querySelector("#adminSlipDialogMeta");
const adminHistoryDialog = document.querySelector("#adminHistoryDialog");
const adminHistoryDialogClose = document.querySelector("#adminHistoryDialogClose");
const adminHistoryDialogDone = document.querySelector("#adminHistoryDialogDone");
const adminHistoryDialogTitle = document.querySelector("#adminHistoryDialogTitle");
const adminHistoryDialogMeta = document.querySelector("#adminHistoryDialogMeta");
const adminHistoryDialogBody = document.querySelector("#adminHistoryDialogBody");

let allUsers = [];
let allHistory = [];
let allPageViews = [];
let allTopupOrders = [];
let allCommunityRequests = [];
let allPrompts = [];
let remotePromptMap = new Map();
let currentAdmin = null;
let selectedProfileUid = "";

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
  if (values.includes("master")) return "Master";
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

function toDateValue(value) {
  const iso = toIsoString(value);
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isSameLocalDate(value, targetDate = new Date()) {
  const date = toDateValue(value);
  if (!date) return false;

  return (
    date.getFullYear() === targetDate.getFullYear() &&
    date.getMonth() === targetDate.getMonth() &&
    date.getDate() === targetDate.getDate()
  );
}

function getTodayPaidOrders() {
  return allTopupOrders.filter((order) => order.status === "approved" && isSameLocalDate(order.approvedAt || order.createdAt));
}

function summarizeTodayPackages(orders) {
  if (!orders.length) return "-";

  const packageCounts = new Map();
  orders.forEach((order) => {
    const label = order.packageLabel || order.packageId || "ไม่ระบุแพ็ก";
    packageCounts.set(label, (packageCounts.get(label) || 0) + 1);
  });

  return [...packageCounts.entries()]
    .map(([label, count]) => `${label} ${count} รายการ`)
    .join(" / ");
}

function isWithinDays(value, days) {
  const date = toDateValue(value);
  if (!date) return false;
  const now = Date.now();
  const windowStart = now - days * 24 * 60 * 60 * 1000;
  return date.getTime() >= windowStart;
}

function getPageViewVisitorKey(item) {
  return item.uid || item.visitorId || item.email || item.id;
}

function summarizePageViews(days) {
  const rows = allPageViews.filter((item) => item.mode === "session_day" && isWithinDays(item.createdAt, days));
  const uniqueVisitors = new Set(rows.map(getPageViewVisitorKey).filter(Boolean));
  return {
    views: rows.length,
    visitors: uniqueVisitors.size,
    rows,
  };
}

function getPageLabel(value) {
  const page = String(value || "index.html").split("?")[0];
  const map = {
    "index.html": "หน้าแรก",
    "courses.html": "คอร์สเรียน",
    "articles.html": "บทความ & เทคนิค",
    "community.html": "กลุ่มเรียนรู้",
    "prompts.html": "Prompt ยอดนิยม",
    "prompt-categories.html": "หมวดหมู่ Prompt",
    "tools.html": "เครื่องมือทั้งหมด",
    "ai-check-ads.html": "AI Check Ads",
    "topup.html": "เติมเงิน",
    "profile.html": "โปรไฟล์",
    "leaderboard.html": "Leaderboard",
    "admin.html": "Admin Panel",
    "lesson-1.html": "บทเรียน 1",
    "lesson-2.html": "บทเรียน 2",
    "lesson-3.html": "บทเรียน 3",
  };
  return map[page] || page;
}

function getMemberKey(data) {
  if (ADMIN_EMAILS.has(normalizeAccessValue(data?.email))) return "admin";
  const values = [
    data?.plan,
    data?.tier,
    data?.memberLevel,
    data?.subscriptionStatus,
  ].map(normalizeAccessValue);

  if (values.includes("admin")) return "admin";
  if (values.includes("master")) return "master";
  if (values.includes("pro") || values.includes("active")) return "pro";
  return "free";
}

function getProfileExpiryLabel(profile) {
  const memberKey = getMemberKey(profile);
  if (memberKey === "master" || profile?.proLifetime) return "ไม่หมดอายุ";
  if (memberKey !== "pro") return "-";
  if (!profile?.proExpiresAt) return "ยังไม่ได้กำหนด";
  return formatDate(profile.proExpiresAt);
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

function setPromptAdminStatus(message, tone = "muted") {
  if (!promptAdminStatus) return;
  promptAdminStatus.textContent = message;
  promptAdminStatus.dataset.tone = tone;
}

function setEmptyTable(body, message, columnCount = 6) {
  if (!body) return;
  body.innerHTML = `<tr><td colspan="${columnCount}">${escapeHtml(message)}</td></tr>`;
}

function filterData() {
  const keyword = adminSearchInput?.value?.trim().toLowerCase() || "";
  if (!keyword) {
    return { users: allUsers, history: allHistory, communityRequests: allCommunityRequests, prompts: allPrompts };
  }

  const users = allUsers.filter((item) => {
    const haystack = `${item.email} ${item.displayName} ${item.memberLevel}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const history = allHistory.filter((item) => {
    const haystack = `${item.userEmail} ${item.displayName} ${item.fileName} ${item.productName}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const prompts = allPrompts.filter((item) => {
    const haystack = `${item.id} ${item.title} ${item.category} ${item.businessType} ${item.summary}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const communityRequests = allCommunityRequests.filter((item) => {
    const haystack = `${item.email} ${item.displayName} ${item.facebookName} ${item.status}`.toLowerCase();
    return haystack.includes(keyword);
  });

  return { users, history, communityRequests, prompts };
}

function renderUsers(users) {
  if (adminUsersLabel) adminUsersLabel.textContent = `${users.length} บัญชี`;

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
  if (adminHistoryLabel) adminHistoryLabel.textContent = `${history.length} รายการ`;

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
          <td><button class="soft-button admin-small-button" type="button" data-view-history="${escapeHtml(item.id)}">ดูผลตรวจ</button></td>
        </tr>
      `,
    )
    .join("");
}

function getSlipVerificationState(verification) {
  if (!verification) return "idle";
  const status = String(verification.status || "").toLowerCase();
  const suggestion = String(verification.suggestion || "").toLowerCase();
  if (status === "error") return "error";
  if (suggestion === "approve") return "pass";
  if (suggestion.startsWith("review")) return "review";
  return "neutral";
}

function renderSlipVerification(verification, price) {
  if (!verification) {
    return `<small class="admin-slip-result-empty">ยังไม่ได้ตรวจสลิปอัตโนมัติ</small>`;
  }

  const state = getSlipVerificationState(verification);
  const meta = [];
  if (typeof verification.amountInSlip === "number") {
    meta.push(`ยอดในสลิป ${verification.amountInSlip} บาท`);
  }
  if (typeof price === "number" && Number.isFinite(price)) {
    meta.push(`แพ็ก ${price} บาท`);
  }
  if (verification.verifiedByEmail) {
    meta.push(`โดย ${verification.verifiedByEmail}`);
  }
  if (verification.verifiedAt) {
    meta.push(formatDate(verification.verifiedAt));
  }

  const flags = [];
  if (verification.amountMatched === true) flags.push("ยอดตรง");
  if (verification.amountMatched === false) flags.push("ยอดไม่ตรง");
  if (verification.duplicate === true) flags.push("สลิปอาจซ้ำ");
  if (verification.matchedAccount === true) flags.push("บัญชีตรง");
  if (verification.matchedAccount === false) flags.push("บัญชีไม่ตรง");

  return `
    <div class="admin-slip-result" data-state="${escapeHtml(state)}">
      <strong>${escapeHtml(verification.summary || verification.message || "ตรวจสลิปแล้ว")}</strong>
      ${meta.length ? `<small>${escapeHtml(meta.join(" • "))}</small>` : ""}
      ${flags.length ? `<small>${escapeHtml(flags.join(" • "))}</small>` : ""}
    </div>
  `;
}

function renderTopupOrders(orders) {
  if (topupOrdersLabel) topupOrdersLabel.textContent = `${orders.length} รายการ`;
  if (!topupOrdersBody) return;

  if (!orders.length) {
    setEmptyTable(topupOrdersBody, "ยังไม่มีคำขอเติมเงิน", 7);
    return;
  }

  topupOrdersBody.innerHTML = orders
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.createdAt)}</td>
          <td>
            <strong>${escapeHtml(item.displayName || item.email || "-")}</strong>
            <small>${escapeHtml(item.email || "-")}</small>
          </td>
          <td>${escapeHtml(item.packageLabel || item.packageId || "-")}</td>
          <td>${item.price} บาท</td>
          <td>
            <strong>${escapeHtml(item.status)}</strong>
            ${
              item.status === "rejected" && item.rejectedReason
                ? `<small>${escapeHtml(item.rejectedReason)}</small>`
                : ""
            }
          </td>
          <td>
            ${
              item.slipDataUrl
                ? `<div class="admin-slip-actions">
                    <button class="admin-slip-link" type="button" data-view-slip="${escapeHtml(item.id)}"><img src="${escapeHtml(item.slipDataUrl)}" alt="สลิป" /></button>
                    <button class="soft-button admin-small-button" type="button" data-view-slip="${escapeHtml(item.id)}">ดูสลิปเต็ม</button>
                    <button class="green-button admin-small-button" type="button" data-verify-slip="${escapeHtml(item.id)}">ตรวจสลิป AI</button>
                    ${renderSlipVerification(item.slipVerification, item.price)}
                  </div>`
                : "-"
            }
          </td>
          <td>
            ${
              item.status === "pending"
                ? `<div class="admin-topup-actions">
                    <button class="orange-button admin-small-button" type="button" data-approve-topup="${escapeHtml(item.id)}">อนุมัติ</button>
                    <button class="soft-button danger-button admin-small-button" type="button" data-reject-topup="${escapeHtml(item.id)}">ปฏิเสธ</button>
                  </div>`
                : `<div class="admin-topup-actions">
                    <small>${escapeHtml(item.approvedByEmail || item.rejectedByEmail || "-")}</small>
                  </div>`
            }
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderCommunityRequests(requests) {
  if (communityRequestsLabel) communityRequestsLabel.textContent = `${requests.length} รายการ`;
  if (!communityRequestsBody) return;

  if (!requests.length) {
    setEmptyTable(communityRequestsBody, "ยังไม่มีคำขอเข้ากลุ่ม", 4);
    return;
  }

  communityRequestsBody.innerHTML = requests
    .map(
      (item) => `
        <tr>
          <td>${formatDate(item.createdAt)}</td>
          <td>
            <div class="admin-community-name">
              <strong>${escapeHtml(item.displayName || "-")}</strong>
              <small>${escapeHtml(item.email || "-")}</small>
            </div>
          </td>
          <td>${escapeHtml(item.facebookName || "-")}</td>
          <td>${escapeHtml(item.status || "new")}</td>
        </tr>
      `,
    )
    .join("");
}

function renderPromptCategories() {
  if (!promptCategoryInput) return;
  const categories = window.GIVEME_PROMPT_CATEGORIES || [];
  promptCategoryInput.innerHTML = categories
    .map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`)
    .join("");
}

function renderAdminPrompts(prompts) {
  if (adminPromptsLabel) adminPromptsLabel.textContent = `${prompts.length} รายการ`;

  if (!adminPromptsBody) return;
  if (!prompts.length) {
    setEmptyTable(adminPromptsBody, "ยังไม่มี Prompt", 5);
    return;
  }

  adminPromptsBody.innerHTML = prompts
    .map(
      (prompt) => `
        <tr>
          <td>
            <strong>${escapeHtml(prompt.title)}</strong>
            <small>${escapeHtml(prompt.id)}</small>
          </td>
          <td>${escapeHtml(prompt.categoryName || prompt.category || "-")}</td>
          <td><img class="admin-prompt-thumb" src="${escapeHtml(prompt.cover || "")}" alt="" /></td>
          <td>${prompt.deleted ? "ซ่อนแล้ว" : prompt.source === "firestore" ? "แก้ไขแล้ว" : "ค่าเริ่มต้น"}</td>
          <td><button class="soft-button admin-small-button" type="button" data-edit-prompt="${escapeHtml(prompt.id)}">แก้ไข</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderTrafficDashboard() {
  const today = summarizePageViews(1);
  const week = summarizePageViews(7);
  const month = summarizePageViews(30);

  if (adminViewsToday) adminViewsToday.textContent = String(today.views);
  if (adminVisitorsToday) adminVisitorsToday.textContent = String(today.visitors);
  if (adminViewsWeek) adminViewsWeek.textContent = String(week.views);
  if (adminVisitorsWeek) adminVisitorsWeek.textContent = String(week.visitors);
  if (adminViewsMonth) adminViewsMonth.textContent = String(month.views);
  if (adminVisitorsMonth) adminVisitorsMonth.textContent = String(month.visitors);
  if (adminTrafficLabel) adminTrafficLabel.textContent = `${month.views} ครั้งแบบ 1 session ต่อ 1 วัน`;

  if (!adminTrafficBody) return;
  if (!month.rows.length) {
    setEmptyTable(adminTrafficBody, "ยังไม่มีข้อมูลยอดวิวหน้าเว็บ", 4);
    return;
  }

  const pageMap = new Map();
  month.rows.forEach((item) => {
    const key = item.page || item.path || item.id;
    const current = pageMap.get(key) || {
      page: key,
      views: 0,
      visitorKeys: new Set(),
      latestAt: "",
    };
    current.views += 1;
    current.visitorKeys.add(getPageViewVisitorKey(item));
    const checkedAt = toIsoString(item.createdAt);
    if (checkedAt && (!current.latestAt || checkedAt > current.latestAt)) {
      current.latestAt = checkedAt;
    }
    pageMap.set(key, current);
  });

  const rows = [...pageMap.values()]
    .sort((a, b) => b.views - a.views || b.visitorKeys.size - a.visitorKeys.size)
    .slice(0, 12);

  adminTrafficBody.innerHTML = rows
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${escapeHtml(getPageLabel(item.page))}</strong>
            <small>${escapeHtml(item.page)}</small>
          </td>
          <td>${item.views.toLocaleString("th-TH")}</td>
          <td>${item.visitorKeys.size.toLocaleString("th-TH")}</td>
          <td>${escapeHtml(formatDate(item.latestAt))}</td>
        </tr>
      `,
    )
    .join("");
}

function renderAll() {
  const { users, history, communityRequests, prompts } = filterData();
  const todayPaidOrders = getTodayPaidOrders();
  const todayPaidUsers = new Set(todayPaidOrders.map((order) => order.uid || order.email || order.id));

  renderUsers(users);
  renderHistory(history);
  renderTrafficDashboard();
  renderTopupOrders(allTopupOrders);
  renderCommunityRequests(communityRequests);
  renderAdminPrompts(prompts);

  if (adminUserCount) adminUserCount.textContent = String(allUsers.length);
  if (adminCheckCount) adminCheckCount.textContent = String(allHistory.length);
  if (adminLatestTime) adminLatestTime.textContent = formatDate(allHistory[0]?.checkedAt);
  if (adminTodaySignupCount) {
    adminTodaySignupCount.textContent = String(allUsers.filter((user) => isSameLocalDate(user.createdAt)).length);
  }
  if (adminTodayPaidCount) adminTodayPaidCount.textContent = String(todayPaidUsers.size);
  if (adminTodayPackageBreakdown) adminTodayPackageBreakdown.textContent = summarizeTodayPackages(todayPaidOrders);
}

function openSlipDialog(orderId) {
  if (!adminSlipDialog || !adminSlipDialogImage) return;
  const order = allTopupOrders.find((item) => item.id === orderId);
  if (!order?.slipDataUrl) {
    setAdminStatus("ไม่พบรูปสลิปของรายการนี้", "error");
    return;
  }

  adminSlipDialogImage.src = order.slipDataUrl;
  if (adminSlipDialogTitle) {
    adminSlipDialogTitle.textContent = `สลิป ${order.packageLabel || order.packageId || "รายการเติมเงิน"}`;
  }
  if (adminSlipDialogMeta) {
    const detail = [`${order.displayName || order.email || "-"}`, `${order.price} บาท`, formatDate(order.createdAt)];
    if (order.slipVerification?.summary) {
      detail.push(`AI: ${order.slipVerification.summary}`);
    }
    adminSlipDialogMeta.textContent = detail.join(" • ");
  }
  adminSlipDialog.showModal();
}

function closeSlipDialog() {
  if (!adminSlipDialog?.open) return;
  adminSlipDialog.close();
}

function buildHistoryList(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) {
    return `<p class="admin-history-empty">ไม่มีข้อมูลในส่วนนี้</p>`;
  }

  return `
    <ul class="admin-history-list">
      ${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

const historyMetricMeta = {
  hook_scroll_stop: { label: "Hook / Scroll Stop", max: 15 },
  audience_signal: { label: "Audience Signal", max: 15 },
  pain_desire_clarity: { label: "Pain / Desire", max: 10 },
  offer_strength: { label: "Offer Strength", max: 15 },
  creative_clarity: { label: "Creative Clarity", max: 10 },
  proof_trust: { label: "Proof / Trust", max: 10 },
  objection_handling: { label: "Objection Handling", max: 10 },
  cta: { label: "CTA", max: 5 },
  andromeda_readiness: { label: "Andromeda Readiness", max: 10 },
};

function formatCompactNumber(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return "-";
  if (number >= 1000000) return `${(number / 1000000).toFixed(number % 1000000 === 0 ? 0 : 1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(number % 1000 === 0 ? 0 : 1)}K`;
  return number.toLocaleString("th-TH");
}

function formatFileSize(bytes) {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return "-";
  if (value >= 1024 * 1024) return `${(value / (1024 * 1024)).toFixed(2)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${value.toLocaleString("th-TH")} bytes`;
}

function toReadableText(value) {
  if (Array.isArray(value)) {
    const list = value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean);
    return list.join(", ") || "-";
  }
  const text = String(value ?? "").trim();
  return text || "-";
}

function buildHistoryFieldRows(fields) {
  const list = Array.isArray(fields) ? fields : [];
  return `
    <div class="admin-history-field-list">
      ${list
        .map(
          ([label, value]) => `
            <article class="admin-history-field-row">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(toReadableText(value))}</strong>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildHistoryPersonas(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) {
    return `<p class="admin-history-empty">ไม่มีข้อมูลในส่วนนี้</p>`;
  }

  return `
    <div class="admin-history-personas">
      ${list
        .map((item, index) => {
          const title = typeof item === "string" ? item : item?.title || `Persona ${index + 1}`;
          const description = typeof item === "string" ? "" : item?.description || "";
          return `
            <article class="admin-history-persona">
              <span class="admin-history-persona-index">${index + 1}</span>
              <div>
                <strong>${escapeHtml(title)}</strong>
                ${description ? `<p>${escapeHtml(description)}</p>` : ""}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function buildHistoryMetricBars(scores) {
  const source = scores && typeof scores === "object" ? scores : {};
  return `
    <div class="admin-history-metric-list">
      ${Object.entries(historyMetricMeta)
        .map(([key, meta]) => {
          const numeric = Number(source[key] || 0);
          const width = Math.max(0, Math.min(100, (numeric / meta.max) * 100));
          return `
            <article class="admin-history-metric-item">
              <div class="admin-history-metric-head">
                <span>${escapeHtml(meta.label)}</span>
                <strong>${numeric}/${meta.max}</strong>
              </div>
              <div class="admin-history-metric-track">
                <div class="admin-history-metric-bar" style="width:${width}%"></div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function openHistoryDialog(historyId) {
  if (!adminHistoryDialog || !adminHistoryDialogBody) return;
  const item = allHistory.find((entry) => entry.id === historyId);
  if (!item) {
    setAdminStatus("ไม่พบประวัติการตรวจรายการนี้", "error");
    return;
  }

  const result = item.result || {};
  const summaryList = result.summary_3_lines || [];
  const strengths = result.strengths || [];
  const weaknesses = result.weaknesses || [];
  const fixes = result.fixes_now || result.things_to_fix_first || result.fixes || [];
  const hooks = result.new_hooks || result.hook_options || [];
  const primaryAudience = result.primary_audience || {};
  const secondaryAudiences = result.secondary_audiences || [];
  const audienceEstimate = result.audience_size_estimate || {};
  const signalCheck = result.andromeda_signal_check || {};
  const categoryScores = result.category_scores || result.topic_scores || {};
  const audienceRange =
    audienceEstimate.range_th ||
    audienceEstimate.range ||
    ((audienceEstimate.min || audienceEstimate.max)
      ? `${formatCompactNumber(audienceEstimate.min)} - ${formatCompactNumber(audienceEstimate.max)}`
      : "-");
  const audienceConfidence =
    audienceEstimate.confidence || audienceEstimate.confidence_level || "-";
  const audienceRationale = audienceEstimate.rationale || "-";
  const finalVerdictStatus = result?.final_verdict?.status || "-";
  const finalVerdictReason = result?.final_verdict?.reason || "-";
  const creativePotential = result.creative_potential || "-";
  const hasNotes = item.notes && item.notes !== "-";
  const isGeneratedFix = Boolean(item.isGeneratedFix || result.generated_fix);
  const previewSrc =
    item.generatedImagePreviewDataUrl ||
    item.generatedImageUrl ||
    item.imagePreviewDataUrl ||
    "";
  const autoProductText = "ให้ AI ดูจากภาพโฆษณาและระบุชื่อสินค้าหรือประเภทสินค้าที่ใกล้เคียงที่สุด";
  const dialogTitle =
    item.productName && item.productName !== autoProductText
      ? item.productName
      : "ผลตรวจครั้งนี้";

  if (adminHistoryDialogTitle) {
    adminHistoryDialogTitle.textContent = dialogTitle;
  }

  if (adminHistoryDialogMeta) {
    adminHistoryDialogMeta.textContent = [
      item.displayName || item.userEmail || "-",
      item.userEmail || "-",
      formatDate(item.checkedAt),
    ].join(" • ");
  }

  adminHistoryDialogBody.innerHTML = `
    <div class="admin-history-preview">
      ${
        previewSrc
          ? `<img src="${escapeHtml(previewSrc)}" alt="${escapeHtml(item.fileName || "Ad preview")}" />`
          : `<div class="admin-history-preview-empty">ไม่มีรูปที่บันทึกไว้</div>`
      }
      ${isGeneratedFix ? `<p class="admin-history-generated-label">รูป Generate ใหม่</p>` : ""}
      ${
        isGeneratedFix && item.sourceImagePreviewDataUrl
          ? `
            <div class="admin-history-source-preview">
              <span>รูปต้นฉบับ</span>
              <img src="${escapeHtml(item.sourceImagePreviewDataUrl)}" alt="${escapeHtml(item.sourceFileName || "Original ad")}" />
            </div>
          `
          : ""
      }
    </div>
    <div class="admin-history-detail">
      <section class="admin-history-score-card">
        <article>
          <span>คะแนนรวม</span>
          <strong>${Number(item.score || result.overall_score || 0)}/100</strong>
        </article>
        <article>
          <span>Creative Potential</span>
          <strong>${escapeHtml(creativePotential)}</strong>
        </article>
      </section>

      <div class="admin-history-meta-grid">
        <article>
          <span>คะแนน</span>
          <strong>${Number(item.score || result.overall_score || 0)}/100</strong>
        </article>
        <article>
          <span>สินค้า</span>
          <strong>${escapeHtml(item.productName || "-")}</strong>
        </article>
        <article>
          <span>ตลาดเป้าหมาย</span>
          <strong>${escapeHtml(item.targetMarket || "-")}</strong>
        </article>
        <article>
          <span>Objective</span>
          <strong>${escapeHtml(item.objective || "-")}</strong>
        </article>
        <article>
          <span>ไฟล์</span>
          <strong>${escapeHtml(item.fileName || "-")}</strong>
        </article>
        <article>
          <span>เช็กซ้ำ</span>
          <strong>${Number(item.duplicateHits || 0)} ครั้ง</strong>
        </article>
      </div>

      <section class="admin-history-section">
        <h3>สรุปสั้น 3 บรรทัด</h3>
        ${buildHistoryList(summaryList)}
      </section>

      <div class="admin-history-section-grid">
        <section class="admin-history-section">
          <h3>กลุ่มเป้าหมายหลัก</h3>
          ${buildHistoryFieldRows([
            ["Demographic", primaryAudience.demographic || "-"],
            ["Interest", primaryAudience.interests || []],
            ["Behavior", primaryAudience.behaviors || []],
            ["Pain / Desire", primaryAudience.pain_desire || []],
            ["Creative Signal", primaryAudience.creative_signals || []],
          ])}
        </section>
        <section class="admin-history-section">
          <h3>Audience Size Estimate</h3>
          ${buildHistoryFieldRows([
            ["ช่วงประมาณ", audienceRange],
            ["ระดับความมั่นใจ", audienceConfidence],
            ["เหตุผล", audienceRationale],
          ])}
        </section>
      </div>

      <div class="admin-history-section-grid">
        <section class="admin-history-section">
          <h3>กลุ่มเป้าหมายรอง</h3>
          ${buildHistoryPersonas(secondaryAudiences)}
        </section>
        <section class="admin-history-section">
          <h3>Andromeda Signal Check</h3>
          ${buildHistoryFieldRows([["Signal ชัดหรือกว้างเกินไป", signalCheck.clarity || "-"]])}
          <div class="admin-history-subsection">
            <h4>สิ่งที่ระบบน่าจะเข้าใจ</h4>
            ${buildHistoryList(signalCheck.understood_signals || [])}
          </div>
          <div class="admin-history-subsection">
            <h4>สิ่งที่ยังสับสน</h4>
            ${buildHistoryList(signalCheck.confusing_signals || [])}
          </div>
        </section>
      </div>

      <section class="admin-history-section">
        <h3>คะแนนแยกตามหัวข้อ</h3>
        ${buildHistoryMetricBars(categoryScores)}
      </section>

      <div class="admin-history-section-grid">
        <section class="admin-history-section">
          <h3>จุดแข็ง</h3>
          ${buildHistoryList(strengths)}
        </section>
        <section class="admin-history-section">
          <h3>จุดอ่อน</h3>
          ${buildHistoryList(weaknesses)}
        </section>
      </div>

      <div class="admin-history-section-grid">
        <section class="admin-history-section">
          <h3>ควรแก้ก่อน</h3>
          ${buildHistoryList(fixes)}
        </section>
        <section class="admin-history-section">
          <h3>Hook ที่แนะนำ</h3>
          ${buildHistoryList(hooks)}
        </section>
      </div>

      <div class="admin-history-section-grid">
        <section class="admin-history-section">
          <h3>Final Verdict</h3>
          <div class="admin-history-verdict">
            <strong>${escapeHtml(finalVerdictStatus)}</strong>
            <p>${escapeHtml(finalVerdictReason)}</p>
          </div>
        </section>
        <section class="admin-history-section">
          <h3>ข้อมูลไฟล์และบันทึก</h3>
          ${buildHistoryFieldRows([
            ["ชื่อไฟล์", item.fileName || "-"],
            ["ชนิดไฟล์", item.mimeType || "-"],
            ["ขนาดไฟล์", formatFileSize(item.fileSize)],
            ["เช็กซ้ำ", `${Number(item.duplicateHits || 0)} ครั้ง`],
          ])}
          ${hasNotes ? `<p class="admin-history-notes">หมายเหตุ: ${escapeHtml(item.notes)}</p>` : ""}
        </section>
      </div>
    </div>
  `;

  adminHistoryDialog.showModal();
}

function closeHistoryDialog() {
  if (!adminHistoryDialog?.open) return;
  adminHistoryDialog.close();
}

function confirmTopupDecision(orderId, decision) {
  const order = allTopupOrders.find((item) => item.id === orderId);
  const actionText = decision === "approve" ? "อนุมัติ" : "ปฏิเสธ";
  const packageText = order?.packageLabel || order?.packageId || "รายการเติมเงิน";
  const buyerText = order?.displayName || order?.email || "ผู้ใช้นี้";
  return window.confirm(`${actionText} ${packageText} ของ ${buyerText} ใช่หรือไม่?`);
}

function slugifyPromptId(title) {
  const text = String(title || "prompt")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return text || `prompt-${Date.now()}`;
}

function normalizePromptDoc(entry) {
  const data = entry.data() || {};
  return {
    id: entry.id,
    ...data,
    source: "firestore",
  };
}

function buildPromptList(remotePrompts) {
  const categories = new Map((window.GIVEME_PROMPT_CATEGORIES || []).map((category) => [category.id, category.name]));
  const map = new Map(
    (window.GIVEME_PROMPTS || []).map((prompt) => [
      prompt.id,
      {
        ...prompt,
        source: "static",
      },
    ]),
  );

  remotePrompts.forEach((prompt) => {
    if (!prompt.id) return;
    map.set(prompt.id, {
      ...(map.get(prompt.id) || {}),
      ...prompt,
      source: "firestore",
    });
  });

  return [...map.values()]
    .filter((prompt) => !prompt.deleted)
    .map((prompt) => ({
      ...prompt,
      categoryName: categories.get(prompt.category) || prompt.category,
    }))
    .sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "th"));
}

function normalizeUserDoc(entry) {
  const data = entry.data() || {};
  const email = data.email || "";
  return {
    uid: entry.id,
    email,
    displayName: getProfileName(data),
    photoURL: getProfilePhoto(data),
    memberLevel: ADMIN_EMAILS.has(normalizeAccessValue(email)) ? "Admin" : getMemberLevel(data),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    plan: data.plan || "",
    tier: data.tier || "",
    subscriptionStatus: data.subscriptionStatus || "",
    adCheckCredits: Number(data.adCheckCredits || 0),
    proExpiresAt: data.proExpiresAt || null,
    proLifetime: Boolean(data.proLifetime),
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
    fileSize: Number(data.fileSize || 0),
    mimeType: data.mimeType || "",
    notes: data.notes || "",
    imagePreviewDataUrl: data.imagePreviewDataUrl || "",
    sourceImagePreviewDataUrl: data.sourceImagePreviewDataUrl || "",
    generatedImagePreviewDataUrl: data.generatedImagePreviewDataUrl || "",
    generatedImageUrl: data.generatedImageUrl || "",
    sourceFileName: data.sourceFileName || "",
    isGeneratedFix: Boolean(data.isGeneratedFix || data.result?.generated_fix),
    result: data.result || null,
  };
}

function normalizeTopupOrderDoc(entry) {
  const data = entry.data() || {};
  return {
    id: entry.id,
    uid: data.uid || "",
    email: data.email || "",
    displayName: data.displayName || data.email || "",
    packageLabel: data.packageLabel || data.packageId || "",
    packageId: data.packageId || "",
    price: Number(data.price || 0),
    credits: Number(data.credits || 0),
    status: String(data.status || "pending").toLowerCase(),
    slipDataUrl: data.slipDataUrl || "",
    createdAt: data.createdAt,
    approvedAt: data.approvedAt,
    approvedByEmail: data.approvedByEmail || "",
    rejectedAt: data.rejectedAt,
    rejectedByEmail: data.rejectedByEmail || "",
    rejectedReason: data.rejectedReason || "",
    slipVerification: data.slipVerification || null,
  };
}

function normalizeCommunityRequestDoc(entry) {
  const data = entry.data() || {};
  return {
    id: entry.id,
    uid: data.uid || "",
    email: data.email || "",
    displayName: data.displayName || data.email || "",
    photoURL: data.photoURL || fallbackAvatar,
    facebookName: data.facebookName || "",
    status: data.status || "new",
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

function normalizePageViewDoc(entry) {
  const data = entry.data() || {};
  return {
    id: entry.id,
    page: data.page || "index.html",
    path: data.path || "",
    visitorId: data.visitorId || "",
    uid: data.uid || "",
    email: data.email || "",
    title: data.title || "",
    dayKey: data.dayKey || "",
    mode: data.mode || "",
    createdAt: data.createdAt,
  };
}

async function loadAdminData() {
  if (!isFirebaseConfigured()) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  const services = getFirebaseServices();
  const usersQuery = query(collection(services.db, "users"), orderBy("updatedAt", "desc"), limit(300));
  const historyQuery = query(collection(services.db, "adCheckHistory"), orderBy("checkedAt", "desc"), limit(200));
  const pageViewsQuery = query(collection(services.db, "pageViews"), orderBy("createdAt", "desc"), limit(2000));
  const topupOrdersQuery = query(collection(services.db, "topupOrders"), orderBy("createdAt", "desc"), limit(200));
  const communityRequestsQuery = query(collection(services.db, "communityRequests"), orderBy("createdAt", "desc"), limit(100));

  setAdminStatus("กำลังโหลดข้อมูลหลังบ้าน...", "loading");
  try {
    const [usersResult, historyResult, pageViewsResult, topupOrdersResult, communityRequestsResult, promptResult] =
      await Promise.allSettled([
        getDocs(usersQuery),
        getDocs(historyQuery),
        getDocs(pageViewsQuery),
        getDocs(topupOrdersQuery),
        getDocs(communityRequestsQuery),
        getDocs(collection(services.db, "promptLibrary")),
      ]);

    allUsers = usersResult.status === "fulfilled" ? usersResult.value.docs.map(normalizeUserDoc) : [];
    allHistory = historyResult.status === "fulfilled" ? historyResult.value.docs.map(normalizeHistoryDoc) : [];
    allPageViews =
      pageViewsResult.status === "fulfilled" ? pageViewsResult.value.docs.map(normalizePageViewDoc) : [];
    allTopupOrders =
      topupOrdersResult.status === "fulfilled" ? topupOrdersResult.value.docs.map(normalizeTopupOrderDoc) : [];
    allCommunityRequests =
      communityRequestsResult.status === "fulfilled"
        ? communityRequestsResult.value.docs.map(normalizeCommunityRequestDoc)
        : [];
    const remotePrompts =
      promptResult.status === "fulfilled" ? promptResult.value.docs.map(normalizePromptDoc) : [];
    remotePromptMap = new Map(remotePrompts.map((prompt) => [prompt.id, prompt]));
    allPrompts = buildPromptList(remotePrompts);

    renderAll();

    if (pageViewsResult.status !== "fulfilled") {
      setAdminStatus("โหลดหลังบ้านได้บางส่วน แต่ยอดวิวเว็บยังไม่พร้อม กรุณา deploy firestore.rules ล่าสุด", "warning");
      return;
    }

    setAdminStatus("โหลดข้อมูล Admin สำเร็จ", "success");
  } catch (error) {
    console.error("loadAdminData failed", error);
    allUsers = [];
    allHistory = [];
    allPageViews = [];
    allTopupOrders = [];
    allCommunityRequests = [];
    allPrompts = [];
    remotePromptMap = new Map();
    renderAll();
    setAdminStatus("โหลดข้อมูลหลังบ้านไม่สำเร็จ กรุณาลองรีเฟรชอีกครั้ง", "error");
  }
}

function resetPromptForm() {
  promptAdminForm?.reset();
  if (promptEditId) promptEditId.value = "";
  if (promptCoverInput) promptCoverInput.value = "assets/banners/สร้างภาพโปรโมท.png";
  updatePromptPreview();
  if (deletePromptButton) deletePromptButton.disabled = true;
  setPromptAdminStatus("กรอกข้อมูลเพื่อเพิ่ม Prompt ใหม่ หรือเลือกจากตารางเพื่อแก้ไข", "muted");
}

function updatePromptPreview() {
  if (!promptCoverPreview) return;
  const src = promptCoverInput?.value?.trim() || "assets/banners/สร้างภาพโปรโมท.png";
  promptCoverPreview.src = src;
}

function fillPromptForm(prompt) {
  if (!prompt) return;
  if (promptEditId) promptEditId.value = prompt.id || "";
  if (promptTitleInput) promptTitleInput.value = prompt.title || "";
  if (promptCategoryInput) promptCategoryInput.value = prompt.category || "restaurant";
  if (promptBusinessInput) promptBusinessInput.value = prompt.businessType || "";
  if (promptTagsInput) promptTagsInput.value = (prompt.tags || []).join(", ");
  if (promptSummaryInput) promptSummaryInput.value = prompt.summary || "";
  if (promptTextInput) promptTextInput.value = prompt.prompt || "";
  if (promptCoverInput) promptCoverInput.value = prompt.cover || "assets/banners/สร้างภาพโปรโมท.png";
  if (promptRatingInput) promptRatingInput.value = prompt.rating || 4.8;
  if (promptUsesInput) promptUsesInput.value = prompt.uses || 0;
  if (promptFeaturedInput) promptFeaturedInput.checked = Boolean(prompt.featured);
  if (deletePromptButton) deletePromptButton.disabled = false;
  updatePromptPreview();
  setPromptAdminStatus(`กำลังแก้ไข: ${prompt.title}`, "muted");
}

function getPromptFormData() {
  const title = promptTitleInput?.value?.trim() || "";
  const id = promptEditId?.value?.trim() || slugifyPromptId(title);
  const tags = String(promptTagsInput?.value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id,
    title,
    category: promptCategoryInput?.value || "restaurant",
    businessType: promptBusinessInput?.value?.trim() || "",
    summary: promptSummaryInput?.value?.trim() || "",
    prompt: promptTextInput?.value?.trim() || "",
    tags,
    rating: Number(promptRatingInput?.value || 4.8),
    uses: Number(promptUsesInput?.value || 0),
    cover: promptCoverInput?.value?.trim() || "assets/banners/สร้างภาพโปรโมท.png",
    featured: Boolean(promptFeaturedInput?.checked),
    deleted: false,
  };
}

async function savePrompt(event) {
  event?.preventDefault();
  if (!currentAdmin) {
    setPromptAdminStatus("กรุณา Login ด้วยบัญชี Admin ก่อน", "error");
    return;
  }

  const data = getPromptFormData();
  if (!data.title || !data.summary || !data.prompt) {
    setPromptAdminStatus("กรุณากรอกชื่อ คำอธิบาย และ Prompt ให้ครบ", "error");
    return;
  }

  try {
    const services = getFirebaseServices();
    await setDoc(
      doc(services.db, "promptLibrary", data.id),
      {
        ...data,
        updatedAt: serverTimestamp(),
        updatedBy: currentAdmin.email || "",
      },
      { merge: true },
    );
    setPromptAdminStatus(`บันทึก Prompt "${data.title}" แล้ว`, "success");
    await loadAdminData();
    fillPromptForm(allPrompts.find((prompt) => prompt.id === data.id));
  } catch (error) {
    setPromptAdminStatus(error.message || "บันทึก Prompt ไม่สำเร็จ", "error");
  }
}

async function deletePrompt() {
  const id = promptEditId?.value?.trim();
  if (!currentAdmin || !id) return;

  const prompt = allPrompts.find((item) => item.id === id);
  if (!prompt) return;

  try {
    const services = getFirebaseServices();
    if (remotePromptMap.has(id) && prompt.source === "firestore" && !window.GIVEME_PROMPTS?.some((item) => item.id === id)) {
      await deleteDoc(doc(services.db, "promptLibrary", id));
    } else {
      await setDoc(
        doc(services.db, "promptLibrary", id),
        {
          id,
          title: prompt.title || id,
          deleted: true,
          updatedAt: serverTimestamp(),
          updatedBy: currentAdmin.email || "",
        },
        { merge: true },
      );
    }

    setPromptAdminStatus(`ลบ Prompt "${prompt.title}" แล้ว`, "success");
    resetPromptForm();
    await loadAdminData();
  } catch (error) {
    setPromptAdminStatus(error.message || "ลบ Prompt ไม่สำเร็จ", "error");
  }
}

async function loadUserProfile(uid) {
  if (!uid || !currentAdmin) return;
  selectedProfileUid = uid;

  const services = getFirebaseServices();
  const userSnapshot = await getDoc(doc(services.db, "users", uid));
  const profile = userSnapshot.exists()
    ? normalizeUserDoc(userSnapshot)
    : {
        uid,
        displayName: "-",
        email: "-",
        photoURL: fallbackAvatar,
        memberLevel: "Free",
        adCheckCredits: 0,
      };
  const historySnapshot = await getDocs(
    query(collection(services.db, "users", uid, "adCheckHistory"), orderBy("checkedAt", "desc"), limit(50)),
  );
  const history = historySnapshot.docs.map(normalizeHistoryDoc);
  const memberKey = getMemberKey(profile);
  const isLockedAdmin = memberKey === "admin";
  const statusOptions = [
    { value: "admin", label: "Admin หลัก" },
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro 289 บาท / 30 วัน" },
    { value: "master", label: "Master 889 บาท / ไม่หมดอายุ" },
  ];

  if (adminProfileDetail) {
    adminProfileDetail.innerHTML = `
      <div class="admin-profile-summary">
        <img src="${escapeHtml(profile.photoURL || fallbackAvatar)}" alt="" />
        <div>
          <strong>${escapeHtml(profile.displayName)}</strong>
          <p>${escapeHtml(profile.email || "-")}</p>
          <small>ระดับสมาชิก: ${escapeHtml(profile.memberLevel || "Free")}</small>
          <small>วันหมดอายุ: ${escapeHtml(getProfileExpiryLabel(profile))}</small>
        </div>
        <span>${history.length} รายการ</span>
      </div>
      <div class="admin-profile-grid">
        <div class="admin-profile-fields">
          <article>
            <span>เครดิตคงเหลือ</span>
            <strong>${Number(profile.adCheckCredits || 0).toLocaleString("th-TH")}</strong>
          </article>
          <article>
            <span>สถานะปัจจุบัน</span>
            <strong>${escapeHtml(profile.memberLevel || "Free")}</strong>
          </article>
          <article>
            <span>สร้างบัญชีเมื่อ</span>
            <strong>${escapeHtml(formatDate(profile.createdAt))}</strong>
          </article>
          <article>
            <span>อัปเดตล่าสุด</span>
            <strong>${escapeHtml(formatDate(profile.updatedAt))}</strong>
          </article>
        </div>
        <form class="admin-profile-form" id="adminMemberForm" data-locked="${isLockedAdmin ? "true" : "false"}">
          <input type="hidden" name="uid" value="${escapeHtml(uid)}" />
          <label>
            <span>สถานะผู้ใช้</span>
            <select name="memberLevel"${isLockedAdmin ? " disabled" : ""}>
              ${statusOptions
                .map(
                  (option) =>
                    `<option value="${escapeHtml(option.value)}"${memberKey === option.value ? " selected" : ""}>${escapeHtml(option.label)}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label>
            <span>เครดิต Check Ads</span>
            <input name="adCheckCredits" type="number" min="0" step="1" value="${Number(profile.adCheckCredits || 0)}"${isLockedAdmin ? " disabled" : ""} />
          </label>
          <div class="admin-profile-form-actions">
            <button class="orange-button" type="submit"${isLockedAdmin ? " disabled" : ""}>บันทึกสิทธิ์ผู้ใช้</button>
          </div>
          <p class="admin-profile-hint">${isLockedAdmin ? "บัญชี Admin หลักถูกล็อกไว้ ไม่สามารถเปลี่ยนสถานะหรือเครดิตจากหน้านี้ได้" : "Pro จะต่ออายุ 30 วันนับจากเวลาที่บันทึก ส่วน Master จะไม่มีวันหมดอายุ"}</p>
        </form>
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

async function saveUserAccess(event) {
  event.preventDefault();
  if (!currentAdmin || !selectedProfileUid) {
    setAdminStatus("กรุณาเลือกผู้ใช้ที่ต้องการแก้ไขก่อน", "error");
    return;
  }

  const form = event.target?.closest("#adminMemberForm");
  if (!form) return;
  if (form.dataset.locked === "true") {
    setAdminStatus("บัญชี Admin หลักไม่สามารถแก้สถานะหรือเครดิตจากหน้านี้ได้", "error");
    return;
  }
  const memberLevel = normalizeAccessValue(form.memberLevel?.value || "free");
  const credits = Math.max(0, Number(form.adCheckCredits?.value || 0));
  const services = getFirebaseServices();
  const userRef = doc(services.db, "users", selectedProfileUid);
  const patch = {
    adCheckCredits: credits,
    updatedAt: serverTimestamp(),
  };

  if (memberLevel === "free") {
    Object.assign(patch, {
      plan: "free",
      tier: "free",
      memberLevel: "free",
      subscriptionStatus: "inactive",
      proLifetime: deleteField(),
      proExpiresAt: deleteField(),
      dailyAdCheckLimit: deleteField(),
      proActivatedAt: deleteField(),
      proSource: deleteField(),
      proTopupOrderId: deleteField(),
    });
  } else if (memberLevel === "pro") {
    Object.assign(patch, {
      plan: "pro",
      tier: "pro",
      memberLevel: "pro",
      subscriptionStatus: "active",
      proLifetime: deleteField(),
      dailyAdCheckLimit: 10,
      proActivatedAt: serverTimestamp(),
      proSource: "admin-panel",
      proExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
  } else if (memberLevel === "master") {
    Object.assign(patch, {
      plan: "master",
      tier: "master",
      memberLevel: "master",
      subscriptionStatus: "active",
      proLifetime: true,
      proExpiresAt: deleteField(),
      dailyAdCheckLimit: 10,
      proActivatedAt: serverTimestamp(),
      proSource: "admin-panel",
    });
  } else {
    setAdminStatus("ไม่รู้จักสถานะสมาชิกที่เลือก", "error");
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');

  try {
    if (submitButton) submitButton.disabled = true;
    setAdminStatus("กำลังบันทึกสิทธิ์ผู้ใช้...", "loading");
    await setDoc(userRef, patch, { merge: true });
    await loadAdminData();
    await loadUserProfile(selectedProfileUid);
    setAdminStatus("บันทึกเครดิตและสถานะผู้ใช้เรียบร้อย", "success");
  } catch (error) {
    setAdminStatus(error.message || "บันทึกข้อมูลผู้ใช้ไม่สำเร็จ", "error");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function reviewTopupOrder(orderId, decision, button) {
  if (!currentAdmin || !orderId) {
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin ก่อนอนุมัติรายการเติมเงิน", "error");
    return;
  }

  try {
    if (button) button.disabled = true;
    setAdminStatus(
      decision === "approve" ? "กำลังอนุมัติรายการเติมเงิน..." : "กำลังปฏิเสธรายการเติมเงิน...",
      "loading",
    );
    const idToken = await currentAdmin.getIdToken();
    const response = await fetch(decision === "approve" ? APPROVE_TOPUP_ENDPOINT : REJECT_TOPUP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ orderId }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.error ||
          (decision === "approve" ? "อนุมัติรายการเติมเงินไม่สำเร็จ" : "ปฏิเสธรายการเติมเงินไม่สำเร็จ"),
      );
    }
    setAdminStatus(
      decision === "approve"
        ? "อนุมัติรายการเติมเงินสำเร็จ ระบบเติมสิทธิ์ให้ผู้ใช้แล้ว"
        : "ปฏิเสธรายการเติมเงินสำเร็จ และล็อกรายการไม่ให้กดซ้ำแล้ว",
      "success",
    );
    await loadAdminData();
  } catch (error) {
    setAdminStatus(
      error.message ||
        (decision === "approve" ? "อนุมัติรายการเติมเงินไม่สำเร็จ" : "ปฏิเสธรายการเติมเงินไม่สำเร็จ"),
      "error",
    );
  } finally {
    if (button) button.disabled = false;
  }
}

async function verifyTopupSlip(orderId, button) {
  if (!currentAdmin || !orderId) {
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin ก่อนตรวจสลิป", "error");
    return;
  }

  try {
    if (button) button.disabled = true;
    setAdminStatus("กำลังส่งสลิปไปตรวจอัตโนมัติ...", "loading");
    const idToken = await currentAdmin.getIdToken();
    const response = await fetch(VERIFY_TOPUP_SLIP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ orderId }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "ตรวจสลิปอัตโนมัติไม่สำเร็จ");
    }

    const summary = result?.summary || "ตรวจสลิปอัตโนมัติสำเร็จ";
    setAdminStatus(`ตรวจสลิปแล้ว: ${summary}`, result?.suggestion === "approve" ? "success" : "muted");
    await loadAdminData();
  } catch (error) {
    setAdminStatus(error.message || "ตรวจสลิปอัตโนมัติไม่สำเร็จ", "error");
  } finally {
    if (button) button.disabled = false;
  }
}

document.addEventListener("click", async (event) => {
  const userButton = event.target.closest("[data-admin-user]");
  if (userButton) {
    await loadUserProfile(userButton.dataset.adminUser);
    return;
  }

  const historyButton = event.target.closest("[data-view-history]");
  if (historyButton) {
    openHistoryDialog(historyButton.dataset.viewHistory);
    return;
  }

  const viewSlipButton = event.target.closest("[data-view-slip]");
  if (viewSlipButton) {
    openSlipDialog(viewSlipButton.dataset.viewSlip);
    return;
  }
  const verifySlipButton = event.target.closest("[data-verify-slip]");
  if (verifySlipButton) {
    await verifyTopupSlip(verifySlipButton.dataset.verifySlip, verifySlipButton);
    return;
  }
  const topupButton = event.target.closest("[data-approve-topup]");
  if (topupButton) {
    const orderId = topupButton.dataset.approveTopup;
    if (!confirmTopupDecision(orderId, "approve")) return;
    await reviewTopupOrder(orderId, "approve", topupButton);
    return;
  }

  const rejectTopupButton = event.target.closest("[data-reject-topup]");
  if (rejectTopupButton) {
    const orderId = rejectTopupButton.dataset.rejectTopup;
    if (!confirmTopupDecision(orderId, "reject")) return;
    await reviewTopupOrder(orderId, "reject", rejectTopupButton);
    return;
  }

  const promptButton = event.target.closest("[data-edit-prompt]");
  if (promptButton) {
    fillPromptForm(allPrompts.find((prompt) => prompt.id === promptButton.dataset.editPrompt));
  }
});

document.addEventListener("submit", async (event) => {
  const memberForm = event.target.closest("#adminMemberForm");
  if (memberForm) {
    await saveUserAccess(event);
  }
});

adminSearchInput?.addEventListener("input", renderAll);
promptAdminForm?.addEventListener("submit", savePrompt);
newPromptButton?.addEventListener("click", resetPromptForm);
deletePromptButton?.addEventListener("click", deletePrompt);
promptCoverInput?.addEventListener("input", updatePromptPreview);
adminSlipDialogClose?.addEventListener("click", closeSlipDialog);
adminSlipDialogDone?.addEventListener("click", closeSlipDialog);
adminSlipDialog?.addEventListener("click", (event) => {
  if (event.target === adminSlipDialog) closeSlipDialog();
});
adminHistoryDialogClose?.addEventListener("click", closeHistoryDialog);
adminHistoryDialogDone?.addEventListener("click", closeHistoryDialog);
adminHistoryDialog?.addEventListener("click", (event) => {
  if (event.target === adminHistoryDialog) closeHistoryDialog();
});
renderPromptCategories();
resetPromptForm();

watchAuth(async ({ user, configured }) => {
  currentAdmin = null;

  if (!configured) {
    setAdminStatus("ยังไม่ได้ตั้งค่า Firebase", "error");
    return;
  }

  if (!user) {
    allUsers = [];
    allHistory = [];
    allPageViews = [];
    allTopupOrders = [];
    allCommunityRequests = [];
    allPrompts = [];
    remotePromptMap = new Map();
    selectedProfileUid = "";
    renderAll();
    if (adminProfileDetail) adminProfileDetail.textContent = "ยังไม่ได้เลือกผู้ใช้";
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    return;
  }

  if (!isAdminUser(user)) {
    allUsers = [];
    allHistory = [];
    allPageViews = [];
    allTopupOrders = [];
    allCommunityRequests = [];
    allPrompts = [];
    remotePromptMap = new Map();
    selectedProfileUid = "";
    renderAll();
    if (adminProfileDetail) adminProfileDetail.textContent = "บัญชีนี้ไม่มีสิทธิ์เข้าหลังบ้าน";
    setAdminStatus("บัญชีนี้ไม่ใช่ Admin จึงดูข้อมูลหลังบ้านไม่ได้", "error");
    return;
  }

  currentAdmin = user;
  await loadAdminData();
});
