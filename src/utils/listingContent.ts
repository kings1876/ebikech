import { Language, Product, CategoryDef, BrandDef } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { BLOG_POSTS, BlogPost } from '../data/blog';

export interface ListingSection { heading: string; paragraphs: string[] }
export interface Highlight { label: string; product: Product }
export interface Family { name: string; count: number; from: number; product: Product }
export interface ListingBlock {
  title: string;
  sections: ListingSection[];
  highlights: Highlight[];
  families: Family[];
  guide?: BlogPost;
}

const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;
const fmt = (n: number, lang: Language) => String(Math.round(n * 10) / 10).replace('.', lang === 'de' ? '.' : ',');
const sorted = (a: number[]) => [...a].sort((x, y) => x - y);
const median = (a: number[]) => (a.length ? sorted(a)[Math.floor(a.length / 2)] : 0);
const L = <T,>(lang: Language, de: T, fr: T, it: T): T => (lang === 'fr' ? fr : lang === 'it' ? it : de);
const lcFirst = (s: string, lang: Language) => (lang !== 'de' && s[1] && /[a-zà-ÿ]/.test(s[1]) ? s[0].toLowerCase() + s.slice(1) : s);

const brandName = (id: string) => BRANDS.find((b) => b.id === id)?.name || id;

const GUIDE_FOR_CATEGORY: Record<string, string> = {
  'e-mountainbikes': 'e-mountainbike-kaufen',
  'e-trekkingbikes': 'trekking-e-bike-kaufen',
  'e-citybikes': 'city-e-bike-kaufen',
  'e-rennvelos-gravel': 'gravel-e-bike-kaufen',
  'e-lastenvelos': 'cargo-e-bike-kaufen',
  'schnelle-e-bikes': 'e-bike-45-kmh-kaufen',
};
const GUIDE_FOR_BRAND: Record<string, string> = { cube: 'cube-e-bike-kaufen', trek: 'trek-e-bike-kaufen' };

function motorMix(list: Product[]): { name: string; n: number }[] {
  const m: Record<string, number> = {};
  for (const p of list) {
    const k = p.motorBrand && p.motorBrand !== 'Other' ? p.motorBrand : '';
    if (k) m[k] = (m[k] || 0) + 1;
  }
  return Object.entries(m).map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
}

function families(list: Product[], limit = 6): Family[] {
  const g: Record<string, Product[]> = {};
  for (const p of list) (g[p.name.split(' ').slice(0, 3).join(' ')] = g[p.name.split(' ').slice(0, 3).join(' ')] || []).push(p);
  return Object.entries(g)
    .filter(([, m]) => m.length >= 2)
    .map(([name, m]) => {
      const cheapest = [...m].sort((a, b) => a.priceCHF - b.priceCHF)[0];
      return { name, count: m.length, from: cheapest.priceCHF, product: cheapest };
    })
    .sort((a, b) => b.count - a.count || a.from - b.from)
    .slice(0, limit);
}

function highlights(list: Product[], lang: Language): Highlight[] {
  const out: Highlight[] = [];
  const cheapest = [...list].sort((a, b) => a.priceCHF - b.priceCHF)[0];
  if (cheapest) out.push({ label: L(lang, 'Günstigstes Modell', 'Modèle le moins cher', 'Modello più economico'), product: cheapest });
  const withBattery = list.filter((p) => p.batteryWh);
  const bigBattery = [...withBattery].sort((a, b) => b.batteryWh - a.batteryWh || a.priceCHF - b.priceCHF)[0];
  if (bigBattery && bigBattery.id !== cheapest?.id) out.push({ label: L(lang, 'Grösster Akku', 'Plus grande batterie', 'Batteria più grande'), product: bigBattery });
  const withWeight = list.filter((p) => p.weightKg);
  const lightest = [...withWeight].sort((a, b) => (a.weightKg as number) - (b.weightKg as number) || a.priceCHF - b.priceCHF)[0];
  if (lightest && !out.some((h) => h.product.id === lightest.id)) out.push({ label: L(lang, 'Leichtestes Modell', 'Modèle le plus léger', 'Modello più leggero'), product: lightest });
  return out;
}

/** "Bosch (82 Modelle, 60 %), TQ (12) ..." */
function motorSentence(list: Product[], lang: Language): string {
  const mix = motorMix(list);
  if (!mix.length) return '';
  const total = list.length;
  const top = mix.slice(0, 3).map((m) => `${m.name} (${m.n})`).join(', ');
  const lead = mix[0];
  const pct = Math.round((lead.n / total) * 100);
  if (mix.length === 1 && lead.n === total) {
    return L(lang, `Alle Modelle sind mit ${lead.name} Antrieben ausgestattet.`, `Tous les modèles sont équipés de moteurs ${lead.name}.`, `Tutti i modelli sono dotati di motori ${lead.name}.`);
  }
  return L(
    lang,
    `Am häufigsten ist ${lead.name} verbaut (${pct} % der Modelle). Antriebsmarken im Überblick: ${top}.`,
    `${lead.name} est le plus répandu (${pct} % des modèles). Marques de moteur : ${top}.`,
    `${lead.name} è il più diffuso (${pct}% dei modelli). Marchi di motore: ${top}.`,
  );
}

function priceBrackets(list: Product[], lang: Language): string {
  const cuts = [3000, 5000, 8000];
  const counts = [0, 0, 0, 0];
  for (const p of list) counts[p.priceCHF < cuts[0] ? 0 : p.priceCHF < cuts[1] ? 1 : p.priceCHF < cuts[2] ? 2 : 3]++;
  const labels = [
    L(lang, `bis ${chf(cuts[0])}`, `jusqu’à ${chf(cuts[0])}`, `fino a ${chf(cuts[0])}`),
    `${chf(cuts[0])} – ${chf(cuts[1])}`,
    `${chf(cuts[1])} – ${chf(cuts[2])}`,
    L(lang, `ab ${chf(cuts[2])}`, `dès ${chf(cuts[2])}`, `da ${chf(cuts[2])}`),
  ];
  const parts = counts.map((c, i) => (c ? `${labels[i]}: ${c}` : '')).filter(Boolean).join(' · ');
  return L(lang, `Nach Preisklasse verteilt: ${parts}.`, `Répartition par prix : ${parts}.`, `Distribuzione per prezzo: ${parts}.`);
}

function techSentence(list: Product[], lang: Language): string[] {
  const out: string[] = [];
  const wh = list.map((p) => p.batteryWh).filter(Boolean);
  if (wh.length) {
    out.push(L(
      lang,
      `Die Akkukapazität liegt zwischen ${Math.min(...wh)} und ${Math.max(...wh)} Wh (Median: ${median(wh)} Wh).`,
      `La capacité des batteries va de ${Math.min(...wh)} à ${Math.max(...wh)} Wh (médiane : ${median(wh)} Wh).`,
      `La capacità delle batterie va da ${Math.min(...wh)} a ${Math.max(...wh)} Wh (mediana: ${median(wh)} Wh).`,
    ));
  }
  const kg = list.map((p) => p.weightKg).filter((x): x is number => !!x);
  if (kg.length >= 3) {
    out.push(L(
      lang,
      `Laut Herstellerangaben wiegen die Modelle mit Gewichtsangabe zwischen ${fmt(Math.min(...kg), lang)} und ${fmt(Math.max(...kg), lang)} kg (Median: ${fmt(median(kg), lang)} kg).`,
      `Selon les fabricants, les modèles avec poids indiqué pèsent de ${fmt(Math.min(...kg), lang)} à ${fmt(Math.max(...kg), lang)} kg (médiane : ${fmt(median(kg), lang)} kg).`,
      `Secondo i produttori i modelli con peso dichiarato pesano da ${fmt(Math.min(...kg), lang)} a ${fmt(Math.max(...kg), lang)} kg (mediana: ${fmt(median(kg), lang)} kg).`,
    ));
  }
  return out;
}

function guideFor(id?: string): BlogPost | undefined {
  return id ? BLOG_POSTS.find((p) => p.id === id) : undefined;
}

export function categoryContent(cat: CategoryDef, lang: Language): ListingBlock | null {
  const list = ALL_PRODUCTS.filter((p) => p.categoryId === cat.id);
  if (list.length < 3) return null;
  const name = lcFirst(cat.name[lang], lang);
  const brands = Object.entries(list.reduce<Record<string, number>>((a, p) => ((a[p.brandId] = (a[p.brandId] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1]);
  const prices = list.map((p) => p.priceCHF);
  const sections: ListingSection[] = [];

  sections.push({
    heading: L(lang, 'Überblick', 'Aperçu', 'Panoramica'),
    paragraphs: [
      L(
        lang,
        `In der Kategorie ${cat.name[lang]} führen wir ${list.length} Modelle von ${brands.length} Marken: ${brands.slice(0, 5).map(([id, n]) => `${brandName(id)} (${n})`).join(', ')}${brands.length > 5 ? ' und weitere' : ''}. Die Preise reichen von ${chf(Math.min(...prices))} bis ${chf(Math.max(...prices))} (Median: ${chf(median(prices))}).`,
        `Dans la catégorie ${cat.name[lang]}, nous présentons ${list.length} modèles de ${brands.length} marques : ${brands.slice(0, 5).map(([id, n]) => `${brandName(id)} (${n})`).join(', ')}${brands.length > 5 ? ' et d’autres' : ''}. Les prix vont de ${chf(Math.min(...prices))} à ${chf(Math.max(...prices))} (médiane : ${chf(median(prices))}).`,
        `Nella categoria ${cat.name[lang]} presentiamo ${list.length} modelli di ${brands.length} marchi: ${brands.slice(0, 5).map(([id, n]) => `${brandName(id)} (${n})`).join(', ')}${brands.length > 5 ? ' e altri' : ''}. I prezzi vanno da ${chf(Math.min(...prices))} a ${chf(Math.max(...prices))} (mediana: ${chf(median(prices))}).`,
      ),
      priceBrackets(list, lang),
    ],
  });

  const tech: string[] = [];
  const ms = motorSentence(list, lang);
  if (ms) tech.push(ms);
  tech.push(...techSentence(list, lang));
  const subs = (cat.subcategories || []).map((s) => ({ s, n: list.filter((p) => p.subcategoryId === s.id).length })).filter((x) => x.n > 0);
  if (subs.length) {
    tech.push(L(
      lang,
      `Nach Bauart: ${subs.map(({ s, n }) => `${s.name.de} (${n})`).join(', ')}.`,
      `Par type : ${subs.map(({ s, n }) => `${s.name.fr} (${n})`).join(', ')}.`,
      `Per tipo: ${subs.map(({ s, n }) => `${s.name.it} (${n})`).join(', ')}.`,
    ));
  }
  const fast = list.filter((p) => p.speedMaxKmH >= 45).length;
  if (fast > 0 && fast < list.length) {
    tech.push(L(lang, `${fast} dieser Modelle unterstützen bis 45 km/h (Führerausweis und Kontrollschild nötig), alle anderen bis 25 km/h.`, `${fast} de ces modèles assistent jusqu’à 45 km/h (permis et plaque requis), tous les autres jusqu’à 25 km/h.`, `${fast} di questi modelli assistono fino a 45 km/h (servono licenza e targa), tutti gli altri fino a 25 km/h.`));
  }
  sections.push({ heading: L(lang, `Technik der ${name}`, `La technique des ${name}`, `La tecnica delle ${name}`), paragraphs: tech });

  return { title: cat.name[lang], sections, highlights: highlights(list, lang), families: families(list), guide: guideFor(GUIDE_FOR_CATEGORY[cat.id]) };
}

export function brandContent(brand: BrandDef, lang: Language): ListingBlock | null {
  const list = ALL_PRODUCTS.filter((p) => p.brandId === brand.id);
  if (list.length < 1) return null;
  const cats = Object.entries(list.reduce<Record<string, number>>((a, p) => ((a[p.categoryId] = (a[p.categoryId] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1]);
  const catLabel = (id: string) => lcFirst(CATEGORIES.find((c) => c.id === id)?.name[lang] || id, lang);
  const prices = list.map((p) => p.priceCHF);
  const sections: ListingSection[] = [];

  sections.push({
    heading: L(lang, `${brand.name} im Überblick`, `${brand.name} en bref`, `${brand.name} in sintesi`),
    paragraphs: [
      L(
        lang,
        `Von ${brand.name} (${brand.country}) führen wir ${list.length} Modelle in ${cats.length} ${cats.length === 1 ? 'Kategorie' : 'Kategorien'}: ${cats.map(([id, n]) => `${catLabel(id)} (${n})`).join(', ')}. Die Preise liegen zwischen ${chf(Math.min(...prices))} und ${chf(Math.max(...prices))}.`,
        `De ${brand.name} (${brand.country}), nous présentons ${list.length} modèles dans ${cats.length} ${cats.length === 1 ? 'catégorie' : 'catégories'} : ${cats.map(([id, n]) => `${catLabel(id)} (${n})`).join(', ')}. Les prix se situent entre ${chf(Math.min(...prices))} et ${chf(Math.max(...prices))}.`,
        `Di ${brand.name} (${brand.country}) presentiamo ${list.length} modelli in ${cats.length} ${cats.length === 1 ? 'categoria' : 'categorie'}: ${cats.map(([id, n]) => `${catLabel(id)} (${n})`).join(', ')}. I prezzi vanno da ${chf(Math.min(...prices))} a ${chf(Math.max(...prices))}.`,
      ),
    ],
  });

  const tech: string[] = [];
  const mix = motorMix(list);
  if (mix.length) {
    tech.push(L(
      lang,
      `Bei ${brand.name} kommen folgende Antriebe zum Einsatz: ${mix.slice(0, 4).map((m) => `${m.name} (${m.n})`).join(', ')}.`,
      `Chez ${brand.name}, les moteurs utilisés sont : ${mix.slice(0, 4).map((m) => `${m.name} (${m.n})`).join(', ')}.`,
      `Su ${brand.name} troviamo questi motori: ${mix.slice(0, 4).map((m) => `${m.name} (${m.n})`).join(', ')}.`,
    ));
  }
  tech.push(...techSentence(list, lang));
  if (tech.length) sections.push({ heading: L(lang, 'Technik', 'Technique', 'Tecnica'), paragraphs: tech });

  return { title: brand.name, sections, highlights: highlights(list, lang), families: families(list), guide: guideFor(GUIDE_FOR_BRAND[brand.id]) };
}

export function brandCategoryContent(brand: BrandDef, cat: CategoryDef, lang: Language): ListingBlock | null {
  const list = ALL_PRODUCTS.filter((p) => p.brandId === brand.id && p.categoryId === cat.id);
  if (list.length < 3) return null;
  const prices = list.map((p) => p.priceCHF);
  const catAll = ALL_PRODUCTS.filter((p) => p.categoryId === cat.id);
  const rank = sorted(catAll.map((p) => p.priceCHF));
  const medBrand = median(prices);
  const medCat = median(catAll.map((p) => p.priceCHF));
  const diff = Math.round(((medBrand - medCat) / medCat) * 100);
  const name = lcFirst(cat.name[lang], lang);
  const sections: ListingSection[] = [];
  sections.push({
    heading: L(lang, `${brand.name} ${cat.name[lang]} im Überblick`, `${brand.name} ${cat.name[lang]} en bref`, `${brand.name} ${cat.name[lang]} in sintesi`),
    paragraphs: [
      L(
        lang,
        `${brand.name} ist in dieser Kategorie mit ${list.length} von ${catAll.length} ${name} im Katalog vertreten. Preise: ${chf(Math.min(...prices))} bis ${chf(Math.max(...prices))}, Median ${chf(medBrand)} – ${diff === 0 ? 'das entspricht dem Median der Kategorie' : `das liegt ${Math.abs(diff)} % ${diff > 0 ? 'über' : 'unter'} dem Median der Kategorie`} (${chf(medCat)}).`,
        `${brand.name} compte ${list.length} des ${catAll.length} ${name} du catalogue. Prix : de ${chf(Math.min(...prices))} à ${chf(Math.max(...prices))}, médiane ${chf(medBrand)} – ${diff === 0 ? 'soit la médiane de la catégorie' : `soit ${Math.abs(diff)} % ${diff > 0 ? 'au-dessus' : 'en dessous'} de la médiane de la catégorie`} (${chf(medCat)}).`,
        `${brand.name} è presente con ${list.length} dei ${catAll.length} ${name} del catalogo. Prezzi: da ${chf(Math.min(...prices))} a ${chf(Math.max(...prices))}, mediana ${chf(medBrand)} – ${diff === 0 ? 'in linea con la mediana della categoria' : `il ${Math.abs(diff)}% ${diff > 0 ? 'sopra' : 'sotto'} la mediana della categoria`} (${chf(medCat)}).`,
      ),
    ],
  });
  void rank;
  const tech: string[] = [];
  const ms = motorSentence(list, lang);
  if (ms) tech.push(ms);
  tech.push(...techSentence(list, lang));
  if (tech.length) sections.push({ heading: L(lang, 'Technik', 'Technique', 'Tecnica'), paragraphs: tech });
  return { title: `${brand.name} ${cat.name[lang]}`, sections, highlights: highlights(list, lang), families: families(list, 4), guide: guideFor(GUIDE_FOR_CATEGORY[cat.id]) };
}
