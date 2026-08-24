import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   CURSOR: crosshair dot + trailing ring, showroom-scoped
   ───────────────────────────────────────────────────────────────────────
   Active only while the pointer is inside a `.sr` region (legacy pages and
   form fields keep the native cursor). The dot tracks instantly; the ring
   trails with the same exponential lerp the parallax engine uses. States:

   · default       : 6px dot + 34px ring
   · [data-cursor] : ring expands and shows the label (e.g. "VIEW")
   · pressed       : ring contracts

   Elements marked [data-magnetic] are pulled toward the pointer within
   ~80px and spring back on leave. Touch and reduced-motion: never mounts.
   ═══════════════════════════════════════════════════════════════════════ */

const LERP = 0.16;
const MAGNET_RADIUS = 80;
const MAGNET_PULL = 0.35;

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let x = -100, y = -100;   // pointer
    let rx = -100, ry = -100; // ring (lerped)
    let inShowroom = false;
    let raf = 0;

    let magnet: HTMLElement | null = null;

    const evaluate = (target: HTMLElement | null) => {
      const sr = !!target?.closest?.('.sr');
      const nativeZone = !!target?.closest?.('input, textarea, select, [data-native-cursor]');
      const nowIn = sr && !nativeZone;
      if (nowIn !== inShowroom) {
        inShowroom = nowIn;
        document.documentElement.classList.toggle('sr-cursor-on', inShowroom);
        dot.style.opacity = ring.style.opacity = inShowroom ? '1' : '0';
      }

      /* cursor state label */
      const stateEl = target?.closest?.('[data-cursor]') as HTMLElement | null;
      const state = stateEl?.dataset.cursor ?? '';
      ring.dataset.state = state ? 'labeled' : '';
      label.textContent = state.toUpperCase();

      /* magnetic pull */
      const magEl = target?.closest?.('[data-magnetic]') as HTMLElement | null;
      if (magEl !== magnet) {
        if (magnet) magnet.style.transform = '';
        magnet = magEl;
        if (magnet) magnet.style.transition = 'transform 300ms cubic-bezier(0.16,1,0.3,1)';
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < Math.max(r.width, MAGNET_RADIUS)) {
          magnet.style.transform = `translate(${dx * MAGNET_PULL}px, ${dy * MAGNET_PULL}px)`;
        } else {
          magnet.style.transform = '';
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      evaluate(e.target as HTMLElement | null);
      dot.style.transform = `translate(${x}px, ${y}px)`;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /* scroll moves the page under a stationary pointer: re-check what's
       beneath it so the ring/label never go stale outside .sr regions */
    const onScroll = () => {
      if (x < 0) return;
      evaluate(document.elementFromPoint(x, y) as HTMLElement | null);
    };

    const tick = () => {
      rx += (x - rx) * LERP;
      ry += (y - ry) * LERP;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const onDown = () => ring.classList.add('is-pressed');
    const onUp = () => ring.classList.remove('is-pressed');
    const onLeave = () => {
      inShowroom = false;
      document.documentElement.classList.remove('sr-cursor-on');
      dot.style.opacity = ring.style.opacity = '0';
      if (magnet) { magnet.style.transform = ''; magnet = null; }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('sr-cursor-on');
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="sr-cursor-dot" aria-hidden />
      <div ref={ringRef} className="sr-cursor-ring" aria-hidden>
        <span ref={labelRef} className="sr-cursor-label" />
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   GRAIN: animated film-grain overlay (fixed, above content, below modals)
   ═══════════════════════════════════════════════════════════════════════ */
export const Grain: React.FC = () => <div className="sr-grain" aria-hidden />;
