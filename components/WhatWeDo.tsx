import Image from 'next/image';

export default function WhatWeDo() {
  return (
    <section className="wdo" id="what" aria-labelledby="what-title">
      <div className="wrap wdo-grid">
        <div className="wdo-say">
          <h2 className="wdo-h reveal" data-d="1" id="what-title">
            Not just where to go.{' '}
            <span>How to actually get there.</span>
          </h2>
          <p className="wdo-b reveal" data-d="2">
            When to go, how to get there, what it&rsquo;ll cost, what to pack and
            what could go wrong. Raasta isn&rsquo;t a booking site. It&rsquo;s what
            you check before you book anything.
          </p>
          <div className="wdo-cta reveal" data-d="3">
            <a className="wdo-btn" href="#features">
              See how it works
            </a>
            <a className="wdo-arrow" href="#features" tabIndex={-1} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 16 16 8M16 8H9.5M16 8v6.5"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="wdo-cards">
          <figure className="wcard wcard--over reveal" data-d="2">
            <span className="wcard-tag">Destinations</span>
            <Image
              src="/assets/story-meadow.jpg"
              alt="A traveller resting on a green meadow below cloud-wrapped peaks"
              width={2400}
              height={1600}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 32vw"
              quality={85}
            />
            <figcaption>Every place, in full.</figcaption>
          </figure>

          <figure className="wcard wcard--under reveal" data-d="3">
            <span className="wcard-tag">Weekend from your city</span>
            <Image
              src="/assets/circuits-ladakh.jpg"
              alt="A lone rider crossing a high, bare mountain slope"
              width={2400}
              height={1600}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 32vw"
              quality={85}
            />
            <figcaption>
              Got two days? See what&rsquo;s close enough, by road or train.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
