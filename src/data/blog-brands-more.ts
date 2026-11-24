import type { BlogPost } from './blog';

/**
 * Brand buying guides, part two: Haibike, Riese & Müller and Stromer.
 * Figures come from the catalogue (weights and battery sizes are manufacturer data; the Stromer CHF prices are
 * converted from the manufacturer's euro prices and shown as "ca."); no delivery-time, warranty or return promise
 * is made because the shop has not published any.
 */
const ORDER = {
  de: 'Legen Sie das gewünschte Modell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH); mit Krypto sparen Sie 10 % auf den Gesamtbetrag. Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
  fr: 'Ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH) ; en crypto, vous économisez 10 % sur le montant total. Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
  it: 'Mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta (USDT, BTC, ETH); con le crypto risparmiate il 10% sull’importo totale. Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna.',
};
const PAY = {
  de: { q: 'Wie bezahle ich das E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag. Alternativ fordern Sie zuerst eine Gratis Offerte an.' },
  fr: { q: 'Comment payer le vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total. Vous pouvez aussi demander d’abord une offre gratuite.' },
  it: { q: 'Come si paga la e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale. In alternativa richiedete prima un’offerta gratuita.' },
};

export const BRAND_POSTS_MORE: BlogPost[] = [
  {
    id: 'haibike-e-bike-kaufen',
    slug: { de: 'haibike-e-bike-kaufen', fr: 'acheter-velo-electrique-haibike', it: 'acquistare-e-bike-haibike' },
    title: {
      de: 'Haibike E-Bike kaufen: ALLTRAIL, ALLMTN, TREKKING im Überblick',
      fr: 'Acheter un vélo électrique Haibike : ALLTRAIL, ALLMTN, TREKKING',
      it: 'Acquistare una e-bike Haibike: ALLTRAIL, ALLMTN, TREKKING',
    },
    excerpt: {
      de: '39 neue Haibike E-Bikes ab Lager: ALLTRAIL, ALLMTN, ALLTRACK und TREKKING im Vergleich, mit Preisen in CHF, Antrieb und Gratis Offerte.',
      fr: '39 vélos électriques Haibike neufs en stock : ALLTRAIL, ALLMTN, ALLTRACK et TREKKING comparés, avec prix en CHF, moteur et offre gratuite.',
      it: '39 e-bike Haibike nuove a magazzino: ALLTRAIL, ALLMTN, ALLTRACK e TREKKING a confronto, con prezzi in CHF, motore e offerta gratuita.',
    },
    publishedDate: '2026-11-24',
    readMinutes: 5,
    related: { brandId: 'haibike' },
    body: {
      de: [
        {
          heading: 'Haibike E-Bikes bei uns: 39 Modelle, alle neu',
          paragraphs: [
            'In unserem Katalog finden Sie 39 Haibike E-Bikes, alle neu und aus eigenem Lager: 26 E-Mountainbikes (21 Fullys und 5 Hardtails) sowie 13 Trekking E-Bikes. Die Preise reichen von CHF 2’999 bis CHF 13’000, der mittlere Preis liegt bei CHF 4’999. Alle Modelle unterstützen bis 25 km/h.',
            'Beim Antrieb setzt Haibike vor allem auf Bosch: 28 der 39 Modelle haben einen Bosch-Motor, dazu kommen 6 mit Yamaha, 3 mit Fazua und 2 mit Pinion-Getriebemotor. 23 Modelle haben einen 800-Wh-Akku, 29 Rahmen bestehen aus Aluminium und 9 aus Carbon. Die Tabelle ordnet die Modelllinien ein; Akkus sind Herstellerangaben.',
          ],
          table: {
            caption: 'Haibike E-Bikes nach Modelllinie: Bauart, Anzahl, Preis, Akku und Antrieb',
            head: ['Modelllinie', 'Bauart', 'Modelle', 'Preis (CHF)', 'Akku', 'Antrieb'],
            rows: [
              ['ALLTRAIL', 'E-Fully', '8', '3’999–6’299', '600–800 Wh', 'Bosch CX, Yamaha'],
              ['ALLMTN', 'E-Fully', '7', '4’499–10’000', '800 Wh', 'Bosch CX, Pinion'],
              ['HYBE', 'E-Fully, Carbon', '2', '7’499–11’000', '800 Wh', 'Bosch CX, CX-R'],
              ['LYKE', 'E-Fully, Carbon', '3', '6’999–13’000', '480 Wh', 'Fazua Ride60'],
              ['NDURO', 'E-Fully, Freeride', '1', '7’499', '720 Wh', 'Yamaha PW-X3'],
              ['ALLTRACK', 'E-Hardtail', '5', '2’999–4’799', '600–800 Wh', 'Bosch PX, CX'],
              ['TREKKING', 'Trekking', '7', '2’999–4’999', '540–800 Wh', 'Bosch, Yamaha'],
              ['ADVENTR', 'Trekking', '6', '4’499–6’499', '600–800 Wh', 'Bosch, Yamaha'],
            ],
          },
        },
        {
          heading: 'Haibike E-Mountainbike: ALLTRAIL, ALLMTN, HYBE, LYKE, NDURO',
          paragraphs: [
            'Die 21 Fullys bilden den Kern der Marke. Der Einstieg ist das ALLTRAIL 4 für CHF 3’999 mit Bosch Performance Line CX und 600 Wh; die ALLTRAIL-Familie (8 Modelle) reicht bis CHF 6’299 und fährt mit Bosch CX oder Yamaha. Das ALLMTN gibt es in 7 Ausführungen von CHF 4’499 bis CHF 10’000, alle mit 800-Wh-Akku; die beiden Spitzenmodelle haben den Pinion-Getriebemotor.',
            'Reine Carbon-Linien sind HYBE (2 Modelle, CHF 7’499 bis CHF 11’000) und LYKE (3 Modelle, CHF 6’999 bis CHF 13’000). Das LYKE nutzt den Fazua Ride60 mit 60 Nm und 480 Wh, also einen kleineren Akku und weniger Drehmoment als die Bosch-Modelle. Das NDURO 8 Freeride (CHF 7’499) hat einen Yamaha PW-X3 mit 720 Wh.',
          ],
        },
        {
          heading: 'ALLTRACK: das Hardtail ab CHF 2’999',
          paragraphs: [
            'Wer einen robusten Einstieg ohne Hinterbaufederung sucht, schaut auf die 5 ALLTRACK-Hardtails: Das ALLTRACK 4 kostet CHF 2’999 (600 Wh), das ALLTRACK 6 CHF 3’399 (800 Wh), das ALLTRACK 10 CHF 4’199 und das ALLTRACK 11 ABS CHF 4’799. Alle haben einen Aluminiumrahmen und Bosch-Antrieb, Performance Line PX oder CX.',
          ],
        },
        {
          heading: 'TREKKING und ADVENTR: Haibike für Alltag und Touren',
          paragraphs: [
            'Die 13 Trekking-Modelle sind in zwei Linien aufgeteilt. Die 7 TREKKING-Modelle kosten CHF 2’999 bis CHF 4’999 (540 bis 800 Wh) und gehören zu den günstigsten Haibike. Die 6 ADVENTR-Modelle liegen zwischen CHF 4’499 und CHF 6’499; das ADVENTR SE hat einen Yamaha PW-X3, die übrigen einen Bosch Performance Line PX oder CX.',
            'Fünf Haibike haben ABS: ALLMTN CF 9.5 ABS (CHF 8’000), ALLTRAIL 10.5 ABS (CHF 6’299), ALLTRACK 11 ABS (CHF 4’799), TREKKING 9 ABS (CHF 4’999) und ADVENTR 11 ABS (CHF 6’499). Ein Modell mit tiefem Einstieg führt Haibike bei uns nicht: alle 39 haben einen Diamantrahmen.',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Haibike E-Bike',
          paragraphs: [
            'Nach Budget verteilt: 9 Modelle kosten unter CHF 4’000, 12 zwischen CHF 4’000 und CHF 4’999, 9 zwischen CHF 5’000 und CHF 6’999 und 9 ab CHF 7’000. Das Drehmoment beträgt je nach Antrieb 60 Nm (Fazua Ride60), 75 Nm (Yamaha PW-S2), 85 Nm (Bosch) oder 100 Nm (HYBE CF 11 mit Bosch CX-R).',
            'Für lange Touren und Berge sind 800 Wh die sichere Wahl, für kürzere Runden reichen 600 Wh. Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge; die Tabelle des Herstellers ist der beste Ausgangspunkt. Wenn Sie unsicher sind, fordern Sie unten eine Gratis Offerte an und nennen Sie uns Ihre Körpergrösse.',
          ],
        },
        { heading: 'Haibike E-Bike online bestellen', paragraphs: [ORDER.de] },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Haibike chez nous : 39 modèles neufs',
          paragraphs: [
            'Notre catalogue compte 39 vélos électriques Haibike, tous neufs et issus de notre propre stock : 26 VTT électriques (21 tout-suspendus et 5 semi-rigides) et 13 vélos de trekking électriques. Les prix vont de CHF 2’999 à CHF 13’000, le prix médian est de CHF 4’999. Tous les modèles assistent jusqu’à 25 km/h.',
            'Côté moteur, Haibike mise surtout sur Bosch : 28 des 39 modèles ont un moteur Bosch, 6 un Yamaha, 3 un Fazua et 2 un moteur-boîte Pinion. 23 modèles ont une batterie de 800 Wh, 29 cadres sont en aluminium et 9 en carbone. Le tableau classe les gammes ; les batteries sont des indications du fabricant.',
          ],
          table: {
            caption: 'Vélos électriques Haibike par gamme : type, nombre, prix, batterie et moteur',
            head: ['Gamme', 'Type', 'Modèles', 'Prix (CHF)', 'Batterie', 'Moteur'],
            rows: [
              ['ALLTRAIL', 'Tout-suspendu', '8', '3’999–6’299', '600–800 Wh', 'Bosch CX, Yamaha'],
              ['ALLMTN', 'Tout-suspendu', '7', '4’499–10’000', '800 Wh', 'Bosch CX, Pinion'],
              ['HYBE', 'Tout-suspendu, carbone', '2', '7’499–11’000', '800 Wh', 'Bosch CX, CX-R'],
              ['LYKE', 'Tout-suspendu, carbone', '3', '6’999–13’000', '480 Wh', 'Fazua Ride60'],
              ['NDURO', 'Tout-suspendu, freeride', '1', '7’499', '720 Wh', 'Yamaha PW-X3'],
              ['ALLTRACK', 'Semi-rigide', '5', '2’999–4’799', '600–800 Wh', 'Bosch PX, CX'],
              ['TREKKING', 'Trekking', '7', '2’999–4’999', '540–800 Wh', 'Bosch, Yamaha'],
              ['ADVENTR', 'Trekking', '6', '4’499–6’499', '600–800 Wh', 'Bosch, Yamaha'],
            ],
          },
        },
        {
          heading: 'VTT électrique Haibike : ALLTRAIL, ALLMTN, HYBE, LYKE, NDURO',
          paragraphs: [
            'Les 21 tout-suspendus forment le cœur de la marque. L’entrée de gamme est l’ALLTRAIL 4 à CHF 3’999 avec Bosch Performance Line CX et 600 Wh ; la famille ALLTRAIL (8 modèles) monte jusqu’à CHF 6’299 avec Bosch CX ou Yamaha. L’ALLMTN existe en 7 versions de CHF 4’499 à CHF 10’000, toutes avec batterie de 800 Wh ; les deux modèles du haut ont le moteur-boîte Pinion.',
            'Les gammes entièrement en carbone sont HYBE (2 modèles, de CHF 7’499 à CHF 11’000) et LYKE (3 modèles, de CHF 6’999 à CHF 13’000). Le LYKE utilise le Fazua Ride60 avec 60 Nm et 480 Wh, donc une batterie plus petite et moins de couple que les modèles Bosch. Le NDURO 8 Freeride (CHF 7’499) a un Yamaha PW-X3 avec 720 Wh.',
          ],
        },
        {
          heading: 'ALLTRACK : le semi-rigide dès CHF 2’999',
          paragraphs: [
            'Pour une entrée de gamme robuste sans suspension arrière, regardez les 5 semi-rigides ALLTRACK : l’ALLTRACK 4 coûte CHF 2’999 (600 Wh), l’ALLTRACK 6 CHF 3’399 (800 Wh), l’ALLTRACK 10 CHF 4’199 et l’ALLTRACK 11 ABS CHF 4’799. Tous ont un cadre en aluminium et un moteur Bosch, Performance Line PX ou CX.',
          ],
        },
        {
          heading: 'TREKKING et ADVENTR : Haibike pour le quotidien et les sorties',
          paragraphs: [
            'Les 13 modèles de trekking se répartissent en deux gammes. Les 7 TREKKING coûtent de CHF 2’999 à CHF 4’999 (540 à 800 Wh) et comptent parmi les Haibike les moins chers. Les 6 ADVENTR se situent entre CHF 4’499 et CHF 6’499 ; l’ADVENTR SE a un Yamaha PW-X3, les autres un Bosch Performance Line PX ou CX.',
            'Cinq Haibike ont l’ABS : ALLMTN CF 9.5 ABS (CHF 8’000), ALLTRAIL 10.5 ABS (CHF 6’299), ALLTRACK 11 ABS (CHF 4’799), TREKKING 9 ABS (CHF 4’999) et ADVENTR 11 ABS (CHF 6’499). Haibike n’a pas de modèle à cadre bas chez nous : les 39 ont un cadre diamant.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Haibike',
          paragraphs: [
            'Par budget : 9 modèles coûtent moins de CHF 4’000, 12 entre CHF 4’000 et CHF 4’999, 9 entre CHF 5’000 et CHF 6’999 et 9 dès CHF 7’000. Le couple est de 60 Nm (Fazua Ride60), 75 Nm (Yamaha PW-S2), 85 Nm (Bosch) ou 100 Nm (HYBE CF 11 avec Bosch CX-R) selon le moteur.',
            'Pour les longues sorties et la montagne, 800 Wh est le choix sûr ; pour des tours plus courts, 600 Wh suffisent. La taille du cadre dépend de votre taille et de votre entrejambe ; le tableau du fabricant est le meilleur point de départ. Si vous hésitez, demandez ci-dessous une offre gratuite en indiquant votre taille.',
          ],
        },
        { heading: 'Commander un vélo électrique Haibike en ligne', paragraphs: [ORDER.fr] },
      ],
      it: [
        {
          heading: 'Le e-bike Haibike da noi: 39 modelli nuovi',
          paragraphs: [
            'Nel nostro catalogo trovate 39 e-bike Haibike, tutte nuove e provenienti dal nostro magazzino: 26 modelli nella categoria mountain bike elettrica (21 full e 5 hardtail) e 13 e-bike trekking. I prezzi vanno da CHF 2’999 a CHF 13’000, il prezzo mediano è CHF 4’999. Tutti i modelli assistono fino a 25 km/h.',
            'Per il motore Haibike punta soprattutto su Bosch: 28 dei 39 modelli hanno un motore Bosch, 6 un Yamaha, 3 un Fazua e 2 un motore-cambio Pinion. 23 modelli hanno una batteria da 800 Wh, 29 telai sono in alluminio e 9 in carbonio. La tabella ordina le linee; le batterie sono dati del produttore.',
          ],
          table: {
            caption: 'E-bike Haibike per linea: tipo, numero, prezzo, batteria e motore',
            head: ['Linea', 'Tipo', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Motore'],
            rows: [
              ['ALLTRAIL', 'Full', '8', '3’999–6’299', '600–800 Wh', 'Bosch CX, Yamaha'],
              ['ALLMTN', 'Full', '7', '4’499–10’000', '800 Wh', 'Bosch CX, Pinion'],
              ['HYBE', 'Full, carbonio', '2', '7’499–11’000', '800 Wh', 'Bosch CX, CX-R'],
              ['LYKE', 'Full, carbonio', '3', '6’999–13’000', '480 Wh', 'Fazua Ride60'],
              ['NDURO', 'Full, freeride', '1', '7’499', '720 Wh', 'Yamaha PW-X3'],
              ['ALLTRACK', 'Hardtail', '5', '2’999–4’799', '600–800 Wh', 'Bosch PX, CX'],
              ['TREKKING', 'Trekking', '7', '2’999–4’999', '540–800 Wh', 'Bosch, Yamaha'],
              ['ADVENTR', 'Trekking', '6', '4’499–6’499', '600–800 Wh', 'Bosch, Yamaha'],
            ],
          },
        },
        {
          heading: 'Mountain bike elettrica Haibike: ALLTRAIL, ALLMTN, HYBE, LYKE, NDURO',
          paragraphs: [
            'Le 21 full sono il cuore del marchio. L’ingresso è la ALLTRAIL 4 a CHF 3’999 con Bosch Performance Line CX e 600 Wh; la famiglia ALLTRAIL (8 modelli) arriva a CHF 6’299 con Bosch CX o Yamaha. La ALLMTN esiste in 7 versioni da CHF 4’499 a CHF 10’000, tutte con batteria da 800 Wh; i due modelli di punta hanno il motore-cambio Pinion.',
            'Le linee interamente in carbonio sono HYBE (2 modelli, da CHF 7’499 a CHF 11’000) e LYKE (3 modelli, da CHF 6’999 a CHF 13’000). La LYKE usa il Fazua Ride60 con 60 Nm e 480 Wh, quindi una batteria più piccola e meno coppia dei modelli Bosch. La NDURO 8 Freeride (CHF 7’499) ha uno Yamaha PW-X3 con 720 Wh.',
          ],
        },
        {
          heading: 'ALLTRACK: l’hardtail da CHF 2’999',
          paragraphs: [
            'Chi cerca un ingresso robusto senza sospensione posteriore guarda i 5 hardtail ALLTRACK: la ALLTRACK 4 costa CHF 2’999 (600 Wh), la ALLTRACK 6 CHF 3’399 (800 Wh), la ALLTRACK 10 CHF 4’199 e la ALLTRACK 11 ABS CHF 4’799. Tutte hanno telaio in alluminio e motore Bosch, Performance Line PX o CX.',
          ],
        },
        {
          heading: 'TREKKING e ADVENTR: Haibike per ogni giorno e per i tour',
          paragraphs: [
            'I 13 modelli trekking sono divisi in due linee. I 7 TREKKING costano da CHF 2’999 a CHF 4’999 (da 540 a 800 Wh) e sono tra le Haibike più economiche. I 6 ADVENTR stanno tra CHF 4’499 e CHF 6’499; l’ADVENTR SE ha uno Yamaha PW-X3, gli altri un Bosch Performance Line PX o CX.',
            'Cinque Haibike hanno l’ABS: ALLMTN CF 9.5 ABS (CHF 8’000), ALLTRAIL 10.5 ABS (CHF 6’299), ALLTRACK 11 ABS (CHF 4’799), TREKKING 9 ABS (CHF 4’999) e ADVENTR 11 ABS (CHF 6’499). Haibike da noi non ha modelli con telaio basso: tutti i 39 hanno il telaio a diamante.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Haibike giusta',
          paragraphs: [
            'Per budget: 9 modelli costano meno di CHF 4’000, 12 tra CHF 4’000 e CHF 4’999, 9 tra CHF 5’000 e CHF 6’999 e 9 da CHF 7’000. La coppia è di 60 Nm (Fazua Ride60), 75 Nm (Yamaha PW-S2), 85 Nm (Bosch) o 100 Nm (HYBE CF 11 con Bosch CX-R), a seconda del motore.',
            'Per i tour lunghi e la montagna 800 Wh è la scelta sicura; per giri più brevi bastano 600 Wh. La taglia del telaio dipende da altezza e lunghezza della gamba; la tabella del produttore è il miglior punto di partenza. Se avete dubbi, richiedete qui sotto un’offerta gratuita indicando la vostra altezza.',
          ],
        },
        { heading: 'Ordinare la e-bike Haibike online', paragraphs: [ORDER.it] },
      ],
    },
    faq: {
      de: [
        { q: 'Wie viele Haibike E-Bikes sind im Katalog?', a: '39 Modelle, alle neu: 26 E-Mountainbikes (21 Fullys, 5 Hardtails) und 13 Trekking E-Bikes, von CHF 2’999 bis CHF 13’000.' },
        { q: 'Was kostet das günstigste Haibike E-Bike?', a: 'CHF 2’999: Das TREKKING 3 (Trekking E-Bike, 540 Wh) und das ALLTRACK 4 (Hardtail, 600 Wh) sind die Einstiegsmodelle.' },
        { q: 'Welchen Antrieb haben die Haibike E-Bikes?', a: 'Bei 28 von 39 Modellen Bosch, bei 6 Yamaha, bei 3 Fazua (LYKE) und bei 2 Pinion (ALLMTN CF mit TRN/IQ).' },
        PAY.de,
      ],
      fr: [
        { q: 'Combien de vélos électriques Haibike y a-t-il au catalogue ?', a: '39 modèles neufs : 26 VTT électriques (21 tout-suspendus, 5 semi-rigides) et 13 vélos de trekking électriques, de CHF 2’999 à CHF 13’000.' },
        { q: 'Quel est le Haibike le moins cher ?', a: 'CHF 2’999 : le TREKKING 3 (vélo de trekking, 540 Wh) et l’ALLTRACK 4 (semi-rigide, 600 Wh) sont les modèles d’entrée de gamme.' },
        { q: 'Quel moteur équipe les Haibike ?', a: 'Bosch sur 28 modèles sur 39, Yamaha sur 6, Fazua sur 3 (LYKE) et Pinion sur 2 (ALLMTN CF avec TRN/IQ).' },
        PAY.fr,
      ],
      it: [
        { q: 'Quante e-bike Haibike ci sono nel catalogo?', a: '39 modelli nuovi: 26 mountain bike elettriche (21 full, 5 hardtail) e 13 e-bike trekking, da CHF 2’999 a CHF 13’000.' },
        { q: 'Qual è la Haibike più economica?', a: 'CHF 2’999: la TREKKING 3 (e-bike trekking, 540 Wh) e la ALLTRACK 4 (hardtail, 600 Wh) sono i modelli d’ingresso.' },
        { q: 'Che motore hanno le Haibike?', a: 'Bosch su 28 modelli su 39, Yamaha su 6, Fazua su 3 (LYKE) e Pinion su 2 (ALLMTN CF con TRN/IQ).' },
        PAY.it,
      ],
    },
  },
  {
    id: 'riese-und-mueller-e-bike-kaufen',
    slug: { de: 'riese-und-mueller-e-bike-kaufen', fr: 'acheter-velo-electrique-riese-et-muller', it: 'acquistare-e-bike-riese-e-muller' },
    title: {
      de: 'Riese & Müller E-Bike kaufen: Swing, Charger, Delite',
      fr: 'Acheter un vélo électrique Riese & Müller : Swing, Charger, Delite',
      it: 'Acquistare una e-bike Riese & Müller: Swing, Charger, Delite',
    },
    excerpt: {
      de: '25 neue Riese & Müller E-Bikes ab Lager: Swing, Charger, Delite und Cargo im Vergleich, mit Preisen in CHF, Akku-Daten und Gratis Offerte.',
      fr: '25 vélos électriques Riese & Müller neufs en stock : Swing, Charger, Delite et cargo comparés, avec prix en CHF, batterie et offre gratuite.',
      it: '25 e-bike Riese & Müller nuove a magazzino: Swing, Charger, Delite e cargo a confronto, con prezzi in CHF, batteria e offerta gratuita.',
    },
    publishedDate: '2026-11-24',
    readMinutes: 5,
    related: { brandId: 'riese-mueller' },
    body: {
      de: [
        {
          heading: 'Riese & Müller E-Bikes bei uns: 25 Modelle, alle neu',
          paragraphs: [
            'Riese & Müller, in der Suche oft auch «Riese und Müller» geschrieben, ist mit 25 Modellen im Katalog vertreten, alle neu und aus eigenem Lager: 8 City E-Bikes, 7 Trekking E-Bikes und 10 Cargo E-Bikes. Die Preise reichen von CHF 3’649 bis CHF 8’069, der mittlere Preis liegt bei CHF 4’719. Alle Modelle unterstützen bis 25 km/h.',
            'Beim Antrieb dominiert Bosch (22 Modelle, von Performance Line bis Cargo Line), die drei UBN-Modelle fahren mit Fazua Ride 60. Die Preise sind Einstiegspreise der jeweils günstigsten Ausführung; Ausstattung und Akku verändern den Endpreis. Gewichte und Akkus sind Herstellerangaben.',
          ],
          table: {
            caption: 'Riese & Müller E-Bikes nach Kategorie: Modelllinien, Anzahl, Preis, Akku und Gewicht',
            head: ['Kategorie', 'Modelllinien', 'Modelle', 'Preis (CHF)', 'Akku', 'Gewicht'],
            rows: [
              ['City E-Bike', 'Swing, Nevo, Culture, UBN', '8', '3’649–4’435', '400–540 Wh', '19,5–27,7 kg'],
              ['Trekking E-Bike', 'Charger, Delite, Homage, Superdelite', '7', '4’249–8’069', '540–1’200 Wh', '28,6–35,2 kg'],
              ['Cargo E-Bike', 'Multicharger, Multitinker, Transporter, Carrie, Packster, Load', '10', '4’719–7’569', '545–750 Wh', '30,1–49 kg'],
            ],
          },
        },
        {
          heading: 'Swing, Nevo, Culture und UBN: die City-Modelle',
          paragraphs: [
            'Die 8 City-Modelle kosten CHF 3’649 bis CHF 4’435. Das Swing4 (CHF 3’649) ist das günstigste Riese & Müller, das Swing5 kostet CHF 3’789 und das Nevo5 CHF 4’069. Diese drei haben wie das Culture Mixte (CHF 4’069) einen tiefen Einstieg: Insgesamt sind es 4 von 8 City-Modellen.',
            'Besonders leicht sind die UBN-Modelle (Five, Six, Seven) mit Fazua Ride 60 und 480 Wh: Sie wiegen 19,5 bis 20,2 kg und kosten je CHF 4’435. Das Culture (CHF 4’069, 400 Wh, 21,8 kg) fährt mit dem Bosch Performance Line SX.',
          ],
        },
        {
          heading: 'Charger, Delite, Homage: die Trekking-Modelle',
          paragraphs: [
            'Die 7 Trekking-Modelle starten mit dem Charger5 für CHF 4’249 (Bosch Performance Line, 540 Wh); das Charger4 hat 625 Wh und kostet CHF 4’359. Delite4 (CHF 5’819, 750 Wh) und Delite5 (CHF 6’949, 800 Wh) bieten viel Akku für lange Strecken, das Homage5 (CHF 7’509, 800 Wh) hat einen tiefen Einstieg. Mit Ausnahme der beiden Charger5-Modelle fahren alle mit dem stärkeren Bosch Performance Line CX.',
            'Das Superdelite5 ist mit CHF 8’069 das teuerste Riese & Müller im Katalog und hat mit 1’200 Wh den grössten Akku; mit 35,2 kg ist es auch das schwerste Trekking-Modell. Einen tiefen Einstieg haben neben dem Homage5 auch das Charger5 Mixte (CHF 4’249).',
          ],
        },
        {
          heading: 'Packster, Load, Multicharger: die Cargo-Modelle',
          paragraphs: [
            'Die 10 Cargo-Modelle kosten CHF 4’719 bis CHF 7’569 und wiegen 30,1 bis 49 kg. Am günstigsten ist das Multicharger3 (CHF 4’719), das es auch als Multicharger3 Mixte mit tiefem Einstieg gibt. Packster2 70 (CHF 6’359), Packster2 70 CT (CHF 7’569), Load5 60 (CHF 7’389) und Load5 75 (CHF 7’569) fahren mit dem Bosch Cargo Line.',
            'Dazu kommen Multitinker2 (CHF 5’179), Carrie2 (CHF 6’089) und das Transporter2 in den Ausführungen 65 und 85 (CHF 5’249 und CHF 5’429). Das Transporter2 85 ist mit 49 kg das schwerste Modell der Marke.',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Riese & Müller E-Bike',
          paragraphs: [
            'Nach Budget verteilt: 11 Modelle kosten unter CHF 4’500, 6 zwischen CHF 4’500 und CHF 5’999, 4 zwischen CHF 6’000 und CHF 7’499 und 4 ab CHF 7’500; 13 Modelle liegen unter CHF 5’000. Sieben Modelle haben einen tiefen Einstieg: Swing4, Swing5, Nevo5, Culture Mixte, Charger5 Mixte, Homage5 und Multicharger3 Mixte.',
            'Weil die Preise Einstiegspreise sind, lohnt sich vor der Bestellung ein Blick auf Akku, Schaltung und Ausstattung. Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge. Wenn Sie unsicher sind, fordern Sie unten eine Gratis Offerte an und nennen Sie uns Modell, Variante und Körpergrösse.',
          ],
        },
        { heading: 'Riese & Müller E-Bike online bestellen', paragraphs: [ORDER.de] },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Riese & Müller chez nous : 25 modèles neufs',
          paragraphs: [
            'Riese & Müller, souvent écrit « Riese und Müller » dans les recherches, compte 25 modèles au catalogue, tous neufs et issus de notre propre stock : 8 vélos de ville électriques, 7 vélos de trekking électriques et 10 vélos cargo électriques. Les prix vont de CHF 3’649 à CHF 8’069, le prix médian est de CHF 4’719. Tous les modèles assistent jusqu’à 25 km/h.',
            'Côté moteur, Bosch domine (22 modèles, de Performance Line à Cargo Line), les trois UBN roulent avec le Fazua Ride 60. Les prix sont des prix d’appel de la version la moins chère ; l’équipement et la batterie modifient le prix final. Poids et batteries sont des indications du fabricant.',
          ],
          table: {
            caption: 'Vélos électriques Riese & Müller par catégorie : gammes, nombre, prix, batterie et poids',
            head: ['Catégorie', 'Gammes', 'Modèles', 'Prix (CHF)', 'Batterie', 'Poids'],
            rows: [
              ['Vélo de ville électrique', 'Swing, Nevo, Culture, UBN', '8', '3’649–4’435', '400–540 Wh', '19,5–27,7 kg'],
              ['Vélo de trekking électrique', 'Charger, Delite, Homage, Superdelite', '7', '4’249–8’069', '540–1’200 Wh', '28,6–35,2 kg'],
              ['Vélo cargo électrique', 'Multicharger, Multitinker, Transporter, Carrie, Packster, Load', '10', '4’719–7’569', '545–750 Wh', '30,1–49 kg'],
            ],
          },
        },
        {
          heading: 'Swing, Nevo, Culture et UBN : les modèles urbains',
          paragraphs: [
            'Les 8 modèles urbains coûtent de CHF 3’649 à CHF 4’435. Le Swing4 (CHF 3’649) est le Riese & Müller le moins cher, le Swing5 coûte CHF 3’789 et le Nevo5 CHF 4’069. Ces trois-là ont, comme le Culture Mixte (CHF 4’069), un cadre bas : 4 modèles sur 8 au total.',
            'Les UBN (Five, Six, Seven) sont particulièrement légers, avec Fazua Ride 60 et 480 Wh : ils pèsent de 19,5 à 20,2 kg et coûtent chacun CHF 4’435. Le Culture (CHF 4’069, 400 Wh, 21,8 kg) roule avec le Bosch Performance Line SX.',
          ],
        },
        {
          heading: 'Charger, Delite, Homage : les modèles de trekking',
          paragraphs: [
            'Les 7 modèles de trekking démarrent avec le Charger5 à CHF 4’249 (Bosch Performance Line, 540 Wh) ; le Charger4 a 625 Wh et coûte CHF 4’359. Delite4 (CHF 5’819, 750 Wh) et Delite5 (CHF 6’949, 800 Wh) offrent beaucoup de batterie pour les longues distances, l’Homage5 (CHF 7’509, 800 Wh) a un cadre bas. À l’exception des deux Charger5, tous roulent avec le Bosch Performance Line CX, plus puissant.',
            'Le Superdelite5 est à CHF 8’069 le Riese & Müller le plus cher du catalogue et a, avec 1’200 Wh, la plus grande batterie ; avec 35,2 kg, c’est aussi le plus lourd des modèles de trekking. Outre l’Homage5, le Charger5 Mixte (CHF 4’249) a un cadre bas.',
          ],
        },
        {
          heading: 'Packster, Load, Multicharger : les modèles cargo',
          paragraphs: [
            'Les 10 modèles cargo coûtent de CHF 4’719 à CHF 7’569 et pèsent de 30,1 à 49 kg. Le moins cher est le Multicharger3 (CHF 4’719), qui existe aussi en Multicharger3 Mixte à cadre bas. Packster2 70 (CHF 6’359), Packster2 70 CT (CHF 7’569), Load5 60 (CHF 7’389) et Load5 75 (CHF 7’569) roulent avec le Bosch Cargo Line.',
            'S’y ajoutent le Multitinker2 (CHF 5’179), le Carrie2 (CHF 6’089) et le Transporter2 en versions 65 et 85 (CHF 5’249 et CHF 5’429). Avec 49 kg, le Transporter2 85 est le modèle le plus lourd de la marque.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Riese & Müller',
          paragraphs: [
            'Par budget : 11 modèles coûtent moins de CHF 4’500, 6 entre CHF 4’500 et CHF 5’999, 4 entre CHF 6’000 et CHF 7’499 et 4 dès CHF 7’500 ; 13 modèles sont sous CHF 5’000. Sept modèles ont un cadre bas : Swing4, Swing5, Nevo5, Culture Mixte, Charger5 Mixte, Homage5 et Multicharger3 Mixte.',
            'Comme ces prix sont des prix d’appel, regardez avant de commander la batterie, la transmission et l’équipement. La taille du cadre dépend de votre taille et de votre entrejambe. Si vous hésitez, demandez ci-dessous une offre gratuite en indiquant modèle, version et taille.',
          ],
        },
        { heading: 'Commander un vélo électrique Riese & Müller en ligne', paragraphs: [ORDER.fr] },
      ],
      it: [
        {
          heading: 'Le e-bike Riese & Müller da noi: 25 modelli nuovi',
          paragraphs: [
            'Riese & Müller, spesso scritto «Riese und Müller» nelle ricerche, è presente con 25 modelli nel catalogo, tutti nuovi e provenienti dal nostro magazzino: 8 e-bike city, 7 e-bike trekking e 10 e-bike cargo. I prezzi vanno da CHF 3’649 a CHF 8’069, il prezzo mediano è CHF 4’719. Tutti i modelli assistono fino a 25 km/h.',
            'Per il motore domina Bosch (22 modelli, dalla Performance Line alla Cargo Line), le tre UBN montano il Fazua Ride 60. I prezzi sono prezzi d’ingresso della versione più economica; dotazione e batteria modificano il prezzo finale. Pesi e batterie sono dati del produttore.',
          ],
          table: {
            caption: 'E-bike Riese & Müller per categoria: linee, numero, prezzo, batteria e peso',
            head: ['Categoria', 'Linee', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Peso'],
            rows: [
              ['Bicicletta elettrica city', 'Swing, Nevo, Culture, UBN', '8', '3’649–4’435', '400–540 Wh', '19,5–27,7 kg'],
              ['Bicicletta elettrica trekking', 'Charger, Delite, Homage, Superdelite', '7', '4’249–8’069', '540–1’200 Wh', '28,6–35,2 kg'],
              ['Bicicletta elettrica cargo', 'Multicharger, Multitinker, Transporter, Carrie, Packster, Load', '10', '4’719–7’569', '545–750 Wh', '30,1–49 kg'],
            ],
          },
        },
        {
          heading: 'Swing, Nevo, Culture e UBN: i modelli urbani',
          paragraphs: [
            'Gli 8 modelli urbani costano da CHF 3’649 a CHF 4’435. La Swing4 (CHF 3’649) è la Riese & Müller più economica, la Swing5 costa CHF 3’789 e la Nevo5 CHF 4’069. Queste tre hanno, come la Culture Mixte (CHF 4’069), il telaio basso: in tutto 4 modelli su 8.',
            'Le UBN (Five, Six, Seven) sono particolarmente leggere, con Fazua Ride 60 e 480 Wh: pesano da 19,5 a 20,2 kg e costano CHF 4’435 ciascuna. La Culture (CHF 4’069, 400 Wh, 21,8 kg) monta il Bosch Performance Line SX.',
          ],
        },
        {
          heading: 'Charger, Delite, Homage: i modelli trekking',
          paragraphs: [
            'I 7 modelli trekking partono dalla Charger5 a CHF 4’249 (Bosch Performance Line, 540 Wh); la Charger4 ha 625 Wh e costa CHF 4’359. Delite4 (CHF 5’819, 750 Wh) e Delite5 (CHF 6’949, 800 Wh) offrono molta batteria per le lunghe distanze, la Homage5 (CHF 7’509, 800 Wh) ha il telaio basso. Ad eccezione delle due Charger5, tutte montano il più potente Bosch Performance Line CX.',
            'La Superdelite5 è con CHF 8’069 la Riese & Müller più cara del catalogo e ha, con 1’200 Wh, la batteria più grande; con 35,2 kg è anche il modello trekking più pesante. Oltre alla Homage5, ha il telaio basso anche la Charger5 Mixte (CHF 4’249).',
          ],
        },
        {
          heading: 'Packster, Load, Multicharger: i modelli cargo',
          paragraphs: [
            'I 10 modelli cargo costano da CHF 4’719 a CHF 7’569 e pesano da 30,1 a 49 kg. Il più economico è il Multicharger3 (CHF 4’719), disponibile anche come Multicharger3 Mixte con telaio basso. Packster2 70 (CHF 6’359), Packster2 70 CT (CHF 7’569), Load5 60 (CHF 7’389) e Load5 75 (CHF 7’569) montano il Bosch Cargo Line.',
            'A questi si aggiungono Multitinker2 (CHF 5’179), Carrie2 (CHF 6’089) e Transporter2 nelle versioni 65 e 85 (CHF 5’249 e CHF 5’429). Con 49 kg il Transporter2 85 è il modello più pesante del marchio.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Riese & Müller giusta',
          paragraphs: [
            'Per budget: 11 modelli costano meno di CHF 4’500, 6 tra CHF 4’500 e CHF 5’999, 4 tra CHF 6’000 e CHF 7’499 e 4 da CHF 7’500; 13 modelli sono sotto CHF 5’000. Sette modelli hanno il telaio basso: Swing4, Swing5, Nevo5, Culture Mixte, Charger5 Mixte, Homage5 e Multicharger3 Mixte.',
            'Poiché i prezzi sono prezzi d’ingresso, prima di ordinare controllate batteria, trasmissione e dotazione. La taglia del telaio dipende da altezza e lunghezza della gamba. Se avete dubbi, richiedete qui sotto un’offerta gratuita indicando modello, versione e altezza.',
          ],
        },
        { heading: 'Ordinare la e-bike Riese & Müller online', paragraphs: [ORDER.it] },
      ],
    },
    faq: {
      de: [
        { q: 'Wie viele Riese & Müller E-Bikes sind im Katalog?', a: '25 Modelle, alle neu: 8 City E-Bikes, 7 Trekking E-Bikes und 10 Cargo E-Bikes, von CHF 3’649 bis CHF 8’069.' },
        { q: 'Was kostet das günstigste Riese & Müller E-Bike?', a: 'Das Swing4 ist ab CHF 3’649 das günstigste Modell. Der Preis ist der Einstiegspreis der günstigsten Ausführung; Variante und Ausstattung können ihn verändern.' },
        { q: 'Welche Riese & Müller E-Bikes sind besonders leicht?', a: 'Die UBN-Modelle Five und Seven wiegen laut Hersteller 19,5 kg, das UBN Six 20,2 kg. Sie haben Fazua Ride 60 mit 480 Wh und kosten je CHF 4’435.' },
        PAY.de,
      ],
      fr: [
        { q: 'Combien de vélos électriques Riese & Müller y a-t-il au catalogue ?', a: '25 modèles neufs : 8 vélos de ville électriques, 7 vélos de trekking électriques et 10 vélos cargo électriques, de CHF 3’649 à CHF 8’069.' },
        { q: 'Quel est le Riese & Müller le moins cher ?', a: 'Le Swing4 est le modèle le moins cher, dès CHF 3’649. Le prix est celui de la version la moins chère ; la variante et l’équipement peuvent le modifier.' },
        { q: 'Quels Riese & Müller sont particulièrement légers ?', a: 'Les UBN Five et Seven pèsent 19,5 kg selon le fabricant, l’UBN Six 20,2 kg. Ils ont Fazua Ride 60 avec 480 Wh et coûtent chacun CHF 4’435.' },
        PAY.fr,
      ],
      it: [
        { q: 'Quante e-bike Riese & Müller ci sono nel catalogo?', a: '25 modelli nuovi: 8 biciclette elettriche city, 7 e-bike trekking e 10 e-bike cargo, da CHF 3’649 a CHF 8’069.' },
        { q: 'Qual è la Riese & Müller più economica?', a: 'La Swing4 è il modello più economico, da CHF 3’649. Il prezzo è quello della versione più economica; variante e dotazione possono modificarlo.' },
        { q: 'Quali Riese & Müller sono particolarmente leggere?', a: 'Le UBN Five e Seven pesano 19,5 kg secondo il produttore, la UBN Six 20,2 kg. Hanno Fazua Ride 60 con 480 Wh e costano CHF 4’435 ciascuna.' },
        PAY.it,
      ],
    },
  },
  {
    id: 'stromer-e-bike-kaufen',
    slug: { de: 'stromer-e-bike-kaufen', fr: 'acheter-velo-electrique-stromer', it: 'acquistare-e-bike-stromer' },
    title: {
      de: 'Stromer E-Bike kaufen: ST1 bis ST7 im Überblick',
      fr: 'Acheter un vélo électrique Stromer : de l’ST1 à l’ST7',
      it: 'Acquistare una e-bike Stromer: dalla ST1 alla ST7',
    },
    excerpt: {
      de: '5 neue Stromer S-Pedelecs ab Lager: ST1 bis ST7 mit 45 km/h im Vergleich, mit Preisen in CHF, Antrieb, Akku und Gratis Offerte.',
      fr: '5 speed pedelecs Stromer neufs en stock : de l’ST1 à l’ST7, 45 km/h, comparés avec prix en CHF, moteur, batterie et offre gratuite.',
      it: '5 speed pedelec Stromer nuove a magazzino: dalla ST1 alla ST7, 45 km/h, a confronto con prezzi in CHF, motore, batteria e offerta gratuita.',
    },
    publishedDate: '2026-11-24',
    readMinutes: 5,
    related: { brandId: 'stromer', readNext: 'e-bike-45-kmh-vorschriften' },
    body: {
      de: [
        {
          heading: 'Stromer E-Bikes bei uns: 5 S-Pedelecs, alle neu',
          paragraphs: [
            'Alle 5 Stromer in unserem Katalog sind schnelle E-Bikes, neu und aus eigenem Lager, und unterstützen bis 45 km/h. Die Preise reichen von ca. CHF 5’116 (ST1) bis ca. CHF 11’943 (ST7), der mittlere Preis liegt bei ca. CHF 8’166. Die CHF-Preise sind aus den Herstellerpreisen in Euro umgerechnet und deshalb mit «ca.» gekennzeichnet; den aktuellen Preis nennen wir Ihnen gern in der Gratis Offerte.',
            'Die Tabelle zeigt, wie sich die Modelle unterscheiden: Mit dem Preis wachsen Motorleistung, Drehmoment und Ausstattung. Alle haben einen herausnehmbaren Akku mit 983 Wh, nur das ST7 hat 1’440 Wh.',
          ],
          table: {
            caption: 'Stromer E-Bikes im Vergleich: Preis, Motor, Drehmoment, Akku und Getriebe',
            head: ['Modell', 'Preis (CHF, ca.)', 'Motor', 'Drehmoment', 'Akku', 'Getriebe'],
            rows: [
              ['ST1', '5’116', 'CYRO Drive II, 670 W', '35 Nm', '983 Wh', '9-Gang Kette'],
              ['ST2', '7’283', 'CYRO Drive 3, 750 W', '40 Nm', '983 Wh', 'Pinion 6-Gang, Riemen'],
              ['ST3', '8’166', 'SYNO Drive II, 820 W', '44 Nm', '983 Wh', 'Pinion 9-Gang, Riemen'],
              ['ST5', '10’104', 'SYNO Sport, 850 W', '48 Nm', '983 Wh', 'Pinion 9-Gang Smart.Shift'],
              ['ST7', '11’943', 'SYNO Sport II, 940 W', '52 Nm', '1’440 Wh', 'Pinion 12-Gang Smart.Shift'],
            ],
          },
        },
        {
          heading: 'Was bedeutet ein schnelles E-Bike für Kauf und Alltag?',
          paragraphs: [
            'Ein Stromer gilt rechtlich als Motorfahrrad. Sie brauchen einen Führerausweis (mindestens Kategorie M) und ein Kontrollschild mit Haftpflichtversicherung, der Helm ist Pflicht und das Licht muss auch tagsüber eingeschaltet sein. Dafür kommen Sie mit 45 km/h deutlich schneller voran als mit einem Modell bis 25 km/h, das ohne Kontrollschild und Führerausweis gefahren wird.',
            'Rechnen Sie neben dem Kaufpreis mit den Kosten für Kontrollschild und Versicherung; die Höhe hängt von Kanton und Versicherung ab. Fragen Sie vor der Bestellung nach, wenn Sie Zweifel zur Zulassung haben. Die wichtigsten Regeln fasst der Lesetipp unten zusammen.',
          ],
        },
        {
          heading: 'ST1 und ST2: der Einstieg ins schnelle Fahren',
          paragraphs: [
            'Das ST1 ist das Einstiegsmodell für ca. CHF 5’116: CYRO Drive II mit 35 Nm, 9-Gang-Kettenschaltung, Gepäckträger bis 22,5 kg und Tagfahrlicht; die Reichweite gibt Stromer mit bis zu 180 km an. Das ST2 (ca. CHF 7’283) wechselt auf ein wartungsarmes Pinion-6-Gang-Getriebe mit Riemenantrieb und einen stärkeren Motor (CYRO Drive 3, 750 W, 40 Nm).',
          ],
        },
        {
          heading: 'ST3 und ST5: Pinion-Getriebe, ABS und Smart.Shift',
          paragraphs: [
            'Das ST3 (ca. CHF 8’166) kombiniert den SYNO Drive II (820 W, 44 Nm) mit einem Pinion-9-Gang-Getriebe, Riemenantrieb und ABS-Vierkolbenbremsen; es ist in den Rahmengrössen M, L und XL erhältlich. Das ST5 (ca. CHF 10’104) bringt den SYNO Sport (850 W, 48 Nm), die elektrische Smart.Shift-Schaltung und Supernova-Licht dazu.',
          ],
        },
        {
          heading: 'ST7: das Topmodell mit 1’440 Wh',
          paragraphs: [
            'Das ST7 kostet ca. CHF 11’943 und hat den SYNO Sport II (940 W, 52 Nm), ein Pinion-12-Gang-Smart.Shift-Getriebe, ABS, einen integrierten Lenker und als einziges Modell einen 1’440-Wh-Akku. Laut Hersteller reicht er für bis zu 260 km.',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Stromer E-Bike',
          paragraphs: [
            'Nach Preis verteilt: ein Modell unter CHF 6’000 (ST1), zwei zwischen CHF 6’000 und CHF 9’000 (ST2, ST3) und zwei darüber (ST5, ST7). Vier Modelle haben Riemenantrieb (ST2, ST3, ST5, ST7), das ST1 eine Kettenschaltung. ST1 und ST2 gibt es in den Grössen M und L, die übrigen auch in XL.',
            'Wenn Sie unsicher sind, welche Rahmengrösse und welches Modell zu Ihrem Arbeitsweg passt, fordern Sie unten eine Gratis Offerte an und nennen Sie uns Ihre Körpergrösse und Ihre tägliche Strecke.',
          ],
        },
        { heading: 'Stromer E-Bike online bestellen', paragraphs: [ORDER.de] },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Stromer chez nous : 5 speed pedelecs neufs',
          paragraphs: [
            'Les 5 Stromer de notre catalogue sont tous des vélos électriques rapides, neufs et issus de notre propre stock, avec assistance jusqu’à 45 km/h. Les prix vont d’env. CHF 5’116 (ST1) à env. CHF 11’943 (ST7), le prix médian est d’env. CHF 8’166. Les prix en CHF sont convertis à partir des prix du fabricant en euros et marqués « env. » ; nous vous indiquons volontiers le prix actuel dans l’offre gratuite.',
            'Le tableau montre les différences : avec le prix augmentent la puissance du moteur, le couple et l’équipement. Tous ont une batterie amovible de 983 Wh, seul l’ST7 a 1’440 Wh.',
          ],
          table: {
            caption: 'Comparaison des Stromer : prix, moteur, couple, batterie et transmission',
            head: ['Modèle', 'Prix (CHF, env.)', 'Moteur', 'Couple', 'Batterie', 'Transmission'],
            rows: [
              ['ST1', '5’116', 'CYRO Drive II, 670 W', '35 Nm', '983 Wh', '9 vitesses, chaîne'],
              ['ST2', '7’283', 'CYRO Drive 3, 750 W', '40 Nm', '983 Wh', 'Pinion 6 vitesses, courroie'],
              ['ST3', '8’166', 'SYNO Drive II, 820 W', '44 Nm', '983 Wh', 'Pinion 9 vitesses, courroie'],
              ['ST5', '10’104', 'SYNO Sport, 850 W', '48 Nm', '983 Wh', 'Pinion 9 vitesses Smart.Shift'],
              ['ST7', '11’943', 'SYNO Sport II, 940 W', '52 Nm', '1’440 Wh', 'Pinion 12 vitesses Smart.Shift'],
            ],
          },
        },
        {
          heading: 'Que signifie un vélo électrique rapide pour l’achat et le quotidien ?',
          paragraphs: [
            'Un Stromer est considéré comme un cyclomoteur. Il faut un permis de conduire (au moins catégorie M) et une plaque de contrôle avec assurance responsabilité civile, le casque est obligatoire et les feux doivent être allumés aussi de jour. En contrepartie, vous avancez bien plus vite à 45 km/h qu’avec un modèle limité à 25 km/h, qui se conduit sans plaque ni permis.',
            'Prévoyez, en plus du prix d’achat, le coût de la plaque et de l’assurance ; il dépend du canton et de l’assureur. Renseignez-vous avant la commande si vous avez un doute sur l’immatriculation. Les règles principales sont résumées dans l’article conseillé ci-dessous.',
          ],
        },
        {
          heading: 'ST1 et ST2 : l’entrée dans la vitesse',
          paragraphs: [
            'L’ST1 est le modèle d’entrée de gamme à env. CHF 5’116 : CYRO Drive II avec 35 Nm, dérailleur 9 vitesses, porte-bagages jusqu’à 22,5 kg et feu de jour ; Stromer annonce jusqu’à 180 km d’autonomie. L’ST2 (env. CHF 7’283) passe à une boîte Pinion 6 vitesses à entretien réduit avec courroie et à un moteur plus puissant (CYRO Drive 3, 750 W, 40 Nm).',
          ],
        },
        {
          heading: 'ST3 et ST5 : boîte Pinion, ABS et Smart.Shift',
          paragraphs: [
            'L’ST3 (env. CHF 8’166) associe le SYNO Drive II (820 W, 44 Nm) à une boîte Pinion 9 vitesses, une courroie et des freins à quatre pistons avec ABS ; il existe en tailles M, L et XL. L’ST5 (env. CHF 10’104) ajoute le SYNO Sport (850 W, 48 Nm), le changement de vitesses électrique Smart.Shift et un éclairage Supernova.',
          ],
        },
        {
          heading: 'ST7 : le haut de gamme avec 1’440 Wh',
          paragraphs: [
            'L’ST7 coûte env. CHF 11’943 et a le SYNO Sport II (940 W, 52 Nm), une boîte Pinion 12 vitesses Smart.Shift, l’ABS, un cintre intégré et, seul modèle, une batterie de 1’440 Wh. Selon le fabricant, elle suffit pour jusqu’à 260 km.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Stromer',
          paragraphs: [
            'Par prix : un modèle sous CHF 6’000 (ST1), deux entre CHF 6’000 et CHF 9’000 (ST2, ST3) et deux au-dessus (ST5, ST7). Quatre modèles ont une courroie (ST2, ST3, ST5, ST7), l’ST1 un dérailleur à chaîne. Les ST1 et ST2 existent en tailles M et L, les autres aussi en XL.',
            'Si vous hésitez sur la taille de cadre et le modèle adaptés à votre trajet, demandez ci-dessous une offre gratuite en indiquant votre taille et votre trajet quotidien.',
          ],
        },
        { heading: 'Commander un vélo électrique Stromer en ligne', paragraphs: [ORDER.fr] },
      ],
      it: [
        {
          heading: 'Le e-bike Stromer da noi: 5 speed pedelec nuove',
          paragraphs: [
            'Le 5 Stromer del nostro catalogo sono tutte e-bike veloci, nuove e provenienti dal nostro magazzino, con assistenza fino a 45 km/h. I prezzi vanno da ca. CHF 5’116 (ST1) a ca. CHF 11’943 (ST7), il prezzo mediano è ca. CHF 8’166. I prezzi in CHF sono convertiti dai prezzi del produttore in euro e contrassegnati «ca.»; il prezzo attuale ve lo comunichiamo volentieri nell’offerta gratuita.',
            'La tabella mostra le differenze: con il prezzo crescono potenza del motore, coppia e dotazione. Tutte hanno una batteria estraibile da 983 Wh, solo la ST7 ha 1’440 Wh.',
          ],
          table: {
            caption: 'Confronto Stromer: prezzo, motore, coppia, batteria e trasmissione',
            head: ['Modello', 'Prezzo (CHF, ca.)', 'Motore', 'Coppia', 'Batteria', 'Trasmissione'],
            rows: [
              ['ST1', '5’116', 'CYRO Drive II, 670 W', '35 Nm', '983 Wh', '9 velocità, catena'],
              ['ST2', '7’283', 'CYRO Drive 3, 750 W', '40 Nm', '983 Wh', 'Pinion 6 velocità, cinghia'],
              ['ST3', '8’166', 'SYNO Drive II, 820 W', '44 Nm', '983 Wh', 'Pinion 9 velocità, cinghia'],
              ['ST5', '10’104', 'SYNO Sport, 850 W', '48 Nm', '983 Wh', 'Pinion 9 velocità Smart.Shift'],
              ['ST7', '11’943', 'SYNO Sport II, 940 W', '52 Nm', '1’440 Wh', 'Pinion 12 velocità Smart.Shift'],
            ],
          },
        },
        {
          heading: 'Cosa significa una e-bike veloce per l’acquisto e l’uso quotidiano?',
          paragraphs: [
            'Una Stromer è considerata un ciclomotore. Servono una licenza di condurre (almeno categoria M) e una targa con assicurazione di responsabilità civile, il casco è obbligatorio e le luci devono essere accese anche di giorno. In cambio andate molto più veloci a 45 km/h che con un modello fino a 25 km/h, che si guida senza targa né licenza.',
            'Oltre al prezzo d’acquisto calcolate i costi di targa e assicurazione; dipendono da cantone e assicurazione. Informatevi prima dell’ordine se avete dubbi sull’immatricolazione. Le regole principali sono riassunte nell’articolo consigliato qui sotto.',
          ],
        },
        {
          heading: 'ST1 e ST2: l’ingresso nella guida veloce',
          paragraphs: [
            'La ST1 è il modello d’ingresso a ca. CHF 5’116: CYRO Drive II con 35 Nm, cambio a 9 velocità a catena, portapacchi fino a 22,5 kg e luce diurna; Stromer indica fino a 180 km di autonomia. La ST2 (ca. CHF 7’283) passa a un cambio Pinion a 6 velocità a bassa manutenzione con cinghia e a un motore più potente (CYRO Drive 3, 750 W, 40 Nm).',
          ],
        },
        {
          heading: 'ST3 e ST5: cambio Pinion, ABS e Smart.Shift',
          paragraphs: [
            'La ST3 (ca. CHF 8’166) abbina il SYNO Drive II (820 W, 44 Nm) a un cambio Pinion a 9 velocità, cinghia e freni a quattro pistoncini con ABS; è disponibile nelle taglie M, L e XL. La ST5 (ca. CHF 10’104) aggiunge il SYNO Sport (850 W, 48 Nm), il cambio elettrico Smart.Shift e l’illuminazione Supernova.',
          ],
        },
        {
          heading: 'ST7: il modello di punta con 1’440 Wh',
          paragraphs: [
            'La ST7 costa ca. CHF 11’943 e ha il SYNO Sport II (940 W, 52 Nm), un cambio Pinion a 12 velocità Smart.Shift, ABS, un manubrio integrato e, unica del gruppo, una batteria da 1’440 Wh. Secondo il produttore basta per fino a 260 km.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Stromer giusta',
          paragraphs: [
            'Per prezzo: un modello sotto CHF 6’000 (ST1), due tra CHF 6’000 e CHF 9’000 (ST2, ST3) e due sopra (ST5, ST7). Quattro modelli hanno la cinghia (ST2, ST3, ST5, ST7), la ST1 il cambio a catena. ST1 e ST2 esistono nelle taglie M e L, le altre anche in XL.',
            'Se avete dubbi su taglia del telaio e modello adatti al vostro tragitto, richiedete qui sotto un’offerta gratuita indicando la vostra altezza e il percorso quotidiano.',
          ],
        },
        { heading: 'Ordinare la e-bike Stromer online', paragraphs: [ORDER.it] },
      ],
    },
    faq: {
      de: [
        { q: 'Brauche ich für ein Stromer einen Führerausweis?', a: 'Ja, mindestens Kategorie M. Dazu kommen ein Kontrollschild mit Haftpflichtversicherung, Helmpflicht und Licht auch tagsüber. Fragen Sie vor der Bestellung nach, wenn Sie Zweifel zur Zulassung haben.' },
        { q: 'Was kostet das günstigste Stromer E-Bike?', a: 'Das ST1 kostet ca. CHF 5’116 (umgerechnet aus dem Herstellerpreis in Euro). Das teuerste Modell ist das ST7 mit ca. CHF 11’943.' },
        { q: 'Wie weit kommt man mit einem Stromer?', a: 'Laut Hersteller bis zu 180 km beim ST1 und ST3 (983 Wh) und bis zu 260 km beim ST7 (1’440 Wh). Die reale Reichweite hängt von Unterstützung, Gewicht und Gelände ab.' },
        PAY.de,
      ],
      fr: [
        { q: 'Faut-il un permis pour un Stromer ?', a: 'Oui, au moins la catégorie M. S’y ajoutent une plaque de contrôle avec assurance responsabilité civile, le casque obligatoire et les feux de jour. Renseignez-vous avant la commande en cas de doute sur l’immatriculation.' },
        { q: 'Quel est le Stromer le moins cher ?', a: 'L’ST1 coûte env. CHF 5’116 (converti depuis le prix du fabricant en euros). Le modèle le plus cher est l’ST7 à env. CHF 11’943.' },
        { q: 'Quelle autonomie avec un Stromer ?', a: 'Selon le fabricant, jusqu’à 180 km pour les ST1 et ST3 (983 Wh) et jusqu’à 260 km pour l’ST7 (1’440 Wh). L’autonomie réelle dépend de l’assistance, du poids et du terrain.' },
        PAY.fr,
      ],
      it: [
        { q: 'Serve la licenza per una Stromer?', a: 'Sì, almeno la categoria M. Si aggiungono targa con assicurazione di responsabilità civile, casco obbligatorio e luci anche di giorno. Informatevi prima dell’ordine in caso di dubbi sull’immatricolazione.' },
        { q: 'Qual è la Stromer più economica?', a: 'La ST1 costa ca. CHF 5’116 (convertito dal prezzo del produttore in euro). Il modello più caro è la ST7 a ca. CHF 11’943.' },
        { q: 'Quanta autonomia ha una Stromer?', a: 'Secondo il produttore fino a 180 km per ST1 e ST3 (983 Wh) e fino a 260 km per la ST7 (1’440 Wh). L’autonomia reale dipende da assistenza, peso e terreno.' },
        PAY.it,
      ],
    },
  },
];
