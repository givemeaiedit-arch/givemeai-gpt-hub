export const ADMIN_EMAIL = "Givemeai.edit@gmail.com";

export const firebaseConfig = {
  apiKey: "AIzaSyCy3br7ODGFRJpSqTZCAV8fnQMQVJRI6yk",
  authDomain: "givemeai-gpt-hub.firebaseapp.com",
  projectId: "givemeai-gpt-hub",
  storageBucket: "givemeai-gpt-hub.firebasestorage.app",
  messagingSenderId: "941393009046",
  appId: "1:941393009046:web:645b8727c4b60443aca5b7",
  measurementId: "G-FR6WNVS5CR",
};

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(
    (value) => typeof value === "string" && value && !value.startsWith("REPLACE_WITH_"),
  );
}
