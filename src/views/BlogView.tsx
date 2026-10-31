import { Language, Product } from '../types';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { ALL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { CardImage } from '../components/ProductImages';
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
    de: 'E-Bike Kaufberatung: Ratgeber für Ihre Kaufentscheidung',
    fr: 'Guides d’achat e-bike : bien choisir son vélo électrique',
    it: 'Guide all’acquisto e-bike: scegliere la bici giusta',
  },
  heroText: {
    de: 'Worauf es beim Kauf eines E-Bikes ankommt – mit passenden Modellen und Preisen in CHF.',
    fr: 'Les points clés pour acheter un vélo électrique – avec des modèles adaptés et des prix en CHF.',
    it: 'Cosa conta nell’acquisto di una e-bike – con modelli adatti e prezzi in CHF.',
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

const LP = {
  models: { de: 'Passende Modelle', fr: 'Modèles adaptés', it: 'Modelli adatti' },
  from: { de: 'ab', fr: 'dès', it: 'da' },
  approx: { de: 'ca.', fr: 'env.', it: 'ca.' },
  all: { de: 'Alle Modelle ansehen', fr: 'Voir tous les modèles', it: 'Vedi tutti i modelli' },
  advice: { de: 'Beratung anfragen', fr: 'Demander conseil', it: 'Richiedi consulenza' },
};

/** Up to 4 real catalogue products matching a post, spread across the price range (best-photographed first). */
function relatedProducts(post: BlogPost): Product[] {
  const r = post.related;
  if (!r) return [];
  const pool = ALL_PRODUCTS.filter(
    (p) =>
      (!r.categoryId || p.categoryId === r.categoryId) &&
      (!r.brandId || p.brandId === r.brandId) &&
      (!r.speedClass || p.speedClass === r.speedClass) &&
      (!r.frameType || p.frameType === r.frameType) &&
      (p.images?.length || 0) > 0,
  ).sort((a, b) => a.priceCHF - b.priceCHF);
  if (pool.length <= 4) return pool;
  const picks = [0.1, 0.4, 0.7, 0.95].map((q) => pool[Math.min(pool.length - 1, Math.floor(q * pool.length))]);
  return [...new Set(picks)];
}

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
    const relatedList = relatedProducts(post);
    const ctaCategory = CATEGORIES.find((c) => c.id === (post.related?.categoryId || post.related?.ctaCategoryId));
    const ctaHref = ctaCategory
      ? buildLocalizedUrl(lang, { lang, view: 'category', category: ctaCategory })
      : buildLocalizedUrl(lang, { lang, view: 'catalog-root' });
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

        {relatedList.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">{LP.models[lang]}</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedList.map((p) => {
                const cat = CATEGORIES.find((c) => c.id === p.categoryId);
                return (
                  <li key={p.id}>
                    <NavLink
                      href={buildLocalizedUrl(lang, { lang, view: 'product', category: cat, productSlug: p.slug })}
                      onNavigate={onNavigate}
                      className="h-full rounded-xl border border-slate-200 bg-white p-3 hover:border-red-300 hover:shadow-md transition-all cursor-pointer flex flex-col"
                    >
                      <div className="h-24 flex items-center justify-center mb-2 overflow-hidden">
                        <CardImage images={p.images || []} name={p.name} />
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-2">{p.name}</div>
                      <div className="mt-auto pt-2 text-xs text-slate-600">
                        {LP.from[lang]} {p.priceEstimated ? LP.approx[lang] + ' ' : ''}CHF {Math.round(p.priceCHF).toLocaleString('de-CH')}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <aside className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-slate-700">{L.ctaText[lang]}</p>
          <div className="flex flex-wrap gap-2">
            <NavLink href={ctaHref} onNavigate={onNavigate}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 cursor-pointer"
            >
              {post.related ? LP.all[lang] : L.cta[lang]} <ArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-bold hover:bg-slate-100 cursor-pointer"
            >
              {LP.advice[lang]}
            </NavLink>
          </div>
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
