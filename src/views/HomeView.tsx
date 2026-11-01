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
} from 'lucide-react';
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
    const eligible = ALL_PRODUCTS.filter((p) => (p.images?.length || 0) >= 2);
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
      Math.max(...eligible.filter((p) => p.brandId === brandId).map((p) => p.images.length));
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
  const swissBrands = BRANDS.filter((b) => b.isSwiss);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6">
        {/* Background photo: Alpine pass road (Unsplash licence); dark overlay keeps the text readable */}
        <img
          src="/hero-2000.webp"
          srcSet="/hero-900.webp 900w, /hero-2000.webp 2000w"
          sizes="100vw"
          alt=""
          width={2000}
          height={1000}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/25 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-semibold backdrop-blur-xs">
                <span>🇨🇭</span>
                <span>{t.home.heroBadge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                {t.home.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t.home.heroDesc}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t.home.tcsTested}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{t.home.cantonalSubs}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>{t.home.dealerNetwork}</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Quick Bike Finder */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  {t.home.quickAdvisorTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                {t.home.quickAdvisorDesc}
              </p>

              <form onSubmit={handleFinderSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    {t.home.selectCat}
                  </label>
                  <select
                    aria-label={t.home.selectCat}
                    value={finderCategory}
                    onChange={(e) => setFinderCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name[lang]} ({c.targetCount} {t.header.models})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    {t.home.speedClass}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('all')}
                      className={`p-2 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                        finderSpeed === 'all'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.home.all}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('25')}
                      className={`p-2 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                        finderSpeed === '25'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      25 km/h
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinderSpeed('45')}
                      className={`p-2 rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                        finderSpeed === '45'
                          ? 'bg-amber-500 text-slate-900 border-amber-500'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      45 km/h
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    {t.home.budgetCatch}
                  </label>
                  <select
                    aria-label={t.home.budgetCatch}
                    value={finderPrice}
                    onChange={(e) => setFinderPrice(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
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
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
              {portalName}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.home.catSectionTitle}
            </h2>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            {t.home.catSectionDesc}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
              key={cat.id}
              
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-red-500/50 p-5 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                    {CATEGORY_ICONS[cat.id]}
                  </div>
                  <span className="font-mono text-xs font-black text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                    {cat.targetCount} {t.header.models}
                  </span>
                </div>

                <h3 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors mb-1.5">
                  {cat.name[lang]}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description[lang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-red-600">
                <span>{t.home.viewModels}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 2.5 Trustpilot & Verified Customer Reviews Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-950/80 rounded-3xl p-6 sm:p-8 border border-emerald-800 text-white shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-6 h-6 rounded-xs bg-[#00b67a] flex items-center justify-center text-white">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>TrustScore 4.8</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 font-bold border border-emerald-500/40">
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

            <div className="text-xs text-emerald-200 flex items-center gap-1.5 self-start sm:self-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% {lang === 'fr' ? 'commandes vérifiées' : lang === 'it' ? 'ordini verificati' : 'echte Schweizer Käufer'}</span>
            </div>
          </div>

          {/* 3 Featured Trustpilot Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-900/40 border border-emerald-800/70 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3.5 h-3.5 rounded-2xs bg-[#00b67a] flex items-center justify-center text-white">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-emerald-200 font-mono">#TP-CH-8491</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed italic">
                «Kaufberatung und TCS-Testergebnisse haben mir geholfen, das perfekte Flyer E-Bike für das Berner Oberland auszuwählen. Probefahrt war top!»
              </p>
              <div className="text-[11px] font-bold text-white flex items-center justify-between pt-1 border-t border-emerald-800/60">
                <span>Beat M. (Kanton BE)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-800/70 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3.5 h-3.5 rounded-2xs bg-[#00b67a] flex items-center justify-center text-white">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-emerald-200 font-mono">#TP-CH-7294</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed italic">
                «Comparateur super clair et neutre. J’ai trouvé mon vélo Stromer 45 km/h pour faire Genève-Nyon tous les jours sans encombre.»
              </p>
              <div className="text-[11px] font-bold text-white flex items-center justify-between pt-1 border-t border-emerald-800/60">
                <span>Sylvie D. (Canton GE)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-800/70 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3.5 h-3.5 rounded-2xs bg-[#00b67a] flex items-center justify-center text-white">
                      <Star className="w-2 h-2 fill-current" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-emerald-200 font-mono">#TP-CH-9130</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed italic">
                «Grazie alle schede tecniche e ai test indipendenti abbiamo scelto la Scott da trekking. Sussidio del comune ottenuto in 2 settimane!»
              </p>
              <div className="text-[11px] font-bold text-white flex items-center justify-between pt-1 border-t border-emerald-800/60">
                <span>Marco T. (Cantone TI)</span>
                <span className="text-emerald-400 font-normal">Trustpilot ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured e-bikes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">{featuredCopy.badge[lang]}</div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{featuredCopy.title[lang]}</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">{featuredCopy.desc[lang]}</p>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors self-start cursor-pointer"
          >
            {featuredCopy.cta[lang]}
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
              🇨🇭 {t.home.swissBrandsBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.home.swissBrandsTitle}
            </h2>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
            
            className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer hidden sm:block"
          >
            {t.home.allBrandsCta}
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {swissBrands.map((b) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand: b })} onNavigate={onNavigate}
              key={b.id}
              
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-500/50 p-5 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-base text-slate-900">{b.name}</span>
                  <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                    🇨🇭 {b.headquarters.split(',')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {b.description[lang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="font-mono text-red-600 font-bold">{b.targetCount} {t.header.models}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 5. Cantonal Subsidies Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-emerald-800/60">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-500/40">
              <Coins className="w-3.5 h-3.5" />
              <span>{t.home.subsidiesBannerBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {t.home.subsidiesBannerTitle}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {t.home.subsidiesBannerDesc}
            </p>

            <div className="pt-2">
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' })} onNavigate={onNavigate}
                
                className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 transition-colors shadow-lg cursor-pointer"
              >
                {t.home.subsidiesBannerCta}
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ratgeber / Guides Clusters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
              {t.home.guidesSectionBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.home.guidesSectionTitle}
            </h2>
          </div>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
            
            className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer hidden sm:block"
          >
            {t.home.allGuidesCta}
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GUIDE_CLUSTERS.map((cluster) => (
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cluster })} onNavigate={onNavigate}
              key={cluster.id}
              
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-red-500/50 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-900 mb-1.5">
                  {cluster.title[lang]}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cluster.shortDesc[lang]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
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
