import { Language } from '../types';
import { LANDING_CONTENT } from '../data/collections';
import { BLOG_POSTS } from '../data/blog';
import { buildLocalizedUrl } from '../utils/routes';
import { NavLink } from './NavLink';
import { ArrowRight } from './icons';

interface LandingContentProps {
  contentKey: string;
  heading: string;
  lang: Language;
  onNavigate: (path: string) => void;
  stats: { count: number; minPrice: number; topBrands: string[] };
}

const L = {
  faq: { de: 'Häufige Fragen', fr: 'Questions fréquentes', it: 'Domande frequenti' },
  guide: { de: 'Zur Kaufberatung', fr: 'Au guide d’achat', it: 'Alla guida all’acquisto' },
};

/** Intro text, FAQ and a link to the matching buying guide, shown under the product list on landing pages. */
export function LandingContent({ contentKey, heading, lang, onNavigate, stats }: LandingContentProps) {
  const content = LANDING_CONTENT[contentKey];
  if (!content) return null;
  const fill = (s: string) =>
    s
      .replace('{n}', String(stats.count))
      .replace('{min}', Math.round(stats.minPrice).toLocaleString('de-CH'))
      .replace('{brands}', stats.topBrands.slice(0, 4).join(', '));
  const guide = BLOG_POSTS.find((p) => p.id === content.guideId);

  return (
    <section className="k123">
      <div className="k124">
        <h2 className="k125">{heading}</h2>
        {content.intro[lang].map((p, i) => (
          <p key={i}>{fill(p)}</p>
        ))}
        {guide && (
          <NavLink
            href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: guide })}
            onNavigate={onNavigate}
            className="k126"
          >
            {L.guide[lang]}: {guide.title[lang]} <ArrowRight className="w-4 h-4" />
          </NavLink>
        )}
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h2 className="k125">{L.faq[lang]}</h2>
        <dl className="space-y-4">
          {content.faq[lang].map((f) => (
            <div key={f.q}>
              <dt className="k127">{f.q}</dt>
              <dd className="k128">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
