import { SITE_URL } from '../../src/utils/site';
import { SITE_NAME, TAGLINE } from '../../src/config/brand';
import { CATEGORIES } from '../../src/data/categories';
import { BRANDS } from '../../src/data/brands';
import { COLLECTIONS } from '../../src/data/collections';
import { BLOG_POSTS } from '../../src/data/blog';
import { ALL_PRODUCTS } from '../../src/data/products';
import { buildLocalizedUrl } from '../../src/utils/routes';

export const dynamic = 'force-static';

// llms.txt (llmstxt.org): a plain-markdown map of the site for AI assistants. Generated from the same data as the pages.
export function GET() {
  const abs = (p: string) => `${SITE_URL}${p}`;
  const brands = BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id));
  const cats = CATEGORIES.filter((c) => ALL_PRODUCTS.some((p) => p.categoryId === c.id));
  const minPrice = Math.min(...ALL_PRODUCTS.map((p) => p.priceCHF));

  const lines: string[] = [
    `# ${SITE_NAME.de}`,
    '',
    `> ${TAGLINE.de}: ${ALL_PRODUCTS.length} e-bikes from ${brands.length} brands with prices in Swiss francs (CHF), motor, battery and weight data. The site is available in German (default), French (/fr/) and Italian (/it/).`,
    '',
    `Brand names by language: ${SITE_NAME.de} (de), ${SITE_NAME.fr} (fr), ${SITE_NAME.it} (it). Domain: e-bikes-zuverkaufen.ch.`,
    `Prices are manufacturer-recommended prices in CHF, starting from CHF ${Math.round(minPrice).toLocaleString('de-CH')}. Prices marked "ca." were converted from euro recommendations. Technical data comes from the manufacturers. Only new e-bikes are listed.`,
    '',
    '## E-bike categories',
    ...cats.map((c) => `- [${c.name.de}](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'category', category: c }))}): ${ALL_PRODUCTS.filter((p) => p.categoryId === c.id).length} models`),
    ...COLLECTIONS.map((c) => `- [${c.name.de}](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'collection', collection: c }))}): ${ALL_PRODUCTS.filter(c.filter).length} models with a low step-through frame`),
    '',
    '## Brands',
    ...brands.map((b) => `- [${b.name}](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'brand', brand: b }))}): ${ALL_PRODUCTS.filter((p) => p.brandId === b.id).length} models`),
    '',
    '## Buying guides',
    ...BLOG_POSTS.map((p) => `- [${p.title.de}](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'blog-post', blogPost: p }))}): ${p.excerpt.de}`),
    '',
    '## Key pages',
    `- [All e-bikes](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'catalog-root' }))}): full catalogue with filters`,
    `- [FAQ](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'faq' }))}): e-bike 25 vs 45, helmet and licence, range, battery care, frame size`,
    `- [Contact](${abs(buildLocalizedUrl('de', { lang: 'de', view: 'contact' }))}): questions about a model, size or price`,
    '',
    '## Optional',
    `- [Sitemap](${abs('/sitemap.xml')}): all pages in all three languages`,
    `- [French home](${abs('/fr/')}) and [Italian home](${abs('/it/')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
