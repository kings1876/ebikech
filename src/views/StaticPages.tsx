import { Language } from '../types';

interface StaticPagesProps {
  view: 'about' | 'legal';
  lang: Language;
  onNavigate: (path: string) => void;
}

export function StaticPages({ view, lang }: StaticPagesProps) {
  if (view === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
            {lang === 'fr' ? 'À propos de VeloSuisse' : lang === 'it' ? 'Chi siamo' : 'Über VeloSchweiz'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'fr'
              ? 'Le portail indépendant suisse du vélo électrique'
              : lang === 'it'
              ? 'Il portale indipendente svizzero per e-bike'
              : 'Das unabhängige Schweizer E-Bike Portal'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'fr'
              ? 'Créé pour offrir aux cyclistes suisses un comparateur transparent, trilingue et 100% indépendant des fabricants.'
              : lang === 'it'
              ? 'Creato per offrire ai ciclisti svizzeri un confronto trasparente, trilingue e indipendente dai marchi.'
              : 'Gegründet, um Schweizer Velofahrerinnen und Velofahrern eine transparente, dreisprachige und herstellerunabhängige Marktübersicht zu bieten.'}
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'fr' ? 'Notre Mission' : lang === 'it' ? 'La nostra missione' : 'Unsere Mission'}
            </h2>
            <p>
              {lang === 'fr'
                ? 'La Suisse est un pays leader du vélo électrique : avec plus de 500’000 e-bikes en circulation, sa densité est l’une des plus élevées d’Europe. Toutefois, la législation fédérale (différenciation vélo 25 km/h vs cyclomoteur rapide 45 km/h selon l’OFROU), le relief alpin et les subventions communales posent des défis uniques aux acheteurs.'
                : lang === 'it'
                ? 'La Svizzera è una terra di e-bike: con oltre 500’000 biciclette elettriche immatricolate, la densità è tra le più alte d’Europa. Tuttavia, le norme federali (25 km/h vs 45 km/h USTRA), la topografia alpina e i sussidi comunali richiedono informazioni affidabili e precise.'
                : 'Die Schweiz ist ein E-Bike Land: Mit über 500’000 immatrikulierten und registrierten Elektrovelos ist die Dichte so hoch wie kaum irgendwo sonst in Europa. Allerdings stellen die Schweizer Gesetzgebung (Unterscheidung Leicht-Motorfahrrad 25 km/h vs. S-Pedelec 45 km/h nach ASTRA VTS), die alpine Topographie und kantonale Fördermodelle Schweizer Käufer vor spezifische Herausforderungen.'}
            </p>
            <p>
              {lang === 'fr'
                ? 'Notre portail réunit exactement 500 modèles de référence des marques helvétiques phares (Flyer, Stromer, Scott, BMC, Thömus) et des grands fabricants internationaux avec les bancs d’essai officiels TCS.'
                : lang === 'it'
                ? 'Il nostro portale presenta esattamente 500 modelli di riferimento delle eccellenze elvetiche (Flyer, Stromer, Scott, BMC, Thömus) e dei leader internazionali con i test indipendenti del TCS.'
                : 'VeloSchweiz schliesst diese Lücke: Wir führen exakt 500 repräsentative Modelle aller wichtigen Schweizer Traditionsmarken (Flyer, Stromer, Scott, BMC, Thömus) sowie internationaler Premiumhersteller mit akkreditierten TCS- und Kassensturz-Testberichten.'}
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-lg font-black text-slate-900">
              {lang === 'fr' ? 'Les 3 piliers de la plateforme' : lang === 'it' ? 'I 3 pilastri della piattaforma' : 'Die 3 Säulen von VeloSchweiz'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <strong className="block text-slate-900 font-bold">
                  {lang === 'fr' ? '1. Indépendance 100%' : lang === 'it' ? '1. 100% Indipendente' : '1. 100% Unabhängigkeit'}
                </strong>
                <p className="text-slate-500">
                  {lang === 'fr'
                    ? 'Aucun test sponsorisé. Données objectives vérifiées par le TCS et les bancs d’essai neutres.'
                    : lang === 'it'
                    ? 'Nessun test a pagamento. Valutazioni oggettive basate sui test di laboratorio del TCS.'
                    : 'Keine bezahlten Testsiege. Wir referenzieren ausschliesslich nachprüfbare Labormessungen von TCS, SRF Kassensturz und Fachmagazinen.'}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="block text-slate-900 font-bold">
                  {lang === 'fr' ? '2. Trilingue (DE, FR, IT)' : lang === 'it' ? '2. Trilingue (DE, FR, IT)' : '2. Dreisprachig (DE, FR, IT)'}
                </strong>
                <p className="text-slate-500">
                  {lang === 'fr'
                    ? 'Couverture intégrale pour la Suisse romande (fr-CH), la Suisse alémanique (de-CH) et le Tessin (it-CH).'
                    : lang === 'it'
                    ? 'Copertura integrale per Ticino (it-CH), Svizzera tedesca (de-CH) e Romandia (fr-CH).'
                    : 'Vollständige Lokalisierung für Deutschschweiz (de-CH), Romandie (fr-CH) und Ticino (it-CH) mit kanonischer SEO-Architektur.'}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="block text-slate-900 font-bold">
                  {lang === 'fr' ? '3. Réseau de vélocistes suisses' : lang === 'it' ? '3. Negozi specializzati svizzeri' : '3. Schweizer Fachhandel'}
                </strong>
                <p className="text-slate-500">
                  {lang === 'fr'
                    ? 'Réservation directe d’essais chez les revendeurs agréés et guide des subventions communales.'
                    : lang === 'it'
                    ? 'Prenotazione diretta di test ride presso negozi specializzati e guida agli incentivi.'
                    : 'Direkte Anbindung an zertifizierte Schweizer Fachhändler für kostenlose Probefahrten und kantonale Förderungsanträge.'}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Legal / Impressum View
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
          {lang === 'fr' ? 'Aspects juridiques' : lang === 'it' ? 'Note legali' : 'Rechtliches'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {lang === 'fr'
            ? 'Mentions Légales & Protection des Données (LPD)'
            : lang === 'it'
            ? 'Colophon & Protezione dei Dati (LPD)'
            : 'Impressum & Schweizer Datenschutz (DSG)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'fr'
            ? 'Conforme à la Loi fédérale sur la protection des données (LPD) et aux ordonnances OFROU.'
            : lang === 'it'
            ? 'Conforme alla Legge federale sulla protezione dei dati (LPD) e alle norme USTRA.'
            : 'Konform mit dem Bundesgesetz über den Datenschutz (DSG) und den ASTRA-Vorschriften für Motorfahrräder.'}
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'fr' ? 'Éditeur & Siège' : lang === 'it' ? 'Editore & Sede' : 'Impressum & Betreiber'}
          </h2>
          <p>
            VeloSchweiz Portal AG<br />
            Bundesplatz 14<br />
            3011 Bern, Schweiz<br />
            CHE-112.458.992<br />
            E-Mail: kontakt@veloschweiz.ch
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'fr'
              ? 'Protection des données selon le droit suisse (nLPD)'
              : lang === 'it'
              ? 'Protezione dei dati secondo il diritto svizzero (nLPD)'
              : 'Datenschutz nach Schweizer Recht (nDSG)'}
          </h2>
          <p>
            {lang === 'fr'
              ? 'Nous collectons et traitons les données personnelles en stricte conformité avec la Loi fédérale sur la protection des données (LPD). Les demandes d’essai sont transmises exclusivement au vélociste suisse sélectionné et sont supprimées après traitement.'
              : lang === 'it'
              ? 'Raccogliamo e trattiamo i dati personali in stretta conformità con la Legge federale sulla protezione dei dati (LPD). Le richieste di prova vengono inoltrate esclusivamente al rivenditore svizzero scelto e cancellate dopo l’uso.'
              : 'Wir erheben und verarbeiten personenbezogene Daten streng vertraulich gemäss den Bestimmungen des Bundesgesetzes über den Datenschutz (DSG). Daten aus Probefahrt-Anfragen werden ausschliesslich zweckgebunden an den jeweils ausgewählten Schweizer Fachhändler im betreffenden Kanton übermittelt und nach Erledigung gelöscht.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">
            {lang === 'fr'
              ? 'Clause de non-responsabilité pour les prix et tests'
              : lang === 'it'
              ? 'Disclaimer per prezzi e test'
              : 'Haftungsausschluss für Testberichte & Preise'}
          </h2>
          <p>
            {lang === 'fr'
              ? 'Les prix indiqués sont des prix indicatifs recommandés (TTC) en francs suisses (CHF). Les notes de test du TCS sont citées fidèlement aux rapports originaux.'
              : lang === 'it'
              ? 'I prezzi indicati sono prezzi consigliati (IVA inclusa) in franchi svizzeri (CHF). I risultati dei test TCS sono fedelmente riportati dai documenti ufficiali.'
              : 'Die angegebenen Preise verstehen sich als unverbindliche Preisempfehlungen (UVP) in Schweizer Franken (CHF) inkl. gesetzlicher Mehrwertsteuer. Testurteile von TCS und SRF Kassensturz werden getreu den Original-Prüfberichten der jeweiligen Herausgeber zitiert.'}
          </p>
        </section>
      </div>
    </div>
  );
}
