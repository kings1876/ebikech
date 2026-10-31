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
  /** Keyword collection landing page the "see all" button should open. */
  ctaCollectionId?: string;
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
    related: { frameType: 'step-through', ctaCollectionId: 'damen' },
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
  {
    id: 'trekking-e-bike-kaufen',
    slug: { de: 'trekking-e-bike-kaufen', fr: 'acheter-velo-trekking-electrique', it: 'acquistare-e-bike-trekking' },
    title: {
      de: 'Trekking E-Bike kaufen: Ausstattung, Motor und Akku',
      fr: 'Acheter un vélo de trekking électrique : le guide',
      it: 'Acquistare una e-bike trekking: la guida',
    },
    excerpt: {
      de: 'Für Touren und den Alltag: Worauf es beim Trekking-E-Bike ankommt – Ausstattung, Motor, Akku und Rahmenform – mit passenden Modellen.',
      fr: 'Pour les excursions et le quotidien : les points clés d’un vélo de trekking électrique – équipement, moteur, batterie et cadre – avec des modèles adaptés.',
      it: 'Per escursioni e uso quotidiano: cosa conta in una e-bike trekking – dotazione, motore, batteria e telaio – con modelli adatti.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 5,
    related: { categoryId: 'e-trekkingbikes' },
    body: {
      de: [
        {
          heading: 'Wofür ein Trekking-E-Bike?',
          paragraphs: [
            'Das Trekking-E-Bike ist der Allrounder für Radwege, Touren und den täglichen Arbeitsweg. Es bringt meist Schutzbleche, Gepäckträger, fest montiertes Licht und einen Ständer mit – dadurch ist es ohne Nachrüsten alltagstauglich.',
          ],
        },
        {
          heading: 'Mittelmotor oder Nabenmotor?',
          paragraphs: [
            'Ein Mittelmotor sitzt in der Tretlagerachse, fühlt sich natürlich an und unterstützt kräftig am Berg. Nabenmotoren am Hinterrad sind oft günstiger und leichter, eignen sich aber eher für flaches bis hügeliges Gelände. Wer häufig Steigungen fährt, ist mit einem Mittelmotor meist besser bedient.',
          ],
        },
        {
          heading: 'Akku und Reichweite',
          paragraphs: [
            'Für Tagestouren sind 500 bis 625 Wh üblich, für mehrtägige Reisen oder viel Gepäck darf es mehr sein. Die Reichweite hängt von Unterstützungsstufe, Gelände, Gewicht und Wind ab – rechnen Sie mit Reserve.',
          ],
        },
        {
          heading: 'Rahmenform und Federung',
          paragraphs: [
            'Tiefeinsteiger erleichtern das Auf- und Absteigen, Herrenrahmen sind steifer. Eine gefederte Gabel oder Sattelstütze erhöht den Komfort auf schlechten Wegen. Die richtige Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge.',
          ],
        },
        {
          heading: 'Bremsen und Sicherheit',
          paragraphs: [
            'Hydraulische Scheibenbremsen bremsen auch bei Nässe und mit Gepäck zuverlässig. Prüfen Sie ausserdem Beleuchtung, Reflektoren und Reifen mit Pannenschutz – sie zahlen sich im Alltag aus.',
          ],
        },
      ],
      fr: [
        {
          heading: 'À quoi sert un vélo de trekking électrique ?',
          paragraphs: [
            'Le vélo de trekking électrique est le polyvalent des pistes cyclables, des excursions et du trajet quotidien. Il est en général livré avec garde-boue, porte-bagages, éclairage fixe et béquille – il est donc utilisable au quotidien sans rien ajouter.',
          ],
        },
        {
          heading: 'Moteur central ou moteur de moyeu ?',
          paragraphs: [
            'Un moteur central se trouve au niveau du pédalier, donne des sensations naturelles et assiste puissamment en montée. Les moteurs de moyeu arrière sont souvent moins chers et plus légers, mais conviennent plutôt aux terrains plats ou vallonnés. Si vous grimpez souvent, un moteur central est généralement préférable.',
          ],
        },
        {
          heading: 'Batterie et autonomie',
          paragraphs: [
            'Pour des excursions à la journée, 500 à 625 Wh sont courants ; pour des voyages de plusieurs jours ou beaucoup de bagages, mieux vaut davantage. L’autonomie dépend du niveau d’assistance, du terrain, du poids et du vent – prévoyez une réserve.',
          ],
        },
        {
          heading: 'Forme du cadre et suspension',
          paragraphs: [
            'Un cadre bas facilite la montée et la descente, un cadre homme est plus rigide. Une fourche ou une tige de selle suspendue augmente le confort sur mauvais chemins. La bonne taille de cadre dépend de votre taille et de l’entrejambe.',
          ],
        },
        {
          heading: 'Freins et sécurité',
          paragraphs: [
            'Les freins à disque hydrauliques freinent de façon fiable, même sous la pluie et avec des bagages. Vérifiez aussi l’éclairage, les catadioptres et les pneus anticrevaison – ils font la différence au quotidien.',
          ],
        },
      ],
      it: [
        {
          heading: 'A cosa serve una e-bike trekking?',
          paragraphs: [
            'La e-bike trekking è la tuttofare per piste ciclabili, escursioni e tragitti quotidiani. Di solito ha parafanghi, portapacchi, luci fisse e cavalletto – quindi è pronta all’uso senza aggiunte.',
          ],
        },
        {
          heading: 'Motore centrale o nel mozzo?',
          paragraphs: [
            'Un motore centrale si trova al movimento centrale, dà una sensazione naturale e assiste con forza in salita. I motori nel mozzo posteriore sono spesso più economici e leggeri, ma adatti soprattutto a terreni piani o collinari. Se affrontate spesso salite, di solito è meglio un motore centrale.',
          ],
        },
        {
          heading: 'Batteria e autonomia',
          paragraphs: [
            'Per le escursioni in giornata sono comuni 500–625 Wh; per viaggi di più giorni o molto bagaglio meglio di più. L’autonomia dipende da livello di assistenza, terreno, peso e vento – prevedete una riserva.',
          ],
        },
        {
          heading: 'Forma del telaio e sospensioni',
          paragraphs: [
            'Un telaio basso facilita salita e discesa, un telaio uomo è più rigido. Una forcella o un reggisella ammortizzati aumentano il comfort su strade sconnesse. La taglia giusta dipende da altezza e lunghezza della gamba.',
          ],
        },
        {
          heading: 'Freni e sicurezza',
          paragraphs: [
            'I freni a disco idraulici frenano in modo affidabile anche sul bagnato e con il bagaglio. Controllate anche luci, catarifrangenti e pneumatici antiforatura – fanno la differenza ogni giorno.',
          ],
        },
      ],
    },
  },
  {
    id: 'city-e-bike-kaufen',
    slug: { de: 'city-e-bike-kaufen', fr: 'acheter-velo-electrique-de-ville', it: 'acquistare-e-bike-city' },
    title: {
      de: 'City E-Bike kaufen: Rahmen, Antrieb und Alltag',
      fr: 'Acheter un vélo électrique de ville : le guide',
      it: 'Acquistare una e-bike city: la guida',
    },
    excerpt: {
      de: 'Pendeln und Stadtverkehr: Worauf es beim City-E-Bike ankommt – Rahmenform, Antrieb, Gewicht und Diebstahlschutz – mit Modellen und Preisen.',
      fr: 'Trajet pendulaire et ville : les points clés d’un vélo électrique de ville – cadre, moteur, poids et antivol – avec modèles et prix.',
      it: 'Pendolarismo e città: cosa conta in una e-bike city – telaio, motore, peso e antifurto – con modelli e prezzi.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { categoryId: 'e-citybikes' },
    body: {
      de: [
        {
          heading: 'Für wen ist ein City-E-Bike gedacht?',
          paragraphs: [
            'City-E-Bikes sind für Pendler und alle gedacht, die in der Stadt häufig anfahren, anhalten und Besorgungen erledigen. Aufrechte Sitzposition, Schutzbleche, Licht und Gepäckträger sind meist serienmässig.',
          ],
        },
        {
          heading: 'Rahmenform: tief oder klassisch?',
          paragraphs: [
            'Ein Tiefeinsteiger erleichtert das Auf- und Absteigen, etwa mit Einkaufstasche oder Kindersitz. Klassische Rahmen sind steifer und wirken sportlicher. Probieren Sie, welche Form für Ihre Körpergrösse und Ihren Alltag passt.',
          ],
        },
        {
          heading: 'Antrieb und Wartung',
          paragraphs: [
            'Nabenmotoren sind leicht und unauffällig, Mittelmotoren fahren sich natürlicher und ziehen kräftiger an. Ein Riemenantrieb mit Nabenschaltung ist sauber und wartungsarm – eine Kette mit Kettenschaltung bleibt die günstigere Standardlösung.',
          ],
        },
        {
          heading: 'Gewicht, Treppen und Parkieren',
          paragraphs: [
            'Wer das E-Bike in den Keller oder über Treppen tragen muss, achtet auf das Gewicht der Herstellerangabe. Ein abnehmbarer Akku erleichtert das Laden in der Wohnung.',
          ],
        },
        {
          heading: 'Diebstahlschutz',
          paragraphs: [
            'Ein hochwertiges Schloss gehört zum E-Bike dazu. Stellen Sie das Rad wenn möglich an gut einsehbaren Orten ab und prüfen Sie, ob Ihre Hausrat- oder eine separate Velo-Versicherung E-Bikes abdeckt.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Pour qui un vélo électrique de ville ?',
          paragraphs: [
            'Les vélos électriques de ville s’adressent aux pendulaires et à toutes les personnes qui démarrent, s’arrêtent et font des courses en ville. Position redressée, garde-boue, éclairage et porte-bagages sont en général d’origine.',
          ],
        },
        {
          heading: 'Forme du cadre : bas ou classique ?',
          paragraphs: [
            'Un cadre bas facilite la montée et la descente, par exemple avec un sac de courses ou un siège enfant. Les cadres classiques sont plus rigides et plus sportifs. Essayez la forme qui convient à votre taille et à votre quotidien.',
          ],
        },
        {
          heading: 'Moteur et entretien',
          paragraphs: [
            'Les moteurs de moyeu sont légers et discrets, les moteurs centraux ont des sensations plus naturelles et démarrent plus fort. Une courroie avec moyeu à vitesses intégrées est propre et demande peu d’entretien – la chaîne avec dérailleur reste la solution standard, moins chère.',
          ],
        },
        {
          heading: 'Poids, escaliers et stationnement',
          paragraphs: [
            'Si vous devez monter le vélo à la cave ou dans les escaliers, regardez le poids indiqué par le fabricant. Une batterie amovible facilite la recharge à l’appartement.',
          ],
        },
        {
          heading: 'Protection contre le vol',
          paragraphs: [
            'Un antivol de qualité fait partie du vélo électrique. Garez-le si possible dans des endroits bien visibles et vérifiez si votre assurance ménage ou une assurance vélo séparée couvre les vélos électriques.',
          ],
        },
      ],
      it: [
        {
          heading: 'Per chi è una e-bike city?',
          paragraphs: [
            'Le e-bike city sono pensate per i pendolari e per chi in città parte, si ferma e fa commissioni spesso. Posizione eretta, parafanghi, luci e portapacchi sono di solito di serie.',
          ],
        },
        {
          heading: 'Forma del telaio: basso o classico?',
          paragraphs: [
            'Un telaio basso facilita salita e discesa, ad esempio con la borsa della spesa o il seggiolino. I telai classici sono più rigidi e sportivi. Provate la forma più adatta alla vostra altezza e alla vostra quotidianità.',
          ],
        },
        {
          heading: 'Motore e manutenzione',
          paragraphs: [
            'I motori nel mozzo sono leggeri e discreti, quelli centrali danno una guida più naturale e partono con più forza. Una cinghia con cambio nel mozzo è pulita e richiede poca manutenzione – la catena con cambio a deragliatore resta la soluzione standard, più economica.',
          ],
        },
        {
          heading: 'Peso, scale e parcheggio',
          paragraphs: [
            'Se dovete portare la bici in cantina o su per le scale, guardate il peso dichiarato dal produttore. Una batteria rimovibile facilita la ricarica in casa.',
          ],
        },
        {
          heading: 'Protezione dai furti',
          paragraphs: [
            'Un lucchetto di qualità fa parte della e-bike. Parcheggiatela possibilmente in luoghi ben visibili e verificate se l’assicurazione economia domestica o una assicurazione bici separata copre le e-bike.',
          ],
        },
      ],
    },
  },
  {
    id: 'cube-e-bike-kaufen',
    slug: { de: 'cube-e-bike-kaufen', fr: 'acheter-velo-electrique-cube', it: 'acquistare-e-bike-cube' },
    title: {
      de: 'Cube E-Bike kaufen: Modellfamilien im Überblick',
      fr: 'Acheter un vélo électrique Cube : les gammes',
      it: 'Acquistare una e-bike Cube: le famiglie di modelli',
    },
    excerpt: {
      de: 'Kathmandu, Reaction, Stereo oder Supreme? Welche Cube-E-Bike-Familie zu welchem Einsatz passt – mit Modellen und Preisen in CHF.',
      fr: 'Kathmandu, Reaction, Stereo ou Supreme ? Quelle gamme Cube pour quel usage – avec modèles et prix en CHF.',
      it: 'Kathmandu, Reaction, Stereo o Supreme? Quale famiglia Cube per quale uso – con modelli e prezzi in CHF.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { brandId: 'cube' },
    body: {
      de: [
        {
          heading: 'So ist das Cube-Sortiment aufgebaut',
          paragraphs: [
            'Cube bezeichnet seine E-Bikes mit dem Zusatz «Hybrid». Die Modellfamilien sind nach dem Einsatz gegliedert, und in unserem Katalog setzen die Cube-Modelle überwiegend auf Bosch-Antriebe.',
          ],
        },
        {
          heading: 'Trekking: Kathmandu, Touring und Nuride',
          paragraphs: [
            'Für Touren und den Alltag mit Schutzblechen, Gepäckträger und Licht sind Kathmandu, Touring und Nuride die Trekking-Familien. Das Kathmandu gibt es auch in einer schnellen 45-km/h-Variante.',
          ],
        },
        {
          heading: 'Mountainbike: Reaction, Stereo und AMS',
          paragraphs: [
            'Das Reaction ist das Hardtail für Touren und Trails, Stereo und AMS sind die vollgefederten Modelle für anspruchsvolleres Gelände. Wer vor allem auf Forstwegen fährt, kommt mit dem Hardtail meist günstiger ans Ziel.',
          ],
        },
        {
          heading: 'City, Gravel, Cargo und Falten',
          paragraphs: [
            'Editor, Supreme und Aruba decken die Stadt ab, Nuroad und Nulane den Gravel-Bereich. Für Familie und Transport gibt es Cargo und Longtail, für wenig Platz die Faltmodelle Compact und Fold.',
          ],
        },
        {
          heading: 'So wählen Sie das passende Modell',
          paragraphs: [
            'Legen Sie zuerst den Einsatz fest, dann Rahmenform und Grösse, dann Akku und Budget. Vergleichen Sie bei gleicher Familie die Ausstattungsstufen – sie unterscheiden sich vor allem bei Federung, Bremsen und Schaltung.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Comment la gamme Cube est organisée',
          paragraphs: [
            'Cube désigne ses vélos électriques par le suffixe « Hybrid ». Les gammes sont classées par usage, et dans notre catalogue les modèles Cube misent surtout sur des moteurs Bosch.',
          ],
        },
        {
          heading: 'Trekking : Kathmandu, Touring et Nuride',
          paragraphs: [
            'Pour les excursions et le quotidien avec garde-boue, porte-bagages et éclairage, Kathmandu, Touring et Nuride sont les gammes trekking. Le Kathmandu existe aussi en version rapide 45 km/h.',
          ],
        },
        {
          heading: 'VTT : Reaction, Stereo et AMS',
          paragraphs: [
            'Le Reaction est le semi-rigide pour les excursions et les sentiers, Stereo et AMS sont les modèles tout-suspendus pour un terrain plus exigeant. Si vous roulez surtout sur chemins forestiers, le semi-rigide revient souvent moins cher.',
          ],
        },
        {
          heading: 'Ville, gravel, cargo et pliant',
          paragraphs: [
            'Editor, Supreme et Aruba couvrent la ville, Nuroad et Nulane le gravel. Pour la famille et le transport, il y a Cargo et Longtail, pour peu de place les pliants Compact et Fold.',
          ],
        },
        {
          heading: 'Comment choisir le bon modèle',
          paragraphs: [
            'Définissez d’abord l’usage, puis la forme et la taille du cadre, puis la batterie et le budget. Au sein d’une même gamme, comparez les niveaux d’équipement – ils diffèrent surtout par la suspension, les freins et la transmission.',
          ],
        },
      ],
      it: [
        {
          heading: 'Com’è organizzata la gamma Cube',
          paragraphs: [
            'Cube indica le sue e-bike con il suffisso «Hybrid». Le famiglie sono suddivise per impiego, e nel nostro catalogo i modelli Cube puntano soprattutto su motori Bosch.',
          ],
        },
        {
          heading: 'Trekking: Kathmandu, Touring e Nuride',
          paragraphs: [
            'Per escursioni e uso quotidiano con parafanghi, portapacchi e luci, Kathmandu, Touring e Nuride sono le famiglie trekking. Il Kathmandu esiste anche in versione veloce 45 km/h.',
          ],
        },
        {
          heading: 'Mountain bike: Reaction, Stereo e AMS',
          paragraphs: [
            'La Reaction è la hardtail per escursioni e sentieri, Stereo e AMS sono i modelli a sospensione integrale per terreni più impegnativi. Chi va soprattutto su strade forestali spesso risparmia con la hardtail.',
          ],
        },
        {
          heading: 'City, gravel, cargo e pieghevoli',
          paragraphs: [
            'Editor, Supreme e Aruba coprono la città, Nuroad e Nulane il gravel. Per famiglia e trasporto ci sono Cargo e Longtail, per chi ha poco spazio le pieghevoli Compact e Fold.',
          ],
        },
        {
          heading: 'Come scegliere il modello giusto',
          paragraphs: [
            'Definite prima l’impiego, poi forma e taglia del telaio, poi batteria e budget. All’interno della stessa famiglia confrontate i livelli di dotazione – differiscono soprattutto per sospensioni, freni e trasmissione.',
          ],
        },
      ],
    },
  },
  {
    id: 'gravel-e-bike-kaufen',
    slug: { de: 'gravel-e-bike-kaufen', fr: 'acheter-velo-gravel-electrique', it: 'acquistare-e-bike-gravel' },
    title: {
      de: 'Gravel E-Bike kaufen: Motor, Akku und Reifen',
      fr: 'Acheter un vélo gravel électrique : le guide',
      it: 'Acquistare una e-bike gravel: la guida',
    },
    excerpt: {
      de: 'Asphalt, Schotter und lange Touren: Worauf es beim E-Gravelbike ankommt – leichter Motor, Akku, Reifen und Position – mit Modellen und Preisen.',
      fr: 'Asphalte, gravier et longues sorties : les points clés d’un vélo gravel électrique – moteur léger, batterie, pneus et position – avec modèles et prix.',
      it: 'Asfalto, sterrato e lunghe uscite: cosa conta in una e-bike gravel – motore leggero, batteria, pneumatici e posizione – con modelli e prezzi.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { categoryId: 'e-rennvelos-gravel' },
    body: {
      de: [
        {
          heading: 'Was zeichnet ein E-Gravelbike aus?',
          paragraphs: [
            'Ein E-Gravelbike verbindet die sportliche Haltung eines Rennvelos mit breiteren, profilierten Reifen für Schotter und Waldwege. Es eignet sich für lange Ausfahrten auf gemischtem Untergrund und für den schnellen Arbeitsweg.',
          ],
        },
        {
          heading: 'Leichter Motor, kleinerer Akku',
          paragraphs: [
            'Viele Gravel-E-Bikes setzen auf kompakte Antriebe, um das Gewicht niedrig und das Fahrgefühl natürlich zu halten. Der Akku ist dadurch oft kleiner als bei Trekking- oder Mountainbike-Modellen. Wer weit fährt, prüft, ob ein zusätzlicher Akku erhältlich ist.',
          ],
        },
        {
          heading: 'Reifen und Rahmen',
          paragraphs: [
            'Die maximale Reifenbreite bestimmt, wie viel Komfort und Grip Sie auf Schotter haben. Montagepunkte für Schutzbleche und Gepäckträger sind wichtig, wenn Sie auch pendeln oder Touren mit Gepäck planen.',
          ],
        },
        {
          heading: 'Bremsen, Schaltung und Position',
          paragraphs: [
            'Scheibenbremsen sind bei Gravelbikes Standard. Prüfen Sie die Übersetzung – für Steigungen mit Gepäck sind kleine Gänge hilfreich – und probieren Sie die Sitzposition: Sportlich gestreckt ist schnell, aufrechter ist komfortabler.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Ce qui caractérise un vélo gravel électrique',
          paragraphs: [
            'Un vélo gravel électrique associe la position sportive d’un vélo de route à des pneus plus larges et crantés pour le gravier et les chemins forestiers. Il convient aux longues sorties sur terrain mixte et au trajet rapide vers le travail.',
          ],
        },
        {
          heading: 'Moteur léger, batterie plus petite',
          paragraphs: [
            'De nombreux vélos gravel électriques misent sur des moteurs compacts pour garder un poids faible et des sensations naturelles. La batterie est donc souvent plus petite que sur un vélo de trekking ou un VTT. Si vous roulez loin, vérifiez si une batterie supplémentaire est disponible.',
          ],
        },
        {
          heading: 'Pneus et cadre',
          paragraphs: [
            'La largeur maximale des pneus détermine le confort et l’adhérence sur le gravier. Des fixations pour garde-boue et porte-bagages comptent si vous faites aussi le trajet quotidien ou des excursions avec bagages.',
          ],
        },
        {
          heading: 'Freins, transmission et position',
          paragraphs: [
            'Les freins à disque sont la norme sur les vélos gravel. Vérifiez le développement – de petits rapports aident en montée avec des bagages – et essayez la position : allongée et sportive est rapide, plus redressée est plus confortable.',
          ],
        },
      ],
      it: [
        {
          heading: 'Cosa distingue una e-bike gravel',
          paragraphs: [
            'Una e-bike gravel unisce la posizione sportiva di una bici da corsa a pneumatici più larghi e scolpiti per sterrato e sentieri nel bosco. È adatta alle lunghe uscite su fondo misto e al tragitto veloce verso il lavoro.',
          ],
        },
        {
          heading: 'Motore leggero, batteria più piccola',
          paragraphs: [
            'Molte e-bike gravel puntano su motori compatti per contenere il peso e mantenere una guida naturale. La batteria è quindi spesso più piccola rispetto a una trekking o a una mountain bike. Se percorrete lunghe distanze, verificate se è disponibile una batteria aggiuntiva.',
          ],
        },
        {
          heading: 'Pneumatici e telaio',
          paragraphs: [
            'La larghezza massima dei pneumatici determina comfort e aderenza sullo sterrato. Gli attacchi per parafanghi e portapacchi contano se andate anche al lavoro o fate escursioni con bagaglio.',
          ],
        },
        {
          heading: 'Freni, trasmissione e posizione',
          paragraphs: [
            'I freni a disco sono lo standard sulle gravel. Controllate i rapporti – i rapporti corti aiutano in salita con il bagaglio – e provate la posizione: allungata e sportiva è veloce, più eretta è più comoda.',
          ],
        },
      ],
    },
  },
  {
    id: 'cargo-e-bike-kaufen',
    slug: { de: 'cargo-e-bike-kaufen', fr: 'acheter-velo-cargo-electrique', it: 'acquistare-e-bike-cargo' },
    title: {
      de: 'Cargo E-Bike kaufen: Longtail, Akku und Zuladung',
      fr: 'Acheter un vélo cargo électrique : le guide',
      it: 'Acquistare una e-bike cargo: la guida',
    },
    excerpt: {
      de: 'Kinder, Einkauf, Transport: Worauf es beim Cargo-E-Bike ankommt – Bauform, Motor, Akku und Zuladung – mit Modellen und Preisen in CHF.',
      fr: 'Enfants, courses, transport : les points clés d’un vélo cargo électrique – forme, moteur, batterie et charge utile – avec modèles et prix en CHF.',
      it: 'Bambini, spesa, trasporto: cosa conta in una e-bike cargo – forma, motore, batteria e portata – con modelli e prezzi in CHF.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { categoryId: 'e-lastenvelos' },
    body: {
      de: [
        {
          heading: 'Longtail oder Cargo mit Ladefläche?',
          paragraphs: [
            'Ein Longtail ist ein verlängertes Rad mit grossem Gepäckträger hinten; es fährt sich fast wie ein normales E-Bike und ist handlicher. Cargo-Modelle mit Ladefläche bieten mehr Platz und Zuladung, sind aber länger und brauchen mehr Stellfläche.',
          ],
        },
        {
          heading: 'Motor und Akku für schwere Lasten',
          paragraphs: [
            'Mit Ladung braucht es einen kräftigen Motor und genug Akku: Bei Cargo-E-Bikes sind 500 Wh und mehr üblich. Für hügelige Strecken mit Kindern oder Einkauf lohnt sich ein grosszügiger Akku.',
          ],
        },
        {
          heading: 'Zuladung und Kindertransport',
          paragraphs: [
            'Prüfen Sie die vom Hersteller angegebene Zuladung und das zulässige Gesamtgewicht. Für den Kindertransport zählen herstellerfreigegebene Sitze, Gurte und Fussstützen – verwenden Sie nur Zubehör, das für das Modell vorgesehen ist.',
          ],
        },
        {
          heading: 'Bremsen und Stabilität',
          paragraphs: [
            'Mehr Gewicht heisst längere Bremswege: Hydraulische Scheibenbremsen und ein stabiler Ständer sind Pflicht. Ein tiefer Schwerpunkt macht das Fahren mit Last sicherer.',
          ],
        },
        {
          heading: 'Platz und Förderung',
          paragraphs: [
            'Cargo-Räder brauchen Stellplatz – prüfen Sie Keller, Veloraum oder Garage. Einige Kantone und Gemeinden unterstützen den Kauf von Cargo-Velos; fragen Sie bei Ihrer Gemeinde nach.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Longtail ou cargo avec plateau ?',
          paragraphs: [
            'Un longtail est un vélo allongé avec un grand porte-bagages à l’arrière ; il se conduit presque comme un vélo électrique ordinaire et est plus maniable. Les modèles cargo avec plateau offrent plus de place et de charge utile, mais sont plus longs et demandent plus d’espace de stationnement.',
          ],
        },
        {
          heading: 'Moteur et batterie pour les charges lourdes',
          paragraphs: [
            'Avec une charge, il faut un moteur puissant et assez de batterie : sur les vélos cargo électriques, 500 Wh et plus sont courants. Pour des parcours vallonnés avec enfants ou courses, une batterie généreuse vaut la peine.',
          ],
        },
        {
          heading: 'Charge utile et transport d’enfants',
          paragraphs: [
            'Vérifiez la charge utile indiquée par le fabricant et le poids total autorisé. Pour le transport d’enfants, comptent les sièges, ceintures et repose-pieds approuvés par le fabricant – n’utilisez que des accessoires prévus pour le modèle.',
          ],
        },
        {
          heading: 'Freins et stabilité',
          paragraphs: [
            'Plus de poids, c’est des distances de freinage plus longues : des freins à disque hydrauliques et une béquille stable sont indispensables. Un centre de gravité bas rend la conduite en charge plus sûre.',
          ],
        },
        {
          heading: 'Place et subventions',
          paragraphs: [
            'Les vélos cargo ont besoin de place – vérifiez la cave, le local à vélos ou le garage. Certains cantons et communes soutiennent l’achat de vélos cargo ; renseignez-vous auprès de votre commune.',
          ],
        },
      ],
      it: [
        {
          heading: 'Longtail o cargo con pianale?',
          paragraphs: [
            'Una longtail è una bici allungata con un grande portapacchi posteriore; si guida quasi come una normale e-bike ed è più maneggevole. I modelli cargo con pianale offrono più spazio e portata, ma sono più lunghi e richiedono più spazio di parcheggio.',
          ],
        },
        {
          heading: 'Motore e batteria per carichi pesanti',
          paragraphs: [
            'Con il carico servono un motore potente e batteria sufficiente: sulle e-bike cargo sono comuni 500 Wh e oltre. Per percorsi collinari con bambini o spesa vale la pena una batteria generosa.',
          ],
        },
        {
          heading: 'Portata e trasporto di bambini',
          paragraphs: [
            'Controllate la portata dichiarata dal produttore e il peso totale ammesso. Per il trasporto di bambini contano seggiolini, cinture e poggiapiedi approvati dal produttore – usate solo accessori previsti per il modello.',
          ],
        },
        {
          heading: 'Freni e stabilità',
          paragraphs: [
            'Più peso significa spazi di frenata più lunghi: freni a disco idraulici e un cavalletto stabile sono indispensabili. Un baricentro basso rende la guida con carico più sicura.',
          ],
        },
        {
          heading: 'Spazio e incentivi',
          paragraphs: [
            'Le cargo richiedono spazio – verificate cantina, locale bici o garage. Alcuni cantoni e comuni sostengono l’acquisto di cargo bike; informatevi presso il vostro comune.',
          ],
        },
      ],
    },
  },
  {
    id: 'trek-e-bike-kaufen',
    slug: { de: 'trek-e-bike-kaufen', fr: 'acheter-velo-electrique-trek', it: 'acquistare-e-bike-trek' },
    title: {
      de: 'Trek E-Bike kaufen: Modellfamilien im Überblick',
      fr: 'Acheter un vélo électrique Trek : les gammes',
      it: 'Acquistare una e-bike Trek: le famiglie di modelli',
    },
    excerpt: {
      de: 'Powerfly+, Fuel+, Domane+ oder FX+? Welche Trek-E-Bike-Familie zu welchem Einsatz passt – mit Modellen und Preisen in CHF.',
      fr: 'Powerfly+, Fuel+, Domane+ ou FX+ ? Quelle gamme Trek pour quel usage – avec modèles et prix en CHF.',
      it: 'Powerfly+, Fuel+, Domane+ o FX+? Quale famiglia Trek per quale uso – con modelli e prezzi in CHF.',
    },
    publishedDate: '2026-10-31',
    readMinutes: 4,
    related: { brandId: 'trek' },
    body: {
      de: [
        {
          heading: 'So ist das Trek-Sortiment aufgebaut',
          paragraphs: [
            'Trek kennzeichnet seine E-Bikes mit einem «+» im Modellnamen. Die Familien sind nach Einsatz gegliedert; die meisten Modelle in unserem Katalog sind E-Mountainbikes.',
          ],
        },
        {
          heading: 'Mountainbike: Powerfly+, Fuel+, Rail+ und Slash+',
          paragraphs: [
            'Powerfly+ ist die Familie für Touren und Trails, darunter Hardtail- und Fully-Varianten. Fuel+ und Rail+ sind vollgefederte Trail-Modelle, Slash+ ist für anspruchsvolles, steiles Gelände gedacht.',
          ],
        },
        {
          heading: 'Strasse und Gravel: Domane+ und Checkpoint+',
          paragraphs: [
            'Domane+ ist das E-Rennvelo für lange Strecken, Checkpoint+ das Gravelbike für gemischten Untergrund. Beide setzen auf ein leichtes Fahrgefühl mit Motorunterstützung.',
          ],
        },
        {
          heading: 'Trekking, City und Cargo: FX+, Allant+, District+ und Fetch+',
          paragraphs: [
            'FX+, Allant+ und Charter+ sind die Trekking-Familien für Touren und Alltag, District+ und Inbound+ decken die Stadt ab, und Fetch+ ist das Cargo-E-Bike für Familie und Transport.',
          ],
        },
        {
          heading: 'So wählen Sie das passende Modell',
          paragraphs: [
            'Legen Sie zuerst den Einsatz fest, dann Rahmenform und Grösse, dann Akku und Budget. Innerhalb einer Familie unterscheiden sich die Ausstattungsstufen vor allem bei Federung, Bremsen und Schaltung.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Comment la gamme Trek est organisée',
          paragraphs: [
            'Trek repère ses vélos électriques par un « + » dans le nom du modèle. Les gammes sont classées par usage ; la plupart des modèles de notre catalogue sont des VTT électriques.',
          ],
        },
        {
          heading: 'VTT : Powerfly+, Fuel+, Rail+ et Slash+',
          paragraphs: [
            'Powerfly+ est la gamme pour excursions et sentiers, avec des variantes semi-rigides et tout-suspendues. Fuel+ et Rail+ sont des modèles tout-suspendus de trail, Slash+ est conçu pour les terrains exigeants et raides.',
          ],
        },
        {
          heading: 'Route et gravel : Domane+ et Checkpoint+',
          paragraphs: [
            'Domane+ est le vélo de route électrique pour les longues distances, Checkpoint+ le vélo gravel pour terrain mixte. Tous deux misent sur des sensations légères avec assistance du moteur.',
          ],
        },
        {
          heading: 'Trekking, ville et cargo : FX+, Allant+, District+ et Fetch+',
          paragraphs: [
            'FX+, Allant+ et Charter+ sont les gammes trekking pour excursions et quotidien, District+ et Inbound+ couvrent la ville, et Fetch+ est le vélo cargo pour la famille et le transport.',
          ],
        },
        {
          heading: 'Comment choisir le bon modèle',
          paragraphs: [
            'Définissez d’abord l’usage, puis la forme et la taille du cadre, puis la batterie et le budget. Au sein d’une gamme, les niveaux d’équipement diffèrent surtout par la suspension, les freins et la transmission.',
          ],
        },
      ],
      it: [
        {
          heading: 'Com’è organizzata la gamma Trek',
          paragraphs: [
            'Trek contrassegna le sue e-bike con un «+» nel nome del modello. Le famiglie sono suddivise per impiego; la maggior parte dei modelli nel nostro catalogo sono mountain bike elettriche.',
          ],
        },
        {
          heading: 'Mountain bike: Powerfly+, Fuel+, Rail+ e Slash+',
          paragraphs: [
            'Powerfly+ è la famiglia per escursioni e sentieri, con varianti hardtail e full. Fuel+ e Rail+ sono modelli trail a sospensione integrale, Slash+ è pensata per terreni impegnativi e ripidi.',
          ],
        },
        {
          heading: 'Strada e gravel: Domane+ e Checkpoint+',
          paragraphs: [
            'Domane+ è la e-bike da strada per le lunghe distanze, Checkpoint+ la gravel per fondo misto. Entrambe puntano su una guida leggera con assistenza del motore.',
          ],
        },
        {
          heading: 'Trekking, city e cargo: FX+, Allant+, District+ e Fetch+',
          paragraphs: [
            'FX+, Allant+ e Charter+ sono le famiglie trekking per escursioni e uso quotidiano, District+ e Inbound+ coprono la città, e Fetch+ è la cargo per famiglia e trasporto.',
          ],
        },
        {
          heading: 'Come scegliere il modello giusto',
          paragraphs: [
            'Definite prima l’impiego, poi forma e taglia del telaio, poi batteria e budget. All’interno di una famiglia i livelli di dotazione differiscono soprattutto per sospensioni, freni e trasmissione.',
          ],
        },
      ],
    },
  },
];
