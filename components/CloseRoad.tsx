'use client';

import { useEffect, useRef, useState } from 'react';

interface Pin {
  t: number;
  name: string;
}

interface Variant {
  key: 'wide' | 'narrow';
  w: number;
  h: number;
  band: number;
  d: string;
  pins: Pin[];
}

const VARIANTS: Variant[] = [
  {
    key: 'wide',
    w: 1440,
    h: 260,
    band: 34,
    d: 'M -40 70 C 180 60 240 190 430 185 C 620 180 640 50 860 52 C 1080 54 1146 154 1020 196 C 900 236 720 200 720 260',
    pins: [
      { t: 0.2, name: 'Turtuk' },
      { t: 0.46, name: 'Shoja' },
      { t: 0.72, name: 'Dawki' },
    ],
  },
  {
    key: 'narrow',
    w: 390,
    h: 220,
    band: 24,
    d: 'M -20 40 C 80 30 120 110 200 104 C 280 98 300 30 350 50 C 400 70 380 140 300 150 C 220 160 195 170 195 220',
    pins: [
      { t: 0.24, name: 'Shoja' },
      { t: 0.5, name: 'Dawki' },
    ],
  },
];

const DUR = 2600;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Road({ v, go }: { v: Variant; go: boolean }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const maskRef = useRef<SVGPathElement | null>(null);
  const carRef = useRef<HTMLSpanElement | null>(null);
  const [spots, setSpots] = useState<{ x: number; y: number }[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setSpots(v.pins.map((p) => {
      const pt = path.getPointAtLength(p.t * len);
      return { x: (pt.x / v.w) * 100, y: (pt.y / v.h) * 100 };
    }));
  }, [v]);

  useEffect(() => {
    const path = pathRef.current;
    const mask = maskRef.current;
    const car = carRef.current;
    if (!go || !path || !mask || !car) return;
    const len = path.getTotalLength();
    const place = (p: number) => {
      mask.style.strokeDashoffset = String(1 - p);
      const pt = path.getPointAtLength(p * len);
      car.style.left = `${(pt.x / v.w) * 100}%`;
      car.style.top = `${(pt.y / v.h) * 100}%`;
      setReached(v.pins.filter((pin) => pin.t <= p).length);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      place(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      place(ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, v]);

  const id = `cr-mask-${v.key}`;

  return (
    <div className={`cr-v cr--${v.key}`} style={{ aspectRatio: `${v.w} / ${v.h}` }}>
      <svg viewBox={`0 0 ${v.w} ${v.h}`} aria-hidden="true">
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse">
            <path ref={maskRef} className="cr-mask" d={v.d} pathLength={1} strokeWidth={v.band + 12} />
          </mask>
        </defs>
        <g mask={`url(#${id})`}>
          <path ref={pathRef} className="cr-band" d={v.d} strokeWidth={v.band} />
          <path className="cr-line" d={v.d} />
        </g>
      </svg>
      {spots.map((s, i) => (
        <span key={v.pins[i]?.name} className={`cr-pin${i < reached ? ' on' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <span className="cr-pin-name">{v.pins[i]?.name}</span>
          <span className="cr-pin-dot" />
        </span>
      ))}
      <span ref={carRef} className={`cr-car${go ? ' on' : ''}`} />
    </div>
  );
}

export default function CloseRoad() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cr" ref={ref} aria-hidden="true">
      {VARIANTS.map((v) => (
        <Road key={v.key} v={v} go={go} />
      ))}
    </div>
  );
}
