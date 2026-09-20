'use client';

import { useEffect } from 'react';

/**
 * Vision page "Contents" tick-rail: scroll-spy that highlights the active
 * section link, plus touch handling to collapse the hover-expanded rail
 * on outside tap/scroll. Ports the `#vIndex` logic from js/nav.js.
 */
export function useVisionIndex() {
  useEffect(() => {
    const vIndex = document.getElementById('vIndex');
    if (!vIndex || !('IntersectionObserver' in window)) return;

    const vLinks = Array.from(vIndex.querySelectorAll<HTMLAnchorElement>('a'));
    const vMap = new Map<string, HTMLAnchorElement>();
    const vSecs: HTMLElement[] = [];
    vLinks.forEach((a) => {
      const id = (a.getAttribute('href') || '').slice(1);
      const sec = id && document.getElementById(id);
      if (sec) {
        vMap.set(id, a);
        vSecs.push(sec);
      }
    });

    let spy: IntersectionObserver | undefined;
    if (vSecs.length) {
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            vLinks.forEach((l) => {
              l.classList.remove('on');
              l.removeAttribute('aria-current');
            });
            const a = vMap.get(entry.target.id);
            if (a) {
              a.classList.add('on');
              a.setAttribute('aria-current', 'true');
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
      );
      vSecs.forEach((s) => spy!.observe(s));
    }

    let onClick: ((e: MouseEvent) => void) | undefined;
    let onTouchScroll: (() => void) | undefined;
    if (window.matchMedia('(hover: none)').matches) {
      const indexEngaged = () => {
        if (vIndex.contains(document.activeElement)) return true;
        try {
          return vIndex.matches(':hover');
        } catch {
          return false;
        }
      };
      const collapseIndex = () => {
        if (vIndex.contains(document.activeElement)) (document.activeElement as HTMLElement)?.blur();
        vIndex.style.pointerEvents = 'none';
        requestAnimationFrame(() => {
          vIndex.style.pointerEvents = '';
        });
      };
      onClick = (e: MouseEvent) => {
        if (!vIndex.contains(e.target as Node) && indexEngaged()) collapseIndex();
      };
      onTouchScroll = () => {
        if (indexEngaged()) collapseIndex();
      };
      document.addEventListener('click', onClick);
      window.addEventListener('scroll', onTouchScroll, { passive: true });
    }

    return () => {
      spy?.disconnect();
      if (onClick) document.removeEventListener('click', onClick);
      if (onTouchScroll) window.removeEventListener('scroll', onTouchScroll);
    };
  }, []);
}
