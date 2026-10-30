const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
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
