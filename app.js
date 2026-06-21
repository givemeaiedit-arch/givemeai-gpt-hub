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
const mobileLogoutButton = document.querySelector("#mobileLogoutButton");
const userBadge = document.querySelector("#userBadge");
const userAvatar = document.querySelector("#userAvatar");
const userName = document.querySelector("#userName");
const userStatus = document.querySelector("#userStatus");
const systemMessage = document.querySelector("#systemMessage");
const topActions = document.querySelector(".top-actions");

const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com"]);
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
  if (values.includes("master")) return "master";
  if (values.includes("pro") || values.includes("active")) return "pro";
  return "free";
}

function getTopActionsAnchor(...nodes) {
  if (!topActions) return null;
  return nodes.find((node) => node && topActions.contains(node)) || null;
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
  topActions.insertBefore(link, getTopActionsAnchor(loginButton, userBadge, logoutButton));
  return link;
}

function updateMembershipUi(user, profile) {
  const level = getMemberLevel(profile, user);
  const topAdminLink = ensureTopAdminLink();

  if (topAdminLink) topAdminLink.hidden = level !== "admin";

  if (!userStatus) return;
  const email = profile?.email || "Signed in";

  if (level === "admin") {
    userStatus.textContent = `Admin | ${email}`;
    return;
  }
  if (level === "master") {
    userStatus.textContent = `Master | ${email}`;
    return;
  }
  if (level === "pro") {
    userStatus.textContent = `Pro | ${email}`;
    return;
  }

  userStatus.textContent = email;
}

async function setAuthUi(user) {
  const profile = await getResolvedProfile(user);
  currentProfile = profile;

  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (mobileLogoutButton) mobileLogoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;

  if (userAvatar) userAvatar.src = profile.photoURL || fallbackAvatar;
  if (userName) userName.textContent = profile.displayName || "Google user";
  if (userStatus) userStatus.textContent = profile.email || "Signed in";

  setMessage(user ? "Signed in successfully. AI Hub is ready." : "Ready to explore AI Hub.");
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
    setMessage(error.message === "Firebase is not configured." ? "Firebase is not configured yet." : "Sign-in failed.");
  }
});

logoutButton?.addEventListener("click", async () => {
  await signOutUser();
  setMessage("Signed out.");
});

mobileLogoutButton?.addEventListener("click", async () => {
  await signOutUser();
  setMessage("Signed out.");
});

if (!isFirebaseConfigured()) {
  loginButton?.setAttribute("disabled", "true");
  setMessage("Firebase is not configured yet.");
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
