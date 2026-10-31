import { LocalizedString } from '../types';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

/** Which real catalogue products to show under a post, and where its "see all" button goes. */
export interface BlogRelated {
  categoryId?: string;
  brandId?: string;
  speedClass?: string;
  frameType?: string;
  /** Category used for the "see all" button when the filter is not a plain category (defaults to the catalogue). */
  ctaCategoryId?: string;
}

export interface BlogPost {
  id: string;
  slug: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  publishedDate: string; // ISO
  readMinutes: number;
  related?: BlogRelated;
  body: { de: BlogSection[]; fr: BlogSection[]; it: BlogSection[] };
}

const NOTE: LocalizedString = {
  de: 'Die Angaben dienen der Orientierung. Verbindlich sind die jeweils geltenden Vorschriften (z. B. ASTRA und die kantonalen Strassenverkehrsämter).',
  fr: 'Ces informations sont données à titre indicatif. Seules les prescriptions en vigueur font foi (p. ex. OFROU et services cantonaux des automobiles).',
  it: 'Le informazioni sono indicative. Fanno fede le disposizioni vigenti (ad es. USTRA e uffici cantonali della circolazione).',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'e-mountainbike-kaufen',
    slug: { de: 'e-mountainbike-kaufen', fr: 'acheter-vtt-electrique', it: 'acquistare-mountain-bike-elettrica' },
    title: {
      de: 'E-Mountainbike kaufen: Hardtail, Fully, Motor und Akku',
      fr: 'Acheter un VTT électrique : le guide d’achat complet',
      it: 'Acquistare una mountain bike elettrica: la guida',
    },
    excerpt: {
      de: 'Hardtail oder Fully, welcher Motor, wie viel Akku? Die wichtigsten Kaufkriterien für ein E-Mountainbike – mit passenden Modellen und Preisen in CHF.',
      fr: 'Semi-rigide ou tout-suspendu, quel moteur, quelle batterie ? Les critères d’achat d’un VTT électrique, avec des modèles et des prix en CHF.',
      it: 'Hardtail o full, quale motore, quanta batteria? I criteri per scegliere una mountain bike elettrica, con modelli e prezzi in CHF.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 5,
    related: { categoryId: 'e-mountainbikes' },
    body: {
      de: [
        {
          heading: 'Hardtail oder Fully?',
          paragraphs: [
            'Ein Hardtail ist nur an der Vorderradgabel gefedert. Es ist leichter, günstiger und wartungsärmer – ideal für Forstwege, Touren und den Weg zur Arbeit. Ein Fully federt zusätzlich das Hinterrad: Es bietet mehr Grip und Komfort auf ruppigen Trails, wiegt aber mehr und kostet in der Regel mehr.',
          ],
        },
        {
          heading: 'Der Motor: Das Drehmoment zählt',
          paragraphs: [
            'Bei E-Mountainbikes sitzt der Motor meist in der Tretlagerachse. Am Berg entscheidet das Drehmoment in Newtonmetern (Nm): Je höher der Wert, desto kräftiger die Unterstützung an steilen Anstiegen. Verbreitet sind Antriebe von Bosch, Shimano, Yamaha oder Fazua; leichte Systeme setzen auf weniger Gewicht und ein natürlicheres Fahrgefühl.',
          ],
        },
        {
          heading: 'Der Akku: Wattstunden statt Ampere',
          paragraphs: [
            'Die Kapazität wird in Wattstunden (Wh) angegeben. Für Feierabendrunden genügen oft 500 Wh, für lange Touren mit vielen Höhenmetern sind 625 bis 800 Wh und mehr sinnvoll. Die tatsächliche Reichweite hängt von Fahrergewicht, Gelände, Unterstützungsstufe und Temperatur ab.',
          ],
        },
        {
          heading: 'Rahmengrösse und Laufräder',
          paragraphs: [
            'Die richtige Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge – die Grössentabelle des Herstellers ist der beste Ausgangspunkt. Moderne E-Mountainbikes fahren meist 29 Zoll oder vorne 29 und hinten 27,5 Zoll (Mullet); kleinere Fahrerinnen und Fahrer finden mit 27,5 Zoll oft mehr Kontrolle.',
          ],
        },
        {
          heading: 'Budget und Ausstattung',
          paragraphs: [
            'Neben Motor und Akku bestimmen Gabel, Dämpfer, Bremsen und Schaltung den Preis. Gute Bremsen mit grossen Scheiben und eine hochwertige Federung lohnen sich im alpinen Gelände mehr als Zubehör. Vergleichen Sie deshalb Modelle mit ähnlichen Komponenten und nicht nur den Preis.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Semi-rigide ou tout-suspendu ?',
          paragraphs: [
            'Un VTT semi-rigide n’est suspendu qu’à l’avant. Il est plus léger, moins cher et demande moins d’entretien – idéal pour les chemins forestiers, les excursions et le trajet quotidien. Un tout-suspendu amortit aussi la roue arrière : il offre plus d’adhérence et de confort sur les sentiers difficiles, mais pèse plus et coûte généralement plus cher.',
          ],
        },
        {
          heading: 'Le moteur : le couple compte',
          paragraphs: [
            'Sur un VTT électrique, le moteur se trouve en général au niveau du pédalier. En montagne, c’est le couple en newtons-mètres (Nm) qui compte : plus il est élevé, plus l’assistance est puissante dans les fortes pentes. Les moteurs Bosch, Shimano, Yamaha ou Fazua sont répandus ; les systèmes légers misent sur un poids réduit et des sensations plus naturelles.',
          ],
        },
        {
          heading: 'La batterie : des wattheures, pas des ampères',
          paragraphs: [
            'La capacité s’exprime en wattheures (Wh). Pour une sortie après le travail, 500 Wh suffisent souvent ; pour de longues excursions avec beaucoup de dénivelé, 625 à 800 Wh ou plus sont judicieux. L’autonomie réelle dépend du poids du cycliste, du terrain, du niveau d’assistance et de la température.',
          ],
        },
        {
          heading: 'Taille du cadre et roues',
          paragraphs: [
            'La bonne taille de cadre dépend de votre taille et de l’entrejambe – le tableau du fabricant est le meilleur point de départ. Les VTT électriques actuels roulent le plus souvent en 29 pouces, ou en 29 à l’avant et 27,5 à l’arrière (mullet) ; les personnes plus petites trouvent souvent plus de contrôle en 27,5 pouces.',
          ],
        },
        {
          heading: 'Budget et équipement',
          paragraphs: [
            'Outre le moteur et la batterie, la fourche, l’amortisseur, les freins et la transmission déterminent le prix. En terrain alpin, de bons freins à grands disques et une suspension de qualité valent plus que les accessoires. Comparez donc des modèles aux composants similaires, pas seulement le prix.',
          ],
        },
      ],
      it: [
        {
          heading: 'Hardtail o full?',
          paragraphs: [
            'Una hardtail ha la sospensione solo davanti. È più leggera, più economica e richiede meno manutenzione – ideale per strade forestali, escursioni e per andare al lavoro. Una full ammortizza anche la ruota posteriore: offre più aderenza e comfort sui sentieri accidentati, ma pesa di più e di solito costa di più.',
          ],
        },
        {
          heading: 'Il motore: conta la coppia',
          paragraphs: [
            'Sulle mountain bike elettriche il motore si trova di norma al movimento centrale. In salita conta la coppia in newton metri (Nm): più è alta, più forte è l’assistenza sulle pendenze ripide. Sono diffusi i motori Bosch, Shimano, Yamaha o Fazua; i sistemi leggeri puntano su meno peso e una guida più naturale.',
          ],
        },
        {
          heading: 'La batteria: wattora, non ampere',
          paragraphs: [
            'La capacità si indica in wattora (Wh). Per i giri dopo il lavoro spesso bastano 500 Wh, per lunghe escursioni con molto dislivello hanno senso 625–800 Wh e oltre. L’autonomia reale dipende da peso del ciclista, terreno, livello di assistenza e temperatura.',
          ],
        },
        {
          heading: 'Taglia del telaio e ruote',
          paragraphs: [
            'La taglia giusta dipende dall’altezza e dalla lunghezza della gamba – la tabella del produttore è il miglior punto di partenza. Le e-MTB moderne montano di solito ruote da 29 pollici oppure 29 davanti e 27,5 dietro (mullet); chi è più basso spesso trova più controllo con le 27,5.',
          ],
        },
        {
          heading: 'Budget e dotazione',
          paragraphs: [
            'Oltre a motore e batteria, forcella, ammortizzatore, freni e cambio determinano il prezzo. Sul terreno alpino, buoni freni con dischi grandi e una sospensione di qualità valgono più degli accessori. Confrontate quindi modelli con componenti simili, non solo il prezzo.',
          ],
        },
      ],
    },
  },
  {
    id: 'e-bike-45-kmh-kaufen',
    slug: { de: 'e-bike-45-km-h-kaufen', fr: 'acheter-velo-electrique-45-km-h', it: 'acquistare-e-bike-45-km-h' },
    title: {
      de: 'E-Bike 45 km/h kaufen: Voraussetzungen, Kosten, Modelle',
      fr: 'Acheter un vélo électrique 45 km/h : conditions et coûts',
      it: 'Acquistare una e-bike 45 km/h: requisiti e costi',
    },
    excerpt: {
      de: 'Führerausweis, Kontrollschild, Helm und Versicherung: Was Sie vor dem Kauf eines schnellen E-Bikes wissen müssen – mit passenden Modellen.',
      fr: 'Permis, plaque, casque et assurance : ce qu’il faut savoir avant d’acheter un vélo électrique rapide – avec des modèles adaptés.',
      it: 'Licenza, targa, casco e assicurazione: cosa sapere prima di acquistare una e-bike veloce – con modelli adatti.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { speedClass: 'e-bike-45', ctaCategoryId: 'schnelle-e-bikes' },
    body: {
      de: [
        {
          heading: 'Was ist ein E-Bike 45?',
          paragraphs: [
            'Ein E-Bike 45 unterstützt das Treten bis 45 km/h und gilt in der Schweiz als Motorfahrrad. Es ist für lange Pendlerstrecken gedacht, auf denen ein E-Bike 25 zu langsam wäre.',
          ],
        },
        {
          heading: 'Voraussetzungen für Fahrerin und Fahrer',
          paragraphs: [
            'Sie brauchen einen Führerausweis (mindestens Kategorie M), ein Kontrollschild mit Haftpflichtversicherung, und der Helm ist Pflicht. Das Licht muss auch tagsüber eingeschaltet sein. Auf Radwegen dürfen schnelle E-Bikes nur fahren, wo es signalisiert ist.',
          ],
        },
        {
          heading: 'Was es zusätzlich kostet',
          paragraphs: [
            'Rechnen Sie neben dem Kaufpreis mit den Kosten für Kontrollschild und Haftpflichtversicherung sowie für den Führerausweis, falls Sie noch keinen besitzen. Die Höhe hängt von Kanton und Versicherung ab – fragen Sie vor dem Kauf nach.',
          ],
        },
        {
          heading: 'Worauf Sie beim Modell achten',
          paragraphs: [
            'Bei höherem Tempo zählen kräftige Bremsen, gute Beleuchtung, pannenschutzstarke Reifen und ein grosser Akku, denn bei 45 km/h ist er schneller leer. Für lange Strecken sind 625 Wh und mehr sinnvoll.',
          ],
        },
        {
          heading: 'E-Bike 25 oder E-Bike 45?',
          paragraphs: [
            'Wer täglich weit pendelt und mit dem Verkehr mithalten möchte, prüft ein E-Bike 45. Für Freizeit, kurze und mittlere Wege reicht meist ein E-Bike 25 – ohne Kontrollschild und Führerausweis.',
            NOTE.de,
          ],
        },
      ],
      fr: [
        {
          heading: 'Qu’est-ce qu’un e-bike 45 ?',
          paragraphs: [
            'Un e-bike 45 assiste le pédalage jusqu’à 45 km/h et est considéré en Suisse comme un cyclomoteur. Il est conçu pour les longs trajets pendulaires, sur lesquels un e-bike 25 serait trop lent.',
          ],
        },
        {
          heading: 'Conditions pour le conducteur',
          paragraphs: [
            'Il faut un permis de conduire (au minimum catégorie M), une plaque de contrôle avec assurance responsabilité civile, et le casque est obligatoire. Les feux doivent aussi être allumés de jour. Les vélos électriques rapides ne peuvent emprunter les pistes cyclables que là où c’est signalé.',
          ],
        },
        {
          heading: 'Ce que cela coûte en plus',
          paragraphs: [
            'Outre le prix d’achat, comptez la plaque et l’assurance responsabilité civile, ainsi que le permis si vous n’en avez pas encore. Le montant dépend du canton et de l’assureur – renseignez-vous avant l’achat.',
          ],
        },
        {
          heading: 'Ce qu’il faut regarder dans le modèle',
          paragraphs: [
            'À vitesse plus élevée, on regarde des freins puissants, un bon éclairage, des pneus résistants aux crevaisons et une grande batterie, car à 45 km/h elle se vide plus vite. Pour de longs trajets, 625 Wh ou plus sont judicieux.',
          ],
        },
        {
          heading: 'E-bike 25 ou e-bike 45 ?',
          paragraphs: [
            'Si vous faites chaque jour de longs trajets et voulez suivre le trafic, envisagez un e-bike 45. Pour les loisirs et les trajets courts à moyens, un e-bike 25 suffit généralement – sans plaque ni permis.',
            NOTE.fr,
          ],
        },
      ],
      it: [
        {
          heading: 'Che cos’è una e-bike 45?',
          paragraphs: [
            'Una e-bike 45 assiste la pedalata fino a 45 km/h ed è considerata in Svizzera un ciclomotore. È pensata per i lunghi tragitti quotidiani, dove una e-bike 25 sarebbe troppo lenta.',
          ],
        },
        {
          heading: 'Requisiti per chi guida',
          paragraphs: [
            'Servono una licenza di condurre (almeno categoria M), una targa con assicurazione di responsabilità civile, e il casco è obbligatorio. Le luci devono essere accese anche di giorno. Sulle piste ciclabili le e-bike veloci possono circolare solo dove è segnalato.',
          ],
        },
        {
          heading: 'Quanto costa in più',
          paragraphs: [
            'Oltre al prezzo d’acquisto, calcolate targa e assicurazione di responsabilità civile, più la licenza se non ne avete ancora una. L’importo dipende da cantone e assicurazione – informatevi prima dell’acquisto.',
          ],
        },
        {
          heading: 'Cosa guardare nel modello',
          paragraphs: [
            'A velocità più elevata contano freni potenti, buona illuminazione, pneumatici antiforatura e una batteria grande, perché a 45 km/h si scarica prima. Per i lunghi tragitti hanno senso 625 Wh e oltre.',
          ],
        },
        {
          heading: 'E-bike 25 o e-bike 45?',
          paragraphs: [
            'Se ogni giorno percorrete lunghe distanze e volete stare al passo del traffico, valutate una e-bike 45. Per il tempo libero e i tragitti brevi o medi di solito basta una e-bike 25 – senza targa né licenza.',
            NOTE.it,
          ],
        },
      ],
    },
  },
  {
    id: 'damen-e-bike-kaufen',
    slug: { de: 'damen-e-bike-kaufen', fr: 'acheter-velo-electrique-femme', it: 'acquistare-e-bike-donna' },
    title: {
      de: 'Damen E-Bike kaufen: Rahmenform, Grösse und Modelle',
      fr: 'Acheter un vélo électrique femme : cadre et taille',
      it: 'Acquistare una e-bike donna: telaio e taglia',
    },
    excerpt: {
      de: 'Tiefeinsteiger oder sportlicher Diamantrahmen? So finden Sie das passende Damen-E-Bike – mit Modellen und Preisen in CHF.',
      fr: 'Cadre bas ou cadre sportif ? Comment trouver le vélo électrique femme qui vous convient – avec des modèles et des prix en CHF.',
      it: 'Telaio basso o sportivo? Come trovare la e-bike donna giusta – con modelli e prezzi in CHF.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { frameType: 'step-through' },
    body: {
      de: [
        {
          heading: 'Tiefeinsteiger oder Diamantrahmen?',
          paragraphs: [
            'Ein Tiefeinsteiger hat einen tiefen Durchstieg und erleichtert das Auf- und Absteigen, etwa mit Einkauf oder Kindersitz. Diamantrahmen sind steifer, sportlicher und oft leichter. Viele Marken bieten dasselbe Modell mit beiden Rahmenformen an.',
          ],
        },
        {
          heading: 'Rahmengrösse und Sitzposition',
          paragraphs: [
            'Massgebend sind Körpergrösse und Schrittlänge. Wer zwischen zwei Grössen liegt, wählt für den Alltag eher die kleinere, für sportliches Fahren die grössere. Eine aufrechte Sitzposition schont Rücken und Handgelenke auf längeren Strecken.',
          ],
        },
        {
          heading: 'Gewicht und Handling',
          paragraphs: [
            'Das Gewicht spielt beim Schieben, Tragen und Verladen eine Rolle. Achten Sie auf einen tiefen Schwerpunkt: Ein Akku, der tief im Rahmen sitzt, fährt sich stabiler als ein Gepäckträgerakku. Vergleichen Sie die Gewichtsangaben der Hersteller.',
          ],
        },
        {
          heading: 'Motor, Akku und Reichweite',
          paragraphs: [
            'Für den Alltag reichen meist 400 bis 625 Wh; wer viele Höhenmeter fährt, wählt einen grösseren Akku. Ein Mittelmotor verteilt das Gewicht gleichmässig und unterstützt kräftig am Berg.',
          ],
        },
        {
          heading: 'Ausstattung für den Alltag',
          paragraphs: [
            'Schutzbleche, Gepäckträger, Licht und Ständer machen ein E-Bike alltagstauglich. City- und Trekkingbikes bringen sie meist ab Werk mit; bei sportlicheren Modellen lohnt ein Blick auf die Ausstattungsliste.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Cadre bas ou cadre diamant ?',
          paragraphs: [
            'Un cadre bas offre un passage facile et simplifie la montée et la descente, par exemple avec des courses ou un siège enfant. Les cadres diamant sont plus rigides, plus sportifs et souvent plus légers. De nombreuses marques proposent le même modèle avec les deux formes de cadre.',
          ],
        },
        {
          heading: 'Taille du cadre et position',
          paragraphs: [
            'La taille et l’entrejambe sont déterminantes. Entre deux tailles, choisissez plutôt la plus petite pour le quotidien, la plus grande pour une conduite sportive. Une position redressée ménage le dos et les poignets sur de plus longs trajets.',
          ],
        },
        {
          heading: 'Poids et maniabilité',
          paragraphs: [
            'Le poids compte quand on pousse, porte ou charge le vélo. Privilégiez un centre de gravité bas : une batterie logée dans le cadre est plus stable qu’une batterie sur le porte-bagages. Comparez les poids indiqués par les fabricants.',
          ],
        },
        {
          heading: 'Moteur, batterie et autonomie',
          paragraphs: [
            'Pour le quotidien, 400 à 625 Wh suffisent généralement ; avec beaucoup de dénivelé, choisissez une batterie plus grande. Un moteur central répartit bien le poids et assiste puissamment en montée.',
          ],
        },
        {
          heading: 'Équipement pour le quotidien',
          paragraphs: [
            'Garde-boue, porte-bagages, éclairage et béquille rendent un vélo électrique pratique au quotidien. Les vélos de ville et de trekking les ont en général d’origine ; pour les modèles plus sportifs, consultez la liste d’équipement.',
          ],
        },
      ],
      it: [
        {
          heading: 'Telaio basso o a diamante?',
          paragraphs: [
            'Un telaio basso ha un passaggio facile e semplifica salita e discesa, ad esempio con la spesa o il seggiolino. I telai a diamante sono più rigidi, più sportivi e spesso più leggeri. Molti marchi offrono lo stesso modello con entrambe le forme di telaio.',
          ],
        },
        {
          heading: 'Taglia del telaio e posizione',
          paragraphs: [
            'Contano altezza e lunghezza della gamba. Tra due taglie, per l’uso quotidiano scegliete la più piccola, per una guida sportiva la più grande. Una posizione eretta protegge schiena e polsi sulle distanze più lunghe.',
          ],
        },
        {
          heading: 'Peso e maneggevolezza',
          paragraphs: [
            'Il peso conta quando si spinge, si solleva o si carica la bici. Preferite un baricentro basso: una batteria integrata nel telaio è più stabile di una sul portapacchi. Confrontate i pesi dichiarati dai produttori.',
          ],
        },
        {
          heading: 'Motore, batteria e autonomia',
          paragraphs: [
            'Per l’uso quotidiano di solito bastano 400–625 Wh; con molto dislivello scegliete una batteria più grande. Un motore centrale distribuisce bene il peso e assiste con forza in salita.',
          ],
        },
        {
          heading: 'Dotazione per ogni giorno',
          paragraphs: [
            'Parafanghi, portapacchi, luci e cavalletto rendono una e-bike pratica ogni giorno. Le city e le trekking li hanno di norma di serie; per i modelli più sportivi vale la pena controllare l’elenco della dotazione.',
          ],
        },
      ],
    },
  },
];
