const nextConfig = {
  trailingSlash: true,
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
    return [
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
