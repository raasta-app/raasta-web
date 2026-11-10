import type { Metadata } from 'next';
import { headers } from 'next/headers';
import CareersContent from '../components/CareersContent';

export const metadata: Metadata = {
  title: 'Careers | Raasta',
  description:
    'Join Raasta early. We are hiring founding engineers, plus growth, content and research roles. Remote, high ownership and equity based, building the future of travel discovery in India.',
  alternates: { canonical: 'https://raasta.app/careers' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raasta',
    title: 'Careers | Raasta',
    description: 'Join us early. Remote, high-ownership, equity-based roles building the future of travel discovery in India.',
    url: 'https://raasta.app/careers',
    images: [{ url: 'https://raasta.app/assets/og.jpg', width: 1200, height: 630, alt: 'Travelling across India with Raasta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Raasta',
    description: 'Join us early. Remote, high-ownership, equity-based roles building the future of travel discovery in India.',
    images: ['https://raasta.app/assets/og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Careers | Raasta',
      url: 'https://raasta.app/careers',
      description: 'Join us early. Remote, high-ownership, equity-based roles building the future of travel discovery in India.',
      isPartOf: { '@type': 'WebSite', name: 'Raasta', url: 'https://raasta.app/' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ItemList',
      name: 'Open roles at Raasta',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Frontend Engineer' },
        { '@type': 'ListItem', position: 2, name: 'Backend Engineer' },
        { '@type': 'ListItem', position: 3, name: 'Full Stack Engineer' },
        { '@type': 'ListItem', position: 4, name: 'SEO & Content Creator' },
        { '@type': 'ListItem', position: 5, name: 'Social Media & Community Intern' },
        { '@type': 'ListItem', position: 6, name: 'Marketing & Growth Intern' },
        { '@type': 'ListItem', position: 7, name: 'Travel Research Intern' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://raasta.app/' },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://raasta.app/careers' },
      ],
    },
  ],
};

export default function CareersPage() {
  const nonce = headers().get('x-nonce') ?? undefined;
  return (
    <div className="subpage">
      <script nonce={nonce} suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CareersContent />
    </div>
  );
}
