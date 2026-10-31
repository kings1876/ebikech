import type { MetadataRoute } from 'next';
import { SITE_NAME, TAGLINE, BRAND_COLORS } from '../src/config/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME.de,
    short_name: 'E-Bikes',
    description: TAGLINE.de,
    start_url: '/',
    display: 'standalone',
    background_color: BRAND_COLORS.dark,
    theme_color: BRAND_COLORS.accent,
    icons: [
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
