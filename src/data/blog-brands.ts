import type { BlogPost } from './blog';

/**
 * Brand buying guides for people who already know the brand: Specialized and Kalkhoff.
 * Figures come from the catalogue (weights and battery sizes are manufacturer data); no delivery-time,
 * warranty or return promise is made because the shop has not published any.
 */
export const BRAND_POSTS: BlogPost[] = [
  {
    id: 'specialized-e-bike-kaufen',
    slug: { de: 'specialized-e-bike-kaufen', fr: 'acheter-velo-electrique-specialized', it: 'acquistare-e-bike-specialized' },
    title: {
      de: 'Specialized E-Bike kaufen: Turbo Vado, Levo, Creo im Überblick',
      fr: 'Acheter un vélo électrique Specialized : Vado, Levo, Creo',
      it: 'Acquistare una e-bike Specialized: Vado, Levo, Creo',
    },
    excerpt: {
      de: '45 neue Specialized E-Bikes ab Lager: Turbo Vado, Levo, Creo und Como im Vergleich, mit Preisen in CHF, Akku-Daten und Gratis Offerte.',
      fr: '45 vélos électriques Specialized neufs en stock : Turbo Vado, Levo, Creo et Como comparés, avec prix en CHF, batterie et offre gratuite.',
      it: '45 e-bike Specialized nuove a magazzino: Turbo Vado, Levo, Creo e Como a confronto, con prezzi in CHF, batteria e offerta gratuita.',
    },
    publishedDate: '2026-11-12',
    readMinutes: 5,
    related: { brandId: 'specialized' },
    body: {
      de: [
        {
          heading: 'Specialized E-Bikes bei uns: 45 Modelle, alle neu',
          paragraphs: [
            'Specialized baut seine E-Bikes durchgehend mit eigenem Antrieb, und alle 45 Modelle in unserem Katalog sind Neuware aus eigenem Lager: 24 Trekking E-Bikes (Vado, Turbo Vado, Turbo Tero), 15 E-Mountainbikes (Turbo Levo, Levo), 3 City E-Bikes (Turbo Como) und 3 Gravel E-Bikes (Turbo Creo). Die Preise reichen von CHF 3’299 bis CHF 14’499, der mittlere Preis liegt bei CHF 5’599. Alle Modelle unterstützen bis 25 km/h.',
            'Die Tabelle zeigt, welche Modelllinien zu welchem Einsatz gehören. Gewichte und Akkus sind Herstellerangaben, das Gewicht ist ein Median über die Modelle mit Angabe.',
          ],
          table: {
            caption: 'Specialized E-Bikes nach Kategorie: Modelllinien, Anzahl, Preis, Akku und mittleres Gewicht',
            head: ['Kategorie', 'Modelllinien', 'Modelle', 'Preis (CHF)', 'Akku', 'Gewicht'],
            rows: [
              ['Trekking E-Bike', 'Vado, Turbo Vado, Tero', '24', '3’299–8’399', '520–840 Wh', '28,6 kg'],
              ['E-Mountainbike', 'Turbo Levo, Levo', '15', '5’499–14’499', '600–900 Wh', '24,3 kg'],
              ['Gravel E-Bike', 'Turbo Creo', '3', '4’599–12’999', '320 Wh', '13,8 kg'],
              ['City E-Bike', 'Turbo Como', '3', '3’299–5’199', '710 Wh', '29,1 kg'],
            ],
          },
        },
        {
          heading: 'Turbo Vado und Tero: das Trekking E-Bike für den Alltag',
          paragraphs: [
            'Die Vado-Familie ist mit 24 Modellen die grösste. Der Einstieg ist das Turbo Vado SL 2 4.0 für CHF 3’299: Mit 520 Wh und 18,6 kg ist es ein leichtes Alltagsrad. Die Familie bietet Akkus mit 520, 710 oder 840 Wh, das mittlere Gewicht der Trekking-Modelle liegt bei 28,6 kg; das Vado 3 kostet CHF 5’599 bis CHF 8’399.',
            'Fünf Modelle haben einen Tiefeinstieg, etwa das Turbo Vado SL 2 4.0 Step-Through (CHF 3’299) und das Turbo Tero 5.0 EQ Step-Through (CHF 4’499). Sie eignen sich als Damen-E-Bike ebenso wie für alle, die bequem auf- und absteigen wollen.',
          ],
        },
        {
          heading: 'Turbo Levo: das Specialized E-Mountainbike',
          paragraphs: [
            'Alle 15 E-Mountainbikes sind Fullys. Das Turbo Levo 4 Alloy startet bei CHF 5’499, das S-Works Levo 4 X kostet CHF 14’499. Typisch sind 840 Wh (Spanne 600 bis 900 Wh), das mittlere Gewicht liegt bei 24,3 kg, das leichteste Modell wiegt laut Hersteller 18,8 kg.',
            'Zwischen Alloy-, Comp-, Expert-, Pro- und S-Works-Ausführung unterscheiden sich vor allem Rahmenmaterial, Federung und Schaltung. Vergleichen Sie also nicht nur den Preis, sondern die Ausstattung des konkreten Modells.',
          ],
        },
        {
          heading: 'Turbo Creo und Turbo Como: leicht und komfortabel',
          paragraphs: [
            'Das Turbo Creo ist das Gravel E-Bike der Marke: 3 Modelle mit 320-Wh-Akku und einem mittleren Gewicht von 13,8 kg, von CHF 4’599 bis CHF 12’999. Das S-Works Turbo Creo 2 wiegt 12,9 kg und ist damit das leichteste Specialized im Katalog.',
            'Das Turbo Como ist das City E-Bike mit 710 Wh: 3 Modelle von CHF 3’299 bis CHF 5’199, mit rund 29 kg ein komfortables Stadtrad.',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Specialized E-Bike',
          paragraphs: [
            'Nach Budget verteilt: 7 Modelle kosten unter CHF 4’000, 17 zwischen CHF 4’000 und CHF 5’999, 11 zwischen CHF 6’000 und CHF 8’999 und 10 ab CHF 9’000. Bei der Akkugrösse ist 840 Wh mit 24 von 45 Modellen der Standard, 320 Wh gibt es nur bei den leichten Creo.',
            'Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge; die Tabelle des Herstellers ist der beste Ausgangspunkt. Wenn Sie unsicher sind, fordern Sie unten eine Gratis Offerte an und nennen Sie uns Ihre Körpergrösse.',
          ],
        },
        {
          heading: 'Specialized E-Bike online bestellen',
          paragraphs: [
            'Legen Sie das gewünschte Modell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH); mit Krypto sparen Sie 10 % auf den Gesamtbetrag. Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Specialized chez nous : 45 modèles neufs',
          paragraphs: [
            'Specialized construit ses vélos électriques avec son propre moteur, et les 45 modèles de notre catalogue sont neufs et viennent de notre propre stock : 24 vélos de trekking électriques (Vado, Turbo Vado, Turbo Tero), 15 VTT électriques (Turbo Levo, Levo), 3 vélos de ville électriques (Turbo Como) et 3 vélos gravel électriques (Turbo Creo). Les prix vont de CHF 3’299 à CHF 14’499, le prix médian est de CHF 5’599. Tous les modèles assistent jusqu’à 25 km/h.',
            'Le tableau montre quelle gamme correspond à quel usage. Poids et batteries sont des indications du fabricant ; le poids est une médiane sur les modèles avec indication.',
          ],
          table: {
            caption: 'Vélos électriques Specialized par catégorie : gammes, nombre, prix, batterie et poids médian',
            head: ['Catégorie', 'Gammes', 'Modèles', 'Prix (CHF)', 'Batterie', 'Poids'],
            rows: [
              ['Vélo de trekking électrique', 'Vado, Turbo Vado, Tero', '24', '3’299–8’399', '520–840 Wh', '28,6 kg'],
              ['VTT électrique', 'Turbo Levo, Levo', '15', '5’499–14’499', '600–900 Wh', '24,3 kg'],
              ['Vélo gravel électrique', 'Turbo Creo', '3', '4’599–12’999', '320 Wh', '13,8 kg'],
              ['Vélo de ville électrique', 'Turbo Como', '3', '3’299–5’199', '710 Wh', '29,1 kg'],
            ],
          },
        },
        {
          heading: 'Turbo Vado et Tero : le vélo de trekking électrique du quotidien',
          paragraphs: [
            'La famille Vado est la plus grande avec 24 modèles. L’entrée de gamme est le Turbo Vado SL 2 4.0 à CHF 3’299 : avec 520 Wh et 18,6 kg, c’est un vélo léger pour le quotidien. La famille propose des batteries de 520, 710 ou 840 Wh, le poids médian des modèles de trekking est de 28,6 kg ; le Vado 3 coûte de CHF 5’599 à CHF 8’399.',
            'Cinq modèles ont un cadre bas, par exemple le Turbo Vado SL 2 4.0 Step-Through (CHF 3’299) et le Turbo Tero 5.0 EQ Step-Through (CHF 4’499). Ils conviennent comme vélo électrique femme comme pour toutes celles et ceux qui veulent monter et descendre facilement.',
          ],
        },
        {
          heading: 'Turbo Levo : le VTT électrique Specialized',
          paragraphs: [
            'Les 15 VTT électriques sont tous des tout-suspendus. Le Turbo Levo 4 Alloy démarre à CHF 5’499, le S-Works Levo 4 X coûte CHF 14’499. La batterie typique est de 840 Wh (de 600 à 900 Wh), le poids médian est de 24,3 kg, le modèle le plus léger pèse 18,8 kg selon le fabricant.',
            'Entre les versions Alloy, Comp, Expert, Pro et S-Works, ce sont surtout le matériau du cadre, la suspension et la transmission qui changent. Comparez donc l’équipement du modèle concret, pas seulement le prix.',
          ],
        },
        {
          heading: 'Turbo Creo et Turbo Como : légers et confortables',
          paragraphs: [
            'Le Turbo Creo est le vélo gravel électrique de la marque : 3 modèles avec batterie de 320 Wh et un poids médian de 13,8 kg, de CHF 4’599 à CHF 12’999. Le S-Works Turbo Creo 2 pèse 12,9 kg et c’est le Specialized le plus léger du catalogue.',
            'Le Turbo Como est le vélo de ville avec 710 Wh : 3 modèles de CHF 3’299 à CHF 5’199, avec environ 29 kg un vélo urbain confortable.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Specialized',
          paragraphs: [
            'Par budget : 7 modèles coûtent moins de CHF 4’000, 17 entre CHF 4’000 et CHF 5’999, 11 entre CHF 6’000 et CHF 8’999 et 10 dès CHF 9’000. Pour la batterie, 840 Wh est le standard avec 24 modèles sur 45 ; 320 Wh n’existe que sur les Creo légers.',
            'La taille du cadre dépend de votre taille et de votre entrejambe ; le tableau du fabricant est le meilleur point de départ. Si vous hésitez, demandez ci-dessous une offre gratuite en indiquant votre taille.',
          ],
        },
        {
          heading: 'Commander un vélo électrique Specialized en ligne',
          paragraphs: [
            'Ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH) ; en crypto, vous économisez 10 % sur le montant total. Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
          ],
        },
      ],
      it: [
        {
          heading: 'Le e-bike Specialized da noi: 45 modelli nuovi',
          paragraphs: [
            'Specialized costruisce le sue e-bike con motore proprio, e tutti i 45 modelli del nostro catalogo sono nuovi e provengono dal nostro magazzino: 24 e-bike trekking (Vado, Turbo Vado, Turbo Tero), 15 mountain bike elettriche (Turbo Levo, Levo), 3 e-bike city (Turbo Como) e 3 e-bike gravel (Turbo Creo). I prezzi vanno da CHF 3’299 a CHF 14’499, il prezzo mediano è CHF 5’599. Tutti i modelli assistono fino a 25 km/h.',
            'La tabella mostra quale famiglia corrisponde a quale uso. Pesi e batterie sono dati dei produttori; il peso è una mediana sui modelli con dato.',
          ],
          table: {
            caption: 'E-bike Specialized per categoria: famiglie, numero, prezzo, batteria e peso mediano',
            head: ['Categoria', 'Famiglie', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Peso'],
            rows: [
              ['Bicicletta elettrica trekking', 'Vado, Turbo Vado, Tero', '24', '3’299–8’399', '520–840 Wh', '28,6 kg'],
              ['Mountain bike elettrica', 'Turbo Levo, Levo', '15', '5’499–14’499', '600–900 Wh', '24,3 kg'],
              ['Bicicletta elettrica gravel', 'Turbo Creo', '3', '4’599–12’999', '320 Wh', '13,8 kg'],
              ['Bicicletta elettrica city', 'Turbo Como', '3', '3’299–5’199', '710 Wh', '29,1 kg'],
            ],
          },
        },
        {
          heading: 'Turbo Vado e Tero: la e-bike trekking di tutti i giorni',
          paragraphs: [
            'La famiglia Vado è la più ampia con 24 modelli. L’ingresso è la Turbo Vado SL 2 4.0 a CHF 3’299: con 520 Wh e 18,6 kg è una bici leggera per ogni giorno. La famiglia offre batterie da 520, 710 o 840 Wh, il peso mediano dei modelli trekking è 28,6 kg; la Vado 3 costa da CHF 5’599 a CHF 8’399.',
            'Cinque modelli hanno un telaio basso, ad esempio la Turbo Vado SL 2 4.0 Step-Through (CHF 3’299) e la Turbo Tero 5.0 EQ Step-Through (CHF 4’499). Vanno bene come e-bike donna come per chi vuole salire e scendere comodamente.',
          ],
        },
        {
          heading: 'Turbo Levo: la mountain bike elettrica Specialized',
          paragraphs: [
            'Tutte le 15 mountain bike elettriche sono full. La Turbo Levo 4 Alloy parte da CHF 5’499, la S-Works Levo 4 X costa CHF 14’499. La batteria tipica è da 840 Wh (da 600 a 900 Wh), il peso mediano è 24,3 kg, il modello più leggero pesa 18,8 kg secondo il produttore.',
            'Tra le versioni Alloy, Comp, Expert, Pro e S-Works cambiano soprattutto materiale del telaio, sospensioni e cambio. Confrontate quindi la dotazione del modello concreto, non solo il prezzo.',
          ],
        },
        {
          heading: 'Turbo Creo e Turbo Como: leggere e confortevoli',
          paragraphs: [
            'La Turbo Creo è la e-bike gravel della marca: 3 modelli con batteria da 320 Wh e un peso mediano di 13,8 kg, da CHF 4’599 a CHF 12’999. La S-Works Turbo Creo 2 pesa 12,9 kg ed è la Specialized più leggera del catalogo.',
            'La Turbo Como è la e-bike city con 710 Wh: 3 modelli da CHF 3’299 a CHF 5’199, con circa 29 kg una bici urbana confortevole.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Specialized giusta',
          paragraphs: [
            'Per budget: 7 modelli costano meno di CHF 4’000, 17 tra CHF 4’000 e CHF 5’999, 11 tra CHF 6’000 e CHF 8’999 e 10 da CHF 9’000. Per la batteria, 840 Wh è lo standard con 24 modelli su 45; 320 Wh c’è solo sulle leggere Creo.',
            'La taglia del telaio dipende da altezza e lunghezza della gamba; la tabella del produttore è il miglior punto di partenza. Se avete dubbi, richiedete qui sotto un’offerta gratuita indicando la vostra altezza.',
          ],
        },
        {
          heading: 'Ordinare la e-bike Specialized online',
          paragraphs: [
            'Mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta (USDT, BTC, ETH); con le crypto risparmiate il 10% sull’importo totale. Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Sind die Specialized E-Bikes neu?', a: 'Ja. Alle E-Bikes in unserem Katalog sind Neuware und stammen aus unserem eigenen Lager.' },
        { q: 'Gibt es Specialized E-Bikes mit Tiefeinstieg?', a: 'Ja, 5 Modelle haben einen Tiefeinstieg, zum Beispiel das Turbo Vado SL 2 4.0 Step-Through ab CHF 3’299 und das Turbo Tero 5.0 EQ Step-Through für CHF 4’499.' },
        { q: 'Wie leicht ist das leichteste Specialized E-Bike?', a: 'Das S-Works Turbo Creo 2 wiegt laut Hersteller 12,9 kg und kostet CHF 12’999. Das günstigste leichte Modell ist das Turbo Vado SL 2 4.0 mit 18,6 kg für CHF 3’299.' },
        { q: 'Wie bezahle ich ein Specialized E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Les vélos électriques Specialized sont-ils neufs ?', a: 'Oui. Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock.' },
        { q: 'Existe-t-il des Specialized à cadre bas ?', a: 'Oui, 5 modèles ont un cadre bas, par exemple le Turbo Vado SL 2 4.0 Step-Through dès CHF 3’299 et le Turbo Tero 5.0 EQ Step-Through à CHF 4’499.' },
        { q: 'Quel est le Specialized le plus léger ?', a: 'Le S-Works Turbo Creo 2 pèse 12,9 kg selon le fabricant et coûte CHF 12’999. Le modèle léger le moins cher est le Turbo Vado SL 2 4.0 avec 18,6 kg pour CHF 3’299.' },
        { q: 'Comment payer un vélo électrique Specialized ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Le e-bike Specialized sono nuove?', a: 'Sì. Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino.' },
        { q: 'Ci sono Specialized con telaio basso?', a: 'Sì, 5 modelli hanno un telaio basso, ad esempio la Turbo Vado SL 2 4.0 Step-Through da CHF 3’299 e la Turbo Tero 5.0 EQ Step-Through a CHF 4’499.' },
        { q: 'Qual è la Specialized più leggera?', a: 'La S-Works Turbo Creo 2 pesa 12,9 kg secondo il produttore e costa CHF 12’999. Il modello leggero più economico è la Turbo Vado SL 2 4.0 con 18,6 kg a CHF 3’299.' },
        { q: 'Come si paga una e-bike Specialized?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
  {
    id: 'kalkhoff-e-bike-kaufen',
    slug: { de: 'kalkhoff-e-bike-kaufen', fr: 'acheter-velo-electrique-kalkhoff', it: 'acquistare-e-bike-kalkhoff' },
    title: {
      de: 'Kalkhoff E-Bike kaufen: Image, Endeavour, Entice im Überblick',
      fr: 'Acheter un vélo électrique Kalkhoff : Image, Endeavour, Entice',
      it: 'Acquistare una e-bike Kalkhoff: Image, Endeavour, Entice',
    },
    excerpt: {
      de: '35 neue Kalkhoff E-Bikes ab CHF 2’399: Image, Endeavour und Entice mit Bosch Smart System im Vergleich, mit Preisen in CHF und Gratis Offerte.',
      fr: '35 vélos électriques Kalkhoff neufs dès CHF 2’399 : Image, Endeavour et Entice avec Bosch Smart System comparés, prix en CHF, offre gratuite.',
      it: '35 e-bike Kalkhoff nuove da CHF 2’399: Image, Endeavour ed Entice con Bosch Smart System a confronto, prezzi in CHF e offerta gratuita.',
    },
    publishedDate: '2026-11-12',
    readMinutes: 5,
    related: { brandId: 'kalkhoff' },
    body: {
      de: [
        {
          heading: 'Kalkhoff E-Bikes bei uns: 35 Modelle ab CHF 2’399',
          paragraphs: [
            'Kalkhoff baut E-Bikes für den Alltag, und alle 35 Modelle in unserem Katalog sind Neuware aus eigenem Lager: 21 Trekking E-Bikes (Endeavour, Entice) und 14 City E-Bikes (Image). Alle haben einen Bosch-Antrieb mit Smart System. Die Preise reichen von CHF 2’399 bis CHF 6’599, der mittlere Preis liegt bei CHF 3’999: Kalkhoff hat das niedrigste Preisniveau der grossen Marken im Katalog, 18 Modelle kosten weniger als CHF 4’000.',
            'Die Tabelle zeigt die Modelllinien nach Kategorie. Akku und Gewicht sind Herstellerangaben, das Gewicht ein Median über die Modelle mit Angabe.',
          ],
          table: {
            caption: 'Kalkhoff E-Bikes nach Kategorie: Modelllinien, Anzahl, Preis, Akku und mittleres Gewicht',
            head: ['Kategorie', 'Modelllinien', 'Modelle', 'Preis (CHF)', 'Akku', 'Gewicht'],
            rows: [
              ['Trekking E-Bike', 'Endeavour, Entice', '21', '2’399–6’599', '360–800 Wh', '28,2 kg'],
              ['City E-Bike', 'Image', '14', '2’399–5’499', '360–800 Wh', '29,5 kg'],
            ],
          },
        },
        {
          heading: 'Kalkhoff Image: das City E-Bike',
          paragraphs: [
            'Das Image ist mit 14 Modellen die City-Linie von CHF 2’399 bis CHF 5’499. Der Einstieg ist das Image 1 Move mit 360 Wh und 26,4 kg. Das Image 1 Move und das Image 1 Advance (CHF 2’799) haben einen Tiefeinstieg, ideal als Damen-E-Bike oder für alle, die bequem auf- und absteigen wollen.',
          ],
        },
        {
          heading: 'Endeavour und Entice: das Trekking E-Bike',
          paragraphs: [
            'Das Endeavour hat 12 Modelle von CHF 2’399 bis CHF 4’899 mit 360 bis 800 Wh. Die vier Endeavour L wiegen laut Hersteller 20 bis 24,7 kg bei 400 Wh und kosten CHF 2’999 bis CHF 4’399; das Endeavour L Excite ist mit 20 kg das leichteste Kalkhoff im Katalog.',
            'Das Entice ist die gehobene Linie: 9 Modelle von CHF 3’299 bis CHF 6’599 mit 400 bis 800 Wh und einem mittleren Gewicht von 30,5 kg. Zwei Modelle haben einen wartungsarmen Riemenantrieb: das Entice 3 Excite Belt (CHF 4’299) und das Entice 5+ Advance Belt (CHF 5’799).',
          ],
        },
        {
          heading: 'Bosch Smart System in jedem Kalkhoff',
          paragraphs: [
            'Alle 35 Modelle haben einen Bosch-Antrieb: 12 mit Performance Line CX, 8 mit PX, 7 mit SX, 4 mit Performance Line, 3 mit Hub Line und 1 mit Active Line Plus. Beim Akku sind 800 Wh (12 Modelle) und 600 Wh (8) am häufigsten, dazu 400 Wh (7), 540 Wh (5), 360 Wh (2) und 720 Wh (1).',
          ],
        },
        {
          heading: 'So wählen Sie Ihr Kalkhoff E-Bike',
          paragraphs: [
            'Nach Budget verteilt: 18 Modelle kosten unter CHF 4’000, 16 zwischen CHF 4’000 und CHF 5’999 und eines ab CHF 6’000. Für kurze Stadtwege reichen 360 bis 400 Wh, für lange Pendelstrecken und Touren sind 600 bis 800 Wh sinnvoll.',
            'Tiefeinsteiger gibt es bei Kalkhoff drei: Image 1 Move, Image 1 Advance und Endeavour 1 Move. Wenn Sie bei Grösse oder Modell unsicher sind, fordern Sie unten eine Gratis Offerte an.',
          ],
        },
        {
          heading: 'Kalkhoff E-Bike online bestellen',
          paragraphs: [
            'Legen Sie das gewünschte Modell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH); mit Krypto sparen Sie 10 % auf den Gesamtbetrag. Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Kalkhoff chez nous : 35 modèles dès CHF 2’399',
          paragraphs: [
            'Kalkhoff construit des vélos électriques pour le quotidien, et les 35 modèles de notre catalogue sont neufs et viennent de notre propre stock : 21 vélos de trekking électriques (Endeavour, Entice) et 14 vélos de ville électriques (Image). Tous ont un moteur Bosch avec Smart System. Les prix vont de CHF 2’399 à CHF 6’599, le prix médian est de CHF 3’999 : Kalkhoff a le niveau de prix le plus bas des grandes marques du catalogue, 18 modèles coûtent moins de CHF 4’000.',
            'Le tableau montre les gammes par catégorie. Batterie et poids sont des indications du fabricant, le poids une médiane sur les modèles avec indication.',
          ],
          table: {
            caption: 'Vélos électriques Kalkhoff par catégorie : gammes, nombre, prix, batterie et poids médian',
            head: ['Catégorie', 'Gammes', 'Modèles', 'Prix (CHF)', 'Batterie', 'Poids'],
            rows: [
              ['Vélo de trekking électrique', 'Endeavour, Entice', '21', '2’399–6’599', '360–800 Wh', '28,2 kg'],
              ['Vélo de ville électrique', 'Image', '14', '2’399–5’499', '360–800 Wh', '29,5 kg'],
            ],
          },
        },
        {
          heading: 'Kalkhoff Image : le vélo de ville électrique',
          paragraphs: [
            'L’Image est la gamme ville avec 14 modèles de CHF 2’399 à CHF 5’499. L’entrée de gamme est l’Image 1 Move avec 360 Wh et 26,4 kg. L’Image 1 Move et l’Image 1 Advance (CHF 2’799) ont un cadre bas, idéal comme vélo électrique femme ou pour celles et ceux qui veulent monter et descendre facilement.',
          ],
        },
        {
          heading: 'Endeavour et Entice : le vélo de trekking électrique',
          paragraphs: [
            'L’Endeavour compte 12 modèles de CHF 2’399 à CHF 4’899 avec 360 à 800 Wh. Les quatre Endeavour L pèsent de 20 à 24,7 kg selon le fabricant pour 400 Wh et coûtent de CHF 2’999 à CHF 4’399 ; l’Endeavour L Excite est avec 20 kg le Kalkhoff le plus léger du catalogue.',
            'L’Entice est la gamme haut de gamme : 9 modèles de CHF 3’299 à CHF 6’599 avec 400 à 800 Wh et un poids médian de 30,5 kg. Deux modèles ont une transmission par courroie peu exigeante en entretien : l’Entice 3 Excite Belt (CHF 4’299) et l’Entice 5+ Advance Belt (CHF 5’799).',
          ],
        },
        {
          heading: 'Bosch Smart System dans chaque Kalkhoff',
          paragraphs: [
            'Les 35 modèles ont un moteur Bosch : 12 avec Performance Line CX, 8 avec PX, 7 avec SX, 4 avec Performance Line, 3 avec Hub Line et 1 avec Active Line Plus. Pour la batterie, 800 Wh (12 modèles) et 600 Wh (8) sont les plus fréquents, avec 400 Wh (7), 540 Wh (5), 360 Wh (2) et 720 Wh (1).',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Kalkhoff',
          paragraphs: [
            'Par budget : 18 modèles coûtent moins de CHF 4’000, 16 entre CHF 4’000 et CHF 5’999 et un dès CHF 6’000. Pour les courts trajets en ville, 360 à 400 Wh suffisent ; pour les longs trajets pendulaires et les excursions, 600 à 800 Wh sont judicieux.',
            'Chez Kalkhoff, trois modèles ont un cadre bas : Image 1 Move, Image 1 Advance et Endeavour 1 Move. Si vous hésitez sur la taille ou le modèle, demandez ci-dessous une offre gratuite.',
          ],
        },
        {
          heading: 'Commander un vélo électrique Kalkhoff en ligne',
          paragraphs: [
            'Ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH) ; en crypto, vous économisez 10 % sur le montant total. Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
          ],
        },
      ],
      it: [
        {
          heading: 'Le e-bike Kalkhoff da noi: 35 modelli da CHF 2’399',
          paragraphs: [
            'Kalkhoff costruisce e-bike per l’uso quotidiano, e tutti i 35 modelli del nostro catalogo sono nuovi e provengono dal nostro magazzino: 21 e-bike trekking (Endeavour, Entice) e 14 e-bike city (Image). Tutti hanno un motore Bosch con Smart System. I prezzi vanno da CHF 2’399 a CHF 6’599, il prezzo mediano è CHF 3’999: Kalkhoff ha il livello di prezzo più basso tra le grandi marche del catalogo, 18 modelli costano meno di CHF 4’000.',
            'La tabella mostra le famiglie per categoria. Batteria e peso sono dati dei produttori, il peso una mediana sui modelli con dato.',
          ],
          table: {
            caption: 'E-bike Kalkhoff per categoria: famiglie, numero, prezzo, batteria e peso mediano',
            head: ['Categoria', 'Famiglie', 'Modelli', 'Prezzo (CHF)', 'Batteria', 'Peso'],
            rows: [
              ['Bicicletta elettrica trekking', 'Endeavour, Entice', '21', '2’399–6’599', '360–800 Wh', '28,2 kg'],
              ['Bicicletta elettrica city', 'Image', '14', '2’399–5’499', '360–800 Wh', '29,5 kg'],
            ],
          },
        },
        {
          heading: 'Kalkhoff Image: la e-bike city',
          paragraphs: [
            'La Image è la famiglia city con 14 modelli da CHF 2’399 a CHF 5’499. L’ingresso è la Image 1 Move con 360 Wh e 26,4 kg. La Image 1 Move e la Image 1 Advance (CHF 2’799) hanno un telaio basso, ideale come e-bike donna o per chi vuole salire e scendere comodamente.',
          ],
        },
        {
          heading: 'Endeavour ed Entice: la e-bike trekking',
          paragraphs: [
            'La Endeavour conta 12 modelli da CHF 2’399 a CHF 4’899 con 360–800 Wh. Le quattro Endeavour L pesano da 20 a 24,7 kg secondo il produttore con 400 Wh e costano da CHF 2’999 a CHF 4’399; la Endeavour L Excite è con 20 kg la Kalkhoff più leggera del catalogo.',
            'La Entice è la famiglia di fascia alta: 9 modelli da CHF 3’299 a CHF 6’599 con 400–800 Wh e un peso mediano di 30,5 kg. Due modelli hanno una trasmissione a cinghia che richiede poca manutenzione: la Entice 3 Excite Belt (CHF 4’299) e la Entice 5+ Advance Belt (CHF 5’799).',
          ],
        },
        {
          heading: 'Bosch Smart System in ogni Kalkhoff',
          paragraphs: [
            'Tutti i 35 modelli hanno un motore Bosch: 12 con Performance Line CX, 8 con PX, 7 con SX, 4 con Performance Line, 3 con Hub Line e 1 con Active Line Plus. Per la batteria sono più frequenti 800 Wh (12 modelli) e 600 Wh (8), poi 400 Wh (7), 540 Wh (5), 360 Wh (2) e 720 Wh (1).',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Kalkhoff giusta',
          paragraphs: [
            'Per budget: 18 modelli costano meno di CHF 4’000, 16 tra CHF 4’000 e CHF 5’999 e uno da CHF 6’000. Per i brevi tragitti in città bastano 360–400 Wh, per i lunghi tragitti quotidiani e le escursioni hanno senso 600–800 Wh.',
            'In Kalkhoff tre modelli hanno un telaio basso: Image 1 Move, Image 1 Advance ed Endeavour 1 Move. Se avete dubbi su taglia o modello, richiedete qui sotto un’offerta gratuita.',
          ],
        },
        {
          heading: 'Ordinare la e-bike Kalkhoff online',
          paragraphs: [
            'Mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta (USDT, BTC, ETH); con le crypto risparmiate il 10% sull’importo totale. Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Welchen Antrieb haben Kalkhoff E-Bikes?', a: 'Alle 35 Kalkhoff E-Bikes in unserem Katalog haben einen Bosch-Antrieb mit Smart System, am häufigsten die Performance Line CX (12 Modelle).' },
        { q: 'Was kostet ein Kalkhoff E-Bike?', a: 'Die Preise reichen von CHF 2’399 bis CHF 6’599, der mittlere Preis liegt bei CHF 3’999. 18 Modelle kosten weniger als CHF 4’000.' },
        { q: 'Gibt es leichte Kalkhoff E-Bikes?', a: 'Ja, die Endeavour L wiegen laut Hersteller 20 bis 24,7 kg. Das Endeavour L Excite wiegt 20 kg und kostet CHF 4’399, das Endeavour L Move 21 kg für CHF 3’599.' },
        { q: 'Wie bezahle ich ein Kalkhoff E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Quel moteur ont les vélos électriques Kalkhoff ?', a: 'Les 35 vélos électriques Kalkhoff de notre catalogue ont un moteur Bosch avec Smart System, le plus fréquent étant le Performance Line CX (12 modèles).' },
        { q: 'Combien coûte un vélo électrique Kalkhoff ?', a: 'Les prix vont de CHF 2’399 à CHF 6’599, le prix médian est de CHF 3’999. 18 modèles coûtent moins de CHF 4’000.' },
        { q: 'Existe-t-il des Kalkhoff légers ?', a: 'Oui, les Endeavour L pèsent de 20 à 24,7 kg selon le fabricant. L’Endeavour L Excite pèse 20 kg et coûte CHF 4’399, l’Endeavour L Move 21 kg pour CHF 3’599.' },
        { q: 'Comment payer un vélo électrique Kalkhoff ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Che motore hanno le e-bike Kalkhoff?', a: 'Tutte le 35 e-bike Kalkhoff del nostro catalogo hanno un motore Bosch con Smart System, il più frequente è il Performance Line CX (12 modelli).' },
        { q: 'Quanto costa una e-bike Kalkhoff?', a: 'I prezzi vanno da CHF 2’399 a CHF 6’599, il prezzo mediano è CHF 3’999. 18 modelli costano meno di CHF 4’000.' },
        { q: 'Ci sono Kalkhoff leggere?', a: 'Sì, le Endeavour L pesano da 20 a 24,7 kg secondo il produttore. La Endeavour L Excite pesa 20 kg e costa CHF 4’399, la Endeavour L Move 21 kg a CHF 3’599.' },
        { q: 'Come si paga una e-bike Kalkhoff?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
];
