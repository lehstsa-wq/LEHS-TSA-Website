import React from 'react';

interface SectionProps {
  /** 'dark' paints a deeper band, for alternating light/dark rhythm. */
  tone?: 'default' | 'dark';
  /** Draws a hairline rule along the top edge. */
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Standard page band: consistent vertical rhythm and a centred max-width shell.
 */
export const Section: React.FC<SectionProps> = ({
  tone = 'default',
  bordered = false,
  className = '',
  children,
}) => (
  <section
    className={`relative ${tone === 'dark' ? 'bg-space-950/60' : ''} ${className}`}
    style={{
      paddingTop: 'var(--section-py)',
      paddingBottom: 'var(--section-py)',
      borderTop: bordered ? '1px solid var(--c-hairline)' : undefined,
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);
