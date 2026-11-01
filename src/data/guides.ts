import { GuideCluster } from '../types';

export const GUIDE_CLUSTERS: GuideCluster[] = [
  {
    id: 'kaufberatung',
    slug: {
      de: 'kaufberatung',
      fr: 'guide-d-achat',
      it: 'guida-acquisto',
    },
    title: {
      de: 'E-Bike Kaufberatung 2026',
      fr: 'Guide d’achat vélo électrique 2026',
      it: 'Guida all’acquisto e-bike 2026',
    },
    shortDesc: {
      de: 'So finden Sie das perfekte E-Bike für Ihren Alltag, Ausflüge oder alpine Trails in der Schweiz.',
      fr: 'Comment choisir le vélo électrique idéal pour le quotidien, les loisirs ou les sentiers alpins suisses.',
      it: 'Come scegliere l’e-bike ideale per tutti i giorni, le escursioni o i sentieri alpini in Svizzera.',
    },
    guides: [
      {
        id: 'welcher-e-bike-typ-passt-zu-mir',
        clusterId: 'kaufberatung',
        slug: {
          de: 'welcher-e-bike-typ-passt-zu-mir',
          fr: 'quel-type-de-velo-electrique-choisir',
          it: 'quale-tipo-di-ebike-scegliere',
        },
        title: {
          de: 'Welcher E-Bike-Typ passt zu mir? (City, Trekking, MTB, Cargo)',
          fr: 'Quel type de vélo électrique choisir ? (Ville, Trekking, VTT, Cargo)',
          it: 'Quale tipo di e-bike scegliere? (City, Trekking, MTB, Cargo)',
        },
        excerpt: {
          de: 'Der umfassende Entscheidungskompass zwischen Komfort-Citybike, tourentauglichem Trekkingvelo, kraftvollem E-Mountainbike und praktischem Lastenvelo.',
          fr: 'Le guide complet pour arbitrer entre vélo de ville confortable, randonneuse trekking, VTT sportif et vélo cargo familial.',
          it: 'La guida completa per scegliere tra city bike confortevole, trekking versatile, e-MTB sportiva e cargo per la famiglia.',
        },
        readTimeMin: 7,
        publishedDate: '2026-02-15',
        author: 'Redaktion',
        keyTakeaways: [
          {
            de: 'Citybikes mit tiefem Einstieg bieten maximale Sicherheit im dichten Stadtverkehr von Zürich, Bern oder Basel.',
            fr: 'Les vélos de ville à enjambement bas procurent une sécurité maximale dans le trafic urbain dense.',
            it: 'Le city bike a scavalco basso offrono massima sicurezza nel traffico urbano.',
          },
          {
            de: 'Trekkingbikes mit 750 Wh Akku sind die idealen Schweizer Allrounder für Arbeitsweg und Alpenpässe.',
            fr: 'Les vélos de trekking avec batterie 750 Wh constituent les polyvalents suisses par excellence.',
            it: 'Le bici da trekking con batteria da 750 Wh sono le regine della versatilità sulle strade svizzere.',
          },
          {
            de: 'E-Fullys bieten dank Fahrwerk auch auf Schweizer Wurzeltrails und Schotterabfahrten optimale Traktion.',
            fr: 'Les VTT tout suspendus garantissent adhérence et confort sur les sentiers alpins cassants.',
            it: 'Le full-suspension garantiscono aderenza ottimale su sentieri alpini e discese sterrate.',
          },
        ],
        content: {
          de: `
### Die 4 wichtigsten E-Bike Kategorien im Vergleich

Die Wahl des richtigen E-Bikes hängt massgeblich von Ihrem Einsatzzweck, Ihrer Fahrstrecke und der Schweizer Topographie Ihres Wohnorts ab:

1. **E-Citybikes**: Konzipiert für asphaltierte Strassen, tägliche Erledigungen und Pendelstrecken bis 15 km. Merkmale: Aufrechte Sitzposition, Tiefeinsteiger-Rahmen (Wave), serienmässige Schutzbleche, Gepäckträger und integrierte Beleuchtung.
2. **E-Trekkingbikes**: Die Alleskönner für Pendler und Wochenend-Touren. Ausgestattet mit robuster Federgabel (63–100 mm), breiteren Reifen für Schotterwege und starken Akkus (625–750 Wh).
3. **E-Mountainbikes (Hardtail & Fully)**: Sportgeräte für unbefestigtes Gelände und Alpen-Trails. Vollgefederte Fullys bügeln Wurzeln und Steine glatt, während Hardtails auf Forstwegen effizient bergauf klettern.
4. **E-Lastenvelos (Cargo)**: Der vollwertige Auto-Ersatz für Schweizer Familien und Gewerbetreibende mit bis zu 200 kg zulässigem Gesamtgewicht.
          `,
          fr: `
### Comparatif des 4 grandes familles d’e-bikes

Le choix dépend avant tout de votre profil d’utilisation et du relief de votre région :

1. **Vélos de ville (City)** : Idéal pour les trajets urbains quotidiens, position assise droite, enjambement bas pratique.
2. **Vélos de trekking** : Les plus polyvalents pour le vélotaf et les balades du week-end sur routes et pistes gravillonnées.
3. **VTT électriques (Semi-rigides et Tout-suspendus)** : Taillés pour la montagne suisse et les sentiers techniques.
4. **Vélos cargos** : La solution de mobilité familiale pour remplacer le deuxième véhicule.
          `,
          it: `
### Le 4 principali categorie di e-bike a confronto

La scelta dell’e-bike giusta dipende dal tipo di tragitto e dalle pendenze della vostra regione :

1. **E-Citybike**: Perfette per la città, postura comoda e scavalco basso.
2. **E-Trekking**: Versatili per il tragitto casa-lavoro e viaggi su asfalto e sterrato.
3. **E-Mountainbike**: Per gli amanti dei sentieri alpini e fuoristrada.
4. **E-Cargo**: Ideali per famiglie e trasporto carichi pesanti.
          `,
        },
        faqs: [
          {
            q: {
              de: 'Reicht ein Hardtail für Schweizer Wald- und Forstwege?',
              fr: 'Un VTT semi-rigide suffit-il pour les chemins forestiers suisses ?',
              it: 'Una hardtail è sufficiente per strade forestali svizzere ?',
            },
            a: {
              de: 'Ja! Für klassische Schotter- und Waldwege ist ein E-Hardtail leicht, wartungsarm und preiswerter als ein Fully.',
              fr: 'Oui, pour les chemins en terre ou gravier, un semi-rigide est léger, robuste et plus abordable.',
              it: 'Sì, per sentieri e strade bianche una hardtail è leggera, affidabile ed economica.',
            },
          },
        ],
      },
      {
        id: 'rahmengroesse-berechnen',
        clusterId: 'kaufberatung',
        slug: {
          de: 'rahmengroesse-berechnen',
          fr: 'calculer-taille-du-cadre',
          it: 'calcolare-misura-telaio',
        },
        title: {
          de: 'E-Bike Rahmengrösse berechnen: Schritt-für-Schritt-Anleitung',
          fr: 'Calculer la bonne taille de cadre : guide pas à pas',
          it: 'Come calcolare la misura corretta del telaio e-bike',
        },
        excerpt: {
          de: 'So messen Sie Ihre Schrittlänge korrekt und bestimmen die optimale Rahmenhöhe in cm oder Zoll für City-, Trekking- und E-MTB.',
          fr: 'Comment mesurer précisément votre entrejambe et trouver la hauteur de cadre idéale en centimètres ou en pouces.',
          it: 'Come misurare correttamente il cavallo e calcolare l’altezza del telaio ideale per ogni tipo di bicicletta.',
        },
        readTimeMin: 5,
        publishedDate: '2026-01-20',
        author: 'Redaktion',
        keyTakeaways: [
          {
            de: 'Die Schrittlänge ist ausschlaggebend, nicht allein die Körpergrösse.',
            fr: 'La hauteur d’entrejambe est le critère déterminant, bien plus que la taille globale.',
            it: 'La misura del cavallo è decisiva, non soltanto l’altezza complessiva.',
          },
          {
            de: 'Formel für Trekking & City: Schrittlänge × 0.66 = Rahmenhöhe in cm.',
            fr: 'Formule Trekking et Ville : Entrejambe × 0,66 = taille de cadre en cm.',
            it: 'Formula Trekking e City : Cavallo × 0.66 = altezza telaio in cm.',
          },
          {
            de: 'Formel für Mountainbike: Schrittlänge × 0.226 = Rahmenhöhe in Zoll (oder × 0.57 in cm).',
            fr: 'Formule VTT : Entrejambe × 0,226 = taille en pouces (ou × 0,57 en cm).',
            it: 'Formula Mountain Bike : Cavallo × 0.226 = misura in pollici (oppure × 0.57 in cm).',
          },
        ],
        content: {
          de: `
### So messen Sie Ihre Schrittlänge präzise

1. Stellen Sie sich barfuss an eine Wand (Fersen berühren die Wand).
2. Klemmen Sie ein Buch waagerecht mit dem Buchrücken nach oben in den Schritt (mit leichtem Druck wie auf einem Velosattel).
3. Messen Sie mit dem Massband vom Boden bis zur Oberkante des Buchrückens.

| Körpergrösse | Schrittlänge ca. | City/Trekking (cm) | E-MTB (Zoll) | Rahmengrösse |
|---|---|---|---|---|
| 155–165 cm | 70–75 cm | 46–48 cm | 15–16" | S |
| 165–175 cm | 76–81 cm | 49–53 cm | 17–18" | M |
| 175–185 cm | 82–88 cm | 54–58 cm | 19–20" | L |
| 185–198 cm | 89–96 cm | 59–63 cm | 21–22" | XL |
          `,
          fr: `
### Comment mesurer précisément votre entrejambe

1. Placez-vous pieds nus le dos contre un mur.
2. Glissez un livre entre vos jambes jusqu’au contact périnéal comme sur une selle.
3. Mesurez la distance entre le sol et l’arête supérieure du livre.
          `,
          it: `
### Come misurare l’altezza del cavallo

1. Scalzi con le spalle aderenti a una parete.
2. Inserite un libro tra le cosce portandolo a contatto con il cavallo.
3. Misurate con il metro la distanza da terra al bordo superiore del libro.
          `,
        },
      },
    ],
  },
  {
    id: 'recht-sicherheit',
    slug: {
      de: 'recht-sicherheit',
      fr: 'legislation-securite',
      it: 'legislazione-sicurezza',
    },
    title: {
      de: 'Recht & Sicherheit (E-Bike 25 vs 45 km/h)',
      fr: 'Législation & Sécurité (25 vs 45 km/h)',
      it: 'Norme di circolazione e sicurezza (25 vs 45 km/h)',
    },
    shortDesc: {
      de: 'Schweizer Strassenverkehrsgesetz: Helmpflicht, Kontrollschild, Führerausweis und Velowege für E-Bikes 25 und 45 km/h.',
      fr: 'Code de la route suisse : casque obligatoire, plaque jaune, permis de conduire et voies cyclables.',
      it: 'Codice stradale svizzero : obbligo casco, targa gialla, patente M e piste ciclabili.',
    },
    guides: [
      {
        id: 'e-bike-25-vs-45-schweizer-gesetz',
        clusterId: 'recht-sicherheit',
        slug: {
          de: 'e-bike-25-vs-45-schweizer-gesetz',
          fr: 'velo-electrique-25-vs-45-loi-suisse',
          it: 'ebike-25-vs-45-legge-svizzera',
        },
        title: {
          de: 'E-Bike 25 vs 45 km/h: Alle Schweizer Gesetze & Vorschriften im Überblick',
          fr: 'E-Bike 25 vs 45 km/h : toutes les règles et lois suisses décryptées',
          it: 'E-Bike 25 vs 45 km/h : panoramica completa delle leggi svizzere',
        },
        excerpt: {
          de: 'Das Bundesamt für Strassen (ASTRA) unterscheidet strikt zwischen Leicht-Motorfahrrädern (25 km/h) und schnellen E-Bikes (45 km/h). Hier sind alle Pflichten auf einen Blick.',
          fr: 'L’OFROU applique une distinction stricte entre cyclomoteurs légers (25 km/h) et vélos électriques rapides (45 km/h). Voici toutes les obligations légales.',
          it: 'L’USTRA distingue nettamente tra ciclomotori leggeri (25 km/h) e veloci (45 km/h). Ecco tutte le norme vigenti.',
        },
        readTimeMin: 8,
        publishedDate: '2026-03-01',
        author: 'Redaktion',
        keyTakeaways: [
          {
            de: '25 km/h: Keine Helmpflicht (ab 2024 Velohelm dringend empfohlen), kein Kontrollschild, ab 14 Jahren mit Kat. M, ab 16 Jahren prüfungsfrei.',
            fr: '25 km/h : Pas de plaque, permis M dès 14 ans, libre dès 16 ans, casque vivement recommandé.',
            it: '25 km/h : Nessuna targa, patente M a 14 anni, libero a 16 anni.',
          },
          {
            de: '45 km/h: Gelbes Kontrollschild mit Vignette, Führerausweis min. Kategorie M, Tacho Pflicht (neue Modelle seit 1. April 2024, ältere bis 1. April 2027 nachrüsten), geprüfter Velohelm nach EN 1078 obligatorisch.',
            fr: '45 km/h : Plaque jaune obligatoire avec vignette annuelle, permis M minimum, compteur de vitesse et casque homologué obligatoires.',
            it: '45 km/h : Targa gialla obbligatoria, patente M, tachimetro e casco omologato obbligatori.',
          },
          {
            de: 'Velowege: Schnelle E-Bikes benutzen Velowege. Wo Motorfahrräder verboten sind, muss das Rad geschoben werden.',
            fr: 'Pistes cyclables : les 45 km/h empruntent les pistes cyclables. Là où les cyclomoteurs sont interdits, il faut pousser le vélo.',
            it: 'Piste ciclabili : le e-bike 45 km/h usano le piste ciclabili. Dove i ciclomotori sono vietati bisogna spingere la bici.',
          },
        ],
        content: {
          de: `
### Die Schweizer Rechtslage im direkten Vergleich

| Merkmal | Leicht-Motorfahrrad (bis 25 km/h) | Schnelles E-Bike (bis 45 km/h / S-Pedelec) |
|---|---|---|
| **Motorleistung max.** | 500 Watt Nenndauerleistung | 1000 Watt Nenndauerleistung |
| **Tretunterstützung** | bis max. 25 km/h | bis max. 45 km/h |
| **Mindestalter** | 14 Jahre (mit Kat. M), ab 16 prüfungsfrei | Mindestens 14 Jahre |
| **Führerausweis** | Ab 16 Jahren kein Ausweis nötig | Mindestens Kategorie M (Mofa) oder B/A1 |
| **Kontrollschild** | Keines erforderlich | Gelbes Mofa-Kontrollschild mit jährlicher Vignette |
| **Helmpflicht** | Keine gesetzliche Pflicht (empfohlen) | **Obligatorisch** (Velohelm nach EN 1078) |
| **Lichtpflicht am Tag** | Ja, seit 1. April 2022 Pflicht | Ja, seit 1. April 2022 Pflicht |
| **Geschwindigkeitsmesser** | Freiwillig | **Pflicht (Tachometer)**: neue Modelle seit 1. April 2024, bereits zugelassene bis 1. April 2027 nachrüsten |
| **Radweg-Benutzung** | Obligatorisch | Obligatorisch (Signalisierte Velowege müssen benutzt werden) |
| **Fussgängerzonen** | Wenn «Velo gestattet» erlaubt | Wenn Velos gestattet sind, erlaubt; sonst schieben |
          `,
          fr: `
### Tableau comparatif de la législation suisse

La Suisse dispose de règles claires édictées par l’OFROU pour garantir la cohabitation sur les routes et pistes cyclables.
          `,
          it: `
### Confronto della legislazione svizzera

L’USTRA stabilisce regole precise per la sicurezza su strade e piste ciclabili svizzere.
          `,
        },
      },
    ],
  },
  {
    id: 'nutzung-pflege',
    slug: {
      de: 'nutzung-pflege',
      fr: 'entretien-utilisation',
      it: 'manutenzione-utilizzo',
    },
    title: {
      de: 'Nutzung & Pflege',
      fr: 'Entretien & Utilisation',
      it: 'Manutenzione e utilizzo',
    },
    shortDesc: {
      de: 'Praxis-Tipps: Akku-Pflege im Schweizer Winter, Reichweitenmaximierung und Kettenpflege bei Nässe und Tausalz.',
      fr: 'Conseils pratiques : préservation de la batterie en hiver, optimisation de l’autonomie et entretien face au sel routier.',
      it: 'Consigli pratici : cura della batteria in inverno, massimizzare l’autonomia e protezione dal sale stradale.',
    },
    guides: [
      {
        id: 'akku-pflege-schweizer-winter',
        clusterId: 'nutzung-pflege',
        slug: {
          de: 'akku-pflege-schweizer-winter',
          fr: 'soin-batterie-hiver-suisse',
          it: 'cura-batteria-inverno-svizzero',
        },
        title: {
          de: 'E-Bike Akku im Schweizer Winter: Reichweite, Kälteschutz & Lagerung',
          fr: 'Batterie de vélo électrique en hiver : froid, autonomie et stockage',
          it: 'Batteria e-bike durante l’inverno svizzero : freddo, autonomia e ricarica',
        },
        excerpt: {
          de: 'Bei Minusgraden verliert ein Lithium-Ionen-Akku bis zu 30% Reichweite. Mit diesen 5 Massnahmen schützen Sie Ihren Akku und verlängern die Lebensdauer auf über 8 Jahre.',
          fr: 'Par temps de gel, les cellules lithium-ion perdent jusqu’à 30 % d’autonomie. Voici les 5 réflexes pour préserver votre investissement.',
          it: 'Sotto zero le batterie al litio riducono l’autonomia fino al 30%. Ecco i 5 consigli fondamentali per preservare la batteria.',
        },
        readTimeMin: 6,
        publishedDate: '2026-01-10',
        author: 'Redaktion',
        keyTakeaways: [
          {
            de: 'Niemals einen eiskalten Akku laden! Zuerst bei Raumtemperatur (18–22 °C) aufwärmen lassen.',
            fr: 'Ne jamais recharger une batterie gelée ! Laissez-la d’abord se réchauffer à température ambiante.',
            it: 'Non ricaricare mai una batteria congelata ! Portatela prima a temperatura ambiente.',
          },
          {
            de: 'Neopren-Schutzhülle hält den Akku während der Fahrt warm und verlängert die Winter-Reichweite.',
            fr: 'Une housse thermique en néoprène maintient la chaleur interne pendant le trajet.',
            it: 'Una custodia termica in neoprene mantiene il calore durante la pedalata.',
          },
          {
            de: 'Lagerung bei Nichtgebrauch: Optimal sind 30–60% Ladezustand bei 10–15 °C im trockenen Keller.',
            fr: 'Stockage prolongé : niveau de charge idéal entre 30 et 60 % dans un endroit sec et tempéré.',
            it: 'Stoccaggio invernale : livello di carica ideale tra il 30 e 60% in luogo asciutto.',
          },
        ],
        content: {
          de: `
### Warum friert der E-Bike Akku?
Lithium-Ionen-Akkus nutzen einen flüssigen Elektrolyten. Bei Temperaturen unter 0 °C wird dieser zähflüssiger, was den Innenwiderstand erhöht. Der Motor kann weniger Spitzenstrom abrufen, und die Reichweitenanzeige sinkt spürbar schneller.

### 5 goldene Regeln für den Schweizer Winter
1. **Akku in die Wohnung nehmen**: Lagern und laden Sie den Akku immer bei 15–20 °C.
2. **Erst kurz vor Abfahrt einsetzen**: Setzen Sie den zimmerwarmen Akku erst wenige Minuten vor dem Losfahren ins Velo ein.
3. **Im Schnee mit moderater Unterstützung anfahren**: So vermeiden Sie durchdrehende Räder auf gefrorenem Asphalt.
4. **Velo nach Salzfahrten mit lauwarmem Wasser abspülen** (keinen Hochdruckreiniger verwenden!).
5. **Kette mit Nass-Kettenöl (Wet Lube) schmieren**: Bietet zuverlässigen Korrosionsschutz gegen Schweizer Streusalz.
          `,
          fr: `
### Comportement des batteries au lithium par grand froid
L’électrolyte liquide devient visqueux lorsque le thermomètre descend sous zéro. En adoptant les bons réflexes, vous éviterez toute dégradation prématurée.
          `,
          it: `
### Il comportamento delle batterie al litio col freddo
A temperature inferiori a 0 °C l’elettrolita diventa più denso aumentando la resistenza interna.
          `,
        },
      },
    ],
  },
  {
    id: 'kosten-foerderung',
    slug: {
      de: 'kosten-foerderung',
      fr: 'couts-subventions',
      it: 'costi-incentivi',
    },
    title: {
      de: 'Kosten & Förderung in der Schweiz',
      fr: 'Coûts & Subventions en Suisse',
      it: 'Costi e contributi cantonali in Svizzera',
    },
    shortDesc: {
      de: 'Übersicht über kantonale und kommunale Fördergelder (bis CHF 1’000), Unterhaltskosten und TCS Veloschutz.',
      fr: 'Panorama des subventions cantonales et communales (jusqu’à 1 000 CHF), budget d’entretien et assurances.',
      it: 'Incentivi cantonali e comunali (fino a 1’000 CHF), costi di esercizio e assicurazione TCS.',
    },
    guides: [
      {
        id: 'schweizer-e-bike-foerderbeitraege-kantone',
        clusterId: 'kosten-foerderung',
        slug: {
          de: 'schweizer-e-bike-foerderbeitraege-kantone',
          fr: 'subventions-velo-electrique-cantons-suisses',
          it: 'incentivi-ebike-cantoni-svizzeri',
        },
        title: {
          de: 'E-Bike Förderbeiträge Schweiz: Bis zu 1’000 CHF Zuschuss für Ihr neues Velo',
          fr: 'Subventions vélo électrique en Suisse : jusqu’à 1 000 CHF d’aide financière',
          it: 'Incentivi e-bike in Svizzera : fino a 1’000 CHF di sussidio per la vostra nuova bici',
        },
        excerpt: {
          de: 'Zahlreiche Schweizer Städte und Kantone (Zürich, Bern, Basel-Stadt, Genf, Lausanne, St. Gallen) fördern den Kauf von E-Bikes und Cargo-Bikes aktiv. Wir zeigen, wie Sie den Förderbeitrag beantragen.',
          fr: 'De nombreux cantons et communes récompensent l’achat d’un vélo électrique ou cargo avec des primes directes. Découvrez la liste des aides disponibles.',
          it: 'Molti comuni e cantoni svizzeri premiano l’acquisto di e-bike e cargo con contributi a fondo perduto.',
        },
        readTimeMin: 6,
        publishedDate: '2026-02-28',
        author: 'Redaktion',
        keyTakeaways: [
          {
            de: 'Besonders E-Lastenvelos (Cargo) werden massiv gefördert: Oft 500 bis 1’000 CHF Zuschuss pro Haushalt.',
            fr: 'Les vélos cargos électriques bénéficient des aides les plus généreuses : souvent 500 à 1 000 CHF.',
            it: 'Le e-cargo bike godono dei massimi contributi : spesso da 500 a 1’000 CHF per nucleo familiare.',
          },
          {
            de: 'Wichtig: Antrag oft VOR dem Kauf oder innerhalb von 30 Tagen nach Rechnungsdatum einreichen.',
            fr: 'Important : La demande doit souvent être déposée AVANT l’achat ou dans les 30 jours suivant la facture.',
            it: 'Importante : Spesso la richiesta va inoltrata PRIMA dell’acquisto o entro 30 giorni dalla fattura.',
          },
          {
            de: 'Kaufnachweis bei zertifiziertem Schweizer Fachhändler meist zwingende Voraussetzung.',
            fr: 'L’achat doit impérativement être effectué auprès d’un vélociste professionnel établi en Suisse.',
            it: 'L’acquisto deve avvenire presso un rivenditore specializzato autorizzato in Svizzera.',
          },
        ],
        content: {
          de: `
### Aktuelle Fördertöpfe nach Kantonen und Städten (Auswahl 2026)

- **Kanton Genf (GE)**: Bis zu 250 CHF für E-Bikes 25 km/h, bis zu 500 CHF für E-Cargo Bikes.
- **Stadt Bern (BE)**: Bis zu CHF 500 Förderprämie für Cargo-Bikes über das Energie- und Mobilitätsprogramm.
- **Basel-Stadt (BS)**: Bis zu 20% des Kaufpreises (max. CHF 800) für elektrische Transportvelos.
- **Lausanne (VD)**: Bis zu CHF 400 für Elektrovelos und bis zu CHF 800 für Lastenvelos.
- **Zürich (Kanton & Gemeinden)**: Verschiedene Energiestädte (z.B. Illnau-Effretikon, Uster, Wädenswil) bieten Zuschüsse zwischen 200 und 600 CHF.
          `,
          fr: `
### Les subventions disponibles en Suisse romande et alémanique
Genève, Lausanne, Fribourg et Neuchâtel proposent des programmes d’encouragement très avantageux.
          `,
          it: `
### Sussidi cantonali e comunali attivi
Panoramica degli incentivi ecologici per la mobilità ciclistica.
          `,
        },
      },
    ],
  },
];
