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
} from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
            {t.indexTitle}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.indexH1}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {t.indexDesc}
          </p>
        </div>

        {/* Tier A */}
        {tierA.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <h2 className="text-xl font-black text-slate-900">
              {t.tierA}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tierA.map((b) => (
              <BrandCard key={b.id} brand={b} lang={lang} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        )}

        {/* Tier B */}
        {tierB.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <h2 className="text-xl font-black text-slate-900">
              {t.tierB}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tierB.map((b) => (
              <BrandCard key={b.id} brand={b} lang={lang} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        )}

        {/* Tier C */}
        {tierC.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <h2 className="text-xl font-black text-slate-900">
              {t.tierC}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].pdp.home}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {I18N[lang].header.brands}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
            
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {brand.name}
          </NavLink>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-slate-900">{category.name[lang]}</span>
        </div>

        {/* Brand x Type Header */}
        <div className="border-b border-slate-200 pb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-red-600 font-bold text-xs uppercase tracking-wider">
                {brand.name} · {category.name[lang]}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {brand.name} {CATEGORY_KEYWORD[category.id]?.[lang] || category.name[lang]}{lang === 'de' ? ' Schweiz' : ''}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
                {lang === 'fr'
                  ? `Tous les modèles ${brand.name} du segment ${category.name[lang]} avec prix en CHF, moteur et batterie.`
                  : lang === 'it'
                  ? `Tutti i modelli ${brand.name} nel segmento ${category.name[lang]} con prezzi in CHF, motore e batteria.`
                  : `Alle ${brand.name} Modelle im Segment ${category.name[lang]} mit Preisen in CHF, Motor und Akku.`}
              </p>
            </div>

            {/* SEO Rule Status Indicator Badge */}
            <div className="self-start sm:self-center shrink-0">
              {isIndexed ? (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.indexedBadge.replace('{count}', String(count))}</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>{t.noindexBadge.replace('{count}', String(count))}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
          return block ? <ListingContent block={block} lang={lang} onNavigate={onNavigate} /> : null;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {I18N[lang].pdp.home}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
          
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {I18N[lang].header.brands}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-bold text-slate-900">{brand.name}</span>
      </div>

      {/* Brand Profile Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {brand.isSwiss && (
              <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-900">
                🇨🇭 {lang === 'fr' ? 'Marque suisse' : lang === 'it' ? 'Marchio svizzero' : 'Schweizer Traditionsmarke'}
              </span>
            )}
            <span className="text-slate-400">
              {brand.targetCount} {t.modelsInCatalog}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {lang === 'fr' ? `Vélos électriques ${brand.name} en Suisse` : lang === 'it' ? `E-Bike ${brand.name} in Svizzera` : `${brand.name} E-Bikes Schweiz`}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {brand.description[lang]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
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
          <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            {t.typeSegments}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {brand.name} {t.categoriesInBrand} ({brandCategories.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandCategories.map((bc) => (
            <NavLink href={bc.isIndexed
                ? buildLocalizedUrl(lang, { lang, view: 'brand-category', brand, category: bc.category })
                : buildLocalizedUrl(lang, { lang, view: 'category', category: bc.category })} onNavigate={onNavigate}
              key={bc.category.id}
              
              className="bg-white rounded-2xl border border-slate-200/90 p-4 hover:border-red-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {bc.category.name[lang]}
                  </h3>
                  <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                    {bc.count} {I18N[lang].header.models}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2">
                  {bc.category.description[lang]}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                {bc.isIndexed ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{t.indexedBadge.replace('{count}', String(bc.count))}</span>
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
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
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {t.allModelsOfBrand.replace('{brand}', brand.name)} ({brandProducts.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
        return block ? <ListingContent block={block} lang={lang} onNavigate={onNavigate} /> : null;
      })()}
    </div>
  );
}

// Simple Brand Card for index
function BrandCard({ brand, lang, onNavigate }: { brand: BrandDef; lang: Language; onNavigate: (path: string) => void }) {
  return (
    <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
      
      className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-red-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-900">{brand.name}</span>
            {brand.isSwiss && <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">🇨🇭 CH</span>}
          </div>
          <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
            {brand.targetCount} {I18N[lang].header.models}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
          {brand.description[lang]}
        </p>

        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>{brand.headquarters}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
        <span>{lang === 'fr' ? 'Voir la marque & modèles' : lang === 'it' ? 'Vedi pagina marchio & modelli' : 'Markenseite & Modelle ansehen'}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </NavLink>
  );
}
