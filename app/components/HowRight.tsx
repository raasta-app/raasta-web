const TOKENS = {
  road: { src: '/assets/pill-road.jpg', pos: '50% 50%' },
  trail: { src: '/assets/pill-trail.jpg', pos: '50% 15%' },
};

function Tok({ k }: { k: keyof typeof TOKENS }) {
  const t = TOKENS[k];
  return (
    <span className="stok" aria-hidden="true">
      <img src={t.src} alt="" style={{ objectPosition: t.pos }} loading="lazy" decoding="async" />
    </span>
  );
}

export default function HowRight() {
  return (
    <section className="hgr" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <span className="sec-eye sec-eye--mid reveal">02 &middot; How we get it right</span>
        <h2 className="stmt reveal" data-d="1" id="how-title">
          <span className="sa">Every road,</span> <Tok k="road" />{' '}
          <span className="sb">every stay, every season, every cost,</span>{' '}
          <span className="sa">checked before it goes up,</span>{' '}
          <span className="sb">with live weather on top.</span>{' '}
          <span className="sa">And our community keeps it that way,</span>{' '}
          <span className="sb">backpackers, riders, hikers</span> <Tok k="trail" />{' '}
          <span className="sa">telling us what&rsquo;s&nbsp;changed.</span>
        </h2>
      </div>
    </section>
  );
}
