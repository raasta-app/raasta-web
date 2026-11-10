'use client';

import { type RefObject, useEffect } from 'react';

function trackDirection(nav: HTMLElement, y: number, last: { y: number }) {
  const delta = y - last.y;
  if (Math.abs(delta) < 6) return;
  const hide = delta > 0 && y > 140 && !document.body.classList.contains('menu-lock');
  nav.classList.toggle('is-hidden', hide);
  last.y = y;
}

export function useHomeScrollNav(
  navRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
  heroRef?: RefObject<HTMLElement | null>,
  heroContentRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    let ticking = false;
    const last = { y: window.scrollY };
    const darkEls = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-dark]'));

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const heroH = heroRef?.current?.offsetHeight ?? 0;

        const nav = navRef.current;
        if (nav) {
          nav.classList.toggle('scrolled', y > 8);

          const line = nav.offsetHeight * 0.5;
          const overDark = darkEls.some((el) => {
            const r = el.getBoundingClientRect();
            return r.top <= line && r.bottom > line + 40;
          });
          nav.classList.toggle('over-hero', overDark);

          if (!nav.classList.contains('nav--route')) trackDirection(nav, y, last);
        }

        if (heroContentRef?.current && heroH > 0) {
          const t = Math.min(1, y / (heroH * 0.62));
          heroContentRef.current.style.opacity = String(Math.max(0, 1 - t));
          heroContentRef.current.style.transform = `translate3d(0, ${(t * 46).toFixed(1)}px, 0)`;
        }

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

  }, []);
}

export function useSubpageScrollNav(navRef: RefObject<HTMLElement | null>, progressRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let ticking = false;
    const last = { y: window.scrollY };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        if (navRef.current) {
          navRef.current.classList.toggle('scrolled', y > 8);
          trackDirection(navRef.current, y, last);
        }
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

  }, []);
}
