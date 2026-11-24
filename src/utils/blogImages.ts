import { Product } from '../types';
import { BlogPost } from '../data/blog';
import { ALL_PRODUCTS } from '../data/products';
import { optimizedImage } from './imageUrl';

/** Catalogue products matching what a post is about (same filters as the "models" block), best-photographed ones only. */
export function postPool(post: BlogPost): Product[] {
  const r = post.related;
  return ALL_PRODUCTS.filter(
    (p) =>
      p.imageCount > 0 &&
      (!r?.categoryId || p.categoryId === r.categoryId) &&
      (!r?.brandId || p.brandId === r.brandId) &&
      (!r?.speedClass || p.speedClass === r.speedClass) &&
      (!r?.frameType || p.frameType === r.frameType) &&
      (!r?.subcategoryId || p.subcategoryId === r.subcategoryId) &&
      (!r?.maxWeightKg || (p.weightKg !== null && p.weightKg <= r.maxWeightKg)),
  ).sort((a, b) => a.priceCHF - b.priceCHF || a.slug.localeCompare(b.slug));
}

/** Up to 4 real catalogue products matching a post, spread across the price range (best-photographed first). */
export function relatedProducts(post: BlogPost): Product[] {
  if (!post.related) return [];
  const pool = postPool(post);
  if (pool.length <= 4) return pool;
  const picks = [0.1, 0.4, 0.7, 0.95].map((q) => pool[Math.min(pool.length - 1, Math.floor(q * pool.length))]);
  return [...new Set(picks)];
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Three real catalogue photos for a post: one lead image and two for the figure row.
 * Picked from the middle of the post's price range so they differ from the four "models" cards
 * (which sit at the 10/40/70/95 % marks); posts without a filter draw from the whole catalogue.
 */
export function postImageProducts(post: BlogPost): Product[] {
  let pool = postPool(post);
  if (!pool.length) pool = ALL_PRODUCTS.filter((p) => p.imageCount > 0).sort((a, b) => a.slug.localeCompare(b.slug));
  const skip = new Set(relatedProducts(post).map((p) => p.id));
  const free = pool.filter((p) => !skip.has(p.id));
  const from = free.length >= 3 ? free : pool;
  if (from.length <= 3) return from;
  const offset = hash(post.id) % Math.max(1, Math.floor(from.length / 6));
  const picks = [0.5, 0.25, 0.8].map((q) => from[Math.min(from.length - 1, Math.floor(q * from.length) + offset)]);
  return [...new Set(picks)].concat(from.filter((p) => !picks.includes(p))).slice(0, 3);
}

/** Absolute URL of the optimized lead photo of a post (used in structured data). */
export function postHeroUrl(post: BlogPost, origin: string): string | undefined {
  const p = postImageProducts(post)[0];
  const first = p?.images?.[0];
  return first ? `${origin}${optimizedImage(first.url, 1080)}` : undefined;
}
