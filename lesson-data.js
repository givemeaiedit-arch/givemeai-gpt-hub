export const LESSON_POINTS = 50;

export const LESSONS = [
  {
    id: "lesson-1",
    page: "lesson-1.html",
    title: "บทที่ 1",
    subtitle: "วิดีโอเริ่มต้น",
    status: "พร้อมเรียน",
    summary: "บทเริ่มต้นสำหรับเข้าใจภาพรวม AI และเริ่มใช้งานได้ง่ายขึ้น",
    description: "ดูวิดีโอแนะนำพื้นฐาน แล้วกดเรียนแล้วเพื่อรับ 50 คะแนนเข้าบัญชีของตัวเองได้ทันที",
    cover: "assets/courses/lesson-1-cover.png",
    videoId: "zwm5qU8XlmQ",
    available: true,
    progress: 25,
  },
  {
    id: "lesson-2",
    page: "lesson-2.html",
    title: "บทที่ 2",
    subtitle: "วิดีโอเรียนต่อ",
    status: "พร้อมเรียน",
    summary: "เรียนต่อจากบทนำด้วยวิดีโอที่เปิดได้ในหน้าเว็บ พร้อมรองรับการรับคะแนนเมื่อเรียนจบ",
    description: "ใช้วิดีโอนี้เป็นบทเรียนกลางของชุดเดียวกัน เหมาะกับการดูต่อเนื่องและใช้กดรับคะแนนสะสม 50 คะแนนหลังเรียนจบ",
    cover: "assets/banners/สร้างภาพโปรโมท.png",
    videoId: "AXYMdUUdn0Q",
    available: true,
    progress: 55,
  },
  {
    id: "lesson-3",
    page: "lesson-3.html",
    title: "บทที่ 3",
    subtitle: "วิดีโอเรียนต่อเนื่อง",
    status: "พร้อมเรียน",
    summary: "บทต่อเนื่องในชุดเดียวกัน รองรับการเรียนในหน้าเว็บและเก็บคะแนนแยกตามผู้ใช้",
    description: "วิดีโอบทนี้ทำงานต่อเนื่องกับบทที่ 2 เมื่อเรียนจบสามารถกดรับคะแนน 50 คะแนนได้อีก 1 ครั้งต่อผู้ใช้",
    cover: "assets/banners/สร้างวิดีโอ.png",
    videoId: "N-3oqzTD0sA",
    available: true,
    progress: 85,
  },
];

export function getLessonById(lessonId) {
  return LESSONS.find((lesson) => lesson.id === lessonId) || null;
}

export function getLessonIndex(lessonId) {
  return LESSONS.findIndex((lesson) => lesson.id === lessonId);
}
