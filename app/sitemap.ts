import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/utils/site';
import { allRoutes } from '../src/utils/allRoutes';
import { buildLocalizedUrl } from '../src/utils/routes';
import { resolveSeoMetadata } from '../src/utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allRoutes()
    // Only indexable pages belong in the sitemap (empty listings are noindex).
    .filter((route) => resolveSeoMetadata(route).robots.startsWith('index'))
    .flatMap((route) => {
      const de = `${SITE_URL}${buildLocalizedUrl('de', route)}`;
      const fr = `${SITE_URL}${buildLocalizedUrl('fr', route)}`;
      const it = `${SITE_URL}${buildLocalizedUrl('it', route)}`;
      const languages = { 'de-CH': de, 'fr-CH': fr, 'it-CH': it, 'x-default': de };
      return [de, fr, it].map((url) => ({ url, lastModified, alternates: { languages } }));
    });
}
