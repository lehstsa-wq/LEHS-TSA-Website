import React from 'react';

interface SegmentedToggleProps {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

/** Pill switch. Arrow keys move between options, matching radiogroup semantics. */
export const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const offset = e.key === 'ArrowRight' ? 1 : -1;
    onChange(options[(index + offset + options.length) % options.length]);
  };

  return (
    <div
      role="radiogroup"
      className={`inline-flex gap-1 rounded-full p-1 ${className}`}
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-hairline)' }}
    >
      {options.map((option, i) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={e => handleKeyDown(e, i)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              selected ? 'bg-electric-500 text-white' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
