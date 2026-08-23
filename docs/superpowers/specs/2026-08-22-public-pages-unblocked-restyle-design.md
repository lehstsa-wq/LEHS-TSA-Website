# Public Pages Restyle — Design

**Date:** 2026-08-22
**Status:** Approved for planning

## Goal

Restyle the nine public pages to match the **layout and interactive-element
vocabulary** of getunblocked.com, while keeping every existing content string,
and keeping LEHS TSA branding, fonts, and colors unchanged.

Alongside the restyle: delete two pages, move two pages behind auth, and drop
one dead dependency.

## Pages in scope

Restyled (9): `Home`, `About`, `Events`, `Officers`, `Competitions`, `News`,
`Resources`, `Join`, `Contact`.

Deleted (2): `Gallery`, `Projects`.

Moved behind auth, not restyled (2): `Teams`, `Opportunities`.

Deliberately excluded: `PrivacyPolicy` — publicly routed, but a plain legal page
with no marketing surface. It keeps its current styling.

## Explicit non-goals

- **No content changes.** Every title, description, label, and body string on the
  nine pages stays exactly as written today. This spec moves markup, never copy.
- **No branding changes.** Fonts (`--font-heading`, `--font-body`) and the TSA
  palette (`--c-blue #005DAA`, `--c-red #EE2624`, and siblings) are untouched.
- **No copied artwork.** Unblocked's illustrations and logo are their assets and
  are not reproduced. Only generic geometry (a rotated-square lattice) is
  rebuilt, in TSA colors.
- **No scroll-jacking.** Unblocked pins sections and hijacks the wheel. We do
  not. Reveal-on-scroll only.
- **No test framework.** The repo has no runner; adding one is out of scope.

---

## Source patterns

Measured from getunblocked.com on 2026-08-22:

| Property | Value |
|---|---|
| Section rhythm | 120px top and bottom |
| Hero h1 | 73px / 73px line-height / weight 500 |
| Section h2 | 52px / 56px line-height / weight 600 |
| Eyebrow | 16px, weight 700, uppercase, diamond flanks |
| Dek | 22px / 30px, max-width ~940px |
| Card | radius 20px, padding 48px, `1px rgba(0,0,0,0.08)`, tinted shadow |
| Stat box | radius 6px, padding 32px, colored hairline, corner diamonds |

Two observations drive the design:

1. **Every elevation is hue-tinted; nothing uses a black shadow.** This is a
   large part of the look and is currently fought manually in our light-mode
   override block.
2. **Section headers are centered with a capped measure.** This is the most
   recognizable structural signature of the design.

---

## Architecture

### Why primitives rather than per-page edits

`index.css` already has a factored component layer (`.section-label`,
`.section-title`, `.section-body`, `.card`, `.badge-*`) driven by `:root`
tokens, plus a disciplined `html.light` override block.

The nine pages carry **29 section headers of identical shape**. Editing them
inline would duplicate that markup 29 times, grow already-large files
(`Competitions.tsx` is 47KB, `Home.tsx` 28KB), and multiply the light-mode
override surface. Centralizing means light mode, reduced-motion, and
accessibility get solved once.

### Constraint: protected pages must not drift

`pages/MemberDirectory.tsx` is behind auth and uses `.section-label` and
`.section-title`.

**Therefore `.section-label` and `.section-title` keep their current
definitions.** New styling arrives via a new `.section-eyebrow` class and the
`SectionHeader` primitive. Protected pages render exactly as they do today.

**Accepted exception:** token refinements (tinted shadows, hairline borders)
apply globally and therefore reach protected pages. This is intentional — one
source of truth, and the change is an improvement everywhere. Approved
2026-08-22.

---

## Component 1 — Token changes (`index.css` `:root`)

```css
--section-py:   clamp(4rem, 8vw, 7.5rem);  /* 120px rhythm, fluid */
--measure-dek:  58ch;                       /* ~940px dek cap */
--card-radius:  1.25rem;                    /* 20px */
--card-pad:     3rem;                       /* 48px */
--stat-radius:  0.375rem;                   /* 6px — sharp against cards */
--stat-pad:     2rem;                       /* 32px */
--c-hairline:   rgba(78, 138, 201, 0.16);   /* light: rgba(0,0,0,0.08) */

/* Black shadows replaced with brand-tinted elevation */
--shadow-card:       0 20px 50px rgba(0, 93, 170, 0.10);
--shadow-card-hover: 0 24px 60px rgba(0, 93, 170, 0.16);
```

Typography scales fluidly to the measured ratios, using **existing fonts**:

```css
.hero-title    { font-size: clamp(2.5rem, 6vw, 4.5rem);    line-height: 1.0;  }
.section-h2    { font-size: clamp(2rem, 4vw, 3.25rem);     line-height: 1.08; }
.section-eyebrow { font-size: 1rem; font-weight: 700; text-transform: uppercase; }
.section-dek   { font-size: clamp(1.0625rem, 1.6vw, 1.375rem); line-height: 1.36;
                 max-width: var(--measure-dek); }
```

`.section-eyebrow` is bare colored text with diamond flanks — **not** a solid
pill. `.section-label` (the pill) remains defined and untouched.

## Component 2 — Primitives (`components/sections/`)

| File | Responsibility | Interface |
|---|---|---|
| `Reveal.tsx` | Staged fade+rise on viewport entry | `{ delay?: number; children }` |
| `SectionHeader.tsx` | Eyebrow → title → dek, centered, staggered 0/80/160ms | `{ eyebrow: string; title: string; dek?: string; align?: 'center'\|'left' }` |
| `Section.tsx` | Band wrapper: rhythm, optional hairline top border, optional dark tone | `{ tone?: 'default'\|'dark'; bordered?: boolean; children }` |
| `StatCard.tsx` | 6px radius, corner diamonds, count-up value | `{ value: number; suffix?: string; label: string; description?: string; href?: string }` |
| `SegmentedToggle.tsx` | Pill switch, `role="radiogroup"` | `{ options: readonly string[]; value: string; onChange: (v: string) => void }` |
| `LogoMarquee.tsx` | Generalized marquee; pauses on hover | `{ items: string[]; reverse?: boolean }` |
| `DiamondField.tsx` | Rotated-square lattice in TSA colors | `{ variant: 'hero'\|'band'\|'corner'; className?: string }` |

`eyebrow` and `title` are **required** on `SectionHeader` so a dropped prop is a
typecheck failure, not a silently missing heading.

`Counter` (currently `Home.tsx:24`) is lifted into `StatCard.tsx` rather than
reimplemented.

### Accessibility

- `Reveal` returns children **unanimated** under `prefers-reduced-motion: reduce`.
  The codebase currently handles reduced motion nowhere; this introduces it.
- `LogoMarquee` does not animate under reduced motion.
- `SegmentedToggle` is a `role="radiogroup"` with arrow-key navigation.
- Centering changes visual order only; DOM order is unchanged.

### Cut from scope

`TabRail` was proposed and **removed**. Walking all nine pages produced no
genuine use for it; the only candidate (Competitions' NQE/UTE cards) would have
been inventing a need to justify the component. YAGNI.

---

## Component 3 — Page application

### Uniform transform (all nine pages)

```
<div className="section-label inline-flex mb-4">{E}</div>   →   <SectionHeader
<h1 className="section-title text-5xl lg:text-6xl mb-6">{T} →     eyebrow={E}
<p className="section-body max-w-2xl">{D}</p>               →     title={T} dek={D} />
```

Strings move verbatim. Covers 29 call-sites.

### Per-page work

| Page | Beyond the header swap |
|---|---|
| **Home** | Hero centered; `ArtCanvas` (`:215`) replaced by `DiamondField variant="hero"` full-bleed behind text; mini-cards move below CTAs. Stats row (`:186`) → `StatCard`. Marquee (`:92`) → `LogoMarquee`. Bento grid retuned. |
| **About** | 6 headers. Stats grid (`:110`) → `StatCard`. Milestone timeline (`:191`) kept, retuned. |
| **Events** | Filter bar (`:59`) All/Upcoming/Past → `SegmentedToggle`; category pills kept. `Countdown` unchanged. |
| **Officers** | Category filter (`:72`) → `SegmentedToggle`. Exec strip retuned. |
| **Competitions** | Quick-stat chips (`:204`) → `StatCard`. Type filters (`:280`) → `SegmentedToggle`. NQE/UTE cards + 60+ competition cards retuned. Search and category pills untouched. |
| **News** | Filters (`:56`) → `SegmentedToggle`. Pinned/regular cards retuned. |
| **Resources** | 4 headers. Quick links (`:76`) and grid retuned. Search/filter kept. |
| **Join** | 5 headers. Step cards (`:172`) retuned. FAQ retuned. |
| **Contact** | Two-column info + form retuned; inputs get hairline borders. |

### Decorative layer replacement

Removed from the nine public pages and replaced with `DiamondField`:

```
ArtCanvas                      Home:215
MeasureRing / Orbit / Gear / Circuit   (LineArt)
.sr-aurora   ×9
.grid-bg     ×9
```

`components/art/Cursor.tsx` is kept (global, mounted in `App.tsx`).
`components/art/LineArt.tsx` and `ArtCanvas.tsx` remain on disk, dormant.

---

## Component 4 — Removals, gating, dependency

### Delete Gallery and Projects

```
DELETE  pages/Gallery.tsx
DELETE  pages/Projects.tsx
App.tsx                      :80 :82    − 2 routes, − 2 imports
Layout.tsx                   :36 :37    − 2 nav items
Layout.tsx                   :521 :526  − 2 footer links
scripts/generate-sitemap.js  :11        − '/gallery'
```

The sitemap entry is required — omitting it publishes a URL that 404s.

### Gate Teams and Opportunities

```jsx
<Route path="/teams" element={<ProtectedRoute><Teams /></ProtectedRoute>} />
<Route path="/opportunities" element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
```

`Layout.tsx` already has `isAuthenticated` (`:66`); nav entries at `:33` and
`:34` become conditional so signed-out visitors don't see links that bounce to
`/login`. Neither page is restyled — they are no longer public.

### Drop `three`

Remove from `package.json` once `Home.tsx` stops using `ArtCanvas`. `three` is
dynamically imported (`ArtCanvas.tsx:130`), so it is already code-split —
removal saves install size and a lazy chunk, not entry-bundle weight.

`gsap` is also imported nowhere, but is **out of scope** and left alone.

---

## Verification

No test runner exists. Verification is what can actually be checked:

| Gate | Check |
|---|---|
| Types | `npm run lint` (`tsc --noEmit`) — catches broken imports from deletions |
| Build | `npm run build` |
| Routes | `/gallery`, `/projects` 404; `/teams`, `/opportunities` → `/login` when signed out |
| Visual | 9 pages × {375px, 1440px} × {light, dark} |
| Motion | Renders correctly under `prefers-reduced-motion: reduce` |

Visual verification is performed in a real browser, not asserted.

## Risks

- **Light mode is the fragile surface.** `index.css:506–928` holds ~250 lines of
  `html.light` overrides patching black shadows and white text case by case.
  Retuning `--shadow-card` at the source should make several redundant, but each
  removal needs visual confirmation. Most likely source of regressions.
- **`Competitions.tsx` (47KB, 60+ cards)** is the largest surface and the
  likeliest place to miss a hover state.
- **29 header call-sites** are mechanical but repetitive; required props on
  `SectionHeader` convert a dropped title into a compile error.

## Open items

None.
