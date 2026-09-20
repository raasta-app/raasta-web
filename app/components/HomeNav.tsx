'use client';

import { type RefObject } from 'react';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { MobileMenuSocials } from './SocialIcons';

export default function HomeNav({ navRef }: { navRef: RefObject<HTMLElement | null> }) {
  const { open, toggle, close } = useMobileMenu();

  return (
    <>
      <nav className="nav over-hero" id="nav" ref={navRef as RefObject<HTMLElement>}>
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Raasta home">
            <img className="brand-logo" src="/assets/logo.svg" alt="Raasta" width={90} height={20} />
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="/founders">About</a>
            <a href="/vision">Vision</a>
            <a href="/careers">Careers</a>
          </div>
          <div className="nav-cta">
            <a href="#waitlist" className="btn btn-primary">
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
        <a href="#features" onClick={close}>Features</a>
        <a href="#how" onClick={close}>How it Works</a>
        <a href="/founders" onClick={close}>About</a>
        <a href="/vision" onClick={close}>Vision</a>
        <a href="/careers" onClick={close}>Careers</a>
        <a href="#waitlist" className="btn btn-primary" onClick={close}>
          Join the waitlist
        </a>
        <MobileMenuSocials />
      </div>
    </>
  );
}
