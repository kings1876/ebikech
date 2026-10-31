// Merges per-brand sourced files (src/data/sourced/*.json) into src/data/products.json.
// Only real, sourced products. Products without a CHF price are excluded (reported, not sold).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src/data/sourced');
const out = path.join(root, 'src/data/products.json');

const fx = JSON.parse(fs.readFileSync(path.join(root, 'src/data/fx.json'), 'utf8'));
const imageStatusFile = path.join(root, 'src/data/image-status.json');
const imageStatus = fs.existsSync(imageStatusFile) ? JSON.parse(fs.readFileSync(imageStatusFile, 'utf8')) : {};
const extraDir = path.join(root, 'src/data/extra-images');
const extraImages = {};
if (fs.existsSync(extraDir)) {
  for (const f of fs.readdirSync(extraDir).filter((x) => x.endsWith('.json'))) {
    try {
      for (const e of JSON.parse(fs.readFileSync(path.join(extraDir, f), 'utf8'))) {
        if (e.slug && Array.isArray(e.images)) extraImages[e.slug] = [...(extraImages[e.slug] || []), ...e.images];
      }
    } catch (err) { console.error(`!! extra-images/${f}: ${err.message}`); }
  }
}
const imageClassFile = path.join(root, 'src/data/image-class.json');
const imageClass = fs.existsSync(imageClassFile) ? JSON.parse(fs.readFileSync(imageClassFile, 'utf8')) : null;

// Image policy: the main image must be a complete bike on a white studio background;
// the gallery may add clean white- or black-background shots. Lifestyle/outdoor photos are dropped.
function pickImages(p) {
  const all = (p.images || []).filter((i) => i.url && imageStatus[i.url] !== false);
  if (!imageClass) return all.slice(0, 8).map((i) => ({ url: i.url, alt: i.alt || p.name }));
  const info = all.map((i) => ({ i, c: imageClass[i.url] })).filter((x) => x.c && (x.c.bg === 'white' || x.c.bg === 'black'));
  // "Whole bike": fully inside the frame, or a tight studio crop that spans the frame as a side view.
  // A full side view is wide AND tall (handlebar/detail close-ups are not).
  const whole = (c) => (c.bh || 0) >= 0.6 && (c.bottomCover === undefined || c.bottomCover >= 0.3) && (c.whole || ((c.bw || 0) >= 0.85 && (c.aspect || 0) >= 1.1 && (c.aspect || 0) <= 2.3));
  // Prefer the proportion of a typical bike side view (~1.7:1); ties keep the manufacturer's image order.
  const isDetailShot = (u) => /[_-]D\d+(\.|$)/i.test(u) || /detail/i.test(u);
  const heroes = info.filter((x) => x.c.bg === 'white' && whole(x.c) && !isDetailShot(x.i.url)).sort((a, b) => Math.abs((a.c.aspect || 0) - 1.7) - Math.abs((b.c.aspect || 0) - 1.7));
  if (!heroes.length) return [];
  const hero = heroes[0];
  const rest = info
    .filter((x) => x !== hero)
    .sort((a, b) => Number(whole(b.c)) - Number(whole(a.c)) || (b.c.bw || 0) - (a.c.bw || 0));
  return [hero, ...rest].slice(0, 8).map((x) => ({ url: x.i.url, alt: x.i.alt || p.name, bg: x.c.bg }));
}
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const idsIn = (file) => [...read(file).matchAll(/^\s{2,6}id: '([^']+)'/gm)].map((m) => m[1]);
const brandIds = new Set(idsIn('src/data/brands.ts'));
const catText = read('src/data/categories.ts');
const categoryIds = new Set(idsIn('src/data/categories.ts'));

const MOTORS = ['Bosch', 'Shimano Steps', 'Brose', 'Yamaha', 'Fazua', 'Stromer CYRO', 'Specialized', 'TQ', 'Mahle'];
const motorBrand = (m) => {
  const s = String(m || '').toLowerCase();
  if (s.includes('shimano')) return 'Shimano Steps';
  if (s.includes('stromer')) return 'Stromer CYRO';
  const hit = MOTORS.find((x) => s.includes(x.toLowerCase()));
  return hit || 'Other';
};
const slugify = (s) =>
  s.toLowerCase().replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ä/g, 'ae').replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const skipped = [];
const rawAll = [];
if (fs.existsSync(srcDir)) {
  for (const f of fs.readdirSync(srcDir).filter((x) => x.endsWith('.json')).sort()) {
    try {
      const arr = JSON.parse(fs.readFileSync(path.join(srcDir, f), 'utf8'));
      if (!Array.isArray(arr)) throw new Error('not an array');
      for (const p of arr) rawAll.push({ ...p, _file: f });
    } catch (e) {
      console.error(`!! ${f}: ${e.message}`);
      skipped.push({ file: f, reason: `unreadable: ${e.message}` });
    }
  }
}

const seen = new Set();
const slugs = new Set();
const products = [];
let id = 1;
for (const p of rawAll) {
  const why = (reason) => skipped.push({ name: p.name, brand: p.brandId, reason });
  if (!brandIds.has(p.brandId)) { why(`unknown brandId ${p.brandId}`); continue; }
  if (!categoryIds.has(p.categoryId)) { why(`unknown categoryId ${p.categoryId}`); continue; }
  if (!p.name || !p.sourceUrl) { why('missing name or sourceUrl'); continue; }
  if (p.notSoldInCH) { why('not sold in Switzerland'); continue; }
  // EUR prices taken from retailers (not the manufacturer) may be old-model or former UVPs: not published.
  if (typeof p.priceCHF !== 'number' && /bike-discount|bike24|bikes\.de|fahrrad\.de|fahrrad-xxl|rose|radon|retailer|haendler|händler/i.test(p.priceEURSource || '')) { why('EUR price from retailer, unverified'); continue; }
  // CHF price from a Swiss page wins; otherwise convert the German EUR list price (UVP) at the ECB rate.
  let estimated = false;
  if ((typeof p.priceCHF !== 'number' || p.priceCHF <= 0) && typeof p.priceEUR === 'number' && p.priceEUR > 0) {
    p.priceCHF = Math.round(p.priceEUR * fx.EUR_CHF);
    p.priceNote = `${p.priceNote ? p.priceNote + ' | ' : ''}UVP EUR ${p.priceEUR} (${p.priceEURSource || 'DE'}) umgerechnet zum EZB-Kurs ${fx.EUR_CHF} (${fx.date})`;
    estimated = true;
  }
  if (typeof p.priceCHF !== 'number' || p.priceCHF <= 0) { why('no price'); continue; }
  if (!p.battery || typeof p.battery.wh !== 'number') { why('no battery Wh'); continue; }
  const key = `${p.brandId}|${p.name.toLowerCase()}|${p.modelYear || ''}`;
  if (seen.has(key)) { why('duplicate'); continue; }
  seen.add(key);

  let slug = slugify(p.name);
  if (slugs.has(slug)) slug = `${slug}-${p.modelYear || id}`;
  if (slugs.has(slug)) slug = `${slug}-${id}`;
  slugs.add(slug);
  // Extra official image URLs found later for products that lacked a usable main image.
  if (extraImages[slug]) {
    const have = new Set((p.images || []).map((i) => i.url));
    p.images = [...(p.images || []), ...extraImages[slug].filter((i) => i.url && !have.has(i.url))];
  }

  const wh = p.battery.wh;
  const batteryBracket = wh < 500 ? '<500' : wh <= 625 ? '500-625' : wh <= 750 ? '625-750' : '>750';
  const price = p.priceCHF;
  const priceBracket = price < 2000 ? '<2000' : price <= 3500 ? '2000-3500' : price <= 5000 ? '3500-5000' : '>5000';
  const fast = p.speedClass === 'e-bike-45';
  const ft = ['diamond', 'step-through', 'trapeze'].includes(p.frame?.type) ? p.frame.type : 'diamond';
  const cat = p.categoryId;
  const useCase = [];
  if (cat === 'e-citybikes' || cat === 'e-trekkingbikes' || fast) useCase.push('commute');
  if (cat === 'e-lastenvelos') useCase.push('family');
  if (cat === 'e-bikes-jugend') useCase.push('beginner');
  if (['e-mountainbikes', 'e-rennvelos-gravel', 'e-trekkingbikes'].includes(cat)) useCase.push('touring');
  if (ft === 'step-through') useCase.push('senior');
  if (!useCase.length) useCase.push('commute');

  const desc = (p.description || '').trim();
  const na = 'Nicht angegeben';
  // Shop policy: a product is only published with a qualifying main image.
  const images = pickImages(p);
  if (imageClass && !images.length) { why('no qualifying main image'); slugs.delete(slug); continue; }
  products.push({
    id: `p-${id++}`,
    slug,
    name: p.name,
    brandId: p.brandId,
    categoryId: p.categoryId,
    ...(p.subcategoryId ? { subcategoryId: p.subcategoryId } : {}),
    speedClass: fast ? 'e-bike-45' : 'e-bike-25',
    speedMaxKmH: fast ? 45 : 25,
    priceCHF: price,
    motorBrand: motorBrand(p.motor?.brand),
    motorModel: [p.motor?.brand, p.motor?.model].filter(Boolean).join(' ') || na,
    torqueNm: typeof p.motor?.torqueNm === 'number' ? p.motor.torqueNm : null,
    batteryWh: wh,
    batteryBracket,
    batteryRemovable: p.battery.removable !== false,
    ...(typeof p.rangeKm === 'number' ? { rangeKmEst: { min: p.rangeKm, max: p.rangeKm } } : {}),
    frameType: ft,
    frameMaterial: p.frame?.material || na,
    frameSizes: Array.isArray(p.frame?.sizes) ? p.frame.sizes.map(String) : [],
    weightKg: typeof p.weightKg === 'number' ? p.weightKg : null,
    useCase,
    priceBracket,
    imageUrl: `/images/bikes/${cat}.svg`,
    shortDesc: { de: desc, fr: desc, it: desc },
    testVerdicts: [],
    userReviews: [],
    ratingAverage: 0,
    reviewCount: 0,
    year: p.modelYear || 2025,
    specs: {
      gears: p.gears || na,
      brakes: p.brakes || na,
      fork: p.fork || na,
      display: p.display || na,
      tires: p.tires || na,
      lighting: p.lighting || na,
      ...(typeof p.rackKg === 'number' ? { cargoRackKg: p.rackKg } : {}),
    },
    description: desc || undefined,
    features: p.features || [],
    colours: p.colours || [],
    sourceUrl: p.sourceUrl,
    priceNote: p.priceNote || undefined,
    priceFrom: /\bab\s*CHF|Einstiegspreis|ab-Preis|\bfrom\b/i.test(p.priceNote || '') || undefined,
    priceEstimated: estimated || undefined,
    imageSources: (p.images || []).filter((i) => i.url).map((i) => ({ url: i.url, alt: i.alt || p.name })),
    images,
  });
}

fs.writeFileSync(out, JSON.stringify(products, null, 1) + '\n');

const count = (arr, f) => arr.reduce((a, x) => ((a[f(x)] = (a[f(x)] || 0) + 1), a), {});
const report = [
  '# Sourcing report (generated)',
  '',
  `Products published: ${products.length}`,
  `Skipped: ${skipped.length}`,
  '',
  '## By brand', ...Object.entries(count(products, (p) => p.brandId)).map(([k, v]) => `- ${k}: ${v}`),
  '', '## By category', ...Object.entries(count(products, (p) => p.categoryId)).map(([k, v]) => `- ${k}: ${v}`),
  '', '## With images (source URLs)', `- ${products.filter((p) => p.imageSources.length).length} products, avg ${(products.reduce((a, p) => a + p.imageSources.length, 0) / Math.max(1, products.length)).toFixed(1)} per product`,
  '', '## Skipped', ...skipped.slice(0, 400).map((s) => `- ${s.brand || s.file || ''} ${s.name || ''}: ${s.reason}`),
].join('\n');
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/sourcing-report.md'), report + '\n');
console.log(`products.json: ${products.length} published, ${skipped.length} skipped`);
