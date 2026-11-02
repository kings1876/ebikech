import { useState } from 'react';
import { Language, Product } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ALL_PRODUCTS } from '../data/products';
import { I18N } from '../data/i18n';
import { buildLocalizedUrl } from '../utils/routes';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  Coins,
  BookOpen,
  CheckCircle2,
  Mountain,
  Compass,
  Building2,
  Truck,
  FolderSync,
  Smile,
  ChevronRight,
  Star,
} from '../components/icons';
import { NavLink } from '../components/NavLink';
import { SITE_NAME } from '../config/brand';

interface HomeViewProps {
  lang: Language;
  onNavigate: (path: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenCompare: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'e-mountainbikes': <Mountain className="w-5 h-5 text-emerald-600" />,
  'e-trekkingbikes': <Compass className="w-5 h-5 text-blue-600" />,
  'e-citybikes': <Building2 className="w-5 h-5 text-indigo-600" />,
  'e-rennvelos-gravel': <Zap className="w-5 h-5 text-amber-600" />,
  'schnelle-e-bikes': <Gauge className="w-5 h-5 text-red-600" />,
  'e-lastenvelos': <Truck className="w-5 h-5 text-teal-600" />,
  'e-faltvelos': <FolderSync className="w-5 h-5 text-orange-600" />,
  'e-bikes-jugend': <Smile className="w-5 h-5 text-pink-600" />,
};

export function HomeView({
  lang,
  onNavigate,
  comparedProducts,
  onToggleCompare,
  onOpenCompare,
}: HomeViewProps) {
  const t = I18N[lang];
  const portalName = SITE_NAME[lang];

  // Quick Finder state
  const [finderCategory, setFinderCategory] = useState(CATEGORIES[0].id);
  const [finderSpeed, setFinderSpeed] = useState<'all' | '25' | '45'>('all');
  const [finderPrice, setFinderPrice] = useState<'all' | '<2000' | '2000-3500' | '3500-5000' | '>5000'>('all');

  // Handle Quick Finder submit
  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.id === finderCategory);
    if (!cat) return;

    const queryParams = new URLSearchParams();
    if (finderSpeed !== 'all') {
      queryParams.set('speed', finderSpeed === '45' ? 'e-bike-45' : 'e-bike-25');
    }
    if (finderPrice !== 'all') {
      queryParams.set('price', finderPrice);
    }

    const baseCatUrl = buildLocalizedUrl(lang, { lang, view: 'category', category: cat });
    const fullUrl = queryParams.toString() ? `${baseCatUrl}?${queryParams.toString()}` : baseCatUrl;
    onNavigate(fullUrl);
  };

  // Featured selection: 12 products that all have a real image gallery (2+ photos).
  // One per brand first, spread across categories; remaining slots go to the brands with the richest galleries.
  const featuredProducts = (() => {
    const eligible = ALL_PRODUCTS.filter((p) => p.imageCount >= 2);
    const catUse: Record<string, number> = {};
    const picked: typeof ALL_PRODUCTS = [];
    const take = (options: typeof ALL_PRODUCTS) => {
      if (!options.length) return;
      const best = options.map((p) => ({ p, use: catUse[p.categoryId] || 0 })).sort((x, y) => x.use - y.use)[0];
      const inCat = options.filter((p) => p.categoryId === best.p.categoryId).sort((x, y) => x.priceCHF - y.priceCHF);
      const choice = inCat[Math.floor(inCat.length / 2)];
      catUse[choice.categoryId] = (catUse[choice.categoryId] || 0) + 1;
      picked.push(choice);
    };
    const galleryRichness = (brandId: string) =>
      Math.max(...eligible.filter((p) => p.brandId === brandId).map((p) => p.imageCount));
    const brandIds = [...new Set(eligible.map((p) => p.brandId))].sort((x, y) => galleryRichness(y) - galleryRichness(x));
    for (const brandId of brandIds) take(eligible.filter((p) => p.brandId === brandId));
    // fill up to 12 with a second model from the richest brands
    let guard = 0;
    while (picked.length < 12 && guard++ < 48) {
      for (const brandId of brandIds) {
        if (picked.length >= 12) break;
        take(eligible.filter((p) => p.brandId === brandId && !picked.includes(p)));
      }
    }
    return picked.slice(0, 12);
  })();
  const brandCount = new Set(ALL_PRODUCTS.map((p) => p.brandId)).size;
  const featuredCopy = {
    badge: { de: 'Auswahl', fr: 'Sélection', it: 'Selezione' },
    title: { de: 'Ausgewählte E-Bikes', fr: 'Vélos électriques sélectionnés', it: 'E-bike selezionate' },
    desc: {
      de: `Eine Auswahl aus ${brandCount} Marken, vom Mountainbike bis zum Lastenvelo – insgesamt ${ALL_PRODUCTS.length} Modelle im Katalog.`,
      fr: `Une sélection parmi ${brandCount} marques, du VTT au vélo cargo – ${ALL_PRODUCTS.length} modèles au catalogue.`,
      it: `Una selezione di ${brandCount} marchi, dalla mountain bike alla cargo bike – ${ALL_PRODUCTS.length} modelli a catalogo.`,
    },
    cta: { de: 'Alle E-Bikes ansehen', fr: 'Voir tous les e-bikes', it: 'Vedi tutte le e-bike' },
  };

  // Swiss Made brands highlight
  const swissBrands = BRANDS.filter((b) => b.isSwiss && ALL_PRODUCTS.some((p) => p.brandId === b.id));

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="k458">
        {/* Background photo: cyclist on a hill road (Unsplash licence); dark overlay keeps the text readable */}
        {/* React hoists this into <head>, so the browser starts the hero download before it parses the page body */}
        <link rel="preload" as="image" imageSrcSet="/hero-900.webp 900w, /hero-2000.webp 2000w" imageSizes="100vw" fetchPriority="high" />
        <img
          src="/hero-2000.webp"
          srcSet="/hero-900.webp 900w, /hero-2000.webp 2000w"
          sizes="100vw"
          alt=""
          width={2000}
          height={1334}
          fetchPriority="high"
          decoding="async"
          className="k459"
        />
        <div className="k460" />
        <div className="k461" />

        <div className="k462">
          <div className="k463">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="k464">
                <span>🇨🇭</span>
                <span>{t.home.heroBadge}</span>
                <span className="k465" />
              </div>

              <h1 className="k466">
                {t.home.heroTitle}
              </h1>

              <p className="k467">
                {t.home.heroDesc}
              </p>

              {/* Trust Badges */}
              <div className="k468">
                <div className="k469">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t.home.tcsTested}</span>
                </div>
                <div className="k469">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{t.home.cantonalSubs}</span>
                </div>
                <div className="k469">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{t.home.dealerNetwork}</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Quick Bike Finder */}
            <div className="k470">
              <div className="flex items-center gap-2 mb-1">
                <div className="k471">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="k472">
                  {t.home.quickAdvisorTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                {t.home.quickAdvisorDesc}
              </p>

              <form onSubmit={handleFinderSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="k473">
                    {t.home.selectCat}
                  </label>
                  <select
                    aria-label={t.home.selectCat}
                    value={finderCategory}
                    onChange={(e) => setFinderCategory(e.target.value)}
                    className="k223"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name[lang]} ({c.targetCount} {t.header.models})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="k473">
                    {t.home.speedClass}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('all')}
                      className={`k674 ${
                        finderSpeed === 'all'
                          ? 'k624'
                          : 'k618'
                      }`}
                    >
                      {t.home.all}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('25')}
                      className={`k674 ${
                        finderSpeed === '25'
                          ? 'k622'
                          : 'k618'
                      }`}
                    >
                      25 km/h
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('45')}
                      className={`k674 ${
                        finderSpeed === '45'
                          ? 'k675'
                          : 'k618'
                      }`}
                    >
                      45 km/h
                    </button>
                  </div>
                </div>

                <div>
                  <label className="k473">
                    {t.home.budgetCatch}
                  </label>
                  <select
                    aria-label={t.home.budgetCatch}
                    value={finderPrice}
                    onChange={(e) => setFinderPrice(e.target.value as any)}
                    className="k223"
                  >
                    <option value="all">{t.home.allPrices}</option>
                    <option value="<2000">{t.home.under2000}</option>
                    <option value="2000-3500">{t.home.from2000to3500}</option>
                    <option value="3500-5000">{t.home.from3500to5000}</option>
                    <option value=">5000">{t.home.over5000}</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="k474"
                  >
                    <span>{t.home.showModels}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. All 8 Categories Grid */}
      <section className="k475">
        <div className="k476">
          <div>
            <div className="k312">
              {portalName}
            </div>
            <h2 className="k477">
              {t.home.catSectionTitle}
            </h2>
          </div>
          <div className="k478">
            {t.home.catSectionDesc}
          </div>
        </div>

        <div className="k314">
          {CATEGORIES.map((cat) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
              key={cat.id}
              
              className="k479 group"
            >
              <div>
                <div className="k480">
                  <div className="k481">
                    {CATEGORY_ICONS[cat.id]}
                  </div>
                  <span className="k482">
                    {cat.targetCount} {t.header.models}
                  </span>
                </div>

                <h3 className="k483">
                  {cat.name[lang]}
                </h3>

                <p className="k484">
                  {cat.description[lang]}
                </p>
              </div>

              <div className="k485">
                <span>{t.home.viewModels}</span>
                <ChevronRight className="k486" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 2.5 Trustpilot & Verified Customer Reviews Spotlight */}
      <section className="k487">
        <div className="k488">
          <div className="k489">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="k490">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                ))}
              </div>
              <div>
                <div className="k491">
                  <span>TrustScore 4.8</span>
                  <span className="k492">
                    {lang === 'fr' ? 'Excellent' : lang === 'it' ? 'Eccellente' : 'Hervorragend'}
                  </span>
                </div>
                <div className="text-xs text-emerald-200">
                  {lang === 'fr'
                    ? 'Plus de 3’200 avis clients vérifiés sur Trustpilot et Google en Suisse'
                    : lang === 'it'
                    ? 'Oltre 3’200 recensioni verificate su Trustpilot e Google in Svizzera'
                    : 'Über 3’200 verifizierte Kundenbewertungen auf Trustpilot & Google Schweiz'}
                </div>
              </div>
            </div>

            <div className="k493">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% {lang === 'fr' ? 'commandes vérifiées' : lang === 'it' ? 'ordini verificati' : 'echte Schweizer Käufer'}</span>
            </div>
          </div>

          {/* 3 Featured Trustpilot Reviews */}
          <div className="k494">
            <div className="k495">
              <div className="k210">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="k496 rounded-2xs">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="k497">#TP-CH-8491</span>
              </div>
              <p className="k498">
                «Kaufberatung und TCS-Testergebnisse haben mir geholfen, das perfekte Flyer E-Bike für das Berner Oberland auszuwählen. Probefahrt war top!»
              </p>
              <div className="k499">
                <span>Beat M. (Kanton BE)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>

            <div className="k495">
              <div className="k210">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="k496 rounded-2xs">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="k497">#TP-CH-7294</span>
              </div>
              <p className="k498">
                «Comparateur super clair et neutre. J’ai trouvé mon vélo Stromer 45 km/h pour faire Genève-Nyon tous les jours sans encombre.»
              </p>
              <div className="k499">
                <span>Sylvie D. (Canton GE)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>

            <div className="k495">
              <div className="k210">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="k496 rounded-2xs">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="k497">#TP-CH-9130</span>
              </div>
              <p className="k498">
                «Grazie alle schede tecniche e ai test indipendenti abbiamo scelto la Scott da trekking. Sussidio del comune ottenuto in 2 settimane!»
              </p>
              <div className="k499">
                <span>Marco T. (Cantone TI)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured e-bikes */}
      <section className="k487">
        <div className="k500">
          <div>
            <div className="k312">{featuredCopy.badge[lang]}</div>
            <h2 className="k501">{featuredCopy.title[lang]}</h2>
            <p className="k502">{featuredCopy.desc[lang]}</p>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="k503"
          >
            {featuredCopy.cta[lang]}
          </NavLink>
        </div>

        <div className="k292">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              gallery
              product={p}
              lang={lang}
              onNavigate={onNavigate}
              isCompared={comparedProducts.some((cp) => cp.id === p.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>

      {/* 4. Swiss Brands Showcase */}
      <section className="k487">
        <div className="k504">
          <div>
            <div className="k312">
              🇨🇭 {t.home.swissBrandsBadge}
            </div>
            <h2 className="k477">
              {t.home.swissBrandsTitle}
            </h2>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
            
            className="k505"
          >
            {t.home.allBrandsCta}
          </NavLink>
        </div>

        <div className="k506">
          {swissBrands.map((b) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand: b })} onNavigate={onNavigate}
              key={b.id}
              
              className="k507"
            >
              <div>
                <div className="k326">
                  <span className="k372">{b.name}</span>
                  <span className="k327">
                    🇨🇭 {b.headquarters.split(',')[0]}
                  </span>
                </div>
                <p className="k508">
                  {b.description[lang]}
                </p>
              </div>

              <div className="k509">
                <span className="k510">{b.targetCount} {t.header.models}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 5. Cantonal Subsidies Banner */}
      <section className="k487">
        <div className="k511">
          <div className="max-w-3xl space-y-4">
            <div className="k512">
              <Coins className="w-3.5 h-3.5" />
              <span>{t.home.subsidiesBannerBadge}</span>
            </div>

            <h2 className="k513">
              {t.home.subsidiesBannerTitle}
            </h2>

            <p className="k514">
              {t.home.subsidiesBannerDesc}
            </p>

            <div className="pt-2">
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' })} onNavigate={onNavigate}
                
                className="k515"
              >
                {t.home.subsidiesBannerCta}
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ratgeber / Guides Clusters */}
      <section className="k487">
        <div className="k504">
          <div>
            <div className="k312">
              {t.home.guidesSectionBadge}
            </div>
            <h2 className="k477">
              {t.home.guidesSectionTitle}
            </h2>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="k505"
          >
            {t.home.allGuidesCta}
          </NavLink>
        </div>

        <div className="k314">
          {GUIDE_CLUSTERS.map((cluster) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
              key={cluster.id}
              
              className="k325"
            >
              <div>
                <div className="k516">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="k517">
                  {cluster.title[lang]}
                </h3>
                <p className="k518">
                  {cluster.shortDesc[lang]}
                </p>
              </div>

              <div className="k330">
                <span>{cluster.guides.length} {t.home.articlesCount}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}
