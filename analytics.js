import {
  addDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices } from "./auth-shared.js";

export const ANALYTICS_EVENT_TYPES = [
  "gpt_open",
  "copy_link",
  "locked_click",
  "detail_view",
  "signup_cta",
];

export async function trackEvent(type, gptId = "") {
  if (!ANALYTICS_EVENT_TYPES.includes(type)) return;

  const svc = getFirebaseServices();
  if (!svc) return;

  try {
    await addDoc(collection(svc.db, "analyticsEvents"), {
      type,
      gptId: gptId || "",
      path: `${window.location.pathname}${window.location.search}`,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn("Analytics event was not recorded.", error);
  }
}
