import type { Metadata } from 'next';
import FoundersContent from '../components/FoundersContent';

export const metadata: Metadata = {
  title: 'Founders | Raasta',
  description: 'Meet the founders of Raasta, Armaan Parvez and Siddharth Singh, and the story behind a new way to discover India.',
  alternates: { canonical: 'https://raasta.app/founders' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    siteName: 'Raasta',
    title: 'Founders | Raasta',
    description: 'The people building Raasta, and the story behind a new way to discover India.',
    url: 'https://raasta.app/founders',
    images: [{ url: 'https://raasta.app/assets/og.jpg', width: 1200, height: 630, alt: 'Travelling across India with Raasta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founders | Raasta',
    description: 'The people building Raasta, and the story behind a new way to discover India.',
    images: ['https://raasta.app/assets/og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: 'Founders | Raasta',
      url: 'https://raasta.app/founders',
      description: 'The people building Raasta, and the story behind a new way to discover India.',
      isPartOf: { '@type': 'WebSite', name: 'Raasta', url: 'https://raasta.app/' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Organization',
      name: 'Raasta',
      url: 'https://raasta.app/',
      logo: 'https://raasta.app/assets/icon-512.png',
      foundingDate: '2026-06',
      foundingLocation: 'Delhi, India',
      founder: [
        {
          '@type': 'Person',
          name: 'Armaan Parvez',
          jobTitle: 'Founder & CEO',
          url: 'https://armaanux.in',
          sameAs: ['https://armaanux.in', 'https://www.linkedin.com/in/armaanux'],
        },
        {
          '@type': 'Person',
          name: 'Siddharth Singh',
          jobTitle: 'Co-Founder',
          url: 'https://sidonweb.com',
          sameAs: ['https://sidonweb.com', 'https://www.linkedin.com/in/sidonweb'],
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://raasta.app/' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://raasta.app/founders' },
      ],
    },
  ],
};

export default function FoundersPage() {
  return (
    <div className="subpage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FoundersContent />
    </div>
  );
}
