import { CategoryDef } from '../types';
import productsRaw from './products.json';

export const SECTION_ROOTS = {
  catalogue: {
    de: 'e-bikes',
    fr: 'velos-electriques',
    it: 'e-bike',
  },
  brands: {
    de: 'marken',
    fr: 'marques',
    it: 'marchi',
  },
  guides: {
    de: 'ratgeber',
    fr: 'guide',
    it: 'guida',
  },
} as const;

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'e-mountainbikes',
    slug: {
      de: 'e-mountainbikes',
      fr: 'vtt-electriques',
      it: 'mountain-bike-elettriche',
    },
    name: {
      de: 'E-Mountainbikes',
      fr: 'VTT électriques',
      it: 'Mountain bike elettriche',
    },
    targetCount: 130,
    icon: 'Mountain',
    description: {
      de: 'Kraftvolle Elektro-Mountainbikes für anspruchsvolle Schweizer Alpen-Trails, Schotterpisten und Singletrails.',
      fr: 'VTT électriques puissants taillés pour les cols alpins suisses, sentiers techniques et singletracks.',
      it: 'Potenti e-mountain bike ideali per i sentieri alpini svizzeri, ghiaia e percorsi impegnativi.',
    },
    subcategories: [
      {
        id: 'e-hardtails',
        slug: {
          de: 'e-hardtails',
          fr: 'vtt-semi-rigides',
          it: 'hardtail-elettriche',
        },
        name: {
          de: 'E-Hardtails',
          fr: 'VTT semi-rigides',
          it: 'Hardtail elettriche',
        },
        targetCount: 45,
        parentId: 'e-mountainbikes',
      },
      {
        id: 'e-fullys',
        slug: {
          de: 'e-fullys',
          fr: 'vtt-tout-suspendus',
          it: 'full-elettriche',
        },
        name: {
          de: 'E-Bike Fully',
          fr: 'VTT tout-suspendus',
          it: 'Full elettriche',
        },
        targetCount: 85,
        parentId: 'e-mountainbikes',
      },
    ],
  },
  {
    id: 'e-trekkingbikes',
    slug: {
      de: 'e-trekkingbikes',
      fr: 'velos-trekking',
      it: 'trekking',
    },
    name: {
      de: 'E-Trekkingbikes',
      fr: 'Vélos de trekking électriques',
      it: 'E-Bike Trekking',
    },
    targetCount: 100,
    icon: 'Compass',
    description: {
      de: 'Die Allrounder für lange Touren durchs Mittelland, Flussradwege und den täglichen Arbeitsweg.',
      fr: 'Les polyvalents pour les longues randonnées sur le plateau suisse, véloroutes et trajets quotidiens.',
      it: 'I tuttofare per lunghi tour panoramici, piste ciclabili e spostamenti quotidiani.',
    },
  },
  {
    id: 'e-citybikes',
    slug: {
      de: 'e-citybikes',
      fr: 'velos-de-ville',
      it: 'city-bike',
    },
    name: {
      de: 'E-Citybikes',
      fr: 'Vélos de ville électriques',
      it: 'E-Bike City',
    },
    targetCount: 90,
    icon: 'Building2',
    description: {
      de: 'Bequeme Tiefeinsteiger und urbane Pendler-E-Bikes für Zürich, Basel, Bern, Genf und Lausanne.',
      fr: 'Vélos à enjambement bas et citadins confortables pour Zurich, Bâle, Berne, Genève et Lausanne.',
      it: 'Comode e-bike urbane e a scavalco basso per le città svizzere e la vita di tutti i giorni.',
    },
  },
  {
    id: 'e-rennvelos-gravel',
    slug: {
      de: 'e-rennvelos-gravel',
      fr: 'route-gravel',
      it: 'corsa-gravel',
    },
    name: {
      de: 'E-Rennvelos & Gravel',
      fr: 'Vélos de route et gravel électriques',
      it: 'E-Bike da corsa e gravel',
    },
    targetCount: 50,
    icon: 'Zap',
    description: {
      de: 'Leichtgewichtige E-Bikes für Rennrad-Passfahrten und unbefestigte Schweizer Schotterwege.',
      fr: 'Vélos électriques ultralégers pour grimper les grands cols et explorer les chemins de gravier.',
      it: 'E-bike leggere e aerodinamiche per scalare i passi alpini e strade sterrate.',
    },
  },
  {
    id: 'schnelle-e-bikes',
    slug: {
      de: 'schnelle-e-bikes',
      fr: 'rapides-45-kmh',
      it: 'veloci-45-kmh',
    },
    name: {
      de: 'Schnelle E-Bikes (45 km/h)',
      fr: 'Vélos électriques rapides (45 km/h)',
      it: 'E-Bike veloci (45 km/h)',
    },
    targetCount: 45,
    icon: 'Gauge',
    description: {
      de: 'S-Pedelecs bis 45 km/h für weite Pendelstrecken. Schweizer Zulassung mit gelbem Kontrollschild und Mofa-Ausweis.',
      fr: 'S-Pedelecs jusqu’à 45 km/h pour les trajets pendulaires. Immatriculation suisse obligatoire (plaque jaune).',
      it: 'S-Pedelec fino a 45 km/h per pendolari esigenti. Omologazione svizzera con targa gialla e patente M.',
    },
  },
  {
    id: 'e-lastenvelos',
    slug: {
      de: 'e-lastenvelos',
      fr: 'velos-cargo',
      it: 'cargo',
    },
    name: {
      de: 'E-Lastenvelos',
      fr: 'Vélos cargo électriques',
      it: 'E-Bike Cargo',
    },
    targetCount: 35,
    icon: 'Truck',
    description: {
      de: 'Familien- und Transportvelos mit bis zu 200 kg Nutzlast. Umweltfreundlicher Ersatz für das Zweitauto.',
      fr: 'Vélos cargos familiaux et utilitaires jusqu’à 200 kg de charge utile. L’alternative idéale à la deuxième voiture.',
      it: 'Bici cargo per famiglie e trasporto carichi pesanti. La vera alternativa all’auto.',
    },
  },
  {
    id: 'e-faltvelos',
    slug: {
      de: 'e-faltvelos',
      fr: 'velos-pliants',
      it: 'pieghevoli',
    },
    name: {
      de: 'E-Faltvelos',
      fr: 'Vélos pliants électriques',
      it: 'E-Bike pieghevoli',
    },
    targetCount: 25,
    icon: 'FolderSync',
    description: {
      de: 'Kompakt zusammenklappbar und perfekt für den kombinierten Verkehr mit SBB-Zügen und Trams.',
      fr: 'Pliables en quelques secondes, gratuits dans les trains CFF comme bagage à main.',
      it: 'Pieghevoli in pochi secondi, perfetti da trasportare gratuitamente sui treni FFS.',
    },
  },
  {
    id: 'e-bikes-jugend',
    slug: {
      de: 'e-bikes-jugend',
      fr: 'velos-ados',
      it: 'ragazzi',
    },
    name: {
      de: 'E-Bikes Jugend',
      fr: 'Vélos électriques ados',
      it: 'E-Bike ragazzi',
    },
    targetCount: 25,
    icon: 'Smile',
    description: {
      de: 'Ergonomische 24" und 26" E-Bikes für Kinder und Jugendliche ab 14/16 Jahren nach Schweizer Gesetzgebung.',
      fr: 'Vélos électriques 24" et 26" adaptés aux adolescents dès 14/16 ans selon la législation suisse.',
      it: 'E-bike ergonomiche per ragazzi e adolescenti conformi alle norme di circolazione svizzere.',
    },
  },
];

// Display counts reflect the real catalogue, not the original 500-product target.
const _catalogue = productsRaw as unknown as { categoryId: string; subcategoryId?: string }[];
for (const c of CATEGORIES) {
  c.targetCount = _catalogue.filter((p) => p.categoryId === c.id).length;
  for (const s of c.subcategories || []) {
    s.targetCount = _catalogue.filter((p) => p.categoryId === c.id && p.subcategoryId === s.id).length;
  }
}
