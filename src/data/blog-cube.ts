import type { BlogPost } from './blog';
import { ORDER, PAY } from './blog-sales-more';

/**
 * Two Cube buying guides: Cube models with a low step-through frame ("Cube Damen") and Cube E-Mountainbikes.
 * Every figure comes from the catalogue (weights, battery sizes and fork travel are manufacturer data). All Cube prices
 * are converted from the manufacturer's euro price and therefore shown as "ca."; no delivery-time, warranty or return
 * promise is made.
 */
export const CUBE_POSTS: BlogPost[] = [
  {
    id: 'cube-e-bike-damen-kaufen',
    slug: { de: 'cube-e-bike-damen-kaufen', fr: 'acheter-velo-electrique-cube-dame', it: 'acquistare-e-bike-cube-donna' },
    title: {
      de: 'Cube E-Bike Damen kaufen: Tiefeinsteiger, Modelle, Preise',
      fr: 'Acheter un vélo électrique Cube dame : cadre bas et modèles',
      it: 'Acquistare una e-bike Cube donna: telaio basso e modelli',
    },
    excerpt: {
      de: '23 neue Cube Damen E-Bikes mit tiefem Einstieg: City, Falt, E-Mountainbike und Cargo im Vergleich, mit Preisen in CHF und Gratis Offerte.',
      fr: '23 vélos électriques Cube dame neufs à cadre bas : ville, pliant, VTT et cargo comparés, avec prix en CHF et offre gratuite.',
      it: '23 e-bike Cube donna nuove a telaio basso: city, pieghevole, mountain bike e cargo a confronto, con prezzi in CHF e offerta gratuita.',
    },
    publishedDate: '2026-11-28',
    readMinutes: 5,
    related: {
      brandId: 'cube',
      frameType: 'step-through',
      ctaCollectionId: 'damen',
      readNext: 'damen-e-bike-kaufen',
      imageSlugs: ['cube-supreme-hybrid-comfort-pro-600', 'cube-stereo-hybrid-one44-slx-800-fe', 'cube-longtail-hybrid-deluxe-family-800'],
    },
    body: {
      de: [
        {
          heading: 'Cube Damen E-Bikes im Katalog: 23 Modelle mit tiefem Einstieg',
          paragraphs: [
            'Ein Cube Damen E-Bike hat einen tiefen Durchstieg statt eines Oberrohrs: Sie steigen ohne Schwung über das Hinterrad auf und ab, etwa mit Einkauf, Kindersitz oder in der Stadt. Der Begriff beschreibt die Rahmenform; die Modelle passen für alle, die einen tiefen Einstieg wollen. In unserem Katalog finden Sie 23 solche Cube-Modelle, alle neu und aus eigenem Lager, alle mit Bosch-Antrieb und Aluminiumrahmen.',
            'Die Preise reichen von ca. CHF 2’298 bis CHF 4’596, der mittlere Preis liegt bei ca. CHF 3’493. 19 der 23 Modelle haben einen Akku mit mindestens 600 Wh. Die Tabelle zeigt die vier Kategorien: City, Falt, E-Mountainbike und Cargo.',
          ],
          table: {
            caption: 'Cube Damen E-Bikes nach Kategorie: Anzahl, Preis, Akku und Gewicht',
            head: ['Kategorie', 'Modelle', 'Preis (CHF)', 'Akku', 'Gewicht (kg)'],
            rows: [
              ['City E-Bike', '7', 'ca. 2’390–3’953', '600 Wh', '27,9–30,1'],
              ['Falt E-Bike', '4', 'ca. 2’298–2’941', '540 Wh', '23,2–25,5'],
              ['E-Mountainbike', '5', 'ca. 3’125–4’504', '800 Wh', '26,3–29,2'],
              ['Cargo E-Bike', '7', 'ca. 3’493–4’596', '800 Wh', '47–49 (ohne Longtail)'],
            ],
          },
        },
        {
          heading: 'Die Modellfamilien: Supreme, Aruba, Compact, Fold, Reaction, Stereo und Cargo',
          paragraphs: [
            'Für Alltag und Arbeitsweg sind Supreme (6 Modelle) und Aruba die Stadtfamilien mit 600 Wh. Das Aruba Hybrid 600 ist mit 27,9 kg und ca. CHF 2’481 das leichteste City-Modell, das Supreme Hybrid Comfort ONE 600 mit ca. CHF 2’390 das günstigste.',
            'Wer wenig Platz hat, findet in Compact und Fold vier Falt-Modelle mit 20-Zoll-Rädern, 540 Wh und 23,2 bis 25,5 kg; das Compact Hybrid 540 ist mit ca. CHF 2’298 das günstigste Cube Damen E-Bike überhaupt. Fürs Gelände gibt es fünf Tiefeinsteiger mit dem Zusatz FE im Namen: drei Reaction (Hardtail, ca. CHF 3’125 bis CHF 4’044) und zwei Stereo (Fully, ca. CHF 4’044 und CHF 4’504), alle mit 800 Wh.',
          ],
          table: {
            caption: 'Cube Damen E-Bikes nach Modellfamilie: Bauart, Anzahl, Preis und Akku',
            head: ['Familie', 'Bauart', 'Modelle', 'Preis (CHF)', 'Akku'],
            rows: [
              ['Supreme', 'City', '6', 'ca. 2’390–3’953', '600 Wh'],
              ['Aruba', 'City', '1', 'ca. 2’481', '600 Wh'],
              ['Compact', 'Faltrad', '2', 'ca. 2’298–2’573', '540 Wh'],
              ['Fold', 'Faltrad', '2', 'ca. 2’665–2’941', '540 Wh'],
              ['Reaction FE', 'E-Hardtail', '3', 'ca. 3’125–4’044', '800 Wh'],
              ['Stereo FE', 'E-Fully', '2', 'ca. 4’044–4’504', '800 Wh'],
              ['Longtail', 'Cargo', '3', 'ca. 3’493–4’412', '800 Wh'],
              ['Cargo', 'Cargo', '4', 'ca. 4’044–4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Rahmengrösse, Drehmoment und Gewicht',
          paragraphs: [
            'Bei der Grösse unterscheiden sich die Familien: 11 Modelle gibt es nur in einer Einheitsgrösse (darunter alle vier Faltmodelle mit 20 Zoll), 7 in Rahmenhöhen von 42 bis 58 cm und 5 in den Grössen S bis XL, teils bis XXL. Die Grössentabelle des Herstellers ist der beste Ausgangspunkt; wenn Sie zwischen zwei Grössen liegen, schreiben Sie uns über Beratung anfragen.',
            'Das Drehmoment liegt bei 8 Modellen bei 75 Nm, bei 7 zwischen 90 und 100 Nm und bei 8 bei 120 Nm. Die Cargo-Modelle wiegen 47 bis 49 kg, für die drei Longtail-Modelle liegt kein Herstellergewicht vor.',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Cube Damen E-Bike',
          paragraphs: [
            'Wählen Sie zuerst den Einsatz: Pendeln und Einkaufen sprechen für Supreme oder Aruba, wenig Stauraum für Compact oder Fold, Kinder und Transporte für Longtail oder Cargo, Waldwege und Trails für Reaction FE oder Stereo FE. Beim Akku genügen 540 bis 600 Wh für den Alltag, für Touren mit vielen Höhenmetern sind die 800-Wh-Modelle sinnvoll.',
          ],
        },
        {
          heading: 'Cube Damen E-Bike bestellen',
          paragraphs: [
            ORDER.de,
            'Wenn Sie ein bestimmtes Modell im Auge haben, fordern Sie eine Gratis Offerte an: Sie nennen uns Modell und Körpergrösse, wir antworten mit einem unverbindlichen Angebot inklusive Krypto-Preis.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Vélos électriques Cube dame au catalogue : 23 modèles à cadre bas',
          paragraphs: [
            'Un vélo électrique Cube dame a un passage bas au lieu d’un tube supérieur : vous montez et descendez sans lever la jambe par-dessus la roue arrière, par exemple avec des courses, un siège enfant ou en ville. Le terme décrit la forme du cadre ; ces modèles conviennent à toute personne qui souhaite un passage bas. Notre catalogue compte 23 modèles Cube de ce type, tous neufs et en stock, tous avec moteur Bosch et cadre aluminium.',
            'Les prix vont d’env. CHF 2’298 à CHF 4’596, le prix médian est d’env. CHF 3’493. 19 des 23 modèles ont une batterie d’au moins 600 Wh. Le tableau montre les quatre catégories : ville, pliant, VTT et cargo.',
          ],
          table: {
            caption: 'Vélos électriques Cube dame par catégorie : nombre, prix, batterie et poids',
            head: ['Catégorie', 'Modèles', 'Prix (CHF)', 'Batterie', 'Poids (kg)'],
            rows: [
              ['Vélo de ville électrique', '7', 'env. 2’390–3’953', '600 Wh', '27,9–30,1'],
              ['Vélo électrique pliant', '4', 'env. 2’298–2’941', '540 Wh', '23,2–25,5'],
              ['VTT électrique', '5', 'env. 3’125–4’504', '800 Wh', '26,3–29,2'],
              ['Vélo cargo électrique', '7', 'env. 3’493–4’596', '800 Wh', '47–49 (hors Longtail)'],
            ],
          },
        },
        {
          heading: 'Les gammes : Supreme, Aruba, Compact, Fold, Reaction, Stereo et Cargo',
          paragraphs: [
            'Pour le quotidien et le trajet domicile-travail, Supreme (6 modèles) et Aruba sont les gammes de ville avec 600 Wh. L’Aruba Hybrid 600 est le modèle de ville le plus léger (27,9 kg, env. CHF 2’481), le Supreme Hybrid Comfort ONE 600 le moins cher (env. CHF 2’390).',
            'Pour peu de place, Compact et Fold offrent quatre modèles pliants avec roues de 20 pouces, 540 Wh et 23,2 à 25,5 kg ; le Compact Hybrid 540, à env. CHF 2’298, est le vélo électrique Cube dame le moins cher. Pour le terrain, cinq modèles à cadre bas portent le suffixe FE : trois Reaction (semi-rigide, env. CHF 3’125 à CHF 4’044) et deux Stereo (tout-suspendu, env. CHF 4’044 et CHF 4’504), tous avec 800 Wh.',
          ],
          table: {
            caption: 'Vélos électriques Cube dame par gamme : type, nombre, prix et batterie',
            head: ['Gamme', 'Type', 'Modèles', 'Prix (CHF)', 'Batterie'],
            rows: [
              ['Supreme', 'Ville', '6', 'env. 2’390–3’953', '600 Wh'],
              ['Aruba', 'Ville', '1', 'env. 2’481', '600 Wh'],
              ['Compact', 'Pliant', '2', 'env. 2’298–2’573', '540 Wh'],
              ['Fold', 'Pliant', '2', 'env. 2’665–2’941', '540 Wh'],
              ['Reaction FE', 'Semi-rigide', '3', 'env. 3’125–4’044', '800 Wh'],
              ['Stereo FE', 'Tout-suspendu', '2', 'env. 4’044–4’504', '800 Wh'],
              ['Longtail', 'Cargo', '3', 'env. 3’493–4’412', '800 Wh'],
              ['Cargo', 'Cargo', '4', 'env. 4’044–4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Taille du cadre, couple et poids',
          paragraphs: [
            'Les tailles varient selon la gamme : 11 modèles n’existent qu’en taille unique (dont les quatre modèles pliants à 20 pouces), 7 en hauteurs de cadre de 42 à 58 cm et 5 en tailles S à XL, parfois jusqu’à XXL. Le tableau du fabricant est le meilleur point de départ ; si vous hésitez entre deux tailles, écrivez-nous via Demander conseil.',
            'Le couple est de 75 Nm sur 8 modèles, de 90 à 100 Nm sur 7 et de 120 Nm sur 8. Les modèles Cargo pèsent 47 à 49 kg ; pour les trois Longtail, le fabricant n’indique pas de poids.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Cube dame',
          paragraphs: [
            'Choisissez d’abord l’usage : trajets et courses pour Supreme ou Aruba, peu de place de rangement pour Compact ou Fold, enfants et transports pour Longtail ou Cargo, chemins et sentiers pour Reaction FE ou Stereo FE. Côté batterie, 540 à 600 Wh suffisent au quotidien ; pour des sorties avec beaucoup de dénivelé, les modèles de 800 Wh ont du sens.',
          ],
        },
        {
          heading: 'Commander un vélo électrique Cube dame',
          paragraphs: [
            ORDER.fr,
            'Si vous avez déjà un modèle en tête, demandez une offre gratuite : vous nous indiquez le modèle et votre taille, nous répondons par une offre sans engagement, avec le prix en crypto.',
          ],
        },
      ],
      it: [
        {
          heading: 'E-bike Cube donna a catalogo: 23 modelli a telaio basso',
          paragraphs: [
            'Una e-bike Cube donna ha un passaggio basso invece del tubo orizzontale: si sale e si scende senza alzare la gamba sopra la ruota posteriore, ad esempio con la spesa, il seggiolino per bambini o in città. Il termine descrive la forma del telaio; questi modelli vanno bene per chiunque voglia un passaggio basso. Il nostro catalogo conta 23 modelli Cube di questo tipo, tutti nuovi e a magazzino, tutti con motore Bosch e telaio in alluminio.',
            'I prezzi vanno da ca. CHF 2’298 a CHF 4’596, il prezzo mediano è di ca. CHF 3’493. 19 dei 23 modelli hanno una batteria da almeno 600 Wh. La tabella mostra le quattro categorie: city, pieghevole, mountain bike e cargo.',
          ],
          table: {
            caption: 'E-bike Cube donna per categoria: numero, prezzo, batteria e peso',
            head: ['Categoria', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Peso (kg)'],
            rows: [
              ['Bicicletta elettrica city', '7', 'ca. 2’390–3’953', '600 Wh', '27,9–30,1'],
              ['Bicicletta elettrica pieghevole', '4', 'ca. 2’298–2’941', '540 Wh', '23,2–25,5'],
              ['Mountain bike elettrica', '5', 'ca. 3’125–4’504', '800 Wh', '26,3–29,2'],
              ['Bicicletta elettrica cargo', '7', 'ca. 3’493–4’596', '800 Wh', '47–49 (esclusa Longtail)'],
            ],
          },
        },
        {
          heading: 'Le famiglie: Supreme, Aruba, Compact, Fold, Reaction, Stereo e Cargo',
          paragraphs: [
            'Per la quotidianità e il tragitto casa-lavoro, Supreme (6 modelli) e Aruba sono le famiglie city con 600 Wh. La Aruba Hybrid 600 è il modello city più leggero (27,9 kg, ca. CHF 2’481), la Supreme Hybrid Comfort ONE 600 la più economica (ca. CHF 2’390).',
            'Per chi ha poco spazio, Compact e Fold offrono quattro modelli pieghevoli con ruote da 20 pollici, 540 Wh e 23,2–25,5 kg; la Compact Hybrid 540, a ca. CHF 2’298, è la e-bike Cube donna più economica. Per il fuoristrada ci sono cinque modelli a telaio basso con il suffisso FE: tre Reaction (hardtail, ca. CHF 3’125–4’044) e due Stereo (full, ca. CHF 4’044 e CHF 4’504), tutti con 800 Wh.',
          ],
          table: {
            caption: 'E-bike Cube donna per famiglia: tipo, numero, prezzo e batteria',
            head: ['Famiglia', 'Tipo', 'Modelli', 'Prezzo (CHF)', 'Batteria'],
            rows: [
              ['Supreme', 'City', '6', 'ca. 2’390–3’953', '600 Wh'],
              ['Aruba', 'City', '1', 'ca. 2’481', '600 Wh'],
              ['Compact', 'Pieghevole', '2', 'ca. 2’298–2’573', '540 Wh'],
              ['Fold', 'Pieghevole', '2', 'ca. 2’665–2’941', '540 Wh'],
              ['Reaction FE', 'Hardtail', '3', 'ca. 3’125–4’044', '800 Wh'],
              ['Stereo FE', 'Full', '2', 'ca. 4’044–4’504', '800 Wh'],
              ['Longtail', 'Cargo', '3', 'ca. 3’493–4’412', '800 Wh'],
              ['Cargo', 'Cargo', '4', 'ca. 4’044–4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Taglia del telaio, coppia e peso',
          paragraphs: [
            'Le taglie variano a seconda della famiglia: 11 modelli esistono solo in taglia unica (tra cui tutti e quattro i pieghevoli da 20 pollici), 7 in altezze del telaio da 42 a 58 cm e 5 nelle taglie da S a XL, in parte fino a XXL. La tabella del produttore è il miglior punto di partenza; se siete tra due taglie, scriveteci tramite Richiedi consulenza.',
            'La coppia è di 75 Nm su 8 modelli, di 90–100 Nm su 7 e di 120 Nm su 8. I modelli Cargo pesano 47–49 kg; per le tre Longtail il produttore non indica il peso.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Cube donna',
          paragraphs: [
            'Scegliete prima l’uso: tragitti e spesa per Supreme o Aruba, poco spazio per Compact o Fold, bambini e trasporti per Longtail o Cargo, sentieri e percorsi per Reaction FE o Stereo FE. Per la batteria, 540–600 Wh bastano nella quotidianità; per escursioni con molto dislivello hanno senso i modelli da 800 Wh.',
          ],
        },
        {
          heading: 'Ordinare una e-bike Cube donna',
          paragraphs: [
            ORDER.it,
            'Se avete già un modello in mente, richiedete un’offerta gratuita: ci indicate modello e altezza, rispondiamo con un’offerta senza impegno, incluso il prezzo in crypto.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Wie viele Cube Damen E-Bikes gibt es im Katalog?', a: '23 Modelle mit tiefem Einstieg, alle neu: 7 City, 4 Falt, 5 E-Mountainbikes und 7 Cargo E-Bikes, von ca. CHF 2’298 bis CHF 4’596.' },
        { q: 'Was kostet das günstigste Cube Damen E-Bike?', a: 'Das Faltmodell Compact Hybrid 540 kostet ca. CHF 2’298. Das günstigste City E-Bike ist das Supreme Hybrid Comfort ONE 600 für ca. CHF 2’390.' },
        { q: 'Gibt es Cube Damen E-Mountainbikes?', a: 'Ja, 5 Modelle mit tiefem Einstieg (Zusatz FE): drei Reaction Hardtails und zwei Stereo Fullys, ca. CHF 3’125 bis CHF 4’504, alle mit 800 Wh und Bosch-Antrieb.' },
        { q: 'Welche Rahmengrösse brauche ich?', a: 'Das hängt vom Modell ab: 11 gibt es nur in Einheitsgrösse, 7 in 42 bis 58 cm und 5 in S bis XL. Die Grössentabelle des Herstellers hat Vorrang; bei Unsicherheit beraten wir Sie.' },
        PAY.de,
      ],
      fr: [
        { q: 'Combien de vélos électriques Cube dame y a-t-il au catalogue ?', a: '23 modèles à cadre bas, tous neufs : 7 de ville, 4 pliants, 5 VTT et 7 cargo, d’env. CHF 2’298 à CHF 4’596.' },
        { q: 'Quel est le Cube dame le moins cher ?', a: 'Le modèle pliant Compact Hybrid 540 coûte env. CHF 2’298. Le vélo de ville le moins cher est le Supreme Hybrid Comfort ONE 600, à env. CHF 2’390.' },
        { q: 'Existe-t-il des VTT électriques Cube dame ?', a: 'Oui, 5 modèles à cadre bas (suffixe FE) : trois Reaction semi-rigides et deux Stereo tout-suspendus, d’env. CHF 3’125 à CHF 4’504, tous avec 800 Wh et moteur Bosch.' },
        { q: 'Quelle taille de cadre me faut-il ?', a: 'Cela dépend du modèle : 11 n’existent qu’en taille unique, 7 en 42 à 58 cm et 5 en S à XL. Le tableau du fabricant fait foi ; en cas de doute, nous vous conseillons.' },
        PAY.fr,
      ],
      it: [
        { q: 'Quante e-bike Cube donna ci sono a catalogo?', a: '23 modelli a telaio basso, tutti nuovi: 7 city, 4 pieghevoli, 5 mountain bike e 7 cargo, da ca. CHF 2’298 a CHF 4’596.' },
        { q: 'Quanto costa la e-bike Cube donna più economica?', a: 'Il modello pieghevole Compact Hybrid 540 costa ca. CHF 2’298. La e-bike city più economica è la Supreme Hybrid Comfort ONE 600 a ca. CHF 2’390.' },
        { q: 'Esistono mountain bike elettriche Cube donna?', a: 'Sì, 5 modelli a telaio basso (suffisso FE): tre Reaction hardtail e due Stereo full, da ca. CHF 3’125 a CHF 4’504, tutti con 800 Wh e motore Bosch.' },
        { q: 'Che taglia di telaio mi serve?', a: 'Dipende dal modello: 11 esistono solo in taglia unica, 7 in 42–58 cm e 5 in S–XL. Fa fede la tabella del produttore; in caso di dubbio vi consigliamo noi.' },
        PAY.it,
      ],
    },
  },
  {
    id: 'cube-e-mountainbike-kaufen',
    slug: { de: 'cube-e-mountainbike-kaufen', fr: 'acheter-vtt-electrique-cube', it: 'acquistare-mountain-bike-elettrica-cube' },
    title: {
      de: 'Cube E-Mountainbike kaufen: Reaction, Stereo, AMS im Vergleich',
      fr: 'Acheter un VTT électrique Cube : Reaction, Stereo et AMS',
      it: 'Acquistare una mountain bike elettrica Cube: Reaction, Stereo, AMS',
    },
    excerpt: {
      de: '31 neue Cube E-Mountainbikes ab Lager: Reaction Hardtail, Stereo und AMS Fully im Vergleich, mit Preisen in CHF, Akku und Gratis Offerte.',
      fr: '31 VTT électriques Cube neufs en stock : Reaction semi-rigide, Stereo et AMS tout-suspendus comparés, avec prix en CHF, batterie et offre gratuite.',
      it: '31 mountain bike elettriche Cube nuove a magazzino: Reaction hardtail, Stereo e AMS full a confronto, con prezzi in CHF, batteria e offerta gratuita.',
    },
    publishedDate: '2026-11-28',
    readMinutes: 5,
    related: {
      brandId: 'cube',
      categoryId: 'e-mountainbikes',
      readNext: 'e-bike-fully-kaufen',
      imageSlugs: ['cube-stereo-hybrid-one44-hpc-slx-evo-800', 'cube-ams-hybrid-177-c-62-at-600x', 'cube-reaction-hybrid-slt-800'],
    },
    body: {
      de: [
        {
          heading: 'Cube E-Mountainbikes bei uns: 31 Modelle in drei Familien',
          paragraphs: [
            'Cube baut seine E-Mountainbikes in drei Familien: Reaction als Hardtail, Stereo Hybrid und AMS Hybrid als Fullys. In unserem Katalog finden Sie 31 Modelle, alle neu und aus eigenem Lager: 25 Fullys und 6 Hardtails. Die Preise reichen von ca. CHF 3’125 bis CHF 9’193, der mittlere Preis liegt bei ca. CHF 4’596; 17 Modelle kosten höchstens CHF 5’000, 4 mindestens CHF 7’000.',
          ],
          table: {
            caption: 'Cube E-Mountainbikes nach Familie: Bauart, Anzahl, Preis, Akku und Antrieb',
            head: ['Familie', 'Bauart', 'Modelle', 'Preis (CHF)', 'Akku', 'Antrieb'],
            rows: [
              ['Reaction Hybrid', 'E-Hardtail, Aluminium', '6', 'ca. 3’125–4’412', '800 Wh', 'Bosch CX'],
              ['Stereo Hybrid', 'E-Fully, Carbon und Aluminium', '17', 'ca. 3’861–7’998', '800 Wh', 'Bosch CX, CX-R, Avinox M2S'],
              ['AMS Hybrid', 'E-Fully, Carbon', '8', 'ca. 3’861–9’193', '400–600 Wh', 'Bosch SX, CX, CX-R'],
            ],
          },
        },
        {
          heading: 'Reaction: das Hardtail ab ca. CHF 3’125',
          paragraphs: [
            'Das Reaction ist das günstigste Cube E-Mountainbike: Die sechs Modelle kosten ca. CHF 3’125 bis CHF 4’412, haben einen Aluminiumrahmen, den Bosch Performance Line CX mit 120 Nm, einen 800-Wh-Akku und bis zu 120 mm Federweg an der Gabel. Sie wiegen 24,4 bis 26,8 kg und sind in den Grössen S bis XXL erhältlich. Drei davon (Pro, Race und SLX mit Zusatz FE) haben einen tiefen Einstieg.',
          ],
        },
        {
          heading: 'Stereo Hybrid: der vielseitige Fully',
          paragraphs: [
            'Das Stereo ist mit 17 Modellen die grösste Familie: 13 haben einen Carbonrahmen, 4 Aluminium, alle einen 800-Wh-Akku. Die Gabeln federn laut Datenblatt zwischen 120 und 170 mm, das Gewicht liegt bei 23,4 bis 29,2 kg. Die meisten (13) fahren mit dem Bosch CX, zwei mit dem CX-R und zwei mit dem Avinox M2S, der 130 Nm liefert; das Stereo Hybrid ONE44 HPC EXC 800 mit Avinox wiegt 24,6 kg und kostet ca. CHF 4’412. Das günstigste Stereo ist das ONE22 SLX 800 für ca. CHF 3’861.',
          ],
        },
        {
          heading: 'AMS Hybrid: der leichte Carbon-Fully',
          paragraphs: [
            'Die acht AMS-Modelle haben alle einen Carbonrahmen und sind mit 16,8 bis 22,5 kg die leichtesten Cube E-Mountainbikes. Fünf haben den kompakten Bosch Performance SX (60 Nm) mit 400 Wh, drei den kräftigeren CX oder CX-R (120 Nm) mit 600 Wh. Die Gabeln federn 140 bis 170 mm. Das leichteste Modell, das AMS Hybrid ONE44 C:68X SLT 400X, wiegt 16,8 kg und kostet ca. CHF 7’354; der Einstieg ist das ONE44 C:62 Pro 400X mit 18,1 kg für ca. CHF 3’861.',
          ],
        },
        {
          heading: 'Welches Cube E-Mountainbike passt zu Ihnen?',
          paragraphs: [
            'Die Tabelle ordnet den Einsatz der passenden Familie zu. Beim Akku gilt: 800 Wh für lange Touren und viele Höhenmeter, 400 Wh für ein leichtes, natürliches Fahrgefühl. Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge; die meisten Modelle gibt es in S bis XL. Wenn Sie unsicher sind, schreiben Sie uns über Beratung anfragen.',
          ],
          table: {
            caption: 'Cube E-Mountainbike nach Einsatz: passende Familie und Kennzahlen',
            head: ['Einsatz', 'Familie', 'Kennzahlen'],
            rows: [
              ['Touren und Forstwege', 'Reaction Hybrid', 'Hardtail, ab ca. CHF 3’125, 800 Wh'],
              ['Trails und Bergabfahrten', 'Stereo Hybrid', 'Fully, Gabel bis 170 mm, 800 Wh'],
              ['Leicht und sportlich', 'AMS Hybrid', 'Carbon-Fully, ab 16,8 kg'],
              ['Tiefer Einstieg', 'Reaction FE und Stereo FE', '5 Modelle, ca. CHF 3’125–4’504'],
            ],
          },
        },
        {
          heading: 'Cube E-Mountainbike bestellen',
          paragraphs: [
            ORDER.de,
            'Wenn Sie ein bestimmtes Modell im Auge haben, fordern Sie eine Gratis Offerte an: Sie nennen uns Modell und Körpergrösse, wir antworten mit einem unverbindlichen Angebot inklusive Krypto-Preis.',
          ],
        },
      ],
      fr: [
        {
          heading: 'VTT électriques Cube chez nous : 31 modèles en trois gammes',
          paragraphs: [
            'Cube construit ses VTT électriques en trois gammes : Reaction en semi-rigide, Stereo Hybrid et AMS Hybrid en tout-suspendus. Notre catalogue compte 31 modèles, tous neufs et en stock : 25 tout-suspendus et 6 semi-rigides. Les prix vont d’env. CHF 3’125 à CHF 9’193, le prix médian est d’env. CHF 4’596 ; 17 modèles coûtent CHF 5’000 au plus, 4 au moins CHF 7’000.',
          ],
          table: {
            caption: 'VTT électriques Cube par gamme : type, nombre, prix, batterie et moteur',
            head: ['Gamme', 'Type', 'Modèles', 'Prix (CHF)', 'Batterie', 'Moteur'],
            rows: [
              ['Reaction Hybrid', 'Semi-rigide, aluminium', '6', 'env. 3’125–4’412', '800 Wh', 'Bosch CX'],
              ['Stereo Hybrid', 'Tout-suspendu, carbone et aluminium', '17', 'env. 3’861–7’998', '800 Wh', 'Bosch CX, CX-R, Avinox M2S'],
              ['AMS Hybrid', 'Tout-suspendu, carbone', '8', 'env. 3’861–9’193', '400–600 Wh', 'Bosch SX, CX, CX-R'],
            ],
          },
        },
        {
          heading: 'Reaction : le semi-rigide dès env. CHF 3’125',
          paragraphs: [
            'Le Reaction est le VTT électrique Cube le moins cher : ses six modèles coûtent env. CHF 3’125 à CHF 4’412, ont un cadre aluminium, le Bosch Performance Line CX de 120 Nm, une batterie de 800 Wh et jusqu’à 120 mm de débattement à la fourche. Ils pèsent 24,4 à 26,8 kg et existent en tailles S à XXL. Trois d’entre eux (Pro, Race et SLX avec suffixe FE) ont un cadre bas.',
          ],
        },
        {
          heading: 'Stereo Hybrid : le tout-suspendu polyvalent',
          paragraphs: [
            'Avec 17 modèles, le Stereo est la plus grande gamme : 13 ont un cadre carbone, 4 aluminium, tous une batterie de 800 Wh. Les fourches débattent de 120 à 170 mm selon la fiche technique, le poids va de 23,4 à 29,2 kg. La plupart (13) roulent avec le Bosch CX, deux avec le CX-R et deux avec l’Avinox M2S, qui délivre 130 Nm ; le Stereo Hybrid ONE44 HPC EXC 800 avec Avinox pèse 24,6 kg et coûte env. CHF 4’412. Le Stereo le moins cher est le ONE22 SLX 800, à env. CHF 3’861.',
          ],
        },
        {
          heading: 'AMS Hybrid : le tout-suspendu carbone léger',
          paragraphs: [
            'Les huit modèles AMS ont tous un cadre carbone et, de 16,8 à 22,5 kg, ce sont les VTT électriques Cube les plus légers. Cinq ont le Bosch Performance SX compact (60 Nm) avec 400 Wh, trois le CX ou CX-R plus puissant (120 Nm) avec 600 Wh. Les fourches débattent de 140 à 170 mm. Le modèle le plus léger, l’AMS Hybrid ONE44 C:68X SLT 400X, pèse 16,8 kg et coûte env. CHF 7’354 ; l’entrée de gamme est le ONE44 C:62 Pro 400X, 18,1 kg, à env. CHF 3’861.',
          ],
        },
        {
          heading: 'Quel VTT électrique Cube vous convient ?',
          paragraphs: [
            'Le tableau associe l’usage à la gamme qui convient. Pour la batterie : 800 Wh pour les longues sorties et le dénivelé, 400 Wh pour des sensations légères et naturelles. La taille du cadre dépend de votre taille et de votre entrejambe ; la plupart des modèles existent en S à XL. En cas de doute, écrivez-nous via Demander conseil.',
          ],
          table: {
            caption: 'VTT électrique Cube selon l’usage : gamme adaptée et chiffres clés',
            head: ['Usage', 'Gamme', 'Chiffres clés'],
            rows: [
              ['Excursions et chemins forestiers', 'Reaction Hybrid', 'Semi-rigide, dès env. CHF 3’125, 800 Wh'],
              ['Sentiers et descentes', 'Stereo Hybrid', 'Tout-suspendu, fourche jusqu’à 170 mm, 800 Wh'],
              ['Léger et sportif', 'AMS Hybrid', 'Tout-suspendu carbone, dès 16,8 kg'],
              ['Cadre bas', 'Reaction FE et Stereo FE', '5 modèles, env. CHF 3’125–4’504'],
            ],
          },
        },
        {
          heading: 'Commander un VTT électrique Cube',
          paragraphs: [
            ORDER.fr,
            'Si vous avez déjà un modèle en tête, demandez une offre gratuite : vous nous indiquez le modèle et votre taille, nous répondons par une offre sans engagement, avec le prix en crypto.',
          ],
        },
      ],
      it: [
        {
          heading: 'Le mountain bike elettriche Cube da noi: 31 modelli in tre famiglie',
          paragraphs: [
            'Cube costruisce le sue mountain bike elettriche in tre famiglie: Reaction come hardtail, Stereo Hybrid e AMS Hybrid come full. Il nostro catalogo conta 31 modelli, tutti nuovi e a magazzino: 25 full e 6 hardtail. I prezzi vanno da ca. CHF 3’125 a CHF 9’193, il prezzo mediano è di ca. CHF 4’596; 17 modelli costano al massimo CHF 5’000, 4 almeno CHF 7’000.',
          ],
          table: {
            caption: 'Mountain bike elettriche Cube per famiglia: tipo, numero, prezzo, batteria e motore',
            head: ['Famiglia', 'Tipo', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Motore'],
            rows: [
              ['Reaction Hybrid', 'Hardtail, alluminio', '6', 'ca. 3’125–4’412', '800 Wh', 'Bosch CX'],
              ['Stereo Hybrid', 'Full, carbonio e alluminio', '17', 'ca. 3’861–7’998', '800 Wh', 'Bosch CX, CX-R, Avinox M2S'],
              ['AMS Hybrid', 'Full, carbonio', '8', 'ca. 3’861–9’193', '400–600 Wh', 'Bosch SX, CX, CX-R'],
            ],
          },
        },
        {
          heading: 'Reaction: la hardtail da ca. CHF 3’125',
          paragraphs: [
            'La Reaction è la mountain bike elettrica Cube più economica: i sei modelli costano ca. CHF 3’125–4’412, hanno telaio in alluminio, il Bosch Performance Line CX da 120 Nm, una batteria da 800 Wh e fino a 120 mm di escursione alla forcella. Pesano 24,4–26,8 kg e esistono nelle taglie da S a XXL. Tre di questi (Pro, Race e SLX con suffisso FE) hanno il telaio basso.',
          ],
        },
        {
          heading: 'Stereo Hybrid: la full versatile',
          paragraphs: [
            'Con 17 modelli la Stereo è la famiglia più ampia: 13 hanno il telaio in carbonio, 4 in alluminio, tutti una batteria da 800 Wh. Le forcelle hanno un’escursione tra 120 e 170 mm secondo la scheda tecnica, il peso va da 23,4 a 29,2 kg. La maggior parte (13) monta il Bosch CX, due il CX-R e due l’Avinox M2S, che eroga 130 Nm; la Stereo Hybrid ONE44 HPC EXC 800 con Avinox pesa 24,6 kg e costa ca. CHF 4’412. La Stereo più economica è la ONE22 SLX 800 a ca. CHF 3’861.',
          ],
        },
        {
          heading: 'AMS Hybrid: la full leggera in carbonio',
          paragraphs: [
            'Gli otto modelli AMS hanno tutti il telaio in carbonio e, con 16,8–22,5 kg, sono le mountain bike elettriche Cube più leggere. Cinque hanno il compatto Bosch Performance SX (60 Nm) con 400 Wh, tre il più potente CX o CX-R (120 Nm) con 600 Wh. Le forcelle hanno 140–170 mm di escursione. Il modello più leggero, la AMS Hybrid ONE44 C:68X SLT 400X, pesa 16,8 kg e costa ca. CHF 7’354; l’ingresso è la ONE44 C:62 Pro 400X, 18,1 kg, a ca. CHF 3’861.',
          ],
        },
        {
          heading: 'Quale mountain bike elettrica Cube fa per voi?',
          paragraphs: [
            'La tabella abbina l’uso alla famiglia adatta. Per la batteria: 800 Wh per le escursioni lunghe e molto dislivello, 400 Wh per una guida leggera e naturale. La taglia del telaio dipende da altezza e lunghezza della gamba; la maggior parte dei modelli esiste da S a XL. Se avete dubbi, scriveteci tramite Richiedi consulenza.',
          ],
          table: {
            caption: 'Mountain bike elettrica Cube in base all’uso: famiglia adatta e dati chiave',
            head: ['Uso', 'Famiglia', 'Dati chiave'],
            rows: [
              ['Escursioni e strade forestali', 'Reaction Hybrid', 'Hardtail, da ca. CHF 3’125, 800 Wh'],
              ['Sentieri e discese', 'Stereo Hybrid', 'Full, forcella fino a 170 mm, 800 Wh'],
              ['Leggera e sportiva', 'AMS Hybrid', 'Full in carbonio, da 16,8 kg'],
              ['Telaio basso', 'Reaction FE e Stereo FE', '5 modelli, ca. CHF 3’125–4’504'],
            ],
          },
        },
        {
          heading: 'Ordinare una mountain bike elettrica Cube',
          paragraphs: [
            ORDER.it,
            'Se avete già un modello in mente, richiedete un’offerta gratuita: ci indicate modello e altezza, rispondiamo con un’offerta senza impegno, incluso il prezzo in crypto.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Wie viele Cube E-Mountainbikes gibt es im Katalog?', a: '31 Modelle, alle neu: 6 Reaction Hardtails sowie 17 Stereo und 8 AMS Fullys, von ca. CHF 3’125 bis CHF 9’193.' },
        { q: 'Was kostet das günstigste Cube E-Mountainbike?', a: 'Das Reaction Hybrid Pro 800 FE (Hardtail) kostet ca. CHF 3’125. Das günstigste Fully kostet ca. CHF 3’861: das Stereo Hybrid ONE22 SLX 800 und das AMS Hybrid ONE44 C:62 Pro 400X.' },
        { q: 'Welches Cube E-Mountainbike ist am leichtesten?', a: 'Das AMS Hybrid ONE44 C:68X SLT 400X wiegt laut Hersteller 16,8 kg und kostet ca. CHF 7’354. Alle acht AMS-Modelle wiegen 16,8 bis 22,5 kg.' },
        { q: 'Gibt es Cube E-Mountainbikes mit tiefem Einstieg?', a: 'Ja, 5 Modelle mit dem Zusatz FE: drei Reaction Hardtails und zwei Stereo Fullys, ca. CHF 3’125 bis CHF 4’504, alle mit 800 Wh.' },
        PAY.de,
      ],
      fr: [
        { q: 'Combien de VTT électriques Cube y a-t-il au catalogue ?', a: '31 modèles neufs : 6 Reaction semi-rigides ainsi que 17 Stereo et 8 AMS tout-suspendus, d’env. CHF 3’125 à CHF 9’193.' },
        { q: 'Quel est le VTT électrique Cube le moins cher ?', a: 'Le Reaction Hybrid Pro 800 FE (semi-rigide) coûte env. CHF 3’125. Les tout-suspendus les moins chers coûtent env. CHF 3’861 : le Stereo Hybrid ONE22 SLX 800 et l’AMS Hybrid ONE44 C:62 Pro 400X.' },
        { q: 'Quel VTT électrique Cube est le plus léger ?', a: 'L’AMS Hybrid ONE44 C:68X SLT 400X pèse 16,8 kg selon le fabricant et coûte env. CHF 7’354. Les huit modèles AMS pèsent de 16,8 à 22,5 kg.' },
        { q: 'Existe-t-il des VTT électriques Cube à cadre bas ?', a: 'Oui, 5 modèles avec le suffixe FE : trois Reaction semi-rigides et deux Stereo tout-suspendus, d’env. CHF 3’125 à CHF 4’504, tous avec 800 Wh.' },
        PAY.fr,
      ],
      it: [
        { q: 'Quante mountain bike elettriche Cube ci sono a catalogo?', a: '31 modelli nuovi: 6 Reaction hardtail e 17 Stereo e 8 AMS full, da ca. CHF 3’125 a CHF 9’193.' },
        { q: 'Quanto costa la mountain bike elettrica Cube più economica?', a: 'La Reaction Hybrid Pro 800 FE (hardtail) costa ca. CHF 3’125. Le full più economiche costano ca. CHF 3’861: la Stereo Hybrid ONE22 SLX 800 e la AMS Hybrid ONE44 C:62 Pro 400X.' },
        { q: 'Qual è la mountain bike elettrica Cube più leggera?', a: 'La AMS Hybrid ONE44 C:68X SLT 400X pesa 16,8 kg secondo il produttore e costa ca. CHF 7’354. Gli otto modelli AMS pesano da 16,8 a 22,5 kg.' },
        { q: 'Esistono mountain bike elettriche Cube a telaio basso?', a: 'Sì, 5 modelli con il suffisso FE: tre Reaction hardtail e due Stereo full, da ca. CHF 3’125 a CHF 4’504, tutti con 800 Wh.' },
        PAY.it,
      ],
    },
  },
];
