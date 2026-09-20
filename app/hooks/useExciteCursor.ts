'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Cursor-follow "Excited? So are we." pill over destination cards
 * (pointer devices only). Ports `exciteCursor` from js/script.js.
 */
export function useExciteCursor(gridRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'excite-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<div class="excite-cursor__pill"><span class="excite-cursor__inner">Excited? So are we.</span></div>';
    document.body.appendChild(cursor);
    document.body.classList.add('excite-on');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const inner = cursor.querySelector<HTMLElement>('.excite-cursor__inner');
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      tilt = 0,
      lastMx = 0;
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    function loop() {
      const ease = reduce ? 1 : 0.2;
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      if (!reduce && inner) {
        const target = Math.max(-12, Math.min(12, (mx - lastMx) * 0.6));
        tilt += (target - tilt) * 0.15;
        inner.style.transform = `rotate(${tilt.toFixed(2)}deg)`;
      }
      lastMx = mx;
      raf = requestAnimationFrame(loop);
    }

    function show() {
      if (active) return;
      active = true;
      cx = mx;
      cy = my;
      lastMx = mx;
      cursor.classList.add('is-visible');
      if (!raf) loop();
    }
    function hide() {
      if (!active) return;
      active = false;
      cursor.classList.remove('is-visible');
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const onPointerOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.dest-card')) show();
    };
    const onPointerOut = (e: PointerEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to || !to.closest?.('.dest-card')) hide();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    grid.addEventListener('pointerover', onPointerOver);
    grid.addEventListener('pointerout', onPointerOut);
    grid.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);

    return () => {
      window.removeEventListener('mousemove', onMove);
      grid.removeEventListener('pointerover', onPointerOver);
      grid.removeEventListener('pointerout', onPointerOut);
      grid.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(raf);
      document.body.classList.remove('excite-on');
      cursor.remove();
    };
  }, [gridRef]);
}
