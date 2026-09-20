import type { ReactNode } from 'react';

type CurrentPage = 'founders' | 'vision' | 'careers';

interface FooterProps {
  hand: string;
  headline: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  /** Sub-pages show an extra "Company" column and widen the footer grid via `.subpage`. */
  showCompanyCol?: boolean;
  current?: CurrentPage;
  /** Home page links are root-relative hashes (`#destinations`); sub-pages need `/#destinations`. */
  hashPrefix?: string;
}

export default function Footer({ hand, headline, ctaHref, ctaLabel, showCompanyCol, current, hashPrefix = '' }: FooterProps) {
  const currentProp = (page: CurrentPage) => (page === current ? { 'aria-current': 'page' as const } : {});
  return (
    <footer className="footer">
      <div className="wrap footer-sign">
        <div className="footer-sign-copy">
          <span className="hand">{hand}</span>
          <h2 className="footer-headline">{headline}</h2>
        </div>
        <a href={ctaHref} className="btn btn-primary btn-lg footer-cta">
          {ctaLabel}
        </a>
      </div>
      <div className="wrap footer-top">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} />
          </a>
          <p>The intelligent travel app for India: curated trips and multi-stop journeys, scored for fit, with real budgets and day-by-day plans.</p>
        </div>
        <nav className="footer-cols" aria-label="Footer">
          <div className="footer-col">
            <h3>Explore</h3>
            <a href={`${hashPrefix}#destinations`}>Destinations</a>
            <a href={`${hashPrefix}#features`}>Features</a>
            <a href={`${hashPrefix}#how`}>How it works</a>
          </div>
          {showCompanyCol && (
            <div className="footer-col">
              <h3>Company</h3>
              <a href="/founders" {...currentProp('founders')}>About</a>
              <a href="/vision" {...currentProp('vision')}>Vision</a>
              <a href="/careers" {...currentProp('careers')}>Careers</a>
            </div>
          )}
          <div className="footer-col">
            <h3>Contact</h3>
            <a href="mailto:hello@raasta.app">hello@raasta.app</a>
            <a href="https://www.instagram.com/raasta.app" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/raasta-app-6367b2411/" target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <span className="copy">© 2026 Raasta · All rights reserved</span>
        <span className="built">
          Built with{' '}
          <span className="copy-heart" aria-label="love" role="img">
            ❤️
          </span>{' '}
          in and for India <span aria-hidden="true">🇮🇳</span>
        </span>
      </div>
    </footer>
  );
}
