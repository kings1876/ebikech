import { useState, useRef, useEffect } from 'react';
import { Language, CategoryDef } from '../types';
import { CATEGORIES, SECTION_ROOTS } from '../data/categories';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ALL_PRODUCTS } from '../data/products';
import { I18N } from '../data/i18n';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Award,
  BookOpen,
  Coins,
  Menu,
  X,
  Zap,
  Mountain,
  Compass,
  Building2,
  Gauge,
  Truck,
  FolderSync,
  Smile,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: ParsedRoute;
  onNavigate: (path: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'e-mountainbikes': <Mountain className="w-4 h-4 text-emerald-600" />,
  'e-trekkingbikes': <Compass className="w-4 h-4 text-blue-600" />,
  'e-citybikes': <Building2 className="w-4 h-4 text-indigo-600" />,
  'e-rennvelos-gravel': <Zap className="w-4 h-4 text-amber-600" />,
  'schnelle-e-bikes': <Gauge className="w-4 h-4 text-red-600" />,
  'e-lastenvelos': <Truck className="w-4 h-4 text-teal-600" />,
  'e-faltvelos': <FolderSync className="w-4 h-4 text-orange-600" />,
  'e-bikes-jugend': <Smile className="w-4 h-4 text-pink-600" />,
};

export function Header({ currentRoute, onNavigate, compareCount, onOpenCompare }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [guideDropdownOpen, setGuideDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const lang = currentRoute.lang;
  const t = I18N[lang];

  // Language switch handler
  const handleLanguageChange = (targetLang: Language) => {
    if (targetLang === lang) return;
    const targetUrl = buildLocalizedUrl(targetLang, currentRoute);
    onNavigate(targetUrl);
  };

  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for quick search preview
  const searchResults = searchQuery.trim().length >= 2
    ? ALL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.motorModel.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const langPrefix = lang === 'de' ? '' : `/${lang}`;
    onNavigate(`${langPrefix}/?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchFocused(false);
  };

  const portalName = lang === 'fr' ? 'VeloSuisse' : lang === 'it' ? 'VeloSvizzera' : 'VeloSchweiz';

  // Real counts from the published catalogue (only show categories/brands that have products)
  const catCounts: Record<string, number> = {};
  const brandCounts: Record<string, number> = {};
  for (const p of ALL_PRODUCTS) {
    catCounts[p.categoryId] = (catCounts[p.categoryId] || 0) + 1;
    brandCounts[p.brandId] = (brandCounts[p.brandId] || 0) + 1;
  }
  const activeCats = CATEGORIES.filter((c) => catCounts[c.id] > 0);
  const activeBrands = BRANDS.filter((b) => brandCounts[b.id] > 0);

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-[15px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
      active ? 'text-red-700 bg-red-50' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
    }`;
  const isCatalogue = ['catalog-root', 'category', 'subcategory'].includes(currentRoute.view);
  const isBrands = ['brand-root', 'brand', 'brand-category'].includes(currentRoute.view);
  const isGuides = ['guide-root', 'guide-cluster', 'guide-detail'].includes(currentRoute.view);
  const closeOnBlur = (close: () => void) => (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
  };

  return (
    <>
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: Swiss Official Quality & Language Switcher */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 bg-red-600 text-white font-bold text-[10px] rounded-xs shadow-xs">
              +
            </span>
            <span className="font-medium text-slate-300 hidden sm:inline">
              {t.header.topBanner}
            </span>
            <span className="font-medium text-slate-300 sm:hidden">
              {portalName} – {ALL_PRODUCTS.length} {t.header.models}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.header.independent}</span>
            </span>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
              <button
                onClick={() => handleLanguageChange('de')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  lang === 'de' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Deutsch (de-CH)"
              >
                DE
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  lang === 'fr' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Français (fr-CH)"
              >
                FR
              </button>
              <button
                onClick={() => handleLanguageChange('it')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  lang === 'it' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
                title="Italiano (it-CH)"
              >
                IT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 lg:gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'home' }))}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          aria-label={portalName}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-xl leading-none">+</span>
          </div>
          <div className="leading-none">
            <div className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>{portalName.slice(0, 4)}</span>
              <span className="text-red-600">{portalName.slice(4)}</span>
              <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-red-100 text-red-700 rounded">.CH</span>
            </div>
            <p className="hidden xl:block text-[10px] text-slate-600 font-medium mt-1">{t.header.tagline}</p>
          </div>
        </button>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center gap-1 ml-2" aria-label="Main">
          {/* Catalogue */}
          <div
            className="relative"
            onMouseEnter={() => setCatDropdownOpen(true)}
            onMouseLeave={() => setCatDropdownOpen(false)}
            onFocus={() => setCatDropdownOpen(true)}
            onBlur={closeOnBlur(() => setCatDropdownOpen(false))}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
              className={linkClass(isCatalogue)}
              aria-haspopup="true"
              aria-expanded={catDropdownOpen}
            >
              <span>{t.header.catalogue}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {catDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-[460px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3">
                  <div className="grid grid-cols-2 gap-1">
                    {activeCats.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCatDropdownOpen(false);
                          onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category: cat }));
                        }}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span className="shrink-0">{CATEGORY_ICONS[cat.id]}</span>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-red-700 truncate">{cat.name[lang]}</span>
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{catCounts[cat.id]}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setCatDropdownOpen(false);
                      onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }));
                    }}
                    className="mt-2 w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-sm font-semibold text-slate-800 cursor-pointer"
                  >
                    <span>{t.header.allCategories}</span>
                    <span className="text-red-600 font-mono text-xs">{ALL_PRODUCTS.length}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Brands */}
          <div
            className="relative"
            onMouseEnter={() => setBrandDropdownOpen(true)}
            onMouseLeave={() => setBrandDropdownOpen(false)}
            onFocus={() => setBrandDropdownOpen(true)}
            onBlur={closeOnBlur(() => setBrandDropdownOpen(false))}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand-root' }))}
              className={linkClass(isBrands)}
              aria-haspopup="true"
              aria-expanded={brandDropdownOpen}
            >
              <span>{t.header.brands}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {brandDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3">
                  <div className="grid grid-cols-2 gap-1">
                    {activeBrands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => {
                          setBrandDropdownOpen(false);
                          onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand', brand }));
                        }}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-left cursor-pointer group"
                      >
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-red-700 flex items-center gap-1.5">
                          {brand.name}
                          {brand.isSwiss && <span className="text-[11px]" title="Swiss">🇨🇭</span>}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{brandCounts[brand.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guides */}
          <div
            className="relative"
            onMouseEnter={() => setGuideDropdownOpen(true)}
            onMouseLeave={() => setGuideDropdownOpen(false)}
            onFocus={() => setGuideDropdownOpen(true)}
            onBlur={closeOnBlur(() => setGuideDropdownOpen(false))}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-root' }))}
              className={linkClass(isGuides)}
              aria-haspopup="true"
              aria-expanded={guideDropdownOpen}
            >
              <span>{t.header.guides}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {guideDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 space-y-1">
                  {GUIDE_CLUSTERS.map((cl) => (
                    <button
                      key={cl.id}
                      onClick={() => {
                        setGuideDropdownOpen(false);
                        onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl }));
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="font-semibold text-sm text-slate-800 group-hover:text-red-700">{cl.title[lang]}</div>
                      <div className="text-xs text-slate-600 line-clamp-1 mt-0.5">{cl.shortDesc[lang]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog & FAQ */}
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'blog-root' }))}
            className={linkClass(currentRoute.view === 'blog-root' || currentRoute.view === 'blog-post')}
          >
            Blog
          </button>
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'faq' }))}
            className={linkClass(currentRoute.view === 'faq')}
          >
            FAQ
          </button>
        <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'contact' }))}
            className={linkClass(currentRoute.view === 'contact')}
          >
            {lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}
          </button>
        </nav>

        {/* Search & actions */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative" role="search">
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                aria-label={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-40 sm:w-56 xl:w-72 pl-9 pr-3 py-2 text-sm bg-slate-100 border border-transparent rounded-full focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white focus:border-slate-200 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {searchFocused && searchResults.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-3 py-1 border-b border-slate-100">
                  {t.header.quickResults}
                </div>
                <div className="divide-y divide-slate-100 mt-1">
                  {searchResults.map((product) => {
                    const cat = CATEGORIES.find((c) => c.id === product.categoryId);
                    return (
                      <button
                        key={product.id}
                        onClick={() => {
                          setSearchFocused(false);
                          if (cat) {
                            onNavigate(buildLocalizedUrl(lang, { lang, view: 'product', category: cat, productSlug: product.slug }));
                          }
                        }}
                        className="w-full text-left p-2 hover:bg-slate-50 flex items-center justify-between gap-2 text-xs cursor-pointer rounded-lg"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">{product.name}</div>
                          <div className="text-[10px] text-slate-600 truncate">{product.motorModel} · {product.batteryWh} Wh</div>
                        </div>
                        <div className="font-bold text-red-600 font-mono text-[11px] shrink-0">
                          {product.priceEstimated ? 'ca. ' : product.priceFrom ? 'ab ' : ''}CHF {product.priceCHF.toLocaleString('de-CH')}.-
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-xl">
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} role="search" className="relative md:hidden">
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              aria-label={t.header.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-base bg-slate-100 border border-transparent rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3">
            <button
              onClick={() => handleLanguageChange('de')}
              className={`py-1.5 rounded-lg text-center font-bold text-xs ${lang === 'de' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Deutsch (de-CH)
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`py-1.5 rounded-lg text-center font-bold text-xs ${lang === 'fr' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Français (fr-CH)
            </button>
            <button
              onClick={() => handleLanguageChange('it')}
              className={`py-1.5 rounded-lg text-center font-bold text-xs ${lang === 'it' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Italiano (it-CH)
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider px-2">{t.header.catalogue}</div>
            {activeCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category: cat }));
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
              >
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat.id]}
                  <span>{cat.name[lang]}</span>
                </div>
                <span className="text-[10px] text-slate-600 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                  {catCounts[cat.id]}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand-root' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>{t.header.brands}</span>
              <Award className="w-4 h-4 text-amber-500" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-root' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>{t.header.guides}</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'blog-root' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>Blog</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'faq' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>FAQ</span>
              <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'contact' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <span>{lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90" />
            </button>
          </div>
        </div>
      )}
    </header>
    {compareCount > 0 && (
      <button
        onClick={onOpenCompare}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-red-600 text-white text-sm font-bold shadow-xl shadow-red-600/30 hover:bg-red-700 cursor-pointer"
        aria-label={t.header.compare}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>{t.header.compare}</span>
        <span className="w-5 h-5 rounded-full bg-white text-red-600 text-[11px] font-black flex items-center justify-center">{compareCount}</span>
      </button>
    )}
    </>
  );
}
