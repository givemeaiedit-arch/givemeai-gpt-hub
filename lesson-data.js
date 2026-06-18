export const LESSON_POINTS = 50;

export const LESSONS = [
  {
    id: "lesson-1",
    page: "lesson-1.html",
    title: "บทที่ 1",
    subtitle: "กำลังจัดเตรียม",
    status: "เร็ว ๆ นี้",
    summary: "เตรียมพื้นที่สำหรับบทเริ่มต้นของคอร์ส เพื่อใช้เป็นจุดเริ่มเรียนอย่างเป็นระบบ",
    description: "หน้านี้กันไว้สำหรับบทนำของคอร์ส เมื่อมีวิดีโอจริงสามารถใส่แทนได้ทันทีโดยไม่ต้องเปลี่ยนโครงหน้าเรียน",
    cover: "assets/banners/เริ่มต้นใช้งาน.png",
    videoId: "",
    available: false,
    progress: 0,
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

