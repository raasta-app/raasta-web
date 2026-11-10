export default function WhatWeDo() {
  return (
    <section className="wdo" id="what" aria-labelledby="what-title">
      <div className="wrap wdo-grid">
        <div className="wdo-say">
          <span className="sec-eye reveal">01 &middot; What we do</span>
          <h2 className="wdo-h reveal" data-d="1" id="what-title">
            Not just where to go.{' '}
            <span>How to actually get there.</span>
          </h2>
          <p className="wdo-b reveal" data-d="2">
            Cost, timing, permits, what to pack, what the road is like, a plan
            for each day. Raasta is not a booking site. We help you work out what a
            trip involves, and whether it is worth going now.
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
            <img
              src="/assets/story-meadow.jpg"
              alt="A traveller resting on a green meadow below cloud-wrapped peaks"
              loading="lazy"
              decoding="async"
            />
            <figcaption>A single place, in full.</figcaption>
          </figure>

          <figure className="wcard wcard--under reveal" data-d="3">
            <span className="wcard-tag">Circuits</span>
            <img
              src="/assets/circuits-ladakh.jpg"
              alt="A lone rider crossing a high, bare mountain slope"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Trips with more than one stop. How many days, where to stop, and
              in what order.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
