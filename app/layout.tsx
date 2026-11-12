import type { Metadata, Viewport } from 'next';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import Analytics from '@/components/Analytics';
import { body, display } from '@/lib/fonts';
import { KEYWORDS, OG_IMAGE, SHARE_DESC, SITE_DESC, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
import '@/styles/base.css';
import '@/styles/waitlist.css';
import '@/styles/home.css';
import '@/styles/legal.css';

const verificationOther: Record<string, string> = {};
if (process.env.BING_SITE_VERIFICATION) verificationOther['msvalidate.01'] = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'travel',
  keywords: KEYWORDS,
  referrer: 'strict-origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: { canonical: '/', languages: { 'en-IN': '/', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SHARE_DESC,
    url: '/',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SHARE_DESC, images: [OG_IMAGE] },
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: { title: SITE_NAME, statusBarStyle: 'default' },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: Object.keys(verificationOther).length ? verificationOther : undefined,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/assets/icon.svg', type: 'image/svg+xml' },
      { url: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/assets/icon-180.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
