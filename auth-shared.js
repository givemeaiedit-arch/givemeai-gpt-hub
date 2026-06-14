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
  runTransaction,
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
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]);
  values[Math.floor(Math.random() * values.length)] = letters[Math.floor(Math.random() * letters.length)];
  return values.join("");
}

export async function createVipCode({ code, adminEmail }) {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");

  const normalizedCode = String(code || generateVipCode()).trim().toUpperCase();
  if (!/^(?=.*[A-Z])[A-Z0-9]{5}$/.test(normalizedCode)) {
    throw new Error("VIP code must be 5 characters and include English letters.");
  }

  const ref = doc(svc.db, "vipCodes", normalizedCode);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    throw new Error("This VIP code already exists. Please generate a new code.");
  }

  await setDoc(ref, {
    code: normalizedCode,
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
  if (!/^(?=.*[A-Z])[A-Z0-9]{5}$/.test(normalizedCode)) {
    throw new Error("Please enter a 5 character VIP code with English letters.");
  }

  const codeRef = doc(svc.db, "vipCodes", normalizedCode);
  const userRef = doc(svc.db, "users", user.uid);

  await runTransaction(svc.db, async (transaction) => {
    const codeSnap = await transaction.get(codeRef);
    if (!codeSnap.exists()) throw new Error("VIP code not found.");

    const codeData = codeSnap.data();
    if (codeData.status !== "active") {
      throw new Error("This VIP code has already been used.");
    }

    transaction.update(userRef, {
      status: "approved",
      vipCode: normalizedCode,
      approvedAt: serverTimestamp(),
      approvedBy: "VIP_CODE",
    });

    transaction.update(codeRef, {
      status: "used",
      email: user.email,
      usedAt: serverTimestamp(),
      usedBy: user.email,
      usedByUid: user.uid,
    });
  });
}

export { ADMIN_EMAIL, isFirebaseConfigured };
