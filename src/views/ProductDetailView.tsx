import { useState } from 'react';
import { cart } from '../lib/cart';
import { cryptoPriceLine, isCryptoEnabled } from '../lib/order';
import { ProductGallery } from '../components/ProductImages';
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
  ShoppingCart,
  Star,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Check,
} from '../components/icons';
import { NavLink } from '../components/NavLink';
import { describeProduct, localizeSpec } from '../utils/productText';
import { buildProductContent, familyOf } from '../utils/productContent';

interface ProductDetailViewProps {
  productSlug: string;
  lang: Language;
  onNavigate: (path: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenTestRide: (product: Product) => void;
  onOpenOrder: (product: Product) => void;
}

export function ProductDetailView({
  productSlug,
  lang,
  onNavigate,
  comparedProducts,
  onToggleCompare,
  onOpenTestRide,
  onOpenOrder,
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
      <div className="k519">
        <h2 className="k520">
          {lang === 'fr' ? 'Modèle non trouvé' : lang === 'it' ? 'Modello non trovato' : 'E-Bike Modell nicht gefunden'}
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          {lang === 'fr'
            ? 'Ce modèle n’est pas disponible dans le catalogue suisse.'
            : lang === 'it'
            ? 'Questo modello non è disponibile nel catalogo svizzero.'
            : 'Das gewünschte Modell ist im Schweizer Katalog nicht verfügbar.'}
        </p>
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
          
          className="k521"
        >
          {lang === 'fr' ? 'Retour au catalogue' : lang === 'it' ? 'Torna al catalogo' : 'Zurück zum Gesamtkatalog'}
        </NavLink>
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
    <div className="k522">
      {/* Breadcrumb Trail */}
      <div className="k523">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="k295"
        >
          {tPdp.home}
        </NavLink>
        <ChevronRight className="k411" />
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
          
          className="k295"
        >
          {tPdp.catalogue}
        </NavLink>
        {category && (
          <>
            <ChevronRight className="k411" />
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category })} onNavigate={onNavigate}
              
              className="k295"
            >
              {category.name[lang]}
            </NavLink>
          </>
        )}
        <ChevronRight className="k411" />
        <span className="k412">{product.name}</span>
      </div>

      {/* Main PDP Hero Grid */}
      <div className="k524">
        {/* Left Column: Visual & Bike Illustration */}
        <div className="k525">
          {/* Top Badges */}
          <div className="k526">
            <div className="flex items-center gap-2">
              <span className={`k676 ${
                product.speedMaxKmH === 45
                  ? 'k677'
                  : 'k678'
              }`}>
                {product.speedMaxKmH} km/h
              </span>

              {brand?.isSwiss && (
                <span className="k527">
                  <span>🇨🇭 Swiss Engineering</span>
                </span>
              )}
            </div>

            <div className="k528">
              {tPdp.modelYear} {product.year}
            </div>
          </div>

          <ProductGallery images={product.images || []} name={product.name} lang={lang} />

          {/* Quick Spec Highlights Grid */}
          <div className="k529">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="k530">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{tPdp.torque}</span>
              </div>
              <div className="k146">{product.torqueNm ? `${product.torqueNm} Nm` : '-'}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="k530">
                <Battery className="w-3.5 h-3.5 text-blue-500" />
                <span>{tPdp.battery}</span>
              </div>
              <div className="k146">{product.batteryWh} Wh</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="k530">
                <Weight className="w-3.5 h-3.5 text-slate-500" />
                <span>{tPdp.weight}</span>
              </div>
              <div className="k146">{product.weightKg ? `${product.weightKg} kg` : '-'}</div>
            </div>

            {product.rangeKmEst && (
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="k530">
                <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                <span>{tPdp.range}</span>
              </div>
              <div className="k146">
                {`${tPdp.upTo} ${product.rangeKmEst.max} km`}
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing, TCS Rating, Trustpilot Rating, Dealer Stock & Actions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
                
                className="k531"
              >
                {brand?.name}
              </NavLink>
              <span className="text-slate-300">·</span>
              <span className="k532">{category?.name[lang]}</span>
            </div>

            <h1 className="k477">
              {product.name}
            </h1>

            <p className="k533">
              {describeProduct(product, lang)}
            </p>
          </div>

          {/* Pricing Box in Swiss Francs (CHF) */}
          <div className="k534">
            <div className="k535">
              <div>
                <span className="text-xs text-slate-500 block">{tPdp.retailPrice}</span>
                <span className="k536">
                  {product.priceEstimated ? 'ca. ' : product.priceFrom ? 'ab ' : ''}CHF {product.priceCHF.toLocaleString('de-CH')}.-
                </span>
                {cryptoPriceLine(product.priceCHF, lang) && <span className="k707">{cryptoPriceLine(product.priceCHF, lang)}</span>}
              </div>
              <div className="text-right">
                <span className="k537">
                  <span className="k538" />
                  <span>UVP {product.year}</span>
                </span>
              </div>
            </div>

            {/* Trustpilot Snapshot in Pricing Box */}
            {product.trustpilotStats && (
              <div
                onClick={() => setActiveTab('reviews')}
                className="k539 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="k540">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">{product.trustpilotStats.badgeText[lang]}</span>
                    <span className="k541">
                      {product.trustpilotStats.score}
                    </span>
                    <span className="k235">
                      / 5 auf <strong className="text-slate-800">Trustpilot</strong>
                    </span>
                  </div>
                </div>

                <span className="k542">
                  {product.trustpilotStats.reviewCount} verifiziert →
                </span>
              </div>
            )}

            {/* Swiss Canton Subsidy Tip */}
            <div className="k543">
              <Coins className="k544" />
              <div>
                <strong className="font-bold">{tPdp.subsidyTipTitle}:</strong> {tPdp.subsidyTipDesc}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => { cart.add(product.slug); window.dispatchEvent(new Event('cart:open')); }}
                className="k545"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Ajouter au panier' : lang === 'it' ? 'Aggiungi al carrello' : 'In den Warenkorb'}</span>
              </button>

              <button
                onClick={() => onOpenOrder(product)}
                className="k546"
              >
                <Coins className="w-4 h-4" />
                <span>{isCryptoEnabled() ? (lang === 'fr' ? 'Commander maintenant' : lang === 'it' ? 'Ordina ora' : 'Jetzt bestellen') : lang === 'fr' ? 'Commander par virement bancaire' : lang === 'it' ? 'Ordina con bonifico bancario' : 'Per Banküberweisung bestellen'}</span>
              </button>

              <button
                onClick={() => onOpenTestRide(product)}
                className="k546"
              >
                <Calendar className="w-4 h-4" />
                <span>{tPdp.bookTestRideBtn}</span>
              </button>

              <button
                onClick={() => onToggleCompare(product)}
                className={`k679 ${
                  isCompared
                    ? 'k624'
                    : 'k680'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isCompared ? tPdp.inCompareBtn : tPdp.addToCompareBtn}</span>
              </button>
            </div>
          </div>

          {/* Primary Test Verdict Snapshot */}
          {product.testVerdicts[0] && (
            <div className="k547">
              <div className="k548">
                {product.testVerdicts[0].source}
              </div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{product.testVerdicts[0].scoreText}</span>
                  <span className="k549">
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
        <div className="k550">
          {product.testVerdicts.length > 0 && (
          <button
            onClick={() => setActiveTab('tests')}
            className={`k681 ${
              activeTab === 'tests' ? 'k682' : 'k683'
            }`}
          >
            {tPdp.tabTests} ({product.testVerdicts.length})
          </button>
          )}
          {product.userReviews.length > 0 && (
          <button
            onClick={() => setActiveTab('reviews')}
            className={`k684 ${
              activeTab === 'reviews' ? 'k682' : 'k683'
            }`}
          >
            <span>{tPdp.tabReviews}</span>
            <span className="k551 py-0.2">
              ★ {product.trustpilotStats?.score || 4.7}
            </span>
          </button>
          )}
          <button
            onClick={() => setActiveTab('specs')}
            className={`k681 ${
              activeTab === 'specs' ? 'k682' : 'k683'
            }`}
          >
            {tPdp.tabSpecs}
          </button>
        </div>

        {/* Tab 1: Legit Test Verdicts from TCS, Kassensturz, Velojournal */}
        {activeTab === 'tests' && (
          <div className="k337">
            {product.testVerdicts.map((tv, idx) => (
              <div
                key={idx}
                className="k552"
              >
                <div className="k381">
                  <div className="flex items-center gap-2">
                    <div className="k553">
                      {tv.source}
                    </div>
                    <div>
                      <div className="k554">
                        {tv.source} {tPdp.testReportOf} ({tv.year})
                      </div>
                      <div className="k555">{tv.scoreText}</div>
                    </div>
                  </div>
                  <span className="k556">
                    {tv.badge}
                  </span>
                </div>

                <p className="k557">
                  {tv.summary[lang]}
                </p>

                <div className="k558">
                  <div className="k559">
                    <div className="k560">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tPdp.pros}</span>
                    </div>
                    <ul className="k561">
                      {tv.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="k562">
                    <div className="k563">
                      <ThumbsDown className="w-3.5 h-3.5 text-amber-600" />
                      <span>{tPdp.cons}</span>
                    </div>
                    <ul className="k564">
                      {tv.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-amber-600 font-bold">✗</span>
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
            <div className="k565">
              <div className="k566">
                {/* Score & Stars Block */}
                <div className="k567">
                  <div className="flex items-center gap-2">
                    <span className="k568">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{tPdp.trustpilotVerifiedTitle}</span>
                    </span>
                  </div>

                  <div className="k569">
                    <span className="k570">
                      {product.trustpilotStats?.score || 4.7}
                    </span>
                    <div>
                      <div className="k571">
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
                        className="k572"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    ))}
                    <span className="k573">
                      {product.trustpilotStats?.reviewCount || 38} {lang === 'fr' ? 'avis vérifiés' : lang === 'it' ? 'recensioni verificate' : 'verifizierte Bewertungen'}
                    </span>
                  </div>

                  <p className="k574">
                    {tPdp.independentSourceNote}
                  </p>
                </div>

                {/* Rating Distribution Bars */}
                <div className="k575">
                  <div className="flex items-center gap-3">
                    <span className="k576">5 Sterne</span>
                    <div className="k577">
                      <div className="k578" style={{ width: '85%' }} />
                    </div>
                    <span className="k579">85%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="k576">4 Sterne</span>
                    <div className="k577">
                      <div className="k578" style={{ width: '12%' }} />
                    </div>
                    <span className="k579">12%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="k576">3 Sterne</span>
                    <div className="k577">
                      <div className="k580" style={{ width: '3%' }} />
                    </div>
                    <span className="k579">3%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="k576">2 Sterne</span>
                    <div className="k577">
                      <div className="k581" style={{ width: '0%' }} />
                    </div>
                    <span className="k579">0%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="k576">1 Stern</span>
                    <div className="k577">
                      <div className="k581" style={{ width: '0%' }} />
                    </div>
                    <span className="k579">0%</span>
                  </div>
                </div>
              </div>

              {/* Source Filter Tabs */}
              <div className="k582">
                <div className="flex items-center gap-2">
                  <span className="k583">Quelle:</span>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`k685 ${
                      reviewFilter === 'all'
                        ? 'k686'
                        : 'k635'
                    }`}
                  >
                    {tPdp.allReviewsFilter} ({product.userReviews.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('Trustpilot')}
                    className={`k687 ${
                      reviewFilter === 'Trustpilot'
                        ? 'k688'
                        : 'k689'
                    }`}
                  >
                    <span>★ Trustpilot ({trustpilotReviews.length})</span>
                  </button>
                  <button
                    onClick={() => setReviewFilter('Google')}
                    className={`k687 ${
                      reviewFilter === 'Google'
                        ? 'k690'
                        : 'k691'
                    }`}
                  >
                    <span>Google Reviews ({googleReviews.length})</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500">
                  Zuletzt aktualisiert: Oktober 2026
                </div>
              </div>
            </div>

            {/* Individual Reviews Grid */}
            <div className="k584">
              {filteredReviews.map((rev) => {
                const isTrustpilot = rev.sourcePlatform === 'Trustpilot';
                const hasVotedHelpful = helpfulVotes[rev.id];

                return (
                  <div key={rev.id} className="k585">
                    {/* Header info */}
                    <div className="k586">
                      <div>
                        {/* Verified Badge */}
                        <div className="k587">
                          {isTrustpilot ? (
                            <span className="k588">
                              <span className="k52" />
                              <span>Trustpilot verifiziert</span>
                            </span>
                          ) : (
                            <span className="k589">
                              <span className="k590" />
                              <span>Google Rezension</span>
                            </span>
                          )}

                          {rev.orderRef && (
                            <span className="k591">
                              #{rev.orderRef}
                            </span>
                          )}
                        </div>

                        <div className="k592">
                          <span>{rev.author}</span>
                          <span className="k593">
                            Kanton {rev.canton}
                          </span>
                        </div>

                        <div className="k594">
                          {rev.kmRidden.toLocaleString('de-CH')} {tPdp.kmRidden} · {tPdp.date} {rev.date}
                        </div>
                      </div>

                      {/* Star Rating Display */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`k692 ${
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

                    <h3 className="k595">{rev.title}</h3>
                    <p className="k557">{rev.comment}</p>

                    {/* Pros & Cons */}
                    <div className="k596">
                      <div className="k597">
                        <span className="k598">{tPdp.top}</span>
                        <span>{rev.pros.join(', ')}</span>
                      </div>
                      <div className="k599">
                        <span className="k600">{tPdp.note}</span>
                        <span>{rev.cons.join(', ')}</span>
                      </div>
                    </div>

                    {/* Helpful interaction footer */}
                    <div className="k601">
                      <span>{tPdp.helpfulQuestion}</span>
                      <button
                        onClick={() => handleHelpfulClick(rev.id)}
                        className={`k693 ${
                          hasVotedHelpful
                            ? 'k694'
                            : 'k695'
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
          <div className="k602">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50">
                  <td className="k603">{tPdp.motorSpec}</td>
                  <td className="k604">{localizeSpec(product.motorModel, lang)} ({product.torqueNm ? `${product.torqueNm} Nm` : '-'})</td>
                </tr>
                <tr>
                  <td className="k605">{tPdp.batterySpec}</td>
                  <td className="k604">{product.batteryWh} Wh</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="k605">{tPdp.speedSpec}</td>
                  <td className="k604">
                    {product.speedMaxKmH} km/h ({product.speedClass === 'e-bike-45' ? '45 km/h S-Pedelec' : '25 km/h'})
                  </td>
                </tr>
                <tr>
                  <td className="k605">{tPdp.gearsSpec}</td>
                  <td className="k604">{localizeSpec(product.specs.gears, lang)}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="k605">{tPdp.brakesSpec}</td>
                  <td className="k604">{localizeSpec(product.specs.brakes, lang)}</td>
                </tr>
                <tr>
                  <td className="k605">{tPdp.forkSpec}</td>
                  <td className="k604">{localizeSpec(product.specs.fork, lang)}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="k605">{tPdp.frameSpec}</td>
                  <td className="k604">
                    {localizeSpec(product.frameMaterial, lang)} · {frameTypeLabel}
                  </td>
                </tr>
                <tr>
                  <td className="k605">{tPdp.sizesSpec}</td>
                  <td className="k604">{product.frameSizes.join(', ')}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="k605">{tPdp.weightSpec}</td>
                  <td className="k604">{product.weightKg ? `${product.weightKg} kg` : '-'}</td>
                </tr>
                <tr>
                  <td className="k605">{tPdp.lightingSpec}</td>
                  <td className="k604">{localizeSpec(product.specs.lighting, lang)} · {localizeSpec(product.specs.display, lang)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Long-form description built from the product data */}
      <section className="k606">
        <h2 className="k144">
          {lang === 'fr' ? `À propos du ${product.name}` : lang === 'it' ? `Informazioni su ${product.name}` : `Über das ${product.name}`}
        </h2>
        {buildProductContent(product, lang).map((s) => (
          <div key={s.heading} className="space-y-2">
            <h3 className="font-bold text-slate-900">{s.heading}</h3>
            {s.paragraphs.map((para, i) => (
              <p key={i} className="k131">{para}</p>
            ))}
          </div>
        ))}
        {familyOf(product).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900">
              {lang === 'fr' ? 'Autres modèles de la série' : lang === 'it' ? 'Altri modelli della serie' : 'Weitere Modelle der Serie'}
            </h3>
            <ul className="text-sm space-y-1">
              {familyOf(product).map((q) => {
                const qc = CATEGORIES.find((c) => c.id === q.categoryId);
                return (
                  <li key={q.id}>
                    <NavLink
                      href={buildLocalizedUrl(lang, { lang, view: 'product', category: qc, productSlug: q.slug })}
                      onNavigate={onNavigate}
                      className="k134"
                    >
                      {q.name}
                    </NavLink>{' '}
                    <span className="text-slate-500">– {q.priceEstimated ? (lang === 'fr' ? 'env. ' : 'ca. ') : ''}CHF {Math.round(q.priceCHF).toLocaleString('de-CH')}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {/* Related Models */}
      <div className="k607">
        <h2 className="k144">
          {tPdp.relatedTitle} {category?.name[lang]}
        </h2>
        <div className="k314">
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
