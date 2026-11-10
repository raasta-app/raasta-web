/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()',
  },
  // Content-Security-Policy is NOT set here: it needs a per-request nonce
  // so Next's own inline hydration scripts pass CSP, so it's generated in
  // middleware.ts instead (a static value here would block React hydration
  // entirely — every script-src violation kills the RSC bootstrap script).
];

const nextConfig = {
  reactStrictMode: true,
  // Next's App Router already gives folder-based clean URLs with no
  // trailing slash by default (equivalent to vercel.json's
  // cleanUrls + trailingSlash: false), so no rewrite/redirect config
  // is needed for that behaviour.
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    // In dev, long-lived Cache-Control means the browser stops asking for
    // these files at all after the first load, so edits to files in
    // /public/assets (or a rebuilt /_next/static chunk) silently keep
    // serving the stale cached copy until the cache expires or is cleared.
    // Only apply the production caching strategy outside of dev.
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // static assets copied verbatim into /public/assets
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: isDev ? 'no-store' : 'public, max-age=604800' }],
      },
      {
        // Next's built-in bundled JS/CSS output — equivalent of the old
        // /css/(.*) and /js/(.*) cache rules from vercel.json.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: isDev ? 'no-store' : 'public, max-age=86400' }],
      },
    ];
  },
};

module.exports = nextConfig;
