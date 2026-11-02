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
  Check,
  Mail,
  ShoppingCart,
} from './icons';
import { CONTACT } from '../config/contact';
import { NavLink } from './NavLink';
import { LogoMark } from './Logo';
import { SITE_NAME, WORDMARK } from '../config/brand';

interface HeaderProps {
  currentRoute: ParsedRoute;
  onNavigate: (path: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  cartCount: number;
  onOpenCart: () => void;
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

export function Header({ currentRoute, onNavigate, compareCount, onOpenCompare, cartCount, onOpenCart }: HeaderProps) {
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

  const portalName = SITE_NAME[lang];
  const wordmark = WORDMARK[lang];

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
    `k697 ${
      active ? 'k698' : 'k699'
    }`;
  const isCatalogue = ['catalog-root', 'category', 'subcategory'].includes(currentRoute.view);
  const isBrands = ['brand-root', 'brand', 'brand-category'].includes(currentRoute.view);
  const isGuides = ['guide-root', 'guide-cluster', 'guide-detail'].includes(currentRoute.view);
  const closeOnBlur = (close: () => void) => (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
  };

  return (
    <>
    <header className="k72">
      {/* Top Banner: Swiss Official Quality & Language Switcher */}
      <div className="k73">
        <div className="k74">
          <div className="flex items-center gap-2">
            <span className="k75">
              +
            </span>
            <span className="k76">
              {t.header.topBanner}
            </span>
            <span className="k77">
              {portalName} – {ALL_PRODUCTS.length} {t.header.models}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="k78">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>{CONTACT.email}</span>
              </a>
            )}

            {/* Language Switcher */}
            <div className="k79">
              <button
                onClick={() => handleLanguageChange('de')}
                className={`k627 ${
                  lang === 'de' ? 'k628' : 'k629'
                }`}
                title="Deutsch (de-CH)"
              >
                DE
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                className={`k627 ${
                  lang === 'fr' ? 'k628' : 'k629'
                }`}
                title="Français (fr-CH)"
              >
                FR
              </button>
              <button
                onClick={() => handleLanguageChange('it')}
                className={`k627 ${
                  lang === 'it' ? 'k628' : 'k629'
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
      <div className="k80">
        {/* Brand Logo */}
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}
          
          className="k81 group"
        >
          <LogoMark className="k82" />
          <div className="leading-none">
            <div className="k83">
              <span>{wordmark.lead}</span>
              <span className="text-red-600 font-semibold">{wordmark.tail}</span>
            </div>
            <p className="k84">{t.header.tagline}</p>
          </div>
        </NavLink>

        {/* Desktop Menu Links */}
        <nav className="k85" aria-label="Main">
          {/* Catalogue */}
          <div
            className="relative"
            onMouseEnter={() => setCatDropdownOpen(true)}
            onMouseLeave={() => setCatDropdownOpen(false)}
            onFocus={() => setCatDropdownOpen(true)}
            onBlur={closeOnBlur(() => setCatDropdownOpen(false))}
          >
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
              
              className={linkClass(isCatalogue)}
              aria-haspopup="true"
              aria-expanded={catDropdownOpen}
            >
              <span>{t.header.catalogue}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </NavLink>
            {catDropdownOpen && (
              <div className="k86">
                <div className="k87">
                  <div className="grid grid-cols-2 gap-1">
                    {activeCats.map((cat) => (
                      <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
                        key={cat.id}
                        onClick={() => { setCatDropdownOpen(false); }}
                        className="k88 group"
                      >
                        <span className="k89">
                          <span className="shrink-0">{CATEGORY_ICONS[cat.id]}</span>
                          <span className="k90">{cat.name[lang]}</span>
                        </span>
                        <span className="k91">{catCounts[cat.id]}</span>
                      </NavLink>
                    ))}
                  </div>
                  <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
                    onClick={() => { setCatDropdownOpen(false); }}
                    className="k92"
                  >
                    <span>{t.header.allCategories}</span>
                    <span className="k93">{ALL_PRODUCTS.length}</span>
                  </NavLink>
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
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
              
              className={linkClass(isBrands)}
              aria-haspopup="true"
              aria-expanded={brandDropdownOpen}
            >
              <span>{t.header.brands}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </NavLink>
            {brandDropdownOpen && (
              <div className="k86">
                <div className="k94">
                  <div className="grid grid-cols-2 gap-1">
                    {activeBrands.map((brand) => (
                      <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
                        key={brand.id}
                        onClick={() => { setBrandDropdownOpen(false); }}
                        className="k95 group"
                      >
                        <span className="k96">
                          {brand.name}
                          {brand.isSwiss && <span className="text-[11px]" title="Swiss">🇨🇭</span>}
                        </span>
                        <span className="k91">{brandCounts[brand.id]}</span>
                      </NavLink>
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
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
              
              className={linkClass(isGuides)}
              aria-haspopup="true"
              aria-expanded={guideDropdownOpen}
            >
              <span>{t.header.guides}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </NavLink>
            {guideDropdownOpen && (
              <div className="k86">
                <div className="k97">
                  {GUIDE_CLUSTERS.map((cl) => (
                    <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-cluster', guideCluster: cl })} onNavigate={onNavigate}
                      key={cl.id}
                      onClick={() => { setGuideDropdownOpen(false); }}
                      className="k98 group"
                    >
                      <div className="k99">{cl.title[lang]}</div>
                      <div className="k100">{cl.shortDesc[lang]}</div>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog & FAQ */}
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-root' })} onNavigate={onNavigate}
            
            className={linkClass(currentRoute.view === 'blog-root' || currentRoute.view === 'blog-post')}
          >
            Blog
          </NavLink>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'faq' })} onNavigate={onNavigate}
            
            className={linkClass(currentRoute.view === 'faq')}
          >
            FAQ
          </NavLink>
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
            
            className={linkClass(currentRoute.view === 'contact')}
          >
            {lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}
          </NavLink>
        </nav>

        {/* Search & actions */}
        <div className="k101">
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative" role="search">
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                aria-label={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="k102"
              />
              <Search className="k103" />
            </form>

            {searchFocused && searchResults.length > 0 && (
              <div className="k104">
                <div className="k105">
                  {t.header.quickResults}
                </div>
                <div className="k106">
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
                        className="k107"
                      >
                        <div className="min-w-0">
                          <div className="k108">{product.name}</div>
                          <div className="k109">{product.motorModel} · {product.batteryWh} Wh</div>
                        </div>
                        <div className="k110">
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
            type="button"
            onClick={onOpenCart}
            aria-label={lang === 'fr' ? 'Panier' : lang === 'it' ? 'Carrello' : 'Warenkorb'}
            className="k730"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && <span className="k731">{cartCount}</span>}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="k111"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="k112">
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} role="search" className="relative md:hidden">
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              aria-label={t.header.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="k113"
            />
            <Search className="k114" />
          </form>

          <div className="k115">
            <button
              onClick={() => handleLanguageChange('de')}
              className={`k630 ${lang === 'de' ? 'k631' : 'k632'}`}
            >
              Deutsch (de-CH)
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`k630 ${lang === 'fr' ? 'k631' : 'k632'}`}
            >
              Français (fr-CH)
            </button>
            <button
              onClick={() => handleLanguageChange('it')}
              className={`k630 ${lang === 'it' ? 'k631' : 'k632'}`}
            >
              Italiano (it-CH)
            </button>
          </div>

          <div className="space-y-1">
            <div className="k116">{t.header.catalogue}</div>
            {activeCats.map((cat) => (
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category: cat })} onNavigate={onNavigate}
                key={cat.id}
                onClick={() => { setMobileMenuOpen(false); }}
                className="k117"
              >
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat.id]}
                  <span>{cat.name[lang]}</span>
                </div>
                <span className="k118">
                  {catCounts[cat.id]}
                </span>
              </NavLink>
            ))}
          </div>

          <div className="k119">
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand-root' })} onNavigate={onNavigate}
              onClick={() => { setMobileMenuOpen(false); }}
              className="k117"
            >
              <span>{t.header.brands}</span>
              <Award className="w-4 h-4 text-amber-500" />
            </NavLink>

            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'guide-root' })} onNavigate={onNavigate}
              onClick={() => { setMobileMenuOpen(false); }}
              className="k117"
            >
              <span>{t.header.guides}</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </NavLink>

            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-root' })} onNavigate={onNavigate}
              onClick={() => { setMobileMenuOpen(false); }}
              className="k117"
            >
              <span>Blog</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </NavLink>

            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'faq' })} onNavigate={onNavigate}
              onClick={() => { setMobileMenuOpen(false); }}
              className="k117"
            >
              <span>FAQ</span>
              <ChevronDown className="k120" />
            </NavLink>

            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
              onClick={() => { setMobileMenuOpen(false); }}
              className="k117"
            >
              <span>{lang === 'fr' ? 'Contact' : lang === 'it' ? 'Contatti' : 'Kontakt'}</span>
              <ChevronDown className="k120" />
            </NavLink>
          </div>
        </div>
      )}
    </header>
    {compareCount > 0 && (
      <button
        onClick={onOpenCompare}
        className="k121"
        aria-label={t.header.compare}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>{t.header.compare}</span>
        <span className="k122">{compareCount}</span>
      </button>
    )}
    </>
  );
}
