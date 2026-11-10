import type { BlogPost } from './blog';

/**
 * Comparison guides for people choosing between options: fully vs hardtail, price tiers, brands.
 * Every figure is computed from the catalogue (348 models, prices in CHF, weights are manufacturer data) and the
 * posts make no test, ranking or delivery-time claims.
 */
export const COMPARISON_POSTS: BlogPost[] = [
  {
    id: 'e-bike-fully-kaufen',
    slug: { de: 'e-bike-fully-kaufen', fr: 'acheter-vtt-electrique-tout-suspendu', it: 'acquistare-e-bike-full' },
    title: {
      de: 'E-Bike Fully kaufen: 115 Modelle im Vergleich',
      fr: 'VTT électrique tout-suspendu : 115 modèles comparés',
      it: 'E-bike full: 115 modelli a confronto',
    },
    excerpt: {
      de: 'Fully oder Hardtail? 115 E-Bike Fully von 8 Marken im Vergleich: Preise ab CHF 3’678, Akku, Gewicht und Marken, mit Gratis Offerte.',
      fr: 'Tout-suspendu ou semi-rigide ? 115 VTT électriques tout-suspendus de 8 marques comparés : prix dès CHF 3’678, batterie, poids et marques.',
      it: 'Full o hardtail? 115 e-bike full di 8 marche a confronto: prezzi da CHF 3’678, batteria, peso e marche, con offerta gratuita.',
    },
    publishedDate: '2026-11-07',
    readMinutes: 6,
    related: { categoryId: 'e-mountainbikes', subcategoryId: 'e-fullys' },
    body: {
      de: [
        {
          heading: 'E-Bike Fully: 115 Modelle von 8 Marken',
          paragraphs: [
            'Ein E-Bike Fully ist ein E-Mountainbike mit Federung vorne und hinten und damit die Wahl für ruppige Trails und lange Abfahrten. In unserem Katalog finden Sie 115 Fully-Modelle von acht Marken: Cube, Haibike, Scott, Trek, Specialized, Cannondale, Giant und Thömus. Die Preise reichen von CHF 3’678 bis CHF 14’499, der mittlere Preis liegt bei CHF 6’599.',
            'Typisch ist ein Akku mit 800 Wh, die Spanne reicht von 360 bis 900 Wh. Hier vergleichen wir sie mit dem Hardtail, nach Budget und nach Marke.',
          ],
        },
        {
          heading: 'Fully oder Hardtail: der Vergleich in Zahlen',
          paragraphs: [
            'Ein Hardtail ist nur vorne gefedert. Es kostet im Mittel deutlich weniger und hat weniger bewegliche Teile, bietet aber auf technischen Trails weniger Grip und Komfort. Beim Akku liegen beide im Median bei 800 Wh, beim mittleren Gewicht ebenfalls gleichauf.',
          ],
          table: {
            caption: 'E-Fully und E-Hardtail im Katalog: Anzahl, Preis, Akku und Gewicht',
            head: ['Merkmal', 'E-Fully', 'E-Hardtail'],
            rows: [
              ['Modelle gesamt', '115', '21'],
              ['Marken', '8', '5'],
              ['Preis ab (CHF)', '3’678', '2’390'],
              ['Mittlerer Preis (CHF)', '6’599', '3’585'],
              ['Preis bis (CHF)', '14’499', '4’799'],
              ['Akku, Median (Wh)', '800', '800'],
              ['Gewicht, Median (kg)', '24,4', '24,4'],
              ['Leichtestes Modell (kg)', '16,8', '21,7'],
            ],
          },
        },
        {
          heading: 'E-Bike Fully nach Budget',
          paragraphs: [
            'Unter CHF 5’000 gibt es 28 Fully-Modelle, zwischen CHF 5’000 und CHF 7’999 sind es 51 und ab CHF 8’000 noch 36. Mit dem Budget werden typischerweise Rahmen, Federelemente und Schaltung hochwertiger. Die Gewichtsangaben stammen von den Herstellern und liegen bei 71 Fully-Modellen zwischen 16,8 und 29,2 kg.',
          ],
          table: {
            caption: 'E-Bike Fully nach Preisklasse mit Beispielmodellen',
            head: ['Budget (CHF)', 'Modelle', 'Beispiele aus dem Katalog'],
            rows: [
              ['bis 4’999', '28', 'Giant Stance E+ (2027) CHF 3’678, Cube Stereo Hybrid ONE22 SLX 800 CHF 3’861, Scott Strike 40 CHF 3’999'],
              ['5’000 bis 7’999', '51', 'Cube Stereo Hybrid ONE44 HPC SLX EVO 800 CHF 5’240, Specialized Turbo Levo R Comp CHF 7’999'],
              ['ab 8’000', '36', 'Specialized Turbo Levo 4 Expert CHF 9’999, Specialized S-Works Levo 4 X CHF 14’499'],
            ],
          },
        },
        {
          heading: 'Fully-Marken im Vergleich',
          paragraphs: [
            'Cube bietet mit 25 Fully-Modellen die grösste Auswahl und den günstigsten Einstieg mit Bosch-Antrieb (ab CHF 3’861). Haibike (21 Modelle) und Scott (19) starten bei CHF 3’999, Trek (16) bei CHF 4’199. Specialized (15 Modelle, ab CHF 5’499) setzt durchgehend auf eigene Antriebe, Cannondale (14) startet bei CHF 3’999 und Giant (4) bei CHF 3’678.',
            'Beim Antrieb dominiert Bosch mit 65 von 115 Fully-Modellen. Dazu kommen Specialized (15), TQ (12), Fazua (6), Shimano (5) und Yamaha (4).',
          ],
        },
        {
          heading: 'So entscheiden Sie sich',
          paragraphs: [
            'Für Trails, Bikepark und lange Abfahrten wählen Sie ein Fully, für Touren, Forstwege und den Weg zur Arbeit genügt ein Hardtail. Achten Sie beim Fully auf Federweg, Dämpfer und Bremsen, beim Akku auf 625 bis 800 Wh für Tagestouren mit vielen Höhenmetern.',
            'Wer ein leichtes Fully sucht, findet Modelle ab 16,8 kg, etwa das Cube AMS Hybrid ONE44 C:68X SLT 400X (CHF 7’354) mit 400-Wh-Akku. Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge; die Tabelle des Herstellers ist der beste Ausgangspunkt.',
          ],
        },
        {
          heading: 'E-Bike Fully online bestellen',
          paragraphs: [
            'Legen Sie Ihr Wunschmodell in den Warenkorb oder fordern Sie unten eine Gratis Offerte an. Alle E-Bikes sind neu und stammen aus unserem eigenen Lager. Bezahlen können Sie per Banküberweisung oder mit Krypto; mit Krypto sparen Sie 10 %.',
          ],
        },
      ],
      fr: [
        {
          heading: 'VTT électrique tout-suspendu : 115 modèles de 8 marques',
          paragraphs: [
            'Un VTT électrique tout-suspendu est suspendu à l’avant et à l’arrière : c’est le choix pour les sentiers difficiles et les longues descentes. Notre catalogue compte 115 modèles tout-suspendus de huit marques : Cube, Haibike, Scott, Trek, Specialized, Cannondale, Giant et Thömus. Les prix vont de CHF 3’678 à CHF 14’499, le prix médian est de CHF 6’599.',
            'La batterie typique est de 800 Wh, avec une plage de 360 à 900 Wh. Nous les comparons ici au semi-rigide, par budget et par marque.',
          ],
        },
        {
          heading: 'Tout-suspendu ou semi-rigide : la comparaison en chiffres',
          paragraphs: [
            'Un semi-rigide n’est suspendu qu’à l’avant. Il coûte nettement moins en moyenne et compte moins de pièces mobiles, mais offre moins d’adhérence et de confort sur les sentiers techniques. Pour la batterie, les deux ont une médiane de 800 Wh, et le poids médian est identique.',
          ],
          table: {
            caption: 'VTT électriques tout-suspendus et semi-rigides du catalogue : nombre, prix, batterie et poids',
            head: ['Critère', 'Tout-suspendu', 'Semi-rigide'],
            rows: [
              ['Modèles au total', '115', '21'],
              ['Marques', '8', '5'],
              ['Prix dès (CHF)', '3’678', '2’390'],
              ['Prix médian (CHF)', '6’599', '3’585'],
              ['Prix jusqu’à (CHF)', '14’499', '4’799'],
              ['Batterie, médiane (Wh)', '800', '800'],
              ['Poids, médiane (kg)', '24,4', '24,4'],
              ['Modèle le plus léger (kg)', '16,8', '21,7'],
            ],
          },
        },
        {
          heading: 'VTT électrique tout-suspendu selon le budget',
          paragraphs: [
            'Sous CHF 5’000, il y a 28 modèles tout-suspendus ; entre CHF 5’000 et CHF 7’999, 51 ; dès CHF 8’000, 36. Avec le budget, le cadre, la suspension et la transmission gagnent généralement en qualité. Les poids sont ceux des fabricants et vont de 16,8 à 29,2 kg pour 71 modèles tout-suspendus.',
          ],
          table: {
            caption: 'VTT électriques tout-suspendus par tranche de prix avec exemples',
            head: ['Budget (CHF)', 'Modèles', 'Exemples du catalogue'],
            rows: [
              ['jusqu’à 4’999', '28', 'Giant Stance E+ (2027) CHF 3’678, Cube Stereo Hybrid ONE22 SLX 800 CHF 3’861, Scott Strike 40 CHF 3’999'],
              ['5’000 à 7’999', '51', 'Cube Stereo Hybrid ONE44 HPC SLX EVO 800 CHF 5’240, Specialized Turbo Levo R Comp CHF 7’999'],
              ['dès 8’000', '36', 'Specialized Turbo Levo 4 Expert CHF 9’999, Specialized S-Works Levo 4 X CHF 14’499'],
            ],
          },
        },
        {
          heading: 'Les marques de tout-suspendus comparées',
          paragraphs: [
            'Cube offre le plus grand choix avec 25 modèles tout-suspendus et l’entrée de gamme la moins chère avec moteur Bosch (dès CHF 3’861). Haibike (21 modèles) et Scott (19) démarrent à CHF 3’999, Trek (16) à CHF 4’199. Specialized (15 modèles, dès CHF 5’499) mise partout sur ses propres moteurs, Cannondale (14) démarre à CHF 3’999 et Giant (4) à CHF 3’678.',
            'Côté moteurs, Bosch domine avec 65 des 115 modèles tout-suspendus. S’ajoutent Specialized (15), TQ (12), Fazua (6), Shimano (5) et Yamaha (4).',
          ],
        },
        {
          heading: 'Comment décider',
          paragraphs: [
            'Pour les sentiers, le bikepark et les longues descentes, choisissez un tout-suspendu ; pour les excursions, les chemins forestiers et le trajet quotidien, un semi-rigide suffit. Sur un tout-suspendu, surveillez le débattement, l’amortisseur et les freins ; pour la batterie, visez 625 à 800 Wh pour les journées avec beaucoup de dénivelé.',
            'Si vous cherchez un tout-suspendu léger, des modèles existent dès 16,8 kg, comme le Cube AMS Hybrid ONE44 C:68X SLT 400X (CHF 7’354) avec batterie de 400 Wh. La taille du cadre dépend de votre taille et de votre entrejambe ; le tableau du fabricant est le meilleur point de départ.',
          ],
        },
        {
          heading: 'Commander un VTT électrique tout-suspendu en ligne',
          paragraphs: [
            'Ajoutez le modèle souhaité au panier ou demandez ci-dessous une offre gratuite. Tous les vélos électriques sont neufs et viennent de notre propre stock. Vous payez par virement bancaire ou en crypto ; en crypto, vous économisez 10 %.',
          ],
        },
      ],
      it: [
        {
          heading: 'E-bike full: 115 modelli di 8 marche',
          paragraphs: [
            'Una e-bike full è una mountain bike elettrica con sospensione davanti e dietro: è la scelta per sentieri impegnativi e lunghe discese. Il nostro catalogo conta 115 modelli full di otto marche: Cube, Haibike, Scott, Trek, Specialized, Cannondale, Giant e Thömus. I prezzi vanno da CHF 3’678 a CHF 14’499, il prezzo mediano è CHF 6’599.',
            'La batteria tipica è da 800 Wh, con un intervallo da 360 a 900 Wh. Qui le confrontiamo con le hardtail, per budget e per marca.',
          ],
        },
        {
          heading: 'Full o hardtail: il confronto in numeri',
          paragraphs: [
            'Una hardtail ha la sospensione solo davanti. Costa in media nettamente meno e ha meno parti mobili, ma offre meno aderenza e comfort sui sentieri tecnici. Per la batteria entrambe hanno una mediana di 800 Wh, e anche il peso mediano è lo stesso.',
          ],
          table: {
            caption: 'E-bike full e hardtail del catalogo: numero, prezzo, batteria e peso',
            head: ['Caratteristica', 'E-bike full', 'Hardtail elettrica'],
            rows: [
              ['Modelli in totale', '115', '21'],
              ['Marche', '8', '5'],
              ['Prezzo da (CHF)', '3’678', '2’390'],
              ['Prezzo mediano (CHF)', '6’599', '3’585'],
              ['Prezzo fino a (CHF)', '14’499', '4’799'],
              ['Batteria, mediana (Wh)', '800', '800'],
              ['Peso, mediana (kg)', '24,4', '24,4'],
              ['Modello più leggero (kg)', '16,8', '21,7'],
            ],
          },
        },
        {
          heading: 'E-bike full per budget',
          paragraphs: [
            'Sotto CHF 5’000 ci sono 28 modelli full, tra CHF 5’000 e CHF 7’999 sono 51 e da CHF 8’000 ne restano 36. Con il budget di solito migliorano telaio, sospensioni e cambio. I pesi sono quelli dei produttori e vanno da 16,8 a 29,2 kg per 71 modelli full.',
          ],
          table: {
            caption: 'E-bike full per fascia di prezzo con modelli di esempio',
            head: ['Budget (CHF)', 'Modelli', 'Esempi dal catalogo'],
            rows: [
              ['fino a 4’999', '28', 'Giant Stance E+ (2027) CHF 3’678, Cube Stereo Hybrid ONE22 SLX 800 CHF 3’861, Scott Strike 40 CHF 3’999'],
              ['da 5’000 a 7’999', '51', 'Cube Stereo Hybrid ONE44 HPC SLX EVO 800 CHF 5’240, Specialized Turbo Levo R Comp CHF 7’999'],
              ['da 8’000', '36', 'Specialized Turbo Levo 4 Expert CHF 9’999, Specialized S-Works Levo 4 X CHF 14’499'],
            ],
          },
        },
        {
          heading: 'Le marche di e-bike full a confronto',
          paragraphs: [
            'Cube offre la scelta più ampia con 25 modelli full e l’ingresso più economico con motore Bosch (da CHF 3’861). Haibike (21 modelli) e Scott (19) partono da CHF 3’999, Trek (16) da CHF 4’199. Specialized (15 modelli, da CHF 5’499) usa sempre motori propri, Cannondale (14) parte da CHF 3’999 e Giant (4) da CHF 3’678.',
            'Per i motori domina Bosch con 65 dei 115 modelli full. Seguono Specialized (15), TQ (12), Fazua (6), Shimano (5) e Yamaha (4).',
          ],
        },
        {
          heading: 'Come decidere',
          paragraphs: [
            'Per sentieri, bikepark e lunghe discese scegliete una full; per escursioni, strade forestali e per andare al lavoro basta una hardtail. Su una full controllate escursione, ammortizzatore e freni; per la batteria puntate su 625–800 Wh per giornate con molto dislivello.',
            'Chi cerca una full leggera trova modelli da 16,8 kg, come la Cube AMS Hybrid ONE44 C:68X SLT 400X (CHF 7’354) con batteria da 400 Wh. La taglia del telaio dipende da altezza e lunghezza della gamba; la tabella del produttore è il miglior punto di partenza.',
          ],
        },
        {
          heading: 'Ordinare una e-bike full online',
          paragraphs: [
            'Mettete il modello desiderato nel carrello oppure richiedete qui sotto un’offerta gratuita. Tutte le e-bike sono nuove e provengono dal nostro magazzino. Potete pagare con bonifico bancario o in crypto; con le crypto risparmiate il 10%.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Was ist ein E-Bike Fully?', a: 'Ein E-Bike Fully ist ein E-Mountainbike mit Federung vorne und hinten. Es bietet mehr Grip und Komfort auf ruppigen Trails als ein Hardtail, das nur vorne gefedert ist.' },
        { q: 'Was kostet ein E-Bike Fully?', a: 'In unserem Katalog kosten die 115 Fully-Modelle zwischen CHF 3’678 und CHF 14’499, der mittlere Preis liegt bei CHF 6’599. 28 Modelle kosten weniger als CHF 5’000.' },
        { q: 'Wie leicht kann ein E-Bike Fully sein?', a: 'Das leichteste Fully mit Gewichtsangabe ist das Cube AMS Hybrid ONE44 C:68X SLT 400X mit 16,8 kg laut Hersteller. Das mittlere Gewicht liegt bei 24,4 kg.' },
        { q: 'Wie bezahle ich ein E-Bike Fully?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Qu’est-ce qu’un VTT électrique tout-suspendu ?', a: 'C’est un VTT électrique suspendu à l’avant et à l’arrière. Il offre plus d’adhérence et de confort sur les sentiers difficiles qu’un semi-rigide, qui n’est suspendu qu’à l’avant.' },
        { q: 'Combien coûte un VTT électrique tout-suspendu ?', a: 'Dans notre catalogue, les 115 modèles tout-suspendus coûtent de CHF 3’678 à CHF 14’499, le prix médian étant de CHF 6’599. 28 modèles coûtent moins de CHF 5’000.' },
        { q: 'Quel est le poids minimal d’un tout-suspendu ?', a: 'Le tout-suspendu le plus léger avec poids indiqué est le Cube AMS Hybrid ONE44 C:68X SLT 400X avec 16,8 kg selon le fabricant. Le poids médian est de 24,4 kg.' },
        { q: 'Comment payer un VTT électrique tout-suspendu ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Che cos’è una e-bike full?', a: 'È una mountain bike elettrica con sospensione davanti e dietro. Offre più aderenza e comfort sui sentieri impegnativi di una hardtail, che ha la sospensione solo davanti.' },
        { q: 'Quanto costa una e-bike full?', a: 'Nel nostro catalogo i 115 modelli full costano da CHF 3’678 a CHF 14’499, con un prezzo mediano di CHF 6’599. 28 modelli costano meno di CHF 5’000.' },
        { q: 'Quanto può pesare al minimo una e-bike full?', a: 'La full più leggera con peso dichiarato è la Cube AMS Hybrid ONE44 C:68X SLT 400X con 16,8 kg secondo il produttore. Il peso mediano è 24,4 kg.' },
        { q: 'Come si paga una e-bike full?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
  {
    id: 'e-bike-preise-budget',
    slug: { de: 'was-kostet-ein-e-bike', fr: 'prix-velo-electrique', it: 'prezzo-e-bike' },
    title: {
      de: 'Was kostet ein E-Bike: Preise und Modelle nach Budget',
      fr: 'Prix d’un vélo électrique : modèles selon le budget',
      it: 'Quanto costa una e-bike: prezzi e modelli per budget',
    },
    excerpt: {
      de: 'E-Bike Preise in der Schweiz: 348 neue Modelle von CHF 1’700 bis CHF 14’499, nach Budget und Kategorie verglichen, mit Gratis Offerte.',
      fr: 'Prix des vélos électriques en Suisse : 348 modèles neufs de CHF 1’700 à CHF 14’499, comparés par budget et par catégorie, avec offre gratuite.',
      it: 'Prezzi delle e-bike in Svizzera: 348 modelli nuovi da CHF 1’700 a CHF 14’499, confrontati per budget e categoria, con offerta gratuita.',
    },
    publishedDate: '2026-11-07',
    readMinutes: 6,
    related: {},
    body: {
      de: [
        {
          heading: 'Was ein E-Bike in der Schweiz kostet',
          paragraphs: [
            'Ein neues E-Bike kostet in unserem Katalog zwischen CHF 1’700 und CHF 14’499; bei 348 Modellen liegt der mittlere Preis bei CHF 4’599. Alle Preise sind in CHF angegeben. Bei 94 Modellen handelt es sich um ca.-Preise, die aus Herstellerpreisen umgerechnet wurden.',
          ],
        },
        {
          heading: 'E-Bike Preise nach Budget',
          paragraphs: [
            'Die meisten Modelle liegen zwischen CHF 3’000 und CHF 4’999: 162 von 348. Darunter gibt es 37 Modelle, darüber 101 bis CHF 7’999 und 48 ab CHF 8’000. Mit dem Budget wächst typischerweise der Akku: Der Median steigt von 540 Wh bis CHF 2’999 auf 800 Wh ab CHF 5’000.',
          ],
          table: {
            caption: 'E-Bike Modelle nach Preisklasse mit typischen Kategorien und mittlerem Akku',
            head: ['Budget (CHF)', 'Modelle', 'Häufigste Kategorien', 'Akku, Median'],
            rows: [
              ['bis 2’999', '37', 'City (13), Trekking (11), E-Mountainbike (6)', '540 Wh'],
              ['3’000 bis 4’999', '162', 'Trekking (66), E-Mountainbike (43), City (29)', '710 Wh'],
              ['5’000 bis 7’999', '101', 'E-Mountainbike (51), Trekking (25), Cargo (10)', '800 Wh'],
              ['ab 8’000', '48', 'E-Mountainbike (36), Gravel (7), E-Bike 45 (3)', '800 Wh'],
            ],
          },
        },
        {
          heading: 'E-Bike Preise nach Kategorie',
          paragraphs: [
            'Am günstigsten sind City E-Bikes und Falt E-Bikes, am breitesten streuen E-Mountainbikes und Gravel E-Bikes. Das E-Bike 45 liegt mit einem mittleren Preis von CHF 8’166 am höchsten, hat aber nur 6 Modelle im Katalog.',
          ],
          table: {
            caption: 'E-Bike Preise nach Kategorie: Anzahl Modelle, Preis ab, mittlerer Preis und Preis bis',
            head: ['Kategorie', 'Modelle', 'Preis ab (CHF)', 'Median (CHF)', 'Preis bis (CHF)'],
            rows: [
              ['City E-Bike', '46', '1’700', '3’999', '5’499'],
              ['Trekking E-Bike', '104', '2’390', '4’199', '8’399'],
              ['E-Mountainbike', '136', '2’390', '5’999', '14’499'],
              ['Gravel E-Bike', '29', '2’757', '5’949', '12’999'],
              ['Cargo E-Bike', '22', '3’493', '4’999', '7’569'],
              ['Falt E-Bike', '4', '2’298', '2’665', '2’941'],
              ['E-Bike 45 km/h', '6', '4’596', '8’166', '11’943'],
            ],
          },
        },
        {
          heading: 'Was den Preis bestimmt',
          paragraphs: [
            'Vier Dinge bestimmen den Preis: Rahmen und Gewicht, Antrieb und Akku, Federung und Komponenten sowie die Kategorie. Das Cube Editor Hybrid ONE 360 FE ist mit CHF 1’700, 360 Wh und 20 kg das günstigste Modell im Katalog; ein Specialized S-Works Levo 4 X mit 840 Wh kostet CHF 14’499.',
            'Ein E-Bike 45 kostet mehr (CHF 4’596 bis CHF 11’943) und verursacht zusätzliche Kosten für Kontrollschild, Haftpflichtversicherung und Helm. Die Voraussetzungen erklärt unsere Kaufberatung zum E-Bike 45.',
          ],
        },
        {
          heading: 'So sparen Sie beim Kauf',
          paragraphs: [
            'Vergleichen Sie Modelle mit ähnlichen Komponenten, nicht nur den Preis. Marken wie Kalkhoff (mittlerer Preis CHF 3’999) und Cube (CHF 4’136) liegen unter dem Katalogmittel von CHF 4’599. Wer mit Kryptowährung bezahlt, spart 10 %: Ein E-Bike für CHF 4’599 kostet dann CHF 4’139.',
            'Legen Sie Ihr Wunschmodell in den Warenkorb oder fordern Sie unten eine Gratis Offerte an. Alle E-Bikes sind neu und stammen aus unserem eigenen Lager.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Ce que coûte un vélo électrique en Suisse',
          paragraphs: [
            'Un vélo électrique neuf coûte dans notre catalogue entre CHF 1’700 et CHF 14’499 ; sur 348 modèles, le prix médian est de CHF 4’599. Tous les prix sont en CHF. Pour 94 modèles, il s’agit de prix approximatifs convertis à partir des prix des fabricants.',
          ],
        },
        {
          heading: 'Prix des vélos électriques selon le budget',
          paragraphs: [
            'La plupart des modèles se situent entre CHF 3’000 et CHF 4’999 : 162 sur 348. En dessous, il y a 37 modèles, au-dessus 101 jusqu’à CHF 7’999 et 48 dès CHF 8’000. Avec le budget, la batterie grandit généralement : la médiane passe de 540 Wh jusqu’à CHF 2’999 à 800 Wh dès CHF 5’000.',
          ],
          table: {
            caption: 'Vélos électriques par tranche de prix avec catégories typiques et batterie médiane',
            head: ['Budget (CHF)', 'Modèles', 'Catégories les plus fréquentes', 'Batterie, médiane'],
            rows: [
              ['jusqu’à 2’999', '37', 'Ville (13), trekking (11), VTT (6)', '540 Wh'],
              ['3’000 à 4’999', '162', 'Trekking (66), VTT (43), ville (29)', '710 Wh'],
              ['5’000 à 7’999', '101', 'VTT (51), trekking (25), cargo (10)', '800 Wh'],
              ['dès 8’000', '48', 'VTT (36), gravel (7), 45 km/h (3)', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Prix des vélos électriques selon la catégorie',
          paragraphs: [
            'Les vélos de ville et les vélos pliants sont les moins chers ; les VTT électriques et les vélos gravel ont la plus grande dispersion. Le vélo électrique 45 est le plus cher avec un prix médian de CHF 8’166, mais n’a que 6 modèles au catalogue.',
          ],
          table: {
            caption: 'Prix des vélos électriques par catégorie : nombre de modèles, prix dès, prix médian et prix jusqu’à',
            head: ['Catégorie', 'Modèles', 'Prix dès (CHF)', 'Médiane (CHF)', 'Prix jusqu’à (CHF)'],
            rows: [
              ['Vélo de ville électrique', '46', '1’700', '3’999', '5’499'],
              ['Vélo de trekking électrique', '104', '2’390', '4’199', '8’399'],
              ['VTT électrique', '136', '2’390', '5’999', '14’499'],
              ['Vélo gravel électrique', '29', '2’757', '5’949', '12’999'],
              ['Vélo cargo électrique', '22', '3’493', '4’999', '7’569'],
              ['Vélo électrique pliant', '4', '2’298', '2’665', '2’941'],
              ['Vélo électrique 45 km/h', '6', '4’596', '8’166', '11’943'],
            ],
          },
        },
        {
          heading: 'Ce qui détermine le prix',
          paragraphs: [
            'Quatre éléments déterminent le prix : le cadre et le poids, le moteur et la batterie, la suspension et les composants, et la catégorie. Le Cube Editor Hybrid ONE 360 FE est le modèle le moins cher du catalogue avec CHF 1’700, 360 Wh et 20 kg ; un Specialized S-Works Levo 4 X de 840 Wh coûte CHF 14’499.',
            'Un vélo électrique 45 coûte plus cher (de CHF 4’596 à CHF 11’943) et entraîne des frais supplémentaires pour la plaque de contrôle, l’assurance responsabilité civile et le casque. Notre guide d’achat du vélo électrique 45 explique les conditions.',
          ],
        },
        {
          heading: 'Comment économiser à l’achat',
          paragraphs: [
            'Comparez des modèles aux composants similaires, pas seulement le prix. Des marques comme Kalkhoff (prix médian CHF 3’999) et Cube (CHF 4’136) sont sous la médiane du catalogue de CHF 4’599. Si vous payez en cryptomonnaie, vous économisez 10 % : un vélo électrique à CHF 4’599 coûte alors CHF 4’139.',
            'Ajoutez le modèle souhaité au panier ou demandez ci-dessous une offre gratuite. Tous les vélos électriques sont neufs et viennent de notre propre stock.',
          ],
        },
      ],
      it: [
        {
          heading: 'Quanto costa una e-bike in Svizzera',
          paragraphs: [
            'Una e-bike nuova costa nel nostro catalogo tra CHF 1’700 e CHF 14’499; su 348 modelli il prezzo mediano è CHF 4’599. Tutti i prezzi sono in CHF. Per 94 modelli si tratta di prezzi indicativi convertiti dai prezzi dei produttori.',
          ],
        },
        {
          heading: 'Prezzi delle e-bike per budget',
          paragraphs: [
            'La maggior parte dei modelli si trova tra CHF 3’000 e CHF 4’999: 162 su 348. Sotto ce ne sono 37, sopra 101 fino a CHF 7’999 e 48 da CHF 8’000. Con il budget di solito cresce la batteria: la mediana sale da 540 Wh fino a CHF 2’999 a 800 Wh da CHF 5’000.',
          ],
          table: {
            caption: 'E-bike per fascia di prezzo con categorie tipiche e batteria mediana',
            head: ['Budget (CHF)', 'Modelli', 'Categorie più frequenti', 'Batteria, mediana'],
            rows: [
              ['fino a 2’999', '37', 'City (13), trekking (11), mountain bike (6)', '540 Wh'],
              ['da 3’000 a 4’999', '162', 'Trekking (66), mountain bike (43), city (29)', '710 Wh'],
              ['da 5’000 a 7’999', '101', 'Mountain bike (51), trekking (25), cargo (10)', '800 Wh'],
              ['da 8’000', '48', 'Mountain bike (36), gravel (7), 45 km/h (3)', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Prezzi delle e-bike per categoria',
          paragraphs: [
            'Le e-bike city e quelle pieghevoli sono le più economiche; mountain bike elettriche e gravel hanno la maggiore dispersione. La e-bike 45 è la più cara con un prezzo mediano di CHF 8’166, ma ha solo 6 modelli a catalogo.',
          ],
          table: {
            caption: 'Prezzi delle e-bike per categoria: numero di modelli, prezzo da, prezzo mediano e prezzo fino a',
            head: ['Categoria', 'Modelli', 'Prezzo da (CHF)', 'Mediana (CHF)', 'Prezzo fino a (CHF)'],
            rows: [
              ['Bicicletta elettrica city', '46', '1’700', '3’999', '5’499'],
              ['Bicicletta elettrica trekking', '104', '2’390', '4’199', '8’399'],
              ['Mountain bike elettrica', '136', '2’390', '5’999', '14’499'],
              ['Bicicletta elettrica gravel', '29', '2’757', '5’949', '12’999'],
              ['Bicicletta elettrica cargo', '22', '3’493', '4’999', '7’569'],
              ['Bicicletta elettrica pieghevole', '4', '2’298', '2’665', '2’941'],
              ['Bicicletta elettrica 45 km/h', '6', '4’596', '8’166', '11’943'],
            ],
          },
        },
        {
          heading: 'Che cosa determina il prezzo',
          paragraphs: [
            'Quattro elementi determinano il prezzo: telaio e peso, motore e batteria, sospensioni e componenti, e la categoria. La Cube Editor Hybrid ONE 360 FE è il modello più economico del catalogo con CHF 1’700, 360 Wh e 20 kg; una Specialized S-Works Levo 4 X da 840 Wh costa CHF 14’499.',
            'Una e-bike 45 costa di più (da CHF 4’596 a CHF 11’943) e comporta costi aggiuntivi per targa, assicurazione di responsabilità civile e casco. La nostra guida all’acquisto della e-bike 45 spiega i requisiti.',
          ],
        },
        {
          heading: 'Come risparmiare all’acquisto',
          paragraphs: [
            'Confrontate modelli con componenti simili, non solo il prezzo. Marche come Kalkhoff (prezzo mediano CHF 3’999) e Cube (CHF 4’136) sono sotto la mediana del catalogo di CHF 4’599. Se pagate in criptovaluta risparmiate il 10%: una e-bike da CHF 4’599 costa allora CHF 4’139.',
            'Mettete il modello desiderato nel carrello oppure richiedete qui sotto un’offerta gratuita. Tutte le e-bike sono nuove e provengono dal nostro magazzino.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Was kostet ein E-Bike in der Schweiz?', a: 'In unserem Katalog kosten neue E-Bikes zwischen CHF 1’700 und CHF 14’499. Der mittlere Preis liegt bei CHF 4’599, die meisten Modelle (162 von 348) kosten zwischen CHF 3’000 und CHF 4’999.' },
        { q: 'Welches ist das günstigste E-Bike im Katalog?', a: 'Das Cube Editor Hybrid ONE 360 FE für CHF 1’700 mit 360-Wh-Akku und 20 kg Gewicht laut Hersteller.' },
        { q: 'Welche Zusatzkosten gibt es?', a: 'Ein E-Bike 25 braucht kein Kontrollschild. Das E-Bike 45 braucht Kontrollschild mit Haftpflichtversicherung und Helm; die Kosten hängen von Versicherung und Kanton ab.' },
        { q: 'Wie bezahle ich ein E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Combien coûte un vélo électrique en Suisse ?', a: 'Dans notre catalogue, les vélos électriques neufs coûtent entre CHF 1’700 et CHF 14’499. Le prix médian est de CHF 4’599 ; la plupart des modèles (162 sur 348) coûtent entre CHF 3’000 et CHF 4’999.' },
        { q: 'Quel est le vélo électrique le moins cher du catalogue ?', a: 'Le Cube Editor Hybrid ONE 360 FE à CHF 1’700, avec batterie de 360 Wh et 20 kg selon le fabricant.' },
        { q: 'Quels frais supplémentaires faut-il prévoir ?', a: 'Un vélo électrique 25 n’exige pas de plaque. Le vélo électrique 45 exige une plaque de contrôle avec assurance responsabilité civile et un casque ; les coûts dépendent de l’assurance et du canton.' },
        { q: 'Comment payer un vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Quanto costa una e-bike in Svizzera?', a: 'Nel nostro catalogo le e-bike nuove costano tra CHF 1’700 e CHF 14’499. Il prezzo mediano è CHF 4’599; la maggior parte dei modelli (162 su 348) costa tra CHF 3’000 e CHF 4’999.' },
        { q: 'Qual è la e-bike più economica del catalogo?', a: 'La Cube Editor Hybrid ONE 360 FE a CHF 1’700, con batteria da 360 Wh e 20 kg secondo il produttore.' },
        { q: 'Quali costi aggiuntivi ci sono?', a: 'Una e-bike 25 non richiede targa. La e-bike 45 richiede targa con assicurazione di responsabilità civile e casco; i costi dipendono da assicurazione e cantone.' },
        { q: 'Come si paga una e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
  {
    id: 'e-bike-marken-vergleich',
    slug: { de: 'e-bike-marken-vergleich', fr: 'comparatif-marques-velo-electrique', it: 'confronto-marche-e-bike' },
    title: {
      de: 'E-Bike Marken im Vergleich: Cube, Scott, Trek, Specialized',
      fr: 'Marques de vélos électriques : Cube, Scott, Trek, Specialized',
      it: 'Marche di e-bike a confronto: Cube, Scott, Trek, Specialized',
    },
    excerpt: {
      de: 'Cube, Scott, Specialized, Trek, Haibike und mehr: 8 E-Bike Marken im Vergleich mit Modellzahl, Preisen, Antrieb und Schwerpunkt, mit Gratis Offerte.',
      fr: 'Cube, Scott, Specialized, Trek, Haibike et plus : 8 marques de vélos électriques comparées par nombre de modèles, prix, moteur et spécialité.',
      it: 'Cube, Scott, Specialized, Trek, Haibike e altre: 8 marche di e-bike a confronto per numero di modelli, prezzi, motore e specialità.',
    },
    publishedDate: '2026-11-07',
    readMinutes: 6,
    related: {},
    body: {
      de: [
        {
          heading: 'E-Bike Marken im Überblick',
          paragraphs: [
            'Unser Katalog umfasst 348 neue E-Bikes von zwölf Marken: Cube (80 Modelle), Scott und Specialized (je 45), Haibike (39), Trek und Kalkhoff (je 35), Cannondale (27), Riese & Müller (25), Giant (9), Stromer (5), BMC (2) und Thömus (1). Die Tabelle vergleicht die acht grössten.',
          ],
          table: {
            caption: 'Acht E-Bike Marken im Vergleich: Modelle, Preis ab, mittlerer Preis, Antrieb und Schwerpunkt',
            head: ['Marke', 'Modelle', 'Preis ab (CHF)', 'Median (CHF)', 'Antrieb', 'Schwerpunkt'],
            rows: [
              ['Cube', '80', '1’700', '4’136', 'Bosch (78)', 'E-Mountainbike (31), Trekking (14)'],
              ['Scott', '45', '2’999', '5’399', 'Bosch (36), TQ (9)', 'E-Mountainbike (21), Trekking (17)'],
              ['Specialized', '45', '3’299', '5’599', 'Specialized (45)', 'Trekking (24), E-Mountainbike (15)'],
              ['Haibike', '39', '2’999', '4’999', 'Bosch (28), Yamaha (6)', 'E-Mountainbike (26), Trekking (13)'],
              ['Trek', '35', '2’499', '5’499', 'Bosch (18), TQ (16)', 'E-Mountainbike (20), Gravel (6)'],
              ['Kalkhoff', '35', '2’399', '3’999', 'Bosch (35)', 'Trekking (21), City (14)'],
              ['Cannondale', '27', '3’799', '5’299', 'Bosch (20), Shimano (4)', 'E-Mountainbike (14), City (6)'],
              ['Riese & Müller', '25', '3’649', '4’719', 'Bosch (22), Fazua (3)', 'Cargo (10), City (8)'],
            ],
          },
        },
        {
          heading: 'Cube: grösste Auswahl, günstiger Einstieg',
          paragraphs: [
            'Cube hat mit 80 Modellen die grösste Auswahl und startet bei CHF 1’700. Fast alle Modelle haben einen Bosch-Antrieb (78 von 80), der mittlere Preis liegt mit CHF 4’136 unter dem Katalogmittel von CHF 4’599. Schwerpunkt sind E-Mountainbikes (31 Modelle), dazu kommen Trekking (14), City (11), Gravel (11) und Cargo (7).',
          ],
        },
        {
          heading: 'Scott und Trek: sportlich, mit TQ-Option',
          paragraphs: [
            'Scott (45 Modelle, ab CHF 2’999) deckt E-Mountainbike, Trekking und Gravel ab; 9 Modelle haben einen TQ-Antrieb mit kleinem Akku. Trek (35 Modelle, ab CHF 2’499) fokussiert auf E-Mountainbikes und Gravel, 16 Modelle haben einen TQ-Antrieb. Das mittlere Gewicht der Trek-Modelle mit Angabe liegt bei 23,1 kg, bei Scott bei 24,8 kg.',
          ],
        },
        {
          heading: 'Specialized, Haibike und Cannondale: Mountainbike-Fokus',
          paragraphs: [
            'Specialized (45 Modelle, ab CHF 3’299) baut durchgehend eigene Antriebe und hat viele Trekking E-Bikes (24) neben den E-Mountainbikes (15). Haibike (39 Modelle, ab CHF 2’999) konzentriert sich auf E-Mountainbikes (26), mit Bosch, Yamaha und Fazua. Cannondale (27 Modelle, ab CHF 3’799) bietet vor allem E-Mountainbikes (14) und City-Modelle.',
          ],
        },
        {
          heading: 'Kalkhoff und Riese & Müller: Alltag und Cargo',
          paragraphs: [
            'Kalkhoff (35 Modelle, ab CHF 2’399) hat durchgehend Bosch-Antrieb und das günstigste Preisniveau der grossen Marken (Median CHF 3’999), mit Schwerpunkt Trekking und City. Riese & Müller (25 Modelle, ab CHF 3’649) steht für Cargo (10) und City (8); die Modelle sind mit einem mittleren Gewicht von 30,1 kg die schwersten im Vergleich.',
          ],
        },
        {
          heading: 'Welche Marke passt zu Ihnen?',
          paragraphs: [
            'Für Trails und Touren sind Cube, Scott, Trek, Haibike und Specialized die erste Wahl, für den Alltag Kalkhoff und Cube, für Familie und Transport Riese & Müller. Vergleichen Sie innerhalb der Marke immer Motor, Akku und Gewicht des konkreten Modells.',
            'Legen Sie Ihr Wunschmodell in den Warenkorb oder fordern Sie unten eine Gratis Offerte an. Alle E-Bikes sind neu und stammen aus unserem eigenen Lager.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Les marques de vélos électriques en un coup d’œil',
          paragraphs: [
            'Notre catalogue compte 348 vélos électriques neufs de douze marques : Cube (80 modèles), Scott et Specialized (45 chacune), Haibike (39), Trek et Kalkhoff (35 chacune), Cannondale (27), Riese & Müller (25), Giant (9), Stromer (5), BMC (2) et Thömus (1). Le tableau compare les huit plus grandes.',
          ],
          table: {
            caption: 'Huit marques de vélos électriques comparées : modèles, prix dès, prix médian, moteur et spécialité',
            head: ['Marque', 'Modèles', 'Prix dès (CHF)', 'Médiane (CHF)', 'Moteur', 'Spécialité'],
            rows: [
              ['Cube', '80', '1’700', '4’136', 'Bosch (78)', 'VTT (31), trekking (14)'],
              ['Scott', '45', '2’999', '5’399', 'Bosch (36), TQ (9)', 'VTT (21), trekking (17)'],
              ['Specialized', '45', '3’299', '5’599', 'Specialized (45)', 'Trekking (24), VTT (15)'],
              ['Haibike', '39', '2’999', '4’999', 'Bosch (28), Yamaha (6)', 'VTT (26), trekking (13)'],
              ['Trek', '35', '2’499', '5’499', 'Bosch (18), TQ (16)', 'VTT (20), gravel (6)'],
              ['Kalkhoff', '35', '2’399', '3’999', 'Bosch (35)', 'Trekking (21), ville (14)'],
              ['Cannondale', '27', '3’799', '5’299', 'Bosch (20), Shimano (4)', 'VTT (14), ville (6)'],
              ['Riese & Müller', '25', '3’649', '4’719', 'Bosch (22), Fazua (3)', 'Cargo (10), ville (8)'],
            ],
          },
        },
        {
          heading: 'Cube : le plus grand choix, entrée de gamme abordable',
          paragraphs: [
            'Cube offre le plus grand choix avec 80 modèles et démarre à CHF 1’700. Presque tous les modèles ont un moteur Bosch (78 sur 80), et le prix médian de CHF 4’136 est inférieur à la médiane du catalogue de CHF 4’599. La spécialité, ce sont les VTT électriques (31 modèles), avec en plus le trekking (14), la ville (11), le gravel (11) et le cargo (7).',
          ],
        },
        {
          heading: 'Scott et Trek : sportifs, avec option TQ',
          paragraphs: [
            'Scott (45 modèles, dès CHF 2’999) couvre VTT, trekking et gravel ; 9 modèles ont un moteur TQ avec une petite batterie. Trek (35 modèles, dès CHF 2’499) se concentre sur les VTT et le gravel, 16 modèles ont un moteur TQ. Le poids médian des modèles Trek avec indication est de 23,1 kg, celui de Scott de 24,8 kg.',
          ],
        },
        {
          heading: 'Specialized, Haibike et Cannondale : l’accent sur le VTT',
          paragraphs: [
            'Specialized (45 modèles, dès CHF 3’299) construit partout ses propres moteurs et compte de nombreux vélos de trekking électriques (24) à côté des VTT (15). Haibike (39 modèles, dès CHF 2’999) se concentre sur les VTT (26), avec Bosch, Yamaha et Fazua. Cannondale (27 modèles, dès CHF 3’799) propose surtout des VTT (14) et des modèles de ville.',
          ],
        },
        {
          heading: 'Kalkhoff et Riese & Müller : quotidien et cargo',
          paragraphs: [
            'Kalkhoff (35 modèles, dès CHF 2’399) a partout le moteur Bosch et le niveau de prix le plus bas des grandes marques (médiane CHF 3’999), avec une spécialité trekking et ville. Riese & Müller (25 modèles, dès CHF 3’649) représente le cargo (10) et la ville (8) ; avec un poids médian de 30,1 kg, ses modèles sont les plus lourds de la comparaison.',
          ],
        },
        {
          heading: 'Quelle marque vous convient ?',
          paragraphs: [
            'Pour les sentiers et les excursions, Cube, Scott, Trek, Haibike et Specialized sont le premier choix ; pour le quotidien, Kalkhoff et Cube ; pour la famille et le transport, Riese & Müller. Au sein d’une marque, comparez toujours moteur, batterie et poids du modèle concret.',
            'Ajoutez le modèle souhaité au panier ou demandez ci-dessous une offre gratuite. Tous les vélos électriques sont neufs et viennent de notre propre stock.',
          ],
        },
      ],
      it: [
        {
          heading: 'Le marche di e-bike in sintesi',
          paragraphs: [
            'Il nostro catalogo comprende 348 e-bike nuove di dodici marche: Cube (80 modelli), Scott e Specialized (45 ciascuna), Haibike (39), Trek e Kalkhoff (35 ciascuna), Cannondale (27), Riese & Müller (25), Giant (9), Stromer (5), BMC (2) e Thömus (1). La tabella confronta le otto più grandi.',
          ],
          table: {
            caption: 'Otto marche di e-bike a confronto: modelli, prezzo da, prezzo mediano, motore e specialità',
            head: ['Marca', 'Modelli', 'Prezzo da (CHF)', 'Mediana (CHF)', 'Motore', 'Specialità'],
            rows: [
              ['Cube', '80', '1’700', '4’136', 'Bosch (78)', 'Mountain bike (31), trekking (14)'],
              ['Scott', '45', '2’999', '5’399', 'Bosch (36), TQ (9)', 'Mountain bike (21), trekking (17)'],
              ['Specialized', '45', '3’299', '5’599', 'Specialized (45)', 'Trekking (24), mountain bike (15)'],
              ['Haibike', '39', '2’999', '4’999', 'Bosch (28), Yamaha (6)', 'Mountain bike (26), trekking (13)'],
              ['Trek', '35', '2’499', '5’499', 'Bosch (18), TQ (16)', 'Mountain bike (20), gravel (6)'],
              ['Kalkhoff', '35', '2’399', '3’999', 'Bosch (35)', 'Trekking (21), city (14)'],
              ['Cannondale', '27', '3’799', '5’299', 'Bosch (20), Shimano (4)', 'Mountain bike (14), city (6)'],
              ['Riese & Müller', '25', '3’649', '4’719', 'Bosch (22), Fazua (3)', 'Cargo (10), city (8)'],
            ],
          },
        },
        {
          heading: 'Cube: la scelta più ampia, ingresso economico',
          paragraphs: [
            'Cube offre la scelta più ampia con 80 modelli e parte da CHF 1’700. Quasi tutti i modelli hanno un motore Bosch (78 su 80) e il prezzo mediano di CHF 4’136 è inferiore alla mediana del catalogo di CHF 4’599. La specialità sono le mountain bike elettriche (31 modelli), con in più trekking (14), city (11), gravel (11) e cargo (7).',
          ],
        },
        {
          heading: 'Scott e Trek: sportive, con opzione TQ',
          paragraphs: [
            'Scott (45 modelli, da CHF 2’999) copre mountain bike, trekking e gravel; 9 modelli hanno un motore TQ con una piccola batteria. Trek (35 modelli, da CHF 2’499) si concentra su mountain bike e gravel, 16 modelli hanno un motore TQ. Il peso mediano dei modelli Trek con dato è 23,1 kg, quello di Scott 24,8 kg.',
          ],
        },
        {
          heading: 'Specialized, Haibike e Cannondale: focus sulla mountain bike',
          paragraphs: [
            'Specialized (45 modelli, da CHF 3’299) costruisce sempre motori propri e ha molte e-bike trekking (24) accanto alle mountain bike (15). Haibike (39 modelli, da CHF 2’999) si concentra sulle mountain bike (26), con Bosch, Yamaha e Fazua. Cannondale (27 modelli, da CHF 3’799) offre soprattutto mountain bike (14) e modelli city.',
          ],
        },
        {
          heading: 'Kalkhoff e Riese & Müller: uso quotidiano e cargo',
          paragraphs: [
            'Kalkhoff (35 modelli, da CHF 2’399) ha sempre il motore Bosch e il livello di prezzo più basso tra le grandi marche (mediana CHF 3’999), con specialità trekking e city. Riese & Müller (25 modelli, da CHF 3’649) rappresenta cargo (10) e city (8); con un peso mediano di 30,1 kg i suoi modelli sono i più pesanti del confronto.',
          ],
        },
        {
          heading: 'Quale marca fa per voi?',
          paragraphs: [
            'Per sentieri ed escursioni Cube, Scott, Trek, Haibike e Specialized sono la prima scelta; per l’uso quotidiano Kalkhoff e Cube; per famiglia e trasporto Riese & Müller. All’interno di una marca confrontate sempre motore, batteria e peso del modello concreto.',
            'Mettete il modello desiderato nel carrello oppure richiedete qui sotto un’offerta gratuita. Tutte le e-bike sono nuove e provengono dal nostro magazzino.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Welche E-Bike Marke hat die grösste Auswahl?', a: 'In unserem Katalog hat Cube mit 80 Modellen die grösste Auswahl, gefolgt von Scott und Specialized mit je 45 Modellen.' },
        { q: 'Welche Marke ist am günstigsten?', a: 'Kalkhoff hat mit CHF 3’999 den niedrigsten mittleren Preis der grossen Marken, Cube bietet mit CHF 1’700 das günstigste Einzelmodell und CHF 4’136 als mittleren Preis.' },
        { q: 'Welche Marke hat Cargo E-Bikes?', a: 'Riese & Müller hat 10 Cargo-Modelle, Cube 7 und Cannondale 4. Insgesamt führt der Katalog 22 Cargo E-Bikes.' },
        { q: 'Wie bezahle ich ein E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Quelle marque de vélo électrique offre le plus grand choix ?', a: 'Dans notre catalogue, Cube offre le plus grand choix avec 80 modèles, suivi de Scott et Specialized avec 45 modèles chacune.' },
        { q: 'Quelle marque est la moins chère ?', a: 'Kalkhoff a le prix médian le plus bas des grandes marques avec CHF 3’999 ; Cube propose le modèle le moins cher avec CHF 1’700 et un prix médian de CHF 4’136.' },
        { q: 'Quelle marque propose des vélos cargo électriques ?', a: 'Riese & Müller compte 10 modèles cargo, Cube 7 et Cannondale 4. Au total, le catalogue compte 22 vélos cargo électriques.' },
        { q: 'Comment payer un vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Quale marca di e-bike ha la scelta più ampia?', a: 'Nel nostro catalogo Cube ha la scelta più ampia con 80 modelli, seguita da Scott e Specialized con 45 modelli ciascuna.' },
        { q: 'Quale marca è la più economica?', a: 'Kalkhoff ha il prezzo mediano più basso tra le grandi marche con CHF 3’999; Cube offre il modello singolo più economico con CHF 1’700 e un prezzo mediano di CHF 4’136.' },
        { q: 'Quale marca ha e-bike cargo?', a: 'Riese & Müller ha 10 modelli cargo, Cube 7 e Cannondale 4. In totale il catalogo conta 22 e-bike cargo.' },
        { q: 'Come si paga una e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
  {
    id: 'e-bike-motoren-vergleich',
    slug: { de: 'e-bike-motoren-vergleich', fr: 'comparatif-moteurs-velo-electrique', it: 'confronto-motori-e-bike' },
    title: {
      de: 'E-Bike Motoren im Vergleich: Bosch, TQ, Specialized, Fazua',
      fr: 'Moteurs de vélo électrique : Bosch, TQ, Specialized, Fazua',
      it: 'Motori e-bike a confronto: Bosch, TQ, Specialized, Fazua',
    },
    excerpt: {
      de: 'Bosch, TQ, Specialized, Fazua, Yamaha und Shimano: 348 E-Bikes nach Antrieb verglichen, mit Preis, Gewicht, Akku und Drehmoment, mit Gratis Offerte.',
      fr: 'Bosch, TQ, Specialized, Fazua, Yamaha et Shimano : 348 vélos électriques comparés par moteur, avec prix, poids, batterie et couple.',
      it: 'Bosch, TQ, Specialized, Fazua, Yamaha e Shimano: 348 e-bike confrontate per motore, con prezzo, peso, batteria e coppia.',
    },
    publishedDate: '2026-11-10',
    readMinutes: 6,
    related: {},
    body: {
      de: [
        {
          heading: 'E-Bike Motoren im Überblick',
          paragraphs: [
            'Der Antrieb bestimmt, wie ein E-Bike unterstützt, wie viel es wiegt und was es kostet. Fast alle Modelle in unserem Katalog haben einen Mittelmotor am Tretlager; sein Drehmoment in Newtonmetern (Nm) entscheidet, wie kräftig die Unterstützung am Berg ist. Von 348 Modellen haben 237 einen Bosch-Antrieb (68 %); dazu kommen 45 Modelle mit Specialized-Antrieb, 27 mit TQ, je 9 mit Giant- und Fazua-Antrieb, 6 mit Yamaha, 5 mit Shimano und 5 mit Stromer-Antrieb.',
            'Die Tabelle vergleicht die sechs wichtigsten Antriebe. Gewicht, Akku und Drehmoment sind Mediane über die Modelle mit Herstellerangabe.',
          ],
          table: {
            caption: 'E-Bike Antriebe im Vergleich: Modelle, Preis, mittleres Gewicht, Akku und Drehmoment',
            head: ['Antrieb', 'Modelle', 'Preis ab (CHF)', 'Median (CHF)', 'Gewicht', 'Akku', 'Drehmoment'],
            rows: [
              ['Bosch', '237', '1’700', '4’399', '26,8 kg', '750 Wh', '85 Nm'],
              ['Specialized', '45', '3’299', '5’599', '25,9 kg', '840 Wh', '105 Nm'],
              ['TQ', '27', '3’499', '7’999', '14,1 kg', '360 Wh', '60 Nm'],
              ['Fazua', '9', '4’435', '6’999', '19,5 kg', '480 Wh', '60 Nm'],
              ['Yamaha', '6', '3’699', '5’299', '–', '720 Wh', '75 Nm'],
              ['Shimano Steps', '5', '5’990', '8’499', '23,0 kg', '601 Wh', '85 Nm'],
            ],
          },
        },
        {
          heading: 'Bosch: die breiteste Auswahl',
          paragraphs: [
            'Bosch deckt alle Kategorien ab: 82 E-Mountainbikes, 76 Trekking E-Bikes, 40 City E-Bikes und alle 22 Cargo E-Bikes im Katalog. Verbaut wird der Antrieb von Cube, Scott, Haibike, Kalkhoff, Trek, Riese & Müller und Cannondale. Die Preise reichen von CHF 1’700 (Cube Editor Hybrid ONE 360 FE) bis CHF 11’499, der mittlere Preis liegt bei CHF 4’399.',
            'Das mittlere Drehmoment beträgt 85 Nm, der mittlere Akku 750 Wh bei einer Spanne von 360 bis 1’200 Wh. Mit einem Median von 26,8 kg gehören Bosch-Modelle zu den schwereren, weil viele Cargo-, Trekking- und Alltagsmodelle dazu zählen.',
          ],
        },
        {
          heading: 'TQ und Fazua: leicht und natürlich',
          paragraphs: [
            'TQ steckt in 27 Modellen von Trek (16), Scott (9) und BMC (2), vor allem in Gravel E-Bikes und Rennvelos (14) sowie E-Mountainbikes (12). Das mittlere Gewicht liegt bei 14,1 kg und der mittlere Akku bei 360 Wh; das leichteste Modell, das BMC Teammachine 01 AMP ONE, wiegt laut Hersteller 9,4 kg. Dafür kosten TQ-Modelle im Mittel CHF 7’999.',
            'Fazua ist mit 9 Modellen von Cannondale, Haibike und Riese & Müller vertreten, ab CHF 4’435 (Riese & Müller UBN Five), mit 480-Wh-Akku und 60 Nm. Gewichtsangaben liegen bei Fazua nur für 3 Modelle vor, im Mittel 19,5 kg.',
          ],
        },
        {
          heading: 'Specialized, Yamaha und Shimano: Fokus auf Mountainbike',
          paragraphs: [
            'Specialized baut alle 45 Modelle mit eigenem Antrieb: ab CHF 3’299 (Turbo Vado SL 2 4.0) mit einem Median von 105 Nm und 840 Wh, verteilt auf Trekking (24), E-Mountainbike (15), Gravel (3) und City (3). Yamaha treibt 6 Haibike-Modelle an (ab CHF 3’699, 720 Wh, 75 Nm), Shimano Steps 5 Modelle von Cannondale und Thömus (ab CHF 5’990, 85 Nm).',
            'Für das E-Bike 45 liefert Stromer 5 Modelle mit eigenem Antrieb, ab CHF 5’116. Gewichtsangaben fehlen bei Yamaha ganz und liegen bei Shimano nur für ein Modell vor.',
          ],
        },
        {
          heading: 'Welcher Antrieb passt zu Ihnen?',
          paragraphs: [
            'Für Alltag, Trekking und Transport ist Bosch die breiteste Wahl, auch bei Cargo gibt es keine Alternative im Katalog. Für Trails und steile Anstiege lohnen sich Antriebe mit mehr Drehmoment wie Specialized (105 Nm Median) oder Bosch CX; wer ein leichtes, natürlich fahrendes Rad sucht, schaut zu TQ und Fazua.',
            'Der Motor ist nur ein Teil des Pakets: Vergleichen Sie bei jedem Modell auch Akku, Gewicht und Komponenten. Legen Sie Ihr Wunschmodell in den Warenkorb oder fordern Sie unten eine Gratis Offerte an. Alle E-Bikes sind neu und stammen aus unserem eigenen Lager.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Les moteurs de vélo électrique en un coup d’œil',
          paragraphs: [
            'Le moteur détermine l’assistance, le poids et le prix d’un vélo électrique. Presque tous les modèles de notre catalogue ont un moteur central au pédalier ; son couple en newtons-mètres (Nm) décide de la puissance de l’assistance en montée. Sur 348 modèles, 237 ont un moteur Bosch (68 %), auxquels s’ajoutent Specialized (45 modèles avec moteur propre), TQ (27), Giant (9), Fazua (9), Yamaha (6), Shimano (5) et Stromer (5).',
            'Le tableau compare les six principaux moteurs. Poids, batterie et couple sont des médianes sur les modèles avec indication du fabricant.',
          ],
          table: {
            caption: 'Moteurs de vélo électrique comparés : modèles, prix, poids médian, batterie et couple',
            head: ['Moteur', 'Modèles', 'Prix dès (CHF)', 'Médiane (CHF)', 'Poids', 'Batterie', 'Couple'],
            rows: [
              ['Bosch', '237', '1’700', '4’399', '26,8 kg', '750 Wh', '85 Nm'],
              ['Specialized', '45', '3’299', '5’599', '25,9 kg', '840 Wh', '105 Nm'],
              ['TQ', '27', '3’499', '7’999', '14,1 kg', '360 Wh', '60 Nm'],
              ['Fazua', '9', '4’435', '6’999', '19,5 kg', '480 Wh', '60 Nm'],
              ['Yamaha', '6', '3’699', '5’299', '–', '720 Wh', '75 Nm'],
              ['Shimano Steps', '5', '5’990', '8’499', '23,0 kg', '601 Wh', '85 Nm'],
            ],
          },
        },
        {
          heading: 'Bosch : le plus grand choix',
          paragraphs: [
            'Bosch couvre toutes les catégories : 82 VTT électriques, 76 vélos de trekking électriques, 40 vélos de ville électriques et les 22 vélos cargo électriques du catalogue. Le moteur équipe Cube, Scott, Haibike, Kalkhoff, Trek, Riese & Müller et Cannondale. Les prix vont de CHF 1’700 (Cube Editor Hybrid ONE 360 FE) à CHF 11’499, le prix médian est de CHF 4’399.',
            'Le couple médian est de 85 Nm, la batterie médiane de 750 Wh pour une plage de 360 à 1’200 Wh. Avec un poids médian de 26,8 kg, les modèles Bosch comptent parmi les plus lourds, car beaucoup de modèles cargo, trekking et du quotidien en font partie.',
          ],
        },
        {
          heading: 'TQ et Fazua : légers et naturels',
          paragraphs: [
            'TQ équipe 27 modèles de Trek (16), Scott (9) et BMC (2), surtout des vélos gravel électriques et de route (14) et des VTT (12). Le poids médian est de 14,1 kg et la batterie médiane de 360 Wh ; le modèle le plus léger, le BMC Teammachine 01 AMP ONE, pèse 9,4 kg selon le fabricant. En contrepartie, les modèles TQ coûtent en médiane CHF 7’999.',
            'Fazua est présent avec 9 modèles de Cannondale, Haibike et Riese & Müller, dès CHF 4’435 (Riese & Müller UBN Five), avec batterie de 480 Wh et 60 Nm. Les poids ne sont indiqués que pour 3 modèles Fazua, 19,5 kg en médiane.',
          ],
        },
        {
          heading: 'Specialized, Yamaha et Shimano : l’accent sur le VTT',
          paragraphs: [
            'Specialized construit ses 45 modèles avec moteur propre : dès CHF 3’299 (Turbo Vado SL 2 4.0), avec une médiane de 105 Nm et 840 Wh, répartis entre trekking (24), VTT (15), gravel (3) et ville (3). Yamaha équipe 6 modèles Haibike (dès CHF 3’699, 720 Wh, 75 Nm), Shimano Steps 5 modèles de Cannondale et Thömus (dès CHF 5’990, 85 Nm).',
            'Pour le vélo électrique 45, Stromer propose 5 modèles avec moteur propre, dès CHF 5’116. Les poids manquent entièrement chez Yamaha et ne sont indiqués que pour un modèle chez Shimano.',
          ],
        },
        {
          heading: 'Quel moteur vous convient ?',
          paragraphs: [
            'Pour le quotidien, le trekking et le transport, Bosch est le choix le plus large ; pour le cargo, il n’y a pas d’alternative au catalogue. Pour les sentiers et les fortes montées, les moteurs à couple élevé comme Specialized (105 Nm en médiane) ou Bosch CX valent la peine ; qui cherche un vélo léger au rendu naturel se tourne vers TQ et Fazua.',
            'Le moteur n’est qu’une partie de l’ensemble : comparez aussi batterie, poids et composants de chaque modèle. Ajoutez le modèle souhaité au panier ou demandez ci-dessous une offre gratuite. Tous les vélos électriques sont neufs et viennent de notre propre stock.',
          ],
        },
      ],
      it: [
        {
          heading: 'I motori delle e-bike in sintesi',
          paragraphs: [
            'Il motore determina come assiste una e-bike, quanto pesa e quanto costa. Quasi tutti i modelli del nostro catalogo hanno un motore centrale al movimento; la sua coppia in newton metri (Nm) decide la forza dell’assistenza in salita. Su 348 modelli, 237 hanno un motore Bosch (68%), a cui si aggiungono Specialized (45 modelli con motore proprio), TQ (27), Giant (9), Fazua (9), Yamaha (6), Shimano (5) e Stromer (5).',
            'La tabella confronta i sei motori principali. Peso, batteria e coppia sono mediane sui modelli con dato del produttore.',
          ],
          table: {
            caption: 'Motori e-bike a confronto: modelli, prezzo, peso mediano, batteria e coppia',
            head: ['Motore', 'Modelli', 'Prezzo da (CHF)', 'Mediana (CHF)', 'Peso', 'Batteria', 'Coppia'],
            rows: [
              ['Bosch', '237', '1’700', '4’399', '26,8 kg', '750 Wh', '85 Nm'],
              ['Specialized', '45', '3’299', '5’599', '25,9 kg', '840 Wh', '105 Nm'],
              ['TQ', '27', '3’499', '7’999', '14,1 kg', '360 Wh', '60 Nm'],
              ['Fazua', '9', '4’435', '6’999', '19,5 kg', '480 Wh', '60 Nm'],
              ['Yamaha', '6', '3’699', '5’299', '–', '720 Wh', '75 Nm'],
              ['Shimano Steps', '5', '5’990', '8’499', '23,0 kg', '601 Wh', '85 Nm'],
            ],
          },
        },
        {
          heading: 'Bosch: la scelta più ampia',
          paragraphs: [
            'Bosch copre tutte le categorie: 82 mountain bike elettriche, 76 e-bike trekking, 40 e-bike city e tutte le 22 e-bike cargo del catalogo. Il motore equipaggia Cube, Scott, Haibike, Kalkhoff, Trek, Riese & Müller e Cannondale. I prezzi vanno da CHF 1’700 (Cube Editor Hybrid ONE 360 FE) a CHF 11’499, il prezzo mediano è CHF 4’399.',
            'La coppia mediana è 85 Nm, la batteria mediana 750 Wh con un intervallo da 360 a 1’200 Wh. Con un peso mediano di 26,8 kg i modelli Bosch sono tra i più pesanti, perché ne fanno parte molti modelli cargo, trekking e per l’uso quotidiano.',
          ],
        },
        {
          heading: 'TQ e Fazua: leggeri e naturali',
          paragraphs: [
            'TQ equipaggia 27 modelli di Trek (16), Scott (9) e BMC (2), soprattutto e-bike gravel e da corsa (14) e mountain bike (12). Il peso mediano è 14,1 kg e la batteria mediana 360 Wh; il modello più leggero, la BMC Teammachine 01 AMP ONE, pesa 9,4 kg secondo il produttore. In compenso i modelli TQ costano in mediana CHF 7’999.',
            'Fazua è presente con 9 modelli di Cannondale, Haibike e Riese & Müller, da CHF 4’435 (Riese & Müller UBN Five), con batteria da 480 Wh e 60 Nm. I pesi sono indicati solo per 3 modelli Fazua, 19,5 kg in mediana.',
          ],
        },
        {
          heading: 'Specialized, Yamaha e Shimano: focus sulla mountain bike',
          paragraphs: [
            'Specialized costruisce tutti i 45 modelli con motore proprio: da CHF 3’299 (Turbo Vado SL 2 4.0), con una mediana di 105 Nm e 840 Wh, suddivisi tra trekking (24), mountain bike (15), gravel (3) e city (3). Yamaha equipaggia 6 modelli Haibike (da CHF 3’699, 720 Wh, 75 Nm), Shimano Steps 5 modelli di Cannondale e Thömus (da CHF 5’990, 85 Nm).',
            'Per la e-bike 45 Stromer offre 5 modelli con motore proprio, da CHF 5’116. I pesi mancano del tutto per Yamaha e sono indicati solo per un modello Shimano.',
          ],
        },
        {
          heading: 'Quale motore fa per voi?',
          paragraphs: [
            'Per l’uso quotidiano, il trekking e il trasporto Bosch è la scelta più ampia; per il cargo non ci sono alternative a catalogo. Per sentieri e forti salite valgono la pena i motori con più coppia come Specialized (105 Nm in mediana) o Bosch CX; chi cerca una bici leggera e naturale guarda a TQ e Fazua.',
            'Il motore è solo una parte del pacchetto: confrontate per ogni modello anche batteria, peso e componenti. Mettete il modello desiderato nel carrello oppure richiedete qui sotto un’offerta gratuita. Tutte le e-bike sono nuove e provengono dal nostro magazzino.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Welcher E-Bike Motor ist der beste?', a: 'Das hängt vom Einsatz ab. Bosch bietet die breiteste Auswahl (237 von 348 Modellen), TQ und Fazua stehen für leichte, natürlich fahrende Räder, Specialized hat mit 105 Nm das höchste mittlere Drehmoment.' },
        { q: 'Wie viel Drehmoment brauche ich?', a: 'Für Alltag und Touren reichen oft 60 bis 85 Nm; wer steile Trails fährt, wählt eher 85 Nm und mehr. Im Katalog liegt der Median bei Bosch bei 85 Nm, bei TQ und Fazua bei 60 Nm.' },
        { q: 'Welche E-Bikes haben die leichtesten Antriebe?', a: 'TQ-Modelle von Trek, Scott und BMC wiegen im Mittel 14,1 kg, das leichteste (BMC Teammachine 01 AMP ONE) 9,4 kg laut Hersteller. Auch Fazua-Antriebe sind leicht.' },
        { q: 'Wie bezahle ich ein E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Quel est le meilleur moteur de vélo électrique ?', a: 'Cela dépend de l’usage. Bosch offre le plus grand choix (237 modèles sur 348), TQ et Fazua représentent les vélos légers au rendu naturel, Specialized a le couple médian le plus élevé avec 105 Nm.' },
        { q: 'De combien de couple ai-je besoin ?', a: 'Pour le quotidien et les excursions, 60 à 85 Nm suffisent souvent ; sur des sentiers raides, on choisit plutôt 85 Nm et plus. Dans le catalogue, la médiane est de 85 Nm pour Bosch et de 60 Nm pour TQ et Fazua.' },
        { q: 'Quels vélos ont les moteurs les plus légers ?', a: 'Les modèles TQ de Trek, Scott et BMC pèsent 14,1 kg en médiane, le plus léger (BMC Teammachine 01 AMP ONE) 9,4 kg selon le fabricant. Les moteurs Fazua sont aussi légers.' },
        { q: 'Comment payer un vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Qual è il miglior motore per e-bike?', a: 'Dipende dall’uso. Bosch offre la scelta più ampia (237 modelli su 348), TQ e Fazua rappresentano bici leggere e naturali, Specialized ha la coppia mediana più alta con 105 Nm.' },
        { q: 'Di quanta coppia ho bisogno?', a: 'Per l’uso quotidiano e le escursioni spesso bastano 60–85 Nm; su sentieri ripidi si sceglie piuttosto 85 Nm e oltre. Nel catalogo la mediana è 85 Nm per Bosch e 60 Nm per TQ e Fazua.' },
        { q: 'Quali e-bike hanno i motori più leggeri?', a: 'I modelli TQ di Trek, Scott e BMC pesano in mediana 14,1 kg, il più leggero (BMC Teammachine 01 AMP ONE) 9,4 kg secondo il produttore. Anche i motori Fazua sono leggeri.' },
        { q: 'Come si paga una e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
];
