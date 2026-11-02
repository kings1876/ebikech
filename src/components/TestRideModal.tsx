import { useState } from 'react';
import { Product, Language } from '../types';
import { I18N } from '../data/i18n';
import { X, MapPin, CheckCircle2, ShieldCheck } from './icons';
import { REPLY } from '../config/reply';

interface TestRideModalProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
}

const SWISS_CANTONS = [
  'Zürich (ZH)',
  'Bern (BE)',
  'Luzern (LU)',
  'Basel-Stadt (BS)',
  'St. Gallen (SG)',
  'Aargau (AG)',
  'Vaud / Waadt (VD)',
  'Genève (GE)',
  'Ticino (TI)',
  'Zug (ZG)',
  'Graubünden (GR)',
  'Valais / Wallis (VS)',
];

export function TestRideModal({ product, onClose, lang }: TestRideModalProps) {
  const [canton, setCanton] = useState(SWISS_CANTONS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-05');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);

  if (!product) return null;

  const t = I18N[lang].testRide;

  const failText = (): string =>
    lang === 'fr' ? 'L’envoi a échoué. Écrivez-nous à ' + REPLY.channels.email
    : lang === 'it' ? 'Invio non riuscito. Scriveteci a ' + REPLY.channels.email
    : 'Senden fehlgeschlagen. Bitte schreiben Sie uns an ' + REPLY.channels.email;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          formName: 'testride',
          lang,
          name,
          email,
          phone,
          consent,
          product: product.name,
          canton,
          preferredDate,
          website: new FormData(e.currentTarget).get('website'),
          message: 'Anfrage zu ' + product.name + ' (' + canton + '). Wunschtermin: ' + preferredDate + '. Telefon: ' + phone + '.',
        }),
      });
      if (r.ok) setSubmitted(true);
      else setError(failText());
    } catch {
      setError(failText());
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="k219">
      <div className="k220 animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="k221"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="k222">
              <span>{t.badge}</span>
            </div>
            <h3 className="k144">
              {product.name} {t.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t.desc}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
              <div>
                <label className="k147">
                  {t.cantonLabel}
                </label>
                <div className="relative">
                  <select
                    aria-label={t.cantonLabel}
                    value={canton}
                    onChange={(e) => setCanton(e.target.value)}
                    className="k223"
                  >
                    {SWISS_CANTONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <MapPin className="k224" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="k147">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="k225"
                  />
                </div>
                <div>
                  <label className="k147">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 79 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="k225"
                  />
                </div>
              </div>

              <div>
                <label className="k147">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder="name@beispiel.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="k225"
                />
              </div>

              <div>
                <label className="k147">{t.dateLabel}</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="k225"
                />
              </div>

              <div className="pt-2">
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <label className="k226">
                  <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
                  <span>{lang === 'fr' ? 'J’accepte que mes données soient utilisées pour traiter cette demande.' : lang === 'it' ? 'Accetto che i miei dati vengano utilizzati per elaborare questa richiesta.' : 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung dieser Anfrage verwendet werden.'}</span>
                </label>
                {error && <p className="k227" role="alert">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="k228"
                >
                  {t.submitBtn}
                </button>
              </div>

              <div className="k229">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.trustNote}</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="k139">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="k125">{t.successTitle}</h3>
            <p className="k140">
              {t.successDesc.replace('{name}', name).replace('{canton}', canton).replace('{model}', product.name)}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="k230"
              >
                {t.doneBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
