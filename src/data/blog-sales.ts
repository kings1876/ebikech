import type { BlogPost } from './blog';

/**
 * Buying guides written for people who are ready to order: one brand (Scott), one benefit (light weight) and the
 * ordering process itself. Every figure comes from the catalogue (weights are manufacturer data) or from the
 * checkout; no delivery time, warranty or return promise is made because the shop has not published any.
 */
export const SALES_POSTS: BlogPost[] = [
  {
    id: 'scott-e-bike-kaufen',
    slug: { de: 'scott-e-bike-kaufen', fr: 'acheter-velo-electrique-scott', it: 'acquistare-e-bike-scott' },
    title: {
      de: 'Scott E-Bike kaufen: Patron, Strike, Fastlane im Überblick',
      fr: 'Acheter un vélo électrique Scott : Patron, Strike, Axis',
      it: 'Acquistare una e-bike Scott: Patron, Strike, Axis',
    },
    excerpt: {
      de: '45 neue Scott E-Bikes ab Lager: E-Mountainbike, Trekking und Gravel im Vergleich, mit Preisen in CHF, Akku-Daten und Bestellung online.',
      fr: '45 vélos électriques Scott neufs en stock : VTT, trekking et gravel comparés, avec prix en CHF, données de batterie et commande en ligne.',
      it: '45 e-bike Scott nuove a magazzino: mountain bike, trekking e gravel a confronto, con prezzi in CHF, dati batteria e ordine online.',
    },
    publishedDate: '2026-11-06',
    readMinutes: 5,
    related: { brandId: 'scott' },
    body: {
      de: [
        {
          heading: 'Scott E-Bikes bei uns: 45 Modelle, alle neu',
          paragraphs: [
            'Scott baut E-Bikes für drei Einsatzbereiche, und alle drei finden Sie in unserem Katalog als Neuware aus eigenem Lager: E-Mountainbikes (Patron, Strike, Voltage, Aspect eRIDE), Trekking E-Bikes (Axis, Sub, Passage) sowie Gravel E-Bikes und Rennvelos (Fastlane, Solace). Dazu kommt das City E-Bike E-Ville. Insgesamt sind es 45 Modelle zwischen rund CHF 3’000 und CHF 12’000.',
            'Die folgenden Abschnitte zeigen, welche Modellfamilie zu welchem Einsatz passt. Alle Angaben stammen aus den Herstellerdaten; die Preise sind in CHF angegeben, bei einigen Modellen als ca.-Preis.',
          ],
        },
        {
          heading: 'Scott E-Mountainbike: Patron, Strike, Voltage oder Aspect?',
          paragraphs: [
            'Das Patron ist mit 12 Varianten die grösste Familie: ein E-Fully mit Bosch Performance Line CX und 800-Wh-Akku, fast alle mit Carbonrahmen, von CHF 5’999 bis CHF 11’499. Das Strike ist ebenfalls ein E-Fully mit Bosch CX und 800 Wh, aber ab CHF 3’999 der günstigere Einstieg in die Federung hinten.',
            'Das Voltage setzt auf Carbon und einen TQ-Antrieb (HPR60) mit kleinem 360-Wh-Akku. Es ist leichter und fährt sich natürlicher, hat aber weniger Reichweite; die drei Modelle kosten CHF 6’299 bis CHF 9’999. Wer Touren statt Trails fährt, findet im Aspect eRIDE ein E-Hardtail mit Bosch CX und bis zu 800 Wh ab CHF 3’699.',
          ],
        },
        {
          heading: 'Trekking, Gravel und City: die Scott Alltagsmodelle',
          paragraphs: [
            'Die Trekking-Familien sind die günstigsten Scott E-Bikes: Das Sub gibt es in 10 Varianten von CHF 2’999 bis CHF 4’999, das Axis mit Bosch CX und bis zu 800 Wh ab CHF 3’299, das Passage mit 400-Wh-Akku ab CHF 3’299. Für die Stadt gibt es das E-Ville mit Bosch CX und 720 Wh für CHF 4’599.',
            'Sportlich orientierte Fahrerinnen und Fahrer sind beim Fastlane und beim Solace richtig: Beide sind Carbon-Modelle mit TQ-Antrieb. Das Fastlane (CHF 6’999 bis CHF 11’999) wiegt laut Hersteller ab 9,9 kg, das Solace Gravel (CHF 5’999 bis CHF 9’999) fährt mit breiten Reifen auch auf Schotter.',
          ],
        },
        {
          heading: 'So wählen Sie das richtige Scott E-Bike',
          paragraphs: [
            'Beginnen Sie mit dem Einsatz: Pendeln und Reisen mit Gepäck sprechen für Trekking, Singletrails für ein E-Fully, schnelle Asphaltrunden für Fastlane oder Solace. Beim Akku gilt: 800 Wh für lange Touren und viele Höhenmeter, 360 Wh und weniger für ein leichtes, sportliches Fahrgefühl.',
            'Die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge; die Grössentabelle des Herstellers ist der beste Ausgangspunkt. Wenn Sie zwischen zwei Grössen liegen oder einen Tiefeinstieg suchen, schreiben Sie uns über Beratung anfragen, wir melden uns bei Ihnen.',
          ],
        },
        {
          heading: 'Scott E-Bike online bestellen',
          paragraphs: [
            'Legen Sie das gewünschte Modell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH); mit Krypto sparen Sie 10 % auf den Gesamtbetrag. Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Les vélos électriques Scott chez nous : 45 modèles neufs',
          paragraphs: [
            'Scott construit des vélos électriques pour trois usages, et notre catalogue les propose tous en neuf et en stock : VTT électriques (Patron, Strike, Voltage, Aspect eRIDE), vélos de trekking électriques (Axis, Sub, Passage) et vélos gravel électriques ou de route (Fastlane, Solace), plus le vélo de ville électrique E-Ville. Au total, 45 modèles entre environ CHF 3’000 et CHF 12’000.',
            'Les sections suivantes montrent quelle gamme convient à quel usage. Toutes les indications proviennent des données des fabricants ; les prix sont en CHF, certains sous forme de prix approximatif.',
          ],
        },
        {
          heading: 'VTT électrique Scott : Patron, Strike, Voltage ou Aspect ?',
          paragraphs: [
            'Avec 12 variantes, le Patron est la plus grande gamme : un tout-suspendu avec Bosch Performance Line CX et batterie de 800 Wh, presque tous avec cadre carbone, de CHF 5’999 à CHF 11’499. Le Strike est aussi un tout-suspendu Bosch CX de 800 Wh, mais dès CHF 3’999 : l’entrée de gamme avec suspension arrière.',
            'Le Voltage mise sur le carbone et un moteur TQ (HPR60) avec une petite batterie de 360 Wh. Plus léger et plus naturel, il offre moins d’autonomie ; ses trois modèles coûtent de CHF 6’299 à CHF 9’999. Pour les excursions plutôt que les sentiers, l’Aspect eRIDE est un semi-rigide Bosch CX jusqu’à 800 Wh dès CHF 3’699.',
          ],
        },
        {
          heading: 'Trekking, gravel et ville : les modèles Scott du quotidien',
          paragraphs: [
            'Les gammes de trekking sont les Scott les plus abordables : le Sub existe en 10 variantes de CHF 2’999 à CHF 4’999, l’Axis avec Bosch CX et jusqu’à 800 Wh dès CHF 3’299, le Passage avec batterie de 400 Wh dès CHF 3’299. Pour la ville, l’E-Ville offre un Bosch CX et 720 Wh pour CHF 4’599.',
            'Les cyclistes sportifs se tournent vers le Fastlane et le Solace : deux modèles carbone avec moteur TQ. Le Fastlane (CHF 6’999 à CHF 11’999) pèse dès 9,9 kg selon le fabricant ; le Solace Gravel (CHF 5’999 à CHF 9’999) roule aussi sur le gravier grâce à ses pneus larges.',
          ],
        },
        {
          heading: 'Bien choisir son vélo électrique Scott',
          paragraphs: [
            'Commencez par l’usage : trajets quotidiens et voyages avec bagages pour le trekking, sentiers pour un tout-suspendu, sorties rapides sur route pour le Fastlane ou le Solace. Pour la batterie : 800 Wh pour les longues excursions et le dénivelé, 360 Wh ou moins pour des sensations légères et sportives.',
            'La taille du cadre dépend de votre taille et de votre entrejambe ; le tableau du fabricant est le meilleur point de départ. Si vous hésitez entre deux tailles ou cherchez un cadre bas, écrivez-nous via Demander conseil : nous vous répondons.',
          ],
        },
        {
          heading: 'Commander un vélo électrique Scott en ligne',
          paragraphs: [
            'Ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH) ; en crypto, vous économisez 10 % sur le montant total. Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
          ],
        },
      ],
      it: [
        {
          heading: 'Le e-bike Scott da noi: 45 modelli nuovi',
          paragraphs: [
            'Scott costruisce e-bike per tre usi, e il nostro catalogo li offre tutti nuovi e a magazzino: mountain bike elettriche (Patron, Strike, Voltage, Aspect eRIDE), e-bike trekking (Axis, Sub, Passage) e gravel o bici da corsa elettriche (Fastlane, Solace), più la e-bike city E-Ville. In tutto 45 modelli tra circa CHF 3’000 e CHF 12’000.',
            'Le sezioni seguenti mostrano quale famiglia si adatta a quale uso. Tutti i dati provengono dai produttori; i prezzi sono in CHF, per alcuni modelli come prezzo indicativo.',
          ],
        },
        {
          heading: 'Mountain bike elettrica Scott: Patron, Strike, Voltage o Aspect?',
          paragraphs: [
            'Con 12 varianti la Patron è la famiglia più ampia: una full con Bosch Performance Line CX e batteria da 800 Wh, quasi tutte con telaio in carbonio, da CHF 5’999 a CHF 11’499. Anche la Strike è una full Bosch CX da 800 Wh, ma da CHF 3’999: il modo più economico per avere la sospensione posteriore.',
            'La Voltage punta sul carbonio e su un motore TQ (HPR60) con una piccola batteria da 360 Wh. È più leggera e naturale, ma ha meno autonomia; i tre modelli costano da CHF 6’299 a CHF 9’999. Per chi preferisce le escursioni ai sentieri, l’Aspect eRIDE è una hardtail Bosch CX fino a 800 Wh da CHF 3’699.',
          ],
        },
        {
          heading: 'Trekking, gravel e city: i modelli Scott di tutti i giorni',
          paragraphs: [
            'Le famiglie trekking sono le Scott più economiche: la Sub esiste in 10 varianti da CHF 2’999 a CHF 4’999, la Axis con Bosch CX e fino a 800 Wh da CHF 3’299, la Passage con batteria da 400 Wh da CHF 3’299. Per la città c’è la E-Ville con Bosch CX e 720 Wh a CHF 4’599.',
            'Chi cerca prestazioni sceglie Fastlane e Solace: due modelli in carbonio con motore TQ. La Fastlane (da CHF 6’999 a CHF 11’999) pesa da 9,9 kg secondo il produttore; la Solace Gravel (da CHF 5’999 a CHF 9’999) va anche sulla ghiaia grazie ai pneumatici larghi.',
          ],
        },
        {
          heading: 'Come scegliere la e-bike Scott giusta',
          paragraphs: [
            'Partite dall’uso: tragitti quotidiani e viaggi con bagaglio per il trekking, sentieri per una full, giri veloci su asfalto per Fastlane o Solace. Per la batteria: 800 Wh per lunghe escursioni e molto dislivello, 360 Wh o meno per una guida leggera e sportiva.',
            'La taglia del telaio dipende da altezza e lunghezza della gamba; la tabella del produttore è il miglior punto di partenza. Se siete tra due taglie o cercate un telaio basso, scriveteci con Richiedi consulenza: vi risponderemo.',
          ],
        },
        {
          heading: 'Ordinare la e-bike Scott online',
          paragraphs: [
            'Mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta (USDT, BTC, ETH); con le crypto risparmiate il 10% sull’importo totale. Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Sind die Scott E-Bikes neu?', a: 'Ja. Alle E-Bikes in unserem Katalog sind Neuware und stammen aus unserem eigenen Lager.' },
        { q: 'Welches Scott E-Bike passt für Alltag und Pendeln?', a: 'Für den Alltag sind die Trekking-Familien Sub, Axis und Passage gedacht, für die Stadt das E-Ville. Sie haben Bosch-Antriebe und Akkus von 400 bis 800 Wh.' },
        { q: 'Wie bezahle ich ein Scott E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
        { q: 'Kann ich die Rahmengrösse vor der Bestellung klären?', a: 'Ja. Schreiben Sie uns über Beratung anfragen Ihre Körpergrösse und Schrittlänge, wir melden uns bei Ihnen.' },
      ],
      fr: [
        { q: 'Les vélos électriques Scott sont-ils neufs ?', a: 'Oui. Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock.' },
        { q: 'Quel Scott pour le quotidien et les trajets pendulaires ?', a: 'Les gammes de trekking Sub, Axis et Passage sont conçues pour le quotidien, l’E-Ville pour la ville. Elles ont des moteurs Bosch et des batteries de 400 à 800 Wh.' },
        { q: 'Comment payer un vélo électrique Scott ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
        { q: 'Puis-je clarifier la taille du cadre avant de commander ?', a: 'Oui. Écrivez-nous via Demander conseil avec votre taille et votre entrejambe ; nous vous répondons.' },
      ],
      it: [
        { q: 'Le e-bike Scott sono nuove?', a: 'Sì. Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino.' },
        { q: 'Quale Scott scegliere per tutti i giorni e il pendolarismo?', a: 'Le famiglie trekking Sub, Axis e Passage sono pensate per l’uso quotidiano, la E-Ville per la città. Hanno motori Bosch e batterie da 400 a 800 Wh.' },
        { q: 'Come si paga una e-bike Scott?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
        { q: 'Posso chiarire la taglia del telaio prima di ordinare?', a: 'Sì. Scriveteci con Richiedi consulenza la vostra altezza e lunghezza della gamba; vi risponderemo.' },
      ],
    },
  },
  {
    id: 'leichtes-e-bike-kaufen',
    slug: { de: 'leichtes-e-bike-kaufen', fr: 'acheter-velo-electrique-leger', it: 'acquistare-e-bike-leggera' },
    title: {
      de: 'Leichtes E-Bike kaufen: 50 Modelle bis 20 kg im Vergleich',
      fr: 'Acheter un vélo électrique léger : 50 modèles jusqu’à 20 kg',
      it: 'Acquistare una e-bike leggera: 50 modelli fino a 20 kg',
    },
    excerpt: {
      de: 'Ab 9,4 kg und ab CHF 1’700: 50 neue leichte E-Bikes für Gravel, Mountainbike, Trekking und City, mit Gewicht, Akku und Preis im Vergleich.',
      fr: 'Dès 9,4 kg et dès CHF 1’700 : 50 vélos électriques légers neufs pour gravel, VTT, trekking et ville, avec poids, batterie et prix comparés.',
      it: 'Da 9,4 kg e da CHF 1’700: 50 e-bike leggere nuove per gravel, mountain bike, trekking e city, con peso, batteria e prezzo a confronto.',
    },
    publishedDate: '2026-11-06',
    readMinutes: 5,
    related: { maxWeightKg: 20, ctaCollectionId: 'leicht' },
    body: {
      de: [
        {
          heading: 'Was ein leichtes E-Bike ausmacht',
          paragraphs: [
            'Ein leichtes E-Bike wiegt höchstens 20 kg. Das mittlere E-Bike in unserem Katalog wiegt gut 25 kg, die leichtesten Modelle bringen es laut Hersteller auf unter 10 kg. In unserem Sortiment erfüllen 50 Modelle die 20-kg-Grenze; sie kosten von CHF 1’700 bis CHF 13’999, der mittlere Preis liegt bei rund CHF 5’000.',
            'Den Unterschied spüren Sie beim Tragen und Verladen, bei Treppen, im Zug und beim Fahren ohne Motorunterstützung: Ein leichtes Rad lässt sich leichter beschleunigen, lenken und abstellen.',
          ],
        },
        {
          heading: 'Leichte E-Bikes nach Einsatz',
          paragraphs: [
            'Die grösste Auswahl bieten Gravel E-Bikes und Rennvelos mit 28 Modellen. Das Cube Nulane Hybrid C:62 SLX 400X wiegt 14 kg und kostet CHF 3’677; ganz oben stehen das BMC Teammachine 01 AMP ONE mit 9,4 kg und das Scott Fastlane Premium mit 9,9 kg.',
            'Bei den E-Mountainbikes gibt es 10 leichte Modelle, etwa das Cube AMS Hybrid ONE44 C:62 Pro 400X mit 18,1 kg für CHF 3’861. Trekking E-Bikes sind mit 7 Modellen vertreten, zum Beispiel das Cube Kathmandu Hybrid C:62 SLT 400X mit 16,2 kg für CHF 4’596. Und für die Stadt gibt es 5 City E-Bikes, das günstigste ist das Cube Editor Hybrid ONE 360 FE mit 20 kg für CHF 1’700.',
          ],
        },
        {
          heading: 'Die Kompromisse: Akku, Motor und Preis',
          paragraphs: [
            'Der Akku ist eines der schwersten Bauteile. Leichte Modelle haben deshalb kleinere Akkus: In dieser Gruppe liegen sie zwischen 250 und 600 Wh, der mittlere Wert liegt bei 400 Wh. Das reicht für Feierabendrunden und Pendelstrecken; bei sehr langen Touren mit vielen Höhenmetern sollten Sie die Reichweite genau prüfen.',
            'Auch bei den Motoren dominieren leichte Systeme von Fazua, TQ, Bosch und Specialized. Sie unterstützen dezenter, fahren sich dafür natürlicher. Hochwertige Leichtbaukomponenten und Carbonrahmen machen leichte E-Bikes teurer als vergleichbare Standardmodelle.',
          ],
        },
        {
          heading: 'Leichtes E-Bike: Marken im Überblick',
          paragraphs: [
            'Cube stellt mit 20 Modellen die meisten leichten E-Bikes, gefolgt von Scott und Trek mit je 9 und Specialized mit 7. Dazu kommen BMC und Riese & Müller mit je 2 Modellen sowie 1 Kalkhoff. Gewichtsangaben sind Herstellerwerte und können je nach Rahmengrösse und Ausstattung abweichen.',
          ],
        },
        {
          heading: 'Leichtes E-Bike online bestellen',
          paragraphs: [
            'Filtern Sie im Katalog nach Gewicht, legen Sie Ihr Wunschmodell in den Warenkorb und senden Sie die Bestellung ab. Bezahlen können Sie per Banküberweisung oder mit Kryptowährung; mit Krypto sparen Sie 10 %. Alle E-Bikes sind neu und stammen aus unserem eigenen Lager. Offene Fragen zu Grösse oder Ausstattung klären wir gern vorab über Beratung anfragen.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Ce qui fait un vélo électrique léger',
          paragraphs: [
            'On parle de vélo électrique léger jusqu’à 20 kg. Le vélo électrique moyen de notre catalogue pèse un peu plus de 25 kg, les modèles les plus légers descendent sous 10 kg selon le fabricant. Dans notre assortiment, 50 modèles respectent cette limite de 20 kg ; ils coûtent de CHF 1’700 à CHF 13’999, le prix médian étant d’environ CHF 5’000.',
            'Vous sentez la différence en portant et en chargeant le vélo, dans les escaliers, dans le train et en roulant sans assistance : un vélo léger accélère, tourne et se range plus facilement.',
          ],
        },
        {
          heading: 'Les vélos électriques légers selon l’usage',
          paragraphs: [
            'Le plus grand choix est celui des vélos gravel électriques et de route : 28 modèles. Le Cube Nulane Hybrid C:62 SLX 400X pèse 14 kg et coûte CHF 3’677 ; en tête, le BMC Teammachine 01 AMP ONE avec 9,4 kg et le Scott Fastlane Premium avec 9,9 kg.',
            'Côté VTT électriques, 10 modèles sont légers, comme le Cube AMS Hybrid ONE44 C:62 Pro 400X de 18,1 kg à CHF 3’861. Les vélos de trekking électriques comptent 7 modèles, par exemple le Cube Kathmandu Hybrid C:62 SLT 400X de 16,2 kg à CHF 4’596. Pour la ville, 5 vélos de ville électriques, dont le moins cher est le Cube Editor Hybrid ONE 360 FE de 20 kg à CHF 1’700.',
          ],
        },
        {
          heading: 'Les compromis : batterie, moteur et prix',
          paragraphs: [
            'La batterie est l’un des composants les plus lourds. Les modèles légers ont donc des batteries plus petites : dans ce groupe, de 250 à 600 Wh, avec une médiane de 400 Wh. C’est suffisant pour les sorties après le travail et les trajets quotidiens ; pour de très longues excursions avec beaucoup de dénivelé, vérifiez bien l’autonomie.',
            'Côté moteurs, les systèmes légers de Fazua, TQ, Bosch et Specialized dominent. Ils assistent plus discrètement et offrent des sensations plus naturelles. Les composants légers haut de gamme et les cadres carbone rendent ces vélos plus chers que des modèles standard comparables.',
          ],
        },
        {
          heading: 'Vélos électriques légers : les marques',
          paragraphs: [
            'Cube propose le plus de vélos électriques légers avec 20 modèles, suivi de Scott et Trek avec 9 chacun et de Specialized avec 7. S’ajoutent BMC et Riese & Müller avec 2 modèles chacun, ainsi que 1 Kalkhoff. Les poids sont ceux des fabricants et peuvent varier selon la taille du cadre et l’équipement.',
          ],
        },
        {
          heading: 'Commander un vélo électrique léger en ligne',
          paragraphs: [
            'Filtrez le catalogue par poids, ajoutez le modèle souhaité au panier et envoyez la commande. Vous payez par virement bancaire ou en cryptomonnaie ; en crypto, vous économisez 10 %. Tous les vélos sont neufs et viennent de notre propre stock. Pour les questions de taille ou d’équipement, utilisez Demander conseil avant de commander.',
          ],
        },
      ],
      it: [
        {
          heading: 'Che cosa rende leggera una e-bike',
          paragraphs: [
            'Una bicicletta elettrica leggera pesa al massimo 20 kg. La e-bike media del nostro catalogo pesa poco più di 25 kg, i modelli più leggeri scendono sotto i 10 kg secondo il produttore. Nel nostro assortimento 50 modelli rispettano il limite di 20 kg; costano da CHF 1’700 a CHF 13’999, con un prezzo mediano di circa CHF 5’000.',
            'La differenza si sente quando si porta o si carica la bici, sulle scale, in treno e pedalando senza assistenza: una bici leggera accelera, sterza e si parcheggia più facilmente.',
          ],
        },
        {
          heading: 'E-bike leggere in base all’uso',
          paragraphs: [
            'La scelta più ampia è tra le e-bike gravel e da corsa: 28 modelli. La Cube Nulane Hybrid C:62 SLX 400X pesa 14 kg e costa CHF 3’677; in cima ci sono la BMC Teammachine 01 AMP ONE con 9,4 kg e la Scott Fastlane Premium con 9,9 kg.',
            'Tra le mountain bike elettriche ci sono 10 modelli leggeri, come la Cube AMS Hybrid ONE44 C:62 Pro 400X da 18,1 kg a CHF 3’861. Le e-bike trekking sono 7, ad esempio la Cube Kathmandu Hybrid C:62 SLT 400X da 16,2 kg a CHF 4’596. Per la città ci sono 5 e-bike city, la più economica è la Cube Editor Hybrid ONE 360 FE da 20 kg a CHF 1’700.',
          ],
        },
        {
          heading: 'I compromessi: batteria, motore e prezzo',
          paragraphs: [
            'La batteria è uno dei componenti più pesanti. I modelli leggeri hanno quindi batterie più piccole: in questo gruppo tra 250 e 600 Wh, con una mediana di 400 Wh. Bastano per i giri dopo il lavoro e i tragitti quotidiani; per escursioni molto lunghe con molto dislivello verificate bene l’autonomia.',
            'Anche per i motori dominano i sistemi leggeri di Fazua, TQ, Bosch e Specialized. Assistono in modo più discreto e danno una guida più naturale. Componenti leggeri di qualità e telai in carbonio rendono queste e-bike più care dei modelli standard comparabili.',
          ],
        },
        {
          heading: 'E-bike leggere: le marche',
          paragraphs: [
            'Cube offre il maggior numero di e-bike leggere con 20 modelli, seguita da Scott e Trek con 9 ciascuna e da Specialized con 7. Si aggiungono BMC e Riese & Müller con 2 modelli ciascuna e 1 Kalkhoff. I pesi sono quelli dei produttori e possono variare in base alla taglia del telaio e alla dotazione.',
          ],
        },
        {
          heading: 'Ordinare una e-bike leggera online',
          paragraphs: [
            'Filtrate il catalogo per peso, mettete il modello desiderato nel carrello e inviate l’ordine. Potete pagare con bonifico bancario o in criptovaluta; con le crypto risparmiate il 10%. Tutte le e-bike sono nuove e provengono dal nostro magazzino. Per domande su taglia o dotazione usate Richiedi consulenza prima di ordinare.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Wie leicht kann ein E-Bike sein?', a: 'Das leichteste Modell in unserem Katalog, das BMC Teammachine 01 AMP ONE, wiegt laut Hersteller 9,4 kg. Das sind meist sportliche Rennvelo- und Gravel-Modelle mit kleinem Akku.' },
        { q: 'Welche Reichweite hat ein leichtes E-Bike?', a: 'Die Akkus leichter Modelle haben 250 bis 600 Wh. Die tatsächliche Reichweite hängt von Fahrergewicht, Gelände, Unterstützungsstufe und Temperatur ab.' },
        { q: 'Sind die Gewichtsangaben verbindlich?', a: 'Es sind Herstellerangaben. Je nach Rahmengrösse und Ausstattung kann das Gewicht Ihres Modells abweichen.' },
        { q: 'Wie bezahle ich ein leichtes E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
      ],
      fr: [
        { q: 'Quel est le poids minimal d’un vélo électrique ?', a: 'Le modèle le plus léger de notre catalogue, le BMC Teammachine 01 AMP ONE, pèse 9,4 kg selon le fabricant. Ce sont surtout des modèles de route et gravel sportifs à petite batterie.' },
        { q: 'Quelle autonomie pour un vélo électrique léger ?', a: 'Les batteries des modèles légers font de 250 à 600 Wh. L’autonomie réelle dépend du poids du cycliste, du terrain, du niveau d’assistance et de la température.' },
        { q: 'Les poids indiqués sont-ils contractuels ?', a: 'Ce sont les indications du fabricant. Selon la taille du cadre et l’équipement, le poids de votre modèle peut varier.' },
        { q: 'Comment payer un vélo électrique léger ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
      ],
      it: [
        { q: 'Quanto può pesare al minimo una e-bike?', a: 'Il modello più leggero del nostro catalogo, la BMC Teammachine 01 AMP ONE, pesa 9,4 kg secondo il produttore. Sono soprattutto modelli gravel e da corsa sportivi con batteria piccola.' },
        { q: 'Che autonomia ha una e-bike leggera?', a: 'Le batterie dei modelli leggeri vanno da 250 a 600 Wh. L’autonomia reale dipende da peso del ciclista, terreno, livello di assistenza e temperatura.' },
        { q: 'I pesi indicati sono vincolanti?', a: 'Sono dati dei produttori. In base alla taglia del telaio e alla dotazione, il peso del vostro modello può variare.' },
        { q: 'Come si paga una e-bike leggera?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
      ],
    },
  },
  {
    id: 'e-bike-online-kaufen',
    slug: { de: 'e-bike-online-kaufen', fr: 'acheter-velo-electrique-en-ligne', it: 'acquistare-e-bike-online' },
    title: {
      de: 'E-Bike online kaufen: Bestellung, Bezahlung, Krypto-Rabatt',
      fr: 'Acheter un vélo électrique en ligne : commande et paiement',
      it: 'Acquistare una e-bike online: ordine e pagamento',
    },
    excerpt: {
      de: 'So bestellen Sie ein neues E-Bike in der Schweiz in 5 Schritten: Warenkorb, Banküberweisung oder Krypto mit 10 % Rabatt, Zahlung bestätigen.',
      fr: 'Commander un vélo électrique neuf en Suisse en 5 étapes : panier, virement bancaire ou crypto avec 10 % de remise, confirmation du paiement.',
      it: 'Come ordinare una e-bike nuova in Svizzera in 5 passi: carrello, bonifico bancario o crypto con sconto del 10%, conferma del pagamento.',
    },
    publishedDate: '2026-11-06',
    readMinutes: 4,
    related: {},
    body: {
      de: [
        {
          heading: 'E-Bike online kaufen: so funktioniert es bei uns',
          paragraphs: [
            'Alle E-Bikes in unserem Katalog sind neu und stammen aus unserem eigenen Lager. Die Preise stehen in CHF direkt beim Modell, Sie bestellen online über den Warenkorb und müssen dafür keine Filiale besuchen. Wenn Sie vorher Fragen haben, schreiben Sie uns über Beratung anfragen.',
          ],
        },
        {
          heading: 'In 5 Schritten zur Bestellung',
          paragraphs: [
            'Schritt 1: Wählen Sie Ihr Modell. Im Katalog filtern Sie nach Einsatz, Marke, Motor, Akku, Gewicht und Preis. Schritt 2: Legen Sie das Modell in den Warenkorb; pro Bestellung sind bis zu 5 Modelle und je Modell bis zu 3 Stück möglich.',
            'Schritt 3: Geben Sie an der Kasse Name, Telefon, E-Mail und Adresse an, optional Ihre Rahmengrösse oder eine Frage. Schritt 4: Wählen Sie die Zahlungsart. Schritt 5: Nach der Zahlung bestätigen Sie diese; danach melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
          ],
        },
        {
          heading: 'Bezahlen: Banküberweisung oder Krypto mit 10 % Rabatt',
          paragraphs: [
            'Bei Banküberweisung senden wir Ihnen die Kontodaten per E-Mail, sobald wir die Verfügbarkeit bestätigt haben. Nach der Überweisung bestätigen Sie die Zahlung über einen Link und können den Beleg hochladen.',
            'Wenn Sie mit Kryptowährung bezahlen (USDT im Tron-Netzwerk, Bitcoin oder Ethereum), sparen Sie 10 % auf den Gesamtbetrag. Nach dem Absenden gelangen Sie direkt zur Zahlungsseite mit Adresse, Netzwerk, Betrag und QR-Code. Zur Bestätigung senden Sie uns die Transaktions-ID Ihrer Zahlung.',
          ],
        },
        {
          heading: 'Vor dem Kauf prüfen: Einsatz, Grösse, Akku',
          paragraphs: [
            'Überlegen Sie zuerst, wofür Sie das Rad nutzen: Ein Trekking E-Bike eignet sich für Pendeln und Reisen, ein City E-Bike für die Stadt, ein E-Mountainbike für Trails. Der Akku bestimmt die Reichweite; die Rahmengrösse richtet sich nach Körpergrösse und Schrittlänge.',
            'Beachten Sie auch die Geschwindigkeitsklasse: Ein E-Bike 45 gilt in der Schweiz als Motorfahrrad und braucht Führerausweis, Kontrollschild und Helm, ein E-Bike 25 nicht.',
          ],
        },
        {
          heading: 'Offene Fragen vor der Bestellung klären',
          paragraphs: [
            'Wenn Sie unsicher sind bei Grösse, Ausstattung oder Lieferung, schreiben Sie uns über Beratung anfragen. Lieferung und Übergabe besprechen wir nach Ihrer Bestellung individuell mit Ihnen; eine feste Lieferzeit nennen wir hier bewusst nicht.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Acheter un vélo électrique en ligne : comment ça marche chez nous',
          paragraphs: [
            'Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock. Les prix en CHF figurent directement sur chaque modèle ; vous commandez en ligne via le panier, sans avoir à vous rendre en magasin. Si vous avez des questions au préalable, écrivez-nous via Demander conseil.',
          ],
        },
        {
          heading: 'La commande en 5 étapes',
          paragraphs: [
            'Étape 1 : choisissez votre modèle. Dans le catalogue, filtrez par usage, marque, moteur, batterie, poids et prix. Étape 2 : ajoutez le modèle au panier ; une commande peut comporter jusqu’à 5 modèles et 3 exemplaires par modèle.',
            'Étape 3 : indiquez à la caisse votre nom, téléphone, e-mail et adresse, et si vous le souhaitez votre taille de cadre ou une question. Étape 4 : choisissez le mode de paiement. Étape 5 : après le paiement, vous le confirmez ; nous vous contactons ensuite pour les prochaines étapes de remise ou de livraison.',
          ],
        },
        {
          heading: 'Payer : virement bancaire ou crypto avec 10 % de remise',
          paragraphs: [
            'Pour un virement bancaire, nous vous envoyons les coordonnées bancaires par e-mail dès que nous avons confirmé la disponibilité. Après le virement, vous confirmez le paiement via un lien et pouvez envoyer le justificatif.',
            'Si vous payez en cryptomonnaie (USDT sur le réseau Tron, Bitcoin ou Ethereum), vous économisez 10 % sur le montant total. Après l’envoi, vous arrivez directement sur la page de paiement avec l’adresse, le réseau, le montant et le code QR. Pour confirmer, envoyez-nous l’ID de transaction de votre paiement.',
          ],
        },
        {
          heading: 'À vérifier avant l’achat : usage, taille, batterie',
          paragraphs: [
            'Réfléchissez d’abord à l’usage : un vélo de trekking électrique convient aux trajets quotidiens et aux voyages, un vélo de ville électrique à la ville, un VTT électrique aux sentiers. La batterie détermine l’autonomie ; la taille du cadre dépend de votre taille et de votre entrejambe.',
            'Tenez aussi compte de la classe de vitesse : en Suisse, un vélo électrique 45 est considéré comme un cyclomoteur et exige permis de conduire, plaque de contrôle et casque ; pas un e-bike 25.',
          ],
        },
        {
          heading: 'Clarifier vos questions avant de commander',
          paragraphs: [
            'Si vous hésitez sur la taille, l’équipement ou la livraison, écrivez-nous via Demander conseil. Nous convenons avec vous de la livraison et de la remise après votre commande ; nous n’indiquons volontairement pas ici de délai fixe.',
          ],
        },
      ],
      it: [
        {
          heading: 'Acquistare una e-bike online: come funziona da noi',
          paragraphs: [
            'Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino. I prezzi in CHF sono indicati direttamente su ogni modello; ordinate online dal carrello, senza dover andare in negozio. Se avete domande prima, scriveteci con Richiedi consulenza.',
          ],
        },
        {
          heading: 'L’ordine in 5 passi',
          paragraphs: [
            'Passo 1: scegliete il modello. Nel catalogo filtrate per uso, marca, motore, batteria, peso e prezzo. Passo 2: mettete il modello nel carrello; un ordine può contenere fino a 5 modelli e 3 esemplari per modello.',
            'Passo 3: indicate alla cassa nome, telefono, e-mail e indirizzo, se volete anche la taglia del telaio o una domanda. Passo 4: scegliete il metodo di pagamento. Passo 5: dopo il pagamento lo confermate; poi vi contatteremo per i prossimi passi di consegna.',
          ],
        },
        {
          heading: 'Pagare: bonifico bancario o crypto con sconto del 10%',
          paragraphs: [
            'Con il bonifico bancario vi inviamo i dati del conto per e-mail non appena abbiamo confermato la disponibilità. Dopo il bonifico confermate il pagamento tramite un link e potete caricare la ricevuta.',
            'Se pagate in criptovaluta (USDT sulla rete Tron, Bitcoin o Ethereum) risparmiate il 10% sull’importo totale. Dopo l’invio arrivate direttamente alla pagina di pagamento con indirizzo, rete, importo e codice QR. Per la conferma inviateci l’ID della transazione del vostro pagamento.',
          ],
        },
        {
          heading: 'Da verificare prima dell’acquisto: uso, taglia, batteria',
          paragraphs: [
            'Pensate prima all’uso: una e-bike trekking è adatta a pendolari e viaggi, una e-bike city alla città, una mountain bike elettrica ai sentieri. La batteria determina l’autonomia; la taglia del telaio dipende da altezza e lunghezza della gamba.',
            'Considerate anche la classe di velocità: in Svizzera una e-bike 45 è considerata un ciclomotore e richiede licenza di condurre, targa e casco; una e-bike 25 no.',
          ],
        },
        {
          heading: 'Chiarire i dubbi prima di ordinare',
          paragraphs: [
            'Se avete dubbi su taglia, dotazione o consegna, scriveteci con Richiedi consulenza. Consegna e ritiro li concordiamo con voi dopo l’ordine; volutamente non indichiamo qui un termine fisso.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Sind die E-Bikes neu?', a: 'Ja. Alle E-Bikes in unserem Katalog sind Neuware und stammen aus unserem eigenen Lager.' },
        { q: 'Wie bezahle ich ein E-Bike?', a: 'Per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH). Bei Krypto-Zahlung gewähren wir 10 % Rabatt auf den Gesamtbetrag.' },
        { q: 'Wann bekomme ich mein E-Bike?', a: 'Nach Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung. Eine feste Lieferzeit nennen wir nicht, weil sie vom Modell und von Ihrem Wunsch abhängt.' },
        { q: 'Kann ich vor der Bestellung eine Frage stellen?', a: 'Ja. Schreiben Sie uns über Beratung anfragen, wir melden uns bei Ihnen.' },
      ],
      fr: [
        { q: 'Les vélos électriques sont-ils neufs ?', a: 'Oui. Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock.' },
        { q: 'Comment payer un vélo électrique ?', a: 'Par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH). En cas de paiement en crypto, nous accordons 10 % de remise sur le montant total.' },
        { q: 'Quand vais-je recevoir mon vélo électrique ?', a: 'Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison. Nous n’indiquons pas de délai fixe, car il dépend du modèle et de votre souhait.' },
        { q: 'Puis-je poser une question avant de commander ?', a: 'Oui. Écrivez-nous via Demander conseil ; nous vous répondons.' },
      ],
      it: [
        { q: 'Le e-bike sono nuove?', a: 'Sì. Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino.' },
        { q: 'Come si paga una e-bike?', a: 'Con bonifico bancario o in criptovaluta (USDT, BTC, ETH). Per i pagamenti in crypto concediamo il 10% di sconto sull’importo totale.' },
        { q: 'Quando ricevo la mia e-bike?', a: 'Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna. Non indichiamo un termine fisso, perché dipende dal modello e dalle vostre esigenze.' },
        { q: 'Posso fare una domanda prima di ordinare?', a: 'Sì. Scriveteci con Richiedi consulenza; vi risponderemo.' },
      ],
    },
  },
];
