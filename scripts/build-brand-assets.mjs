// Generates the brand assets from the logo definition below (needs sharp: npm i --no-save sharp).
//   public/logo.svg, public/logo.png      logo mark (also used in structured data)
//   app/icon.svg, app/apple-icon.png, app/favicon.ico   browser / home-screen icons
//   public/og/og-{de,fr,it}.png           1200x630 social-share images
// Usage: node scripts/build-brand-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => path.join(root, p);
fs.mkdirSync(out('public/og'), { recursive: true });

const ACCENT = '#dc2626';
const DARK = '#0f172a';
const products = JSON.parse(fs.readFileSync(out('src/data/products.json'), 'utf8'));
const N = products.length;
const B = new Set(products.map((p) => p.brandId)).size;

// Logo mark: rounded red square, white wheel ring, white lightning bolt (mirrors src/components/Logo.tsx)
const markInner = `
  <rect width="64" height="64" rx="15" fill="${ACCENT}"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M35.5 15 22.5 35.5h8.2L28.5 49 41.5 28.5h-8.2z" fill="#fff"/>`;
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">${markInner}\n</svg>\n`;

fs.writeFileSync(out('public/logo.svg'), markSvg);
fs.writeFileSync(out('app/icon.svg'), markSvg);
await sharp(Buffer.from(markSvg)).resize(512, 512).png().toFile(out('public/logo.png'));
await sharp(Buffer.from(markSvg)).resize(180, 180).png().toFile(out('app/apple-icon.png'));

// favicon.ico: an ICO container holding one 48x48 PNG
const png48 = await sharp(Buffer.from(markSvg)).resize(48, 48).png().toBuffer();
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4); // ICONDIR
head.writeUInt8(48, 6); head.writeUInt8(48, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(png48.length, 14); head.writeUInt32LE(22, 18);
fs.writeFileSync(out('app/favicon.ico'), Buffer.concat([head, png48]));

// Social-share images
const copy = {
  de: { lead: 'E-Bikes', tail: 'zu verkaufen', tag: 'Neue E-Bikes für die Schweiz', facts: `${N} E-Bikes · ${B} Marken · Preise in CHF` },
  fr: { lead: 'E-Bikes', tail: 'à vendre', tag: 'Vélos électriques neufs pour la Suisse', facts: `${N} vélos électriques · ${B} marques · prix en CHF` },
  it: { lead: 'E-Bike', tail: 'in vendita', tag: 'E-bike nuove per la Svizzera', facts: `${N} e-bike · ${B} marchi · prezzi in CHF` },
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
for (const [lang, c] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${DARK}"/>
  <rect x="0" y="0" width="14" height="630" fill="${ACCENT}"/>
  <circle cx="1010" cy="315" r="330" fill="none" stroke="#1e293b" stroke-width="46"/>
  <circle cx="1010" cy="315" r="205" fill="none" stroke="#1e293b" stroke-width="22"/>
  <g transform="translate(90 120) scale(2.2)">${markInner}</g>
  <text x="90" y="390" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff">${esc(c.lead)} <tspan fill="${ACCENT}" font-weight="600">${esc(c.tail)}</tspan></text>
  <text x="90" y="460" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="40" fill="#cbd5e1">${esc(c.tag)}</text>
  <text x="90" y="560" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="30" fill="#94a3b8">${esc(c.facts)}</text>
  <text x="1110" y="560" text-anchor="end" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="28" font-weight="600" fill="#94a3b8">e-bikes-zuverkaufen.ch</text>
</svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out(`public/og/og-${lang}.png`));
}
console.log('brand assets written');
