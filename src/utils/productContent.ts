import { Language, Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { BRANDS } from '../data/brands';
import { CATEGORIES } from '../data/categories';
import { localizeSpec } from './productText';

export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;
const num = (n: number) => String(Math.round(n * 10) / 10).replace('.', lang0 === 'de' ? '.' : ',');
let lang0: Language = 'de'; // decimal separator follows the language being rendered (set per call)

// ---- catalogue statistics per category (computed once) ----
interface Stats { n: number; battery: number[]; weight: number[]; price: number[]; }
const STATS: Record<string, Stats> = {};
for (const p of ALL_PRODUCTS) {
  const s = (STATS[p.categoryId] = STATS[p.categoryId] || { n: 0, battery: [], weight: [], price: [] });
  s.n++;
  if (p.batteryWh) s.battery.push(p.batteryWh);
  if (p.weightKg) s.weight.push(p.weightKg);
  if (p.priceCHF) s.price.push(p.priceCHF);
}
for (const s of Object.values(STATS)) for (const k of ['battery', 'weight', 'price'] as const) s[k].sort((a, b) => a - b);

const median = (a: number[]) => (a.length ? a[Math.floor(a.length / 2)] : 0);
/** Share (0-100) of the sorted list that is strictly below value. */
const below = (a: number[], v: number) => Math.round((a.filter((x) => x < v).length / Math.max(1, a.length)) * 100);
type Band = 'high' | 'mid' | 'low';
const band = (pct: number): Band => (pct >= 75 ? 'high' : pct <= 25 ? 'low' : 'mid');

const BAND: Record<Language, Record<Band, string>> = {
  de: { high: 'im oberen Viertel', mid: 'im mittleren Bereich', low: 'im unteren Viertel' },
  fr: { high: 'dans le quart supérieur', mid: 'dans la moyenne', low: 'dans le quart inférieur' },
  it: { high: 'nel quarto superiore', mid: 'nella media', low: 'nel quarto inferiore' },
};

const FRAME_FORM: Record<Language, { 'step-through': string; diamond: string }> = {
  de: { 'step-through': 'ein Tiefeinsteiger', diamond: 'ein Diamantrahmen' },
  fr: { 'step-through': 'à passage bas', diamond: 'de type diamant' },
  it: { 'step-through': 'a scavalco basso', diamond: 'a diamante' },
};

function frameMaterial(raw: string | undefined, lang: Language): string {
  const v = raw || '';
  if (!v || /nicht angegeben/i.test(v)) return '';
  if (lang === 'de') return v;
  const carbon = /^carbon/i.test(v);
  const alu = /aluminium/i.test(v);
  if (carbon && alu && /hinterbau/i.test(v)) {
    return lang === 'fr' ? 'carbone pour le cadre principal, aluminium pour le triangle arrière' : 'carbonio per il telaio anteriore, alluminio per il carro posteriore';
  }
  if (carbon) return lang === 'fr' ? 'carbone' : 'carbonio';
  if (alu) return lang === 'fr' ? 'aluminium' : 'alluminio';
  return '';
}

function motorName(p: Product): string {
  const brand = p.motorBrand && p.motorBrand !== 'Other' ? p.motorBrand : '';
  if (!p.motorModel || p.motorModel === 'Other' || /nicht angegeben/i.test(p.motorModel)) return brand;
  return brand && !p.motorModel.toLowerCase().includes(brand.toLowerCase()) ? `${brand} ${p.motorModel}` : p.motorModel;
}

const known = (s?: string) => (s && !/nicht angegeben/i.test(s) ? s : '');

/** Other models of the same family (same first three words of the name), nearest price first. */
export function familyOf(p: Product, limit = 4): Product[] {
  const stem = p.name.split(' ').slice(0, 3).join(' ');
  return ALL_PRODUCTS.filter((q) => q.id !== p.id && q.name.split(' ').slice(0, 3).join(' ') === stem)
    .sort((a, b) => Math.abs(a.priceCHF - p.priceCHF) - Math.abs(b.priceCHF - p.priceCHF))
    .slice(0, limit);
}

/**
 * Long-form product text built only from the product's structured data and honest comparisons
 * with the rest of the catalogue (no invented claims).
 */
export function buildProductContent(p: Product, lang: Language): ContentSection[] {
  lang0 = lang;
  const de = lang === 'de';
  const fr = lang === 'fr';
  const brand = BRANDS.find((b) => b.id === p.brandId)?.name || '';
  const cat = CATEGORIES.find((c) => c.id === p.categoryId);
  const rawCat = cat?.name[lang] || '';
  // French/Italian category names are common nouns inside a sentence: lower-case them (keep acronyms such as VTT)
  const catName = lang !== 'de' && rawCat[1] && rawCat[1] === rawCat[1].toLowerCase() ? rawCat[0].toLowerCase() + rawCat.slice(1) : rawCat;
  const st = STATS[p.categoryId];
  const sections: ContentSection[] = [];

  // 1. Overview
  const speed = p.speedMaxKmH;
  const overview = de
    ? `${p.name} ist ein E-Bike der Kategorie ${catName} von ${brand} (Modelljahr ${p.year}) mit Motorunterstützung bis ${speed} km/h.`
    : fr
    ? `Le ${p.name} est un vélo électrique de la catégorie ${catName} de ${brand} (millésime ${p.year}) avec assistance jusqu’à ${speed} km/h.`
    : `${p.name} è una e-bike della categoria ${catName} di ${brand} (anno modello ${p.year}) con assistenza fino a ${speed} km/h.`;
  const rules = speed >= 45
    ? de ? 'Als schnelles E-Bike gelten ein Führerausweis (mindestens Kategorie M), ein Kontrollschild mit Haftpflichtversicherung und die Helmpflicht.'
      : fr ? 'Comme vélo électrique rapide, il exige un permis (au minimum catégorie M), une plaque avec assurance responsabilité civile et le port du casque.'
      : 'Essendo una e-bike veloce richiede una licenza (almeno categoria M), una targa con assicurazione di responsabilità civile e il casco.'
    : de ? 'Bis 25 km/h gilt es in der Schweiz als Leicht-Motorfahrrad: Kontrollschild und Führerausweis sind in der Regel nicht nötig.'
      : fr ? 'Jusqu’à 25 km/h, il est considéré en Suisse comme un cyclomoteur léger : plaque et permis ne sont en principe pas nécessaires.'
      : 'Fino a 25 km/h è considerata in Svizzera un ciclomotore leggero: targa e licenza di norma non sono necessarie.';
  sections.push({
    heading: de ? 'Das Modell im Überblick' : fr ? 'Le modèle en bref' : 'Il modello in sintesi',
    paragraphs: [overview, rules],
  });

  // 2. Motor and battery
  const motor = motorName(p);
  const mb: string[] = [];
  if (motor || p.batteryWh) {
    const parts = de
      ? `${motor ? `Für den Vortrieb sorgt ${motor}${p.torqueNm ? ` mit ${p.torqueNm} Nm Drehmoment` : ''}. ` : ''}${p.batteryWh ? `Der Akku speichert ${p.batteryWh} Wh${p.batteryRemovable ? ' und lässt sich zum Laden entnehmen' : ''}.` : ''}`
      : fr
      ? `${motor ? `La propulsion est assurée par ${motor}${p.torqueNm ? ` avec ${p.torqueNm} Nm de couple` : ''}. ` : ''}${p.batteryWh ? `La batterie stocke ${p.batteryWh} Wh${p.batteryRemovable ? ' et peut être retirée pour la recharge' : ''}.` : ''}`
      : `${motor ? `La spinta è affidata a ${motor}${p.torqueNm ? ` con ${p.torqueNm} Nm di coppia` : ''}. ` : ''}${p.batteryWh ? `La batteria accumula ${p.batteryWh} Wh${p.batteryRemovable ? ' e si può rimuovere per la ricarica' : ''}.` : ''}`;
    mb.push(parts.trim());
  }
  if (p.batteryWh && st && st.battery.length > 5) {
    const b = band(below(st.battery, p.batteryWh));
    mb.push(
      de ? `Mit ${p.batteryWh} Wh liegt die Akkukapazität ${BAND.de[b]} der ${st.n} ${catName} in unserem Katalog (Median: ${median(st.battery)} Wh). Mehr Kapazität bedeutet in der Regel mehr Reichweite, aber auch mehr Gewicht.`
      : fr ? `Avec ${p.batteryWh} Wh, la capacité se situe ${BAND.fr[b]} des ${st.n} ${catName} de notre catalogue (médiane : ${median(st.battery)} Wh). Plus de capacité signifie en général plus d’autonomie, mais aussi plus de poids.`
      : `Con ${p.batteryWh} Wh la capacità si colloca ${BAND.it[b]} delle ${st.n} ${catName} del nostro catalogo (mediana: ${median(st.battery)} Wh). Più capacità significa di solito più autonomia, ma anche più peso.`,
    );
  }
  if (mb.length) sections.push({ heading: de ? 'Antrieb und Akku' : fr ? 'Moteur et batterie' : 'Motore e batteria', paragraphs: mb });

  // 3. Frame, weight, components
  const fp: string[] = [];
  const mat = frameMaterial(p.frameMaterial, lang);
  const form = FRAME_FORM[lang][p.frameType === 'step-through' ? 'step-through' : 'diamond'];
  fp.push(
    de ? `Der Rahmen ist ${form}${mat ? ` aus ${mat}` : ''}.`
    : fr ? `Le cadre est ${form}${mat ? ` en ${mat}` : ''}.`
    : `Il telaio è ${form}${mat ? ` in ${mat}` : ''}.`,
  );
  if (p.frameSizes?.length) {
    fp.push(de ? `Erhältliche Rahmengrössen: ${p.frameSizes.join(', ')}.` : fr ? `Tailles de cadre disponibles : ${p.frameSizes.join(', ')}.` : `Taglie del telaio disponibili: ${p.frameSizes.join(', ')}.`);
  }
  if (p.weightKg) {
    let w = de ? `Laut Hersteller wiegt das Rad ${num(p.weightKg)} kg` : fr ? `Selon le fabricant, le vélo pèse ${num(p.weightKg)} kg` : `Secondo il produttore la bici pesa ${num(p.weightKg)} kg`;
    if (st && st.weight.length > 5) {
      const lighter = Math.round((st.weight.filter((x) => x > p.weightKg!).length / st.weight.length) * 100);
      w += de ? ` – leichter als ${lighter} % der ${catName} mit Gewichtsangabe.` : fr ? ` – plus léger que ${lighter} % des ${catName} avec poids indiqué.` : ` – più leggera del ${lighter}% delle ${catName} con peso dichiarato.`;
    } else w += '.';
    fp.push(w);
  }
  const comps: string[] = [];
  const add = (labelDe: string, labelFr: string, labelIt: string, v?: string) => {
    const k = known(v);
    if (k) comps.push(`${de ? labelDe : fr ? labelFr : labelIt}${fr ? ' :' : ':'} ${localizeSpec(k, lang)}`);
  };
  add('Schaltung', 'Transmission', 'Trasmissione', p.specs?.gears);
  add('Bremsen', 'Freins', 'Freni', p.specs?.brakes);
  add('Gabel', 'Fourche', 'Forcella', p.specs?.fork);
  add('Reifen', 'Pneus', 'Pneumatici', p.specs?.tires);
  if (comps.length) fp.push(`${de ? 'Ausstattung' : fr ? 'Équipement' : 'Dotazione'} – ${comps.join('; ')}.`);
  sections.push({ heading: de ? 'Rahmen, Gewicht und Ausstattung' : fr ? 'Cadre, poids et équipement' : 'Telaio, peso e dotazione', paragraphs: fp });

  // 5. Price in context
  const pp: string[] = [];
  const priceWord = p.priceFrom ? (de ? 'ab ' : fr ? 'dès ' : 'da ') : '';
  const approx = p.priceEstimated ? (de ? 'ca. ' : fr ? 'env. ' : 'ca. ') : '';
  pp.push(
    de ? `Die Preisempfehlung beträgt ${priceWord}${approx}${chf(p.priceCHF)}.`
    : fr ? `Le prix recommandé est de ${priceWord}${approx}${chf(p.priceCHF)}.`
    : `Il prezzo consigliato è di ${priceWord}${approx}${chf(p.priceCHF)}.`,
  );
  if (st && st.price.length > 5) {
    const b = band(below(st.price, p.priceCHF));
    pp.push(
      de ? `Damit liegt es preislich ${BAND.de[b]} der ${st.n} ${catName} im Katalog (Preisspanne ${chf(st.price[0])} bis ${chf(st.price[st.price.length - 1])}).`
      : fr ? `Il se situe ${BAND.fr[b]} des ${st.n} ${catName} du catalogue en termes de prix (de ${chf(st.price[0])} à ${chf(st.price[st.price.length - 1])}).`
      : `Si colloca ${BAND.it[b]} delle ${st.n} ${catName} del catalogo per prezzo (da ${chf(st.price[0])} a ${chf(st.price[st.price.length - 1])}).`,
    );
  }
  const sib = familyOf(p, 1)[0];
  if (sib) {
    const diff = Math.round(sib.priceCHF - p.priceCHF);
    const abs = chf(Math.abs(diff));
    const diffs: string[] = [];
    if (sib.batteryWh && p.batteryWh && sib.batteryWh !== p.batteryWh) diffs.push(de ? `Akku ${sib.batteryWh} Wh` : fr ? `batterie ${sib.batteryWh} Wh` : `batteria ${sib.batteryWh} Wh`);
    if (sib.weightKg && p.weightKg && sib.weightKg !== p.weightKg) diffs.push(de ? `${num(sib.weightKg)} kg` : `${num(sib.weightKg)} kg`);
    const extra = diffs.length ? (de ? ` (${diffs.join(', ')})` : ` (${diffs.join(', ')})`) : '';
    pp.push(
      de ? `Innerhalb der Serie ist ${sib.name}${extra} die preislich nächste Variante und kostet ${diff === 0 ? 'gleich viel' : `${abs} ${diff > 0 ? 'mehr' : 'weniger'}`}.`
      : fr ? `Dans la même série, la variante la plus proche en prix est le ${sib.name}${extra}, ${diff === 0 ? 'au même prix' : `${abs} ${diff > 0 ? 'plus cher' : 'moins cher'}`}.`
      : `Nella stessa serie la variante più vicina per prezzo è ${sib.name}${extra}, ${diff === 0 ? 'allo stesso prezzo' : `${abs} ${diff > 0 ? 'più cara' : 'meno cara'}`}.`,
    );
  }
  if (p.priceEstimated) {
    pp.push(de ? 'Der Preis wurde aus der Euro-Preisempfehlung des Herstellers umgerechnet und kann vom tatsächlichen Schweizer Preis abweichen.'
      : fr ? 'Le prix a été converti à partir du prix recommandé en euros et peut différer du prix suisse effectif.'
      : 'Il prezzo è stato convertito dal prezzo consigliato in euro e può differire dal prezzo svizzero effettivo.');
  }
  sections.push({ heading: de ? 'Preis und Einordnung' : fr ? 'Prix et positionnement' : 'Prezzo e posizionamento', paragraphs: pp });

  return sections;
}
