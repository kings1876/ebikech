import { useState, useMemo, useEffect } from 'react';
import {
  CategoryDef,
  Product,
  Language,
  FacetFilters,
  SpeedClass,
  MotorBrand,
  BatteryBracket,
  FrameType,
  FrameSize,
  PriceBracket,
  UseCase,
} from '../types';
import { CATEGORIES } from '../data/categories';
import { ALL_PRODUCTS } from '../data/products';
import { I18N } from '../data/i18n';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import {
  SlidersHorizontal,
  ChevronRight,
  ArrowUpDown,
  Filter,
  X,
  ShieldAlert,
  Info,
} from 'lucide-react';

interface CatalogViewProps {
  route: ParsedRoute;
  lang: Language;
  onNavigate: (path: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'tcs-score' | 'trustpilot-score' | 'battery-desc' | 'weight-asc';

export function CatalogView({
  route,
  lang,
  onNavigate,
  comparedProducts,
  onToggleCompare,
}: CatalogViewProps) {
  const t = I18N[lang];
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [currentPage, setCurrentPage] = useState(route.page || 1);

  // Sync route page
  useEffect(() => {
    setCurrentPage(route.page || 1);
  }, [route.page]);

  // Extract initial filters from search string
  const parseFilters = (search: string): FacetFilters => {
    const params = new URLSearchParams(search);
    const speed = params.getAll('speed') as SpeedClass[];
    const motor = params.getAll('motor') as MotorBrand[];
    const battery = params.getAll('battery') as BatteryBracket[];
    const frame = params.getAll('frame') as FrameType[];
    const size = params.getAll('size') as FrameSize[];
    const price = params.getAll('price') as PriceBracket[];
    const useCase = params.getAll('useCase') as UseCase[];
    const score = params.get('score') ? parseInt(params.get('score')!, 10) : undefined;

    return {
      speedClass: speed.length ? speed : undefined,
      motor: motor.length ? motor : undefined,
      batteryWh: battery.length ? battery : undefined,
      frameType: frame.length ? frame : undefined,
      frameSize: size.length ? size : undefined,
      price: price.length ? price : undefined,
      useCase: useCase.length ? useCase : undefined,
      minScore: score,
    };
  };

  // Server renders unfiltered; URL filters are applied after hydration.
  const [filters, setFilters] = useState<FacetFilters>(() => parseFilters(''));
  useEffect(() => {
    setFilters(parseFilters(window.location.search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const category = route.category;
  const subcategoryId = route.subcategorySlug;

  // Filter products by route category/subcategory first
  const baseCategoryProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    if (route.view === 'search' && route.queryString) {
      const q = route.queryString.toLowerCase();
      return list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.motorModel.toLowerCase().includes(q) ||
        p.brandId.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((p) => p.categoryId === category.id);
      if (subcategoryId) {
        list = list.filter((p) => p.subcategoryId === subcategoryId);
      }
    }
    return list;
  }, [category, subcategoryId, route.view, route.queryString]);

  // Apply facet filters
  const filteredProducts = useMemo(() => {
    return baseCategoryProducts.filter((p) => {
      if (filters.speedClass && filters.speedClass.length > 0) {
        if (!filters.speedClass.includes(p.speedClass)) return false;
      }
      if (filters.motor && filters.motor.length > 0) {
        if (!filters.motor.includes(p.motorBrand)) return false;
      }
      if (filters.batteryWh && filters.batteryWh.length > 0) {
        if (!filters.batteryWh.includes(p.batteryBracket)) return false;
      }
      if (filters.frameType && filters.frameType.length > 0) {
        if (!filters.frameType.includes(p.frameType)) return false;
      }
      if (filters.frameSize && filters.frameSize.length > 0) {
        if (!filters.frameSize.some((s) => p.frameSizes.includes(s))) return false;
      }
      if (filters.price && filters.price.length > 0) {
        if (!filters.price.includes(p.priceBracket)) return false;
      }
      if (filters.useCase && filters.useCase.length > 0) {
        if (!filters.useCase.some((u) => p.useCase.includes(u))) return false;
      }
      if (filters.minScore) {
        const tcs = p.testVerdicts.find((v) => v.source === 'TCS');
        if (!tcs || tcs.numericScore < filters.minScore) return false;
      }
      if (filters.minTrustScore) {
        if (!p.trustpilotStats || p.trustpilotStats.score < filters.minTrustScore) return false;
      }
      return true;
    });
  }, [baseCategoryProducts, filters]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.priceCHF - b.priceCHF);
      case 'price-desc':
        return list.sort((a, b) => b.priceCHF - a.priceCHF);
      case 'battery-desc':
        return list.sort((a, b) => b.batteryWh - a.batteryWh);
      case 'weight-asc':
        return list.sort((a, b) => a.weightKg - b.weightKg);
      case 'tcs-score':
        return list.sort((a, b) => {
          const aTcs = a.testVerdicts.find((v) => v.source === 'TCS')?.numericScore || 0;
          const bTcs = b.testVerdicts.find((v) => v.source === 'TCS')?.numericScore || 0;
          return bTcs - aTcs;
        });
      case 'trustpilot-score':
        return list.sort((a, b) => (b.trustpilotStats?.score || 0) - (a.trustpilotStats?.score || 0));
      case 'popular':
      default:
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [filteredProducts, sortBy]);

  // Pagination (12 items per page)
  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, safeCurrentPage]);

  // Handle filter changes and sync to URL search params
  const handleFilterChange = (newFilters: FacetFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (newFilters.speedClass?.length) newFilters.speedClass.forEach((s) => params.append('speed', s));
    if (newFilters.motor?.length) newFilters.motor.forEach((m) => params.append('motor', m));
    if (newFilters.batteryWh?.length) newFilters.batteryWh.forEach((b) => params.append('battery', b));
    if (newFilters.frameType?.length) newFilters.frameType.forEach((f) => params.append('frame', f));
    if (newFilters.frameSize?.length) newFilters.frameSize.forEach((s) => params.append('size', s));
    if (newFilters.price?.length) newFilters.price.forEach((p) => params.append('price', p));
    if (newFilters.useCase?.length) newFilters.useCase.forEach((u) => params.append('useCase', u));
    if (newFilters.minScore) params.set('score', newFilters.minScore.toString());

    const baseCleanUrl = buildLocalizedUrl(lang, route);
    const targetUrl = params.toString() ? `${baseCleanUrl}?${params.toString()}` : baseCleanUrl;
    onNavigate(targetUrl);
  };

  // Handle Page navigation (p2+ triggers noindex)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const params = new URLSearchParams(window.location.search);
    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }

    const baseCleanUrl = buildLocalizedUrl(lang, route);
    const targetUrl = params.toString() ? `${baseCleanUrl}?${params.toString()}` : baseCleanUrl;
    onNavigate(targetUrl);
  };

  // Title text
  let headerTitle = category ? category.name[lang] : t.catalog.allBikesTitle;
  if (subcategoryId && category?.subcategories) {
    const sub = category.subcategories.find((s) => s.id === subcategoryId);
    if (sub) headerTitle = sub.name[lang];
  }
  if (route.view === 'search') {
    headerTitle = `${t.catalog.showingCount} «${route.queryString}»`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Category Header & Breadcrumb Info */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
            className="hover:text-red-600 transition-colors cursor-pointer"
          >
            {t.header.catalogue}
          </button>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category }))}
                className={subcategoryId ? 'hover:text-red-600 cursor-pointer' : 'font-bold text-slate-900'}
              >
                {category.name[lang]}
              </button>
            </>
          )}
          {subcategoryId && category?.subcategories && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-900">
                {category.subcategories.find((s) => s.id === subcategoryId)?.name[lang]}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {headerTitle}
            </h1>
            {category && (
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
                {category.description[lang]}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              {filteredProducts.length} {t.catalog.modelsFound}
            </span>
          </div>
        </div>

        {/* Subcategory Pills */}
        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'category', category }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                !subcategoryId
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.catalog.allInCat} {category.name[lang]} ({category.targetCount})
            </button>
            {category.subcategories.filter((sub) => sub.targetCount > 0).map((sub) => (
              <button
                key={sub.id}
                onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'subcategory', category, subcategorySlug: sub.id }))}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  subcategoryId === sub.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub.name[lang]} ({sub.targetCount})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Listing Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            lang={lang}
            totalFiltered={filteredProducts.length}
          />
        </div>

        {/* Products Grid & Toolbar */}
        <div className="lg:col-span-3 space-y-5">
          {/* Toolbar: Mobile Filter Button + Sort Selector */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-red-600" />
              <span>{t.catalog.filterButton} ({Object.keys(filters).length})</span>
            </button>

            <div className="text-slate-500 font-medium hidden sm:block">
              {t.catalog.showingCount} {paginatedProducts.length} {t.catalog.of} {filteredProducts.length} {t.header.models}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label className="font-semibold text-slate-700">{t.catalog.sortBy}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2.5 font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <option value="popular">{t.catalog.sortPopular}</option>
                <option value="trustpilot-score">★ Trustpilot Score ({lang === 'fr' ? 'Avis vérifiés' : lang === 'it' ? 'Recensioni verificate' : 'Verifiziert'})</option>
                <option value="tcs-score">{t.catalog.sortTcs}</option>
                <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                <option value="price-desc">{t.catalog.sortPriceDesc}</option>
                <option value="battery-desc">{t.catalog.sortBatteryDesc}</option>
                <option value="weight-asc">{t.catalog.sortWeightAsc}</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedProducts.map((p) => (
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
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.catalog.noResultsTitle}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.catalog.noResultsDesc}
              </p>
              <button
                onClick={() => handleFilterChange({})}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                {t.catalog.resetFilters}
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 text-xs">
              <div className="text-slate-500">
                {t.catalog.page} <strong className="text-slate-900">{safeCurrentPage}</strong> {t.catalog.of} {totalPages}
                {safeCurrentPage > 1 && (
                  <span className="ml-2 text-amber-700 font-medium">
                    {t.catalog.pageNotice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
                >
                  {t.catalog.prev}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-8 h-8 rounded-lg font-bold transition-colors cursor-pointer ${
                      num === safeCurrentPage
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
                >
                  {t.catalog.next}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">{t.filter.title}</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              lang={lang}
              totalFiltered={filteredProducts.length}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-xl text-xs"
            >
              {t.catalog.modelsFound} ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
