import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

export interface Stage {
  /** Short ordinal shown beside the title, e.g. "01". */
  num: string;
  title: string;
  body: string;
  /** CSS colour used for the active accent. */
  accent: string;
  /** Illustration shown in the panel while this stage is active. */
  image: string;
  /** Alt text for that illustration. */
  imageAlt: string;
}

interface StageSceneProps {
  eyebrow: string;
  title: string;
  dek?: string;
  stages: Stage[];
  className?: string;
}

/**
 * Scroll-driven scene: the steps sit beside an illustration panel, and both pin
 * to the viewport while the page scrolls through a tall track, advancing one
 * step at a time.
 *
 * Progress comes from a passive scroll listener reading getBoundingClientRect,
 * so nothing intercepts wheel or touch input — scrolling stays entirely under
 * the reader's control. Under prefers-reduced-motion the scene collapses to a
 * plain stacked list with every step and its illustration shown at once.
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

  /** The illustration box. Every image is mounted and cross-faded so switching
   *  stages never shows a blank frame while a new file loads. */
  const visual = (current: Stage) => (
    <div
      className="relative overflow-hidden w-full"
      style={{
        borderRadius: 'var(--card-radius)',
        border: '1px solid var(--c-hairline)',
        background: '#FFFFFF',
        boxShadow: 'var(--shadow-card)',
        aspectRatio: '4 / 3',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 z-10"
        style={{ background: current.accent }}
      />
      {stages.map(s => {
        const shown = s.num === current.num;
        return (
          <img
            key={s.num}
            src={s.image}
            alt={shown ? s.imageAlt : ''}
            aria-hidden={shown ? undefined : true}
            className="absolute inset-0 h-full w-full object-contain p-8 sm:p-12 transition-opacity duration-500"
            style={{ opacity: shown ? 1 : 0 }}
            decoding="async"
          />
        );
      })}
    </div>
  );

  const stageRow = (stage: Stage, isActive: boolean) => (
    <li
      key={stage.num}
      aria-current={isActive ? 'step' : undefined}
      className="flex items-start gap-4 transition-all duration-500"
      style={{
        opacity: isActive ? 1 : 0.4,
        borderRadius: 'var(--card-radius)',
        padding: '1rem 1.25rem',
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
      <section
        className={className}
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {header}
          <div className="mt-14 space-y-12">
            {stages.map(s => (
              <div key={s.num} className="grid gap-6 md:grid-cols-2 md:items-center">
                <ol>{stageRow(s, true)}</ol>
                {visual(s)}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      {/* The track's extra height is the distance the pinned panel scrubs through. */}
      <div ref={trackRef} style={{ height: `${100 + stages.length * 55}vh` }}>
        <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            {header}

            <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <ol className="space-y-3">
                  {stages.map((s, i) => stageRow(s, i === active))}
                </ol>

                <div className="mt-8 flex gap-1.5" aria-hidden="true">
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

              {visual(stages[active])}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
