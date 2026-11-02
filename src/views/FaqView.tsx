import { Language } from '../types';
import { FAQ_ITEMS } from '../data/faq';
import { buildLocalizedUrl } from '../utils/routes';
import { ChevronDown } from '../components/icons';
import { NavLink } from '../components/NavLink';

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
    <div className="k248">
      <header className="k274">
        <div className="k275">FAQ</div>
        <h1 className="k251">{L.title[lang]}</h1>
        <p className="text-base text-slate-600">{L.intro[lang]}</p>
      </header>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="k402 group">
            <summary className="k403">
              <span>{item.q[lang]}</span>
              <ChevronDown className="k404" />
            </summary>
            <div className="k405">{item.a[lang]}</div>
          </details>
        ))}
      </div>

      <section className="k406">
        <h2 className="font-bold text-slate-900">{L.moreTitle[lang]}</h2>
        <div className="flex flex-wrap gap-3">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-root' })} onNavigate={onNavigate}
            
            className="k407"
          >
            {L.blog[lang]}
          </NavLink>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="k408"
          >
            {L.catalogue[lang]}
          </NavLink>
        </div>
      </section>
    </div>
  );
}
