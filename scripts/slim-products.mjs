// Writes src/data/products.client.json: the product data the pages actually use.
// src/data/products.json keeps the full sourcing data (image sources, price notes, source URLs) for the scripts;
// only this slimmer file is bundled into the browser JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'));

const DROP = ['imageSources', 'sourceUrl', 'priceNote', 'features'];
const GERMAN_ONLY = ['shortDesc', 'description']; // fr/it hold the same German text; products.ts restores them

const slim = products.map((p) => {
  const q = { ...p };
  for (const k of DROP) delete q[k];
  for (const k of GERMAN_ONLY) if (q[k]) q[k] = { de: q[k].de };
  return q;
});

fs.writeFileSync(path.join(root, 'src/data/products.client.json'), JSON.stringify(slim));
const kb = (n) => Math.round(n / 1024);
console.log(`products.client.json: ${slim.length} products, ${kb(JSON.stringify(products).length)} KB -> ${kb(JSON.stringify(slim).length)} KB`);
