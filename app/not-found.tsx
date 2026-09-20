import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | Raasta',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf { min-height: 100vh; min-height: 100svh; display: grid; place-items: center; text-align: center; padding: 80px var(--pad) 72px; }
        .nf-inner { max-width: 440px; }
        .nf-num { font-family: var(--font-display); font-weight: 700; font-size: clamp(90px, 18.5vw, 173px); line-height: .9; letter-spacing: -.055em; color: var(--ink); }
        .nf-num span { color: var(--primary); }
        .nf-inner .eyebrow { justify-content: center; margin-top: clamp(10px, 1.8vw, 18px); }
        .nf-inner h1 { font-family: var(--font-display); font-weight: 600; font-size: clamp(21px, 2.7vw, 30px); letter-spacing: -.03em; line-height: 1.14; color: var(--ink); margin-top: 12px; }
        .nf-inner p { color: var(--muted); font-size: 15px; line-height: 1.65; margin: 12px auto 26px; max-width: 380px; }
        .nf-actions { display: inline-flex; flex-wrap: wrap; gap: 14px 18px; align-items: center; justify-content: center; }
        .nf-inner > * { opacity: 0; transform: translateY(16px); animation: nf-up .7s var(--ease) forwards; }
        .nf-num { animation-delay: .06s; }
        .nf-inner .eyebrow { animation-delay: .16s; }
        .nf-inner h1 { animation-delay: .24s; }
        .nf-inner p { animation-delay: .32s; }
        .nf-actions { animation-delay: .4s; }
        @keyframes nf-up { to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .nf-inner > * { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
      <main className="nf">
        <div className="nf-inner">
          <div className="nf-num">
            4<span>0</span>4
          </div>
          <span className="eyebrow">Off the map</span>
          <h1>Looks like you took a wrong turn.</h1>
          <p>This page moved, or it never made it onto the map. Let&apos;s get you back on the road.</p>
          <div className="nf-actions">
            <a href="/" className="btn btn-primary btn-lg">
              Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
