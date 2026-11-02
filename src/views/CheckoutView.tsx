'use client';

import { useState } from 'react';
import { Language } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { CRYPTO, REPLY } from '../config/reply';
import { buildLocalizedUrl } from '../utils/routes';
import { activeCoins, cryptoTotal, makeOrderNumber } from '../lib/order';
import { cart, MAX_QTY, useCart } from '../lib/cart';
import { CardImage } from '../components/ProductImages';
import { NavLink } from '../components/NavLink';
import { CheckCircle2, Minus, Plus, Trash2 } from '../components/icons';

const T = {
  de: {
    badge: 'Warenkorb', title: 'Warenkorb und Bestellung', empty: 'Ihr Warenkorb ist leer.', browse: 'Zu den E-Bikes', items: 'Ihre Auswahl', remove: 'Entfernen', qtyMax: `Maximal ${MAX_QTY} pro Modell.`,
    subtotal: 'Zwischensumme', discount: (p: number) => `Krypto-Rabatt (${p} %)`, total: 'Zu zahlen', shipping: 'Lieferung und Übergabe besprechen wir nach Ihrer Bestellung mit Ihnen.',
    delivery: 'Lieferadresse', name: 'Name', phone: 'Telefon', email: 'E-Mail', address: 'Adresse für Lieferung oder Rechnung', notes: 'Wunsch, Rahmengrösse oder Frage (optional)',
    pay: 'Zahlungsart', bank: 'Banküberweisung', crypto: 'Krypto', off: (p: number) => `${p} % Rabatt`, coin: (p: number) => `Kryptowährung wählen (${p} % Rabatt)`,
    cryptoNote: 'Nach dem Absenden gelangen Sie direkt zur Zahlungsseite mit unserer Adresse, dem Netzwerk und dem Betrag samt QR-Code. Senden Sie vorher bitte keine Zahlung.',
    bankNote: 'Wir senden Ihnen die Kontodaten per E-Mail, sobald wir die Verfügbarkeit bestätigt haben.',
    consent: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Bestellung verwendet werden.', send: 'Bestellung absenden', sendCrypto: 'Bestellen und zur Zahlung', sending: 'Wird gesendet …',
    okTitle: 'Bestellung erhalten', okText: 'Wir haben Ihnen eine Bestätigung per E-Mail gesendet. Die Zahlungsdetails folgen in einer separaten E-Mail, sobald wir die Verfügbarkeit bestätigt haben.', ref: 'Ihre Bestellnummer',
    errGeneric: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns direkt an ', errInvalid: 'Bitte prüfen Sie Ihre Angaben.', approx: 'ca. ',
  },
  fr: {
    badge: 'Panier', title: 'Panier et commande', empty: 'Votre panier est vide.', browse: 'Voir les vélos électriques', items: 'Votre sélection', remove: 'Retirer', qtyMax: `Maximum ${MAX_QTY} par modèle.`,
    subtotal: 'Sous-total', discount: (p: number) => `Remise crypto (${p} %)`, total: 'À payer', shipping: 'Nous convenons avec vous de la livraison et de la remise après votre commande.',
    delivery: 'Adresse de livraison', name: 'Nom', phone: 'Téléphone', email: 'E-mail', address: 'Adresse de livraison ou de facturation', notes: 'Souhait, taille de cadre ou question (facultatif)',
    pay: 'Mode de paiement', bank: 'Virement bancaire', crypto: 'Crypto', off: (p: number) => `${p} % de remise`, coin: (p: number) => `Choisir la cryptomonnaie (${p} % de remise)`,
    cryptoNote: 'Après l’envoi, vous accédez directement à la page de paiement avec notre adresse, le réseau et le montant, avec code QR. N’envoyez aucun paiement avant.',
    bankNote: 'Nous vous envoyons les coordonnées bancaires par e-mail dès que la disponibilité est confirmée.',
    consent: 'J’accepte que mes données soient utilisées pour traiter cette commande.', send: 'Envoyer la commande', sendCrypto: 'Commander et payer', sending: 'Envoi en cours …',
    okTitle: 'Commande reçue', okText: 'Nous vous avons envoyé une confirmation par e-mail. Les détails de paiement suivent dans un e-mail séparé dès que la disponibilité est confirmée.', ref: 'Votre numéro de commande',
    errGeneric: 'L’envoi a échoué. Veuillez nous écrire directement à ', errInvalid: 'Veuillez vérifier vos données.', approx: 'env. ',
  },
  it: {
    badge: 'Carrello', title: 'Carrello e ordine', empty: 'Il vostro carrello è vuoto.', browse: 'Vai alle e-bike', items: 'La vostra selezione', remove: 'Rimuovi', qtyMax: `Massimo ${MAX_QTY} per modello.`,
    subtotal: 'Subtotale', discount: (p: number) => `Sconto crypto (${p}%)`, total: 'Da pagare', shipping: 'Concordiamo con voi consegna e ritiro dopo l’ordine.',
    delivery: 'Indirizzo di consegna', name: 'Nome', phone: 'Telefono', email: 'E-mail', address: 'Indirizzo di consegna o fatturazione', notes: 'Desiderio, taglia del telaio o domanda (facoltativo)',
    pay: 'Metodo di pagamento', bank: 'Bonifico bancario', crypto: 'Crypto', off: (p: number) => `sconto ${p}%`, coin: (p: number) => `Scegliete la criptovaluta (sconto ${p}%)`,
    cryptoNote: 'Dopo l’invio passate direttamente alla pagina di pagamento con il nostro indirizzo, la rete e l’importo, con codice QR. Non inviate alcun pagamento prima.',
    bankNote: 'Vi inviamo i dati bancari per e-mail non appena confermata la disponibilità.',
    consent: 'Accetto che i miei dati vengano utilizzati per elaborare questo ordine.', send: 'Invia ordine', sendCrypto: 'Ordina e paga', sending: 'Invio in corso …',
    okTitle: 'Ordine ricevuto', okText: 'Vi abbiamo inviato una conferma per e-mail. I dettagli di pagamento seguono in una e-mail separata non appena confermata la disponibilità.', ref: 'Il vostro numero d’ordine',
    errGeneric: 'Invio non riuscito. Scriveteci direttamente a ', errInvalid: 'Controllate i vostri dati.', approx: 'ca. ',
  },
} as const;

const field = 'k752';
const label = 'block text-xs font-semibold text-slate-700 mb-1';
const chf = (n: number) => `CHF ${Math.round(n).toLocaleString('de-CH')}`;

export function CheckoutView({ lang, onNavigate }: { lang: Language; onNavigate: (path: string) => void }) {
  const t = T[lang];
  const lines = useCart();
  const coins = activeCoins();
  const [payKind, setPayKind] = useState<'bank' | 'crypto'>(coins.length ? 'crypto' : 'bank');
  const [coinId, setCoinId] = useState(coins[0]?.id || '');
  const [state, setState] = useState<'form' | 'sending' | 'done' | 'error'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');

  const rows = lines
    .map((l) => ({ line: l, product: ALL_PRODUCTS.find((p) => p.slug === l.slug) }))
    .filter((r): r is { line: typeof r.line; product: NonNullable<typeof r.product> } => !!r.product);
  const subtotal = rows.reduce((s, r) => s + Math.round(r.product.priceCHF) * r.line.quantity, 0);
  const isCrypto = coins.length > 0 && payKind === 'crypto';
  const total = isCrypto ? cryptoTotal(subtotal) : subtotal;
  const productUrl = (p: { categoryId: string; slug: string }) => buildLocalizedUrl(lang, { lang, view: 'product', category: CATEGORIES.find((c) => c.id === p.categoryId), productSlug: p.slug });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const number = makeOrderNumber();
    setState('sending');
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formName: 'order',
          orderNumber: number,
          lang,
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          address: fd.get('address'),
          notes: fd.get('notes'),
          website: fd.get('website'),
          consent: fd.get('consent') === 'on',
          items: rows.map((x) => ({ slug: x.product.slug, quantity: x.line.quantity })),
          paymentMethod: isCrypto ? coinId : 'bank-transfer',
        }),
      });
      if (!r.ok) {
        setMessage(r.status === 400 ? t.errInvalid : t.errGeneric + REPLY.channels.email);
        setState('error');
        return;
      }
      setOrderNumber(number);
      cart.clear();
      if (isCrypto) {
        // straight to the payment page; sessionStorage covers the case that the order database is unavailable
        try { sessionStorage.setItem(`pay:${number}`, JSON.stringify({ methodId: coinId, amountDue: total, customerName: String(fd.get('name') || ''), lang })); } catch { /* ignore */ }
        window.location.assign(`/order/pay/?id=${encodeURIComponent(number)}&lang=${lang}`);
        return;
      }
      setState('done');
    } catch {
      setMessage(t.errGeneric + REPLY.channels.email);
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="k733">
        <div className="k734"><CheckCircle2 className="w-8 h-8" /></div>
        <h1 className="k5">{t.okTitle}</h1>
        <p className="k401">{t.okText}</p>
        <p className="text-xs text-slate-500">{t.ref}: <span className="k141">{orderNumber}</span></p>
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate} className="k715">{t.browse}</NavLink>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="k735">
        <h1 className="k5">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.empty}</p>
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate} className="k715">{t.browse}</NavLink>
      </div>
    );
  }

  return (
    <div className="k736">
      <div className="k737">{t.badge}</div>
      <h1 className="k738">{t.title}</h1>
      <div className="k739">
        <section className="k740" aria-label={t.items}>
          <h2 className="k130">{t.items}</h2>
          <ul className="divide-y divide-slate-100">
            {rows.map(({ line, product }) => (
              <li key={product.slug} className="py-4 flex gap-4">
                <div className="k741"><CardImage images={product.images || []} name={product.name} /></div>
                <div className="min-w-0 flex-1 space-y-2">
                  <NavLink href={productUrl(product)} onNavigate={onNavigate} className="k718">{product.name}</NavLink>
                  <div className="text-xs text-slate-500">{product.priceEstimated ? t.approx : ''}{chf(product.priceCHF)}</div>
                  <div className="flex items-center gap-3">
                    <div className="k719">
                      <button type="button" onClick={() => cart.setQuantity(product.slug, line.quantity - 1)} aria-label="−" className="k742"><Minus className="w-4 h-4" /></button>
                      <span className="k721" aria-live="polite">{line.quantity}</span>
                      <button type="button" onClick={() => cart.setQuantity(product.slug, line.quantity + 1)} disabled={line.quantity >= MAX_QTY} aria-label="+" title={t.qtyMax} className="k743"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button type="button" onClick={() => cart.remove(product.slug)} className="k744"><Trash2 className="w-4 h-4" />{t.remove}</button>
                  </div>
                </div>
                <div className="k724">{chf(product.priceCHF * line.quantity)}</div>
              </li>
            ))}
          </ul>
          <dl className="k745">
            <div className="k746"><dt>{t.subtotal}</dt><dd>{chf(subtotal)}</dd></div>
            {isCrypto && <div className="k747"><dt>{t.discount(CRYPTO.discountPct)}</dt><dd>-{chf(subtotal - total)}</dd></div>}
            <div className="k748"><dt>{t.total}</dt><dd>{chf(total)}</dd></div>
          </dl>
          <p className="text-xs text-slate-500">{t.shipping}</p>
        </section>

        <form onSubmit={submit} className="k749">
          <h2 className="k130">{t.delivery}</h2>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div>
            <label htmlFor="co-name" className={label}>{t.name}</label>
            <input id="co-name" name="name" required autoComplete="name" className={field} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="co-phone" className={label}>{t.phone}</label>
              <input id="co-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
            </div>
            <div>
              <label htmlFor="co-email" className={label}>{t.email}</label>
              <input id="co-email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="co-address" className={label}>{t.address}</label>
            <textarea id="co-address" name="address" required minLength={8} rows={3} autoComplete="street-address" className={field} />
          </div>
          <div>
            <label htmlFor="co-notes" className={label}>{t.notes}</label>
            <textarea id="co-notes" name="notes" rows={2} className={field} />
          </div>

          {coins.length > 0 && (
            <fieldset className="space-y-2 pt-1">
              <legend className={label}>{t.pay}</legend>
              <div role="radiogroup" aria-label={t.pay} className="grid grid-cols-2 gap-2">
                {([['crypto', `${t.crypto} (${t.off(CRYPTO.discountPct)})`], ['bank', t.bank]] as const).map(([kind, text]) => (
                  <button key={kind} type="button" role="radio" aria-checked={payKind === kind} onClick={() => setPayKind(kind)} className={`k701 ${payKind === kind ? 'k702' : 'k703'}`}>{text}</button>
                ))}
              </div>
              {payKind === 'crypto' ? (
                <div className="space-y-2">
                  <div className="font-semibold text-slate-800">{t.coin(CRYPTO.discountPct)}</div>
                  <div role="radiogroup" aria-label={t.coin(CRYPTO.discountPct)} className="flex flex-wrap gap-2">
                    {coins.map((c) => (
                      <button key={c.id} type="button" role="radio" aria-checked={coinId === c.id} onClick={() => setCoinId(c.id)} className={`k704 ${coinId === c.id ? 'k705' : 'k703'}`}>{c.symbol}</button>
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{t.cryptoNote}</p>
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed">{t.bankNote}</p>
              )}
            </fieldset>
          )}

          <label className="k750">
            <input name="consent" type="checkbox" required className="mt-0.5" />
            <span>{t.consent}</span>
          </label>
          {state === 'error' && <p className="text-red-700 font-semibold" role="alert">{message}</p>}
          <button type="submit" disabled={state === 'sending'} className="k751">
            {state === 'sending' ? t.sending : isCrypto ? `${t.sendCrypto} (${chf(total)})` : `${t.send} (${chf(total)})`}
          </button>
        </form>
      </div>
    </div>
  );
}
