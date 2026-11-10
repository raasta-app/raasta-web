'use client';

import { type RefObject, useEffect } from 'react';

export function useScrollNav(navRef: RefObject<HTMLElement>) {
  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;

    const update = () => {
      ticking = false;
      const nav = navRef.current;
      if (!nav) return;
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 8);
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      nav.classList.toggle('is-hidden', delta > 0 && y > 140);
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navRef]);
}
