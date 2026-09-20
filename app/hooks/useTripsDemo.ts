'use client';

import { useEffect } from 'react';

/**
 * Trips & journeys interactive demo: clicking a row cross-fades the phone
 * photo, updates the detail card, and auto-advances via the `tjFill` CSS
 * animation on the selected row's progress bar. Ports the `.tj-list`
 * logic from js/script.js.
 */
export function useTripsDemo() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tjList = document.querySelector<HTMLElement>('.tj-list');
    const tjDetail = document.querySelector<HTMLElement>('.tj-detail');
    if (!tjList || !tjDetail) return;

    const nameEl = tjDetail.querySelector<HTMLElement>('.tj-detail-name');
    const routeEl = tjDetail.querySelector<HTMLElement>('.tj-route-line');
    const metaEl = tjDetail.querySelector<HTMLElement>('.tj-meta');

    const rows = Array.from(tjList.querySelectorAll<HTMLButtonElement>('.tj-row'));
    rows.forEach((r) => {
      if (r.dataset.img) {
        const im = new Image();
        im.src = r.dataset.img;
      }
    });

    const layers = Array.from(document.querySelectorAll<HTMLImageElement>('.tj-photo-img'));
    let front = layers.find((l) => l.classList.contains('is-shown')) || layers[0];

    const swapImg = (src?: string) => {
      if (!src || layers.length < 2 || !front || front.getAttribute('src') === src) return;
      const back = layers[0] === front ? layers[1] : layers[0];
      if (!back) return;
      const show = () => {
        back.removeEventListener('load', show);
        back.classList.add('is-shown');
        front?.classList.remove('is-shown');
        front = back;
      };
      if (back.getAttribute('src') === src) {
        back.complete ? show() : back.addEventListener('load', show);
        return;
      }
      back.addEventListener('load', show);
      back.onerror = () => back.removeEventListener('load', show);
      back.src = src;
    };

    const selectRow = (row: HTMLButtonElement) => {
      if (row.classList.contains('is-sel')) return;
      rows.forEach((r) => {
        r.classList.remove('is-sel');
        r.setAttribute('aria-pressed', 'false');
      });
      row.classList.add('is-sel');
      row.setAttribute('aria-pressed', 'true');
      if (nameEl && row.dataset.name) nameEl.textContent = row.dataset.name;
      if (routeEl && row.dataset.route) {
        routeEl.textContent = row.dataset.route + ' ';
        if (row.dataset.more) {
          const more = document.createElement('span');
          more.className = 'more';
          more.textContent = row.dataset.more;
          routeEl.appendChild(more);
        }
      }
      if (metaEl && row.dataset.meta) metaEl.textContent = row.dataset.meta;
      swapImg(row.dataset.img);
      tjDetail.classList.remove('swapping');
      void tjDetail.offsetWidth;
      tjDetail.classList.add('swapping');
    };

    const onClick = (e: MouseEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLButtonElement>('.tj-row');
      if (row && tjList.contains(row)) selectRow(row);
    };
    tjList.addEventListener('click', onClick);

    const onAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName !== 'tjFill') return;
      const cur = rows.findIndex((r) => r.classList.contains('is-sel'));
      const next = rows[(cur + 1) % rows.length];
      if (next) selectRow(next);
    };
    if (!reduceMotion && rows.length > 1) {
      tjList.addEventListener('animationend', onAnimationEnd);
    }

    return () => {
      tjList.removeEventListener('click', onClick);
      tjList.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);
}
