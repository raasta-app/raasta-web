import type { Metadata } from 'next';
import HomeContent from './components/HomeContent';

export const metadata: Metadata = {
  title: 'Raasta | Intelligent Travel App for India',
  description:
    'Discover where to travel in India, when to go, and what it really costs. Raasta turns scattered research into clear, ready-to-go trips. Join the waitlist.',
  alternates: { canonical: 'https://raasta.app/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raasta',
    title: 'Raasta | The Future of Travel in India',
    description:
      'Discover where to travel in India, when to go, and what it really costs. Raasta turns scattered research into clear, ready-to-go trips. Join the waitlist.',
    url: 'https://raasta.app/',
    images: [{ url: 'https://raasta.app/assets/og.jpg', width: 1200, height: 630, alt: 'Travelling across India with Raasta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raasta | The Future of Travel in India',
    description:
      'Discover where to travel in India, when to go, and what it really costs. Raasta turns scattered research into clear, ready-to-go trips. Join the waitlist.',
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
      description: 'The intelligent travel app for India: curated trips and multi-stop journeys with real budgets, best seasons and routes.',
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
        'An upcoming trip-intelligence app for India that scores destinations on weather, budget, reach time and fit, with curated trips, real budgets, best seasons and multi-stop routes.',
      publisher: { '@type': 'Organization', name: 'Raasta' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Raasta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Raasta is an upcoming travel app for India that turns scattered trip research into clear answers: curated trips and multi-stop journeys, each with real budgets, the best time to go, routes and what to watch for. It is currently in pre-launch.',
          },
        },
        {
          '@type': 'Question',
          name: 'When will Raasta launch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "We're building toward launch on iOS and Android. Join the waitlist and we'll email you the moment it's ready. We can't promise a fixed date yet.",
          },
        },
        {
          '@type': 'Question',
          name: 'How much will Raasta cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Pricing isn't finalised yet. Joining the waitlist is free, and waitlisters will be the first to hear about launch and any early-access offers.",
          },
        },
        {
          '@type': 'Question',
          name: 'What do I get by joining the waitlist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Launch and early-access updates by email. We only use your details for Raasta updates (no spam), and you can opt out at any time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Raasta book hotels or transport for me?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Not today. Raasta is a trip-intelligence app that helps you decide where, when and how to travel. It doesn't currently offer bookings, payments or accounts.",
          },
        },
        {
          '@type': 'Question',
          name: 'How do you handle my personal data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We collect only your name, email and how you heard about us, stored securely to manage the waitlist. See our Privacy Policy for full details.',
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div id="top">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeContent />
    </div>
  );
}
