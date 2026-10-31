// Checks every sourced image URL (HEAD/GET) and records which ones really serve a browser-friendly image.
// Output: src/data/image-status.json  { [url]: true | false }. Run before build-products when image links change.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'));
const outFile = path.join(root, 'src/data/image-status.json');
const prev = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};

const urls = [...new Set(products.flatMap((p) => p.imageSources.map((i) => i.url)))].filter((u) => !(u in prev));
console.log(`checking ${urls.length} new image URLs (${Object.keys(prev).length} cached)`);

const OK_TYPES = /^image\/(jpeg|jpg|png|webp|avif|gif|svg\+xml)/i;
async function check(url) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 12000);
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ebikech-linkcheck)' } });
    if (!r.ok || !r.headers.get('content-type')) r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctl.signal, headers: { range: 'bytes=0-1023', 'user-agent': 'Mozilla/5.0 (compatible; ebikech-linkcheck)' } });
    clearTimeout(t);
    return r.ok && OK_TYPES.test(r.headers.get('content-type') || '');
  } catch {
    return false;
  }
}

const status = { ...prev };
let i = 0, done = 0;
await Promise.all(Array.from({ length: 16 }, async () => {
  while (i < urls.length) {
    const u = urls[i++];
    status[u] = await check(u);
    if (++done % 200 === 0) console.log(`${done}/${urls.length}`);
  }
}));
fs.writeFileSync(outFile, JSON.stringify(status, null, 1) + '\n');
const vals = Object.values(status);
console.log(`ok ${vals.filter(Boolean).length} / ${vals.length}`);
