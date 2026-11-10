type LegalPage = 'privacy' | 'terms' | 'cookies';

export function LegalHeader() {
  return (
    <header className="legal-bar">
      <div className="wrap legal-bar-inner">
        <a className="brand" href="/" aria-label="Raasta home">
          <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} />
        </a>
        <a className="legal-back" href="/">
          ← Back to site
        </a>
      </div>
    </header>
  );
}

export function LegalFooter({ current }: { current: LegalPage }) {
  const currentProp = (page: LegalPage) => (page === current ? { 'aria-current': 'page' as const } : {});
  return (
    <footer className="legal-foot">
      <div className="wrap legal-foot-inner">
        <span>© 2026 Raasta · All rights reserved</span>
        <nav className="legal-foot-links" aria-label="Legal">
          <a href="/privacy" {...currentProp('privacy')}>Privacy</a>
          <a href="/terms" {...currentProp('terms')}>Terms</a>
          <a href="/cookies" {...currentProp('cookies')}>Cookies</a>
          <a href="/">Home</a>
        </nav>
      </div>
    </footer>
  );
}
