const fs = require('fs');
const path = require('path');

const sectorContents = {
  es: {
    ariaLabel: "SECTORES INDUSTRIALES",
    eyebrow: "SECTORES INDUSTRIALES",
    titleRegular: "Profesionales para",
    titleBold: "cada sector.",
    desc: "Conozca los sectores a los que dirigimos nuestros servicios.",
    btnPause: "Pausar avance automático",
    btnPrev: "Sector anterior",
    btnNext: "Sector siguiente",
    quoteBtn: "Consultar mi sector",
    ariaCarousel: "Sectores industriales",
    ariaCounter: "de",
    cards: [
      {
        title: "Petroquímica y refinerías",
        text: "Profesionales para trabajos de mantenimiento y paradas programadas en equipos y tuberías de planta.",
        imgAlt: "Instalaciones de petroquímica y refinería con torres de proceso y tuberías industriales"
      },
      {
        title: "Energía",
        text: "Personal especializado para el mantenimiento mecánico y montaje de equipos en instalaciones energéticas.",
        imgAlt: "Equipos y turbomaquinaria industrial en planta de generación de energía"
      },
      {
        title: "Metalmecánica",
        text: "Soldadores, caldereros y montadores para trabajos con piezas, estructuras y conjuntos metálicos.",
        imgAlt: "Fabricación y ensamblaje de piezas y conjuntos estructurales metálicos"
      },
      {
        title: "Siderurgia",
        text: "Mecánicos, soldadores y montadores para intervenciones en equipos y estructuras de plantas siderúrgicas.",
        imgAlt: "Planta siderúrgica con instalaciones pesadas para procesamiento industrial de acero"
      },
      {
        title: "Industria agroalimentaria",
        text: "Profesionales para el mantenimiento y montaje de equipos en instalaciones de producción agroalimentaria.",
        imgAlt: "Instalaciones y líneas industriales en acero inoxidable para producción agroalimentaria"
      },
      {
        title: "Industria química",
        text: "Tuberos, soldadores y mecánicos para trabajos en conducciones y equipos de proceso.",
        imgAlt: "Instalación química con tanques, conducciones y equipos industriales de proceso"
      }
    ]
  },
  en: {
    ariaLabel: "INDUSTRIAL SECTORS",
    eyebrow: "INDUSTRIAL SECTORS",
    titleRegular: "Specialists for",
    titleBold: "each sector.",
    desc: "Discover the sectors where we deliver our technical services.",
    btnPause: "Pause automatic advance",
    btnPrev: "Previous sector",
    btnNext: "Next sector",
    quoteBtn: "Inquire about my sector",
    ariaCarousel: "Industrial sectors",
    ariaCounter: "of",
    cards: [
      {
        title: "Petrochemical & Refineries",
        text: "Specialists for maintenance and scheduled turnarounds on plant equipment and process piping.",
        imgAlt: "Petrochemical and refinery facilities with process distillation towers and piping"
      },
      {
        title: "Power & Energy",
        text: "Specialised personnel for mechanical maintenance and equipment assembly in power generation facilities.",
        imgAlt: "Industrial turbomachinery and equipment in energy generation plant"
      },
      {
        title: "Metalworking & Fabrication",
        text: "Welders, boilermakers and assemblers for structural parts, components and metallic assemblies.",
        imgAlt: "Fabrication and structural assembly of metallic parts and components"
      },
      {
        title: "Steel & Heavy Industry",
        text: "Mechanics, welders and fitters for interventions on equipment and structures in steel plants.",
        imgAlt: "Steel plant with heavy equipment for industrial steel processing"
      },
      {
        title: "Agri-food & Processing",
        text: "Specialists for maintenance and assembly of equipment in food and beverage production facilities.",
        imgAlt: "Stainless steel industrial processing lines and installations for food production"
      },
      {
        title: "Chemical Industry",
        text: "Pipefitters, welders and mechanics for works on pipelines, vessels and chemical process equipment.",
        imgAlt: "Chemical plant facility with tanks, pipelines and process equipment"
      }
    ]
  },
  fr: {
    ariaLabel: "SECTEURS INDUSTRIELS",
    eyebrow: "SECTEURS INDUSTRIELS",
    titleRegular: "Des spécialistes pour",
    titleBold: "chaque secteur.",
    desc: "Découvrez les secteurs auxquels s'adressent nos services.",
    btnPause: "Suspendre le défilement automatique",
    btnPrev: "Secteur précédent",
    btnNext: "Secteur suivant",
    quoteBtn: "Consulter pour mon secteur",
    ariaCarousel: "Secteurs industriels",
    ariaCounter: "sur",
    cards: [
      {
        title: "Pétrochimie et raffineries",
        text: "Professionnels pour travaux de maintenance et arrêts programmés sur équipements et tuyauteries de site.",
        imgAlt: "Installations de pétrochimie et raffinerie avec colonnes de distillation et tuyauteries"
      },
      {
        title: "Énergie",
        text: "Personnel spécialisé pour la maintenance mécanique et le montage d'équipements en centrales énergétiques.",
        imgAlt: "Équipements et turbomachines industrielles en centrale de production d'énergie"
      },
      {
        title: "Métallurgie et mécanique",
        text: "Soudeurs, chaudronniers et monteurs pour travaux sur pièces, structures et ensembles métalliques.",
        imgAlt: "Fabrication et assemblage d'ensembles et structures métalliques industriels"
      },
      {
        title: "Sidérurgie",
        text: "Mécaniciens, soudeurs et monteurs pour interventions sur équipements et structures d'usines sidérurgiques.",
        imgAlt: "Usine sidérurgique avec installations lourdes de transformation de l'acier"
      },
      {
        title: "Industrie agroalimentaire",
        text: "Professionnels pour la maintenance et le montage d'équipements en sites agroalimentaires.",
        imgAlt: "Lignes et tuyauteries industrielles en acier inoxydable pour l'agroalimentaire"
      },
      {
        title: "Industrie chimique",
        text: "Tuyauteurs, soudeurs et mécaniciens pour travaux sur conduites, réacteurs et équipements de procédé.",
        imgAlt: "Installation chimique avec cuves, conduites et équipements industriels de procédé"
      }
    ]
  },
  it: {
    ariaLabel: "SETTORI INDUSTRIALI",
    eyebrow: "SETTORI INDUSTRIALI",
    titleRegular: "Specialisti per",
    titleBold: "ogni settore.",
    desc: "Scoprite i settori a cui rivolgiamo i nostri servizi.",
    btnPause: "Sospendi avanzamento automatico",
    btnPrev: "Settore precedente",
    btnNext: "Settore successivo",
    quoteBtn: "Richiedi per il mio settore",
    ariaCarousel: "Settori industriali",
    ariaCounter: "di",
    cards: [
      {
        title: "Petrolchimico e raffinerie",
        text: "Professionisti per manutenzioni e fermate programmate su impianti e tubazioni di processo.",
        imgAlt: "Impianti petrolchimici e raffinerie con torri di processo e tubazioni industriali"
      },
      {
        title: "Energia",
        text: "Personale specializzato per la manutenzione meccanica e il montaggio di apparecchiature in centrali energetiche.",
        imgAlt: "Turbomacchine e apparecchiature industriali in impianto di generazione energetica"
      },
      {
        title: "Metalmeccanica",
        text: "Saldatori, carpentieri e montatori per interventi su parti, strutture e complessi metallici.",
        imgAlt: "Fabbricazione e assemblaggio di elementi e strutture metalliche industriali"
      },
      {
        title: "Siderurgia",
        text: "Meccanici, saldatori e montatori per interventi su macchinari e strutture di impianti siderurgici.",
        imgAlt: "Impianto siderurgico con apparecchiature pesanti per la lavorazione dell'acciaio"
      },
      {
        title: "Industria agroalimentare",
        text: "Professionisti per manutenzione e montaggio di apparecchiature in impianti agroalimentari.",
        imgAlt: "Linee e tubazioni industriali in acciaio inossidabile per produzione agroalimentare"
      },
      {
        title: "Industria chimica",
        text: "Tubisti, saldatori e meccanici per interventi su condotte, serbatoi e impianti di processo chimico.",
        imgAlt: "Impianto chimico con serbatoi, condotte e apparecchiature di processo industriale"
      }
    ]
  },
  de: {
    ariaLabel: "INDUSTRIEBRANCHEN",
    eyebrow: "INDUSTRIEBRANCHEN",
    titleRegular: "Fachkräfte für",
    titleBold: "jede Branche.",
    desc: "Entdecken Sie die Branchen, in denen wir tätig sind.",
    btnPause: "Automatischen Vorlauf anhalten",
    btnPrev: "Vorherige Branche",
    btnNext: "Nächste Branche",
    quoteBtn: "Mein Branchenprojekt anfragen",
    ariaCarousel: "Industriebranchen",
    ariaCounter: "von",
    cards: [
      {
        title: "Petrochemie & Raffinerien",
        text: "Fachkräfte für Wartung und planmäßige Stillstände an Prozessanlagen und Rohrleitungssystemen.",
        imgAlt: "Petrochemische Anlagen und Raffinerien mit Kolonnen und industriellen Rohrleitungen"
      },
      {
        title: "Energie & Kraftwerke",
        text: "Qualifiziertes Personal für mechanische Instandhaltung und Montage in Energieerzeugungsanlagen.",
        imgAlt: "Industrielle Turbomaschinen und Ausrüstungen in Energieerzeugungsanlagen"
      },
      {
        title: "Metallbau & Fertigung",
        text: "Schweißer, Kesselschmiede und Monteure für Bauteile, Stahlstrukturen und Baugruppen.",
        imgAlt: "Fertigung und Montage von metallischen Baugruppen und Tragwerken"
      },
      {
        title: "Hüttenwesen & Stahlindustrie",
        text: "Mechaniker, Schweißer und Monteure für Instandsetzungen an Anlagen und Stahlkonstruktionen.",
        imgAlt: "Stahlwerk mit schweren Industrieanlagen zur Stahlverarbeitung"
      },
      {
        title: "Lebensmittelindustrie",
        text: "Fachkräfte für Instandhaltung und Montage von Produktionsanlagen in der Nahrungsmittelindustrie.",
        imgAlt: "Industrielle Edelstahllinien und Rohrleitungssysteme für die Nahrungsmittelproduktion"
      },
      {
        title: "Chemische Industrie",
        text: "Rohrvorrichter, Schweißer und Mechaniker für Arbeiten an Rohrleitungen und chemischen Prozessanlagen.",
        imgAlt: "Chemieanlage mit Behältern, Rohrleitungen und industrieller Verfahrenstechnik"
      }
    ]
  }
};

const imageFiles = [
  'sector_petroquimica.jpg',
  'sector_energia.jpg',
  'sector_metalmecanica.jpg',
  'sector_siderurgia.jpg',
  'sector_agroalimentaria.jpg',
  'sector_quimica.jpg'
];

function buildSectionHtml(lang, isRoot = false) {
  const d = sectorContents[lang] || sectorContents.es;
  const prefix = isRoot ? '' : '../';

  let cardsHtml = '';
  d.cards.forEach((c, idx) => {
    const imgName = imageFiles[idx];
    cardsHtml += `
        <!-- Cartón ${idx + 1}: ${c.title} -->
        <article class="sector-carousel-card" data-index="${idx}" aria-label="${idx + 1} ${d.ariaCounter} 6: ${c.title}">
          <div class="sector-card-media">
            <img src="${prefix}assets/images/sectores/${imgName}" alt="${c.imgAlt}" width="720" height="480" loading="lazy" decoding="async">
            <div class="sector-card-sheen" aria-hidden="true"></div>
          </div>
          <div class="sector-card-body">
            <h3 class="sector-card-title">${c.title}</h3>
            <p class="sector-card-text">${c.text}</p>
          </div>
        </article>`;
  });

  return `<section class="section-sectores-industriales" id="sectores" aria-label="${d.ariaLabel}">
      <!-- Dibujo técnico de refinería de fondo decorativo -->
      <div class="sectores-bg-refinery" aria-hidden="true">
        <img src="${prefix}assets/images/industrial/hexagon-sectores-refineria.png" 
             alt="" 
             width="1024" 
             height="682" 
             loading="lazy" 
             decoding="async">
      </div>

      <div class="container sectores-carousel-container">
        
        <!-- Cabecera de la sección con identificación, título y controles -->
        <div class="sectores-carousel-header">
          <div class="sectores-header-left">
            <span class="sectores-eyebrow">${d.eyebrow}</span>
            <h2 class="sectores-title">
              <span class="sectores-title-regular">${d.titleRegular}</span>
              <span class="sectores-title-bold">${d.titleBold}</span>
            </h2>
            <p class="sectores-desc">${d.desc}</p>
          </div>

          <!-- Controles de navegación manual y pausa -->
          <div class="sectores-carousel-controls" role="group" aria-label="Controles del carrusel">
            <button type="button" class="carousel-ctrl-btn btn-carousel-pause" id="sectoresCarouselPause" aria-label="${d.btnPause}" title="Pausar">
              <svg class="icon-pause" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
              </svg>
              <svg class="icon-play" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" style="display: none; margin-left: 2px;">
                <polygon points="7,4 20,12 7,20"></polygon>
              </svg>
            </button>

            <button type="button" class="carousel-ctrl-btn btn-carousel-prev" id="sectoresCarouselPrev" aria-label="${d.btnPrev}" title="Anterior">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button type="button" class="carousel-ctrl-btn btn-carousel-next" id="sectoresCarouselNext" aria-label="${d.btnNext}" title="Siguiente">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Viewport y pista móvil del carrusel -->
        <div class="sectores-carousel-viewport" id="sectoresCarouselViewport" role="region" aria-roledescription="carousel" aria-label="${d.ariaCarousel}">
          <div class="sectores-carousel-track" id="sectoresCarouselTrack">${cardsHtml}
          </div>
        </div>

        <!-- Barra inferior: Progreso de lectura, contador, dots y botón comercial -->
        <div class="sectores-carousel-footer">
          <div class="sectores-footer-left">
            <div class="carousel-progress-wrap" aria-hidden="true">
              <div class="carousel-progress-bar" id="sectoresProgressBar"></div>
            </div>

            <div class="carousel-counter" id="sectoresCounter" aria-live="polite">01 / 06</div>

            <div class="carousel-dots" id="sectoresDots" role="tablist" aria-label="Posiciones de sectores">
              <button type="button" class="carousel-dot is-active" data-index="0" role="tab" aria-selected="true" aria-label="1 ${d.ariaCounter} 6"></button>
              <button type="button" class="carousel-dot" data-index="1" role="tab" aria-selected="false" aria-label="2 ${d.ariaCounter} 6"></button>
              <button type="button" class="carousel-dot" data-index="2" role="tab" aria-selected="false" aria-label="3 ${d.ariaCounter} 6"></button>
              <button type="button" class="carousel-dot" data-index="3" role="tab" aria-selected="false" aria-label="4 ${d.ariaCounter} 6"></button>
              <button type="button" class="carousel-dot" data-index="4" role="tab" aria-selected="false" aria-label="5 ${d.ariaCounter} 6"></button>
              <button type="button" class="carousel-dot" data-index="5" role="tab" aria-selected="false" aria-label="6 ${d.ariaCounter} 6"></button>
            </div>
          </div>

          <div class="sectores-footer-right">
            <button type="button" class="btn-sector-quote" data-action="open-quote-modal" data-service="Mantenimiento Industrial">
              <span>${d.quoteBtn}</span>
              <span class="btn-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align: -1px; margin-left: 2px;">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>`;
}

const targetFiles = [
  { path: 'index.html', lang: 'es', isRoot: true },
  { path: 'es/index.html', lang: 'es', isRoot: false },
  { path: 'en/index.html', lang: 'en', isRoot: false },
  { path: 'fr/index.html', lang: 'fr', isRoot: false },
  { path: 'it/index.html', lang: 'it', isRoot: false },
  { path: 'de/index.html', lang: 'de', isRoot: false }
];

for (const t of targetFiles) {
  let content = fs.readFileSync(t.path, 'utf8');

  // Match the entire section <section class="section-sectores-industriales" ...> ... </section>
  const sectionRegex = /<section class="section-sectores-industriales" id="sectores"[\s\S]*?<\/section>/;
  if (!sectionRegex.test(content)) {
    console.error('Section #sectores not found in', t.path);
    continue;
  }

  const newHtml = buildSectionHtml(t.lang, t.isRoot);
  content = content.replace(sectionRegex, newHtml);

  fs.writeFileSync(t.path, content, 'utf8');
  console.log('Successfully updated #sectores in', t.path);
}
