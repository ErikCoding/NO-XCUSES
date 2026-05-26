// ============ LANGUAGE ============
const TRANSLATIONS = {
  pl: {
    'nav-home': 'Strona Główna', 'nav-config': 'Konfigurator', 'nav-portfolio': 'Projekty',
    'nav-ambassador': 'Ambasador', 'nav-contact': 'Kontakt',
    'hero-title': 'Darmowy projekt stroju dla Twojego klubu', 'hero-sub': 'Indywidualne projekty + pełna personalizacja',
    'cta-start': 'Otrzymaj darmowy projekt', 'how-title': 'Jak to działa',
    'how1-title': 'Zostawiasz kontakt', 'how1-desc': 'Krótko opisujesz swój klub, potrzeby drużyny, kolory i produkty, które chcesz przygotować.',
    'how2-title': 'Otrzymujesz projekt za darmo', 'how2-desc': 'Przygotowujemy wizualizację pod Was, tak aby od razu było widać styl kompletu.',
    'how3-title': 'Decydujesz', 'how3-desc': 'Jeśli projekt się podoba — dopracowujemy szczegóły i przechodzimy do realizacji.',
    'gallery-title': 'Projekty', 'footer-rights': 'Wszelkie prawa zastrzeżone.',
    'port-title': 'Projekty dla klubów', 'port-sub': 'Zobacz przykładowe projekty strojów i odzieży dla drużyn.',
    'amb-title': 'Zostań ambasadorem', 'amb-sub': 'Dołącz do programu współpracy i rozwijaj markę razem z nami.',
    'ben1-title': 'Zniżki', 'ben1-desc': 'Atrakcyjne ceny dla klubów i drużyn',
    'ben2-title': 'Ekspozycja', 'ben2-desc': 'Możliwość pokazania drużyny w naszych materiałach i social mediach',
    'ben3-title': 'Pierwsze wersje', 'ben3-desc': 'Dostęp do nowych projektów przed premierą',
    'l-amb-name': 'Imię i nazwisko', 'l-amb-email': 'E-mail', 'l-amb-social': 'Link do Social Media',
    'l-amb-team': 'Drużyna / Klub', 'l-amb-msg': 'Wiadomość', 'amb-submit': 'Zgłoś współpracę',
    'amb-success-title': 'Zgłoszenie wysłane!', 'amb-success-msg': 'Dziękujemy za wiadomość. Odezwiemy się w sprawie współpracy.',
    'con-title': 'Kontakt', 'con-sub': 'Chcesz darmowy projekt dla swojego klubu? Zostaw kontakt',
    'l-con-name': 'Imię i nazwisko', 'l-con-email': 'E-mail', 'l-con-subject': 'Klub / temat',
    'l-con-msg': 'Wiadomość', 'con-submit': 'Otrzymaj projekt', 'con-info-title': 'Dane kontaktowe',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Telefon',
    'con-success-title': 'Kontakt wysłany!', 'con-success-msg': 'Dziękujemy. Odezwiemy się i przygotujemy następny krok projektu.',
    'success-ambassador': 'Dziękujemy za aplikację! Odezwiemy się wkrótce.',
    'success-contact': 'Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe.',
    'success-order': 'Zamówienie zostało wysłane! Skontaktujemy się wkrótce.',
    'btn-next': 'DALEJ', 'btn-back': 'WSTECZ', 'btn-submit': 'OTRZYMAJ WYCENĘ I PROJEKT',
    'step-label': 'Krok', 'gallery-more': 'Zobacz więcej projektów',
    'admin-subtitle': 'Panel Administracyjny', 'admin-user': 'E-mail admina',
    'admin-pass': 'Hasło', 'admin-submit': 'ZALOGUJ', 'admin-logout': 'Wyloguj',
    'tab-orders': 'Zamówienia', 'tab-ambassadors': 'Ambasadorzy', 'tab-contacts': 'Wiadomości',
    'status-new': 'Nowe', 'status-read': 'Przeczytane',
    'btn-mark-read': 'Oznacz jako przeczytane', 'btn-delete': 'Usuń', 'no-data': 'Brak danych.',
    'login-error': 'Nieprawidłowe dane logowania.',
    'field-required': 'To pole jest wymagane.',
    'field-email': 'Podaj prawidłowy adres e-mail.',
    'select-required': 'Wybierz opcję aby przejść dalej.',
    // Configurator steps
    'step-product': 'Produkt', 'step-sleeves': 'Rękawy', 'step-fit': 'Dopasowanie',
    'step-collar': 'Kołnierz', 'step-colors': 'Kolory', 'step-material': 'Materiał',
    'step-branding': 'Zdobienia i wykończenie', 'step-upload': 'Pliki',
    'step-details': 'Wycena i projekt', 'step-contact': 'Kontakt',
  },
  en: {
    'nav-home': 'Home', 'nav-config': 'Configurator', 'nav-portfolio': 'Projects',
    'nav-ambassador': 'Ambassador', 'nav-contact': 'Contact',
    'hero-title': 'Free kit design for your club', 'hero-sub': 'Individual designs + full personalization',
    'cta-start': 'Get a free design', 'how-title': 'How it works',
    'how1-title': 'Leave your contact details', 'how1-desc': 'Briefly describe your club, team needs, colors and products you want to prepare.',
    'how2-title': 'Receive a design for free', 'how2-desc': 'We prepare a visualization tailored to your team so you can see the kit style quickly.',
    'how3-title': 'Decide', 'how3-desc': 'If you like the design, we refine the details and move into production.',
    'gallery-title': 'Projects', 'footer-rights': 'All rights reserved.',
    'port-title': 'Projects for clubs', 'port-sub': 'See sample kit and apparel designs for teams.',
    'amb-title': 'Become an ambassador', 'amb-sub': 'Join the collaboration program and grow the brand with us.',
    'ben1-title': 'Discounts', 'ben1-desc': 'Attractive pricing for clubs and teams',
    'ben2-title': 'Exposure', 'ben2-desc': 'Opportunity to feature your team in our materials and social media',
    'ben3-title': 'Early versions', 'ben3-desc': 'Access to new designs before launch',
    'l-amb-name': 'Full name', 'l-amb-email': 'Email', 'l-amb-social': 'Social Media link',
    'l-amb-team': 'Team / Club', 'l-amb-msg': 'Message', 'amb-submit': 'Submit collaboration',
    'amb-success-title': 'Submission sent!', 'amb-success-msg': "Thank you. We'll get back to you about collaboration.",
    'con-title': 'Contact', 'con-sub': 'Want a free design for your club? Leave your contact details',
    'l-con-name': 'Full name', 'l-con-email': 'Email', 'l-con-subject': 'Club / subject',
    'l-con-msg': 'Message', 'con-submit': 'Get a design', 'con-info-title': 'Contact info',
    'l-con-email-label': 'Email', 'l-con-phone-label': 'Phone',
    'con-success-title': 'Contact sent!', 'con-success-msg': "Thank you. We'll get back to you and prepare the next design step.",
    'success-ambassador': "Thank you for applying! We'll get back to you soon.",
    'success-contact': "Message sent! We'll reply as soon as possible.",
    'success-order': "Order submitted! We'll contact you soon.",
    'btn-next': 'NEXT', 'btn-back': 'BACK', 'btn-submit': 'GET QUOTE AND DESIGN',
    'step-label': 'Step', 'gallery-more': 'See more projects',
    'admin-subtitle': 'Admin Panel', 'admin-user': 'Admin email',
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
    'step-branding': 'Decorations and finish', 'step-upload': 'Files',
    'step-details': 'Quote and design', 'step-contact': 'Contact',
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
    heroTitle: 'hero-title', heroSub: 'hero-sub',
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
  if (typeof renderAdminContent === 'function') {
    if (typeof updateStats === 'function') updateStats();
    renderAdminContent();
  }
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

// ============ MOTION ============
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  if (!hero || !heroBg || prefersReducedMotion) return;

  let ticking = false;
  const update = () => {
    const rect = hero.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    if (visible) {
      const travelled = Math.min(Math.max(-rect.top, 0), hero.offsetHeight);
      heroBg.style.setProperty('--hero-parallax', (travelled * 0.24).toFixed(2));
    }
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}

function initScrollReveals(root) {
  const scope = root || document;
  const targets = scope.querySelectorAll([
    '.section-title',
    '.how-step',
    '.gallery-item',
    '.gallery-more',
    '.split-copy',
    '.club-visual',
    '.free-project-card',
    '.teamwear-layout > *',
    '.why-item',
    '.lead-copy',
    '.lead-card',
    '.project-cta',
    '.ambassador-hero-panel',
    '.ambassador-benefits .benefit',
    '.ambassador-form-copy',
    '.ambassador-form-card',
    '.faq-intro',
    '.faq-item',
    '.footer-logo',
    '.footer-links',
    '.footer-copy',
    '.page-header',
    '.portfolio-item',
    '.benefit',
    '.form-wrapper',
    '.contact-grid > *'
  ].join(','));

  if (!targets.length) return;

  targets.forEach(el => {
    if (el.classList.contains('anim-reveal') || el.classList.contains('is-visible')) return;
    el.classList.add('anim-reveal');
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  let revealQueue = [];
  let revealFrame = null;

  const flushRevealQueue = () => {
    const batch = revealQueue
      .filter(el => !el.classList.contains('is-visible'))
      .sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        return (rectA.top - rectB.top) || (rectA.left - rectB.left);
      });

    revealQueue = [];
    revealFrame = null;

    batch.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${Math.min(index, 7) * 55}ms`);
      el.classList.add('is-visible');
    });
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      revealQueue.push(entry.target);
    });
    if (revealQueue.length && !revealFrame) {
      revealFrame = window.requestAnimationFrame(flushRevealQueue);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => observer.observe(el));
}

function revealConfigStep(root) {
  if (!root) return;
  const targets = root.querySelectorAll('.step-title, .step-sub, .option-card, .color-section, .color-preview, .material-note, .form-group, .config-summary');
  targets.forEach((el, index) => {
    el.classList.add(el.classList.contains('option-card') ? 'anim-scale' : 'anim-reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 45}ms`);
  });
  requestAnimationFrame(() => targets.forEach(el => el.classList.add('is-visible')));
}

function initProjectLightbox() {
  const items = Array.from(document.querySelectorAll('.portfolio-item, .gallery-item'))
    .map(item => ({ item, img: item.querySelector('img') }))
    .filter(entry => entry.img);

  if (!items.length) return;

  const photos = items.map(({ img }) => ({
    src: img.dataset.fullSrc || img.currentSrc || img.src,
    alt: img.alt || ''
  }));

  const lightbox = document.createElement('div');
  lightbox.className = 'project-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Podgląd projektu');
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button class="project-lightbox-close" type="button" aria-label="Zamknij podgląd">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <button class="project-lightbox-nav project-lightbox-prev" type="button" aria-label="Poprzednie zdjęcie">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <figure class="project-lightbox-stage">
      <img class="project-lightbox-img" alt="" />
      <figcaption class="project-lightbox-caption"></figcaption>
    </figure>
    <button class="project-lightbox-nav project-lightbox-next" type="button" aria-label="Następne zdjęcie">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
    <div class="project-lightbox-count" aria-live="polite"></div>
  `;
  document.body.appendChild(lightbox);

  const imageEl = lightbox.querySelector('.project-lightbox-img');
  const captionEl = lightbox.querySelector('.project-lightbox-caption');
  const countEl = lightbox.querySelector('.project-lightbox-count');
  const closeBtn = lightbox.querySelector('.project-lightbox-close');
  const prevBtn = lightbox.querySelector('.project-lightbox-prev');
  const nextBtn = lightbox.querySelector('.project-lightbox-next');
  let activeIndex = 0;
  let lastFocus = null;
  let previousOverflow = '';

  function showPhoto(index) {
    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];
    imageEl.src = photo.src;
    imageEl.alt = photo.alt;
    captionEl.textContent = photo.alt;
    countEl.textContent = `${activeIndex + 1} / ${photos.length}`;
  }

  function openLightbox(index) {
    lastFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    showPhoto(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    imageEl.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function showPrevious() { showPhoto(activeIndex - 1); }
  function showNext() { showPhoto(activeIndex + 1); }

  items.forEach(({ item, img }, index) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', img.alt ? `Otwórz projekt: ${img.alt}` : 'Otwórz projekt');
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevious);
  nextBtn.addEventListener('click', showNext);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  initHeroParallax();
  initScrollReveals(document);
  initProjectLightbox();

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

window.revealConfigStep = revealConfigStep;
