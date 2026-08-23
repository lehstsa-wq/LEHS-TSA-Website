import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  /** Milliseconds each stage is shown before advancing. */
  interval?: number;
  className?: string;
}

/**
 * Steps beside an illustration that advances on its own every few seconds.
 *
 * Rotation pauses while the pointer is over the scene or keyboard focus is
 * inside it, so nobody loses their place mid-read, and the step buttons let
 * you take over entirely. Under prefers-reduced-motion nothing rotates: every
 * step is shown at once beside its own illustration.
 */
export const StageScene: React.FC<StageSceneProps> = ({
  eyebrow,
  title,
  dek,
  stages,
  interval = 5000,
  className = '',
}) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  const select = useCallback((i: number) => setActive(i), []);


  useEffect(() => {
    if (prefersReduced || paused || stages.length < 2) return;
    timer.current = window.setInterval(
      () => setActive(i => (i + 1) % stages.length),
      interval,
    );
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [prefersReduced, paused, stages.length, interval]);

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

  /** Illustration box. Every image stays mounted and cross-fades, so a switch
   *  never shows a blank frame while a file loads. */
  const visual = (current: Stage) => (
    <div
      className="relative overflow-hidden w-full"
      style={{
        borderRadius: 'var(--card-radius)',
        border: '1px solid var(--c-hairline)',
        background: 'var(--c-card)',
        aspectRatio: '4 / 3',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 z-10 transition-colors duration-500"
        style={{ background: current.accent }}
      />
      <img
        key={current.num}
        src={current.image}
        alt={current.imageAlt}
        className="stage-visual absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
    </div>
  );

  const stageRow = (stage: Stage, isActive: boolean, i?: number) => {
    const inner = (
      <>
        <span
          className="font-mono text-xs pt-1 flex-shrink-0 transition-colors duration-300"
          style={{ color: isActive ? stage.accent : 'var(--c-text-muted)' }}
        >
          {stage.num}
        </span>
        <span className="block">
          <span className="block font-bold text-ink">{stage.title}</span>
          <span className="block text-sm leading-relaxed text-ink-dim mt-1">{stage.body}</span>
        </span>
      </>
    );

    const style: React.CSSProperties = {
      opacity: isActive ? 1 : 0.45,
      borderRadius: 'var(--card-radius)',
      padding: '0.85rem 1.1rem',
      background: isActive ? 'var(--c-card)' : 'transparent',
      border: `1px solid ${isActive ? stage.accent + '55' : 'transparent'}`,
    };

    // Static list under reduced motion; otherwise each step is selectable.
    if (i === undefined) {
      return (
        <li key={stage.num} className="flex items-start gap-4" style={style}>
          {inner}
        </li>
      );
    }

    return (
      <li key={stage.num}>
        <button
          type="button"
          onClick={() => select(i)}
          aria-current={isActive ? 'step' : undefined}
          className="flex w-full items-start gap-4 text-left transition-all duration-500"
          style={style}
        >
          {inner}
        </button>
      </li>
    );
  };

  const wrapperPadding = {
    paddingTop: 'var(--section-py)',
    paddingBottom: 'var(--section-py)',
  };

  if (prefersReduced) {
    return (
      <section className={className} style={wrapperPadding}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {header}
          <div className="mt-8 space-y-8">
            {stages.map(s => (
              <div key={s.num} className="grid gap-5 md:grid-cols-2 md:items-center">
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
    <section
      className={className}
      style={wrapperPadding}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {header}

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <ol className="space-y-2">
              {stages.map((s, i) => stageRow(s, i === active, i))}
            </ol>

            <div className="mt-5 flex gap-1.5">
              {stages.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show step ${s.num}, ${s.title}`}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? '2rem' : '0.9rem',
                    background: i === active ? s.accent : 'var(--c-hairline)',
                  }}
                />
              ))}
            </div>
          </div>

          {visual(stages[active])}
        </div>
      </div>
    </section>
  );
};
