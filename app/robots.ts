import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/utils/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/order/', '/api/', '/*?q=', '/*?page='] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
