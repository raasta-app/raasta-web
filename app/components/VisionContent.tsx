'use client';

import { useRef, useState } from 'react';
import SubNav from './SubNav';
import Footer from './Footer';
import { useSubpageScrollNav } from '../hooks/useScrollNav';
import { useReveal } from '../hooks/useReveal';

const STATUS = ['Pre-revenue', 'Bootstrapped', 'Website live', 'Waitlist active', 'Product in development'];

const LOOKS: [string, string][] = [
  ['Instagram and reels', 'Thirty seconds of a beautiful place, with no idea when to go, what it costs, or how you get there.'],
  ['Travel blogs', 'One person’s trip from 2016, with prices and road conditions that stopped being true years ago.'],
  ['Google Maps', 'Excellent at where a place is. Silent on whether you should be there this month.'],
  ['Weather apps', 'Today’s forecast for a trip you are taking in March.'],
  ['Reddit and forums', 'Genuinely useful, and two hours deep. You have to read forty replies to find the three that apply to you.'],
  ['YouTube vlogs', 'Forty minutes per place. Watch four and you have spent an evening on a shortlist of four.'],
  ['AI chatbots', 'Fast, fluent and occasionally confident about a road that has been shut since last monsoon.'],
  ['WhatsApp groups', 'You end up going wherever the first person to reply has already been.'],
];

const FORCES = [
  {
    n: '01',
    k: 'Travel',
    h: 'India is travelling like never before',
    b: 'Domestic travel has come back harder than anyone expected, and the people driving it are younger, travelling more often, and openly bored of the same few cities. They want somewhere that is theirs, not somewhere that was on a list.',
  },
  {
    n: '02',
    k: 'Behaviour',
    h: 'Discovery moved to feeds, and stayed there',
    b: 'Nobody types where should I go in India into a search box any more. They see a place on a reel, save it, and then lose an evening trying to turn that thirty seconds into something they could actually book.',
  },
  {
    n: '03',
    k: 'Tooling',
    h: 'Real curation is finally affordable',
    b: 'Ten years ago, explaining a thousand places properly meant a thousand writers. Between better data and better models, a small team can now research at that depth and keep it current, which is what makes this buildable at all.',
  },
];

const BUILD = [
  {
    t: 'Discover',
    h: 'Places worth the journey',
    b: 'Destinations and circuits from across India, not the same shortlist everyone already knows. Every one is researched, scored and written up by us before it goes anywhere near the app, because a recommendation you cannot trust is worse than no recommendation.',
  },
  {
    t: 'Fit',
    h: 'Matched to the trip you are actually taking',
    b: 'Four days in December with two friends and a real budget is a completely different question from two weeks in May on your own. Same country, different answer. We treat your dates, your pace and your money as the input, not an afterthought.',
  },
  {
    t: 'Timing',
    h: 'Whether to go now',
    b: 'Seasons, weather on your dates, whether the road is open, whether the pass has cleared, whether it is peak or dead. The difference between a good trip and a wasted flight is almost always timing, and it is the thing nothing else tells you.',
  },
  {
    t: 'Cost',
    h: 'What it costs from where you live',
    b: 'All-in and honest, starting from your city rather than from Delhi. Travel, stay, food, permits, the bits people forget. A number you can argue about with a friend instead of a range that means nothing.',
  },
  {
    t: 'Routes',
    h: 'Many stops, in the right order',
    b: 'Circuits mapped end to end, with the drives sanity-checked and the stops sequenced so you are not doubling back across a state. The order matters more than the list.',
  },
  {
    t: 'Depth',
    h: 'What the place is actually like',
    b: 'The history, the food, what is worth your time once you are standing there, and the things worth knowing before you go. Permits, altitude, landslide season, how it feels solo, what to watch out for.',
  },
];

const BELIEFS = [
  {
    h: 'Nobody pays to be recommended',
    b: 'The moment a place can buy its way up the list, every other answer on the page becomes worthless. We would rather make money somewhere that does not touch the ranking.',
  },
  {
    h: 'Say when not to go',
    b: 'A tool that only ever says yes is a brochure. If your dates are wrong for a place, the useful thing is to tell you, and tell you what would work instead.',
  },
  {
    h: 'Fewer, better answers',
    b: 'Two hundred results is not choice, it is the same problem in a new tab. Being genuinely useful means being willing to leave things out and say why.',
  },
  {
    h: 'Written by people who went',
    b: 'Research at scale does not mean scraped. Someone has to be accountable for every place we put in front of you, which is slower, and the only version worth building.',
  },
  {
    h: 'Quiet places stay quiet',
    b: 'Sending ten thousand people to a village of four hundred is not discovery, it is what happened to every place that got popular. How we handle that is a product decision, not a footnote.',
  },
];

const NEVER = [
  'Sell placement, sponsored destinations or paid ranking',
  'Publish a place nobody on the team has researched properly',
  'Pad the app with a thousand listings to look comprehensive',
  'Pretend a model wrote something a person should have checked',
];

const PATH = [
  {
    k: 'Now',
    when: '2026',
    b: 'The website is live and the waitlist is open. The product is in active development, the research pipeline is running, and we are bootstrapped and pre-revenue. Everything on this page is what we are building towards, not what is finished.',
    live: true,
  },
  {
    k: 'Next',
    when: 'Private beta',
    b: 'A small group of real travellers on the core experience, with a first set of destinations and circuits researched end to end. The only question that matters here is whether people actually use it to decide, or go back to their tabs.',
  },
  {
    k: 'Then',
    when: 'Public launch',
    b: 'iOS and Android, broader coverage across the states, and proper depth on timing and cost. Shared lists, so the deciding happens with the people you are going with rather than in a group chat.',
  },
  {
    k: 'Later',
    when: 'The longer game',
    b: 'If we get the deciding right, Raasta becomes the thing you open first, before the booking sites and before the group chat. That is the position worth holding, and it is the one nothing in Indian travel occupies today.',
  },
];

export default function VisionContent() {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(0);

  useSubpageScrollNav(navRef, progressRef);
  useReveal();

  return (
    <>
      <div className="statusbar-fill" aria-hidden="true"></div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SubNav navRef={navRef} current="vision" />

      <main id="main" className="vs">
        <header className="vs-hero" aria-labelledby="vs-title">
          <div className="wrap">
            <div className="vs-hero-grid">
              <div className="vs-say">
                <span className="vs-eye reveal">Vision &middot; Pre-launch, 2026</span>
                <h1 className="vs-h1 reveal" data-d="1" id="vs-title">
                  Booking a trip is easy. Deciding on one is the hard part.
                </h1>
                <p className="vs-lead reveal" data-d="2">
                  Every year more people in India travel, and every year the deciding gets
                  harder. There are more places to go than ever and less certainty about
                  any of them. Raasta is being built for that part of the trip, the weeks
                  before anything is booked, when all you are trying to work out is where
                  to go, when, and whether it is worth going now.
                </p>
                <div className="vs-cta reveal" data-d="3">
                  <a className="btn btn-primary btn-lg" href="#invest">
                    Talk to us
                  </a>
                  <a className="vs-jump" href="#problem">
                    Read the thesis
                  </a>
                </div>
              </div>

              <dl className="vs-status reveal" data-d="2">
                <dt>Where we are today</dt>
                {STATUS.map((s, i) => (
                  <dd key={s}>
                    {i === 0 && <i className="vs-live" aria-hidden="true"></i>}
                    {s}
                  </dd>
                ))}
              </dl>
            </div>
          </div>
        </header>

        <section className="vs-sec vs-belief" aria-labelledby="vs-belief-t">
          <div className="wrap">
            <p className="vs-stmt reveal" id="vs-belief-t">
              A billion people, thousands of places,{' '}
              <span>and no good way to decide where to go.</span>{' '}
              Discovery is the largest unsolved problem in Indian travel, and the one we
              are building Raasta to solve.
            </p>
          </div>
        </section>

        <section className="vs-sec" id="problem" aria-labelledby="vs-problem-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">01 &middot; The problem</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-problem-t">
                  Everything is a source. Nothing is an answer.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                There is no shortage of information about travelling in India. There is no
                single place that turns any of it into a decision.
              </p>
            </div>

            <div className="vs-read reveal" data-d="2">
              <p>
                Think about how you actually planned your last trip. You probably did not
                sit down and research. You saw somewhere on a reel, sent it to a friend,
                and then a week later tried to remember what it was called. Then came the
                tabs. Maps for where it is. A blog for what it is like. A weather app for
                whether March works. Reddit for whether it is worth it. A booking site to
                find out what any of it costs.
              </p>
              <p>
                Each of those tools is good at its one job. Not one of them was built to
                answer the question you started with, which was never where is this place.
                It was should I go here, and should I go now. So you end up doing the
                joining-up yourself, badly, at eleven at night, across a dozen tabs that
                do not know the others exist.
              </p>
              <p>
                Most people give up somewhere in the middle. They pick the place they have
                already heard of, because at least there they know what they are getting.
                That is why the same ten destinations stay permanently crowded while the
                rest of the country stays a rumour, and why planning one trip properly
                still takes a fortnight of evenings.
              </p>
            </div>

            <div className="vs-card vs-looksc reveal" data-d="3">
              <h3 className="vs-card-h">Where people look today, and what each one leaves out</h3>
              <ul className="vs-looks">
                {LOOKS.map(([name, gap]) => (
                  <li key={name}>
                    <b>{name}</b>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="vs-sec" id="who" aria-labelledby="vs-who-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">02 &middot; Who this is for</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-who-t">
                  The people who want to go somewhere else.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                Not first-time tourists working through a list. People on their fourth or
                fifth trip, looking for somewhere they have not already seen online.
              </p>
            </div>

            <div className="vs-read reveal" data-d="2">
              <p>
                They are in their twenties and thirties, mostly in the cities, and they
                travel a few times a year rather than once. They have already done Goa and
                Manali and the obvious bits of Rajasthan. They are not looking for a
                package or a tour. They are looking for somewhere good that they had not
                thought of, and they would like to be reasonably sure about it before they
                commit four days and a chunk of their salary.
              </p>
              <p>
                What stops them is not money and it is not time off. It is the not
                knowing. Will it be raining. Is the road open in February. Is this place
                still quiet or did it get discovered last year. Is it alright to do this
                one on my own. Those are answerable questions, and right now the only way
                to answer them is to ask a friend who happens to have been, which is why
                so many trips end up being someone else's trip, taken again.
              </p>
              <p>
                We are building for that person, and we are building the thing that friend
                does. Not a booking engine and not a feed. The bit in between, where the
                deciding happens.
              </p>
            </div>
          </div>
        </section>

        <section className="vs-sec" id="whynow" aria-labelledby="vs-now-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">03 &middot; Why now</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-now-t">
                  The pieces did not exist five years ago.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                Three things changed at roughly the same time, and together they make this
                worth building now rather than in 2019.
              </p>
            </div>
            <div className="vs-forces">
              {FORCES.map((f, i) => (
                <article className="vs-force reveal" data-d={i + 2} key={f.k}>
                  <span className="vs-tag">
                    {f.n} &middot; {f.k}
                  </span>
                  <h3>{f.h}</h3>
                  <p>{f.b}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vs-sec" id="opportunity" aria-labelledby="vs-opp-t">
          <div className="wrap vs-split">
            <div className="vs-say">
              <span className="vs-eye reveal">04 &middot; The opportunity</span>
              <h2 className="vs-h2 reveal" data-d="1" id="vs-opp-t">
                A country this varied deserves better than a shortlist.
              </h2>
              <p className="vs-body reveal" data-d="2">
                India has 28 states and 8 union territories, and somewhere between a
                desert and a rainforest there is a version of almost every trip a person
                could want to take. Almost all of that travel funnels into the same small
                handful of places.
              </p>
              <p className="vs-body reveal" data-d="3">
                That gap, between what the country actually holds and what anybody
                actually gets recommended, is the whole opportunity. It is not a
                distribution problem or a pricing problem. Nobody has built the thing that
                decides.
              </p>
            </div>

            <figure className="vs-card vs-share reveal" data-d="2">
              <div className="vs-bar" aria-hidden="true">
                <span className="vs-bar-fill"></span>
              </div>
              <figcaption>
                <div>
                  <b>A handful of places</b>
                  <span>take most of the trips</span>
                </div>
                <div className="vs-rest">
                  <b>The rest of India</b>
                  <span>still waiting to be found</span>
                </div>
              </figcaption>
              <dl className="vs-figs">
                <div>
                  <dt>States and union territories</dt>
                  <dd>36</dd>
                </div>
                <div>
                  <dt>Destinations researched so far</dt>
                  <dd>500+</dd>
                </div>
              </dl>
            </figure>
          </div>
        </section>

        <section className="vs-sec" id="product" aria-labelledby="vs-build-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">05 &middot; What we are building</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-build-t">
                  Not a list of places. The whole decision.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                Six things have to be true at once for the deciding to feel easy. Each one
                is useless on its own, which is why they have to live in one place.
              </p>
            </div>

            <ul className="vs-acc reveal" data-d="2">
              {BUILD.map((x, i) => (
                <li className={open === i ? 'is-open' : undefined} key={x.h}>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    onClick={() => setOpen(i)}
                  >
                    <span className="vs-acc-tag">{x.t}</span>
                    <span className="vs-acc-h">{x.h}</span>
                    <i aria-hidden="true"></i>
                  </button>
                  <div className="vs-acc-b">
                    <p>{x.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="vs-sec" id="beliefs" aria-labelledby="vs-bel-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">06 &middot; What we believe</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-bel-t">
                  The decisions we have already made.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                A recommendation is only worth anything if you know what is behind it. So
                here is what we have committed to, while it is still early enough to
                matter.
              </p>
            </div>

            <ul className="vs-beliefs">
              {BELIEFS.map((b, i) => (
                <li className="reveal" data-d={Math.min(i + 2, 6)} key={b.h}>
                  <b>{b.h}</b>
                  <span>{b.b}</span>
                </li>
              ))}
            </ul>

            <div className="vs-never reveal" data-d="4">
              <h3 className="vs-card-h">Things we will not do</h3>
              <ul>
                {NEVER.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="vs-sec" id="business" aria-labelledby="vs-biz-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">07 &middot; How this becomes a business</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-biz-t">
                  Honestly, without selling the answers.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                We are pre-revenue, so this is intent rather than a track record. It is
                worth stating anyway, because the model shapes the product.
              </p>
            </div>

            <div className="vs-read reveal" data-d="2">
              <p>
                Discovery will be free. It has to be, because the whole point is to be the
                first thing you open, and nobody pays to start thinking about a holiday.
                Free also means the incentive is to be genuinely useful rather than to
                keep you scrolling.
              </p>
              <p>
                Beyond that, the honest answer is that we are choosing between a few
                things and want real usage before we commit. The most likely shape is that
                the research and the planning tools stay free, and we charge for depth
                that costs us something to produce, or take a cut when a booking happens
                because we sent someone somewhere good. What we will not do is sell the
                ranking. The day a place can pay to appear higher, every answer on the
                page is worth less, including the honest ones.
              </p>
              <p>
                We are bootstrapped and intend to stay small for as long as that is
                possible. Research is the expensive part, not servers, and the quality of
                the research is the entire product.
              </p>
            </div>
          </div>
        </section>

        <section className="vs-sec" id="roadmap" aria-labelledby="vs-path-t">
          <div className="wrap">
            <div className="vs-head">
              <div>
                <span className="vs-eye reveal">08 &middot; Where this goes</span>
                <h2 className="vs-h2 reveal" data-d="1" id="vs-path-t">
                  The path from here.
                </h2>
              </div>
              <p className="vs-deck reveal" data-d="2">
                Four stages, and we are honest about being at the first one. Nothing below
                is finished.
              </p>
            </div>
            <ol className="vs-path">
              {PATH.map((s, i) => (
                <li className="reveal" data-d={i + 2} key={s.k}>
                  <div className="vs-path-k">
                    <b>
                      {s.live && <i className="vs-live" aria-hidden="true"></i>}
                      {s.k}
                    </b>
                    <em>{s.when}</em>
                  </div>
                  <p>{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="vs-sec vs-ask" id="invest" aria-labelledby="vs-ask-t">
          <div className="wrap vs-split">
            <div className="vs-say">
              <span className="vs-eye reveal">Investors and partners</span>
              <h2 className="vs-h2 reveal" data-d="1" id="vs-ask-t">
                We are building the layer India opens before every trip.
              </h2>
              <p className="vs-body reveal" data-d="2">
                If that is a future you want to back, we would like to hear from you.
                Happy to walk through the product, the research pipeline, what we have
                learned from the waitlist so far, and where the money would go.
              </p>
              <p className="vs-body reveal" data-d="3">
                Equally, if you run a homestay, a small operator or anything else in a
                place we ought to cover, we would rather hear from you early than write
                about you from a distance.
              </p>
            </div>
            <div className="vs-card vs-askcard reveal" data-d="2">
              <span className="vs-card-h">Get in touch</span>
              <a
                className="vs-mail"
                href="mailto:hello@raasta.app?subject=Raasta%20Vision%20%26%20Investment"
              >
                hello@raasta.app
              </a>
              <p className="vs-card-note">
                Armaan Parvez, founder. Usually replies the same day.
              </p>
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
        ctaHref="/#join"
        ctaLabel="Join the waitlist"
        showCompanyCol
        current="vision"
        hashPrefix="/"
      />
    </>
  );
}
