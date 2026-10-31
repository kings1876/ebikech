import { LocalizedString } from '../types';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  publishedDate: string; // ISO
  readMinutes: number;
  body: { de: BlogSection[]; fr: BlogSection[]; it: BlogSection[] };
}

const NOTE: LocalizedString = {
  de: 'Die Angaben dienen der Orientierung. Verbindlich sind die jeweils geltenden Vorschriften (z. B. ASTRA und die kantonalen Strassenverkehrsämter).',
  fr: 'Ces informations sont données à titre indicatif. Seules les prescriptions en vigueur font foi (p. ex. OFROU et services cantonaux des automobiles).',
  it: 'Le informazioni sono indicative. Fanno fede le disposizioni vigenti (ad es. USTRA e uffici cantonali della circolazione).',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'e-bike-25-vs-45',
    slug: { de: 'e-bike-25-oder-e-bike-45', fr: 'e-bike-25-ou-e-bike-45', it: 'e-bike-25-o-e-bike-45' },
    title: {
      de: 'E-Bike 25 oder E-Bike 45? Die Unterschiede in der Schweiz',
      fr: 'E-bike 25 ou e-bike 45 ? Les différences en Suisse',
      it: 'E-bike 25 o e-bike 45? Le differenze in Svizzera',
    },
    excerpt: {
      de: 'Langsames oder schnelles E-Bike: Was gilt bei Tempo, Führerausweis, Kontrollschild und Helm?',
      fr: 'E-bike lent ou rapide : que prévoit la loi pour la vitesse, le permis, la plaque et le casque ?',
      it: 'E-bike lenta o veloce: cosa prevedono le norme su velocità, licenza, targa e casco?',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    body: {
      de: [
        {
          heading: 'Zwei Klassen, zwei Regelwerke',
          paragraphs: [
            'In der Schweiz werden E-Bikes grob in zwei Klassen eingeteilt. Das langsame E-Bike (E-Bike 25) unterstützt das Treten bis 25 km/h und gilt rechtlich als Fahrrad. Das schnelle E-Bike (E-Bike 45) unterstützt bis 45 km/h und wird wie ein Motorfahrrad behandelt.',
          ],
        },
        {
          heading: 'E-Bike 25: wie ein normales Velo',
          paragraphs: [
            'Für das E-Bike 25 sind in der Regel weder ein Kontrollschild noch ein Führerausweis nötig, und es darf ab 14 Jahren gefahren werden. Ein Helm ist empfohlen, aber nicht vorgeschrieben. Es ist die häufigste Wahl für Alltag, Freizeit und Touren.',
          ],
        },
        {
          heading: 'E-Bike 45: schneller, aber mit Pflichten',
          paragraphs: [
            'Wer ein schnelles E-Bike fährt, braucht einen Führerausweis (mindestens Kategorie M), ein Kontrollschild mit Haftpflichtversicherung und muss einen Helm tragen. Das Licht muss auch tagsüber eingeschaltet sein. Dafür sind lange Pendlerstrecken deutlich schneller zu bewältigen.',
          ],
        },
        {
          heading: 'Welche Klasse passt zu mir?',
          paragraphs: [
            'Für Freizeit, kurze und mittlere Wege sowie den Einsatz im Gelände reicht meist ein E-Bike 25. Wer täglich weite Strecken pendelt und mit dem Verkehr mithalten möchte, prüft ein E-Bike 45. Fragen Sie sich auch, ob Sie die Zusatzkosten und Auflagen akzeptieren möchten.',
            NOTE.de,
          ],
        },
      ],
      fr: [
        {
          heading: 'Deux classes, deux régimes',
          paragraphs: [
            'En Suisse, les vélos électriques se répartissent grossièrement en deux classes. L’e-bike lent (e-bike 25) assiste le pédalage jusqu’à 25 km/h et est considéré comme un vélo. L’e-bike rapide (e-bike 45) assiste jusqu’à 45 km/h et est traité comme un cyclomoteur.',
          ],
        },
        {
          heading: 'E-bike 25 : comme un vélo ordinaire',
          paragraphs: [
            'Pour l’e-bike 25, ni plaque ni permis ne sont en principe nécessaires, et l’âge minimum est de 14 ans. Le casque est recommandé, mais pas obligatoire. C’est le choix le plus courant pour le quotidien, les loisirs et les excursions.',
          ],
        },
        {
          heading: 'E-bike 45 : plus rapide, mais avec des obligations',
          paragraphs: [
            'Pour un e-bike rapide, il faut un permis de conduire (au minimum catégorie M), une plaque de contrôle avec assurance responsabilité civile, et le port du casque est obligatoire. Les feux doivent aussi être allumés de jour. En contrepartie, les longs trajets pendulaires sont nettement plus rapides.',
          ],
        },
        {
          heading: 'Quelle classe me convient ?',
          paragraphs: [
            'Pour les loisirs, les trajets courts à moyens et le tout-terrain, un e-bike 25 suffit généralement. Si vous parcourez chaque jour de longues distances et souhaitez suivre le trafic, envisagez un e-bike 45, en tenant compte des coûts et contraintes supplémentaires.',
            NOTE.fr,
          ],
        },
      ],
      it: [
        {
          heading: 'Due classi, due regimi',
          paragraphs: [
            'In Svizzera le biciclette elettriche si dividono grosso modo in due classi. L’e-bike lenta (e-bike 25) assiste la pedalata fino a 25 km/h ed è considerata una bicicletta. L’e-bike veloce (e-bike 45) assiste fino a 45 km/h ed è trattata come un ciclomotore.',
          ],
        },
        {
          heading: 'E-bike 25: come una bici normale',
          paragraphs: [
            'Per l’e-bike 25 di regola non servono né targa né licenza, e l’età minima è di 14 anni. Il casco è raccomandato ma non obbligatorio. È la scelta più diffusa per la vita quotidiana, il tempo libero e le escursioni.',
          ],
        },
        {
          heading: 'E-bike 45: più veloce, ma con degli obblighi',
          paragraphs: [
            'Chi guida un’e-bike veloce ha bisogno di una licenza di condurre (almeno categoria M), di una targa con assicurazione di responsabilità civile e deve indossare il casco. Le luci devono essere accese anche di giorno. In cambio, i lunghi tragitti quotidiani sono molto più rapidi.',
          ],
        },
        {
          heading: 'Quale classe fa per me?',
          paragraphs: [
            'Per il tempo libero, i percorsi brevi e medi e l’uso in fuoristrada di solito basta un’e-bike 25. Chi percorre ogni giorno lunghe distanze e vuole stare al passo con il traffico valuta un’e-bike 45, tenendo conto dei costi e degli obblighi aggiuntivi.',
            NOTE.it,
          ],
        },
      ],
    },
  },
  {
    id: 'battery-range',
    slug: { de: 'akku-und-reichweite-verstehen', fr: 'comprendre-batterie-et-autonomie', it: 'capire-batteria-e-autonomia' },
    title: {
      de: 'Akkugrösse und Reichweite: Wie viele Wh brauche ich?',
      fr: 'Capacité de batterie et autonomie : combien de Wh faut-il ?',
      it: 'Capacità della batteria e autonomia: quanti Wh servono?',
    },
    excerpt: {
      de: 'Wh, Unterstützungsstufe, Höhenmeter: So lesen Sie Akkuangaben richtig und schätzen Ihre Reichweite realistisch ein.',
      fr: 'Wh, niveau d’assistance, dénivelé : comment lire les données de batterie et estimer l’autonomie de façon réaliste.',
      it: 'Wh, livello di assistenza, dislivello: come leggere i dati della batteria e stimare l’autonomia in modo realistico.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    body: {
      de: [
        {
          heading: 'Was bedeuten Wattstunden (Wh)?',
          paragraphs: [
            'Die Akkukapazität wird in Wattstunden (Wh) angegeben: Je höher der Wert, desto mehr Energie ist gespeichert. Gängige E-Bike-Akkus liegen grob zwischen 400 und 800 Wh, Cargo-Velos und Modelle mit Zweitakku auch darüber.',
          ],
        },
        {
          heading: 'Wovon die Reichweite abhängt',
          paragraphs: [
            'Die tatsächliche Reichweite hängt von der gewählten Unterstützungsstufe, den Höhenmetern, dem Gesamtgewicht inklusive Gepäck, dem Reifendruck, der Temperatur und dem Fahrstil ab. Herstellerangaben sind meist Bestwerte unter günstigen Bedingungen.',
            'Als grober Anhaltspunkt verbraucht ein E-Bike je nach Einsatz oft zwischen 5 und 12 Wh pro Kilometer. In hügeligem Gelände und bei hoher Unterstützung liegt der Verbrauch höher.',
          ],
        },
        {
          heading: 'Welche Grösse passt?',
          paragraphs: [
            'Für den Arbeitsweg oder kurze Ausflüge genügt oft ein Akku im mittleren Bereich. Wer lange Touren, viele Höhenmeter oder schwere Lasten plant, wählt eher einen grösseren Akku oder ein Modell mit Zusatzakku. Mehr Kapazität bedeutet allerdings auch mehr Gewicht und einen höheren Preis.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Que signifient les wattheures (Wh) ?',
          paragraphs: [
            'La capacité de la batterie s’exprime en wattheures (Wh) : plus la valeur est élevée, plus l’énergie stockée est importante. Les batteries courantes se situent grosso modo entre 400 et 800 Wh ; les vélos cargo et les modèles à double batterie dépassent souvent ces valeurs.',
          ],
        },
        {
          heading: 'De quoi dépend l’autonomie ?',
          paragraphs: [
            'L’autonomie réelle dépend du niveau d’assistance choisi, du dénivelé, du poids total y compris les bagages, de la pression des pneus, de la température et du style de conduite. Les chiffres des fabricants sont généralement des valeurs maximales dans des conditions favorables.',
            'À titre indicatif, un vélo électrique consomme souvent entre 5 et 12 Wh par kilomètre selon l’usage. En terrain vallonné et avec une forte assistance, la consommation est plus élevée.',
          ],
        },
        {
          heading: 'Quelle taille choisir ?',
          paragraphs: [
            'Pour le trajet domicile-travail ou de courtes sorties, une batterie de capacité moyenne suffit souvent. Pour de longues randonnées, beaucoup de dénivelé ou des charges lourdes, on choisira plutôt une batterie plus grande ou un modèle avec batterie supplémentaire. Plus de capacité signifie toutefois plus de poids et un prix plus élevé.',
          ],
        },
      ],
      it: [
        {
          heading: 'Cosa sono i wattora (Wh)?',
          paragraphs: [
            'La capacità della batteria si esprime in wattora (Wh): più alto è il valore, maggiore è l’energia immagazzinata. Le batterie più comuni vanno grosso modo da 400 a 800 Wh; le cargo bike e i modelli con doppia batteria superano spesso questi valori.',
          ],
        },
        {
          heading: 'Da cosa dipende l’autonomia?',
          paragraphs: [
            'L’autonomia reale dipende dal livello di assistenza scelto, dal dislivello, dal peso totale bagagli compresi, dalla pressione degli pneumatici, dalla temperatura e dallo stile di guida. I dati dei costruttori sono in genere valori massimi in condizioni favorevoli.',
            'Come indicazione, una e-bike consuma spesso tra 5 e 12 Wh per chilometro a seconda dell’uso. Su terreni collinari e con assistenza elevata il consumo è maggiore.',
          ],
        },
        {
          heading: 'Quale capacità scegliere?',
          paragraphs: [
            'Per il tragitto casa-lavoro o brevi gite spesso basta una batteria di capacità media. Per lunghe escursioni, molto dislivello o carichi pesanti conviene una batteria più grande o un modello con batteria supplementare. Più capacità significa però più peso e un prezzo più alto.',
          ],
        },
      ],
    },
  },
  {
    id: 'battery-care',
    slug: { de: 'e-bike-akku-richtig-laden-und-lagern', fr: 'bien-charger-et-stocker-la-batterie', it: 'caricare-e-conservare-la-batteria' },
    title: {
      de: 'E-Bike-Akku richtig laden und lagern',
      fr: 'Bien charger et stocker la batterie de son vélo électrique',
      it: 'Caricare e conservare correttamente la batteria dell’e-bike',
    },
    excerpt: {
      de: 'Mit ein paar einfachen Gewohnheiten bleibt der Akku länger leistungsfähig, auch im Winter.',
      fr: 'Quelques habitudes simples permettent de préserver la batterie plus longtemps, même en hiver.',
      it: 'Poche semplici abitudini mantengono la batteria efficiente più a lungo, anche in inverno.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 3,
    body: {
      de: [
        {
          heading: 'Laden im Alltag',
          paragraphs: [
            'Verwenden Sie das Original-Ladegerät und laden Sie bei Raumtemperatur. Ein Akku, der in der Kälte gefahren wurde, sollte vor dem Laden zuerst Zimmertemperatur annehmen. Ein häufiges, vollständiges Entladen sollten Sie vermeiden.',
          ],
        },
        {
          heading: 'Lagern über längere Zeit',
          paragraphs: [
            'Wenn das E-Bike über Wochen oder Monate nicht gefahren wird, empfehlen Hersteller meist, den Akku teilgeladen (oft etwa 30 bis 60 Prozent) an einem trockenen, kühlen Ort zu lagern, nicht in der Sonne und nicht bei Frost. Prüfen Sie den Ladestand gelegentlich.',
          ],
        },
        {
          heading: 'Im Winter',
          paragraphs: [
            'Kälte verringert vorübergehend die verfügbare Reichweite. Nehmen Sie den Akku nach der Fahrt mit nach drinnen. Die genauen Empfehlungen finden Sie in der Anleitung Ihres Modells, denn sie unterscheiden sich je nach Hersteller und Akkutyp.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Recharge au quotidien',
          paragraphs: [
            'Utilisez le chargeur d’origine et rechargez à température ambiante. Une batterie utilisée par temps froid doit d’abord revenir à température ambiante avant la recharge. Évitez les décharges complètes fréquentes.',
          ],
        },
        {
          heading: 'Stockage prolongé',
          paragraphs: [
            'Si le vélo ne roule pas pendant des semaines ou des mois, les fabricants recommandent généralement de stocker la batterie partiellement chargée (souvent environ 30 à 60 %), dans un endroit sec et frais, ni au soleil ni par temps de gel. Vérifiez de temps en temps le niveau de charge.',
          ],
        },
        {
          heading: 'En hiver',
          paragraphs: [
            'Le froid réduit temporairement l’autonomie disponible. Rentrez la batterie à l’intérieur après la sortie. Les recommandations exactes figurent dans le manuel de votre modèle, car elles varient selon le fabricant et le type de batterie.',
          ],
        },
      ],
      it: [
        {
          heading: 'Ricarica quotidiana',
          paragraphs: [
            'Usate il caricabatterie originale e caricate a temperatura ambiente. Una batteria usata al freddo dovrebbe prima raggiungere la temperatura ambiente prima della ricarica. Evitate scariche complete frequenti.',
          ],
        },
        {
          heading: 'Conservazione prolungata',
          paragraphs: [
            'Se l’e-bike resta ferma per settimane o mesi, i costruttori di norma consigliano di conservare la batteria parzialmente carica (spesso circa 30–60%), in un luogo asciutto e fresco, non al sole e non con il gelo. Controllate ogni tanto il livello di carica.',
          ],
        },
        {
          heading: 'In inverno',
          paragraphs: [
            'Il freddo riduce temporaneamente l’autonomia disponibile. Dopo l’uscita portate la batteria al chiuso. Le indicazioni precise sono nel manuale del vostro modello, perché variano a seconda del costruttore e del tipo di batteria.',
          ],
        },
      ],
    },
  },
  {
    id: 'motor-types',
    slug: { de: 'mittelmotor-oder-nabenmotor', fr: 'moteur-central-ou-moteur-de-moyeu', it: 'motore-centrale-o-motore-nel-mozzo' },
    title: {
      de: 'Mittelmotor oder Nabenmotor: Welcher Antrieb passt zu mir?',
      fr: 'Moteur central ou moteur de moyeu : lequel choisir ?',
      it: 'Motore centrale o motore nel mozzo: quale scegliere?',
    },
    excerpt: {
      de: 'Drehmoment, Gewichtsverteilung und Einsatzzweck: Ein Überblick über die gängigen Antriebsarten.',
      fr: 'Couple, répartition du poids et usage : un aperçu des types de motorisation courants.',
      it: 'Coppia, distribuzione del peso e utilizzo: una panoramica delle motorizzazioni più diffuse.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 3,
    body: {
      de: [
        {
          heading: 'Mittelmotor',
          paragraphs: [
            'Der Motor sitzt im Bereich der Tretkurbel. Das Gewicht liegt tief und mittig, und die Kraft wird über die Kette übertragen. Dadurch fühlt sich das Fahrverhalten oft natürlich an, und am Berg kann die Schaltung die Motorkraft nutzen. Mittelmotoren sind bei Mountainbikes, Trekking- und vielen City-Modellen verbreitet, etwa von Bosch, Shimano, Yamaha oder Brose.',
          ],
        },
        {
          heading: 'Nabenmotor',
          paragraphs: [
            'Der Motor sitzt in der Nabe des Vorder- oder Hinterrads. Die Bauweise ist oft einfacher und die Kette wird weniger belastet. Dafür verteilt sich das Gewicht anders, und die Unterstützung wirkt direkter am Rad. Nabenmotoren finden sich häufig bei leichten oder kompakten Modellen und einzelnen schnellen E-Bikes.',
          ],
        },
        {
          heading: 'Das Drehmoment (Nm)',
          paragraphs: [
            'Das Drehmoment gibt an, wie kräftig der Motor anschiebt. Für steile Anstiege oder schwere Cargo-Velos sind höhere Werte sinnvoll; für flache Strecken genügt meist weniger. Machen Sie vor dem Kauf eine Probefahrt, denn das Fahrgefühl ist Geschmackssache.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Moteur central',
          paragraphs: [
            'Le moteur se trouve au niveau du pédalier. Le poids est bas et centré, et la puissance est transmise par la chaîne. Le comportement est souvent naturel, et en montée le dérailleur permet d’exploiter la puissance du moteur. Les moteurs centraux sont courants sur les VTT, les vélos de trekking et de nombreux modèles de ville, par exemple chez Bosch, Shimano, Yamaha ou Brose.',
          ],
        },
        {
          heading: 'Moteur de moyeu',
          paragraphs: [
            'Le moteur est intégré au moyeu de la roue avant ou arrière. La conception est souvent plus simple et la chaîne est moins sollicitée. En revanche, le poids est réparti différemment et l’assistance agit plus directement sur la roue. On les trouve souvent sur des modèles légers ou compacts et sur quelques e-bikes rapides.',
          ],
        },
        {
          heading: 'Le couple (Nm)',
          paragraphs: [
            'Le couple indique la force avec laquelle le moteur pousse. Pour les fortes pentes ou les vélos cargo chargés, des valeurs élevées sont utiles ; sur terrain plat, moins suffit. Faites un essai avant l’achat : la sensation de conduite est affaire de goût.',
          ],
        },
      ],
      it: [
        {
          heading: 'Motore centrale',
          paragraphs: [
            'Il motore si trova vicino alla pedivella. Il peso è basso e centrale e la potenza passa attraverso la catena. La guida risulta spesso naturale e in salita il cambio permette di sfruttare la forza del motore. I motori centrali sono diffusi su mountain bike, bici da trekking e molti modelli urbani, ad esempio di Bosch, Shimano, Yamaha o Brose.',
          ],
        },
        {
          heading: 'Motore nel mozzo',
          paragraphs: [
            'Il motore è integrato nel mozzo della ruota anteriore o posteriore. La struttura è spesso più semplice e la catena è meno sollecitata. In compenso il peso è distribuito diversamente e l’assistenza agisce più direttamente sulla ruota. Si trova spesso su modelli leggeri o compatti e su alcune e-bike veloci.',
          ],
        },
        {
          heading: 'La coppia (Nm)',
          paragraphs: [
            'La coppia indica quanto forte spinge il motore. Per salite ripide o cargo bike cariche servono valori più alti; sul piano ne basta meno. Prima dell’acquisto fate una prova: la sensazione di guida è una questione di gusti.',
          ],
        },
      ],
    },
  },
];
