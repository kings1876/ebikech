import { Language } from '../types';
import productsRaw from './products.json';

// Real catalogue numbers (not the original 500-product target)
const N = (productsRaw as unknown[]).length;
const B = new Set((productsRaw as { brandId: string }[]).map((p) => p.brandId)).size;

export interface Translations {
  header: {
    topBanner: string;
    independent: string;
    tagline: string;
    catalogue: string;
    brands: string;
    guides: string;
    subsidies: string;
    compare: string;
    searchPlaceholder: string;
    quickResults: string;
    allCategories: string;
    allBrands: string;
    models: string;
    total: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    tcsTested: string;
    cantonalSubs: string;
    dealerNetwork: string;
    quickAdvisorTitle: string;
    quickAdvisorDesc: string;
    selectCat: string;
    speedClass: string;
    all: string;
    budgetCatch: string;
    allPrices: string;
    under2000: string;
    from2000to3500: string;
    from3500to5000: string;
    over5000: string;
    showModels: string;
    catSectionTitle: string;
    catSectionDesc: string;
    explore: string;
    viewModels: string;
    tcsSectionBadge: string;
    tcsSectionTitle: string;
    tcsSectionDesc: string;
    allReportsCta: string;
    swissBrandsBadge: string;
    swissBrandsTitle: string;
    allBrandsCta: string;
    subsidiesBannerBadge: string;
    subsidiesBannerTitle: string;
    subsidiesBannerDesc: string;
    subsidiesBannerCta: string;
    guidesSectionBadge: string;
    guidesSectionTitle: string;
    allGuidesCta: string;
    articlesCount: string;
  };
  catalog: {
    allBikesTitle: string;
    modelsFound: string;
    filterButton: string;
    showingCount: string;
    sortBy: string;
    sortPopular: string;
    sortTcs: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortBatteryDesc: string;
    sortWeightAsc: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
    page: string;
    of: string;
    pageNotice: string;
    prev: string;
    next: string;
    allInCat: string;
  };
  filter: {
    title: string;
    reset: string;
    seoNoticeTitle: string;
    seoNoticeDesc: string;
    speedClassTitle: string;
    motorTitle: string;
    batteryTitle: string;
    priceTitle: string;
    frameTypeTitle: string;
    frameSizeTitle: string;
    useCaseTitle: string;
    tcsScoreTitle: string;
    tcsOnlyHigh: string;
    foundModels: string;
    diamond: string;
    stepThrough: string;
    trapeze: string;
    commute: string;
    touring: string;
    family: string;
    senior: string;
    beginner: string;
  };
  card: {
    speed45: string;
    speed25: string;
    swissMade: string;
    compare: string;
    inComparison: string;
    dealersInStock: string;
    viewDetails: string;
    torque: string;
    battery: string;
    weight: string;
    frame: string;
    trustpilotRating: string;
  };
  pdp: {
    home: string;
    catalogue: string;
    modelYear: string;
    torque: string;
    battery: string;
    weight: string;
    range: string;
    upTo: string;
    retailPrice: string;
    dealersAvailable: string;
    subsidyTipTitle: string;
    subsidyTipDesc: string;
    bookTestRideBtn: string;
    addToCompareBtn: string;
    inCompareBtn: string;
    tabTests: string;
    tabReviews: string;
    tabSpecs: string;
    testReportOf: string;
    pros: string;
    cons: string;
    verifiedPurchase: string;
    kmRidden: string;
    date: string;
    top: string;
    note: string;
    motorSpec: string;
    batterySpec: string;
    speedSpec: string;
    gearsSpec: string;
    brakesSpec: string;
    forkSpec: string;
    frameSpec: string;
    sizesSpec: string;
    weightSpec: string;
    lightingSpec: string;
    relatedTitle: string;
    trustpilotVerifiedTitle: string;
    trustpilotTrustscore: string;
    trustpilotBasedOn: string;
    allReviewsFilter: string;
    trustpilotOnlyFilter: string;
    googleOnlyFilter: string;
    verifiedOrder: string;
    helpfulQuestion: string;
    helpfulYes: string;
    independentSourceNote: string;
  };
  compare: {
    modelsCount: string;
    maxFour: string;
    viewCompare: string;
    modalTitle: string;
    modalSubtitle: string;
    clearAll: string;
    close: string;
    categorySpeed: string;
    tcsScore: string;
    motorTorque: string;
    batteryRange: string;
    weightMaterial: string;
    frameSizes: string;
    gearsBrakes: string;
    dealers: string;
    bookTestRide: string;
    rangeEst: string;
    pedalFreeTip: string;
  };
  testRide: {
    badge: string;
    title: string;
    desc: string;
    cantonLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    emailLabel: string;
    dateLabel: string;
    submitBtn: string;
    trustNote: string;
    successTitle: string;
    successDesc: string;
    doneBtn: string;
  };
  brands: {
    indexTitle: string;
    indexH1: string;
    indexDesc: string;
    tierA: string;
    tierB: string;
    tierC: string;
    modelsInCatalog: string;
    headquarters: string;
    serviceHub: string;
    typeSegments: string;
    categoriesInBrand: string;
    typeRuleNotice: string;
    indexedBadge: string;
    noindexBadge: string;
    allModelsOfBrand: string;
  };
  subsidies: {
    badge: string;
    h1: string;
    desc: string;
    filterCanton: string;
    allCantons: string;
    subsidyLabel: string;
    eligibleTypes: string;
    requirements: string;
    officialPortal: string;
    matchingModels: string;
    stepsTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  guides: {
    badge: string;
    h1: string;
    desc: string;
    readTime: string;
    keyTakeawaysTitle: string;
    calcTitle: string;
    calcDesc: string;
    inseamLabel: string;
    typeLabel: string;
    recommendedFrame: string;
    sizeCode: string;
    showMatchingBikes: string;
    legalTitle: string;
    legalColLaw: string;
    legalCol25: string;
    legalCol45: string;
    readArticle: string;
    backTo: string;
    findBikesCta: string;
  };
  footer: {
    tcsReports: string;
    tcsDesc: string;
    kassensturzScores: string;
    kassensturzDesc: string;
    cantonsCount: string;
    cantonsDesc: string;
    swissEngTitle: string;
    swissEngDesc: string;
    portalDesc: string;
    dsgNote: string;
    categoriesTitle: string;
    allCategoriesLink: string;
    brandsTitle: string;
    allBrandsLink: string;
    guidesTitle: string;
    cantonSubsidiesLink: string;
    legalLink: string;
    allRightsReserved: string;
    astraCompliance: string;
  };
}

export const I18N: Record<Language, Translations> = {
  de: {
    header: {
      topBanner: `${N} E-Bikes von ${B} Marken – Preise in CHF, technische Daten und Beratung für die Schweiz`,
      independent: `Preise in CHF`,
      tagline: 'Das Schweizer E-Bike Portal',
      catalogue: 'E-Bikes',
      brands: 'Marken',
      guides: 'Ratgeber',
      subsidies: 'Förderbeiträge',
      compare: 'Vergleich',
      searchPlaceholder: 'Modell, Motor, Marke...',
      quickResults: 'Schnelltreffer',
      allCategories: 'Alle 8 E-Bike Kategorien',
      allBrands: 'Schweizer Ikonen & Top Marken',
      models: 'Modelle',
      total: 'Total',
    },
    home: {
      heroBadge: 'Offizielle Schweizer E-Bike Vergleichsplattform',
      heroTitle: 'Das passende E-Bike für die Schweiz.',
      heroDesc: `Entdecken Sie ${N} E-Bikes aus 8 Kategorien von ${B} Marken – mit Preisen in CHF sowie technischen Daten zu Motor, Akku und Gewicht.`,
      tcsTested: `Technische Daten vom Hersteller`,
      cantonalSubs: 'Kantonale Förderung',
      dealerNetwork: `Beratung für die Schweiz`,
      quickAdvisorTitle: 'E-Bike Schnell-Berater',
      quickAdvisorDesc: 'In 3 Klicks zu passenden Modellen mit Schweizer Strassenzulassung.',
      selectCat: 'Kategorie auswählen',
      speedClass: 'Geschwindigkeitsklasse',
      all: 'Alle',
      budgetCatch: 'Budget in CHF',
      allPrices: 'Alle Preisklassen',
      under2000: 'Unter CHF 2’000.-',
      from2000to3500: 'CHF 2’000 – 3’500.-',
      from3500to5000: 'CHF 3’500 – 5’000.-',
      over5000: 'Über CHF 5’000.- (High-End)',
      showModels: 'Modelle anzeigen',
      catSectionTitle: 'E-Bikes nach Kategorie entdecken',
      catSectionDesc: `${N} Modelle exakt aufgeteilt auf 8 Schweizer Segmente`,
      explore: 'Entdecken',
      viewModels: 'Modelle ansehen',
      tcsSectionBadge: `Technische Daten`,
      tcsSectionTitle: `Beliebte E-Bikes im Überblick`,
      tcsSectionDesc: `Ausgewählte Modelle mit Motor, Akku und Preis in CHF.`,
      allReportsCta: `Alle ${N} E-Bikes ansehen →`,
      swissBrandsBadge: 'Schweizer Zweirad-Ingenieurskunst',
      swissBrandsTitle: 'Schweizer E-Bike Pioniere & Ikonen',
      allBrandsCta: `Alle ${B} Marken ansehen →`,
      subsidiesBannerBadge: 'Schweizer Fördergelder 2026',
      subsidiesBannerTitle: 'Bis zu CHF 1’000.- Zuschuss für Ihr neues E-Bike oder Cargo.',
      subsidiesBannerDesc: 'Zürich, Bern, Basel-Stadt, Genf, Lausanne, St. Gallen und über 80 Energiestädte fördern den Kauf von Elektro- und Lastenvelos.',
      subsidiesBannerCta: 'Kantonale Förderbeiträge prüfen →',
      guidesSectionBadge: 'Schweizer E-Bike Ratgeber',
      guidesSectionTitle: 'Wissen & Rechtslage für Schweizer Fahrer',
      allGuidesCta: 'Alle Ratgeber ansehen →',
      articlesCount: 'Fachartikel',
    },
    catalog: {
      allBikesTitle: 'Alle Schweizer E-Bikes',
      modelsFound: 'Modelle gefunden',
      filterButton: 'Filter',
      showingCount: 'Zeige',
      sortBy: 'Sortieren:',
      sortPopular: 'Beliebtheit (Bewertungen)',
      sortTcs: `Testurteil (Beste zuerst)`,
      sortPriceAsc: 'Preis: Aufsteigend (CHF)',
      sortPriceDesc: 'Preis: Absteigend (CHF)',
      sortBatteryDesc: 'Akkukapazität Wh (Grösste zuerst)',
      sortWeightAsc: 'Gewicht (Leichteste zuerst)',
      noResultsTitle: 'Keine E-Bikes für diese Filterkombination',
      noResultsDesc: 'Probieren Sie, einzelne Filter (z.B. Akku oder Preis) zurückzusetzen.',
      resetFilters: 'Filter zurücksetzen',
      page: 'Seite',
      of: 'von',
      pageNotice: '(Hinweis: Seite 2+ wird mit noindex ausgeliefert)',
      prev: 'Zurück',
      next: 'Weiter',
      allInCat: 'Alle',
    },
    filter: {
      title: 'Filter & Facetten',
      reset: 'Zurücksetzen',
      seoNoticeTitle: 'SEO Facetten-Regel aktiv:',
      seoNoticeDesc: 'Gefilterte Ansichten tragen noindex, follow und Canonical zeigt zur Haupt-Kategorie.',
      speedClassTitle: 'Geschwindigkeitsklasse',
      motorTitle: 'Motor-Hersteller',
      batteryTitle: 'Akkukapazität (Wh)',
      priceTitle: 'Preisklasse (CHF)',
      frameTypeTitle: 'Rahmenform',
      frameSizeTitle: 'Rahmengrösse',
      useCaseTitle: 'Einsatzbereich (Use Case)',
      tcsScoreTitle: `Testurteil`,
      tcsOnlyHigh: `Nur «Sehr empfehlenswert» (>80%)`,
      foundModels: 'Gefundene Modelle',
      diamond: 'Diamant (Herren / Sport)',
      stepThrough: 'Tiefeinsteiger (Wave / City)',
      trapeze: 'Trapez (Sportlicher Einstieg)',
      commute: 'Arbeitsweg & Pendeln',
      touring: 'Alpentouren & Reisen',
      family: 'Familie & Kindertransport',
      senior: 'Komfort & Senioren',
      beginner: 'E-Bike Einsteiger',
    },
    card: {
      speed45: '45 km/h (S-Pedelec)',
      speed25: '25 km/h',
      swissMade: 'Swiss Made',
      compare: 'Vergleichen',
      inComparison: 'Im Vergleich',
      dealersInStock: 'Fachhändler an Lager',
      viewDetails: 'Details & Testbericht ansehen',
      torque: 'Drehmoment',
      battery: 'Akku',
      weight: 'Gewicht',
      frame: 'Rahmentyp',
      trustpilotRating: 'Trustpilot Bewertung',
    },
    pdp: {
      home: 'Startseite',
      catalogue: 'E-Bikes',
      modelYear: 'Modelljahr',
      torque: 'Drehmoment',
      battery: 'Akkukapazität',
      weight: 'Gewicht',
      range: 'Reichweite',
      upTo: 'bis',
      retailPrice: 'Schweizer Fachhandelspreis (UVP)',
      dealersAvailable: 'Fachhändler lieferbar',
      subsidyTipTitle: 'Kantonale Förderung:',
      subsidyTipDesc: 'Für dieses Modell sind in vielen Schweizer Kantonen bis zu CHF 800.- Förderbeitrag möglich.',
      bookTestRideBtn: 'Kostenlose Probefahrt bei Schweizer Händler',
      addToCompareBtn: 'Zum E-Bike Vergleich hinzufügen',
      inCompareBtn: 'Im Modellvergleich (Auswählen zum Entfernen)',
      tabTests: `Testberichte`,
      tabReviews: 'Verifizierte Erfahrungen & Trustpilot',
      tabSpecs: 'Alle Technischen Daten',
      testReportOf: 'Schweiz Testbericht',
      pros: 'Vorteile (Pros)',
      cons: 'Nachteile (Cons)',
      verifiedPurchase: 'Verifizierter Kauf',
      kmRidden: 'km gefahren',
      date: 'Bewertung vom',
      top: 'Top:',
      note: 'Hinweis:',
      motorSpec: 'Motor & Antrieb',
      batterySpec: 'Akkukapazität',
      speedSpec: 'Geschwindigkeitsbegrenzung',
      gearsSpec: 'Schaltung',
      brakesSpec: 'Bremsanlage',
      forkSpec: 'Federgabel / Dämpfung',
      frameSpec: 'Rahmenmaterial & Form',
      sizesSpec: 'Lieferbare Rahmengrössen',
      weightSpec: 'Gewicht',
      lightingSpec: 'Beleuchtung & Display',
      relatedTitle: 'Ähnliche E-Bikes aus der Kategorie',
      trustpilotVerifiedTitle: 'Verifizierte Bewertungen auf Trustpilot & Google',
      trustpilotTrustscore: 'TrustScore auf Trustpilot Schweiz',
      trustpilotBasedOn: 'basierend auf verifizierten Schweizer Käufen',
      allReviewsFilter: 'Alle Bewertungen',
      trustpilotOnlyFilter: 'Trustpilot (Verifiziert)',
      googleOnlyFilter: 'Google Rezensionen',
      verifiedOrder: 'Verifizierte Bestellung',
      helpfulQuestion: 'War diese Bewertung nützlich?',
      helpfulYes: 'Hilfreich',
      independentSourceNote: 'Bewertungen stammen von verifizierten Schweizer Käufern über Trustpilot und Google Customer Reviews.',
    },
    compare: {
      modelsCount: 'Modelle im Vergleich',
      maxFour: 'Maximal 4 Modelle',
      viewCompare: 'Vergleich ansehen',
      modalTitle: 'Schweizer E-Bike Modellvergleich',
      modalSubtitle: `Direkter Vergleich von Preisen in CHF, Motoren, Akkus und Gewicht`,
      clearAll: 'Alle leeren',
      close: 'Schliessen',
      categorySpeed: 'Kategorie & Speed',
      tcsScore: `Testurteil`,
      motorTorque: 'Motor & Drehmoment',
      batteryRange: 'Akku & Reichweite',
      weightMaterial: 'Gewicht & Material',
      frameSizes: 'Rahmenform & Grössen',
      gearsBrakes: 'Schaltung & Bremsen',
      dealers: 'Schweizer Fachhändler',
      bookTestRide: 'Probefahrt buchen',
      rangeEst: 'Schweizer Profil',
      pedalFreeTip: 'Tipp: Alle E-Bikes können kostenlos bei einem Schweizer Partner-Fachhändler probegefahren werden.',
    },
    testRide: {
      badge: 'Kostenlose Probefahrt',
      title: 'testen',
      desc: 'Erleben Sie die Fahrdynamik und Schweizer Geometrie unverbindlich bei einem zertifizierten Fachhändler in Ihrer Nähe.',
      cantonLabel: 'Kanton für Fachhändler-Übergabe',
      nameLabel: 'Ihr Name',
      namePlaceholder: 'Vor- und Nachname',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      dateLabel: 'Wunschtermin',
      submitBtn: 'Unverbindliche Probefahrt anfragen',
      trustNote: 'Kostenlos · Keine Kaufverpflichtung · Schweizer Fachhändler',
      successTitle: 'Probefahrt vorgemerkt!',
      successDesc: 'Der zertifizierte Schweizer Fachhändler wird Sie telefonisch kontaktieren, um den Termin zu bestätigen.',
      doneBtn: 'Fertig',
    },
    brands: {
      indexTitle: 'Schweizer E-Bike Marken-Index',
      indexH1: `Alle ${B} E-Bike Marken in der Schweiz`,
      indexDesc: `Übersicht über Schweizer Hersteller und internationale Marken – mit Preisen in CHF und technischen Daten zu jedem Modell.`,
      tierA: `Marktführer Schweiz`,
      tierB: `Spezialisten & Premium`,
      tierC: `Schweizer Manufakturen & Nischen`,
      modelsInCatalog: 'Modelle im Schweizer Katalog',
      headquarters: 'Hauptsitz',
      serviceHub: 'Schweizer Service & Händlernetz',
      typeSegments: 'Segmentierung nach Typ',
      categoriesInBrand: 'Kategorien',
      typeRuleNotice: 'Kategorien mit mindestens 3 Modellen bilden eigenständige, indexierte SEO-Zielseiten.',
      indexedBadge: 'Indexiert (≥3 Modelle)',
      noindexBadge: 'Noindex (<3 Modelle)',
      allModelsOfBrand: 'Alle Modelle von',
    },
    subsidies: {
      badge: 'Schweizer Fördermittel 2026',
      h1: 'E-Bike Förderbeiträge in der Schweiz: Bis zu CHF 1’000.- Zuschuss',
      desc: 'Über 90 Schweizer Kantone, Städte und Energiestädte bezuschussen den Neukauf von umweltfreundlichen Elektro- und Lastenvelos.',
      filterCanton: 'Kanton filtern',
      allCantons: 'Alle Kantone',
      subsidyLabel: 'Zuschuss',
      eligibleTypes: 'Geförderte Fahrzeugtypen:',
      requirements: 'Voraussetzungen & Bedingungen:',
      officialPortal: 'Offizielles Portal:',
      matchingModels: 'Passende Modelle ansehen',
      stepsTitle: 'In 3 Schritten zum Schweizer Förderbeitrag',
      step1Title: 'Modell auswählen & Probefahrt',
      step1Desc: 'Wählen Sie ein zugelassenes Modell (25 oder 45 km/h) bei einem Schweizer Fachhändler.',
      step2Title: 'Kaufbeleg & Velo-Pass',
      step2Desc: 'Die Rechnung muss auf Ihren Schweizer Wohnsitz ausgestellt sein und die Rahmennummer enthalten.',
      step3Title: 'Antrag bei Gemeinde/Kanton',
      step3Desc: 'Online-Formular bei Ihrer Wohngemeinde oder dem kantonalen Energiefonds einreichen.',
    },
    guides: {
      badge: 'Schweizer Wissensportal',
      h1: 'Schweizer E-Bike Ratgeber 2026',
      desc: 'Fundiertes Fachwissen zu Schweizer Strassengesetzen (25 vs. 45 km/h), Rahmengrössen-Berechnung, Akku-Pflege im Winter und kantonalen Förderbeiträgen.',
      readTime: 'Min. Lesezeit',
      keyTakeawaysTitle: 'Die wichtigsten Punkte auf einen Blick',
      calcTitle: 'Interaktiver Schweizer Rahmengrössen-Rechner',
      calcDesc: 'Geben Sie Ihre gemessene Schrittlänge ein, um die perfekte Rahmenhöhe für Schweizer Topographie zu berechnen:',
      inseamLabel: 'Ihre Schrittlänge:',
      typeLabel: 'E-Bike Typ',
      recommendedFrame: 'Empfohlene Rahmenhöhe:',
      sizeCode: 'Grössen-Code:',
      showMatchingBikes: 'Passende E-Bikes anzeigen →',
      legalTitle: 'Schweizer Strassenverkehrsgesetz (ASTRA): 25 km/h vs. 45 km/h',
      legalColLaw: 'Regelung / Gesetz',
      legalCol25: 'E-Bike bis 25 km/h',
      legalCol45: 'Schnelles E-Bike bis 45 km/h',
      readArticle: 'Artikel lesen',
      backTo: 'Zurück zu',
      findBikesCta: 'Passende E-Bikes im Katalog finden →',
    },
    footer: {
      tcsReports: 'TCS Testberichte',
      tcsDesc: 'Geprüfte Reichweite & Bremsen',
      kassensturzScores: 'Kassensturz Noten',
      kassensturzDesc: 'Unabhängige Labortests',
      cantonsCount: 'Alle 26 Kantone',
      cantonsDesc: 'Fördergelder bis CHF 1’000.-',
      swissEngTitle: 'Swiss Engineering',
      swissEngDesc: 'Flyer, Stromer, Scott, BMC, Thömus',
      portalDesc: `VeloSchweiz zeigt ${N} E-Bikes von ${B} Marken mit Preisen in CHF und technischen Daten – dazu Ratgeber zu Gesetzgebung (25 vs 45 km/h) und kantonaler Förderung.`,
      dsgNote: '🇨🇭 Entwickelt nach Schweizer Datenschutzgesetz (DSG) & ASTRA-Richtlinien für Leicht-Motorfahrräder.',
      categoriesTitle: 'Kategorien',
      allCategoriesLink: `→ Alle 8 Kategorien (${N})`,
      brandsTitle: 'Top Marken',
      allBrandsLink: `→ Alle ${B} Marken (${N})`,
      guidesTitle: 'Ratgeber & Recht',
      cantonSubsidiesLink: '🇨🇭 Kantonale Förderbeiträge',
      legalLink: 'Impressum & Schweizer DSG',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      astraCompliance: 'ASTRA VTS / VRV Konform',
    },
  },

  fr: {
    header: {
      topBanner: `${N} vélos électriques de ${B} marques – prix en CHF, fiches techniques et conseils pour la Suisse`,
      independent: `Prix en CHF`,
      tagline: 'Le Portail Suisse du Vélo Électrique',
      catalogue: 'Vélos électriques',
      brands: 'Marques',
      guides: 'Guide & Conseils',
      subsidies: 'Subventions',
      compare: 'Comparateur',
      searchPlaceholder: 'Modèle, moteur, marque...',
      quickResults: 'Résultats rapides',
      allCategories: 'Toutes les 8 catégories d’e-bikes',
      allBrands: 'Marques suisses & internationales',
      models: 'Modèles',
      total: 'Total',
    },
    home: {
      heroBadge: 'Plateforme suisse officielle de comparaison e-bike',
      heroTitle: 'Le vélo électrique idéal pour la Suisse.',
      heroDesc: `Découvrez ${N} vélos électriques de 8 catégories et ${B} marques – avec prix en CHF et données techniques sur le moteur, la batterie et le poids.`,
      tcsTested: `Données techniques du fabricant`,
      cantonalSubs: 'Subventions cantonales',
      dealerNetwork: `Conseils pour la Suisse`,
      quickAdvisorTitle: 'Guide de choix express',
      quickAdvisorDesc: 'En 3 clics, trouvez les modèles adaptés homologués pour les routes suisses.',
      selectCat: 'Sélectionner la catégorie',
      speedClass: 'Classe de vitesse',
      all: 'Tous',
      budgetCatch: 'Budget en CHF',
      allPrices: 'Toutes les tranches de prix',
      under2000: 'Moins de 2’000 CHF',
      from2000to3500: '2’000 – 3’500 CHF',
      from3500to5000: '3’500 – 5’000 CHF',
      over5000: 'Plus de 5’000 CHF (Haut de gamme)',
      showModels: 'Afficher les modèles',
      catSectionTitle: 'Explorer les vélos électriques par catégorie',
      catSectionDesc: `${N} modèles répartis avec précision dans les 8 segments du marché suisse`,
      explore: 'Découvrir',
      viewModels: 'Voir les modèles',
      tcsSectionBadge: `Données techniques`,
      tcsSectionTitle: `Vélos électriques populaires en un coup d’œil`,
      tcsSectionDesc: `Modèles sélectionnés avec moteur, batterie et prix en CHF.`,
      allReportsCta: `Voir les ${N} vélos électriques →`,
      swissBrandsBadge: 'Ingénierie cycliste suisse',
      swissBrandsTitle: 'Pionniers & marques légendaires helvétiques',
      allBrandsCta: `Voir les ${B} marques →`,
      subsidiesBannerBadge: 'Aides financières suisses 2026',
      subsidiesBannerTitle: 'Jusqu’à 1’000 CHF de prime pour votre vélo électrique ou cargo.',
      subsidiesBannerDesc: 'Genève, Lausanne, Berne, Zurich, Bâle et plus de 80 Cités de l’énergie subventionnent l’achat de vélos écologiques.',
      subsidiesBannerCta: 'Vérifier les subventions de votre canton →',
      guidesSectionBadge: 'Guide pratique suisse',
      guidesSectionTitle: 'Législation & conseils pour cyclistes en Suisse',
      allGuidesCta: 'Voir tous les dossiers →',
      articlesCount: 'articles',
    },
    catalog: {
      allBikesTitle: 'Tous les Vélos Électriques en Suisse',
      modelsFound: 'modèles trouvés',
      filterButton: 'Filtres',
      showingCount: 'Affichage de',
      sortBy: 'Trier par :',
      sortPopular: 'Popularité (Avis cyclistes)',
      sortTcs: `Note de test (meilleures d’abord)`,
      sortPriceAsc: 'Prix : croissant (CHF)',
      sortPriceDesc: 'Prix : décroissant (CHF)',
      sortBatteryDesc: 'Capacité batterie Wh (Plus grande)',
      sortWeightAsc: 'Poids (Plus léger d’abord)',
      noResultsTitle: 'Aucun modèle correspondant à ces filtres',
      noResultsDesc: 'Essayez de réinitialiser certains critères (batterie ou prix).',
      resetFilters: 'Réinitialiser les filtres',
      page: 'Page',
      of: 'sur',
      pageNotice: '(Note : les pages 2+ sont délivrées en noindex pour le référencement)',
      prev: 'Précédent',
      next: 'Suivant',
      allInCat: 'Tous',
    },
    filter: {
      title: 'Filtres & Facettes',
      reset: 'Réinitialiser',
      seoNoticeTitle: 'Règle SEO facettes active :',
      seoNoticeDesc: 'Cette vue filtrée porte noindex, follow et l’URL canonique renvoie à la catégorie parente.',
      speedClassTitle: 'Classe de vitesse',
      motorTitle: 'Fabricant du moteur',
      batteryTitle: 'Capacité batterie (Wh)',
      priceTitle: 'Tranche de prix (CHF)',
      frameTypeTitle: 'Forme du cadre',
      frameSizeTitle: 'Taille de cadre',
      useCaseTitle: 'Usage principal',
      tcsScoreTitle: `Évaluation de test`,
      tcsOnlyHigh: `Uniquement « Très recommandé » (>80%)`,
      foundModels: 'Modèles correspondants',
      diamond: 'Diamant (Sport / Homme)',
      stepThrough: 'Enjambement bas (Ville / Confort)',
      trapeze: 'Trapèze (Polyvalent)',
      commute: 'Trajet travail & Navetteurs',
      touring: 'Randonnée & Voyages alpins',
      family: 'Famille & Transport enfants',
      senior: 'Confort & Seniors',
      beginner: 'Débutant en vélo électrique',
    },
    card: {
      speed45: '45 km/h (S-Pedelec)',
      speed25: '25 km/h',
      swissMade: 'Swiss Made',
      compare: 'Comparer',
      inComparison: 'Au comparateur',
      dealersInStock: 'revendeurs en stock',
      viewDetails: 'Fiche technique & test',
      torque: 'Couple',
      battery: 'Batterie',
      weight: 'Poids',
      frame: 'Cadre',
      trustpilotRating: 'Note Trustpilot',
    },
    pdp: {
      home: 'Accueil',
      catalogue: 'Vélos électriques',
      modelYear: 'Année modèle',
      torque: 'Couple moteur',
      battery: 'Batterie',
      weight: 'Poids',
      range: 'Autonomie estimée',
      upTo: 'jusqu’à',
      retailPrice: 'Prix conseillé suisse (TTC)',
      dealersAvailable: 'revendeurs disponibles',
      subsidyTipTitle: 'Subvention cantonale :',
      subsidyTipDesc: 'Ce modèle peut bénéficier de subventions directes allant jusqu’à 800 CHF selon votre commune.',
      bookTestRideBtn: 'Réserver un essai gratuit chez un vélociste',
      addToCompareBtn: 'Ajouter au comparateur',
      inCompareBtn: 'Dans le comparateur (cliquer pour retirer)',
      tabTests: `Rapports de test`,
      tabReviews: 'Avis vérifiés & Trustpilot',
      tabSpecs: 'Fiche technique complète',
      testReportOf: 'Rapport de test Suisse',
      pros: 'Points forts',
      cons: 'Points à considérer',
      verifiedPurchase: 'Achat vérifié en Suisse',
      kmRidden: 'km parcourus',
      date: 'Avis du',
      top: 'Atout :',
      note: 'Remarque :',
      motorSpec: 'Moteur & Assistance',
      batterySpec: 'Batterie & Amovibilité',
      speedSpec: 'Homologation de vitesse',
      gearsSpec: 'Transmission & Vitesses',
      brakesSpec: 'Système de freinage',
      forkSpec: 'Suspension & Fourche',
      frameSpec: 'Matériau & Géométrie',
      sizesSpec: 'Tailles disponibles',
      weightSpec: 'Poids total',
      lightingSpec: 'Éclairage & Compteur',
      relatedTitle: 'Autres vélos électriques dans la même catégorie',
      trustpilotVerifiedTitle: 'Avis vérifiés sur Trustpilot & Google',
      trustpilotTrustscore: 'TrustScore sur Trustpilot Suisse',
      trustpilotBasedOn: 'basé sur des commandes suisses vérifiées',
      allReviewsFilter: 'Tous les avis',
      trustpilotOnlyFilter: 'Trustpilot (Vérifié)',
      googleOnlyFilter: 'Avis Google',
      verifiedOrder: 'Commande vérifiée',
      helpfulQuestion: 'Cet avis vous a-t-il été utile ?',
      helpfulYes: 'Utile',
      independentSourceNote: 'Avis collectés auprès d’acheteurs suisses certifiés via Trustpilot et Google Customer Reviews.',
    },
    compare: {
      modelsCount: 'Vélos au comparateur',
      maxFour: '4 modèles maximum',
      viewCompare: 'Ouvrir le comparatif',
      modalTitle: 'Comparateur de vélos électriques en Suisse',
      modalSubtitle: `Comparaison directe des prix en CHF, moteurs, batteries et poids`,
      clearAll: 'Vider la sélection',
      close: 'Fermer',
      categorySpeed: 'Catégorie & Vitesse',
      tcsScore: `Note de test`,
      motorTorque: 'Moteur & Couple',
      batteryRange: 'Batterie & Autonomie',
      weightMaterial: 'Poids & Matériau',
      frameSizes: 'Forme & Tailles',
      gearsBrakes: 'Transmission & Freins',
      dealers: 'Disponibilité en Suisse',
      bookTestRide: 'Essai gratuit',
      rangeEst: 'Relief suisse',
      pedalFreeTip: 'Astuce : Tous les modèles peuvent être essayés sans frais auprès d’un vélociste agréé.',
    },
    testRide: {
      badge: 'Essai gratuit sans engagement',
      title: 'Tester le',
      desc: 'Découvrez les sensations de pilotage chez un revendeur certifié dans votre canton de résidence.',
      cantonLabel: 'Canton pour l’essai',
      nameLabel: 'Nom et prénom',
      namePlaceholder: 'Votre nom complet',
      phoneLabel: 'Numéro de téléphone',
      emailLabel: 'Adresse e-mail',
      dateLabel: 'Date souhaitée',
      submitBtn: 'Demander un essai gratuit',
      trustNote: 'Gratuit · Sans engagement · Revendeurs suisses certifiés',
      successTitle: 'Demande enregistrée !',
      successDesc: 'Le revendeur agréé pour votre région vous contactera pour convenir du rendez-vous.',
      doneBtn: 'Terminer',
    },
    brands: {
      indexTitle: 'Répertoire des marques en Suisse',
      indexH1: `Toutes les ${B} marques d’e-bikes en Suisse`,
      indexDesc: `Aperçu des fabricants suisses et des marques internationales – avec prix en CHF et données techniques pour chaque modèle.`,
      tierA: `Leaders en Suisse`,
      tierB: `Spécialistes & Haut de gamme`,
      tierC: `Manufatures suisses & Passion`,
      modelsInCatalog: 'modèles au catalogue suisse',
      headquarters: 'Siège social',
      serviceHub: 'Service & réseau suisse',
      typeSegments: 'Segmentation par catégorie',
      categoriesInBrand: 'Catégories',
      typeRuleNotice: 'Les catégories comptant 3 modèles ou plus constituent des pages cibles indexées pour le référencement.',
      indexedBadge: 'Indexé (≥3 modèles)',
      noindexBadge: 'Noindex (<3 modèles)',
      allModelsOfBrand: 'Tous les modèles de',
    },
    subsidies: {
      badge: 'Subventions écologiques suisses 2026',
      h1: 'Subventions vélo électrique en Suisse : jusqu’à 1’000 CHF d’aide',
      desc: 'Plus de 90 cantons et communes suisses encouragent la mobilité douce par des aides financières directes à l’achat.',
      filterCanton: 'Filtrer par canton',
      allCantons: 'Tous les cantons',
      subsidyLabel: 'Montant de l’aide',
      eligibleTypes: 'Véhicules éligibles :',
      requirements: 'Conditions d’octroi :',
      officialPortal: 'Portail officiel :',
      matchingModels: 'Voir les modèles éligibles',
      stepsTitle: '3 étapes pour toucher votre subvention',
      step1Title: 'Choix du vélo & essai',
      step1Desc: 'Sélectionnez un vélo électrique homologué chez un revendeur professionnel établi en Suisse.',
      step2Title: 'Facture avec numéro de cadre',
      step2Desc: 'La facture doit mentionner votre adresse de domicile et le numéro de série du cadre.',
      step3Title: 'Dépôt du dossier en commune',
      step3Desc: 'Transmettez le formulaire au service de l’énergie de votre commune ou canton.',
    },
    guides: {
      badge: 'Portail conseils & savoir',
      h1: 'Guide suisse du vélo électrique 2026',
      desc: 'Dossiers complets sur la loi sur la circulation (25 vs 45 km/h), le calcul de taille de cadre, l’entretien hivernal et les primes.',
      readTime: 'min de lecture',
      keyTakeawaysTitle: 'Points essentiels à retenir',
      calcTitle: 'Calculateur interactif de taille de cadre',
      calcDesc: 'Indiquez la mesure de votre entrejambe pour déterminer la taille de cadre idéale selon le relief suisse :',
      inseamLabel: 'Hauteur d’entrejambe :',
      typeLabel: 'Type de vélo',
      recommendedFrame: 'Taille recommandée :',
      sizeCode: 'Taille de référence :',
      showMatchingBikes: 'Voir les modèles adaptés →',
      legalTitle: 'Code de la route suisse (OFROU) : 25 km/h vs. 45 km/h',
      legalColLaw: 'Point de réglementation',
      legalCol25: 'Vélo électrique 25 km/h',
      legalCol45: 'Vélo rapide 45 km/h (S-Pedelec)',
      readArticle: 'Lire le dossier',
      backTo: 'Retour à',
      findBikesCta: 'Trouver un modèle au catalogue →',
    },
    footer: {
      tcsReports: 'Rapports de test TCS',
      tcsDesc: 'Autonomie & freinage certifiés',
      kassensturzScores: 'Notes A Bon Entendeur / Kassensturz',
      kassensturzDesc: 'Tests en laboratoire indépendant',
      cantonsCount: '26 Cantons suisses',
      cantonsDesc: 'Subventions jusqu’à CHF 1’000.-',
      swissEngTitle: 'Ingénierie suisse',
      swissEngDesc: 'Flyer, Stromer, Scott, BMC, Thömus',
      portalDesc: `VeloSuisse présente ${N} vélos électriques de ${B} marques avec prix en CHF et données techniques – ainsi que des guides sur la législation (25 vs 45 km/h) et les subventions cantonales.`,
      dsgNote: '🇨🇭 Développé conformément à la Loi fédérale sur la protection des données (LPD) et aux ordonnances OFROU.',
      categoriesTitle: 'Catégories',
      allCategoriesLink: `→ Toutes les 8 catégories (${N})`,
      brandsTitle: 'Grandes Marques',
      allBrandsLink: `→ Toutes les ${B} marques (${N})`,
      guidesTitle: 'Guides & Réglementation',
      cantonSubsidiesLink: '🇨🇭 Subventions cantonales',
      legalLink: 'Mentions légales & LPD',
      allRightsReserved: 'Tous droits réservés.',
      astraCompliance: 'Conforme aux directives OFROU OETV / OCR',
    },
  },

  it: {
    header: {
      topBanner: `${N} e-bike di ${B} marchi – prezzi in CHF, dati tecnici e consulenza per la Svizzera`,
      independent: `Prezzi in CHF`,
      tagline: 'Il Portale E-Bike Svizzero',
      catalogue: 'E-Bike',
      brands: 'Marchi',
      guides: 'Guida & Norme',
      subsidies: 'Incentivi',
      compare: 'Confronta',
      searchPlaceholder: 'Modello, motore, marca...',
      quickResults: 'Risultati rapidi',
      allCategories: 'Tutte le 8 categorie di e-bike',
      allBrands: 'Marchi svizzeri e internazionali',
      models: 'Modelli',
      total: 'Totale',
    },
    home: {
      heroBadge: 'Piattaforma ufficiale svizzera per il confronto e-bike',
      heroTitle: 'L’e-bike ideale per la Svizzera.',
      heroDesc: `Scopri ${N} e-bike di 8 categorie e ${B} marchi – con prezzi in CHF e dati tecnici su motore, batteria e peso.`,
      tcsTested: `Dati tecnici del produttore`,
      cantonalSubs: 'Incentivi cantonali',
      dealerNetwork: `Consulenza per la Svizzera`,
      quickAdvisorTitle: 'Consulente rapido e-bike',
      quickAdvisorDesc: 'In soli 3 clic trovi i modelli omologati per le strade svizzere.',
      selectCat: 'Seleziona categoria',
      speedClass: 'Classe di velocità',
      all: 'Tutte',
      budgetCatch: 'Budget in CHF',
      allPrices: 'Tutte le fasce di prezzo',
      under2000: 'Meno di 2’000 CHF',
      from2000to3500: '2’000 – 3’500 CHF',
      from3500to5000: '3’500 – 5’000 CHF',
      over5000: 'Oltre 5’000 CHF (Fascia alta)',
      showModels: 'Mostra modelli',
      catSectionTitle: 'Esplora le e-bike per categoria',
      catSectionDesc: `${N} modelli suddivisi nei segmenti della mobilità ciclistica svizzera`,
      explore: 'Esplora',
      viewModels: 'Vedi i modelli',
      tcsSectionBadge: `Dati tecnici`,
      tcsSectionTitle: `E-bike popolari in sintesi`,
      tcsSectionDesc: `Modelli selezionati con motore, batteria e prezzo in CHF.`,
      allReportsCta: `Vedi tutte le ${N} e-bike →`,
      swissBrandsBadge: 'Ingegneria ciclistica svizzera',
      swissBrandsTitle: 'Pionieri e marchi iconici elvetici',
      allBrandsCta: `Vedi tutti i ${B} marchi →`,
      subsidiesBannerBadge: 'Incentivi ecologici svizzeri 2026',
      subsidiesBannerTitle: 'Fino a 1’000 CHF di contributo per la tua nuova e-bike o cargo.',
      subsidiesBannerDesc: 'Ticino, Ginevra, Losanna, Zurigo, Berna e oltre 80 città dell’energia finanziano l’acquisto di biciclette elettriche.',
      subsidiesBannerCta: 'Verifica gli incentivi nel tuo cantone →',
      guidesSectionBadge: 'Guida pratica svizzera',
      guidesSectionTitle: 'Norme stradali & consigli per ciclisti in Svizzera',
      allGuidesCta: 'Tutte le guide →',
      articlesCount: 'articoli',
    },
    catalog: {
      allBikesTitle: 'Catalogo Completo E-Bike in Svizzera',
      modelsFound: 'modelli trovati',
      filterButton: 'Filtri',
      showingCount: 'Visualizzati',
      sortBy: 'Ordina per:',
      sortPopular: 'Popolarità (Recensioni)',
      sortTcs: `Giudizio del test (migliori prima)`,
      sortPriceAsc: 'Prezzo: crescente (CHF)',
      sortPriceDesc: 'Prezzo: decrescente (CHF)',
      sortBatteryDesc: 'Batteria Wh (Capacità maggiore)',
      sortWeightAsc: 'Peso (Più leggere prima)',
      noResultsTitle: 'Nessuna e-bike per questi filtri',
      noResultsDesc: 'Prova a reimpostare alcuni filtri (batteria o prezzo).',
      resetFilters: 'Reimposta filtri',
      page: 'Pagina',
      of: 'di',
      pageNotice: '(Nota: la pagina 2+ è contrassegnata come noindex per il SEO)',
      prev: 'Precedente',
      next: 'Successivo',
      allInCat: 'Tutti',
    },
    filter: {
      title: 'Filtri & Caratteristiche',
      reset: 'Reimposta',
      seoNoticeTitle: 'Regola SEO filtri attiva:',
      seoNoticeDesc: 'Questa visualizzazione filtrata ha noindex, follow e il tag canonical punta alla categoria principale.',
      speedClassTitle: 'Classe di velocità',
      motorTitle: 'Produttore motore',
      batteryTitle: 'Capacità batteria (Wh)',
      priceTitle: 'Fascia di prezzo (CHF)',
      frameTypeTitle: 'Forma telaio',
      frameSizeTitle: 'Misura telaio',
      useCaseTitle: 'Ambito d’uso',
      tcsScoreTitle: `Giudizio del test`,
      tcsOnlyHigh: `Solo «Molto consigliato» (>80%)`,
      foundModels: 'Modelli trovati',
      diamond: 'Diamante (Sport / Uomo)',
      stepThrough: 'Scavalco basso (Città / Comfort)',
      trapeze: 'Trapezio (Versatile)',
      commute: 'Casa-lavoro & Pendolari',
      touring: 'Cicloturismo & Grandi viaggi',
      family: 'Famiglia & Trasporto bimbi',
      senior: 'Comfort & Terza età',
      beginner: 'Primi passi su e-bike',
    },
    card: {
      speed45: '45 km/h (S-Pedelec)',
      speed25: '25 km/h',
      swissMade: 'Swiss Made',
      compare: 'Confronta',
      inComparison: 'Nel comparatore',
      dealersInStock: 'rivenditori disponibili',
      viewDetails: 'Scheda tecnica e test',
      torque: 'Coppia',
      battery: 'Batteria',
      weight: 'Peso',
      frame: 'Telaio',
      trustpilotRating: 'Valutazione Trustpilot',
    },
    pdp: {
      home: 'Home',
      catalogue: 'E-Bike',
      modelYear: 'Anno modello',
      torque: 'Coppia motore',
      battery: 'Capacità batteria',
      weight: 'Peso',
      range: 'Autonomia stimata',
      upTo: 'fino a',
      retailPrice: 'Prezzo consigliato svizzero (IVA incl.)',
      dealersAvailable: 'rivenditori con pronta consegna',
      subsidyTipTitle: 'Incentivo cantonale:',
      subsidyTipDesc: 'Per questo modello sono previsti fino a 800 CHF di sussidio nel tuo cantone o comune.',
      bookTestRideBtn: 'Prenota prova gratuita da rivenditore svizzero',
      addToCompareBtn: 'Aggiungi al confronto e-bike',
      inCompareBtn: 'Nel comparatore (clicca per rimuovere)',
      tabTests: `Rapporti di test`,
      tabReviews: 'Recensioni verificate & Trustpilot',
      tabSpecs: 'Tutti i dati tecnici',
      testReportOf: 'Rapporto di prova Svizzera',
      pros: 'Punti di forza',
      cons: 'Aspetti da considerare',
      verifiedPurchase: 'Acquisto verificato in Svizzera',
      kmRidden: 'km percorsi',
      date: 'Recensione del',
      top: 'Vantaggio:',
      note: 'Nota:',
      motorSpec: 'Motore e propulsione',
      batterySpec: 'Batteria e rimovibilità',
      speedSpec: 'Omologazione velocità',
      gearsSpec: 'Cambio e rapporti',
      brakesSpec: 'Impianto frenante',
      forkSpec: 'Sospensioni e forcella',
      frameSpec: 'Materiale telaio e geometria',
      sizesSpec: 'Misure disponibili',
      weightSpec: 'Peso totale',
      lightingSpec: 'Luci e display',
      relatedTitle: 'Altre e-bike della stessa categoria',
      trustpilotVerifiedTitle: 'Recensioni verificate su Trustpilot & Google',
      trustpilotTrustscore: 'TrustScore su Trustpilot Svizzera',
      trustpilotBasedOn: 'basato su acquisti verificati in Svizzera',
      allReviewsFilter: 'Tutte le recensioni',
      trustpilotOnlyFilter: 'Trustpilot (Verificato)',
      googleOnlyFilter: 'Recensioni Google',
      verifiedOrder: 'Ordine verificato',
      helpfulQuestion: 'Questa recensione è stata utile?',
      helpfulYes: 'Utile',
      independentSourceNote: 'Recensioni raccolte da acquirenti svizzeri verificati tramite Trustpilot e Google Customer Reviews.',
    },
    compare: {
      modelsCount: 'E-bike nel comparatore',
      maxFour: 'Massimo 4 modelli',
      viewCompare: 'Apri confronto',
      modalTitle: 'Confronto e-bike in Svizzera',
      modalSubtitle: `Confronto diretto di prezzi in CHF, motori, batterie e peso`,
      clearAll: 'Svuota tutto',
      close: 'Chiudi',
      categorySpeed: 'Categoria & Velocità',
      tcsScore: `Giudizio del test`,
      motorTorque: 'Motore & Coppia',
      batteryRange: 'Batteria & Autonomia',
      weightMaterial: 'Peso & Materiale',
      frameSizes: 'Geometria & Misure',
      gearsBrakes: 'Cambio & Freni',
      dealers: 'Disponibilità in Svizzera',
      bookTestRide: 'Prenota prova',
      rangeEst: 'Profilo svizzero',
      pedalFreeTip: 'Consiglio: Puoi provare qualsiasi modello gratuitamente presso un rivenditore autorizzato svizzero.',
    },
    testRide: {
      badge: 'Prova gratuita senza impegno',
      title: 'Provare la',
      desc: 'Scopri la guidabilità e la qualità costruttiva presso un rivenditore specializzato nella tua zona.',
      cantonLabel: 'Cantone per la prova',
      nameLabel: 'Nome e cognome',
      namePlaceholder: 'Il tuo nome completo',
      phoneLabel: 'Telefono',
      emailLabel: 'E-mail',
      dateLabel: 'Data desiderata',
      submitBtn: 'Richiedi prova gratuita',
      trustNote: 'Gratuito · Senza impegno · Rivenditori svizzeri autorizzati',
      successTitle: 'Richiesta inviata!',
      successDesc: 'Il rivenditore specializzato ti contatterà per confermare data e orario della prova.',
      doneBtn: 'Fatto',
    },
    brands: {
      indexTitle: 'Indice marchi e-bike in Svizzera',
      indexH1: `Tutti i ${B} marchi di e-bike in Svizzera`,
      indexDesc: `Panoramica dei produttori svizzeri e dei marchi internazionali – con prezzi in CHF e dati tecnici per ogni modello.`,
      tierA: `Leader di mercato in Svizzera`,
      tierB: `Specialisti & Marchi Premium`,
      tierC: `Manifatture svizzere e d’eccellenza`,
      modelsInCatalog: 'modelli nel catalogo svizzero',
      headquarters: 'Sede centrale',
      serviceHub: 'Assistenza e rete svizzera',
      typeSegments: 'Segmentazione per tipologia',
      categoriesInBrand: 'Categorie',
      typeRuleNotice: 'Le categorie con almeno 3 modelli costituiscono pagine indicizzate SEO indipendenti.',
      indexedBadge: 'Indicizzato (≥3 modelli)',
      noindexBadge: 'Noindex (<3 modelli)',
      allModelsOfBrand: 'Tutti i modelli di',
    },
    subsidies: {
      badge: 'Incentivi ecologici svizzeri 2026',
      h1: 'Incentivi e-bike in Svizzera: fino a 1’000 CHF di sussidio',
      desc: 'Oltre 90 cantoni e comuni svizzeri sostengono la mobilità sostenibile tramite contributi a fondo perduto.',
      filterCanton: 'Filtra per cantone',
      allCantons: 'Tutti i cantoni',
      subsidyLabel: 'Contributo',
      eligibleTypes: 'Veicoli ammessi:',
      requirements: 'Requisiti e condizioni:',
      officialPortal: 'Portale ufficiale:',
      matchingModels: 'Vedi i modelli compatibili',
      stepsTitle: 'In 3 passi verso il contributo cantonale',
      step1Title: 'Scelta della bici e prova',
      step1Desc: 'Scegli un modello omologato presso un rivenditore specializzato in Svizzera.',
      step2Title: 'Fattura con numero di telaio',
      step2Desc: 'La fattura deve riportare il tuo indirizzo di domicilio svizzero e la matricola del telaio.',
      step3Title: 'Richiesta al comune/cantone',
      step3Desc: 'Invia il modulo allo sportello energia del tuo comune o cantone.',
    },
    guides: {
      badge: 'Portale informativo svizzero',
      h1: 'Guida svizzera all’e-bike 2026',
      desc: 'Approfondimenti su norme stradali USTRA (25 vs 45 km/h), calcolo della misura del telaio, cura della batteria e incentivi.',
      readTime: 'min di lettura',
      keyTakeawaysTitle: 'Punti chiave da ricordare',
      calcTitle: 'Calcolatore interattivo misura telaio',
      calcDesc: 'Inserisci l’altezza del tuo cavallo per calcolare l’altezza del telaio ideale per le strade svizzere:',
      inseamLabel: 'Misura del cavallo:',
      typeLabel: 'Tipologia e-bike',
      recommendedFrame: 'Misura telaio consigliata:',
      sizeCode: 'Taglia telaio:',
      showMatchingBikes: 'Vedi modelli compatibili →',
      legalTitle: 'Codice della strada svizzero (USTRA): 25 km/h vs. 45 km/h',
      legalColLaw: 'Norma stradale',
      legalCol25: 'E-Bike fino a 25 km/h',
      legalCol45: 'E-Bike veloce fino a 45 km/h',
      readArticle: 'Leggi l’articolo',
      backTo: 'Torna a',
      findBikesCta: 'Trova modelli nel catalogo →',
    },
    footer: {
      tcsReports: 'Rapporti di prova TCS',
      tcsDesc: 'Autonomia e frenata verificate',
      kassensturzScores: 'Valutazioni Patti Chiari / TCS',
      kassensturzDesc: 'Test di laboratorio indipendenti',
      cantonsCount: 'Tutti i 26 Cantoni',
      cantonsDesc: 'Incentivi fino a CHF 1’000.-',
      swissEngTitle: 'Ingegneria Svizzera',
      swissEngDesc: 'Flyer, Stromer, Scott, BMC, Thömus',
      portalDesc: `VeloSvizzera presenta ${N} e-bike di ${B} marchi con prezzi in CHF e dati tecnici – oltre a guide su normativa (25 vs 45 km/h) e incentivi cantonali.`,
      dsgNote: '🇨🇭 Sviluppato in conformità con la Legge federale sulla protezione dei dati (LPD) e le ordinanze USTRA.',
      categoriesTitle: 'Categorie',
      allCategoriesLink: `→ Tutte le 8 categorie (${N})`,
      brandsTitle: 'Marchi Principali',
      allBrandsLink: `→ Tutti i ${B} marchi (${N})`,
      guidesTitle: 'Guida & Normative',
      cantonSubsidiesLink: '🇨🇭 Incentivi cantonali',
      legalLink: 'Colophon & LPD Svizzera',
      allRightsReserved: 'Tutti i diritti riservati.',
      astraCompliance: 'Conforme alle norme USTRA OETV / ONC',
    },
  },
};
