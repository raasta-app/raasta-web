'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared mobile nav-burger + full-screen menu behaviour.
 * Mirrors the mobile menu logic in js/script.js and js/nav.js:
 * toggles `.open`/`.is-open`/`.menu-open` classes, locks body scroll,
 * closes on link click or Escape.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const setMenu = useCallback((next: boolean) => {
    setOpen(next);
    document.body.classList.toggle('menu-lock', next);
  }, []);

  const toggle = useCallback(() => setMenu(!open), [open, setMenu]);
  const close = useCallback(() => setMenu(false), [setMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setMenu]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-lock');
    };
  }, []);

  return { open, toggle, close, navRef };
}
