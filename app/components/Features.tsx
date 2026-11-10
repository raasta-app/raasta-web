'use client';

import { useEffect, useRef, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

type Lvl = 0 | 1 | 2 | 3;
type Place = { p: string; st: string; m: Lvl[]; notes: [string, string, string, string]; tip?: string[] };
const PLACES: Place[] = [
  {
    p: 'Tawang', st: 'Arunachal Pradesh', m: [1, 1, 2, 3, 3, 2, 0, 0, 1, 3, 2, 1],
    notes: ['Monsoon. Landslides.', 'Deep winter, very cold.', 'Good roads, cold nights.', 'Clear roads, clear skies.'],
    tip: [
      'Snow on the pass, but the road stays open.',
      'Peak winter. Keep a spare day.',
      'Rhododendrons out. Cold nights.',
      'Clear roads, clear skies.',
      'Warm days, lakes thawed.',
      'Good till the monsoon arrives.',
      'Monsoon. Roads get cut off.',
      'Still raining. Views clouded out.',
      'Rain easing off. Green and quiet.',
      'Crisp and clear. The best month.',
      'Cold and clear. Carry layers.',
      'Snowfall begins. Cold, clear days.',
    ],
  },
  {
    p: 'Munnar', st: 'Kerala', m: [3, 3, 2, 1, 1, 0, 0, 1, 2, 2, 2, 3],
    notes: ['Heavy monsoon and leeches.', 'Hot and hazy. Busy weekends.', 'Green estates after the rains.', 'Cool, dry, misty mornings.'],
  },
  {
    p: 'Spiti', st: 'Himachal Pradesh', m: [1, 1, 1, 1, 1, 3, 3, 2, 3, 2, 1, 1],
    notes: ['Kunzum shut. Minus twenty at night.', 'Kunzum is shut. Only the Shimla side is open.', 'Open, but Kinnaur rain slows you.', 'Both roads open. Clear skies.'],
  },
  {
    p: 'Majuli', st: 'Assam', m: [3, 2, 2, 1, 1, 0, 0, 0, 1, 2, 3, 3],
    notes: ['Floods. Ferries stop.', 'Humid. Ferries run late.', 'Warm days, easy ferries.', 'Dry, cool, birds and Raas festival.'],
  },
];
const LVL = ['Skip', 'Fine', 'Good', 'Best'] as const;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const noteFor = (pl: Place, mi: number) => pl.tip?.[mi] ?? pl.notes[pl.m[mi] ?? 0];

const CITIES = [
  { c: 'Delhi', v: 13400 },
  { c: 'Mumbai', v: 15800 },
  { c: 'Bengaluru', v: 16200 },
];
const BEING_THERE = 17500;

const CHECKS = [
  { k: 'Pack', v: 'Down jacket' },
  { k: 'Watch for', v: 'Landslides' },
  { k: 'Solo', v: 'Easy' },
];

const DAYS = [
  'Guwahati to Bhalukpong',
  'Bhalukpong to Dirang',
  'Dirang to Tawang, via Sela',
  'Tawang monastery',
  'Sangetsar Lake and the border',
  'Back to Dirang',
];

const STOPS = [
  { n: 'Shimla', x: 20, y: 96, key: true },
  { n: 'Sangla', x: 150, y: 80 },
  { n: 'Kalpa', x: 280, y: 86 },
  { n: 'Nako', x: 410, y: 68, key: true },
  { n: 'Tabo', x: 540, y: 76 },
  { n: 'Kaza', x: 670, y: 62, key: true },
  { n: 'Chandratal', x: 810, y: 74 },
  { n: 'Manali', x: 980, y: 66, key: true },
];

const COLLECTIONS = [
  { n: 'Bike trip with Rohan', who: 'You and Rohan', c: 14, shots: ['jibhi-himachal-pradesh', 'manali-himachal-pradesh', 'chopta-uttarakhand'] },
  { n: 'Anaya\u2019s birthday', who: 'You and 3 others', c: 9, shots: ['udaipur-rajasthan', 'goa', 'rishikesh-uttarakhand'] },
  { n: 'Someday list', who: 'Just you', c: 23, shots: ['mawlynnong-meghalaya', 'majuli-assam', 'munnar-kerala'] },
];

const VB_W = 1000;
const VB_H = 150;

function routePath(pts: { x: number; y: number }[]) {
  const first = pts[0];
  if (!first) return '';
  let d = `M${first.x},${first.y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return d;
}
const ROUTE_D = routePath(STOPS);

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Features() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [city, setCity] = useState(0);
  const [place, setPlace] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const circuitRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [pos, setPos] = useState({ at: 0, p: 0, start: true, end: false });
  const CARDS = 8;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const read = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const p = max > 0 ? rail.scrollLeft / max : 0;
      const at = Math.min(CARDS - 1, Math.round(p * (CARDS - 1)));
      setPos((prev) =>
        prev.at === at && Math.abs(prev.p - p) < 0.002 && prev.start === p < 0.01 && prev.end === p > 0.99
          ? prev
          : { at, p, start: p < 0.01, end: p > 0.99 },
      );
    };
    read();
    rail.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);

    const disc = dragRef.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let down = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let hideT = 0;
    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (disc) disc.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.2 ? requestAnimationFrame(tick) : 0;
    };
    const show = (on: boolean) => {
      if (on) {
        window.clearTimeout(hideT);
        hideT = 0;
        disc?.classList.add('is-on');
      } else if (!hideT) {
        hideT = window.setTimeout(() => {
          hideT = 0;
          disc?.classList.remove('is-on');
        }, 160);
      }
    };
    const onHover = (e: PointerEvent) => {
      if (!disc || !fine || e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!disc.classList.contains('is-on') && !hideT) {
        cx = tx;
        cy = ty;
      }
      if (!raf) raf = requestAnimationFrame(tick);
      show(!(e.target as HTMLElement).closest('button, a, input, .hm, .hm-places, .cities') || down);
    };
    const onLeave = () => {
      window.clearTimeout(hideT);
      hideT = 0;
      disc?.classList.remove('is-on');
    };
    rail.addEventListener('pointermove', onHover);
    rail.addEventListener('pointerleave', onLeave);

    let x0 = 0;
    let s0 = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || (e.target as HTMLElement).closest('a, input')) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = rail.scrollLeft;
      rail.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 3) moved = true;
      rail.scrollLeft = s0 - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      const dx = e.clientX - x0;

      const starts = Array.from(rail.querySelectorAll<HTMLElement>('.fx-card')).map((c) => c.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft));
      rail.classList.remove('is-dragging');
      if (Math.abs(dx) > 40) {
        const target = dx < 0 ? starts.find((x) => x > s0 + 4) : [...starts].reverse().find((x) => x < s0 - 4);
        if (target !== undefined) rail.scrollTo({ left: target, behavior: 'smooth' });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    rail.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    rail.addEventListener('click', onClick, true);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    if (circuitRef.current) io.observe(circuitRef.current);

    return () => {
      rail.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
      rail.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      rail.removeEventListener('click', onClick, true);
      io.disconnect();
      rail.removeEventListener('pointermove', onHover);
      rail.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
      window.clearTimeout(hideT);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>('.fx-card');
    if (!rail || !card) return;
    rail.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: 'smooth' });
  };

  const pl = PLACES[place] ?? PLACES[0]!;
  const lvl = pl.m[month] ?? 0;
  const from = CITIES[city] ?? CITIES[0]!;

  return (
    <section className="feats" id="features" aria-labelledby="feats-title">
      <div className="wrap split-head feats-head">
        <div className="reveal">
          <span className="sec-eye">03 &middot; What you get</span>
          <h2 className="sec-title" id="feats-title">
            The questions you’d ask before travelling, answered.
          </h2>
        </div>
        <div className="feats-side reveal" data-d="1">
          <div className="rail-btns">
            <button type="button" className="rail-btn" onClick={() => step(-1)} disabled={pos.start} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="rail-btn" onClick={() => step(1)} disabled={pos.end} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="fx-view" ref={railRef} tabIndex={0} aria-label="Features, scroll sideways">
        <div className="fx">

          <article className="fx-card fx-dest reveal" data-d="1">
            <img className="dest-img" src="/assets/tawang-arunachal-pradesh.jpg" alt="Tawang Monastery on its ridge above the town, Arunachal Pradesh" loading="lazy" decoding="async" />
            <div className="dest-panel">
              <div className="dest-row">
                <h3>Tawang</h3>
              </div>
              <div className="dest-row dest-sub">
                <span>Arunachal Pradesh &middot; 6 days</span>
              </div>
            </div>
          </article>

          <article className="fx-card fx-season reveal" data-d="2">
            <header className="fx-head">
              <h3>When to go</h3>
            </header>
            <div className="hm-places" role="radiogroup" aria-label="Place">
              {PLACES.map((x, i) => (
                <button type="button" role="radio" aria-checked={i === place} className={`chip${i === place ? ' is-on' : ''}`} onClick={() => setPlace(i)} key={x.p}>
                  {x.p}
                </button>
              ))}
            </div>
            <div className="hm-read" aria-live="polite">
              <p className="hm-month">
                {MONTH_NAMES[month]}
                <b className={`verdict v${lvl}`}>{LVL[lvl]}</b>
              </p>
              <p className="hm-note">{noteFor(pl, month)}</p>
            </div>
            <div className="hm" role="radiogroup" aria-label="Month">
              {MONTHS.map((m, i) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={i === month}
                  aria-label={`${MONTH_NAMES[i]}: ${LVL[pl.m[i] ?? 0]}`}
                  className={`hm-cell${i === month ? ' is-on' : ''}`}
                  onClick={() => setMonth(i)}
                  onMouseEnter={() => setMonth(i)}
                  key={m}
                >
                  <i className={`l${pl.m[i] ?? 0}`} style={{ ['--i' as string]: i }}></i>
                  <span>{m.charAt(0)}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="fx-card fx-budget reveal" data-d="3">
            <header className="fx-head">
              <h3>What it costs</h3>
            </header>
            <div className="cities" role="radiogroup" aria-label="Starting from">
              {CITIES.map((c, i) => (
                <button type="button" role="radio" aria-checked={i === city} className={`chip${i === city ? ' is-on' : ''}`} onClick={() => setCity(i)} key={c.c}>
                  {c.c}
                </button>
              ))}
            </div>
            <div className="bud">
              <p className="bud-total">
                <b key={`t-${from.c}`}>{inr(from.v + BEING_THERE)}</b>
                <span>per person from {from.c}</span>
              </p>
              <dl className="bud-rows">
                <div>
                  <dt>Getting there</dt>
                  <dd key={from.c}>{inr(from.v)}</dd>
                </div>
                <div>
                  <dt>Stay and food</dt>
                  <dd>{inr(BEING_THERE)}</dd>
                </div>
              </dl>
            </div>
          </article>

          <article className="fx-card fx-checks reveal" data-d="4">
            <header className="fx-head">
              <h3>Before you go</h3>
            </header>
            <div className="know">
              <p className="know-big">
                <b>Permit needed</b>
                <span>ILP online, then a Bum La pass in Tawang</span>
              </p>
              <dl className="know-rows">
                {CHECKS.map((c) => (
                  <div key={c.k} className={c.k === 'Watch for' ? 'is-warn' : undefined}>
                    <dt>{c.k}</dt>
                    <dd>{c.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          <article className="fx-card fx-days reveal" data-d="5">
            <header className="fx-head">
              <h3>Day by day</h3>
            </header>
            <ol className="days">
              {DAYS.map((d, i) => (
                <li key={d}>
                  <span className="days-n">{i + 1}</span>
                  <b>{d}</b>
                </li>
              ))}
            </ol>
          </article>

          <article className="fx-card fx-verified reveal" data-d="6">
            <header className="fx-head">
              <h3>Kept current</h3>
            </header>
            <div className="chk-date">
              <span>Last checked</span>
              <b>14 Sep</b>
            </div>
            <ul className="chk-list">
              <li>
                <span>Roads</span>
                <em>Open all the way</em>
              </li>
              <li>
                <span>Stays</span>
                <em>Homestays called</em>
              </li>
              <li>
                <span>Prices</span>
                <em>Today’s rates</em>
              </li>
            </ul>
            <p className="chk-note">
              <b>Been there, Oct 2025:</b> Sumos leave Tezpur by 6am. Miss them, lose a day.
            </p>
          </article>

          <article ref={circuitRef} className={`fx-card fx-circuit${drawn ? ' in' : ''}`}>
            <header className="fx-head">
              <h3>In the right order</h3>
            </header>
            <div className="route">
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true" preserveAspectRatio="none">
                <path className="route-shadow" d={ROUTE_D} />
                <path className="route-line" d={ROUTE_D} pathLength={1} />
              </svg>
              <ol className="route-stops">
                {STOPS.map((st, i) => (
                  <li
                    key={st.n}
                    style={{ left: `${(st.x / VB_W) * 100}%`, top: `${(st.y / VB_H) * 100}%`, ['--x' as string]: `${(st.x / VB_W) * 100}%`, ['--y' as string]: `${(st.y / VB_H) * 100}%`, ['--i' as string]: i }}
                    className={st.key ? 'is-key' : undefined}
                  >
                    <i></i>
                    <span>{st.n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="circ-foot">
              <b>Shimla to Manali</b>
              <span>8 stops &middot; ≈ 650 km &middot; one budget of {inr(38000)}</span>
            </div>
          </article>

          <article className="fx-card fx-coll reveal" data-d="7">
            <header className="fx-head">
              <h3>Saved together</h3>
              <p>A list you and whoever is coming can both add to.</p>
            </header>
            <ul className="coll">
              {COLLECTIONS.map((c) => (
                <li key={c.n}>
                  <span className="coll-stack" aria-hidden="true">
                    {c.shots.map((sh) => (
                      <img key={sh} src={`/assets/${sh}.jpg`} alt="" loading="lazy" decoding="async" />
                    ))}
                  </span>
                  <b>{c.n}</b>
                  <em>
                    {c.who}{' '}
                    <span>&middot; {c.c} places</span>
                  </em>
                </li>
              ))}
            </ul>
            <p className="coll-note">
              Name it whatever you call the trip.
            </p>
          </article>
        </div>
      </div>

      <div className="drag-disc" ref={dragRef} aria-hidden="true">
        <span>
          <svg viewBox="0 0 12 12"><path d="M7.5 2.5 4 6l3.5 3.5" /></svg>
          Drag
          <svg viewBox="0 0 12 12"><path d="M4.5 2.5 8 6 4.5 9.5" /></svg>
        </span>
      </div>

      <div className="wrap rail-foot">
        <div className="rail-track" aria-hidden="true">
          <span style={{ width: `${(100 / CARDS).toFixed(2)}%`, left: `${(pos.p * (100 - 100 / CARDS)).toFixed(2)}%` }}></span>
        </div>
        <span className="rail-count" aria-hidden="true">
          0{pos.at + 1} <i>/ 0{CARDS}</i>
        </span>
      </div>

    </section>
  );
}
