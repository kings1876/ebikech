import { Language } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CONTACT } from '../config/contact';

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
            {pick(lang, 'Über VeloSchweiz', 'À propos de VeloSuisse', 'Chi siamo')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {pick(lang, 'E-Bikes für die Schweiz', 'Vélos électriques pour la Suisse', 'E-bike per la Svizzera')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {pick(
              lang,
              'Neue E-Bikes bekannter Hersteller mit Preisen in Schweizer Franken, technischen Daten und Bildern – auf Deutsch, Französisch und Italienisch.',
              'Des vélos électriques neufs de fabricants reconnus, avec prix en francs suisses, données techniques et photos – en allemand, français et italien.',
              'E-bike nuove di produttori affermati, con prezzi in franchi svizzeri, dati tecnici e foto – in tedesco, francese e italiano.',
            )}
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">{pick(lang, 'Unser Angebot', 'Notre offre', 'La nostra offerta')}</h2>
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

          <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-lg font-black text-slate-900">
              {pick(lang, 'Was Sie hier finden', 'Ce que vous trouverez ici', 'Cosa trovi qui')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <strong className="block text-slate-900 font-bold">
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
                <strong className="block text-slate-900 font-bold">
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
                <strong className="block text-slate-900 font-bold">
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
          {pick(lang, 'Rechtliches', 'Aspects juridiques', 'Note legali')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {pick(lang, 'Impressum & Datenschutz', 'Mentions légales & protection des données', 'Colophon & protezione dei dati')}
        </h1>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
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
          <h2 className="text-base font-bold text-slate-900">
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
          <h2 className="text-base font-bold text-slate-900">
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
