'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import BadgeArt from './BadgeArt';
import { BADGE_NAME, SITE_HOST, SITE_URL, withArticle } from '@/lib/site';

const WL_ENDPOINT = 'https://api.web3forms.com/submit';
const WL_ACCESS_KEY = '117d4c49-20f2-4aba-94ff-e3c36ceaa65e';
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
  `I just joined Raasta, an app for offbeat places in India with real costs and the best time to go. Join the waitlist: ${link}`;

type Status = 'idle' | 'sending' | 'done';

const WA_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm0 16a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.2 7.2 0 1 1 12 19.2Zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.9-2.6c-.2-.4.2-.3.6-1.1.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9c0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.3-.6 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.2Z" />
  </svg>
);

export default function WaitlistForm({ variant, inputId }: { variant: 'hero' | 'foot'; inputId?: string }) {
  const autoId = useId();
  const id = inputId ?? `wl-${autoId}`;
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [already, setAlready] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadedAt] = useState(() => Date.now());
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastH = useRef(0);
  const refocus = useRef(false);

  useEffect(() => {
    const r = new URLSearchParams(location.search).get('ref');
    if (r) {
      try {
        localStorage.setItem(REF_KEY, r.trim().slice(0, 16));
      } catch {
      }
    }
  }, []);

  const done = status === 'done';

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const from = lastH.current;
    const to = box.scrollHeight;
    lastH.current = to;
    if (!from || from === to) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const layer = box.closest<HTMLElement>('.hero-layer');
    const title = layer?.querySelector<HTMLElement>('.hero-title');
    let shift = 0;
    if (layer && title) {
      box.style.transition = 'none';
      box.style.height = `${from}px`;
      const before = title.getBoundingClientRect().top;
      box.style.height = `${to}px`;
      shift = before - title.getBoundingClientRect().top;
      box.style.height = '';
      void box.offsetHeight;
      box.style.transition = '';
    }
    if (layer && Math.abs(shift) > 0.5) {
      const added = Number(layer.dataset.grow || 0) + shift;
      const base = layer.offsetHeight - Number(layer.dataset.grow || 0);
      layer.dataset.grow = String(added);
      layer.style.transition = still ? '' : 'min-height .35s var(--ease-out)';
      if (!still) {
        layer.style.minHeight = `${layer.offsetHeight}px`;
        void layer.offsetHeight;
      }
      layer.style.minHeight = Math.abs(added) < 2 ? '' : `${base + added}px`;
      if (Math.abs(added) < 2) delete layer.dataset.grow;
    }
    if (still) {
      if (layer && !done) {
        layer.style.minHeight = '';
        delete layer.dataset.grow;
      }
      return;
    }
    box.style.height = `${from}px`;
    void box.offsetHeight;
    box.style.height = `${to}px`;
    const clear = () => {
      box.style.height = '';
      lastH.current = box.scrollHeight;
      if (layer && !done) {
        layer.style.minHeight = '';
        layer.style.transition = '';
        delete layer.dataset.grow;
      }
    };
    const t = window.setTimeout(clear, 380);
    return () => window.clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (!done && refocus.current) {
      refocus.current = false;
      inputRef.current?.focus();
    }
  }, [done]);

  const link = `${SITE_URL}/?ref=${refCode(email)}`;
  const shortLink = `${SITE_HOST}/?ref=${refCode(email)}`;

  const finish = (addr: string, wasThere: boolean) => {
    if (boxRef.current) lastH.current = boxRef.current.offsetHeight;
    setEmail(addr);
    setAlready(wasThere);
    setStatus('done');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const addr = email.trim().toLowerCase();
    if (company.trim()) {
      finish(addr, false);
      return;
    }
    if (!addr) return setError('Please enter your email.');
    if (!valid(addr)) return setError("That doesn't look like a valid email.");
    if (Date.now() - loadedAt < 1500) return setError('Just a moment, please try again.');

    if (stored().some((r) => r.email === addr)) {
      finish(addr, true);
      return;
    }

    const code = refCode(addr);
    const invitedBy = referredBy();
    const payload = {
      access_key: WL_ACCESS_KEY,
      subject: invitedBy ? `New waitlist signup (invited by ${invitedBy})` : 'New waitlist signup',
      from_name: 'Raasta waitlist',
      email: addr,
      invite_code: code,
      invited_by: invitedBy || 'none',
      form: variant === 'hero' ? 'Top of page' : 'Bottom of page',
      page: location.href,
      came_from: document.referrer || 'direct',
      signed_up_at: new Date().toISOString(),
    };

    setStatus('sending');
    try {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.info('Waitlist signup (not sent from localhost):', payload);
      } else {
        const res = await fetch(WL_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
        if (!res.ok || !data?.success) throw new Error('rejected');
      }
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
      return;
    }

    try {
      localStorage.setItem(KEY, JSON.stringify([...stored(), { name: '', email: addr, heard: '' }]));
    } catch {
    }
    finish(addr, false);
    window.gtag?.('event', 'waitlist_signup', { method: variant, referred: referredBy() ? 'yes' : 'no' });
  };

  const restart = () => {
    if (boxRef.current) lastH.current = boxRef.current.offsetHeight;
    refocus.current = true;
    setEmail('');
    setAlready(false);
    setCopied(false);
    setStatus('idle');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    window.gtag?.('event', 'waitlist_share', { method: 'copy' });
  };

  return (
    <div className={`wl wl--${variant}${done ? ' wl--done' : ''}`} ref={boxRef}>
      {done && variant === 'foot' ? (
        <div className="wl-done" role="status">
          <div className="wl-done-badge">
            <BadgeArt />
          </div>
          <p className="wl-done-h">{already ? 'You’re already in.' : 'You’re in.'}</p>
          <p className="wl-step wl-done-p" style={{ ['--i' as string]: 1 }}>
            Sign up with <b>{email}</b> when we launch and the {BADGE_NAME} is yours.{' '}
            <button type="button" className="wl-redo" onClick={restart}>
              Not you?
            </button>
          </p>
          <div className="wl-step wl-done-share" style={{ ['--i' as string]: 2 }}>
            <a
              className="wl-wa"
              href={`https://wa.me/?text=${encodeURIComponent(shareText(link))}`}
              target="_blank"
              rel="noopener"
              onClick={() => window.gtag?.('event', 'waitlist_share', { method: 'whatsapp' })}
            >
              {WA_ICON}
              Share on WhatsApp
            </a>
            <button type="button" className="wl-copy" onClick={copy}>
              {copied ? 'Copied' : 'Copy invite link'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Link copied' : ''}
            </span>
          </div>
        </div>
      ) : done ? (
        <div className="wl-card" role="status">
          <p className="wl-title">
            <span className="wl-check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12.5 10 16.5 18 8" pathLength={1} />
              </svg>
            </span>
            {already ? 'You’re already in.' : 'You’re in.'}
          </p>
          <p className="wl-step wl-body" style={{ ['--i' as string]: 1 }}>
            When Raasta is ready to download, sign up with the same email, <b>{email}</b>, and
            you&rsquo;ll get {withArticle(BADGE_NAME)} on your profile.
          </p>
          <button type="button" className="wl-step wl-redo" style={{ ['--i' as string]: 1 }} onClick={restart}>
            Wrong email?
          </button>
          <div className="wl-step wl-badge" style={{ ['--i' as string]: 2 }}>
            <BadgeArt />
          </div>
          <div className="wl-step wl-share" style={{ ['--i' as string]: 3 }}>
            <p>Know someone who&rsquo;d love this? Send them the link.</p>
            <a
              className="wl-wa"
              href={`https://wa.me/?text=${encodeURIComponent(shareText(link))}`}
              target="_blank"
              rel="noopener"
              onClick={() => window.gtag?.('event', 'waitlist_share', { method: 'whatsapp' })}
            >
              {WA_ICON}
              Share on WhatsApp
            </a>
            <div className="wl-link">
              <span className="wl-link-url">{shortLink}</span>
              <button type="button" className="wl-link-btn" onClick={copy}>
                {copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Link copied' : ''}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="wl-hp" aria-hidden="true">
            <label htmlFor={`${id}-co`}>Company (leave this empty)</label>
            <input type="text" id={`${id}-co`} tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className={`wl-pill${error ? ' has-err' : ''}`}>
            <label className="sr-only" htmlFor={id}>
              Your email
            </label>
            <input
              ref={inputRef}
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
            {error || (variant === 'hero' ? 'Free to join. No spam, just launch news.' : 'One email when we launch. No spam, we promise.')}
          </p>
        </form>
      )}
    </div>
  );
}
