import React, { useId } from 'react';

interface DiamondFieldProps {
  /**
   * hero   — full-bleed backdrop behind a page hero
   * band   — subtle texture behind a content band
   * corner — small accent cluster, e.g. a stat card corner
   */
  variant: 'hero' | 'band' | 'corner';
  className?: string;
}

const CONFIG = {
  hero:   { size: 88, opacity: 0.16, stroke: 1.1 },
  band:   { size: 64, opacity: 0.08, stroke: 1.0 },
  corner: { size: 26, opacity: 0.5,  stroke: 1.0 },
} as const;

/**
 * Decorative rotated-square lattice in TSA blue. Never conveys information.
 */
export const DiamondField: React.FC<DiamondFieldProps> = ({ variant, className = '' }) => {
  // useId() embeds ':' which is invalid in CSS selectors — strip it so url(#id) is safe.
  const patternId = `diamond-${useId().replace(/:/g, '')}`;
  const { size, opacity, stroke } = CONFIG[variant];
  const half = size / 2;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M ${half} 0 L ${size} ${half} L ${half} ${size} L 0 ${half} Z`}
            fill="none"
            stroke="var(--c-blue-bright)"
            strokeWidth={stroke}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
