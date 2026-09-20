'use client';

import { useRef } from 'react';
import SubNav from './SubNav';
import Footer from './Footer';
import { useSubpageScrollNav } from '../hooks/useScrollNav';
import { useReveal } from '../hooks/useReveal';
import { useParallax } from '../hooks/useParallax';
import { useStatementHighlight } from '../hooks/useStatementHighlight';

export default function FoundersContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useSubpageScrollNav(navRef, progressRef);
  useReveal();
  useParallax();
  useStatementHighlight();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" id="progress" aria-hidden="true" ref={progressRef}></div>

      <SubNav navRef={navRef} current="founders" />

      <main id="main">
        <header className="ph-hero">
          <div className="wrap">
            <span className="eyebrow ph-rise">About Raasta</span>
            <h1 className="ph-title ph-rise d1">
              The people
              <br />
              building Raasta
            </h1>
            <p className="ph-lead ph-rise d2">A new way to discover India. One that helps travellers find places worth visiting, and gives hidden destinations the attention they deserve.</p>
          </div>
        </header>

        <section className="statement tight">
          <div className="wrap">
            <p className="statement-text">India has some of the most varied landscapes, cultures and food anywhere in the world. Yet most travellers only ever see the same ten places. We are building Raasta to change that.</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <article className="founder-feat reveal">
              <div className="ff-grid">
                <div className="ff-rail">
                  <div className="ff-photo ff-photo--armaan" role="img" aria-label="Photograph of Armaan Parvez"></div>
                  <h2 className="ff-name">Armaan Parvez</h2>
                  <ul className="ff-meta">
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                        <circle cx={12} cy={8} r={6} />
                      </svg>
                      <span>
                        <b>Founder &amp; CEO</b>
                      </span>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        <rect width={20} height={14} x={2} y={6} rx={2} />
                      </svg>
                      <span>Product Designer</span>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx={12} cy={12} r={10} />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                      <span>4 yrs · 45+ products · 24+ countries</span>
                    </li>
                  </ul>
                  <div className="ff-links">
                    <a href="https://armaanux.in" target="_blank" rel="noopener">
                      armaanux.in
                    </a>
                    <a href="https://www.linkedin.com/in/armaanux" target="_blank" rel="noopener">
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="ff-main">
                  <blockquote className="ff-quote">&ldquo;There are so many ways to book a trip in India, and almost none to help you decide where to go.&rdquo;</blockquote>
                  <div className="ff-body">
                    <p>Armaan loved travel long before he could actually do much of it. While researching trips across India, he kept running into the same problem. There were endless ways to book a hotel or a flight, but almost nothing to help him decide where he should go in the first place.</p>
                    <p>It bothered him that a country this big keeps getting reduced to the same few spots. India has some of the most varied landscapes, cultures and food anywhere, yet most people keep going back to the same crowded places, only because they never find out what else is out there.</p>
                    <p>So he started Raasta, to turn scattered, confusing research into one clear answer, and to give the country&apos;s overlooked places a way to be found.</p>
                  </div>
                </div>
              </div>
            </article>

            <article className="founder-feat reveal">
              <div className="ff-grid">
                <div className="ff-rail">
                  <div className="ff-photo ff-photo--sid" role="img" aria-label="Photograph of Siddharth Singh"></div>
                  <h2 className="ff-name">Siddharth Singh</h2>
                  <ul className="ff-meta">
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                        <circle cx={12} cy={8} r={6} />
                      </svg>
                      <span>
                        <b>Co-Founder</b>
                      </span>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        <rect width={20} height={14} x={2} y={6} rx={2} />
                      </svg>
                      <span>Full-stack engineer</span>
                    </li>
                    <li>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m16 18 6-6-6-6" />
                        <path d="m8 6-6 6 6 6" />
                      </svg>
                      <span>3+ XP | JavaScript, Python and Gen AI</span>
                    </li>
                  </ul>
                  <div className="ff-links">
                    <a href="https://sidonweb.com" target="_blank" rel="noopener">
                      sidonweb.com
                    </a>
                    <a href="https://www.linkedin.com/in/sidonweb" target="_blank" rel="noopener">
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="ff-main">
                  <blockquote className="ff-quote">&ldquo;I heard the idea once, and I knew I wanted to help build it.&rdquo;</blockquote>
                  <div className="ff-body">
                    <p>Siddharth joined the moment he heard the idea. He and Armaan have known each other since Class 9, when they went to the same school, and he was one of the first people to back the idea that Raasta could change how people explore India.</p>
                    <p>He builds software that has to work under real-world conditions. His work includes enterprise-grade access management software and event ticketing systems used during IPL matches with heavy user traffic.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="break-img" aria-label="India, waiting to be explored">
          <div className="break-bg" style={{ backgroundImage: "url('/assets/about-mission.jpg')" }}></div>
          <div className="break-veil"></div>
          <div className="wrap break-inner reveal">
            <span className="break-kicker">the mission</span>
            <h2 className="break-title">
              Most of India is still
              <br />
              waiting to be found.
            </h2>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="ph-head reveal" style={{ maxWidth: 840 }}>
              <span className="eyebrow">What we&apos;re building</span>
              <h2 className="section-title left">
                Not another booking platform.
                <br />A discovery platform.
              </h2>
              <p className="sec-sub" style={{ maxWidth: 660 }}>
                Booking flights and hotels is already easy. Deciding where to go is not. Raasta is not here to sell you a room. It is here to help you decide where to go, and why.
              </p>
            </div>
            <div className="facets reveal">
              <span>Destinations</span>
              <span>Experiences</span>
              <span>Culture</span>
              <span>Food</span>
              <span>Local stories</span>
            </div>
            <div className="ph-actions reveal" style={{ marginTop: 'clamp(34px,4vw,48px)' }}>
              <a href="/vision" className="btn btn-lg btn-ink">
                Read our vision
              </a>
            </div>
          </div>
        </section>

        <section className="section section-alt founder-note">
          <div className="wrap">
            <article className="fn-card reveal">
              <div className="fn-grid">
                <aside className="fn-rail">
                  <div className="fn-head">
                    <span className="eyebrow">A note from the founder</span>
                    <h2 className="fn-title">Why we&rsquo;re building Raasta</h2>
                  </div>
                </aside>

                <div className="fn-body fn-main">
                  <p className="fn-lead">Travel should feel exciting, not exhausting.</p>

                  <p>Think about the last time you wanted to take a break and visit somewhere new. What did you do first? Most of us open Google, scroll through Instagram reels, watch YouTube videos, read blogs, compare websites, and ask friends for recommendations. Hours later, we&rsquo;re often left with more questions than answers.</p>

                  <ul className="fn-ask">
                    <li>How does the place actually look today?</li>
                    <li>Is it worth visiting right now?</li>
                    <li>Is it safe?</li>
                    <li>What should I expect when I get there?</li>
                  </ul>

                  <p className="fn-em">That uncertainty is what inspired Raasta.</p>

                  <p>We&rsquo;re building Raasta to become India&rsquo;s trusted travel companion. A place where you can discover destinations, understand real conditions, know what to expect, and confidently decide where and when to travel. No endless tabs. No scattered information. Just everything you need in one place.</p>
                  <p>Our vision goes far beyond helping people plan trips. We want to map the beauty of India in a way that has never been done before. From famous destinations to hidden gems, we want every traveller to have access to reliable, up-to-date information that helps them travel smarter and safer.</p>
                  <p>As Raasta grows, we&rsquo;ll continue introducing intelligent features powered by AI, personalized recommendations, safety tools, and a comprehensive destination library designed around real traveller needs.</p>

                  <p className="fn-em">At the heart of it all, our goal is simple: to build trust.</p>

                  <ul className="fn-list">
                    <li>Trust that the information is accurate.</li>
                    <li>Trust that you&rsquo;re making the right decision.</li>
                    <li>Trust that wherever your journey takes you, Raasta will help you get there with confidence.</li>
                  </ul>

                  <p className="fn-em">This is just the beginning of a much larger vision, and we&rsquo;re excited to build it for every traveller across India.</p>

                  <div className="fn-sign">
                    <span className="fn-name">On behalf of the Raasta team</span>
                  </div>
                </div>
              </div>
            </article>
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
        current="founders"
        hashPrefix="/"
      />
    </>
  );
}
