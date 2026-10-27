const fs = require('fs');

let css = fs.readFileSync('assets/css/styles.css', 'utf8');

const startMarker = '.sectores-grid {';
const endMarker = '/* ==========================================================================\r\n   EXACT SCROLL MARGINS FOR FIXED HEADER CLEARANCE';
const endMarkerLF = '/* ==========================================================================\n   EXACT SCROLL MARGINS FOR FIXED HEADER CLEARANCE';

const startIndex = css.indexOf(startMarker);
let endIndex = css.indexOf(endMarker);
if (endIndex === -1) endIndex = css.indexOf(endMarkerLF);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found! start:', startIndex, 'end:', endIndex);
  process.exit(1);
}

const newStyles = `/* Contenedor del Carrusel de Sectores */
.sectores-carousel-container {
  position: relative;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 1;
}

/* Cabecera: Título a la izquierda y Controles a la derecha */
.sectores-carousel-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
}

.sectores-header-left {
  max-width: 720px;
}

.sectores-eyebrow {
  font-family: var(--font-heading, 'Poppins', sans-serif);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-copper, #D49873);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.sectores-title {
  font-family: var(--font-heading, 'Poppins', sans-serif);
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  color: #123D3A;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.sectores-title-regular {
  font-weight: 400;
}

.sectores-title-bold {
  font-weight: 600;
}

.sectores-desc {
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  color: #4A605D;
  margin: 0;
  line-height: 1.5;
}

/* Controles Superiores: Pausa/Reanudar, Anterior, Siguiente */
.sectores-carousel-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.carousel-ctrl-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  border: 1.5px solid #123D3A;
  background-color: transparent;
  color: #123D3A;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.22s ease;
  padding: 0;
  outline-offset: 3px;
}

.carousel-ctrl-btn:hover {
  background-color: #123D3A;
  color: #FFFFFF;
  border-color: #123D3A;
  transform: translateY(-1px);
}

.carousel-ctrl-btn:active {
  transform: translateY(1px);
}

.carousel-ctrl-btn:focus-visible {
  outline: 2px solid var(--color-copper, #D49873);
}

/* Viewport y Trilho do Carrossel */
.sectores-carousel-viewport {
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  padding: 6px 0 18px 0;
  outline: none;
}

.sectores-carousel-viewport:focus-visible {
  box-shadow: 0 0 0 2px var(--color-copper, #D49873);
  border-radius: 14px;
}

.sectores-carousel-track {
  display: flex;
  gap: 24px;
  width: max-content;
  transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

/* Cartões do Carrossel (3 no desktop amplo, 2 no tablet, 1 no mobile) */
.sector-carousel-card {
  width: clamp(330px, calc((1240px - 72px) / 3.12), 380px);
  flex: 0 0 clamp(330px, calc((1240px - 72px) / 3.12), 380px);
  background-color: #FFFFFF; /* Fundo branco sólido para garantir leitura perfeita sobre o desenho */
  border: 1px solid rgba(18, 61, 58, 0.12);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(18, 61, 58, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.sector-carousel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(18, 61, 58, 0.10);
  border-color: rgba(212, 152, 115, 0.45);
}

/* Fotografia 3:2 com Brilho Suave no Hover */
.sector-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background-color: #EBF0EE;
}

.sector-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.sector-carousel-card:hover .sector-card-media img {
  transform: scale(1.025);
}

.sector-card-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%);
  transition: opacity 0.3s ease;
}

.sector-carousel-card:hover .sector-card-sheen {
  opacity: 1;
}

/* Corpo do Cartão: Nome do Setor e Explicação Curta */
.sector-card-body {
  padding: 22px 24px 26px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.sector-card-title {
  font-family: var(--font-heading, 'Poppins', sans-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: #123D3A;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.sector-card-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #334A47;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

/* Barra Inferior: Progresso + Contador + Dots + Botão Comercial */
.sectores-carousel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: clamp(1.75rem, 2.5vw, 2.5rem);
  padding-top: 8px;
}

.sectores-footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Barra de Progresso Fina em Cobre */
.carousel-progress-wrap {
  width: 130px;
  height: 3px;
  background-color: rgba(18, 61, 58, 0.10);
  border-radius: 2px;
  overflow: hidden;
}

.carousel-progress-bar {
  width: 0%;
  height: 100%;
  background-color: var(--color-copper, #D49873);
  border-radius: 2px;
  transition: width 0.1s linear;
}

/* Contador Numérico */
.carousel-counter {
  font-family: var(--font-mono, monospace);
  font-size: 0.92rem;
  font-weight: 600;
  color: #123D3A;
  letter-spacing: 0.05em;
  min-width: 58px;
}

/* Indicadores de Ponto (Dots) */
.carousel-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  background-color: #D0D9D7;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;
  outline-offset: 3px;
}

.carousel-dot.is-active {
  background-color: var(--color-copper, #D49873);
  transform: scale(1.35);
}

.carousel-dot:hover:not(.is-active) {
  background-color: #A37050;
}

/* Botão Comercial de Ação */
.btn-sector-quote {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  background-color: var(--color-copper, #D49873);
  color: #FFFFFF;
  font-family: var(--font-heading, 'Poppins', sans-serif);
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(212, 152, 115, 0.25);
  flex-shrink: 0;
}

.btn-sector-quote:hover {
  background-color: #C38661;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(212, 152, 115, 0.35);
}

.btn-sector-quote:active {
  transform: translateY(1px);
}

.btn-sector-quote .btn-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Responsividade Tablet (768px a 1024px): 2 cartões completos + indicação visual do próximo */
@media (max-width: 1024px) {
  .sector-carousel-card {
    width: calc((100vw - 3rem - 24px) / 2.18);
    flex: 0 0 calc((100vw - 3rem - 24px) / 2.18);
    min-width: 290px;
  }
}

/* Responsividade Mobile (≤ 768px): 1 cartão completo por tela + indicação sutil */
@media (max-width: 768px) {
  .section-sectores-industriales {
    padding: clamp(3.5rem, 6vw, 4.5rem) 0;
  }

  .sectores-bg-refinery {
    width: 320px;
    opacity: 0.06;
    bottom: -10px;
  }

  .sectores-carousel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .sectores-carousel-controls {
    align-self: flex-start;
  }

  .sector-carousel-card {
    width: calc(100vw - 3rem - 32px);
    flex: 0 0 calc(100vw - 3rem - 32px);
    min-width: 260px;
  }

  .sectores-carousel-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .sectores-footer-left {
    justify-content: space-between;
    width: 100%;
  }

  .btn-sector-quote {
    width: 100%;
    justify-content: center;
  }
}

/* Acessibilidade: Preferência de Movimento Reduzido */
@media (prefers-reduced-motion: reduce) {
  .sectores-carousel-track {
    transition: none !important;
  }

  .carousel-progress-bar {
    transition: none !important;
  }

  .sector-carousel-card {
    transition: none !important;
  }

  .sector-carousel-card:hover {
    transform: none !important;
  }

  .sector-card-media img {
    transition: none !important;
  }

  .sector-carousel-card:hover .sector-card-media img {
    transform: none !important;
  }

  .sector-card-sheen {
    display: none !important;
  }
}

`;

const updatedCss = css.substring(0, startIndex) + newStyles + css.substring(endIndex);
fs.writeFileSync('assets/css/styles.css', updatedCss, 'utf8');
console.log('Successfully updated assets/css/styles.css with Carousel styles!');
