import { Product } from '../types';
import raw from './products.client.json';

// Real products only. Built from src/data/sourced/*.json by scripts/build-products.mjs, which also writes
// products.client.json (scripts/slim-products.mjs): the full data without the sourcing fields, German text stored once.
const same = (de: string) => ({ de, fr: de, it: de });

export const ALL_PRODUCTS: Product[] = (raw as unknown as Array<Record<string, any>>).map((p) => ({
  ...p,
  shortDesc: same(p.shortDesc.de),
  ...(p.description ? { description: same(p.description.de) } : {}),
})) as unknown as Product[];
