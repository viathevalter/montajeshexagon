
window.openQuoteModal = function(options = {}) {
  const quoteModal = document.getElementById('quoteModal');
  if (!quoteModal) return;
  window._lastFocusedQuoteTrigger = document.activeElement;

  if (options.service) {
    const serviceSelect = document.getElementById('quoteService');
    if (serviceSelect) {
      const opts = Array.from(serviceSelect.options);
      const match = opts.find(o => o.value === options.service || o.text.toLowerCase().includes(options.service.toLowerCase()));
      if (match) {
        serviceSelect.value = match.value;
        try { serviceSelect.dispatchEvent(new Event('change', { bubbles: true })); } catch(e) {}
      }
    }
  }

  if (options.country) {
    const locationInput = document.getElementById('quoteLocation');
    if (locationInput) {
      const lang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
      const plantSuffix = {
        es: 'Planta industrial del cliente',
        en: "Client's industrial plant",
        it: 'Stabilimento industriale del cliente',
        fr: 'Site industriel du client',
        de: 'Industrieanlage des Kunden'
      }[lang] || 'Planta industrial del cliente';
      locationInput.value = `${options.country} (${plantSuffix})`;
    }
  }

  if (options.sector) {
    quoteModal.setAttribute('data-selected-sector', options.sector);
    const scopeInput = document.getElementById('quoteScope');
    if (scopeInput) {
      const lang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
      const prefixMap = {
        es: 'Sector industrial: ',
        en: 'Industrial sector: ',
        fr: 'Secteur industriel : ',
        it: 'Settore industriale: ',
        de: 'Industriebranche: '
      };
      const prefix = prefixMap[lang] || 'Sector industrial: ';
      const existing = scopeInput.value.trim();
      const allPrefixes = ['Sector industrial:', 'Industrial sector:', 'Secteur industriel :', 'Settore industriale:', 'Industriebranche:'];
      const hasAnyPrefix = allPrefixes.some(p => existing.startsWith(p));
      if (!existing || hasAnyPrefix) {
        scopeInput.value = `${prefix}${options.sector}\n`;
      }
    }
  }

  if (typeof quoteModal.showModal === 'function') {
    try {
      quoteModal.showModal();
    } catch (e) {
      quoteModal.setAttribute('open', '');
    }
  } else {
    quoteModal.setAttribute('open', '');
  }

  document.body.classList.add('has-modal-open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const firstInput = quoteModal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) firstInput.focus();
  }, 100);
};

window.closeQuoteModal = function() {
  const quoteModal = document.getElementById('quoteModal');
  if (!quoteModal) return;
  if (typeof quoteModal.close === 'function') {
    quoteModal.close();
  } else {
    quoteModal.removeAttribute('open');
  }
  document.body.classList.remove('has-modal-open');
  document.body.style.overflow = '';

  if (window._lastFocusedQuoteTrigger && typeof window._lastFocusedQuoteTrigger.focus === 'function') {
    window._lastFocusedQuoteTrigger.focus();
  }
};

window.openCandidacyModal = function() {
  const candidacyModal = document.getElementById('candidacyModal');
  if (!candidacyModal) return;
  window._lastFocusedCandTrigger = document.activeElement;

  if (typeof candidacyModal.showModal === 'function') {
    try {
      candidacyModal.showModal();
    } catch (e) {
      candidacyModal.setAttribute('open', '');
    }
  } else {
    candidacyModal.setAttribute('open', '');
  }

  document.body.classList.add('has-modal-open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const firstInput = candidacyModal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) firstInput.focus();
  }, 100);
};

window.closeCandidacyModal = function() {
  const candidacyModal = document.getElementById('candidacyModal');
  if (!candidacyModal) return;
  if (typeof candidacyModal.close === 'function') {
    candidacyModal.close();
  } else {
    candidacyModal.removeAttribute('open');
  }
  document.body.classList.remove('has-modal-open');
  document.body.style.overflow = '';

  if (window._lastFocusedCandTrigger && typeof window._lastFocusedCandTrigger.focus === 'function') {
    window._lastFocusedCandTrigger.focus();
  }
};

/**
 * HEXAGON MONTAJES INDUSTRIALES — SCRIPT PRINCIPAL CORPORATIVO
 * Control integral de:
 * 1. Animación mecánica de apertura
 * 2. Navegación sticky, menú drawer accesible y selector de idiomas
 * 3. Hero cinematográfico con pausa y reduced-motion
 * 4. Catálogo de servicios con preselección y accordions
 * 5. Mapa interactivo de Europa sincronizado con datos normativos y select accesible
 * 6. Formulario A: Asistente técnico de presupuesto en 3 etapas con envío a API real
 * 7. Formulario B: Canal de candidaturas técnicas para contratación propia
 * 8. Modales accesibles y asistencia técnica WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();

  const CONFIG = {
    whatsappNumber: '', // Reservado para asignación por cliente
    contactEmail: 'contacto@montajeshexagon.com',
    companyLegalName: 'Hexagon Montajes Industriales, S.L.',
    sessionKeyIntro: 'hexagon_intro_viewed_v1'
  };

  /* ==========================================================================
     1. ANIMACIÓN DE APERTURA (ENSAMBLAJE HEXAGONAL MECÁNICO)
     ========================================================================== */
  const introOverlay = document.getElementById('introOverlay');
  const introSkipBtn = document.getElementById('introSkipBtn');
  const replayIntroBtn = document.getElementById('replayIntroBtn');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeenIntro = sessionStorage.getItem(CONFIG.sessionKeyIntro);

  function hideIntro() {
    if (introOverlay) {
      introOverlay.classList.add('is-hidden');
      document.body.style.overflow = '';
      sessionStorage.setItem(CONFIG.sessionKeyIntro, 'true');
      setTimeout(() => {
        if (introOverlay) introOverlay.style.display = 'none';
      }, 700);
    }
  }

  function showIntro() {
    if (!introOverlay) return;
    introOverlay.style.display = 'flex';
    void introOverlay.offsetWidth;
    introOverlay.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(hideIntro, 3200);
  }

  if (introOverlay) {
    if (prefersReducedMotion || alreadySeenIntro || window.location.search.includes('nointro')) {
      introOverlay.style.display = 'none';
      introOverlay.classList.add('is-hidden');
    } else {
      document.body.style.overflow = 'hidden';
      setTimeout(hideIntro, 3200);
    }

    if (introSkipBtn) {
      introSkipBtn.addEventListener('click', hideIntro);
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && introOverlay && !introOverlay.classList.contains('is-hidden')) {
        hideIntro();
      }
    });
  }

  if (replayIntroBtn) {
    replayIntroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showIntro();
    });
  }

  /* ==========================================================================
     2. HEADER, MENÚ DRAWER Y SELECTOR DE IDIOMAS
     ========================================================================== */
  const headerMain = document.getElementById('siteHeader') || document.querySelector('.header-main') || document.getElementById('headerMain');

  // Sincronização dinâmica da altura real do cabeçalho com a variável CSS --header-height
  function syncHeaderHeight() {
    if (headerMain) {
      const h = headerMain.getBoundingClientRect().height;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-height', `${Math.round(h)}px`);
      }
    }
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-nav a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerMain?.classList.add('is-scrolled');
    } else {
      headerMain?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  function openDrawer() {
    mobileDrawer?.classList.add('is-open');
    drawerBackdrop?.classList.add('is-visible');
    menuToggle?.classList.add('is-active');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('is-open');
    drawerBackdrop?.classList.remove('is-visible');
    menuToggle?.classList.remove('is-active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Selector de idiomas accesible (con navegación por teclado y preservación de sección activa)
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langMenu = document.getElementById('langMenu');

  if (langToggleBtn && langMenu) {
    const langOptions = Array.from(langMenu.querySelectorAll('.lang-option, .lang-menu-item'));

    const closeLangMenu = (restoreFocus = false) => {
      langMenu.classList.remove('is-open');
      langToggleBtn.setAttribute('aria-expanded', 'false');
      if (restoreFocus) langToggleBtn.focus();
    };

    const openLangMenu = (focusIndex = -1) => {
      langMenu.classList.add('is-open');
      langToggleBtn.setAttribute('aria-expanded', 'true');
      if (focusIndex >= 0 && langOptions[focusIndex]) {
        langOptions[focusIndex].focus();
      }
    };

    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.contains('is-open');
      if (isOpen) {
        closeLangMenu();
      } else {
        openLangMenu();
      }
    });

    langToggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openLangMenu(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        openLangMenu(langOptions.length - 1);
      }
    });

    langOptions.forEach((opt, idx) => {
      opt.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          langOptions[(idx + 1) % langOptions.length]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          langOptions[(idx - 1 + langOptions.length) % langOptions.length]?.focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          langOptions[0]?.focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          langOptions[langOptions.length - 1]?.focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeLangMenu(true);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!langToggleBtn.contains(e.target) && !langMenu.contains(e.target)) {
        closeLangMenu();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langMenu.classList.contains('is-open')) {
        closeLangMenu(true);
      }
    });
  }

  // Preservar hash de sección activa (#servicios, #ambito, #contacto) al cambiar de idioma
  const allLangLinks = document.querySelectorAll('.lang-option, .lang-menu-item, .drawer-lang-bar a, .footer-lang-links a');
  allLangLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#')) return;
      try {
        sessionStorage.setItem(CONFIG.sessionKeyIntro, 'true');
      } catch (err) {}
      const currentHash = window.location.hash || '';
      if (currentHash && !rawHref.includes('#')) {
        e.preventDefault();
        window.location.href = rawHref + currentHash;
      }
    });
  });

  /* ==========================================================================
     3. HERO CINEMÁTICO: CONTROL DE VÍDEO Y PREFERS-REDUCED-MOTION
     ========================================================================== */
  const heroVideo = document.getElementById('heroVideo');
  const heroVideoToggle = document.getElementById('heroVideoToggle');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;

    const pauseIcon = heroVideoToggle?.querySelector('.icon-pause, .pause-icon');
    const playIcon = heroVideoToggle?.querySelector('.icon-play, .play-icon');
    const btnText = heroVideoToggle?.querySelector('.btn-text');

    const VIDEO_LABELS = {
      es: { pauseText: 'Pausar vídeo', pauseAria: 'Pausar vídeo de fondo', playText: 'Reproducir vídeo', playAria: 'Reproducir vídeo de fondo' },
      en: { pauseText: 'Pause video', pauseAria: 'Pause background video', playText: 'Play video', playAria: 'Play background video' },
      it: { pauseText: 'Metti in pausa il video', pauseAria: 'Metti in pausa il video di sfondo', playText: 'Riproduci video', playAria: 'Riproduci il video di sfondo' },
      fr: { pauseText: 'Mettre la vidéo en pause', pauseAria: 'Mettre la vidéo d’arrière-plan en pause', playText: 'Lire la vidéo', playAria: 'Lire la vidéo d’arrière-plan' },
      de: { pauseText: 'Video pausieren', pauseAria: 'Hintergrundvideo pausieren', playText: 'Video abspielen', playAria: 'Hintergrundvideo abspielen' }
    };
    const vLang = VIDEO_LABELS[currentLang] || VIDEO_LABELS.es;

    const updateUiPlaying = () => {
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (playIcon) playIcon.style.display = 'none';
      if (btnText) btnText.textContent = vLang.pauseText;
      if (heroVideoToggle) heroVideoToggle.setAttribute('aria-label', vLang.pauseAria);
    };

    const updateUiPaused = () => {
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (playIcon) playIcon.style.display = 'block';
      if (btnText) btnText.textContent = vLang.playText;
      if (heroVideoToggle) heroVideoToggle.setAttribute('aria-label', vLang.playAria);
    };

    const attemptPlay = () => {
      heroVideo.muted = true;
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(updateUiPlaying).catch(() => {
          updateUiPaused();
        });
      }
    };

    attemptPlay();

    heroVideo.addEventListener('play', updateUiPlaying);
    heroVideo.addEventListener('playing', updateUiPlaying);
    heroVideo.addEventListener('pause', updateUiPaused);

    if (heroVideoToggle) {
      heroVideoToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (heroVideo.paused) {
          heroVideo.muted = true;
          heroVideo.play().then(updateUiPlaying).catch(() => {});
        } else {
          heroVideo.pause();
          updateUiPaused();
        }
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && heroVideo.paused) {
        attemptPlay();
      }
    });

    const onFirstInteraction = () => {
      if (heroVideo.paused) {
        attemptPlay();
      }
      document.removeEventListener('click', onFirstInteraction);
      document.removeEventListener('touchstart', onFirstInteraction);
    };
    document.addEventListener('click', onFirstInteraction);
    document.addEventListener('touchstart', onFirstInteraction);
  }

  /* ==========================================================================
     4. CATÁLOGO DE SERVICIOS (DIRECCIÓN VISUAL DE REFERENCIA 32/68)
     ========================================================================== */
  function initServicesCatalog() {
    const catalogContainer = document.querySelector('.services-catalog-layout');
    if (!catalogContainer) return;

    const items = Array.from(document.querySelectorAll('.service-catalog-item'));
    if (!items.length) return;

    const displayPanel = document.getElementById('service-panel-content');
    const panelImg = document.getElementById('panelImage');
    const panelBadge = document.getElementById('panelBadge');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDescription');
    const panelTags = document.getElementById('panelTags');
    const panelReqDetails = document.getElementById('panelRequirements');
    const panelReqBody = document.getElementById('panelReqBody');
    const panelQuoteBtn = document.getElementById('panelQuoteBtn');
    const panelToggleReqBtn = document.getElementById('panelToggleReqBtn');
    const btnSelectService09 = document.getElementById('btnSelectService09');

    if (panelImg && !panelImg.hasAttribute('data-service-id')) {
      panelImg.setAttribute('data-service-id', '01');
    }
    if (displayPanel && !displayPanel.hasAttribute('data-active-service')) {
      displayPanel.setAttribute('data-active-service', '01');
    }

    function activateService(targetItem, shouldScroll = false) {
      if (!targetItem) return;

      const isMobile = window.innerWidth <= 900;
      const accordionBody = targetItem.querySelector('.mobile-accordion-body');
      if (!accordionBody) return;

      const imgEl = accordionBody.querySelector('.mobile-panel-img');
      const badgeEl = accordionBody.querySelector('.mobile-badge-chip');
      const titleEl = accordionBody.querySelector('.mobile-service-title');
      const descEl = accordionBody.querySelector('.mobile-service-desc');
      const tagsEl = accordionBody.querySelector('.mobile-service-tags');
      const reqContentEl = accordionBody.querySelector('.mobile-req-content');
      const quoteBtnEl = accordionBody.querySelector('[data-action="open-quote-modal"]');

      const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
      const imgAlt = imgEl ? imgEl.getAttribute('alt') : '';
      const badgeText = badgeEl ? badgeEl.textContent.trim() : '';
      const titleText = titleEl ? titleEl.textContent.trim() : '';
      const descText = descEl ? descEl.textContent.trim() : '';
      const tagsHtml = tagsEl ? tagsEl.innerHTML : '';
      const reqHtml = reqContentEl ? reqContentEl.innerHTML : '';
      const quoteServiceTarget = targetItem.getAttribute('data-quote-target') || (quoteBtnEl ? quoteBtnEl.getAttribute('data-service') : titleText);
      const quoteBtnLabel = quoteBtnEl ? quoteBtnEl.textContent.trim() : 'Solicitar presupuesto \u00A0↗';

      // Desktop list state update
      items.forEach(item => {
        const isActive = item === targetItem;
        item.classList.toggle('is-active', isActive);
        const navBtn = item.querySelector('.service-nav-btn');
        if (navBtn) {
          navBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          const iconSpan = navBtn.querySelector('.nav-btn-icon');
          if (iconSpan) {
            iconSpan.textContent = isActive ? '→' : '+';
          }
        }
      });

      // Desktop panel update with transition
      if (displayPanel) {
        displayPanel.classList.add('is-transitioning');
        setTimeout(() => {
          const serviceId = targetItem.getAttribute('data-service-id') || '';
          if (panelImg) {
            panelImg.src = imgSrc;
            panelImg.alt = imgAlt;
            panelImg.setAttribute('data-service-id', serviceId);
          }
          if (displayPanel) {
            displayPanel.setAttribute('data-active-service', serviceId);
          }
          if (panelBadge) panelBadge.textContent = badgeText;
          if (panelTitle) panelTitle.textContent = titleText;
          if (panelDesc) panelDesc.textContent = descText;
          if (panelTags) panelTags.innerHTML = tagsHtml;
          if (panelReqBody) panelReqBody.innerHTML = reqHtml;
          if (panelQuoteBtn) {
            panelQuoteBtn.setAttribute('data-service', quoteServiceTarget);
            panelQuoteBtn.innerHTML = quoteBtnLabel;
          }
          if (panelReqDetails) {
            panelReqDetails.open = false;
          }
          displayPanel.classList.remove('is-transitioning');
        }, 120);
      }

      // Mobile accordion state update
      if (isMobile) {
        const wasOpen = targetItem.classList.contains('is-open');
        items.forEach(item => {
          if (item === targetItem) {
            item.classList.toggle('is-open', !wasOpen);
          } else {
            item.classList.remove('is-open');
          }
        });
      } else {
        items.forEach(item => {
          item.classList.toggle('is-open', item === targetItem);
        });
      }

      if (shouldScroll) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    items.forEach((item, index) => {
      const btn = item.querySelector('.service-nav-btn');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        activateService(item);
      });

      btn.addEventListener('keydown', (e) => {
        let newIndex = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          newIndex = (index + 1) % items.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          newIndex = (index - 1 + items.length) % items.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = items.length - 1;
        }

        if (newIndex >= 0) {
          const nextBtn = items[newIndex].querySelector('.service-nav-btn');
          if (nextBtn) {
            nextBtn.focus();
            activateService(items[newIndex]);
          }
        }
      });
    });

    if (panelToggleReqBtn && panelReqDetails) {
      panelToggleReqBtn.addEventListener('click', (e) => {
        e.preventDefault();
        panelReqDetails.open = !panelReqDetails.open;
        if (panelReqDetails.open) {
          panelReqDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (btnSelectService09) {
      btnSelectService09.addEventListener('click', (e) => {
        e.preventDefault();
        const service09 = document.getElementById('service-item-09');
        if (service09) {
          activateService(service09, true);
        }
      });
    }
  }

  initServicesCatalog();

  /* ==========================================================================
     4a. SECCIÓN QUIÉNES SOMOS (ENTRADA EN SCROLL Y REFLEJO LUMINOSO)
     ========================================================================== */
  function initQuienesSomos() {
    const section = document.querySelector('.section-quienes-somos');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = section.querySelectorAll(
      '.quienes-somos-photo-wrap, .quienes-somos-header-block, .quienes-somos-body-block, .quienes-somos-experience-group'
    );

    function revealAll() {
      section.classList.add('is-visible');
      targets.forEach(el => el.classList.add('is-visible'));
      setTimeout(() => {
        section.classList.remove('js-animated');
      }, 750);
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealAll();
    } else {
      section.classList.add('js-animated');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealAll();
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.10,
        rootMargin: '0px 0px -30px 0px'
      });
      observer.observe(section);
    }

    // Reflejo luminoso sutil al pasar el mouse por la fotografía
    const photoWrap = section.querySelector('.quienes-somos-photo-wrap');
    if (photoWrap) {
      let isSheenRunning = false;
      photoWrap.addEventListener('mouseenter', () => {
        if (isSheenRunning || prefersReducedMotion) return;
        isSheenRunning = true;
        photoWrap.classList.remove('has-sheen-sweep');
        void photoWrap.offsetWidth;
        photoWrap.classList.add('has-sheen-sweep');
        setTimeout(() => {
          photoWrap.classList.remove('has-sheen-sweep');
          isSheenRunning = false;
        }, 760);
      });
    }
  }

  initQuienesSomos();

  /* ==========================================================================
     4b. SECCIÓN MANTENIMIENTO Y PARADAS DE PLANTA (SCROLL SEQUENCING)
     ========================================================================== */
  function initMantenimientoParadasScroll() {
    // La retención sticky de Mantenimiento y Paradas se gestiona en CSS vía position: sticky
    // con un percurso de retenção de 260px.
    // La revelación de los textos se gestiona en initProgressiveScrollReveal().
  }
  initMantenimientoParadasScroll();

  /* ==========================================================================
     4c. SECCIÓN ESPECIALIDADES TÉCNICAS (ACORDEÓN Y ANIMACIÓN)
     ========================================================================== */
  function initEspecialidadesAccordion() {
    const section = document.querySelector('.section-especialidades-tecnicas');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Animación de entrada al desplazarse (scroll reveal)
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      section.classList.add('is-visible');
    } else {
      section.classList.add('js-animated');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      observer.observe(section);
    }

    // 2. Acordeón interactivo con estado exclusivo (única especialidad abierta a la vez)
    const items = Array.from(section.querySelectorAll('.especialidades-item'));

    function closeItem(item) {
      if (!item.classList.contains('is-open')) return;
      item.classList.remove('is-open');
      const header = item.querySelector('.especialidades-item-header');
      const icon = item.querySelector('.especialidades-item-icon');
      if (header) header.setAttribute('aria-expanded', 'false');
      if (icon) icon.textContent = '+';
    }

    function openItem(item) {
      items.forEach(other => {
        if (other !== item) closeItem(other);
      });

      item.classList.add('is-open');
      const header = item.querySelector('.especialidades-item-header');
      const icon = item.querySelector('.especialidades-item-icon');
      if (header) header.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '−';
    }

    function toggleItem(item) {
      if (item.classList.contains('is-open')) {
        closeItem(item);
      } else {
        openItem(item);
      }
    }

    items.forEach(item => {
      const header = item.querySelector('.especialidades-item-header');
      if (!header) return;

      header.addEventListener('click', (e) => {
        e.preventDefault();
        toggleItem(item);
      });

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleItem(item);
        }
      });
    });


  }

  initEspecialidadesAccordion();

    /* ==========================================================================
     4d. CARRUSEL DE SECTORES INDUSTRIALES (HEXAGON) [v20261026_04]
     ========================================================================== */
  window.__HEXAGON_CAROUSEL_VERSION__ = '20261026_04';

  function initSectoresCarousel() {
    const section = document.querySelector('.section-sectores-industriales');
    if (!section || section._sectoresCarouselInitialized) return;
    section._sectoresCarouselInitialized = true;

    const viewport = section.querySelector('.sectores-carousel-viewport');
    const track = section.querySelector('.sectores-carousel-track');
    const cards = Array.from(track ? track.querySelectorAll('.sector-carousel-card') : []);
    if (!track || cards.length === 0) return;

    const totalCards = cards.length; // 6
    const btnPause = section.querySelector('.btn-carousel-pause');
    const btnPrev = section.querySelector('.btn-carousel-prev');
    const btnNext = section.querySelector('.btn-carousel-next');
    const progressBar = section.querySelector('.carousel-progress-bar');
    const counterEl = section.querySelector('#sectoresCounter');
    const dotButtons = Array.from(section.querySelectorAll('.carousel-dot'));
    const controlsGroup = section.querySelector('.sectores-carousel-controls');
    const footerControls = section.querySelector('.sectores-carousel-footer');

    const AUTOPLAY_DELAY = 8000; // 8 segundos exatos por setor

    // Rastreamento de interação por teclado vs ponteiro
    let isKeyboardNavigating = false;
    document.addEventListener('keydown', (e) => {
      if (['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        isKeyboardNavigating = true;
      }
    }, true);
    document.addEventListener('pointerdown', () => {
      isKeyboardNavigating = false;
    }, true);

    // Detección de preferencia de movimiento reducido del sistema
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const systemPrefersReducedMotion = mediaQueryReducedMotion.matches;
    let userExplicitPlay = false;

    // Separación explícita de los motivos de pausa (hover removido según nuevo requisito)
    const pauseReasons = {
      manual: false,                                    // Acción explícita del usuario (botón pausa o navegación manual)
      focus: false,                                     // Foco de teclado activo en controles de navegación
      offscreen: true,                                  // Sección fuera del área visible
      tabHidden: document.visibilityState === 'hidden', // Pestaña del navegador oculta
      reducedMotion: systemPrefersReducedMotion         // Preferencia de accesibilidad del sistema
    };

    let currentIndex = 0;
    let accumulatedTime = 0;
    let lastFrameTime = performance.now();
    let animFrameId = null;

    const lang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
    const i18n = {
      pause: { 
        es: 'Pausar avance automático', 
        en: 'Pause automatic advance', 
        fr: 'Suspendre le défilement automatique', 
        it: 'Sospendi avanzamento automatico', 
        de: 'Automatischen Vorlauf anhalten' 
      },
      resume: { 
        es: 'Reanudar avance automático', 
        en: 'Resume automatic advance', 
        fr: 'Reprendre le défilement automatique', 
        it: 'Riprendi avanzamento automatico', 
        de: 'Automatischen Vorlauf fortsetzen' 
      }
    };

    function isPlaying() {
      return !pauseReasons.manual &&
             !pauseReasons.focus &&
             !pauseReasons.offscreen &&
             !pauseReasons.tabHidden &&
             !pauseReasons.reducedMotion;
    }

    function updatePauseButtonUI() {
      if (!btnPause) return;
      const iconPause = btnPause.querySelector('.icon-pause');
      const iconPlay = btnPause.querySelector('.icon-play');
      const isPausedState = pauseReasons.manual || (pauseReasons.reducedMotion && !userExplicitPlay);

      if (iconPause && iconPlay) {
        iconPause.style.display = isPausedState ? 'none' : 'block';
        iconPlay.style.display = isPausedState ? 'block' : 'none';
      }
      const label = isPausedState ? (i18n.resume[lang] || i18n.resume.es) : (i18n.pause[lang] || i18n.pause.es);
      btnPause.setAttribute('aria-label', label);
      btnPause.setAttribute('title', isPausedState ? 'Reanudar' : 'Pausar');
    }

    function updateCarouselPosition(animate = true) {
      if (cards.length === 0) return;
      const card = cards[0];
      const cardWidth = card.getBoundingClientRect().width || card.offsetWidth;

      let gap = 24;
      try {
        const trackStyle = window.getComputedStyle(track);
        const g = parseFloat(trackStyle.gap || trackStyle.columnGap);
        if (!isNaN(g) && g > 0) gap = g;
      } catch (e) {}

      const offset = currentIndex * (cardWidth + gap);

      if (animate && (!systemPrefersReducedMotion || userExplicitPlay)) {
        track.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = `translateX(-${offset}px)`;

      if (counterEl) {
        const curStr = String(currentIndex + 1).padStart(2, '0');
        const totStr = String(totalCards).padStart(2, '0');
        counterEl.textContent = `${curStr} / ${totStr}`;
      }

      dotButtons.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      cards.forEach((c, idx) => {
        c.classList.toggle('is-active', idx === currentIndex);
      });
    }

    function goToIndex(newIndex, userTriggered = false) {
      if (newIndex < 0) {
        currentIndex = totalCards - 1;
      } else if (newIndex >= totalCards) {
        currentIndex = 0;
      } else {
        currentIndex = newIndex;
      }
      updateCarouselPosition(true);

      accumulatedTime = 0;
      if (progressBar) progressBar.style.width = '0%';

      if (userTriggered) {
        pauseReasons.manual = true;
        updatePauseButtonUI();
      }
    }

    // Panel de diagnóstico exclusivo activado por ?debugCarousel=1
    const isDebugMode = typeof window !== 'undefined' && 
      (new URLSearchParams(window.location.search).has('debugCarousel') || window.location.hash.includes('debugCarousel'));
    let debugHudEl = null;

    if (isDebugMode) {
      debugHudEl = document.createElement('div');
      debugHudEl.id = 'carouselDebugHUD';
      debugHudEl.style.cssText = `
        position: fixed;
        bottom: 16px;
        right: 16px;
        z-index: 999999;
        background: rgba(10, 20, 35, 0.95);
        border: 1.5px solid #C58F5E;
        border-radius: 8px;
        padding: 12px 16px;
        font-family: Consolas, monospace, sans-serif;
        font-size: 12px;
        line-height: 1.45;
        color: #FFFFFF;
        box-shadow: 0 8px 32px rgba(0,0,0,0.45);
        pointer-events: none;
        max-width: 380px;
      `;
      document.body.appendChild(debugHudEl);
    }

    function updateDebugHUD() {
      if (!debugHudEl) return;
      const vpRect = viewport ? viewport.getBoundingClientRect() : section.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const activeId = document.activeElement ? (document.activeElement.tagName.toLowerCase() + (document.activeElement.id ? '#' + document.activeElement.id : '')) : 'none';
      const playing = isPlaying();
      const statusColor = playing ? '#4ADE80' : '#F87171';
      const statusText = playing ? 'REPRODUCIENDO' : 'PAUSADO';

      debugHudEl.innerHTML = `
        <div style="font-weight:700; color:#C58F5E; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:4px; margin-bottom:6px; display:flex; justify-content:space-between;">
          <span>HEXAGON Sectores</span>
          <span style="font-size:10px; background:#1E3A5F; padding:1px 5px; border-radius:3px;">v20261026_04</span>
        </div>
        <div style="margin-bottom:3px;">
          <strong>Estado:</strong> <span style="color:${statusColor}; font-weight:700;">${statusText}</span>
        </div>
        <div style="margin-bottom:3px;">
          <strong>Tarjeta:</strong> ${String(currentIndex + 1).padStart(2, '0')} / 06 (${cards[currentIndex]?.querySelector('.sector-card-title')?.textContent || ''})
        </div>
        <div style="margin-bottom:3px;">
          <strong>Tiempo:</strong> ${(accumulatedTime / 1000).toFixed(2)}s / 8.0s (${((accumulatedTime / AUTOPLAY_DELAY) * 100).toFixed(1)}%)
        </div>
        <div style="margin-top:6px; padding-top:4px; border-top:1px dashed rgba(255,255,255,0.15); font-size:11px;">
          <div style="font-weight:600; color:#94A3B8; margin-bottom:2px;">Motivos de Pausa:</div>
          <div>• manual: <span style="color:${pauseReasons.manual ? '#F87171' : '#4ADE80'}">${pauseReasons.manual}</span></div>
          <div>• focus: <span style="color:${pauseReasons.focus ? '#F87171' : '#4ADE80'}">${pauseReasons.focus}</span> (${activeId})</div>
          <div>• offscreen: <span style="color:${pauseReasons.offscreen ? '#F87171' : '#4ADE80'}">${pauseReasons.offscreen}</span> (top: ${Math.round(vpRect.top)}px, winH: ${winH}px)</div>
          <div>• tabHidden: <span style="color:${pauseReasons.tabHidden ? '#F87171' : '#4ADE80'}">${pauseReasons.tabHidden}</span></div>
          <div>• reducedMotion: <span style="color:${pauseReasons.reducedMotion ? '#F87171' : '#4ADE80'}">${pauseReasons.reducedMotion}</span> (sys: ${systemPrefersReducedMotion}, explicit: ${userExplicitPlay})</div>
        </div>
      `;
    }

    // Bucle continuo de animación y avance por acumulación de delta
    function step(now) {
      const delta = Math.min(now - lastFrameTime, 250);
      lastFrameTime = now;

      if (isPlaying()) {
        accumulatedTime += delta;
        const pct = Math.min(100, (accumulatedTime / AUTOPLAY_DELAY) * 100);
        if (progressBar) progressBar.style.width = pct.toFixed(2) + '%';

        if (accumulatedTime >= AUTOPLAY_DELAY) {
          accumulatedTime = 0;
          if (progressBar) progressBar.style.width = '0%';
          goToIndex((currentIndex + 1) % totalCards, false);
        }
      }

      updateDebugHUD();

      animFrameId = requestAnimationFrame(step);
    }

    // Verificación de visibilidad: inicia automáticamente cuando los cartões están suficientemente visíveis
    // No exige que la sección entera quepa en pantalla
    function checkVisibility() {
      const secRect = section.getBoundingClientRect();
      const vpRect = viewport ? viewport.getBoundingClientRect() : secRect;
      const winH = window.innerHeight || document.documentElement.clientHeight;

      // Suficientemente visible si los cartones o la sección ingresan a la ventana
      const inView = (vpRect.top < winH * 0.95 && vpRect.bottom > winH * 0.05) ||
                     (secRect.top < winH * 0.85 && secRect.bottom > winH * 0.15);

      const wasOffscreen = pauseReasons.offscreen;
      pauseReasons.offscreen = !inView;
      if (wasOffscreen && inView) {
        updateCarouselPosition(false);
      }
    }

    // IntersectionObserver + scroll/resize listeners
    const observer = new IntersectionObserver(() => {
      checkVisibility();
    }, { threshold: [0, 0.05, 0.1, 0.25, 0.5] });
    observer.observe(section);
    if (viewport) observer.observe(viewport);

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();

    // Recalcular dimensiones cuando terminen de cargar las imágenes
    cards.forEach(card => {
      const img = card.querySelector('img');
      if (img && !img.complete) {
        img.addEventListener('load', () => updateCarouselPosition(false), { once: true });
      }
    });

    document.addEventListener('visibilitychange', () => {
      pauseReasons.tabHidden = document.visibilityState === 'hidden';
    });

    mediaQueryReducedMotion.addEventListener('change', (e) => {
      if (!userExplicitPlay) {
        pauseReasons.reducedMotion = e.matches;
        updatePauseButtonUI();
      }
    });

    // Control del botón de Pausa / Reanudar
    if (btnPause) {
      btnPause.addEventListener('click', (e) => {
        e.preventDefault();
        if (pauseReasons.reducedMotion && !userExplicitPlay) {
          userExplicitPlay = true;
          pauseReasons.reducedMotion = false;
          pauseReasons.manual = false;
          pauseReasons.focus = false;
          accumulatedTime = 0;
          if (progressBar) progressBar.style.width = '0%';
        } else {
          pauseReasons.manual = !pauseReasons.manual;
          if (!pauseReasons.manual) {
            userExplicitPlay = true;
            pauseReasons.reducedMotion = false;
            pauseReasons.focus = false;
            if (accumulatedTime >= AUTOPLAY_DELAY) {
              accumulatedTime = 0;
              if (progressBar) progressBar.style.width = '0%';
            }
          }
        }
        updatePauseButtonUI();
      });
    }

    // Controles manuales de navegación
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        goToIndex(currentIndex - 1, true);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        goToIndex(currentIndex + 1, true);
      });
    }

    dotButtons.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToIndex(idx, true);
      });
    });

    // Pausa por foco EXCLUSIVAMENTE cuando se navega por teclado en los botones anterior/siguiente/dots
    // Y NUNCA si el foco está en el propio botón de play/pausa
    const navButtons = [btnPrev, btnNext, ...dotButtons];
    navButtons.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('focusin', () => {
        if (isKeyboardNavigating) {
          pauseReasons.focus = true;
        }
      });
      btn.addEventListener('focusout', (e) => {
        if (!navButtons.includes(e.relatedTarget)) {
          pauseReasons.focus = false;
        }
      });
    });

    // Navegación accesible con flechas de teclado sobre los controles
    [btnPrev, btnNext, btnPause, ...dotButtons].forEach(el => {
      if (!el) return;
      el.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToIndex(currentIndex + 1, true);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToIndex(currentIndex - 1, true);
        } else if (e.key === ' ') {
          e.preventDefault();
          if (pauseReasons.reducedMotion && !userExplicitPlay) {
            userExplicitPlay = true;
            pauseReasons.reducedMotion = false;
            pauseReasons.manual = false;
            pauseReasons.focus = false;
            accumulatedTime = 0;
            if (progressBar) progressBar.style.width = '0%';
          } else {
            pauseReasons.manual = !pauseReasons.manual;
            if (!pauseReasons.manual) {
              userExplicitPlay = true;
              pauseReasons.reducedMotion = false;
              pauseReasons.focus = false;
              if (accumulatedTime >= AUTOPLAY_DELAY) {
                accumulatedTime = 0;
                if (progressBar) progressBar.style.width = '0%';
              }
            }
          }
          updatePauseButtonUI();
        }
      });
    });

    // Gestos táctiles de swipe en móviles
    let touchStartX = 0;
    let touchDiffX = 0;
    track.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchDiffX = 0;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchDiffX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (Math.abs(touchDiffX) > 40) {
        if (touchDiffX < 0) {
          goToIndex(currentIndex + 1, true);
        } else {
          goToIndex(currentIndex - 1, true);
        }
      }
    });

    // Redimensionamiento seguro sin duplicar eventos
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarouselPosition(false);
      }, 100);
    });

    // Iniciar loop continuo
    updateCarouselPosition(false);
    updatePauseButtonUI();
    animFrameId = requestAnimationFrame(step);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectoresCarousel);
  } else {
    initSectoresCarousel();
  }

  const serviceActionLinks = document.querySelectorAll('[data-service-target]');
  serviceActionLinks.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceValue = btn.getAttribute('data-service-target') || btn.getAttribute('data-service-name');
      window.openQuoteModal({ service: serviceValue });
    });
  });

  // Delegación universal para todos los botones que abren el modal
    // Delegación para abrir modal de candidatura técnica
  document.addEventListener('click', (e) => {
    const candBtn = e.target.closest('[data-action="open-candidacy-modal"], .btn-access-worker');
    if (candBtn) {
      e.preventDefault();
      window.openCandidacyModal();
    }
  });

  const candidacyModalCloseBtn = document.getElementById('candidacyModalCloseBtn');
  if (candidacyModalCloseBtn) {
    candidacyModalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeCandidacyModal();
    });
  }

  const candidacyModal = document.getElementById('candidacyModal');
  if (candidacyModal) {
    candidacyModal.addEventListener('cancel', () => {
      document.body.classList.remove('has-modal-open');
      document.body.style.overflow = '';
      if (window._lastFocusedCandTrigger) window._lastFocusedCandTrigger.focus();
    });

    candidacyModal.addEventListener('click', (e) => {
      if (e.target === candidacyModal) {
        window.closeCandidacyModal();
      }
    });
  }

  document.addEventListener('click', (e) => {
    const quoteBtn = e.target.closest('[data-action="open-quote-modal"], .btn-service-quote, #btnQuoteForCountry');
    if (!quoteBtn) return;
    e.preventDefault();

    const service = quoteBtn.getAttribute('data-service') || quoteBtn.getAttribute('data-service-id') || null;
    let country = quoteBtn.getAttribute('data-country') || null;
    const sector = quoteBtn.getAttribute('data-sector') || null;

    if (quoteBtn.id === 'btnQuoteForCountry') {
      const countrySpan = document.getElementById('btnQuoteCountryName');
      if (countrySpan && countrySpan.textContent) {
        country = countrySpan.textContent.trim();
      }
    }

    window.openQuoteModal({ service, country, sector });
  });

  const quoteModalCloseBtn = document.getElementById('quoteModalCloseBtn');
  if (quoteModalCloseBtn) {
    quoteModalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeQuoteModal();
    });
  }

  const quoteModal = document.getElementById('quoteModal');
  if (quoteModal) {
    quoteModal.addEventListener('cancel', () => {
      document.body.classList.remove('has-modal-open');
      document.body.style.overflow = '';
      if (window._lastFocusedQuoteTrigger) window._lastFocusedQuoteTrigger.focus();
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        window.closeQuoteModal();
      }
    });
  }

    /* ==========================================================================
     5. MAPA INTERACTIVO DE EUROPA Y PANEL DE ÁMBITO DE ACTUACIÓN (REDESIGN MINIMALISTA)
     ========================================================================== */
  const europeData = window.HEXAGON_EUROPE_DATA || {};
  const mapSelect = document.getElementById('europeCountrySelect');
  const mapWrapper = document.getElementById('europeMapWrapper');
  const authorityTooltip = document.getElementById('mapAuthorityTooltip') || document.getElementById('mapTooltip');

  // Elementos del panel lateral (Directo sobre fondo blanco)
  const scopeCountryTitle = document.getElementById('scopeCountryTitle');
  const scopeCountryStatus = document.getElementById('scopeCountryStatus');
  const scopeCountryDesc = document.getElementById('scopeCountryDesc');
  const scopeCardMetrics = document.getElementById('scopeCardMetrics');
  const scopeMetricVal1 = document.getElementById('scopeMetricVal1');
  const scopeMetricLabel1 = document.getElementById('scopeMetricLabel1');
  const scopeMetricVal2 = document.getElementById('scopeMetricVal2');
  const scopeMetricLabel2 = document.getElementById('scopeMetricLabel2');
  const scopeLegalFrameworkText = document.getElementById('scopeLegalFrameworkText');
  const btnScopeConsultProject = document.getElementById('btnScopeConsultProject');

  // Elementos del Tooltip de Autoridad Flotante
  const tooltipCountryName = document.getElementById('tooltipCountryName');
  const tooltipCountrySub = document.getElementById('tooltipCountrySub');
  const tooltipMetricsRow = document.getElementById('tooltipMetricsRow');
  const tooltipVal1 = document.getElementById('tooltipVal1');
  const tooltipLabel1 = document.getElementById('tooltipLabel1');
  const tooltipVal2 = document.getElementById('tooltipVal2');
  const tooltipLabel2 = document.getElementById('tooltipLabel2');

  // Acordeón de Documentación y Requisitos (+ / −)
  const scopeAccordionBtn = document.getElementById('scopeAccordionBtn');
  const scopeAccordionBody = document.getElementById('scopeAccordionBody');

  if (scopeAccordionBtn && scopeAccordionBody) {
    scopeAccordionBtn.addEventListener('click', () => {
      const isExpanded = scopeAccordionBtn.getAttribute('aria-expanded') === 'true';
      scopeAccordionBtn.setAttribute('aria-expanded', String(!isExpanded));
      scopeAccordionBody.hidden = isExpanded;
      const iconEl = document.getElementById('scopeDocIcon') || scopeAccordionBtn.querySelector('.scope-doc-icon');
      if (iconEl) {
        iconEl.textContent = isExpanded ? '+' : '−';
      }
    });
  }

  // Diccionario contextual para el rótulo superior del panel derecho
  const eyebrowDict = {
    base: {
      es: 'BASE OPERATIVA',
      en: 'OPERATIONAL BASE',
      fr: 'BASE OPÉRATIONNELLE',
      it: 'BASE OPERATIVA',
      de: 'BETRIEBSBASIS'
    },
    coverage: {
      es: 'COBERTURA OPERATIVA',
      en: 'OPERATIONAL COVERAGE',
      fr: 'COUVERTURE OPÉRATIONNELLE',
      it: 'COPERTURA OPERATIVA',
      de: 'BETRIEBLICHE ABDECKUNG'
    },
    study: {
      es: 'ESTUDIO ESPECÍFICO',
      en: 'SPECIFIC ASSESSMENT',
      fr: 'ÉTUDE SPÉCIFIQUE',
      it: 'STUDIO SPECIFICO',
      de: 'EINZELFALLPRÜFUNG'
    }
  };

  function renderCountryPanel(code) {
    const data = europeData[code] || europeData['ES'];
    if (!data) return;

    try {
      sessionStorage.setItem('hexagon_selected_country', code);
    } catch (e) {}

    if (mapSelect && mapSelect.value !== code) {
      mapSelect.value = code;
    }

    const lang = ['es', 'en', 'it', 'fr', 'de'].includes(currentLang) ? currentLang : 'es';
    const localizedName = data.localizedName?.[lang] || data.localizedName?.es || code;
    const summaryText = data.approvedSummary?.[lang] || data.approvedSummary?.es || '';
    const legalText = data.legalFramework?.[lang] || data.legalFramework?.es || '';

    // 1. Identificación contextual del país (para España: BASE OPERATIVA; para otros: rótulo contextual sin copiar BASE OPERATIVA)
    if (scopeCountryStatus) {
      if (code === 'ES' || data.operationalStatus === 'base_operativa') {
        scopeCountryStatus.textContent = eyebrowDict.base[lang] || eyebrowDict.base.es;
      } else if (data.completedProjects !== null && data.activeWorkers !== null) {
        scopeCountryStatus.textContent = eyebrowDict.coverage[lang] || eyebrowDict.coverage.es;
      } else {
        scopeCountryStatus.textContent = eyebrowDict.study[lang] || eyebrowDict.study.es;
      }
    }

    // 2. Nombre del país
    if (scopeCountryTitle) scopeCountryTitle.textContent = localizedName;

    // 3. Descripción breve
    if (scopeCountryDesc) scopeCountryDesc.textContent = summaryText;

    // 4. Indicadores lado a lado (si no hay datos comprobados, ocultar sin mostrar ceros)
    if (scopeCardMetrics) {
      if (data.completedProjects !== null && data.activeWorkers !== null) {
        scopeCardMetrics.style.display = 'flex';
        if (scopeMetricVal1) scopeMetricVal1.textContent = data.completedProjects;
        if (scopeMetricLabel1) {
          scopeMetricLabel1.textContent = data.metricsLabels?.projects?.[lang] || data.metricsLabels?.projects?.es || 'Obras completadas';
        }
        if (scopeMetricVal2) scopeMetricVal2.textContent = data.activeWorkers;
        if (scopeMetricLabel2) {
          scopeMetricLabel2.textContent = data.metricsLabels?.workers?.[lang] || data.metricsLabels?.workers?.es || 'Trabajadores';
        }
      } else {
        scopeCardMetrics.style.display = 'none';
      }
    }

    // 5. Marco legal en el acordeón
    if (scopeLegalFrameworkText) {
      scopeLegalFrameworkText.textContent = legalText;
    }

    // Restablecer estado inicial del acordeón al cambiar de país
    if (scopeAccordionBtn && scopeAccordionBody) {
      scopeAccordionBtn.setAttribute('aria-expanded', 'false');
      scopeAccordionBody.hidden = true;
      const iconEl = document.getElementById('scopeDocIcon') || scopeAccordionBtn.querySelector('.scope-doc-icon');
      if (iconEl) iconEl.textContent = '+';
    }

    // 6. Botón de consulta: asociar país seleccionado
    if (btnScopeConsultProject) {
      btnScopeConsultProject.setAttribute('data-country', localizedName);
    }

    // Actualizar clase seleccionada en el mapa SVG
    const allPaths = document.querySelectorAll('.map-country-path, .map-country, .map-country-group');
    allPaths.forEach(el => el.classList.remove('is-selected'));

    const activeEl = document.querySelector(`[data-code="${code}"]`);
    if (activeEl) {
      activeEl.classList.add('is-selected');
    }
    if (code === 'ES') {
      const canariasEl = document.querySelector('[data-code="ES-canarias"]');
      if (canariasEl) canariasEl.classList.add('is-selected');
    }
  }

  // Interacción en el SVG (hover, click, touch, teclado)
  const mapElements = document.querySelectorAll('.map-country-path, .map-country, .map-country-group');
  mapElements.forEach(el => {
    const rawCode = el.getAttribute('data-code');
    if (!rawCode) return;
    const code = rawCode === 'ES-canarias' ? 'ES' : rawCode;

    // Clic selecciona el país y fija sus datos en el panel lateral
    el.addEventListener('click', () => {
      renderCountryPanel(code);
    });

    // Teclado (Enter o Espacio) selecciona el país
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        renderCountryPanel(code);
      }
    });

    // Hover preview y Tooltip de Autoridad Compacto (solo nombre y métricas verificadas)
    el.addEventListener('mouseenter', () => {
      el.classList.add('is-hovered');
      const data = europeData[code];
      if (!data || !authorityTooltip) return;

      const lang = ['es', 'en', 'it', 'fr', 'de'].includes(currentLang) ? currentLang : 'es';
      const name = data.localizedName?.[lang] || data.localizedName?.es || code;

      if (tooltipCountryName) tooltipCountryName.textContent = name;
      if (tooltipCountrySub) {
        const subLabels = {
          es: 'Nuestra actividad en este país',
          en: 'Our activity in this country',
          it: 'La nostra attività in questo paese',
          fr: 'Notre activité dans ce pays',
          de: 'Unsere Aktivität in diesem Land'
        };
        tooltipCountrySub.textContent = subLabels[lang] || subLabels.es;
      }

      if (tooltipMetricsRow) {
        if (data.completedProjects !== null && data.activeWorkers !== null) {
          tooltipMetricsRow.style.display = 'flex';
          if (tooltipVal1) tooltipVal1.textContent = data.completedProjects;
          if (tooltipLabel1) {
            tooltipLabel1.textContent = data.metricsLabels?.projects?.[lang] || data.metricsLabels?.projects?.es || 'Obras completadas';
          }
          if (tooltipVal2) tooltipVal2.textContent = data.activeWorkers;
          if (tooltipLabel2) {
            tooltipLabel2.textContent = data.metricsLabels?.workers?.[lang] || data.metricsLabels?.workers?.es || 'Trabajadores';
          }
        } else {
          tooltipMetricsRow.style.display = 'none';
        }
      }

      authorityTooltip.classList.add('is-active');
    });

    el.addEventListener('mousemove', (e) => {
      if (!authorityTooltip || !mapWrapper) return;
      const rect = mapWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Clamping para asegurar que el tooltip quede siempre dentro del contenedor visible
      const tooltipW = authorityTooltip.offsetWidth || 210;
      const tooltipH = authorityTooltip.offsetHeight || 90;
      const minX = (tooltipW / 2) + 12;
      const maxX = rect.width - (tooltipW / 2) - 12;
      const clampedX = Math.max(minX, Math.min(maxX, x));
      const minY = tooltipH + 12;
      const maxY = rect.height - 12;
      const clampedY = Math.max(minY, Math.min(maxY, y));

      authorityTooltip.style.left = `${clampedX}px`;
      authorityTooltip.style.top = `${clampedY}px`;
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('is-hovered');
      authorityTooltip?.classList.remove('is-active');
    });
  });

  // Selector accesible
  if (mapSelect) {
    mapSelect.addEventListener('change', () => {
      renderCountryPanel(mapSelect.value);
    });
  }

  // Botón CTA del panel ("Consultar mi proyecto") -> Abre directamente el modal comercial con el país preseleccionado
  if (btnScopeConsultProject) {
    btnScopeConsultProject.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedCode = mapSelect?.value || 'ES';
      const data = europeData[selectedCode];
      const lang = ['es', 'en', 'it', 'fr', 'de'].includes(currentLang) ? currentLang : 'es';
      const countryName = data?.localizedName?.[lang] || data?.localizedName?.es || 'España';

      if (typeof window.openQuoteModal === 'function') {
        window.openQuoteModal({
          country: countryName,
          location: countryName
        });
      }
    });
  }

  // Estado inicial del mapa (España por defecto o país recordado de sesión)
  let initialCountry = 'ES';
  try {
    const saved = sessionStorage.getItem('hexagon_selected_country');
    if (saved && europeData[saved]) {
      initialCountry = saved;
    }
  } catch (e) {}
  renderCountryPanel(initialCountry);

  /* ==========================================================================
     DICCIONARIO DE TEXTOS DINÁMICOS DE INTERFAZ Y MODALES LEGALES (5 IDIOMAS)
     ========================================================================== */
  const UI_I18N = {
    es: {
      errQuoteCompany: 'Por favor, indique el nombre o razón social de la empresa.',
      errQuoteName: 'Indique el nombre del responsable de contacto.',
      errQuoteEmail: 'Introduzca una dirección de correo válida.',
      errQuotePhone: 'Indique un teléfono de contacto directo.',
      errQuoteLocation: 'Indique la ubicación o planta donde se ejecutarán los trabajos.',
      errQuoteService: 'Seleccione el servicio industrial principal requerido.',
      errQuoteScope: 'Por favor, describa brevemente el alcance técnico del trabajo.',
      errQuotePrivacy: 'Debe aceptar la política de privacidad para remitir la propuesta.',
      filesSelected: 'archivo(s) seleccionado(s):',
      quoteDropDefault: 'Haga clic para adjuntar o arrastre planos, isométricas o pliegos técnicos (máx. 25MB)',
      quoteSubmitting: 'Registrando solicitud técnica...',
      quoteSubmitBtn: 'Enviar Solicitud de Presupuesto',
      quoteSuccessTitle: '✓ Solicitud de Presupuesto Registrada — Referencia',
      quoteSuccessBody: 'Su expediente técnico ha sido recibido por el departamento de ofertas de Hexagon Montajes Industriales.',
      copyRefBtn: 'Copiar número de expediente',
      closeWindowBtn: 'Cerrar ventana',
      refCopiedAlert: 'Referencia copiada al portapapeles:',
      quoteErrorSubject: 'Petición de Oferta — ',
      quoteConnTitle: 'Aviso de conexión:',
      quoteConnBody: 'No se pudo conectar directamente con el servidor API.<br>Puede remitir su expediente técnico de inmediato a través de:',
      sendDirectEmailBtn: 'Enviar por correo directo',
      errCandName: 'Por favor, introduce tu nombre y apellidos.',
      errCandContact: 'Indica un teléfono o email de contacto.',
      errCandSpecialty: 'Selecciona tu especialidad industrial principal.',
      errCandResidence: 'Indica tu lugar habitual de residencia.',
      errCandPrivacy: 'Debes aceptar la política de protección de datos para postularte.',
      candDropDefault: 'Adjuntar CV o certificados profesionales (PDF, DOCX — máx. 10MB)',
      candSubmitting: 'Registrando candidatura técnica...',
      candSubmitBtn: 'Enviar Candidatura Técnica',
      candSuccessTitle: '✓ Candidatura Registrada — Referencia',
      candSuccessBody: 'Tus datos han sido registrados en la base técnica de selección directa de Hexagon Montajes Industriales.',
      candConnError: 'No se pudo conectar con el servidor de candidaturas. Puedes escribir directamente a contacto@montajeshexagon.com con tu CV adjunto.',
      whatsappDefaultText: 'Hola. Quisiera consultar la disponibilidad y presupuesto de Hexagon Montajes Industriales para un proyecto técnico.'
    },
    en: {
      errQuoteCompany: 'Please enter the company name or legal entity.',
      errQuoteName: 'Please enter the contact person’s name.',
      errQuoteEmail: 'Please enter a valid email address.',
      errQuotePhone: 'Please enter a direct contact phone number.',
      errQuoteLocation: 'Please indicate the plant or location where the work will be executed.',
      errQuoteService: 'Please select the main industrial service required.',
      errQuoteScope: 'Please briefly describe the technical scope of work.',
      errQuotePrivacy: 'You must accept the privacy policy to submit the request.',
      filesSelected: 'file(s) selected:',
      quoteDropDefault: 'Click to attach or drag drawings, isometrics or technical specifications (max. 25MB)',
      quoteSubmitting: 'Submitting technical request...',
      quoteSubmitBtn: 'Submit Quote Request',
      quoteSuccessTitle: '✓ Quote Request Registered — Reference',
      quoteSuccessBody: 'Your technical file has been received by the tendering department of Hexagon Montajes Industriales.',
      copyRefBtn: 'Copy reference number',
      closeWindowBtn: 'Close window',
      refCopiedAlert: 'Reference copied to clipboard:',
      quoteErrorSubject: 'Quote Request — ',
      quoteConnTitle: 'Connection notice:',
      quoteConnBody: 'Could not connect directly to the API server.<br>You can send your technical file immediately via:',
      sendDirectEmailBtn: 'Send via direct email',
      errCandName: 'Please enter your full name.',
      errCandContact: 'Please enter a contact phone number or email.',
      errCandSpecialty: 'Please select your main industrial trade.',
      errCandResidence: 'Please enter your usual place of residence.',
      errCandPrivacy: 'You must accept the data protection policy to apply.',
      candDropDefault: 'Attach CV or trade certificates (PDF, DOCX — max. 10MB)',
      candSubmitting: 'Submitting technical application...',
      candSubmitBtn: 'Submit Technical Application',
      candSuccessTitle: '✓ Application Registered — Reference',
      candSuccessBody: 'Your details have been registered in the direct recruitment database of Hexagon Montajes Industriales.',
      candConnError: 'Could not connect to the recruitment server. You may write directly to contacto@montajeshexagon.com with your CV attached.',
      whatsappDefaultText: 'Hello. I would like to inquire about availability and a quote from Hexagon Montajes Industriales for a technical project.'
    },
    it: {
      errQuoteCompany: 'Si prega di indicare il nome o la ragione sociale dell’azienda.',
      errQuoteName: 'Indicare il nome del referente di contatto.',
      errQuoteEmail: 'Inserire un indirizzo email valido.',
      errQuotePhone: 'Indicare un numero di telefono di contatto diretto.',
      errQuoteLocation: 'Indicare lo stabilimento o la località in cui verranno eseguiti i lavori.',
      errQuoteService: 'Selezionare il servizio industriale principale richiesto.',
      errQuoteScope: 'Descrivere brevemente l’ambito tecnico del lavoro.',
      errQuotePrivacy: 'È necessario accettare l’informativa sulla privacy per inviare la richiesta.',
      filesSelected: 'file selezionato/i:',
      quoteDropDefault: 'Clicca per allegare o trascina disegni, isometriche o capitolati tecnici (max. 25MB)',
      quoteSubmitting: 'Registrazione richiesta tecnica...',
      quoteSubmitBtn: 'Invia Richiesta di Preventivo',
      quoteSuccessTitle: '✓ Richiesta di Preventivo Registrata — Riferimento',
      quoteSuccessBody: 'Il Suo fascicolo tecnico è stato ricevuto dall’ufficio offerte di Hexagon Montajes Industriales.',
      copyRefBtn: 'Copia numero di riferimento',
      closeWindowBtn: 'Chiudi finestra',
      refCopiedAlert: 'Riferimento copiato negli appunti:',
      quoteErrorSubject: 'Richiesta di Preventivo — ',
      quoteConnTitle: 'Avviso di connessione:',
      quoteConnBody: 'Impossibile connettersi direttamente al server API.<br>Può inviare immediatamente il Suo fascicolo tecnico tramite:',
      sendDirectEmailBtn: 'Invia tramite email diretta',
      errCandName: 'Inserisci il tuo nome e cognome.',
      errCandContact: 'Indica un numero di telefono o un’email di contatto.',
      errCandSpecialty: 'Seleziona la tua specializzazione industriale principale.',
      errCandResidence: 'Indica il tuo luogo abituale di residenza.',
      errCandPrivacy: 'Devi accettare l’informativa sulla protezione dei dati per candidarti.',
      candDropDefault: 'Allega CV o certificati professionali (PDF, DOCX — max. 10MB)',
      candSubmitting: 'Registrazione candidatura tecnica...',
      candSubmitBtn: 'Invia Candidatura Tecnica',
      candSuccessTitle: '✓ Candidatura Registrata — Riferimento',
      candSuccessBody: 'I tuoi dati sono stati registrati nel database di selezione diretta di Hexagon Montajes Industriales.',
      candConnError: 'Impossibile connettersi al server delle candidature. Puoi scrivere direttamente a contacto@montajeshexagon.com allegando il tuo CV.',
      whatsappDefaultText: 'Salve. Vorrei verificare la disponibilità e richiedere un preventivo a Hexagon Montajes Industriales per un progetto tecnico.'
    },
    fr: {
      errQuoteCompany: 'Veuillez indiquer le nom ou la raison sociale de l’entreprise.',
      errQuoteName: 'Veuillez indiquer le nom du responsable à contacter.',
      errQuoteEmail: 'Veuillez saisir une adresse e-mail valide.',
      errQuotePhone: 'Veuillez indiquer un numéro de téléphone direct.',
      errQuoteLocation: 'Veuillez indiquer le site ou l’usine où seront exécutés les travaux.',
      errQuoteService: 'Veuillez sélectionner le service industriel principal requis.',
      errQuoteScope: 'Veuillez décrire brièvement le périmètre technique des travaux.',
      errQuotePrivacy: 'Vous devez accepter la politique de confidentialité pour envoyer la demande.',
      filesSelected: 'fichier(s) sélectionné(s) :',
      quoteDropDefault: 'Cliquez pour joindre ou glissez vos plans, isométriques ou cahiers des charges (max. 25 Mo)',
      quoteSubmitting: 'Enregistrement de la demande technique...',
      quoteSubmitBtn: 'Envoyer la Demande de Devis',
      quoteSuccessTitle: '✓ Demande de Devis Enregistrée — Référence',
      quoteSuccessBody: 'Votre dossier technique a été reçu par le bureau des études et devis de Hexagon Montajes Industriales.',
      copyRefBtn: 'Copier le numéro de dossier',
      closeWindowBtn: 'Fermer la fenêtre',
      refCopiedAlert: 'Référence copiée dans le presse-papiers :',
      quoteErrorSubject: 'Demande de Devis — ',
      quoteConnTitle: 'Avis de connexion :',
      quoteConnBody: 'Impossible de se connecter directement au serveur API.<br>Vous pouvez transmettre immédiatement votre dossier technique via :',
      sendDirectEmailBtn: 'Envoyer par e-mail direct',
      errCandName: 'Veuillez saisir vos nom et prénom.',
      errCandContact: 'Veuillez indiquer un téléphone ou un e-mail de contact.',
      errCandSpecialty: 'Veuillez sélectionner votre spécialité industrielle principale.',
      errCandResidence: 'Veuillez indiquer votre lieu de résidence habituel.',
      errCandPrivacy: 'Vous devez accepter la politique de protection des données pour postuler.',
      candDropDefault: 'Joindre CV ou certificats professionnels (PDF, DOCX — max. 10 Mo)',
      candSubmitting: 'Enregistrement de la candidature technique...',
      candSubmitBtn: 'Envoyer la Candidature Technique',
      candSuccessTitle: '✓ Candidature Enregistrée — Référence',
      candSuccessBody: 'Vos données ont été enregistrées dans la base de recrutement direct de Hexagon Montajes Industriales.',
      candConnError: 'Impossible de se connecter au serveur de candidatures. Vous pouvez écrire directement à contacto@montajeshexagon.com avec votre CV joint.',
      whatsappDefaultText: 'Bonjour. Je souhaiterais consulter la disponibilité et obtenir un devis de Hexagon Montajes Industriales pour un projet technique.'
    },
    de: {
      errQuoteCompany: 'Bitte geben Sie den Namen oder die Rechtsform des Unternehmens an.',
      errQuoteName: 'Bitte geben Sie den Namen des Ansprechpartners an.',
      errQuoteEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      errQuotePhone: 'Bitte geben Sie eine direkte Telefonnummer an.',
      errQuoteLocation: 'Bitte geben Sie das Werk oder den Standort an, an dem die Arbeiten ausgeführt werden.',
      errQuoteService: 'Bitte wählen Sie die gewünschte industrielle Hauptleistung aus.',
      errQuoteScope: 'Bitte beschreiben Sie kurz den technischen Leistungsumfang.',
      errQuotePrivacy: 'Sie müssen die Datenschutzerklärung akzeptieren, um die Anfrage zu senden.',
      filesSelected: 'Datei(en) ausgewählt:',
      quoteDropDefault: 'Klicken Sie zum Anhängen oder ziehen Sie Pläne, Isometrien oder Lastenhefte hierher (max. 25 MB)',
      quoteSubmitting: 'Technische Anfrage wird registriert...',
      quoteSubmitBtn: 'Angebotsanfrage senden',
      quoteSuccessTitle: '✓ Angebotsanfrage registriert — Referenz',
      quoteSuccessBody: 'Ihre technischen Unterlagen sind bei der Angebotsabteilung von Hexagon Montajes Industriales eingegangen.',
      copyRefBtn: 'Referenznummer kopieren',
      closeWindowBtn: 'Fenster schließen',
      refCopiedAlert: 'Referenz in die Zwischenablage kopiert:',
      quoteErrorSubject: 'Angebotsanfrage — ',
      quoteConnTitle: 'Verbindungshinweis:',
      quoteConnBody: 'Es konnte keine direkte Verbindung zum API-Server hergestellt werden.<br>Sie können Ihre technischen Unterlagen sofort übermitteln per:',
      sendDirectEmailBtn: 'Per direkter E-Mail senden',
      errCandName: 'Bitte geben Sie Ihren Vor- und Nachnamen ein.',
      errCandContact: 'Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.',
      errCandSpecialty: 'Bitte wählen Sie Ihr industrielles Hauptfachgebiet aus.',
      errCandResidence: 'Bitte geben Sie Ihren gewöhnlichen Wohnort an.',
      errCandPrivacy: 'Sie müssen die Datenschutzbestimmungen akzeptieren, um sich zu bewerben.',
      candDropDefault: 'Lebenslauf oder Fachzertifikate anhängen (PDF, DOCX — max. 10 MB)',
      candSubmitting: 'Technische Bewerbung wird registriert...',
      candSubmitBtn: 'Technische Bewerbung senden',
      candSuccessTitle: '✓ Bewerbung registriert — Referenz',
      candSuccessBody: 'Ihre Daten wurden in der Datenbank für die Direktrekrutierung von Hexagon Montajes Industriales erfasst.',
      candConnError: 'Es konnte keine Verbindung zum Bewerbungsserver hergestellt werden. Sie können direkt an contacto@montajeshexagon.com mit angehängtem Lebenslauf schreiben.',
      whatsappDefaultText: 'Guten Tag. Ich möchte die Verfügbarkeit prüfen und ein Angebot von Hexagon Montajes Industriales für ein technisches Projekt anfordern.'
    }
  };

  const t = UI_I18N[currentLang] || UI_I18N.es;

  /* ==========================================================================
     6. FORMULARIO A: ASISTENTE DE PRESUPUESTO EN 3 ETAPAS (MEJORADO)
     ========================================================================== */
  const quoteForm = document.getElementById('quoteForm');
  let currentStep = 1;

  const stepTabs = [
    document.getElementById('stepTab1'),
    document.getElementById('stepTab2'),
    document.getElementById('stepTab3')
  ];

  const stepPanes = [
    document.getElementById('wizardStep1'),
    document.getElementById('wizardStep2'),
    document.getElementById('wizardStep3')
  ];

  // Helper para identificar el tipo de servicio seleccionado
  function getServiceKey(val) {
    if (!val) return null;
    const v = val.toLowerCase();
    if (v.includes('montaje industrial') || v.includes('industrial assembly') || v.includes('montage industriel') || v.includes('montaggio industriale') || v.includes('industriemontage')) return 'montaje';
    if (v.includes('mantenimiento industrial') || v.includes('industrial maintenance') || v.includes('maintenance industrielle') || v.includes('manutenzione industriale') || v.includes('instandhaltung')) return 'mantenimiento';
    if (v.includes('soldadura') || v.includes('welding') || v.includes('soudage') || v.includes('saldatura') || v.includes('schweiß')) return 'soldadura';
    if (v.includes('tubería') || v.includes('piping') || v.includes('tuyauterie') || v.includes('tubazioni') || v.includes('rohrleitung')) return 'tuberias';
    if (v.includes('calderería') || v.includes('boilermaking') || v.includes('chaudronnerie') || v.includes('carpenteria') || v.includes('kesselbau')) return 'caldereria';
    if (v.includes('mecánica') || v.includes('mechanic') || v.includes('mécanique') || v.includes('meccanica') || v.includes('mechanik')) return 'mecanica';
    if (v.includes('reparación de equipos') || v.includes('repair') || v.includes('réparation') || v.includes('riparazione') || v.includes('anlageninstallation')) return 'equipos';
    if (v.includes('auxiliar') || v.includes('hilfsarbeit')) return 'auxiliares';
    if (v.includes('personal especializado') || v.includes('specialized personnel') || v.includes('personnel spécialisé') || v.includes('personale specializzato') || v.includes('fachpersonal')) return 'personal';
    if (v.includes('parada') || v.includes('turnaround') || v.includes('arrêt') || v.includes('fermata') || v.includes('stillst')) return 'paradas';
    if (v.includes('orientación') || v.includes('guidance') || v.includes('orientation') || v.includes('orientamento') || v.includes('beratung')) return 'orientacion';
    return null;
  }

  // Gestión de paneles condicionales de servicio
  const quoteServiceSelect = document.getElementById('quoteService');
  const condContainer = document.getElementById('conditionalServicesContainer');
  const profilesSection = document.getElementById('profilesSelectionSection');

  function updateServicePanels() {
    if (!quoteServiceSelect) return;
    const selectedVal = quoteServiceSelect.value;
    const serviceKey = getServiceKey(selectedVal);

    if (condContainer) {
      condContainer.style.display = serviceKey ? 'block' : 'none';
    }

    const allPanels = document.querySelectorAll('.service-conditional-panel');
    allPanels.forEach(p => {
      const pKey = p.getAttribute('data-service-key');
      const isMatch = (pKey === serviceKey);
      p.classList.toggle('is-active', isMatch);
      // Limpiar campos de paneles ocultos para no enviar datos residuales
      if (!isMatch) {
        p.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea').forEach(inp => inp.value = '');
        p.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(cb => cb.checked = false);
        p.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
      }
    });

    if (profilesSection) {
      // Activo para "Personal especializado" y para "Paradas de planta / Varios servicios"
      const showProfiles = (serviceKey === 'personal' || serviceKey === 'paradas');
      profilesSection.style.display = showProfiles ? 'block' : 'none';
      if (!showProfiles) {
        // Si no se usa la sección de perfiles, desmarcar y ocultar tarjetas
        document.querySelectorAll('input[name="quoteProfiles"]').forEach(cb => {
          if (cb.checked) {
            cb.checked = false;
            cb.dispatchEvent(new Event('change'));
          }
        });
      }
    }
  }

  if (quoteServiceSelect) {
    quoteServiceSelect.addEventListener('change', updateServicePanels);
  }

  // Mapeo de perfiles a sus tarjetas colapsables
  const profileCardMap = {
    'Soldadores': { cardId: 'cardProfileSoldadores', bodyId: 'bodyProfileSoldadores', badgeId: 'badgeQtySoldadores', qtyId: 'qtySoldadores', tbdId: 'tbdSoldadores' },
    'Tuberos': { cardId: 'cardProfileTuberos', bodyId: 'bodyProfileTuberos', badgeId: 'badgeQtyTuberos', qtyId: 'qtyTuberos', tbdId: 'tbdTuberos' },
    'Caldereros': { cardId: 'cardProfileCaldereros', bodyId: 'bodyProfileCaldereros', badgeId: 'badgeQtyCaldereros', qtyId: 'qtyCaldereros', tbdId: 'tbdCaldereros' },
    'Mecánicos industriales': { cardId: 'cardProfileMecanicos', bodyId: 'bodyProfileMecanicos', badgeId: 'badgeQtyMecanicos', qtyId: 'qtyMecanicos', tbdId: 'tbdMecanicos' },
    'Montadores industriales': { cardId: 'cardProfileMontadores', bodyId: 'bodyProfileMontadores', badgeId: 'badgeQtyMontadores', qtyId: 'qtyMontadores', tbdId: 'tbdMontadores' },
    'Otro perfil': { cardId: 'cardProfileOtro', bodyId: 'bodyProfileOtro', badgeId: 'badgeQtyOtro', qtyId: 'qtyOtro', tbdId: 'tbdOtro' }
  };

  // Función para actualizar badge de cantidad de un perfil
  function updateProfileQtyBadge(profKey) {
    const cfg = profileCardMap[profKey];
    if (!cfg) return;
    const badge = document.getElementById(cfg.badgeId);
    const qtyInput = document.getElementById(cfg.qtyId);
    const tbdCheck = document.getElementById(cfg.tbdId);
    if (!badge) return;

    const tbdText = {
      es: 'Por definir', en: 'To be defined', fr: 'À définir', it: 'Da definire', de: 'Nach Absprache'
    }[currentLang] || 'Por definir';

    const qtyWord = {
      es: 'Cantidad', en: 'Quantity', fr: 'Nombre', it: 'Quantità', de: 'Anzahl'
    }[currentLang] || 'Cantidad';

    if (tbdCheck && tbdCheck.checked) {
      badge.textContent = `${qtyWord}: ${tbdText}`;
      if (qtyInput) {
        qtyInput.disabled = true;
        qtyInput.value = '';
      }
    } else {
      if (qtyInput) {
        qtyInput.disabled = false;
        const val = qtyInput.value.trim();
        badge.textContent = val ? `${qtyWord}: ${val}` : `${qtyWord}: ${tbdText}`;
      }
    }
  }

  // Manejo de checkboxes de perfiles y sus tarjetas
  document.querySelectorAll('input[name="quoteProfiles"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const profName = cb.value;
      const cfg = profileCardMap[profName];
      if (!cfg) return;
      const card = document.getElementById(cfg.cardId);
      if (!card) return;

      if (cb.checked) {
        card.style.display = 'block';
        card.classList.remove('is-collapsed');
        card.classList.add('is-active');
        const header = card.querySelector('.profile-detail-header');
        if (header) header.setAttribute('aria-expanded', 'true');
        updateProfileQtyBadge(profName);
      } else {
        card.style.display = 'none';
        card.classList.remove('is-active');
        // Limpiar campos del perfil desmarcado
        card.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea').forEach(i => i.value = '');
        card.querySelectorAll('input[type="checkbox"]').forEach(c => {
          if (c.id && c.id.startsWith('tbd')) c.checked = true;
          else c.checked = false;
        });
        card.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
        updateProfileQtyBadge(profName);
      }
    });
  });

  // Toggles de acordeón (click en cabecera de tarjeta de perfil)
  document.querySelectorAll('.profile-detail-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const card = hdr.closest('.profile-detail-card');
      if (!card) return;
      const isCollapsed = card.classList.toggle('is-collapsed');
      hdr.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    });
    // Accesibilidad por teclado (Enter / Espacio)
    hdr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hdr.click();
      }
    });
  });

  // Listeners de cantidad y "Por definir" para cada perfil
  Object.keys(profileCardMap).forEach(profKey => {
    const cfg = profileCardMap[profKey];
    const qtyInput = document.getElementById(cfg.qtyId);
    const tbdCheck = document.getElementById(cfg.tbdId);

    if (tbdCheck) {
      tbdCheck.addEventListener('change', () => {
        updateProfileQtyBadge(profKey);
        if (!tbdCheck.checked && qtyInput) {
          qtyInput.focus();
        }
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('input', () => {
        if (qtyInput.value.trim() && tbdCheck) {
          tbdCheck.checked = false;
        }
        updateProfileQtyBadge(profKey);
      });
    }
  });

  // "Por definir" para Fecha de Inicio y Duración del proyecto
  const startDateInput = document.getElementById('quoteStartDate');
  const startDateTBD = document.getElementById('quoteStartDateTBD');
  if (startDateTBD && startDateInput) {
    startDateTBD.addEventListener('change', () => {
      if (startDateTBD.checked) {
        startDateInput.disabled = true;
        startDateInput.value = '';
      } else {
        startDateInput.disabled = false;
        startDateInput.focus();
      }
    });
    startDateInput.addEventListener('input', () => {
      if (startDateInput.value) startDateTBD.checked = false;
    });
  }

  const durationInput = document.getElementById('quoteDuration');
  const durationTBD = document.getElementById('quoteDurationTBD');
  if (durationTBD && durationInput) {
    durationTBD.addEventListener('change', () => {
      if (durationTBD.checked) {
        durationInput.disabled = true;
        durationInput.value = '';
      } else {
        durationInput.disabled = false;
        durationInput.focus();
      }
    });
    durationInput.addEventListener('input', () => {
      if (durationInput.value.trim()) durationTBD.checked = false;
    });
  }

  // Generación del Resumen Estructurado en Paso 3
  function renderStructuredReview() {
    const reviewContainer = document.getElementById('revContentArea');
    if (!reviewContainer) return;

    const companyVal = document.getElementById('quoteCompany')?.value.trim() || '—';
    const nameVal = document.getElementById('quoteName')?.value.trim() || '—';
    const emailVal = document.getElementById('quoteEmail')?.value.trim() || '—';
    const phoneVal = document.getElementById('quotePhone')?.value.trim() || '—';

    const locVal = document.getElementById('quoteLocation')?.value.trim() || '—';
    const srvSelect = document.getElementById('quoteService');
    const srvVal = (srvSelect && srvSelect.selectedIndex > 0) ? srvSelect.options[srvSelect.selectedIndex].text : (srvSelect?.value || '—');
    const needGuidance = document.getElementById('quoteNeedGuidance')?.checked;

    // Fechas y condiciones
    const startVal = startDateTBD?.checked ? 'Por definir' : (startDateInput?.value || 'Por definir');
    const durVal = durationTBD?.checked ? 'Por definir' : (durationInput?.value.trim() || 'Por definir');
    const shiftsVal = document.getElementById('quoteShifts')?.value || 'Por definir / Estándar';
    const accessChecked = Array.from(document.querySelectorAll('input[name="quoteAccessConditions"]:checked')).map(cb => cb.value);
    const accessStr = accessChecked.length > 0 ? accessChecked.join(', ') : 'Ninguno especial';

    // Perfiles seleccionados
    const checkedProfiles = Array.from(document.querySelectorAll('input[name="quoteProfiles"]:checked')).map(cb => cb.value);
    const profilesSummaryHtml = [];

    checkedProfiles.forEach(prof => {
      const cfg = profileCardMap[prof];
      const card = document.getElementById(cfg?.cardId);
      if (!card) return;

      const qty = document.getElementById(cfg.tbdId)?.checked ? 'Por definir' : (document.getElementById(cfg.qtyId)?.value.trim() || 'Por definir');
      const details = [];

      if (prof === 'Soldadores') {
        const procs = Array.from(card.querySelectorAll('input[name="procSoldadores"]:checked')).map(c => c.value);
        if (procs.length > 0) details.push(`Procesos: ${procs.join(', ')}`);
        const mat = document.getElementById('matSoldadores')?.value.trim();
        if (mat) details.push(`Material: ${mat}`);
        const req = document.getElementById('reqSoldadores')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      } else if (prof === 'Tuberos') {
        const inst = document.getElementById('instTuberos')?.value.trim();
        if (inst) details.push(`Instalación: ${inst}`);
        const mat = document.getElementById('matTuberos')?.value.trim();
        if (mat) details.push(`Material: ${mat}`);
        const iso = document.getElementById('isoTuberos')?.value;
        if (iso && iso !== 'Por definir') details.push(`Lectura isométricas: ${iso}`);
        const req = document.getElementById('reqTuberos')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      } else if (prof === 'Caldereros') {
        const parts = document.getElementById('partsCaldereros')?.value.trim();
        if (parts) details.push(`Piezas: ${parts}`);
        const tasks = document.getElementById('tasksCaldereros')?.value.trim();
        if (tasks) details.push(`Tareas: ${tasks}`);
        const req = document.getElementById('reqCaldereros')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      } else if (prof === 'Mecánicos industriales') {
        const eq = document.getElementById('equipMecanicos')?.value.trim();
        if (eq) details.push(`Equipo: ${eq}`);
        const interv = Array.from(card.querySelectorAll('input[name="intervMecanicos"]:checked')).map(c => c.value);
        if (interv.length > 0) details.push(`Intervención: ${interv.join(', ')}`);
        const req = document.getElementById('reqMecanicos')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      } else if (prof === 'Montadores industriales') {
        const elem = Array.from(card.querySelectorAll('input[name="elemMontadores"]:checked')).map(c => c.value);
        if (elem.length > 0) details.push(`Elementos: ${elem.join(', ')}`);
        const work = document.getElementById('workMontadores')?.value.trim();
        if (work) details.push(`Trabajo: ${work}`);
        const req = document.getElementById('reqMontadores')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      } else if (prof === 'Otro perfil') {
        const name = document.getElementById('nameOtro')?.value.trim();
        if (name) details.push(`Especialidad: ${name}`);
        const desc = document.getElementById('descOtro')?.value.trim();
        if (desc) details.push(`Función: ${desc}`);
        const req = document.getElementById('reqOtro')?.value.trim();
        if (req) details.push(`Requisitos: ${req}`);
      }

      profilesSummaryHtml.push(`
        <div class="review-profile-item">
          <strong>• ${qty} ${prof}</strong>
          ${details.length > 0 ? `<div style="color: var(--color-text-muted); font-size: 0.8rem; margin-top: 0.15rem;">${details.join(' · ')}</div>` : ''}
        </div>
      `);
    });

    // Archivos adjuntos
    const fileCount = uploadedFilesData.length;
    const filesStr = fileCount > 0 
      ? uploadedFilesData.map(f => `${f.name} (${Math.round(f.size / 1024)} KB)`).join(', ') 
      : 'Ningún archivo adjunto';

    // Descripción libre
    const scopeVal = document.getElementById('quoteScope')?.value.trim() || '—';

    // Traducción de títulos de sección del resumen
    const rHead = {
      es: { emp: 'Empresa y Contacto', srv: 'Servicio y Requisitos', loc: 'Ubicación y Planificación', prof: 'Perfiles Profesionales Requeridos', scope: 'Descripción del Trabajo', docs: 'Documentación Adjunta', edit: 'Modificar' },
      en: { emp: 'Company & Contact', srv: 'Service & Requirements', loc: 'Location & Planning', prof: 'Required Trade Profiles', scope: 'Work Description', docs: 'Attached Documentation', edit: 'Edit' },
      fr: { emp: 'Entreprise & Contact', srv: 'Service & Exigences', loc: 'Site & Planning', prof: 'Profils Professionnels Requis', scope: 'Description des Travaux', docs: 'Documents Joints', edit: 'Modifier' },
      it: { emp: 'Azienda & Contatto', srv: 'Servizio & Requisiti', loc: 'Luogo & Pianificazione', prof: 'Profili Professionali Richiesti', scope: 'Descrizione dei Lavori', docs: 'Documentazione Allegata', edit: 'Modifica' },
      de: { emp: 'Unternehmen & Kontakt', srv: 'Leistung & Anforderungen', loc: 'Einsatzort & Planung', prof: 'Benötigtes Fachpersonal', scope: 'Leistungsbeschreibung', docs: 'Angehängte Unterlagen', edit: 'Ändern' }
    }[currentLang] || { emp: 'Empresa y Contacto', srv: 'Servicio y Requisitos', loc: 'Ubicación y Planificación', prof: 'Perfiles Profesionales Requeridos', scope: 'Descripción del Trabajo', docs: 'Documentación Adjunta', edit: 'Modificar' };

    reviewContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        
        <!-- Bloque 1: Empresa -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.emp}</strong>
            <button type="button" class="btn-review-edit" onclick="goToStep(1)">${rHead.edit}</button>
          </div>
          <div><strong>${companyVal}</strong> · ${nameVal} (${emailVal} · ${phoneVal})</div>
        </div>

        <!-- Bloque 2: Servicio y Orientación -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.srv}</strong>
            <button type="button" class="btn-review-edit" onclick="goToStep(2)">${rHead.edit}</button>
          </div>
          <div><strong>${srvVal}</strong></div>
          ${needGuidance ? '<div style="color: var(--color-copper); font-size: 0.8rem; margin-top: 0.2rem;">✓ Solicitado asesoramiento para dimensionar equipo / alcance</div>' : ''}
        </div>

        <!-- Bloque 3: Ubicación y Planificación -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.loc}</strong>
            <button type="button" class="btn-review-edit" onclick="goToStep(2)">${rHead.edit}</button>
          </div>
          <div><strong>Lugar:</strong> ${locVal}</div>
          <div style="color: var(--color-text-muted); font-size: 0.8rem; margin-top: 0.2rem;">
            Inicio: ${startVal} · Duración: ${durVal} · Turnos: ${shiftsVal} · Accesos: ${accessStr}
          </div>
        </div>

        <!-- Bloque 4: Perfiles Seleccionados (si aplica) -->
        ${profilesSummaryHtml.length > 0 ? `
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.prof}</strong>
            <button type="button" class="btn-review-edit" onclick="goToStep(2)">${rHead.edit}</button>
          </div>
          ${profilesSummaryHtml.join('')}
        </div>
        ` : ''}

        <!-- Bloque 5: Descripción libre -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.scope}</strong>
            <button type="button" class="btn-review-edit" onclick="document.getElementById('quoteScope').focus()">${rHead.edit}</button>
          </div>
          <div style="white-space: pre-wrap; font-size: 0.82rem; color: var(--color-text-body); max-height: 120px; overflow-y: auto;">${scopeVal}</div>
        </div>

        <!-- Bloque 6: Documentos -->
        <div style="background: #FFFFFF; border: 1px solid var(--color-steel-border); border-radius: 4px; padding: 0.65rem 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="color: var(--color-petrol); font-size: 0.84rem;">${rHead.docs}</strong>
            <button type="button" class="btn-review-edit" onclick="document.getElementById('quoteFiles').focus()">${rHead.edit}</button>
          </div>
          <div style="font-size: 0.82rem; color: var(--color-text-muted);">${filesStr}</div>
        </div>

      </div>
    `;
  }

  function goToStep(step) {
    if (step < 1 || step > 3) return;
    currentStep = step;

    stepPanes.forEach((pane, idx) => {
      if (pane) {
        pane.classList.toggle('is-visible', idx === (step - 1));
      }
    });

    stepTabs.forEach((tab, idx) => {
      if (tab) {
        tab.classList.toggle('is-active', idx === (step - 1));
        tab.classList.toggle('is-completed', idx < (step - 1));
        tab.setAttribute('aria-selected', idx === (step - 1) ? 'true' : 'false');
      }
    });

    // Actualizar resumen estructurado en Paso 3
    if (step === 3) {
      renderStructuredReview();
    }
  }

  window.goToStep = goToStep;

  function validateStep(step) {
    let isValid = true;

    function checkField(id, errorId, msg) {
      const el = document.getElementById(id);
      const errEl = document.getElementById(errorId);
      if (!el) return true;
      const val = el.value.trim();
      if (!val) {
        if (errEl) errEl.textContent = msg;
        el.style.borderColor = '#C53030';
        isValid = false;
        return false;
      } else {
        if (errEl) errEl.textContent = '';
        el.style.borderColor = '';
        return true;
      }
    }

    if (step === 1) {
      if (!checkField('quoteCompany', 'err-quoteCompany', t.errQuoteCompany)) isValid = false;
      if (!checkField('quoteName', 'err-quoteName', t.errQuoteName)) isValid = false;
      
      const emailEl = document.getElementById('quoteEmail');
      const emailErr = document.getElementById('err-quoteEmail');
      if (emailEl) {
        const val = emailEl.value.trim();
        if (!val || !val.includes('@') || !val.includes('.')) {
          if (emailErr) emailErr.textContent = t.errQuoteEmail;
          emailEl.style.borderColor = '#C53030';
          isValid = false;
        } else {
          if (emailErr) emailErr.textContent = '';
          emailEl.style.borderColor = '';
        }
      }

      if (!checkField('quotePhone', 'err-quotePhone', t.errQuotePhone)) isValid = false;
    }

    if (step === 2) {
      if (!checkField('quoteLocation', 'err-quoteLocation', t.errQuoteLocation)) isValid = false;
      
      const srvEl = document.getElementById('quoteService');
      const srvErr = document.getElementById('err-quoteService');
      if (srvEl) {
        if (!srvEl.value) {
          if (srvErr) srvErr.textContent = t.errQuoteService;
          srvEl.style.borderColor = '#C53030';
          isValid = false;
        } else {
          if (srvErr) srvErr.textContent = '';
          srvEl.style.borderColor = '';
        }
      }
      // NOTA: Requisitos técnicos, perfiles y fechas son OPCIONALES para no bloquear la consulta
    }

    return isValid;
  }

  // Botones de navegación del Wizard
  document.getElementById('btnWizardNext1')?.addEventListener('click', () => {
    if (validateStep(1)) goToStep(2);
  });

  document.getElementById('btnWizardPrev2')?.addEventListener('click', () => {
    goToStep(1);
  });

  document.getElementById('btnWizardNext2')?.addEventListener('click', () => {
    if (validateStep(2)) goToStep(3);
  });

  document.getElementById('btnWizardPrev3')?.addEventListener('click', () => {
    goToStep(2);
  });

  stepTabs.forEach((tab, idx) => {
    tab?.addEventListener('click', () => {
      const targetStep = idx + 1;
      if (targetStep < currentStep) {
        goToStep(targetStep);
      } else if (targetStep === currentStep + 1 && validateStep(currentStep)) {
        goToStep(targetStep);
      }
    });
  });

  // Gestión de archivos adjuntos con Base64 y validación de tipos/tamaño
  const fileInput = document.getElementById('quoteFiles');
  const fileDropZone = document.getElementById('fileDropZone');
  const fileDropText = document.getElementById('fileDropText');
  let uploadedFilesData = [];

  const ALLOWED_EXTS = ['.pdf', '.dwg', '.dxf', '.zip', '.rar', '.png', '.jpg', '.jpeg'];
  const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB

  if (fileInput && fileDropZone) {
    fileInput.addEventListener('change', async () => {
      uploadedFilesData = [];
      const files = Array.from(fileInput.files || []);

      if (files.length === 0) {
        fileDropText.textContent = t.quoteDropDefault;
        fileDropZone.style.borderColor = '';
        return;
      }

      let totalSize = 0;
      const validFiles = [];
      const rejectedFiles = [];

      for (const file of files) {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTS.includes(ext)) {
          rejectedFiles.push(file.name + ' (formato no admitido)');
          continue;
        }
        totalSize += file.size;
        validFiles.push(file);
      }

      if (totalSize > MAX_TOTAL_SIZE) {
        alert('El tamaño total de los archivos supera el límite de 25 MB.');
        fileInput.value = '';
        fileDropText.textContent = t.quoteDropDefault;
        fileDropZone.style.borderColor = '#C53030';
        return;
      }

      if (rejectedFiles.length > 0) {
        alert('Se omitieron los siguientes archivos no admitidos:\n' + rejectedFiles.join('\n'));
      }

      // Leer archivos como Base64 para que el servidor los almacene
      for (const file of validFiles) {
        try {
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          uploadedFilesData.push({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream',
            base64: base64Data
          });
        } catch(e) {
          uploadedFilesData.push({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream'
          });
        }
      }

      const totalKb = Math.round(totalSize / 1024);
      const namesList = uploadedFilesData.map(f => f.name).join(', ');
      fileDropText.innerHTML = `<strong>${uploadedFilesData.length} ${t.filesSelected}</strong> (${totalKb} KB)<br><span style="font-size: 0.8rem; color: var(--color-petrol);">${namesList}</span>`;
      fileDropZone.style.borderColor = 'var(--color-copper)';

      if (currentStep === 3) renderStructuredReview();
    });
  }

  // Envío final del Formulario A (Clientes)
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const btnQuoteSubmit = document.getElementById('btnQuoteSubmit');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateStep(1)) { goToStep(1); return; }
      if (!validateStep(2)) { goToStep(2); return; }

      const scopeEl = document.getElementById('quoteScope');
      const scopeErr = document.getElementById('err-quoteScope');
      if (!scopeEl?.value.trim()) {
        if (scopeErr) scopeErr.textContent = t.errQuoteScope;
        scopeEl.style.borderColor = '#C53030';
        return;
      } else {
        if (scopeErr) scopeErr.textContent = '';
        scopeEl.style.borderColor = '';
      }

      const privCheck = document.getElementById('quotePrivacy');
      const privErr = document.getElementById('err-quotePrivacy');
      if (!privCheck?.checked) {
        if (privErr) privErr.textContent = t.errQuotePrivacy;
        return;
      } else {
        if (privErr) privErr.textContent = '';
      }

      // Recopilar servicio y campos específicos activos
      const serviceVal = quoteServiceSelect?.value || '';
      const serviceKey = getServiceKey(serviceVal);
      const serviceDetails = {};

      const activePanel = document.querySelector(`.service-conditional-panel[data-service-key="${serviceKey}"]`);
      if (activePanel) {
        activePanel.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea, select').forEach(el => {
          if (el.value && el.value.trim() && el.name) {
            serviceDetails[el.name] = el.value.trim();
          }
        });
        activePanel.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked').forEach(el => {
          if (el.name) {
            if (!serviceDetails[el.name]) serviceDetails[el.name] = [];
            if (Array.isArray(serviceDetails[el.name])) serviceDetails[el.name].push(el.value);
            else serviceDetails[el.name] = [serviceDetails[el.name], el.value];
          }
        });
      }

      // Recopilar perfiles detallados
      const checkedProfiles = Array.from(document.querySelectorAll('input[name="quoteProfiles"]:checked')).map(cb => cb.value);
      const profileDetails = [];

      checkedProfiles.forEach(prof => {
        const cfg = profileCardMap[prof];
        const card = document.getElementById(cfg?.cardId);
        if (!card) return;

        const isTbd = document.getElementById(cfg.tbdId)?.checked;
        const qtyVal = isTbd ? 'Por definir' : (document.getElementById(cfg.qtyId)?.value.trim() || 'Por definir');

        const profObj = {
          profile: prof,
          quantity: qtyVal,
          isQuantityTBD: Boolean(isTbd),
          specs: {}
        };

        if (prof === 'Soldadores') {
          profObj.specs.processes = Array.from(card.querySelectorAll('input[name="procSoldadores"]:checked')).map(c => c.value);
          profObj.specs.material = document.getElementById('matSoldadores')?.value.trim() || '';
          profObj.specs.requirements = document.getElementById('reqSoldadores')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsSoldadores')?.value.trim() || '';
        } else if (prof === 'Tuberos') {
          profObj.specs.installation = document.getElementById('instTuberos')?.value.trim() || '';
          profObj.specs.material = document.getElementById('matTuberos')?.value.trim() || '';
          profObj.specs.isometrics = document.getElementById('isoTuberos')?.value || '';
          profObj.specs.requirements = document.getElementById('reqTuberos')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsTuberos')?.value.trim() || '';
        } else if (prof === 'Caldereros') {
          profObj.specs.parts = document.getElementById('partsCaldereros')?.value.trim() || '';
          profObj.specs.tasks = document.getElementById('tasksCaldereros')?.value.trim() || '';
          profObj.specs.requirements = document.getElementById('reqCaldereros')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsCaldereros')?.value.trim() || '';
        } else if (prof === 'Mecánicos industriales') {
          profObj.specs.equipment = document.getElementById('equipMecanicos')?.value.trim() || '';
          profObj.specs.interventions = Array.from(card.querySelectorAll('input[name="intervMecanicos"]:checked')).map(c => c.value);
          profObj.specs.requirements = document.getElementById('reqMecanicos')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsMecanicos')?.value.trim() || '';
        } else if (prof === 'Montadores industriales') {
          profObj.specs.elements = Array.from(card.querySelectorAll('input[name="elemMontadores"]:checked')).map(c => c.value);
          profObj.specs.work = document.getElementById('workMontadores')?.value.trim() || '';
          profObj.specs.requirements = document.getElementById('reqMontadores')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsMontadores')?.value.trim() || '';
        } else if (prof === 'Otro perfil') {
          profObj.specs.name = document.getElementById('nameOtro')?.value.trim() || '';
          profObj.specs.description = document.getElementById('descOtro')?.value.trim() || '';
          profObj.specs.requirements = document.getElementById('reqOtro')?.value.trim() || '';
          profObj.specs.observations = document.getElementById('obsOtro')?.value.trim() || '';
        }

        profileDetails.push(profObj);
      });

      // Información común del proyecto
      const startDateVal = startDateTBD?.checked ? 'Por definir' : (startDateInput?.value || '');
      const durationVal = durationTBD?.checked ? 'Por definir' : (durationInput?.value.trim() || '');
      const accessChecked = Array.from(document.querySelectorAll('input[name="quoteAccessConditions"]:checked')).map(cb => cb.value);

      const payload = {
        company: document.getElementById('quoteCompany')?.value.trim(),
        name: document.getElementById('quoteName')?.value.trim(),
        email: document.getElementById('quoteEmail')?.value.trim(),
        phone: document.getElementById('quotePhone')?.value.trim(),
        location: document.getElementById('quoteLocation')?.value.trim(),
        service: serviceVal,
        serviceKey: serviceKey,
        serviceDetails: serviceDetails,
        profiles: checkedProfiles,
        profileDetails: profileDetails,
        needGuidance: Boolean(document.getElementById('quoteNeedGuidance')?.checked),
        projectTiming: {
          startDate: startDateVal,
          startDateTBD: Boolean(startDateTBD?.checked),
          duration: durationVal,
          durationTBD: Boolean(durationTBD?.checked),
          shifts: document.getElementById('quoteShifts')?.value || '',
          accessConditions: accessChecked
        },
        staff: checkedProfiles.length > 0 ? profileDetails.map(p => `${p.quantity} ${p.profile}`).join(', ') : '',
        duration: durationVal,
        startDate: startDateVal,
        scope: scopeEl.value.trim(),
        files: uploadedFilesData,
        privacy: true,
        lang: currentLang
      };

      if (btnQuoteSubmit) {
        btnQuoteSubmit.disabled = true;
        btnQuoteSubmit.textContent = t.quoteSubmitting;
      }

      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (formErrorAlert) formErrorAlert.style.display = 'none';
          if (formSuccessAlert) {
            formSuccessAlert.innerHTML = `
              <strong>${t.quoteSuccessTitle} ${result.reference}</strong><br>
              ${t.quoteSuccessBody}<br>
              <p style="font-size: 0.85rem; color: #1E4620; margin-top: 0.5rem;">
                ${result.message || ''}
              </p>
              <div style="margin-top: 0.85rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button type="button" id="copyRefBtn" class="btn btn-sm btn-secondary">${t.copyRefBtn}</button>
                <button type="button" id="closeModalAfterSuccess" class="btn btn-sm btn-primary" onclick="closeQuoteModal()">${t.closeWindowBtn}</button>
              </div>
            `;
            formSuccessAlert.style.display = 'block';
            formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            document.getElementById('copyRefBtn')?.addEventListener('click', () => {
              navigator.clipboard.writeText(result.reference).then(() => {
                alert(`${t.refCopiedAlert} ${result.reference}`);
              });
            });
          }
          quoteForm.reset();
          uploadedFilesData = [];
          if (fileDropText) fileDropText.textContent = t.quoteDropDefault;
          if (fileDropZone) fileDropZone.style.borderColor = '';
          updateServicePanels();
        } else {
          throw new Error(result.error || 'Error');
        }
      } catch (err) {
        if (formErrorAlert) {
          const mailtoFallback = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(t.quoteErrorSubject + payload.company)}&body=${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
          formErrorAlert.innerHTML = `
            <strong>${t.quoteConnTitle}</strong> ${t.quoteConnBody}
            <div style="margin-top: 0.5rem;">
              <a href="${mailtoFallback}" class="btn btn-sm btn-primary">${t.sendDirectEmailBtn}</a>
            </div>
          `;
          formErrorAlert.style.display = 'block';
          formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        if (btnQuoteSubmit) {
          btnQuoteSubmit.disabled = false;
          btnQuoteSubmit.textContent = t.quoteSubmitBtn;
        }
      }
    });
  }

  /* ==========================================================================
     7. FORMULARIO B: CANAL DE CANDIDATURAS TÉCNICAS (#candidatura)
     ========================================================================== */
  const candidateForm = document.getElementById('candidateForm');
  const candSuccessAlert = document.getElementById('candSuccessAlert');
  const candErrorAlert = document.getElementById('candErrorAlert');
  const btnCandSubmit = document.getElementById('btnCandSubmit');
  const candCvInput = document.getElementById('candCv');
  const candCvDropZone = document.getElementById('candCvDropZone');
  const candCvDropText = document.getElementById('candCvDropText');

  if (candCvInput && candCvDropZone && candCvDropText) {
    candCvInput.addEventListener('change', () => {
      if (candCvInput.files.length > 0) {
        const fileNames = Array.from(candCvInput.files).map(f => f.name).join(', ');
        candCvDropText.innerHTML = `<strong>${candCvInput.files.length} ${t.filesSelected}</strong><br><span style="font-size: 0.8rem; color: var(--color-petrol);">${fileNames}</span>`;
        candCvDropZone.style.borderColor = 'var(--color-copper)';
      } else {
        candCvDropText.textContent = t.candDropDefault;
        candCvDropZone.style.borderColor = '';
      }
    });
  }

  if (candidateForm) {
    candidateForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('candName')?.value.trim();
      const contact = document.getElementById('candContact')?.value.trim();
      const specialty = document.getElementById('candSpecialty')?.value;
      const residence = document.getElementById('candResidence')?.value.trim();
      const mobility = document.getElementById('candMobility')?.value;
      const languages = document.getElementById('candLanguages')?.value.trim();
      const certifications = document.getElementById('candCertifications')?.value.trim();
      const summary = document.getElementById('candSummary')?.value.trim();

      let hasError = false;

      function markErr(id, errId, msg) {
        const el = document.getElementById(id);
        const errEl = document.getElementById(errId);
        if (!el) return;
        if (!el.value.trim()) {
          if (errEl) errEl.textContent = msg;
          el.style.borderColor = '#C53030';
          hasError = true;
        } else {
          if (errEl) errEl.textContent = '';
          el.style.borderColor = '';
        }
      }

      markErr('candName', 'err-candName', t.errCandName);
      markErr('candContact', 'err-candContact', t.errCandContact);
      
      const specEl = document.getElementById('candSpecialty');
      const specErr = document.getElementById('err-candSpecialty');
      if (!specEl?.value) {
        if (specErr) specErr.textContent = t.errCandSpecialty;
        specEl.style.borderColor = '#C53030';
        hasError = true;
      } else {
        if (specErr) specErr.textContent = '';
        specEl.style.borderColor = '';
      }

      markErr('candResidence', 'err-candResidence', t.errCandResidence);

      const privCheck = document.getElementById('candPrivacy');
      const privErr = document.getElementById('err-candPrivacy');
      if (!privCheck?.checked) {
        if (privErr) privErr.textContent = t.errCandPrivacy;
        hasError = true;
      } else {
        if (privErr) privErr.textContent = '';
      }

      if (hasError) return;

      const payload = {
        name,
        contact,
        specialty,
        residence,
        mobility,
        languages,
        certifications,
        experienceSummary: summary,
        hasCv: !!document.getElementById('candCv')?.files?.length,
        privacy: true
      };

      if (btnCandSubmit) {
        btnCandSubmit.disabled = true;
        btnCandSubmit.textContent = t.candSubmitting;
      }

      try {
        const response = await fetch('/api/candidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (candErrorAlert) candErrorAlert.style.display = 'none';
          if (candSuccessAlert) {
            candSuccessAlert.innerHTML = `
              <strong>${t.candSuccessTitle} ${result.reference}</strong><br>
              ${t.candSuccessBody}<br>
              <p style="font-size: 0.85rem; color: #1E4620; margin-top: 0.5rem;">
                ${result.message || ''}
              </p>
            `;
            candSuccessAlert.style.display = 'block';
            candSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          candidateForm.reset();
        } else {
          throw new Error(result.error || 'Error');
        }
      } catch (err) {
        if (candErrorAlert) {
          candErrorAlert.textContent = t.candConnError;
          candErrorAlert.style.display = 'block';
        }
      } finally {
        if (btnCandSubmit) {
          btnCandSubmit.disabled = false;
          btnCandSubmit.textContent = t.candSubmitBtn;
        }
      }
    });
  }

  /* ==========================================================================
     8. WHATSAPP Y MODALES LEGALES (5 IDIOMAS)
     ========================================================================== */
  const whatsappTriggers = document.querySelectorAll('[data-action="whatsapp"]');
  whatsappTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (CONFIG.whatsappNumber) {
        const text = encodeURIComponent(t.whatsappDefaultText);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
      } else {
        openLegalModal('whatsappNotice');
      }
    });
  });

  const legalModalBackdrop = document.getElementById('legalModalBackdrop');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalBody = document.getElementById('legalModalBody');
  const legalModalClose = document.getElementById('legalModalClose');
  const legalModalOk = document.getElementById('legalModalOk');
  const legalTriggers = document.querySelectorAll('[data-legal-modal]');

  const LEGAL_CONTENT_I18N = {
    es: {
      avisoLegal: {
        title: 'Aviso Legal e Información Corporativa',
        content: `
          <h4>1. Identificación y Reserva de Denominación</h4>
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):</p>
          <ul>
            <li><strong>Denominación social reservada:</strong> Hexagon Montajes Industriales, S.L.</li>
            <li><strong>Actividad corporativa:</strong> Ejecución de montajes, mantenimiento técnico, soldadura homologada, tubería industrial y calderería en planta.</li>
            <li><strong>Contacto técnico y administrativo:</strong> contacto@montajeshexagon.com | +34 900 123 456.</li>
          </ul>
          <h4>2. Objeto de la Actividad y Naturaleza de los Servicios</h4>
          <p>Hexagon Montajes Industriales, S.L. tiene como objeto la ejecución de servicios industriales especializados mediante equipos propios en las instalaciones de sus clientes en España y la Unión Europea.</p>
          <p><strong>Compromiso operativo y contractual:</strong> Hexagon actúa como empresa contratista de ejecución técnica de obras y servicios industriales con medios, supervisión y organización propios, respondiendo de la calidad y cumplimiento en cada proyecto.</p>
        `
      },
      privacidad: {
        title: 'Política de Privacidad y Protección de Datos',
        content: `
          <h4>1. Responsable del Tratamiento</h4>
          <p>El responsable del tratamiento de los datos es <strong>Hexagon Montajes Industriales, S.L.</strong>, correo electrónico: <strong>contacto@montajeshexagon.com</strong>.</p>
          <h4>2. Finalidades Diferenciadas del Tratamiento</h4>
          <ul>
            <li><strong>Formulario de Clientes / Presupuestos:</strong> Valoración técnica de peticiones de oferta, análisis de planos y emisión de propuestas económicas bajo medidas precontractuales (Art. 6.1.b RGPD).</li>
            <li><strong>Formulario de Trabajadores / Candidaturas:</strong> Gestión interna de procesos de selección y contratación directa para incorporación a la plantilla técnica de la empresa (Art. 6.1.a RGPD). No se ceden datos a empresas de trabajo temporal ni agencias externas.</li>
          </ul>
          <h4>3. Derechos del Interesado</h4>
          <p>Puede ejercitar sus derechos de acceso, rectificación, supresión y limitación escribiendo a <strong>contacto@montajeshexagon.com</strong>.</p>
        `
      },
      whatsappNotice: {
        title: 'Canal de Comunicación WhatsApp',
        content: `
          <h4>Asistencia Técnica y Comercial</h4>
          <p>Para solicitar presupuestos urgentes, paradas técnicas o enviar su candidatura profesional, utilice los formularios directos de la página o escriba a:</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--color-petrol); background: var(--color-warm-bg); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--color-copper);">
            contacto@montajeshexagon.com
          </p>
        `
      }
    },
    en: {
      avisoLegal: {
        title: 'Legal Notice & Corporate Information',
        content: `
          <h4>1. Corporate Identification</h4>
          <p>In compliance with applicable European and Spanish regulations on Information Society Services and Electronic Commerce (LSSI-CE):</p>
          <ul>
            <li><strong>Corporate Name:</strong> Hexagon Montajes Industriales, S.L.</li>
            <li><strong>Corporate Activity:</strong> Industrial assembly, plant maintenance, certified welding, industrial piping, and boilermaking.</li>
            <li><strong>Technical & Administrative Contact:</strong> contacto@montajeshexagon.com | +34 900 123 456.</li>
          </ul>
          <h4>2. Scope of Activity & Nature of Services</h4>
          <p>Hexagon Montajes Industriales, S.L. executes specialized industrial services using its own in-house teams at client facilities across Spain and the European Union.</p>
          <p><strong>Operational & Contractual Commitment:</strong> Hexagon acts as an industrial engineering and execution contractor with its own resources, supervision, and technical management, ensuring quality and safety compliance on every project.</p>
        `
      },
      privacidad: {
        title: 'Privacy & Data Protection Policy',
        content: `
          <h4>1. Data Controller</h4>
          <p>The data controller is <strong>Hexagon Montajes Industriales, S.L.</strong>, contact email: <strong>contacto@montajeshexagon.com</strong>.</p>
          <h4>2. Purposes of Data Processing</h4>
          <ul>
            <li><strong>Client / Quote Request Form:</strong> Technical evaluation of tender requests, drawing analysis, and issuance of commercial proposals under pre-contractual measures (Art. 6.1.b GDPR).</li>
            <li><strong>Professional / Application Form:</strong> Internal management of direct recruitment processes for integration into the company’s technical workforce (Art. 6.1.a GDPR). Data is never shared with temporary staffing agencies.</li>
          </ul>
          <h4>3. Data Subject Rights</h4>
          <p>You may exercise your rights of access, rectification, erasure, and restriction by writing to <strong>contacto@montajeshexagon.com</strong>.</p>
        `
      },
      whatsappNotice: {
        title: 'WhatsApp Communication Channel',
        content: `
          <h4>Technical & Commercial Assistance</h4>
          <p>To request urgent quotes, planned shutdown support, or submit your professional application, please use the direct forms on this page or write to:</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--color-petrol); background: var(--color-warm-bg); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--color-copper);">
            contacto@montajeshexagon.com
          </p>
        `
      }
    },
    it: {
      avisoLegal: {
        title: 'Note Legali e Informazioni Societarie',
        content: `
          <h4>1. Identificazione Societaria</h4>
          <p>In conformità alla normativa europea e spagnola sui Servizi della Società dell’Informazione e del Commercio Elettronico (LSSI-CE):</p>
          <ul>
            <li><strong>Ragione Sociale:</strong> Hexagon Montajes Industriales, S.L.</li>
            <li><strong>Attività Societaria:</strong> Montaggi industriali, manutenzione tecnica d’impianto, saldatura certificata, piping industriale e carpenteria.</li>
            <li><strong>Contatto Tecnico e Amministrativo:</strong> contacto@montajeshexagon.com | +34 900 123 456.</li>
          </ul>
          <h4>2. Oggetto dell’Attività e Natura dei Servizi</h4>
          <p>Hexagon Montajes Industriales, S.L. esegue servizi industriali specializzati mediante squadre proprie presso gli stabilimenti dei propri clienti in Spagna e nell’Unione Europea.</p>
          <p><strong>Impegno Operativo e Contrattuale:</strong> Hexagon opera come impresa appaltatrice di esecuzione tecnica di opere e servizi industriali con mezzi, supervisione e organizzazione propri.</p>
        `
      },
      privacidad: {
        title: 'Informativa sulla Privacy e Protezione dei Dati',
        content: `
          <h4>1. Titolare del Trattamento</h4>
          <p>Il titolare del trattamento dei dati è <strong>Hexagon Montajes Industriales, S.L.</strong>, email: <strong>contacto@montajeshexagon.com</strong>.</p>
          <h4>2. Finalità del Trattamento</h4>
          <ul>
            <li><strong>Modulo Clienti / Preventivi:</strong> Valutazione tecnica delle richieste d’offerta, analisi dei disegni ed emissione di proposte commerciali nell’ambito di misure precontrattuali (Art. 6.1.b GDPR).</li>
            <li><strong>Modulo Professionisti / Candidature:</strong> Gestione interna dei processi di selezione e assunzione diretta nell’organico tecnico aziendale (Art. 6.1.a GDPR). I dati non vengono ceduti ad agenzie interinali.</li>
          </ul>
          <h4>3. Diritti dell’Interessato</h4>
          <p>È possibile esercitare i diritti di accesso, rettifica, cancellazione e limitazione scrivendo a <strong>contacto@montajeshexagon.com</strong>.</p>
        `
      },
      whatsappNotice: {
        title: 'Canale di Comunicazione WhatsApp',
        content: `
          <h4>Assistenza Tecnica e Commerciale</h4>
          <p>Per richiedere preventivi urgenti, fermate tecniche o inviare la propria candidatura professionale, utilizzare i moduli diretti presenti nella pagina o scrivere a:</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--color-petrol); background: var(--color-warm-bg); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--color-copper);">
            contacto@montajeshexagon.com
          </p>
        `
      }
    },
    fr: {
      avisoLegal: {
        title: 'Mentions Légales et Informations Corporatives',
        content: `
          <h4>1. Identification de l’Entreprise</h4>
          <p>Conformément à la réglementation européenne et espagnole relative aux Services de la Société de l’Information et du Commerce Électronique (LSSI-CE) :</p>
          <ul>
            <li><strong>Raison Sociale :</strong> Hexagon Montajes Industriales, S.L.</li>
            <li><strong>Activité :</strong> Montage industriel, maintenance technique sur site, soudure homologuée, tuyauterie industrielle et chaudronnerie.</li>
            <li><strong>Contact Technique et Administratif :</strong> contacto@montajeshexagon.com | +34 900 123 456.</li>
          </ul>
          <h4>2. Objet de l’Activité et Nature des Services</h4>
          <p>Hexagon Montajes Industriales, S.L. a pour objet l’exécution de services industriels spécialisés par ses propres équipes sur les sites de ses clients en Espagne et dans l’Union européenne.</p>
          <p><strong>Engagement Opérationnel et Contractuel :</strong> Hexagon agit en tant qu’entreprise contractante d’exécution technique de travaux et services industriels avec ses propres moyens, sa supervision et son organisation.</p>
        `
      },
      privacidad: {
        title: 'Politique de Confidentialité et Protection des Données',
        content: `
          <h4>1. Responsable du Traitement</h4>
          <p>Le responsable du traitement des données est <strong>Hexagon Montajes Industriales, S.L.</strong>, courriel : <strong>contacto@montajeshexagon.com</strong>.</p>
          <h4>2. Finalités du Traitement</h4>
          <ul>
            <li><strong>Formulaire Clients / Devis :</strong> Évaluation technique des demandes d’offres, analyse de plans et émission de propositions commerciales dans le cadre de mesures précontractuelles (Art. 6.1.b RGPD).</li>
            <li><strong>Formulaire Professionnels / Candidatures :</strong> Gestion interne des processus de sélection et de recrutement direct au sein de l’effectif technique de l’entreprise (Art. 6.1.a RGPD). Aucune donnée n’est cédée à des agences d’intérim.</li>
          </ul>
          <h4>3. Droits de la Personne Concernée</h4>
          <p>Vous pouvez exercer vos droits d’accès, de rectification, de suppression et de limitation en écrivant à <strong>contacto@montajeshexagon.com</strong>.</p>
        `
      },
      whatsappNotice: {
        title: 'Canal de Communication WhatsApp',
        content: `
          <h4>Assistance Technique et Commerciale</h4>
          <p>Pour demander un devis urgent, planifier un arrêt technique ou envoyer votre candidature professionnelle, veuillez utiliser les formulaires directs de la page ou écrire à :</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--color-petrol); background: var(--color-warm-bg); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--color-copper);">
            contacto@montajeshexagon.com
          </p>
        `
      }
    },
    de: {
      avisoLegal: {
        title: 'Impressum & Unternehmensinformationen',
        content: `
          <h4>1. Unternehmensangaben</h4>
          <p>Gemäß den geltenden europäischen und spanischen Vorschriften über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr (LSSI-CE):</p>
          <ul>
            <li><strong>Firmenname:</strong> Hexagon Montajes Industriales, S.L.</li>
            <li><strong>Unternehmensgegenstand:</strong> Industriemontage, technische Anlageninstandhaltung, zertifizierte Schweißtechnik, Industrielles Piping und Kesselbau.</li>
            <li><strong>Technischer & Administrativer Kontakt:</strong> contacto@montajeshexagon.com | +34 900 123 456.</li>
          </ul>
          <h4>2. Tätigkeitsbereich & Art der Dienstleistungen</h4>
          <p>Die Hexagon Montajes Industriales, S.L. führt spezialisierte Industriedienstleistungen mit eigenen Fachteams in den Werken ihrer Kunden in Spanien und der Europäischen Union aus.</p>
          <p><strong>Operative & Vertragliche Verpflichtung:</strong> Hexagon handelt als technisches Ausführungs- und Werkvertragsunternehmen mit eigenen Mitteln, eigener Bauleitung und Organisation.</p>
        `
      },
      privacidad: {
        title: 'Datenschutzerklärung',
        content: `
          <h4>1. Verantwortlicher für die Datenverarbeitung</h4>
          <p>Verantwortlicher für die Datenverarbeitung ist die <strong>Hexagon Montajes Industriales, S.L.</strong>, E-Mail: <strong>contacto@montajeshexagon.com</strong>.</p>
          <h4>2. Zwecke der Datenverarbeitung</h4>
          <ul>
            <li><strong>Kunden- / Angebotsformular:</strong> Technische Bewertung von Angebotsanfragen, Zeichnungsanalyse und Erstellung wirtschaftlicher Angebote im Rahmen vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).</li>
            <li><strong>Bewerberformular:</strong> Interne Verwaltung von Auswahl- und Direktrekrutierungsverfahren zur Aufnahme in das technische Stammpersonal des Unternehmens (Art. 6 Abs. 1 lit. a DSGVO). Es erfolgt keine Weitergabe an Zeitarbeitsfirmen.</li>
          </ul>
          <h4>3. Rechte der betroffenen Person</h4>
          <p>Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung jederzeit per E-Mail an <strong>contacto@montajeshexagon.com</strong> geltend machen.</p>
        `
      },
      whatsappNotice: {
        title: 'WhatsApp-Kommunikationskanal',
        content: `
          <h4>Technische & Kaufmännische Unterstützung</h4>
          <p>Um dringende Angebote oder Anlagenstillstände anzufragen oder Ihre Bewerbung einzureichen, nutzen Sie bitte die direkten Formulare auf dieser Seite oder schreiben Sie an:</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--color-petrol); background: var(--color-warm-bg); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--color-copper);">
            contacto@montajeshexagon.com
          </p>
        `
      }
    }
  };

  const LEGAL_CONTENT = LEGAL_CONTENT_I18N[currentLang] || LEGAL_CONTENT_I18N.es;

  function openLegalModal(key) {
    const data = LEGAL_CONTENT[key];
    if (!data || !legalModalBackdrop) return;
    if (legalModalTitle) legalModalTitle.textContent = data.title;
    if (legalModalBody) legalModalBody.innerHTML = data.content;
    legalModalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    if (!legalModalBackdrop) return;
    legalModalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  legalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute('data-legal-modal');
      openLegalModal(modalKey);
    });
  });

  legalModalClose?.addEventListener('click', closeLegalModal);
  legalModalOk?.addEventListener('click', closeLegalModal);
  legalModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === legalModalBackdrop) closeLegalModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModalBackdrop?.classList.contains('is-active')) {
      closeLegalModal();
    }
  });

  
});


/* ==========================================================================
   NAVIGATION, ACCORDION AND PARADAS EXPLAINER CONTROLLERS
   ========================================================================== */
window.openEspecialidadItem = function(itemOrId) {
  const el = typeof itemOrId === 'string' ? document.getElementById(itemOrId) : itemOrId;
  if (!el) return null;

  // Make sure parent section is visible
  const sec = el.closest('.section-especialidades-tecnicas');
  if (sec) sec.classList.add('is-visible');

  // Close any other open accordion items
  const allItems = document.querySelectorAll('.especialidades-item');
  allItems.forEach(item => {
    if (item !== el && item.classList.contains('is-open')) {
      item.classList.remove('is-open');
      const hdr = item.querySelector('.especialidades-item-header');
      const icn = item.querySelector('.especialidades-item-icon');
      if (hdr) hdr.setAttribute('aria-expanded', 'false');
      if (icn) icn.textContent = '+';
    }
  });

  // Open target item
  el.classList.add('is-open');
  const header = el.querySelector('.especialidades-item-header');
  const icon = el.querySelector('.especialidades-item-icon');
  if (header) header.setAttribute('aria-expanded', 'true');
  if (icon) icon.textContent = '−';

  return el;
};

window.toggleParadasExplainer = function() {};

window.scrollToElementWithOffset = function(targetEl, customOffset = 18) {
  if (!targetEl) return;

  // Close mobile drawer if open
  const drawer = document.getElementById('mobileDrawer');
  const toggle = document.getElementById('menuToggle');
  if (drawer && drawer.classList.contains('is-open')) {
    drawer.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('has-modal-open');
    document.body.style.overflow = '';
  }

  // Calculate actual header height
  const header = document.getElementById('siteHeader') || document.querySelector('.header-main') || document.getElementById('headerMain');
  const headerHeight = header ? header.offsetHeight : 92;
  const totalOffset = headerHeight + customOffset;

  // Use requestAnimationFrame for smooth layout adjustment
  requestAnimationFrame(() => {
    const rect = targetEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - totalOffset;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
};

// Click delegation on document
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const rawHref = anchor.getAttribute('href');
  if (!rawHref || rawHref === '#') return;

  // Check if legal modal link
  if (anchor.hasAttribute('data-legal-modal')) return;

  // Check if quote modal button
  if (anchor.getAttribute('data-action') === 'open-quote-modal') {
    e.preventDefault();
    // Close mobile drawer if open
    const drawer = document.getElementById('mobileDrawer');
    const toggle = document.getElementById('menuToggle');
    if (drawer && drawer.classList.contains('is-open')) {
      drawer.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('has-modal-open');
      document.body.style.overflow = '';
    }
    const sName = anchor.getAttribute('data-service') || anchor.getAttribute('data-service-target');
    window.openQuoteModal(sName ? { service: sName } : undefined);
    return;
  }

  // Check if candidacy modal button
  if (anchor.getAttribute('data-action') === 'open-candidacy-modal') {
    e.preventDefault();
    // Close mobile drawer if open
    const drawer = document.getElementById('mobileDrawer');
    const toggle = document.getElementById('menuToggle');
    if (drawer && drawer.classList.contains('is-open')) {
      drawer.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('has-modal-open');
      document.body.style.overflow = '';
    }
    window.openCandidacyModal();
    return;
  }


  // Target specialty link
  const targetSpecialty = anchor.getAttribute('data-target-specialty');
  if (targetSpecialty) {
    e.preventDefault();
    const item = window.openEspecialidadItem(targetSpecialty);
    if (item) {
      window.scrollToElementWithOffset(item, 18);
    }
    return;
  }

  // Equipos y perfiles
  if (rawHref === '#equipos' || rawHref === '#item-profesionales-especializados') {
    e.preventDefault();
    const item = window.openEspecialidadItem('item-profesionales-especializados');
    if (item) {
      window.scrollToElementWithOffset(item, 18);
    }
    return;
  }

  // Trabaja con nosotros -> Scroll to card "Para profesionales" (NO modal)
  if (rawHref === '#para-profesionales' || rawHref === '#candidatura') {
    e.preventDefault();
    const targetCard = document.getElementById('para-profesionales') || document.querySelector('.contact-card-pro');
    if (targetCard) {
      window.scrollToElementWithOffset(targetCard, 22);
    }
    return;
  }

  // Solicitar presupuesto / Contacto
  if (rawHref === '#presupuesto') {
    if (anchor.classList.contains('btn-header-quote') || anchor.classList.contains('drawer-link-quote')) {
      e.preventDefault();
      const drawer = document.getElementById('mobileDrawer');
      const toggle = document.getElementById('menuToggle');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('has-modal-open');
        document.body.style.overflow = '';
      }
      window.openQuoteModal();
      return;
    }
    e.preventDefault();
    const contactSec = document.getElementById('contacto');
    if (contactSec) {
      window.scrollToElementWithOffset(contactSec, 16);
    }
    return;
  }

  // Main navigation anchors
  if (rawHref === '#quienes-somos' || rawHref === '#servicios' || rawHref === '#sectores' || rawHref === '#ambito' || rawHref === '#contacto' || rawHref === '#inicio' || rawHref === '#especialidades') {
    const targetEl = document.querySelector(rawHref);
    if (targetEl) {
      e.preventDefault();
      window.scrollToElementWithOffset(targetEl, 16);
    }
  }
});


/* ==========================================================================
   PROGRESSIVE SCROLL REVEAL ENGINE (PERCEPTIBLE, SMOOTH, STABLE)
   ========================================================================== */
function initProgressiveScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(document.querySelectorAll('.reveal-item'));
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach(el => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.willChange = 'auto';
    });
    return;
  }

  // Parse config per element
  const elements = items.map(el => {
    const startRatio = parseFloat(el.getAttribute('data-reveal-start')) || 0.85;
    const endRatio = parseFloat(el.getAttribute('data-reveal-end')) || 0.55;
    const dist = parseFloat(el.getAttribute('data-reveal-dist')) || 20;
    const dir = el.getAttribute('data-reveal-dir') || 'up'; // 'up', 'left', 'right', 'down'

    // Initial state before reveal
    el.style.willChange = 'opacity, transform';
    el.style.opacity = '0';
    if (dir === 'up') el.style.transform = 'translateY(' + dist + 'px)';
    else if (dir === 'left') el.style.transform = 'translateX(-' + dist + 'px)';
    else if (dir === 'right') el.style.transform = 'translateX(' + dist + 'px)';
    else if (dir === 'down') el.style.transform = 'translateY(-' + dist + 'px)';

    return {
      el,
      startRatio,
      endRatio,
      dist,
      dir,
      progress: 0,
      completed: false
    };
  });

  let ticking = false;

  function evaluate() {
    const vh = window.innerHeight;

    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      if (item.completed) continue;

      const rect = item.el.getBoundingClientRect();
      const startPx = vh * item.startRatio;
      const endPx = vh * item.endRatio;

      let p = 0;
      if (rect.top <= endPx) {
        p = 1;
      } else if (rect.top < startPx) {
        p = (startPx - rect.top) / (startPx - endPx);
      }

      // Crucial: progress only advances or stays stable (never disappears on scroll reversal!)
      if (p > item.progress) {
        item.progress = p;
      }

      if (item.progress >= 1) {
        item.progress = 1;
        item.completed = true;
        item.el.classList.add('is-revealed');
        item.el.style.opacity = '1';
        item.el.style.transform = 'none';
        item.el.style.willChange = 'auto';
      } else if (item.progress > 0) {
        const currentOpacity = item.progress;
        const currentOffset = (1 - item.progress) * item.dist;
        item.el.style.opacity = currentOpacity.toFixed(3);
        if (item.dir === 'up') {
          item.el.style.transform = 'translateY(' + currentOffset.toFixed(1) + 'px)';
        } else if (item.dir === 'left') {
          item.el.style.transform = 'translateX(-' + currentOffset.toFixed(1) + 'px)';
        } else if (item.dir === 'right') {
          item.el.style.transform = 'translateX(' + currentOffset.toFixed(1) + 'px)';
        } else if (item.dir === 'down') {
          item.el.style.transform = 'translateY(-' + currentOffset.toFixed(1) + 'px)';
        }
      }
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(evaluate);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  evaluate();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProgressiveScrollReveal);
} else {
  initProgressiveScrollReveal();
}

/* ==========================================================================
   INTERACTIVE HANDLERS FOR INNER SERVICE PAGES (PERSONAL ESPECIALIZADO)
   ========================================================================== */
function initInnerServicePage() {
  // 1. FAQ Accordions
  const faqQuestions = document.querySelectorAll('.inner-faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      
      // Close other FAQs in the same list
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.classList.remove('is-open');
          }
        }
      });

      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      if (answer) {
        answer.classList.toggle('is-open', !isExpanded);
      }
    });
  });

  // 2. Mobile Profiles Selector Toggle
  const mobileToggle = document.querySelector('.mobile-profiles-toggle-btn');
  const mobileDropdown = document.querySelector('.mobile-profiles-dropdown');
  if (mobileToggle && mobileDropdown) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDropdown.classList.contains('is-open');
      mobileDropdown.classList.toggle('is-open', !isOpen);
      mobileToggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });

    mobileDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDropdown.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Highlight Sidebar Active Link on Scroll
  const profileItems = document.querySelectorAll('.profile-editorial-item[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  if (profileItems.length && sidebarLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    profileItems.forEach(item => observer.observe(item));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInnerServicePage);
} else {
  initInnerServicePage();
}
