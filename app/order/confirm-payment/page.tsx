'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { REPLY } from '../../../src/config/reply';
import { SITE_NAME } from '../../../src/config/brand';
import { Language } from '../../../src/types';

const T = {
  de: { title: 'Zahlung bestätigen', intro: 'Laden Sie hier einen Screenshot oder ein Foto Ihres Zahlungsbelegs hoch. Wir prüfen den Zahlungseingang und melden uns bei Ihnen.', order: 'Bestellnummer', file: 'Zahlungsbeleg (JPG, PNG, WebP, HEIC oder PDF, max. 4 MB)', note: 'Hinweis (optional)', send: 'Beleg senden', sending: 'Wird gesendet …', ok: 'Vielen Dank! Wir haben Ihren Beleg erhalten und prüfen den Zahlungseingang.', tooBig: 'Die Datei ist zu gross oder hat ein nicht unterstütztes Format.', early: 'Zu dieser Bestellung wurden noch keine Zahlungsdetails gesendet.', fail: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns an ' },
  fr: { title: 'Confirmer le paiement', intro: 'Téléchargez ici une capture d’écran ou une photo de votre justificatif de paiement. Nous vérifions la réception du paiement et vous contactons.', order: 'Numéro de commande', file: 'Justificatif (JPG, PNG, WebP, HEIC ou PDF, max. 4 Mo)', note: 'Remarque (facultatif)', send: 'Envoyer le justificatif', sending: 'Envoi en cours …', ok: 'Merci ! Nous avons reçu votre justificatif et vérifions la réception du paiement.', tooBig: 'Le fichier est trop volumineux ou son format n’est pas pris en charge.', early: 'Aucun détail de paiement n’a encore été envoyé pour cette commande.', fail: 'L’envoi a échoué. Veuillez nous écrire à ' },
  it: { title: 'Conferma del pagamento', intro: 'Carica qui uno screenshot o una foto della ricevuta di pagamento. Verifichiamo il ricevimento del pagamento e ci mettiamo in contatto con voi.', order: 'Numero d’ordine', file: 'Ricevuta (JPG, PNG, WebP, HEIC o PDF, max. 4 MB)', note: 'Nota (facoltativa)', send: 'Invia la ricevuta', sending: 'Invio in corso …', ok: 'Grazie! Abbiamo ricevuto la ricevuta e verifichiamo il pagamento.', tooBig: 'Il file è troppo grande o il formato non è supportato.', early: 'Per questo ordine non sono ancora stati inviati i dettagli di pagamento.', fail: 'Invio non riuscito. Scriveteci a ' },
} as const;

function View() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const q = params.get('lang');
  const lang: Language = q === 'fr' || q === 'it' ? q : 'de';
  const t = T[lang];
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const fd = new FormData(e.currentTarget);
    fd.set('id', id);
    try {
      const r = await fetch('/api/order/confirm-payment/', { method: 'POST', body: fd });
      if (r.ok) setState('ok');
      else {
        setState('error');
        setMessage(r.status === 409 ? t.early : r.status === 400 ? t.tooBig : t.fail + REPLY.channels.email);
      }
    } catch {
      setState('error');
      setMessage(t.fail + REPLY.channels.email);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: REPLY.brand.primary }}>{SITE_NAME[lang]}</div>
      <h1 className="text-3xl font-black tracking-tight">{t.title}</h1>
      {state === 'ok' ? (
        <p className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-sm text-emerald-900" role="status">{t.ok}</p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <p className="text-sm text-slate-700">{t.intro}</p>
          <p className="text-xs text-slate-500">{t.order}: <span className="font-mono font-bold text-slate-900">{id}</span></p>
          <div>
            <label htmlFor="file" className="text-sm font-semibold block mb-1">{t.file}</label>
            <input id="file" name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf" className="block w-full text-sm" />
          </div>
          <div>
            <label htmlFor="note" className="text-sm font-semibold block mb-1">{t.note}</label>
            <textarea id="note" name="note" rows={3} maxLength={500} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          {state === 'error' && <p className="text-sm text-red-700" role="alert">{message}</p>}
          <button type="submit" disabled={state === 'sending'} className="rounded-full px-6 py-3 text-sm font-bold text-white min-h-11 disabled:opacity-50 cursor-pointer" style={{ background: REPLY.brand.headerDark }}>
            {state === 'sending' ? t.sending : t.send}
          </button>
        </form>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <View />
    </Suspense>
  );
}
