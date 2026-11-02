// Server only: gives the product list its specs and German texts for rendering pages, metadata and structured data.
// Never import this from browser code, it would put the extras back into the page JavaScript.
import extra from './products.extra.json';
import { provideProductExtras, type ProductExtra } from './products';

provideProductExtras(extra as unknown as Record<string, ProductExtra>);

export const PRODUCT_EXTRAS = extra as unknown as Record<string, ProductExtra>;
