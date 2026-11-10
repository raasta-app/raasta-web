'use client';

import { useEffect } from 'react';

type Tracked = { el: HTMLElement; centre: number; half: number; speed: number };

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const smallScreen = window.matchMedia('(max-width: 900px)').matches;
    const cssDriven = CSS.supports('animation-timeline: view()');
    const nodes = cssDriven
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).filter(
          (el) => !(smallScreen && el.classList.contains('plan-demo')),
        );
    if (!nodes.length) return;

    let tracked: Tracked[] = [];

    function measure() {
      for (const el of nodes) el.style.transform = '';

      tracked = nodes.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          centre: r.top + window.scrollY + r.height / 2,
          half: r.height / 2,
          speed: parseFloat(el.dataset.parallax || '0') || 0,
        };
      });
    }

    function draw() {
      const vh = window.innerHeight;
      const mid = window.scrollY + vh / 2;

      for (const t of tracked) {
        const offset = t.centre - mid;
        if (offset + t.half < -vh / 2 || offset - t.half > vh / 2) continue;
        t.el.style.transform = `translate3d(0, ${(offset * -t.speed).toFixed(1)}px, 0)`;
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        draw();
        ticking = false;
      });
    };

    const onResize = () => {
      measure();
      draw();
    };

    measure();
    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
