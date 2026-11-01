import { Language, Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CollectionDef, LANDING_CONTENT } from '../data/collections';

// Keyword phrases per category (from docs/keywords-de-ch.md for German; FR/IT use natural Swiss phrasing).
export const CATEGORY_KEYWORD: Record<string, Record<Language, string>> = {
  'e-mountainbikes': { de: 'E-Mountainbike', fr: 'VTT électrique', it: 'Mountain bike elettrica' },
  'e-trekkingbikes': { de: 'Trekking E-Bike', fr: 'Vélo de trekking électrique', it: 'Bicicletta elettrica trekking' },
  'e-citybikes': { de: 'City E-Bike', fr: 'Vélo de ville électrique', it: 'Bicicletta elettrica city' },
  'e-rennvelos-gravel': { de: 'Gravel E-Bike', fr: 'Vélo gravel électrique', it: 'Bicicletta elettrica gravel' },
  'e-lastenvelos': { de: 'Cargo E-Bike', fr: 'Vélo cargo électrique', it: 'Bicicletta elettrica cargo' },
  'schnelle-e-bikes': { de: 'E-Bike 45 km/h', fr: 'Vélo électrique 45 km/h', it: 'Bicicletta elettrica 45 km/h' },
  'e-faltvelos': { de: 'Falt E-Bike', fr: 'Vélo électrique pliant', it: 'Bicicletta elettrica pieghevole' },
  'e-bikes-jugend': { de: 'E-Bike Jugend', fr: 'Vélo électrique ado', it: 'Bicicletta elettrica ragazzi' },
};

/** Second phrasing people search for (word order / spelling), worked into descriptions. Keywords from docs/keywords-de-ch.md. */
const CATEGORY_ALIAS: Record<string, Partial<Record<Language, string>>> = {
  'e-mountainbikes': { de: 'Mountain E-Bike' },
  'e-citybikes': { de: 'E-Bike City' },
  'schnelle-e-bikes': { de: 'E-Bike kaufen 45 km/h, 45 kmh E-Bike', it: 'Biciclette elettriche 45 km/h' },
};
/** Full lead phrase for brands whose searched spelling differs from the display name. */
const BRAND_LEAD_DE: Record<string, string> = { 'riese-mueller': 'Riese und Müller E-Bike' };

export { SITE_NAME } from '../config/brand';
import { SITE_NAME } from '../config/brand';

const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;

/** Appends " | Brand" only when the whole title stays within the length budget. */
export function fitTitle(main: string, lang: Language, max = 60): string {
  const full = `${main} | ${SITE_NAME[lang]}`;
  return full.length <= max ? full : main;
}

/** Trims to a word boundary within max characters. */
export function fitDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s-]+$/, '') + '…';
}

export function catalogueStats(filter: (p: Product) => boolean = () => true) {
  const list = ALL_PRODUCTS.filter(filter);
  const minPrice = list.length ? Math.min(...list.map((p) => p.priceCHF)) : 0;
  const brandCounts: Record<string, number> = {};
  for (const p of list) brandCounts[p.brandId] = (brandCounts[p.brandId] || 0) + 1;
  const topBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => BRANDS.find((b) => b.id === id)?.name || id);
  return { count: list.length, minPrice, brandCount: topBrands.length, topBrands };
}

const W = {
  de: { models: 'Modelle', from: 'ab', approx: 'ca.', with: 'mit', ch: 'Schweiz' },
  fr: { models: 'modèles', from: 'dès', approx: 'env.', with: 'avec', ch: 'Suisse' },
  it: { models: 'modelli', from: 'da', approx: 'ca.', with: 'con', ch: 'Svizzera' },
} as const;

export function categorySeo(categoryId: string, lang: Language) {
  const kw = CATEGORY_KEYWORD[categoryId]?.[lang] || categoryId;
  const s = catalogueStats((p) => p.categoryId === categoryId);
  const w = W[lang];
  const brands = s.topBrands.slice(0, 3).join(', ');
  const title = fitTitle(
    lang === 'de' ? `${kw} Schweiz kaufen – ${s.count} Modelle`
    : lang === 'fr' ? `${kw} en Suisse – ${s.count} modèles`
    : `${kw} in Svizzera – ${s.count} modelli`,
    lang,
  );
  const alias = CATEGORY_ALIAS[categoryId]?.[lang];
  const lead = alias ? `${kw} / ${alias}` : kw;
  const description = fitDescription(
    lang === 'de' ? `${lead}: ${s.count} Modelle ab ${chf(s.minPrice)} von ${brands} u.a. Technische Daten zu Motor, Akku und Gewicht, Preise in CHF.`
    : lang === 'fr' ? `${lead} : ${s.count} modèles dès ${chf(s.minPrice)}, dont ${brands}. Fiches techniques moteur, batterie et poids, prix en CHF.`
    : `${lead}: ${s.count} modelli da ${chf(s.minPrice)}, tra cui ${brands}. Dati tecnici di motore, batteria e peso, prezzi in CHF.`,
  );
  return { kw, title, description, ...s, w };
}

export function collectionSeo(collection: CollectionDef, lang: Language) {
  const kw = collection.keyword[lang];
  const s = catalogueStats(collection.filter);
  const brands = s.topBrands.slice(0, 3).join(', ');
  const title = fitTitle(
    lang === 'de' ? `${kw} kaufen Schweiz – ${s.count} Modelle`
    : lang === 'fr' ? `${kw} en Suisse – ${s.count} modèles`
    : `${kw} in Svizzera – ${s.count} modelli`,
    lang,
  );
  const description = fitDescription(
    lang === 'de' ? `${kw}: ${s.count} Modelle mit Tiefeinstieg ab ${chf(s.minPrice)} von ${brands} u.a. Motor, Akku, Gewicht und Preise in CHF im Vergleich.`
    : lang === 'fr' ? `${kw} : ${s.count} modèles à cadre bas dès ${chf(s.minPrice)}, dont ${brands}. Moteur, batterie, poids et prix en CHF.`
    : `${kw}: ${s.count} modelli a telaio basso da ${chf(s.minPrice)}, tra cui ${brands}. Motore, batteria, peso e prezzi in CHF.`,
  );
  return { kw, title, description, ...s };
}

/** schema.org FAQPage for a landing page's FAQ block (or undefined when the page has none). */
export function faqJsonLd(contentKey: string, lang: Language) {
  const c = LANDING_CONTENT[contentKey];
  if (!c) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang === 'fr' ? 'fr-CH' : lang === 'it' ? 'it-CH' : 'de-CH',
    mainEntity: c.faq[lang].map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function brandSeo(brandId: string, lang: Language) {
  const brand = BRANDS.find((b) => b.id === brandId);
  const name = brand?.name || brandId;
  const s = catalogueStats((p) => p.brandId === brandId);
  const short = (s: string) => (lang === 'de' ? s : s.replace(/^Bicicletta elettrica /, '').replace(/^Vélo (de |électrique )?/, '').replace(/ électrique$/, '').replace(/^E-Bike /, '').toLowerCase());
  const cats = [...new Set(ALL_PRODUCTS.filter((p) => p.brandId === brandId).map((p) => CATEGORY_KEYWORD[p.categoryId]?.[lang]).filter(Boolean).map((s) => short(s as string)))];
  const catList = cats.slice(0, 3).join(', ');
  const title = fitTitle(
    lang === 'de' ? `${name} E-Bike Schweiz – ${s.count} Modelle ab ${chf(s.minPrice)}`
    : lang === 'fr' ? `${name} vélo électrique – ${s.count} modèles dès ${chf(s.minPrice)}`
    : `${name} e-bike – ${s.count} modelli da ${chf(s.minPrice)}`,
    lang,
  );
  const description = fitDescription(
    lang === 'de' ? `${BRAND_LEAD_DE[brandId] || `E-Bike ${name}`}:${s.count} Modelle ab ${chf(s.minPrice)}, ${catList}. Preise in CHF, Motor, Akku und technische Daten im Überblick.`
    : lang === 'fr' ? `${s.count} vélos électriques ${name} dès ${chf(s.minPrice)} : ${catList}. Prix en CHF, moteur, batterie et fiches techniques.`
    : `${s.count} e-bike ${name} da ${chf(s.minPrice)}: ${catList}. Prezzi in CHF, motore, batteria e dati tecnici.`,
  );
  return { name, title, description, ...s };
}

export function brandCategorySeo(brandId: string, categoryId: string, lang: Language) {
  const name = BRANDS.find((b) => b.id === brandId)?.name || brandId;
  const kw = CATEGORY_KEYWORD[categoryId]?.[lang] || categoryId;
  const s = catalogueStats((p) => p.brandId === brandId && p.categoryId === categoryId);
  const withPrice =
    lang === 'de' ? `${name} ${kw} – ${s.count} Modelle ab ${chf(s.minPrice)}`
    : lang === 'fr' ? `${name} ${kw} – ${s.count} modèles dès ${chf(s.minPrice)}`
    : `${name} ${kw} – ${s.count} modelli da ${chf(s.minPrice)}`;
  const withoutPrice = lang === 'de' ? `${name} ${kw} – ${s.count} Modelle` : lang === 'fr' ? `${name} ${kw} – ${s.count} modèles` : `${name} ${kw} – ${s.count} modelli`;
  const title = [withPrice, withoutPrice].map((m) => fitTitle(m, lang)).find((x) => x.length <= 60) || withoutPrice;
  const description = fitDescription(
    lang === 'de' ? `${kw} von ${name}: ${s.count} Modelle ab ${chf(s.minPrice)}. Motor, Akku, Gewicht und Preise in CHF im direkten Vergleich.`
    : lang === 'fr' ? `${kw} ${name} : ${s.count} modèles dès ${chf(s.minPrice)}. Moteur, batterie, poids et prix en CHF en un coup d’œil.`
    : `${kw} ${name}: ${s.count} modelli da ${chf(s.minPrice)}. Motore, batteria, peso e prezzi in CHF a confronto.`,
  );
  return { title, description, ...s };
}

export function productSeo(product: Product, lang: Language) {
  const kw = CATEGORY_KEYWORD[product.categoryId]?.[lang] || 'E-Bike';
  const w = W[lang];
  const price = `${product.priceEstimated ? `${w.approx} ` : ''}${chf(product.priceCHF)}`;
  const title = [`${product.name} – ${w.from} ${price}`, `${product.name} – ${price}`, product.name]
    .map((m) => fitTitle(m, lang)).find((x) => x.length <= 60) || product.name;
  const motor = product.motorModel && product.motorModel !== 'Other' && !/nicht angegeben/i.test(product.motorModel)
    ? (product.motorBrand && product.motorBrand !== 'Other' && !product.motorModel.toLowerCase().includes(product.motorBrand.toLowerCase())
        ? `${product.motorBrand} ${product.motorModel}` : product.motorModel)
    : '';
  const bits = [
    motor,
    product.batteryWh ? `${product.batteryWh} Wh${lang === 'de' ? ' Akku' : lang === 'fr' ? ' batterie' : ' batteria'}` : '',
    product.weightKg ? `${product.weightKg} kg` : '',
  ].filter(Boolean).join(', ');
  const head = lang === 'de' ? `${product.name} (${kw}): ${bits}. Preis ${w.from} ${price}.`
    : lang === 'fr' ? `${product.name} (${kw}) : ${bits}. Prix ${w.from} ${price}.`
    : `${product.name} (${kw}): ${bits}. Prezzo ${w.from} ${price}.`;
  const tail = lang === 'de' ? ' Technische Daten und Bilder.' : lang === 'fr' ? ' Fiche technique et photos.' : ' Scheda tecnica e foto.';
  const description = fitDescription(head.length + tail.length <= 155 ? head + tail : head);
  return { title, description };
}
