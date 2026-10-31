import { Language, LocalizedString, Product } from '../types';

/** A keyword landing page that groups products across categories (e.g. "Damen E-Bikes"). */
export interface CollectionDef {
  id: string;
  slug: LocalizedString;
  /** Heading / link label */
  name: LocalizedString;
  /** Keyword phrase used in titles and descriptions */
  keyword: LocalizedString;
  filter: (p: Product) => boolean;
  /** Blog guide that goes deeper on this topic (BlogPost.id) */
  guideId?: string;
}

export const COLLECTIONS: CollectionDef[] = [
  {
    id: 'damen',
    slug: { de: 'damen-e-bikes', fr: 'velos-electriques-femme', it: 'e-bike-donna' },
    name: { de: 'Damen E-Bikes', fr: 'Vélos électriques dame', it: 'Biciclette elettriche donna' },
    keyword: { de: 'Damen E-Bike', fr: 'Vélo électrique dame', it: 'Bicicletta elettrica donna' },
    // Models with a low step-through frame (what shops sell as "Damen" / Tiefeinsteiger)
    filter: (p) => p.frameType === 'step-through',
    guideId: 'damen-e-bike-kaufen',
  },
];

export interface FaqEntry { q: string; a: string }

export interface LandingContent {
  /** Paragraphs; {n}, {min}, {brands} are replaced with real catalogue numbers */
  intro: Record<Language, string[]>;
  faq: Record<Language, FaqEntry[]>;
  guideId?: string;
}

/** Extra on-page content, keyed by collection id or category id. */
export const LANDING_CONTENT: Record<string, LandingContent> = {
  damen: {
    guideId: 'damen-e-bike-kaufen',
    intro: {
      de: [
        'Damen-E-Bikes haben einen tiefen Durchstieg: Sie steigen bequem auf und ab, auch mit Einkaufstasche oder Kindersitz. Unter diesem Rahmen steckt dieselbe Technik wie bei jedem anderen E-Bike – Mittelmotor, Akku und Federung.',
        'In unserem Katalog finden Sie {n} Modelle mit Tiefeinstieg von {brands} u. a. – vom City- über das Trekking- bis zum Mountainbike, ab CHF {min}. Filtern Sie nach Motor, Akku, Gewicht und Preis.',
      ],
      fr: [
        'Les vélos électriques dame (ou femme) ont un cadre bas : on monte et descend facilement, même avec un sac de courses ou un siège enfant. Sous ce cadre se trouve la même technique que sur tout autre vélo électrique – moteur central, batterie et suspension.',
        'Notre catalogue compte {n} modèles à cadre bas de {brands} et d’autres marques – du vélo de ville au VTT en passant par le trekking, dès CHF {min}. Filtrez par moteur, batterie, poids et prix.',
      ],
      it: [
        'Le biciclette elettriche donna hanno un telaio basso: si sale e si scende comodamente, anche con la borsa della spesa o il seggiolino. Sotto il telaio c’è la stessa tecnica di ogni altra e-bike – motore centrale, batteria e sospensioni.',
        'Il nostro catalogo conta {n} modelli a telaio basso di {brands} e altri – dalla city alla trekking fino alla mountain bike, da CHF {min}. Filtrate per motore, batteria, peso e prezzo.',
      ],
    },
    faq: {
      de: [
        { q: 'Was ist der Unterschied zwischen Damen- und Herren-E-Bike?', a: 'Meist nur die Rahmenform: Damenmodelle haben einen tiefen Durchstieg, Herrenmodelle ein Oberrohr. Motor, Akku und Ausstattung sind bei gleichem Modell in der Regel identisch; Grössen und Sitzposition können abweichen.' },
        { q: 'Welche Rahmengrösse passt zu mir?', a: 'Massgebend sind Körpergrösse und Schrittlänge. Die Grössentabelle des Herstellers ist der beste Ausgangspunkt; zwischen zwei Grössen wählen Sie für den Alltag eher die kleinere.' },
        { q: 'Wie viel Akku brauche ich?', a: 'Für den Alltag reichen meist 400 bis 625 Wh. Wer viele Höhenmeter fährt oder lange Touren plant, wählt einen grösseren Akku.' },
        { q: 'Sind Tiefeinsteiger nur für Damen?', a: 'Nein. Ein tiefer Einstieg erleichtert das Auf- und Absteigen und passt für alle, die ihn bevorzugen.' },
      ],
      fr: [
        { q: 'Quelle différence entre vélo électrique femme et homme ?', a: 'En général seulement la forme du cadre : les modèles femme ont un passage bas, les modèles homme un tube supérieur. Moteur, batterie et équipement sont en principe identiques pour un même modèle ; les tailles et la position peuvent différer.' },
        { q: 'Quelle taille de cadre me convient ?', a: 'La taille et l’entrejambe sont déterminantes. Le tableau du fabricant est le meilleur point de départ ; entre deux tailles, choisissez plutôt la plus petite pour le quotidien.' },
        { q: 'De combien de batterie ai-je besoin ?', a: 'Pour le quotidien, 400 à 625 Wh suffisent généralement. Si vous faites beaucoup de dénivelé ou de longues excursions, choisissez une batterie plus grande.' },
        { q: 'Les cadres bas sont-ils réservés aux femmes ?', a: 'Non. Un passage bas facilite la montée et la descente et convient à toute personne qui le préfère.' },
      ],
      it: [
        { q: 'Che differenza c’è tra e-bike donna e uomo?', a: 'Di solito solo la forma del telaio: i modelli donna hanno un passaggio basso, quelli uomo un tubo orizzontale. Motore, batteria e dotazione sono in genere identici a parità di modello; taglie e posizione possono variare.' },
        { q: 'Quale taglia di telaio fa per me?', a: 'Contano altezza e lunghezza della gamba. La tabella del produttore è il miglior punto di partenza; tra due taglie, per l’uso quotidiano scegliete la più piccola.' },
        { q: 'Di quanta batteria ho bisogno?', a: 'Per l’uso quotidiano di solito bastano 400–625 Wh. Con molto dislivello o lunghe escursioni scegliete una batteria più grande.' },
        { q: 'I telai bassi sono solo per donne?', a: 'No. Un passaggio basso facilita salita e discesa e va bene per chiunque lo preferisca.' },
      ],
    },
  },
  'schnelle-e-bikes': {
    guideId: 'e-bike-45-kmh-kaufen',
    intro: {
      de: [
        'Ein E-Bike 45 unterstützt das Treten bis 45 km/h und gilt in der Schweiz als Motorfahrrad. Es lohnt sich für lange Pendlerstrecken, auf denen ein E-Bike 25 zu langsam wäre.',
        'In unserem Katalog finden Sie {n} schnelle E-Bikes von {brands} ab CHF {min}. Beachten Sie die Voraussetzungen: Führerausweis, Kontrollschild mit Haftpflichtversicherung und Helm.',
      ],
      fr: [
        'Un e-bike 45 assiste le pédalage jusqu’à 45 km/h et est considéré en Suisse comme un cyclomoteur. Il convient aux longs trajets pendulaires, où un e-bike 25 serait trop lent.',
        'Notre catalogue compte {n} vélos électriques rapides de {brands} dès CHF {min}. Tenez compte des conditions : permis de conduire, plaque de contrôle avec assurance responsabilité civile et casque.',
      ],
      it: [
        'Una e-bike 45 assiste la pedalata fino a 45 km/h ed è considerata in Svizzera un ciclomotore. Conviene per i lunghi tragitti quotidiani, dove una e-bike 25 sarebbe troppo lenta.',
        'Il nostro catalogo conta {n} e-bike veloci di {brands} da CHF {min}. Tenete conto dei requisiti: licenza di condurre, targa con assicurazione di responsabilità civile e casco.',
      ],
    },
    faq: {
      de: [
        { q: 'Brauche ich einen Führerausweis für ein E-Bike 45?', a: 'Ja, mindestens Kategorie M. Zusätzlich sind ein Kontrollschild mit Haftpflichtversicherung und ein Helm Pflicht, und das Licht muss auch tagsüber eingeschaltet sein.' },
        { q: 'Wo darf ich mit einem E-Bike 45 fahren?', a: 'Auf der Strasse und auf Radstreifen. Auf Radwegen sind schnelle E-Bikes nur erlaubt, wo es signalisiert ist.' },
        { q: 'Ab welchem Alter darf man ein E-Bike 45 fahren?', a: 'In der Regel ab 16 Jahren mit dem passenden Führerausweis. Massgebend sind die geltenden Vorschriften.' },
        { q: 'Was kostet ein E-Bike 45 zusätzlich?', a: 'Rechnen Sie neben dem Kaufpreis mit Kontrollschild, Haftpflichtversicherung und gegebenenfalls dem Führerausweis. Die Höhe hängt von Kanton und Versicherung ab.' },
      ],
      fr: [
        { q: 'Faut-il un permis pour un e-bike 45 ?', a: 'Oui, au minimum la catégorie M. Une plaque de contrôle avec assurance responsabilité civile et le casque sont aussi obligatoires, et les feux doivent être allumés de jour.' },
        { q: 'Où puis-je rouler avec un e-bike 45 ?', a: 'Sur la route et sur les bandes cyclables. Sur les pistes cyclables, les vélos électriques rapides ne sont autorisés que là où c’est signalé.' },
        { q: 'À partir de quel âge peut-on conduire un e-bike 45 ?', a: 'En général dès 16 ans avec le permis approprié. Les prescriptions en vigueur font foi.' },
        { q: 'Combien coûte un e-bike 45 en plus ?', a: 'Outre le prix d’achat, comptez la plaque, l’assurance responsabilité civile et éventuellement le permis. Le montant dépend du canton et de l’assureur.' },
      ],
      it: [
        { q: 'Serve la licenza per una e-bike 45?', a: 'Sì, almeno la categoria M. Sono obbligatori anche una targa con assicurazione di responsabilità civile e il casco, e le luci devono essere accese anche di giorno.' },
        { q: 'Dove posso circolare con una e-bike 45?', a: 'Sulla strada e sulle corsie ciclabili. Sulle piste ciclabili le e-bike veloci sono ammesse solo dove è segnalato.' },
        { q: 'Da che età si può guidare una e-bike 45?', a: 'In genere dai 16 anni con la licenza adeguata. Fanno fede le disposizioni vigenti.' },
        { q: 'Quanto costa in più una e-bike 45?', a: 'Oltre al prezzo d’acquisto, calcolate targa, assicurazione di responsabilità civile ed eventualmente la licenza. L’importo dipende da cantone e assicurazione.' },
      ],
    },
  },
};

export function findCollectionBySlug(slug: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.slug.de === slug || c.slug.fr === slug || c.slug.it === slug);
}
