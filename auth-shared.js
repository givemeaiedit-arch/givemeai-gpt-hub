import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { ADMIN_EMAIL, firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const ADMIN_EMAILS = new Set([ADMIN_EMAIL.toLowerCase(), "givemeai.edit@gmail.com"]);
let services = null;

export function isAdminEmail(email) {
  return Boolean(email && ADMIN_EMAILS.has(email.toLowerCase()));
}

export function getFirebaseServices() {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!services) {
    const app = initializeApp(firebaseConfig);
    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      provider: new GoogleAuthProvider(),
    };
    services.provider.setCustomParameters({ prompt: "select_account" });
  }

  return services;
}

export function signInWithGoogle() {
  const svc = getFirebaseServices();
  if (!svc) {
    throw new Error("Firebase is not configured.");
  }
  return signInWithPopup(svc.auth, svc.provider);
}

export function signOutUser() {
  const svc = getFirebaseServices();
  if (!svc) return Promise.resolve();
  return signOut(svc.auth);
}

export function watchAuth(callback) {
  const svc = getFirebaseServices();
  if (!svc) {
    callback({ user: null, profile: null, configured: false });
    return () => {};
  }

  return onAuthStateChanged(svc.auth, async (user) => {
    if (!user) {
      callback({ user: null, profile: null, configured: true });
      return;
    }

    try {
      const profile = await ensureUserRecord(user);
      callback({ user, profile, configured: true });
    } catch (error) {
      callback({ user, profile: null, configured: true, error });
    }
  });
}

export async function ensureUserRecord(user) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  const ref = doc(svc.db, "users", user.uid);
  const snap = await getDoc(ref);
  const baseProfile = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    lastLoginAt: serverTimestamp(),
  };

  if (!snap.exists()) {
    const admin = isAdminEmail(user.email);
    const profile = {
      ...baseProfile,
      status: admin ? "approved" : "pending",
      createdAt: serverTimestamp(),
    };
    if (admin) {
      profile.approvedAt = serverTimestamp();
      profile.approvedBy = ADMIN_EMAIL;
    }
    await setDoc(ref, profile);
    return { ...profile, status: profile.status };
  }

  await setDoc(ref, baseProfile, { merge: true });
  return { uid: user.uid, ...snap.data(), ...baseProfile };
}

export async function setUserStatus(uid, status, adminEmail) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  const ref = doc(svc.db, "users", uid);
  const payload =
    status === "approved"
      ? {
          status,
          approvedAt: serverTimestamp(),
          approvedBy: adminEmail || ADMIN_EMAIL,
        }
      : {
          status,
          revokedAt: serverTimestamp(),
          revokedBy: adminEmail || ADMIN_EMAIL,
        };

  await updateDoc(ref, payload);
}

export { ADMIN_EMAIL, isFirebaseConfigured };
