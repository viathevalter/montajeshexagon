const fs = require('fs');

const mainJsPath = 'c:\\Projetos\\Hexagon\\assets\\js\\main.js';
let content = fs.readFileSync(mainJsPath, 'utf8');

const startTag = 'function initSectoresCarousel() {';
const endTag = 'initSectoresCarousel();';

const startIdx = content.indexOf(startTag);
if (startIdx === -1) throw new Error('startTag not found');

const endIdx = content.indexOf(endTag, startIdx) + endTag.length;
if (endIdx === -1) throw new Error('endTag not found');

const newFunction = `function initSectoresCarousel() {
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const AUTOPLAY_DELAY = 8000; // 8 segundos exactos por sector

    let currentIndex = 0;
    let isManuallyPaused = prefersReducedMotion;
    let isHovered = false;
    let isFocused = false;
    let isVisible = false;
    let isTabVisible = document.visibilityState === 'visible';
    let timerStartTime = 0;
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

    function shouldAutoplay() {
      return !isManuallyPaused && 
             !isHovered && 
             !isFocused && 
             isVisible && 
             isTabVisible && 
             !prefersReducedMotion;
    }

    function updatePauseButtonUI() {
      if (!btnPause) return;
      const iconPause = btnPause.querySelector('.icon-pause');
      const iconPlay = btnPause.querySelector('.icon-play');
      if (iconPause && iconPlay) {
        iconPause.style.display = isManuallyPaused ? 'none' : 'block';
        iconPlay.style.display = isManuallyPaused ? 'block' : 'none';
      }
      const label = isManuallyPaused ? (i18n.resume[lang] || i18n.resume.es) : (i18n.pause[lang] || i18n.pause.es);
      btnPause.setAttribute('aria-label', label);
      btnPause.setAttribute('title', isManuallyPaused ? 'Reanudar' : 'Pausar');
    }

    function updateCarouselPosition(animate = true) {
      if (cards.length === 0) return;
      const card = cards[0];
      const cardWidth = card.offsetWidth;
      let gap = 24;
      if (cards.length > 1) {
        const c0 = cards[0].getBoundingClientRect();
        const c1 = cards[1].getBoundingClientRect();
        gap = Math.max(0, c1.left - c0.right);
      }
      const offset = currentIndex * (cardWidth + gap);

      if (animate && !prefersReducedMotion) {
        track.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        track.style.transition = 'none';
      }
      track.style.transform = \`translateX(-\${offset}px)\`;

      if (counterEl) {
        const curStr = String(currentIndex + 1).padStart(2, '0');
        const totStr = String(totalCards).padStart(2, '0');
        counterEl.textContent = \`\${curStr} / \${totStr}\`;
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

      if (userTriggered) {
        setManualPause(true);
      } else {
        timerStartTime = performance.now();
        if (progressBar) progressBar.style.width = '0%';
      }
    }

    function setManualPause(paused) {
      isManuallyPaused = paused;
      updatePauseButtonUI();

      if (isManuallyPaused) {
        stopAutoplayLoop();
      } else {
        timerStartTime = performance.now();
        if (progressBar) progressBar.style.width = '0%';
        startAutoplayLoop();
      }
    }

    function startAutoplayLoop() {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (!shouldAutoplay()) return;
      if (!timerStartTime) timerStartTime = performance.now();
      animFrameId = requestAnimationFrame(autoplayStep);
    }

    function stopAutoplayLoop() {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    function autoplayStep(now) {
      if (!shouldAutoplay()) {
        animFrameId = null;
        return;
      }

      if (!timerStartTime) timerStartTime = now;
      const elapsed = now - timerStartTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_DELAY) * 100);
      if (progressBar) progressBar.style.width = \`\${pct}%\`;

      if (elapsed >= AUTOPLAY_DELAY) {
        goToIndex((currentIndex + 1) % totalCards, false);
      }

      animFrameId = requestAnimationFrame(autoplayStep);
    }

    // IntersectionObserver para iniciar reproducción cuando la sección entra en vista
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting && (entry.intersectionRatio >= 0.15 || entry.boundingClientRect.top < window.innerHeight * 0.7);
        if (isVisible) {
          if (shouldAutoplay()) {
            timerStartTime = performance.now();
            startAutoplayLoop();
          }
        } else {
          stopAutoplayLoop();
        }
      });
    }, { threshold: [0, 0.15, 0.3, 0.5] });
    observer.observe(section);

    // Verificación inmediata si la sección ya está dentro de la ventana al cargar
    const initRect = section.getBoundingClientRect();
    if (initRect.top < window.innerHeight && initRect.bottom > 0) {
      isVisible = true;
      if (shouldAutoplay()) {
        timerStartTime = performance.now();
        startAutoplayLoop();
      }
    }

    document.addEventListener('visibilitychange', () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) {
        if (shouldAutoplay()) {
          timerStartTime = performance.now();
          startAutoplayLoop();
        }
      } else {
        stopAutoplayLoop();
      }
    });

    if (btnPause) {
      btnPause.addEventListener('click', (e) => {
        e.preventDefault();
        setManualPause(!isManuallyPaused);
      });
    }

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

    // Pausa temporal al pasar el cursor (hover)
    section.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplayLoop();
    });
    section.addEventListener('mouseleave', () => {
      isHovered = false;
      if (shouldAutoplay()) {
        timerStartTime = performance.now();
        startAutoplayLoop();
      }
    });

    // Pausa temporal al enfocar con teclado
    section.addEventListener('focusin', () => {
      isFocused = true;
      stopAutoplayLoop();
    });
    section.addEventListener('focusout', (e) => {
      if (!section.contains(e.relatedTarget)) {
        isFocused = false;
        if (shouldAutoplay()) {
          timerStartTime = performance.now();
          startAutoplayLoop();
        }
      }
    });

    if (viewport) {
      viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToIndex(currentIndex + 1, true);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToIndex(currentIndex - 1, true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          goToIndex(0, true);
        } else if (e.key === 'End') {
          e.preventDefault();
          goToIndex(totalCards - 1, true);
        } else if (e.key === ' ') {
          e.preventDefault();
          setManualPause(!isManuallyPaused);
        }
      });
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchDiffX = 0;
    track.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDiffX = 0;
      isHovered = true;
      stopAutoplayLoop();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchDiffX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      isHovered = false;
      if (Math.abs(touchDiffX) > 40) {
        if (touchDiffX < 0) {
          goToIndex(currentIndex + 1, true);
        } else {
          goToIndex(currentIndex - 1, true);
        }
      } else {
        if (shouldAutoplay()) {
          timerStartTime = performance.now();
          startAutoplayLoop();
        }
      }
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      updateCarouselPosition(false);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCarouselPosition(false);
      }, 100);
    });

    updateCarouselPosition(false);
    updatePauseButtonUI();
  }

  initSectoresCarousel();`;

content = content.substring(0, startIdx) + newFunction + content.substring(endIdx);
fs.writeFileSync(mainJsPath, content, 'utf8');
console.log('Successfully updated initSectoresCarousel in main.js');
