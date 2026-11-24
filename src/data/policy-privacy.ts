import type { PolicyPage } from './policies';

/**
 * Privacy policy under the revised Swiss Federal Act on Data Protection (FADP, in force since 1 Sept 2023).
 * Describes what the site really does (checked against the code): no cookies or analytics, cart in localStorage,
 * contact/quote and order forms saved to the database and emailed, hosting on Vercel, product images partly loaded
 * from manufacturer servers without referrer, receipts only attached to emails.
 *
 * {{contact}} prints the operator from src/config/contact.ts. No retention period other than the statutory ten years
 * for business records is promised. If analytics, a newsletter or another processor is added, update this text.
 */
export const PRIVACY_PAGE: PolicyPage = {
  id: 'privacy',
  plain: true,
  slug: { de: 'datenschutz', fr: 'confidentialite', it: 'privacy' },
  nav: { de: 'Datenschutz', fr: 'Confidentialité', it: 'Privacy' },
  title: {
    de: 'Datenschutzerklärung: So behandeln wir Ihre Daten',
    fr: 'Politique de confidentialité : comment nous traitons vos données',
    it: 'Informativa sulla privacy: come trattiamo i vostri dati',
  },
  excerpt: {
    de: 'Datenschutzerklärung nach Schweizer Datenschutzgesetz: welche Daten wir bei Besuch, Anfrage und Bestellung bearbeiten, wer sie erhält und welche Rechte Sie haben.',
    fr: 'Politique de confidentialité selon la loi suisse : quelles données nous traitons lors d’une visite, d’une demande ou d’une commande, qui les reçoit et vos droits.',
    it: 'Informativa sulla privacy secondo la legge svizzera: quali dati trattiamo con visita, richiesta e ordine, chi li riceve e quali diritti avete.',
  },
  sections: {
    de: [
      {
        heading: 'Verantwortliche Stelle',
        paragraphs: [
          'Verantwortlich für die Bearbeitung von Personendaten auf dieser Website ist: {{contact}}. Fragen zum Datenschutz richten Sie bitte an diese E-Mail-Adresse.',
          'Diese Datenschutzerklärung erklärt, welche Personendaten wir beim Besuch der Website, bei Anfragen und bei Bestellungen bearbeiten, wozu wir sie brauchen und welche Rechte Sie haben. Sie richtet sich nach dem Schweizer Datenschutzgesetz (DSG). Soweit die Datenschutz-Grundverordnung der EU (DSGVO) auf Sie anwendbar ist, gelten die Hinweise sinngemäss.',
        ],
      },
      {
        heading: 'Besuch der Website',
        paragraphs: [
          'Beim Aufruf der Website verarbeitet unser Hosting-Anbieter technische Daten, die Ihr Browser automatisch übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser- und Geräteangaben sowie die zuvor besuchte Seite. Wir brauchen diese Daten, um die Website auszuliefern, ihre Sicherheit zu gewährleisten und Störungen zu beheben. Wir nutzen sie nicht, um Sie persönlich zu identifizieren.',
          'Hosting-Anbieter ist Vercel Inc. (USA). Die Daten können dabei auch ausserhalb der Schweiz bearbeitet werden (siehe «Bekanntgabe ins Ausland»).',
        ],
      },
      {
        heading: 'Cookies und lokale Speicherung',
        paragraphs: [
          'Wir setzen keine Cookies für Analyse, Werbung oder Tracking ein und binden keine Analyse- oder Werbedienste von Dritten ein. Deshalb müssen Sie keinen Cookie-Banner bestätigen.',
          'Der Warenkorb wird ausschliesslich in Ihrem Browser gespeichert (Local Storage); er verlässt Ihr Gerät erst, wenn Sie eine Bestellung absenden. Auf der Zahlungsseite speichert Ihr Browser kurzzeitig Bestellnummer, Betrag, Zahlungsart und Ihren Namen (Session Storage). Beides können Sie jederzeit über die Einstellungen Ihres Browsers löschen.',
        ],
      },
      {
        heading: 'Produktbilder von Herstellern',
        paragraphs: [
          'Produktbilder liefern wir überwiegend über unseren eigenen Server aus. Teilweise werden Bilder direkt von den Servern der Hersteller oder ihrer Content-Delivery-Anbieter geladen. Diese erhalten dabei technisch bedingt Ihre IP-Adresse; die Seite, von der aus Sie das Bild laden, geben wir nicht weiter.',
        ],
      },
      {
        heading: 'Kontaktformular, Gratis Offerte und Anfragen',
        paragraphs: ['Wenn Sie uns über das Kontaktformular, das Formular «Gratis Offerte» oder per E-Mail schreiben, bearbeiten wir die Angaben, die Sie uns senden:'],
        bullets: [
          'Name und E-Mail-Adresse (Pflichtangaben)',
          'Telefonnummer (freiwillig)',
          'Ihre Nachricht sowie je nach Formular Betreff, Modell oder weitere Angaben, die Sie machen',
        ],
      },
      {
        heading: 'Wozu wir Anfragen verwenden',
        paragraphs: [
          'Wir verwenden diese Angaben, um Ihre Anfrage zu beantworten und Ihnen ein Angebot zu machen. Die Anfrage wird in unserer Datenbank gespeichert und per E-Mail an uns weitergeleitet. Wir bewahren sie so lange auf, wie es für die Bearbeitung nötig ist, und löschen sie danach, soweit keine gesetzliche Aufbewahrungspflicht besteht. Die Formulare setzen Ihre Einwilligung voraus, die Sie mit dem Kontrollkästchen erteilen.',
        ],
      },
      {
        heading: 'Bestellung und Zahlung',
        paragraphs: ['Für eine Bestellung bearbeiten wir folgende Angaben:'],
        bullets: [
          'Name, E-Mail-Adresse, Telefonnummer und Lieferadresse',
          'die bestellten Modelle, den Betrag, die Bestellnummer und die gewählte Zahlungsart',
          'freiwillige Bemerkungen zur Bestellung',
          'bei der Zahlungsbestätigung die Transaktions-ID oder einen hochgeladenen Zahlungsbeleg (Bild oder PDF) und eine freiwillige Notiz',
        ],
      },
      {
        heading: 'Zweck und Aufbewahrung bei Bestellungen',
        paragraphs: [
          'Wir brauchen diese Daten, um den Kaufvertrag zu erfüllen: Bestellung bestätigen, Zahlungsangaben senden, den Zahlungseingang prüfen und Übergabe oder Lieferung organisieren. Bestellungen werden in unserer Datenbank gespeichert, Bestellbestätigung und Zahlungsbelege gehen per E-Mail. Geschäftsunterlagen müssen wir nach Gesetz in der Regel zehn Jahre aufbewahren (Art. 958f Obligationenrecht).',
          'Bei Banküberweisungen erhalten wir die Zahlungsdaten, die Ihre Bank im Überweisungsauftrag mitgibt. Bei Zahlungen in Kryptowährung (USDT, BTC, ETH) werden Transaktionen in einer öffentlichen Blockchain aufgezeichnet; dort gespeicherte Angaben können nicht gelöscht werden. Wir speichern von Ihnen nur die Transaktions-ID, die Sie uns mitteilen.',
        ],
      },
      {
        heading: 'E-Mail-Kommunikation',
        paragraphs: [
          'Bestellbestätigungen, Zahlungsangaben und Antworten senden wir über einen E-Mail-Dienstleister. E-Mails werden meist verschlüsselt übertragen, können aber unterwegs mitgelesen werden. Senden Sie uns deshalb keine besonders sensiblen Angaben per E-Mail.',
        ],
      },
      {
        heading: 'Empfänger Ihrer Daten',
        paragraphs: ['Wir verkaufen Ihre Daten nicht und nutzen sie nicht für Werbung. Empfänger sind nur die Dienstleister, die wir für den Betrieb brauchen, und nur im nötigen Umfang:'],
        bullets: [
          'Hosting: Vercel Inc.',
          'Datenbankdienst (Redis) für Bestellungen und Anfragen',
          'E-Mail-Versand: unser E-Mail-Dienstleister',
          'Lieferung: Transport- oder Logistikunternehmen, denen wir Name, Adresse und Telefonnummer für die Zustellung mitteilen',
          'Behörden und Gerichte, soweit wir gesetzlich dazu verpflichtet sind',
        ],
      },
      {
        heading: 'Bekanntgabe ins Ausland',
        paragraphs: [
          'Einige unserer Dienstleister, insbesondere der Hosting-Anbieter in den USA, bearbeiten Daten ausserhalb der Schweiz. Soweit ein Land keinen angemessenen Datenschutz bietet, stützen wir die Bekanntgabe auf geeignete Garantien, etwa Standardvertragsklauseln (Art. 16 DSG).',
        ],
      },
      {
        heading: 'Datensicherheit',
        paragraphs: [
          'Die Website wird verschlüsselt (HTTPS) übertragen. Der Zugriff auf Bestellungen und Anfragen ist durch ein Passwort geschützt und auf berechtigte Personen beschränkt. Eine absolute Sicherheit kann im Internet nicht garantiert werden.',
        ],
      },
      {
        heading: 'Ihre Rechte',
        paragraphs: [
          'Sie können Auskunft über Ihre Personendaten verlangen sowie deren Berichtigung, Löschung, die Einschränkung der Bearbeitung oder die Herausgabe in einem gängigen Format. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Schreiben Sie uns dazu an die oben genannte E-Mail-Adresse; wir können einen Identitätsnachweis verlangen. Gesetzliche Aufbewahrungspflichten bleiben vorbehalten.',
          'Sie können sich ausserdem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, edoeb.admin.ch) beschweren.',
        ],
      },
      {
        heading: 'Änderungen',
        paragraphs: [
          'Wir können diese Datenschutzerklärung anpassen, zum Beispiel wenn wir neue Dienste einführen. Es gilt die jeweils auf der Website veröffentlichte Fassung. Stand: November 2026. Zu Bestellung und Lieferung lesen Sie auch {{delivery|Lieferung}}, {{returns|Rückgabe}} und {{warranty|Garantie}}.',
        ],
      },
    ],
    fr: [
      {
        heading: 'Responsable du traitement',
        paragraphs: [
          'Le responsable du traitement des données personnelles sur ce site est : {{contact}}. Adressez vos questions sur la protection des données à cette adresse e-mail.',
          'Cette politique explique quelles données personnelles nous traitons lors de la visite du site, des demandes et des commandes, pourquoi nous en avons besoin et quels sont vos droits. Elle se fonde sur la loi fédérale suisse sur la protection des données (LPD). Dans la mesure où le règlement général de l’UE sur la protection des données (RGPD) s’applique à vous, ces indications valent par analogie.',
        ],
      },
      {
        heading: 'Visite du site',
        paragraphs: [
          'Lors de l’accès au site, notre hébergeur traite des données techniques que votre navigateur transmet automatiquement : adresse IP, date et heure, page consultée, informations sur le navigateur et l’appareil, ainsi que la page visitée auparavant. Nous en avons besoin pour fournir le site, garantir sa sécurité et corriger les pannes. Nous ne les utilisons pas pour vous identifier personnellement.',
          'L’hébergeur est Vercel Inc. (États-Unis). Les données peuvent ainsi être traitées aussi hors de Suisse (voir « Communication à l’étranger »).',
        ],
      },
      {
        heading: 'Cookies et stockage local',
        paragraphs: [
          'Nous n’utilisons pas de cookies d’analyse, de publicité ou de suivi et n’intégrons aucun service d’analyse ou de publicité de tiers. Vous n’avez donc pas de bandeau de cookies à valider.',
          'Le panier est enregistré uniquement dans votre navigateur (Local Storage) ; il ne quitte votre appareil que lorsque vous envoyez une commande. Sur la page de paiement, votre navigateur conserve brièvement le numéro de commande, le montant, le mode de paiement et votre nom (Session Storage). Vous pouvez supprimer les deux à tout moment dans les paramètres de votre navigateur.',
        ],
      },
      {
        heading: 'Images de produits des fabricants',
        paragraphs: [
          'Nous diffusons la plupart des images de produits depuis notre propre serveur. Certaines images sont chargées directement depuis les serveurs des fabricants ou de leurs fournisseurs de réseau de diffusion de contenu. Ceux-ci reçoivent alors, pour des raisons techniques, votre adresse IP ; nous ne leur transmettons pas la page depuis laquelle vous chargez l’image.',
        ],
      },
      {
        heading: 'Formulaire de contact, offre gratuite et demandes',
        paragraphs: ['Lorsque vous nous écrivez via le formulaire de contact, le formulaire « offre gratuite » ou par e-mail, nous traitons les informations que vous nous envoyez :'],
        bullets: [
          'nom et adresse e-mail (obligatoires)',
          'numéro de téléphone (facultatif)',
          'votre message et, selon le formulaire, l’objet, le modèle ou d’autres informations que vous indiquez',
        ],
      },
      {
        heading: 'À quoi servent les demandes',
        paragraphs: [
          'Nous utilisons ces informations pour répondre à votre demande et vous faire une offre. La demande est enregistrée dans notre base de données et nous est transmise par e-mail. Nous la conservons aussi longtemps que nécessaire pour son traitement, puis la supprimons, sauf obligation légale de conservation. Les formulaires supposent votre consentement, que vous donnez en cochant la case.',
        ],
      },
      {
        heading: 'Commande et paiement',
        paragraphs: ['Pour une commande, nous traitons les informations suivantes :'],
        bullets: [
          'nom, adresse e-mail, numéro de téléphone et adresse de livraison',
          'les modèles commandés, le montant, le numéro de commande et le mode de paiement choisi',
          'remarques facultatives sur la commande',
          'lors de la confirmation du paiement, l’ID de transaction ou un justificatif de paiement téléversé (image ou PDF) et une note facultative',
        ],
      },
      {
        heading: 'But et conservation pour les commandes',
        paragraphs: [
          'Nous avons besoin de ces données pour exécuter le contrat de vente : confirmer la commande, envoyer les coordonnées de paiement, vérifier la réception du paiement et organiser la remise ou la livraison. Les commandes sont enregistrées dans notre base de données, la confirmation de commande et les justificatifs passent par e-mail. La loi nous oblige en règle générale à conserver les documents commerciaux dix ans (art. 958f du Code des obligations).',
          'Pour les virements bancaires, nous recevons les données que votre banque indique dans l’ordre de virement. Pour les paiements en cryptomonnaie (USDT, BTC, ETH), les transactions sont enregistrées dans une blockchain publique ; les données qui y figurent ne peuvent pas être supprimées. Nous ne conservons de vous que l’ID de transaction que vous nous communiquez.',
        ],
      },
      {
        heading: 'Communication par e-mail',
        paragraphs: [
          'Nous envoyons les confirmations de commande, les coordonnées de paiement et les réponses via un prestataire d’e-mail. Les e-mails sont le plus souvent transmis de manière chiffrée, mais peuvent être lus en chemin. N’envoyez donc pas d’informations particulièrement sensibles par e-mail.',
        ],
      },
      {
        heading: 'Destinataires de vos données',
        paragraphs: ['Nous ne vendons pas vos données et ne les utilisons pas à des fins publicitaires. Les destinataires sont uniquement les prestataires nécessaires à l’exploitation, et seulement dans la mesure requise :'],
        bullets: [
          'hébergement : Vercel Inc.',
          'service de base de données (Redis) pour les commandes et les demandes',
          'envoi d’e-mails : notre prestataire d’e-mail',
          'livraison : entreprises de transport ou de logistique, auxquelles nous communiquons nom, adresse et téléphone pour la remise',
          'autorités et tribunaux, dans la mesure où la loi nous y oblige',
        ],
      },
      {
        heading: 'Communication à l’étranger',
        paragraphs: [
          'Certains de nos prestataires, notamment l’hébergeur aux États-Unis, traitent des données hors de Suisse. Lorsqu’un pays n’offre pas une protection adéquate, nous fondons la communication sur des garanties appropriées, par exemple des clauses contractuelles types (art. 16 LPD).',
        ],
      },
      {
        heading: 'Sécurité des données',
        paragraphs: [
          'Le site est transmis de manière chiffrée (HTTPS). L’accès aux commandes et aux demandes est protégé par un mot de passe et limité aux personnes autorisées. Une sécurité absolue ne peut pas être garantie sur Internet.',
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: [
          'Vous pouvez demander l’accès à vos données personnelles ainsi que leur rectification, leur effacement, la limitation du traitement ou leur remise dans un format courant. Vous pouvez retirer à tout moment, pour l’avenir, un consentement donné. Écrivez-nous pour cela à l’adresse e-mail indiquée ci-dessus ; nous pouvons demander une preuve d’identité. Les obligations légales de conservation demeurent réservées.',
          'Vous pouvez en outre déposer une plainte auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT, edoeb.admin.ch).',
        ],
      },
      {
        heading: 'Modifications',
        paragraphs: [
          'Nous pouvons adapter cette politique, par exemple lors de l’introduction de nouveaux services. La version publiée sur le site fait foi. État : novembre 2026. Pour la commande et la livraison, lisez aussi {{delivery|Livraison}}, {{returns|Retours}} et {{warranty|Garantie}}.',
        ],
      },
    ],
    it: [
      {
        heading: 'Titolare del trattamento',
        paragraphs: [
          'Il titolare del trattamento dei dati personali su questo sito è: {{contact}}. Rivolgete le domande sulla protezione dei dati a questo indirizzo e-mail.',
          'Questa informativa spiega quali dati personali trattiamo con la visita del sito, le richieste e gli ordini, perché ci servono e quali diritti avete. Si basa sulla legge federale svizzera sulla protezione dei dati (LPD). Nella misura in cui vi si applica il regolamento generale dell’UE sulla protezione dei dati (RGPD), le indicazioni valgono per analogia.',
        ],
      },
      {
        heading: 'Visita del sito',
        paragraphs: [
          'Quando accedete al sito, il nostro fornitore di hosting tratta dati tecnici che il vostro browser trasmette automaticamente: indirizzo IP, data e ora, pagina richiesta, informazioni su browser e dispositivo e la pagina visitata in precedenza. Ci servono per fornire il sito, garantirne la sicurezza e risolvere i guasti. Non li usiamo per identificarvi personalmente.',
          'Il fornitore di hosting è Vercel Inc. (USA). I dati possono quindi essere trattati anche fuori dalla Svizzera (vedere «Comunicazione all’estero»).',
        ],
      },
      {
        heading: 'Cookie e memoria locale',
        paragraphs: [
          'Non usiamo cookie di analisi, pubblicità o tracciamento e non integriamo servizi di analisi o pubblicità di terzi. Non dovete quindi confermare alcun banner dei cookie.',
          'Il carrello è salvato soltanto nel vostro browser (Local Storage); lascia il vostro dispositivo solo quando inviate un ordine. Nella pagina di pagamento il browser conserva brevemente numero d’ordine, importo, metodo di pagamento e il vostro nome (Session Storage). Potete eliminare entrambi in qualsiasi momento dalle impostazioni del browser.',
        ],
      },
      {
        heading: 'Immagini dei prodotti dei produttori',
        paragraphs: [
          'Forniamo la maggior parte delle immagini dei prodotti dal nostro server. In parte le immagini vengono caricate direttamente dai server dei produttori o dei loro fornitori di reti di distribuzione dei contenuti. Questi ricevono, per motivi tecnici, il vostro indirizzo IP; non trasmettiamo la pagina da cui caricate l’immagine.',
        ],
      },
      {
        heading: 'Modulo di contatto, offerta gratuita e richieste',
        paragraphs: ['Quando ci scrivete con il modulo di contatto, il modulo «offerta gratuita» o via e-mail, trattiamo i dati che ci inviate:'],
        bullets: [
          'nome e indirizzo e-mail (obbligatori)',
          'numero di telefono (facoltativo)',
          'il vostro messaggio e, a seconda del modulo, oggetto, modello o altre informazioni che indicate',
        ],
      },
      {
        heading: 'A cosa servono le richieste',
        paragraphs: [
          'Usiamo questi dati per rispondere alla vostra richiesta e farvi un’offerta. La richiesta viene salvata nel nostro database e ci viene inoltrata via e-mail. La conserviamo per il tempo necessario alla gestione e poi la cancelliamo, salvo obblighi legali di conservazione. I moduli presuppongono il vostro consenso, che date con la casella da spuntare.',
        ],
      },
      {
        heading: 'Ordine e pagamento',
        paragraphs: ['Per un ordine trattiamo i seguenti dati:'],
        bullets: [
          'nome, indirizzo e-mail, numero di telefono e indirizzo di consegna',
          'i modelli ordinati, l’importo, il numero d’ordine e il metodo di pagamento scelto',
          'osservazioni facoltative sull’ordine',
          'con la conferma del pagamento, l’ID della transazione o una ricevuta di pagamento caricata (immagine o PDF) e una nota facoltativa',
        ],
      },
      {
        heading: 'Scopo e conservazione per gli ordini',
        paragraphs: [
          'Ci servono questi dati per eseguire il contratto di vendita: confermare l’ordine, inviare i dati di pagamento, verificare il ricevimento del pagamento e organizzare ritiro o consegna. Gli ordini sono salvati nel nostro database, conferma d’ordine e ricevute passano via e-mail. Di regola la legge ci impone di conservare i documenti commerciali per dieci anni (art. 958f del Codice delle obbligazioni).',
          'Per i bonifici bancari riceviamo i dati che la vostra banca indica nell’ordine di bonifico. Per i pagamenti in criptovaluta (USDT, BTC, ETH) le transazioni vengono registrate in una blockchain pubblica; i dati che vi figurano non possono essere cancellati. Di voi conserviamo soltanto l’ID della transazione che ci comunicate.',
        ],
      },
      {
        heading: 'Comunicazione via e-mail',
        paragraphs: [
          'Inviamo conferme d’ordine, dati di pagamento e risposte tramite un fornitore di servizi e-mail. Le e-mail sono per lo più trasmesse in forma cifrata, ma possono essere lette durante il percorso. Non inviateci quindi informazioni particolarmente sensibili via e-mail.',
        ],
      },
      {
        heading: 'Destinatari dei vostri dati',
        paragraphs: ['Non vendiamo i vostri dati e non li usiamo per pubblicità. I destinatari sono solo i fornitori necessari al funzionamento, e solo nella misura richiesta:'],
        bullets: [
          'hosting: Vercel Inc.',
          'servizio di database (Redis) per ordini e richieste',
          'invio delle e-mail: il nostro fornitore di servizi e-mail',
          'consegna: aziende di trasporto o logistica, a cui comunichiamo nome, indirizzo e telefono per la consegna',
          'autorità e tribunali, nella misura in cui la legge ci obbliga',
        ],
      },
      {
        heading: 'Comunicazione all’estero',
        paragraphs: [
          'Alcuni nostri fornitori, in particolare il fornitore di hosting negli USA, trattano dati fuori dalla Svizzera. Se un paese non offre una protezione adeguata, basiamo la comunicazione su garanzie adeguate, ad esempio clausole contrattuali tipo (art. 16 LPD).',
        ],
      },
      {
        heading: 'Sicurezza dei dati',
        paragraphs: [
          'Il sito viene trasmesso in forma cifrata (HTTPS). L’accesso a ordini e richieste è protetto da una password e limitato alle persone autorizzate. Su Internet non si può garantire una sicurezza assoluta.',
        ],
      },
      {
        heading: 'I vostri diritti',
        paragraphs: [
          'Potete chiedere informazioni sui vostri dati personali e chiederne la rettifica, la cancellazione, la limitazione del trattamento o la consegna in un formato comune. Potete revocare in qualsiasi momento, per il futuro, un consenso dato. Scriveteci a questo scopo all’indirizzo e-mail indicato sopra; possiamo chiedere una prova d’identità. Restano riservati gli obblighi legali di conservazione.',
          'Potete inoltre presentare reclamo all’Incaricato federale della protezione dei dati e della trasparenza (IFPDT, edoeb.admin.ch).',
        ],
      },
      {
        heading: 'Modifiche',
        paragraphs: [
          'Possiamo modificare questa informativa, ad esempio se introduciamo nuovi servizi. Vale la versione pubblicata sul sito. Stato: novembre 2026. Per ordine e consegna leggete anche {{delivery|Consegna}}, {{returns|Resi}} e {{warranty|Garanzia}}.',
        ],
      },
    ],
  },
};
