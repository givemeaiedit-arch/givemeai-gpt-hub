export const ADMIN_EMAIL = "Givemeai.edit@gmail.com";

// Fill these values from Firebase Console > Project settings > Your apps > Web app.
// The site works as a locked static preview until this config is replaced.
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "REPLACE_WITH_FIREBASE_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_FIREBASE_PROJECT_ID",
  appId: "REPLACE_WITH_FIREBASE_APP_ID",
};

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(
    (value) => typeof value === "string" && value && !value.startsWith("REPLACE_WITH_"),
  );
}
