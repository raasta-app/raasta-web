'use client';

import { useEffect } from 'react';

/** Count-up stat numbers when their `.stat` container scrolls into view. */
export function useCountUp() {
  useEffect(() => {
    const fmt = (n: number) => n.toLocaleString('en-IN');
    function runCounter(node: HTMLElement) {
      const to = Number(node.dataset.to);
      const suffix = node.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      function step(now: number) {
        const p = Math.min((now - start) / dur, 1);
        node.textContent = fmt(Math.round(to * ease(p))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const stats = Array.from(document.querySelectorAll<HTMLElement>('#stats .stat'));
    if (!stats.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = entry.target.querySelector<HTMLElement>('.num');
            if (num) runCounter(num);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    stats.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
}
