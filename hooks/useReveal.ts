'use client';

import { useEffect } from 'react';

const BAND = 0.8;

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!els.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const sections = new Map<Element, HTMLElement[]>();
    for (const el of els) {
      const root = el.closest('section, header, footer') ?? document.body;
      const list = sections.get(root);
      if (list) list.push(el);
      else sections.set(root, [el]);
    }

    const reach = window.innerHeight * BAND;
    const bands = new Map<HTMLElement, HTMLElement[]>();

    for (const group of sections.values()) {
      const sorted = group
        .map((el) => ({ el, top: el.getBoundingClientRect().top }))
        .sort((a, b) => a.top - b.top);

      let lead: HTMLElement | null = null;
      let leadTop = 0;
      for (const { el, top } of sorted) {
        if (!lead || top - leadTop > reach) {
          lead = el;
          leadTop = top;
          bands.set(lead, [el]);
        } else {
          bands.get(lead)!.push(el);
        }
      }
    }

    const show = (lead: Element) => {
      for (const el of bands.get(lead as HTMLElement) ?? []) el.classList.add('in');
      bands.delete(lead as HTMLElement);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -18% 0px' },
    );

    for (const lead of Array.from(bands.keys())) {
      if (lead.getBoundingClientRect().top < window.innerHeight) show(lead);
      else obs.observe(lead);
    }
    return () => obs.disconnect();
  }, []);
}
