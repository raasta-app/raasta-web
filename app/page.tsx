import type { Metadata } from 'next';
import { headers } from 'next/headers';
import HomeContent from './components/HomeContent';

export const metadata: Metadata = {
  title: 'Raasta | The complete trip guide for India',
  description:
      'Destinations and multi-stop circuits across India, mapped, budgeted and timed to the season, and checked by a real team. One straight answer instead of ten open tabs. Join the waitlist.',
  alternates: { canonical: 'https://raasta.app/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raasta',
    title: 'Raasta | A real guide to the places nobody else covers',
    description:
      'Destinations and multi-stop circuits across India, mapped, budgeted and timed to the season, and checked by a real team. One straight answer instead of ten open tabs. Join the waitlist.',
    url: 'https://raasta.app/',
    images: [{ url: 'https://raasta.app/assets/og.jpg', width: 1200, height: 630, alt: 'Travelling across India with Raasta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raasta | A real guide to the places nobody else covers',
    description:
      'Destinations and multi-stop circuits across India, mapped, budgeted and timed to the season, and checked by a real team. One straight answer instead of ten open tabs. Join the waitlist.',
    images: ['https://raasta.app/assets/og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Raasta',
      alternateName: ['Raasta App', 'Raasta Travel', 'Raasta Travel App'],
      url: 'https://raasta.app/',
      logo: 'https://raasta.app/assets/icon-512.png',
      description: 'The complete trip guide for India: destinations and multi-stop circuits with real budgets, season heatmaps, day-by-day plans, permits and warnings, checked by a real team.',
      email: 'hello@raasta.app',
      foundingLocation: 'Delhi, India',
      sameAs: ['https://www.instagram.com/raasta.app', 'https://www.linkedin.com/in/raasta-app-6367b2411/'],
    },
    {
      '@type': 'WebSite',
      name: 'Raasta',
      alternateName: 'Raasta App',
      url: 'https://raasta.app/',
      inLanguage: 'en-IN',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Raasta',
      alternateName: 'Raasta App',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'iOS, Android',
      url: 'https://raasta.app/',
      description:
        'An upcoming trip guide for India covering destinations and multi-stop circuits: season heatmaps, budgets priced from your city, day-by-day plans, packing, permits, warnings and a solo verdict, all checked by a real team.',
      publisher: { '@type': 'Organization', name: 'Raasta' },
    },
  ],
};

export default function HomePage() {
  const nonce = headers().get('x-nonce') ?? undefined;
  return (
    <div id="top" className="home">

      <script nonce={nonce} suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeContent />
    </div>
  );
}
