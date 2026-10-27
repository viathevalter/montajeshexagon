/**
 * HEXAGON MONTAJES INDUSTRIALES — DATASET GEOGRÁFICO EUROPEO
 * Esquema estricto: countryCode, localizedName, operationalStatus, statusLabel,
 * activeWorkers, workersDefinition, completedProjects, reportingPeriod, updatedAt, publicationApproved,
 * sectors, approvedSummary, coordination, legalFramework.
 * 
 * NOTA DE RIGOR EDITORIAL:
 * De acuerdo con la dirección de proyecto y las normas de transparencia comercial:
 * - Datos no comprobados formalmente se declaran como null (no 0, no inventados).
 * - Sem dados numéricos aprovados, a versão pública oculta as contagens numéricas e exibe
 *   apenas o status e competências operacionais confirmadas.
 * - Placeholders numéricos só aparecem em modo dev (?dev_metrics=1), identificados.
 */

window.HEXAGON_EUROPE_DATA = {
  ES: {
    countryCode: 'ES',
    flag: '🇪🇸',
    localizedName: {
      es: 'España',
      en: 'Spain',
      it: 'Spagna',
      fr: 'Espagne',
      de: 'Spanien'
    },
    operationalStatus: 'base_operativa',
    statusLabel: {
      es: 'Base Operativa y Coordinación',
      en: 'Operational Base & Coordination',
      it: 'Base Operativa e Coordinamento',
      fr: 'Base Opérationnelle et Coordination',
      de: 'Betriebsbasis & Koordination'
    },
    completedProjects: '100+',
    activeWorkers: '400+',
    isDemoData: false,
    workersDefinition: 'Profesionales y brigadas técnicas especializadas movilizadas en proyectos industriales',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Petroquímico', 'Energía', 'Metalmecánico', 'Siderúrgico', 'Agroalimentario', 'Químico'],
      en: ['Petrochemical', 'Energy', 'Metalworking', 'Steel Industry', 'Agri-food', 'Chemical'],
      it: ['Petrolchimico', 'Energia', 'Metalmeccanico', 'Siderurgico', 'Agroalimentare', 'Chimico'],
      fr: ['Pétrochimie', 'Énergie', 'Métallurgie', 'Sidérurgie', 'Agroalimentaire', 'Chimie'],
      de: ['Petrochemie', 'Energie', 'Metallverarbeitung', 'Stahlindustrie', 'Agrar- & Lebensmittel', 'Chemie']
    },
    approvedSummary: {
      es: 'Despliegue de equipos de montaje, mantenimiento, soldadura y tubería en instalaciones industriales.',
      en: 'Deployment of mechanical assembly, maintenance, certified welding, and piping teams to industrial facilities.',
      it: 'Impiego di squadre di montaggio, manutenzione, saldatura e tubazioni in impianti industriali.',
      fr: 'Déploiement d\'équipes de montage, maintenance, soudage et tuyauterie sur installations industrielles.',
      de: 'Einsatz von Montageteams, Instandhaltung, Schweißtechnik und Rohrleitungsbau in Industrieanlagen.'
    },
    coordination: {
      doc: {
        es: 'Documentación CAE',
        en: 'HSE & CAE Compliance Documentation',
        it: 'Documentazione DUVRI / Sicurezza',
        fr: 'Dossier de prévention & conformité',
        de: 'HSE-Dokumentation & Freigaben'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Legislación laboral española, convenios provinciales del metal y coordinación de actividades empresariales (RD 171/2004 - CAE). Cobertura en toda la Península Ibérica, Baleares y Canarias.',
      en: 'Spanish labor regulations, metal collective agreements, and contractor health & safety coordination (RD 171/2004 - CAE). Coverage across the Iberian Peninsula, Balearic, and Canary Islands.',
      it: 'Normativa sul lavoro spagnola, contratti collettivi del settore metalmeccanico e coordinamento della sicurezza aziendale (RD 171/2004). Copertura Penisola Iberica, Baleari e Canarie.',
      fr: 'Législation du travail espagnole, conventions collectives de la métallurgie et coordination de sécurité (RD 171/2004). Couverture Péninsule Ibérique, Baléares et Canaries.',
      de: 'Spanisches Arbeitsrecht, Tarifverträge der Metallbranche und betriebliche Sicherheitskoordination (RD 171/2004). Abdeckung Iberische Halbinsel, Balearen und Kanaren.'
    }
  },

  FR: {
    countryCode: 'FR',
    flag: '🇫🇷',
    localizedName: {
      es: 'Francia',
      en: 'France',
      it: 'Francia',
      fr: 'France',
      de: 'Frankreich'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '100+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '20+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Petroquímico', 'Plantas Químicas', 'Refinerías', 'Líneas Industriales', 'Energía', 'Mantenimiento'],
      en: ['Petrochemical', 'Chemical Plants', 'Refineries', 'Industrial Lines', 'Energy', 'Maintenance'],
      it: ['Petrolchimico', 'Impianti Chimici', 'Raffinerie', 'Linee Industriali', 'Energia', 'Manutenzione'],
      fr: ['Pétrochimie', 'Unités Chimiques', 'Raffineries', 'Lignes Industrielles', 'Énergie', 'Maintenance'],
      de: ['Petrochemie', 'Chemieanlagen', 'Raffinerien', 'Fertigungslinien', 'Energie', 'Instandhaltung']
    },
    approvedSummary: {
      es: 'Desplazamiento de brigadas técnicas bajo la Directiva de trabajadores desplazados de la Unión Europea. Cobertura de Seguridad Social A1, tramitación previa SIPSI y logística integral.',
      en: 'Dispatch of technical crews under EU Posted Workers Directive. EU Social Security A1 coverage, prior SIPSI declarations, and comprehensive tool & accommodation logistics.',
      it: 'Distacco di squadre tecniche ai sensi della Direttiva europea sui lavoratori distaccati. Copertura previdenziale comunitaria A1, pratiche SIPSI e logistica integrata.',
      fr: 'Détachement d\'équipes techniques sous le régime de la directive européenne travailleurs détachés. Couverture A1, déclarations préalables SIPSI et logistique de chantier.',
      de: 'Entsendung von Fachteams gemäß EU-Entsenderichtlinie. A1-Bescheinigung zur Sozialversicherung, SIPSI-Meldung und umfassende Einsatzlogistik.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y SIPSI',
        en: 'A1 Certificate & SIPSI Clearance',
        it: 'Documentazione A1 e Notifica SIPSI',
        fr: 'Déclaration préalable SIPSI & Certificat A1',
        de: 'A1-Bescheinigung & SIPSI-Meldung'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento de la UE, declaración previa SIPSI (Code du travail) y modelo A1 de Seguridad Social.',
      en: 'EU Posted Workers Directive, prior SIPSI declaration (French Labour Code), and EU Social Security A1 certificate.',
      it: 'Direttiva distacco UE, dichiarazione preliminare SIPSI (Codice del lavoro francese) e modello A1.',
      fr: 'Directive européenne détachement, déclaration préalable SIPSI (Code du travail) et formulaire A1.',
      de: 'EU-Entsenderichtlinie, SIPSI-Vorabmeldung (Code du travail) und A1-Bescheinigung.'
    }
  },

  DE: {
    countryCode: 'DE',
    flag: '🇩🇪',
    localizedName: {
      es: 'Alemania',
      en: 'Germany',
      it: 'Germania',
      fr: 'Allemagne',
      de: 'Deutschland'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '85+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '18+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Automoción e Ind. Pesada', 'Química', 'Mantenimiento Mecánico', 'Piping de Proceso', 'Energía', 'Siderurgia'],
      en: ['Automotive & Heavy Industry', 'Chemical', 'Mechanical Maintenance', 'Process Piping', 'Energy', 'Steel'],
      it: ['Automotive e Ind. Pesante', 'Chimica', 'Manutenzione Meccanica', 'Piping di Processo', 'Energia', 'Siderurgia'],
      fr: ['Automobile & Industrie Lourde', 'Chimie', 'Maintenance Mécanique', 'Tuyauterie de Process', 'Énergie', 'Sidérurgie'],
      de: ['Automobil- & Schwerindustrie', 'Chemie', 'Mechanische Instandhaltung', 'Prozessrohrleitungsbau', 'Energie', 'Stahl']
    },
    approvedSummary: {
      es: 'Movilización para paradas técnicas y montajes de tubería. Cumplimiento de la Directiva de desplazamiento de la UE, cobertura A1 y coordinación de normas técnicas EN/DIN aplicables en planta.',
      en: 'Mobilization for technical turnarounds and piping installations. Full compliance with EU Posted Workers Directive, A1 forms, and site-level EN/DIN standards coordination.',
      it: 'Mobilitazione per fermate tecniche e montaggi piping. Piena conformità con la Direttiva distacco UE, modello A1 e coordinamento con gli standard EN/DIN di impianto.',
      fr: 'Mobilisation pour arrêts techniques et tuyauterie industrielle. Respect de la directive détachement UE, certificat A1 et coordination des normes EN/DIN du site.',
      de: 'Mobilisierung für Stillstände, Turnarounds und Rohrleitungsbau. Einhaltung der EU-Entsenderichtlinie (AEntG), A1-Bescheinigungen und Einhaltung der EN/DIN-Vorgaben.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y Zoll-Portal',
        en: 'A1 Certificate & Zoll Registration',
        it: 'Documentazione A1 e Notifica Doganale Zoll',
        fr: 'Déclaration Zoll et Formulaire A1',
        de: 'A1-Bescheinigung & Zoll-Meldeportal'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento UE, Arbeitnehmer-Entsendegesetz (AEntG), Zoll-Meldeportal y certificado A1.',
      en: 'EU Posted Workers Directive, German AEntG, Zoll Meldeportal declarations, and A1 certificate.',
      it: 'Direttiva distacco UE, AEntG tedesco, notifica Zoll e modello A1.',
      fr: 'Directive détachement UE, loi allemande AEntG, déclaration douanière Zoll et certificat A1.',
      de: 'EU-Entsenderichtlinie, Arbeitnehmer-Entsendegesetz (AEntG), Zoll-Meldeportal und A1-Bescheinigung.'
    }
  },

  IT: {
    countryCode: 'IT',
    flag: '🇮🇹',
    localizedName: {
      es: 'Italia',
      en: 'Italy',
      it: 'Italia',
      fr: 'Italie',
      de: 'Italien'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '60+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '12+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Siderúrgico', 'Energía y Gas', 'Calderería Pesada', 'Montaje de Líneas', 'Petroquímica', 'Mantenimiento'],
      en: ['Steel', 'Energy & Gas', 'Heavy Boilermaking', 'Assembly Lines', 'Petrochemical', 'Maintenance'],
      it: ['Siderurgico', 'Energia e Gas', 'Caldareria Pesante', 'Montaggio Linee', 'Petrolchimico', 'Manutenzione'],
      fr: ['Sidérurgie', 'Énergie & Gaz', 'Chaudronnerie Lourde', 'Lignes d\'Assemblage', 'Pétrochimie', 'Maintenance'],
      de: ['Stahlindustrie', 'Energie & Gas', 'Schwerer Kesselbau', 'Fertigungslinien', 'Petrochemie', 'Instandhaltung']
    },
    approvedSummary: {
      es: 'Desplazamiento operativo a complejos industriales del norte y centro de Italia. Notificación telemática D.Lgs. 136/2016, cobertura A1 de Seguridad Social y supervisión técnica directa.',
      en: 'Operational deployment to industrial clusters in northern and central Italy. Electronic prior notification (D.Lgs. 136/2016), A1 social security certificate, and direct engineering supervision.',
      it: 'Distacco operativo nei distretti industriali italiani. Comunicazione preventiva telematica (D.Lgs. 136/2016 - Distacco Transnazionale), modello A1 e supervisione tecnica diretta.',
      fr: 'Déploiement opérationnel dans les bassins industriels italiens. Notification préalable (D.Lgs. 136/2016), certificat A1 et encadrement technique direct.',
      de: 'Einsatz in Industrieclustern Nord- und Mittelitaliens. Vorabmeldung nach D.Lgs. 136/2016, A1-Bescheinigung und direkte technische Aufsicht vor Ort.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y D.Lgs. 136',
        en: 'A1 Certificate & D.Lgs. 136 Notification',
        it: 'Documentazione A1 e Notifica D.Lgs. 136',
        fr: 'Déclaration préalable D.Lgs. 136 & A1',
        de: 'A1-Bescheinigung & D.Lgs. 136-Meldung'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento UE, comunicación telemática previa (D.Lgs. 136/2016) y certificado de Seguridad Social A1.',
      en: 'EU Posted Workers Directive, Italian D.Lgs. 136/2016 electronic notification, and A1 certificate.',
      it: 'Direttiva distacco UE, comunicazione preventiva Distacco Transnazionale (D.Lgs. 136/2016) e modello A1.',
      fr: 'Directive détachement UE, notification électronique D.Lgs. 136/2016 et certificat A1.',
      de: 'EU-Entsenderichtlinie, elektronische Meldung nach D.Lgs. 136/2016 und A1-Bescheinigung.'
    }
  },

  PT: {
    countryCode: 'PT',
    flag: '🇵🇹',
    localizedName: {
      es: 'Portugal',
      en: 'Portugal',
      it: 'Portogallo',
      fr: 'Portugal',
      de: 'Portugal'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '65+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '14+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Refinerías', 'Pasta de Papel', 'Metalmecánica', 'Energías Renovables', 'Química', 'Mantenimiento'],
      en: ['Refineries', 'Pulp & Paper', 'Metalworking', 'Renewable Energy', 'Chemical', 'Maintenance'],
      it: ['Raffinerie', 'Carta e Cellulosa', 'Metalmeccanica', 'Energie Rinnovabili', 'Chimica', 'Manutenzione'],
      fr: ['Raffineries', 'Pâte à Papier', 'Métallurgie', 'Énergies Renouvelables', 'Chimie', 'Maintenance'],
      de: ['Raffinerien', 'Zellstoff & Papier', 'Metallverarbeitung', 'Erneuerbare Energien', 'Chemie', 'Instandhaltung']
    },
    approvedSummary: {
      es: 'Movilización ágil desde la Península Ibérica hacia complejos de Sines, Setúbal, Oporto y Lisboa. Cobertura A1 y coordinación técnica con contratistas principales.',
      en: 'Agile cross-border dispatch within the Iberian Peninsula to Sines, Setúbal, Porto and Lisbon. A1 social security coverage and main contractor technical coordination.',
      it: 'Mobilitazione rapida dalla penisola iberica verso i poli di Sines, Setúbal, Porto e Lisbona. Copertura A1 e coordinamento tecnico diretto.',
      fr: 'Mobilisation rapide transfrontalière vers les pôles de Sines, Setúbal, Porto et Lisbonne. Couverture A1 et coordination technique de chantier.',
      de: 'Schnelle grenzüberschreitende Entsendung nach Sines, Setúbal, Porto und Lissabon. A1-Bescheinigung und enge technische Koordination.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y ACT',
        en: 'A1 Certificate & ACT Declaration',
        it: 'Documentazione A1 e Pratiche ACT',
        fr: 'Déclaration ACT & Formulaire A1',
        de: 'A1-Bescheinigung & ACT-Meldung'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento UE, comunicación ACT (Autoridade para as Condições do Trabalho) y modelo A1.',
      en: 'EU Posted Workers Directive, ACT declaration (Portugal), and A1 certificate.',
      it: 'Direttiva distacco UE, dichiarazione ACT e modello A1.',
      fr: 'Directive détachement UE, déclaration ACT et certificat A1.',
      de: 'EU-Entsenderichtlinie, ACT-Meldung (Portugal) und A1-Bescheinigung.'
    }
  },

  BE: {
    countryCode: 'BE',
    flag: '🇧🇪',
    localizedName: {
      es: 'Bélgica',
      en: 'Belgium',
      it: 'Belgio',
      fr: 'Belgique',
      de: 'Belgien'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '70+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '15+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Químico de Amberes', 'Metalurgia', 'Logística Industrial', 'Tubería y Piping', 'Energía', 'Mantenimiento'],
      en: ['Antwerp Chemical Hub', 'Metallurgy', 'Industrial Logistics', 'Process Piping', 'Energy', 'Maintenance'],
      it: ['Polo Chimico Anversa', 'Metallurgia', 'Logistica Industriale', 'Piping di Processo', 'Energia', 'Manutenzione'],
      fr: ['Pôle Chimique Anvers', 'Métallurgie', 'Logistique Industrielle', 'Tuyauterie Industrielle', 'Énergie', 'Maintenance'],
      de: ['Chemiecluster Antwerpen', 'Metallurgie', 'Industrielogistik', 'Rohrleitungsbau', 'Energie', 'Instandhaltung']
    },
    approvedSummary: {
      es: 'Desplazamiento para paradas de plantas químicas y petroquímicas (Amberes, Gante, Valonia). Cobertura A1 y tramitación de declaración previa Limosa.',
      en: 'Deployment for turnarounds in chemical and petrochemical facilities (Antwerp, Ghent, Wallonia). A1 social security coverage and mandatory Limosa declarations.',
      it: 'Distacco per fermate in impianti chimici e petrolchimici (Anversa, Gand). Copertura A1 e dichiarazione preventiva obbligatoria Limosa.',
      fr: 'Déploiement pour arrêts d\'unités chimiques et pétrochimiques (Anvers, Gand, Wallonie). Couverture A1 et déclaration préalable obligatoire Limosa.',
      de: 'Entsendung für Stillstände in Chemie- und Petrochemieanlagen (Antwerpen, Gent). A1-Bescheinigung und obligatorische Limosa-Vorabmeldung.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y Limosa',
        en: 'A1 Certificate & Limosa Clearance',
        it: 'Documentazione A1 e Dichiarazione Limosa',
        fr: 'Déclaration Limosa & Formulaire A1',
        de: 'A1-Bescheinigung & Limosa-Meldung'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento UE, declaración Limosa previa y certificado A1 de Seguridad Social.',
      en: 'EU Posted Workers Directive, Limosa declaration (Belgium), and A1 certificate.',
      it: 'Direttiva distacco UE, notifica Limosa e modello A1.',
      fr: 'Directive détachement UE, déclaration obligatoire Limosa et certificat A1.',
      de: 'EU-Entsenderichtlinie, Limosa-Meldung (Belgien) und A1-Bescheinigung.'
    }
  },

  NL: {
    countryCode: 'NL',
    flag: '🇳🇱',
    localizedName: {
      es: 'Países Bajos',
      en: 'Netherlands',
      it: 'Paesi Bassi',
      fr: 'Pays-Bas',
      de: 'Niederlande'
    },
    operationalStatus: 'desplazamiento_ue',
    statusLabel: {
      es: 'Capacidad de Movilización Transnacional (UE / A1)',
      en: 'Transnational Deployment Capability (EU / A1)',
      it: 'Capacità di Mobilitazione Transnazionale (UE / A1)',
      fr: 'Capacité de Déploiement Transnational (UE / A1)',
      de: 'Transnationale Einsatzkapazität (EU / A1)'
    },
    activeWorkers: '45+',
    metricsLabels: {
      projects: {
        es: 'Obras completadas',
        en: 'Completed projects',
        it: 'Lavori completati',
        fr: 'Chantiers réalisés',
        de: 'Abgeschlossene Projekte'
      },
      workers: {
        es: 'Trabajadores',
        en: 'Workers',
        it: 'Lavoratori',
        fr: 'Travailleurs',
        de: 'Fachkräfte'
      }
    },
    isDemoData: false,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: '10+',
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Rotterdam Petroquímico', 'Energía Térmica', 'Tubería Especializada', 'Instalaciones Portuarias', 'Química', 'Montaje'],
      en: ['Rotterdam Petrochemical', 'Thermal Energy', 'Specialized Piping', 'Port Facilities', 'Chemical', 'Assembly'],
      it: ['Petrolchimico Rotterdam', 'Energia Termica', 'Piping Specializzato', 'Impianti Portuali', 'Chimica', 'Montaggio'],
      fr: ['Pétrochimie Rotterdam', 'Énergie Thermique', 'Tuyauterie Spécialisée', 'Installations Portuaires', 'Chimie', 'Montage'],
      de: ['Petrochemie Rotterdam', 'Thermische Energie', 'Spezialrohrleitungsbau', 'Hafenanlagen', 'Chemie', 'Montage']
    },
    approvedSummary: {
      es: 'Capacidad de movilización a complejos petroquímicos y marítimos (Rotterdam, Moerdijk). Cobertura A1 y notificación en portal holandés PostNL / SVB.',
      en: 'Deployment capability to petrochemical and port clusters (Rotterdam, Moerdijk). A1 coverage and Dutch Posted Workers portal notification.',
      it: 'Capacità di mobilitazione nei complessi petrolchimici e portuali (Rotterdam). Copertura A1 e registrazione nel portale distacchi olandese.',
      fr: 'Capacité d\'intervention sur les complexes pétrochimiques et portuaires (Rotterdam, Moerdijk). Couverture A1 et déclaration sur le portail néerlandais.',
      de: 'Einsatzkapazität in Chemie- und Hafenkomplexen (Rotterdam, Moerdijk). A1-Bescheinigung und Meldung über das niederländische Meldeportal.'
    },
    coordination: {
      doc: {
        es: 'Documentación A1 y Meldeportal',
        en: 'A1 Certificate & Dutch Portal Registration',
        it: 'Documentazione A1 e Notifica Meldeportal',
        fr: 'Déclaration préalable & Formulaire A1',
        de: 'A1-Bescheinigung & Meldeportal-Registrierung'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Directiva de desplazamiento UE, portal de notificación postedworkers.nl y modelo A1.',
      en: 'EU Posted Workers Directive, postedworkers.nl notification portal, and A1 certificate.',
      it: 'Direttiva distacco UE, notifica postedworkers.nl e modello A1.',
      fr: 'Directive détachement UE, portail postedworkers.nl et certificat A1.',
      de: 'EU-Entsenderichtlinie, Meldeportal postedworkers.nl und A1-Bescheinigung.'
    }
  },

  GB: {
    countryCode: 'GB',
    flag: '🇬🇧',
    localizedName: {
      es: 'Reino Unido',
      en: 'United Kingdom',
      it: 'Regno Unito',
      fr: 'Royaume-Uni',
      de: 'Vereinigtes Königreich'
    },
    operationalStatus: 'sin_actuacion_publicada',
    statusLabel: {
      es: 'Sin Actuación Publicada — Requiere Estudio Específico',
      en: 'No Published Operations — Requires Case-by-case Review',
      it: 'Nessuna Attività Pubblicata — Richiede Valutazione Dedicata',
      fr: 'Aucune Opération Publiée — Nécessite une Étude Spécifique',
      de: 'Keine veröffentlichte Tätigkeit — Einzelfallprüfung erforderlich'
    },
    activeWorkers: null,
    workersDefinition: 'Profesionales técnicos propios en plantilla activa',
    completedProjects: null,
    reportingPeriod: '2026',
    updatedAt: '2026-10-08',
    publicationApproved: true,
    sectors: {
      es: ['Consultoría Técnica Específica', 'Estudio Aduanero y Visados'],
      en: ['Specific Technical Consulting', 'Customs Clearance & Visas'],
      it: ['Consulenza Tecnica Specifica', 'Studio Doganale e Visti'],
      fr: ['Conseil Technique Spécifique', 'Étude Douanière et Visas'],
      de: ['Spezifische technische Beratung', 'Zollabfertigung & Visa-Prüfung']
    },
    approvedSummary: {
      es: 'Territorio no comunitario (fuera del régimen automático de la Directiva UE de desplazamiento y cobertura A1). Toda eventual intervención requiere estudio aduanero de herramientas y visados técnicos de trabajo conforme a la normativa británica vigente.',
      en: 'Non-EU territory (outside automatic EU Posted Workers Directive and A1 mechanisms). Any potential operation requires dedicated customs clearance for tooling and specific work visas under current UK regulations.',
      it: 'Territorio extra-UE (escluso dal regime automatico della Direttiva distacco UE e modello A1). Eventuali commesse richiedono verifica doganale e visti di lavoro dedicati.',
      fr: 'Territoire non communautaire (hors champ automatique de la directive détachement UE et certificat A1). Toute intervention requiert une étude douanière spécifique et visas professionnels.',
      de: 'Nicht-EU-Gebiet (außerhalb der automatischen EU-Entsenderichtlinie und A1-Regelung). Mögliche Einsätze erfordern Zollabfertigung für Werkzeuge und gesonderte Arbeitsvisa nach britischem Recht.'
    },
    coordination: {
      doc: {
        es: 'Trámites aduaneros ATA y visados',
        en: 'ATA Carnet & Specific Work Visas',
        it: 'Carnet ATA e Visti Lavorativi',
        fr: 'Carnet ATA douanier & Visas de travail',
        de: 'Carnet ATA Zollverfahren & Arbeitsvisa'
      },
      plan: {
        es: 'Planificación de la movilización',
        en: 'Mobilization schedule planning',
        it: 'Pianificazione della mobilitazione',
        fr: 'Planification de mobilisation',
        de: 'Mobilisierungs- und Einsatzplanung'
      },
      tools: {
        es: 'Equipamiento y recursos técnicos',
        en: 'Technical tooling and certified equipment',
        it: 'Attrezzature e risorse tecniche',
        fr: 'Outillage et moyens techniques',
        de: 'Ausrüstung und technische Ressourcen'
      }
    },
    legalFramework: {
      es: 'Normativa de inmigración británica, visados laborales específicos y trámites aduaneros ATA para maquinaria.',
      en: 'UK Immigration Rules, temporary work visas, and ATA Carnet customs procedures for equipment.',
      it: 'Regole sull\'immigrazione UK, visti per tecnici e carnet ATA per le attrezzature.',
      fr: 'Règles d\'immigration britanniques, visas de travail temporaires et carnet ATA douanier.',
      de: 'Britische Einwanderungsgesetze, temporäre Arbeitsvisa und Carnet ATA für Ausrüstung.'
    }
  }
};
