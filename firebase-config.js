// ============================================================
// Firebase Configuration
// Uzupełnij swoimi danymi z: 
// https://console.firebase.google.com → Project Settings → SDK
// ============================================================

const FIREBASE_CONFIG = {
 apiKey: "AIzaSyCVxN_A7R9k-iirzFFLzVIR4gm7cgGn1dY",
  authDomain: "no-xcuses-cea33.firebaseapp.com",
  databaseURL: "https://no-xcuses-cea33-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "no-xcuses-cea33",
  storageBucket: "no-xcuses-cea33.firebasestorage.app",
  messagingSenderId: "964497725385",
  appId: "1:964497725385:web:6294c1283913def455ba18"
};

// ── Internal state ───────────────────────────────────────────
window._noxDB = null;
window._noxAuth = null;
window._noxStorage = null;
window._noxFirebaseReady = false;
window._noxFirebaseError = null;
window._noxLastFirebaseError = null;

const NOX_PUBLIC_COLLECTIONS = new Set(['submissions', 'contacts', 'ambassadors']);

let resolveFirebaseReady;
window._noxFirebaseReadyPromise = new Promise(resolve => {
  resolveFirebaseReady = resolve;
});

function finishFirebaseInit(ok, error) {
  window._noxFirebaseReady = !!ok;
  window._noxFirebaseError = error || null;
  if (resolveFirebaseReady) resolveFirebaseReady(!!ok);
}

async function waitForFirebase(timeoutMs = 10000) {
  if (window._noxFirebaseReady && window._noxDB) return true;
  if (window._noxFirebaseError) return false;

  return Promise.race([
    window._noxFirebaseReadyPromise,
    new Promise(resolve => setTimeout(() => resolve(false), timeoutMs))
  ]);
}

window.noxFirebaseReady = waitForFirebase;

// ── Load Firebase SDK and init ───────────────────────────────
(function initFirebase() {
  if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
    console.info('[NOX] Firebase: brak konfiguracji.');
    finishFirebaseInit(false, new Error('Brak konfiguracji Firebase.'));
    return;
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    (async () => {
      try {
        const appSdk = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
        const firestoreSdk = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
        const authSdk = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
        const storageSdk = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js');

        const app = appSdk.initializeApp(${JSON.stringify(FIREBASE_CONFIG)});
        const db = firestoreSdk.getFirestore(app);
        const auth = authSdk.getAuth(app);
        const storage = storageSdk.getStorage(app);

        window._noxDB = db;
        window._noxAuth = auth;
        window._noxStorage = storage;

        window._noxFS = {
          collection: firestoreSdk.collection,
          addDoc: firestoreSdk.addDoc,
          getDocs: firestoreSdk.getDocs,
          query: firestoreSdk.query,
          orderBy: firestoreSdk.orderBy,
          doc: firestoreSdk.doc,
          updateDoc: firestoreSdk.updateDoc,
          deleteDoc: firestoreSdk.deleteDoc,
          serverTimestamp: firestoreSdk.serverTimestamp
        };

        window._noxAuthFns = {
          signInWithEmailAndPassword: authSdk.signInWithEmailAndPassword,
          signOut: authSdk.signOut,
          onAuthStateChanged: authSdk.onAuthStateChanged
        };

        window._noxStorageFns = {
          ref: storageSdk.ref,
          uploadBytes: storageSdk.uploadBytes,
          getDownloadURL: storageSdk.getDownloadURL
        };

        window._noxFirebaseReady = true;
        console.info('[NOX] Firebase zainicjalizowany.');
        window.dispatchEvent(new Event('noxFirebaseReady'));
      } catch (err) {
        window._noxFirebaseError = err;
        console.warn('[NOX] Firebase init error:', err.message);
        window.dispatchEvent(new CustomEvent('noxFirebaseError', { detail: err.message }));
      }
    })();
  `;
  document.head.appendChild(script);
})();

window.addEventListener('noxFirebaseReady', () => finishFirebaseInit(true));
window.addEventListener('noxFirebaseError', event => {
  finishFirebaseInit(false, new Error(event.detail || 'Firebase init error'));
});

// ── Payload normalization ────────────────────────────────────
function cleanOneLine(value, max = 240) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function cleanMultiLine(value, max = 4000) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, max);
}

function cleanEmail(value) {
  return cleanOneLine(value, 180).toLowerCase();
}

function cleanHex(value, fallback) {
  const color = cleanOneLine(value, 16).toUpperCase();
  return /^#[0-9A-F]{6}$/.test(color) ? color : fallback;
}

function normalizeFirebasePayload(collectionName, data) {
  const base = {
    name: cleanOneLine(data.name, 140),
    email: cleanEmail(data.email),
    id: Number(data.id) || Date.now(),
    status: 'new',
    created_at: cleanOneLine(data.created_at, 40) || new Date().toISOString()
  };

  if (collectionName === 'submissions') {
    return {
      ...base,
      products: cleanOneLine(data.products, 1600),
      productKeys: cleanOneLine(data.productKeys, 600),
      sleeve: cleanOneLine(data.sleeve, 40),
      collar: cleanOneLine(data.collar, 60),
      primaryColor: cleanHex(data.primaryColor, '#0F3D2E'),
      secondaryColor: cleanHex(data.secondaryColor, '#FFFFFF'),
      material: cleanOneLine(data.material, 60),
      branding: cleanOneLine(data.branding, 60),
      quantity: cleanOneLine(data.quantity, 40),
      sizes: cleanOneLine(data.sizes, 600),
      deadline: cleanOneLine(data.deadline, 120),
      notes: cleanMultiLine(data.notes, 4000),
      phone: cleanOneLine(data.phone, 80),
      team: cleanOneLine(data.team, 180)
    };
  }

  if (collectionName === 'ambassadors') {
    return {
      ...base,
      social: cleanOneLine(data.social, 400),
      team: cleanOneLine(data.team, 180),
      message: cleanMultiLine(data.message, 3000)
    };
  }

  return {
    ...base,
    subject: cleanOneLine(data.subject, 180),
    message: cleanMultiLine(data.message, 4000),
    source: cleanOneLine(data.source, 140),
    phone: cleanOneLine(data.phone, 80),
    team: cleanOneLine(data.team, 180)
  };
}

// ── Save a document to Firestore ─────────────────────────────
async function saveToFirebase(collectionName, data) {
  window._noxLastFirebaseError = null;

  if (!NOX_PUBLIC_COLLECTIONS.has(collectionName)) {
    window._noxLastFirebaseError = new Error('Niedozwolona kolekcja Firebase.');
    console.warn('[NOX] Firebase save error:', window._noxLastFirebaseError.message);
    return false;
  }

  const ready = await waitForFirebase();
  if (!ready || !window._noxDB || !window._noxFS) {
    window._noxLastFirebaseError = window._noxFirebaseError || new Error('Firebase nie jest gotowy.');
    console.warn('[NOX] Firebase save error:', window._noxLastFirebaseError.message);
    return false;
  }

  try {
    const payload = normalizeFirebasePayload(collectionName, data || {});
    const col = window._noxFS.collection(window._noxDB, collectionName);
    const ref = await window._noxFS.addDoc(col, {
      ...payload,
      timestamp: window._noxFS.serverTimestamp()
    });
    return { ok: true, id: ref.id };
  } catch (err) {
    window._noxLastFirebaseError = err;
    console.warn('[NOX] Firebase save error:', err.code || '', err.message);
    return false;
  }
}

// ── Upload a File object to Firebase Storage ─────────────────
async function uploadFileToFirebase(file) {
  const ready = await waitForFirebase();
  if (!ready || !window._noxStorage) return null;
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
