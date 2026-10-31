// Classifies each sourced image so only clean product photos are shown:
//   bg:    'white' | 'black' | null   (uniform studio background, measured on the image border)
//   whole: true when a complete bike (side view, not touching the frame edges) is visible
// Images are analysed in memory only (nothing is saved). Result cache: src/data/image-class.json
// Needs sharp:  npm i --no-save sharp      Usage: node scripts/classify-images.mjs [--limit N] [--redo]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'));
const outFile = path.join(root, 'src/data/image-class.json');
const status = JSON.parse(fs.readFileSync(path.join(root, 'src/data/image-status.json'), 'utf8'));
const args = process.argv.slice(2);
const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity;
const redo = args.includes('--redo');
const cache = !redo && fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const retryErrors = args.includes('--retry-errors');
if (retryErrors) for (const [u, v] of Object.entries(cache)) if (v.error) delete cache[u];
const slow = retryErrors || redo;
const TIMEOUT = slow ? 120000 : 30000;
const CONCURRENCY = slow ? 4 : 6;

const urls = [...new Set(products.flatMap((p) => p.imageSources.map((i) => i.url)))]
  .filter((u) => status[u] !== false && !(u in cache))
  .slice(0, limit);
console.log(`classifying ${urls.length} images (${Object.keys(cache).length} cached)`);

const W = 400;
async function classify(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  const res = await fetch(url, { signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ebikech-imagecheck)' } });
  if (!res.ok) throw new Error('http ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  clearTimeout(t);
  const img = sharp(buf, { limitInputPixels: 200_000_000, animated: false });
  const { data, info } = await img
    .resize({ width: W, withoutEnlargement: false })
    .flatten({ background: '#ffffff' }) // transparent PNG/WebP cut-outs count as white studio shots
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const px = (x, y) => { const o = (y * w + x) * 3; return [data[o], data[o + 1], data[o + 2]]; };

  // Border ring (3px): share of near-white and near-black pixels
  let n = 0, white = 0, black = 0;
  const ring = (x, y) => {
    const [r, g, b] = px(x, y); n++;
    if (r >= 238 && g >= 238 && b >= 238) white++;
    else if (r <= 22 && g <= 22 && b <= 22) black++;
  };
  for (let y = 0; y < h; y++) for (const x of [0, 1, 2, w - 3, w - 2, w - 1]) ring(x, y);
  for (let x = 3; x < w - 3; x++) for (const y of [0, 1, 2, h - 3, h - 2, h - 1]) ring(x, y);
  const wf = white / n, bf = black / n;
  const bg = wf >= 0.9 ? 'white' : bf >= 0.9 ? 'black' : null;
  if (!bg) return { bg: null, whole: false, w, h };

  // Subject mask = pixels that differ from the background
  const isSubject = (x, y) => {
    const [r, g, b] = px(x, y);
    return bg === 'white' ? (r < 232 || g < 232 || b < 232) : (r > 40 || g > 40 || b > 40);
  };
  let minX = w, maxX = -1, minY = h, maxY = -1, count = 0;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (isSubject(x, y)) { count++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
  }
  if (count < w * h * 0.03) return { bg, whole: false, w, h, empty: true };
  // Wheels check: in the bottom 18% of the subject box, a side-view bike has content across a large
  // share of the width (two wheels); handlebar / cockpit / frame close-ups do not.
  const y0 = Math.floor(maxY - (maxY - minY) * 0.18);
  let covered = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let y = y0; y <= maxY; y++) { if (isSubject(x, y)) { covered++; break; } }
  }
  const bottomCover = covered / (maxX - minX + 1);
  const bw = (maxX - minX + 1) / w, bh = (maxY - minY + 1) / h;
  const aspect = (maxX - minX + 1) / (maxY - minY + 1);
  const m = 0.012; // margin: the bike must not touch the frame
  const touches = minX <= w * m || maxX >= w * (1 - m) || minY <= h * m || maxY >= h * (1 - m);
  const whole = !touches && bw >= 0.5 && aspect >= 1.15 && aspect <= 3.4;
  return { bg, whole, w, h, bw: +bw.toFixed(2), bh: +bh.toFixed(2), aspect: +aspect.toFixed(2), bottomCover: +bottomCover.toFixed(2) };
}

let i = 0, done = 0;
const save = () => fs.writeFileSync(outFile, JSON.stringify(cache, null, 0) + '\n');
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (i < urls.length) {
    const u = urls[i++];
    try { cache[u] = await classify(u); } catch (e) { cache[u] = { bg: null, whole: false, error: String(e.message || e).slice(0, 40) }; }
    if (++done % 50 === 0) { console.log(`${done}/${urls.length}`); save(); }
  }
}));
save();
const v = Object.values(cache);
console.log(`white ${v.filter((x) => x.bg === 'white').length}, black ${v.filter((x) => x.bg === 'black').length}, other ${v.filter((x) => !x.bg).length}; whole-bike ${v.filter((x) => x.whole).length}`);
