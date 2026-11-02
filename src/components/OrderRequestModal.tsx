'use client';

import { useState } from 'react';
import { Product, Language } from '../types';
import { CheckCircle2, X } from './icons';
import { activeCoins, cryptoTotal, makeOrderNumber } from '../lib/order';
import { CRYPTO, REPLY } from '../config/reply';

const T = {
  de: { badge: 'Bestellanfrage', title: 'Bestellen per Banküberweisung', intro: 'Senden Sie uns Ihre Angaben. Wir bestätigen die Verfügbarkeit und senden Ihnen die Zahlungsdetails per E-Mail – bezahlt wird erst danach.', price: 'Preisempfehlung', name: 'Name', email: 'E-Mail', phone: 'Telefon', address: 'Adresse für Lieferung oder Rechnung', notes: 'Wunsch, Rahmengrösse oder Frage (optional)', consent: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden.', send: 'Bestellanfrage senden', sending: 'Wird gesendet …', okTitle: 'Anfrage erhalten', okText: 'Wir haben Ihnen eine Bestätigung per E-Mail gesendet. Die Zahlungsdetails folgen in einer separaten E-Mail.', ref: 'Ihre Bestellnummer', close: 'Schliessen', errGeneric: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns direkt an ', errInvalid: 'Bitte prüfen Sie Ihre Angaben.' },
  fr: { badge: 'Demande de commande', title: 'Commander par virement bancaire', intro: 'Envoyez-nous vos coordonnées. Nous confirmons la disponibilité et vous envoyons les détails de paiement par e-mail – le paiement n’a lieu qu’ensuite.', price: 'Prix recommandé', name: 'Nom', email: 'E-mail', phone: 'Téléphone', address: 'Adresse de livraison ou de facturation', notes: 'Souhait, taille de cadre ou question (facultatif)', consent: 'J’accepte que mes données soient utilisées pour traiter cette demande.', send: 'Envoyer la demande', sending: 'Envoi en cours …', okTitle: 'Demande reçue', okText: 'Nous vous avons envoyé une confirmation par e-mail. Les détails de paiement suivent dans un e-mail séparé.', ref: 'Votre numéro de commande', close: 'Fermer', errGeneric: 'L’envoi a échoué. Veuillez nous écrire directement à ', errInvalid: 'Veuillez vérifier vos données.' },
  it: { badge: 'Richiesta d’ordine', title: 'Ordinare con bonifico bancario', intro: 'Inviateci i vostri dati. Confermiamo la disponibilità e vi inviamo i dettagli di pagamento per e-mail – si paga solo dopo.', price: 'Prezzo consigliato', name: 'Nome', email: 'E-mail', phone: 'Telefono', address: 'Indirizzo di consegna o fatturazione', notes: 'Desiderio, taglia del telaio o domanda (facoltativo)', consent: 'Accetto che i miei dati vengano utilizzati per elaborare questa richiesta.', send: 'Invia richiesta d’ordine', sending: 'Invio in corso …', okTitle: 'Richiesta ricevuta', okText: 'Vi abbiamo inviato una conferma per e-mail. I dettagli di pagamento seguono in una e-mail separata.', ref: 'Il vostro numero d’ordine', close: 'Chiudi', errGeneric: 'Invio non riuscito. Scriveteci direttamente a ', errInvalid: 'Controllate i vostri dati.' },
} as const;

const P = {
  de: { pay: 'Zahlungsart', bank: 'Banküberweisung', crypto: 'Krypto', off: (p: number) => `${p} % Rabatt`, coin: (p: number) => `Kryptowährung wählen (${p} % Rabatt)`, deduct: 'Abzug', total: 'Zu zahlen', cryptoNote: 'Nach dem Absenden gelangen Sie direkt zur Zahlungsseite mit unserer Adresse, dem Netzwerk und dem Betrag samt QR-Code. Senden Sie vorher bitte keine Zahlung.', bankNote: 'Wir senden Ihnen die Kontodaten per E-Mail, sobald wir die Verfügbarkeit bestätigt haben.', send: 'Bestellen und zur Zahlung', title: 'Jetzt bestellen', intro: 'Senden Sie uns Ihre Angaben und wählen Sie die Zahlungsart. Bei Banküberweisung bestätigen wir zuerst die Verfügbarkeit; bei Krypto sehen Sie die Zahlungsangaben sofort.' },
  fr: { pay: 'Mode de paiement', bank: 'Virement bancaire', crypto: 'Crypto', off: (p: number) => `${p} % de remise`, coin: (p: number) => `Choisir la cryptomonnaie (${p} % de remise)`, deduct: 'Remise', total: 'À payer', cryptoNote: 'Après l’envoi, vous accédez directement à la page de paiement avec notre adresse, le réseau et le montant, avec code QR. N’envoyez aucun paiement avant.', bankNote: 'Nous vous envoyons les coordonnées bancaires par e-mail dès que la disponibilité est confirmée.', send: 'Commander et payer', title: 'Commander maintenant', intro: 'Envoyez-nous vos coordonnées et choisissez le mode de paiement. Par virement, nous confirmons d’abord la disponibilité ; en crypto, vous voyez les détails de paiement tout de suite.' },
  it: { pay: 'Metodo di pagamento', bank: 'Bonifico bancario', crypto: 'Crypto', off: (p: number) => `sconto ${p}%`, coin: (p: number) => `Scegliete la criptovaluta (sconto ${p}%)`, deduct: 'Sconto', total: 'Da pagare', cryptoNote: 'Dopo l’invio passate direttamente alla pagina di pagamento con il nostro indirizzo, la rete e l’importo, con codice QR. Non inviate alcun pagamento prima.', bankNote: 'Vi inviamo i dati bancari per e-mail non appena confermata la disponibilità.', send: 'Ordina e paga', title: 'Ordina ora', intro: 'Inviateci i vostri dati e scegliete il metodo di pagamento. Con bonifico confermiamo prima la disponibilità; in crypto vedete subito i dati di pagamento.' },
} as const;

const field = 'k633';

export function OrderRequestModal({ product, onClose, lang }: { product: Product | null; onClose: () => void; lang: Language }) {
  const [state, setState] = useState<'form' | 'sending' | 'done' | 'error'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const coins = activeCoins();
  const [payKind, setPayKind] = useState<'bank' | 'crypto'>(coins.length ? 'crypto' : 'bank');
  const [coinId, setCoinId] = useState(coins[0]?.id || '');
  if (!product) return null;
  const t = T[lang];
  const p = P[lang];
  const withCrypto = coins.length > 0;
  const isCrypto = withCrypto && payKind === 'crypto';
  const subtotal = Math.round(product.priceCHF);
  const total = isCrypto ? cryptoTotal(subtotal) : subtotal;
  const chf = (n: number) => `CHF ${n.toLocaleString('de-CH')}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const number = makeOrderNumber(); // minted in the browser so the same number appears in the email and the dashboard
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
          items: [{ slug: product.slug, quantity: 1 }],
          paymentMethod: isCrypto ? coinId : 'bank-transfer',
        }),
      });
      if (r.ok) {
        setOrderNumber(number);
        setState('done');
        if (isCrypto) {
          // straight to the payment page; the copy in sessionStorage covers the case that the order database is unavailable
          try { sessionStorage.setItem(`pay:${number}`, JSON.stringify({ methodId: coinId, amountDue: total, customerName: String(fd.get('name') || ''), lang })); } catch { /* ignore */ }
          window.location.assign(`/order/pay/?id=${encodeURIComponent(number)}&lang=${lang}`);
        }
      } else {
        setMessage(r.status === 400 ? t.errInvalid : t.errGeneric + REPLY.channels.email);
        setState('error');
      }
    } catch {
      setMessage(t.errGeneric + REPLY.channels.email);
      setState('error');
    }
  };

  return (
    <div className="k136" role="dialog" aria-modal="true" aria-label={t.title}>
      <div className="k137">
        <button onClick={onClose} aria-label={t.close} className="k138">
          <X className="w-5 h-5" />
        </button>

        {state === 'done' ? (
          <div className="py-6 text-center space-y-3">
            <div className="k139">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="k125">{t.okTitle}</h3>
            <p className="k140">{t.okText}</p>
            <p className="text-xs text-slate-500">{t.ref}: <span className="k141">{orderNumber}</span></p>
            <button onClick={onClose} className="k142">{t.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3 text-xs">
            <div className="k143">{t.badge}</div>
            <h3 className="k144">{withCrypto ? p.title : t.title}</h3>
            <p className="text-slate-600 leading-relaxed">{withCrypto ? p.intro : t.intro}</p>
            <div className="k145">
              <div className="k146">{product.name}</div>
              <div className="text-slate-600">{t.price}: {product.priceEstimated ? (lang === 'fr' ? 'env. ' : 'ca. ') : ''}{chf(subtotal)}</div>
              {isCrypto && <div className="font-semibold text-slate-900">{p.total}: {chf(total)} <span className="font-normal text-slate-500">({p.off(CRYPTO.discountPct)})</span></div>}
            </div>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="or-name" className="k147">{t.name}</label>
                <input id="or-name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="or-phone" className="k147">{t.phone}</label>
                <input id="or-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="or-email" className="k147">{t.email}</label>
              <input id="or-email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="or-address" className="k147">{t.address}</label>
              <textarea id="or-address" name="address" required minLength={8} rows={2} autoComplete="street-address" className={field} />
            </div>
            <div>
              <label htmlFor="or-notes" className="k147">{t.notes}</label>
              <textarea id="or-notes" name="notes" rows={2} className={field} />
            </div>
            {withCrypto && (
              <fieldset className="space-y-2">
                <legend className="k147">{p.pay}</legend>
                <div role="radiogroup" aria-label={p.pay} className="grid grid-cols-2 gap-2">
                  {([['crypto', `${p.crypto} (${p.off(CRYPTO.discountPct)})`], ['bank', p.bank]] as const).map(([kind, text]) => (
                    <button key={kind} type="button" role="radio" aria-checked={payKind === kind} onClick={() => setPayKind(kind)} className={`k701 ${payKind === kind ? 'k702' : 'k703'}`}>
                      {text}
                    </button>
                  ))}
                </div>
                {payKind === 'crypto' ? (
                  <div className="space-y-2">
                    <div className="k700"><span>{p.coin(CRYPTO.discountPct)}</span><span className="text-slate-500">{p.deduct}: -{chf(subtotal - total)}</span></div>
                    <div role="radiogroup" aria-label={p.coin(CRYPTO.discountPct)} className="flex flex-wrap gap-2">
                      {coins.map((c) => (
                        <button key={c.id} type="button" role="radio" aria-checked={coinId === c.id} onClick={() => setCoinId(c.id)} className={`k704 ${coinId === c.id ? 'k705' : 'k703'}`}>
                          {c.symbol}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{p.cryptoNote}</p>
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed">{p.bankNote}</p>
                )}
              </fieldset>
            )}
            <label className="k148">
              <input name="consent" type="checkbox" required className="mt-0.5" />
              <span>{t.consent}</span>
            </label>
            {state === 'error' && <p className="text-red-700 font-semibold" role="alert">{message}</p>}
            <button type="submit" disabled={state === 'sending'} className="k149">
              {state === 'sending' ? t.sending : isCrypto ? p.send : t.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
