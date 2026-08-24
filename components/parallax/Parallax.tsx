import React, {
  createContext, useContext, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { parallaxEngine, type Depth, type Effect, type Intensity } from './engine';

/* ═══════════════════════════════════════════════════════════════════════
   PARALLAX PRIMITIVES
   <ParallaxStage> : full-viewport chapter; owns perspective + intensity.
   <ParallaxLayer> : a depth plane that registers with the shared engine
                      while it is on-screen.
   ═══════════════════════════════════════════════════════════════════════ */

interface StageContextValue {
  intensity: Intensity;
  effect: Effect;
}
const StageContext = createContext<StageContextValue>({ intensity: 'full', effect: 'airy' });

/* ── STAGE ──────────────────────────────────────────────────────────── */
interface StageProps {
  children: React.ReactNode;
  /** 'full' = Tier A experiential · 'soft' = Tier B editorial semi-parallax */
  intensity?: Intensity;
  effect?: Effect;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fullHeight?: boolean;
}

export const ParallaxStage: React.FC<StageProps> = ({
  children, intensity = 'full', effect = 'airy', className = '', as = 'section', fullHeight = true,
}) => {
  const Tag = as as any;
  return (
    <StageContext.Provider value={{ intensity, effect }}>
      <Tag
        className={`sr-stage ${className}`}
        style={fullHeight ? undefined : { minHeight: 'auto' }}
      >
        {children}
      </Tag>
    </StageContext.Provider>
  );
};

/* ── LAYER ──────────────────────────────────────────────────────────── */
interface LayerProps {
  children: React.ReactNode;
  depth: Depth;
  /** Override the stage effect for this single layer. */
  effect?: Effect;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<LayerProps> = ({
  children, depth, effect, className = '', style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { intensity, effect: stageEffect } = useContext(StageContext);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parallaxEngine.motionOK) return;

    // The page itself never moves: only 'deep' ART layers lean with the
    // cursor. Text (mid), HUD, and content stay pinned.
    if (depth !== 'deep') return;

    let unregister: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !unregister) {
          unregister = parallaxEngine.register({
            el, depth, intensity, effect: effect ?? stageEffect,
          });
        } else if (!entry.isIntersecting && unregister) {
          unregister();
          unregister = null;
        }
      },
      { rootMargin: '10% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      unregister?.();
    };
  }, [depth, intensity, effect, stageEffect]);

  const zIndex =
    depth === 'deep' ? 'var(--sr-z-deep)'
    : depth === 'hud' ? 'var(--sr-z-hud)'
    : 'var(--sr-z-mid)';

  return (
    <div
      ref={ref}
      className={`sr-layer ${className}`}
      style={{ position: 'relative', zIndex: zIndex as any, ...style }}
    >
      {children}
    </div>
  );
};

/* ── SCROLL REVEAL ──────────────────────────────────────────────────── */
/** Adds `.is-in` when the element enters the viewport once. Pair with the
 *  `.sr-reveal` class from tokens.css. Respects reduced-motion (via CSS). */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return ref;
}

/* ── HUD ────────────────────────────────────────────────────────────── */
export const Hud: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="sr-hud">{children}</div>
);

type Corner = 'tl' | 'tr' | 'bl' | 'br';
export const HudCorner: React.FC<{ at: Corner; children: React.ReactNode; className?: string }> = ({
  at, children, className = '',
}) => <div className={`sr-hud__corner sr-hud__${at} ${className}`}>{children}</div>;

/* ── CHAPTER MARK (index № + red rule + micro label) ────────────────── */
export const ChapterMark: React.FC<{
  index: string; label: string; className?: string; style?: React.CSSProperties;
}> = ({ index, label, className = '', style }) => (
  <div className={`flex items-center gap-4 ${className}`} style={{ marginBottom: '2rem', ...style }}>
    <span className="sr-index">{index}</span>
    <span className="sr-rule" />
    <span className="sr-micro">{label}</span>
  </div>
);

/* ── REVEAL (scroll-in wrapper; pairs .sr-reveal + IntersectionObserver) */
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}> = ({ children, className = '', style, as = 'div' }) => {
  const Tag = as as any;
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref as any} className={`sr-reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
};

/* ── SHOWROOM HERO (shared Tier-A chapter-00 for every page) ─────────── */
interface SrHeroProps {
  index: string;
  chapter: string;
  ghost?: string;
  /** extra artwork (imgs, <LineArt/>) composited into the deep layer */
  art?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  cta?: { to: string; label: string; external?: boolean };
  /** closing-call heroes: shorter stage, no dead air */
  compact?: boolean;
}
export const SrHero: React.FC<SrHeroProps> = ({ index, chapter, ghost, art, title, lede, cta, compact }) => (
  <ParallaxStage intensity="full" effect="airy" fullHeight={!compact}
    className={compact ? 'sr-hero--compact' : ''}>
    <ParallaxLayer depth="deep" className="pointer-events-none" style={{ position: 'absolute', inset: 0 }}>
      <div className="sr-aurora" />
      {ghost && (
        <span
          aria-hidden
          className="sr-display"
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            color: 'transparent', WebkitTextStroke: '1px var(--sr-ghost-stroke)',
            fontSize: 'min(42vw, 40rem)', whiteSpace: 'nowrap', userSelect: 'none',
          }}
        >
          {ghost}
        </span>
      )}
      {art}
    </ParallaxLayer>

    <ParallaxLayer depth="mid">
      <div style={{ padding: compact ? 'var(--sr-chapter-pad) var(--sr-edge)' : '0 var(--sr-edge)', maxWidth: 'min(100%, 62rem)' }}>
        <div className="sr-rise" style={{ '--rise': 0 } as React.CSSProperties}>
          <ChapterMark index={index} label={chapter} />
        </div>
        <h1
          className="sr-display sr-rise"
          style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)', maxWidth: '16ch', '--rise': 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        {lede && (
          <p className="sr-lede sr-rise" style={{ marginTop: '1.5rem', '--rise': 2 } as React.CSSProperties}>
            {lede}
          </p>
        )}
        {cta && (
          <div className="sr-rise" style={{ marginTop: '2rem', '--rise': 3 } as React.CSSProperties}>
            {cta.external ? (
              <a href={cta.to} target="_blank" rel="noopener noreferrer" className="sr-link" data-magnetic>
                {cta.label} <ArrowRight size={13} className="sr-link__arrow" />
              </a>
            ) : (
              <Link to={cta.to} className="sr-link" data-magnetic>
                {cta.label} <ArrowRight size={13} className="sr-link__arrow" />
              </Link>
            )}
          </div>
        )}
      </div>
    </ParallaxLayer>

    {!compact && (
      <ParallaxLayer depth="hud" className="pointer-events-none" style={{ position: 'absolute', inset: 0 }}>
        <Hud>
          <HudCorner at="tl">
            <span className="sr-micro" style={{ color: 'var(--sr-ink)' }}>LEHS · TSA</span>
            <span className="sr-micro">LITTLE ELM, TX</span>
          </HudCorner>
          <HudCorner at="tr">
            <span className="sr-index">{index}</span>
            <span className="sr-rule" />
            <span className="sr-micro">{chapter}</span>
          </HudCorner>
          <HudCorner at="br">
            <div className="flex flex-col items-center gap-3">
              <span className="sr-micro sr-micro--xs">SCROLL</span>
              <span className="sr-cue" />
            </div>
          </HudCorner>
        </Hud>
      </ParallaxLayer>
    )}
  </ParallaxStage>
);

/* ── SHOWROOM PAGE (Tier B): compact art header + static content shell.
   For functional/editorial pages: same canvas, typography, aurora, and art
   language, but a short header instead of a 100dvh hero, and everything
   below stays pinned. */
interface SrPageProps {
  index: string;
  chapter: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  art?: React.ReactNode;
  children: React.ReactNode;
}
export const SrPage: React.FC<SrPageProps> = ({ index, chapter, title, lede, art, children }) => (
  <div className="sr">
    <header style={{ position: 'relative', padding: 'var(--sr-chapter-pad) var(--sr-edge) calc(var(--sr-chapter-pad) * 0.6)', overflow: 'clip' }}>
      <div className="sr-aurora" style={{ opacity: 0.16 }} />
      {art}
      <div style={{ position: 'relative', maxWidth: '74rem', margin: '0 auto' }}>
        <div className="sr-rise" style={{ '--rise': 0 } as React.CSSProperties}>
          <ChapterMark index={index} label={chapter} />
        </div>
        <h1
          className="sr-display sr-rise"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', maxWidth: '18ch', '--rise': 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        {lede && (
          <p className="sr-lede sr-rise" style={{ marginTop: '1.25rem', '--rise': 2 } as React.CSSProperties}>
            {lede}
          </p>
        )}
      </div>
    </header>
    <main style={{ position: 'relative', maxWidth: '74rem', margin: '0 auto', padding: '0 var(--sr-edge) var(--sr-stack-gap)' }}>
      {children}
    </main>
  </div>
);
