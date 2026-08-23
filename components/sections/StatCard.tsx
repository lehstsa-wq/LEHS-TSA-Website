import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { DiamondField } from './DiamondField';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/** Counts up to `value` when scrolled into view. Static under reduced motion. */
export const Counter: React.FC<CounterProps> = ({ value, suffix = '', duration = 1.5 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => spring.on('change', v => setDisplay(Math.floor(v))), [spring]);

  if (prefersReduced) {
    return <span ref={ref}>{value}{suffix}</span>;
  }

  return <span ref={ref}>{display}{suffix}</span>;
};

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  /** Internal route. When present the whole card becomes a link. */
  href?: string;
  /** CSS colour for the border tint. Defaults to TSA blue. */
  accent?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix,
  label,
  description,
  href,
  accent = 'var(--c-blue)',
}) => {
  const body = (
    <div
      className="relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
      style={{
        borderRadius: 'var(--stat-radius)',
        padding: 'var(--stat-pad)',
        border: `1px solid color-mix(in srgb, ${accent} 32%, transparent)`,
        background: 'var(--c-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="absolute top-0 right-0 h-20 w-20">
        <DiamondField variant="corner" />
      </div>

      <div className="relative">
        <div className="text-4xl font-bold" style={{ color: accent }}>
          <Counter value={value} suffix={suffix} />
        </div>
        <h3 className="mt-2 text-sm font-bold uppercase tracking-wide text-ink">{label}</h3>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{description}</p>
        )}
      </div>
    </div>
  );

  return href ? <Link to={href} className="block h-full">{body}</Link> : body;
};
