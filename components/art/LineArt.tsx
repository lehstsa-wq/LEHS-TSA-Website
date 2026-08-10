import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   LINE ART — parametric blueprint illustrations, drawn by code
   ───────────────────────────────────────────────────────────────────────
   Every drawing is generated geometry (no traced assets): gears, measure
   rings, constellations, circuit traces, isometric solids. All strokes are
   1px `currentColor` on transparent, so each piece inherits ink/blue/red
   from its parent. Pass `draw` (default true) and the paths draw themselves
   in when scrolled into view via stroke-dashoffset — the illustration IS
   the animation. Reduced-motion users see them pre-drawn (CSS gate).
   ═══════════════════════════════════════════════════════════════════════ */

const DEG = Math.PI / 180;
const pt = (cx: number, cy: number, r: number, deg: number): [number, number] =>
  [cx + r * Math.cos(deg * DEG), cy + r * Math.sin(deg * DEG)];
const f = (n: number) => +n.toFixed(2);

/** Self-draw hook: measures every geometry element, hides it behind its own
 *  dash length, then releases (staggered) when the svg enters the viewport. */
function useDraw(enabled: boolean) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || !enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const shapes = Array.from(
      svg.querySelectorAll<SVGGeometryElement>('path, circle, line, polyline, polygon, rect')
    );
    for (const s of shapes) {
      const len = s.getTotalLength();
      s.style.strokeDasharray = `${len}`;
      s.style.strokeDashoffset = `${len}`;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        shapes.forEach((s, i) => {
          s.style.transition = `stroke-dashoffset 1400ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`;
          s.style.strokeDashoffset = '0';
        });
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [enabled]);
  return ref;
}

interface ArtProps {
  size?: number | string;
  draw?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Svg: React.FC<ArtProps & { viewBox: string; children: React.ReactNode; label: string }> = ({
  size = 200, draw = true, className, style, viewBox, children, label,
}) => {
  const ref = useDraw(draw);
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      role="img"
      aria-label={label}
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
};

/* ── GEAR — involute-ish spur gear, parametric teeth ────────────────── */
export const Gear: React.FC<ArtProps & { teeth?: number }> = ({ teeth = 14, ...p }) => {
  const C = 100, ro = 82, rr = 66, rh = 22, rb = 34;
  const step = 360 / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const [x1, y1] = pt(C, C, rr, a);
    const [x2, y2] = pt(C, C, ro, a + step * 0.2);
    const [x3, y3] = pt(C, C, ro, a + step * 0.45);
    const [x4, y4] = pt(C, C, rr, a + step * 0.65);
    d += `${i === 0 ? `M ${f(x1)} ${f(y1)}` : ''} L ${f(x2)} ${f(y2)} L ${f(x3)} ${f(y3)} L ${f(x4)} ${f(y4)} `;
    const [x5, y5] = pt(C, C, rr, a + step);
    d += `A ${rr} ${rr} 0 0 1 ${f(x5)} ${f(y5)} `;
  }
  d += 'Z';
  const spokes = [0, 60, 120, 180, 240, 300].map(a => {
    const [x1, y1] = pt(C, C, rh + 2, a);
    const [x2, y2] = pt(C, C, rb + 8, a);
    return <line key={a} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} />;
  });
  return (
    <Svg viewBox="0 0 200 200" label="Technical gear drawing" {...p}>
      <path d={d} />
      <circle cx={C} cy={C} r={rb} />
      <circle cx={C} cy={C} r={rh} />
      <circle cx={C} cy={C} r={rr} strokeDasharray="3 5" opacity={0.5} />
      {spokes}
      <line x1={C - 6} y1={C} x2={C + 6} y2={C} />
      <line x1={C} y1={C - 6} x2={C} y2={C + 6} />
    </Svg>
  );
};

/* ── MEASURE RING — instrument dial with graduated ticks ────────────── */
export const MeasureRing: React.FC<ArtProps & { ticks?: number }> = ({ ticks = 72, ...p }) => {
  const C = 100, rO = 92, rI = 64;
  const tickEls = Array.from({ length: ticks }, (_, i) => {
    const a = (i / ticks) * 360;
    const major = i % (ticks / 12) === 0;
    const [x1, y1] = pt(C, C, rO, a);
    const [x2, y2] = pt(C, C, rO - (major ? 12 : 5), a);
    return <line key={i} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} opacity={major ? 1 : 0.45} />;
  });
  return (
    <Svg viewBox="0 0 200 200" label="Measurement ring dial" {...p}>
      <circle cx={C} cy={C} r={rO} />
      <circle cx={C} cy={C} r={rI} opacity={0.6} />
      <circle cx={C} cy={C} r={rI - 14} strokeDasharray="2 6" opacity={0.35} />
      {tickEls}
      <line x1={C} y1={C} x2={C + rI - 18} y2={C - 30} />
      <circle cx={C} cy={C} r={3} />
    </Svg>
  );
};

/* ── CONSTELLATION — star chart plotted from data points ────────────── */
export const Constellation: React.FC<ArtProps & { points?: [number, number][] }> = ({
  points = [[20, 150], [55, 70], [105, 110], [140, 35], [175, 90], [150, 160]],
  ...p
}) => (
  <Svg viewBox="0 0 200 200" label="Constellation chart" {...p}>
    <polyline points={points.map(([x, y]) => `${x},${y}`).join(' ')} opacity={0.7} />
    {points.map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={i % 2 ? 2.5 : 4} />
        <line x1={x - 8} y1={y} x2={x - 5} y2={y} opacity={0.5} />
        <line x1={x + 5} y1={y} x2={x + 8} y2={y} opacity={0.5} />
      </g>
    ))}
    <circle cx={points[3][0]} cy={points[3][1]} r={10} strokeDasharray="2 4" opacity={0.6} />
  </Svg>
);

/* ── CIRCUIT TRACE — manhattan-routed traces with pads ──────────────── */
export const Circuit: React.FC<ArtProps> = (p) => (
  <Svg viewBox="0 0 200 200" label="Circuit trace drawing" {...p}>
    <path d="M 10 40 H 70 V 90 H 120" />
    <path d="M 10 70 H 45 V 130 H 95 V 160 H 150" />
    <path d="M 190 30 H 140 V 60 H 120 V 90" />
    <path d="M 190 110 H 160 V 90" opacity={0.7} />
    <path d="M 150 160 H 190" opacity={0.7} />
    <rect x={112} y={82} width={16} height={16} />
    <circle cx={10} cy={40} r={4} />
    <circle cx={10} cy={70} r={4} />
    <circle cx={190} cy={30} r={4} />
    <circle cx={190} cy={110} r={4} />
    <circle cx={190} cy={160} r={4} />
    <circle cx={70} cy={40} r={2} opacity={0.6} />
    <circle cx={45} cy={130} r={2} opacity={0.6} />
  </Svg>
);

/* ── ISO CUBE — exploded isometric solid with dimension marks ───────── */
export const IsoCube: React.FC<ArtProps> = (p) => {
  const s = 44;
  const iso = (x: number, y: number, z: number): [number, number] =>
    [f(100 + (x - y) * 0.866 * s), f(105 + (x + y) * 0.5 * s - z * s)];
  const V = {
    a: iso(-1, -1, 0), b: iso(1, -1, 0), c: iso(1, 1, 0), d: iso(-1, 1, 0),
    e: iso(-1, -1, 1), g: iso(1, -1, 1), h: iso(1, 1, 1), i: iso(-1, 1, 1),
  };
  const L = (p1: [number, number], p2: [number, number], k: string, o = 1) => (
    <line key={k} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} opacity={o} />
  );
  return (
    <Svg viewBox="0 0 200 200" label="Isometric cube drawing" {...p}>
      {L(V.a, V.b, 'ab')}{L(V.b, V.c, 'bc')}{L(V.c, V.d, 'cd', 0.4)}{L(V.d, V.a, 'da', 0.4)}
      {L(V.e, V.g, 'eg')}{L(V.g, V.h, 'gh')}{L(V.h, V.i, 'hi')}{L(V.i, V.e, 'ie')}
      {L(V.a, V.e, 'ae')}{L(V.b, V.g, 'bg')}{L(V.c, V.h, 'ch')}{L(V.d, V.i, 'di', 0.4)}
      {/* dimension arrow */}
      <line x1={V.e[0] - 14} y1={V.e[1]} x2={V.a[0] - 14} y2={V.a[1]} opacity={0.6} />
      <line x1={V.e[0] - 18} y1={V.e[1]} x2={V.e[0] - 10} y2={V.e[1]} opacity={0.6} />
      <line x1={V.a[0] - 18} y1={V.a[1]} x2={V.a[0] - 10} y2={V.a[1]} opacity={0.6} />
      <circle cx={100} cy={105 - s * 0.0}  r={2} opacity={0.5} />
    </Svg>
  );
};

/* ── CROSSHAIR — registration mark ──────────────────────────────────── */
export const Crosshair: React.FC<ArtProps> = (p) => (
  <Svg viewBox="0 0 200 200" label="Registration crosshair" {...p}>
    <circle cx={100} cy={100} r={40} />
    <circle cx={100} cy={100} r={14} opacity={0.6} />
    <line x1={100} y1={30} x2={100} y2={72} />
    <line x1={100} y1={128} x2={100} y2={170} />
    <line x1={30} y1={100} x2={72} y2={100} />
    <line x1={128} y1={100} x2={170} y2={100} />
  </Svg>
);

/* ── ORBIT — atom/gyroscope ellipses ────────────────────────────────── */
export const Orbit: React.FC<ArtProps> = (p) => (
  <Svg viewBox="0 0 200 200" label="Orbital gyroscope drawing" {...p}>
    <ellipse cx={100} cy={100} rx={88} ry={30} />
    <ellipse cx={100} cy={100} rx={88} ry={30} transform="rotate(60 100 100)" />
    <ellipse cx={100} cy={100} rx={88} ry={30} transform="rotate(-60 100 100)" opacity={0.7} />
    <circle cx={100} cy={100} r={8} />
    <circle cx={100} cy={70} r={3} opacity={0.8} />
    <circle cx={168} cy={124} r={3} opacity={0.8} />
  </Svg>
);
