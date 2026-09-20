'use client';

import { useEffect } from 'react';

/**
 * Single-open FAQ accordion using native `<details>` + WAAPI height
 * animation. Ports the accordion logic from js/script.js.
 */
export function useFaqAccordion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('.faq-item'));
    if (!items.length) return;

    const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';
    const EASE_IO = 'cubic-bezier(.4,0,.2,1)';

    const animateOpen = (item: HTMLDetailsElement) => {
      const ans = item.querySelector<HTMLElement>('.faq-a');
      if (!ans || reduceMotion || !ans.animate) return;
      ans.getAnimations?.().forEach((a) => a.cancel());
      ans.style.height = '0px';
      const h = ans.scrollHeight;
      const anim = ans.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], {
        duration: 340,
        easing: EASE_OUT,
      });
      anim.onfinish = () => {
        ans.style.height = '';
      };
    };

    const animateClose = (item: HTMLDetailsElement) => {
      const ans = item.querySelector<HTMLElement>('.faq-a');
      item.classList.remove('faq-open');
      if (!ans || reduceMotion || !ans.animate) {
        item.open = false;
        return;
      }
      ans.getAnimations?.().forEach((a) => a.cancel());
      const h = ans.scrollHeight;
      const anim = ans.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], {
        duration: 260,
        easing: EASE_IO,
      });
      anim.onfinish = () => {
        item.open = false;
        ans.style.height = '';
      };
    };

    const summaryHandlers = new Map<HTMLDetailsElement, (e: Event) => void>();
    const toggleHandlers = new Map<HTMLDetailsElement, () => void>();

    items.forEach((item) => {
      const summary = item.querySelector('summary');
      if (!summary) return;
      const onSummaryClick = (e: Event) => {
        if (item.open) {
          e.preventDefault();
          animateClose(item);
        }
      };
      const onToggle = () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item && other.open) animateClose(other);
          });
          item.classList.add('faq-open');
          animateOpen(item);
        } else {
          item.classList.remove('faq-open');
        }
      };
      summary.addEventListener('click', onSummaryClick);
      item.addEventListener('toggle', onToggle);
      summaryHandlers.set(item, onSummaryClick);
      toggleHandlers.set(item, onToggle);
    });

    return () => {
      items.forEach((item) => {
        const summary = item.querySelector('summary');
        const sHandler = summaryHandlers.get(item);
        const tHandler = toggleHandlers.get(item);
        if (summary && sHandler) summary.removeEventListener('click', sHandler);
        if (tHandler) item.removeEventListener('toggle', tHandler);
      });
    };
  }, []);
}
