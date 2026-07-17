import { LESSON_POINTS, LESSONS } from "./lesson-data.js";

const lessonGrid = document.querySelector("#aiWorkCourseGrid");

function lessonCard(lesson, index) {
  const article = document.createElement("article");
  article.className = "lesson-hub-card";
  article.id = `course-${index + 1}`;
  article.dataset.courseId = lesson.id;
  article.dataset.courseTitle = lesson.title;
  article.dataset.courseSubtitle = lesson.subtitle;
  article.dataset.courseProgress = String(lesson.progress);
  article.dataset.courseStatus = "รับคะแนนได้";
  article.innerHTML = `
    <figure class="lesson-hub-visual">
      <img src="${lesson.cover}" alt="หน้าปก ${lesson.title}" loading="lazy" />
    </figure>
    <div class="lesson-hub-copy">
      <span class="tool-status">${lesson.status}</span>
      <h3>${lesson.title}</h3>
      <p>${lesson.summary}</p>
      <div class="lesson-hub-meta">
        <span>คะแนน: ${LESSON_POINTS}</span>
        <span>สถานะ: เปิดรับคะแนน</span>
      </div>
      <div class="tool-actions">
        <a class="orange-button" href="${lesson.page}">เปิดบทเรียน</a>
      </div>
    </div>
  `;
  return article;
}

if (lessonGrid) {
  const cards = LESSONS.map(lessonCard);
  lessonGrid.replaceChildren(...cards);

  document.querySelector("#courseSearch")?.addEventListener("input", (event) => {
    const keyword = event.currentTarget.value.trim().toLocaleLowerCase("th");
    cards.forEach((card) => {
      card.hidden = keyword && !card.textContent.toLocaleLowerCase("th").includes(keyword);
    });
  });
}
