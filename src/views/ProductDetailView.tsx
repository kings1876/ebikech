import { useState } from 'react';
import { Product, Language, ReviewPlatform } from '../types';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { buildLocalizedUrl } from '../utils/routes';
import { ProductCard } from '../components/ProductCard';
import { I18N } from '../data/i18n';
import {
  Zap,
  Battery,
  Weight,
  Gauge,
  Calendar,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Coins,
  Star,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ProductDetailViewProps {
  productSlug: string;
  lang: Language;
  onNavigate: (path: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenTestRide: (product: Product) => void;
}

export function ProductDetailView({
  productSlug,
  lang,
  onNavigate,
  comparedProducts,
  onToggleCompare,
  onOpenTestRide,
}: ProductDetailViewProps) {
  const initialProduct = ALL_PRODUCTS.find((p) => p.slug === productSlug);
  const [activeTab, setActiveTab] = useState<'tests' | 'reviews' | 'specs'>(
    initialProduct?.testVerdicts.length ? 'tests' : initialProduct?.userReviews.length ? 'reviews' : 'specs'
  );
  const [reviewFilter, setReviewFilter] = useState<'all' | ReviewPlatform>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const tPdp = I18N[lang].pdp;
  const tFilter = I18N[lang].filter;

  const product = ALL_PRODUCTS.find((p) => p.slug === productSlug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {lang === 'fr' ? 'ModÃƒÂ¨le non trouvÃƒÂ©' : lang === 'it' ? 'Modello non trovato' : 'E-Bike Modell nicht gefunden'}
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          {lang === 'fr'
            ? 'Ce modÃƒÂ¨le nÃ¢â‚¬â„¢est pas disponible dans le catalogue suisse.'
            : lang === 'it'
            ? 'Questo modello non ÃƒÂ¨ disponibile nel catalogo svizzero.'
            : 'Das gewÃƒÂ¼nschte Modell ist im Schweizer Katalog nicht verfÃƒÂ¼gbar.'}
        </p>
        <button
          onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          {lang === 'fr' ? 'Retour au catalogue' : lang === 'it' ? 'Torna al catalogo' : 'ZurÃƒÂ¼ck zum Gesamtkatalog'}
        </button>
      </div>
    );
  }

  const brand = BRANDS.find((b) => b.id === product.brandId);
  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  const isCompared = comparedProducts.some((p) => p.id === product.id);

  const frameTypeLabel =
    product.frameType === 'step-through'
      ? tFilter.stepThrough
      : product.frameType === 'trapeze'
      ? tFilter.trapeze
      : tFilter.diamond;

  const filteredReviews = reviewFilter === 'all'
    ? product.userReviews
    : product.userReviews.filter((r) => r.sourcePlatform === reviewFilter);

  const trustpilotReviews = product.userReviews.filter((r) => r.sourcePlatform === 'Trustpilot');
  const googleReviews = product.userReviews.filter((r) => r.sourcePlatform === 'Google');

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Related models in the same category
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-1">
        <button
          onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'home' }))}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {tPdp.home}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <button
          onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
          className="hover:text-red-600 transition-colors cursor-pointer"
        >
          {tPdp.catalogue}
        </button>
        {category && (
          <>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category }))}
              className="hover:text-red-600 transition-colors cursor-pointer"
            >
              {category.name[lang]}
            </button>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="font-bold text-slate-900 truncate">{product.name}</span>
      </div>

      {/* Main PDP Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual & Bike Illustration */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs flex flex-col items-center justify-center relative overflow-hidden">
          {/* Top Badges */}
          <div className="w-full flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                product.speedMaxKmH === 45
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {product.speedMaxKmH} km/h ({product.speedClass})
              </span>

              {brand?.isSwiss && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                  <span>Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â­ Swiss Engineering</span>
                </span>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              {tPdp.modelYear} {product.year}
            </div>
          </div>

          {/* Bike Graphic */}
          <div className="w-72 h-48 sm:w-96 sm:h-64 flex items-center justify-center text-slate-800 py-6">
            <svg
              className="w-full h-full drop-shadow-md"
              viewBox="0 0 200 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="45" cy="85" r="30" stroke="currentColor" strokeWidth="4" />
              <circle cx="45" cy="85" r="4" fill="currentColor" />
              <circle cx="155" cy="85" r="30" stroke="currentColor" strokeWidth="4" />
              <circle cx="155" cy="85" r="4" fill="currentColor" />
              <path d="M45 85 L85 85 L125 45 L155 85" stroke="currentColor" strokeWidth="5" />
              <path d="M85 85 L105 45 L45 85" stroke="currentColor" strokeWidth="5" />
              <path d="M105 45 L135 45" stroke="currentColor" strokeWidth="5" />
              <path d="M145 32 L155 85" stroke="currentColor" strokeWidth="5" />
              <path d="M140 28 L152 28" stroke="currentColor" strokeWidth="6" />
              <path d="M85 85 L100 35" stroke="currentColor" strokeWidth="5" />
              <path d="M90 35 L112 35" stroke="currentColor" strokeWidth="7" />
              <rect x="80" y="58" width="30" height="9" rx="3" fill="#dc2626" stroke="none" />
            </svg>
          </div>

          {/* Quick Spec Highlights Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{tPdp.torque}</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{product.torqueNm ? `${product.torqueNm} Nm` : '-'}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Battery className="w-3.5 h-3.5 text-blue-500" />
                <span>{tPdp.battery}</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{product.batteryWh} Wh</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Weight className="w-3.5 h-3.5 text-slate-400" />
                <span>{tPdp.weight}</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{product.weightKg ? `${product.weightKg} kg` : '-'}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-slate-400 flex items-center gap-1 mb-1">
                <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                <span>{tPdp.range}</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {product.rangeKmEst ? `${tPdp.upTo} ${product.rangeKmEst.max} km` : '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, TCS Rating, Trustpilot Rating, Dealer Stock & Actions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => brand && onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand', brand }))}
                className="font-bold text-xs uppercase tracking-wider text-red-600 hover:underline cursor-pointer"
              >
                {brand?.name}
              </button>
              <span className="text-slate-300">Ã‚Â·</span>
              <span className="text-xs text-slate-500 lowercase">{category?.name[lang]}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.shortDesc[lang]}
            </p>
          </div>

          {/* Pricing Box in Swiss Francs (CHF) */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">{tPdp.retailPrice}</span>
                <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                  {product.priceEstimated ? 'ca. ' : product.priceFrom ? 'ab ' : ''}CHF {product.priceCHF.toLocaleString('de-CH')}.-
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>UVP {product.year}</span>
                </span>
              </div>
            </div>

            {/* Trustpilot Snapshot in Pricing Box */}
            {product.trustpilotStats && (
              <div
                onClick={() => setActiveTab('reviews')}
                className="p-3 bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center text-white">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">{product.trustpilotStats.badgeText[lang]}</span>
                    <span className="font-mono font-bold text-slate-700 ml-1">
                      {product.trustpilotStats.score}
                    </span>
                    <span className="text-slate-500 text-[11px] ml-1">
                      / 5 auf <strong className="text-slate-800">Trustpilot</strong>
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 group-hover:underline">
                  {product.trustpilotStats.reviewCount} verifiziert Ã¢â€ â€™
                </span>
              </div>
            )}

            {/* Swiss Canton Subsidy Tip */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-950">
              <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">{tPdp.subsidyTipTitle}:</strong> {tPdp.subsidyTipDesc}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenTestRide(product)}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{tPdp.bookTestRideBtn}</span>
              </button>

              <button
                onClick={() => onToggleCompare(product)}
                className={`w-full py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isCompared
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isCompared ? tPdp.inCompareBtn : tPdp.addToCompareBtn}</span>
              </button>
            </div>
          </div>

          {/* Primary Test Verdict Snapshot */}
          {product.testVerdicts[0] && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                {product.testVerdicts[0].source}
              </div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{product.testVerdicts[0].scoreText}</span>
                  <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                    {product.testVerdicts[0].badge}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {product.testVerdicts[0].summary[lang]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Tests / Legit Reviews / Detailed Technical Specs */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 text-sm font-bold gap-6">
          {product.testVerdicts.length > 0 && (
          <button
            onClick={() => setActiveTab('tests')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tests' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tPdp.tabTests} ({product.testVerdicts.length})
          </button>
          )}
          {product.userReviews.length > 0 && (
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>{tPdp.tabReviews}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono">
              Ã¢Ëœâ€¦ {product.trustpilotStats?.score || 4.7}
            </span>
          </button>
          )}
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tPdp.tabSpecs}
          </button>
        </div>

        {/* Tab 1: Legit Test Verdicts from TCS, Kassensturz, Velojournal */}
        {activeTab === 'tests' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.testVerdicts.map((tv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      {tv.source}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {tv.source} {tPdp.testReportOf} ({tv.year})
                      </div>
                      <div className="text-[11px] text-red-600 font-bold">{tv.scoreText}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {tv.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tv.summary[lang]}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="space-y-1.5 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <div className="font-bold text-emerald-900 flex items-center gap-1 text-[11px]">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tPdp.pros}</span>
                    </div>
                    <ul className="space-y-1 text-emerald-950 text-[11px]">
                      {tv.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-600 font-bold">Ã¢Å“â€œ</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                    <div className="font-bold text-amber-900 flex items-center gap-1 text-[11px]">
                      <ThumbsDown className="w-3.5 h-3.5 text-amber-600" />
                      <span>{tPdp.cons}</span>
                    </div>
                    <ul className="space-y-1 text-amber-950 text-[11px]">
                      {tv.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-amber-600 font-bold">Ã¢Å“â€”</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: User Reviews from Trustpilot & Verified Sites */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Trustpilot & Verified Site Aggregate Hero Header */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Score & Stars Block */}
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tPdp.trustpilotVerifiedTitle}</span>
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                      {product.trustpilotStats?.score || 4.7}
                    </span>
                    <div>
                      <div className="font-bold text-base text-slate-900">
                        {product.trustpilotStats?.badgeText[lang] || 'Hervorragend'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {tPdp.trustpilotBasedOn}
                      </div>
                    </div>
                  </div>

                  {/* 5 Green Trustpilot Stars */}
                  <div className="flex items-center gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-7 h-7 rounded-xs bg-[#00b67a] flex items-center justify-center text-white shadow-xs"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2 font-mono">
                      {product.trustpilotStats?.reviewCount || 38} {lang === 'fr' ? 'avis vÃƒÂ©rifiÃƒÂ©s' : lang === 'it' ? 'recensioni verificate' : 'verifizierte Bewertungen'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                    {tPdp.independentSourceNote}
                  </p>
                </div>

                {/* Rating Distribution Bars */}
                <div className="md:col-span-7 space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-600 font-semibold">5 Sterne</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00b67a] rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="w-10 text-right font-mono text-slate-500">85%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-600 font-semibold">4 Sterne</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00b67a] rounded-full" style={{ width: '12%' }} />
                    </div>
                    <span className="w-10 text-right font-mono text-slate-500">12%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-600 font-semibold">3 Sterne</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }} />
                    </div>
                    <span className="w-10 text-right font-mono text-slate-500">3%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-600 font-semibold">2 Sterne</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <span className="w-10 text-right font-mono text-slate-500">0%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-600 font-semibold">1 Stern</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <span className="w-10 text-right font-mono text-slate-500">0%</span>
                  </div>
                </div>
              </div>

              {/* Source Filter Tabs */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Quelle:</span>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      reviewFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tPdp.allReviewsFilter} ({product.userReviews.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('Trustpilot')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      reviewFilter === 'Trustpilot'
                        ? 'bg-[#00b67a] text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <span>Ã¢Ëœâ€¦ Trustpilot ({trustpilotReviews.length})</span>
                  </button>
                  <button
                    onClick={() => setReviewFilter('Google')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      reviewFilter === 'Google'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <span>Google Reviews ({googleReviews.length})</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400">
                  Zuletzt aktualisiert: Oktober 2026
                </div>
              </div>
            </div>

            {/* Individual Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.map((rev) => {
                const isTrustpilot = rev.sourcePlatform === 'Trustpilot';
                const hasVotedHelpful = helpfulVotes[rev.id];

                return (
                  <div key={rev.id} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow">
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {/* Verified Badge */}
                        <div className="flex items-center gap-1.5 mb-1">
                          {isTrustpilot ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-bold">
                              <span className="w-2 h-2 rounded-full bg-[#00b67a]" />
                              <span>Trustpilot verifiziert</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-bold">
                              <span className="w-2 h-2 rounded-full bg-blue-600" />
                              <span>Google Rezension</span>
                            </span>
                          )}

                          {rev.orderRef && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              #{rev.orderRef}
                            </span>
                          )}
                        </div>

                        <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                          <span>{rev.author}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                            Kanton {rev.canton}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {rev.kmRidden.toLocaleString('de-CH')} {tPdp.kmRidden} Ã‚Â· {tPdp.date} {rev.date}
                        </div>
                      </div>

                      {/* Star Rating Display */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-xs flex items-center justify-center text-white ${
                              i < rev.rating
                                ? isTrustpilot
                                  ? 'bg-[#00b67a]'
                                  : 'bg-amber-400'
                                : 'bg-slate-200'
                            }`}
                          >
                            <Star className="w-2.5 h-2.5 fill-current" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900">{rev.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div className="text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100/70">
                        <span className="font-bold block mb-0.5 text-emerald-900">{tPdp.top}</span>
                        <span>{rev.pros.join(', ')}</span>
                      </div>
                      <div className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                        <span className="font-bold block mb-0.5 text-slate-800">{tPdp.note}</span>
                        <span>{rev.cons.join(', ')}</span>
                      </div>
                    </div>

                    {/* Helpful interaction footer */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{tPdp.helpfulQuestion}</span>
                      <button
                        onClick={() => handleHelpfulClick(rev.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          hasVotedHelpful
                            ? 'bg-emerald-100 text-emerald-800 font-bold'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{tPdp.helpfulYes} ({(rev.helpfulCount || 10) + (hasVotedHelpful ? 1 : 0)})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Tech Specs Table */}
        {activeTab === 'specs' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-700 w-1/3">{tPdp.motorSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.motorModel} ({product.torqueNm ? `${product.torqueNm} Nm` : '-'})</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.batterySpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.batteryWh} Wh</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.speedSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">
                    {product.speedMaxKmH} km/h ({product.speedClass === 'e-bike-45' ? '45 km/h S-Pedelec' : '25 km/h'})
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.gearsSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.specs.gears}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.brakesSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.specs.brakes}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.forkSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.specs.fork}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.frameSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">
                    {product.frameMaterial} Ã‚Â· {frameTypeLabel}
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.sizesSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.frameSizes.join(', ')}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.weightSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.weightKg ? `${product.weightKg} kg` : '-'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-700">{tPdp.lightingSpec}</td>
                  <td className="p-3.5 font-medium text-slate-900">{product.specs.lighting} Ã‚Â· {product.specs.display}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Related Models */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          {tPdp.relatedTitle} {category?.name[lang]}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
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
    </div>
  );
}
