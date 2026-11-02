import { Language } from '../types';
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
};

/** Data-driven overview text, standout models and model families for category / brand / brand-category pages. */
export function ListingContent({ block, lang, onNavigate }: { block: ListingBlock; lang: Language; onNavigate: (path: string) => void }) {
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
                  – {h.product.priceEstimated ? (lang === 'fr' ? 'env. ' : 'ca. ') : ''}CHF {Math.round(h.product.priceCHF).toLocaleString('de-CH')}
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
                  – {f.count} {L.models[lang]}, {L.from[lang]} CHF {Math.round(f.from).toLocaleString('de-CH')}
                </span>
              </li>
            ))}
          </ul>
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
