'use client';

import { type RefObject } from 'react';

type CurrentPage = 'vision' | 'careers';

export default function SubNav({ navRef }: { navRef: RefObject<HTMLElement | null>; current: CurrentPage }) {
  return (
    <nav className="nav" id="nav" ref={navRef as RefObject<HTMLElement>} aria-label="Main">
      <div className="wrap">
        <div className="nav-inner">
          <a className="brand" href="/" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} />
          </a>
          <a href="/#join" className="nav-join">
            Join the waitlist
          </a>
        </div>
      </div>
    </nav>
  );
}
