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
    'con-title': 'KONTAKT', 'con-sub': 'Masz pytania? Napisz do nas.',
    'l-con-name': 'Imię i nazwisko', 'l-con-email': 'E-mail', 'l-con-subject': 'Temat',
    'l-con-msg': 'Wiadomość', 'con-submit': 'WYŚLIJ', 'con-info-title': 'DANE KONTAKTOWE',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Telefon',
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
  },
  en: {
    'nav-home': 'Home', 'nav-config': 'Configurator', 'nav-portfolio': 'Portfolio',
    'nav-ambassador': 'Ambassador', 'nav-contact': 'Contact',
    'hero-title': 'WINNING HAS NO EXCUSES', 'hero-sub': 'Design your premium custom sportswear.',
    'cta-start': 'START DESIGNING', 'how-title': 'HOW IT WORKS',
    'how1-title': '01 — CHOOSE', 'how1-desc': 'Select product type, cut and material in our configurator.',
    'how2-title': '02 — DESIGN', 'how2-desc': 'Add colors, logos and branding — we\'ll do the rest.',
    'how3-title': '03 — ORDER', 'how3-desc': 'Place your order — we\'ll deliver it straight to you.',
    'gallery-title': 'OUR WORK', 'footer-rights': 'All rights reserved.',
    'port-title': 'PORTFOLIO', 'port-sub': 'Our best projects for clubs and sports teams.',
    'amb-title': 'BECOME AN AMBASSADOR', 'amb-sub': 'Join the NOXCUSES ambassador program and gain exclusive benefits.',
    'ben1-title': 'Discounts', 'ben1-desc': 'Exclusive pricing on all NOXCUSES products.',
    'ben2-title': 'Exposure', 'ben2-desc': 'We feature our ambassadors on social media.',
    'ben3-title': 'Early Access', 'ben3-desc': 'Access new collections before public release.',
    'l-amb-name': 'Full name', 'l-amb-email': 'Email', 'l-amb-social': 'Social Media link',
    'l-amb-team': 'Team / Club', 'l-amb-msg': 'Message', 'amb-submit': 'APPLY',
    'con-title': 'CONTACT', 'con-sub': 'Have questions? Write to us.',
    'l-con-name': 'Full name', 'l-con-email': 'Email', 'l-con-subject': 'Subject',
    'l-con-msg': 'Message', 'con-submit': 'SEND', 'con-info-title': 'CONTACT INFO',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Phone',
    'success-ambassador': 'Thank you for applying! We\'ll get back to you soon.',
    'success-contact': 'Message sent! We\'ll reply as soon as possible.',
    'success-order': 'Order submitted! We\'ll contact you soon.',
    'btn-next': 'NEXT', 'btn-back': 'BACK', 'btn-submit': 'SUBMIT ORDER',
    'step-label': 'Step', 'gallery-more': 'Portfolio →',
    'admin-subtitle': 'Admin Panel', 'admin-user': 'Username',
    'admin-pass': 'Password', 'admin-submit': 'LOGIN', 'admin-logout': 'Logout',
    'tab-orders': 'Orders', 'tab-ambassadors': 'Ambassadors', 'tab-contacts': 'Messages',
    'status-new': 'New', 'status-read': 'Read',
    'btn-mark-read': 'Mark as read', 'btn-delete': 'Delete', 'no-data': 'No data.',
    'login-error': 'Invalid credentials.',
  }
};

let _lang = localStorage.getItem('nox_lang') || 'pl';

function getLang() { return _lang; }
function t(key) { return TRANSLATIONS[_lang][key] || TRANSLATIONS['pl'][key] || key; }

function toggleLang() {
  _lang = _lang === 'pl' ? 'en' : 'pl';
  localStorage.setItem('nox_lang', _lang);
  applyLang();
}

function applyLang() {
  const langBtns = document.querySelectorAll('#langBtn, #langBtnMobile');
  langBtns.forEach(btn => { btn.textContent = _lang === 'pl' ? 'EN' : 'PL'; });

  // Data attributes
  document.querySelectorAll('[data-pl]').forEach(el => {
    el.textContent = _lang === 'pl' ? el.dataset.pl : el.dataset.en;
  });

  // IDs
  const ids = {
    heroTitle: 'hero-title', heroSub: 'hero-sub', heroCta: 'cta-start',
    howTitle: 'how-title', how1Title: 'how1-title', how1Desc: 'how1-desc',
    how2Title: 'how2-title', how2Desc: 'how2-desc', how3Title: 'how3-title', how3Desc: 'how3-desc',
    galleryTitle: 'gallery-title', galleryMore: 'gallery-more', footerRights: 'footer-rights',
    portTitle: 'port-title', portSub: 'port-sub',
    ambTitle: 'amb-title', ambSub: 'amb-sub',
    ben1Title: 'ben1-title', ben1Desc: 'ben1-desc',
    ben2Title: 'ben2-title', ben2Desc: 'ben2-desc',
    ben3Title: 'ben3-title', ben3Desc: 'ben3-desc',
    lAmbName: 'l-amb-name', lAmbEmail: 'l-amb-email', lAmbSocial: 'l-amb-social',
    lAmbTeam: 'l-amb-team', lAmbMsg: 'l-amb-msg', ambSubmit: 'amb-submit',
    conTitle: 'con-title', conSub: 'con-sub',
    lConName: 'l-con-name', lConEmail: 'l-con-email', lConSubject: 'l-con-subject',
    lConMsg: 'l-con-msg', conSubmit: 'con-submit', conInfoTitle: 'con-info-title',
    lConEmailLabel: 'l-con-email-label', lConPhoneLabel: 'l-con-phone-label',
    adminSubtitle: 'admin-subtitle', lAdminUser: 'admin-user',
    lAdminPass: 'admin-pass', lAdminSubmit: 'admin-submit', lLogout: 'admin-logout',
    tabOrders: 'tab-orders', tabAmbassadors: 'tab-ambassadors', tabContacts: 'tab-contacts',
    stepLabel: null, backLabel: 'btn-back', nextLabel: 'btn-next',
    loginError: 'login-error',
  };
  for (const [id, key] of Object.entries(ids)) {
    const el = document.getElementById(id);
    if (el && key) el.textContent = t(key);
  }
  if (typeof renderStep === 'function') renderStep();
  if (typeof renderAdminContent === 'function') renderAdminContent();
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
  if (menu) menu.classList.toggle('open');
  if (ham) ham.classList.toggle('open');
}

function logoClick() {
  _logoClicks++;
  if (_logoClicks >= 5) { _logoClicks = 0; window.location.href = 'admin.html'; }
  clearTimeout(_logoTimer);
  _logoTimer = setTimeout(() => { _logoClicks = 0; }, 3000);
}

// ============ TOAST ============
function showToast(msg, isError) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => { toast.className = 'toast'; }, 3500);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
});
