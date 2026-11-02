import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import { NavLink } from './NavLink';
import { COLLECTIONS } from '../data/collections';
import { SITE_NAME } from '../config/brand';
import { CONTACT } from '../config/contact';
import { Mail } from './icons';
import { LogoMark } from './Logo';

interface FooterProps {
  currentRoute: ParsedRoute;
  onNavigate: (path: string) => void;
}

export function Footer({ currentRoute, onNavigate }: FooterProps) {
  const lang = currentRoute.lang;
  const t = I18N[lang].footer;

  const portalName = SITE_NAME[lang];

  return (
    <footer className="k55">
      {/* Main Footer Links */}
      <div className="k56">
        {/* Col 1: Portal Summary */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <LogoMark className="w-8 h-8 rounded-lg" />
            <span className="k57">{portalName}</span>
          </div>
          <p className="k58">
            {t.portalDesc}
          </p>

          {CONTACT.email && (
            <a href={`mailto:${CONTACT.email}`} className="k59">
              <Mail className="w-4 h-4 text-red-400 shrink-0" />
              {CONTACT.email}
            </a>
          )}

          <div className="k60">
            {t.dsgNote}
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <div className="k61">
            {t.categoriesTitle}
          </div>
          <ul className="k62">
            {CATEGORIES.filter((c) => ALL_PRODUCTS.some((p) => p.categoryId === c.id)).sort((a, b) => ALL_PRODUCTS.filter((p) => p.categoryId === b.id).length - ALL_PRODUCTS.filter((p) => p.categoryId === a.id).length).slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
                  
                  className="k63"
                >
                  {`${cat.name[lang]} `}<span className="text-slate-400 font-mono">{`(${ALL_PRODUCTS.filter((p) => p.categoryId === cat.id).length})`}</span>
                </NavLink>
              </li>
            ))}
            {COLLECTIONS.map((col) => (
              <li key={col.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'collection', collection: col })} onNavigate={onNavigate}
                  className="k63"
                >
                  {`${col.name[lang]} `}<span className="text-slate-400 font-mono">{`(${ALL_PRODUCTS.filter(col.filter).length})`}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                
                className="k64"
              >
                {t.allCategoriesLink}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 3: Brands */}
        <div className="space-y-3">
          <div className="k61">
            {t.brandsTitle}
          </div>
          <ul className="k62">
            {BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id)).sort((a, b) => ALL_PRODUCTS.filter((p) => p.brandId === b.id).length - ALL_PRODUCTS.filter((p) => p.brandId === a.id).length).slice(0, 7).map((brand) => (
              <li key={brand.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
                  
                  className="k65"
                >
                  <span>{brand.name}</span>
                  {brand.isSwiss && <span className="k66">CH</span>}
                  <span className="text-slate-400 font-mono">{`(${ALL_PRODUCTS.filter((p) => p.brandId === brand.id).length})`}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
                
                className="k64"
              >
                {t.allBrandsLink}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 4: Swiss Guides & Legal */}
        <div className="space-y-3">
          <div className="k61">
            {t.guidesTitle}
          </div>
          <ul className="k62">
            {GUIDE_CLUSTERS.map((cl) => (
              <li key={cl.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl })} onNavigate={onNavigate}
                  
                  className="k63"
                >
                  {cl.title[lang]}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' })} onNavigate={onNavigate}
                
                className="k67"
              >
                <span>{t.cantonSubsidiesLink}</span>
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-root' })} onNavigate={onNavigate}
                
                className="k63"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'faq' })} onNavigate={onNavigate}
                
                className="k63"
              >
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
                
                className="k63"
              >
                {lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}
              </NavLink>
            </li>
            <li>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'about' })} onNavigate={onNavigate}
                className="k63"
              >
                {lang === 'fr' ? 'À propos' : lang === 'it' ? 'Chi siamo' : 'Über uns'}
              </NavLink>
            </li>
            <li className="k68">
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'legal' })} onNavigate={onNavigate}
                
                className="k69"
              >
                {t.legalLink}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Standards */}
      <div className="k70">
        <div className="k71">
          <div>
            {`© ${new Date().getFullYear()} ${portalName} – ${I18N[lang].header.tagline}. ${t.allRightsReserved}`}
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
