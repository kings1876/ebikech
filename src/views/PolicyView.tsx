import { Fragment, ReactNode } from 'react';
import { Language } from '../types';
import { PolicyPage, POLICY_BY_ID, POLICY_PAGES, PolicyId } from '../data/policies';
import { buildLocalizedUrl } from '../utils/routes';
import { NavLink } from '../components/NavLink';
import { ArrowRight } from '../components/icons';
import { CONTACT } from '../config/contact';

interface PolicyViewProps {
  policy: PolicyPage;
  lang: Language;
  onNavigate: (path: string) => void;
}

const L = {
  home: { de: 'Startseite', fr: 'Accueil', it: 'Home' },
  faq: { de: 'Häufige Fragen', fr: 'Questions fréquentes', it: 'Domande frequenti' },
  ask: { de: 'Gratis Offerte anfordern', fr: 'Demander une offre gratuite', it: 'Richiedere un’offerta gratuita' },
  all: { de: 'Alle E-Bikes ansehen', fr: 'Voir tous les vélos électriques', it: 'Vedi tutte le e-bike' },
  more: { de: 'Weitere Informationen', fr: 'Autres informations', it: 'Altre informazioni' },
  faqPage: { de: 'FAQ zu E-Bikes', fr: 'FAQ vélos électriques', it: 'FAQ e-bike' },
  contact: { de: 'Kontakt', fr: 'Contact', it: 'Contatti' },
  note: {
    de: 'Es gelten die jeweils aktuellen gesetzlichen Bestimmungen. Bei Fragen zu Ihrem Fall schreiben Sie uns.',
    fr: 'Le droit en vigueur s’applique. Pour toute question sur votre cas, écrivez-nous.',
    it: 'Si applica il diritto vigente. Per domande sul vostro caso scriveteci.',
  },
};

/** Text with {{id|label}} tokens becomes text with links to the other service pages. */
function rich(text: string, lang: Language, onNavigate: (path: string) => void): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\{\{(\w+)(?:\|([^}]+))?\}\}/g)) {
    out.push(text.slice(last, m.index));
    const target = POLICY_BY_ID[m[1] as PolicyId];
    if (m[1] === 'contact') {
      const a = CONTACT.address;
      out.push([CONTACT.businessName, a.street, [a.zip, a.city].filter(Boolean).join(' '), a.country, CONTACT.email && `E-Mail: ${CONTACT.email}`].filter(Boolean).join(', '));
      last = (m.index ?? 0) + m[0].length;
      continue;
    }
    out.push(
      target ? (
        <NavLink key={m.index} href={buildLocalizedUrl(lang, { lang, view: 'policy', policy: target })} onNavigate={onNavigate} className="text-red-600 underline">
          {m[2]}
        </NavLink>
      ) : (
        m[2]
      ),
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export function PolicyView({ policy, lang, onNavigate }: PolicyViewProps) {
  const others = POLICY_PAGES.filter((p) => p.id !== policy.id);
  return (
    <article className="k248">
      <nav aria-label="Breadcrumb" className="k249">
        <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate} className="hover:text-red-600 cursor-pointer">{L.home[lang]}</NavLink>
        <span>/</span>
        <span>{policy.nav[lang]}</span>
      </nav>

      <header className="k250">
        <h1 className="k251">{policy.title[lang]}</h1>
        <p className="k252">{policy.excerpt[lang]}</p>
        {!policy.plain && <div className="flex flex-wrap gap-2 pt-2">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate} className="k267">
            {L.ask[lang]} <ArrowRight className="w-4 h-4" />
          </NavLink>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate} className="k268">
            {L.all[lang]}
          </NavLink>
        </div>}
      </header>

      <div className="k255">
        {policy.sections[lang].map((s) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="k256">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>
                {rich(p, lang, onNavigate).map((n, j) => (
                  <Fragment key={j}>{n}</Fragment>
                ))}
              </p>
            ))}
            {s.bullets && (
              <ul className="list-disc space-y-1.5 pl-5">
                {s.bullets.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            {s.steps && (
              <ol className="list-decimal space-y-1.5 pl-5">
                {s.steps.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            )}
          </section>
        ))}
      </div>

      {policy.faq && <section className="space-y-4">
        <h2 className="k256">{L.faq[lang]}</h2>
        <dl className="space-y-4">
          {policy.faq[lang].map((f) => (
            <div key={f.q}>
              <dt className="font-bold text-slate-900">{f.q}</dt>
              <dd className="k756">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>}

      <section className="space-y-3" aria-label={L.more[lang]}>
        <h2 className="k256">{L.more[lang]}</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((p) => (
            <li key={p.id}>
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'policy', policy: p })} onNavigate={onNavigate} className="k265">
                {p.nav[lang]}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'faq' })} onNavigate={onNavigate} className="k265">
              {L.faqPage[lang]}
            </NavLink>
          </li>
          <li>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate} className="k265">
              {L.contact[lang]}
            </NavLink>
          </li>
        </ul>
        <p className="text-sm text-slate-600">{L.note[lang]}</p>
      </section>
    </article>
  );
}
