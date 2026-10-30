import { Product } from '../types';
import raw from './products.json';

// Real products only. Built from src/data/sourced/*.json by scripts/build-products.mjs.
export const ALL_PRODUCTS: Product[] = raw as unknown as Product[];
