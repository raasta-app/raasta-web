import Image from 'next/image';

const TOKENS = {
  road: { src: '/assets/pill-road.jpg', w: 720, h: 480, pos: '50% 50%', alt: 'A mountain road winding down a valley' },
  trail: { src: '/assets/pill-trail.jpg', w: 720, h: 405, pos: '50% 15%', alt: 'Trekkers walking a snowy trail' },
};

function Tok({ k }: { k: keyof typeof TOKENS }) {
  const t = TOKENS[k];
  return (
    <span className="stok" aria-hidden="true">
      <Image src={t.src} alt={t.alt} width={t.w} height={t.h} sizes="120px" quality={85} style={{ objectPosition: t.pos }} />
    </span>
  );
}

export default function HowRight() {
  return (
    <section className="hgr" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <h2 className="stmt reveal" data-d="1" id="how-title">
          <span className="sa">Every road,</span> <Tok k="road" />{' '}
          <span className="sb">every season, every cost, every warning,</span>{' '}
          <span className="sa">checked before it goes up,</span>{' '}
          <span className="sb">with live weather on top.</span>{' '}
          <span className="sa">And our community keeps it that way:</span>{' '}
          <span className="sb">backpackers, riders and hikers</span> <Tok k="trail" />{' '}
          <span className="sa">telling us what&rsquo;s&nbsp;changed.</span>
        </h2>
      </div>
    </section>
  );
}
