import { useState } from 'react';
import { Product, Language } from '../types';
import { I18N } from '../data/i18n';
import { X, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

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

  if (!product) return null;

  const t = I18N[lang].testRide;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-red-600 font-bold text-xs uppercase tracking-wider">
              <span>{t.badge}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {product.name} {t.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {t.desc}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t.cantonLabel}
                </label>
                <div className="relative">
                  <select
                    aria-label={t.cantonLabel}
                    value={canton}
                    onChange={(e) => setCanton(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    {SWISS_CANTONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 79 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder="name@beispiel.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{t.dateLabel}</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/30 transition-all cursor-pointer text-sm"
                >
                  {t.submitBtn}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.trustNote}</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">{t.successTitle}</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {t.successDesc.replace('{name}', name).replace('{canton}', canton).replace('{model}', product.name)}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
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
