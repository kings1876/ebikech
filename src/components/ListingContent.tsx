import { Language, Product } from '../types';
import { CATEGORIES } from '../data/categories';
import { buildLocalizedUrl } from '../utils/routes';
import type { ListingBlock } from '../utils/listingContent';
import { NavLink } from './NavLink';
import { ArrowRight } from './icons';

const L = {
  standouts: { de: 'Auffällige Modelle', fr: 'Modèles remarquables', it: 'Modelli in evidenza' },
  families: { de: 'Modellfamilien', fr: 'Familles de modèles', it: 'Famiglie di modelli' },
  models: { de: 'Modelle', fr: 'modèles', it: 'modelli' },
  from: { de: 'ab', fr: 'dès', it: 'da' },
  guide: { de: 'Zur Kaufberatung', fr: 'Au guide d’achat', it: 'Alla guida all’acquisto' },
  table: { de: 'Modellübersicht', fr: 'Aperçu des modèles', it: 'Panoramica dei modelli' },
  model: { de: 'Modell', fr: 'Modèle', it: 'Modello' },
  price: { de: 'Preis', fr: 'Prix', it: 'Prezzo' },
  motor: { de: 'Motor', fr: 'Moteur', it: 'Motore' },
  battery: { de: 'Akku', fr: 'Batterie', it: 'Batteria' },
  weight: { de: 'Gewicht', fr: 'Poids', it: 'Peso' },
  speed: { de: 'Unterstützung', fr: 'Assistance', it: 'Assistenza' },
  year: { de: 'Jahr', fr: 'Année', it: 'Anno' },
  approx: { de: 'ca. ', fr: 'env. ', it: 'ca. ' },
};

const motorLabel = (p: Product) =>
  `${p.motorBrand === 'Other' ? (/nicht angegeben/i.test(p.motorModel) ? 'Motor' : p.motorModel.split(' ')[0]) : p.motorBrand}${p.torqueNm ? ` ${p.torqueNm} Nm` : ''}`;

/** Data-driven overview text, standout models and model families for category / brand / brand-category pages. */
export function ListingContent({ block, lang, onNavigate, showTable = false }: { block: ListingBlock; lang: Language; onNavigate: (path: string) => void; showTable?: boolean }) {
  const productUrl = (p: { categoryId: string; slug: string }) =>
    buildLocalizedUrl(lang, { lang, view: 'product', category: CATEGORIES.find((c) => c.id === p.categoryId), productSlug: p.slug });

  return (
    <section className="k129" aria-label={block.title}>
      {block.sections.map((s) => (
        <div key={s.heading} className="space-y-2">
          <h2 className="k130">{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="k131">{p}</p>
          ))}
        </div>
      ))}

      {block.highlights.length > 0 && (
        <div className="space-y-2">
          <h2 className="k130">{L.standouts[lang]}</h2>
          <ul className="text-sm space-y-1">
            {block.highlights.map((h) => (
              <li key={h.label}>
                <span className="text-slate-600">{h.label}: </span>
                <NavLink href={productUrl(h.product)} onNavigate={onNavigate} className="k132">
                  {h.product.name}
                </NavLink>{' '}
                <span className="text-slate-500">
                  {`– ${h.product.priceEstimated ? (lang === 'fr' ? 'env. ' : 'ca. ') : ''}CHF ${Math.round(h.product.priceCHF).toLocaleString('de-CH')}`}
                  {h.label === (lang === 'fr' ? 'Plus grande batterie' : lang === 'it' ? 'Batteria più grande' : 'Grösster Akku') ? `, ${h.product.batteryWh} Wh` : ''}
                  {h.product.weightKg && h.label === (lang === 'fr' ? 'Modèle le plus léger' : lang === 'it' ? 'Modello più leggero' : 'Leichtestes Modell') ? `, ${String(h.product.weightKg).replace('.', lang === 'de' ? '.' : ',')} kg` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {block.families.length > 0 && (
        <div className="space-y-2">
          <h2 className="k130">{L.families[lang]}</h2>
          <ul className="k133">
            {block.families.map((f) => (
              <li key={f.name}>
                <NavLink href={productUrl(f.product)} onNavigate={onNavigate} className="k134">
                  {f.name}
                </NavLink>{' '}
                <span className="text-slate-500">
                  {`– ${f.count} ${L.models[lang]}, ${L.from[lang]} CHF ${Math.round(f.from).toLocaleString('de-CH')}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showTable && block.products.length > 0 && (
        <div className="space-y-2">
          <h2 className="k130">{L.table[lang]}</h2>
          <div className="overflow-x-auto">
            <table className="k696">
              <thead>
                <tr>
                  <th>{L.model[lang]}</th>
                  <th>{L.price[lang]}</th>
                  <th>{L.motor[lang]}</th>
                  <th>{L.battery[lang]}</th>
                  <th>{L.weight[lang]}</th>
                  <th>{L.speed[lang]}</th>
                  <th>{L.year[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {[...block.products].sort((a, b) => a.priceCHF - b.priceCHF).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <NavLink href={productUrl(p)} onNavigate={onNavigate} className="k132">
                        {p.name}
                      </NavLink>
                    </td>
                    <td>{`${p.priceEstimated ? L.approx[lang] : ''}CHF ${Math.round(p.priceCHF).toLocaleString('de-CH')}`}</td>
                    <td>{motorLabel(p)}</td>
                    <td>{`${p.batteryWh} Wh`}</td>
                    <td>{p.weightKg ? `${String(p.weightKg).replace('.', lang === 'de' ? '.' : ',')} kg` : '–'}</td>
                    <td>{`bis ${p.speedMaxKmH} km/h`.replace('bis', lang === 'fr' ? 'jusqu’à' : lang === 'it' ? 'fino a' : 'bis')}</td>
                    <td>{p.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {block.guide && (
        <NavLink
          href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: block.guide })}
          onNavigate={onNavigate}
          className="k135"
        >
          {L.guide[lang]}: {block.guide.title[lang]} <ArrowRight className="w-4 h-4" />
        </NavLink>
      )}
    </section>
  );
}
