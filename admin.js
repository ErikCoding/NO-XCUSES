// ============ ADMIN — Updated with search, badges, Firebase sync ============
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

let currentTab = 'orders';

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
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
    // NEW: shake effect
    document.getElementById('loginForm').classList.add('form-shake');
    setTimeout(() => document.getElementById('loginForm').classList.remove('form-shake'), 500);
  }
});

function adminLogout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

// NEW: Get data (localStorage)
function getData(tab) {
  const key = {orders:'nox_submissions', ambassadors:'nox_ambassadors', contacts:'nox_contacts'}[tab];
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function saveData(tab, items) {
  const key = {orders:'nox_submissions', ambassadors:'nox_ambassadors', contacts:'nox_contacts'}[tab];
  localStorage.setItem(key, JSON.stringify(items));
}

// NEW: Count new items per tab → badges
function renderAdminStats() {
  const lang = getLang();
  const tabs = ['orders','ambassadors','contacts'];
  const labels = lang === 'pl'
    ? ['Zamówienia','Ambasadorzy','Wiadomości']
    : ['Orders','Ambassadors','Messages'];

  tabs.forEach((tab, i) => {
    const items = getData(tab);
    const newCount = items.filter(x => (x.status||'new') === 'new').length;
    const badge = document.getElementById('badge' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (badge) { badge.textContent = items.length; badge.style.display = items.length ? '' : 'none'; }
  });

  // Stats cards
  const allData = tabs.map(t => getData(t));
  document.getElementById('adminStats').innerHTML = allData.map((items, i) => `
    <div class="stat-card">
      <div class="stat-num">${items.length}</div>
      <div class="stat-label">${labels[i]}</div>
      ${items.filter(x=>(x.status||'new')==='new').length
        ? `<div class="stat-new-badge">${items.filter(x=>(x.status||'new')==='new').length} ${lang==='pl'?'nowych':'new'}</div>`
        : ''}
    </div>`).join('');
}

function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected','false');
  });
  const tabEl = document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (tabEl) { tabEl.classList.add('active'); tabEl.setAttribute('aria-selected','true'); }
  renderAdminContent();
}

function renderAdminContent() {
  const lang = getLang();
  const items = getData(currentTab);
  const content = document.getElementById('adminContent');
  if (!content) return;

  // NEW: search filter
  const searchEl = document.getElementById('adminSearch');
  const query = searchEl ? searchEl.value.trim().toLowerCase() : '';

  const filtered = query ? items.filter(item => {
    const data = item.data || item;
    return JSON.stringify(data).toLowerCase().includes(query);
  }) : items;

  if (!filtered.length) {
    content.innerHTML = `<div class="no-data">${lang==='pl'?'Brak danych.':'No data.'}</div>`;
    return;
  }

  content.innerHTML = filtered.map(item => {
    const data = item.data || item;
    const status = item.status || 'new';
    const date = item.created_at ? new Date(item.created_at).toLocaleDateString('pl-PL', {
      day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'
    }) : '';

    // Field labels map
    const labelMap = {
      pl: { name:'Imię', email:'E-mail', phone:'Telefon', team:'Drużyna', message:'Wiadomość',
            subject:'Temat', social:'Social Media', product:'Produkt', sleeve:'Rękawy',
            fit:'Krój', collar:'Kołnierz', material:'Materiał', branding:'Branding',
            primaryColor:'Kolor główny', secondaryColor:'Kolor dodatkowy',
            quantity:'Ilość', sizes:'Rozmiary', deadline:'Termin', notes:'Uwagi', files:'Pliki' },
      en: { name:'Name', email:'Email', phone:'Phone', team:'Team', message:'Message',
            subject:'Subject', social:'Social Media', product:'Product', sleeve:'Sleeves',
            fit:'Fit', collar:'Collar', material:'Material', branding:'Branding',
            primaryColor:'Primary color', secondaryColor:'Secondary color',
            quantity:'Quantity', sizes:'Sizes', deadline:'Deadline', notes:'Notes', files:'Files' }
    };
    const lm = labelMap[lang] || labelMap.pl;

    const skipKeys = ['id','status','created_at','timestamp'];
    const fields = Object.entries(data)
      .filter(([k, v]) => !skipKeys.includes(k) && v)
      .map(([k, v]) => {
        const label = lm[k] || k;
        // Color swatches inline
        if (k === 'primaryColor' || k === 'secondaryColor') {
          return `<div class="sub-field"><span class="sub-field-key">${label}:</span> <span class="color-dot" style="background:${v};display:inline-block;width:14px;height:14px;border-radius:50%;vertical-align:middle;border:1px solid #ddd"></span> <span class="sub-field-val">${v}</span></div>`;
        }
        return `<div class="sub-field"><span class="sub-field-key">${label}:</span> <span class="sub-field-val">${v}</span></div>`;
      }).join('');

    return `
      <article class="submission-card" id="card-${item.id}">
        <div class="submission-card-header">
          <div class="submission-meta">
            <span class="submission-status ${status==='new'?'status-new':'status-read'}">
              ${status==='new' ? (lang==='pl'?'Nowe':'New') : (lang==='pl'?'Przeczytane':'Read')}
            </span>
            <span class="submission-name">${data.name || '—'}</span>
            ${data.email ? `<a href="mailto:${data.email}" class="submission-email">${data.email}</a>` : ''}
          </div>
          <time class="submission-date" datetime="${item.created_at||''}">${date}</time>
        </div>
        <details class="submission-details-toggle">
          <summary>${lang==='pl'?'Szczegóły':'Details'}</summary>
          <div class="submission-data">${fields}</div>
        </details>
        <div class="submission-actions">
          ${status==='new' ? `
            <button class="btn-mark-read" onclick="markRead('${currentTab}',${item.id})" aria-label="${lang==='pl'?'Oznacz jako przeczytane':'Mark as read'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
              ${lang==='pl'?'Przeczytane':'Mark read'}
            </button>` : ''}
          <button class="btn-delete-item" onclick="deleteItem('${currentTab}',${item.id})" aria-label="${lang==='pl'?'Usuń':'Delete'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            ${lang==='pl'?'Usuń':'Delete'}
          </button>
        </div>
      </article>`;
  }).join('');
}

function markRead(tab, id) {
  const items = getData(tab).map(i => i.id === id ? {...i, status:'read'} : i);
  saveData(tab, items);
  renderAdminStats();
  renderAdminContent();
}

function deleteItem(tab, id) {
  if (!confirm(getLang()==='pl' ? 'Usunąć ten wpis?' : 'Delete this entry?')) return;
  const items = getData(tab).filter(i => i.id !== id);
  saveData(tab, items);
  renderAdminStats();
  renderAdminContent();
}

// Expose for applyLang
window.renderAdminContent = renderAdminContent;
window.renderAdminStats = renderAdminStats;
