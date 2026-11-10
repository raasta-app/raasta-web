import Image from 'next/image';
import { EMAIL, SOCIAL } from '@/lib/site';

const LINKS = [
  {
    h: 'Explore',
    l: [
      { t: 'What we do', href: '#what' },
      { t: 'How it works', href: '#features' },
      { t: 'Join the waitlist', href: '#join' },
    ],
  },
  {
    h: 'Follow',
    l: [
      { t: 'Instagram', href: SOCIAL.instagram, ext: true },
      { t: 'LinkedIn', href: SOCIAL.linkedin, ext: true },
    ],
  },
  {
    h: 'Legal',
    l: [
      { t: 'Privacy Policy', href: '/privacy' },
      { t: 'Terms of Use', href: '/terms' },
      { t: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-scene" aria-hidden="true">
        <Image src="/assets/footer-mountains.png" alt="" width={735} height={304} unoptimized />
      </div>

      <div className="footer-night">
        <div className="wrap footer-top">
          <div className="footer-brand">
            <a className="brand" href="/" aria-label="Raasta home">
              <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} loading="lazy" decoding="async" />
            </a>
            <p>The complete guide to offbeat India, short of booking.</p>
            <a className="footer-mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 16 16 8M16 8H9.5M16 8v6.5" />
              </svg>
            </a>
          </div>

          <nav className="footer-cols" aria-label="Footer">
            {LINKS.map((c) => (
              <div className="footer-col" key={c.h}>
                <h3>{c.h}</h3>
                {c.l.map((l) => (
                  <a key={l.t} href={l.href} {...('ext' in l && l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {l.t}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="wrap footer-bottom">
          <span className="copy">&copy; 2026 Raasta &middot; All rights reserved</span>
          <span className="built">
            Built with{' '}
            <span className="copy-heart" aria-label="love" role="img">
              ❤️
            </span>{' '}
            in and for India <span aria-hidden="true">🇮🇳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
