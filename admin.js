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
const GENERATE_PRO_CODE_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/generateProCode";
const APPROVE_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/approveTopupOrder";
const REJECT_TOPUP_ENDPOINT =
  "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/rejectTopupOrder";

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
const topupOrdersLabel = document.querySelector("#topupOrdersLabel");
const topupOrdersBody = document.querySelector("#topupOrdersBody");
const generateProCodeButton = document.querySelector("#generateProCodeButton");
const proCodeStatus = document.querySelector("#proCodeStatus");
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

let allUsers = [];
let allHistory = [];
let allProCodes = [];
let allTopupOrders = [];
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

function setProCodeStatus(message, tone = "muted") {
  if (!proCodeStatus) return;
  proCodeStatus.textContent = message;
  proCodeStatus.dataset.tone = tone;
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
    return { users: allUsers, history: allHistory, proCodes: allProCodes, prompts: allPrompts };
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

  const prompts = allPrompts.filter((item) => {
    const haystack = `${item.id} ${item.title} ${item.category} ${item.businessType} ${item.summary}`.toLowerCase();
    return haystack.includes(keyword);
  });

  return { users, history, proCodes, prompts };
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
          <td><button class="soft-button admin-small-button" type="button" data-admin-user="${escapeHtml(item.uid)}">ดูโปรไฟล์</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderProCodes(codes) {
  if (proCodesLabel) proCodesLabel.textContent = `${codes.length} โค้ด`;

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
                : `<small>${escapeHtml(item.approvedByEmail || item.rejectedByEmail || "-")}</small>`
            }
          </td>
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

function renderAll() {
  const { users, history, proCodes, prompts } = filterData();
  renderUsers(users);
  renderHistory(history);
  renderProCodes(proCodes);
  renderTopupOrders(allTopupOrders);
  renderAdminPrompts(prompts);

  if (adminUserCount) adminUserCount.textContent = String(allUsers.length);
  if (adminCheckCount) adminCheckCount.textContent = String(allHistory.length);
  if (adminLatestTime) adminLatestTime.textContent = formatDate(allHistory[0]?.checkedAt);
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
    adminSlipDialogMeta.textContent = `${order.displayName || order.email || "-"} • ${order.price} บาท • ${formatDate(order.createdAt)}`;
  }
  adminSlipDialog.showModal();
}

function closeSlipDialog() {
  if (!adminSlipDialog?.open) return;
  adminSlipDialog.close();
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
    proCode: data.proCode || "",
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
  const topupOrdersQuery = query(collection(services.db, "topupOrders"), orderBy("createdAt", "desc"), limit(50));

  setAdminStatus("กำลังโหลดข้อมูลหลังบ้าน...", "loading");

  const [usersSnapshot, historySnapshot, proCodesSnapshot, topupOrdersSnapshot, promptSnapshot] = await Promise.all([
    getDocs(usersQuery),
    getDocs(historyQuery),
    getDocs(proCodesQuery),
    getDocs(topupOrdersQuery),
    getDocs(collection(services.db, "promptLibrary")),
  ]);

  allUsers = usersSnapshot.docs.map(normalizeUserDoc);
  allHistory = historySnapshot.docs.map(normalizeHistoryDoc);
  allProCodes = proCodesSnapshot.docs.map(normalizeProCodeDoc);
  allTopupOrders = topupOrdersSnapshot.docs.map(normalizeTopupOrderDoc);
  const remotePrompts = promptSnapshot.docs.map(normalizePromptDoc);
  remotePromptMap = new Map(remotePrompts.map((prompt) => [prompt.id, prompt]));
  allPrompts = buildPromptList(remotePrompts);

  renderAll();
  setAdminStatus("โหลดข้อมูล Admin สำเร็จ", "success");
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
          <small>Pro Code: ${escapeHtml(profile.proCode || "-")}</small>
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
    return;
  }

  const viewSlipButton = event.target.closest("[data-view-slip]");
  if (viewSlipButton) {
    openSlipDialog(viewSlipButton.dataset.viewSlip);
    return;
  }
  const topupButton = event.target.closest("[data-approve-topup]");
  if (topupButton) {
    await reviewTopupOrder(topupButton.dataset.approveTopup, "approve", topupButton);
    return;
  }

  const rejectTopupButton = event.target.closest("[data-reject-topup]");
  if (rejectTopupButton) {
    await reviewTopupOrder(rejectTopupButton.dataset.rejectTopup, "reject", rejectTopupButton);
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
generateProCodeButton?.addEventListener("click", generateProCode);
promptAdminForm?.addEventListener("submit", savePrompt);
newPromptButton?.addEventListener("click", resetPromptForm);
deletePromptButton?.addEventListener("click", deletePrompt);
promptCoverInput?.addEventListener("input", updatePromptPreview);
adminSlipDialogClose?.addEventListener("click", closeSlipDialog);
adminSlipDialogDone?.addEventListener("click", closeSlipDialog);
adminSlipDialog?.addEventListener("click", (event) => {
  if (event.target === adminSlipDialog) closeSlipDialog();
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
    allProCodes = [];
    allTopupOrders = [];
    allPrompts = [];
    remotePromptMap = new Map();
    selectedProfileUid = "";
    renderAll();
    if (adminProfileDetail) adminProfileDetail.textContent = "ยังไม่ได้เลือกผู้ใช้";
    setAdminStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    setProCodeStatus("กรุณา Login ด้วยบัญชี Admin", "muted");
    return;
  }

  if (!isAdminUser(user)) {
    allUsers = [];
    allHistory = [];
    allProCodes = [];
    allTopupOrders = [];
    allPrompts = [];
    remotePromptMap = new Map();
    selectedProfileUid = "";
    renderAll();
    if (adminProfileDetail) adminProfileDetail.textContent = "บัญชีนี้ไม่มีสิทธิ์เข้าหลังบ้าน";
    setAdminStatus("บัญชีนี้ไม่ใช่ Admin จึงดูข้อมูลหลังบ้านไม่ได้", "error");
    setProCodeStatus("บัญชีนี้ไม่ใช่ Admin", "error");
    return;
  }

  currentAdmin = user;
  await loadAdminData();
});
