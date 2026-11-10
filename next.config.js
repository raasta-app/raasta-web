const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: isDev ? 'no-store' : 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/screens/:path*',
        headers: [{ key: 'Cache-Control', value: isDev ? 'no-store' : 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

module.exports = nextConfig;
