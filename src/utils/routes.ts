import { Language, CategoryDef, BrandDef, GuideCluster, GuideArticle } from '../types';
import { SECTION_ROOTS, CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { CollectionDef, findCollectionBySlug } from '../data/collections';
import { ALL_PRODUCTS } from '../data/products';

export interface ParsedRoute {
  lang: Language;
  view:
    | 'home'
    | 'catalog-root'
    | 'category'
    | 'subcategory'
    | 'collection'
    | 'product'
    | 'brand-root'
    | 'brand'
    | 'brand-category'
    | 'guide-root'
    | 'guide-cluster'
    | 'guide-detail'
    | 'blog-root'
    | 'blog-post'
    | 'faq'
    | 'contact'
    | 'canton-subsidies'
    | 'comparison'
    | 'about'
    | 'legal'
    | 'search'
    | '404';
  category?: CategoryDef;
  collection?: CollectionDef;
  subcategorySlug?: string;
  brand?: BrandDef;
  productSlug?: string;
  guideCluster?: GuideCluster;
  guideArticle?: GuideArticle;
  blogPost?: BlogPost;
  page?: number;
  hasFacets?: boolean;
  queryString?: string;
}

// Helper to get count of brand x category products
export function getBrandCategoryCount(brandId: string, categoryId: string): number {
  return ALL_PRODUCTS.filter((p) => p.brandId === brandId && p.categoryId === categoryId).length;
}

// Find category by slug in any language
export function findCategoryBySlug(slug: string): { category: CategoryDef; lang: Language } | null {
  for (const cat of CATEGORIES) {
    if (cat.slug.de === slug) return { category: cat, lang: 'de' };
    if (cat.slug.fr === slug) return { category: cat, lang: 'fr' };
    if (cat.slug.it === slug) return { category: cat, lang: 'it' };
  }
  return null;
}

// Find subcategory by slug in any language
export function findSubcategoryBySlug(parentCat: CategoryDef, slug: string): { subcategoryId: string; lang: Language } | null {
  if (!parentCat.subcategories) return null;
  for (const sub of parentCat.subcategories) {
    if (sub.slug.de === slug) return { subcategoryId: sub.id, lang: 'de' };
    if (sub.slug.fr === slug) return { subcategoryId: sub.id, lang: 'fr' };
    if (sub.slug.it === slug) return { subcategoryId: sub.id, lang: 'it' };
  }
  return null;
}

// Find brand by slug
export function findBrandBySlug(slug: string): BrandDef | null {
  return BRANDS.find((b) => b.slug === slug) || null;
}

// Parse pathname and search string into structured route
export function parseRoute(pathname: string, search: string = ''): ParsedRoute {
  // Normalize pathname: remove trailing slash for analysis, except root
  let cleanPath = pathname.trim();
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Determine language from prefix
  let lang: Language = 'de';
  let restPath = cleanPath;

  if (cleanPath === '/fr' || cleanPath.startsWith('/fr/')) {
    lang = 'fr';
    restPath = cleanPath.slice(3) || '/';
  } else if (cleanPath === '/it' || cleanPath.startsWith('/it/')) {
    lang = 'it';
    restPath = cleanPath.slice(3) || '/';
  }

  // Parse search params
  const searchParams = new URLSearchParams(search);
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Check if facet filters are applied
  const facetKeys = ['motor', 'speed', 'battery', 'frame', 'size', 'price', 'useCase', 'score', 'q'];
  let hasFacets = false;
  for (const key of facetKeys) {
    if (searchParams.has(key)) {
      hasFacets = true;
      break;
    }
  }

  const queryQ = searchParams.get('q');
  if (queryQ) {
    return { lang, view: 'search', queryString: queryQ, page, hasFacets: true };
  }

  // Segments after language prefix
  const segments = restPath.split('/').filter(Boolean);

  // Root Homepage
  if (segments.length === 0) {
    return { lang, view: 'home', page, hasFacets };
  }

  const firstSeg = segments[0];

  // Contact
  if (['kontakt', 'contact', 'contatti'].includes(firstSeg)) {
    return segments.length === 1 ? { lang, view: 'contact' } : { lang, view: '404' };
  }

  // Blog and FAQ
  if (firstSeg === 'faq') {
    return segments.length === 1 ? { lang, view: 'faq' } : { lang, view: '404' };
  }
  if (firstSeg === 'blog') {
    if (segments.length === 1) return { lang, view: 'blog-root' };
    const post = BLOG_POSTS.find((p) => p.slug.de === segments[1] || p.slug.fr === segments[1] || p.slug.it === segments[1]);
    if (segments.length === 2 && post) return { lang, view: 'blog-post', blogPost: post };
    return { lang, view: '404' };
  }

  // Static Pages
  if (['ueber-uns', 'a-propos', 'chi-siamo'].includes(firstSeg)) {
    return { lang, view: 'about' };
  }
  if (['impressum-rechtliches', 'mentions-legales', 'note-legali'].includes(firstSeg)) {
    return { lang, view: 'legal' };
  }
  if (['kantone-foerderung', 'subventions-cantons', 'incentivi-cantoni'].includes(firstSeg)) {
    return { lang, view: 'canton-subsidies' };
  }
  if (['vergleich', 'comparateur', 'confronta'].includes(firstSeg)) {
    return { lang, view: 'comparison' };
  }

  // Catalogue root /e-bikes/ | /fr/velos-electriques/ | /it/e-bike/
  const catRoots: string[] = [SECTION_ROOTS.catalogue.de, SECTION_ROOTS.catalogue.fr, SECTION_ROOTS.catalogue.it];
  if (catRoots.includes(firstSeg)) {
    if (segments.length === 1) {
      return { lang, view: 'catalog-root', page, hasFacets };
    }

    const catSlug = segments[1];
    const collection = segments.length === 2 ? findCollectionBySlug(catSlug) : undefined;
    if (collection) {
      return { lang, view: 'collection', collection, page, hasFacets };
    }
    const catMatch = findCategoryBySlug(catSlug);
    if (!catMatch) {
      return { lang, view: '404' };
    }
    const category = catMatch.category;

    if (segments.length === 2) {
      return { lang, view: 'category', category, page, hasFacets };
    }

    // 3 segments: either subcategory or product
    // e.g. /e-bikes/e-mountainbikes/e-fullys/ OR /e-bikes/e-citybikes/cube-supreme-hybrid/
    const subOrProductSlug = segments[2];
    const subcatMatch = findSubcategoryBySlug(category, subOrProductSlug);
    if (subcatMatch) {
      return {
        lang,
        view: 'subcategory',
        category,
        subcategorySlug: subcatMatch.subcategoryId,
        page,
        hasFacets,
      };
    }

    // Otherwise check if it's a product
    const product = ALL_PRODUCTS.find((p) => p.slug === subOrProductSlug);
    if (product) {
      return {
        lang,
        view: 'product',
        category,
        productSlug: product.slug,
      };
    }

    return { lang, view: '404' };
  }

  // Brands /marken/ | /fr/marques/ | /it/marchi/
  const brandRoots: string[] = [SECTION_ROOTS.brands.de, SECTION_ROOTS.brands.fr, SECTION_ROOTS.brands.it];
  if (brandRoots.includes(firstSeg)) {
    if (segments.length === 1) {
      return { lang, view: 'brand-root', page, hasFacets };
    }

    const brandSlug = segments[1];
    const brand = findBrandBySlug(brandSlug);
    if (!brand) {
      return { lang, view: '404' };
    }

    if (segments.length === 2) {
      return { lang, view: 'brand', brand, page, hasFacets };
    }

    // Brand x Type: /marken/{brand}/{cat}/
    const catSlug = segments[2];
    const catMatch = findCategoryBySlug(catSlug);
    if (!catMatch) {
      return { lang, view: '404' };
    }

    return {
      lang,
      view: 'brand-category',
      brand,
      category: catMatch.category,
      page,
      hasFacets,
    };
  }

  // Guides /ratgeber/ | /fr/guide/ | /it/guida/
  const guideRoots: string[] = [SECTION_ROOTS.guides.de, SECTION_ROOTS.guides.fr, SECTION_ROOTS.guides.it];
  if (guideRoots.includes(firstSeg)) {
    if (segments.length === 1) {
      return { lang, view: 'guide-root' };
    }

    const clusterSlug = segments[1];
    const cluster = GUIDE_CLUSTERS.find(
      (c) => c.slug.de === clusterSlug || c.slug.fr === clusterSlug || c.slug.it === clusterSlug
    );
    if (!cluster) {
      return { lang, view: '404' };
    }

    if (segments.length === 2) {
      return { lang, view: 'guide-cluster', guideCluster: cluster };
    }

    const articleSlug = segments[2];
    const article = cluster.guides.find(
      (g) => g.slug.de === articleSlug || g.slug.fr === articleSlug || g.slug.it === articleSlug
    );
    if (!article) {
      return { lang, view: '404' };
    }

    return { lang, view: 'guide-detail', guideCluster: cluster, guideArticle: article };
  }

  return { lang, view: '404' };
}

// Generate canonical URL for any view and language
export function buildLocalizedUrl(targetLang: Language, route: ParsedRoute): string {
  const langPrefix = targetLang === 'de' ? '' : `/${targetLang}`;

  switch (route.view) {
    case 'home':
      return targetLang === 'de' ? '/' : `${langPrefix}/`;

    case 'catalog-root':
      return `${langPrefix}/${SECTION_ROOTS.catalogue[targetLang]}/`;

    case 'category':
      if (!route.category) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.catalogue[targetLang]}/${route.category.slug[targetLang]}/`;

    case 'collection':
      if (!route.collection) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.catalogue[targetLang]}/${route.collection.slug[targetLang]}/`;

    case 'subcategory': {
      if (!route.category || !route.subcategorySlug) return `${langPrefix}/`;
      const sub = route.category.subcategories?.find((s) => s.id === route.subcategorySlug);
      const subSlug = sub ? sub.slug[targetLang] : route.subcategorySlug;
      return `${langPrefix}/${SECTION_ROOTS.catalogue[targetLang]}/${route.category.slug[targetLang]}/${subSlug}/`;
    }

    case 'product': {
      if (!route.category || !route.productSlug) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.catalogue[targetLang]}/${route.category.slug[targetLang]}/${route.productSlug}/`;
    }

    case 'brand-root':
      return `${langPrefix}/${SECTION_ROOTS.brands[targetLang]}/`;

    case 'brand':
      if (!route.brand) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.brands[targetLang]}/${route.brand.slug}/`;

    case 'brand-category':
      if (!route.brand || !route.category) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.brands[targetLang]}/${route.brand.slug}/${route.category.slug[targetLang]}/`;

    case 'guide-root':
      return `${langPrefix}/${SECTION_ROOTS.guides[targetLang]}/`;

    case 'guide-cluster':
      if (!route.guideCluster) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.guides[targetLang]}/${route.guideCluster.slug[targetLang]}/`;

    case 'guide-detail':
      if (!route.guideCluster || !route.guideArticle) return `${langPrefix}/`;
      return `${langPrefix}/${SECTION_ROOTS.guides[targetLang]}/${route.guideCluster.slug[targetLang]}/${route.guideArticle.slug[targetLang]}/`;

    case 'canton-subsidies':
      if (targetLang === 'fr') return '/fr/subventions-cantons/';
      if (targetLang === 'it') return '/it/incentivi-cantoni/';
      return '/kantone-foerderung/';

    case 'comparison':
      if (targetLang === 'fr') return '/fr/comparateur/';
      if (targetLang === 'it') return '/it/confronta/';
      return '/vergleich/';

    case 'about':
      if (targetLang === 'fr') return '/fr/a-propos/';
      if (targetLang === 'it') return '/it/chi-siamo/';
      return '/ueber-uns/';

    case 'legal':
      if (targetLang === 'fr') return '/fr/mentions-legales/';
      if (targetLang === 'it') return '/it/note-legali/';
      return '/impressum-rechtliches/';

    case 'blog-root':
      return `${langPrefix}/blog/`;

    case 'blog-post':
      if (!route.blogPost) return `${langPrefix}/blog/`;
      return `${langPrefix}/blog/${route.blogPost.slug[targetLang]}/`;

    case 'faq':
      return `${langPrefix}/faq/`;

    case 'contact':
      return targetLang === 'fr' ? '/fr/contact/' : targetLang === 'it' ? '/it/contatti/' : '/kontakt/';

    case 'search':
      return targetLang === 'de' ? `/?q=${encodeURIComponent(route.queryString || '')}` : `${langPrefix}/?q=${encodeURIComponent(route.queryString || '')}`;

    default:
      return targetLang === 'de' ? '/' : `${langPrefix}/`;
  }
}

// Generate all alternate hreflang tags for a route
export function getHreflangs(route: ParsedRoute, origin: string): { lang: string; href: string }[] {
  const deHref = `${origin}${buildLocalizedUrl('de', route)}`;
  const frHref = `${origin}${buildLocalizedUrl('fr', route)}`;
  const itHref = `${origin}${buildLocalizedUrl('it', route)}`;

  return [
    { lang: 'de-CH', href: deHref },
    { lang: 'fr-CH', href: frHref },
    { lang: 'it-CH', href: itHref },
    { lang: 'x-default', href: deHref }, // German is the Swiss default
  ];
}
