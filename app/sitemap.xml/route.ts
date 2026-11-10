import { HERO_IMAGE, SITE_URL, absolute } from '@/lib/site';

const PAGES: { path: string; freq: string; priority: string; images?: { url: string; title: string }[] }[] = [
  {
    path: '/',
    freq: 'weekly',
    priority: '1.0',
    images: [
      { url: HERO_IMAGE.url, title: HERO_IMAGE.alt },
      { url: '/assets/story-meadow.jpg', title: 'A traveller resting on a green meadow below cloud-wrapped peaks' },
      { url: '/assets/circuits-ladakh.jpg', title: 'A lone rider crossing a high, bare mountain slope' },
      { url: '/screens/overview.png', title: 'Raasta place page with photos, tags and quick facts on cost, days and altitude' },
      { url: '/screens/cost-breakdown.png', title: 'Raasta cost breakdown split into getting there, stay and food' },
      { url: '/screens/community.png', title: 'Traveller updates on bus timings and cheaper ways in' },
      { url: '/screens/profile.png', title: 'Raasta profile counting the states and union territories visited' },
    ],
  },
  { path: '/privacy', freq: 'yearly', priority: '0.3' },
  { path: '/terms', freq: 'yearly', priority: '0.3' },
  { path: '/cookies', freq: 'yearly', priority: '0.3' },
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const dynamic = 'force-static';

export function GET() {
  const lastmod = new Date().toISOString();
  const urls = PAGES.map((p) => {
    const imgs = (p.images ?? [])
      .map((i) => `<image:image><image:loc>${esc(`${SITE_URL}${i.url}`)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`)
      .join('');
    return `<url><loc>${esc(absolute(p.path))}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.freq}</changefreq><priority>${p.priority}</priority><xhtml:link rel="alternate" hreflang="en-IN" href="${esc(absolute(p.path))}"/><xhtml:link rel="alternate" hreflang="x-default" href="${esc(absolute(p.path))}"/>${imgs}</url>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
