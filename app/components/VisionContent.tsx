'use client';

import { useRef } from 'react';
import SubNav from './SubNav';
import Footer from './Footer';
import { useSubpageScrollNav } from '../hooks/useScrollNav';
import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import { useStatementHighlight } from '../hooks/useStatementHighlight';
import { useVisionIndex } from '../hooks/useVisionIndex';

export default function VisionContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useSubpageScrollNav(navRef, progressRef);
  useReveal();
  useParallax();
  useStatementHighlight();
  useVisionIndex();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" id="progress" aria-hidden="true" ref={progressRef}></div>

      <SubNav navRef={navRef} current="vision" />

      <nav className="v-index" id="vIndex" aria-label="Sections">
        <p className="vi-head">Contents</p>
        <ol>
          <li>
            <a href="#thesis">
              <span className="vi-label">
                <span className="vi-n">01</span> Thesis
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#problem">
              <span className="vi-label">
                <span className="vi-n">02</span> Problem
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#whynow">
              <span className="vi-label">
                <span className="vi-n">03</span> Why now
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#opportunity">
              <span className="vi-label">
                <span className="vi-n">04</span> Opportunity
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#shift">
              <span className="vi-label">
                <span className="vi-n">05</span> The shift
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#product">
              <span className="vi-label">
                <span className="vi-n">06</span> Product
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
          <li>
            <a href="#roadmap">
              <span className="vi-label">
                <span className="vi-n">07</span> Roadmap
              </span>
              <span className="vi-tick"></span>
            </a>
          </li>
        </ol>
      </nav>

      <main id="main">
        <header className="v-hero">
          <div className="wrap">
            <div className="v-meta ph-rise">
              <span>Vision</span>
              <span>The Raasta thesis</span>
              <span>Pre-launch, 2026</span>
            </div>
            <h1 className="v-hero-title ph-rise d1">
              Mapping India <em>differently.</em>
            </h1>
            <p className="v-hero-lead ph-rise d2">
              Booking a trip in India is a solved problem. Deciding where to go is not. Raasta is being built to own that decision: the first thing people open before a trip, to choose where to go, when, and whether it is even worth it.
            </p>
            <div className="v-actions ph-rise d3">
              <a href="#invest" className="btn btn-primary btn-lg">
                Talk to us
              </a>
              <a href="/founders" className="btn btn-text">
                Meet the founders
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        <div className="v-status">
          <div className="wrap">
            <span className="v-status-label">Where we are today</span>
            <span className="v-status-item">Pre-revenue</span>
            <span className="v-status-item">Bootstrapped</span>
            <span className="v-status-item">Website live</span>
            <span className="v-status-item">Waitlist active</span>
            <span className="v-status-item">Product in development</span>
          </div>
        </div>

        <section className="section" id="thesis">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">01</span> The thesis
            </div>
            <div className="v-thesis reveal" data-d="1">
              <p>
                A billion people, thousands of places, and no good way to decide where to go. <em>Discovery is the largest unsolved problem in Indian travel,</em>{' '}
                <span className="soft">and the one we are building Raasta to solve.</span>
              </p>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="problem">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">02</span> The problem
            </div>
            <h2 className="section-title left reveal">
              Discovery is broken
              <br />
              before the trip even starts.
            </h2>
            <p className="v-lede reveal">Choosing where to go in India means stitching together a dozen tools that were never meant to work together. Every one of them shows you something. None of them gives you an answer.</p>
            <div className="v-sources reveal" data-d="1">
              <div className="v-src-list">
                <div className="v-src-head">Where people look today</div>
                <ul>
                  <li>Instagram reels</li>
                  <li>Travel blogs</li>
                  <li>Google Maps</li>
                  <li>Weather apps</li>
                  <li>Reddit threads</li>
                  <li>YouTube vlogs</li>
                  <li>AI chatbots</li>
                  <li>WhatsApp groups</li>
                </ul>
              </div>
              <div className="v-ask">
                <div className="v-ask-q">
                  Not one of them answers the only question that matters: <em>where should I actually go?</em>
                </div>
                <p className="v-ask-note">So the same ten places stay crowded, hidden gems stay hidden, and a single trip takes evenings to plan.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="whynow">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">03</span> Why now
            </div>
            <h2 className="section-title left reveal">
              The pieces did not exist
              <br />
              five years ago. They do now.
            </h2>
            <div className="v-forces reveal" data-d="1">
              <div className="v-force">
                <div className="v-force-n">01</div>
                <h3>India is travelling like never before</h3>
                <p>Domestic travel has bounced back hard, and a new generation is looking well beyond the same few cities.</p>
              </div>
              <div className="v-force">
                <div className="v-force-n">02</div>
                <h3>Discovery moved to feeds, not search</h3>
                <p>People find places on reels and posts, then lose hours turning that spark into a real, costed plan.</p>
              </div>
              <div className="v-force">
                <div className="v-force-n">03</div>
                <h3>Curation is finally possible at scale</h3>
                <p>Better data and AI now let us score and explain destinations the way a well-travelled friend would.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="opportunity">
          <div className="wrap">
            <div className="v-prop-head">
              <div className="v-kicker reveal">
                <span className="vk-n">04</span> The opportunity
              </div>
              <h2 className="section-title left reveal">
                A country this vast
                <br />
                deserves better discovery.
              </h2>
              <p className="v-lede reveal">India is one of the most varied countries on earth, yet most trips funnel into a tiny set of destinations. The gap between what exists and what gets discovered is the entire opportunity.</p>
            </div>
            <div className="v-bar-wrap reveal" data-d="1" style={{ ['--now' as string]: '13%' }}>
              <div className="v-bar">
                <div className="v-bar-now"></div>
                <div className="v-bar-rest"></div>
              </div>
              <div className="v-bar-tags">
                <div className="lo">
                  <b>A handful of places</b>
                  <br />
                  soak up most of the trips
                </div>
                <div className="hi">
                  <b>The rest of India</b>
                  <br />
                  still waiting to be discovered
                </div>
              </div>
              <p className="v-bar-note">India has 28 states and 8 union territories. Raasta is being built for all 36, with 500+ destinations researched and scored for fit, and growing every week. Not just the famous few.</p>
            </div>
          </div>
        </section>

        <section className="section" id="shift">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">05</span> The shift
            </div>
            <h2 className="section-title left reveal">
              From a dozen open tabs
              <br />
              to one clear answer.
            </h2>
            <div className="v-ledger reveal" data-d="1">
              <div className="v-col v-col-old">
                <div className="v-col-head">
                  The old way <span className="v-col-tag">Today</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>A dozen tabs that never talk to each other</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>Ranked by popularity and who paid to be seen</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>Guesswork on season, budget and safety</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>The same crowded ten places, over and over</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>Evenings of research for a single trip</span>
                </div>
              </div>
              <div className="v-col v-col-new">
                <div className="v-col-head">
                  With Raasta <span className="v-col-tag">Building</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>One place that answers where and when</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Scored for fit, never for ad spend</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Real seasons, all-in budgets, clear conditions</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Hidden places finally get discovered</span>
                </div>
                <div className="v-line">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>A trip planned in minutes, not evenings</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="product">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">06</span> What we&apos;re building
            </div>
            <h2 className="section-title left reveal">More than a destination list.</h2>
            <p className="v-lede reveal">A discovery platform that holds the whole journey, from the first spark of an idea to the last stop on the road.</p>
            <div className="v-stack reveal" data-d="1">
              <div className="v-cap">
                <div className="v-cap-n">01</div>
                <div className="v-cap-t">Destination discovery</div>
                <div className="v-cap-d">Find the right places across India, not just the famous few.</div>
                <div className="v-cap-tag">Discover</div>
              </div>
              <div className="v-cap">
                <div className="v-cap-n">02</div>
                <div className="v-cap-t">Smart recommendations</div>
                <div className="v-cap-d">Matched to your dates, your pace and the kind of trip you want.</div>
                <div className="v-cap-tag">Intelligence</div>
              </div>
              <div className="v-cap">
                <div className="v-cap-n">03</div>
                <div className="v-cap-t">Live conditions</div>
                <div className="v-cap-d">Current weather, seasons and what to expect, so timing is never a guess.</div>
                <div className="v-cap-tag">Real-time</div>
              </div>
              <div className="v-cap">
                <div className="v-cap-n">04</div>
                <div className="v-cap-t">Real budgets and routes</div>
                <div className="v-cap-d">All-in costs and multi-stop journeys, mapped end to end.</div>
                <div className="v-cap-tag">Planning</div>
              </div>
              <div className="v-cap">
                <div className="v-cap-n">05</div>
                <div className="v-cap-t">Culture, food and experiences</div>
                <div className="v-cap-d">The history, dishes and things worth doing once you arrive.</div>
                <div className="v-cap-tag">Depth</div>
              </div>
              <div className="v-cap">
                <div className="v-cap-n">06</div>
                <div className="v-cap-t">Conditions and safety</div>
                <div className="v-cap-d">What to watch out for, flagged before you set out.</div>
                <div className="v-cap-tag">Trust</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="roadmap">
          <div className="wrap">
            <div className="v-kicker reveal">
              <span className="vk-n">07</span> Where we go
            </div>
            <h2 className="section-title left reveal">The path from here.</h2>
            <div className="v-road reveal" data-d="1">
              <div className="v-phase is-now">
                <div className="v-phase-when">
                  Now <span className="v-phase-live">Live</span>
                </div>
                <p>Waitlist open, product in active development, and the founding team in place.</p>
              </div>
              <div className="v-phase">
                <div className="v-phase-when">Next</div>
                <p>A private beta with our first travellers, built around the core discovery experience.</p>
              </div>
              <div className="v-phase">
                <div className="v-phase-when">Later</div>
                <p>Public launch on iOS and Android, with deeper intelligence and local partners.</p>
              </div>
            </div>

            <div className="v-close reveal" id="invest" style={{ marginTop: 'clamp(64px,8vw,110px)' }}>
              <div className="v-kicker">
                <span className="vk-n" aria-hidden="true">
                  &#9656;
                </span>{' '}
                For investors &amp; partners
              </div>
              <p className="v-close-quote">
                We are building the layer India opens before every trip. <em>If that future is one you want to back, let us talk.</em>
              </p>
              <div className="v-close-row">
                <a className="v-email" href="mailto:hello@raasta.app?subject=Raasta%20Vision%20%26%20Investment">
                  <span>hello@raasta.app</span>
                </a>
                <a href="/founders" className="btn btn-text">
                  Meet the founders
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
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
        ctaHref="/#waitlist"
        ctaLabel="Join the waitlist"
        showCompanyCol
        current="vision"
        hashPrefix="/"
      />
    </>
  );
}
