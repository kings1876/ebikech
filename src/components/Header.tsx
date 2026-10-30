import { useState, useRef, useEffect } from 'react';
import { Language, CategoryDef } from '../types';
import { CATEGORIES, SECTION_ROOTS } from '../data/categories';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { ALL_PRODUCTS } from '../data/productsGenerator';
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

  return (
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
              {portalName} – 500 {t.header.models}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'home' }))}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl leading-none">+</span>
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                <span>{portalName.slice(0, 4)}</span>
                <span className="text-red-600">{portalName.slice(4)}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-red-100 text-red-700 rounded ml-1">
                  .CH
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">
                {t.header.tagline}
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
          {/* Catalogue Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCatDropdownOpen(true)}
            onMouseLeave={() => setCatDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentRoute.view === 'catalog-root' || currentRoute.view === 'category' || currentRoute.view === 'subcategory'
                  ? 'bg-red-50 text-red-700'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-red-600" />
              <span>{t.header.catalogue}</span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">500</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Megamenu Dropdown */}
            {catDropdownOpen && (
              <div className="absolute top-full left-0 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-3 py-1 flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>{t.header.allCategories}</span>
                  <span className="text-red-600 font-bold">500 {t.header.total}</span>
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCatDropdownOpen(false);
                      onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category: cat }));
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                        {CATEGORY_ICONS[cat.id]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-xs group-hover:text-red-700 transition-colors">
                          {cat.name[lang]}
                        </div>
                        {cat.subcategories && (
                          <div className="text-[10px] text-slate-600">
                            {cat.subcategories.map((s) => s.name[lang]).join(' · ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cat.targetCount}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brands Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setBrandDropdownOpen(true)}
            onMouseLeave={() => setBrandDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand-root' }))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentRoute.view === 'brand-root' || currentRoute.view === 'brand' || currentRoute.view === 'brand-category'
                  ? 'bg-red-50 text-red-700'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t.header.brands}</span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">16</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {brandDropdownOpen && (
              <div className="absolute top-full left-0 w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-3 py-1 border-b border-slate-100 pb-2">
                  <span>{t.header.allBrands}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 pt-2">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setBrandDropdownOpen(false);
                        onNavigate(buildLocalizedUrl(lang, { lang, view: 'brand', brand }));
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-left text-xs cursor-pointer group"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-red-700 flex items-center gap-1">
                        {brand.isSwiss && <span className="text-[10px]" title="Swiss Made">🇨🇭</span>}
                        {brand.name}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono">
                        {brand.targetCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guides Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGuideDropdownOpen(true)}
            onMouseLeave={() => setGuideDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-root' }))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentRoute.view === 'guide-root' || currentRoute.view === 'guide-cluster' || currentRoute.view === 'guide-detail'
                  ? 'bg-red-50 text-red-700'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{t.header.guides}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {guideDropdownOpen && (
              <div className="absolute top-full left-0 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                {GUIDE_CLUSTERS.map((cl) => (
                  <button
                    key={cl.id}
                    onClick={() => {
                      setGuideDropdownOpen(false);
                      onNavigate(buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl }));
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="font-semibold text-xs text-slate-800 group-hover:text-red-700">
                      {cl.title[lang]}
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                      {cl.shortDesc[lang]}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Canton Subsidies Link */}
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' }))}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              currentRoute.view === 'canton-subsidies' ? 'bg-red-50 text-red-700' : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>{t.header.subsidies}</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              CHF 1’000.-
            </span>
          </button>
        </nav>

        {/* Search Bar & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Search Input */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-36 sm:w-56 md:w-64 pl-8 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Quick search popup results */}
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
                        className="w-full text-left p-2 hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer rounded-lg"
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{product.name}</div>
                          <div className="text-[10px] text-slate-600">{product.motorModel} · {product.batteryWh} Wh</div>
                        </div>
                        <div className="font-bold text-red-600 font-mono text-[11px]">
                          CHF {product.priceCHF.toLocaleString('de-CH')}.-
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Comparison Tray Button */}
          <button
            onClick={onOpenCompare}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              compareCount > 0
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30 hover:bg-red-700 animate-pulse'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="E-Bike Vergleich öffnen"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {t.header.compare}
            </span>
            {compareCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-red-600 text-[11px] font-black flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-xl">
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
            {CATEGORIES.map((cat) => (
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
                  {cat.targetCount}
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
                onNavigate(buildLocalizedUrl(lang, { lang, view: 'canton-subsidies' }));
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-semibold text-emerald-800 bg-emerald-50"
            >
              <span>{t.header.subsidies}</span>
              <Coins className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
