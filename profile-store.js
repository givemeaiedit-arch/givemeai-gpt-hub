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
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";
import { LESSON_POINTS, LESSONS, getLessonById } from "./lesson-data.js";

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

function getLessonScoresCollection() {
  const services = getFirebaseServices();
  if (!services?.db) return null;
  return collection(services.db, "lessonScores");
}

function getLessonScoreDoc(user, lessonId) {
  const scoresRef = getLessonScoresCollection();
  const uid = getUserKey(user);
  if (!scoresRef || !uid || !lessonId) return null;
  return doc(scoresRef, `${uid}_${lessonId}`);
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

function sanitizeImagePreview(value) {
  return typeof value === "string" && /^data:image\//i.test(value) ? value : "";
}

async function ensureUserDoc(user) {
  const userRef = getUserDocRef(user);
  if (!userRef) return null;

  const snapshot = await getDoc(userRef);
  const patch = {
    email: user.email || "",
    googleDisplayName: user.displayName || "",
    googlePhotoURL: sanitizePhotoURL(user.photoURL),
    updatedAt: serverTimestamp(),
  };

  if (!snapshot.exists()) {
    patch.createdAt = serverTimestamp();
  }

  await setDoc(userRef, patch, { merge: true });

  return userRef;
}

function buildFallbackProfile(user, customProfile = {}) {
  const emailFallback = user?.email ? user.email.split("@")[0] : "ผู้ใช้ Gmail";

  return {
    displayName: customProfile.displayName?.trim() || user?.displayName || emailFallback,
    photoURL: sanitizePhotoURL(customProfile.photoURL) || sanitizePhotoURL(user?.photoURL) || fallbackAvatar,
    email: user?.email || "",
    plan: customProfile.plan || "free",
    tier: customProfile.tier || "free",
    memberLevel: customProfile.memberLevel || "free",
    subscriptionStatus: customProfile.subscriptionStatus || "",
    proExpiresAt: customProfile.proExpiresAt || null,
    proLifetime: Boolean(customProfile.proLifetime),
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

async function fetchAdCheckHistory(user) {
  const historyRef = getHistoryCollection(user, "adCheckHistory");
  if (!historyRef) return [];

  const snapshot = await getDocs(query(historyRef, orderBy("checkedAt", "desc"), limit(24)));
  return snapshot.docs.map((entry) => {
    const data = entry.data() || {};
    return {
      id: entry.id,
      fileName: data.fileName || "",
      fileKey: data.fileKey || entry.id,
      fileSize: Number(data.fileSize || 0),
      mimeType: data.mimeType || "",
      productName: data.productName || "",
      targetMarket: data.targetMarket || "TH",
      objective: data.objective || "meta_ads_conversion",
      notes: data.notes || "",
      score: Number(data.score || data.result?.overall_score || 0),
      checkedAt: toIsoString(data.checkedAt),
      updatedAt: toIsoString(data.updatedAt),
      duplicateHits: Number(data.duplicateHits || 0),
      imagePreviewDataUrl: sanitizeImagePreview(data.imagePreviewDataUrl),
      result: data.result && typeof data.result === "object" ? data.result : {},
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
      plan: data.plan,
      tier: data.tier,
      memberLevel: data.memberLevel,
      subscriptionStatus: data.subscriptionStatus,
      proExpiresAt: data.proExpiresAt,
      proLifetime: data.proLifetime,
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

export async function hasClaimedLesson(user, lessonId) {
  if (!user || !lessonId || !isFirebaseConfigured()) return false;

  try {
    const snapshot = await getDoc(getLessonScoreDoc(user, lessonId));
    return snapshot.exists();
  } catch {
    return false;
  }
}

export async function claimLessonScore(user, lesson) {
  if (!user || !lesson?.id || !isFirebaseConfigured()) {
    return { ok: false, reason: "not-ready" };
  }

  try {
    const lessonDoc = getLessonScoreDoc(user, lesson.id);
    const existing = await getDoc(lessonDoc);
    if (existing.exists()) {
      return { ok: true, alreadyClaimed: true };
    }

    const profile = await getResolvedProfile(user);
    await setDoc(lessonDoc, {
      uid: user.uid,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      points: LESSON_POINTS,
      createdAt: serverTimestamp(),
    });

    await recordLearning(user, {
      id: lesson.id,
      title: lesson.title,
      subtitle: lesson.subtitle,
      url: lesson.page,
      progress: 100,
      status: `รับ ${LESSON_POINTS} คะแนนแล้ว`,
    });

    return { ok: true, alreadyClaimed: false };
  } catch {
    return { ok: false, reason: "write-failed" };
  }
}

export async function getUserLessonScores(user) {
  if (!user || !isFirebaseConfigured()) return [];

  try {
    const scoresRef = getLessonScoresCollection();
    const snapshot = await getDocs(query(scoresRef, where("uid", "==", user.uid)));
    return snapshot.docs
      .map((entry) => {
        const data = entry.data();
        return {
          id: data.lessonId,
          title: data.lessonTitle,
          points: Number(data.points || 0),
          createdAt: toIsoString(data.createdAt),
          page: getLessonById(data.lessonId)?.page || "#",
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch {
    return [];
  }
}

export async function getLeaderboard() {
  if (!isFirebaseConfigured()) return [];

  try {
    const scoresRef = getLessonScoresCollection();
    const snapshot = await getDocs(scoresRef);
    const scoreMap = new Map();

    snapshot.forEach((entry) => {
      const data = entry.data();
      const current = scoreMap.get(data.uid) || {
        uid: data.uid,
        displayName: data.displayName || "ผู้ใช้ AI Hub",
        photoURL: sanitizePhotoURL(data.photoURL) || fallbackAvatar,
        totalPoints: 0,
        lessonsCompleted: 0,
        lastScoredAt: "",
        latestLesson: "",
      };

      current.totalPoints += Number(data.points || 0);
      current.lessonsCompleted += 1;

      const createdAt = toIsoString(data.createdAt);
      if (!current.lastScoredAt || new Date(createdAt) > new Date(current.lastScoredAt)) {
        current.lastScoredAt = createdAt;
        current.latestLesson = data.lessonTitle || "";
        current.displayName = data.displayName || current.displayName;
        current.photoURL = sanitizePhotoURL(data.photoURL) || current.photoURL;
      }

      scoreMap.set(data.uid, current);
    });

    return [...scoreMap.values()].sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.lessonsCompleted !== a.lessonsCompleted) return b.lessonsCompleted - a.lessonsCompleted;
      return new Date(b.lastScoredAt || 0) - new Date(a.lastScoredAt || 0);
    });
  } catch {
    return [];
  }
}

export async function getProfileDashboard(user) {
  const profile = await getResolvedProfile(user);

  if (!user || !isFirebaseConfigured()) {
    return {
      profile,
      learningHistory: [],
      toolUsage: [],
      lessonScores: [],
      adCheckHistory: [],
      totalPoints: 0,
      completedLessons: 0,
    };
  }

  try {
    const [learningHistory, toolUsage, lessonScores, adCheckHistory] = await Promise.all([
      fetchHistory(user, "learningHistory", "views"),
      fetchHistory(user, "toolUsage", "uses"),
      getUserLessonScores(user),
      fetchAdCheckHistory(user),
    ]);

    return {
      profile,
      learningHistory,
      toolUsage,
      lessonScores,
      adCheckHistory,
      totalPoints: lessonScores.reduce((sum, item) => sum + Number(item.points || 0), 0),
      completedLessons: lessonScores.length,
    };
  } catch {
    return {
      profile,
      learningHistory: [],
      toolUsage: [],
      lessonScores: [],
      adCheckHistory: [],
      totalPoints: 0,
      completedLessons: 0,
    };
  }
}

export { LESSON_POINTS, LESSONS };
