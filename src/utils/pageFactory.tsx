import type { Metadata } from 'next';
import type { Language } from '../types';
import App from '../App';
import { ALL_PRODUCTS } from '../data/products';
import { PRODUCT_EXTRAS } from '../data/products.server';
import { parseRoute } from './routes';
import { resolveSeoMetadata } from './seo';
import { staticSlugs } from './allRoutes';
import { SITE_URL } from './site';
import { SITE_NAME } from '../config/brand';

type Props = { params: Promise<{ slug?: string[] }> };

const pathFor = (lang: Language, slug: string[] = []) => {
  const prefix = lang === 'de' ? '' : `/${lang}`;
  return slug.length ? `${prefix}/${slug.join('/')}/` : `${prefix}/`;
};

export function makePage(lang: Language) {
  const generateStaticParams = () => staticSlugs(lang);

  const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params;
    const seo = resolveSeoMetadata(parseRoute(pathFor(lang, slug)), SITE_URL);
    return {
      title: { absolute: seo.title },
      description: seo.description,
      robots: seo.robots,
      alternates: {
        canonical: seo.canonicalUrl,
        languages: Object.fromEntries(seo.hreflangs.map((h) => [h.lang, h.href])),
      },
      openGraph: { title: seo.title, description: seo.description, url: seo.canonicalUrl, siteName: SITE_NAME[lang], images: [{ url: `${SITE_URL}/og/og-${lang}.png`, width: 1200, height: 630, alt: SITE_NAME[lang] }], type: 'website', locale: lang === 'de' ? 'de_CH' : lang === 'fr' ? 'fr_CH' : 'it_CH' },
      twitter: { card: 'summary_large_image' }, // title, description and image come from the og: tags
    };
  };

  async function Page({ params }: Props) {
    const { slug } = await params;
    const path = pathFor(lang, slug);
    const route = parseRoute(path);
    const seo = resolveSeoMetadata(route, SITE_URL);
    // The browser bundle has no specs or German texts: hand over those of the products this page shows.
    const ids = route.view === 'product' ? ALL_PRODUCTS.filter((p) => p.slug === route.productSlug).map((p) => p.id) : route.view === 'comparison' ? ALL_PRODUCTS.slice(0, 3).map((p) => p.id) : [];
    const initialExtras = Object.fromEntries(ids.map((id) => [id, PRODUCT_EXTRAS[id]]));
    // The structured data (JSON-LD) is rendered by App itself: a script rendered here would also be copied into the
    // inline payload the browser receives, doubling its size in the page.
    return <App initialPath={path} initialExtras={initialExtras} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
