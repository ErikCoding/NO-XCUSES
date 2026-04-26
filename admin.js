// ============ ADMIN ============
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

let currentTab = 'orders';

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('adminUser').textContent = user;
    renderAdminStats();
    showTab('orders');
  } else {
    const errEl = document.getElementById('loginError');
    errEl.style.display = 'block';
    errEl.textContent = getLang() === 'pl' ? 'Nieprawidłowe dane logowania.' : 'Invalid credentials.';
  }
});

function adminLogout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function renderAdminStats() {
  const subs = JSON.parse(localStorage.getItem('nox_submissions') || '[]');
  const ambs = JSON.parse(localStorage.getItem('nox_ambassadors') || '[]');
  const cons = JSON.parse(localStorage.getItem('nox_contacts') || '[]');
  const lang = getLang();
  document.getElementById('adminStats').innerHTML = `
    <div class="stat-card"><div class="stat-num">${subs.length}</div><div class="stat-label">${lang==='pl'?'Zamówienia':'Orders'}</div></div>
    <div class="stat-card"><div class="stat-num">${ambs.length}</div><div class="stat-label">${lang==='pl'?'Ambasadorzy':'Ambassadors'}</div></div>
    <div class="stat-card"><div class="stat-num">${cons.length}</div><div class="stat-label">${lang==='pl'?'Wiadomości':'Messages'}</div></div>
  `;
}

function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  const map = {orders:'tabOrders', ambassadors:'tabAmbassadors', contacts:'tabContacts'};
  document.getElementById(map[tab]).classList.add('active');
  renderAdminContent();
}

function renderAdminContent() {
  const lang = getLang();
  const keyMap = {orders:'nox_submissions', ambassadors:'nox_ambassadors', contacts:'nox_contacts'};
  const items = JSON.parse(localStorage.getItem(keyMap[currentTab]) || '[]');
  const content = document.getElementById('adminContent');
  if (!content) return;

  if (!items.length) {
    content.innerHTML = `<div class="no-data">${lang==='pl'?'Brak danych.':'No data.'}</div>`;
    return;
  }

  content.innerHTML = items.map(item => {
    const data = item.data || item;
    const fields = Object.entries(data)
      .filter(([k]) => !['id','status','created_at','files'].includes(k))
      .map(([k,v]) => v ? `<div><strong>${k}:</strong> ${v}</div>` : '')
      .join('');
    const status = item.status || 'new';
    const date = item.created_at ? new Date(item.created_at).toLocaleDateString('pl-PL') : '';
    return `
      <div class="submission-card" id="card-${item.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
          <span class="submission-status ${status==='new'?'status-new':'status-read'}">
            ${status==='new' ? (lang==='pl'?'Nowe':'New') : (lang==='pl'?'Przeczytane':'Read')}
          </span>
          <span style="font-size:0.75rem;color:#999">${date}</span>
        </div>
        <div class="submission-data">${fields}</div>
        <div class="submission-actions">
          ${status==='new' ? `<button class="btn-mark-read" onclick="markRead('${currentTab}',${item.id})">${lang==='pl'?'Oznacz jako przeczytane':'Mark as read'}</button>` : ''}
          <button class="btn-delete-item" onclick="deleteItem('${currentTab}',${item.id})">${lang==='pl'?'Usuń':'Delete'}</button>
        </div>
      </div>`;
  }).join('');
}

function markRead(tab, id) {
  const keyMap = {orders:'nox_submissions', ambassadors:'nox_ambassadors', contacts:'nox_contacts'};
  const key = keyMap[tab];
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const updated = items.map(i => i.id === id ? {...i, status:'read'} : i);
  localStorage.setItem(key, JSON.stringify(updated));
  renderAdminStats();
  renderAdminContent();
}

function deleteItem(tab, id) {
  const keyMap = {orders:'nox_submissions', ambassadors:'nox_ambassadors', contacts:'nox_contacts'};
  const key = keyMap[tab];
  const items = JSON.parse(localStorage.getItem(key) || '[]').filter(i => i.id !== id);
  localStorage.setItem(key, JSON.stringify(items));
  renderAdminStats();
  renderAdminContent();
}

// Override applyLang for admin
const _origApplyLangAdmin = window.applyLang;
window.applyLang = function() {
  if (_origApplyLangAdmin) _origApplyLangAdmin();
  renderAdminStats();
  renderAdminContent();
};

window.renderAdminContent = renderAdminContent;
