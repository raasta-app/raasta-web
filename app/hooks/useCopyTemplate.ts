'use client';

import { useEffect } from 'react';

/** Careers "copy application template" button. Ports js/nav.js's copy logic. */
export function useCopyTemplate() {
  useEffect(() => {
    const copyBtn = document.getElementById('copyTemplate');
    const tplText = document.getElementById('templateText');
    if (!copyBtn || !tplText) return;

    const copyLabel = copyBtn.querySelector<HTMLElement>('.tpl-copy-text');
    let copyTimer: ReturnType<typeof setTimeout>;
    const markCopied = () => {
      copyBtn.classList.add('is-copied');
      if (copyLabel) copyLabel.textContent = 'Copied';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        if (copyLabel) copyLabel.textContent = 'Copy';
      }, 2000);
    };
    const legacyCopy = (text: string) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        markCopied();
      } catch {
        /* no-op */
      }
    };
    const onClick = () => {
      const text = (tplText.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(markCopied, () => legacyCopy(text));
      } else {
        legacyCopy(text);
      }
    };
    copyBtn.addEventListener('click', onClick);
    return () => copyBtn.removeEventListener('click', onClick);
  }, []);
}
