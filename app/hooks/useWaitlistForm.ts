'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface StoredSignup {
  name: string;
  email: string;
  heard: string;
}

/**
 * Waitlist form: POSTs to the Google Apps Script endpoint (WL_ENDPOINT),
 * dedupes/greets returning visitors via localStorage, generates a stable
 * djb2-hash referral code + link, wires the share buttons (copy /
 * WhatsApp / Instagram / native share), and reports GA4 events.
 * Ports the waitlist block from js/script.js verbatim in behaviour.
 */
export function useWaitlistForm() {
  useEffect(() => {
    const WL_ENDPOINT =
      'https://script.google.com/macros/s/AKfycbw4SP9D2noh9YTu0wglOjO9a0YWCNn7FHXEtwmm5SWJR1Fux0JayOW1F-_0wadRc7Kt/exec';

    const form = document.getElementById('wlForm') as HTMLFormElement | null;
    const input = document.getElementById('wlInput') as HTMLInputElement | null;
    const nameInput = document.getElementById('wlName') as HTMLInputElement | null;
    const heardSel = document.getElementById('wlHeard') as HTMLSelectElement | null;
    const hpInput = document.getElementById('wlCompany') as HTMLInputElement | null;
    const msg = document.getElementById('wlMsg');
    const btn = form?.querySelector<HTMLButtonElement>('button[type="submit"]') ?? null;
    const success = document.getElementById('wlSuccess');
    const echo = document.getElementById('wlEmailEcho');
    const refLinkEl = document.getElementById('wlRefLink');
    const copyBtn = document.getElementById('wlCopy');
    const igBtn = document.getElementById('wlIg');
    const waBtn = document.getElementById('wlWa') as HTMLAnchorElement | null;
    const nativeBtn = document.getElementById('wlNative');
    const hintEl = document.getElementById('wlShareHint');

    if (!form || !input || !nameInput || !heardSel || !msg || !success || !echo) return;

    const KEY = 'raasta_waitlist';
    const loadedAt = Date.now();

    const stored = (): StoredSignup[] => {
      try {
        return JSON.parse(localStorage.getItem(KEY) || '[]') || [];
      } catch {
        return [];
      }
    };
    const emails = () => stored().map((r) => r.email).filter(Boolean);

    const existing = stored();
    if (existing.length) {
      const last = existing[existing.length - 1];
      if (last) echo.textContent = last.email;
    }

    const REF_KEY = 'raasta_ref_by';
    const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const SITE = isLocal ? location.origin : 'https://raasta.app';

    const refCode = (email: string) => {
      let h = 5381;
      const s = email.toLowerCase();
      for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
      return h.toString(36).padStart(6, '0').slice(-6);
    };
    const referredBy = () => {
      try {
        return localStorage.getItem(REF_KEY) || '';
      } catch {
        return '';
      }
    };

    (function captureRef() {
      const r = new URLSearchParams(location.search).get('ref');
      if (r) {
        try {
          localStorage.setItem(REF_KEY, r.trim().slice(0, 16));
        } catch {
          /* no-op */
        }
      }
    })();

    const shareText = (link: string) =>
      'I just joined the waitlist for Raasta — an app that actually plans real trips across India 🇮🇳🏔️ Join with my link: ' + link;

    let currentLink = '';

    function showShare(code: string) {
      currentLink = SITE + '/?ref=' + code;
      if (refLinkEl) refLinkEl.textContent = currentLink.replace(/^https?:\/\//, '');
      if (waBtn) waBtn.href = 'https://wa.me/?text=' + encodeURIComponent(shareText(currentLink));
    }

    let hintTimer: ReturnType<typeof setTimeout>;
    const showHint = (text: string) => {
      if (!hintEl) return;
      hintEl.textContent = text;
      hintEl.hidden = false;
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => {
        hintEl.hidden = true;
      }, 4500);
    };

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(currentLink);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = currentLink;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch {
          /* no-op */
        }
        document.body.removeChild(ta);
      }
      if (copyBtn) {
        copyBtn.classList.add('copied');
        const l = copyBtn.querySelector<HTMLElement>('.wl-reflink-copy span');
        if (l) {
          l.textContent = 'Copied';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            l.textContent = 'Copy';
          }, 1800);
        }
      }
    };

    const onCopyClick = () => {
      copyLink();
      showHint('Link copied to clipboard');
      window.gtag?.('event', 'waitlist_share', { method: 'copy' });
    };
    copyBtn?.addEventListener('click', onCopyClick);

    const onWaClick = () => window.gtag?.('event', 'waitlist_share', { method: 'whatsapp' });
    waBtn?.addEventListener('click', onWaClick);

    const onIgClick = () => {
      copyLink();
      showHint('Link copied — paste it into your Instagram story, bio or DMs');
      window.gtag?.('event', 'waitlist_share', { method: 'instagram' });
      window.open('https://www.instagram.com/', '_blank', 'noopener');
    };
    igBtn?.addEventListener('click', onIgClick);

    const onNativeClick = async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: 'Raasta', text: shareText('').trim(), url: currentLink });
          window.gtag?.('event', 'waitlist_share', { method: 'native' });
        } catch {
          /* user cancelled */
        }
      } else {
        copyLink();
        showHint('Link copied to clipboard');
        window.gtag?.('event', 'waitlist_share', { method: 'copy' });
      }
    };
    nativeBtn?.addEventListener('click', onNativeClick);

    const valid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
    const btnLabel = btn ? btn.textContent : '';
    const setLoading = (on: boolean) => {
      if (!btn) return;
      btn.classList.toggle('is-loading', on);
      btn.disabled = on;
      btn.textContent = on ? 'Joining…' : btnLabel;
    };

    const send = (payload: Record<string, unknown>) => {
      if (!WL_ENDPOINT) return Promise.resolve();
      if (isLocal) {
        // eslint-disable-next-line no-console
        console.log('[raasta] local test — signup NOT sent to Sheet:', payload);
        return Promise.resolve();
      }
      return fetch(WL_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    };

    const onSubmit = async (e: Event) => {
      e.preventDefault();

      if (hpInput && hpInput.value.trim()) {
        form.style.display = 'none';
        success.classList.add('show');
        return;
      }

      if (Date.now() - loadedAt < 1500) {
        msg.textContent = 'Just a moment, please try again.';
        msg.classList.remove('ok');
        msg.classList.add('err');
        return;
      }

      const email = input.value.trim();
      const name = nameInput.value.trim();
      const heard = heardSel.value;
      input.classList.remove('err');
      nameInput.classList.remove('err');
      msg.classList.remove('err', 'ok');

      if (!name) {
        msg.textContent = 'Please enter your name.';
        msg.classList.add('err');
        nameInput.classList.add('err');
        nameInput.focus();
        return;
      }
      if (!email) {
        msg.textContent = 'Please enter your email.';
        msg.classList.add('err');
        input.classList.add('err');
        input.focus();
        return;
      }
      if (!valid(email)) {
        msg.textContent = "That doesn't look like a valid email.";
        msg.classList.add('err');
        input.classList.add('err');
        input.focus();
        return;
      }

      if (emails().includes(email.toLowerCase())) {
        showShare(refCode(email));
        echo.textContent = email;
        form.style.display = 'none';
        success.classList.add('show');
        return;
      }

      const myCode = refCode(email);
      const payload = {
        name,
        email,
        heard,
        code: myCode,
        referredBy: referredBy(),
        company: '',
        ts: new Date().toISOString(),
        source: location.href,
        ref: document.referrer,
      };

      setLoading(true);
      msg.textContent = '';
      try {
        await send(payload);
      } catch {
        setLoading(false);
        msg.textContent = 'Something went wrong. Please try again.';
        msg.classList.add('err');
        return;
      }
      setLoading(false);

      const list = stored();
      list.push({ name, email: email.toLowerCase(), heard });
      try {
        localStorage.setItem(KEY, JSON.stringify(list));
      } catch {
        /* no-op */
      }

      showShare(myCode);
      echo.textContent = email;
      form.style.display = 'none';
      success.classList.add('show');

      window.gtag?.('event', 'waitlist_signup', { method: heard || 'unspecified', referred: referredBy() ? 'yes' : 'no' });
    };

    form.addEventListener('submit', onSubmit);

    return () => {
      form.removeEventListener('submit', onSubmit);
      copyBtn?.removeEventListener('click', onCopyClick);
      waBtn?.removeEventListener('click', onWaClick);
      igBtn?.removeEventListener('click', onIgClick);
      nativeBtn?.removeEventListener('click', onNativeClick);
    };
  }, []);
}
