import { EMAIL, HERO_IMAGE, OG_IMAGE, SITE_DESC, SITE_NAME, SITE_TAGLINE, SITE_URL, SOCIAL, absolute } from './site';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: ['Raasta App', 'Raasta Travel', 'Raasta Travel App'],
  url: absolute('/'),
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: absolute('/assets/icon-512.png'),
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: { '@id': `${SITE_URL}/#logo` },
  slogan: SITE_TAGLINE,
  description:
    'Raasta is an upcoming travel app for offbeat places across India: when to go, how to get there, cost ranges, packing, permits and warnings for each place, checked by a real team.',
  email: EMAIL,
  contactPoint: { '@type': 'ContactPoint', email: EMAIL, contactType: 'customer support', availableLanguage: ['English', 'Hindi'] },
  foundingLocation: { '@type': 'Place', name: 'Delhi, India' },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Offbeat travel in India',
    'Himalayan travel',
    'Northeast India travel',
    'Budget travel',
    'Trip planning',
    'Best time to visit Indian destinations',
    'Travel permits in India',
  ],
  sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
};

export const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: absolute('/'),
  name: SITE_NAME,
  alternateName: 'Raasta App',
  description: SITE_DESC,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
};

export function webPage(path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    '@type': 'WebPage',
    '@id': `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...extra,
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absolute(it.path) })),
  };
}

export const homeGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    website,
    webPage('/', `${SITE_NAME}: offbeat places in India and how to get there`, SITE_DESC, {
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absolute(HERO_IMAGE.url),
        width: HERO_IMAGE.width,
        height: HERO_IMAGE.height,
        caption: HERO_IMAGE.alt,
      },
      image: absolute(OG_IMAGE.url),
      keywords: 'offbeat places in India, India travel guide, best time to visit, how to reach, trip cost',
    }),
  ],
};

export function legalGraph(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage(path, `${name} | ${SITE_NAME}`, description),
      breadcrumbs([
        { name: SITE_NAME, path: '/' },
        { name, path },
      ]),
    ],
  };
}
