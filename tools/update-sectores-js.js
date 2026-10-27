const fs = require('fs');

let js = fs.readFileSync('assets/js/main.js', 'utf8');

const startMarker = '/* ==========================================================================\r\n     4d. SECCIÓN SECTORES INDUSTRIALES (HEXAGON)';
const startMarkerLF = '/* ==========================================================================\n     4d. SECCIÓN SECTORES INDUSTRIALES (HEXAGON)';

let startIndex = js.indexOf(startMarker);
if (startIndex === -1) startIndex = js.indexOf(startMarkerLF);

const endMarker = 'const serviceActionLinks = document.querySelectorAll(\'[data-service-target]\');';
const endIndex = js.indexOf(endMarker);

console.log('startIndex:', startIndex, 'endIndex:', endIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newJs = `/* ==========================================================================
     4d. CARRUSEL DE SECTORES INDUSTRIALES (HEXAGON)
     ========================================================================== */
  function initSectoresCarousel() {
    const section = document.querySelector('.section-sectores-industriales');
    if (!section) return;

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
    const AUTOPLAY_DELAY = 8000; // 8 segundos por sector

    let currentIndex = 0;
    let isPaused = prefersReducedMotion;
    let isInteracting = false;
    let isVisible = false;
    let timerStartTime = 0;
    let animFrameId = null;

    const lang = (document.documentElement.lang || 'es').split('-')[0].toLowerCase();
    const i18n = {
      pause: { es: 'Pausar avance automático', en: 'Pause automatic advance', fr: 'Suspendre le défilement automatique', it: 'Sospendi avanzamento automatico', de: 'Automatischen Vorlauf anhalten' },
      resume: { es: 'Reanudar avance automático', en: 'Resume automatic advance', fr: 'Reprendre le défilement automatique', it: 'Riprendi avanzamento automatico', de: 'Automatischen Vorlauf fortsetzen' }
    };

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
        track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
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
        setPauseState(true);
      } else {
        resetAutoplayTimer();
      }
    }

    function setPauseState(paused) {
      isPaused = paused;
      if (btnPause) {
        const iconPause = btnPause.querySelector('.icon-pause');
        const iconPlay = btnPause.querySelector('.icon-play');
        if (iconPause && iconPlay) {
          iconPause.style.display = isPaused ? 'none' : 'block';
          iconPlay.style.display = isPaused ? 'block' : 'none';
        }
        const label = isPaused ? (i18n.resume[lang] || i18n.resume.es) : (i18n.pause[lang] || i18n.pause.es);
        btnPause.setAttribute('aria-label', label);
        btnPause.setAttribute('title', isPaused ? 'Reanudar' : 'Pausar');
      }

      if (isPaused) {
        stopAutoplayLoop();
      } else {
        resetAutoplayTimer();
        startAutoplayLoop();
      }
    }

    function resetAutoplayTimer() {
      timerStartTime = performance.now();
      if (progressBar) progressBar.style.width = '0%';
    }

    function autoplayStep(now) {
      if (isPaused || isInteracting || !isVisible || document.visibilityState !== 'visible' || prefersReducedMotion) {
        return;
      }

      if (!timerStartTime) timerStartTime = now;
      const elapsed = now - timerStartTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_DELAY) * 100);
      if (progressBar) progressBar.style.width = \`\${pct}%\`;

      if (elapsed >= AUTOPLAY_DELAY) {
        goToIndex(currentIndex + 1, false);
      } else {
        animFrameId = requestAnimationFrame(autoplayStep);
      }
    }

    function startAutoplayLoop() {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (!isPaused && !isInteracting && isVisible && !prefersReducedMotion) {
        animFrameId = requestAnimationFrame(autoplayStep);
      }
    }

    function stopAutoplayLoop() {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!isPaused && !isInteracting) {
            resetAutoplayTimer();
            startAutoplayLoop();
          }
        } else {
          stopAutoplayLoop();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(section);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (isVisible && !isPaused && !isInteracting) {
          resetAutoplayTimer();
          startAutoplayLoop();
        }
      } else {
        stopAutoplayLoop();
      }
    });

    if (btnPause) {
      btnPause.addEventListener('click', (e) => {
        e.preventDefault();
        setPauseState(!isPaused);
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

    section.addEventListener('mouseenter', () => {
      isInteracting = true;
      stopAutoplayLoop();
    });
    section.addEventListener('mouseleave', () => {
      isInteracting = false;
      if (!isPaused && isVisible) {
        resetAutoplayTimer();
        startAutoplayLoop();
      }
    });

    section.addEventListener('focusin', () => {
      isInteracting = true;
      stopAutoplayLoop();
    });
    section.addEventListener('focusout', (e) => {
      if (!section.contains(e.relatedTarget)) {
        isInteracting = false;
        if (!isPaused && isVisible) {
          resetAutoplayTimer();
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
          setPauseState(!isPaused);
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
      isInteracting = true;
      stopAutoplayLoop();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchDiffX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      isInteracting = false;
      if (Math.abs(touchDiffX) > 40) {
        if (touchDiffX < 0) {
          goToIndex(currentIndex + 1, true);
        } else {
          goToIndex(currentIndex - 1, true);
        }
      } else {
        if (!isPaused && isVisible) {
          resetAutoplayTimer();
          startAutoplayLoop();
        }
      }
    });

    window.addEventListener('resize', () => {
      updateCarouselPosition(false);
    });

    updateCarouselPosition(false);
    if (isPaused) {
      setPauseState(true);
    }
  }

  initSectoresCarousel();

  `;

const updatedJs = js.substring(0, startIndex) + newJs + js.substring(endIndex);
fs.writeFileSync('assets/js/main.js', updatedJs, 'utf8');
console.log('Successfully updated assets/js/main.js with initSectoresCarousel()!');
