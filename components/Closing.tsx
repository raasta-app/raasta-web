import Image from 'next/image';
import CloseRoad from './CloseRoad';
import WaitlistForm from './WaitlistForm';
import { BADGE_NAME, withArticle } from '@/lib/site';

const EDGES = Array.from({ length: 25 }, (_, i) => -3 + i * 0.25);

export default function Closing() {
  return (
    <section className="close" id="close" aria-labelledby="close-title">
      <CloseRoad />

      <div className="wrap close-in">
        <div className="close-who reveal">
          <span className="close-faces" aria-hidden="true">
            <Image src="/assets/armaan-parvez-3.jpg" alt="" width={480} height={480} sizes="34px" quality={85} />
            <Image src="/assets/siddharth.jpg" alt="" width={256} height={320} sizes="34px" quality={85} />
          </span>
          <span>
            <b>Armaan &amp; Siddharth</b>, founders
          </span>
        </div>

        <h2 className="close-h reveal" data-d="1" id="close-title">
          Go touch some grass. <span>We&rsquo;ll tell you where.</span>
        </h2>

        <div className="close-perk reveal" data-d="2">
          <span className="coin" role="img" aria-label={BADGE_NAME}>
            <span className="coin-float">
              <span className="coin-spin">
                {EDGES.map((z) => (
                  <span key={z} className="coin-edge" style={{ ['--z' as string]: `${z}px`, ['--s' as string]: Math.abs(z) / 3 }} />
                ))}
                <span className="coin-rim" />
                <span className="coin-face">
                  <img src="/assets/badge-coin.svg" alt="" width={240} height={240} loading="lazy" decoding="async" />
                  <span className="coin-gloss" />
                </span>
                <span className="coin-face coin-back">
                  <img src="/assets/badge-coin.svg" alt="" width={240} height={240} loading="lazy" decoding="async" />
                </span>
              </span>
            </span>
            <span className="coin-shadow" />
          </span>
          <p>Join now and you&rsquo;ll get {withArticle(BADGE_NAME)} on your profile when Raasta launches.</p>
        </div>

        <div className="close-form reveal" data-d="3">
          <WaitlistForm variant="foot" />
        </div>
      </div>
    </section>
  );
}
