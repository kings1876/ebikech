'use client';

import { useState } from 'react';
import { Product, Language } from '../types';
import { CheckCircle2, X } from 'lucide-react';
import { makeOrderNumber } from '../lib/order';
import { REPLY } from '../config/reply';

const T = {
  de: { badge: 'Bestellanfrage', title: 'Bestellen per Banküberweisung', intro: 'Senden Sie uns Ihre Angaben. Wir bestätigen die Verfügbarkeit und senden Ihnen die Zahlungsdetails per E-Mail – bezahlt wird erst danach.', price: 'Preisempfehlung', name: 'Name', email: 'E-Mail', phone: 'Telefon', address: 'Adresse für Lieferung oder Rechnung', notes: 'Wunsch, Rahmengrösse oder Frage (optional)', consent: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden.', send: 'Bestellanfrage senden', sending: 'Wird gesendet …', okTitle: 'Anfrage erhalten', okText: 'Wir haben Ihnen eine Bestätigung per E-Mail gesendet. Die Zahlungsdetails folgen in einer separaten E-Mail.', ref: 'Ihre Bestellnummer', close: 'Schliessen', errGeneric: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns direkt an ', errInvalid: 'Bitte prüfen Sie Ihre Angaben.' },
  fr: { badge: 'Demande de commande', title: 'Commander par virement bancaire', intro: 'Envoyez-nous vos coordonnées. Nous confirmons la disponibilité et vous envoyons les détails de paiement par e-mail – le paiement n’a lieu qu’ensuite.', price: 'Prix recommandé', name: 'Nom', email: 'E-mail', phone: 'Téléphone', address: 'Adresse de livraison ou de facturation', notes: 'Souhait, taille de cadre ou question (facultatif)', consent: 'J’accepte que mes données soient utilisées pour traiter cette demande.', send: 'Envoyer la demande', sending: 'Envoi en cours …', okTitle: 'Demande reçue', okText: 'Nous vous avons envoyé une confirmation par e-mail. Les détails de paiement suivent dans un e-mail séparé.', ref: 'Votre numéro de commande', close: 'Fermer', errGeneric: 'L’envoi a échoué. Veuillez nous écrire directement à ', errInvalid: 'Veuillez vérifier vos données.' },
  it: { badge: 'Richiesta d’ordine', title: 'Ordinare con bonifico bancario', intro: 'Inviateci i vostri dati. Confermiamo la disponibilità e vi inviamo i dettagli di pagamento per e-mail – si paga solo dopo.', price: 'Prezzo consigliato', name: 'Nome', email: 'E-mail', phone: 'Telefono', address: 'Indirizzo di consegna o fatturazione', notes: 'Desiderio, taglia del telaio o domanda (facoltativo)', consent: 'Accetto che i miei dati vengano utilizzati per elaborare questa richiesta.', send: 'Invia richiesta d’ordine', sending: 'Invio in corso …', okTitle: 'Richiesta ricevuta', okText: 'Vi abbiamo inviato una conferma per e-mail. I dettagli di pagamento seguono in una e-mail separata.', ref: 'Il vostro numero d’ordine', close: 'Chiudi', errGeneric: 'Invio non riuscito. Scriveteci direttamente a ', errInvalid: 'Controllate i vostri dati.' },
} as const;

const field = 'w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500';

export function OrderRequestModal({ product, onClose, lang }: { product: Product | null; onClose: () => void; lang: Language }) {
  const [state, setState] = useState<'form' | 'sending' | 'done' | 'error'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  if (!product) return null;
  const t = T[lang];

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
        }),
      });
      if (r.ok) {
        setOrderNumber(number);
        setState('done');
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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-label={t.title}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-auto">
        <button onClick={onClose} aria-label={t.close} className="absolute top-3 right-3 p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        {state === 'done' ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{t.okTitle}</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">{t.okText}</p>
            <p className="text-xs text-slate-500">{t.ref}: <span className="font-mono font-bold text-slate-900">{orderNumber}</span></p>
            <button onClick={onClose} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer">{t.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3 text-xs">
            <div className="text-red-700 font-bold text-xs uppercase tracking-wider">{t.badge}</div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.title}</h3>
            <p className="text-slate-600 leading-relaxed">{t.intro}</p>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="font-bold text-slate-900 text-sm">{product.name}</div>
              <div className="text-slate-600">{t.price}: {product.priceEstimated ? (lang === 'fr' ? 'env. ' : 'ca. ') : ''}CHF {Math.round(product.priceCHF).toLocaleString('de-CH')}</div>
            </div>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="or-name" className="font-bold text-slate-700 block mb-1">{t.name}</label>
                <input id="or-name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="or-phone" className="font-bold text-slate-700 block mb-1">{t.phone}</label>
                <input id="or-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="or-email" className="font-bold text-slate-700 block mb-1">{t.email}</label>
              <input id="or-email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="or-address" className="font-bold text-slate-700 block mb-1">{t.address}</label>
              <textarea id="or-address" name="address" required minLength={8} rows={2} autoComplete="street-address" className={field} />
            </div>
            <div>
              <label htmlFor="or-notes" className="font-bold text-slate-700 block mb-1">{t.notes}</label>
              <textarea id="or-notes" name="notes" rows={2} className={field} />
            </div>
            <label className="flex items-start gap-2 text-slate-600 leading-snug">
              <input name="consent" type="checkbox" required className="mt-0.5" />
              <span>{t.consent}</span>
            </label>
            {state === 'error' && <p className="text-red-700 font-semibold" role="alert">{message}</p>}
            <button type="submit" disabled={state === 'sending'} className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-red-600/30 cursor-pointer text-sm">
              {state === 'sending' ? t.sending : t.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
