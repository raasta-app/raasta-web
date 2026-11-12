'use client';

import { useEffect } from 'react';

export function usePauseOffscreen(selector: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle('is-off', !e.isIntersecting);
      },
      { rootMargin: '200px 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}
