import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices } from "./auth-shared.js";

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

