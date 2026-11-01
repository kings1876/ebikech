import { Language, Product } from '../types';

// Sourced spec values are German (manufacturer data collected for the German market).
// localizeSpec() translates the recurring terms so French and Italian pages do not show German text.
type Rule = [RegExp, string, string]; // [pattern, French, Italian]
const RULES: Rule[] = [
  [/Nicht angegeben/gi, 'Non précisé', 'Non specificato'],
  [/nicht ab Werk/gi, 'non monté d’origine', 'non di serie'],
  [/(\d+)-Kolben-Scheibenbremsen?/gi, 'freins à disque $1 pistons', 'freni a disco a $1 pistoncini'],
  [/Hydraulische?n?\s+Scheibenbremsen?/gi, 'freins à disque hydrauliques', 'freni a disco idraulici'],
  [/Scheibenbremsen?/gi, 'freins à disque', 'freni a disco'],
  [/Scheibe\b/gi, 'disque', 'disco'],
  [/Hydraulische?n?\b/gi, 'hydraulique', 'idraulico'],
  [/Kolben/gi, 'pistons', 'pistoncini'],
  [/(\d+)-fach/gi, '$1 vitesses', '$1 rapporti'],
  [/(\d+)-Gang/gi, '$1 vitesses', '$1 rapporti'],
  [/-G\b/g, ' vitesses', ' rapporti'],
  [/Gänge/gi, 'vitesses', 'rapporti'],
  [/Kettenschaltung/gi, 'dérailleur', 'cambio a catena'],
  [/Nabenschaltung/gi, 'moyeu à vitesses intégrées', 'cambio nel mozzo'],
  [/Federweg/gi, 'débattement', 'escursione'],
  [/Steckachse/gi, 'axe traversant', 'perno passante'],
  [/Kassette/gi, 'cassette', 'cassetta'],
  [/Rücklichts?/gi, 'feu arrière', 'fanale posteriore'],
  [/Licht vorn/gi, 'éclairage avant', 'luce anteriore'],
  [/Schiebehilfe/gi, 'aide à la poussée', 'assistenza alla spinta'],
  [/Farbdisplay/gi, 'écran couleur', 'display a colori'],
  [/\bvorn\b/gi, 'avant', 'anteriore'],
  [/\bhinten\b/gi, 'arrière', 'posteriore'],
  [/\bmit\b/gi, 'avec', 'con'],
  [/\bohne\b/gi, 'sans', 'senza'],
  [/(\d)\s*Z\.(?=[;,)\s]|$)/g, '$1 dents', '$1 denti'],
  [/\bund\b/gi, 'et', 'e'],
];

export function localizeSpec(value: string | undefined | null, lang: Language): string {
  const v = value || '';
  if (lang === 'de') return v;
  let out = v;
  for (const [re, fr, it] of RULES) out = out.replace(re, lang === 'fr' ? fr : it);
  return out;
}

const MATERIAL: Record<string, [string, string]> = { aluminium: ['aluminium', 'alluminio'], carbon: ['carbone', 'carbonio'] };

/**
 * Product description for the page. German keeps the sourced text; French and Italian are built
 * from the structured data so the page is fully in the visitor's language.
 */
export function describeProduct(p: Product, lang: Language): string {
  if (lang === 'de') return p.shortDesc.de;
  const fr = lang === 'fr';
  const motorBrand = p.motorBrand && p.motorBrand !== 'Other' ? p.motorBrand : '';
  const motor =
    p.motorModel && p.motorModel !== 'Other' && !/nicht angegeben/i.test(p.motorModel)
      ? motorBrand && !p.motorModel.toLowerCase().includes(motorBrand.toLowerCase()) ? `${motorBrand} ${p.motorModel}` : p.motorModel
      : motorBrand;
  const matKey = /^carbon/i.test(p.frameMaterial || '') ? 'carbon' : /^aluminium/i.test(p.frameMaterial || '') ? 'aluminium' : '';
  const material = matKey ? MATERIAL[matKey][fr ? 0 : 1] : '';
  const known = (s?: string) => (s && !/nicht angegeben/i.test(s) ? localizeSpec(s, lang) : '');
  const gears = known(p.specs?.gears);
  const brakes = known(p.specs?.brakes);

  const parts: string[] = [];
  parts.push(
    fr
      ? `${p.name} : ${material ? `cadre en ${material}` : 'vélo électrique'}${motor ? ` avec moteur ${motor}${p.torqueNm ? ` (${p.torqueNm} Nm)` : ''}` : ''}${p.batteryWh ? ` et batterie de ${p.batteryWh} Wh` : ''}.`
      : `${p.name}: ${material ? `telaio in ${material}` : 'bicicletta elettrica'}${motor ? ` con motore ${motor}${p.torqueNm ? ` (${p.torqueNm} Nm)` : ''}` : ''}${p.batteryWh ? ` e batteria da ${p.batteryWh} Wh` : ''}.`,
  );
  if (gears) parts.push(fr ? `Transmission : ${gears}.` : `Trasmissione: ${gears}.`);
  if (brakes) parts.push(fr ? `Freins : ${brakes}.` : `Freni: ${brakes}.`);
  if (p.weightKg) parts.push(fr ? `Poids : ${p.weightKg} kg.` : `Peso: ${p.weightKg} kg.`);
  return parts.join(' ');
}
