const nextConfig = {
  trailingSlash: true,
  // Styles arrive with the HTML, so the first paint does not wait for a stylesheet request
  experimental: { inlineCss: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Old blog posts were replaced by buying guides; keep their URLs working.
  async redirects() {
    const to = {
      de: { p45: '/blog/e-bike-45-km-h-kaufen/', mtb: '/blog/e-mountainbike-kaufen/', idx: '/blog/' },
      fr: { p45: '/fr/blog/acheter-velo-electrique-45-km-h/', mtb: '/fr/blog/acheter-vtt-electrique/', idx: '/fr/blog/' },
      it: { p45: '/it/blog/acquistare-e-bike-45-km-h/', mtb: '/it/blog/acquistare-mountain-bike-elettrica/', idx: '/it/blog/' },
    };
    const old = [
      ['de', 'e-bike-25-oder-e-bike-45', 'p45'],
      ['fr', 'e-bike-25-ou-e-bike-45', 'p45'],
      ['it', 'e-bike-25-o-e-bike-45', 'p45'],
      ['de', 'akku-und-reichweite-verstehen', 'mtb'],
      ['fr', 'comprendre-batterie-et-autonomie', 'mtb'],
      ['it', 'capire-batteria-e-autonomia', 'mtb'],
      ['de', 'e-bike-akku-richtig-laden-und-lagern', 'idx'],
      ['fr', 'bien-charger-et-stocker-la-batterie', 'idx'],
      ['it', 'caricare-e-conservare-la-batteria', 'idx'],
      ['de', 'mittelmotor-oder-nabenmotor', 'mtb'],
      ['fr', 'moteur-central-ou-moteur-de-moyeu', 'mtb'],
      ['it', 'motore-centrale-o-motore-nel-mozzo', 'mtb'],
    ];
    return old.map(([lang, slug, target]) => ({
      source: `${lang === 'de' ? '' : '/' + lang}/blog/${slug}/`,
      destination: to[lang][target],
      permanent: true,
    }));
  },
  async headers() {
    const security = process.env.NODE_ENV === 'production'
      ? [{
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
            {
              key: 'Content-Security-Policy',
              // Next.js bootstraps with inline scripts; product photos are hotlinked from manufacturer CDNs (https:)
              value: ["default-src 'self'", "script-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob: https:", "font-src 'self' data:", "connect-src 'self'", "frame-ancestors 'self'", "base-uri 'self'", "form-action 'self'", "object-src 'none'"].join('; '),
            },
          ],
        }]
      : [];
    return [
      ...security,
      {
        // Keep the *.vercel.app preview/default addresses out of search indexes;
        // only the custom domain should be indexed.
        source: '/:path*',
        has: [{ type: 'host', value: '(?<host>.+\\.vercel\\.app)' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
