import type { Metadata } from 'next';

const FALLBACK = 'https://raasta.app';

const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');

export const SITE_URL = fromEnv && !/localhost|127\.0\.0\.1/.test(fromEnv) ? fromEnv : FALLBACK;

export const SITE_HOST = SITE_URL.replace(/^https?:\/\/(www\.)?/, '');

export const SITE_NAME = 'Raasta';

export const SITE_TITLE = 'Raasta | Offbeat places in India and how to get there';

export const SITE_TAGLINE = 'The complete guide to offbeat India, short of booking.';

export const SITE_DESC =
  'Find offbeat places in India with real cost ranges, the best months to go, how to get there, what to pack and what could go wrong. Join the Raasta waitlist.';

export const SHARE_DESC = 'Offbeat places in India, with real costs, routes and the right months to go. Join the waitlist.';

export const KEYWORDS = [
  'offbeat places in India',
  'offbeat destinations India',
  'hidden places in India',
  'unexplored places in India',
  'India travel guide',
  'India travel app',
  'budget travel India',
  'weekend getaways India',
  'best time to visit',
  'how to reach',
  'trip cost India',
  'Himalayan villages',
  'Northeast India travel',
  'Raasta',
  'Raasta app',
];

export const OG_IMAGE = {
  url: '/assets/og-raasta.jpg',
  width: 1200,
  height: 630,
  alt: 'Raasta: there’s a version of India you haven’t seen yet',
};

export const HERO_IMAGE = {
  url: '/assets/hero-kashmir-meadow.jpg',
  width: 3840,
  height: 2560,
  alt: 'A trekker resting on a green meadow below cloud-wrapped peaks in Kashmir',
};

export const SOCIAL = {
  instagram: 'https://www.instagram.com/raasta.app',
  linkedin: 'https://www.linkedin.com/in/raasta-app-6367b2411/',
};

export const EMAIL = 'hello@raasta.app';

export const BADGE_NAME = 'Early badge';

export const withArticle = (word: string) => `${/^[aeiou]/i.test(word) ? 'an' : 'a'} ${word}`;

export const absolute = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;

export function pageMetadata(path: string, title: string, description: string, shareDescription = description): Metadata {
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { 'en-IN': path, 'x-default': path } },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      title: full,
      description: shareDescription,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: full, description: shareDescription, images: [OG_IMAGE] },
  };
}
