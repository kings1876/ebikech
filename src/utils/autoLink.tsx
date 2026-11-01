import React from 'react';
import { Language } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { COLLECTIONS } from '../data/collections';
import { ALL_PRODUCTS } from '../data/products';
import { CATEGORY_KEYWORD } from './seoText';
import { buildLocalizedUrl } from './routes';
import { NavLink } from '../components/NavLink';

type Target = { label: string; href: string };

/** Other wordings the articles use for a category or collection. */
const ALIASES: Record<string, Partial<Record<Language, string[]>>> = {
  'schnelle-e-bikes': { de: ['E-Bike 45', 'schnelle E-Bikes'], fr: ['e-bike 45', 'vélo électrique 45', 'vélos électriques rapides'], it: ['e-bike 45', 'e-bike veloci'] },
  damen: { de: ['Damen-E-Bike'], fr: ['vélo électrique femme', 'vélos électriques femme'], it: ['e-bike donna'] },
  'e-citybikes': { fr: ['vélo électrique de ville'], it: ['e-bike city'] },
  'e-trekkingbikes': { fr: ['vélo trekking électrique'], it: ['e-bike trekking'] },
  'e-rennvelos-gravel': { it: ['e-bike gravel'] },
  'e-lastenvelos': { it: ['e-bike cargo'] },
  'e-mountainbikes': { de: ['E-MTB'], fr: ['VTT électriques'] },
};

/** Shop pages a blog paragraph may link to: categories, keyword collections and brands that really have products. */
function buildTargets(lang: Language): Target[] {
  const out: Target[] = [];
  for (const category of CATEGORIES) {
    if (!ALL_PRODUCTS.some((p) => p.categoryId === category.id)) continue;
    const href = buildLocalizedUrl(lang, { lang, view: 'category', category });
    for (const label of new Set([CATEGORY_KEYWORD[category.id]?.[lang], category.name[lang], ...(ALIASES[category.id]?.[lang] || [])].filter(Boolean) as string[])) out.push({ label, href });
  }
  for (const collection of COLLECTIONS) {
    const href = buildLocalizedUrl(lang, { lang, view: 'collection', collection });
    for (const label of new Set([collection.keyword[lang], collection.name[lang], ...(ALIASES[collection.id]?.[lang] || [])])) out.push({ label, href });
  }
  for (const brand of BRANDS) {
    if (!ALL_PRODUCTS.some((p) => p.brandId === brand.id)) continue;
    out.push({ label: brand.name, href: buildLocalizedUrl(lang, { lang, view: 'brand', brand }) });
  }
  out.push({ label: CATALOGUE_WORD[lang], href: buildLocalizedUrl(lang, { lang, view: 'catalog-root' }) });
  return out;
}

/** Labels match with a space or a hyphen between words ("Trekking E-Bike" = "Trekking-E-Bike"). */
const norm = (s: string) => s.toLowerCase().replace(/[\s\u00a0-]+/g, ' ');
const escapeRx = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/(\\-| )+/g, '[ \\u00a0-]');
const CATALOGUE_WORD: Record<Language, string> = { de: 'Katalog', fr: 'catalogue', it: 'catalogo' };

export interface LinkContext {
  used: Set<string>;
  count: number;
}
export const newLinkContext = (): LinkContext => ({ used: new Set(), count: 0 });

const cache: Partial<Record<Language, { rx: RegExp; map: Map<string, string> }>> = {};
function matcher(lang: Language) {
  if (!cache[lang]) {
    const targets = buildTargets(lang).sort((a, b) => b.label.length - a.label.length);
    const map = new Map(targets.map((t) => [norm(t.label), t.href]));
    const rx = new RegExp(`(?<![\\p{L}\\p{N}-])(${[...new Set(targets.map((t) => t.label))].map(escapeRx).join('|')})(?:s|n|es)?(?![\\p{L}\\p{N}-])`, 'giu');
    cache[lang] = { rx, map };
  }
  return cache[lang]!;
}

/**
 * Turns the first mention of each category / collection / brand in a paragraph into a link to its shop page.
 * One link per target per article, at most `max` links in total.
 */
export function linkify(text: string, lang: Language, ctx: LinkContext, onNavigate: (url: string) => void, max = 8): React.ReactNode[] {
  const { rx, map } = matcher(lang);
  const parts: React.ReactNode[] = [];
  let last = 0;
  rx.lastIndex = 0;
  for (let m = rx.exec(text); m; m = rx.exec(text)) {
    const href = map.get(norm(m[1]));
    if (!href || ctx.used.has(href) || ctx.count >= max) continue;
    ctx.used.add(href);
    ctx.count++;
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <NavLink key={`${m.index}-${href}`} href={href} onNavigate={onNavigate} className="inline font-semibold text-red-700 underline decoration-red-300 underline-offset-2 hover:decoration-red-600 cursor-pointer">
        {m[0]}
      </NavLink>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}
