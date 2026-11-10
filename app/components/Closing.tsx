import WaitlistForm from './WaitlistForm';

export default function Closing() {
  return (
    <section className="close" id="close" aria-labelledby="close-title">
      <div className="wrap">
        <div className="close-slab">
          <figure className="close-shot reveal reveal--fade">
            <img
              src="/assets/pill-road.jpg"
              alt="An empty road running out through open country"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="close-in">
            <span className="close-eye reveal">Join the waitlist</span>
            <h2 className="close-h reveal" data-d="1" id="close-title">
              Go touch some grass.{' '}
              <span>We&rsquo;ll tell you where.</span>
            </h2>

            <div className="close-note">
              <p className="reveal" data-d="2">
                I kept planning trips the way everybody does. Eleven tabs, a group
                chat, and a blog from 2016. And I still ended up somewhere I had
                already seen on a reel.
              </p>
              <p className="reveal" data-d="3">
                So I started building the thing I wanted to open first. It is not
                ready yet. When it is, you will get one email.
              </p>
            </div>

            <p className="close-sign reveal" data-d="4">
              <b>Armaan</b>
              <span>Founder, Raasta &middot; Delhi</span>
            </p>

            <div className="close-form reveal" data-d="5">
              <WaitlistForm variant="foot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
