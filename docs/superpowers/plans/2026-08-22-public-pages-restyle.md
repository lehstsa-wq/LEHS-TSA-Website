# Public Pages Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle nine public pages to getunblocked.com's layout and interactive-element vocabulary, keeping every content string and all LEHS TSA branding unchanged.

**Architecture:** Retune `index.css` design tokens once, build seven React primitives under `components/sections/`, then apply them page by page. Layout changes reach only public pages via the primitives; token changes are global by design.

**Tech Stack:** React 18, TypeScript 5.4, Vite 5, Tailwind 3.4, `motion` v12, `react-router-dom` v6.

**Spec:** `docs/superpowers/specs/2026-08-22-public-pages-unblocked-restyle-design.md`

---

## ⚠️ Read before starting: there is no test runner

This repo has **no vitest, no jest, no test files**. Do not write unit tests —
they cannot run. Adding a test framework is explicitly out of scope.

Every task verifies with these commands instead:

```bash
npm run lint     # tsc --noEmit  — the primary correctness gate
npm run build    # tsc && vite build
```

Plus a real browser check where the task changes something visible. Never claim
a visual result you have not actually looked at.

## Global Constraints

- **Never change a content string.** Titles, descriptions, labels, and body copy
  move verbatim. If a string must change, stop and ask.
- **Never change fonts or colors.** `--font-heading`, `--font-body`, and the TSA
  palette (`--c-blue #005DAA`, `--c-red #EE2624`) are untouched.
- **Never copy getunblocked.com artwork.** Only generic geometry, in TSA colors.
- **No scroll-jacking.** Reveal-on-scroll only; normal scrolling always works.
- **Do not modify `.section-label` or `.section-title` definitions** in
  `index.css`. `pages/MemberDirectory.tsx` (protected) depends on them.
- **Every animation must no-op under `prefers-reduced-motion: reduce`.**
- Every page must work in **both light and dark** mode at **375px and 1440px**.
- Keep files under 500 lines.
- Commit after every task.

---

## File Structure

**Created:**

| File | Responsibility |
|---|---|
| `components/sections/Reveal.tsx` | Staged fade+rise on viewport entry; reduced-motion escape hatch |
| `components/sections/Section.tsx` | Band wrapper — vertical rhythm, optional hairline border, optional dark tone |
| `components/sections/SectionHeader.tsx` | Eyebrow → title → dek, centered, internally staggered |
| `components/sections/DiamondField.tsx` | Rotated-square lattice in TSA colors |
| `components/sections/StatCard.tsx` | Sharp-radius stat box, corner diamonds, count-up value |
| `components/sections/SegmentedToggle.tsx` | Accessible pill switch |
| `components/sections/LogoMarquee.tsx` | Horizontal marquee, pauses on hover |
| `components/sections/index.ts` | Barrel export |

**Modified:** `index.css`, `App.tsx`, `components/Layout.tsx`,
`scripts/generate-sitemap.js`, `package.json`, and the nine public pages.

**Deleted:** `pages/Gallery.tsx`, `pages/Projects.tsx`.

---

### Task 1: Design tokens and typography classes

**Files:**
- Modify: `index.css` — `:root` block at `:23-80`, component layer at `:204+`

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties `--section-py`, `--measure-dek`,
  `--card-radius`, `--card-pad`, `--stat-radius`, `--stat-pad`, `--c-hairline`;
  classes `.hero-title`, `.section-h2`, `.section-eyebrow`,
  `.section-eyebrow__flank`, `.section-dek`

- [ ] **Step 1: Add layout tokens to `:root`**

Insert at the end of the `:root` block in `index.css` (before its closing `}`, around `:79`):

```css
  /* ── Layout rhythm (public page restyle) ─────────────────── */
  --section-py:   clamp(4rem, 8vw, 7.5rem);
  --measure-dek:  58ch;
  --card-radius:  1.25rem;
  --card-pad:     3rem;
  --stat-radius:  0.375rem;
  --stat-pad:     2rem;
  --c-hairline:   rgba(78, 138, 201, 0.16);
```

- [ ] **Step 2: Replace the black card shadows with brand-tinted ones**

In the same `:root` block, find these two lines:

```css
  --shadow-card:       0 4px 24px rgba(0, 0, 0, 0.22);
  --shadow-card-hover: 0 12px 40px rgba(0, 0, 0, 0.28);
```

Replace with:

```css
  --shadow-card:       0 20px 50px rgba(0, 93, 170, 0.10);
  --shadow-card-hover: 0 24px 60px rgba(0, 93, 170, 0.16);
```

Leave `--shadow-elevated` alone.

- [ ] **Step 3: Add the light-mode hairline override**

Find the `html.light` block that begins near `:506`. Add inside it:

```css
html.light {
  --c-hairline: rgba(0, 0, 0, 0.08);
}
```

- [ ] **Step 4: Add the new typography classes**

Append inside `@layer components` in `index.css`, immediately after the existing
`.section-body` rule (around `:399`). **Do not edit `.section-label`,
`.section-title`, or `.section-body`.**

```css
  /* ── PUBLIC PAGE HEADERS (restyle) ───────────────────────── */
  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 1.0;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--c-text);
  }

  .section-h2 {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--c-text);
  }

  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--c-blue-bright);
    margin-bottom: 1rem;
  }

  .section-eyebrow__flank {
    font-size: 0.5em;
    opacity: 0.7;
    line-height: 1;
  }

  .section-dek {
    font-family: var(--font-body);
    font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
    line-height: 1.36;
    color: var(--c-text-dim);
    max-width: var(--measure-dek);
    margin-top: 1rem;
  }
```

- [ ] **Step 5: Add the light-mode eyebrow colour**

In the `html.light` override region, add:

```css
html.light .section-eyebrow { color: var(--c-blue); }
```

`--c-blue-bright` (`#4E8AC9`) fails contrast on white; `--c-blue` (`#005DAA`) passes.

- [ ] **Step 6: Verify build**

```bash
npm run lint && npm run build
```
Expected: both pass. No page uses the new classes yet, so nothing should look different.

- [ ] **Step 7: Visually confirm nothing regressed**

Run `npm run dev`. Load `/` and `/about` in **both light and dark**. The card
shadows are now blue-tinted rather than black — subtle but visible. Nothing else
should have moved.

- [ ] **Step 8: Commit**

```bash
git add index.css
git commit -m "style: add layout rhythm tokens and public page header classes

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 2: `Reveal` and `Section` primitives

**Files:**
- Create: `components/sections/Reveal.tsx`, `components/sections/Section.tsx`, `components/sections/index.ts`

**Interfaces:**
- Consumes: tokens from Task 1 (`--section-py`, `--c-hairline`)
- Produces:
  - `Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }>` — `delay` in **milliseconds**
  - `Section: React.FC<{ tone?: 'default' | 'dark'; bordered?: boolean; className?: string; children: React.ReactNode }>`

- [ ] **Step 1: Write `Reveal.tsx`**

```tsx
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Fades and lifts its children into place when they enter the viewport.
 * Under prefers-reduced-motion the children render immediately, unanimated.
 */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, className, children }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
```

- [ ] **Step 2: Write `Section.tsx`**

```tsx
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
```

- [ ] **Step 3: Write the barrel export**

`components/sections/index.ts`:

```ts
export { Reveal } from './Reveal';
export { Section } from './Section';
```

- [ ] **Step 4: Verify types and build**

```bash
npm run lint && npm run build
```
Expected: both pass. If `useReducedMotion` is not exported from `motion/react`,
import it from `framer-motion` instead and note the change.

- [ ] **Step 5: Commit**

```bash
git add components/sections/
git commit -m "feat: add Reveal and Section layout primitives

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 3: `SectionHeader` primitive

**Files:**
- Create: `components/sections/SectionHeader.tsx`
- Modify: `components/sections/index.ts`

**Interfaces:**
- Consumes: `Reveal` from Task 2; `.section-eyebrow`, `.section-h2`, `.hero-title`, `.section-dek` from Task 1
- Produces: `SectionHeader: React.FC<{ eyebrow: string; title: string; dek?: string; as?: 'h1' | 'h2'; align?: 'center' | 'left'; className?: string }>`

`eyebrow` and `title` are **required** — a dropped title becomes a compile error.
`as="h1"` is for page heroes only; **exactly one `h1` per page**.

- [ ] **Step 1: Write `SectionHeader.tsx`**

```tsx
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
```

- [ ] **Step 2: Add to the barrel**

Append to `components/sections/index.ts`:

```ts
export { SectionHeader } from './SectionHeader';
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/sections/
git commit -m "feat: add SectionHeader primitive

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 4: `DiamondField` primitive

**Files:**
- Create: `components/sections/DiamondField.tsx`
- Modify: `components/sections/index.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `DiamondField: React.FC<{ variant: 'hero' | 'band' | 'corner'; className?: string }>`

A rotated-square lattice built from an inline SVG `<pattern>` in TSA colours.
Purely decorative: `aria-hidden` and `pointer-events-none`.

- [ ] **Step 1: Write `DiamondField.tsx`**

```tsx
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
  const patternId = useId();
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
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
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
```

- [ ] **Step 2: Add to the barrel**

```ts
export { DiamondField } from './DiamondField';
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass. `useId` requires React 18 — satisfied.

- [ ] **Step 4: Visually confirm the lattice renders**

Temporarily mount `<div className="relative h-64"><DiamondField variant="hero" /></div>`
in `pages/Home.tsx`, run `npm run dev`, confirm a diamond lattice appears in TSA
blue in both light and dark, then **remove the temporary markup**.

- [ ] **Step 5: Commit**

```bash
git add components/sections/
git commit -m "feat: add DiamondField decorative lattice primitive

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 5: `StatCard` primitive

**Files:**
- Create: `components/sections/StatCard.tsx`
- Modify: `components/sections/index.ts`
- Reference: `pages/Home.tsx:24-40` (existing `Counter`, to be lifted)

**Interfaces:**
- Consumes: `DiamondField` (Task 4); tokens `--stat-radius`, `--stat-pad`, `--c-hairline`
- Produces:
  - `StatCard: React.FC<{ value: number; suffix?: string; label: string; description?: string; href?: string; accent?: string }>`
  - `Counter: React.FC<{ value: number; suffix?: string; duration?: number }>` (re-exported for reuse)

- [ ] **Step 1: Write `StatCard.tsx`, lifting `Counter` verbatim from `Home.tsx:24`**

```tsx
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
```

- [ ] **Step 2: Add to the barrel**

```ts
export { StatCard, Counter } from './StatCard';
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass. If `color-mix` is unsupported in the target browsers,
replace the border with `1px solid var(--c-hairline)` and note the change.

- [ ] **Step 4: Commit**

```bash
git add components/sections/
git commit -m "feat: add StatCard primitive with lifted Counter

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 6: `SegmentedToggle` and `LogoMarquee` primitives

**Files:**
- Create: `components/sections/SegmentedToggle.tsx`, `components/sections/LogoMarquee.tsx`
- Modify: `components/sections/index.ts`
- Reference: `pages/Home.tsx:92-107` (existing `MarqueeRow`)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `SegmentedToggle: React.FC<{ options: readonly string[]; value: string; onChange: (v: string) => void; className?: string }>`
  - `LogoMarquee: React.FC<{ items: string[]; reverse?: boolean; className?: string }>`

- [ ] **Step 1: Write `SegmentedToggle.tsx`**

```tsx
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
```

- [ ] **Step 2: Write `LogoMarquee.tsx`, generalising `MarqueeRow` from `Home.tsx:92`**

```tsx
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
```

- [ ] **Step 3: Add both to the barrel**

```ts
export { SegmentedToggle } from './SegmentedToggle';
export { LogoMarquee } from './LogoMarquee';
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass. `animate-marquee` and `animate-marquee-reverse` already
exist — confirm with `grep -n "marquee" tailwind.config.js index.css`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/
git commit -m "feat: add SegmentedToggle and LogoMarquee primitives

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 7: Delete Gallery and Projects

**Files:**
- Delete: `pages/Gallery.tsx`, `pages/Projects.tsx`
- Modify: `App.tsx:20,22,80,82`, `components/Layout.tsx:36,37,521,526`, `scripts/generate-sitemap.js:11`

**Interfaces:**
- Consumes: nothing
- Produces: routes `/gallery` and `/projects` no longer exist

- [ ] **Step 1: Confirm the full reference list before deleting**

```bash
grep -rn "Gallery\|Projects" App.tsx components/ pages/ scripts/ | grep -v node_modules
```
Expected hits: imports and routes in `App.tsx`, nav and footer entries in
`components/Layout.tsx`, `'/gallery'` in `scripts/generate-sitemap.js`, and the
two page files. **If anything else appears, stop and report it.**

- [ ] **Step 2: Delete the two page files**

```bash
git rm pages/Gallery.tsx pages/Projects.tsx
```

- [ ] **Step 3: Remove the imports and routes from `App.tsx`**

Delete these two import lines:

```tsx
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
```

And these two route lines:

```tsx
<Route path="/projects" element={<Projects />} />
<Route path="/gallery" element={<Gallery />} />
```

- [ ] **Step 4: Remove the nav entries from `components/Layout.tsx`**

In the `'Compete'` nav group, delete these two lines:

```tsx
{ name: 'Projects',       path: '/projects',       icon: Cpu,      desc: 'Chapter project showcase' },
{ name: 'Gallery',        path: '/gallery',        icon: Image,    desc: 'Photos & memories' },
```

If `Image` is now an unused `lucide-react` import, remove it. `Cpu` is still used
by `Competitions` — keep it.

- [ ] **Step 5: Remove the footer entries from `components/Layout.tsx`**

Delete these two lines:

```tsx
{ name: 'Gallery', path: '/gallery' },
{ name: 'Projects',     path: '/projects' },
```

- [ ] **Step 6: Remove `/gallery` from the sitemap**

In `scripts/generate-sitemap.js`, delete the `'/gallery',` entry from the `pages` array.

- [ ] **Step 7: Verify no dangling references remain**

```bash
grep -rn "/gallery\|/projects\|Gallery\|Projects" App.tsx components/ pages/ scripts/ | grep -v node_modules
```
Expected: no output. (`https://tsaweb.org/...` links are unrelated and should not appear in this grep.)

```bash
npm run lint && npm run build
```
Expected: both pass. A failure here means a missed import.

- [ ] **Step 8: Confirm in the browser**

`npm run dev`. Confirm `/#/gallery` and `/#/projects` no longer render pages, and
that neither appears in the navbar or footer.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: remove Gallery and Projects pages

Deletes both pages along with their routes, nav entries, footer links,
and the /gallery sitemap entry.

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 8: Gate Teams and Opportunities behind auth

**Files:**
- Modify: `App.tsx:142,144`, `components/Layout.tsx:33,34`

**Interfaces:**
- Consumes: `ProtectedRoute` from `components/ProtectedRoute.tsx` (already exists)
- Produces: `/teams` and `/opportunities` redirect to `/login` when signed out

- [ ] **Step 1: Wrap both routes in `App.tsx`**

Replace:

```tsx
<Route path="/opportunities" element={<Opportunities />} />
<Route path="/teams" element={<Teams />} />
```

With:

```tsx
<Route
  path="/opportunities"
  element={
    <ProtectedRoute>
      <Opportunities />
    </ProtectedRoute>
  }
/>
<Route
  path="/teams"
  element={
    <ProtectedRoute>
      <Teams />
    </ProtectedRoute>
  }
/>
```

`ProtectedRoute` is already imported in `App.tsx` — no new import needed.

- [ ] **Step 2: Hide both nav entries from signed-out visitors**

`components/Layout.tsx` already destructures `isAuthenticated` at `:66`. In the
`'Compete'` group, these two entries must render only when authenticated:

```tsx
{ name: 'Teams',          path: '/teams',          icon: Users,    desc: 'Form & join competition teams' },
{ name: 'Opportunities',  path: '/opportunities',  icon: BookOpen, desc: 'Scholarships, programs & more' },
```

Add an `authOnly: true` flag to each entry, then filter at render time:

```tsx
{ name: 'Teams',          path: '/teams',          icon: Users,    desc: 'Form & join competition teams', authOnly: true },
{ name: 'Opportunities',  path: '/opportunities',  icon: BookOpen, desc: 'Scholarships, programs & more', authOnly: true },
```

Add `authOnly?: boolean` to the nav-link type, and where the group's `links` are
mapped, filter first:

```tsx
group.links.filter(link => !link.authOnly || isAuthenticated).map(...)
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass.

- [ ] **Step 4: Confirm both states in the browser**

`npm run dev`.
- Signed out: Teams and Opportunities are absent from the navbar; visiting
  `/#/teams` directly redirects to `/#/login`.
- Signed in: both appear in the navbar and load normally.

- [ ] **Step 5: Commit**

```bash
git add App.tsx components/Layout.tsx
git commit -m "feat: require auth for Teams and Opportunities

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Tasks 9–17: Apply the primitives page by page

Each page is its own task, its own commit, and its own review gate. Do them in
this order — **Home first**, because it exercises every primitive and will surface
problems while they are still cheap to fix.

> **If you were dispatched to do exactly one of Tasks 9–17:** your task is the
> seven-step shared procedure below **plus** the per-task additions listed for
> your page at the end of this section. Read both. The shared procedure is not
> optional context — it *is* the bulk of your task.

| Task | Page | File |
|---|---|---|
| 9  | Home | `pages/Home.tsx` |
| 10 | About | `pages/About.tsx` |
| 11 | Events | `pages/Events.tsx` |
| 12 | Officers | `pages/Officers.tsx` |
| 13 | Competitions | `pages/Competitions.tsx` |
| 14 | News | `pages/News.tsx` |
| 15 | Resources | `pages/Resources.tsx` |
| 16 | Join | `pages/Join.tsx` |
| 17 | Contact | `pages/Contact.tsx` |

**The shared procedure for every one of Tasks 9–17:**

- [ ] **Step 1: Import the primitives**

```tsx
import { Section, SectionHeader, Reveal, DiamondField } from '../components/sections';
```
Add `StatCard`, `SegmentedToggle`, or `LogoMarquee` only where the per-task notes call for them.

- [ ] **Step 2: Replace every section header**

For each occurrence of this trio:

```tsx
<div className="section-label inline-flex mb-4">{EYEBROW}</div>
<h1 className="section-title text-5xl lg:text-6xl mb-6">{TITLE}</h1>
<p className="section-body max-w-2xl">{DEK}</p>
```

Substitute:

```tsx
<SectionHeader as="h1" eyebrow={EYEBROW} title={TITLE} dek={DEK} />
```

Use `as="h1"` for the page hero only; every other header omits `as` (defaults to
`h2`). **Copy the three strings across character for character.**

- [ ] **Step 3: Swap the decorative layer**

Remove from this page:

```tsx
<div className="sr-aurora" />
<div className="absolute inset-0 grid-bg opacity-30" />
<MeasureRing … /> / <Orbit … /> / <Gear … /> / <Circuit … />
```

Replace with a single `<DiamondField variant="hero" />` inside the hero's
`relative` wrapper. Drop the now-unused `LineArt` import.

- [ ] **Step 4: Retune cards to the new tokens**

Any element using `rounded-2xl p-6` as a card gets:

```tsx
style={{ borderRadius: 'var(--card-radius)', padding: 'var(--card-pad)' }}
```

Elements already using the shared `.card` class need no change — Task 1 already
retuned it.

- [ ] **Step 5: Verify types and build**

```bash
npm run lint && npm run build
```
Expected: both pass.

- [ ] **Step 6: Verify visually — all four combinations**

`npm run dev`, load this page, and confirm at **375px and 1440px** in **both light
and dark**:
- Headers are centred, the dek wraps at a comfortable measure
- Content reads identically to before — no string changed
- Cards have blue-tinted, not black, shadows
- Reveal animation fires once on scroll, and scrolling is never hijacked

Then set "Emulate `prefers-reduced-motion`" in DevTools and reload: content must
appear immediately, fully legible, with no animation.

- [ ] **Step 7: Commit**

```bash
git add pages/<PageName>.tsx
git commit -m "style: restyle <PageName> to new section layout

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

**Per-task additions beyond the shared procedure:**

- **Task 9 (Home)** — 4 headers. Also: remove the `ArtCanvas` import and its usage
  at `:215`, replacing it with `<DiamondField variant="hero" />` full-bleed behind
  the hero text; centre the hero and move the mini-cards (`:218`) into a row below
  the CTAs; convert the stats row (`:186`) to `StatCard`; delete the local
  `Counter` (`:24`) and `MarqueeRow` (`:92`) definitions, importing `StatCard` and
  `LogoMarquee` instead. **`ArtCanvas.tsx` stays on disk — do not delete it.**
- **Task 10 (About)** — 6 headers. Convert the stats grid (`:110`) to `StatCard`.
  Keep the milestone timeline (`:191`) structurally as-is; retune its cards only.
- **Task 11 (Events)** — 1 header. Convert the All/Upcoming/Past filter (`:59`) to
  `SegmentedToggle`; leave the category pills and `Countdown` untouched.
- **Task 12 (Officers)** — 2 headers. Convert the category filter (`:72`) to
  `SegmentedToggle`.
- **Task 13 (Competitions)** — 2 headers. Largest file (47KB); expect the longest
  visual pass. Convert the quick-stat chips (`:204`) to `StatCard` and the
  All/NQE/UTE type filter (`:280`) to `SegmentedToggle`. Leave search, category
  pills, and all 60+ competition cards' data untouched — retune their styling
  only. **Check every card hover state before committing.**
- **Task 14 (News)** — 1 header. Convert the filters (`:56`) to `SegmentedToggle`;
  preserve the pinned-post stripe treatment.
- **Task 15 (Resources)** — 4 headers. Retune quick links (`:76`) and the resource
  grid; leave search and filter behaviour untouched.
- **Task 16 (Join)** — 5 headers. Retune the four step cards (`:172`) and the FAQ;
  **do not alter the four external signup links**.
- **Task 17 (Contact)** — 1 header. Retune the two-column info and form; give form
  inputs `1px solid var(--c-hairline)` borders. **Do not touch form submission logic.**

---

### Task 18: Drop the `three` and `gsap` dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Consumes: Task 9 (Home no longer renders `ArtCanvas`)
- Produces: neither package is installed

- [ ] **Step 1: Prove both are unreferenced**

```bash
grep -rn "from 'three'\|from \"three\"\|import('three')" --exclude-dir=node_modules --exclude-dir=dist .
grep -rn "from 'gsap'\|from \"gsap\"\|import('gsap')" --exclude-dir=node_modules --exclude-dir=dist .
```

Expected for `gsap`: no output.
Expected for `three`: **one hit only** — the dynamic import inside
`components/art/ArtCanvas.tsx`, which is now dormant (nothing renders it).

Confirm nothing renders `ArtCanvas`:

```bash
grep -rn "<ArtCanvas" --exclude-dir=node_modules --exclude-dir=dist .
```
Expected: no output. **If any hit appears, stop — Task 9 is incomplete.**

- [ ] **Step 2: Delete the dormant `ArtCanvas`**

`ArtCanvas.tsx` is the only remaining `three` consumer, and it is unreachable.
Leaving it would break the build once `three` is uninstalled.

```bash
git rm components/art/ArtCanvas.tsx
```

Then remove the stale mention in the `components/parallax/Parallax.tsx:177`
comment so it does not reference a deleted file. `LineArt.tsx` and `Cursor.tsx`
stay — they do not depend on `three`.

- [ ] **Step 3: Uninstall both packages**

```bash
npm uninstall three gsap @types/three
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass. A `Cannot find module 'three'` error means a consumer was missed — restore and re-check Step 1.

- [ ] **Step 5: Confirm the site still runs**

`npm run dev`. Load `/` and confirm the hero renders with `DiamondField` and no console errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: drop unused three and gsap dependencies

three's only consumer was ArtCanvas, now unused after the Home hero
restyle. gsap was never imported anywhere.

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

### Task 19: Light-mode override cleanup and full verification pass

**Files:**
- Modify: `index.css` — `html.light` region at `:506-928`

**Interfaces:**
- Consumes: every prior task
- Produces: no behaviour change; removes overrides made redundant by Task 1

This is the highest-risk task in the plan. The `html.light` block patches black
shadows case by case; Task 1 removed the black shadows at their source, so some
of those patches are now redundant. **Remove them one at a time, checking after
each.** If a removal changes anything visually, restore it.

- [ ] **Step 1: List the shadow-related overrides**

```bash
grep -n "shadow" index.css | sed -n '/5[0-9][0-9]:/,/9[0-9][0-9]:/p'
```
Review the block beginning at the `Shadow overrides: eliminate all black shadows in light mode` comment (`:676`).

- [ ] **Step 2: Remove redundant overrides one at a time**

For each rule that exists purely to neutralise a black `--shadow-card` or
`--shadow-card-hover`: delete it, reload the site in light mode, confirm nothing
changed, then move to the next. **Restore immediately if anything shifts.**

Leave every override that handles text colour, background, or borders — Task 1
did not touch those.

- [ ] **Step 3: Verify the build**

```bash
npm run lint && npm run build
```
Expected: both pass.

- [ ] **Step 4: Full manual sweep — all nine pages**

For each of `/`, `/about`, `/events`, `/officers`, `/competitions`, `/news`,
`/resources`, `/join`, `/contact`, confirm at 375px and 1440px, light and dark:

- Exactly one `h1`, centred, with the eyebrow above it
- No black shadows anywhere
- No horizontal scrollbar on the body
- All interactive controls (`SegmentedToggle`, filters, search) still work
- All content strings are unchanged from `git show main:pages/<Page>.tsx`

- [ ] **Step 5: Route sweep**

- `/#/gallery`, `/#/projects` → no page
- `/#/teams`, `/#/opportunities` → redirect to `/#/login` when signed out, load when signed in
- `/#/privacy-policy` → unchanged from before this work

- [ ] **Step 6: Reduced-motion sweep**

With "Emulate `prefers-reduced-motion`" enabled, load all nine pages. Every page
must be fully legible with no animation and no missing content.

- [ ] **Step 7: Commit**

```bash
git add index.css
git commit -m "style: drop light-mode overrides made redundant by tinted shadows

Co-Authored-By: RuFlo <ruv@ruv.net>"
```

---

## Known pre-existing issues (out of scope — do not fix)

Found while planning. Report them; do not address them in this work:

1. **`scripts/generate-sitemap.js` lists `/updates`**, which is a protected route
   (`StudentUpdates`). The sitemap advertises a login-gated URL to search engines.
2. **The sitemap omits `/news` and `/contact`**, both public pages.

Both predate this work and are unrelated to the restyle.
