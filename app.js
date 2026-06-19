import {
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  watchAuth,
} from "./auth-shared.js";
import {
  getResolvedProfile,
  recordLearning,
  recordToolUsage,
} from "./profile-store.js";

const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const systemMessage = document.querySelector("#systemMessage");
const topActions = document.querySelector(".top-actions");
const auditUpgradeNotice = document.querySelector("#auditUpgradeNotice");

const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
const REDEEM_PRO_CODE_ENDPOINT = "https://asia-southeast1-givemeai-gpt-hub.cloudfunctions.net/redeemProCode";
let currentUser = null;
let currentProfile = null;
let pageTrackedFor = "";

const heroSlides = [
  {
    title: 'เรียน AI อย่างเป็นระบบ<br />ใช้ <span>Prompt อย่างชาญฉลาด</span>',
    text: "คอร์สคุณภาพ เครื่องมือครบ พร้อม Prompt ใช้งานจริง สำหรับทุกสายอาชีพ",
    primary: "▶ เริ่มเรียนเลย",
    secondary: "▱ ดูคลัง Prompt",
    primaryHref: "courses.html",
    secondaryHref: "prompts.html",
    tileOne: "AI Course",
    tileTwo: "Prompt",
    cube: "AI",
  },
  {
    title: 'รวม Prompt พร้อมใช้<br />สำหรับ <span>งานธุรกิจจริง</span>',
    text: "หยิบสูตร Prompt ไปใช้กับงานขาย คอนเทนต์ โฆษณา วิเคราะห์ข้อมูล และวางแผนงานได้เร็วขึ้น",
    primary: "▣ ดู Prompt",
    secondary: "⌕ ค้นหาหมวดหมู่",
    primaryHref: "prompts.html",
    secondaryHref: "prompt-categories.html",
    tileOne: "Prompt Pack",
    tileTwo: "Content",
    cube: "P",
  },
  {
    title: 'เครื่องมือ AI ครบชุด<br />ช่วย <span>ทำงานไวขึ้น</span>',
    text: "เริ่มจาก AI สร้างภาพโปรโมท และ AI Check Ads สำหรับเจ้าของธุรกิจที่ต้องการผลลัพธ์ใช้งานได้จริง",
    primary: "◇ เปิดเครื่องมือ",
    secondary: "▤ อ่านเทคนิค",
    primaryHref: "tools.html",
    secondaryHref: "articles.html",
    tileOne: "AI Tools",
    tileTwo: "Ads Check",
    cube: "AI",
  },
];

function setMessage(message) {
  if (systemMessage) systemMessage.textContent = message;
}

function normalizeAccessValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isAdminUser(user) {
  return ADMIN_EMAILS.has(normalizeAccessValue(user?.email));
}

function getMemberLevel(profile, user) {
  if (isAdminUser(user)) return "admin";

  const values = [
    profile?.plan,
    profile?.tier,
    profile?.memberLevel,
    profile?.subscriptionStatus,
  ].map(normalizeAccessValue);

  if (values.includes("admin")) return "admin";
  if (values.includes("pro") || values.includes("active")) return "pro";
  return "free";
}

function ensureTopAdminLink() {
  if (!topActions) return null;
  let link = document.querySelector("#topAdminLink, .top-admin-link");
  if (link) {
    link.id = "topAdminLink";
    return link;
  }

  link = document.createElement("a");
  link.id = "topAdminLink";
  link.className = "soft-button top-admin-link";
  link.href = "admin.html";
  link.textContent = "Admin Panel";
  link.hidden = true;
  topActions.insertBefore(link, loginButton || userBadge || logoutButton || null);
  return link;
}

function buildRedeemPanel(idPrefix, compact = false) {
  const wrapper = document.createElement("div");
  wrapper.className = compact ? "pro-code-inline" : "pro-code-card";
  wrapper.id = `${idPrefix}Wrapper`;
  wrapper.hidden = true;
  wrapper.innerHTML = `
    <input id="${idPrefix}Input" type="text" maxlength="5" placeholder="Pro Code" aria-label="Pro Code" />
    <button id="${idPrefix}Button" type="button">${compact ? "ใช้ Code" : "ปลดล็อก Pro"}</button>
    <small id="${idPrefix}Status"></small>
  `;
  return wrapper;
}

function ensureInlineRedeemPanel() {
  if (!topActions) return null;
  let panel = document.querySelector("#proCodeInlineWrapper");
  if (panel) return panel;
  panel = buildRedeemPanel("proCodeInline", true);
  topActions.insertBefore(panel, userBadge || logoutButton || null);
  return panel;
}

function ensureUpgradeRedeemPanel() {
  if (!auditUpgradeNotice) return null;
  let panel = document.querySelector("#proCodeUpgradeWrapper");
  if (panel) return panel;
  panel = buildRedeemPanel("proCodeUpgrade", false);
  const upgradeLink = auditUpgradeNotice.querySelector("a");
  auditUpgradeNotice.insertBefore(panel, upgradeLink || null);
  return panel;
}

function setRedeemPanelState(panel, message = "", tone = "muted") {
  if (!panel) return;
  const status = panel.querySelector("small");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function updateMembershipUi(user, profile) {
  const level = getMemberLevel(profile, user);
  const topAdminLink = ensureTopAdminLink();
  const inlinePanel = ensureInlineRedeemPanel();
  const upgradePanel = ensureUpgradeRedeemPanel();

  if (topAdminLink) topAdminLink.hidden = level !== "admin";
  if (inlinePanel) inlinePanel.hidden = !user || level !== "free";
  if (upgradePanel) upgradePanel.hidden = !user || level !== "free";

  if (userStatus) {
    const email = profile?.email || "เข้าสู่ระบบแล้ว";
    userStatus.textContent =
      level === "admin" ? `Admin • ${email}` : level === "pro" ? `Pro • ${email}` : email;
  }
}

async function redeemProCode(inputId, buttonId, panelSelector) {
  const input = document.querySelector(`#${inputId}`);
  const button = document.querySelector(`#${buttonId}`);
  const panel = document.querySelector(panelSelector);

  if (!currentUser) {
    setRedeemPanelState(panel, "กรุณา Login Gmail ก่อน", "error");
    return;
  }

  const code = String(input?.value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  if (code.length !== 5) {
    setRedeemPanelState(panel, "กรุณากรอก Code 5 หลัก", "error");
    return;
  }

  try {
    if (button) button.disabled = true;
    setRedeemPanelState(panel, "กำลังตรวจสอบ Code...", "loading");
    const idToken = await currentUser.getIdToken();
    const response = await fetch(REDEEM_PRO_CODE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "ใช้ Code ไม่สำเร็จ");
    }

    if (input) input.value = "";
    setRedeemPanelState(panel, result.message || "เปิดสิทธิ์ Pro สำเร็จ", "success");
    currentProfile = await getResolvedProfile(currentUser);
    updateMembershipUi(currentUser, currentProfile);
    await setAuthUi(currentUser);
  } catch (error) {
    setRedeemPanelState(panel, error.message || "ใช้ Code ไม่สำเร็จ", "error");
  } finally {
    if (button) button.disabled = false;
  }
}

async function setAuthUi(user) {
  const profile = await getResolvedProfile(user);
  currentProfile = profile;

  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;

  if (userAvatar) userAvatar.src = profile.photoURL || fallbackAvatar;
  if (userName) userName.textContent = profile.displayName || "ผู้ใช้ Gmail";
  if (userStatus) userStatus.textContent = profile.email || "เข้าสู่ระบบแล้ว";

  setMessage(user ? "เข้าสู่ระบบเรียบร้อย พร้อมเริ่มใช้งาน AI Hub" : "พร้อมเริ่มเรียนรู้และใช้งาน AI ในเว็บเดียว");
  updateMembershipUi(user, profile);
}

function trackPageView(user) {
  const userKey = user?.uid || user?.email || "";
  if (!userKey || pageTrackedFor === `${currentPage}:${userKey}`) return;

  if (currentPage === "courses.html") {
    recordLearning(user, {
      id: "courses-hub",
      title: "คอร์สเรียนทั้งหมด",
      subtitle: "เปิดหน้าคอร์สวิดีโอ",
      url: "courses.html",
      progress: 10,
      status: "เริ่มต้นดูคอร์ส",
    });
  }

  if (currentPage === "tools.html") {
    recordToolUsage(user, {
      id: "tools-hub",
      title: "เครื่องมือทั้งหมด",
      subtitle: "เปิดหน้ารวมเครื่องมือ",
      url: "tools.html",
      status: "เปิดหน้ารวมเครื่องมือ",
    });
  }

  pageTrackedFor = `${currentPage}:${userKey}`;
}

function initProfileShortcuts() {
  const statusLink = document.querySelector("#userStatus");
  if (!statusLink) return;
  statusLink.setAttribute("href", "profile.html");
}

function initMembershipControls() {
  ensureTopAdminLink();
  ensureInlineRedeemPanel();
  ensureUpgradeRedeemPanel();

  document.querySelector("#proCodeInlineButton")?.addEventListener("click", () => {
    redeemProCode("proCodeInlineInput", "proCodeInlineButton", "#proCodeInlineWrapper");
  });

  document.querySelector("#proCodeUpgradeButton")?.addEventListener("click", () => {
    redeemProCode("proCodeUpgradeInput", "proCodeUpgradeButton", "#proCodeUpgradeWrapper");
  });
}

function initTrackingInteractions() {
  const courseCards = [...document.querySelectorAll("[data-course-id]")];
  if (courseCards.length) {
    const seenCourseIds = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !currentUser) return;
          const card = entry.target;
          const courseId = card.dataset.courseId;
          if (!courseId || seenCourseIds.has(courseId)) return;

          seenCourseIds.add(courseId);
          recordLearning(currentUser, {
            id: courseId,
            title: card.dataset.courseTitle,
            subtitle: card.dataset.courseSubtitle,
            url: currentPage === "courses.html" ? `courses.html#${card.id}` : "courses.html",
            progress: Number(card.dataset.courseProgress || 0),
            status: card.dataset.courseStatus || "",
          });
        });
      },
      { threshold: 0.6 },
    );

    courseCards.forEach((card) => observer.observe(card));
  }

  document.querySelectorAll("[data-tool-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentUser) {
        recordToolUsage(currentUser, {
          id: button.dataset.toolId,
          title: button.dataset.toolTitle,
          subtitle: button.dataset.toolSubtitle,
          url: "tools.html",
          status: "กดใช้งานจากหน้าเครื่องมือ",
        });
      }

      setMessage(button.dataset.toolMessage || "บันทึกการใช้เครื่องมือแล้ว");
    });
  });
}

function initHeroCarousel() {
  const carousel = document.querySelector("#heroCarousel");
  if (!carousel) return;

  const title = document.querySelector("#heroTitle");
  const text = document.querySelector("#heroText");
  const primary = document.querySelector("#heroPrimaryButton");
  const secondary = document.querySelector("#heroSecondaryButton");
  const tileOne = document.querySelector("#heroTileOne");
  const tileTwo = document.querySelector("#heroTileTwo");
  const cube = document.querySelector("#heroCube");
  const dots = [...document.querySelectorAll("#heroDots button")];
  const prev = document.querySelector("#heroPrev");
  const next = document.querySelector("#heroNext");
  let activeIndex = 0;
  let timerId;

  function openHeroLink(kind) {
    const href = heroSlides[activeIndex]?.[kind];
    if (href) window.location.href = href;
  }

  function renderSlide(index) {
    activeIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeIndex];
    carousel.dataset.slide = String(activeIndex + 1);
    carousel.classList.remove("is-sliding");
    if (title) title.innerHTML = slide.title;
    if (text) text.textContent = slide.text;
    if (primary) primary.textContent = slide.primary;
    if (secondary) secondary.textContent = slide.secondary;
    if (tileOne) tileOne.innerHTML = `${slide.tileOne}<span>▶</span>`;
    if (tileTwo) tileTwo.innerHTML = `${slide.tileTwo}<i></i><i></i><i></i>`;
    if (cube) cube.textContent = slide.cube;
    dots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", String(dotIndex === activeIndex)));
    void carousel.offsetWidth;
    window.requestAnimationFrame(() => carousel.classList.add("is-sliding"));
  }

  function restartTimer() {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => renderSlide(activeIndex + 1), 5000);
  }

  function pauseTimer() {
    window.clearInterval(timerId);
  }

  prev?.addEventListener("click", () => {
    renderSlide(activeIndex - 1);
    restartTimer();
  });

  primary?.addEventListener("click", () => openHeroLink("primaryHref"));
  secondary?.addEventListener("click", () => openHeroLink("secondaryHref"));

  next?.addEventListener("click", () => {
    renderSlide(activeIndex + 1);
    restartTimer();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      renderSlide(dotIndex);
      restartTimer();
    });
  });

  carousel.addEventListener("mouseenter", pauseTimer);
  carousel.addEventListener("mouseleave", restartTimer);
  carousel.addEventListener("focusin", pauseTimer);
  carousel.addEventListener("focusout", restartTimer);

  renderSlide(0);
  restartTimer();
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
  watchAuth(async ({ user }) => {
    currentUser = user;
    await setAuthUi(user);
    trackPageView(user);
  });
}

initProfileShortcuts();
initMembershipControls();
initTrackingInteractions();
initHeroCarousel();
