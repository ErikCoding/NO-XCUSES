// ============ CONFIGURATOR ============
const IMGS = {
  raglan: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/138ee1280_generated_1b223e25.png',
  setin: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/20815eea6_generated_995ca6db.png',
  vneck: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/c0edb73f2_generated_41fd7c5d.png',
  round: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/05112bbce_generated_004ef73e.png',
  polo: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/993b6ba8d_generated_9d05dd32.png',
  sublimation: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/d92aadc91_generated_bccb5504.png',
  embroidery: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/1fa86f021_generated_a254fe9e.png',
  flex: 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png',
  jersey: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/1b9ec1ccb_generated_0de49808.png',
  shorts: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/ffcb7bfd2_generated_e099dabf.png',
  socks: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/4e04a6548_generated_06a75e59.png',
  slim: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/413efdf92_generated_56c39984.png',
  regular: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/3c9d4a70e_generated_5ab13721.png',
  polyester: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/b4125f38b_generated_2c8706a4.png',
  mesh: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/3c9d4a70e_generated_5ab13721.png',
  cotton: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/413efdf92_generated_56c39984.png',
};

// FIX: Pre-load all images to prevent flicker/white flash on selection
(function preloadImages() {
  Object.values(IMGS).forEach(src => {
    const img = new Image();
    img.src = src;
  });
})();

const COLOR_PRESETS = [
  '#0f3d2e','#000000','#ffffff','#1a237e','#b71c1c','#f9a825','#1565c0','#e65100','#4a148c','#00695c'
];

let step = 0;
const TOTAL = 10;

let config = {
  // UPDATED: products is now an array (multi-select)
  products: [],
  sleeve: '',
  fit: '',
  collar: '',
  primaryColor: '#0f3d2e',
  secondaryColor: '#ffffff',
  material: '',
  branding: '',
  files: [],
  quantity: '', sizes: '', deadline: '', notes: '',
  name: '', email: '', phone: '', team: ''
};

// Step 0 uses products[] so validate differently
const REQUIRED_STEPS = [1, 2, 3, 5, 6];
const REQUIRED_FIELDS = { 1: 'sleeve', 2: 'fit', 3: 'collar', 5: 'material', 6: 'branding' };

function getStepNames() {
  return [
    t('step-product'), t('step-sleeves'), t('step-fit'), t('step-collar'),
    t('step-colors'), t('step-material'), t('step-branding'), t('step-upload'),
    t('step-details'), t('step-contact')
  ];
}

function buildDots() {
  const wrap = document.getElementById('stepDots');
  if (!wrap) return;
  wrap.innerHTML = Array.from({length: TOTAL}, (_, i) => `
    <button class="step-dot${i===step?' active':i<step?' done':''}"
      onclick="jumpToStep(${i})" aria-label="Krok ${i+1}" title="${getStepNames()[i]}"></button>
  `).join('');
}

function jumpToStep(i) {
  if (i < step) { step = i; renderStep(); window.scrollTo(0,0); }
}

function updateProgress() {
  const pct = ((step + 1) / TOTAL * 100).toFixed(0);
  document.getElementById('progressFill').style.width = pct + '%';
  const names = getStepNames();
  document.getElementById('stepLabel').textContent = t('step-label') + ' ' + (step+1) + ' / ' + TOTAL;
  document.getElementById('stepName').textContent = names[step];

  const prog = document.querySelector('.progress-bar-wrapper');
  if (prog) prog.setAttribute('aria-valuenow', step+1);

  const backBtn = document.getElementById('btnBack');
  backBtn.disabled = step === 0;

  const nextLabel = document.getElementById('nextLabel');
  const nextBtn = document.getElementById('btnNext');
  const nextIcon = nextBtn ? nextBtn.querySelector('svg') : null;
  if (step === TOTAL - 1) {
    nextLabel.textContent = t('btn-submit') || 'WYŚLIJ ZAMÓWIENIE';
    if (nextIcon) nextIcon.innerHTML = '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>';
  } else {
    nextLabel.textContent = t('btn-next') || 'DALEJ';
    if (nextIcon) nextIcon.innerHTML = '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>';
  }
  document.getElementById('backLabel').textContent = t('btn-back') || 'WSTECZ';

  const hint = document.getElementById('validationHint');
  if (hint) hint.textContent = '';

  buildDots();
}

// Radio-style card (single select)
function optCard(value, label, img, fieldKey, extraLabel) {
  const sel = config[fieldKey] === value;
  return `
    <button class="option-card${sel?' selected':''}"
      onclick="selectOpt('${fieldKey}','${value}')"
      aria-pressed="${sel}"
      aria-label="${label}">
      <div class="option-card-img-wrap">
        <img src="${img}" alt="${label}" />
      </div>
      <div class="option-card-label">
        ${label}
        ${extraLabel ? `<span class="option-extra">${extraLabel}</span>` : ''}
      </div>
      ${sel ? `<div class="option-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>` : ''}
    </button>`;
}

// UPDATED: Checkbox-style card (multi-select) for products
function optCardMulti(value, label, img) {
  const sel = config.products.includes(value);
  return `
    <button class="option-card${sel?' selected':''}"
      onclick="toggleProduct('${value}')"
      aria-pressed="${sel}"
      aria-label="${label}">
      <div class="option-card-img-wrap">
        <img src="${img}" alt="${label}" />
      </div>
      <div class="option-card-label">${label}</div>
      <div class="option-check${sel?'':' option-check-empty'}" aria-hidden="true">
        ${sel
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
          : ''}
      </div>
    </button>`;
}

// UPDATED: Toggle product in array
function toggleProduct(value) {
  const idx = config.products.indexOf(value);
  if (idx === -1) {
    config.products.push(value);
  } else {
    config.products.splice(idx, 1);
  }
  // FIX: Update only the cards, not the whole content — prevents image flicker
  const grid = document.getElementById('productGrid');
  if (!grid) { renderStep(); return; }
  const pl = getLang() === 'pl';
  const items = [
    { value: 'jersey', label: pl?'Koszulka':'Jersey', img: IMGS.jersey },
    { value: 'shorts', label: pl?'Spodenki':'Shorts', img: IMGS.shorts },
    { value: 'socks',  label: pl?'Skarpety':'Socks',  img: IMGS.socks  },
  ];
  items.forEach(item => {
    const btn = grid.querySelector(`[data-product="${item.value}"]`);
    if (!btn) return;
    const isSel = config.products.includes(item.value);
    btn.classList.toggle('selected', isSel);
    btn.setAttribute('aria-pressed', isSel);
    let checkDiv = btn.querySelector('.option-check, .option-check-empty');
    if (checkDiv) {
      checkDiv.className = 'option-check' + (isSel ? '' : ' option-check-empty');
      checkDiv.innerHTML = isSel
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
        : '';
    }
  });
}

function selectOpt(field, value) {
  config[field] = value;
  // FIX: Update only the affected cards, not full innerHTML re-render
  const cards = document.querySelectorAll(`[onclick^="selectOpt('${field}'"]`);
  cards.forEach(card => {
    const cardVal = card.getAttribute('onclick').match(/'([^']+)'$/)?.[1];
    const isSel = cardVal === value;
    card.classList.toggle('selected', isSel);
    card.setAttribute('aria-pressed', isSel);
    let checkDiv = card.querySelector('.option-check');
    if (isSel && !checkDiv) {
      const check = document.createElement('div');
      check.className = 'option-check';
      check.setAttribute('aria-hidden', 'true');
      check.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      card.appendChild(check);
    } else if (!isSel && checkDiv) {
      checkDiv.remove();
    }
  });
}

function renderStep() {
  const el = document.getElementById('configContent');
  if (!el) return;
  updateProgress();
  const lang = getLang();
  const pl = lang === 'pl';

  let html = '';

  switch(step) {
    // ── STEP 0: Product (MULTI-SELECT) ───────────────────────────
    case 0:
      html = `
        <h2 class="step-title">${pl?'Typ Produktu':'Product Type'}</h2>
        <p class="step-sub">${pl?'Możesz wybrać kilka produktów':'You can select multiple products'}</p>
        <div class="options-grid" id="productGrid">
          <button class="option-card${config.products.includes('jersey')?' selected':''}"
            data-product="jersey" onclick="toggleProduct('jersey')"
            aria-pressed="${config.products.includes('jersey')}" aria-label="${pl?'Koszulka':'Jersey'}">
            <div class="option-card-img-wrap"><img src="${IMGS.jersey}" alt="${pl?'Koszulka':'Jersey'}" /></div>
            <div class="option-card-label">${pl?'Koszulka':'Jersey'}</div>
            <div class="option-check${config.products.includes('jersey')?'':' option-check-empty'}" aria-hidden="true">
              ${config.products.includes('jersey') ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
            </div>
          </button>
          <button class="option-card${config.products.includes('shorts')?' selected':''}"
            data-product="shorts" onclick="toggleProduct('shorts')"
            aria-pressed="${config.products.includes('shorts')}" aria-label="${pl?'Spodenki':'Shorts'}">
            <div class="option-card-img-wrap"><img src="${IMGS.shorts}" alt="${pl?'Spodenki':'Shorts'}" /></div>
            <div class="option-card-label">${pl?'Spodenki':'Shorts'}</div>
            <div class="option-check${config.products.includes('shorts')?'':' option-check-empty'}" aria-hidden="true">
              ${config.products.includes('shorts') ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
            </div>
          </button>
          <button class="option-card${config.products.includes('socks')?' selected':''}"
            data-product="socks" onclick="toggleProduct('socks')"
            aria-pressed="${config.products.includes('socks')}" aria-label="${pl?'Skarpety':'Socks'}">
            <div class="option-card-img-wrap"><img src="${IMGS.socks}" alt="${pl?'Skarpety':'Socks'}" /></div>
            <div class="option-card-label">${pl?'Skarpety':'Socks'}</div>
            <div class="option-check${config.products.includes('socks')?'':' option-check-empty'}" aria-hidden="true">
              ${config.products.includes('socks') ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
            </div>
          </button>
        </div>`;
      break;

    // ── STEP 1: Sleeves ──────────────────────────────────────────
    case 1:
      html = `
        <h2 class="step-title">${pl?'Rękawy':'Sleeves'}</h2>
        <p class="step-sub">${pl?'Wybierz typ rękawa':'Select sleeve type'}</p>
        <div class="options-grid options-grid-2">
          ${optCard('raglan', 'Raglan', IMGS.raglan, 'sleeve')}
          ${optCard('setin', pl?'Wszywany':'Set-in', IMGS.setin, 'sleeve')}
        </div>`;
      break;

    // ── STEP 2: Fit ──────────────────────────────────────────────
    case 2:
      html = `
        <h2 class="step-title">${pl?'Krój':'Fit'}</h2>
        <p class="step-sub">${pl?'Wybierz dopasowanie':'Select the fit'}</p>
        <div class="options-grid options-grid-2">
          ${optCard('slim', 'Slim Fit', IMGS.slim, 'fit')}
          ${optCard('regular', 'Regular Fit', IMGS.regular, 'fit')}
        </div>`;
      break;

    // ── STEP 3: Collar ───────────────────────────────────────────
    case 3:
      html = `
        <h2 class="step-title">${pl?'Kołnierz':'Collar'}</h2>
        <p class="step-sub">${pl?'Wybierz typ kołnierza':'Select collar type'}</p>
        <div class="options-grid">
          ${optCard('crewneck',      pl?'Okrągły':'Crewneck',               IMGS.round, 'collar')}
          ${optCard('vneck',         'V-Neck',                               IMGS.vneck, 'collar')}
          ${optCard('vneck-overlap', pl?'V-Neck Zakładkowy':'Overlap V-Neck', IMGS.vneck, 'collar')}
          ${optCard('polo',          'Polo',                                 IMGS.polo,  'collar', pl?'+dopłata':'+extra')}
          ${optCard('vneck-polo',    'V-Neck Polo',                          IMGS.polo,  'collar', pl?'+dopłata':'+extra')}
        </div>`;
      break;

    // ── STEP 4: Colors ───────────────────────────────────────────
    case 4:
      html = `
        <h2 class="step-title">${pl?'Kolory':'Colors'}</h2>
        <p class="step-sub">${pl?'Wybierz kolory swojego stroju':'Choose your kit colors'}</p>
        <div class="color-section">
          <div class="color-section-label">${pl?'Kolor główny':'Primary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.primaryColor===c?' selected':''}"
                style="background:${c}" onclick="config.primaryColor='${c}';renderStep()"
                aria-label="${c}" aria-pressed="${config.primaryColor===c}">
                ${config.primaryColor===c ? `<svg viewBox="0 0 24 24" fill="none" stroke="${isDark(c)?'#fff':'#000'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </button>`).join('')}
            <input type="color" class="color-input" value="${config.primaryColor}"
              onchange="config.primaryColor=this.value;renderStep()"
              aria-label="${pl?'Własny kolor główny':'Custom primary color'}" />
          </div>
        </div>
        <div class="color-section">
          <div class="color-section-label">${pl?'Kolor dodatkowy':'Secondary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.secondaryColor===c?' selected':''}"
                style="background:${c}" onclick="config.secondaryColor='${c}';renderStep()"
                aria-label="${c}" aria-pressed="${config.secondaryColor===c}">
                ${config.secondaryColor===c ? `<svg viewBox="0 0 24 24" fill="none" stroke="${isDark(c)?'#fff':'#000'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </button>`).join('')}
            <input type="color" class="color-input" value="${config.secondaryColor}"
              onchange="config.secondaryColor=this.value;renderStep()"
              aria-label="${pl?'Własny kolor dodatkowy':'Custom secondary color'}" />
          </div>
        </div>
        <div class="color-preview" aria-label="${pl?'Podgląd kolorów':'Color preview'}">
          <div class="color-preview-box" style="background:${config.primaryColor}"></div>
          <span class="color-preview-plus" aria-hidden="true">+</span>
          <div class="color-preview-box" style="background:${config.secondaryColor}"></div>
        </div>`;
      break;

    // ── STEP 5: Material ─────────────────────────────────────────
    case 5:
      html = `
        <h2 class="step-title">${pl?'Materiał':'Material'}</h2>
        <p class="step-sub">${pl?'Wybierz rodzaj materiału':'Select fabric type'}</p>
        <div class="options-grid options-grid-2">
          ${optCard('standard', pl?'Standardowy':'Standard', IMGS.polyester, 'material')}
          ${optCard('rib', pl?'Ściągacz (Rib)':'Rib Knit', IMGS.mesh, 'material')}
        </div>
        <div class="material-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          ${pl ? 'Ściągacz stosowany jest szczególnie na rękawach i kołnierzach polo.' : 'Rib knit is especially used on sleeves and polo collars.'}
        </div>`;
      break;

    // ── STEP 6: Branding ─────────────────────────────────────────
    case 6:
      html = `
        <h2 class="step-title">Branding</h2>
        <p class="step-sub">${pl?'Wybierz technikę zdobienia':'Select decoration technique'}</p>
        <div class="options-grid options-grid-2">
          ${optCard('sublimation', pl?'Sublimacja':'Sublimation',  IMGS.sublimation, 'branding')}
          ${optCard('heatpress',   pl?'Termotransfer':'Heat Press', IMGS.flex,        'branding')}
          ${optCard('silicone',    pl?'Silikon':'Silicone Print',   IMGS.flex,        'branding')}
          ${optCard('embroidery',  pl?'Haft':'Embroidery',          IMGS.embroidery,  'branding')}
        </div>`;
      break;

    // ── STEP 7: Upload ───────────────────────────────────────────
    case 7:
      html = `
        <h2 class="step-title">${pl?'Prześlij pliki':'Upload files'}</h2>
        <p class="step-sub">${pl?'Dodaj logo, grafiki lub wytyczne (PNG, JPG, PDF, AI).':'Add logos, graphics or guidelines (PNG, JPG, PDF, AI).'}</p>
        <div class="upload-zone" onclick="document.getElementById('fileInput').click()" role="button" tabindex="0"
          onkeydown="if(event.key==='Enter'||event.key===' ')document.getElementById('fileInput').click()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="width:40px;height:40px;margin:0 auto 12px;display:block;color:#999"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <p>${pl?'Kliknij lub przeciągnij pliki tutaj':'Click or drag files here'}</p>
          <p style="font-size:0.75rem;color:#bbb;margin-top:4px">PNG, JPG, PDF, AI</p>
        </div>
        <input type="file" id="fileInput" multiple accept=".png,.jpg,.jpeg,.pdf,.ai,.svg" style="display:none" onchange="addFiles(this)" />
        ${config.files.length ? `
          <ul class="file-list">
            ${config.files.map((f,i) => `
              <li>
                <span>${f}</span>
                <button class="file-remove" onclick="removeFile(${i})" aria-label="${pl?'Usuń plik':'Remove file'} ${f}">✕</button>
              </li>`).join('')}
          </ul>` : ''}`;
      break;

    // ── STEP 8: Details ──────────────────────────────────────────
    case 8:
      html = `
        <h2 class="step-title">${pl?'Szczegóły zamówienia':'Order Details'}</h2>
        <p class="step-sub">${pl?'Ilość, rozmiary, termin realizacji':'Quantity, sizes, deadline'}</p>
        <div style="max-width:520px">
          <div class="form-group">
            <label class="form-label" for="det-qty">${pl?'Ilość (szt.)':'Quantity (pcs)'}</label>
            <input class="form-input" type="number" id="det-qty" min="1" value="${config.quantity}" oninput="config.quantity=this.value" placeholder="${pl?'np. 20':'e.g. 20'}" />
          </div>
          <div class="form-group">
            <label class="form-label" for="det-sizes">${pl?'Rozmiary':'Sizes'}</label>
            <input class="form-input" type="text" id="det-sizes" value="${config.sizes}" oninput="config.sizes=this.value" placeholder="S×2, M×5, L×10, XL×3" />
          </div>
          <div class="form-group">
            <label class="form-label" for="det-deadline">${pl?'Termin realizacji':'Deadline'}</label>
            <input class="form-input" type="date" id="det-deadline" value="${config.deadline}" oninput="config.deadline=this.value" />
          </div>
          <div class="form-group">
            <label class="form-label" for="det-notes">${pl?'Dodatkowe uwagi':'Additional notes'}</label>
            <textarea class="form-textarea" id="det-notes" oninput="config.notes=this.value">${config.notes}</textarea>
          </div>
        </div>`;
      break;

    // ── STEP 9: Contact ──────────────────────────────────────────
    case 9:
      html = `
        <h2 class="step-title">${pl?'Dane kontaktowe':'Contact Details'}</h2>
        <p class="step-sub">${pl?'Potrzebujemy Twoich danych aby wysłać wycenę':'We need your details to send you a quote'}</p>
        <div style="max-width:520px">
          <div class="form-group">
            <label class="form-label" for="con-name-c">${pl?'Imię i nazwisko':'Full name'} *</label>
            <input class="form-input" type="text" id="con-name-c" value="${config.name}" oninput="config.name=this.value" autocomplete="name" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="con-email-c">${pl?'Adres e-mail':'Email address'} *</label>
            <input class="form-input" type="email" id="con-email-c" value="${config.email}" oninput="config.email=this.value" autocomplete="email" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="con-phone-c">${pl?'Telefon':'Phone'}</label>
            <input class="form-input" type="tel" id="con-phone-c" value="${config.phone}" oninput="config.phone=this.value" autocomplete="tel" />
          </div>
          <div class="form-group">
            <label class="form-label" for="con-team-c">${pl?'Nazwa drużyny / organizacji':'Team / Organization'}</label>
            <input class="form-input" type="text" id="con-team-c" value="${config.team}" oninput="config.team=this.value" />
          </div>
          <div class="config-summary">
            <h3 class="config-summary-title">${pl?'Podsumowanie':'Summary'}</h3>
            <div class="config-summary-grid">
              ${[
                [pl?'Produkty':'Products', config.products.join(', ')],
                [pl?'Rękawy':'Sleeves', config.sleeve],
                [pl?'Krój':'Fit', config.fit],
                [pl?'Kołnierz':'Collar', config.collar],
                [pl?'Materiał':'Material', config.material],
                ['Branding', config.branding],
              ].filter(([,v])=>v).map(([k,v]) => `
                <div class="config-summary-row">
                  <span class="config-summary-key">${k}</span>
                  <span class="config-summary-val">${v}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>`;
      break;
  }

  el.innerHTML = html;
}

function isDark(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (0.299*r + 0.587*g + 0.114*b) < 128;
}

function addFiles(input) {
  Array.from(input.files).forEach(f => { if(!config.files.includes(f.name)) config.files.push(f.name); });
  renderStep();
}

function removeFile(i) {
  config.files.splice(i, 1);
  renderStep();
}

function configBack() {
  if (step > 0) { step--; renderStep(); window.scrollTo(0,0); }
}

async function configNext() {
  // Validate step 0 (multi-select products)
  if (step === 0 && config.products.length === 0) {
    const hint = document.getElementById('validationHint');
    if (hint) hint.textContent = t('select-required');
    const btn = document.getElementById('btnNext');
    btn.classList.add('btn-shake');
    setTimeout(() => btn.classList.remove('btn-shake'), 500);
    return;
  }

  // Validate other required steps
  if (REQUIRED_STEPS.includes(step)) {
    const field = REQUIRED_FIELDS[step];
    if (!config[field]) {
      const hint = document.getElementById('validationHint');
      if (hint) hint.textContent = t('select-required');
      const btn = document.getElementById('btnNext');
      btn.classList.add('btn-shake');
      setTimeout(() => btn.classList.remove('btn-shake'), 500);
      return;
    }
  }

  if (step === TOTAL - 1) {
    if (!config.name.trim() || !config.email.trim()) {
      showToast(getLang()==='pl' ? 'Podaj imię i adres e-mail.' : 'Please fill in name and email.', true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email.trim())) {
      showToast(getLang()==='pl' ? 'Podaj prawidłowy e-mail.' : 'Please enter a valid email.', true);
      return;
    }

    const btn = document.getElementById('btnNext');
    btn.disabled = true;
    btn.classList.add('btn-loading');

    const sub = {
      ...config,
      products: config.products.join(', '),
      files: config.files.join(', '),
      id: Date.now(), status: 'new', created_at: new Date().toISOString()
    };

    const saved = await saveToFirebase('submissions', sub);
    if (!saved) {
      const subs = JSON.parse(localStorage.getItem('nox_submissions') || '[]');
      subs.unshift(sub);
      localStorage.setItem('nox_submissions', JSON.stringify(subs));
    }

    btn.disabled = false;
    btn.classList.remove('btn-loading');
    showToast(t('success-order'));
    setTimeout(() => { window.location.href = 'index.html'; }, 2500);
    return;
  }

  step++;
  renderStep();
  window.scrollTo(0,0);
}

window.renderStep = renderStep;
document.addEventListener('DOMContentLoaded', () => { renderStep(); });
