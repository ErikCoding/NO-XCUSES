// ============ LANGUAGE ============
const TRANSLATIONS = {
  pl: {
    'nav-home': 'Strona Główna', 'nav-config': 'Konfigurator', 'nav-portfolio': 'Portfolio',
    'nav-ambassador': 'Ambasador', 'nav-contact': 'Kontakt',
    'hero-title': 'ZWYCIĘSTWO NIE ZNA WYMÓWEK', 'hero-sub': 'Zaprojektuj własną odzież sportową najwyższej klasy.',
    'cta-start': 'ROZPOCZNIJ PROJEKT', 'how-title': 'JAK TO DZIAŁA',
    'how1-title': '01 — WYBIERZ', 'how1-desc': 'Wybierz typ produktu, krój i materiał w naszym konfiguratorze.',
    'how2-title': '02 — ZAPROJEKTUJ', 'how2-desc': 'Dodaj kolory, logo i branding — zrobimy resztę.',
    'how3-title': '03 — ZAMÓW', 'how3-desc': 'Złóż zamówienie — dostarczymy je prosto do Ciebie.',
    'gallery-title': 'NASZE REALIZACJE', 'footer-rights': 'Wszelkie prawa zastrzeżone.',
    'port-title': 'PORTFOLIO', 'port-sub': 'Nasze najlepsze realizacje dla klubów i drużyn sportowych.',
    'amb-title': 'ZOSTAŃ AMBASADOREM', 'amb-sub': 'Dołącz do programu ambasadorów NOXCUSES i zdobądź ekskluzywne korzyści.',
    'ben1-title': 'Zniżki', 'ben1-desc': 'Ekskluzywne ceny na wszystkie produkty NOXCUSES.',
    'ben2-title': 'Ekspozycja', 'ben2-desc': 'Prezentujemy naszych ambasadorów w social media.',
    'ben3-title': 'Pierwsze Wersje', 'ben3-desc': 'Dostęp do nowych kolekcji przed premierą.',
    'l-amb-name': 'Imię i nazwisko', 'l-amb-email': 'E-mail', 'l-amb-social': 'Link do Social Media',
    'l-amb-team': 'Drużyna / Klub', 'l-amb-msg': 'Wiadomość', 'amb-submit': 'APLIKUJ',
    'amb-success-title': 'Aplikacja wysłana!', 'amb-success-msg': 'Dziękujemy za aplikację! Odezwiemy się wkrótce.',
    'con-title': 'KONTAKT', 'con-sub': 'Masz pytania? Napisz do nas.',
    'l-con-name': 'Imię i nazwisko', 'l-con-email': 'E-mail', 'l-con-subject': 'Temat',
    'l-con-msg': 'Wiadomość', 'con-submit': 'WYŚLIJ', 'con-info-title': 'DANE KONTAKTOWE',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Telefon',
    'con-success-title': 'Wiadomość wysłana!', 'con-success-msg': 'Odpowiemy najszybciej jak to możliwe.',
    'success-ambassador': 'Dziękujemy za aplikację! Odezwiemy się wkrótce.',
    'success-contact': 'Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe.',
    'success-order': 'Zamówienie zostało wysłane! Skontaktujemy się wkrótce.',
    'btn-next': 'DALEJ', 'btn-back': 'WSTECZ', 'btn-submit': 'WYŚLIJ ZAMÓWIENIE',
    'step-label': 'Krok', 'gallery-more': 'Portfolio →',
    'admin-subtitle': 'Panel Administracyjny', 'admin-user': 'Nazwa użytkownika',
    'admin-pass': 'Hasło', 'admin-submit': 'ZALOGUJ', 'admin-logout': 'Wyloguj',
    'tab-orders': 'Zamówienia', 'tab-ambassadors': 'Ambasadorzy', 'tab-contacts': 'Wiadomości',
    'status-new': 'Nowe', 'status-read': 'Przeczytane',
    'btn-mark-read': 'Oznacz jako przeczytane', 'btn-delete': 'Usuń', 'no-data': 'Brak danych.',
    'login-error': 'Nieprawidłowe dane logowania.',
    'field-required': 'To pole jest wymagane.',
    'field-email': 'Podaj prawidłowy adres e-mail.',
    'select-required': 'Wybierz opcję aby przejść dalej.',
    // Configurator steps
    'step-product': 'Produkt', 'step-sleeves': 'Rękawy', 'step-fit': 'Krój',
    'step-collar': 'Kołnierz', 'step-colors': 'Kolory', 'step-material': 'Materiał',
    'step-branding': 'Branding', 'step-upload': 'Pliki',
    'step-details': 'Szczegóły', 'step-contact': 'Kontakt',
  },
  en: {
    'nav-home': 'Home', 'nav-config': 'Configurator', 'nav-portfolio': 'Portfolio',
    'nav-ambassador': 'Ambassador', 'nav-contact': 'Contact',
    'hero-title': 'WINNING HAS NO EXCUSES', 'hero-sub': 'Design your premium custom sportswear.',
    'cta-start': 'START DESIGNING', 'how-title': 'HOW IT WORKS',
    'how1-title': '01 — CHOOSE', 'how1-desc': 'Select product type, cut and material in our configurator.',
    'how2-title': '02 — DESIGN', 'how2-desc': "Add colors, logos and branding — we'll do the rest.",
    'how3-title': '03 — ORDER', 'how3-desc': "Place your order — we'll deliver it straight to you.",
    'gallery-title': 'OUR WORK', 'footer-rights': 'All rights reserved.',
    'port-title': 'PORTFOLIO', 'port-sub': 'Our best projects for clubs and sports teams.',
    'amb-title': 'BECOME AN AMBASSADOR', 'amb-sub': 'Join the NOXCUSES ambassador program and gain exclusive benefits.',
    'ben1-title': 'Discounts', 'ben1-desc': 'Exclusive pricing on all NOXCUSES products.',
    'ben2-title': 'Exposure', 'ben2-desc': 'We feature our ambassadors on social media.',
    'ben3-title': 'Early Access', 'ben3-desc': 'Access new collections before public release.',
    'l-amb-name': 'Full name', 'l-amb-email': 'Email', 'l-amb-social': 'Social Media link',
    'l-amb-team': 'Team / Club', 'l-amb-msg': 'Message', 'amb-submit': 'APPLY',
    'amb-success-title': 'Application sent!', 'amb-success-msg': "Thank you for applying! We'll get back to you soon.",
    'con-title': 'CONTACT', 'con-sub': 'Have questions? Write to us.',
    'l-con-name': 'Full name', 'l-con-email': 'Email', 'l-con-subject': 'Subject',
    'l-con-msg': 'Message', 'con-submit': 'SEND', 'con-info-title': 'CONTACT INFO',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Phone',
    'con-success-title': 'Message sent!', 'con-success-msg': "We'll reply as soon as possible.",
    'success-ambassador': "Thank you for applying! We'll get back to you soon.",
    'success-contact': "Message sent! We'll reply as soon as possible.",
    'success-order': "Order submitted! We'll contact you soon.",
    'btn-next': 'NEXT', 'btn-back': 'BACK', 'btn-submit': 'SUBMIT ORDER',
    'step-label': 'Step', 'gallery-more': 'Portfolio →',
    'admin-subtitle': 'Admin Panel', 'admin-user': 'Username',
    'admin-pass': 'Password', 'admin-submit': 'LOGIN', 'admin-logout': 'Logout',
    'tab-orders': 'Orders', 'tab-ambassadors': 'Ambassadors', 'tab-contacts': 'Messages',
    'status-new': 'New', 'status-read': 'Read',
    'btn-mark-read': 'Mark as read', 'btn-delete': 'Delete', 'no-data': 'No data.',
    'login-error': 'Invalid credentials.',
    'field-required': 'This field is required.',
    'field-email': 'Please enter a valid email address.',
    'select-required': 'Please select an option to continue.',
    'step-product': 'Product', 'step-sleeves': 'Sleeves', 'step-fit': 'Fit',
    'step-collar': 'Collar', 'step-colors': 'Colors', 'step-material': 'Material',
    'step-branding': 'Branding', 'step-upload': 'Files',
    'step-details': 'Details', 'step-contact': 'Contact',
  }
};

let _lang = localStorage.getItem('nox_lang') || 'pl';

function getLang() { return _lang; }
function t(key) { return (TRANSLATIONS[_lang] && TRANSLATIONS[_lang][key]) || (TRANSLATIONS['pl'][key]) || key; }

function toggleLang() {
  _lang = _lang === 'pl' ? 'en' : 'pl';
  localStorage.setItem('nox_lang', _lang);
  applyLang();
}

function applyLang() {
  const langBtns = document.querySelectorAll('#langBtn, #langBtnMobile');
  langBtns.forEach(btn => { if (btn) btn.textContent = _lang === 'pl' ? 'EN' : 'PL'; });

  // data-pl / data-en attributes
  document.querySelectorAll('[data-pl]').forEach(el => {
    el.textContent = _lang === 'pl' ? el.dataset.pl : el.dataset.en;
  });

  // ID-based translations
  const ids = {
    heroTitle: 'hero-title', heroSub: 'hero-sub', heroCta: 'cta-start',
    howTitle: 'how-title', how1Title: 'how1-title', how1Desc: 'how1-desc',
    how2Title: 'how2-title', how2Desc: 'how2-desc', how3Title: 'how3-title', how3Desc: 'how3-desc',
    galleryTitle: 'gallery-title', galleryMore: 'gallery-more', footerRights: 'footer-rights',
    portTitle: 'port-title', portSub: 'port-sub',
    ambTitle: 'amb-title', ambSub: 'amb-sub',
    ambSuccessTitle: 'amb-success-title', ambSuccessMsg: 'amb-success-msg',
    ben1Title: 'ben1-title', ben1Desc: 'ben1-desc',
    ben2Title: 'ben2-title', ben2Desc: 'ben2-desc',
    ben3Title: 'ben3-title', ben3Desc: 'ben3-desc',
    lAmbName: 'l-amb-name', lAmbEmail: 'l-amb-email', lAmbSocial: 'l-amb-social',
    lAmbTeam: 'l-amb-team', lAmbMsg: 'l-amb-msg', ambSubmit: null,
    conTitle: 'con-title', conSub: 'con-sub',
    conSuccessTitle: 'con-success-title', conSuccessMsg: 'con-success-msg',
    lConName: 'l-con-name', lConEmail: 'l-con-email', lConSubject: 'l-con-subject',
    lConMsg: 'l-con-msg', conSubmit: null, conInfoTitle: 'con-info-title',
    lConEmailLabel: 'l-con-email-label', lConPhoneLabel: 'l-con-phone-label',
    adminSubtitle: 'admin-subtitle', lAdminUser: 'admin-user',
    lAdminPass: 'admin-pass', lLogout: 'admin-logout',
    tabOrdersLabel: 'tab-orders', tabAmbassadorsLabel: 'tab-ambassadors', tabContactsLabel: 'tab-contacts',
    backLabel: 'btn-back', nextLabel: null,
    loginError: 'login-error',
  };
  for (const [id, key] of Object.entries(ids)) {
    if (!key) continue;
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  }
  // buttons with .btn-text inside
  const ambBtn = document.getElementById('ambSubmit');
  if (ambBtn) { const span = ambBtn.querySelector('.btn-text'); if(span) span.textContent = t('amb-submit'); }
  const conBtn = document.getElementById('conSubmit');
  if (conBtn) { const span = conBtn.querySelector('.btn-text'); if(span) span.textContent = t('con-submit'); }

  if (typeof renderStep === 'function') renderStep();
  if (typeof renderAdminContent === 'function') { renderAdminStats(); renderAdminContent(); }
}

// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
let _logoClicks = 0, _logoTimer = null;

if (navbar && !navbar.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham = document.getElementById('hamburger');
  const isOpen = menu && menu.classList.toggle('open');
  if (ham) {
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function logoClick() {
  _logoClicks++;
  if (_logoClicks >= 5) { _logoClicks = 0; window.location.href = 'admin.html'; return; }
  clearTimeout(_logoTimer);
  _logoTimer = setTimeout(() => { _logoClicks = 0; }, 3000);
}

// ============ TOAST ============
function showToast(msg, isError) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = 'toast'; }, 4000);
}

// ============ FORM HELPERS ============

// NEW: Validate form — returns true if valid
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const err = document.getElementById('err-' + field.id);
    let msg = '';
    if (!field.value.trim()) {
      msg = t('field-required');
      valid = false;
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      msg = t('field-email');
      valid = false;
    }
    if (err) {
      err.textContent = msg;
      err.style.display = msg ? 'block' : 'none';
    }
    field.classList.toggle('form-input-error', !!msg);
  });
  return valid;
}

// NEW: Loading state for submit buttons
function setLoading(btn, isLoading) {
  if (!btn) return;
  btn.disabled = isLoading;
  btn.classList.toggle('btn-loading', isLoading);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  applyLang();

  // NEW: Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('hamburger');
    if (menu && menu.classList.contains('open') && !menu.contains(e.target) && ham && !ham.contains(e.target)) {
      menu.classList.remove('open');
      if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
    }
  });

  // NEW: Focus visible outline for keyboard users only
  document.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
  document.addEventListener('keydown', () => document.body.classList.remove('using-mouse'));
});
