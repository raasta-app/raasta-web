'use client';

import { useEffect } from 'react';

/**
 * Replaces the native "How did you hear about us?" `<select>` with a
 * popover listbox on non-Apple platforms (Apple keeps its native picker).
 * Ports `customSelect` from js/script.js.
 */
export function useCustomSelect() {
  useEffect(() => {
    const sel = document.getElementById('wlHeard') as HTMLSelectElement | null;
    if (!sel) return;

    const ua = navigator.userAgent;
    const plat = navigator.platform || '';
    const isApple = /iPhone|iPad|iPod|Mac/.test(ua) || /iPhone|iPad|iPod|Mac/.test(plat);
    if (isApple) return;

    const wrap = sel.closest<HTMLElement>('.wl-selectwrap');
    if (!wrap) return;
    wrap.classList.add('wl-cs');
    sel.classList.add('wl-cs-native-hidden');
    sel.setAttribute('tabindex', '-1');
    sel.setAttribute('aria-hidden', 'true');

    const label = wrap.parentElement?.querySelector<HTMLElement>('.wl-label');
    label?.removeAttribute('for');

    const options = Array.from(sel.options);
    const placeholder = options.find((o) => o.value === '');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wl-cs-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'How did you hear about us?');
    const lbl = document.createElement('span');
    const chev = document.createElement('span');
    chev.className = 'wl-cs-chev';
    chev.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
    btn.append(lbl, chev);

    const menu = document.createElement('div');
    menu.className = 'wl-cs-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'How did you hear about us?');
    options
      .filter((o) => o.value !== '')
      .forEach((o) => {
        const item = document.createElement('div');
        item.className = 'wl-cs-opt';
        item.setAttribute('role', 'option');
        item.dataset.value = o.value;
        item.innerHTML =
          '<span>' +
          o.textContent +
          '</span>' +
          '<span class="wl-cs-check"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>';
        item.addEventListener('click', () => {
          choose(o.value);
          close();
          btn.focus();
        });
        menu.appendChild(item);
      });

    wrap.append(btn, menu);

    function render() {
      const v = sel!.value;
      const cur = options.find((o) => o.value === v);
      lbl.textContent = v && cur ? cur.textContent : placeholder ? placeholder.textContent : 'Select an option';
      btn.classList.toggle('is-placeholder', !v);
      menu.querySelectorAll('.wl-cs-opt').forEach((el) => el.classList.toggle('sel', (el as HTMLElement).dataset.value === v));
    }
    function choose(v: string) {
      sel!.value = v;
      sel!.dispatchEvent(new Event('change', { bubbles: true }));
      render();
    }
    function open() {
      wrap!.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.addEventListener('pointerdown', onDoc, true);
      document.addEventListener('keydown', onKey);
    }
    function close() {
      wrap!.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('pointerdown', onDoc, true);
      document.removeEventListener('keydown', onKey);
    }
    function onDoc(e: Event) {
      if (!wrap!.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        btn.focus();
      }
    }

    const onBtnClick = () => (wrap.classList.contains('open') ? close() : open());
    btn.addEventListener('click', onBtnClick);
    render();

    return () => {
      btn.removeEventListener('click', onBtnClick);
      document.removeEventListener('pointerdown', onDoc, true);
      document.removeEventListener('keydown', onKey);
      btn.remove();
      menu.remove();
      wrap.classList.remove('wl-cs', 'open');
      sel.classList.remove('wl-cs-native-hidden');
      sel.removeAttribute('tabindex');
      sel.removeAttribute('aria-hidden');
      label?.setAttribute('for', 'wlHeard');
    };
  }, []);
}
