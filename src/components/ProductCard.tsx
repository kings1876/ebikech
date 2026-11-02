import { Product, Language } from '../types';
import { CardImage, CardGallery } from './ProductImages';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { buildLocalizedUrl } from '../utils/routes';
import { I18N } from '../data/i18n';
import { Zap, Battery, Weight, Check, SlidersHorizontal, ArrowUpRight, Gauge } from './icons';
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
    <div className="k150 group">
      {/* Top Badges Bar */}
      <div className="k151">
        <div className="k152">
          {/* Speed Badge */}
          {product.speedMaxKmH === 45 ? (
            <span className="k153">
              <Gauge className="w-3 h-3" />
              <span>{tCard.speed45}</span>
            </span>
          ) : (
            <span className="k154">
              <span>{tCard.speed25}</span>
            </span>
          )}

          {/* Swiss Brand Badge */}
          {brand?.isSwiss && (
            <span className="k155">
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
          {isCompared ? <Check className="w-3 h-3 ic-bold" /> : <SlidersHorizontal className="w-3 h-3" />}
          <span className="hidden sm:inline">{isCompared ? tCard.inComparison : tCard.compare}</span>
        </button>
      </div>

      {/* Visual / Bike Silhouette Area */}
      <div
        onClick={() => onNavigate(productUrl)}
        className="k156"
      >
        {gallery ? (
          <div className="k157" onClick={(e) => e.stopPropagation()}>
            <CardGallery images={product.images || []} name={product.name} priority={priority} lang={lang} />
          </div>
        ) : (
          <div className="k158">
            <CardImage images={product.images || []} name={product.name} priority={priority} />
          </div>
        )}

        {/* Legit Test Verdict Badge & Trustpilot Rating */}
        <div className="k159">
          {tcsVerdict && (
            <div className="k160">
              <span className="k161" />
              <span className="font-bold text-red-400">TCS:</span>
              <span>{tcsVerdict.scoreText.split('–')[0]?.trim()}</span>
            </div>
          )}

          {product.trustpilotStats && (
            <div
              className="k162"
              title={`${product.trustpilotStats.score} / 5 ${tCard.trustpilotRating} (${product.trustpilotStats.reviewCount})`}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path fill="#00b67a" d="M12 0l3.09 9.51h10l-8.09 5.88 3.09 9.51-8-5.88-8 5.88 3.09-9.51-8.09-5.88h10z" />
                <path fill="#005128" d="M12 19.02l-4.94 3.63 1.91-5.88 4.97-3.61-4.97-3.66h6.14l1.9-5.87v15.39z" />
              </svg>
              <span className="k163">{product.trustpilotStats.score}</span>
              <span className="text-emerald-700 font-medium">Trustpilot</span>
              <span className="k164">({product.trustpilotStats.reviewCount})</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="k165">
        <div>
          {/* Brand & Category link */}
          <div className="k166">
            <span>{brand?.name}</span>
            <span className="k167">{category?.name[lang]}</span>
          </div>

          {/* Model Name */}
          <Heading className="k168">
            <NavLink href={productUrl} onNavigate={onNavigate} className="cursor-pointer">
              {product.name}
            </NavLink>
          </Heading>

          {/* Specifications Pills */}
          <div className="k169">
            <div className="k170" title={tCard.torque}>
              <Zap className="k171" />
              <span className="truncate">{product.motorBrand === 'Other' ? (/nicht angegeben/i.test(product.motorModel) ? 'Motor' : product.motorModel.split(' ')[0]) : product.motorBrand}{product.torqueNm ? ` ${product.torqueNm}Nm` : ''}</span>
            </div>
            <div className="k170" title={tCard.battery}>
              <Battery className="k172" />
              <span className="truncate">{product.batteryWh} Wh</span>
            </div>
            <div className="k170" title={tCard.weight}>
              <Weight className="k173" />
              <span>{product.weightKg ? `${product.weightKg} kg` : '–'}</span>
            </div>
            <div className="k170" title={tCard.frame}>
              <span className="k174">◇</span>
              <span className="capitalize truncate">
                {frameTypeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Swiss Dealer stock footer */}
        <div className="k175">
          <div>
            <div className="k176">
              {product.priceEstimated ? 'ca. ' : product.priceFrom ? 'ab ' : ''}CHF {product.priceCHF.toLocaleString('de-CH')}.-
            </div>
            <div className="k177">UVP · {product.year}</div>
          </div>

          <NavLink href={productUrl} onNavigate={onNavigate}
            
            className="k178"
            title={tCard.viewDetails}
          >
            <ArrowUpRight className="w-4 h-4" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
