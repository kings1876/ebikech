import { Language } from '../types';
import { FAQ_ITEMS } from '../data/faq';
import { buildLocalizedUrl } from '../utils/routes';
import { ChevronDown } from 'lucide-react';

interface FaqViewProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const L = {
  title: {
    de: 'Häufige Fragen (FAQ) zu E-Bikes in der Schweiz',
    fr: 'Questions fréquentes (FAQ) sur les vélos électriques en Suisse',
    it: 'Domande frequenti (FAQ) sulle e-bike in Svizzera',
  },
  intro: {
    de: 'Kurze, verständliche Antworten zu Recht, Akku, Reichweite und Preisen.',
    fr: 'Des réponses courtes et claires sur la loi, la batterie, l’autonomie et les prix.',
    it: 'Risposte brevi e chiare su normativa, batteria, autonomia e prezzi.',
  },
  moreTitle: { de: 'Mehr erfahren', fr: 'En savoir plus', it: 'Per saperne di più' },
  blog: { de: 'Zum Blog', fr: 'Vers le blog', it: 'Vai al blog' },
  catalogue: { de: 'Zum Katalog', fr: 'Vers le catalogue', it: 'Vai al catalogo' },
};

export function FaqView({ lang, onNavigate }: FaqViewProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <header className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">FAQ</div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{L.title[lang]}</h1>
        <p className="text-base text-slate-600">{L.intro[lang]}</p>
      </header>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="group rounded-2xl border border-slate-200 bg-white open:shadow-sm">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 text-[15px] [&::-webkit-details-marker]:hidden">
              <span>{item.q[lang]}</span>
              <ChevronDown className="w-4 h-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-slate-700">{item.a[lang]}</div>
          </details>
        ))}
      </div>

      <section className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
        <h2 className="font-bold text-slate-900">{L.moreTitle[lang]}</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'blog-root' }))}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 hover:border-red-300 cursor-pointer"
          >
            {L.blog[lang]}
          </button>
          <button
            onClick={() => onNavigate(buildLocalizedUrl(lang, { lang, view: 'catalog-root' }))}
            className="px-4 py-2 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer"
          >
            {L.catalogue[lang]}
          </button>
        </div>
      </section>
    </div>
  );
}
