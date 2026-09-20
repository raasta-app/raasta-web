'use client';

import { type RefObject } from 'react';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { MobileMenuSocials } from './SocialIcons';

type CurrentPage = 'founders' | 'vision' | 'careers';

export default function SubNav({ navRef, current }: { navRef: RefObject<HTMLElement | null>; current: CurrentPage }) {
  const { open, toggle, close } = useMobileMenu();

  const currentProp = (page: CurrentPage) => (page === current ? { 'aria-current': 'page' as const } : {});

  return (
    <>
      <nav className="nav" id="nav" ref={navRef as RefObject<HTMLElement>}>
        <div className="wrap nav-inner">
          <a className="brand" href="/" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} />
          </a>
          <div className="nav-links">
            <a href="/#features">Features</a>
            <a href="/#how">How it Works</a>
            <a href="/founders" {...currentProp('founders')}>About</a>
            <a href="/vision" {...currentProp('vision')}>Vision</a>
            <a href="/careers" {...currentProp('careers')}>Careers</a>
          </div>
          <div className="nav-cta">
            <a href="/#waitlist" className="btn btn-primary">
              Join the waitlist
            </a>
            <button
              className={`nav-burger${open ? ' is-open' : ''}`}
              id="burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobileMenu"
              onClick={toggle}
            >
              <span className="burger-box">
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
        <a href="/#features" onClick={close}>Features</a>
        <a href="/#how" onClick={close}>How it Works</a>
        <a href="/founders" onClick={close} {...currentProp('founders')}>About</a>
        <a href="/vision" onClick={close} {...currentProp('vision')}>Vision</a>
        <a href="/careers" onClick={close} {...currentProp('careers')}>Careers</a>
        <a href="/#waitlist" className="btn btn-primary" onClick={close}>
          Join the waitlist
        </a>
        <MobileMenuSocials />
      </div>
    </>
  );
}
