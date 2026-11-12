'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/faq';
import { EMAIL } from '@/lib/site';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <h2 className="comm-h reveal" id="faq-title">
            Questions you&rsquo;d <span>probably ask.</span>
          </h2>
          <p className="comm-deck reveal" data-d="1">
            Something else on your mind? Write to us. A real person reads every email.
          </p>
          <a className="faq-ask reveal" data-d="2" href={`mailto:${EMAIL}`}>
            {EMAIL}
            <i aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 16 16 8M16 8H9.5M16 8v6.5" />
              </svg>
            </i>
          </a>
        </div>

        <ul className="faq-list">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <li
                key={f.q}
                className="faq-item reveal"
                data-open={on || undefined}
                style={{ ['--d' as string]: Math.min(i, 6) }}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a${i}`}
                    onClick={() => setOpen(on ? null : i)}
                  >
                    <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-q">{f.q}</span>
                    <span className="faq-ic" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
