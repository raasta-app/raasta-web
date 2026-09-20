'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Destinations rail: edge-fade mask + prev/next arrow buttons.
 * Ports the `.dest-grid` scroll logic from js/script.js.
 */
export function useDestinationsRail(railRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const prevBtn = document.querySelector<HTMLButtonElement>('.dest-arrow[data-dir="-1"]');
    const nextBtn = document.querySelector<HTMLButtonElement>('.dest-arrow[data-dir="1"]');

    const updateRail = () => {
      const rem = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;
      const t = Math.max(0, Math.min(1, rem / 140));
      const maxFade = window.matchMedia('(max-width: 560px)').matches ? 18 : 110;
      rail.style.setProperty('--fade-w', (t * maxFade).toFixed(0) + 'px');
      if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = rem <= 2;
    };

    let raf = false;
    const onRailScroll = () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        updateRail();
        raf = false;
      });
    };

    updateRail();
    rail.addEventListener('scroll', onRailScroll, { passive: true });
    window.addEventListener('resize', onRailScroll, { passive: true });

    const onArrowClick = (btn: HTMLButtonElement) => {
      const card = rail.querySelector<HTMLElement>('.dest-card');
      const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.8;
      const dir = Number(btn.dataset.dir);
      rail.scrollBy({ left: dir * step, behavior: 'smooth' });
    };
    const prevHandler = () => prevBtn && onArrowClick(prevBtn);
    const nextHandler = () => nextBtn && onArrowClick(nextBtn);
    prevBtn?.addEventListener('click', prevHandler);
    nextBtn?.addEventListener('click', nextHandler);

    return () => {
      rail.removeEventListener('scroll', onRailScroll);
      window.removeEventListener('resize', onRailScroll);
      prevBtn?.removeEventListener('click', prevHandler);
      nextBtn?.removeEventListener('click', nextHandler);
    };
  }, [railRef]);
}
