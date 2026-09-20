'use client';

import { useRef } from 'react';
import HomeNav from './HomeNav';
import Footer from './Footer';
import { FEATURES, ICONS } from '../data/features';
import { useScrollNav } from '../hooks/useScrollNav';
import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import { useStatementHighlight } from '../hooks/useStatementHighlight';
import { useMarquee } from '../hooks/useMarquee';
import { useDestinationsRail } from '../hooks/useDestinationsRail';
import { useExciteCursor } from '../hooks/useExciteCursor';
import { useTripsDemo } from '../hooks/useTripsDemo';
import { useCountUp } from '../hooks/useCountUp';
import { useFaqAccordion } from '../hooks/useFaqAccordion';
import { useWaitlistForm } from '../hooks/useWaitlistForm';
import { useCustomSelect } from '../hooks/useCustomSelect';

const DESTINATIONS = [
  { d: undefined, img: 'leh-ladakh.jpg', name: 'Leh', region: 'Ladakh' },
  { d: 1, img: 'tawang-arunachal-pradesh.jpg', name: 'Tawang', region: 'Arunachal Pradesh' },
  { d: 2, img: 'goa.jpg', name: 'Goa', region: 'Goa' },
  { d: 3, img: 'mawlynnong-meghalaya.jpg', name: 'Mawlynnong', region: 'Meghalaya' },
  { d: undefined, img: 'manali-himachal-pradesh.jpg', name: 'Manali', region: 'Himachal Pradesh' },
  { d: 1, img: 'majuli-assam.jpg', name: 'Majuli', region: 'Assam' },
  { d: 2, img: 'munnar-kerala.jpg', name: 'Munnar', region: 'Kerala' },
  { d: 3, img: 'gandikota-andhra-pradesh.jpg', name: 'Gandikota', region: 'Andhra Pradesh' },
  { d: undefined, img: 'udaipur-rajasthan.jpg', name: 'Udaipur', region: 'Rajasthan' },
  { d: 1, img: 'dzukou-valley-nagaland.jpg', name: 'Dzukou Valley', region: 'Nagaland' },
  { d: 2, img: 'rishikesh-uttarakhand.jpg', name: 'Rishikesh', region: 'Uttarakhand' },
  { d: 3, img: 'chopta-uttarakhand.jpg', name: 'Chopta', region: 'Uttarakhand' },
];

const MARQUEE_WORDS = [
  'Rishikesh', 'Jaisalmer', 'Goa', 'Coorg', 'Hampi', 'Munnar', 'Spiti', 'Udaipur',
  'Varanasi', 'Ladakh', 'Gokarna', 'Meghalaya', 'Darjeeling', 'Rann of Kutch',
];

const TJ_ROWS = [
  { name: 'Kalpa', route: 'Sarahan · Sangla · Chitkul', more: '+3 more', meta: '6 stops · 580 km', img: '/assets/journey-kalpa.png', price: '₹19k', short: 'Kalpa', selected: false },
  { name: 'Gurez Valley', route: 'Bandipora · Dawar · Tulail', more: '+2 more', meta: '5 stops · 300 km', img: '/assets/journey-gurez.png', price: '₹26k', short: 'Gurez', selected: false },
  { name: 'Ziro Valley', route: 'Hong · Hari · Pine Grove', more: '+4 more', meta: '7 stops · 940 km', img: '/assets/journey-ziro.png', price: '₹21k', short: 'Ziro', selected: true },
  { name: 'Mawlynnong', route: 'Sohra · Mawlynnong · Dawki', more: '+2 more', meta: '5 stops · 290 km', img: '/assets/journey-mawlynnong.png', price: '₹15k', short: 'Mawlynnong', selected: false },
];

const DEST_TAG_SVG =
  'M17.22 2H8.96005C8.56005 2 8.18002 2.14 7.87002 2.38L5.68002 4.13C4.80002 4.83 4.80002 6.15999 5.68002 6.85999L7.87002 8.60999C8.18002 8.85999 8.57005 8.98999 8.96005 8.98999H17.22C18.19 8.98999 18.97 8.20999 18.97 7.23999V3.73999C18.97 2.77999 18.19 2 17.22 2ZM6.80005 12H15.0601C15.4601 12 15.8401 12.14 16.1501 12.38L18.3401 14.13C19.2201 14.83 19.2201 16.16 18.3401 16.86L16.1501 18.61C15.8401 18.86 15.4501 18.99 15.0601 18.99H6.80005C5.83005 18.99 5.05005 18.21 5.05005 17.24V13.74C5.05005 12.78 5.83005 12 6.80005 12ZM12 12V9M12 22V19M9 22H15';

export default function HomeContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  useScrollNav(navRef, progressRef, heroRef, heroBgRef, heroContentRef);
  useReveal();
  useParallax();
  useStatementHighlight();
  useMarquee(marqueeTrackRef);
  useDestinationsRail(railRef);
  useExciteCursor(railRef);
  useTripsDemo();
  useCountUp();
  useFaqAccordion();
  useWaitlistForm();
  useCustomSelect();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" id="progress" aria-hidden="true" ref={progressRef}></div>

      <HomeNav navRef={navRef} />

      <main id="main">
        <header className="hero" id="home" ref={heroRef}>
          <div className="hero-bg" id="heroBg" ref={heroBgRef}>
            <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/hero-poster.jpg">
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="wrap">
            <div className="hero-content" id="heroContent" ref={heroContentRef}>
              <h1 className="hero-title">
                <span className="ln">
                  <span>India, waiting</span>
                </span>
                <span className="ln">
                  <span>to be explored.</span>
                </span>
              </h1>
              <p className="hero-sub reveal" data-d="2">
                A thoughtful travel companion that brings curated trips, multi-stop journeys, real budgets and the best time to go into one quiet, considered app, so you can stop researching and start travelling.
              </p>
              <div className="hero-actions reveal" data-d="3">
                <a href="#waitlist" className="btn btn-primary btn-lg">
                  Join the waitlist
                </a>
                <a href="#how" className="btn btn-glass btn-lg">
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="marquee-sec" aria-hidden="true">
          <div className="wrap">
            <div className="marquee">
              <div className="marquee-track" id="marqueeTrack" ref={marqueeTrackRef}>
                {MARQUEE_WORDS.map((w) => (
                  <span key={w}>
                    <span className="mq">{w}</span>
                    <span className="dot"></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="statement">
          <div className="wrap">
            <p className="statement-text" id="statementText">
              Planning a trip across India means ten tabs, three blogs and no real answer. Raasta is the one app that simply tells you where to go, when, and for how much.
            </p>
          </div>
        </section>

        <section className="section why" id="why">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Why Raasta exists</span>
              <h2 className="section-title">
                Instagram shows you where.
                <br />
                Raasta tells you <span className="why-em">whether to go.</span>
              </h2>
              <p className="sec-sub">
                Finding the place is easy. It&apos;s everything after: the season, the cost, the roads, the weather right now. Raasta pulls it into one answer.
              </p>
            </div>

            <div className="why-flow reveal">
              <div className="flow-asks-col">
                <span className="flow-asks-label">Before Raasta</span>
                <ul className="flow-asks">
                  <li>Right season?</li>
                  <li>Roads open?</li>
                  <li>How much, really?</li>
                  <li>Weather right now?</li>
                  <li>Is it safe?</li>
                </ul>
              </div>

              <div className="flow-mid" aria-hidden="true">
                <svg className="flow-threads" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                  <g className="ft-base">
                    <path d="M0,10 C40,10 42,50 82,50" />
                    <path d="M0,30 C40,30 46,50 82,50" />
                    <path d="M0,50 L82,50" />
                    <path d="M0,70 C40,70 46,50 82,50" />
                    <path d="M0,90 C40,90 42,50 82,50" />
                    <path d="M82,50 L100,50" />
                  </g>
                  <g className="ft-glow">
                    <path pathLength={100} style={{ ['--d' as string]: '0s' }} d="M0,10 C40,10 42,50 82,50" />
                    <path pathLength={100} style={{ ['--d' as string]: '.45s' }} d="M0,30 C40,30 46,50 82,50" />
                    <path pathLength={100} style={{ ['--d' as string]: '.9s' }} d="M0,50 L82,50" />
                    <path pathLength={100} style={{ ['--d' as string]: '1.35s' }} d="M0,70 C40,70 46,50 82,50" />
                    <path pathLength={100} style={{ ['--d' as string]: '1.8s' }} d="M0,90 C40,90 42,50 82,50" />
                    <path pathLength={100} style={{ ['--d' as string]: '2.25s' }} d="M82,50 L100,50" />
                  </g>
                </svg>
                <svg className="flow-threads flow-threads-v" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                  <g className="ft-base">
                    <path d="M10,0 C10,40 50,42 50,82" />
                    <path d="M30,0 C30,40 50,46 50,82" />
                    <path d="M50,0 L50,82" />
                    <path d="M70,0 C70,40 50,46 50,82" />
                    <path d="M90,0 C90,40 50,42 50,82" />
                    <path d="M50,82 L50,100" />
                  </g>
                  <g className="ft-glow">
                    <path pathLength={100} style={{ ['--d' as string]: '0s' }} d="M10,0 C10,40 50,42 50,82" />
                    <path pathLength={100} style={{ ['--d' as string]: '.45s' }} d="M30,0 C30,40 50,46 50,82" />
                    <path pathLength={100} style={{ ['--d' as string]: '.9s' }} d="M50,0 L50,82" />
                    <path pathLength={100} style={{ ['--d' as string]: '1.35s' }} d="M70,0 C70,40 50,46 50,82" />
                    <path pathLength={100} style={{ ['--d' as string]: '1.8s' }} d="M90,0 C90,40 50,42 50,82" />
                    <path pathLength={100} style={{ ['--d' as string]: '2.25s' }} d="M50,82 L50,100" />
                  </g>
                </svg>
                <span className="flow-node"></span>
              </div>

              <div className="flow-frame reveal" data-d="1">
                <figure className="flow-photo">
                  <img
                    src="/assets/jibhi-himachal-pradesh.jpg"
                    alt="Forested slopes and wooden chalets in Jibhi, Himachal Pradesh"
                    width={736}
                    height={1104}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="flow-where">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                    </svg>
                    Pine forests, waterfalls, and quiet
                  </figcaption>
                </figure>
                <aside className="flow-verdict">
                  <div className="flow-verdict-head">
                    <div className="fvh-text">
                      <span className="why-kicker">Himachal Pradesh</span>
                      <h3 className="flow-verdict-h">Jibhi</h3>
                    </div>
                    <span className="flow-score score-ring" role="img" aria-label="Raasta score: 91 out of 100 — go for it">
                      <svg viewBox="0 0 44 44" aria-hidden="true">
                        <circle className="sr-track" cx={22} cy={22} r={18} />
                        <circle className="sr-fill" cx={22} cy={22} r={18} pathLength={100} strokeDasharray="91 100" />
                      </svg>
                      <b>91</b>
                    </span>
                  </div>
                  <ul className="flow-facts">
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2v4M16 2v4" />
                        <rect width={18} height={18} x={3} y={4} rx={2} />
                        <path d="M3 10h18" />
                      </svg>
                      <span>Best season</span>
                      <b>Apr-Jun · good now</b>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={12} cy={12} r={4} />
                        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                      </svg>
                      <span>Weather now</span>
                      <b>Clear · 18°C</b>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={6} cy={19} r={3} />
                        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                        <circle cx={18} cy={5} r={3} />
                      </svg>
                      <span>Getting there</span>
                      <b>Kullu airport, then 2h</b>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                      </svg>
                      <span>All-in budget</span>
                      <b>₹7,000-12,000</b>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={12} cy={12} r={9} />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      <span>How long</span>
                      <b>3D / 2N is ideal</b>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>Safety</span>
                      <b>Easy · low-key</b>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="section dest" id="destinations">
          <div className="wrap">
            <div className="dest-head reveal">
              <div className="sec-head">
                <span className="hand">let&apos;s go out</span>
                <h2 className="section-title">
                  Your next trip is
                  <br />
                  already out there.
                  <svg className="spark" viewBox="0 0 24 24" fill="none" stroke="#FF5A3D" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
                    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                  </svg>
                </h2>
                <p className="sec-sub">From Himalayan passes to southern shores: hundreds of places, each with its own best season, budget and route.</p>
              </div>
              <div className="dest-nav">
                <button className="dest-arrow" data-dir="-1" aria-label="Previous destinations">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button className="dest-arrow" data-dir="1" aria-label="Next destinations">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="dest-grid" ref={railRef}>
              {DESTINATIONS.map((dest) => (
                <div className="dest-card reveal" data-d={dest.d} key={dest.name}>
                  <div className="dest-img" style={{ backgroundImage: `url('/assets/${dest.img}')` }}></div>
                  <span className="dest-tag">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d={DEST_TAG_SVG} />
                    </svg>
                    <span className="dt-txt">
                      <b>{dest.name}</b>
                      <i>{dest.region}</i>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">What&apos;s inside</span>
              <h2 className="section-title">
                Everything a trip needs.
                <br />
                Nothing it doesn&apos;t.
              </h2>
            </div>
            <div className="feat-grid" id="featGrid">
              {FEATURES.map((f, i) => (
                <div className="feat-card reveal" data-d={i % 3} key={f.t}>
                  <div className="feat-ic">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      dangerouslySetInnerHTML={{ __html: ICONS[f.ic] }}
                    />
                  </div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="how">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">How it works</span>
              <h2 className="section-title">Three steps. One journey.</h2>
            </div>
            <div className="journey reveal" id="journey">
              <ol className="journey-stops">
                <li className="jstop">
                  <div className="jstop-node">
                    <span className="jstop-no">01</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx={12} cy={12} r={10} />
                      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
                    </svg>
                  </div>
                  <h3>Discover</h3>
                  <p>Set where you&apos;re starting and when. Raasta scores trips and journeys on weather, reach time and fit, never on popularity.</p>
                </li>
                <li className="jstop">
                  <div className="jstop-node">
                    <span className="jstop-no">02</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 13V2l8 4-8 4" />
                      <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
                      <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
                    </svg>
                  </div>
                  <h3>Choose</h3>
                  <p>Open any trip and the whole plan&apos;s already there: day by day, with real budgets, where to stay, what to pack and what to watch for.</p>
                </li>
                <li className="jstop">
                  <div className="jstop-node">
                    <span className="jstop-no">03</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                      <circle cx={7} cy={17} r={2} />
                      <path d="M9 17h6" />
                      <circle cx={17} cy={17} r={2} />
                    </svg>
                  </div>
                  <h3>Go</h3>
                  <p>Hit Start, and the route, timings and local picks ride along with you, stop by stop, to the last one.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="break-img" aria-label="Travel across India">
          <div className="break-bg" style={{ backgroundImage: "url('/assets/india-landscape.jpg')" }}></div>
          <div className="break-veil"></div>
          <div className="wrap break-inner reveal">
            <span className="break-kicker">From the mountains to the coast</span>
            <h2 className="break-title">
              Less planning.
              <br />
              More India.
            </h2>
          </div>
        </section>

        <section className="section" id="planner">
          <div className="wrap">
            <div className="split">
              <div className="split-copy reveal">
                <span className="eyebrow">Multi Stop Journeys</span>
                <h2 className="section-title">
                  Trips worth taking,
                  <br />
                  all in one place.
                </h2>
                <p className="split-sub">
                  A growing library of hand-picked trips and journeys across India, each one fully researched, budgeted and routed, so you can stop planning and start going. Here&apos;s one of them.
                </p>
                <ul className="ticks">
                  <li>Scored for fit, not popularity</li>
                  <li>Real budgets, broken down</li>
                  <li>Multi-stop journeys, mapped stop by stop</li>
                </ul>
                <a href="#waitlist" className="btn btn-text">
                  Join the waitlist
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className="plan-demo" data-parallax="0.05">
                <div className="tj-stage">
                  <div className="tj-photo">
                    <img className="tj-photo-img is-shown" src="/assets/journey-ziro.png" alt="A multi-stop road journey through the Indian countryside" loading="lazy" decoding="async" />
                    <img className="tj-photo-img" alt="" aria-hidden="true" decoding="async" />
                  </div>

                  <div className="tj-list reveal" data-d="1">
                    {TJ_ROWS.map((row) => (
                      <button
                        type="button"
                        className={`tj-row${row.selected ? ' is-sel' : ''}`}
                        aria-pressed={row.selected}
                        data-name={row.name}
                        data-route={row.route}
                        data-more={row.more}
                        data-meta={row.meta}
                        data-img={row.img}
                        key={row.name}
                      >
                        <b>{row.short}</b>
                        <span className="tj-price">{row.price}</span>
                        <svg className="tj-chev" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                        <span className="tj-bar">
                          <span className="tj-bar-fill"></span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="tj-detail reveal" data-d="2">
                    <span className="tj-detail-label">Destination</span>
                    <span className="tj-detail-name">Ziro Valley</span>
                    <p className="tj-route-line">
                      Hong · Hari · Pine Grove <span className="more">+4 more</span>
                    </p>
                    <div className="tj-meta">7 stops · 940 km</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="trust">
          <div className="wrap">
            <div className="trust-head reveal">
              <span className="eyebrow">Why trust Raasta</span>
              <h2 className="section-title">Advice you can rely on.</h2>
              <p className="sec-sub">No ads dressed up as recommendations, no selling of your data: just straight guidance for your trip.</p>
            </div>
            <div className="trust-grid">
              <div className="trust-card reveal">
                <span className="trust-ic">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3>Grounded in real data</h3>
                <p>Every suggestion is built on actual seasonality, costs and routes, reasoned for you, never guessed.</p>
              </div>
              <div className="trust-card reveal" data-d="1">
                <span className="trust-ic">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <h3>Private by design</h3>
                <p>Your trips and your data stay yours. No selling them on, no creepy tracking, no surprises.</p>
              </div>
              <div className="trust-card reveal" data-d="2">
                <span className="trust-ic">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx={12} cy={12} r={10} />
                    <path d="m4.9 4.9 14.2 14.2" />
                  </svg>
                </span>
                <h3>No ads, ever</h3>
                <p>Places are ranked for how well they fit your trip, never because a tourism board paid to be there.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section coverage">
          <div className="wrap">
            <div className="cov-grid">
              <div className="cov-side reveal">
                <span className="eyebrow">Across India</span>
                <h2 className="section-title left">
                  From the Himalayas
                  <br />
                  to the coast.
                </h2>
                <p className="cov-lead">Every state, every season: mapped, scored and ready the moment you are.</p>
                <div className="cov-stats" id="stats">
                  <div className="stat stat-hero">
                    <div className="num" data-to="500" data-suffix="+">
                      0
                    </div>
                    <div className="lbl">Destinations across India</div>
                  </div>
                  <div className="cov-mini">
                    <div className="stat">
                      <div className="num" data-to="36" data-suffix="">
                        0
                      </div>
                      <div className="lbl">States &amp; UTs covered</div>
                    </div>
                    <div className="stat">
                      <div className="num" data-to="10000" data-suffix="+">
                        0
                      </div>
                      <div className="lbl">Local insights &amp; tips</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cov-map reveal" data-d="1">
                <div className="india-wrap" role="img" aria-label="Destinations mapped across every state and union territory in India" data-parallax="0.08">
                  <img className="india-img" src="/assets/india.svg" alt="" loading="lazy" />
                  <span className="pin" style={{ left: '34.4%', top: '32.0%', ['--d' as string]: '0s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '77.6%', top: '39.4%', ['--d' as string]: '.35s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '63.7%', top: '48.6%', ['--d' as string]: '.7s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '25.7%', top: '37.6%', ['--d' as string]: '1.05s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '30.6%', top: '59.8%', ['--d' as string]: '1.4s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '30.2%', top: '72.8%', ['--d' as string]: '1.75s' }}>
                    <i></i>
                  </span>
                  <span className="pin" style={{ left: '26.2%', top: '71.4%', ['--d' as string]: '2.1s' }}>
                    <i></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-sec" id="waitlist">
          <div className="wrap cta-grid reveal">
            <div className="cta-copy">
              <span className="hand">your move</span>
              <h2 className="cta-title">
                Be first to travel
                <br />
                India differently.
              </h2>
              <p className="cta-sub">Join the waitlist and we&apos;ll let you know the moment Raasta launches.</p>
              <div className="cta-perk">
                <span className="cta-perk-ic">
                  <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="cta-perk-benefit">
                  4 months of <b>Raasta Pro</b>, free for early members
                </span>
              </div>
              <p className="wl-count">Free to join. No spam, just launch news.</p>
            </div>

            <div className="cta-form-wrap">
              <form className="wl-form" id="wlForm" noValidate>
                <div className="wl-hp" aria-hidden="true">
                  <label htmlFor="wlCompany">Company (leave this empty)</label>
                  <input type="text" id="wlCompany" name="company" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="wl-field">
                  <label className="wl-label" htmlFor="wlName">
                    Name
                  </label>
                  <input type="text" className="wl-input" id="wlName" name="name" placeholder="Your name" autoComplete="name" />
                </div>
                <div className="wl-field">
                  <label className="wl-label" htmlFor="wlInput">
                    Email
                  </label>
                  <input type="email" className="wl-input" id="wlInput" name="email" placeholder="you@email.com" autoComplete="email" />
                </div>
                <div className="wl-field">
                  <label className="wl-label" htmlFor="wlHeard">
                    How did you hear about us? <span className="wl-opt">Optional</span>
                  </label>
                  <div className="wl-selectwrap">
                    <select className="wl-input wl-select" id="wlHeard" name="heard" defaultValue="">
                      <option value="">Select an option</option>
                      <option value="Instagram">Instagram</option>
                      <option value="X / Twitter">X / Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Reddit">Reddit</option>
                      <option value="Google search">Google search</option>
                      <option value="Friend / word of mouth">Friend / word of mouth</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Join the waitlist
                </button>
                <div className="wl-msg" id="wlMsg" role="status"></div>
              </form>
              <div className="wl-success" id="wlSuccess">
                <div className="wl-success-head">
                  <span className="wl-check">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="wl-success-msg">
                    You&apos;re on the list — we&apos;ll email <b id="wlEmailEcho"></b> at launch.
                  </p>
                </div>
                <div className="wl-share">
                  <p className="wl-share-title" id="wlOfferTitle">
                    Invite 3 friends, upgrade to a full year of Pro.
                  </p>
                  <p className="wl-share-sub" id="wlOfferSub">
                    You&apos;ve already got 4 months of Raasta Pro free. Get 3 friends to join with your link and we&apos;ll make it a full year.
                  </p>
                  <button type="button" className="wl-reflink" id="wlCopy" aria-label="Copy your referral link">
                    <span className="wl-reflink-text" id="wlRefLink"></span>
                    <span className="wl-reflink-copy">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect width={13} height={13} x={9} y={9} rx={2} />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy</span>
                    </span>
                  </button>
                  <div className="wl-share-btns">
                    <button type="button" className="wl-share-btn wl-ig" id="wlIg">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect width={20} height={20} x={2} y={2} rx={5} />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
                      </svg>
                      <span>Instagram</span>
                    </button>
                    <a className="wl-share-btn wl-wa" id="wlWa" href="#" target="_blank" rel="noopener">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <button type="button" className="wl-share-btn wl-native" id="wlNative">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={18} cy={5} r={3} />
                        <circle cx={6} cy={12} r={3} />
                        <circle cx={18} cy={19} r={3} />
                        <line x1={8.59} x2={15.42} y1={13.51} y2={17.49} />
                        <line x1={15.41} x2={8.59} y1={6.51} y2={10.49} />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                  <p className="wl-share-hint" id="wlShareHint" hidden></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt faq-sec" id="faq">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title">Questions, answered.</h2>
            </div>
            <div className="faq reveal" data-d="1">
              <details className="faq-item">
                <summary>
                  What is Raasta?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>Raasta is an upcoming travel app for India that turns scattered trip research into clear answers: curated trips and multi-stop journeys, each with real budgets, the best time to go, routes and what to watch for. It&apos;s currently in pre-launch.</p>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  When will Raasta launch?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>We&apos;re building toward launch on iOS and Android. Join the waitlist and we&apos;ll email you the moment it&apos;s ready. We can&apos;t promise a fixed date yet.</p>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  How much will Raasta cost?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>Pricing isn&apos;t finalised yet. Joining the waitlist is free, and waitlisters will be the first to hear about launch and any early-access offers.</p>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  What do I get by joining the waitlist?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>Launch and early-access updates by email. We only use your details for Raasta updates (no spam), and you can opt out at any time.</p>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  Does Raasta book hotels or transport for me?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>Not today. Raasta is a trip-intelligence app that helps you decide where, when and how to travel. It doesn&apos;t currently offer bookings, payments or accounts.</p>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  How do you handle my personal data?
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="faq-a">
                  <p>
                    We collect only your name, email and how you heard about us, stored securely to manage the waitlist. See our <a href="/privacy">Privacy Policy</a> for full details.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer
        hand="see you out there"
        headline={
          <>
            The calm way
            <br />
            to travel India.
          </>
        }
        ctaHref="#waitlist"
        ctaLabel="Join the waitlist"
      />
    </>
  );
}
