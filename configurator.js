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
  polyester: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/b4125f38b_generated_2c8706a4.png',
  mesh: 'https://media.base44.com/images/public/69ee84b6a6a71488ecd2ae26/3c9d4a70e_generated_5ab13721.png'
};

(function preloadImages() {
  Object.values(IMGS).forEach(src => {
    const img = new Image();
    img.src = src;
  });
})();

const PRODUCT_GROUPS = [
  {
    key: 'clothing',
    titlePl: 'Odzież',
    titleEn: 'Clothing',
    items: [
      { value: 'match-kit', labelPl: 'Stroje meczowe', labelEn: 'Match kits', short: 'KIT' },
      { value: 'training-shirt', labelPl: 'Koszulki treningowe', labelEn: 'Training shirts', short: 'TRN' },
      { value: 'shorts', labelPl: 'Spodenki', labelEn: 'Shorts', short: 'SH' },
      { value: 'socks', labelPl: 'Getry / skarpety', labelEn: 'Socks', short: 'SOX' },
      { value: 'training-hoodie', labelPl: 'Bluza treningowa', labelEn: 'Training hoodie', short: 'HD' },
      { value: 'training-pants', labelPl: 'Spodnie treningowe', labelEn: 'Training pants', short: 'PNT' },
      { value: 'quarter-zip', labelPl: 'Bluza zip 1/4', labelEn: '1/4 zip top', short: 'ZIP' },
      { value: 'polo-shirt', labelPl: 'Koszulka polo', labelEn: 'Polo shirt', short: 'POLO' }
    ]
  },
  {
    key: 'accessories',
    titlePl: 'Akcesoria',
    titleEn: 'Accessories',
    items: [
      { value: 'backpack', labelPl: 'Plecak', labelEn: 'Backpack', short: 'BAG' },
      { value: 'duffel-bag', labelPl: 'Torba', labelEn: 'Duffle bag', short: 'DUF' },
      { value: 'gym-sack', labelPl: 'Worek', labelEn: 'Gym sack', short: 'SCK' },
      { value: 'ball', labelPl: 'Piłka', labelEn: 'Ball', short: 'BAL' },
      { value: 'shin-guards', labelPl: 'Ochraniacze', labelEn: 'Shin guards', short: 'PRO' }
    ]
  },
  {
    key: 'sets',
    titlePl: 'Dodatkowo',
    titleEn: 'Additionally',
    items: [
      { value: 'match-set', labelPl: 'Komplet meczowy (koszulka + spodenki + getry)', labelEn: 'Match set (shirt + shorts + socks)', short: 'SET', wide: true }
    ]
  }
];

const COLOR_PRESETS = [
  '#0f3d2e','#000000','#ffffff','#1a237e','#b71c1c','#f9a825','#1565c0','#e65100','#4a148c','#00695c'
];

let step = 0;
const TOTAL = 7;

let config = {
  products: [],
  sleeve: '',
  collar: '',
  primaryColor: '#0f3d2e',
  secondaryColor: '#ffffff',
  material: '',
  branding: '',
  quantity: '', sizes: '', deadline: '', notes: '',
  name: '', email: '', phone: '', team: ''
};

const REQUIRED_STEPS = [1, 2, 4, 5];
const REQUIRED_FIELDS = { 1: 'sleeve', 2: 'collar', 4: 'material', 5: 'branding' };

function getStepNames() {
  return [
    t('step-product'),
    t('step-sleeves'),
    t('step-collar'),
    t('step-colors'),
    t('step-material'),
    t('step-branding'),
    t('step-details')
  ];
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
  if (prog) {
    prog.setAttribute('aria-valuenow', step+1);
    prog.setAttribute('aria-valuemax', TOTAL);
  }

  const backBtn = document.getElementById('btnBack');
  backBtn.disabled = step === 0;

  const nextLabel = document.getElementById('nextLabel');
  const nextBtn = document.getElementById('btnNext');
  const nextIcon = nextBtn ? nextBtn.querySelector('svg') : null;
  if (step === TOTAL - 1) {
    nextLabel.textContent = t('btn-submit') || 'OTRZYMAJ WYCENĘ I PROJEKT';
    if (nextIcon) nextIcon.innerHTML = '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>';
  } else {
    nextLabel.textContent = t('btn-next') || 'DALEJ';
    if (nextIcon) nextIcon.innerHTML = '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>';
  }
  document.getElementById('backLabel').textContent = t('btn-back') || 'WSTECZ';

  const hint = document.getElementById('validationHint');
  if (hint) hint.textContent = '';
}

function optCard(value, label, img, fieldKey, extraLabel) {
  const sel = config[fieldKey] === value;
  return `
    <button class="option-card${sel?' selected':''}"
      onclick="selectOpt('${fieldKey}','${value}')"
      data-field="${fieldKey}" data-value="${value}"
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

function productCard(item, groupKey) {
  const pl = getLang() === 'pl';
  const label = pl ? item.labelPl : item.labelEn;
  const sel = config.products.includes(item.value);
  return `
    <button class="option-card product-card${item.wide ? ' product-card-wide' : ''}${sel?' selected':''}"
      data-product="${item.value}" data-product-group="${groupKey}"
      onclick="toggleProduct('${item.value}')"
      aria-pressed="${sel}"
      aria-label="${escapeHtml(label)}">
      <div class="option-card-img-wrap product-card-visual-wrap">
        <div class="product-visual product-visual-${groupKey}">
          <span class="product-short">${escapeHtml(item.short)}</span>
          <span class="product-line product-line-a"></span>
          <span class="product-line product-line-b"></span>
        </div>
      </div>
      <div class="option-card-label">${escapeHtml(label)}</div>
      <div class="option-check${sel?'':' option-check-empty'}" aria-hidden="true">
        ${sel ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
      </div>
    </button>`;
}

function renderProductGroups() {
  const pl = getLang() === 'pl';
  return PRODUCT_GROUPS.map(group => `
    <div class="product-group product-group-${group.key}">
      <h3 class="product-group-title">${pl ? group.titlePl : group.titleEn}</h3>
      <div class="options-grid product-options-grid${group.key === 'sets' ? ' product-options-grid-set' : ''}">
        ${group.items.map(item => productCard(item, group.key)).join('')}
      </div>
    </div>
  `).join('');
}

function toggleProduct(value) {
  const idx = config.products.indexOf(value);
  if (idx === -1) {
    config.products.push(value);
  } else {
    config.products.splice(idx, 1);
  }

  const grid = document.getElementById('productGroups');
  if (!grid) { renderStep(); return; }

  grid.querySelectorAll('[data-product]').forEach(btn => {
    const isSel = config.products.includes(btn.dataset.product);
    btn.classList.toggle('selected', isSel);
    btn.setAttribute('aria-pressed', isSel ? 'true' : 'false');
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
  document.querySelectorAll('.option-card[data-field="' + field + '"]').forEach(card => {
    const isSel = card.dataset.value === value;
    card.classList.toggle('selected', isSel);
    card.setAttribute('aria-pressed', isSel ? 'true' : 'false');
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
  const pl = getLang() === 'pl';

  let html = '';

  switch(step) {
    case 0:
      html = `
        <h2 class="step-title">${pl?'Typ produktu':'Product type'}</h2>
        <p class="step-sub">${pl?'Wybierz jeden lub kilka elementów z pełnej oferty dla klubu.':'Choose one or multiple items from the full club offer.'}</p>
        <div id="productGroups" class="product-groups">
          ${renderProductGroups()}
        </div>`;
      break;

    case 1:
      html = `
        <h2 class="step-title">${pl?'Rękawy':'Sleeves'}</h2>
        <p class="step-sub">${pl?'Wybierz typ rękawa':'Select sleeve type'}</p>
        <div class="options-grid options-grid-sleeve">
          ${optCard('raglan', 'Raglan', IMGS.raglan, 'sleeve')}
          ${optCard('setin', pl?'Wszywany':'Set-in', IMGS.setin, 'sleeve')}
        </div>`;
      break;

    case 2:
      html = `
        <h2 class="step-title">${pl?'Kołnierz':'Collar'}</h2>
        <p class="step-sub">${pl?'Wybierz typ kołnierza':'Select collar type'}</p>
        <div class="options-grid options-grid-collar">
          ${optCard('crewneck',      pl?'Okrągły':'Crewneck',               IMGS.round, 'collar')}
          ${optCard('vneck',         'V-Neck',                               IMGS.vneck, 'collar')}
          ${optCard('vneck-overlap', pl?'V-Neck zakładkowy':'Overlap V-Neck', IMGS.vneck, 'collar')}
          ${optCard('polo',          'Polo',                                 IMGS.polo,  'collar', pl?'+ dopłata':'+ extra')}
          ${optCard('vneck-polo',    'V-Neck Polo',                          IMGS.polo,  'collar', pl?'+ dopłata':'+ extra')}
        </div>`;
      break;

    case 3:
      html = `
        <h2 class="step-title">${pl?'Kolory':'Colors'}</h2>
        <p class="step-sub">${pl?'Wybierz kolory swojego stroju lub wyposażenia':'Choose colors for your kit or equipment'}</p>
        <div class="color-section">
          <div class="color-section-label">${pl?'Kolor główny':'Primary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.primaryColor===c?' selected':''}"
                style="background:${c}" onclick="selectColor('primaryColor','${c}')"
                data-color-field="primaryColor" data-color-value="${c}"
                aria-label="${c}" aria-pressed="${config.primaryColor===c}">
                ${config.primaryColor===c ? colorCheckSvg(c) : ''}
              </button>`).join('')}
            <label class="custom-color-picker" aria-label="${pl?'Wybierz własny kolor główny':'Choose custom primary color'}">
              <span class="custom-color-dot" data-custom-color-dot="primaryColor" style="background:${config.primaryColor}"></span>
              <span class="custom-color-text">${pl?'Własny':'Custom'}</span>
              <span class="custom-color-value" data-custom-color-value="primaryColor">${config.primaryColor}</span>
              <input type="color" class="color-input" value="${config.primaryColor}"
                oninput="selectColor('primaryColor', this.value)"
                aria-label="${pl?'Własny kolor główny':'Custom primary color'}" />
            </label>
          </div>
        </div>
        <div class="color-section">
          <div class="color-section-label">${pl?'Kolor dodatkowy':'Secondary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.secondaryColor===c?' selected':''}"
                style="background:${c}" onclick="selectColor('secondaryColor','${c}')"
                data-color-field="secondaryColor" data-color-value="${c}"
                aria-label="${c}" aria-pressed="${config.secondaryColor===c}">
                ${config.secondaryColor===c ? colorCheckSvg(c) : ''}
              </button>`).join('')}
            <label class="custom-color-picker" aria-label="${pl?'Wybierz własny kolor dodatkowy':'Choose custom secondary color'}">
              <span class="custom-color-dot" data-custom-color-dot="secondaryColor" style="background:${config.secondaryColor}"></span>
              <span class="custom-color-text">${pl?'Własny':'Custom'}</span>
              <span class="custom-color-value" data-custom-color-value="secondaryColor">${config.secondaryColor}</span>
              <input type="color" class="color-input" value="${config.secondaryColor}"
                oninput="selectColor('secondaryColor', this.value)"
                aria-label="${pl?'Własny kolor dodatkowy':'Custom secondary color'}" />
            </label>
          </div>
        </div>
        <div class="color-preview" aria-label="${pl?'Podgląd kolorów':'Color preview'}">
          <div class="color-preview-box" data-color-preview="primaryColor" style="background:${config.primaryColor}"></div>
          <span class="color-preview-plus" aria-hidden="true">+</span>
          <div class="color-preview-box" data-color-preview="secondaryColor" style="background:${config.secondaryColor}"></div>
        </div>`;
      break;

    case 4:
      html = `
        <h2 class="step-title">${pl?'Materiał':'Material'}</h2>
        <p class="step-sub">${pl?'Wybierz rodzaj materiału':'Select fabric type'}</p>
        <div class="options-grid options-grid-material">
          ${optCard('standard', pl?'Standardowy':'Standard', IMGS.polyester, 'material')}
          ${optCard('rib', pl?'Ściągacz (Rib)':'Rib Knit', IMGS.mesh, 'material')}
        </div>
        <div class="material-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          ${pl ? 'Ściągacz stosowany jest szczególnie na rękawach i kołnierzach polo.' : 'Rib knit is especially used on sleeves and polo collars.'}
        </div>`;
      break;

    case 5:
      html = `
        <h2 class="step-title">${pl?'Zdobienia i wykończenie':'Decorations and finish'}</h2>
        <p class="step-sub">${pl?'Wybierz sposób wykonania logotypów, numerów i sponsorów. Każda opcja wpływa na cenę.':'Choose how logos, numbers and sponsors are made. Each option affects the price.'}</p>
        <div class="options-grid options-grid-branding">
          ${optCard('sublimation', pl?'Sublimacja':'Sublimation',  IMGS.sublimation, 'branding', pl?'(w cenie)':'(included)')}
          ${optCard('embroidery',  pl?'Haft':'Embroidery',          IMGS.embroidery,  'branding', pl?'(+ dopłata)':'(+ extra)')}
          ${optCard('silicone',    pl?'Silikon':'Silicone Print',   IMGS.flex,        'branding', pl?'(+ dopłata)':'(+ extra)')}
          ${optCard('heatpress',   pl?'Heat press':'Heat press',     IMGS.flex,        'branding', pl?'(+ dopłata)':'(+ extra)')}
        </div>
        <div class="pricing-table-wrap" aria-label="${pl?'Przykładowa tabela cennika zdobień':'Sample decoration price table'}">
          <div class="pricing-table-head">
            <span>${pl?'Przykładowy cennik':'Sample pricing'}</span>
            <strong>${pl?'do uzupełnienia finalnie':'final values TBD'}</strong>
          </div>
          <div class="pricing-table">
            ${[
              [pl?'Sublimacja':'Sublimation', pl?'w cenie':'included', pl?'pełny nadruk w materiale':'full print in fabric'],
              [pl?'Haft':'Embroidery', pl?'+ 12-20 zł / element':'+ 12-20 PLN / element', pl?'herb, małe logo, inicjały':'crest, small logo, initials'],
              [pl?'Silikon':'Silicone', pl?'+ 10-18 zł / element':'+ 10-18 PLN / element', pl?'logo premium, detale 3D':'premium logo, 3D details'],
              [pl?'Heat press':'Heat press', pl?'+ 6-14 zł / element':'+ 6-14 PLN / element', pl?'numery, nazwiska, sponsorzy':'numbers, names, sponsors']
            ].map(([name, price, usage]) => `
              <div class="pricing-row">
                <span class="pricing-name">${name}</span>
                <span class="pricing-price">${price}</span>
                <span class="pricing-usage">${usage}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
      break;

    case 6:
      html = `
        <h2 class="step-title">${pl?'Wycena i projekt':'Quote and design'}</h2>
        <p class="step-sub">${pl?'Na podstawie konfiguracji przygotujemy indywidualną wycenę i projekt.':'Based on the configuration, we will prepare an individual quote and design.'}</p>
        <div class="quote-step-grid">
          <div class="quote-form-panel">
            <div class="form-group">
              <label class="form-label" for="con-name-c">${pl?'Imię i nazwisko':'Full name'} *</label>
              <input class="form-input" type="text" id="con-name-c" value="${escapeHtml(config.name)}" oninput="config.name=this.value" autocomplete="name" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="con-email-c">${pl?'Adres e-mail':'Email address'} *</label>
              <input class="form-input" type="email" id="con-email-c" value="${escapeHtml(config.email)}" oninput="config.email=this.value" autocomplete="email" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="con-phone-c">${pl?'Telefon':'Phone'}</label>
              <input class="form-input" type="tel" id="con-phone-c" value="${escapeHtml(config.phone)}" oninput="config.phone=this.value" autocomplete="tel" />
            </div>
            <div class="form-group">
              <label class="form-label" for="con-team-c">${pl?'Nazwa drużyny / klubu':'Team / club name'}</label>
              <input class="form-input" type="text" id="con-team-c" value="${escapeHtml(config.team)}" oninput="config.team=this.value" />
            </div>
            <div class="form-group">
              <label class="form-label" for="det-qty">${pl?'Ilość orientacyjna':'Estimated quantity'}</label>
              <input class="form-input" type="number" id="det-qty" min="1" value="${escapeHtml(config.quantity)}" oninput="config.quantity=this.value" placeholder="${pl?'np. 20':'e.g. 20'}" />
            </div>
            <div class="form-group">
              <label class="form-label" for="det-notes">${pl?'Uwagi do projektu':'Design notes'}</label>
              <textarea class="form-textarea" id="det-notes" oninput="config.notes=this.value" placeholder="${pl?'Opisz kolory, herb, sponsorów, termin lub inne potrzeby klubu.':'Describe colors, crest, sponsors, deadline or other club needs.'}">${escapeHtml(config.notes)}</textarea>
            </div>
          </div>
          <div class="config-summary quote-summary">
            <h3 class="config-summary-title">${pl?'Podsumowanie konfiguracji':'Configuration summary'}</h3>
            <div class="config-summary-grid">
              ${summaryRows().map(([k,v]) => `
                <div class="config-summary-row">
                  <span class="config-summary-key">${escapeHtml(k)}</span>
                  <span class="config-summary-val">${escapeHtml(v)}</span>
                </div>`).join('')}
            </div>
          </div>
        </div>`;
      break;
  }

  el.innerHTML = html;
  if (typeof revealConfigStep === 'function') revealConfigStep(el);
}

function summaryRows() {
  const pl = getLang() === 'pl';
  const products = config.products.map(product => configLabel('products', product)).join(', ');
  return [
    [pl?'Produkty':'Products', products],
    [pl?'Rękawy':'Sleeves', configLabel('sleeve', config.sleeve)],
    [pl?'Kołnierz':'Collar', configLabel('collar', config.collar)],
    [pl?'Kolory':'Colors', `${config.primaryColor} / ${config.secondaryColor}`],
    [pl?'Materiał':'Material', configLabel('material', config.material)],
    [pl?'Zdobienia':'Decoration', configLabel('branding', config.branding)],
    [pl?'Ilość':'Quantity', config.quantity]
  ].filter(([,v]) => v && v !== '—');
}

function isDark(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (0.299*r + 0.587*g + 0.114*b) < 128;
}

function normalizeHex(hex) {
  const value = String(hex || '').trim();
  return /^#[0-9A-Fa-f]{6}$/.test(value) ? value.toUpperCase() : '#000000';
}

function colorCheckSvg(hex) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${isDark(hex)?'#fff':'#000'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
}

function selectColor(field, value) {
  if (!['primaryColor', 'secondaryColor'].includes(field)) return;
  config[field] = normalizeHex(value);
  updateColorUi(field);
}

function updateColorUi(field) {
  const value = config[field];

  document.querySelectorAll(`.color-swatch[data-color-field="${field}"]`).forEach(btn => {
    const isSelected = btn.dataset.colorValue.toUpperCase() === value;
    btn.classList.toggle('selected', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    btn.innerHTML = isSelected ? colorCheckSvg(value) : '';
  });

  document.querySelectorAll(`.color-input`).forEach(input => {
    if (input.closest('.custom-color-picker')?.querySelector(`[data-custom-color-dot="${field}"]`)) {
      input.value = value;
    }
  });

  const customDot = document.querySelector(`[data-custom-color-dot="${field}"]`);
  if (customDot) customDot.style.background = value;

  const customValue = document.querySelector(`[data-custom-color-value="${field}"]`);
  if (customValue) customValue.textContent = value;

  const preview = document.querySelector(`[data-color-preview="${field}"]`);
  if (preview) preview.style.background = value;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function configLabel(group, value) {
  const pl = getLang() === 'pl';
  const productLabels = PRODUCT_GROUPS.flatMap(group => group.items).reduce((acc, item) => {
    acc[item.value] = pl ? item.labelPl : item.labelEn;
    return acc;
  }, {});
  const labels = {
    products: productLabels,
    sleeve: {
      raglan: 'Raglan',
      setin: pl ? 'Wszywany' : 'Set-in'
    },
    collar: {
      crewneck: pl ? 'Okrągły' : 'Crewneck',
      vneck: 'V-Neck',
      'vneck-overlap': pl ? 'V-Neck zakładkowy' : 'Overlap V-Neck',
      polo: 'Polo',
      'vneck-polo': 'V-Neck Polo'
    },
    material: {
      standard: pl ? 'Standardowy' : 'Standard',
      rib: pl ? 'Ściągacz (Rib)' : 'Rib Knit'
    },
    branding: {
      sublimation: pl ? 'Sublimacja (w cenie)' : 'Sublimation (included)',
      heatpress: pl ? 'Heat press (+ dopłata)' : 'Heat press (+ extra)',
      silicone: pl ? 'Silikon (+ dopłata)' : 'Silicone print (+ extra)',
      embroidery: pl ? 'Haft (+ dopłata)' : 'Embroidery (+ extra)'
    }
  };
  return labels[group]?.[value] || value || '—';
}

function showConfigSuccess(submission) {
  const overlay = document.getElementById('configSuccessOverlay');
  if (!overlay) {
    setTimeout(() => { window.location.href = 'index.html'; }, 2500);
    return;
  }

  const pl = getLang() === 'pl';
  const rows = [
    [pl ? 'Produkty' : 'Products', submission.products],
    [pl ? 'Rękawy' : 'Sleeves', configLabel('sleeve', submission.sleeve)],
    [pl ? 'Kołnierz' : 'Collar', configLabel('collar', submission.collar)],
    [pl ? 'Materiał' : 'Material', configLabel('material', submission.material)],
    [pl ? 'Zdobienia' : 'Decoration', configLabel('branding', submission.branding)],
    [pl ? 'Kolory' : 'Colors', `${submission.primaryColor} / ${submission.secondaryColor}`],
    [pl ? 'Ilość' : 'Quantity', submission.quantity],
    [pl ? 'Kontakt' : 'Contact', `${submission.name} · ${submission.email}`]
  ].filter(([, value]) => value);

  overlay.innerHTML = `
    <div class="config-success-panel">
      <div class="success-visual">
        <div class="success-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p class="success-kicker">${pl ? 'Konfiguracja przyjęta' : 'Configuration received'}</p>
        <h2 class="success-title">${pl ? 'Przygotujemy wycenę i projekt' : 'We will prepare a quote and design'}</h2>
        <p class="success-copy">${pl ? 'Dziękujemy. Przejrzymy konfigurację, dopytamy o potrzebne szczegóły i odezwiemy się z kolejnym krokiem.' : 'Thank you. We will review the configuration, ask for any needed details and get back to you with the next step.'}</p>
        <a class="success-home-link" href="index.html">${pl ? 'Wróć teraz' : 'Back now'}</a>
      </div>
      <div class="success-summary">
        <h3 class="success-summary-title">${pl ? 'Podsumowanie konfiguracji' : 'Configuration summary'}</h3>
        <div class="success-summary-list">
          ${rows.map(([key, value]) => `
            <div class="success-summary-row">
              <span class="success-summary-key">${escapeHtml(key)}</span>
              <span class="success-summary-val">${escapeHtml(value)}</span>
            </div>
          `).join('')}
        </div>
        <p class="success-redirect">${pl ? 'Za chwilę wrócisz na stronę główną.' : 'You will return to the homepage shortly.'}</p>
        <div class="success-progress" aria-hidden="true"><span></span></div>
      </div>
    </div>
  `;

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('show'));

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 6200);
}

function configBack() {
  if (step > 0) { step--; renderStep(); window.scrollTo(0,0); }
}

async function configNext() {
  if (step === 0 && config.products.length === 0) {
    const hint = document.getElementById('validationHint');
    if (hint) hint.textContent = t('select-required');
    const btn = document.getElementById('btnNext');
    btn.classList.add('btn-shake');
    setTimeout(() => btn.classList.remove('btn-shake'), 500);
    return;
  }

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

    const productLabels = config.products.map(product => configLabel('products', product)).join(', ');
    const sub = {
      products: productLabels,
      productKeys: config.products.join(', '),
      sleeve: config.sleeve,
      collar: config.collar,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      material: config.material,
      branding: config.branding,
      quantity: config.quantity,
      sizes: config.sizes,
      deadline: config.deadline,
      notes: config.notes,
      name: config.name,
      email: config.email,
      phone: config.phone,
      team: config.team,
      id: Date.now(), status: 'new', created_at: new Date().toISOString()
    };

    const saved = await saveToFirebase('submissions', sub);
    if (!saved) {
      btn.disabled = false;
      btn.classList.remove('btn-loading');
      showToast(getLang()==='pl' ? 'Nie udało się wysłać konfiguracji. Spróbuj ponownie za chwilę.' : 'Could not submit the configuration. Please try again in a moment.', true);
      return;
    }

    btn.disabled = false;
    btn.classList.remove('btn-loading');
    showConfigSuccess(sub);
    return;
  }

  step++;
  renderStep();
  window.scrollTo(0,0);
}

window.renderStep = renderStep;
document.addEventListener('DOMContentLoaded', () => { renderStep(); });
