import { Product } from '../types';
import raw from './products.client.json';

// Real products only. Built from src/data/sourced/*.json by scripts/build-products.mjs, which also writes
// products.client.json and products.extra.json (scripts/slim-products.mjs).
// The browser bundle holds only the slim list. Specs and the German texts (the "extras") are heavy and needed on
// product pages and in the comparison only, so they are supplied separately: products.server.ts fills them in on the
// server, a product page receives its own extras as a prop, and loadProductExtras() fetches the rest on demand.
export type ProductExtra = { s: Record<string, unknown>; d: string; x?: string };

const same = (de: string) => ({ de, fr: de, it: de });
const EMPTY_SPECS = {};
const EMPTY_TEXT = same('');

type Resolved = { specs: Record<string, unknown>; shortDesc: ReturnType<typeof same>; description?: ReturnType<typeof same> };
const EXTRAS = new Map<string, Resolved>();

export function provideProductExtras(extras: Record<string, ProductExtra>) {
  for (const id of Object.keys(extras)) {
    if (EXTRAS.has(id)) continue;
    const e = extras[id];
    EXTRAS.set(id, { specs: e.s, shortDesc: same(e.d), ...(e.x ? { description: same(e.x) } : {}) });
  }
}

let all = false;
let loading: Promise<void> | null = null;
export const productExtrasLoaded = () => all;
export function loadProductExtras(): Promise<void> {
  if (all) return Promise.resolve();
  loading ||= import('./products.extra.json').then((m) => {
    provideProductExtras(m.default as unknown as Record<string, ProductExtra>);
    all = true;
  });
  return loading;
}

export const ALL_PRODUCTS: Product[] = (raw as unknown as Array<Record<string, any>>).map((p) => {
  const o = { ...p };
  Object.defineProperties(o, {
    specs: { get: () => EXTRAS.get(p.id)?.specs ?? EMPTY_SPECS, enumerable: true },
    shortDesc: { get: () => EXTRAS.get(p.id)?.shortDesc ?? EMPTY_TEXT, enumerable: true },
    description: { get: () => EXTRAS.get(p.id)?.description, enumerable: true },
  });
  return o;
}) as unknown as Product[];
