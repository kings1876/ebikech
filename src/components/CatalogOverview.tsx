import { Suspense } from 'react';
import { Language } from '../types';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ALL_PRODUCTS } from '../data/products';
import { buildLocalizedUrl } from '../utils/routes';
import { NavLink } from './NavLink';

const L = {
  title: { de: 'Das Sortiment im Überblick', fr: 'L’assortiment en un coup d’œil', it: 'L’assortimento in sintesi' },
  category: { de: 'Kategorie', fr: 'Catégorie', it: 'Categoria' },
  models: { de: 'Modelle', fr: 'Modèles', it: 'Modelli' },
  from: { de: 'Preis ab', fr: 'Prix dès', it: 'Prezzo da' },
  to: { de: 'bis', fr: 'jusqu’à', it: 'fino a' },
  brands: { de: 'Marken', fr: 'Marques', it: 'Marchi' },
};

const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;

/** Data-driven overview of the whole catalogue: counts, price range and one row per category. */
export function CatalogOverview({ lang, onNavigate }: { lang: Language; onNavigate: (path: string) => void }) {
  const cats = CATEGORIES.map((category) => ({ category, list: ALL_PRODUCTS.filter((p) => p.categoryId === category.id) })).filter((c) => c.list.length > 0);
  const brands = BRANDS.filter((b) => ALL_PRODUCTS.some((p) => p.brandId === b.id));
  const prices = ALL_PRODUCTS.map((p) => p.priceCHF);
  const intro =
    lang === 'fr'
      ? `Le catalogue compte ${ALL_PRODUCTS.length} nouveaux vélos électriques de ${brands.length} marques, répartis en ${cats.length} catégories. Les prix vont de ${chf(Math.min(...prices))} à ${chf(Math.max(...prices))}. Chaque modèle est neuf et livré depuis notre propre stock, le paiement se fait par virement bancaire.`
      : lang === 'it'
        ? `Il catalogo comprende ${ALL_PRODUCTS.length} e-bike nuove di ${brands.length} marchi, suddivise in ${cats.length} categorie. I prezzi vanno da ${chf(Math.min(...prices))} a ${chf(Math.max(...prices))}. Ogni modello è nuovo e viene consegnato dal nostro magazzino, il pagamento avviene tramite bonifico bancario.`
        : `Der Katalog umfasst ${ALL_PRODUCTS.length} neue E-Bikes von ${brands.length} Marken in ${cats.length} Kategorien. Die Preise reichen von ${chf(Math.min(...prices))} bis ${chf(Math.max(...prices))}. Jedes Modell ist neu und wird aus unserem eigenen Lager geliefert, bezahlt wird per Banküberweisung.`;

  return (
    <Suspense fallback={null}>
    <section className="k129" aria-label={L.title[lang]}>
      <div className="space-y-2">
        <h2 className="k130">{L.title[lang]}</h2>
        <p className="k131">{intro}</p>
        <p className="k131">{`${L.brands[lang]}: ${brands.map((b) => b.name).join(', ')}.`}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="k696">
          <thead>
            <tr>
              <th>{L.category[lang]}</th>
              <th>{L.models[lang]}</th>
              <th>{L.from[lang]}</th>
              <th>{L.to[lang]}</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(({ category, list }) => (
              <tr key={category.id}>
                <td>
                  <NavLink href={buildLocalizedUrl(lang, { lang, view: 'category', category })} onNavigate={onNavigate} className="k132">
                    {category.name[lang]}
                  </NavLink>
                </td>
                <td>{list.length}</td>
                <td>{chf(Math.min(...list.map((p) => p.priceCHF)))}</td>
                <td>{chf(Math.max(...list.map((p) => p.priceCHF)))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </Suspense>
  );
}
