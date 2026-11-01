import { Product, Language } from '../types';
import { CardImage, CardGallery } from './ProductImages';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import { Zap, Battery, Weight, Check, SlidersHorizontal, ArrowUpRight, Gauge } from 'lucide-react';
import { NavLink } from './NavLink';

interface ProductCardProps {
  /** Show a swipeable image gallery instead of a single image */
  gallery?: boolean;
  /** Heading level for the product name (2 directly under the page H1, 3 inside a section) */
  headingLevel?: 2 | 3;
  /** Above-the-fold card: load its image first */
  priority?: boolean;
  product: Product;
  lang: Language;
  onNavigate: (path: string) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export function ProductCard({
  gallery = false,
  headingLevel = 3,
  priority = false,
  product,
  lang,
  onNavigate,
  isCompared,
  onToggleCompare,
}: ProductCardProps) {
  const Heading = (headingLevel === 2 ? 'h2' : 'h3') as 'h2' | 'h3';
  const tCard = I18N[lang].card;
  const tFilter = I18N[lang].filter;

  const brand = BRANDS.find((b) => b.id === product.brandId);
  const category = CATEGORIES.find((c) => c.id === product.categoryId);

  const tcsVerdict = product.testVerdicts.find((v) => v.source === 'TCS');

  const productUrl = category ? buildLocalizedUrl(lang, { lang, view: 'product', category, productSlug: product.slug }) : '#';

  const frameTypeLabel =
    product.frameType === 'step-through'
      ? tFilter.stepThrough
      : product.frameType === 'trapeze'
      ? tFilter.trapeze
      : tFilter.diamond;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden relative">
      {/* Top Badges Bar */}
      <div className="p-3 pb-0 flex items-start justify-between gap-2 z-10">
        <div className="flex flex-wrap gap-1.5 items-center">
          {/* Speed Badge */}
          {product.speedMaxKmH === 45 ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 shadow-xs">
              <Gauge className="w-3 h-3" />
              <span>{tCard.speed45}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span>{tCard.speed25}</span>
            </span>
          )}

          {/* Swiss Brand Badge */}
          {brand?.isSwiss && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              <span>{tCard.swissMade}</span>
            </span>
          )}
        </div>

        {/* Compare Checkbox Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
            isCompared
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title={isCompared ? tCard.inComparison : tCard.compare}
        >
          {isCompared ? <Check className="w-3 h-3 stroke-[3]" /> : <SlidersHorizontal className="w-3 h-3" />}
          <span className="hidden sm:inline">{isCompared ? tCard.inComparison : tCard.compare}</span>
        </button>
      </div>

      {/* Visual / Bike Silhouette Area */}
      <div
        onClick={() => onNavigate(productUrl)}
        className="px-4 py-5 flex flex-col items-center justify-center cursor-pointer relative bg-radial from-slate-50 to-white"
      >
        {gallery ? (
          <div className="w-full h-44 flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
            <CardGallery images={product.images || []} name={product.name} priority={priority} />
          </div>
        ) : (
          <div className="w-48 h-32 flex items-center justify-center relative">
            <CardImage images={product.images || []} name={product.name} priority={priority} />
          </div>
        )}

        {/* Legit Test Verdict Badge & Trustpilot Rating */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
          {tcsVerdict && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-medium shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold text-red-400">TCS:</span>
              <span>{tcsVerdict.scoreText.split('–')[0]?.trim()}</span>
            </div>
          )}

          {product.trustpilotStats && (
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50/90 text-emerald-950 border border-emerald-300/80 text-[10px] font-semibold"
              title={`${product.trustpilotStats.score} / 5 ${tCard.trustpilotRating} (${product.trustpilotStats.reviewCount})`}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path fill="#00b67a" d="M12 0l3.09 9.51h10l-8.09 5.88 3.09 9.51-8-5.88-8 5.88 3.09-9.51-8.09-5.88h10z" />
                <path fill="#005128" d="M12 19.02l-4.94 3.63 1.91-5.88 4.97-3.61-4.97-3.66h6.14l1.9-5.87v15.39z" />
              </svg>
              <span className="font-bold font-mono text-emerald-900">{product.trustpilotStats.score}</span>
              <span className="text-emerald-700 font-medium">Trustpilot</span>
              <span className="text-emerald-600 font-mono text-[9px]">({product.trustpilotStats.reviewCount})</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between border-t border-slate-100">
        <div>
          {/* Brand & Category link */}
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{brand?.name}</span>
            <span className="text-[10px] font-normal lowercase">{category?.name[lang]}</span>
          </div>

          {/* Model Name */}
          <Heading className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
            <NavLink href={productUrl} onNavigate={onNavigate} className="cursor-pointer">
              {product.name}
            </NavLink>
          </Heading>

          {/* Specifications Pills */}
          <div className="grid grid-cols-2 gap-1.5 my-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md" title={tCard.torque}>
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{product.motorBrand === 'Other' ? (/nicht angegeben/i.test(product.motorModel) ? 'Motor' : product.motorModel.split(' ')[0]) : product.motorBrand}{product.torqueNm ? ` ${product.torqueNm}Nm` : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md" title={tCard.battery}>
              <Battery className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{product.batteryWh} Wh</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md" title={tCard.weight}>
              <Weight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{product.weightKg ? `${product.weightKg} kg` : '–'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md" title={tCard.frame}>
              <span className="text-slate-400 font-bold shrink-0">◇</span>
              <span className="capitalize truncate">
                {frameTypeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Swiss Dealer stock footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-base font-black text-slate-900 font-mono tracking-tight">
              {product.priceEstimated ? 'ca. ' : product.priceFrom ? 'ab ' : ''}CHF {product.priceCHF.toLocaleString('de-CH')}.-
            </div>
            <div className="text-[10px] text-slate-500 font-medium">UVP · {product.year}</div>
          </div>

          <NavLink href={productUrl} onNavigate={onNavigate}
            
            className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-xs"
            title={tCard.viewDetails}
          >
            <ArrowUpRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
