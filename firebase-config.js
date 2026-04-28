// ============================================================
// NEW: Firebase Configuration
// Replace the placeholder values below with your actual
// Firebase project credentials from:
// https://console.firebase.google.com → Project Settings → SDK
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// NEW: Firebase state
let _db = null;
let _firebaseReady = false;

// NEW: Initialize Firebase (loads SDK dynamically — no bundler needed)
(function initFirebase() {
  // Only init if real credentials are set
  if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
    console.info('[NOXCUSES] Firebase: using localStorage fallback (no credentials set).');
    return;
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
    import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

    const app = initializeApp(${JSON.stringify(FIREBASE_CONFIG)});
    const db  = getFirestore(app);

    window._noxFirestore    = db;
    window._noxFSCollection = collection;
    window._noxFSAddDoc     = addDoc;
    window._noxFSTimestamp  = serverTimestamp;
    window._firebaseReady   = true;
    console.info('[NOXCUSES] Firebase initialized.');
  `;
  document.head.appendChild(script);
})();

// NEW: Save to Firestore with localStorage fallback
async function saveToFirebase(collectionName, data) {
  if (!window._firebaseReady || !window._noxFirestore) {
    return false; // Use localStorage fallback
  }
  try {
    const col = window._noxFSCollection(window._noxFirestore, collectionName);
    await window._noxFSAddDoc(col, {
      ...data,
      timestamp: window._noxFSTimestamp()
    });
    console.info(`[NOXCUSES] Saved to Firebase/${collectionName}:`, data);
    return true;
  } catch (err) {
    console.warn('[NOXCUSES] Firebase save failed, using localStorage:', err.message);
    return false;
  }
}
