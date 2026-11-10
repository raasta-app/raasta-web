'use client';

import { type RefObject } from 'react';

export default function HomeNav({ navRef }: { navRef: RefObject<HTMLElement | null> }) {
  return (
    <nav className="nav" id="nav" ref={navRef as RefObject<HTMLElement>} aria-label="Main">
      <div className="wrap">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo-nav.svg" alt="Raasta" width={307} height={64} />
          </a>
        </div>
      </div>
    </nav>
  );
}
