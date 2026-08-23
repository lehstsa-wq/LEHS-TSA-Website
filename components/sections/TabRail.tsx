import React, { useId, useRef, useState } from 'react';

export interface TabItem {
  label: string;
  description: string;
  /** Rendered in the panel when this tab is active. */
  panel: React.ReactNode;
}

interface TabRailProps {
  items: TabItem[];
  className?: string;
}

/**
 * Vertical tab rail: each tab carries a bold label plus a description line, and
 * switches a panel alongside it. Full tablist semantics — arrow keys move
 * selection and focus together, Home/End jump to the ends.
 */
export const TabRail: React.FC<TabRailProps> = ({ items, className = '' }) => {
  const baseId = useId().replace(/:/g, '');
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabs.current[i]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (index + 1) % items.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    select(next);
  };

  return (
    <div className={`grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] ${className}`}>
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2">
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.label}
              ref={el => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={e => handleKeyDown(e, i)}
              className="text-left transition-all duration-300"
              style={{
                borderRadius: 'var(--card-radius)',
                padding: '1rem 1.25rem',
                background: selected ? 'var(--c-card)' : 'transparent',
                border: `1px solid ${selected ? 'var(--c-blue)' : 'var(--c-hairline)'}`,
                boxShadow: selected ? 'var(--shadow-card)' : 'none',
              }}
            >
              <span className="block font-bold text-ink">{item.label}</span>
              <span className="block text-sm text-ink-dim mt-1 leading-relaxed">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          style={{
            borderRadius: 'var(--card-radius)',
            border: '1px solid var(--c-hairline)',
            background: 'var(--c-card)',
            boxShadow: 'var(--shadow-card)',
            padding: 'var(--card-pad)',
          }}
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
};
