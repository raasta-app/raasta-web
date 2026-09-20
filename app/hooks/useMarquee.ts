'use client';

import { type RefObject, useEffect } from 'react';

/** Duplicates the marquee track content once for a seamless CSS loop. */
export function useMarquee(trackRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const track = trackRef.current;
    if (!track || reduceMotion) return;
    if (track.dataset.duplicated) return;
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
