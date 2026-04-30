// ============================================================
// NOXCUSES Admin Panel JS
// Firebase Auth + Firestore odczyt/zapis
// ============================================================

// ── State ────────────────────────────────────────────────────
let adminData = { orders: [], ambassadors: [], contacts: [] };
let activeTab = 'orders';
let currentUser = null;

// ── DOM refs ─────────────────────────────────────────────────
const loginScreen  = document.getElementById('loginScreen');
const dashboard    = document.getElementById('dashboard');
const loginForm    = document.getElementById('loginForm');
const loginError   = document.getElementById('loginError');
const adminUserEl  = document.getElementById('adminUser');

// ── Firebase Auth login ──────────────────────────────────────
loginForm && loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginUser').value.trim();
  const pass  = document.getElementById('loginPass').value;

  loginError.style.display = 'none';
  const btn = document.getElementById('lAdminSubmit');
  btn.disabled = true;
  btn.textContent = '...';

  if (!window._noxFirebaseReady || !window._noxAuthFns) {
    showLoginError('Firebase nie jest gotowy. Odśwież stronę i spróbuj ponownie.');
    btn.disabled = false;
    btn.textContent = 'ZALOGUJ';
    return;
  }

  try {
    const cred = await window._noxAuthFns.signInWithEmailAndPassword(
      window._noxAuth, email, pass
    );
    currentUser = cred.user;
    showDashboard(currentUser.email);
  } catch (err) {
    showLoginError(getAuthErrorMsg(err.code));
  }

  btn.disabled = false;
  btn.textContent = 'ZALOGUJ';
});

function showLoginError(message) {
  loginError.textContent = message;
  loginError.style.display = 'block';
  const box = document.querySelector('.admin-login-box');
  box.classList.add('form-shake');
  setTimeout(() => box.classList.remove('form-shake'), 400);
}

function getAuthErrorMsg(code) {
  const map = {
    'auth/wrong-password':       'Nieprawidłowe hasło.',
    'auth/user-not-found':       'Nie znaleziono użytkownika.',
    'auth/invalid-email':        'Nieprawidłowy adres e-mail.',
    'auth/too-many-requests':    'Zbyt wiele prób. Spróbuj później.',
    'auth/network-request-failed': 'Błąd sieci. Sprawdź połączenie.',
  };
  return map[code] || 'Błąd logowania. Sprawdź dane.';
}

// When Firebase is ready after page load, set up auth state listener
window.addEventListener('noxFirebaseReady', () => {
  window._noxAuthFns.onAuthStateChanged(window._noxAuth, (user) => {
    if (user && !currentUser) {
      currentUser = user;
      showDashboard(user.email);
    }
  });
});

// ── Show dashboard after login ───────────────────────────────
async function showDashboard(userLabel) {
  loginScreen.style.display = 'none';
  dashboard.style.display   = 'block';
  adminUserEl.textContent   = userLabel;
  await loadAllData();
  showTab('orders');
}

// ── Logout ───────────────────────────────────────────────────
async function adminLogout() {
  if (window._noxFirebaseReady && window._noxAuthFns) {
    await window._noxAuthFns.signOut(window._noxAuth);
  }
  currentUser = null;
  dashboard.style.display   = 'none';
  loginScreen.style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

// ── Load data from Firestore ─────────────────────────────────
async function loadAllData() {
  if (window._noxFirebaseReady && window._noxDB) {
    adminData.orders      = await fetchCollection('submissions');
    adminData.ambassadors = await fetchCollection('ambassadors');
    adminData.contacts    = await fetchCollection('contacts');
  } else {
    adminData = { orders: [], ambassadors: [], contacts: [] };
  }
  updateStats();
  updateBadges();
}

async function fetchCollection(name) {
  try {
    const col  = window._noxFS.collection(window._noxDB, name);
    const q    = window._noxFS.query(col, window._noxFS.orderBy('timestamp', 'desc'));
    const snap = await window._noxFS.getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        ...data,
        clientId: data.id,
        id: d.id,
        firestoreId: d.id
      };
    });
  } catch (err) {
    console.warn('[NOX] fetchCollection error:', name, err.message);
    return [];
  }
}

// ── Stats ─────────────────────────────────────────────────────
function updateStats() {
  const newOrders = adminData.orders.filter(o => o.status === 'new').length;
  const newAmb    = adminData.ambassadors.filter(a => a.status === 'new').length;
  const newCon    = adminData.contacts.filter(c => c.status === 'new').length;

  document.getElementById('adminStats').innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${adminData.orders.length}</div>
      <div class="stat-label">Zamówienia</div>
      ${newOrders ? `<div class="stat-new-badge">+${newOrders} nowych</div>` : ''}
    </div>
    <div class="stat-card">
      <div class="stat-num">${adminData.ambassadors.length}</div>
      <div class="stat-label">Ambasadorzy</div>
      ${newAmb ? `<div class="stat-new-badge">+${newAmb} nowych</div>` : ''}
    </div>
    <div class="stat-card">
      <div class="stat-num">${adminData.contacts.length}</div>
      <div class="stat-label">Wiadomości</div>
      ${newCon ? `<div class="stat-new-badge">+${newCon} nowych</div>` : ''}
    </div>
  `;
}

function updateBadges() {
  document.getElementById('badgeOrders').textContent      = adminData.orders.length;
  document.getElementById('badgeAmbassadors').textContent = adminData.ambassadors.length;
  document.getElementById('badgeContacts').textContent    = adminData.contacts.length;
}

// ── Tabs ─────────────────────────────────────────────────────
function showTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.classList.toggle('active', t.id === 'tab' + cap(tab));
    t.setAttribute('aria-selected', t.id === 'tab' + cap(tab));
  });
  document.getElementById('adminSearch').value = '';
  renderAdminContent();
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}

function normalizeEmail(value) {
  const email = String(value || '').trim();
  return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email) ? email : '';
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ''));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

// ── Render content ────────────────────────────────────────────
function renderAdminContent() {
  const q    = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  let items  = [];

  if (activeTab === 'orders')      items = adminData.orders;
  if (activeTab === 'ambassadors') items = adminData.ambassadors;
  if (activeTab === 'contacts')    items = adminData.contacts;

  if (q) {
    items = items.filter(item =>
      JSON.stringify(item).toLowerCase().includes(q)
    );
  }

  const el = document.getElementById('adminContent');

  if (!items.length) {
    el.innerHTML = `<div class="no-data">Brak wyników.</div>`;
    return;
  }

  el.innerHTML = items.map(item => renderCard(item)).join('');
}

// ── Render single card ────────────────────────────────────────
function renderCard(item) {
  const isNew  = item.status === 'new';
  const id = String(item.id || '');
  const safeId = escapeAttr(id);
  const email = normalizeEmail(item.email);
  const date   = item.created_at
    ? new Date(item.created_at).toLocaleDateString('pl-PL', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })
    : '—';

  // Choose display fields based on tab
  let fields = [];
  if (activeTab === 'orders') {
    fields = [
      ['Produkty',  item.products || item.product],
      ['Rękawy',    item.sleeve],
      ['Krój',      item.fit],
      ['Kołnierz',  item.collar],
      ['Materiał',  item.material],
      ['Branding',  item.branding],
      ['Ilość',     item.quantity],
      ['Rozmiary',  item.sizes],
      ['Termin',    item.deadline],
      ['Telefon',   item.phone],
      ['Drużyna',   item.team],
      ['Uwagi',     item.notes],
    ];
  } else if (activeTab === 'ambassadors') {
    fields = [
      ['Social',    item.social],
      ['Drużyna',   item.team],
      ['Wiadomość', item.message],
    ];
  } else {
    fields = [
      ['Temat',     item.subject],
      ['Wiadomość', item.message],
    ];
  }

  const filteredFields = fields.filter(([, v]) => v);

  // ── Files section ─────────────────────────────────────────
  let filesHtml = '';
  if (item.files && item.files.trim && item.files.trim()) {
    const fileList = item.files.split(',').map(f => f.trim()).filter(Boolean);
    filesHtml = `
      <div class="sub-field">
        <span class="sub-field-key">Pliki</span>
        <span class="sub-field-val files-val">
          ${fileList.map(f => {
            const safeUrl = safeExternalUrl(f);
            if (safeUrl) {
              let name = f.split('/').pop().split('?')[0].replace(/^\d+_/, '');
              try { name = decodeURIComponent(name); } catch {}
              return `<span class="file-entry">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span class="file-name">${escapeHtml(name)}</span>
                <a href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener" class="file-action-btn">Otwórz</a>
                <a href="${escapeAttr(safeUrl)}" download="${escapeAttr(name)}" class="file-action-btn file-action-btn-dl">Pobierz</a>
              </span>`;
            } else {
              return `<span class="file-entry">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span class="file-name">${escapeHtml(f)}</span>
                <span class="file-no-url">Plik nie został przesłany do chmury</span>
              </span>`;
            }
          }).join('')}
        </span>
      </div>`;
  }

  const detailsHtml = filteredFields.map(([k, v]) => `
    <div class="sub-field">
      <span class="sub-field-key">${escapeHtml(k)}</span>
      <span class="sub-field-val">${escapeHtml(v)}</span>
    </div>`).join('') + filesHtml;

  return `
    <article class="submission-card${isNew ? ' card-new' : ''}" data-id="${safeId}">
      <div class="submission-card-header">
        <div class="submission-meta">
          <span class="submission-name">${escapeHtml(item.name || '—')}</span>
          ${email ? `<a href="mailto:${escapeAttr(email)}" class="submission-email">${escapeHtml(email)}</a>` : ''}
          <span class="submission-date">${escapeHtml(date)}</span>
        </div>
        <span class="submission-status ${isNew ? 'status-new' : 'status-read'}">${isNew ? 'NOWE' : 'CZYTANE'}</span>
      </div>

      ${detailsHtml ? `
      <details class="submission-details-toggle">
        <summary>Szczegóły</summary>
        <div class="submission-data">${detailsHtml}</div>
      </details>` : ''}

      <div class="submission-actions">
        ${isNew ? `<button class="btn-mark-read" onclick="markRead(this.dataset.id)" data-id="${safeId}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span class="btn-action-label">Oznacz jako czytane</span>
          <span class="btn-action-label-short">Czytane</span>
        </button>` : ''}
        <button class="btn-reply-item" onclick="replyEmail(this.dataset.email)" data-email="${escapeAttr(email)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span class="btn-action-label">Odpowiedz</span>
          <span class="btn-action-label-short">Email</span>
        </button>
        <button class="btn-delete-item" onclick="deleteItem(this.dataset.id)" data-id="${safeId}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          <span class="btn-action-label">Usuń</span>
          <span class="btn-action-label-short">Usuń</span>
        </button>
      </div>
    </article>`;
}

// ── Actions ───────────────────────────────────────────────────
async function markRead(id) {
  const list = activeTab === 'orders' ? adminData.orders
             : activeTab === 'ambassadors' ? adminData.ambassadors
             : adminData.contacts;

  const item = list.find(i => String(i.id) === String(id));
  if (!item) return;

  if (!window._noxFirebaseReady || !window._noxDB) {
    alert('Firebase jest niedostępny. Nie można zapisać zmiany.');
    return;
  }

  try {
    const col = activeTab === 'orders' ? 'submissions'
              : activeTab === 'ambassadors' ? 'ambassadors' : 'contacts';
    const docRef = window._noxFS.doc(window._noxDB, col, id);
    await window._noxFS.updateDoc(docRef, { status: 'read' });
    item.status = 'read';
    updateStats();
    renderAdminContent();
  } catch (err) {
    console.warn('[NOX] markRead error:', err.message);
    alert('Nie udało się oznaczyć wpisu jako przeczytanego.');
  }
}

async function deleteItem(id) {
  if (!confirm('Usunąć ten wpis?')) return;

  if (!window._noxFirebaseReady || !window._noxDB) {
    alert('Firebase jest niedostępny. Nie można usunąć wpisu.');
    return;
  }

  try {
    const col = activeTab === 'orders' ? 'submissions'
              : activeTab === 'ambassadors' ? 'ambassadors' : 'contacts';
    const docRef = window._noxFS.doc(window._noxDB, col, id);
    await window._noxFS.deleteDoc(docRef);

    if (activeTab === 'orders')      adminData.orders      = adminData.orders.filter(i => String(i.id) !== String(id));
    if (activeTab === 'ambassadors') adminData.ambassadors = adminData.ambassadors.filter(i => String(i.id) !== String(id));
    if (activeTab === 'contacts')    adminData.contacts    = adminData.contacts.filter(i => String(i.id) !== String(id));

    updateStats();
    updateBadges();
    renderAdminContent();
  } catch (err) {
    console.warn('[NOX] deleteItem error:', err.message);
    alert('Nie udało się usunąć wpisu.');
  }
}

function replyEmail(email) {
  const safeEmail = normalizeEmail(email);
  if (safeEmail) window.location.href = `mailto:${safeEmail}`;
}

// ── Expose globals ────────────────────────────────────────────
window.adminLogout       = adminLogout;
window.showTab           = showTab;
window.markRead          = markRead;
window.deleteItem        = deleteItem;
window.replyEmail        = replyEmail;
window.renderAdminContent = renderAdminContent;
