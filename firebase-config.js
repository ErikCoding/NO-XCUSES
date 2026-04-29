// ============================================================
// Firebase Configuration
// Uzupełnij swoimi danymi z: 
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

// ── Internal state ───────────────────────────────────────────
window._noxDB   = null;
window._noxAuth = null;
window._noxFirebaseReady = false;

// ── Load Firebase SDK and init ───────────────────────────────
(function initFirebase() {
  if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
    console.info('[NOX] Firebase: brak konfiguracji — używam localStorage.');
    return;
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { initializeApp }                      from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
    import { getFirestore, collection, addDoc,
             getDocs, query, orderBy, doc,
             updateDoc, deleteDoc, serverTimestamp }
      from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
    import { getAuth, signInWithEmailAndPassword,
             signOut, onAuthStateChanged }
      from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
    import { getStorage, ref, uploadBytes,
             getDownloadURL }
      from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

    const app  = initializeApp(${JSON.stringify(FIREBASE_CONFIG)});
    const db   = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    // Expose to global scope
    window._noxDB      = db;
    window._noxAuth    = auth;
    window._noxStorage = storage;

    // Firestore helpers
    window._noxFS = {
      collection, addDoc, getDocs, query, orderBy,
      doc, updateDoc, deleteDoc, serverTimestamp
    };

    // Auth helpers
    window._noxAuthFns = {
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged
    };

    // Storage helpers
    window._noxStorageFns = {
      ref, uploadBytes, getDownloadURL
    };

    window._noxFirebaseReady = true;
    console.info('[NOX] Firebase zainicjalizowany.');

    // Dispatch event so admin.js knows Firebase is ready
    window.dispatchEvent(new Event('noxFirebaseReady'));
  `;
  document.head.appendChild(script);
})();

// ── Save a document to Firestore (with localStorage fallback) ─
async function saveToFirebase(collectionName, data) {
  if (!window._noxFirebaseReady || !window._noxDB) return false;
  try {
    const col = window._noxFS.collection(window._noxDB, collectionName);
    await window._noxFS.addDoc(col, {
      ...data,
      timestamp: window._noxFS.serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('[NOX] Firebase save error:', err.message);
    return false;
  }
}

// ── Upload a File object to Firebase Storage ─────────────────
async function uploadFileToFirebase(file) {
  if (!window._noxFirebaseReady || !window._noxStorage) return null;
  try {
    const storageRef = window._noxStorageFns.ref(
      window._noxStorage,
      `uploads/${Date.now()}_${file.name}`
    );
    const snap = await window._noxStorageFns.uploadBytes(storageRef, file);
    const url  = await window._noxStorageFns.getDownloadURL(snap.ref);
    return url;
  } catch (err) {
    console.warn('[NOX] Firebase upload error:', err.message);
    return null;
  }
}
