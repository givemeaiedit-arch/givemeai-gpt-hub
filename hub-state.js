import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices } from "./auth-shared.js";

export const DEFAULT_PRICING_PAGE = {
  price: "390",
  headline: "ปลดล็อก GPT สมาชิก ใช้งานเครื่องมือธุรกิจได้ครบในที่เดียว",
  description:
    "สมัครสมาชิกเพื่อใช้ GPT สำหรับงานโฆษณา ภาพโปรโมท วิเคราะห์ครีเอทีฟ และ BOQ พร้อมอัปเดตเครื่องมือและคำแนะนำใหม่ต่อเนื่อง เหมาะกับเจ้าของธุรกิจที่ต้องการทำงานเร็วขึ้นและลดเวลาลองผิดลองถูก",
  benefits: [
    "ใช้ GPT สมาชิกหลายตัวในหน้าเดียว ทั้งงาน Ads, Image และ BOQ",
    "ช่วยคิดงานเร็วขึ้น ลดเวลาลองผิดลองถูก และต่อยอดงานขายได้ทันที",
    "มีการอัปเดต GPT และคำแนะนำการใช้งานอย่างต่อเนื่อง",
    "เหมาะกับเจ้าของธุรกิจ คนยิงแอด ครีเอเตอร์ และทีมที่ต้องทำภาพขายบ่อย",
  ],
  ctaText: "สมัครผ่าน Inbox Fanpage",
  facebookUrl: "https://www.facebook.com/AiCreativesN/",
};

export function watchAnnouncement(callback) {
  const svc = getFirebaseServices();
  if (!svc) {
    callback(null);
    return () => {};
  }

  return onSnapshot(
    doc(svc.db, "announcements", "current"),
    (snapshot) => callback(snapshot.exists() ? snapshot.data() : null),
    () => callback(null),
  );
}

export function watchGptSettings(callback) {
  const svc = getFirebaseServices();
  if (!svc) {
    callback({});
    return () => {};
  }

  return onSnapshot(
    collection(svc.db, "gptSettings"),
    (snapshot) => {
      const settings = {};
      snapshot.forEach((docSnap) => {
        settings[docSnap.id] = docSnap.data();
      });
      callback(settings);
    },
    () => callback({}),
  );
}

export function watchFavorites(uid, callback) {
  const svc = getFirebaseServices();
  if (!svc || !uid) {
    callback(new Set());
    return () => {};
  }

  return onSnapshot(
    collection(svc.db, "users", uid, "favorites"),
    (snapshot) => callback(new Set(snapshot.docs.map((docSnap) => docSnap.id))),
    () => callback(new Set()),
  );
}

export function normalizePricingPage(data = {}) {
  return {
    ...DEFAULT_PRICING_PAGE,
    ...data,
    benefits:
      Array.isArray(data.benefits) && data.benefits.length
        ? data.benefits
        : DEFAULT_PRICING_PAGE.benefits,
  };
}

export function watchPricingPage(callback) {
  const svc = getFirebaseServices();
  if (!svc) {
    callback(DEFAULT_PRICING_PAGE);
    return () => {};
  }

  return onSnapshot(
    doc(svc.db, "sitePages", "pricing"),
    (snapshot) => callback(normalizePricingPage(snapshot.exists() ? snapshot.data() : {})),
    () => callback(DEFAULT_PRICING_PAGE),
  );
}

export async function saveAnnouncement({ enabled, message, adminEmail }) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  await setDoc(doc(svc.db, "announcements", "current"), {
    enabled: Boolean(enabled),
    message: String(message || "").trim(),
    updatedAt: serverTimestamp(),
    updatedBy: adminEmail || "",
  });
}

export async function saveGptSetting(gptId, { order, visible, adminEmail }) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  await setDoc(
    doc(svc.db, "gptSettings", gptId),
    {
      order: Number(order),
      visible: Boolean(visible),
      updatedAt: serverTimestamp(),
      updatedBy: adminEmail || "",
    },
    { merge: true },
  );
}

export async function savePricingPage({ price, headline, description, benefits, ctaText, facebookUrl, adminEmail }) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  const benefitList = Array.isArray(benefits)
    ? benefits
    : String(benefits || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

  await setDoc(doc(svc.db, "sitePages", "pricing"), {
    price: String(price || DEFAULT_PRICING_PAGE.price).trim(),
    headline: String(headline || DEFAULT_PRICING_PAGE.headline).trim(),
    description: String(description || DEFAULT_PRICING_PAGE.description).trim(),
    benefits: benefitList.length ? benefitList : DEFAULT_PRICING_PAGE.benefits,
    ctaText: String(ctaText || DEFAULT_PRICING_PAGE.ctaText).trim(),
    facebookUrl: String(facebookUrl || DEFAULT_PRICING_PAGE.facebookUrl).trim(),
    updatedAt: serverTimestamp(),
    updatedBy: adminEmail || "",
  });
}

export async function setFavorite(uid, gptId, enabled) {
  const svc = getFirebaseServices();
  if (!svc || !uid || !gptId) return;

  const ref = doc(svc.db, "users", uid, "favorites", gptId);
  if (enabled) {
    await setDoc(ref, {
      gptId,
      createdAt: serverTimestamp(),
    });
    return;
  }

  await deleteDoc(ref);
}
