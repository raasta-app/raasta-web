'use client';

import Image from 'next/image';
import { useRef } from 'react';
import HomeNav from './HomeNav';
import Footer from './Footer';
import WaitlistForm from './WaitlistForm';
import WhatWeDo from './WhatWeDo';
import HowRight from './HowRight';
import Features from './Features';
import ComingNext from './ComingNext';
import Faq from './Faq';
import Closing from './Closing';
import Preloader from './Preloader';
import { useScrollNav } from '@/hooks/useScrollNav';
import { HERO_IMAGE } from '@/lib/site';
import { useReveal } from '@/hooks/useReveal';
import { usePauseOffscreen } from '@/hooks/usePauseOffscreen';

const BLUR = [
  { src: '/assets/hero-kashmir-meadow-blur-3.jpg', k: 0.44 },
  { src: '/assets/hero-kashmir-meadow-blur-8.jpg', k: 0.22 },
  { src: '/assets/hero-kashmir-meadow-blur-24.jpg', k: 0 },
];

export default function HomeContent() {
  const navRef = useRef<HTMLElement>(null);

  useScrollNav(navRef);
  useReveal();
  usePauseOffscreen('.soon-marquee, .close-perk, .close-form');

  return (
    <>
      <Preloader />
      <div className="statusbar-fill" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <HomeNav navRef={navRef} />

      <main id="main">
        <header className="hero" id="join">
          <div className="hero-shot">
            <Image
              className="hero-img"
              src={HERO_IMAGE.url}
              alt={HERO_IMAGE.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
            />
            {BLUR.map((b) => (
              <span key={b.src} className="hero-blur" style={{ ['--k' as string]: b.k }} aria-hidden="true">
                <Image className="hero-img" src={b.src} alt="" fill loading="eager" quality={70} sizes="100vw" />
              </span>
            ))}
          </div>

          <span className="hero-veil hero-veil--t" aria-hidden="true" />
          <span className="hero-veil hero-veil--b" aria-hidden="true" />

          <div className="hero-layer wrap">
            <p className="hero-eye">Far from the crowds</p>

            <h1 className="hero-title">
              <span className="ln">
                <span>There’s a version of India</span>
              </span>{' '}
              <span className="ln">
                <span>you haven’t seen yet.</span>
              </span>
            </h1>

            <p className="hero-sub">
              Most people go to the same few places because those are the ones they’ve heard of. We’ll show you the
              rest, and everything you need to actually go.
            </p>

            <div className="hero-aside">
              <WaitlistForm variant="hero" inputId="heroEmail" />
            </div>
          </div>
        </header>

        <WhatWeDo />
        <HowRight />
        <Features />
        <ComingNext />
        <Faq />
      </main>

      <Closing />
      <Footer />
    </>
  );
}
