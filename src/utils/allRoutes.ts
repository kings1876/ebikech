import { Language } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { GUIDE_CLUSTERS } from '../data/guides';
import { BLOG_POSTS } from '../data/blog';
import { ALL_PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ParsedRoute, buildLocalizedUrl, getBrandCategoryCount, MIN_BRAND_CATEGORY_PRODUCTS } from './routes';

const LANGS: Language[] = ['de', 'fr', 'it'];

/** Every indexable route, language-agnostic. Each is rendered for de, fr and it. */
export function allRoutes(): ParsedRoute[] {
  const routes: ParsedRoute[] = [];
  const r = (route: Omit<ParsedRoute, 'lang'>) => routes.push({ lang: 'de', ...route });

  r({ view: 'home' });
  r({ view: 'catalog-root' });
  r({ view: 'brand-root' });
  r({ view: 'guide-root' });
  r({ view: 'canton-subsidies' });
  r({ view: 'about' });
  r({ view: 'legal' });
  r({ view: 'blog-root' });
  r({ view: 'faq' });
  r({ view: 'contact' });
  for (const blogPost of BLOG_POSTS) r({ view: 'blog-post', blogPost });

  for (const category of CATEGORIES) {
    r({ view: 'category', category });
    for (const sub of category.subcategories ?? []) {
      r({ view: 'subcategory', category, subcategorySlug: sub.id });
    }
  }
  for (const collection of COLLECTIONS) r({ view: 'collection', collection });
  for (const product of ALL_PRODUCTS) {
    const category = CATEGORIES.find((c) => c.id === product.categoryId);
    if (category) r({ view: 'product', category, productSlug: product.slug });
  }

  for (const brand of BRANDS) {
    r({ view: 'brand', brand });
    for (const category of CATEGORIES) {
      if (getBrandCategoryCount(brand.id, category.id) >= MIN_BRAND_CATEGORY_PRODUCTS) {
        r({ view: 'brand-category', brand, category });
      }
    }
  }

  for (const guideCluster of GUIDE_CLUSTERS) {
    r({ view: 'guide-cluster', guideCluster });
    for (const guideArticle of guideCluster.guides) {
      r({ view: 'guide-detail', guideCluster, guideArticle });
    }
  }

  return routes;
}

/** Path segments (without language prefix) for generateStaticParams. */
export function staticSlugs(lang: Language): { slug: string[] }[] {
  return allRoutes().map((route) => {
    const url = buildLocalizedUrl(lang, route);
    const segments = url.split('/').filter(Boolean);
    return { slug: lang === 'de' ? segments : segments.slice(1) };
  });
}

export { LANGS };
