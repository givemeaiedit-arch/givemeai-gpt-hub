import { getFirebaseServices, isFirebaseConfigured } from "./auth-shared.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

function mergePrompts(basePrompts, remotePrompts) {
  const map = new Map(basePrompts.map((prompt) => [prompt.id, { ...prompt }]));

  remotePrompts.forEach((prompt) => {
    if (!prompt.id) return;
    if (prompt.deleted) {
      map.delete(prompt.id);
      return;
    }

    map.set(prompt.id, {
      ...(map.get(prompt.id) || {}),
      ...prompt,
      id: prompt.id,
    });
  });

  return [...map.values()];
}

async function loadRemotePrompts() {
  if (!isFirebaseConfigured()) return [];
  const services = getFirebaseServices();
  if (!services?.db) return [];

  const snapshot = await getDocs(collection(services.db, "promptLibrary"));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
}

try {
  const basePrompts = window.GIVEME_PROMPTS || [];
  const remotePrompts = await loadRemotePrompts();
  if (remotePrompts.length) {
    window.GIVEME_PROMPTS = mergePrompts(basePrompts, remotePrompts);
  }
} catch (error) {
  console.warn("Prompt library uses static fallback.", error);
} finally {
  window.dispatchEvent(new CustomEvent("giveme-prompts-ready"));
}
