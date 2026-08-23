import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

export interface Stage {
  /** Short ordinal shown beside the title, e.g. "01". */
  num: string;
  title: string;
  body: string;
  /** CSS colour used for the active accent. */
  accent: string;
}

interface StageSceneProps {
  eyebrow: string;
  title: string;
  dek?: string;
  stages: Stage[];
  className?: string;
}

/**
 * A scroll-driven scene: the header and stage list pin to the viewport while the
 * page scrolls through a tall track, advancing one stage at a time.
 *
 * Uses CSS `position: sticky` plus scroll progress — it never intercepts wheel
 * or touch events, so scrolling stays entirely under the reader's control.
 * Under prefers-reduced-motion the whole thing collapses to a plain static list
 * with every stage shown at full prominence.
 */
export const StageScene: React.FC<StageSceneProps> = ({
  eyebrow,
  title,
  dek,
  stages,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();

  // A passive scroll listener rather than an animation-frame-driven motion
  // value: this stays correct when the tab is backgrounded (where rAF is
  // throttled), and it is directly observable in tests.
  const syncStage = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrubbable = rect.height - window.innerHeight;
    if (scrubbable <= 0) return;
    const progress = Math.min(1, Math.max(0, -rect.top / scrubbable));
    const next = Math.min(stages.length - 1, Math.floor(progress * stages.length));
    setActive(prev => (prev === next ? prev : next));
  }, [stages.length]);

  useEffect(() => {
    if (prefersReduced) return;
    syncStage();
    window.addEventListener('scroll', syncStage, { passive: true });
    window.addEventListener('resize', syncStage);
    return () => {
      window.removeEventListener('scroll', syncStage);
      window.removeEventListener('resize', syncStage);
    };
  }, [syncStage, prefersReduced]);

  const header = (
    <div className="text-center">
      <p className="section-eyebrow justify-center">
        <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
        {eyebrow}
        <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
      </p>
      <h2 className="section-h2">{title}</h2>
      {dek && <p className="section-dek mx-auto">{dek}</p>}
    </div>
  );

  const stageRow = (stage: Stage, isActive: boolean) => (
    <li
      key={stage.num}
      aria-current={isActive ? 'step' : undefined}
      className="flex items-start gap-5 transition-all duration-500"
      style={{
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
        borderRadius: 'var(--card-radius)',
        padding: '1.25rem 1.5rem',
        background: isActive ? 'var(--c-card)' : 'transparent',
        border: `1px solid ${isActive ? stage.accent + '55' : 'transparent'}`,
      }}
    >
      <span
        className="font-mono text-xs pt-1 flex-shrink-0"
        style={{ color: isActive ? stage.accent : 'var(--c-text-muted)' }}
      >
        {stage.num}
      </span>
      <div>
        <h3 className="font-bold text-ink">{stage.title}</h3>
        <p className="text-sm leading-relaxed text-ink-dim mt-1">{stage.body}</p>
      </div>
    </li>
  );

  if (prefersReduced) {
    return (
      <section className={className} style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {header}
          <ol className="mt-12 space-y-3">
            {stages.map(s => stageRow(s, true))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {/* Tall track: its height is what the pinned panel scrubs through. */}
      <div ref={trackRef} style={{ height: `${stages.length * 70}vh` }}>
        <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {header}

            <ol className="mt-12 space-y-3">
              {stages.map((s, i) => stageRow(s, i === active))}
            </ol>

            <div className="mt-8 flex justify-center gap-1.5" aria-hidden="true">
              {stages.map((s, i) => (
                <span
                  key={s.num}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? '2rem' : '0.75rem',
                    background: i === active ? s.accent : 'var(--c-hairline)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
