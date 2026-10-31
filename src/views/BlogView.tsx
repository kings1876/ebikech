import { Language } from '../types';
import { BLOG_POSTS } from '../data/blog';
import { ParsedRoute, buildLocalizedUrl } from '../utils/routes';
import { ArrowRight, Clock } from 'lucide-react';
import { NavLink } from '../components/NavLink';

interface BlogViewProps {
  route: ParsedRoute;
  lang: Language;
  onNavigate: (path: string) => void;
}

const L = {
  blog: { de: 'Blog', fr: 'Blog', it: 'Blog' },
  home: { de: 'Startseite', fr: 'Accueil', it: 'Home' },
  heroTitle: {
    de: 'E-Bike Blog: Wissen für Ihre Kaufentscheidung',
    fr: 'Blog e-bike : le savoir pour bien choisir',
    it: 'Blog e-bike: la conoscenza per scegliere bene',
  },
  heroText: {
    de: 'Verständliche Artikel zu Recht, Akku, Antrieb und Pflege von Elektrovelos in der Schweiz.',
    fr: 'Des articles clairs sur la loi, la batterie, la motorisation et l’entretien des vélos électriques en Suisse.',
    it: 'Articoli chiari su normativa, batteria, motore e manutenzione delle biciclette elettriche in Svizzera.',
  },
  read: { de: 'Artikel lesen', fr: 'Lire l’article', it: 'Leggi l’articolo' },
  min: { de: 'Min. Lesezeit', fr: 'min de lecture', it: 'min di lettura' },
  more: { de: 'Weitere Artikel', fr: 'Autres articles', it: 'Altri articoli' },
  cta: { de: 'E-Bikes entdecken', fr: 'Découvrir les e-bikes', it: 'Scopri le e-bike' },
  ctaText: {
    de: 'Passende Modelle finden Sie in unserem Katalog.',
    fr: 'Trouvez des modèles adaptés dans notre catalogue.',
    it: 'Trovate i modelli adatti nel nostro catalogo.',
  },
};

const fmtDate = (iso: string, lang: Language) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString(lang === 'fr' ? 'fr-CH' : lang === 'it' ? 'it-CH' : 'de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export function BlogView({ route, lang, onNavigate }: BlogViewProps) {
  const blogRoot = { lang, view: 'blog-root' as const };

  if (route.view === 'blog-post' && route.blogPost) {
    const post = route.blogPost;
    const others = BLOG_POSTS.filter((p) => p.id !== post.id);
    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}  className="hover:text-red-600 cursor-pointer">{L.home[lang]}</NavLink>
          <span>/</span>
          <NavLink href={buildLocalizedUrl(lang, blogRoot)} onNavigate={onNavigate}  className="hover:text-red-600 cursor-pointer">{L.blog[lang]}</NavLink>
        </nav>

        <header className="space-y-3 border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{post.title[lang]}</h1>
          <p className="text-base text-slate-600 leading-relaxed">{post.excerpt[lang]}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <time dateTime={post.publishedDate}>{fmtDate(post.publishedDate, lang)}</time>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readMinutes} {L.min[lang]}</span>
          </div>
        </header>

        <div className="space-y-7 text-[15px] leading-relaxed text-slate-700">
          {post.body[lang].map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <aside className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-slate-700">{L.ctaText[lang]}</p>
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
            
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 cursor-pointer"
          >
            {L.cta[lang]} <ArrowRight className="w-4 h-4" />
          </NavLink>
        </aside>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">{L.more[lang]}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {others.map((p) => (
              <li key={p.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: p })} onNavigate={onNavigate}
                  
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/30 transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-slate-900 text-sm">{p.title[lang]}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-2">{p.excerpt[lang]}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <header className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-red-600 font-bold text-xs uppercase tracking-wider">{L.blog[lang]}</div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{L.heroTitle[lang]}</h1>
        <p className="text-base text-slate-600 max-w-2xl">{L.heroText[lang]}</p>
      </header>

      <ul className="grid md:grid-cols-2 gap-5">
        {BLOG_POSTS.map((p) => (
          <li key={p.id}>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: p })} onNavigate={onNavigate}
              
              className="group h-full w-full text-left rounded-2xl border border-slate-200 bg-white p-6 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <time dateTime={p.publishedDate}>{fmtDate(p.publishedDate, lang)}</time>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.readMinutes} {L.min[lang]}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">{p.title[lang]}</h2>
              <p className="text-sm text-slate-600 mt-2 flex-1">{p.excerpt[lang]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                {L.read[lang]} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
