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

const COLOR_PRESETS = [
  '#0f3d2e','#000000','#ffffff','#1a237e','#b71c1c','#f9a825','#1565c0','#e65100','#4a148c','#00695c'
];

let step = 0;
const TOTAL = 10;
let config = {
  product:'', sleeve:'', fit:'', collar:'',
  primaryColor:'#0f3d2e', secondaryColor:'#ffffff',
  material:'', branding:'', files:[],
  quantity:'', sizes:'', deadline:'', notes:'',
  name:'', email:'', phone:'', team:''
};

const stepKeys = ['product','sleeve','fit','collar','colors','material','branding','upload','details','contact'];

function getStepNames() {
  return [t('step-product')||'Produkt', t('step-sleeves')||'Rękawy', t('step-fit')||'Krój',
          t('step-collar')||'Kołnierz', t('step-colors')||'Kolory', t('step-material')||'Materiał',
          t('step-branding')||'Branding', t('step-upload')||'Pliki',
          t('step-details')||'Szczegóły', t('step-contact')||'Kontakt'];
}

function updateProgress() {
  const pct = ((step + 1) / TOTAL * 100).toFixed(0);
  document.getElementById('progressFill').style.width = pct + '%';
  const names = getStepNames();
  document.getElementById('stepLabel').textContent = (t('step-label')||'Krok') + ' ' + (step+1) + ' / ' + TOTAL;
  document.getElementById('stepName').textContent = names[step];
  const backBtn = document.getElementById('btnBack');
  backBtn.disabled = step === 0;
  const nextBtn = document.getElementById('btnNext');
  const nextLabel = document.getElementById('nextLabel');
  const nextIcon = nextBtn.querySelector('svg');
  if (step === TOTAL - 1) {
    nextLabel.textContent = t('btn-submit') || 'WYŚLIJ ZAMÓWIENIE';
    if (nextIcon) nextIcon.innerHTML = '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>';
  } else {
    nextLabel.textContent = t('btn-next') || 'DALEJ';
    if (nextIcon) nextIcon.innerHTML = '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>';
  }
  document.getElementById('backLabel').textContent = t('btn-back') || 'WSTECZ';
}

function optCard(value, label, img, fieldKey) {
  const sel = config[fieldKey] === value;
  return `<button class="option-card${sel?' selected':''}" onclick="selectOpt('${fieldKey}','${value}',this)">
    <img src="${img}" alt="${label}" loading="lazy" />
    <div class="option-card-label">${label}</div>
    ${sel ? `<div class="option-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>` : ''}
  </button>`;
}

function selectOpt(field, value, el) {
  config[field] = value;
  renderStep();
}

function renderStep() {
  const el = document.getElementById('configContent');
  if (!el) return;
  updateProgress();
  const lang = getLang();

  switch(step) {
    case 0: // Product
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Typ Produktu':'Product Type'}</h2>
        <p class="step-sub">Jersey / Shorts / Socks</p>
        <div class="options-grid">
          ${optCard('jersey', lang==='pl'?'Koszulka':'Jersey', IMGS.jersey, 'product')}
          ${optCard('shorts', lang==='pl'?'Spodenki':'Shorts', IMGS.shorts, 'product')}
          ${optCard('socks', lang==='pl'?'Skarpety':'Socks', IMGS.socks, 'product')}
        </div>`;
      break;
    case 1: // Sleeves
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Rękawy':'Sleeves'}</h2>
        <p class="step-sub">Raglan / ${lang==='pl'?'Wszywany':'Set-in'}</p>
        <div class="options-grid options-grid-2">
          ${optCard('raglan', 'Raglan', IMGS.raglan, 'sleeve')}
          ${optCard('setin', lang==='pl'?'Wszywany':'Set-in', IMGS.setin, 'sleeve')}
        </div>`;
      break;
    case 2: // Fit
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Krój':'Fit'}</h2>
        <p class="step-sub">Slim Fit / Regular Fit</p>
        <div class="options-grid options-grid-2">
          ${optCard('slim', 'Slim Fit', IMGS.slim, 'fit')}
          ${optCard('regular', 'Regular Fit', IMGS.regular, 'fit')}
        </div>`;
      break;
    case 3: // Collar
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Kołnierz':'Collar'}</h2>
        <p class="step-sub">V-Neck / ${lang==='pl'?'Okrągły':'Round'} / Polo</p>
        <div class="options-grid">
          ${optCard('vneck', 'V-Neck', IMGS.vneck, 'collar')}
          ${optCard('round', lang==='pl'?'Okrągły':'Round', IMGS.round, 'collar')}
          ${optCard('polo', 'Polo', IMGS.polo, 'collar')}
        </div>`;
      break;
    case 4: // Colors
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Kolory':'Colors'}</h2>
        <p class="step-sub">${lang==='pl'?'Szybki wybór':'Quick pick'}</p>
        <div class="color-section">
          <div class="color-section-label">${lang==='pl'?'Kolor główny':'Primary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.primaryColor===c?' selected':''}"
                style="background:${c}" onclick="config.primaryColor='${c}';renderStep()" title="${c}">
                ${config.primaryColor===c ? `<svg viewBox="0 0 24 24" fill="none" stroke="${isDark(c)?'#fff':'#000'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </button>`).join('')}
            <input type="color" class="color-input" value="${config.primaryColor}" onchange="config.primaryColor=this.value;renderStep()" />
          </div>
        </div>
        <div class="color-section">
          <div class="color-section-label">${lang==='pl'?'Kolor dodatkowy':'Secondary color'}</div>
          <div class="color-swatches">
            ${COLOR_PRESETS.map(c => `
              <button class="color-swatch${config.secondaryColor===c?' selected':''}"
                style="background:${c}" onclick="config.secondaryColor='${c}';renderStep()" title="${c}">
                ${config.secondaryColor===c ? `<svg viewBox="0 0 24 24" fill="none" stroke="${isDark(c)?'#fff':'#000'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </button>`).join('')}
            <input type="color" class="color-input" value="${config.secondaryColor}" onchange="config.secondaryColor=this.value;renderStep()" />
          </div>
        </div>
        <div class="color-preview">
          <div class="color-preview-box" style="background:${config.primaryColor}"></div>
          <span class="color-preview-plus">+</span>
          <div class="color-preview-box" style="background:${config.secondaryColor}"></div>
        </div>`;
      break;
    case 5: // Material
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Materiał':'Material'}</h2>
        <p class="step-sub">${lang==='pl'?'Poliester / Mesh / Bawełna':'Polyester / Mesh / Cotton'}</p>
        <div class="options-grid">
          ${optCard('polyester', lang==='pl'?'Poliester':'Polyester', IMGS.polyester, 'material')}
          ${optCard('mesh', 'Mesh', IMGS.mesh, 'material')}
          ${optCard('cotton', lang==='pl'?'Bawełna':'Cotton', IMGS.cotton, 'material')}
        </div>`;
      break;
    case 6: // Branding
      el.innerHTML = `
        <h2 class="step-title">Branding</h2>
        <p class="step-sub">${lang==='pl'?'Sublimacja / Haft / Flex':'Sublimation / Embroidery / Flex'}</p>
        <div class="options-grid">
          ${optCard('sublimation', lang==='pl'?'Sublimacja':'Sublimation', IMGS.sublimation, 'branding')}
          ${optCard('embroidery', lang==='pl'?'Haft':'Embroidery', IMGS.embroidery, 'branding')}
          ${optCard('flex', 'Flex', IMGS.flex, 'branding')}
        </div>`;
      break;
    case 7: // Upload
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Prześlij pliki':'Upload files'}</h2>
        <p class="step-sub">${lang==='pl'?'Dodaj logo, grafiki lub wytyczne (PNG, JPG, PDF, AI).':'Add logos, graphics or guidelines (PNG, JPG, PDF, AI).'}</p>
        <div class="upload-zone" onclick="document.getElementById('fileInput').click()">
          <p>${lang==='pl'?'Kliknij aby wybrać pliki':'Click to select files'}</p>
          <button type="button" class="btn-primary" style="margin:0 auto">
            ${lang==='pl'?'Wybierz pliki':'Choose files'}
          </button>
        </div>
        <input type="file" id="fileInput" multiple style="display:none" onchange="addFiles(this)" />
        <ul class="file-list">
          ${config.files.map((f,i) => `<li>${f}<button class="file-remove" onclick="removeFile(${i})">✕</button></li>`).join('')}
        </ul>`;
      break;
    case 8: // Details
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Szczegóły':'Details'}</h2>
        <p class="step-sub">${lang==='pl'?'Ilość, rozmiary, termin':'Quantity, sizes, deadline'}</p>
        <div style="max-width:520px">
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Ilość (szt.)':'Quantity (pcs)'}</label>
            <input class="form-input" type="number" min="1" value="${config.quantity}" oninput="config.quantity=this.value" placeholder="np. 20" />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Rozmiary':'Sizes'}</label>
            <input class="form-input" type="text" value="${config.sizes}" oninput="config.sizes=this.value" placeholder="S×2, M×5, L×10, XL×3" />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Termin realizacji':'Deadline'}</label>
            <input class="form-input" type="date" value="${config.deadline}" oninput="config.deadline=this.value" />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Dodatkowe uwagi':'Additional notes'}</label>
            <textarea class="form-textarea" oninput="config.notes=this.value">${config.notes}</textarea>
          </div>
        </div>`;
      break;
    case 9: // Contact
      el.innerHTML = `
        <h2 class="step-title">${lang==='pl'?'Kontakt':'Contact'}</h2>
        <p class="step-sub">${lang==='pl'?'Twoje dane kontaktowe':'Your contact details'}</p>
        <div style="max-width:520px">
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Imię i nazwisko':'Full name'}</label>
            <input class="form-input" type="text" value="${config.name}" oninput="config.name=this.value" required />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Adres e-mail':'Email address'}</label>
            <input class="form-input" type="email" value="${config.email}" oninput="config.email=this.value" required />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Telefon':'Phone'}</label>
            <input class="form-input" type="tel" value="${config.phone}" oninput="config.phone=this.value" />
          </div>
          <div class="form-group">
            <label class="form-label">${lang==='pl'?'Nazwa drużyny / organizacji':'Team / Organization name'}</label>
            <input class="form-input" type="text" value="${config.team}" oninput="config.team=this.value" />
          </div>
        </div>`;
      break;
  }
}

function isDark(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (0.299*r + 0.587*g + 0.114*b) < 128;
}

function addFiles(input) {
  Array.from(input.files).forEach(f => config.files.push(f.name));
  renderStep();
}

function removeFile(i) {
  config.files.splice(i, 1);
  renderStep();
}

function configBack() {
  if (step > 0) { step--; renderStep(); window.scrollTo(0,0); }
}

function configNext() {
  if (step === TOTAL - 1) {
    if (!config.name || !config.email) {
      showToast(getLang()==='pl' ? 'Podaj imię i email.' : 'Please fill in name and email.', true);
      return;
    }
    const sub = {...config, id: Date.now(), status: 'new', created_at: new Date().toISOString()};
    const subs = JSON.parse(localStorage.getItem('nox_submissions') || '[]');
    subs.unshift(sub);
    localStorage.setItem('nox_submissions', JSON.stringify(subs));
    showToast(t('success-order'));
    setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    return;
  }
  step++;
  renderStep();
  window.scrollTo(0,0);
}

// Override applyLang to also re-render step
const _origApplyLang = window.applyLang;
window.applyLang = function() { if (_origApplyLang) _origApplyLang(); renderStep(); };

document.addEventListener('DOMContentLoaded', () => { renderStep(); });
