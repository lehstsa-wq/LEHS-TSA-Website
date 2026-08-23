import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  dek?: string;
  /** 'h1' for the page hero only — one per page. Defaults to 'h2'. */
  as?: 'h1' | 'h2';
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  dek,
  as = 'h2',
  align = 'center',
  className = '',
}) => {
  const centered = align === 'center';
  const Heading = as;

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <Reveal>
        <p className={`section-eyebrow ${centered ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
          {eyebrow}
          <span aria-hidden="true" className="section-eyebrow__flank">◆</span>
        </p>
      </Reveal>

      <Reveal delay={80}>
        <Heading className={as === 'h1' ? 'hero-title' : 'section-h2'}>{title}</Heading>
      </Reveal>

      {dek && (
        <Reveal delay={160}>
          <p className={`section-dek ${centered ? 'mx-auto' : ''}`}>{dek}</p>
        </Reveal>
      )}
    </div>
  );
};
