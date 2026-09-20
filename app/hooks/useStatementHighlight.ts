'use client';

import { useEffect } from 'react';

/**
 * Splits every `.statement-text` into per-word spans and highlights them
 * as the block scrolls through the viewport. Ports the word-highlight
 * logic duplicated in js/script.js (home) and js/nav.js (sub-pages).
 */
export function useStatementHighlight() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stEls = Array.from(document.querySelectorAll<HTMLElement>('.statement-text'));
    if (!stEls.length) return;

    stEls.forEach((el) => {
      // idempotent: skip if already split (e.g. effect re-run in StrictMode)
      if (el.querySelector('.w')) return;
      const words = el.textContent?.trim().split(/\s+/) ?? [];
      el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    });

    if (reduceMotion) return;

    function highlight(vh: number) {
      stEls.forEach((el) => {
        const words = Array.from(el.querySelectorAll<HTMLElement>('.w'));
        if (!words.length) return;
        const r = el.getBoundingClientRect();
        let t = (vh * 0.82 - r.top) / (vh * 0.82 - vh * 0.3);
        t = Math.max(0, Math.min(1, t));
        const active = Math.round(t * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < active));
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        highlight(window.innerHeight);
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
