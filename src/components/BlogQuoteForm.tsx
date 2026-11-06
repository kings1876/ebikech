import { useState } from 'react';
import { Language } from '../types';
import { REPLY } from '../config/reply';
import { CheckCircle2, ShieldCheck } from './icons';

const T = {
  de: {
    title: 'Gratis Offerte anfordern',
    intro: 'Kostenlos und unverbindlich: Nennen Sie uns Ihr Wunschmodell, Ihre Körpergrösse oder Ihren Einsatz. Wir prüfen die Verfügbarkeit und melden uns bei Ihnen.',
    name: 'Name', email: 'E-Mail', phone: 'Telefon (optional)',
    message: 'Wunschmodell, Rahmengrösse oder Frage (optional)',
    consent: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden.',
    send: 'Offerte anfordern', sending: 'Wird gesendet …',
    okTitle: 'Anfrage erhalten', okText: 'Vielen Dank, {name}. Wir prüfen die Verfügbarkeit und melden uns bei Ihnen.',
    fail: 'Senden fehlgeschlagen. Bitte schreiben Sie uns an ', trust: 'Neue E-Bikes aus eigenem Lager. Ihre Angaben werden nur für diese Anfrage verwendet.',
    subject: 'Gratis-Offerte', body: 'Offerte-Anfrage (Blog: {post}).',
  },
  fr: {
    title: 'Demander une offre gratuite',
    intro: 'Gratuit et sans engagement : indiquez-nous le modèle souhaité, votre taille ou votre usage. Nous vérifions la disponibilité et vous répondons.',
    name: 'Nom', email: 'E-mail', phone: 'Téléphone (facultatif)',
    message: 'Modèle souhaité, taille de cadre ou question (facultatif)',
    consent: 'J’accepte que mes données soient utilisées pour traiter cette demande.',
    send: 'Demander l’offre', sending: 'Envoi …',
    okTitle: 'Demande reçue', okText: 'Merci, {name}. Nous vérifions la disponibilité et vous répondons.',
    fail: 'L’envoi a échoué. Écrivez-nous à ', trust: 'Vélos électriques neufs de notre propre stock. Vos données ne servent qu’à cette demande.',
    subject: 'Offre gratuite', body: 'Demande d’offre (blog : {post}).',
  },
  it: {
    title: 'Richiedere un’offerta gratuita',
    intro: 'Gratuita e senza impegno: indicateci il modello desiderato, la vostra altezza o l’uso previsto. Verifichiamo la disponibilità e vi rispondiamo.',
    name: 'Nome', email: 'E-mail', phone: 'Telefono (facoltativo)',
    message: 'Modello desiderato, taglia del telaio o domanda (facoltativo)',
    consent: 'Accetto che i miei dati vengano utilizzati per elaborare questa richiesta.',
    send: 'Richiedi l’offerta', sending: 'Invio …',
    okTitle: 'Richiesta ricevuta', okText: 'Grazie, {name}. Verifichiamo la disponibilità e vi rispondiamo.',
    fail: 'Invio non riuscito. Scriveteci a ', trust: 'E-bike nuove dal nostro magazzino. I vostri dati servono solo per questa richiesta.',
    subject: 'Offerta gratuita', body: 'Richiesta di offerta (blog: {post}).',
  },
} as const;

/** Free-quote form shown at the end of a blog post. Sends an enquiry through the shared contact endpoint. */
export function BlogQuoteForm({ lang, postTitle }: { lang: Language; postTitle: string }) {
  const t = T[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formName: 'contact',
          lang,
          name,
          email,
          phone,
          consent,
          subject: `${t.subject}: ${postTitle}`,
          website: new FormData(e.currentTarget).get('website'),
          message: [t.body.replace('{post}', postTitle), message.trim(), phone ? `Tel: ${phone}` : ''].filter(Boolean).join(' '),
        }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <section id="offerte" className="k757" aria-labelledby="offerte-title">
      {state === 'done' ? (
        <div className="py-4 text-center space-y-3">
          <div className="k139"><CheckCircle2 className="w-8 h-8" /></div>
          <h2 id="offerte-title" className="k256">{t.okTitle}</h2>
          <p className="k140">{t.okText.replace('{name}', name)}</p>
        </div>
      ) : (
        <>
          <div className="space-y-1.5">
            <h2 id="offerte-title" className="k256">{t.title}</h2>
            <p className="text-sm text-slate-700">{t.intro}</p>
          </div>
          <form onSubmit={submit} className="space-y-3.5 text-xs">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="bq-name" className="k147">{t.name}</label>
                <input id="bq-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="k225" />
              </div>
              <div>
                <label htmlFor="bq-email" className="k147">{t.email}</label>
                <input id="bq-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="k225" />
              </div>
            </div>
            <div>
              <label htmlFor="bq-phone" className="k147">{t.phone}</label>
              <input id="bq-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="k225" />
            </div>
            <div>
              <label htmlFor="bq-message" className="k147">{t.message}</label>
              <textarea id="bq-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="k225" />
            </div>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <label className="k226">
              <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
              <span>{t.consent}</span>
            </label>
            {state === 'error' && <p className="k227" role="alert">{t.fail}{REPLY.channels.email}</p>}
            <button type="submit" disabled={state === 'sending'} className="k228">{state === 'sending' ? t.sending : t.send}</button>
            <div className="k758">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.trust}</span>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
