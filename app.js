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

const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";

const heroSlides = [
  {
    title: 'เรียน AI อย่างเป็นระบบ<br />ใช้ <span>Prompt อย่างชาญฉลาด</span>',
    text: "คอร์สคุณภาพ เครื่องมือครบ พร้อม Prompt ใช้งานจริง สำหรับทุกสายอาชีพ",
    primary: "▶ เริ่มเรียนเลย",
    secondary: "▱ ดูคลัง Prompt",
    primaryHref: "courses.html",
    secondaryHref: "index.html#prompts",
    tileOne: "AI Course",
    tileTwo: "Prompt",
    cube: "AI",
  },
  {
    title: 'รวม Prompt พร้อมใช้<br />สำหรับ <span>งานธุรกิจจริง</span>',
    text: "หยิบสูตร Prompt ไปใช้กับงานขาย คอนเทนต์ โฆษณา วิเคราะห์ข้อมูล และวางแผนงานได้เร็วขึ้น",
    primary: "▣ ดู Prompt",
    secondary: "⌕ ค้นหาหมวดหมู่",
    primaryHref: "index.html#prompts",
    secondaryHref: "index.html#categories",
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

function setAuthUi(user) {
  if (loginButton) loginButton.hidden = Boolean(user);
  if (logoutButton) logoutButton.hidden = !user;
  if (userBadge) userBadge.hidden = !user;

  if (userAvatar) userAvatar.src = user?.photoURL || fallbackAvatar;
  if (userName) userName.textContent = user?.displayName || user?.email || "ผู้ใช้ Gmail";
  if (userStatus) userStatus.textContent = user?.email || "เข้าสู่ระบบแล้ว";

  setMessage(user ? "เข้าสู่ระบบเรียบร้อย พร้อมเริ่มใช้งาน AI Hub" : "พร้อมเริ่มเรียนรู้และใช้งาน AI ในเว็บเดียว");
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
  watchAuth(({ user }) => setAuthUi(user));
}

initHeroCarousel();
