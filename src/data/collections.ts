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
  /** Short qualifier of the subset, used in the meta description ("... Modelle <blurb> ab CHF ...") */
  blurb: LocalizedString;
  /** Blog guide that goes deeper on this topic (BlogPost.id) */
  guideId?: string;
}

export const COLLECTIONS: CollectionDef[] = [
  {
    id: 'damen',
    slug: { de: 'damen-e-bikes', fr: 'velos-electriques-femme', it: 'e-bike-donna' },
    name: { de: 'E-Bike Damen', fr: 'Vélos électriques dame', it: 'Biciclette elettriche donna' },
    keyword: { de: 'E-Bike Damen', fr: 'Vélo électrique dame', it: 'Bicicletta elettrica donna' },
    // Models with a low step-through frame (what shops sell as "Damen" / Tiefeinsteiger)
    filter: (p) => p.frameType === 'step-through',
    blurb: { de: 'mit Tiefeinstieg', fr: 'à cadre bas', it: 'a telaio basso' },
    guideId: 'damen-e-bike-kaufen',
  },
  {
    id: 'herren',
    slug: { de: 'e-bike-herren', fr: 'velos-electriques-homme', it: 'e-bike-uomo' },
    name: { de: 'E-Bike Herren', fr: 'Vélos électriques homme', it: 'Biciclette elettriche uomo' },
    keyword: { de: 'E-Bike Herren', fr: 'Vélo électrique homme', it: 'Bicicletta elettrica uomo' },
    // Diamond frame with top tube (what shops sell as "Herren"); youth bikes are not part of it
    filter: (p) => p.frameType === 'diamond' && p.categoryId !== 'e-bikes-jugend',
    blurb: { de: 'mit Diamantrahmen', fr: 'à cadre diamant', it: 'a telaio diamante' },
  },
  {
    id: 'leicht',
    slug: { de: 'leichte-e-bikes', fr: 'velos-electriques-legers', it: 'e-bike-leggere' },
    name: { de: 'Leichte E-Bikes', fr: 'Vélos électriques légers', it: 'Biciclette elettriche leggere' },
    keyword: { de: 'Leichtes E-Bike', fr: 'Vélo électrique léger', it: 'Bicicletta elettrica leggera' },
    // Only models with a known manufacturer weight of 20 kg or less
    filter: (p) => p.weightKg !== null && p.weightKg <= 20,
    blurb: { de: 'bis 20 kg', fr: 'jusqu’à 20 kg', it: 'fino a 20 kg' },
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
  herren: {
    intro: {
      de: [
        'Herren-E-Bikes haben einen Diamantrahmen mit durchgehendem Oberrohr. Diese Bauform ist bei sportlichen Modellen wie E-Mountainbikes, Gravel- und Trekkingbikes die Regel. Die Technik darunter – Mittelmotor, Akku und Federung – ist dieselbe wie bei Modellen mit Tiefeinstieg.',
        'In unserem Katalog finden Sie {n} Modelle mit Diamantrahmen von {brands} u. a., ab CHF {min}. Filtern Sie nach Kategorie, Motor, Akku, Gewicht und Preis.',
      ],
      fr: [
        'Les vélos électriques homme ont un cadre diamant avec tube supérieur continu. Cette forme est la règle sur les modèles sportifs comme les VTT électriques, les gravel et les vélos de trekking. La technique – moteur central, batterie et suspension – est la même que sur les modèles à cadre bas.',
        'Notre catalogue compte {n} modèles à cadre diamant de {brands} et d’autres marques, dès CHF {min}. Filtrez par catégorie, moteur, batterie, poids et prix.',
      ],
      it: [
        'Le biciclette elettriche uomo hanno un telaio a diamante con tubo orizzontale continuo. Questa forma è la regola sui modelli sportivi come mountain bike elettriche, gravel e trekking. La tecnica – motore centrale, batteria e sospensioni – è la stessa dei modelli a telaio basso.',
        'Il nostro catalogo conta {n} modelli a telaio diamante di {brands} e altri, da CHF {min}. Filtrate per categoria, motore, batteria, peso e prezzo.',
      ],
    },
    faq: {
      de: [
        { q: 'Sind Herren-E-Bikes nur für Männer?', a: 'Nein. «Herren» beschreibt nur die Rahmenform mit Oberrohr. Sie passt für alle, die ein sportliches, steifes Rad ohne tiefen Durchstieg bevorzugen.' },
        { q: 'Was ist der Unterschied zwischen Herren- und Damen-E-Bike?', a: 'Meist nur der Rahmen: Herrenmodelle haben ein Oberrohr, Damenmodelle einen tiefen Durchstieg. Motor, Akku und Ausstattung sind bei gleichem Modell in der Regel identisch.' },
        { q: 'Welche Rahmengrösse passt zu mir?', a: 'Massgebend sind Körpergrösse und Schrittlänge. Die Grössentabelle des Herstellers ist der beste Ausgangspunkt; die verfügbaren Grössen stehen bei jedem Modell.' },
      ],
      fr: [
        { q: 'Les vélos électriques homme sont-ils réservés aux hommes ?', a: 'Non. « Homme » décrit seulement la forme du cadre avec tube supérieur. Il convient à toute personne qui préfère un vélo sportif et rigide sans passage bas.' },
        { q: 'Quelle différence entre vélo électrique homme et femme ?', a: 'En général seulement le cadre : les modèles homme ont un tube supérieur, les modèles femme un passage bas. Moteur, batterie et équipement sont en principe identiques pour un même modèle.' },
        { q: 'Quelle taille de cadre me convient ?', a: 'La taille et l’entrejambe sont déterminantes. Le tableau du fabricant est le meilleur point de départ ; les tailles disponibles figurent sur chaque modèle.' },
      ],
      it: [
        { q: 'Le e-bike uomo sono solo per uomini?', a: 'No. «Uomo» descrive solo la forma del telaio con tubo orizzontale. Va bene per chiunque preferisca una bici sportiva e rigida senza passaggio basso.' },
        { q: 'Che differenza c’è tra e-bike uomo e donna?', a: 'Di solito solo il telaio: i modelli uomo hanno un tubo orizzontale, quelli donna un passaggio basso. Motore, batteria e dotazione sono in genere identici a parità di modello.' },
        { q: 'Quale taglia di telaio fa per me?', a: 'Contano altezza e lunghezza della gamba. La tabella del produttore è il miglior punto di partenza; le taglie disponibili sono indicate per ogni modello.' },
      ],
    },
  },
  leicht: {
    intro: {
      de: [
        'Ein leichtes E-Bike wiegt bis 20 kg. Zum Vergleich: Das mittlere E-Bike in unserem Katalog liegt bei gut 25 kg. Den Unterschied spüren Sie beim Tragen, beim Verladen und beim Fahren ohne Motorunterstützung.',
        'Leichte Modelle haben meist kleinere Akkus und kommen häufig als Gravel- oder Rennvelo-E-Bike. In unserem Katalog finden Sie {n} Modelle bis 20 kg von {brands} u. a., ab CHF {min}. Gewichte sind Herstellerangaben.',
      ],
      fr: [
        'Un vélo électrique léger pèse jusqu’à 20 kg. À titre de comparaison, le vélo électrique médian de notre catalogue dépasse 25 kg. La différence se sent au portage, au chargement et en roulant sans assistance.',
        'Les modèles légers ont en général des batteries plus petites et sont souvent des vélos gravel ou de route électriques. Notre catalogue compte {n} modèles jusqu’à 20 kg de {brands} et d’autres marques, dès CHF {min}. Les poids sont ceux indiqués par les fabricants.',
      ],
      it: [
        'Una bicicletta elettrica leggera pesa fino a 20 kg. Per confronto, la e-bike mediana del nostro catalogo supera i 25 kg. La differenza si sente quando si porta, si carica o si pedala senza assistenza.',
        'I modelli leggeri hanno in genere batterie più piccole e sono spesso gravel o bici da corsa elettriche. Il nostro catalogo conta {n} modelli fino a 20 kg di {brands} e altri, da CHF {min}. I pesi sono quelli dichiarati dai produttori.',
      ],
    },
    faq: {
      de: [
        { q: 'Wie leicht kann ein E-Bike sein?', a: 'Die leichtesten Modelle in unserem Katalog wiegen rund 10 kg (Herstellerangabe). Das sind meist sportliche Rennvelo- und Gravel-E-Bikes mit kleinem Akku.' },
        { q: 'Warum haben leichte E-Bikes oft kleinere Akkus?', a: 'Der Akku ist eines der schwersten Bauteile. Leichte Modelle verwenden deshalb oft Akkus mit rund 300 bis 400 Wh statt der 500 bis 750 Wh, die bei Trekking- und Mountainbikes üblich sind.' },
        { q: 'Für wen lohnt sich ein leichtes E-Bike?', a: 'Für alle, die ihr Rad oft tragen oder verladen, sportlich fahren oder das Rad auch ohne Motorunterstützung gern bewegen.' },
      ],
      fr: [
        { q: 'Quel est le poids minimal d’un vélo électrique ?', a: 'Les modèles les plus légers de notre catalogue pèsent environ 10 kg (indication du fabricant). Ce sont surtout des vélos de route et gravel électriques à petite batterie.' },
        { q: 'Pourquoi les vélos électriques légers ont-ils souvent de plus petites batteries ?', a: 'La batterie est l’un des composants les plus lourds. Les modèles légers utilisent donc souvent des batteries d’environ 300 à 400 Wh, contre 500 à 750 Wh sur les vélos de trekking et VTT.' },
        { q: 'À qui convient un vélo électrique léger ?', a: 'À celles et ceux qui portent ou chargent souvent leur vélo, roulent de façon sportive ou aiment aussi rouler sans assistance.' },
      ],
      it: [
        { q: 'Quanto può pesare al minimo una e-bike?', a: 'I modelli più leggeri del nostro catalogo pesano circa 10 kg (dato del produttore). Sono soprattutto gravel e bici da corsa elettriche con batteria piccola.' },
        { q: 'Perché le e-bike leggere hanno spesso batterie più piccole?', a: 'La batteria è uno dei componenti più pesanti. I modelli leggeri usano quindi spesso batterie da circa 300–400 Wh, contro i 500–750 Wh di trekking e mountain bike.' },
        { q: 'Per chi è adatta una e-bike leggera?', a: 'Per chi porta o carica spesso la bici, pedala in modo sportivo o ama muoversi anche senza assistenza.' },
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
        { q: 'Wo darf ich mit einem E-Bike 45 fahren?', a: 'Auf der Strasse, auf Radstreifen und in der Regel auch auf Radwegen. Wo Motorfahrräder verboten sind, muss das Rad geschoben werden; auf dem Trottoir ist das Fahren nicht erlaubt.' },
        { q: 'Ab welchem Alter darf man ein E-Bike 45 fahren?', a: 'Ab 14 Jahren, mit dem Führerausweis Kategorie M. Massgebend sind die geltenden Vorschriften.' },
        { q: 'Was kostet ein E-Bike 45 zusätzlich?', a: 'Rechnen Sie neben dem Kaufpreis mit Kontrollschild, Haftpflichtversicherung und gegebenenfalls dem Führerausweis. Die Höhe hängt von Kanton und Versicherung ab.' },
      ],
      fr: [
        { q: 'Faut-il un permis pour un e-bike 45 ?', a: 'Oui, au minimum la catégorie M. Une plaque de contrôle avec assurance responsabilité civile et le casque sont aussi obligatoires, et les feux doivent être allumés de jour.' },
        { q: 'Où puis-je rouler avec un e-bike 45 ?', a: 'Sur la route, sur les bandes cyclables et en règle générale aussi sur les pistes cyclables. Là où les cyclomoteurs sont interdits, il faut pousser le vélo ; le trottoir est interdit.' },
        { q: 'À partir de quel âge peut-on conduire un e-bike 45 ?', a: 'Dès 14 ans, avec le permis de catégorie M. Les prescriptions en vigueur font foi.' },
        { q: 'Combien coûte un e-bike 45 en plus ?', a: 'Outre le prix d’achat, comptez la plaque, l’assurance responsabilité civile et éventuellement le permis. Le montant dépend du canton et de l’assureur.' },
      ],
      it: [
        { q: 'Serve la licenza per una e-bike 45?', a: 'Sì, almeno la categoria M. Sono obbligatori anche una targa con assicurazione di responsabilità civile e il casco, e le luci devono essere accese anche di giorno.' },
        { q: 'Dove posso circolare con una e-bike 45?', a: 'Sulla strada, sulle corsie ciclabili e di regola anche sulle piste ciclabili. Dove i ciclomotori sono vietati bisogna spingere la bici; sul marciapiede non è ammesso circolare.' },
        { q: 'Da che età si può guidare una e-bike 45?', a: 'Dai 14 anni, con la licenza di categoria M. Fanno fede le disposizioni vigenti.' },
        { q: 'Quanto costa in più una e-bike 45?', a: 'Oltre al prezzo d’acquisto, calcolate targa, assicurazione di responsabilità civile ed eventualmente la licenza. L’importo dipende da cantone e assicurazione.' },
      ],
    },
  },
};

export function findCollectionBySlug(slug: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.slug.de === slug || c.slug.fr === slug || c.slug.it === slug);
}
