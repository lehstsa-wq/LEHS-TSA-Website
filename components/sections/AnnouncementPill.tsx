import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AnnouncementPillProps {
  /** Short uppercase category, e.g. "NEXT EVENT". */
  label: string;
  /** The announcement itself. */
  text: string;
  /** Internal route the pill links to. */
  href: string;
  /** Call-to-action text at the end of the pill. */
  cta: string;
  className?: string;
}

/** Rounded announcement bar that sits above a page hero. */
export const AnnouncementPill: React.FC<AnnouncementPillProps> = ({
  label,
  text,
  href,
  cta,
  className = '',
}) => (
  <Link
    to={href}
    className={`group inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full px-4 py-2 transition-all hover:-translate-y-0.5 ${className}`}
    style={{
      border: '1px solid var(--c-hairline)',
      background: 'var(--c-card)',
      boxShadow: 'var(--shadow-card)',
    }}
  >
    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--c-red)' }}>
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--c-red)' }} />
      {label}
    </span>
    <span aria-hidden="true" style={{ color: 'var(--c-hairline)' }}>|</span>
    <span className="text-sm text-ink-dim">{text}</span>
    <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--c-blue-bright)' }}>
      {cta}
      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);
