'use client';

import { useEffect, useId, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const WL_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw4SP9D2noh9YTu0wglOjO9a0YWCNn7FHXEtwmm5SWJR1Fux0JayOW1F-_0wadRc7Kt/exec';
const KEY = 'raasta_waitlist';
const REF_KEY = 'raasta_ref_by';

interface StoredSignup {
  name: string;
  email: string;
  heard: string;
}

const stored = (): StoredSignup[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') || [];
  } catch {
    return [];
  }
};

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

const valid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

const shareText = (link: string) =>
  `I just joined the waitlist for Raasta, the complete trip guide for India. Join with my link: ${link}`;

type Status = 'idle' | 'sending' | 'done';

export default function WaitlistForm({ variant, inputId }: { variant: 'hero' | 'foot'; inputId?: string }) {
  const autoId = useId();
  const id = inputId ?? `wl-${autoId}`;
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadedAt] = useState(() => Date.now());

  useEffect(() => {
    const r = new URLSearchParams(location.search).get('ref');
    if (r) {
      try {
        localStorage.setItem(REF_KEY, r.trim().slice(0, 16));
      } catch {
      }
    }
  }, []);

  const site = () =>
    location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? location.origin : 'https://raasta.app';

  const finish = (addr: string) => {
    setLink(`${site()}/?ref=${refCode(addr)}`);
    setEmail(addr);
    setStatus('done');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (company.trim()) {
      finish(email.trim());
      return;
    }
    const addr = email.trim();
    if (!addr) return setError('Please enter your email.');
    if (!valid(addr)) return setError("That doesn't look like a valid email.");
    if (Date.now() - loadedAt < 1500) return setError('Just a moment, please try again.');

    if (stored().some((r) => r.email === addr.toLowerCase())) {
      finish(addr);
      return;
    }

    const payload = {
      name: '',
      email: addr,
      heard: '',
      code: refCode(addr),
      referredBy: referredBy(),
      company: '',
      ts: new Date().toISOString(),
      source: location.href,
      ref: document.referrer,
    };

    setStatus('sending');
    try {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log('[raasta] local test — signup NOT sent to Sheet:', payload);
      } else {
        await fetch(WL_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
      return;
    }

    try {
      localStorage.setItem(KEY, JSON.stringify([...stored(), { name: '', email: addr.toLowerCase(), heard: '' }]));
    } catch {
    }
    finish(addr);
    window.gtag?.('event', 'waitlist_signup', { method: variant, referred: referredBy() ? 'yes' : 'no' });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
    window.gtag?.('event', 'waitlist_share', { method: 'copy' });
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Raasta', text: shareText('').trim(), url: link });
        window.gtag?.('event', 'waitlist_share', { method: 'native' });
      } catch {
      }
    } else {
      copy();
    }
  };

  if (status === 'done') {
    return (
      <div className={`wl wl--${variant} wl--done`} role="status">
        <p className="wl-done-head">
          <span className="wl-tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            You&apos;re on the list. We&apos;ll write to <b>{email}</b> at launch.
          </span>
        </p>
        <div className="wl-ref">
          <button type="button" className={`wl-ref-link${copied ? ' is-copied' : ''}`} onClick={copy} aria-label="Copy your referral link">
            <span className="wl-ref-url">{link.replace(/^https?:\/\/(www\.)?/, '')}</span>
            <span className="wl-ref-copy">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <a
            className="wl-ref-btn wl-ref-wa"
            href={`https://wa.me/?text=${encodeURIComponent(shareText(link))}`}
            target="_blank"
            rel="noopener"
            onClick={() => window.gtag?.('event', 'waitlist_share', { method: 'whatsapp' })}
          >
            WhatsApp
          </a>
          <button type="button" className="wl-ref-btn" onClick={share}>
            Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`wl wl--${variant}`} onSubmit={submit} noValidate>
      <div className="wl-hp" aria-hidden="true">
        <label htmlFor={`${id}-co`}>Company (leave this empty)</label>
        <input type="text" id={`${id}-co`} tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className={`wl-pill${error ? ' has-err' : ''}`}>
        <label className="sr-only" htmlFor={id}>
          Your email
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          aria-invalid={!!error}
          aria-describedby={`${id}-note`}
        />
        <button type="submit" className={`btn btn-dark${status === 'sending' ? ' is-loading' : ''}`} disabled={status === 'sending'}>
          {status === 'sending' ? 'Joining' : 'Join the waitlist'}
        </button>
      </div>
      <p className={`wl-note${error ? ' is-err' : ''}`} id={`${id}-note`} aria-live="polite">
        {error || (variant === 'hero' ? 'Free to join. No spam, just launch news.' : 'One email when we launch. Nothing else.')}
      </p>
    </form>
  );
}
