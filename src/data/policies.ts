import { Language, LocalizedString } from '../types';

/**
 * Service pages: delivery, returns, warranty. One shared template (PolicyView), one place to edit the wording.
 *
 * The text states only what the order flow really does (payment first, then handover or delivery is arranged with
 * the customer; see CheckoutView and REPLY.dispatchLine) and what Swiss law provides (no statutory right of
 * withdrawal for online purchases; two-year statutory warranty for new goods, art. 210 CO).
 * It deliberately names no delivery time, no fixed shipping fee and no voluntary return window: the owner has not set
 * any. If one is introduced, change it here and the pages, FAQ and footer follow.
 *
 * Inline links: {{delivery|text}}, {{returns|text}}, {{warranty|text}} point to the other service pages.
 */
export type PolicyId = 'delivery' | 'returns' | 'warranty';

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  /** Numbered steps shown after the paragraphs. */
  steps?: string[];
}

export interface PolicyPage {
  id: PolicyId;
  slug: Record<Language, string>;
  /** Short label for navigation, footer and breadcrumb. */
  nav: LocalizedString;
  /** H1; the part before the colon is the search-result title. */
  title: LocalizedString;
  /** Meta description and intro. */
  excerpt: LocalizedString;
  sections: Record<Language, PolicySection[]>;
  faq: Record<Language, { q: string; a: string }[]>;
}

export const POLICY_PAGES: PolicyPage[] = [
  {
    id: 'delivery',
    slug: { de: 'lieferung', fr: 'livraison', it: 'consegna' },
    nav: { de: 'Lieferung', fr: 'Livraison', it: 'Consegna' },
    title: {
      de: 'Lieferung und Übergabe: So kommt Ihr E-Bike zu Ihnen',
      fr: 'Livraison et remise : comment votre vélo électrique vous parvient',
      it: 'Consegna e ritiro: come arriva la vostra e-bike',
    },
    excerpt: {
      de: 'Lieferung und Übergabe Ihres neuen E-Bikes: Ablauf nach der Bestellung, Zahlung vor der Lieferung, Kosten, Prüfung bei Erhalt und Zulassung.',
      fr: 'Livraison et remise de votre vélo électrique neuf : déroulement après la commande, paiement avant livraison, frais, contrôle à la réception.',
      it: 'Consegna e ritiro della vostra e-bike nuova: svolgimento dopo l’ordine, pagamento prima della consegna, costi, controllo alla ricezione.',
    },
    sections: {
      de: [
        {
          heading: 'So läuft die Lieferung ab',
          paragraphs: [
            'Alle E-Bikes in unserem Katalog sind Neuware aus eigenem Lager. Unser Angebot richtet sich an Kundinnen und Kunden in der Schweiz. Lieferung oder Übergabe besprechen wir persönlich mit Ihnen, weil sie je nach Modell, Rahmengrösse und Wohnort anders organisiert werden müssen.',
            'Der Ablauf in vier Schritten:',
          ],
          steps: [
            'Sie legen das Modell in den Warenkorb und senden die Bestellung ab, oder Sie fordern zuerst eine Gratis Offerte an.',
            'Sie erhalten die Zahlungsangaben per E-Mail und bezahlen per Banküberweisung oder mit Kryptowährung (USDT, BTC, ETH).',
            'Nach dem Zahlungseingang melden wir uns mit den nächsten Schritten zu Übergabe oder Lieferung.',
            'Sie prüfen das E-Bike bei Erhalt.',
          ],
        },
        {
          heading: 'Kosten und Termin',
          paragraphs: [
            'Eine feste Lieferzeit versprechen wir nicht, weil sie vom Modell und von Ihrer Adresse abhängt. Termin und Art der Übergabe oder Lieferung teilen wir Ihnen nach dem Zahlungseingang mit.',
            'Allfällige Lieferkosten nennen wir Ihnen, bevor Sie bezahlen. Sie hängen vom Modell und von der Lieferadresse ab.',
          ],
        },
        {
          heading: 'Prüfen Sie das E-Bike bei Erhalt',
          paragraphs: [
            'Kontrollieren Sie das E-Bike und das Zubehör, etwa Akku und Ladegerät, sofort nach Erhalt auf Vollständigkeit und Transportschäden. Melden Sie Mängel oder Schäden unverzüglich per E-Mail, wenn möglich mit Fotos und Ihrer Bestellnummer. Je früher Sie sich melden, desto einfacher lässt sich der Fall klären.',
            'Wie es danach weitergeht, steht unter {{warranty|Garantie}} und {{returns|Rückgabe}}.',
          ],
        },
        {
          heading: 'Schnelle E-Bikes: Zulassung vor der ersten Fahrt',
          paragraphs: [
            'Ein E-Bike 45 muss vor der ersten Fahrt beim kantonalen Strassenverkehrsamt angemeldet werden; Sie brauchen ein Kontrollschild und eine Haftpflichtversicherung. Fragen Sie vor der Bestellung nach, wenn Sie Zweifel haben, ob das gewünschte Modell zugelassen werden kann.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Déroulement de la livraison',
          paragraphs: [
            'Tous les vélos électriques de notre catalogue sont neufs et viennent de notre propre stock. Notre offre s’adresse aux clients en Suisse. Nous convenons personnellement avec vous de la livraison ou de la remise, car l’organisation diffère selon le modèle, la taille du cadre et le lieu de résidence.',
            'Le déroulement en quatre étapes :',
          ],
          steps: [
            'Vous ajoutez le modèle au panier et envoyez la commande, ou vous demandez d’abord une offre gratuite.',
            'Vous recevez les coordonnées de paiement par e-mail et payez par virement bancaire ou en cryptomonnaie (USDT, BTC, ETH).',
            'Dès réception du paiement, nous vous contactons pour les prochaines étapes de remise ou de livraison.',
            'Vous contrôlez le vélo électrique à la réception.',
          ],
        },
        {
          heading: 'Frais et délai',
          paragraphs: [
            'Nous ne promettons pas de délai de livraison fixe, car il dépend du modèle et de votre adresse. Nous vous communiquons la date et le mode de remise ou de livraison après réception du paiement.',
            'Les éventuels frais de livraison vous sont communiqués avant que vous ne payiez. Ils dépendent du modèle et de l’adresse de livraison.',
          ],
        },
        {
          heading: 'Contrôlez le vélo à la réception',
          paragraphs: [
            'Vérifiez dès la réception que le vélo électrique et ses accessoires, comme la batterie et le chargeur, sont complets et sans dommage de transport. Signalez immédiatement tout défaut ou dommage par e-mail, si possible avec des photos et votre numéro de commande. Plus vous nous écrivez tôt, plus le cas se règle facilement.',
            'La suite est décrite aux pages {{warranty|Garantie}} et {{returns|Retours}}.',
          ],
        },
        {
          heading: 'Vélos rapides : immatriculation avant la première sortie',
          paragraphs: [
            'Un vélo électrique 45 doit être enregistré auprès de l’office cantonal de la circulation avant la première sortie ; il faut une plaque de contrôle et une assurance responsabilité civile. Renseignez-vous avant la commande si vous doutez que le modèle souhaité puisse être immatriculé.',
          ],
        },
      ],
      it: [
        {
          heading: 'Come funziona la consegna',
          paragraphs: [
            'Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino. La nostra offerta è rivolta ai clienti in Svizzera. Concordiamo personalmente con voi consegna o ritiro, perché l’organizzazione varia a seconda del modello, della taglia del telaio e del luogo di residenza.',
            'Lo svolgimento in quattro passi:',
          ],
          steps: [
            'Mettete il modello nel carrello e inviate l’ordine, oppure richiedete prima un’offerta gratuita.',
            'Ricevete i dati di pagamento via e-mail e pagate con bonifico bancario o in criptovaluta (USDT, BTC, ETH).',
            'Dopo il ricevimento del pagamento vi contatteremo per i prossimi passi di consegna o ritiro.',
            'Controllate la e-bike alla ricezione.',
          ],
        },
        {
          heading: 'Costi e termini',
          paragraphs: [
            'Non promettiamo un termine di consegna fisso, perché dipende dal modello e dal vostro indirizzo. Data e modalità di ritiro o consegna ve le comunichiamo dopo il ricevimento del pagamento.',
            'Gli eventuali costi di consegna vi vengono comunicati prima del pagamento. Dipendono dal modello e dall’indirizzo di consegna.',
          ],
        },
        {
          heading: 'Controllate la e-bike alla ricezione',
          paragraphs: [
            'Appena ricevuta, verificate che la e-bike e gli accessori, come batteria e caricabatterie, siano completi e privi di danni da trasporto. Segnalate subito per e-mail difetti o danni, se possibile con foto e numero d’ordine. Prima ci scrivete, più facilmente si risolve il caso.',
            'Il seguito è descritto nelle pagine {{warranty|Garanzia}} e {{returns|Resi}}.',
          ],
        },
        {
          heading: 'E-bike veloci: immatricolazione prima del primo viaggio',
          paragraphs: [
            'Una e-bike 45 deve essere registrata presso l’ufficio cantonale della circolazione prima del primo viaggio; servono una targa e un’assicurazione di responsabilità civile. Informatevi prima dell’ordine se avete dubbi che il modello desiderato possa essere immatricolato.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Wie lange dauert die Lieferung?', a: 'Eine feste Lieferzeit versprechen wir nicht. Nach dem Zahlungseingang nennen wir Ihnen den Termin für Übergabe oder Lieferung.' },
        { q: 'Was kostet die Lieferung?', a: 'Das hängt vom Modell und von der Lieferadresse ab. Allfällige Lieferkosten nennen wir Ihnen, bevor Sie bezahlen.' },
        { q: 'Wann bezahle ich das E-Bike?', a: 'Nach der Bestellung erhalten Sie die Zahlungsangaben per E-Mail: Banküberweisung oder Kryptowährung (USDT, BTC, ETH, 10 % Rabatt). Übergabe oder Lieferung besprechen wir nach dem Zahlungseingang.' },
      ],
      fr: [
        { q: 'Combien de temps dure la livraison ?', a: 'Nous ne promettons pas de délai fixe. Après réception du paiement, nous vous indiquons la date de remise ou de livraison.' },
        { q: 'Combien coûte la livraison ?', a: 'Cela dépend du modèle et de l’adresse de livraison. Les éventuels frais vous sont communiqués avant que vous ne payiez.' },
        { q: 'Quand dois-je payer le vélo électrique ?', a: 'Après la commande, vous recevez les coordonnées de paiement par e-mail : virement bancaire ou cryptomonnaie (USDT, BTC, ETH, 10 % de remise). Nous convenons de la remise ou de la livraison après réception du paiement.' },
      ],
      it: [
        { q: 'Quanto dura la consegna?', a: 'Non promettiamo un termine fisso. Dopo il ricevimento del pagamento vi indichiamo la data di ritiro o consegna.' },
        { q: 'Quanto costa la consegna?', a: 'Dipende dal modello e dall’indirizzo di consegna. Gli eventuali costi vi vengono comunicati prima del pagamento.' },
        { q: 'Quando pago la e-bike?', a: 'Dopo l’ordine ricevete i dati di pagamento via e-mail: bonifico bancario o criptovaluta (USDT, BTC, ETH, sconto del 10%). Concordiamo ritiro o consegna dopo il ricevimento del pagamento.' },
      ],
    },
  },
  {
    id: 'returns',
    slug: { de: 'rueckgabe', fr: 'retours', it: 'resi' },
    nav: { de: 'Rückgabe', fr: 'Retours', it: 'Resi' },
    title: {
      de: 'Rückgabe und Umtausch: Was für Ihr E-Bike gilt',
      fr: 'Retours et échange : ce qui s’applique à votre vélo électrique',
      it: 'Resi e cambio: cosa vale per la vostra e-bike',
    },
    excerpt: {
      de: 'Rückgabe und Umtausch bei E-Bikes aus dem Internet: Rechtslage in der Schweiz, Kulanz nach Absprache, Transportschäden und falsche Lieferung.',
      fr: 'Retours et échange pour les vélos électriques achetés en ligne : situation légale en Suisse, geste commercial sur accord, dommages de transport.',
      it: 'Resi e cambio per le e-bike acquistate online: situazione legale in Svizzera, gesto commerciale previo accordo, danni da trasporto.',
    },
    sections: {
      de: [
        {
          heading: 'Rechtslage in der Schweiz',
          paragraphs: [
            'Für Käufe im Internet gibt es in der Schweiz kein gesetzliches Widerrufs- oder Rückgaberecht. Das ist anders als in der EU. Ein Kauf ist deshalb grundsätzlich verbindlich. Unabhängig davon gilt bei Mängeln die gesetzliche {{warranty|Gewährleistung}}.',
          ],
        },
        {
          heading: 'Vor der Bestellung klären',
          paragraphs: [
            'Prüfen Sie Modell, Rahmengrösse und Ausstattung sorgfältig vor der Bestellung. Wir beraten Sie gerne: Fordern Sie eine Gratis Offerte an und nennen Sie uns Ihre Körpergrösse und Ihren Einsatzzweck. Bei schnellen E-Bikes (45 km/h) klären Sie vorab Führerausweis, Kontrollschild und Versicherung.',
          ],
        },
        {
          heading: 'Rückgabe aus Kulanz',
          paragraphs: [
            'Ob wir ein E-Bike in Ausnahmefällen aus Kulanz zurücknehmen, entscheiden wir im Einzelfall und nur nach vorheriger Absprache per E-Mail. Voraussetzung ist in der Regel, dass das E-Bike neuwertig, unbeschädigt und vollständig ist. Ein Anspruch auf Rücknahme besteht nicht. Senden Sie nie ein E-Bike ohne Absprache zurück.',
          ],
        },
        {
          heading: 'Transportschaden oder falsche Lieferung',
          paragraphs: [
            'Ist ein E-Bike beschädigt angekommen oder entspricht es nicht Ihrer Bestellung, melden Sie das unverzüglich per E-Mail, mit Fotos und Bestellnummer. Wir klären den Fall mit Ihnen. Ihre Rechte aus der gesetzlichen Gewährleistung bleiben davon unberührt; Näheres steht unter {{delivery|Lieferung}}.',
          ],
        },
        {
          heading: 'Rückerstattung',
          paragraphs: [
            'Wenn eine Rückabwicklung vereinbart oder gesetzlich geschuldet ist, erstatten wir den Betrag in der Regel auf das Konto zurück, von dem die Zahlung kam. Bei Zahlungen in Kryptowährung vereinbaren wir die Rückerstattung im Einzelfall.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Situation légale en Suisse',
          paragraphs: [
            'Pour les achats en ligne, il n’existe en Suisse aucun droit légal de révocation ou de retour. C’est différent de l’UE. Un achat est donc en principe ferme. Indépendamment de cela, la {{warranty|garantie}} légale s’applique en cas de défaut.',
          ],
        },
        {
          heading: 'À clarifier avant la commande',
          paragraphs: [
            'Vérifiez soigneusement le modèle, la taille du cadre et l’équipement avant de commander. Nous vous conseillons volontiers : demandez une offre gratuite et indiquez-nous votre taille et l’usage prévu. Pour les vélos rapides (45 km/h), clarifiez d’avance le permis, la plaque de contrôle et l’assurance.',
          ],
        },
        {
          heading: 'Reprise par geste commercial',
          paragraphs: [
            'Nous décidons au cas par cas si nous reprenons exceptionnellement un vélo électrique par geste commercial, et seulement après accord préalable par e-mail. En règle générale, le vélo doit être à l’état neuf, intact et complet. Il n’existe aucun droit à la reprise. N’envoyez jamais un vélo sans accord préalable.',
          ],
        },
        {
          heading: 'Dommage de transport ou livraison erronée',
          paragraphs: [
            'Si un vélo électrique arrive endommagé ou ne correspond pas à votre commande, signalez-le immédiatement par e-mail, avec photos et numéro de commande. Nous réglons le cas avec vous. Vos droits issus de la garantie légale restent intacts ; plus de détails à la page {{delivery|Livraison}}.',
          ],
        },
        {
          heading: 'Remboursement',
          paragraphs: [
            'Lorsqu’une annulation est convenue ou légalement due, nous remboursons en règle générale le montant sur le compte d’où provient le paiement. Pour les paiements en cryptomonnaie, nous convenons du remboursement au cas par cas.',
          ],
        },
      ],
      it: [
        {
          heading: 'Situazione legale in Svizzera',
          paragraphs: [
            'Per gli acquisti online in Svizzera non esiste un diritto legale di recesso o di reso. È diverso dall’UE. Un acquisto è quindi in linea di principio vincolante. Indipendentemente da ciò, in caso di difetti vale la {{warranty|garanzia}} legale.',
          ],
        },
        {
          heading: 'Da chiarire prima dell’ordine',
          paragraphs: [
            'Verificate con attenzione modello, taglia del telaio e dotazione prima di ordinare. Vi consigliamo volentieri: richiedete un’offerta gratuita e indicateci altezza e uso previsto. Per le e-bike veloci (45 km/h) chiarite in anticipo licenza, targa e assicurazione.',
          ],
        },
        {
          heading: 'Ritiro per gesto commerciale',
          paragraphs: [
            'Decidiamo caso per caso se riprendiamo eccezionalmente una e-bike per gesto commerciale, e solo previo accordo scritto via e-mail. Di regola la e-bike deve essere come nuova, integra e completa. Non esiste un diritto alla ripresa. Non rispedite mai una e-bike senza accordo.',
          ],
        },
        {
          heading: 'Danno da trasporto o consegna errata',
          paragraphs: [
            'Se una e-bike arriva danneggiata o non corrisponde al vostro ordine, segnalatelo subito per e-mail, con foto e numero d’ordine. Risolviamo il caso con voi. I vostri diritti derivanti dalla garanzia legale restano impregiudicati; maggiori dettagli alla pagina {{delivery|Consegna}}.',
          ],
        },
        {
          heading: 'Rimborso',
          paragraphs: [
            'Se uno storno è concordato o dovuto per legge, rimborsiamo di regola l’importo sul conto da cui proviene il pagamento. Per i pagamenti in criptovaluta concordiamo il rimborso caso per caso.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Kann ich ein E-Bike zurückgeben?', a: 'Ein gesetzliches Rückgaberecht gibt es bei Käufen im Internet in der Schweiz nicht. Rücknahmen aus Kulanz sind nur nach vorheriger Absprache möglich. Bei Mängeln gilt die gesetzliche Gewährleistung.' },
        { q: 'Was tue ich, wenn das E-Bike beschädigt ankommt?', a: 'Melden Sie den Schaden unverzüglich per E-Mail, mit Fotos und Bestellnummer. Wir klären den Fall mit Ihnen.' },
        { q: 'Wie vermeide ich einen Fehlkauf?', a: 'Fordern Sie vor der Bestellung eine Gratis Offerte an und nennen Sie uns Körpergrösse und Einsatzzweck. So prüfen wir gemeinsam, ob Modell und Rahmengrösse passen.' },
      ],
      fr: [
        { q: 'Puis-je retourner un vélo électrique ?', a: 'Il n’existe pas de droit légal de retour pour les achats en ligne en Suisse. Une reprise par geste commercial n’est possible qu’après accord préalable. En cas de défaut, la garantie légale s’applique.' },
        { q: 'Que faire si le vélo arrive endommagé ?', a: 'Signalez le dommage immédiatement par e-mail, avec photos et numéro de commande. Nous réglons le cas avec vous.' },
        { q: 'Comment éviter un mauvais achat ?', a: 'Demandez une offre gratuite avant de commander et indiquez-nous votre taille et l’usage prévu. Nous vérifions ensemble si le modèle et la taille de cadre conviennent.' },
      ],
      it: [
        { q: 'Posso restituire una e-bike?', a: 'Per gli acquisti online in Svizzera non esiste un diritto legale di reso. Una ripresa per gesto commerciale è possibile solo previo accordo. In caso di difetti vale la garanzia legale.' },
        { q: 'Cosa faccio se la e-bike arriva danneggiata?', a: 'Segnalate subito il danno per e-mail, con foto e numero d’ordine. Risolviamo il caso con voi.' },
        { q: 'Come evito un acquisto sbagliato?', a: 'Richiedete un’offerta gratuita prima di ordinare e indicateci altezza e uso previsto. Verifichiamo insieme se modello e taglia del telaio sono adatti.' },
      ],
    },
  },
  {
    id: 'warranty',
    slug: { de: 'garantie', fr: 'garantie', it: 'garanzia' },
    nav: { de: 'Garantie', fr: 'Garantie', it: 'Garanzia' },
    title: {
      de: 'Garantie und Gewährleistung: 2 Jahre auf neue E-Bikes',
      fr: 'Garantie légale : 2 ans sur les vélos électriques neufs',
      it: 'Garanzia legale: 2 anni sulle e-bike nuove',
    },
    excerpt: {
      de: 'Garantie und Gewährleistung bei neuen E-Bikes: 2 Jahre gesetzliche Gewährleistung in der Schweiz, Mängel melden, Herstellergarantie und Verschleiss.',
      fr: 'Garantie des vélos électriques neufs : 2 ans de garantie légale en Suisse, signaler un défaut, garantie du fabricant et usure normale.',
      it: 'Garanzia delle e-bike nuove: 2 anni di garanzia legale in Svizzera, segnalare un difetto, garanzia del produttore e usura normale.',
    },
    sections: {
      de: [
        {
          heading: 'Gesetzliche Gewährleistung: 2 Jahre',
          paragraphs: [
            'Auf alle neuen E-Bikes gilt in der Schweiz die gesetzliche Gewährleistung für Mängel von zwei Jahren ab Übergabe (Art. 210 Obligationenrecht). Sie deckt Mängel, die schon bei der Übergabe vorhanden waren, etwa Fabrikations- oder Materialfehler an Rahmen, Motor, Akku, Display oder Elektronik. Bei Neuware kann diese Frist nicht verkürzt werden.',
            'Bei einem Mangel haben Sie die gesetzlichen Rechte: Sie können den Kauf rückgängig machen (Wandelung) oder einen Preisnachlass verlangen (Minderung); bei Gattungsware ist auch eine Ersatzlieferung möglich. Wir suchen mit Ihnen zuerst eine praktische Lösung, zum Beispiel Reparatur oder Ersatz.',
          ],
        },
        {
          heading: 'So melden Sie einen Mangel',
          paragraphs: ['Gehen Sie so vor:'],
          steps: [
            'Melden Sie den Mangel sofort nach der Entdeckung per E-Mail, mit Bestellnummer, Beschreibung und Fotos oder Video.',
            'Benutzen Sie das E-Bike nicht weiter, wenn ein Sicherheitsrisiko besteht, zum Beispiel bei defekten Bremsen oder einem beschädigten Akku.',
            'Senden Sie das E-Bike erst nach unserer Rückmeldung zurück; wir sagen Ihnen, wie es zu uns oder zum Hersteller kommt.',
          ],
        },
        {
          heading: 'Herstellergarantie',
          paragraphs: [
            'Viele Hersteller geben zusätzlich eine eigene Garantie, zum Beispiel auf Rahmen oder Akku. Umfang und Dauer unterscheiden sich je nach Marke und Modell und stehen in den Garantiebedingungen des Herstellers. Die Herstellergarantie ergänzt Ihre gesetzlichen Rechte, sie ersetzt sie nicht.',
          ],
        },
        {
          heading: 'Was nicht unter die Gewährleistung fällt',
          paragraphs: [
            'Normale Abnutzung ist kein Mangel: Reifen, Bremsbeläge, Bremsscheiben, Kette, Ritzel, Griffe und Sattelbezug verschleissen durch den Gebrauch. Auch die natürliche Alterung des Akkus ist kein Mangel: Die nutzbare Kapazität sinkt mit der Zeit und den Ladezyklen. Nicht erfasst sind Schäden durch Unfall, falsche Montage oder Pflege, Überlastung sowie eigenmächtige Umbauten oder Tuning.',
            'Lassen Sie Wartung und Reparaturen an Motor, Akku und Elektronik von einer Fachwerkstatt ausführen. Wie Sie bei Transportschäden vorgehen, steht unter {{delivery|Lieferung}}; zur Rücknahme siehe {{returns|Rückgabe}}.',
          ],
        },
      ],
      fr: [
        {
          heading: 'Garantie légale : 2 ans',
          paragraphs: [
            'Sur tous les vélos électriques neufs s’applique en Suisse la garantie légale pour les défauts de deux ans à compter de la remise (art. 210 du Code des obligations). Elle couvre les défauts déjà présents à la remise, par exemple des défauts de fabrication ou de matériau du cadre, du moteur, de la batterie, de l’écran ou de l’électronique. Pour un article neuf, ce délai ne peut pas être raccourci.',
            'En cas de défaut, vous disposez des droits légaux : vous pouvez annuler la vente (résolution) ou demander une réduction du prix ; pour les biens de genre, un remplacement est aussi possible. Nous cherchons d’abord avec vous une solution pratique, par exemple une réparation ou un remplacement.',
          ],
        },
        {
          heading: 'Comment signaler un défaut',
          paragraphs: ['Procédez ainsi :'],
          steps: [
            'Signalez le défaut dès sa découverte par e-mail, avec numéro de commande, description et photos ou vidéo.',
            'N’utilisez plus le vélo en cas de risque pour la sécurité, par exemple si les freins sont défectueux ou la batterie endommagée.',
            'Ne renvoyez le vélo qu’après notre réponse ; nous vous indiquons comment il nous parvient ou parvient au fabricant.',
          ],
        },
        {
          heading: 'Garantie du fabricant',
          paragraphs: [
            'De nombreux fabricants offrent en plus leur propre garantie, par exemple sur le cadre ou la batterie. L’étendue et la durée varient selon la marque et le modèle et figurent dans les conditions de garantie du fabricant. La garantie du fabricant complète vos droits légaux, elle ne les remplace pas.',
          ],
        },
        {
          heading: 'Ce qui n’est pas couvert',
          paragraphs: [
            'L’usure normale n’est pas un défaut : pneus, plaquettes, disques, chaîne, pignons, poignées et revêtement de selle s’usent à l’usage. Le vieillissement naturel de la batterie n’est pas non plus un défaut : la capacité utilisable diminue avec le temps et les cycles de charge. Ne sont pas couverts les dommages dus à un accident, à un mauvais montage ou entretien, à une surcharge, ainsi que les transformations ou le tuning.',
            'Faites effectuer l’entretien et les réparations du moteur, de la batterie et de l’électronique par un atelier spécialisé. Pour les dommages de transport, voir {{delivery|Livraison}} ; pour une reprise, voir {{returns|Retours}}.',
          ],
        },
      ],
      it: [
        {
          heading: 'Garanzia legale: 2 anni',
          paragraphs: [
            'Su tutte le e-bike nuove vale in Svizzera la garanzia legale per i difetti di due anni dalla consegna (art. 210 del Codice delle obbligazioni). Copre i difetti già presenti alla consegna, ad esempio difetti di fabbricazione o di materiale di telaio, motore, batteria, display o elettronica. Per la merce nuova questo termine non può essere abbreviato.',
            'In caso di difetto avete i diritti previsti dalla legge: potete risolvere il contratto o chiedere una riduzione del prezzo; per i beni generici è possibile anche una sostituzione. Cerchiamo prima con voi una soluzione pratica, ad esempio riparazione o sostituzione.',
          ],
        },
        {
          heading: 'Come segnalare un difetto',
          paragraphs: ['Procedete così:'],
          steps: [
            'Segnalate il difetto subito dopo averlo scoperto, per e-mail, con numero d’ordine, descrizione e foto o video.',
            'Non usate più la e-bike se c’è un rischio per la sicurezza, ad esempio con freni difettosi o batteria danneggiata.',
            'Rispedite la e-bike solo dopo la nostra risposta; vi diciamo come farla arrivare a noi o al produttore.',
          ],
        },
        {
          heading: 'Garanzia del produttore',
          paragraphs: [
            'Molti produttori offrono inoltre una propria garanzia, ad esempio su telaio o batteria. Estensione e durata variano a seconda di marchio e modello e sono indicate nelle condizioni di garanzia del produttore. La garanzia del produttore integra i vostri diritti legali, non li sostituisce.',
          ],
        },
        {
          heading: 'Cosa non è coperto',
          paragraphs: [
            'La normale usura non è un difetto: pneumatici, pastiglie, dischi, catena, pignoni, manopole e rivestimento della sella si consumano con l’uso. Anche il naturale invecchiamento della batteria non è un difetto: la capacità utilizzabile diminuisce con il tempo e i cicli di carica. Non sono coperti i danni da incidente, montaggio o manutenzione errati, sovraccarico, modifiche arbitrarie o tuning.',
            'Fate eseguire manutenzione e riparazioni di motore, batteria ed elettronica da un’officina specializzata. Per i danni da trasporto vedere {{delivery|Consegna}}; per la ripresa vedere {{returns|Resi}}.',
          ],
        },
      ],
    },
    faq: {
      de: [
        { q: 'Wie lange ist die Garantie auf ein neues E-Bike?', a: 'Die gesetzliche Gewährleistung beträgt in der Schweiz zwei Jahre ab Übergabe. Dazu kann eine Herstellergarantie kommen, deren Bedingungen je nach Marke unterschiedlich sind.' },
        { q: 'Ist der Akku von der Garantie abgedeckt?', a: 'Ein Defekt, der bei der Übergabe schon vorhanden war, ist ein Mangel. Der natürliche Kapazitätsverlust durch Alter und Ladezyklen gilt nicht als Mangel.' },
        { q: 'Was muss ich tun, wenn mein E-Bike einen Defekt hat?', a: 'Melden Sie den Mangel sofort nach der Entdeckung per E-Mail, mit Bestellnummer, Beschreibung und Fotos. Senden Sie das E-Bike erst nach unserer Rückmeldung zurück.' },
      ],
      fr: [
        { q: 'Quelle est la garantie sur un vélo électrique neuf ?', a: 'La garantie légale est en Suisse de deux ans à compter de la remise. Une garantie du fabricant peut s’y ajouter ; ses conditions varient selon la marque.' },
        { q: 'La batterie est-elle couverte par la garantie ?', a: 'Un défaut déjà présent à la remise est un défaut de la chose. La perte naturelle de capacité due à l’âge et aux cycles de charge n’en est pas un.' },
        { q: 'Que faire si mon vélo électrique a un défaut ?', a: 'Signalez le défaut dès sa découverte par e-mail, avec numéro de commande, description et photos. Ne renvoyez le vélo qu’après notre réponse.' },
      ],
      it: [
        { q: 'Quanto dura la garanzia su una e-bike nuova?', a: 'La garanzia legale in Svizzera è di due anni dalla consegna. Può aggiungersi una garanzia del produttore, con condizioni diverse a seconda del marchio.' },
        { q: 'La batteria è coperta dalla garanzia?', a: 'Un difetto già presente alla consegna è un difetto della cosa. La naturale perdita di capacità dovuta a età e cicli di carica non lo è.' },
        { q: 'Cosa devo fare se la mia e-bike ha un difetto?', a: 'Segnalate il difetto subito dopo averlo scoperto, per e-mail, con numero d’ordine, descrizione e foto. Rispedite la e-bike solo dopo la nostra risposta.' },
      ],
    },
  },
];

export const POLICY_BY_ID = Object.fromEntries(POLICY_PAGES.map((p) => [p.id, p])) as Record<PolicyId, PolicyPage>;
