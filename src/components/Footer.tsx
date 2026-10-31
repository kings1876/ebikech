import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';

interface FooterProps {
  currentRoute: ParsedRoute;
  onNavigate: (path: string) => void;
}

export function Footer({ currentRoute, onNavigate }: FooterProps) {
  const lang = currentRoute.lang;
  const t = I18N[lang].footer;

  const portalName =
    lang === 'fr' ? 'VeloSuisse.ch' : lang === 'it' ? 'VeloSvizzera.ch' : 'VeloSchweiz.ch';

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Swiss Trust & Test Authorities Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-black text-sm">
              TCS
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs">{t.tcsReports}</div>
              <div className="text-[11px] text-slate-400">{t.tcsDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-black text-sm">
              {lang === 'fr' ? 'RTS' : lang === 'it' ? 'RSI' : 'SRF'}
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs">{t.kassensturzScores}</div>
              <div className="text-[11px] text-slate-400">{t.kassensturzDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-sm">
              26
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs">{t.cantonsCount}</div>
              <div className="text-[11px] text-slate-400">{t.cantonsDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black text-sm">
              🇨🇭
            </div>
            <div>
              <div className="font-bold text-slate-200 text-xs">{t.swissEngTitle}</div>
              <div className="text-[11px] text-slate-400">{t.swissEngDesc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Portal Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg">
              +
            </div>
            <span className="text-xl font-black text-white tracking-tight">{portalName}</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            {t.portalDesc}
          </p>

          <div className="pt-2 text-slate-400 text-[11px]">
            {t.dsgNote}
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <div className="font-bold text-white text-xs uppercase tracking-wider">
            {t.categoriesTitle}
          </div>
          <ul className="space-y-1.5 text-xs">
            {CATEGORIES.filter((c) => ALL_PRODUCTS.some((p) => p.categoryId === c.id)).sort((a, b) => ALL_PRODUCTS.filter((p) => p.categoryId === b.id).length - ALL_PRODUCTS.filter((p) => p.categoryId === a.id).length).slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category: cat }))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {cat.name[lang]} <span className="text-slate-600 font-mono">({ALL_PRODUCTS.filter((p) => p.categoryId === cat.id).length})</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                {t.allCategoriesLink}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Brands */}
        <div className="space-y-3">
          <div className="font-bold text-white text-xs uppercase tracking-wider">
            {t.brandsTitle}
          </div>
          <ul className="space-y-1.5 text-xs">
            {BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id)).sort((a, b) => ALL_PRODUCTS.filter((p) => p.brandId === b.id).length - ALL_PRODUCTS.filter((p) => p.brandId === a.id).length).slice(0, 7).map((brand) => (
              <li key={brand.id}>
                <button
                  onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand', brand }))}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>{brand.name}</span>
                  {brand.isSwiss && <span className="text-[10px] text-red-400 font-bold">CH</span>}
                  <span className="text-slate-600 font-mono">({ALL_PRODUCTS.filter((p) => p.brandId === brand.id).length})</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand-root' }))}
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                {t.allBrandsLink}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Swiss Guides & Legal */}
        <div className="space-y-3">
          <div className="font-bold text-white text-xs uppercase tracking-wider">
            {t.guidesTitle}
          </div>
          <ul className="space-y-1.5 text-xs">
            {GUIDE_CLUSTERS.map((cl) => (
              <li key={cl.id}>
                <button
                  onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl }))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {cl.title[lang]}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' }))}
                className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
              >
                <span>{t.cantonSubsidiesLink}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'blog-root' }))}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Blog
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'faq' }))}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'contact' }))}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}
              </button>
            </li>
            <li className="pt-2 border-t border-slate-800">
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'legal' }))}
                className="hover:text-white text-slate-500 cursor-pointer"
              >
                {t.legalLink}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Standards */}
      <div className="border-t border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {portalName} – {I18N[lang].header.tagline}. {t.allRightsReserved}
          </div>
          <div className="flex items-center gap-4">
            <span>de-CH · fr-CH · it-CH</span>
            <span>·</span>
            <span>Schweizer Franken (CHF)</span>
            <span>·</span>
            <span>{t.astraCompliance}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
