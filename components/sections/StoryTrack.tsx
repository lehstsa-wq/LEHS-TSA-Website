import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryTrackProps {
  /** One card per child. Each becomes a scroll-snap stop. */
  children: React.ReactNode;
  className?: string;
  /** Accessible name for the scrollable region. */
  label: string;
}

/**
 * Horizontal scroll-snap track with arrow controls. The track itself is a
 * native scroll container, so touch, trackpad and keyboard scrolling all work
 * without interception; the arrows are a convenience on top.
 */
export const StoryTrack: React.FC<StoryTrackProps> = ({ children, className = '', label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const arrow = (dir: 1 | -1, disabled: boolean) => (
    <button
      type="button"
      onClick={() => nudge(dir)}
      disabled={disabled}
      aria-label={dir === 1 ? 'Scroll right' : 'Scroll left'}
      className="grid h-9 w-9 place-items-center rounded-full transition-all disabled:opacity-30"
      style={{ border: '1px solid var(--c-hairline)', background: 'var(--c-card)' }}
    >
      {dir === 1 ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
    </button>
  );

  return (
    <div className={className}>
      <div className="mb-4 flex justify-end gap-2">
        {arrow(-1, atStart)}
        {arrow(1, atEnd)}
      </div>

      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] [scroll-snap-type:x_mandatory]"
      >
        {React.Children.map(children, child => (
          <div className="flex-shrink-0 [scroll-snap-align:start] w-[min(22rem,80vw)]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
