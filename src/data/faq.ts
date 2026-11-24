import { LocalizedString } from '../types';

export interface FaqItem {
  q: LocalizedString;
  a: LocalizedString;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: {
      de: 'Wie läuft die Lieferung ab und wann bezahle ich?',
      fr: 'Comment se déroule la livraison et quand dois-je payer ?',
      it: 'Come funziona la consegna e quando pago?',
    },
    a: {
      de: 'Nach der Bestellung erhalten Sie die Zahlungsangaben per E-Mail (Banküberweisung oder Kryptowährung). Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung. Eine feste Lieferzeit versprechen wir nicht.',
      fr: 'Après la commande, vous recevez les coordonnées de paiement par e-mail (virement bancaire ou cryptomonnaie). Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison. Nous ne promettons pas de délai fixe.',
      it: 'Dopo l’ordine ricevete i dati di pagamento via e-mail (bonifico bancario o criptovaluta). Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna o ritiro. Non promettiamo un termine fisso.',
    },
  },
  {
    q: {
      de: 'Kann ich ein E-Bike zurückgeben?',
      fr: 'Puis-je retourner un vélo électrique ?',
      it: 'Posso restituire una e-bike?',
    },
    a: {
      de: 'Für Käufe im Internet gibt es in der Schweiz kein gesetzliches Rückgaberecht. Eine Rücknahme aus Kulanz ist nur nach vorheriger Absprache möglich. Bei Mängeln gilt die gesetzliche Gewährleistung.',
      fr: 'Pour les achats en ligne, il n’existe en Suisse aucun droit légal de retour. Une reprise par geste commercial n’est possible qu’après accord préalable. En cas de défaut, la garantie légale s’applique.',
      it: 'Per gli acquisti online in Svizzera non esiste un diritto legale di reso. Una ripresa per gesto commerciale è possibile solo previo accordo. In caso di difetti vale la garanzia legale.',
    },
  },
  {
    q: {
      de: 'Welche Garantie habe ich auf ein neues E-Bike?',
      fr: 'Quelle garantie ai-je sur un vélo électrique neuf ?',
      it: 'Che garanzia ho su una e-bike nuova?',
    },
    a: {
      de: 'Auf neue E-Bikes gilt in der Schweiz die gesetzliche Gewährleistung von zwei Jahren ab Übergabe. Eine Herstellergarantie kann dazukommen; ihre Bedingungen unterscheiden sich je nach Marke. Normaler Verschleiss und die natürliche Akkualterung sind keine Mängel.',
      fr: 'Sur les vélos électriques neufs s’applique en Suisse la garantie légale de deux ans à compter de la remise. Une garantie du fabricant peut s’y ajouter ; ses conditions varient selon la marque. L’usure normale et le vieillissement naturel de la batterie ne sont pas des défauts.',
      it: 'Sulle e-bike nuove vale in Svizzera la garanzia legale di due anni dalla consegna. Può aggiungersi una garanzia del produttore; le condizioni variano a seconda del marchio. La normale usura e il naturale invecchiamento della batteria non sono difetti.',
    },
  },
  {
    q: {
      de: 'Was ist der Unterschied zwischen E-Bike 25 und E-Bike 45?',
      fr: 'Quelle est la différence entre e-bike 25 et e-bike 45 ?',
      it: 'Qual è la differenza tra e-bike 25 e e-bike 45?',
    },
    a: {
      de: 'Das E-Bike 25 unterstützt bis 25 km/h und gilt als Fahrrad. Das E-Bike 45 unterstützt bis 45 km/h und wird wie ein Motorfahrrad behandelt: Es braucht Führerausweis, Kontrollschild und Helm. Details finden Sie in unserem Blogartikel dazu. Verbindlich sind die aktuellen Vorschriften.',
      fr: 'L’e-bike 25 assiste jusqu’à 25 km/h et est considéré comme un vélo. L’e-bike 45 assiste jusqu’à 45 km/h et est traité comme un cyclomoteur : permis, plaque et casque sont requis. Vous trouverez les détails dans notre article de blog. Seules les prescriptions en vigueur font foi.',
      it: 'L’e-bike 25 assiste fino a 25 km/h ed è considerata una bicicletta. L’e-bike 45 assiste fino a 45 km/h ed è trattata come un ciclomotore: servono licenza, targa e casco. I dettagli sono nel nostro articolo del blog. Fanno fede le disposizioni vigenti.',
    },
  },
  {
    q: {
      de: 'Brauche ich einen Helm oder einen Führerausweis?',
      fr: 'Ai-je besoin d’un casque ou d’un permis ?',
      it: 'Mi servono il casco o la licenza?',
    },
    a: {
      de: 'Für das E-Bike 25 sind in der Regel weder Führerausweis noch Kontrollschild nötig, und ein Helm ist empfohlen. Für das E-Bike 45 sind ein Führerausweis (mindestens Kategorie M), ein Kontrollschild und das Tragen eines Helms vorgeschrieben.',
      fr: 'Pour l’e-bike 25, ni permis ni plaque ne sont en principe nécessaires et le casque est recommandé. Pour l’e-bike 45, un permis (au minimum catégorie M), une plaque et le port du casque sont obligatoires.',
      it: 'Per l’e-bike 25 di regola non servono né licenza né targa e il casco è raccomandato. Per l’e-bike 45 sono obbligatori una licenza (almeno categoria M), la targa e il casco.',
    },
  },
  {
    q: {
      de: 'Wie weit komme ich mit einer Akkuladung?',
      fr: 'Quelle distance puis-je parcourir avec une charge de batterie ?',
      it: 'Quanta strada posso fare con una carica?',
    },
    a: {
      de: 'Das hängt von der Akkukapazität (Wh), der Unterstützungsstufe, den Höhenmetern, dem Gewicht und der Temperatur ab. Herstellerangaben sind Bestwerte. Als grober Anhaltspunkt gelten 5 bis 12 Wh pro Kilometer. Mehr dazu in unserem Artikel zu Akku und Reichweite.',
      fr: 'Cela dépend de la capacité de la batterie (Wh), du niveau d’assistance, du dénivelé, du poids et de la température. Les chiffres des fabricants sont des valeurs maximales. À titre indicatif, comptez 5 à 12 Wh par kilomètre. Plus de détails dans notre article sur la batterie et l’autonomie.',
      it: 'Dipende dalla capacità della batteria (Wh), dal livello di assistenza, dal dislivello, dal peso e dalla temperatura. I dati dei costruttori sono valori massimi. Come indicazione, si contano da 5 a 12 Wh per chilometro. Più dettagli nel nostro articolo su batteria e autonomia.',
    },
  },
  {
    q: {
      de: 'Wie lange dauert das Laden des Akkus?',
      fr: 'Combien de temps dure la recharge de la batterie ?',
      it: 'Quanto dura la ricarica della batteria?',
    },
    a: {
      de: 'Je nach Akkukapazität und Ladegerät dauert eine Vollladung in der Regel einige Stunden. Die genaue Ladezeit steht in den Angaben des jeweiligen Herstellers.',
      fr: 'Selon la capacité de la batterie et le chargeur, une charge complète prend généralement quelques heures. Le temps exact figure dans les indications du fabricant.',
      it: 'A seconda della capacità della batteria e del caricabatterie, una carica completa richiede in genere alcune ore. Il tempo esatto è indicato dal costruttore.',
    },
  },
  {
    q: {
      de: 'Wie pflege und lagere ich den Akku im Winter?',
      fr: 'Comment entretenir et stocker la batterie en hiver ?',
      it: 'Come curo e conservo la batteria in inverno?',
    },
    a: {
      de: 'Nehmen Sie den Akku nach der Fahrt mit nach drinnen, laden Sie ihn bei Raumtemperatur und lagern Sie ihn bei längerem Stillstand teilgeladen an einem trockenen, kühlen Ort. Die genauen Empfehlungen finden Sie in der Anleitung Ihres Modells.',
      fr: 'Rentrez la batterie après la sortie, rechargez-la à température ambiante et, en cas d’arrêt prolongé, stockez-la partiellement chargée dans un endroit sec et frais. Les recommandations exactes figurent dans le manuel de votre modèle.',
      it: 'Portate la batteria al chiuso dopo l’uscita, caricatela a temperatura ambiente e, in caso di fermo prolungato, conservatela parzialmente carica in un luogo asciutto e fresco. Le indicazioni precise sono nel manuale del vostro modello.',
    },
  },
  {
    q: {
      de: 'Welche Rahmengrösse passt zu mir?',
      fr: 'Quelle taille de cadre me convient ?',
      it: 'Quale taglia di telaio fa per me?',
    },
    a: {
      de: 'Die passende Rahmengrösse richtet sich vor allem nach Ihrer Körpergrösse und Schrittlänge. Die Hersteller geben für jedes Modell eine Grössentabelle an. Wenn möglich, machen Sie vor dem Kauf eine Probefahrt.',
      fr: 'La taille de cadre dépend surtout de votre taille et de votre entrejambe. Les fabricants fournissent un tableau des tailles pour chaque modèle. Si possible, faites un essai avant l’achat.',
      it: 'La taglia del telaio dipende soprattutto dalla vostra altezza e dalla lunghezza della gamba. I costruttori forniscono una tabella delle taglie per ogni modello. Se possibile, fate una prova prima dell’acquisto.',
    },
  },
  {
    q: {
      de: 'Warum steht bei manchen Preisen «ca.» oder «ab»?',
      fr: 'Pourquoi certains prix sont-ils précédés de « env. » ou « dès » ?',
      it: 'Perché alcuni prezzi riportano «ca.» o «da»?',
    },
    a: {
      de: 'Die Preise sind Preisempfehlungen der Hersteller in CHF. «ab» bedeutet, dass der Preis für die günstigste Ausführung eines Modells gilt. «ca.» bedeutet, dass uns kein Schweizer Preis vorlag und die deutsche Preisempfehlung in Franken umgerechnet wurde. Der endgültige Preis kann abweichen.',
      fr: 'Les prix sont les prix conseillés par les fabricants en CHF. « dès » signifie que le prix correspond à la version la moins chère d’un modèle. « env. » signifie qu’aucun prix suisse n’était disponible et que le prix conseillé allemand a été converti en francs. Le prix définitif peut différer.',
      it: 'I prezzi sono i prezzi consigliati dai costruttori in CHF. «da» indica il prezzo della versione più economica di un modello. «ca.» indica che non era disponibile un prezzo svizzero e che il prezzo consigliato tedesco è stato convertito in franchi. Il prezzo definitivo può variare.',
    },
  },
  {
    q: {
      de: 'Gibt es Förderbeiträge für E-Bikes?',
      fr: 'Existe-t-il des subventions pour les vélos électriques ?',
      it: 'Esistono incentivi per le e-bike?',
    },
    a: {
      de: 'Einzelne Kantone, Gemeinden und Energieversorger fördern den Kauf von E-Bikes oder Cargo-Velos. Die Bedingungen unterscheiden sich stark und ändern sich laufend. Informieren Sie sich vor dem Kauf direkt bei Ihrer Gemeinde oder Ihrem Kanton.',
      fr: 'Certains cantons, communes et fournisseurs d’énergie soutiennent l’achat de vélos électriques ou de vélos cargo. Les conditions varient fortement et évoluent en permanence. Renseignez-vous avant l’achat directement auprès de votre commune ou de votre canton.',
      it: 'Alcuni cantoni, comuni e fornitori di energia sostengono l’acquisto di e-bike o cargo bike. Le condizioni variano molto e cambiano di continuo. Prima dell’acquisto informatevi direttamente presso il vostro comune o cantone.',
    },
  },
];
