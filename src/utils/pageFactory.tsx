import type { Metadata } from 'next';
import type { Language } from '../types';
import App from '../App';
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
      twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: [`${SITE_URL}/og/og-${lang}.png`] },
    };
  };

  async function Page({ params }: Props) {
    const { slug } = await params;
    const path = pathFor(lang, slug);
    const seo = resolveSeoMetadata(parseRoute(path), SITE_URL);
    const hasSchema = Array.isArray(seo.jsonLd) ? seo.jsonLd.length > 0 : Object.keys(seo.jsonLd).length > 0;
    return (
      <>
        {hasSchema && (
          <script
            type="application/ld+json"
            data-type="schema-ld"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c') }}
          />
        )}
        <App initialPath={path} />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
