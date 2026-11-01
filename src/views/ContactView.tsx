import { FormEvent, useState } from 'react';
import { Language } from '../types';
import { CONTACT, hasContactDetails } from '../config/contact';
import { buildLocalizedUrl } from '../utils/routes';
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { NavLink } from '../components/NavLink';

interface ContactViewProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const L = {
  title: { de: 'Kontakt', fr: 'Contact', it: 'Contatti' },
  heading: {
    de: 'Wir helfen Ihnen gerne weiter',
    fr: 'Nous sommes là pour vous aider',
    it: 'Siamo a vostra disposizione',
  },
  intro: {
    de: 'Fragen zu einem Modell, zur Grösse oder zum Preis? Schreiben Sie uns, wir melden uns so rasch wie möglich.',
    fr: 'Une question sur un modèle, une taille ou un prix ? Écrivez-nous, nous vous répondons dès que possible.',
    it: 'Domande su un modello, una taglia o un prezzo? Scriveteci, vi rispondiamo il prima possibile.',
  },
  tipsTitle: { de: 'Damit wir schneller antworten können', fr: 'Pour une réponse plus rapide', it: 'Per rispondere più in fretta' },
  tips: {
    de: 'Nennen Sie uns das gewünschte Modell, Ihre Körpergrösse und, wenn möglich, Ihr Budget in CHF. Alle E-Bikes in unserem Katalog sind neu und stammen aus eigenem Lager, bezahlt wird per Banküberweisung. Unsere Antwort erhalten Sie per E-Mail an die angegebene Adresse.',
    fr: 'Indiquez-nous le modèle souhaité, votre taille et, si possible, votre budget en CHF. Tous les vélos électriques de notre catalogue sont neufs et proviennent de notre propre stock ; le paiement se fait par virement bancaire. Notre réponse vous parvient par e-mail, à l’adresse indiquée.',
    it: 'Indicateci il modello desiderato, la vostra altezza e, se possibile, il budget in CHF. Tutte le e-bike del nostro catalogo sono nuove e provengono dal nostro magazzino; il pagamento avviene tramite bonifico bancario. Riceverete la risposta via e-mail all’indirizzo indicato.',
  },
  address: { de: 'Adresse', fr: 'Adresse', it: 'Indirizzo' },
  hours: { de: 'Öffnungszeiten', fr: 'Heures d’ouverture', it: 'Orari di apertura' },
  email: { de: 'E-Mail', fr: 'E-mail', it: 'E-mail' },
  phone: { de: 'Telefon', fr: 'Téléphone', it: 'Telefono' },
  whatsapp: { de: 'WhatsApp schreiben', fr: 'Écrire sur WhatsApp', it: 'Scrivi su WhatsApp' },
  formTitle: { de: 'Nachricht senden', fr: 'Envoyer un message', it: 'Invia un messaggio' },
  name: { de: 'Name', fr: 'Nom', it: 'Nome' },
  emailField: { de: 'E-Mail-Adresse', fr: 'Adresse e-mail', it: 'Indirizzo e-mail' },
  phoneField: { de: 'Telefon (optional)', fr: 'Téléphone (facultatif)', it: 'Telefono (facoltativo)' },
  subject: { de: 'Betreff', fr: 'Sujet', it: 'Oggetto' },
  message: { de: 'Ihre Nachricht', fr: 'Votre message', it: 'Il vostro messaggio' },
  subjects: {
    de: ['Frage zu einem Modell', 'Preis und Verfügbarkeit', 'Grösse und Beratung', 'Sonstiges'],
    fr: ['Question sur un modèle', 'Prix et disponibilité', 'Taille et conseil', 'Autre'],
    it: ['Domanda su un modello', 'Prezzo e disponibilità', 'Taglia e consulenza', 'Altro'],
  },
  consent: {
    de: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und verwendet werden.',
    fr: 'J’accepte que mes données soient enregistrées et utilisées pour traiter ma demande.',
    it: 'Accetto che i miei dati vengano salvati e utilizzati per elaborare la richiesta.',
  },
  privacy: { de: 'Datenschutz', fr: 'Protection des données', it: 'Protezione dei dati' },
  send: { de: 'Nachricht senden', fr: 'Envoyer', it: 'Invia' },
  sending: { de: 'Wird gesendet…', fr: 'Envoi…', it: 'Invio…' },
  ok: {
    de: 'Vielen Dank! Ihre Nachricht wurde gesendet. Wir melden uns bald bei Ihnen.',
    fr: 'Merci ! Votre message a été envoyé. Nous vous répondrons bientôt.',
    it: 'Grazie! Il vostro messaggio è stato inviato. Vi risponderemo presto.',
  },
  err: {
    de: 'Das Senden hat leider nicht geklappt. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.',
    fr: 'L’envoi a échoué. Veuillez réessayer plus tard ou nous contacter directement.',
    it: 'L’invio non è riuscito. Riprovate più tardi o contattateci direttamente.',
  },
  invalid: {
    de: 'Bitte prüfen Sie Ihre Angaben (Name, E-Mail, Nachricht mit mindestens 10 Zeichen, Einwilligung).',
    fr: 'Veuillez vérifier vos informations (nom, e-mail, message d’au moins 10 caractères, consentement).',
    it: 'Controllate i dati (nome, e-mail, messaggio di almeno 10 caratteri, consenso).',
  },
};

export function ContactView({ lang, onNavigate }: ContactViewProps) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error' | 'invalid'>('idle');
  const a = CONTACT.address;
  const addressLine = [a.street, [a.zip, a.city].filter(Boolean).join(' '), a.country].filter(Boolean).join(', ');
  const hours = CONTACT.hours[lang];

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState('sending');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          phone: f.get('phone'),
          subject: f.get('subject'),
          message: f.get('message'),
          website: f.get('website'),
          consent: f.get('consent') === 'on',
          lang,
        }),
      });
      if (res.ok) {
        setState('ok');
        e.currentTarget.reset();
      } else {
        setState(res.status === 400 ? 'invalid' : 'error');
      }
    } catch {
      setState('error');
    }
  }

  const input =
    'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-base focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-300';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <header className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">{L.title[lang]}</div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{L.heading[lang]}</h1>
        <p className="text-base text-slate-600 max-w-2xl">{L.intro[lang]}</p>
      </header>

      <div className={`grid gap-8 ${CONTACT.formEnabled ? 'lg:grid-cols-5' : ''}`}>
        {hasContactDetails() && (
          <aside className={`space-y-4 ${CONTACT.formEnabled ? 'lg:col-span-2' : 'max-w-xl'}`}>
            {CONTACT.businessName && <div className="text-lg font-bold text-slate-900">{CONTACT.businessName}</div>}
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:border-red-300 transition-colors">
                <Mail className="w-5 h-5 text-red-600 mt-0.5" />
                <div><div className="text-xs text-slate-500">{L.email[lang]}</div><div className="font-semibold text-slate-900 break-all">{CONTACT.email}</div></div>
              </a>
            )}
            {CONTACT.phone && (
              <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:border-red-300 transition-colors">
                <Phone className="w-5 h-5 text-red-600 mt-0.5" />
                <div><div className="text-xs text-slate-500">{L.phone[lang]}</div><div className="font-semibold text-slate-900">{CONTACT.phone}</div></div>
              </a>
            )}
            {CONTACT.whatsapp && (
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <MessageCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div className="font-semibold text-slate-900">{L.whatsapp[lang]}</div>
              </a>
            )}
            {addressLine && (
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div><div className="text-xs text-slate-500">{L.address[lang]}</div><div className="font-semibold text-slate-900">{addressLine}</div></div>
              </div>
            )}
            {hours && (
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-white">
                <Clock className="w-5 h-5 text-red-600 mt-0.5" />
                <div><div className="text-xs text-slate-500">{L.hours[lang]}</div><div className="font-semibold text-slate-900">{hours}</div></div>
              </div>
            )}
          </aside>
        )}

        {CONTACT.formEnabled && (
          <form onSubmit={submit} className="lg:col-span-3 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4" noValidate>
            <h2 className="text-xl font-bold text-slate-900">{L.formTitle[lang]}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="space-y-1.5 text-sm font-semibold text-slate-700">
                {L.name[lang]}
                <input name="name" required autoComplete="name" className={input} />
              </label>
              <label className="space-y-1.5 text-sm font-semibold text-slate-700">
                {L.emailField[lang]}
                <input name="email" type="email" required autoComplete="email" className={input} />
              </label>
              <label className="space-y-1.5 text-sm font-semibold text-slate-700">
                {L.phoneField[lang]}
                <input name="phone" type="tel" autoComplete="tel" className={input} />
              </label>
              <label className="space-y-1.5 text-sm font-semibold text-slate-700">
                {L.subject[lang]}
                <select name="subject" className={input}>
                  {L.subjects[lang].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block space-y-1.5 text-sm font-semibold text-slate-700">
              {L.message[lang]}
              <textarea name="message" required minLength={10} rows={6} className={input} />
            </label>

            {/* Honeypot: hidden from people, visible to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-red-600" />
              <span>
                {L.consent[lang]}{' '}
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'legal' })} onNavigate={onNavigate}  className="underline text-red-700 cursor-pointer">
                  {L.privacy[lang]}
                </NavLink>
              </span>
            </label>

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-60 cursor-pointer"
            >
              {state === 'sending' ? L.sending[lang] : L.send[lang]}
            </button>

            <div aria-live="polite" className="text-sm">
              {state === 'ok' && (
                <p className="flex items-start gap-2 text-emerald-700"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />{L.ok[lang]}</p>
              )}
              {state === 'invalid' && (
                <p className="flex items-start gap-2 text-amber-700"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{L.invalid[lang]}</p>
              )}
              {state === 'error' && (
                <p className="flex items-start gap-2 text-red-700"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{L.err[lang]}</p>
              )}
            </div>
          </form>
        )}
      </div>

      <section className="max-w-3xl space-y-2 border-t border-slate-200 pt-6">
        <h2 className="text-lg font-bold text-slate-900">{L.tipsTitle[lang]}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{L.tips[lang]}</p>
      </section>
    </div>
  );
}
