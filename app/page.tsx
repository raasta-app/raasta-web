import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import JsonLd from '@/components/JsonLd';
import { homeGraph } from '@/lib/schema';
import { OG_IMAGE, SHARE_DESC, SITE_NAME, SITE_TITLE } from '@/lib/site';

export function generateMetadata({ searchParams }: { searchParams: { ref?: string } }): Metadata {
  const invited = typeof searchParams.ref === 'string' && searchParams.ref.length > 0;
  const shareTitle = invited ? `Join me on ${SITE_NAME}` : SITE_TITLE;
  const shareDesc = invited ? 'Offbeat places in India, with real costs and the best time to go.' : SHARE_DESC;
  return {
    title: { absolute: SITE_TITLE },
    alternates: { canonical: '/', languages: { 'en-IN': '/', 'x-default': '/' } },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      title: shareTitle,
      description: shareDesc,
      url: '/',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description: shareDesc, images: [OG_IMAGE] },
  };
}

export default function HomePage() {
  return (
    <div id="top" className="home">
      <JsonLd data={homeGraph} />
      <HomeContent />
    </div>
  );
}
