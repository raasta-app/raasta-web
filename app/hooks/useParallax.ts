'use client';

import { useEffect } from 'react';

/**
 * Drives `[data-parallax]` element drift and the full-bleed `.break-img`
 * background parallax. Ports the `runParallax` / `runBreakParallax`
 * functions shared by js/script.js (home) and js/nav.js (sub-pages).
 */
export function useParallax() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const smallScreen = window.matchMedia('(max-width: 900px)').matches;
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).filter(
      (el) => !(smallScreen && el.classList.contains('plan-demo')),
    );
    const breakSecs = Array.from(document.querySelectorAll<HTMLElement>('.break-img'));

    function runParallax(vh: number) {
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        const speed = parseFloat(el.dataset.parallax || '0') || 0;
        const shift = ((rect.top + rect.height / 2 - vh / 2) * -speed).toFixed(1);
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    }

    function runBreakParallax(vh: number) {
      for (const sec of breakSecs) {
        const bg = sec.querySelector<HTMLElement>('.break-bg');
        if (!bg) continue;
        const r = sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const H = r.height;
        let prog = (r.top + H / 2 - vh / 2) / (vh / 2 + H / 2);
        prog = prog < -1 ? -1 : prog > 1 ? 1 : prog;
        const shift = (-prog * H * 0.4).toFixed(1);
        bg.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        runParallax(vh);
        runBreakParallax(vh);
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
  }, []);
}
