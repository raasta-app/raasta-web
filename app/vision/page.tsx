import type { Metadata } from 'next';
import VisionContent from '../components/VisionContent';

export const metadata: Metadata = {
  title: 'Vision | Raasta',
  description: "Raasta's vision for travel discovery in India: the problem, why now, the opportunity, the numbers behind it, and where we are headed.",
  alternates: { canonical: 'https://raasta.app/vision' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Raasta',
    title: 'Vision | Raasta',
    description: 'Where Raasta is headed with travel discovery in India.',
    url: 'https://raasta.app/vision',
    images: [{ url: 'https://raasta.app/assets/og.jpg', width: 1200, height: 630, alt: 'Travelling across India with Raasta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision | Raasta',
    description: 'Where Raasta is headed with travel discovery in India.',
    images: ['https://raasta.app/assets/og.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Vision | Raasta',
      url: 'https://raasta.app/vision',
      description: 'Where Raasta is headed with travel discovery in India.',
      isPartOf: { '@type': 'WebSite', name: 'Raasta', url: 'https://raasta.app/' },
      about: { '@type': 'Organization', name: 'Raasta', url: 'https://raasta.app/' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://raasta.app/' },
        { '@type': 'ListItem', position: 2, name: 'Vision', item: 'https://raasta.app/vision' },
      ],
    },
  ],
};

export default function VisionPage() {
  return (
    <div className="subpage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VisionContent />
    </div>
  );
}
