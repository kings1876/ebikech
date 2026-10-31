import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import { NavLink } from './NavLink';
import { COLLECTIONS } from '../data/collections';

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
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
                  
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {cat.name[lang]} <span className="text-slate-600 font-mono">({ALL_PRODUCTS.filter((p) => p.categoryId === cat.id).length})</span>
                </NavLink>
              </li>
            ))}
            {COLLECTIONS.map((col) => (
              <li key={col.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'collection', collection: col })} onNavigate={onNavigate}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {col.name[lang]} <span className="text-slate-600 font-mono">({ALL_PRODUCTS.filter(col.filter).length})</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                {t.allCategoriesLink}
              </NavLink>
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
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
                  
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>{brand.name}</span>
                  {brand.isSwiss && <span className="text-[10px] text-red-400 font-bold">CH</span>}
                  <span className="text-slate-600 font-mono">({ALL_PRODUCTS.filter((p) => p.brandId === brand.id).length})</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
                
                className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                {t.allBrandsLink}
              </NavLink>
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
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl })} onNavigate={onNavigate}
                  
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {cl.title[lang]}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' })} onNavigate={onNavigate}
                
                className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
              >
                <span>{t.cantonSubsidiesLink}</span>
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-root' })} onNavigate={onNavigate}
                
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'faq' })} onNavigate={onNavigate}
                
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
                
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}
              </NavLink>
            </li>
            <li className="pt-2 border-t border-slate-800">
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'legal' })} onNavigate={onNavigate}
                
                className="hover:text-white text-slate-500 cursor-pointer"
              >
                {t.legalLink}
              </NavLink>
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
