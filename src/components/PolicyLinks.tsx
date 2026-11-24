import { Fragment } from 'react';
import { Language } from '../types';
import { POLICY_PAGES } from '../data/policies';
import { buildLocalizedUrl } from '../utils/routes';
import { NavLink } from './NavLink';

/** Inline row "Lieferung · Rückgabe · Garantie" linking the three service pages. */
export function PolicyLinks({ lang, onNavigate, className = 'hover:text-red-600 underline' }: { lang: Language; onNavigate: (path: string) => void; className?: string }) {
  return (
    <>
      {POLICY_PAGES.map((p, i) => (
        <Fragment key={p.id}>
          {i > 0 && ' · '}
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'policy', policy: p })} onNavigate={onNavigate} className={className}>
            {p.nav[lang]}
          </NavLink>
        </Fragment>
      ))}
    </>
  );
}
