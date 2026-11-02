import { useMemo } from 'react';
import { BrandDef, CategoryDef, Language, Product } from '../types';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { ParsedRoute, buildLocalizedUrl, getBrandCategoryCount } from '../utils/routes';
import { ProductCard } from '../components/ProductCard';
import { I18N } from '../data/i18n';
import { CATEGORY_KEYWORD } from '../utils/seoText';
import { ListingContent } from '../components/ListingContent';
import { brandContent, brandCategoryContent } from '../utils/listingContent';
import {
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  ArrowRight,
} from '../components/icons';
import { NavLink } from '../components/NavLink';

interface BrandHubViewProps {
  route: ParsedRoute;
  lang: Language;
  onNavigate: (path: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
}

export function BrandHubView({
  route,
  lang,
  onNavigate,
  comparedProducts,
  onToggleCompare,
}: BrandHubViewProps) {
  const brand = route.brand;
  const category = route.category;
  const t = I18N[lang].brands;

  // View 1: Brand Root (/marken/)
  if (route.view === 'brand-root' || !brand) {
    const listed = BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id));
    const tierA = listed.filter((b) => b.tier === 'A');
    const tierB = listed.filter((b) => b.tier === 'B');
    const tierC = listed.filter((b) => b.tier === 'C');

    return (
      <div className="k284">
        <div className="k285">
          <div className="k275">
            {t.indexTitle}
          </div>
          <h1 className="k276">
            {t.indexH1}
          </h1>
          <p className="k286">
            {t.indexDesc}
          </p>
        </div>

        {/* Tier A */}
        {tierA.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="k287" />
            <h2 className="k125">
              {t.tierA}
            </h2>
          </div>
          <div className="k288">
            {tierA.map((b) => (
              <BrandCard key={b.id} brand={b} lang={lang} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        )}

        {/* Tier B */}
        {tierB.length > 0 && (
        <div className="k289">
          <div className="flex items-center gap-2">
            <span className="k290" />
            <h2 className="k125">
              {t.tierB}
            </h2>
          </div>
          <div className="k288">
            {tierB.map((b) => (
              <BrandCard key={b.id} brand={b} lang={lang} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        )}

        {/* Tier C */}
        {tierC.length > 0 && (
        <div className="k289">
          <div className="flex items-center gap-2">
            <span className="k291" />
            <h2 className="k125">
              {t.tierC}
            </h2>
          </div>
          <div className="k292">
            {tierC.map((b) => (
              <BrandCard key={b.id} brand={b} lang={lang} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        )}
      </div>
    );
  }

  // View 2: Brand x Category (/marken/{brand}/{cat}/)
  if (route.view === 'brand-category' && category) {
    const count = getBrandCategoryCount(brand.id, category.id);
    const isIndexed = count >= 3;

    const brandCatProducts = ALL_PRODUCTS.filter(
      (p) => p.brandId === brand.id && p.categoryId === category.id
    );

    return (
      <div className="k293">
        {/* Breadcrumb Trail */}
        <div className="k294">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
            
            className="k295"
          >
            {I18N[lang].header.brands}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
            
            className="k295"
          >
            {brand.name}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-slate-900">{category.name[lang]}</span>
        </div>

        {/* Brand x Type Header */}
        <div className="k296">
          <div className="k297">
            <div>
              <div className="k275">
                {brand.name} · {category.name[lang]}
              </div>
              <h1 className="k298">
                {brand.name} {CATEGORY_KEYWORD[category.id]?.[lang] || category.name[lang]}{lang === 'de' ? ' Schweiz' : ''}
              </h1>
              <p className="k299">
                {lang === 'fr'
                  ? `Tous les modèles ${brand.name} du segment ${category.name[lang]} avec prix en CHF, moteur et batterie.`
                  : lang === 'it'
                  ? `Tutti i modelli ${brand.name} nel segmento ${category.name[lang]} con prezzi in CHF, motore e batteria.`
                  : `Alle ${brand.name} Modelle im Segment ${category.name[lang]} mit Preisen in CHF, Motor und Akku.`}
              </p>
            </div>

            {/* SEO Rule Status Indicator Badge */}
            <div className="k300">
              {isIndexed ? (
                <div className="k301">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.indexedBadge.replace('{count}', String(count))}</span>
                </div>
              ) : (
                <div className="k302">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>{t.noindexBadge.replace('{count}', String(count))}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="k303">
          {brandCatProducts.map((p) => (
            <ProductCard
              key={p.id}
              headingLevel={2}
              product={p}
              lang={lang}
              onNavigate={onNavigate}
              isCompared={comparedProducts.some((cp) => cp.id === p.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

        {(() => {
          const block = brandCategoryContent(brand, category, lang);
          return block ? <ListingContent block={block} lang={lang} onNavigate={onNavigate} showTable /> : null;
        })()}
      </div>
    );
  }

  // View 3: Single Brand Hub (/marken/{brand}/)
  const brandProducts = ALL_PRODUCTS.filter((p) => p.brandId === brand.id);

  // Group by category to display brand x category links
  const brandCategories = CATEGORIES.map((cat) => {
    const count = getBrandCategoryCount(brand.id, cat.id);
    return {
      category: cat,
      count,
      isIndexed: count >= 3,
    };
  }).filter((bc) => bc.count > 0);

  return (
    <div className="k304">
      {/* Breadcrumb Trail */}
      <div className="k294">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="k295"
        >
          {I18N[lang].pdp.home}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
          
          className="k295"
        >
          {I18N[lang].header.brands}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-900">{brand.name}</span>
      </div>

      {/* Brand Profile Banner */}
      <div className="k305">
        <div className="max-w-3xl space-y-4">
          <div className="k306">
            {brand.isSwiss && (
              <span className="k307">
                🇨🇭 {lang === 'fr' ? 'Marque suisse' : lang === 'it' ? 'Marchio svizzero' : 'Schweizer Traditionsmarke'}
              </span>
            )}
            <span className="text-slate-400">
              {brand.targetCount} {t.modelsInCatalog}
            </span>
          </div>

          <h1 className="k308">
            {lang === 'fr' ? `Vélos électriques ${brand.name} en Suisse` : lang === 'it' ? `E-Bike ${brand.name} in Svizzera` : `${brand.name} E-Bikes Schweiz`}
          </h1>

          <p className="k309">
            {brand.description[lang]}
          </p>

          <div className="k310">
            <div className="k311">
              <MapPin className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <strong className="block text-white">{t.headquarters}:</strong>
                <span>{brand.headquarters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand × Type Category Hub (Demonstrates the >=3 products rule) */}
      <div className="space-y-4">
        <div>
          <div className="k312">
            {t.typeSegments}
          </div>
          <h2 className="k313">
            {brand.name} {t.categoriesInBrand} ({brandCategories.length})
          </h2>
        </div>

        <div className="k314">
          {brandCategories.map((bc) => (
            <NavLink href={bc.isIndexed
                ? buildLocalizedUrl(lang, { lang, view: 'brand-category', brand, category: bc.category })
                : buildLocalizedUrl(lang, { lang, view: 'category', category: bc.category })} onNavigate={onNavigate}
              key={bc.category.id}
              
              className="k315"
            >
              <div>
                <div className="k316">
                  <h3 className="k146">
                    {bc.category.name[lang]}
                  </h3>
                  <span className="k317">
                    {bc.count} {I18N[lang].header.models}
                  </span>
                </div>
                <div className="k318">
                  {bc.category.description[lang]}
                </div>
              </div>

              <div className="k319">
                {bc.isIndexed ? (
                  <span className="k320">
                    <span className="k321" />
                    <span>{t.indexedBadge.replace('{count}', String(bc.count))}</span>
                  </span>
                ) : (
                  <span className="k322">
                    <span className="k323" />
                    <span>{t.noindexBadge.replace('{count}', String(bc.count))}</span>
                  </span>
                )}
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Complete Product Listing for Brand */}
      <div className="k324">
        <h2 className="k313">
          {t.allModelsOfBrand.replace('{brand}', brand.name)} ({brandProducts.length})
        </h2>
        <div className="k303">
          {brandProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              lang={lang}
              onNavigate={onNavigate}
              isCompared={comparedProducts.some((cp) => cp.id === p.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </div>

      {(() => {
        const block = brandContent(brand, lang);
        return block ? <ListingContent block={block} lang={lang} onNavigate={onNavigate} showTable /> : null;
      })()}
    </div>
  );
}

// Simple Brand Card for index
function BrandCard({ brand, lang, onNavigate }: { brand: BrandDef; lang: Language; onNavigate: (path: string) => void }) {
  return (
    <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
      
      className="k325"
    >
      <div>
        <div className="k326">
          <div className="flex items-center gap-2">
            <span className="k130">{brand.name}</span>
            {brand.isSwiss && <span className="k327">🇨🇭 CH</span>}
          </div>
          <span className="k317">
            {brand.targetCount} {I18N[lang].header.models}
          </span>
        </div>

        <p className="k328">
          {brand.description[lang]}
        </p>

        <div className="k329">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>{brand.headquarters}</span>
        </div>
      </div>

      <div className="k330">
        <span>{lang === 'fr' ? 'Voir la marque & modèles' : lang === 'it' ? 'Vedi pagina marchio & modelli' : 'Markenseite & Modelle ansehen'}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </NavLink>
  );
}
