'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Home-page nav + progress-bar + hero parallax/fade, ported from the
 * `onScroll` handler in js/script.js. Toggles `.scrolled` / `.over-hero`
 * on the nav, scales the top progress bar, and parallaxes the hero
 * background/content while scrolling through it.
 */
export function useScrollNav(
  navRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  heroBgRef: RefObject<HTMLDivElement | null>,
  heroContentRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const hero = heroRef.current;
        const heroH = hero ? hero.offsetHeight : window.innerHeight;
        const nav = navRef.current;

        const past = y > heroH - 120;
        if (nav) {
          nav.classList.toggle('scrolled', past);
          nav.classList.toggle('over-hero', !past);
        }

        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }

        if (y < heroH) {
          if (!reduceMotion) {
            if (heroBgRef.current) heroBgRef.current.style.transform = `translateY(${y * 0.22}px)`;
            if (heroContentRef.current) heroContentRef.current.style.transform = `translateY(${y * 0.14}px)`;
          }
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = String(Math.max(0, 1 - y / (heroH * 0.62)));
          }
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // refs are stable across renders; effect should run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Sub-page nav + progress-bar: simpler `.scrolled` toggle past 8px,
 * ported from js/nav.js.
 */
export function useSubpageScrollNav(navRef: RefObject<HTMLElement | null>, progressRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        if (navRef.current) navRef.current.classList.toggle('scrolled', y > 8);
        if (progressRef.current) {
          const doc = document.documentElement;
          const max = doc.scrollHeight - doc.clientHeight;
          progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
