import { signInWithGoogle, watchAuth } from "./auth-shared.js";
import { getLessonById, getLessonIndex, LESSONS, LESSON_POINTS } from "./lesson-data.js";
import { claimLessonScore, getResolvedProfile, hasClaimedLesson, recordLearning } from "./profile-store.js";

const lessonId = new URLSearchParams(window.location.search).get("id") || document.body.dataset.lessonId;
const lesson = getLessonById(lessonId);

const titleNode = document.querySelector("#lessonTitle");
const subtitleNode = document.querySelector("#lessonSubtitle");
const descriptionNode = document.querySelector("#lessonDescription");
const mediaNode = document.querySelector("#lessonMedia");
const statusNode = document.querySelector("#lessonStatus");
const pointsNode = document.querySelector("#lessonPoints");
const claimButton = document.querySelector("#claimLessonButton");
const claimHint = document.querySelector("#claimHint");
const prevLink = document.querySelector("#lessonPrevLink");
const nextLink = document.querySelector("#lessonNextLink");

let currentUser = null;
let currentProfile = null;

function normalizeAccessValue(value) {
  return String(value || "").trim().toLowerCase();
}

function isAdminUser(user) {
  return normalizeAccessValue(user?.email) === "givemeai.edit@gmail.com";
}

function lessonRequiresPro() {
  const match = String(lesson?.id || "").match(/lesson-(\d+)/i);
  return match ? Number(match[1]) >= 2 : false;
}

function hasProAccess() {
  if (isAdminUser(currentUser)) return true;
  const values = [
    currentProfile?.plan,
    currentProfile?.tier,
    currentProfile?.memberLevel,
    currentProfile?.subscriptionStatus,
  ].map(normalizeAccessValue);

  if (values.includes("admin") || values.includes("master")) return true;
  if (!values.includes("pro") && !values.includes("active")) return false;

  const expiresAt = currentProfile?.proExpiresAt?.toDate?.()
    || (currentProfile?.proExpiresAt ? new Date(currentProfile.proExpiresAt) : null);
  return !expiresAt || Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() > Date.now();
}

function renderProLock() {
  if (!mediaNode) return;
  mediaNode.innerHTML = `
    <div class="lesson-video-placeholder lesson-access-lock">
      <span>PRO LESSON</span>
      <strong>สำหรับสมาชิกระดับ Pro ขึ้นไปเท่านั้น</strong>
      <p>บทเรียนนี้เป็นเนื้อหาสำหรับสมาชิก Pro / Master หลังอัปเกรดแล้วจะเปิดดูวิดีโอและรับคะแนนได้ทันที</p>
      <a class="orange-button" href="topup.html">อัปเกรด / เติมเงิน</a>
    </div>
  `;
}

function renderLesson() {
  if (!lesson) {
    document.title = "ไม่พบบทเรียน | GivemeAI";
    if (titleNode) titleNode.textContent = "ไม่พบบทเรียน";
    if (subtitleNode) subtitleNode.textContent = "ลิงก์บทเรียนนี้ไม่ถูกต้องหรือไม่มีอยู่ในระบบ";
    if (descriptionNode) descriptionNode.textContent = "กลับไปเลือกบทเรียนที่เปิดให้เรียนจากหน้าคอร์สทั้งหมด";
    if (mediaNode) {
      mediaNode.innerHTML = `
        <div class="lesson-video-placeholder">
          <strong>ไม่พบข้อมูลบทเรียน</strong>
          <p><a class="orange-button" href="courses.html">กลับไปหน้าคอร์สเรียน</a></p>
        </div>
      `;
    }
    if (claimButton) claimButton.disabled = true;
    return;
  }

  document.title = `${lesson.title} | GivemeAI`;
  if (titleNode) titleNode.textContent = lesson.title;
  if (subtitleNode) subtitleNode.textContent = lesson.subtitle;
  if (descriptionNode) descriptionNode.textContent = lesson.description;
  if (statusNode) statusNode.textContent = lesson.status;
  if (pointsNode) pointsNode.textContent = `${LESSON_POINTS} คะแนน`;

  if (mediaNode) {
    if (lessonRequiresPro() && !hasProAccess()) {
      renderProLock();
    } else if (lesson.videoId) {
      mediaNode.innerHTML = `
        <div class="lesson-video-frame">
          <iframe
            src="https://www.youtube.com/embed/${lesson.videoId}?rel=0"
            title="${lesson.title}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      mediaNode.innerHTML = `
        <div class="lesson-video-placeholder">
          <span>${lesson.title}</span>
          <strong>วิดีโอกำลังจัดเตรียม</strong>
          <p>บทนี้กันไว้สำหรับใส่คลิปในรอบถัดไป</p>
        </div>
      `;
    }
  }

  const lessonIndex = getLessonIndex(lesson.id);
  const prevLesson = lessonIndex > 0 ? LESSONS[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < LESSONS.length - 1 ? LESSONS[lessonIndex + 1] : null;

  if (prevLink) {
    if (prevLesson) {
      prevLink.href = prevLesson.page;
      prevLink.textContent = `← ${prevLesson.title}`;
    } else {
      prevLink.removeAttribute("href");
      prevLink.textContent = "← ไม่มีบทก่อนหน้า";
      prevLink.classList.add("is-disabled");
    }
  }

  if (nextLink) {
    if (nextLesson) {
      nextLink.href = nextLesson.page;
      nextLink.textContent = `${nextLesson.title} →`;
    } else {
      nextLink.removeAttribute("href");
      nextLink.textContent = "ไม่มีบทถัดไป →";
      nextLink.classList.add("is-disabled");
    }
  }
}

async function syncClaimState() {
  if (!claimButton || !claimHint || !lesson) return;

  if (lessonRequiresPro() && !hasProAccess()) {
    claimButton.disabled = true;
    claimButton.textContent = "สำหรับสมาชิกระดับ Pro ขึ้นไปเท่านั้น";
    claimHint.textContent = "อัปเกรดเป็น Pro หรือ Master เพื่อดูบทเรียนนี้และรับคะแนนหลังเรียนจบ";
    return;
  }

  if (!currentUser) {
    claimButton.disabled = false;
    claimButton.textContent = `Login Gmail เพื่อรับ ${LESSON_POINTS} คะแนน`;
    claimHint.textContent = "เข้าสู่ระบบก่อน แล้วค่อยกดรับคะแนนหลังเรียนจบ";
    return;
  }

  const claimed = await hasClaimedLesson(currentUser, lesson.id);
  if (claimed) {
    claimButton.disabled = true;
    claimButton.textContent = `รับคะแนนแล้ว +${LESSON_POINTS}`;
    claimHint.textContent = "บัญชีนี้รับคะแนนของบทนี้ไปแล้ว";
  } else {
    claimButton.disabled = false;
    claimButton.textContent = `เรียนแล้ว (ได้รับ ${LESSON_POINTS} คะแนน)`;
    claimHint.textContent = "กดได้ 1 ครั้งต่อบท ต่อผู้ใช้ 1 บัญชี";
  }
}

claimButton?.addEventListener("click", async () => {
  if (!lesson) return;

  if (!currentUser) {
    await signInWithGoogle();
    return;
  }

  const result = await claimLessonScore(currentUser, lesson);
  if (!result.ok) {
    claimHint.textContent = "บันทึกคะแนนไม่สำเร็จ ลองใหม่อีกครั้ง";
    return;
  }

  if (result.alreadyClaimed) {
    claimHint.textContent = "บัญชีนี้รับคะแนนของบทนี้ไปแล้ว";
  } else {
    claimHint.textContent = `บันทึกเรียบร้อย คุณได้รับ ${LESSON_POINTS} คะแนน`;
  }

  await syncClaimState();
});

watchAuth(async ({ user }) => {
  currentUser = user;
  currentProfile = user ? await getResolvedProfile(user) : null;
  renderLesson();

  if (user && lesson && (!lessonRequiresPro() || hasProAccess())) {
    await recordLearning(user, {
      id: lesson.id,
      title: lesson.title,
      subtitle: lesson.subtitle,
      url: lesson.page,
      progress: lesson.available ? lesson.progress : 0,
      status: lesson.status,
    });
  }

  await syncClaimState();
});

renderLesson();
