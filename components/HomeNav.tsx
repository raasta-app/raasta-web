'use client';

import { type MouseEvent, type RefObject, useEffect, useState } from 'react';

export default function HomeNav({ navRef }: { navRef: RefObject<HTMLElement> }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero-aside');
    const foot = document.querySelector('.close-form');
    if (!hero || !foot) return;
    const state = { pastHero: false, footVisible: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        else state.footVisible = e.isIntersecting;
      }
      setShow(state.pastHero && !state.footVisible);
    });
    io.observe(hero);
    io.observe(foot);
    return () => io.disconnect();
  }, []);

  const join = (e: MouseEvent<HTMLAnchorElement>) => {
    const form = document.querySelector<HTMLElement>('.close-form');
    if (!form) return;
    e.preventDefault();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
    if (window.matchMedia('(pointer: fine)').matches) form.querySelector<HTMLInputElement>('input[type=email]')?.focus({ preventScroll: true });
  };

  return (
    <nav className="nav" id="nav" ref={navRef} aria-label="Main">
      <div className="wrap nav-row">
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo-nav.svg" alt="Raasta" width={307} height={64} />
          </a>
        </div>
        <a
          className={`nav-join${show ? ' on' : ''}`}
          href="#close"
          onClick={join}
          aria-hidden={!show}
          tabIndex={show ? 0 : -1}
        >
          Join the waitlist
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
