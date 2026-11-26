import type { BlogPost } from './blog';

/**
 * Two buying guides for people who search with a purchase in mind: "E-Bike Sale / Aktion" (the budget and the crypto rebate)
 * and "E-Bike Herren" (diamond-frame models). Every figure comes from the catalogue (348 models; 94 prices are converted
 * from the manufacturer's euro price and shown as "ca.") or from the checkout (10 % crypto rebate). The shop shows no
 * struck-through "was" prices, so the sale post says so instead of inventing a campaign; no delivery-time, warranty or
 * return promise is made.
 */
const ORDER = {
  de: 'Legen Sie das gewünschte Modell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH); mit Krypto sparen Sie 10 % auf den Gesamtbetrag. Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
  fr: 'Ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH) ; en crypto, vous économisez 10 % sur le montant total. Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
  it: 'Mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta (USDT, BTC, ETH); con le crypto risparmiate il 10% sull’importo totale. Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna o ritiro.',
};
const PAY = {
  de: { q: 'Wie bezahle ich das E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag. Alternativ fordern Sie zuerst eine Gratis Offerte an.' },
  fr: { q: 'Comment payer le vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total. Vous pouvez aussi demander d’abord une offre gratuite.' },
  it: { q: 'Come si paga la e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale. In alternativa richiedete prima un’offerta gratuita.' },
};

export const SALES_POSTS_MORE: BlogPost[] = [
  {
    id: 'e-bike-sale-aktion',
    slug: { de: 'e-bike-sale-aktion', fr: 'velo-electrique-promotion', it: 'e-bike-in-offerta' },
    title: {
      de: 'E-Bike Sale und Aktion Schweiz: 10 % sparen, günstige Modelle',
      fr: 'Vélo électrique en promotion : 10 % de remise et prix bas',
      it: 'E-bike in offerta: sconto del 10% e modelli economici',
    },
    excerpt: {
      de: '348 neue E-Bikes ab Lager: 37 Modelle bis CHF 3’000, 10 % Rabatt bei Krypto-Zahlung, Preise in CHF und Gratis Offerte.',
      fr: '348 vélos électriques neufs en stock : 37 modèles jusqu’à CHF 3’000, 10 % de remise en crypto, prix en CHF et offre gratuite.',
      it: '348 e-bike nuove a magazzino: 37 modelli fino a CHF 3’000, sconto del 10% pagando in crypto, prezzi in CHF e offerta gratuita.',
    },
    publishedDate: '2026-11-26',
    readMinutes: 5,
    related: { maxPriceCHF: 4000, readNext: 'e-bike-preise-budget' },
    body: {
      de: [
        {
          heading: 'E-Bike Sale und Aktion: was bei uns wirklich gilt',
          paragraphs: [
            'Wer einen E-Bike Sale oder eine E-Bike Aktion sucht, will vor allem eines: weniger bezahlen. Bei uns gibt es keine durchgestrichenen Statt-Preise, dafür 348 neue E-Bikes aus eigenem Lager zu klaren Katalogpreisen in CHF. Wo Sie wirklich sparen, zeigen die folgenden Abschnitte: beim Zahlungsweg, beim Budget und bei der Modellwahl.',
            'Der wichtigste Hebel ist der Krypto-Rabatt: Wer mit USDT, BTC oder ETH bezahlt, erhält 10 % Rabatt auf den Gesamtbetrag, bei einem E-Bike für CHF 4’000 sind das CHF 400. Bei Banküberweisung gilt der Katalogpreis. Die Tabelle zeigt die Ersparnis bei typischen Preisen.',
          ],
          table: {
            caption: 'Ersparnis bei Krypto-Zahlung: Katalogpreis, Preis mit 10 % Rabatt und Differenz',
            head: ['Katalogpreis (CHF)', 'Preis mit Krypto (CHF)', 'Ersparnis (CHF)'],
            rows: [
              ['3’000', '2’700', '300'],
              ['4’000', '3’600', '400'],
              ['5’000', '4’500', '500'],
              ['7’500', '6’750', '750'],
              ['10’000', '9’000', '1’000'],
            ],
          },
        },
        {
          heading: 'Günstige E-Bikes nach Budget',
          paragraphs: [
            'Im Katalog liegen 37 Modelle bei höchstens CHF 3’000 und 104 Modelle bei höchstens CHF 4’000; der mittlere Preis aller 348 Modelle beträgt CHF 4’599. Die Preise sind Katalogpreise, bei 94 Modellen als umgerechnete ca.-Preise.',
            'Bis CHF 3’500 ist die Auswahl bei Trekking E-Bike und City E-Bike am breitesten, aber auch ein E-Mountainbike gibt es schon ab ca. CHF 2’390. Bei den Marken stellt Cube in jeder Budgetstufe die meisten Modelle.',
          ],
          table: {
            caption: 'E-Bikes nach Budget: Anzahl Modelle, häufigste Kategorien und Marken',
            head: ['Budget', 'Modelle', 'Häufigste Kategorien', 'Häufigste Marken'],
            rows: [
              ['bis CHF 3’000', '37', 'City 13, Trekking 11, E-MTB 6', 'Cube 19, Kalkhoff 5, Trek 5'],
              ['bis CHF 3’500', '63', 'Trekking 27, City 18, E-MTB 10', 'Cube 26, Kalkhoff 9, Scott 7, Trek 7'],
              ['bis CHF 4’000', '104', 'Trekking 45, City 25, E-MTB 21', 'Cube 35, Kalkhoff 18, Scott 16'],
              ['bis CHF 5’000', '199', 'Trekking 77, E-MTB 49, City 42', 'Cube 64, Kalkhoff 29, Scott 22'],
            ],
          },
        },
        {
          heading: 'Das günstigste E-Bike jeder Kategorie',
          paragraphs: [
            'Die Tabelle nennt pro Kategorie das Modell mit dem niedrigsten Katalogpreis. Die Cube-Preise sind aus dem Herstellerpreis in Euro umgerechnet und deshalb mit ca. gekennzeichnet. Das günstigste Modell mit festem CHF-Preis ohne ca. ist mit CHF 2’399 das Kalkhoff Image 1 Move (City) und das Kalkhoff Endeavour 1 Move (Trekking), beide mit Bosch-Antrieb und 360 Wh.',
          ],
          table: {
            caption: 'Günstigstes E-Bike pro Kategorie: Modell, Preis und Akku',
            head: ['Kategorie', 'Modelle', 'Günstigstes Modell', 'Preis (CHF)', 'Akku'],
            rows: [
              ['City E-Bike', '46', 'Cube Editor Hybrid ONE 360 FE', 'ca. 1’700', '360 Wh'],
              ['Falt E-Bike', '4', 'Cube Compact Hybrid 540', 'ca. 2’298', '540 Wh'],
              ['Trekking E-Bike', '104', 'Cube Touring Hybrid ONE 600', 'ca. 2’390', '600 Wh'],
              ['E-Mountainbike', '136', 'Giant Talon E+ (2027)', 'ca. 2’390', '430 Wh'],
              ['Gravel E-Bike', '29', 'Cube Nulane Hybrid C:62 Race 400X', 'ca. 2’757', '400 Wh'],
              ['Cargo E-Bike', '22', 'Cube Longtail Hybrid 800', 'ca. 3’493', '800 Wh'],
              ['E-Bike 45 km/h', '6', 'Cube Kathmandu Hybrid 45 800', 'ca. 4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Worauf Sie bei einem günstigen E-Bike achten',
          paragraphs: [
            'Ein niedriger Preis sagt wenig über die Qualität aus, wichtiger sind Antrieb, Akku und Einsatz. Von den 104 Modellen bis CHF 4’000 haben 89 einen Bosch-Antrieb und 52 einen Akku mit mindestens 600 Wh. Bis CHF 3’000 sind es 32 von 37 Modellen mit Bosch, aber nur 13 mit mindestens 600 Wh.',
            'Wählen Sie den Akku nach der Strecke: Wer täglich pendelt, kommt oft mit 400 bis 500 Wh aus, für Touren mit vielen Höhenmetern sind 600 Wh und mehr sinnvoll. Prüfen Sie ausserdem die Rahmengrösse; die Grössentabelle des Herstellers ist der beste Ausgangspunkt. Wenn Sie unsicher sind, schreiben Sie uns über Beratung anfragen.',
          ],
        },
        {
          heading: 'Günstiges E-Bike bestellen',
          paragraphs: [
            ORDER.de,
            'Wenn Sie ein bestimmtes Modell im Auge haben, fordern Sie eine Gratis Offerte an: Sie nennen uns Modell und Wunschgrösse, wir antworten mit einem unverbindlichen Angebot inklusive Krypto-Preis.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Vélo électrique en promotion : ce qui vaut vraiment chez nous',
          paragraphs: [
            'Qui cherche un vélo électrique en promotion veut avant tout payer moins. Chez nous, pas de prix barrés, mais 348 vélos électriques neufs en stock à des prix catalogue clairs en CHF. Les sections suivantes montrent où vous économisez vraiment : sur le moyen de paiement, sur le budget et sur le choix du modèle.',
            'Le levier principal est la remise crypto : en payant en USDT, BTC ou ETH, vous obtenez 10 % de remise sur le montant total, soit CHF 400 pour un vélo à CHF 4’000. Par virement bancaire, le prix catalogue s’applique. Le tableau montre l’économie pour des prix courants.',
          ],
          table: {
            caption: 'Économie en payant en crypto : prix catalogue, prix avec 10 % de remise et différence',
            head: ['Prix catalogue (CHF)', 'Prix en crypto (CHF)', 'Économie (CHF)'],
            rows: [
              ['3’000', '2’700', '300'],
              ['4’000', '3’600', '400'],
              ['5’000', '4’500', '500'],
              ['7’500', '6’750', '750'],
              ['10’000', '9’000', '1’000'],
            ],
          },
        },
        {
          heading: 'Vélos électriques abordables selon le budget',
          paragraphs: [
            'Le catalogue compte 37 modèles à CHF 3’000 au plus et 104 modèles à CHF 4’000 au plus ; le prix médian des 348 modèles est de CHF 4’599. Ce sont des prix catalogue, convertis et indiqués « env. » pour 94 modèles.',
            'Jusqu’à CHF 3’500, le choix est le plus large en vélo de trekking électrique et en vélo de ville électrique, mais un VTT électrique est déjà disponible dès env. CHF 2’390. Côté marques, Cube propose le plus de modèles à chaque palier de budget.',
          ],
          table: {
            caption: 'Vélos électriques selon le budget : nombre de modèles, catégories et marques les plus fréquentes',
            head: ['Budget', 'Modèles', 'Catégories les plus fréquentes', 'Marques les plus fréquentes'],
            rows: [
              ['jusqu’à CHF 3’000', '37', 'Ville 13, trekking 11, VTT 6', 'Cube 19, Kalkhoff 5, Trek 5'],
              ['jusqu’à CHF 3’500', '63', 'Trekking 27, ville 18, VTT 10', 'Cube 26, Kalkhoff 9, Scott 7, Trek 7'],
              ['jusqu’à CHF 4’000', '104', 'Trekking 45, ville 25, VTT 21', 'Cube 35, Kalkhoff 18, Scott 16'],
              ['jusqu’à CHF 5’000', '199', 'Trekking 77, VTT 49, ville 42', 'Cube 64, Kalkhoff 29, Scott 22'],
            ],
          },
        },
        {
          heading: 'Le vélo électrique le moins cher de chaque catégorie',
          paragraphs: [
            'Le tableau indique, par catégorie, le modèle au prix catalogue le plus bas. Les prix Cube sont convertis depuis le prix du fabricant en euros et marqués « env. ». Le modèle le moins cher avec un prix fixe en CHF, sans « env. », est à CHF 2’399 le Kalkhoff Image 1 Move (ville) et le Kalkhoff Endeavour 1 Move (trekking), tous deux avec moteur Bosch et 360 Wh.',
          ],
          table: {
            caption: 'Vélo électrique le moins cher par catégorie : modèle, prix et batterie',
            head: ['Catégorie', 'Modèles', 'Modèle le moins cher', 'Prix (CHF)', 'Batterie'],
            rows: [
              ['Vélo de ville électrique', '46', 'Cube Editor Hybrid ONE 360 FE', 'env. 1’700', '360 Wh'],
              ['Vélo électrique pliant', '4', 'Cube Compact Hybrid 540', 'env. 2’298', '540 Wh'],
              ['Vélo de trekking électrique', '104', 'Cube Touring Hybrid ONE 600', 'env. 2’390', '600 Wh'],
              ['VTT électrique', '136', 'Giant Talon E+ (2027)', 'env. 2’390', '430 Wh'],
              ['Vélo gravel électrique', '29', 'Cube Nulane Hybrid C:62 Race 400X', 'env. 2’757', '400 Wh'],
              ['Vélo cargo électrique', '22', 'Cube Longtail Hybrid 800', 'env. 3’493', '800 Wh'],
              ['Vélo électrique 45 km/h', '6', 'Cube Kathmandu Hybrid 45 800', 'env. 4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'À quoi faire attention avec un vélo électrique bon marché',
          paragraphs: [
            'Un prix bas dit peu de choses sur la qualité ; le moteur, la batterie et l’usage comptent davantage. Sur les 104 modèles jusqu’à CHF 4’000, 89 ont un moteur Bosch et 52 une batterie d’au moins 600 Wh. Jusqu’à CHF 3’000, 32 modèles sur 37 ont un moteur Bosch, mais seulement 13 une batterie d’au moins 600 Wh.',
            'Choisissez la batterie selon le trajet : pour un usage quotidien, 400 à 500 Wh suffisent souvent ; pour des sorties avec beaucoup de dénivelé, 600 Wh et plus ont du sens. Vérifiez aussi la taille du cadre ; le tableau du fabricant est le meilleur point de départ. En cas de doute, écrivez-nous via Demander conseil.',
          ],
        },
        {
          heading: 'Commander un vélo électrique abordable',
          paragraphs: [
            ORDER.fr,
            'Si vous avez déjà un modèle en tête, demandez une offre gratuite : vous nous indiquez le modèle et la taille souhaitée, nous répondons par une offre sans engagement, avec le prix en crypto.',
          ],
        },
      ],
      it: [
        {
          heading: 'E-bike in offerta: cosa vale davvero da noi',
          paragraphs: [
            'Chi cerca una e-bike in offerta vuole soprattutto pagare meno. Da noi non ci sono prezzi barrati, ma 348 e-bike nuove a magazzino a prezzi di catalogo chiari in CHF. Le sezioni seguenti mostrano dove si risparmia davvero: nel metodo di pagamento, nel budget e nella scelta del modello.',
            'La leva principale è lo sconto crypto: pagando in USDT, BTC o ETH si ottiene il 10% di sconto sull’importo totale, cioè CHF 400 per una e-bike da CHF 4’000. Con bonifico bancario vale il prezzo di catalogo. La tabella mostra il risparmio su prezzi tipici.',
          ],
          table: {
            caption: 'Risparmio pagando in crypto: prezzo di catalogo, prezzo con sconto del 10% e differenza',
            head: ['Prezzo di catalogo (CHF)', 'Prezzo in crypto (CHF)', 'Risparmio (CHF)'],
            rows: [
              ['3’000', '2’700', '300'],
              ['4’000', '3’600', '400'],
              ['5’000', '4’500', '500'],
              ['7’500', '6’750', '750'],
              ['10’000', '9’000', '1’000'],
            ],
          },
        },
        {
          heading: 'E-bike economiche in base al budget',
          paragraphs: [
            'Il catalogo conta 37 modelli fino a CHF 3’000 e 104 modelli fino a CHF 4’000; il prezzo mediano dei 348 modelli è di CHF 4’599. Sono prezzi di catalogo, convertiti e indicati come «ca.» per 94 modelli.',
            'Fino a CHF 3’500 la scelta è più ampia tra e-bike trekking e e-bike city, ma una mountain bike elettrica c’è già da ca. CHF 2’390. Tra le marche, Cube offre più modelli a ogni fascia di budget.',
          ],
          table: {
            caption: 'E-bike in base al budget: numero di modelli, categorie e marche più frequenti',
            head: ['Budget', 'Modelli', 'Categorie più frequenti', 'Marche più frequenti'],
            rows: [
              ['fino a CHF 3’000', '37', 'City 13, trekking 11, MTB 6', 'Cube 19, Kalkhoff 5, Trek 5'],
              ['fino a CHF 3’500', '63', 'Trekking 27, city 18, MTB 10', 'Cube 26, Kalkhoff 9, Scott 7, Trek 7'],
              ['fino a CHF 4’000', '104', 'Trekking 45, city 25, MTB 21', 'Cube 35, Kalkhoff 18, Scott 16'],
              ['fino a CHF 5’000', '199', 'Trekking 77, MTB 49, city 42', 'Cube 64, Kalkhoff 29, Scott 22'],
            ],
          },
        },
        {
          heading: 'La e-bike più economica di ogni categoria',
          paragraphs: [
            'La tabella indica, per ogni categoria, il modello con il prezzo di catalogo più basso. I prezzi Cube sono convertiti dal prezzo del produttore in euro e segnati «ca.». Il modello più economico con prezzo fisso in CHF, senza «ca.», è a CHF 2’399 la Kalkhoff Image 1 Move (city) e la Kalkhoff Endeavour 1 Move (trekking), entrambe con motore Bosch e 360 Wh.',
          ],
          table: {
            caption: 'E-bike più economica per categoria: modello, prezzo e batteria',
            head: ['Categoria', 'Modelli', 'Modello più economico', 'Prezzo (CHF)', 'Batteria'],
            rows: [
              ['Bicicletta elettrica city', '46', 'Cube Editor Hybrid ONE 360 FE', 'ca. 1’700', '360 Wh'],
              ['Bicicletta elettrica pieghevole', '4', 'Cube Compact Hybrid 540', 'ca. 2’298', '540 Wh'],
              ['Bicicletta elettrica trekking', '104', 'Cube Touring Hybrid ONE 600', 'ca. 2’390', '600 Wh'],
              ['Mountain bike elettrica', '136', 'Giant Talon E+ (2027)', 'ca. 2’390', '430 Wh'],
              ['Bicicletta elettrica gravel', '29', 'Cube Nulane Hybrid C:62 Race 400X', 'ca. 2’757', '400 Wh'],
              ['Bicicletta elettrica cargo', '22', 'Cube Longtail Hybrid 800', 'ca. 3’493', '800 Wh'],
              ['Bicicletta elettrica 45 km/h', '6', 'Cube Kathmandu Hybrid 45 800', 'ca. 4’596', '800 Wh'],
            ],
          },
        },
        {
          heading: 'Cosa controllare in una e-bike economica',
          paragraphs: [
            'Un prezzo basso dice poco sulla qualità; contano di più motore, batteria e utilizzo. Dei 104 modelli fino a CHF 4’000, 89 hanno un motore Bosch e 52 una batteria da almeno 600 Wh. Fino a CHF 3’000, 32 modelli su 37 hanno un motore Bosch, ma solo 13 una batteria da almeno 600 Wh.',
            'Scegliete la batteria in base al percorso: per il pendolarismo quotidiano bastano spesso 400–500 Wh; per escursioni con molto dislivello hanno senso 600 Wh e oltre. Controllate anche la taglia del telaio; la tabella del produttore è il miglior punto di partenza. Se avete dubbi, scriveteci tramite Richiedi consulenza.',
          ],
        },
        {
          heading: 'Ordinare una e-bike economica',
          paragraphs: [
            ORDER.it,
            'Se avete già un modello in mente, richiedete un’offerta gratuita: ci indicate modello e taglia desiderata, rispondiamo con un’offerta senza impegno, incluso il prezzo in crypto.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Gibt es bei Ihnen einen E-Bike Sale?', a: 'Es gibt keine durchgestrichenen Statt-Preise. Sparen können Sie mit dem Krypto-Rabatt von 10 % auf den Gesamtbetrag und mit dem Budget: 37 der 348 Modelle kosten höchstens CHF 3’000.' },
        { q: 'Wie viel spare ich mit dem Krypto-Rabatt?', a: '10 % auf den Gesamtbetrag der Bestellung, bei CHF 4’000 also CHF 400 und bei CHF 7’500 CHF 750. Der Rabatt gilt bei Zahlung mit USDT, BTC oder ETH.' },
        { q: 'Was kostet das günstigste neue E-Bike?', a: 'Das günstigste Modell ist das City E-Bike Cube Editor Hybrid ONE 360 FE für ca. CHF 1’700. Ohne ca.-Preis sind das Kalkhoff Image 1 Move und das Kalkhoff Endeavour 1 Move mit CHF 2’399 die günstigsten Modelle.' },
        { q: 'Sind die E-Bikes neu?', a: 'Ja, alle 348 Modelle im Katalog sind neu und stammen aus eigenem Lager.' },
        PAY.de,
      ],
      fr: [
        { q: 'Y a-t-il une promotion sur les vélos électriques chez vous ?', a: 'Il n’y a pas de prix barrés. Vous économisez avec la remise crypto de 10 % sur le montant total et grâce au budget : 37 des 348 modèles coûtent CHF 3’000 au plus.' },
        { q: 'Combien puis-je économiser avec la remise crypto ?', a: '10 % sur le montant total de la commande, soit CHF 400 pour CHF 4’000 et CHF 750 pour CHF 7’500. La remise s’applique pour un paiement en USDT, BTC ou ETH.' },
        { q: 'Quel est le prix du vélo électrique neuf le moins cher ?', a: 'Le modèle le moins cher est le vélo de ville électrique Cube Editor Hybrid ONE 360 FE, à env. CHF 1’700. Sans prix « env. », les Kalkhoff Image 1 Move et Endeavour 1 Move sont les moins chers, à CHF 2’399.' },
        { q: 'Les vélos électriques sont-ils neufs ?', a: 'Oui, les 348 modèles du catalogue sont neufs et proviennent de notre propre stock.' },
        PAY.fr,
      ],
      it: [
        { q: 'Avete un’offerta sulle e-bike?', a: 'Non ci sono prezzi barrati. Si risparmia con lo sconto crypto del 10% sull’importo totale e con il budget: 37 dei 348 modelli costano al massimo CHF 3’000.' },
        { q: 'Quanto risparmio con lo sconto crypto?', a: 'Il 10% sull’importo totale dell’ordine: CHF 400 su CHF 4’000 e CHF 750 su CHF 7’500. Lo sconto vale pagando in USDT, BTC o ETH.' },
        { q: 'Quanto costa la e-bike nuova più economica?', a: 'Il modello più economico è la e-bike city Cube Editor Hybrid ONE 360 FE a ca. CHF 1’700. Senza prezzo «ca.», le più economiche sono la Kalkhoff Image 1 Move e la Kalkhoff Endeavour 1 Move a CHF 2’399.' },
        { q: 'Le e-bike sono nuove?', a: 'Sì, tutti i 348 modelli del catalogo sono nuovi e provengono dal nostro magazzino.' },
        PAY.it,
      ],
    },
  },
  {
    id: 'e-bike-herren-kaufen',
    slug: { de: 'e-bike-herren-kaufen', fr: 'acheter-velo-electrique-homme', it: 'acquistare-e-bike-uomo' },
    title: {
      de: 'E-Bike Herren kaufen: Diamantrahmen, Grösse und Modelle',
      fr: 'Acheter un vélo électrique homme : cadre, taille, modèles',
      it: 'Acquistare una e-bike uomo: telaio, taglia e modelli',
    },
    excerpt: {
      de: '300 neue Herren E-Bikes mit Diamantrahmen von 12 Marken: Kategorien, Rahmengrösse, Antrieb und Akku im Vergleich, mit Preisen in CHF.',
      fr: '300 vélos électriques homme neufs à cadre diamant, de 12 marques : catégories, taille, moteur et batterie comparés, avec prix en CHF.',
      it: '300 e-bike uomo nuove a telaio diamante di 12 marche: categorie, taglia, motore e batteria a confronto, con prezzi in CHF.',
    },
    publishedDate: '2026-11-26',
    readMinutes: 5,
    related: { frameType: 'diamond', ctaCollectionId: 'herren', readNext: 'e-bike-marken-vergleich' },
    body: {
      de: [
        {
          heading: 'Herren E-Bikes im Katalog: 300 Modelle mit Diamantrahmen',
          paragraphs: [
            'Ein Herren E-Bike hat einen Diamantrahmen: Das Oberrohr verbindet Steuerrohr und Sattelrohr, der Rahmen ist steif und oft leichter als ein Tiefeinsteiger. Der Begriff beschreibt die Rahmenform, nicht die Person, die darauf fährt. In unserem Katalog finden Sie 300 solche Modelle von 12 Marken, alle neu und aus eigenem Lager. Die Preise reichen von ca. CHF 1’700 bis CHF 14’499, der mittlere Preis liegt bei CHF 4’999.',
            'Die Tabelle zeigt die Verteilung nach Kategorie: E-Mountainbikes bilden mit 130 Modellen den grössten Teil, gefolgt von 95 Trekking E-Bikes.',
          ],
          table: {
            caption: 'Herren E-Bikes nach Kategorie: Anzahl, Preis, mittlerer Preis und Einsatz',
            head: ['Kategorie', 'Modelle', 'Preis (CHF)', 'Mittlerer Preis (CHF)', 'Einsatz'],
            rows: [
              ['E-Mountainbike', '130', 'ca. 2’390–14’499', '6’299', 'Trails, Touren, Berg'],
              ['Trekking E-Bike', '95', 'ca. 2’390–8’399', '4’199', 'Pendeln, Touren, Reisen'],
              ['City E-Bike', '30', 'ca. 1’700–5’499', '4’399', 'Stadt, Arbeitsweg'],
              ['Gravel E-Bike', '29', 'ca. 2’757–12’999', '5’949', 'Sportliche Runden auf Asphalt und Schotter'],
              ['Cargo E-Bike', '10', 'ca. 3’999–7’569', '6’089', 'Transport, Familie'],
              ['E-Bike 45 km/h', '6', 'ca. 4’596–11’943', '8’166', 'Schneller Arbeitsweg'],
            ],
          },
        },
        {
          heading: 'Rahmengrösse: welche Höhe passt zu Ihnen?',
          paragraphs: [
            'Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge. Die Tabelle gibt Richtwerte für Diamantrahmen; Hersteller weichen um ein bis zwei Zentimeter ab, die Grössentabelle auf der Produktseite hat Vorrang. Die meisten Modelle gibt es in den Grössen S bis XL, 19 Modelle zusätzlich in XXL.',
            'Liegen Sie zwischen zwei Grössen, wählen Sie für den Alltag eher die kleinere, für sportliches Fahren die grössere. Wenn Sie unsicher sind, schreiben Sie uns über Beratung anfragen.',
          ],
          table: {
            caption: 'Richtwerte für die Rahmengrösse von Herren E-Bikes nach Körpergrösse',
            head: ['Körpergrösse', 'Grösse', 'Rahmenhöhe (cm)'],
            rows: [
              ['unter 172 cm', 'S', '46–48'],
              ['172–180 cm', 'M', '50–52'],
              ['180–187 cm', 'L', '54–56'],
              ['187–195 cm', 'XL', '58–60'],
              ['über 195 cm', 'XXL', '62 und mehr'],
            ],
          },
        },
        {
          heading: 'Antrieb, Akku und Gewicht',
          paragraphs: [
            'Bei den 300 Modellen dominiert Bosch mit 194 Antrieben, gefolgt von Specialized (40), TQ (27) und Fazua (9). 145 Modelle haben einen Akku mit mindestens 750 Wh, 70 einen Akku unter 500 Wh; das sind die leichten Systeme. Das Drehmoment erreicht bis zu 130 Nm, 138 Modelle liefern mindestens 85 Nm.',
            'Beim Gewicht lohnt der Blick ins Datenblatt, wenn Sie das Rad tragen oder aufs Auto laden: 49 Modelle gelten mit höchstens 20 kg Herstellergewicht als Leichte E-Bikes, das leichteste, das BMC Teammachine 01 AMP ONE, wiegt 9,4 kg.',
          ],
        },
        {
          heading: 'Beliebte Marken für Herren E-Bikes',
          paragraphs: [
            'Die grösste Auswahl hat Cube mit 56 Herren-Modellen, gefolgt von Scott (44), Specialized (40), Haibike (39), Kalkhoff (32) und Trek (31). Dazu kommen Cannondale (23), Riese & Müller (18), Giant (9), Stromer (5), BMC (2) und Thömus (1).',
            'Das Cube Kathmandu Hybrid 45 und die fünf Stromer-Modelle fahren bis 45 km/h; für diese schnellen Modelle gelten besondere Vorschriften (Führerausweis, Kontrollschild, Helm).',
          ],
        },
        {
          heading: 'Herren E-Bike bestellen',
          paragraphs: [
            ORDER.de,
            'Wenn Sie ein bestimmtes Modell im Auge haben, fordern Sie eine Gratis Offerte an: Sie nennen uns Modell und Körpergrösse, wir antworten mit einem unverbindlichen Angebot.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Vélos électriques homme au catalogue : 300 modèles à cadre diamant',
          paragraphs: [
            'Un vélo électrique homme a un cadre diamant : le tube supérieur relie la douille de direction au tube de selle, le cadre est rigide et souvent plus léger qu’un cadre bas. Le terme décrit la forme du cadre, pas la personne qui roule dessus. Notre catalogue compte 300 modèles de ce type de 12 marques, tous neufs et en stock. Les prix vont d’env. CHF 1’700 à CHF 14’499, le prix médian est de CHF 4’999.',
            'Le tableau montre la répartition par catégorie : les VTT électriques forment la plus grande part avec 130 modèles, suivis de 95 vélos de trekking électriques.',
          ],
          table: {
            caption: 'Vélos électriques homme par catégorie : nombre, prix, prix médian et usage',
            head: ['Catégorie', 'Modèles', 'Prix (CHF)', 'Prix médian (CHF)', 'Usage'],
            rows: [
              ['VTT électrique', '130', 'env. 2’390–14’499', '6’299', 'Sentiers, excursions, montagne'],
              ['Vélo de trekking électrique', '95', 'env. 2’390–8’399', '4’199', 'Trajets, excursions, voyages'],
              ['Vélo de ville électrique', '30', 'env. 1’700–5’499', '4’399', 'Ville, trajet domicile-travail'],
              ['Vélo gravel électrique', '29', 'env. 2’757–12’999', '5’949', 'Sorties sportives sur route et gravier'],
              ['Vélo cargo électrique', '10', 'env. 3’999–7’569', '6’089', 'Transport, famille'],
              ['Vélo électrique 45 km/h', '6', 'env. 4’596–11’943', '8’166', 'Trajet rapide au travail'],
            ],
          },
        },
        {
          heading: 'Taille du cadre : quelle hauteur vous convient ?',
          paragraphs: [
            'La taille du cadre dépend de votre taille et de votre entrejambe. Le tableau donne des valeurs indicatives pour un cadre diamant ; les fabricants s’écartent d’un à deux centimètres, le tableau de la fiche produit fait foi. La plupart des modèles existent en tailles S à XL, 19 modèles aussi en XXL.',
            'Entre deux tailles, choisissez plutôt la plus petite pour un usage quotidien, la plus grande pour une conduite sportive. En cas de doute, écrivez-nous via Demander conseil.',
          ],
          table: {
            caption: 'Valeurs indicatives de la taille de cadre d’un vélo électrique homme selon la taille du cycliste',
            head: ['Taille du cycliste', 'Taille', 'Hauteur de cadre (cm)'],
            rows: [
              ['moins de 172 cm', 'S', '46–48'],
              ['172–180 cm', 'M', '50–52'],
              ['180–187 cm', 'L', '54–56'],
              ['187–195 cm', 'XL', '58–60'],
              ['plus de 195 cm', 'XXL', '62 et plus'],
            ],
          },
        },
        {
          heading: 'Moteur, batterie et poids',
          paragraphs: [
            'Sur les 300 modèles, Bosch domine avec 194 moteurs, devant Specialized (40), TQ (27) et Fazua (9). 145 modèles ont une batterie d’au moins 750 Wh, 70 une batterie de moins de 500 Wh : ce sont les systèmes légers. Le couple atteint 130 Nm, 138 modèles délivrent au moins 85 Nm.',
            'Pour le poids, un coup d’œil à la fiche technique vaut la peine si vous portez le vélo ou le chargez en voiture : 49 modèles pèsent 20 kg au plus selon le fabricant et comptent comme vélos électriques légers ; le plus léger, le BMC Teammachine 01 AMP ONE, pèse 9,4 kg.',
          ],
        },
        {
          heading: 'Marques populaires pour les vélos électriques homme',
          paragraphs: [
            'Le plus grand choix vient de Cube avec 56 modèles, suivi de Scott (44), Specialized (40), Haibike (39), Kalkhoff (32) et Trek (31). S’y ajoutent Cannondale (23), Riese & Müller (18), Giant (9), Stromer (5), BMC (2) et Thömus (1).',
            'Le Cube Kathmandu Hybrid 45 et les cinq Stromer roulent jusqu’à 45 km/h ; ces modèles rapides sont soumis à des prescriptions particulières (permis de conduire, plaque de contrôle, casque).',
          ],
        },
        {
          heading: 'Commander un vélo électrique homme',
          paragraphs: [
            ORDER.fr,
            'Si vous avez déjà un modèle en tête, demandez une offre gratuite : vous nous indiquez le modèle et votre taille, nous répondons par une offre sans engagement.',
          ],
        },
      ],
      it: [
        {
          heading: 'E-bike uomo a catalogo: 300 modelli a telaio diamante',
          paragraphs: [
            'Una e-bike uomo ha un telaio diamante: il tubo orizzontale collega il tubo sterzo al tubo sella, il telaio è rigido e spesso più leggero di un telaio basso. Il termine descrive la forma del telaio, non la persona che ci va in sella. Il nostro catalogo conta 300 modelli di questo tipo di 12 marche, tutti nuovi e a magazzino. I prezzi vanno da ca. CHF 1’700 a CHF 14’499, il prezzo mediano è di CHF 4’999.',
            'La tabella mostra la ripartizione per categoria: le mountain bike elettriche sono la parte più ampia con 130 modelli, seguite da 95 e-bike trekking.',
          ],
          table: {
            caption: 'E-bike uomo per categoria: numero, prezzo, prezzo mediano e utilizzo',
            head: ['Categoria', 'Modelli', 'Prezzo (CHF)', 'Prezzo mediano (CHF)', 'Utilizzo'],
            rows: [
              ['Mountain bike elettrica', '130', 'ca. 2’390–14’499', '6’299', 'Sentieri, escursioni, montagna'],
              ['Bicicletta elettrica trekking', '95', 'ca. 2’390–8’399', '4’199', 'Pendolarismo, escursioni, viaggi'],
              ['Bicicletta elettrica city', '30', 'ca. 1’700–5’499', '4’399', 'Città, tragitto casa-lavoro'],
              ['Bicicletta elettrica gravel', '29', 'ca. 2’757–12’999', '5’949', 'Uscite sportive su asfalto e sterrato'],
              ['Bicicletta elettrica cargo', '10', 'ca. 3’999–7’569', '6’089', 'Trasporto, famiglia'],
              ['Bicicletta elettrica 45 km/h', '6', 'ca. 4’596–11’943', '8’166', 'Tragitto veloce al lavoro'],
            ],
          },
        },
        {
          heading: 'Taglia del telaio: quale altezza fa per voi?',
          paragraphs: [
            'La taglia del telaio dipende dall’altezza e dalla lunghezza della gamba. La tabella dà valori indicativi per un telaio diamante; i produttori si discostano di uno o due centimetri, fa fede la tabella delle taglie nella scheda prodotto. La maggior parte dei modelli esiste nelle taglie da S a XL, 19 modelli anche in XXL.',
            'Se siete tra due taglie, scegliete per l’uso quotidiano la più piccola, per una guida sportiva la più grande. Se avete dubbi, scriveteci tramite Richiedi consulenza.',
          ],
          table: {
            caption: 'Valori indicativi della taglia del telaio di una e-bike uomo in base all’altezza',
            head: ['Altezza', 'Taglia', 'Altezza telaio (cm)'],
            rows: [
              ['sotto 172 cm', 'S', '46–48'],
              ['172–180 cm', 'M', '50–52'],
              ['180–187 cm', 'L', '54–56'],
              ['187–195 cm', 'XL', '58–60'],
              ['oltre 195 cm', 'XXL', '62 e oltre'],
            ],
          },
        },
        {
          heading: 'Motore, batteria e peso',
          paragraphs: [
            'Tra i 300 modelli domina Bosch con 194 motori, seguito da Specialized (40), TQ (27) e Fazua (9). 145 modelli hanno una batteria da almeno 750 Wh, 70 una batteria sotto i 500 Wh: sono i sistemi leggeri. La coppia arriva a 130 Nm, 138 modelli offrono almeno 85 Nm.',
            'Per il peso vale la pena guardare la scheda tecnica se portate la bici a mano o la caricate in auto: 49 modelli pesano al massimo 20 kg secondo il produttore e contano come e-bike leggere; la più leggera, la BMC Teammachine 01 AMP ONE, pesa 9,4 kg.',
          ],
        },
        {
          heading: 'Marche popolari per le e-bike uomo',
          paragraphs: [
            'La scelta più ampia è di Cube con 56 modelli, seguita da Scott (44), Specialized (40), Haibike (39), Kalkhoff (32) e Trek (31). Si aggiungono Cannondale (23), Riese & Müller (18), Giant (9), Stromer (5), BMC (2) e Thömus (1).',
            'La Cube Kathmandu Hybrid 45 e i cinque modelli Stromer arrivano a 45 km/h; per questi modelli veloci valgono disposizioni particolari (patente, targa, casco).',
          ],
        },
        {
          heading: 'Ordinare una e-bike uomo',
          paragraphs: [
            ORDER.it,
            'Se avete già un modello in mente, richiedete un’offerta gratuita: ci indicate modello e altezza, rispondiamo con un’offerta senza impegno.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Was ist ein Herren E-Bike?', a: 'Ein E-Bike mit Diamantrahmen und durchgehendem Oberrohr. Die Bezeichnung beschreibt die Rahmenform; sie ist in der Regel steifer und leichter als ein Tiefeinsteiger.' },
        { q: 'Wie viele Herren E-Bikes gibt es im Katalog?', a: '300 neue Modelle von 12 Marken, von ca. CHF 1’700 bis CHF 14’499. 78 davon kosten höchstens CHF 4’000.' },
        { q: 'Welche Rahmengrösse brauche ich?', a: 'Als Richtwert S bis 172 cm, M bis 180 cm, L bis 187 cm, XL bis 195 cm und XXL darüber. Die Grössentabelle des Herstellers hat Vorrang; bei Unsicherheit beraten wir Sie.' },
        { q: 'Gibt es Herren E-Bikes mit 45 km/h?', a: 'Ja, 6 Modelle: das Cube Kathmandu Hybrid 45 und fünf Stromer (ST1, ST2, ST3, ST5, ST7). Für sie gelten besondere Vorschriften: Führerausweis, Kontrollschild und Helm.' },
        PAY.de,
      ],
      fr: [
        { q: 'Qu’est-ce qu’un vélo électrique homme ?', a: 'Un vélo électrique à cadre diamant et tube supérieur continu. Le terme décrit la forme du cadre ; elle est en général plus rigide et plus légère qu’un cadre bas.' },
        { q: 'Combien de vélos électriques homme y a-t-il au catalogue ?', a: '300 modèles neufs de 12 marques, d’env. CHF 1’700 à CHF 14’499. 78 d’entre eux coûtent CHF 4’000 au plus.' },
        { q: 'Quelle taille de cadre me faut-il ?', a: 'À titre indicatif S jusqu’à 172 cm, M jusqu’à 180 cm, L jusqu’à 187 cm, XL jusqu’à 195 cm et XXL au-delà. Le tableau du fabricant fait foi ; en cas de doute, nous vous conseillons.' },
        { q: 'Existe-t-il des vélos électriques homme à 45 km/h ?', a: 'Oui, 6 modèles : le Cube Kathmandu Hybrid 45 et cinq Stromer (ST1, ST2, ST3, ST5, ST7). Des prescriptions particulières s’appliquent : permis de conduire, plaque de contrôle et casque.' },
        PAY.fr,
      ],
      it: [
        { q: 'Cos’è una e-bike uomo?', a: 'Una e-bike a telaio diamante con tubo orizzontale continuo. Il termine descrive la forma del telaio; di solito è più rigido e leggero di un telaio basso.' },
        { q: 'Quante e-bike uomo ci sono a catalogo?', a: '300 modelli nuovi di 12 marche, da ca. CHF 1’700 a CHF 14’499. 78 costano al massimo CHF 4’000.' },
        { q: 'Che taglia di telaio mi serve?', a: 'Come riferimento S fino a 172 cm, M fino a 180 cm, L fino a 187 cm, XL fino a 195 cm e XXL oltre. Fa fede la tabella del produttore; in caso di dubbio vi consigliamo noi.' },
        { q: 'Esistono e-bike uomo da 45 km/h?', a: 'Sì, 6 modelli: la Cube Kathmandu Hybrid 45 e cinque Stromer (ST1, ST2, ST3, ST5, ST7). Valgono disposizioni particolari: patente, targa e casco.' },
        PAY.it,
      ],
    },
  },
];
