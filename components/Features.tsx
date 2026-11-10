import Image from 'next/image';

const STEPS = [
  {
    v: 'Find',
    h: 'See if it’s worth going.',
    p: 'Photos, who it suits, and the quick facts on cost, days and altitude.',
    src: '/screens/overview.png',
    alt: "Raasta's page for Chitkul in Himachal Pradesh, with a photo of the valley, a verified badge, tags, a short description and quick facts on cost, days and altitude",
    k: 'find',
  },
  {
    v: 'Plan',
    h: 'Know what it’ll cost.',
    p: 'A range per person from your city, split into travel, stay and food.',
    src: '/screens/cost-breakdown.png',
    alt: "Raasta's cost breakdown for Chitkul: 6,000 to 12,000 rupees per person, split into getting there, stay, and food and local travel",
    k: 'plan',
  },
  {
    v: 'Go',
    h: 'Hear what’s changed.',
    p: 'Travellers post new bus timings, closures and cheaper ways in.',
    src: '/screens/community.png',
    alt: 'Comments on Chitkul from travellers about a changed bus timing from Reckong Peo and a shared cab from Sangla',
    k: 'go',
  },
  {
    v: 'Count',
    h: 'Every place, counted.',
    p: 'Your states fill in as you go. How many of the 36 have you seen?',
    src: '/screens/profile.png',
    alt: 'A Raasta profile: 342 travellers found these comments helpful, a highest point of 3,450 m at Chitkul, and 12 of 36 states and union territories visited',
    k: 'count',
  },
];

export default function Features() {
  return (
    <section className="feats" id="features" aria-labelledby="feats-title">
      <div className="wrap">
        <div className="feats-head">
          <h2 className="sec-title reveal" data-d="1" id="feats-title">
            Find it. Plan it. Go. <span>Count it.</span>
          </h2>
          <p className="feats-sub reveal" data-d="2">
            One app for the whole trip, from the first look to the last photo.
          </p>
        </div>

        <ol className="road reveal" data-d="2" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li key={s.v}>
              <i />
              <span>0{i + 1}</span>
              <b>{s.v}</b>
            </li>
          ))}
        </ol>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className={`step step--${s.k} reveal`} data-d={i + 2} key={s.v}>
              <div className="step-say">
                <span className="step-tag">
                  0{i + 1} &middot; {s.v}
                </span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
              <div className="step-vis">
                <Image src={s.src} width={410} height={882} sizes="(max-width: 760px) 70vw, 300px" quality={90} alt={s.alt} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
