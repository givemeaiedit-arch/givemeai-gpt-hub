import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

let services = null;

export function getFirebaseServices() {
  if (!isFirebaseConfigured()) return null;

  if (!services) {
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    services = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      provider,
    };
  }

  return services;
}

export function signInWithGoogle() {
  const svc = getFirebaseServices();
  if (!svc) throw new Error("Firebase is not configured.");
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
    callback({ user: null, configured: false });
    return () => {};
  }

  return onAuthStateChanged(svc.auth, (user) => {
    callback({ user, configured: true });
  });
}

export { isFirebaseConfigured };
