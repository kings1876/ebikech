'use client';

import { Language } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { CRYPTO } from '../config/reply';
import { buildLocalizedUrl } from '../utils/routes';
import { cryptoTotal, isCryptoEnabled } from '../lib/order';
import { cart, MAX_QTY, useCart } from '../lib/cart';
import { CardImage } from './ProductImages';
import { NavLink } from './NavLink';
import { Minus, Plus, ShoppingCart, Trash2, X } from './icons';

const T = {
  de: { title: 'Warenkorb', empty: 'Ihr Warenkorb ist leer.', close: 'Schliessen', subtotal: 'Zwischensumme', crypto: (n: string, p: number) => `${n} mit ${p} % Krypto-Rabatt`, checkout: 'Zur Kasse', more: 'Weiter einkaufen', remove: 'Entfernen', browse: 'Zu den E-Bikes' },
  fr: { title: 'Panier', empty: 'Votre panier est vide.', close: 'Fermer', subtotal: 'Sous-total', crypto: (n: string, p: number) => `${n} avec ${p} % de remise crypto`, checkout: 'Passer à la caisse', more: 'Continuer mes achats', remove: 'Retirer', browse: 'Voir les vélos électriques' },
  it: { title: 'Carrello', empty: 'Il vostro carrello è vuoto.', close: 'Chiudi', subtotal: 'Subtotale', crypto: (n: string, p: number) => `${n} con sconto crypto del ${p}%`, checkout: 'Vai alla cassa', more: 'Continua gli acquisti', remove: 'Rimuovi', browse: 'Vai alle e-bike' },
} as const;

const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;

/** Slide-over cart. Rendered by App only while open, so it adds nothing to the page HTML. */
export function CartDrawer({ lang, onClose, onNavigate }: { lang: Language; onClose: () => void; onNavigate: (path: string) => void }) {
  const t = T[lang];
  const lines = useCart();
  const rows = lines
    .map((l) => ({ line: l, product: ALL_PRODUCTS.find((p) => p.slug === l.slug) }))
    .filter((r): r is { line: typeof r.line; product: NonNullable<typeof r.product> } => !!r.product);
  const subtotal = rows.reduce((s, r) => s + Math.round(r.product.priceCHF) * r.line.quantity, 0);
  const checkoutUrl = buildLocalizedUrl(lang, { lang, view: 'checkout' });
  const productUrl = (p: { categoryId: string; slug: string }) => buildLocalizedUrl(lang, { lang, view: 'product', category: CATEGORIES.find((c) => c.id === p.categoryId), productSlug: p.slug });
  const go = (url: string) => { onClose(); onNavigate(url); };

  return (
    <div className="k708" role="dialog" aria-modal="true" aria-label={t.title} onClick={onClose}>
      <aside className="k709" onClick={(e) => e.stopPropagation()}>
        <div className="k710">
          <h2 className="k711"><ShoppingCart className="w-5 h-5 text-red-600" />{t.title}{rows.length > 0 && <span className="k712">({rows.reduce((s, r) => s + r.line.quantity, 0)})</span>}</h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="k713"><X className="w-5 h-5" /></button>
        </div>

        {rows.length === 0 ? (
          <div className="k714">
            <p className="text-sm text-slate-600">{t.empty}</p>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate} onClick={onClose} className="k715">{t.browse}</NavLink>
          </div>
        ) : (
          <>
            <ul className="k716">
              {rows.map(({ line, product }) => (
                <li key={product.slug} className="py-4 flex gap-3">
                  <div className="k717"><CardImage images={product.images || []} name={product.name} /></div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <NavLink href={productUrl(product)} onNavigate={onNavigate} onClick={onClose} className="k718">{product.name}</NavLink>
                    <div className="flex items-center gap-3">
                      <div className="k719">
                        <button type="button" onClick={() => cart.setQuantity(product.slug, line.quantity - 1)} aria-label="−" className="k720"><Minus className="w-4 h-4" /></button>
                        <span className="k721" aria-live="polite">{line.quantity}</span>
                        <button type="button" onClick={() => cart.setQuantity(product.slug, line.quantity + 1)} disabled={line.quantity >= MAX_QTY} aria-label="+" className="k722"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button type="button" onClick={() => cart.remove(product.slug)} aria-label={t.remove} title={t.remove} className="k723"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="k724">{chf(product.priceCHF * line.quantity)}</div>
                </li>
              ))}
            </ul>
            <div className="k725">
              <div className="k726"><span>{t.subtotal}</span><span className="font-black text-slate-900">{chf(subtotal)}</span></div>
              {isCryptoEnabled() && CRYPTO.discountPct > 0 && <div className="k727">{t.crypto(chf(cryptoTotal(subtotal)), CRYPTO.discountPct)}</div>}
              <a href={checkoutUrl} onClick={(e) => { e.preventDefault(); go(checkoutUrl); }} className="k728">{t.checkout}</a>
              <button type="button" onClick={onClose} className="k729">{t.more}</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
