import type { MetadataRoute } from 'next';
import { SITE_DESC, SITE_NAME } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: `${SITE_NAME}: offbeat places in India`,
    short_name: SITE_NAME,
    description: SITE_DESC,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['travel', 'navigation', 'lifestyle'],
    icons: [
      { src: '/assets/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/assets/icon-180.png', type: 'image/png', sizes: '180x180' },
      { src: '/assets/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
    ],
  };
}
