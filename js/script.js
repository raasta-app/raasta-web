/* Raasta landing - nav, scroll FX, reveal, counters, marquee, waitlist */
(function () {
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nav = $('#nav');
  const bar = $('#progress');
  const hero = $('#home');
  const heroBg = $('#heroBg');
  const heroContent = $('#heroContent');
  const breakSec = $('.break-img');
  const breakBg = $('.break-bg');

  /* ---------- statement: split words for scroll highlight ---------- */
  const stEl = $('#statementText');
  let stWords = [];
  if (stEl) {
    const words = stEl.textContent.trim().split(/\s+/);
    stEl.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');
    stWords = $$('.w', stEl);
  }
  function highlightStatement() {
    if (!stWords.length) return;
    const r = stEl.getBoundingClientRect();
    const vh = window.innerHeight;
    let t = (vh * 0.82 - r.top) / (vh * 0.82 - vh * 0.30);
    t = Math.max(0, Math.min(1, t));
    const active = Math.round(t * stWords.length);
    for (let i = 0; i < stWords.length; i++) stWords[i].classList.toggle('on', i < active);
  }

  /* ---------- section parallax ---------- */
  // Drift by distance from viewport centre; skip .plan-demo below 900px.
  const smallScreen = window.matchMedia('(max-width: 900px)').matches;
  const parallaxEls = reduceMotion ? [] : $$('[data-parallax]').filter(el => !(smallScreen && el.classList.contains('plan-demo')));
  function runParallax(vh) {
    for (let i = 0; i < parallaxEls.length; i++) {
      const el = parallaxEls[i];
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) continue; // off-screen
      const speed = parseFloat(el.dataset.parallax) || 0;
      const shift = ((rect.top + rect.height / 2 - vh / 2) * -speed).toFixed(1);
      el.style.transform = `translate3d(0, ${shift}px, 0)`;
    }
  }

  // Break image parallax: measures the section (never transformed) to avoid
  // self-feedback. CSS overscan (-45%) covers edges as bg drifts up to 40%.
  function runBreakParallax(vh) {
    if (!breakBg || !breakSec || reduceMotion) return;
    const r = breakSec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return; // off-screen
    const H = r.height;
    let prog = (r.top + H / 2 - vh / 2) / (vh / 2 + H / 2); // +1 bottom, 0 centred, -1 top
    prog = prog < -1 ? -1 : prog > 1 ? 1 : prog;
    const shift = (-prog * H * 0.4).toFixed(1);
    breakBg.style.transform = `translate3d(0, ${shift}px, 0)`;
  }

  /* ---------- scroll: nav, progress, hero ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroH = hero ? hero.offsetHeight : window.innerHeight;

      // transparent over hero, solid past it
      const past = y > heroH - 120;
      if (nav) {
        nav.classList.toggle('scrolled', past);
        nav.classList.toggle('over-hero', !past);
      }

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      if (y < heroH) {
        if (!reduceMotion) {
          if (heroBg) heroBg.style.transform = `translateY(${y * 0.22}px)`;
          if (heroContent) heroContent.style.transform = `translateY(${y * 0.14}px)`;
        }
        if (heroContent) heroContent.style.opacity = String(Math.max(0, 1 - y / (heroH * 0.62)));
      }
      highlightStatement();
      runParallax(window.innerHeight);
      runBreakParallax(window.innerHeight);
      ticking = false;
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = $('#burger'), menu = $('#mobileMenu');
  if (burger && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('open', open);
      burger.classList.toggle('is-open', open);
      nav.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-lock', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
  }

  /* ---------- scroll reveal ---------- */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revObs.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
  const observeReveals = () => $$('.reveal').forEach(r => revObs.observe(r));

  /* ---------- trips: tap destination to update detail card ---------- */
  const tjList = $('.tj-list'), tjDetail = $('.tj-detail');
  if (tjList && tjDetail) {
    const nameEl = $('.tj-detail-name', tjDetail);
    const routeEl = $('.tj-route-line', tjDetail);
    const metaEl = $('.tj-meta', tjDetail);
    // preload photos so cross-fade starts instantly
    $$('.tj-row', tjList).forEach(r => { if (r.dataset.img) { const im = new Image(); im.src = r.dataset.img; } });
    // cross-fade two stacked layers; new photo takes over only once loaded, so
    // the image never blinks empty. Missing photo: current one stays.
    const tjLayers = $$('.tj-photo-img');
    let tjFront = tjLayers.find(l => l.classList.contains('is-shown')) || tjLayers[0];
    const swapImg = (src) => {
      if (!src || tjLayers.length < 2 || !tjFront || tjFront.getAttribute('src') === src) return;
      const back = (tjLayers[0] === tjFront) ? tjLayers[1] : tjLayers[0];
      const show = () => { back.removeEventListener('load', show); back.classList.add('is-shown'); tjFront.classList.remove('is-shown'); tjFront = back; };
      if (back.getAttribute('src') === src) { back.complete ? show() : back.addEventListener('load', show); return; }
      back.addEventListener('load', show);
      back.onerror = () => back.removeEventListener('load', show);
      back.src = src;
    };
    const selectRow = (row) => {
      if (row.classList.contains('is-sel')) return; // already showing
      $$('.tj-row', tjList).forEach(r => { r.classList.remove('is-sel'); r.setAttribute('aria-pressed', 'false'); });
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
      // restart swap animation
      tjDetail.classList.remove('swapping');
      void tjDetail.offsetWidth;
      tjDetail.classList.add('swapping');
    };
    tjList.addEventListener('click', (e) => {
      const row = e.target.closest('.tj-row');
      if (row && tjList.contains(row)) selectRow(row);
    });
    // auto-advance to next row when its progress bar fills (cycles)
    const tjRows = $$('.tj-row', tjList);
    if (!reduceMotion && tjRows.length > 1) {
      tjList.addEventListener('animationend', (e) => {
        if (e.animationName !== 'tjFill') return;
        const cur = tjRows.findIndex(r => r.classList.contains('is-sel'));
        selectRow(tjRows[(cur + 1) % tjRows.length]);
      });
    }
  }

  /* ---------- count-up stats ---------- */
  const fmt = (n) => n.toLocaleString('en-IN');
  function runCounter(node) {
    const to = +node.dataset.to, suffix = node.dataset.suffix || '';
    const dur = 1600, start = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      node.textContent = fmt(Math.round(to * ease(p))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { runCounter($('.num', en.target)); statObs.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('#stats .stat').forEach(s => statObs.observe(s));

  /* ---------- marquee: duplicate track for seamless loop ---------- */
  const track = $('#marqueeTrack');
  if (track && !reduceMotion) track.innerHTML += track.innerHTML;

  /* ---------- destinations rail: edge fade + arrow nav ---------- */
  const rail = $('.dest-grid');
  if (rail) {
    const prevBtn = $('.dest-arrow[data-dir="-1"]');
    const nextBtn = $('.dest-arrow[data-dir="1"]');
    const updateRail = () => {
      const rem = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;
      const t = Math.max(0, Math.min(1, rem / 140)); // 1 = plenty left, 0 = end
      const maxFade = window.matchMedia('(max-width: 560px)').matches ? 18 : 110; // feather width px
      rail.style.setProperty('--fade-w', (t * maxFade).toFixed(0) + 'px');
      if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = rem <= 2;
    };
    // throttle to one update per frame
    let railRaf = false;
    const onRailScroll = () => { if (railRaf) return; railRaf = true; requestAnimationFrame(() => { updateRail(); railRaf = false; }); };
    updateRail();
    rail.addEventListener('scroll', onRailScroll, { passive: true });
    window.addEventListener('resize', onRailScroll, { passive: true });
    [prevBtn, nextBtn].forEach(btn => btn && btn.addEventListener('click', () => {
      const card = rail.querySelector('.dest-card');
      const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.8;
      rail.scrollBy({ left: (+btn.dataset.dir) * step, behavior: 'smooth' });
    }));
  }

  /* ---------- features ---------- */
  // Lucide icons, inlined 24x24 stroke
  const ICONS = {
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
    luggage: '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 20v2"/><path d="M14 20v2"/>',
    train: '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>'
  };
  const FEATURES = [
    { ic:'compass',  t:'Scored for fit, not hype', d:'Every place is scored on weather, reach time, crowds and how well it fits your dates, never ranked by ad spend.' },
    { ic:'wallet',   t:'Real budgets, broken down', d:'All-in costs split across stay, food, transport and activities, so a trip never drifts past what you planned.' },
    { ic:'route',    t:'Multi-stop journeys',       d:'Curated routes mapped stop by stop: the order, distance, drive time and road conditions on every leg.' },
    { ic:'calendar', t:'Best time to go',           d:'Month-by-month seasonality for every place: what’s good right now, what’s better in winter, what’s just opening up.' },
    { ic:'luggage',  t:'Packing & care points',     d:'Exactly what to carry and what to watch (heat, altitude, fuel gaps, network blackouts), flagged before you leave.' },
    { ic:'train',    t:'Train or car, every leg',   d:'See how you’ll actually travel: train or road, with time and distance from your first stop to your last.' }
  ];
  const featGrid = $('#featGrid');
  if (featGrid) {
    FEATURES.forEach((f, i) => {
      const card = document.createElement('div');
      card.className = 'feat-card reveal';
      card.dataset.d = (i % 3);
      card.innerHTML = `
        <div class="feat-ic"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[f.ic]}</svg></div>
        <h3>${f.t}</h3>
        <p>${f.d}</p>`;
      featGrid.appendChild(card);
    });
  }

  /* ---------- FAQ: single-open accordion ----------
     Open rides the native <details> toggle; click is intercepted only to animate close. */
  const faqItems = $$('.faq-item');
  if (faqItems.length) {
    const EASE_OUT = 'cubic-bezier(.22,1,.36,1)', EASE_IO = 'cubic-bezier(.4,0,.2,1)';
    const animateOpen = (item) => {
      const ans = item.querySelector('.faq-a');
      if (reduceMotion || !ans.animate) return;
      ans.getAnimations && ans.getAnimations().forEach(a => a.cancel());
      ans.style.height = '0px';
      const h = ans.scrollHeight;
      const a = ans.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 340, easing: EASE_OUT });
      a.onfinish = () => { ans.style.height = ''; };
    };
    const animateClose = (item) => {
      const ans = item.querySelector('.faq-a');
      item.classList.remove('faq-open');
      if (reduceMotion || !ans.animate) { item.open = false; return; }
      ans.getAnimations && ans.getAnimations().forEach(a => a.cancel());
      const h = ans.scrollHeight;
      const a = ans.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 260, easing: EASE_IO });
      a.onfinish = () => { item.open = false; ans.style.height = ''; };
    };
    faqItems.forEach((item) => {
      item.querySelector('summary').addEventListener('click', (e) => {
        if (item.open) { e.preventDefault(); animateClose(item); } // animate close, native state follows
        // open: native toggle runs; 'toggle' handler animates in
      });
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach(o => { if (o !== item && o.open) animateClose(o); }); // close others
          item.classList.add('faq-open');
          animateOpen(item);
        } else {
          item.classList.remove('faq-open');
        }
      });
    });
  }

  observeReveals();

  /* ---------- waitlist ----------
     POST to Apps Script (WL_ENDPOINT) which appends to a Sheet.
     localStorage copy dedupes repeat signups and greets returning visitors. */
  const WL_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw4SP9D2noh9YTu0wglOjO9a0YWCNn7FHXEtwmm5SWJR1Fux0JayOW1F-_0wadRc7Kt/exec';

  const form = $('#wlForm'), input = $('#wlInput'), nameInput = $('#wlName'), heardSel = $('#wlHeard');
  const hpInput = $('#wlCompany'); // honeypot, hidden from humans; only bots fill it
  const msg = $('#wlMsg'), btn = form && $('button[type="submit"]', form);
  const success = $('#wlSuccess'), echo = $('#wlEmailEcho');
  const refLinkEl = $('#wlRefLink'), copyBtn = $('#wlCopy'), igBtn = $('#wlIg'), waBtn = $('#wlWa'), nativeBtn = $('#wlNative'), hintEl = $('#wlShareHint');
  const KEY = 'raasta_waitlist';
  const loadedAt = Date.now();    // reject instant (bot) submits

  const stored = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const emails = () => stored().map(r => (typeof r === 'string' ? r : r.email)).filter(Boolean);

  const existing = stored();
  if (existing.length) { const last = existing[existing.length - 1]; echo.textContent = typeof last === 'string' ? last : last.email; }

  /* ---- referral loop ----
     Stable code derived from email -> same share link every visit.
     Inbound ?ref= is stashed and sent back as `referredBy` for attribution. */
  const REF_KEY = 'raasta_ref_by';
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const SITE = isLocal ? location.origin : 'https://raasta.app';   // real domain in prod, localhost in dev

  const refCode = (email) => {                 // 6-char code, djb2 hash -> base36
    let h = 5381; const s = email.toLowerCase();
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36).padStart(6, '0').slice(-6);
  };
  const referredBy = () => { try { return localStorage.getItem(REF_KEY) || ''; } catch (e) { return ''; } };

  // capture inbound referral once so attribution survives navigation before signup
  (function captureRef() {
    const r = new URLSearchParams(location.search).get('ref');
    if (r) { try { localStorage.setItem(REF_KEY, r.trim().slice(0, 16)); } catch (e) {} }
  })();

  const shareText = (link) =>
    'I just joined the waitlist for Raasta — an app that actually plans real trips across India 🇮🇳🏔️ Join with my link: ' + link;

  let currentLink = '';   // active signup's referral link, used by copy + share

  // Populate share card; called on success and for returning visitors.
  function showShare(code) {
    currentLink = SITE + '/?ref=' + code;
    if (refLinkEl) refLinkEl.textContent = currentLink.replace(/^https?:\/\//, '');
    if (waBtn) waBtn.href = 'https://wa.me/?text=' + encodeURIComponent(shareText(currentLink));
  }

  let hintTimer;
  const showHint = (text) => {
    if (!hintEl) return;
    hintEl.textContent = text; hintEl.hidden = false;
    clearTimeout(hintTimer); hintTimer = setTimeout(() => { hintEl.hidden = true; }, 4500);
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(currentLink); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = currentLink;
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); } catch (e2) {} document.body.removeChild(ta);
    }
    if (copyBtn) {
      copyBtn.classList.add('copied');
      const l = copyBtn.querySelector('.wl-reflink-copy span');
      if (l) { l.textContent = 'Copied'; setTimeout(() => { copyBtn.classList.remove('copied'); l.textContent = 'Copy'; }, 1800); }
    }
  };

  // tap-to-copy link pill
  if (copyBtn) copyBtn.addEventListener('click', () => {
    copyLink(); showHint('Link copied to clipboard');
    if (window.gtag) gtag('event', 'waitlist_share', { method: 'copy' });
  });

  // WhatsApp: prefilled chat (href set in showShare)
  if (waBtn) waBtn.addEventListener('click', () => { if (window.gtag) gtag('event', 'waitlist_share', { method: 'whatsapp' }); });

  // Instagram has no share-with-text intent; copy link and open Instagram to paste
  if (igBtn) igBtn.addEventListener('click', () => {
    copyLink(); showHint('Link copied — paste it into your Instagram story, bio or DMs');
    if (window.gtag) gtag('event', 'waitlist_share', { method: 'instagram' });
    window.open('https://www.instagram.com/', '_blank', 'noopener');
  });

  // native OS share sheet on mobile; copy as fallback
  if (nativeBtn) nativeBtn.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Raasta', text: shareText('').trim(), url: currentLink }); if (window.gtag) gtag('event', 'waitlist_share', { method: 'native' }); } catch (e) {}
    } else {
      copyLink(); showHint('Link copied to clipboard');
      if (window.gtag) gtag('event', 'waitlist_share', { method: 'copy' });
    }
  });

  const valid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  const btnLabel = btn ? btn.textContent : '';
  const setLoading = (on) => {
    if (!btn) return;
    btn.classList.toggle('is-loading', on);
    btn.disabled = on;
    btn.textContent = on ? 'Joining…' : btnLabel;
  };

  // POST to the Sheet; no-cors avoids preflight, treat non-throw as sent
  const send = (payload) => {
    if (!WL_ENDPOINT) return Promise.resolve();
    // local: don't write to live Sheet, just log
    if (isLocal) { console.log('[raasta] local test — signup NOT sent to Sheet:', payload); return Promise.resolve(); }
    return fetch(WL_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // spam trap 1: honeypot. #wlCompany is hidden; if filled, fake success and drop
    if (hpInput && hpInput.value.trim()) { form.style.display = 'none'; success.classList.add('show'); return; }

    // spam trap 2: reject submits under 1.5s (bots post instantly)
    if (Date.now() - loadedAt < 1500) { msg.textContent = 'Just a moment, please try again.'; msg.classList.remove('ok'); msg.classList.add('err'); return; }

    const email = input.value.trim();
    const name = nameInput.value.trim();
    const heard = heardSel.value;
    input.classList.remove('err'); nameInput.classList.remove('err'); msg.classList.remove('err', 'ok');

    if (!name) { msg.textContent = 'Please enter your name.'; msg.classList.add('err'); nameInput.classList.add('err'); nameInput.focus(); return; }
    if (!email) { msg.textContent = 'Please enter your email.'; msg.classList.add('err'); input.classList.add('err'); input.focus(); return; }
    if (!valid(email)) { msg.textContent = 'That doesn\'t look like a valid email.'; msg.classList.add('err'); input.classList.add('err'); input.focus(); return; }

    // already joined this browser: skip re-send, show share link
    if (emails().includes(email.toLowerCase())) {
      showShare(refCode(email));
      echo.textContent = email; form.style.display = 'none'; success.classList.add('show');
      return;
    }

    const myCode = refCode(email);
    const payload = { name, email, heard, code: myCode, referredBy: referredBy(), company: '', ts: new Date().toISOString(), source: location.href, ref: document.referrer };

    setLoading(true);
    msg.textContent = '';
    try {
      await send(payload);
    } catch (err) {
      setLoading(false);
      msg.textContent = 'Something went wrong. Please try again.';
      msg.classList.add('err');
      return;
    }
    setLoading(false);

    const list = stored();
    list.push({ name, email: email.toLowerCase(), heard });
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}

    showShare(myCode);
    echo.textContent = email;
    form.style.display = 'none';
    success.classList.add('show');

    // GA4 conversion: only on genuine new signup (skips bots/dupes/errors)
    if (window.gtag) gtag('event', 'waitlist_signup', { method: heard || 'unspecified', referred: referredBy() ? 'yes' : 'no' });
  });

  /* ---------- destinations: "Excited? So are we." follow-cursor ---------- */
  (function exciteCursor() {
    const grid = $('.dest-grid');
    if (!grid) return;
    // pointer-only: skip touch devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'excite-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<div class="excite-cursor__pill"><span class="excite-cursor__inner">Excited? So are we.</span></div>';
    document.body.appendChild(cursor);
    document.body.classList.add('excite-on'); // hides native cursor on cards

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const inner = cursor.querySelector('.excite-cursor__inner');
    let mx = 0, my = 0, cx = 0, cy = 0, tilt = 0, lastMx = 0;
    let active = false, raf = 0;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    function loop() {
      const ease = reduce ? 1 : 0.2;
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;
      cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      if (!reduce) {
        const target = Math.max(-12, Math.min(12, (mx - lastMx) * 0.6)); // lean with velocity
        tilt += (target - tilt) * 0.15;
        inner.style.transform = 'rotate(' + tilt.toFixed(2) + 'deg)';
      }
      lastMx = mx;
      raf = requestAnimationFrame(loop);
    }

    function show() {
      if (active) return;
      active = true;
      cx = mx; cy = my; lastMx = mx;        // pop in at pointer, no slide from 0,0
      cursor.classList.add('is-visible');
      if (!raf) loop();
    }
    function hide() {
      if (!active) return;
      active = false;
      cursor.classList.remove('is-visible');
      cancelAnimationFrame(raf); raf = 0;
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    grid.addEventListener('pointerover', (e) => { if (e.target.closest('.dest-card')) show(); });
    grid.addEventListener('pointerout', (e) => {
      const to = e.relatedTarget;
      if (!to || !(to.closest && to.closest('.dest-card'))) hide();
    });
    grid.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
  })();
})();

/* ---------- custom dropdown for "How did you hear about us?" ----------
   Apple keeps native picker; others get a popover synced to the <select>. */
(function customSelect() {
  const sel = document.getElementById('wlHeard');
  if (!sel) return;

  // Apple keeps the native picker; others get the custom dropdown
  const ua = navigator.userAgent;
  const plat = navigator.platform || '';
  const isApple = /iPhone|iPad|iPod|Mac/.test(ua) || /iPhone|iPad|iPod|Mac/.test(plat);
  if (isApple) return; // native picker

  const wrap = sel.closest('.wl-selectwrap');
  if (!wrap) return;
  wrap.classList.add('wl-cs');
  sel.classList.add('wl-cs-native-hidden');
  sel.setAttribute('tabindex', '-1');
  sel.setAttribute('aria-hidden', 'true');

  // detach label so a label click can't open the hidden native select
  const label = wrap.parentElement && wrap.parentElement.querySelector('.wl-label');
  if (label) label.removeAttribute('for');

  const options = Array.from(sel.options);
  const placeholder = options.find(o => o.value === '');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wl-cs-btn';
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'How did you hear about us?');
  const lbl = document.createElement('span');
  const chev = document.createElement('span');
  chev.className = 'wl-cs-chev';
  chev.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  btn.append(lbl, chev);

  const menu = document.createElement('div');
  menu.className = 'wl-cs-menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('aria-label', 'How did you hear about us?');
  options.filter(o => o.value !== '').forEach((o) => {
    const item = document.createElement('div');
    item.className = 'wl-cs-opt';
    item.setAttribute('role', 'option');
    item.dataset.value = o.value;
    item.innerHTML = '<span>' + o.textContent + '</span>' +
      '<span class="wl-cs-check"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>';
    item.addEventListener('click', () => { choose(o.value); close(); btn.focus(); });
    menu.appendChild(item);
  });

  wrap.append(btn, menu);

  function render() {
    const v = sel.value;
    const cur = options.find((o) => o.value === v);
    lbl.textContent = (v && cur) ? cur.textContent : (placeholder ? placeholder.textContent : 'Select an option');
    btn.classList.toggle('is-placeholder', !v);
    menu.querySelectorAll('.wl-cs-opt').forEach((el) => el.classList.toggle('sel', el.dataset.value === v));
  }
  function choose(v) { sel.value = v; sel.dispatchEvent(new Event('change', { bubbles: true })); render(); }
  function open() { wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); document.addEventListener('pointerdown', onDoc, true); document.addEventListener('keydown', onKey); }
  function close() { wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', onDoc, true); document.removeEventListener('keydown', onKey); }
  function onDoc(e) { if (!wrap.contains(e.target)) close(); }
  function onKey(e) { if (e.key === 'Escape') { close(); btn.focus(); } }

  btn.addEventListener('click', () => { wrap.classList.contains('open') ? close() : open(); });
  render();
})();
