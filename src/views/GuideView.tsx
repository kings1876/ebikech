import { useState } from 'react';
import { GuideCluster, GuideArticle, Language } from '../types';
import { GUIDE_CLUSTERS } from '../data/guides';
import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import {
  BookOpen,
  ChevronRight,
  Calculator,
  Scale,
  Sparkles,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
} from 'lucide-react';
import { NavLink } from '../components/NavLink';
import { SITE_NAME } from '../config/brand';

interface GuideViewProps {
  route: ParsedRoute;
  lang: Language;
  onNavigate: (path: string) => void;
}

export function GuideView({ route, lang, onNavigate }: GuideViewProps) {
  const t = I18N[lang].guides;

  // Interactive Frame Size Calculator State
  const [inseamCm, setInseamCm] = useState(82);
  const [bikeType, setBikeType] = useState<'trekking' | 'mtb' | 'road'>('trekking');

  const calculatedFrameCm = Math.round(
    bikeType === 'trekking'
      ? inseamCm * 0.66
      : bikeType === 'mtb'
      ? inseamCm * 0.57
      : inseamCm * 0.665
  );
  const calculatedFrameInch = (calculatedFrameCm / 2.54).toFixed(1);

  let frameSizeTShirt = 'M';
  if (calculatedFrameCm < 48) frameSizeTShirt = 'S';
  else if (calculatedFrameCm <= 53) frameSizeTShirt = 'M';
  else if (calculatedFrameCm <= 58) frameSizeTShirt = 'L';
  else frameSizeTShirt = 'XL';

  // Subview 1: Guide Detail View
  if (route.view === 'guide-detail' && route.guideArticle && route.guideCluster) {
    const article = route.guideArticle;
    const cluster = route.guideCluster;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].header.guides}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {cluster.title[lang]}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="font-bold text-slate-900 truncate">{article.title[lang]}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{cluster.title[lang]}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title[lang]}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {article.excerpt[lang]}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{SITE_NAME[lang]}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTimeMin} {t.readTime}</span>
            </span>
            <span>·</span>
            <span>{article.publishedDate}</span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{t.keyTakeawaysTitle}</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Embedded Interactive Tools */}
        {article.id === 'rahmengroesse-berechnen' && (
          <div className="bg-slate-50 border-2 border-red-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-black text-slate-900">
                {t.calcTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              {t.calcDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.inseamLabel} <strong className="text-red-600 font-mono text-base">{inseamCm} cm</strong>
                </label>
                <input
                  type="range"
                  min="65"
                  max="100"
                  value={inseamCm}
                  onChange={(e) => setInseamCm(parseInt(e.target.value, 10))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>65 cm</span>
                  <span>100 cm</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">{t.typeLabel}</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => setBikeType('trekking')}
                    className={`p-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      bikeType === 'trekking' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    City / Trekking
                  </button>
                  <button
                    onClick={() => setBikeType('mtb')}
                    className={`p-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      bikeType === 'mtb' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    E-MTB
                  </button>
                  <button
                    onClick={() => setBikeType('road')}
                    className={`p-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                      bikeType === 'road' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Gravel / Road
                  </button>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">{t.recommendedFrame}</span>
                <span className="text-2xl font-black font-mono text-slate-900">
                  {calculatedFrameCm} cm <span className="text-slate-500 font-normal text-sm">({calculatedFrameInch} {lang === 'fr' ? 'pouces' : lang === 'it' ? 'pollici' : 'Zoll'})</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t.sizeCode}</span>
                <span className="text-2xl font-black text-red-600 font-mono">{lang === 'fr' ? 'Taille' : lang === 'it' ? 'Taglia' : 'Grösse'} {frameSizeTShirt}</span>
              </div>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors cursor-pointer"
              >
                {t.showMatchingBikes}
              </NavLink>
            </div>
          </div>
        )}

        {/* Embedded Swiss Legal 25 vs 45 Table */}
        {article.id === 'e-bike-25-vs-45-schweizer-gesetz' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-900 text-white font-bold text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>{t.legalTitle}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="p-3 text-left">{t.legalColLaw}</th>
                    <th className="p-3 text-left text-emerald-800">{t.legalCol25}</th>
                    <th className="p-3 text-left text-amber-900">{t.legalCol45}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Catégorie de véhicule' : lang === 'it' ? 'Categoria veicolo' : 'Fahrzeugkategorie'}</td>
                    <td className="p-3">{lang === 'fr' ? 'Cyclomoteur léger (25 km/h)' : lang === 'it' ? 'Ciclomotore leggero (25 km/h)' : 'Leicht-Motorfahrrad'}</td>
                    <td className="p-3">{lang === 'fr' ? 'Cyclomoteur rapide (S-Pedelec 45 km/h)' : lang === 'it' ? 'Ciclomotore veloce (S-Pedelec 45 km/h)' : 'Motorfahrrad (S-Pedelec)'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Puissance moteur max.' : lang === 'it' ? 'Potenza motore max.' : 'Motorleistung max.'}</td>
                    <td className="p-3">500 Watt</td>
                    <td className="p-3">1’000 Watt</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Plaque d’immatriculation & vignette' : lang === 'it' ? 'Targa & vignetta' : 'Kontrollschild & Vignette'}</td>
                    <td className="p-3 text-emerald-700 font-medium">{lang === 'fr' ? 'Non (pas de plaque nécessaire)' : lang === 'it' ? 'No (nessuna targa necessaria)' : 'Nein (kein Nummernschild nötig)'}</td>
                    <td className="p-3 text-red-600 font-bold">{lang === 'fr' ? 'Oui (plaque jaune + vignette annuelle)' : lang === 'it' ? 'Sì (targa gialla + vignetta annuale)' : 'Ja (gelbes Mofa-Schild + jährliche Vignette)'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Permis de conduire' : lang === 'it' ? 'Licenza di condurre' : 'Führerausweis'}</td>
                    <td className="p-3">{lang === 'fr' ? 'Dès 16 ans sans permis; 14–16 ans avec cat. M' : lang === 'it' ? 'Da 16 anni senza licenza; 14–16 con cat. M' : 'Ab 16 Jahren kein Ausweis; 14–16 mit Kat. M'}</td>
                    <td className="p-3 text-red-600 font-bold">{lang === 'fr' ? 'Obligatoire : min. Cat. M ou B' : lang === 'it' ? 'Obbligatorio: min. Cat. M o B' : 'Obligatorisch: Mindestens Kat. M (Mofa) oder B'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Casque' : lang === 'it' ? 'Casco' : 'Helmpflicht'}</td>
                    <td className="p-3 text-slate-500">{lang === 'fr' ? 'Recommandé' : lang === 'it' ? 'Consigliato' : 'Empfohlen'}</td>
                    <td className="p-3 text-red-600 font-bold">{lang === 'fr' ? 'Obligatoire (norme EN 1078)' : lang === 'it' ? 'Obbligatorio (norma EN 1078)' : 'Obligatorisch (Velohelm nach EN 1078)'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Tachymètre' : lang === 'it' ? 'Tachimetro' : 'Tachometer-Pflicht'}</td>
                    <td className="p-3">{lang === 'fr' ? 'Facultatif' : lang === 'it' ? 'Facoltativo' : 'Freiwillig'}</td>
                    <td className="p-3 text-red-600 font-bold">{lang === 'fr' ? 'Obligatoire : modèles neufs dès avril 2024, anciens à rééquiper d’ici avril 2027' : lang === 'it' ? 'Obbligatorio : modelli nuovi da aprile 2024, quelli esistenti da adeguare entro aprile 2027' : 'Obligatorisch: neue Modelle seit April 2024, ältere bis April 2027 nachrüsten'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">{lang === 'fr' ? 'Pistes cyclables' : lang === 'it' ? 'Piste ciclabili' : 'Veloweg-Benutzung'}</td>
                    <td className="p-3 text-emerald-700 font-medium">{lang === 'fr' ? 'Obligatoire' : lang === 'it' ? 'Obbligatorio' : 'Obligatorisch'}</td>
                    <td className="p-3 text-emerald-700 font-medium">{lang === 'fr' ? 'Obligatoire (sauf interdiction cyclomoteurs)' : lang === 'it' ? 'Obbligatorio (salvo divieto ciclomotori)' : 'Obligatorisch (ausser bei Mofa-Fahrverbot)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
          <div className="whitespace-pre-line">
            {article.content[lang]}
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
            
            className="text-xs font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
          >
            ← {t.backTo} {cluster.title[lang]}
          </NavLink>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
          >
            {t.findBikesCta}
          </NavLink>
        </div>
      </div>
    );
  }

  // Subview 2: Guide Cluster View
  if (route.view === 'guide-cluster' && route.guideCluster) {
    const cluster = route.guideCluster;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].header.guides}
          </NavLink>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-bold text-slate-900">{cluster.title[lang]}</span>
        </div>

        <div className="border-b border-slate-200 pb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {cluster.title[lang]}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            {cluster.shortDesc[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cluster.guides.map((g) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-detail', guideCluster: cluster, guideArticle: g })} onNavigate={onNavigate}
              key={g.id}
              
              className="bg-white rounded-3xl border border-slate-200/90 p-6 hover:border-red-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{SITE_NAME[lang]}</span>
                  <span>·</span>
                  <span>{g.readTimeMin} {t.readTime}</span>
                </div>
                <h2 className="font-black text-base text-slate-900 group-hover:text-red-600">
                  {g.title[lang]}
                </h2>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {g.excerpt[lang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span>{t.readArticle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </NavLink>
          ))}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="font-black text-base text-slate-900">
            {lang === 'fr' ? 'Du guide à la boutique' : lang === 'it' ? 'Dalla guida al negozio' : 'Vom Ratgeber in den Shop'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'fr'
              ? 'Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock. Les prix en CHF, les caractéristiques techniques et les modèles se trouvent dans les catégories et chez chaque marque ; ces guides vous aident à choisir le modèle qui vous convient.'
              : lang === 'it'
              ? 'Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino. Prezzi in CHF, dati tecnici e modelli si trovano nelle categorie e presso ogni marchio; queste guide vi aiutano a scegliere il modello adatto.'
              : 'Alle E-Bikes in unserem Katalog sind Neuware aus eigenem Lager. Preise in CHF, technische Daten und Modelle finden Sie in den Kategorien und bei den Marken; die Ratgeber helfen Ihnen, das passende Modell zu wählen.'}
          </p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                className="inline-flex px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 cursor-pointer"
              >
                {lang === 'fr' ? 'Tous les vélos électriques' : lang === 'it' ? 'Tutte le e-bike' : 'Alle E-Bikes'}
              </NavLink>
            </li>
            {CATEGORIES.filter((c) => ALL_PRODUCTS.some((p) => p.categoryId === c.id)).map((c) => (
              <li key={c.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: c })} onNavigate={onNavigate}
                  className="inline-flex px-3 py-2 rounded-full bg-white border border-slate-300 text-slate-800 text-sm hover:border-red-300 cursor-pointer"
                >
                  {c.name[lang]}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  // Subview 3: Guide Root (/ratgeber/)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
          {t.badge}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t.h1}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_CLUSTERS.map((cl) => (
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl })} onNavigate={onNavigate}
            key={cl.id}
            
            className="bg-white rounded-3xl border border-slate-200/90 p-6 hover:border-red-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">
                {cl.title[lang]}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {cl.shortDesc[lang]}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
              <span>{cl.guides.length} {lang === 'fr' ? 'articles spécialisés' : lang === 'it' ? 'articoli di approfondimento' : 'Fachartikel anzeigen'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
