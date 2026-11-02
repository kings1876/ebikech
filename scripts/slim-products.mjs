// Writes the product data the pages actually use, split in two:
//   src/data/products.client.json  what every page needs (cards, filters, listings, links): bundled into the browser JavaScript.
//   src/data/products.extra.json   specs and German texts, needed only on a product page and in the comparison:
//                                  rendered on the server, passed to the browser per page, loaded on demand otherwise.
// src/data/products.json keeps the full sourcing data (image sources, price notes, source URLs) for the scripts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'));

const DROP = ['imageSources', 'sourceUrl', 'priceNote', 'features'];
const EXTRA = ['specs', 'shortDesc', 'description']; // fr/it hold the same German text; products.ts restores them

const extra = {};
const slim = products.map((p) => {
  const q = { ...p };
  for (const k of DROP) delete q[k];
  const e = { s: p.specs || {}, d: p.shortDesc?.de || '' };
  if (p.description?.de) e.x = p.description.de;
  extra[p.id] = e;
  for (const k of EXTRA) delete q[k];
  return q;
});

fs.writeFileSync(path.join(root, 'src/data/products.client.json'), JSON.stringify(slim));
fs.writeFileSync(path.join(root, 'src/data/products.extra.json'), JSON.stringify(extra));
const kb = (n) => Math.round(n / 1024);
console.log(
  `products.client.json: ${slim.length} products, ${kb(JSON.stringify(products).length)} KB -> ${kb(JSON.stringify(slim).length)} KB; products.extra.json: ${kb(JSON.stringify(extra).length)} KB`,
);
