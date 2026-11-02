import { Language } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CONTACT } from '../config/contact';
import { CRYPTO } from '../config/reply';
import { isCryptoEnabled } from '../lib/order';

interface StaticPagesProps {
  view: 'about' | 'legal';
  lang: Language;
  onNavigate: (path: string) => void;
}

const pick = <T,>(lang: Language, de: T, fr: T, it: T): T => (lang === 'fr' ? fr : lang === 'it' ? it : de);

export function StaticPages({ view, lang }: StaticPagesProps) {
  if (view === 'about') {
    const total = ALL_PRODUCTS.length;
    const brandNames = BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id)).map((b) => b.name);
    const brandList = brandNames.join(', ');

    return (
      <div className="k608">
        <div className="k285">
          <div className="k275">
            {pick(lang, 'Über uns', 'À propos', 'Chi siamo')}
          </div>
          <h1 className="k276">
            {pick(lang, 'E-Bikes für die Schweiz', 'Vélos électriques pour la Suisse', 'E-bike per la Svizzera')}
          </h1>
          <p className="k416">
            {pick(
              lang,
              'Neue E-Bikes bekannter Hersteller mit Preisen in Schweizer Franken, technischen Daten und Bildern – auf Deutsch, Französisch und Italienisch.',
              'Des vélos électriques neufs de fabricants reconnus, avec prix en francs suisses, données techniques et photos – en allemand, français et italien.',
              'E-bike nuove di produttori affermati, con prezzi in franchi svizzeri, dati tecnici e foto – in tedesco, francese e italiano.',
            )}
          </p>
        </div>

        <div className="k609 prose prose-slate">
          <section className="space-y-3">
            <h2 className="k256">{pick(lang, 'Unser Angebot', 'Notre offre', 'La nostra offerta')}</h2>
            <p>
              {pick(
                lang,
                `Aktuell zeigen wir ${total} E-Bikes von ${brandNames.length} Marken: ${brandList}. Modellangaben wie Motor, Akku und Gewicht stammen von den Herstellern.`,
                `Nous présentons actuellement ${total} vélos électriques de ${brandNames.length} marques : ${brandList}. Les caractéristiques comme le moteur, la batterie et le poids proviennent des fabricants.`,
                `Al momento presentiamo ${total} e-bike di ${brandNames.length} marchi: ${brandList}. Le specifiche come motore, batteria e peso provengono dai produttori.`,
              )}
            </p>
            <p>
              {pick(
                lang,
                'In der Schweiz gelten besondere Regeln: Ein E-Bike bis 25 km/h gilt als Leicht-Motorfahrrad, ein schnelles E-Bike bis 45 km/h als Motorfahrrad mit eigenen Anforderungen. Unsere Ratgeber und das Blog erklären die wichtigsten Unterschiede.',
                'En Suisse, des règles particulières s’appliquent : un vélo électrique jusqu’à 25 km/h est un cyclomoteur léger, un vélo rapide jusqu’à 45 km/h un cyclomoteur soumis à des exigences propres. Nos guides et notre blog expliquent les principales différences.',
                'In Svizzera valgono regole particolari: una e-bike fino a 25 km/h è un ciclomotore leggero, una e-bike veloce fino a 45 km/h è un ciclomotore con requisiti propri. Le nostre guide e il blog spiegano le differenze principali.',
              )}
            </p>
          </section>

          <section className="k610">
            <h3 className="k130">
              {pick(lang, 'Was Sie hier finden', 'Ce que vous trouverez ici', 'Cosa trovi qui')}
            </h3>
            <div className="k611">
              <div className="space-y-1">
                <strong className="k612">
                  {pick(lang, '1. Preise in CHF', '1. Prix en CHF', '1. Prezzi in CHF')}
                </strong>
                <p className="text-slate-500">
                  {pick(
                    lang,
                    'Unverbindliche Preisempfehlungen. Wo ein Preis aus Euro umgerechnet wurde, steht «ca.» davor.',
                    'Prix indicatifs. Lorsqu’un prix a été converti depuis l’euro, la mention « env. » le signale.',
                    'Prezzi indicativi. Quando un prezzo è convertito dall’euro, è indicato con «ca.».',
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="k612">
                  {pick(lang, '2. Dreisprachig (DE, FR, IT)', '2. Trilingue (DE, FR, IT)', '2. Trilingue (DE, FR, IT)')}
                </strong>
                <p className="text-slate-500">
                  {pick(
                    lang,
                    'Die Website ist auf Deutsch, Französisch und Italienisch verfügbar.',
                    'Le site est disponible en allemand, en français et en italien.',
                    'Il sito è disponibile in tedesco, francese e italiano.',
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="k612">
                  {pick(lang, '3. Technische Daten', '3. Données techniques', '3. Dati tecnici')}
                </strong>
                <p className="text-slate-500">
                  {pick(
                    lang,
                    'Motor, Akku, Gewicht und Ausstattung auf einen Blick, mit Bildergalerie zu jedem Modell.',
                    'Moteur, batterie, poids et équipement en un coup d’œil, avec galerie photo pour chaque modèle.',
                    'Motore, batteria, peso e dotazione in sintesi, con galleria fotografica per ogni modello.',
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Legal / Impressum View — operator details come from src/config/contact.ts (placeholders until filled in)
  const a = CONTACT.address;
  return (
    <div className="k608">
      <div className="k285">
        <div className="k275">
          {pick(lang, 'Rechtliches', 'Aspects juridiques', 'Note legali')}
        </div>
        <h1 className="k276">
          {pick(lang, 'Impressum & Datenschutz', 'Mentions légales & protection des données', 'Colophon & protezione dei dati')}
        </h1>
      </div>

      <div className="k609 prose prose-slate">
        <section className="space-y-2">
          <h2 className="k365">
            {pick(lang, 'Impressum & Betreiber', 'Éditeur', 'Editore')}
          </h2>
          <p>
            {CONTACT.businessName}
            {a.street && (<><br />{a.street}</>)}
            {(a.zip || a.city) && (<><br />{[a.zip, a.city].filter(Boolean).join(' ')}</>)}
            {a.country && (<><br />{a.country}</>)}
            {CONTACT.email && (<><br />E-Mail: {CONTACT.email}</>)}
            {CONTACT.phone && (<><br />{pick(lang, 'Telefon', 'Téléphone', 'Telefono')}: {CONTACT.phone}</>)}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="k365">
            {pick(lang, 'Datenschutz', 'Protection des données', 'Protezione dei dati')}
          </h2>
          <p>
            {pick(
              lang,
              'Angaben, die Sie über das Kontaktformular senden, verwenden wir ausschliesslich, um Ihre Anfrage zu beantworten. Eine ausführliche Datenschutzerklärung nach dem Schweizer Datenschutzgesetz (DSG) folgt vor dem Start des Online-Shops.',
              'Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Une déclaration de protection des données détaillée selon la loi suisse (LPD) sera publiée avant l’ouverture de la boutique en ligne.',
              'I dati inviati tramite il modulo di contatto vengono utilizzati solo per rispondere alla richiesta. Un’informativa dettagliata secondo la legge svizzera (LPD) sarà pubblicata prima dell’apertura del negozio online.',
            )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="k365">
            {pick(lang, 'Bestellung & Zahlung', 'Commande et paiement', 'Ordine e pagamento')}
          </h2>
          <p>
            {pick(
              lang,
              'Alle E-Bikes sind Neuware aus eigenem Lager. Nach Ihrer Bestellung erhalten Sie die Zahlungsangaben für die Banküberweisung per E-Mail. Bei Fragen zu Bestellung oder Zahlung nutzen Sie bitte die Kontaktseite oder schreiben Sie uns direkt per E-Mail.',
              'Tous les vélos électriques sont neufs et proviennent de notre propre stock. Après votre commande, vous recevez par e-mail les coordonnées bancaires pour le virement. Pour toute question sur la commande ou le paiement, utilisez la page de contact ou écrivez-nous directement par e-mail.',
              'Tutte le e-bike sono nuove e provengono dal nostro magazzino. Dopo l’ordine ricevete via e-mail i dati per il bonifico bancario. Per domande sull’ordine o sul pagamento usate la pagina dei contatti o scriveteci direttamente via e-mail.',
            )}
            {isCryptoEnabled() &&
              ' ' +
                pick(
                  lang,
                  `Alternativ können Sie in Kryptowährung bezahlen (USDT, BTC oder ETH, ${CRYPTO.discountPct} % Rabatt): Direkt nach der Bestellung erscheint die Zahlungsseite mit Adresse, Netzwerk, Betrag und QR-Code.`,
                  `Vous pouvez aussi payer en cryptomonnaie (USDT, BTC ou ETH, ${CRYPTO.discountPct} % de remise) : juste après la commande, la page de paiement affiche l’adresse, le réseau, le montant et un code QR.`,
                  `In alternativa potete pagare in criptovaluta (USDT, BTC o ETH, sconto del ${CRYPTO.discountPct}%): subito dopo l’ordine compare la pagina di pagamento con indirizzo, rete, importo e codice QR.`,
                )}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="k365">
            {pick(lang, 'Haftungsausschluss für Preise & Angaben', 'Clause de non-responsabilité pour les prix et données', 'Disclaimer per prezzi e dati')}
          </h2>
          <p>
            {pick(
              lang,
              'Alle Preise sind unverbindliche Preisempfehlungen in Schweizer Franken (CHF). Mit «ca.» gekennzeichnete Preise wurden aus Euro-Preisempfehlungen umgerechnet. Technische Angaben stammen von den Herstellern; Änderungen und Irrtümer bleiben vorbehalten.',
              'Tous les prix sont des prix indicatifs en francs suisses (CHF). Les prix marqués « env. » ont été convertis à partir de prix recommandés en euros. Les données techniques proviennent des fabricants ; sous réserve de modifications et d’erreurs.',
              'Tutti i prezzi sono prezzi indicativi in franchi svizzeri (CHF). I prezzi contrassegnati con «ca.» sono stati convertiti da prezzi consigliati in euro. I dati tecnici provengono dai produttori; salvo modifiche ed errori.',
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
