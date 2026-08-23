import React from 'react';
import { useReducedMotion } from 'motion/react';

interface LogoMarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/**
 * Scrolling pill row. Pauses on hover; renders as a static wrapped row
 * under prefers-reduced-motion.
 */
export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  items,
  reverse = false,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  const pill = (label: string, key: React.Key) => (
    <span
      key={key}
      className="flex flex-shrink-0 items-center gap-2 rounded-full border border-tsa-orange/30 bg-space-800/50 px-4 py-2 text-sm font-medium text-tsa-orange"
    >
      {label}
    </span>
  );

  if (prefersReduced) {
    return (
      <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
        {items.map((item, i) => pill(item, i))}
      </div>
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex gap-3 whitespace-nowrap group-hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((item, i) => pill(item, i))}
      </div>
    </div>
  );
};
