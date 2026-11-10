"use client";

import { useEffect, useRef, useState } from "react";
import HomeNav from "./HomeNav";
import Footer from "./Footer";
import WaitlistForm from "./WaitlistForm";
import WhatWeDo from "./WhatWeDo";
import HowRight from "./HowRight";
import Features from "./Features";
import Community from "./Community";
import Closing from "./Closing";
import { useHomeScrollNav } from "../hooks/useScrollNav";
import { useReveal } from "../hooks/useReveal";
import { useParallax } from "../hooks/useParallax";

const HOLD = 7000;
const FADE = 1400;

const SHOTS = [
  { src: 'hero-1.jpg' },
  { src: 'hero-2.jpg' },
  { src: 'hero-3.jpg' },
];

const BLUR = [24, 8, 2.7, 0.9, 0.3];

const EYE = ["One stop or ten", "Planned end to end", "Far from the crowds"];
const EYE_WIDEST = EYE.reduce((a, b) => (b.length > a.length ? b : a), EYE[0]!);

function EyeLine({ text, out }: { text: string; out?: boolean }) {
  return (
    <span className={`hero-eye-line${out ? ' is-out' : ''}`}>
      {text.split(' ').map((w, i) => (
        <span className="hero-eye-w" key={`${w}-${i}`} style={{ ['--w' as string]: i }}>
          <b>{w}</b>
        </span>
      ))}
    </span>
  );
}

export default function HomeContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const [fading, setFading] = useState<number | null>(null);

  useHomeScrollNav(navRef, progressRef, heroRef);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (CSS.supports('animation-timeline: scroll()')) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.style.setProperty("--open", "1");
      return;
    }

    let cur = 0;
    let target = 0;
    let raf = 0;
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    let last = 0;
    const draw = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16.667;
      last = now;
      cur += (target - cur) * (1 - Math.pow(1 - 0.34, dt / 16.667));
      if (Math.abs(target - cur) < 0.0008) cur = target;
      hero.style.setProperty("--open", cur.toFixed(4));
      if (cur === target) { raf = 0; last = 0; return; }
      raf = requestAnimationFrame(draw);
    };

    const read = () => {
      const t = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.72)));
      target = ease(t);
      if (!raf) raf = requestAnimationFrame(draw);
    };

    target = ease(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.72))));
    cur = target;
    hero.style.setProperty("--open", cur.toFixed(4));

    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (SHOTS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setLeaving(shot);
      setFading(shot);
      setShot((i) => (i + 1) % SHOTS.length);
    }, HOLD);
    return () => window.clearTimeout(t);
  }, [shot]);

  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setLeaving(null), 700);
    return () => window.clearTimeout(t);
  }, [leaving]);

  useEffect(() => {
    if (fading === null) return;
    const t = window.setTimeout(() => setFading(null), FADE + 140);
    return () => window.clearTimeout(t);
  }, [fading]);

  useReveal();
  useParallax();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <HomeNav navRef={navRef} />

      <main id="main">

        <header className="hero" id="join" ref={heroRef}>
          <div className="hero-shot" role="img" aria-label="Mountains, forest and river country of the kind Raasta plans trips through">
            {SHOTS.map((sh, i) => (
              <img
                className={`hero-img${i === shot ? ' is-on' : ''}${i === fading ? ' is-held' : ''}`}
                key={sh.src}
                src={`/assets/${sh.src}`}
                alt=""
                fetchPriority={i === 0 ? 'high' : 'low'}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>

          <span className="hero-veil hero-veil--t" aria-hidden="true"></span>
          <span className="hero-veil hero-veil--b" aria-hidden="true"></span>
          <div className="hero-blur" aria-hidden="true">
            {BLUR.map((b, i) => (
              <span
                key={b}
                style={{ ['--b' as string]: `${b}px`, ['--s' as string]: `${i * 22}%` }}
              />
            ))}
          </div>

          <div className="hero-layer wrap">

            <p className="hero-eye" aria-label="One stop or ten, planned end to end, far from the crowds.">
              <span className="hero-eye-stage" aria-hidden="true">
                <span className="hero-eye-sizer">{EYE_WIDEST}</span>
                {leaving !== null && <EyeLine text={EYE[leaving] ?? ''} out key={`out-${leaving}`} />}
                <EyeLine text={EYE[shot] ?? EYE[0]!} key={`in-${shot}`} />
              </span>
            </p>

            <div className="hero-bars" role="tablist" aria-label="Photographs" style={{ ['--hold' as string]: `${HOLD}ms` }}>
              {SHOTS.map((sh, i) => (
                <button
                  className={`hero-bar${i === shot ? ' is-on' : ''}${i < shot ? ' is-done' : ''}`}
                  key={sh.src}
                  type="button"
                  role="tab"
                  aria-selected={i === shot}
                  aria-label={`Photograph ${i + 1} of ${SHOTS.length}`}
                  onClick={() => setShot(i)}
                >
                  <i key={i === shot ? `run-${shot}` : 'idle'} />
                </button>
              ))}
            </div>

            <h1 className="hero-title">
              <span className="ln">
                <span>There’s a version of India</span>
              </span>{" "}
              <span className="ln">
                <span>you haven’t seen yet.</span>
              </span>
            </h1>

            <p className="hero-sub">
              Most people see the same handful of places, because those are the
              ones they have heard of. We’ll show you the rest.
            </p>

            <div className="hero-aside">
              <WaitlistForm variant="hero" inputId="heroEmail" />
            </div>
          </div>
        </header>

        <WhatWeDo />

        <HowRight />

        <Features />

        <Community />
      </main>

      <Closing />

      <Footer showCompanyCol />
    </>
  );
}
