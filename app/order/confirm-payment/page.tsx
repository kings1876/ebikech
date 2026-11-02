'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { REPLY } from '../../../src/config/reply';
import { SITE_NAME } from '../../../src/config/brand';
import { Language } from '../../../src/types';

const T = {
  de: { title: 'Zahlung bestätigen', intro: 'Senden Sie hier die Transaktions-ID Ihres Zahlungsbelegs. Wir prüfen den Zahlungseingang und melden uns bei Ihnen.', order: 'Bestellnummer', txid: 'Transaktions-ID', file: 'Zahlungsbeleg als Datei (optional; JPG, PNG, WebP, HEIC oder PDF, max. 4 MB)', note: 'Hinweis (optional)', send: 'Transaktions-ID senden', sending: 'Wird gesendet …', ok: 'Vielen Dank! Wir haben Ihre Transaktions-ID erhalten und prüfen den Zahlungseingang.', needTx: 'Bitte geben Sie die Transaktions-ID Ihrer Zahlung an.', tooBig: 'Die Datei ist zu gross oder hat ein nicht unterstütztes Format.', early: 'Zu dieser Bestellung wurden noch keine Zahlungsdetails gesendet.', fail: 'Das Senden hat nicht geklappt. Bitte schreiben Sie uns an ' },
  fr: { title: 'Confirmer le paiement', intro: 'Envoyez ici l’ID de transaction de votre justificatif de paiement. Nous vérifions la réception du paiement et vous contactons.', order: 'Numéro de commande', txid: 'ID de transaction', file: 'Justificatif en fichier (facultatif ; JPG, PNG, WebP, HEIC ou PDF, max. 4 Mo)', note: 'Remarque (facultatif)', send: 'Envoyer l’ID de transaction', sending: 'Envoi en cours …', ok: 'Merci ! Nous avons reçu votre ID de transaction et vérifions la réception du paiement.', needTx: 'Veuillez indiquer l’ID de transaction de votre paiement.', tooBig: 'Le fichier est trop volumineux ou son format n’est pas pris en charge.', early: 'Aucun détail de paiement n’a encore été envoyé pour cette commande.', fail: 'L’envoi a échoué. Veuillez nous écrire à ' },
  it: { title: 'Conferma del pagamento', intro: 'Inviate qui l’ID della transazione della vostra ricevuta di pagamento. Verifichiamo il ricevimento del pagamento e ci mettiamo in contatto con voi.', order: 'Numero d’ordine', txid: 'ID della transazione', file: 'Ricevuta come file (facoltativa; JPG, PNG, WebP, HEIC o PDF, max. 4 MB)', note: 'Nota (facoltativa)', send: 'Invia l’ID della transazione', sending: 'Invio in corso …', ok: 'Grazie! Abbiamo ricevuto l’ID della transazione e verifichiamo il pagamento.', needTx: 'Indicate l’ID della transazione del vostro pagamento.', tooBig: 'Il file è troppo grande o il formato non è supportato.', early: 'Per questo ordine non sono ancora stati inviati i dettagli di pagamento.', fail: 'Invio non riuscito. Scriveteci a ' },
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
            <label htmlFor="txid" className="text-sm font-semibold block mb-1">{t.txid}</label>
            <input id="txid" name="txid" type="text" required maxLength={200} autoComplete="off" spellCheck={false} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </div>
          <div>
            <label htmlFor="file" className="text-sm font-semibold block mb-1">{t.file}</label>
            <input id="file" name="file" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf" className="block w-full text-sm" />
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
