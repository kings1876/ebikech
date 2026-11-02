import { Language, Product } from '../types';
import { BLOG_POSTS, BlogPost } from '../data/blog';
import { ALL_PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { COLLECTIONS } from '../data/collections';
import { CardImage } from '../components/ProductImages';
import { ParsedRoute, buildLocalizedUrl, getBrandCategoryCount, MIN_BRAND_CATEGORY_PRODUCTS } from '../utils/routes';
import { ArrowRight, Clock } from '../components/icons';
import { NavLink } from '../components/NavLink';
import { linkify, newLinkContext } from '../utils/autoLink';

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
  shop: { de: 'Weiter im Shop', fr: 'Poursuivre dans la boutique', it: 'Continua nel negozio' },
  allBikes: { de: 'Alle E-Bikes', fr: 'Tous les vélos électriques', it: 'Tutte le e-bike' },
  byCategory: { de: 'Nach Kategorie', fr: 'Par catégorie', it: 'Per categoria' },
  byBrand: { de: 'Nach Marke', fr: 'Par marque', it: 'Per marca' },
};

/** Shop pages that fit a post: its category / collection, the brands behind its models, and brand x category pages. */
function shopLinks(post: BlogPost, lang: Language) {
  const r = post.related;
  const scope = ALL_PRODUCTS.filter(
    (p) =>
      (!r?.categoryId || p.categoryId === r.categoryId) &&
      (!r?.brandId || p.brandId === r.brandId) &&
      (!r?.speedClass || p.speedClass === r.speedClass) &&
      (!r?.frameType || p.frameType === r.frameType),
  );
  const top = (ids: string[], n: number) => {
    const c: Record<string, number> = {};
    ids.forEach((id) => (c[id] = (c[id] || 0) + 1));
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, n);
  };
  const categories = r?.brandId
    ? top(scope.map((p) => p.categoryId), 5)
    : r?.categoryId || r?.ctaCategoryId
    ? [[(r.categoryId || r.ctaCategoryId) as string, scope.length] as [string, number]]
    : top(ALL_PRODUCTS.map((p) => p.categoryId), 6);
  const brands = r?.brandId ? [] : top(scope.length ? scope.map((p) => p.brandId) : ALL_PRODUCTS.map((p) => p.brandId), 6);
  const collection = COLLECTIONS.find((c) => c.id === r?.ctaCollectionId);
  return { categories, brands, collection, brand: BRANDS.find((b) => b.id === r?.brandId) };
}

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
    // Only two follow-up articles: the blog should lead readers to the shop, not around itself
    const at = BLOG_POSTS.findIndex((p) => p.id === post.id);
    const others = [1, 2].map((n) => BLOG_POSTS[(at + n) % BLOG_POSTS.length]).filter((p) => p && p.id !== post.id);
    const linkCtx = newLinkContext();
    const shop = shopLinks(post, lang);
    const relatedList = relatedProducts(post);
    const ctaCategory = CATEGORIES.find((c) => c.id === (post.related?.categoryId || post.related?.ctaCategoryId));
    const ctaBrand = BRANDS.find((b) => b.id === post.related?.brandId);
    const ctaCollection = COLLECTIONS.find((c) => c.id === post.related?.ctaCollectionId);
    const ctaHref = ctaCollection
      ? buildLocalizedUrl(lang, { lang, view: 'collection', collection: ctaCollection })
      : ctaCategory
      ? buildLocalizedUrl(lang, { lang, view: 'category', category: ctaCategory })
      : ctaBrand
      ? buildLocalizedUrl(lang, { lang, view: 'brand', brand: ctaBrand })
      : buildLocalizedUrl(lang, { lang, view: 'catalog-root' });
    return (
      <article className="k248">
        <nav aria-label="Breadcrumb" className="k249">
          <NavLink href={buildLocalizedUrl(lang, { lang, view: 'home' })} onNavigate={onNavigate}  className="hover:text-red-600 cursor-pointer">{L.home[lang]}</NavLink>
          <span>/</span>
          <NavLink href={buildLocalizedUrl(lang, blogRoot)} onNavigate={onNavigate}  className="hover:text-red-600 cursor-pointer">{L.blog[lang]}</NavLink>
        </nav>

        <header className="k250">
          <h1 className="k251">{post.title[lang]}</h1>
          <p className="k252">{post.excerpt[lang]}</p>
          <div className="k253">
            <time dateTime={post.publishedDate}>{fmtDate(post.publishedDate, lang)}</time>
            <span className="k254"><Clock className="w-3.5 h-3.5" />{post.readMinutes} {L.min[lang]}</span>
          </div>
        </header>

        <div className="k255">
          {post.body[lang].map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="k256">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{linkify(p, lang, linkCtx, onNavigate)}</p>
              ))}
            </section>
          ))}
        </div>

        {relatedList.length > 0 && (
          <section className="space-y-3">
            <h2 className="k256">{LP.models[lang]}</h2>
            <ul className="k257">
              {relatedList.map((p) => {
                const cat = CATEGORIES.find((c) => c.id === p.categoryId);
                return (
                  <li key={p.id}>
                    <NavLink
                      href={buildLocalizedUrl(lang, { lang, view: 'product', category: cat, productSlug: p.slug })}
                      onNavigate={onNavigate}
                      className="k258"
                    >
                      <div className="k259">
                        <CardImage images={p.images || []} name={p.name} />
                      </div>
                      <div className="k260">{p.name}</div>
                      <div className="k261">
                        {LP.from[lang]} {p.priceEstimated ? LP.approx[lang] + ' ' : ''}CHF {Math.round(p.priceCHF).toLocaleString('de-CH')}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="space-y-4" aria-label={LP.shop[lang]}>
          <h2 className="k256">{LP.shop[lang]}</h2>
          <div className="flex flex-wrap gap-2">
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'catalog-root' })} onNavigate={onNavigate}
              className="k262"
            >
              {LP.allBikes[lang]} <ArrowRight className="w-4 h-4" />
            </NavLink>
            {shop.collection && (
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'collection', collection: shop.collection })} onNavigate={onNavigate}
                className="k263"
              >
                {shop.collection.name[lang]}
              </NavLink>
            )}
            {shop.brand && (
              <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand: shop.brand })} onNavigate={onNavigate}
                className="k263"
              >
                {shop.brand.name}
              </NavLink>
            )}
          </div>
          {shop.categories.length > 0 && (
            <div className="space-y-2">
              <div className="k264">{LP.byCategory[lang]}</div>
              <ul className="flex flex-wrap gap-2">
                {shop.categories.map(([id, n]) => {
                  const category = CATEGORIES.find((c) => c.id === id);
                  if (!category) return null;
                  const hasBrandPage = shop.brand && getBrandCategoryCount(shop.brand.id, id) >= MIN_BRAND_CATEGORY_PRODUCTS;
                  const href = hasBrandPage && shop.brand
                    ? buildLocalizedUrl(lang, { lang, view: 'brand-category', brand: shop.brand, category })
                    : buildLocalizedUrl(lang, { lang, view: 'category', category });
                  return (
                    <li key={id}>
                      <NavLink href={href} onNavigate={onNavigate}
                        className="k265"
                      >
                        {hasBrandPage && shop.brand ? `${shop.brand.name} ${category.name[lang]}` : category.name[lang]} <span className="text-xs text-slate-500">({n})</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {shop.brands.length > 0 && (
            <div className="space-y-2">
              <div className="k264">{LP.byBrand[lang]}</div>
              <ul className="flex flex-wrap gap-2">
                {shop.brands.map(([id, n]) => {
                  const brand = BRANDS.find((b) => b.id === id);
                  if (!brand) return null;
                  return (
                    <li key={id}>
                      <NavLink href={buildLocalizedUrl(lang, { lang, view: 'brand', brand })} onNavigate={onNavigate}
                        className="k265"
                      >
                        {brand.name} <span className="text-xs text-slate-500">({n})</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        <aside className="k266">
          <p className="text-sm text-slate-700">{L.ctaText[lang]}</p>
          <div className="flex flex-wrap gap-2">
            <NavLink href={ctaHref} onNavigate={onNavigate}
              className="k267"
            >
              {post.related ? LP.all[lang] : L.cta[lang]} <ArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'contact' })} onNavigate={onNavigate}
              className="k268"
            >
              {LP.advice[lang]}
            </NavLink>
          </div>
        </aside>

        <section className="space-y-3">
          <h2 className="k269">{L.more[lang]}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {others.map((p) => (
              <li key={p.id}>
                <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: p })} onNavigate={onNavigate}
                  
                  className="k270"
                >
                  <div className="k271">{p.title[lang]}</div>
                  <div className="k272">{p.excerpt[lang]}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </article>
    );
  }

  return (
    <div className="k273">
      <header className="k274">
        <div className="k275">{L.blog[lang]}</div>
        <h1 className="k276">{L.heroTitle[lang]}</h1>
        <p className="k277">{L.heroText[lang]}</p>
      </header>

      <ul className="grid md:grid-cols-2 gap-5">
        {BLOG_POSTS.map((p) => (
          <li key={p.id}>
            <NavLink href={buildLocalizedUrl(lang, { lang, view: 'blog-post', blogPost: p })} onNavigate={onNavigate}
              
              className="k278 group"
            >
              <div className="k279">
                <time dateTime={p.publishedDate}>{fmtDate(p.publishedDate, lang)}</time>
                <span className="k254"><Clock className="w-3.5 h-3.5" />{p.readMinutes} {L.min[lang]}</span>
              </div>
              <h2 className="k280">{p.title[lang]}</h2>
              <p className="k281">{p.excerpt[lang]}</p>
              <span className="k282">
                {L.read[lang]} <ArrowRight className="k283" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
