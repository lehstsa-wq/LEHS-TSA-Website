import React, { useRef } from 'react';

interface SegmentedToggleProps {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

/**
 * Pill switch with radiogroup semantics: only the selected option is in the tab
 * order, and arrow keys move both selection and focus.
 *
 * Focus must move with the selection. Without it the previously focused button
 * keeps focus while dropping to tabIndex -1, and because the key handler closes
 * over that button's index, every later arrow press recomputes from the same
 * stale index, so navigation advances one step and then sticks.
 */
export const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % options.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + options.length) % options.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = options.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    onChange(options[next]);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      className={`inline-flex flex-wrap gap-1 rounded-full p-1 ${className}`}
      style={{ background: 'var(--c-surface)', border: '1px solid var(--c-hairline)' }}
    >
      {options.map((option, i) => {
        const selected = option === value;
        return (
          <button
            key={option}
            ref={el => { buttons.current[i] = el; }}
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
