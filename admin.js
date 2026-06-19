import { watchAuth, getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";
import {
  collection,
  deleteDoc,
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

let allUsers = [];
let allHistory = [];
let allProCodes = [];
let allPrompts = [];
let remotePromptMap = new Map();
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

function renderPromptCategories() {
  if (!promptCategoryInput) return;
  const categories = window.GIVEME_PROMPT_CATEGORIES || [];
  promptCategoryInput.innerHTML = categories
    .map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`)
    .join("");
}

function renderAdminPrompts(prompts) {
  if (adminPromptsLabel) adminPromptsLabel.textContent = `${prompts.length} prompts`;

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
  renderAdminPrompts(prompts);

  if (adminUserCount) adminUserCount.textContent = String(allUsers.length);
  if (adminCheckCount) adminCheckCount.textContent = String(allHistory.length);
  if (adminLatestTime) adminLatestTime.textContent = formatDate(allHistory[0]?.checkedAt);
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

  const [usersSnapshot, historySnapshot, proCodesSnapshot, promptSnapshot] = await Promise.all([
    getDocs(usersQuery),
    getDocs(historyQuery),
    getDocs(proCodesQuery),
    getDocs(collection(services.db, "promptLibrary")),
  ]);

  allUsers = usersSnapshot.docs.map(normalizeUserDoc);
  allHistory = historySnapshot.docs.map(normalizeHistoryDoc);
  allProCodes = proCodesSnapshot.docs.map(normalizeProCodeDoc);
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
    return;
  }

  const promptButton = event.target.closest("[data-edit-prompt]");
  if (promptButton) {
    fillPromptForm(allPrompts.find((prompt) => prompt.id === promptButton.dataset.editPrompt));
  }
});

adminSearchInput?.addEventListener("input", renderAll);
generateProCodeButton?.addEventListener("click", generateProCode);
promptAdminForm?.addEventListener("submit", savePrompt);
newPromptButton?.addEventListener("click", resetPromptForm);
deletePromptButton?.addEventListener("click", deletePrompt);
promptCoverInput?.addEventListener("input", updatePromptPreview);
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
