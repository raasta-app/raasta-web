const ITEMS = [
  'Multi-stop trips',
  'Convoy Mode',
  'Group wishlist',
  'Shareable lists',
  'Curated collections',
  'Following travellers',
];

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="soon-run" aria-hidden={hidden || undefined}>
      {ITEMS.map((n) => (
        <li key={n}>
          <b>{n}</b>
          <em>Soon</em>
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function ComingNext() {
  return (
    <section className="soon" id="soon" aria-labelledby="soon-title">
      <div className="wrap">
        <div className="comm-head soon-head">
          <h2 className="comm-h reveal" id="soon-title">
            This is just the first road.
          </h2>
          <p className="comm-deck reveal" data-d="1">
            What we&rsquo;re building after launch. Join now and you get each one first.
          </p>
        </div>
      </div>

      <div className="soon-marquee reveal" data-d="2">
        <div className="soon-track">
          <Run />
          <Run hidden />
        </div>
      </div>
    </section>
  );
}
