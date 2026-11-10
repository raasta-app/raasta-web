const TRIPS = [
  { p: 'Spiti Valley', r: 'Himachal Pradesh', s: 'Summer', drove: true },
  { p: 'Majuli', r: 'Assam', s: 'Autumn', drove: false },
  { p: 'Gurez', r: 'Kashmir', s: 'Summer', drove: true },
  { p: 'Chopta', r: 'Uttarakhand', s: 'Winter', drove: false },
  { p: 'Gandikota', r: 'Andhra Pradesh', s: 'Winter', drove: true },
];

const CARDS = [
  {
    h: 'Every state you cross.',
    b: 'Twenty-eight states and eight union territories. The map fills in as you go, and the gaps tell you where to head next.',
  },
  {
    h: 'The season you saw it in.',
    b: 'Only some months are right for a place. The same valley in June and in December is two different trips, kept separately.',
  },
  {
    h: 'Who else went.',
    b: 'Follow people whose trips look like yours, and read where they have been before you plan anything of your own.',
  },
];

export default function Community() {
  return (
    <section className="comm" id="community" aria-labelledby="comm-title">
      <div className="wrap">
        <div className="comm-head">
          <div>
            <span className="sec-eye reveal">04 &middot; The logbook</span>
            <h2 className="comm-h reveal" data-d="1" id="comm-title">
              Every trip you take, written down properly.
            </h2>
          </div>
          <p className="comm-deck reveal" data-d="2">
            You will forget which year you saw Majuli in the rain. Raasta will
            not.
          </p>
        </div>

        <div className="bento">
          <article className="bento-tall reveal" data-d="2">
            <span className="bento-lbl">What it keeps</span>
            <ul className="bento-trips">
              {TRIPS.map((t) => (
                <li key={t.p}>
                  <b>{t.p}</b>
                  <span>{t.r}</span>
                  <em>
                    {t.s}
                    {t.drove && <i>Drove it</i>}
                  </em>
                </li>
              ))}
            </ul>
            <p className="bento-foot">
              <span className="bento-bar" aria-hidden="true"></span>
              Five trips in, and it keeps going.
            </p>
          </article>

          <div className="bento-side">
            {CARDS.map((c, i) => (
              <article className="bento-card reveal" data-d={i + 3} key={c.h}>
                <span className="bento-rule" aria-hidden="true"></span>
                <b>{c.h}</b>
                <span className="bento-b">{c.b}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
