import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";

const fallbackAvatar = "assets/Icon/asset_1x1_cropfix/asset_6-05-avatar-like-2.png";

function getUserKey(user) {
  return user?.uid || null;
}

function getUserDocRef(user) {
  const services = getFirebaseServices();
  const uid = getUserKey(user);
  if (!services?.db || !uid) return null;
  return doc(services.db, "users", uid);
}

function getHistoryCollection(user, name) {
  const userRef = getUserDocRef(user);
  if (!userRef) return null;
  return collection(userRef, name);
}

function toIsoString(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return "";
}

function sanitizePhotoURL(value) {
  return typeof value === "string" && value ? value : "";
}

async function ensureUserDoc(user) {
  const userRef = getUserDocRef(user);
  if (!userRef) return null;

  await setDoc(
    userRef,
    {
      email: user.email || "",
      googleDisplayName: user.displayName || "",
      googlePhotoURL: sanitizePhotoURL(user.photoURL),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );

  return userRef;
}

function buildFallbackProfile(user, customProfile = {}) {
  const emailFallback = user?.email ? user.email.split("@")[0] : "ผู้ใช้ Gmail";

  return {
    displayName: customProfile.displayName?.trim() || user?.displayName || emailFallback,
    photoURL: sanitizePhotoURL(customProfile.photoURL) || sanitizePhotoURL(user?.photoURL) || fallbackAvatar,
    email: user?.email || "",
  };
}

async function fetchHistory(user, name, metricField) {
  const historyRef = getHistoryCollection(user, name);
  if (!historyRef) return [];

  const snapshot = await getDocs(query(historyRef, orderBy("lastVisitedAt", "desc"), limit(12)));
  return snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      title: data.title || "",
      subtitle: data.subtitle || "",
      url: data.url || "#",
      progress: Number(data.progress || 0),
      status: data.status || "",
      lastVisitedAt: toIsoString(data.lastVisitedAt),
      views: Number(data.views || 0),
      uses: Number(data.uses || 0),
      [metricField]: Number(data[metricField] || 0),
    };
  });
}

export async function getResolvedProfile(user) {
  if (!user || !isFirebaseConfigured()) return buildFallbackProfile(user);

  try {
    const userRef = await ensureUserDoc(user);
    const snapshot = await getDoc(userRef);
    const data = snapshot.exists() ? snapshot.data() : {};
    return buildFallbackProfile(user, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    });
  } catch {
    return buildFallbackProfile(user);
  }
}

export async function saveCustomProfile(user, profile) {
  if (!user || !isFirebaseConfigured()) return false;

  try {
    const userRef = await ensureUserDoc(user);
    await setDoc(
      userRef,
      {
        displayName: profile.displayName?.trim() || user.displayName || user.email?.split("@")[0] || "ผู้ใช้ Gmail",
        photoURL: sanitizePhotoURL(profile.photoURL),
        email: user.email || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return true;
  } catch {
    return false;
  }
}

export async function resetCustomProfile(user) {
  if (!user || !isFirebaseConfigured()) return false;

  try {
    const userRef = await ensureUserDoc(user);
    await setDoc(
      userRef,
      {
        displayName: user.displayName || user.email?.split("@")[0] || "ผู้ใช้ Gmail",
        photoURL: sanitizePhotoURL(user.photoURL),
        email: user.email || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return true;
  } catch {
    return false;
  }
}

export async function recordLearning(user, item) {
  if (!user || !item?.id || !isFirebaseConfigured()) return false;

  try {
    await ensureUserDoc(user);
    const itemRef = doc(getHistoryCollection(user, "learningHistory"), item.id);
    const existing = await getDoc(itemRef);
    const data = existing.exists() ? existing.data() : {};

    await setDoc(
      itemRef,
      {
        title: item.title || data.title || "",
        subtitle: item.subtitle || data.subtitle || "",
        url: item.url || data.url || "#",
        progress: Number(item.progress ?? data.progress ?? 0),
        status: item.status || data.status || "",
        views: Number(data.views || 0) + 1,
        lastVisitedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return true;
  } catch {
    return false;
  }
}

export async function recordToolUsage(user, item) {
  if (!user || !item?.id || !isFirebaseConfigured()) return false;

  try {
    await ensureUserDoc(user);
    const itemRef = doc(getHistoryCollection(user, "toolUsage"), item.id);
    const existing = await getDoc(itemRef);
    const data = existing.exists() ? existing.data() : {};

    await setDoc(
      itemRef,
      {
        title: item.title || data.title || "",
        subtitle: item.subtitle || data.subtitle || "",
        url: item.url || data.url || "#",
        status: item.status || data.status || "",
        uses: Number(data.uses || 0) + 1,
        lastVisitedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return true;
  } catch {
    return false;
  }
}

export async function getProfileDashboard(user) {
  const profile = await getResolvedProfile(user);

  if (!user || !isFirebaseConfigured()) {
    return {
      profile,
      learningHistory: [],
      toolUsage: [],
    };
  }

  try {
    const [learningHistory, toolUsage] = await Promise.all([
      fetchHistory(user, "learningHistory", "views"),
      fetchHistory(user, "toolUsage", "uses"),
    ]);

    return {
      profile,
      learningHistory,
      toolUsage,
    };
  } catch {
    return {
      profile,
      learningHistory: [],
      toolUsage: [],
    };
  }
}
