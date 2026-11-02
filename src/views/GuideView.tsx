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
} from '../components/icons';
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
      <div className="k409">
        {/* Breadcrumb Trail */}
        <div className="k410">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="k411" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].header.guides}
          </NavLink>
          <ChevronRight className="k411" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
            
            className="k295"
          >
            {cluster.title[lang]}
          </NavLink>
          <ChevronRight className="k411" />
          <span className="k412">{article.title[lang]}</span>
        </div>

        {/* Article Header */}
        <div className="k413">
          <div className="k414">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{cluster.title[lang]}</span>
          </div>

          <h1 className="k415">
            {article.title[lang]}
          </h1>

          <p className="k416">
            {article.excerpt[lang]}
          </p>

          <div className="k417">
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
        <div className="k418">
          <div className="k419">
            <Sparkles className="w-4 h-4" />
            <span>{t.keyTakeawaysTitle}</span>
          </div>
          <ul className="k420">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="k421" />
                <span>{takeaway[lang]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Embedded Interactive Tools */}
        {article.id === 'rahmengroesse-berechnen' && (
          <div className="k422">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              <h2 className="k130">
                {t.calcTitle}
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              {t.calcDesc}
            </p>

            <div className="k423">
              <div>
                <label className="k424">
                  {t.inseamLabel} <strong className="k425">{inseamCm} cm</strong>
                </label>
                <input
                  type="range"
                  min="65"
                  max="100"
                  value={inseamCm}
                  onChange={(e) => setInseamCm(parseInt(e.target.value, 10))}
                  className="k426"
                />
                <div className="k427">
                  <span>65 cm</span>
                  <span>100 cm</span>
                </div>
              </div>

              <div>
                <label className="k424">{t.typeLabel}</label>
                <div className="k428">
                  <button
                    onClick={() => setBikeType('trekking')}
                    className={`k672 ${
                      bikeType === 'trekking' ? 'k622' : 'k673'
                    }`}
                  >
                    City / Trekking
                  </button>
                  <button
                    onClick={() => setBikeType('mtb')}
                    className={`k672 ${
                      bikeType === 'mtb' ? 'k622' : 'k673'
                    }`}
                  >
                    E-MTB
                  </button>
                  <button
                    onClick={() => setBikeType('road')}
                    className={`k672 ${
                      bikeType === 'road' ? 'k622' : 'k673'
                    }`}
                  >
                    Gravel / Road
                  </button>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="k429">
              <div>
                <span className="text-xs text-slate-500 block">{t.recommendedFrame}</span>
                <span className="k430">
                  {calculatedFrameCm} cm <span className="k431">({calculatedFrameInch} {lang === 'fr' ? 'pouces' : lang === 'it' ? 'pollici' : 'Zoll'})</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">{t.sizeCode}</span>
                <span className="k432">{lang === 'fr' ? 'Taille' : lang === 'it' ? 'Taglia' : 'Grösse'} {frameSizeTShirt}</span>
              </div>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="k433"
              >
                {t.showMatchingBikes}
              </NavLink>
            </div>
          </div>
        )}

        {/* Embedded Swiss Legal 25 vs 45 Table */}
        {article.id === 'e-bike-25-vs-45-schweizer-gesetz' && (
          <div className="k434">
            <div className="k435">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>{t.legalTitle}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="k436">
                <thead>
                  <tr className="k437">
                    <th className="p-3 text-left">{t.legalColLaw}</th>
                    <th className="k438">{t.legalCol25}</th>
                    <th className="p-3 text-left text-amber-900">{t.legalCol45}</th>
                  </tr>
                </thead>
                <tbody className="k29">
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
                    <td className="k439">{lang === 'fr' ? 'Non (pas de plaque nécessaire)' : lang === 'it' ? 'No (nessuna targa necessaria)' : 'Nein (kein Nummernschild nötig)'}</td>
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
                    <td className="k439">{lang === 'fr' ? 'Obligatoire' : lang === 'it' ? 'Obbligatorio' : 'Obligatorisch'}</td>
                    <td className="k439">{lang === 'fr' ? 'Obligatoire (sauf interdiction cyclomoteurs)' : lang === 'it' ? 'Obbligatorio (salvo divieto ciclomotori)' : 'Obligatorisch (ausser bei Mofa-Fahrverbot)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="k440 prose prose-slate">
          <div className="whitespace-pre-line">
            {article.content[lang]}
          </div>
        </div>

        {/* Back Link */}
        <div className="k441">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
            
            className="k442"
          >
            ← {t.backTo} {cluster.title[lang]}
          </NavLink>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="k367"
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
      <div className="k443">
        <div className="k294">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].header.guides}
          </NavLink>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-bold text-slate-900">{cluster.title[lang]}</span>
        </div>

        <div className="k285">
          <h1 className="k251">
            {cluster.title[lang]}
          </h1>
          <p className="k444">
            {cluster.shortDesc[lang]}
          </p>
        </div>

        <div className="k445">
          {cluster.guides.map((g) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-detail', guideCluster: cluster, guideArticle: g })} onNavigate={onNavigate}
              key={g.id}
              
              className="k446"
            >
              <div className="space-y-2">
                <div className="k447">
                  <span>{SITE_NAME[lang]}</span>
                  <span>·</span>
                  <span>{g.readTimeMin} {t.readTime}</span>
                </div>
                <h2 className="k448">
                  {g.title[lang]}
                </h2>
                <p className="k449">
                  {g.excerpt[lang]}
                </p>
              </div>

              <div className="k330">
                <span>{t.readArticle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </NavLink>
          ))}
        </div>

        <GuideShopBlock lang={lang} onNavigate={onNavigate} />
      </div>
    );
  }

  // Subview 3: Guide Root (/ratgeber/)
  return (
    <div className="k450">
      <div className="k285">
        <div className="k275">
          {t.badge}
        </div>
        <h1 className="k276">
          {t.h1}
        </h1>
        <p className="k286">
          {t.desc}
        </p>
      </div>

      <div className="k337">
        {GUIDE_CLUSTERS.map((cl) => (
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl })} onNavigate={onNavigate}
            key={cl.id}
            
            className="k446"
          >
            <div>
              <div className="k451">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="k452">
                {cl.title[lang]}
              </h2>
              <p className="k453">
                {cl.shortDesc[lang]}
              </p>
            </div>

            <div className="k454">
              <span>{cl.guides.length} {lang === 'fr' ? 'articles spécialisés' : lang === 'it' ? 'articoli di approfondimento' : 'Fachartikel anzeigen'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </NavLink>
        ))}
      </div>

      <GuideShopBlock lang={lang} onNavigate={onNavigate} />
    </div>
  );
}

/** Leads from the guides into the shop: a short note plus links to the catalogue and every category. */
function GuideShopBlock({ lang, onNavigate }: { lang: Language; onNavigate: (path: string) => void }) {
  return (
    <section className="k455">
      <h2 className="k372">
        {lang === 'fr' ? 'Du guide à la boutique' : lang === 'it' ? 'Dalla guida al negozio' : 'Vom Ratgeber in den Shop'}
      </h2>
      <p className="k401">
        {lang === 'fr'
          ? 'Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock. Les prix en CHF, les caractéristiques techniques et les modèles se trouvent dans les catégories et chez chaque marque ; ces guides vous aident à choisir le modèle qui vous convient.'
          : lang === 'it'
          ? 'Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino. Prezzi in CHF, dati tecnici e modelli si trovano nelle categorie e presso ogni marchio; queste guide vi aiutano a scegliere il modello adatto.'
          : 'Alle E-Bikes in unserem Katalog sind Neuware aus eigenem Lager. Preise in CHF, technische Daten und Modelle finden Sie in den Kategorien und bei den Marken; die Ratgeber helfen Ihnen, das passende Modell zu wählen.'}
      </p>
      <ul className="flex flex-wrap gap-2">
        <li>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            className="k456"
          >
            {lang === 'fr' ? 'Tous les vélos électriques' : lang === 'it' ? 'Tutte le e-bike' : 'Alle E-Bikes'}
          </NavLink>
        </li>
        {CATEGORIES.filter((c) => ALL_PRODUCTS.some((p) => p.categoryId === c.id)).map((c) => (
          <li key={c.id}>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: c })} onNavigate={onNavigate}
              className="k457"
            >
              {c.name[lang]}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
