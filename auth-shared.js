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

    const admin = isAdminEmail(user.email);
    if (admin) {
      callback({
        user,
        profile: {
          uid: user.uid,
          email: user.email || ADMIN_EMAIL,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          status: "approved",
          approvedBy: ADMIN_EMAIL,
        },
        configured: true,
      });
    }

    try {
      const profile = await ensureUserRecord(user);
      callback({ user, profile, configured: true });
    } catch (error) {
      if (admin) return;
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

export function generateVipCode() {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VIP-${part()}-${part()}`;
}

export async function createVipCode({ code, email, adminEmail }) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  const normalizedCode = String(code || generateVipCode()).trim().toUpperCase();
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    throw new Error("Please enter a valid email.");
  }

  await setDoc(doc(svc.db, "vipCodes", normalizedCode), {
    code: normalizedCode,
    email: normalizedEmail,
    status: "active",
    createdAt: serverTimestamp(),
    createdBy: adminEmail || ADMIN_EMAIL,
  });

  return normalizedCode;
}

export async function redeemVipCode(user, code) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");
  if (!user?.uid || !user?.email) throw new Error("Please sign in first.");

  const normalizedCode = String(code || "").trim().toUpperCase();
  if (!normalizedCode) throw new Error("Please enter a VIP code.");

  const codeRef = doc(svc.db, "vipCodes", normalizedCode);
  const codeSnap = await getDoc(codeRef);
  if (!codeSnap.exists()) throw new Error("VIP code not found.");

  const codeData = codeSnap.data();
  if (String(codeData.email || "").toLowerCase() !== String(user.email || "").toLowerCase()) {
    throw new Error("This VIP code is for another email.");
  }
  if (codeData.status !== "active") {
    throw new Error("This VIP code has already been used.");
  }

  await updateDoc(doc(svc.db, "users", user.uid), {
    status: "approved",
    vipCode: normalizedCode,
    approvedAt: serverTimestamp(),
    approvedBy: "VIP_CODE",
  });

  await updateDoc(codeRef, {
    status: "used",
    usedAt: serverTimestamp(),
    usedBy: user.email,
    usedByUid: user.uid,
  });
}

export { ADMIN_EMAIL, isFirebaseConfigured };
