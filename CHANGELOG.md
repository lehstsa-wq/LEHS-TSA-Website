# CHANGELOG

All notable changes to the LEHS TSA website are documented here.

---

## [2.0.0] — April 2026 — Complete Redesign

### 🎨 Design System (New)
- **Complete visual overhaul** — deep space navy base (`#07111e`) replaces generic grays
- **New color palette**: electric blue (`#3b82f6`) + school gold (`#f59e0b`) + purple (`#8b5cf6`)
- **JetBrains Mono** added as monospace font via Google Fonts (terminal accents, code blocks)
- **Inter** weight range expanded to full 300–900 optical sizing
- **Glassmorphism card system** — `.glass`, `.glass-card`, `.glass-light` utility classes
- **Glow shadows** — `.shadow-glow-blue`, `.shadow-glow-gold`, `.shadow-glow-purple`
- **Gradient text** — `.text-gradient-blue`, `.text-gradient-gold`, `.text-gradient-hero`
- **Ambient animations** — `animate-orb-float-1/2/3`, `animate-marquee`, `animate-pulse-glow`
- **Component classes** — `.card`, `.btn-primary`, `.btn-secondary`, `.btn-gold`, `.badge-*`, `.section-label`, `.orb`, `.highlight-bar`
- **Noise overlay** and **grid background** decorative utilities

### 🧭 Navbar (Rebuilt from scratch)
- **Fixed positioning** with scroll-aware glass morphism (transparent → `backdrop-blur-xl` on scroll)
- **Mega-menu dropdown system** — 3 groups (Chapter, Compete, Connect) with icons + descriptions per link
- **Command Palette-style search** (`⌘K`) — full-page overlay with icon-enhanced results
- **Animated mobile drawer** — spring-physics slide-in from right with `AnimatePresence`
- **Keyboard navigation** — `Escape` closes, `Cmd+K` opens search globally
- **Body scroll lock** when mobile menu is open

### 🦶 Footer (Rebuilt)
- **5-column layout** — Brand, Chapter, Compete, Resources, Contact
- **Newsletter signup** with loading/success/error states
- **Social icon buttons** with hover glow effects
- **"Chapter Active" status badge** with animated green dot
- **Gradient divider** between content and copyright bar

### 🏠 Home Page (Rebuilt)
- **Full-viewport hero** with animated gradient mesh background + 3 floating CSS orbs
- **Animated typewriter terminal** — types out chapter stats with realistic terminal UX
- **Stat mini-cards** below terminal (next event, chapter status)
- **Scroll-triggered animated counters** — `useMotionValue` + `useSpring` for smooth number interpolation
- **Two-row competition marquee** — infinite scroll with opposing directions for 13+ events
- **Bento grid feature section** — 6 asymmetric cards with icon glow on hover
- **Stats section** with icons and scroll-reveal
- **News + Events preview** — live Firebase data with category badges + color coding
- **3-step "How to Join" section** with connector lines
- **Final CTA** with radial glow backdrop

### 📄 About Page (Rebuilt)
- Animated hero with gradient mesh
- "What is TSA?" two-column layout with stat grid
- Mission / Vision / Values three-card section
- **Vertical alternating timeline** with year badges and colored dots
- Officer team grid (executive board strip) with social links
- Faculty advisor cards

### 🏆 Competitions Page (Rebuilt)
- **18 TSA events** catalogued with category, difficulty, team size, and description
- **Sticky filter bar** — category + difficulty filters + live text search with clear button
- **Result count + "Clear filters" shortcut**
- **Detail modal** with event info grid, sign-in-to-register CTA, TSA National link
- Interest submission (authenticated users) with optimistic feedback

### 📅 Events Page (Rebuilt)
- **Upcoming / Past / All toggle** + category filter
- Live Firebase data with date blocks, category badges, and RSVP links
- Countdown widget integration

### 👥 Officers Page (Rebuilt)
- **Executive board strip** with gold-glow avatar borders
- **Filterable full team grid** (Executive / Committee / Advisor)
- Category accent bar at top of each card
- Social links (email, Instagram) per officer

### 📰 News Page (Rebuilt)
- Pinned announcements with gold top stripe
- Type filter + live text search
- Highlight bar on hover for regular announcements
- Clean badge system for announcement types

### 🖼️ Gallery Page (Rebuilt)
- Masonry grid with `aspect-square` photo tiles
- Hover overlay with title + zoom icon
- **Full-screen preview modal** with click-outside to close and `AnimatePresence` animation

### 🚀 Projects Page (Rebuilt)
- Project cards with image header, category badge, award strip with trophy icon
- Category filter

### 📚 Resources Page (Rebuilt)
- **Quick links section** — 6 external STEM/TSA resources
- Category-filtered + searchable member library
- Officer-only resources show lock icon (hidden unless authenticated)
- Contextual color coding per category

### 🎓 Join Page (Rebuilt)
- Benefits grid with `CheckCircle2` icons
- **4-step process** with numbered cards
- **4 action link cards** — auto-detects placeholder URLs and shows "coming soon" state
- **FAQ accordion** with smooth `AnimatePresence` height animation
- Final CTA

### 📬 Contact Page (Rebuilt)
- Address, email, and social link cards (left column)
- **Contact form** with subject selector, loading/success/error states
- Submitted messages route to Firebase via `addProblemReport`

### ⏱️ Countdown (Redesigned)
- New dark gradient background with animated orbs
- Glass time boxes with inner shine
- Zap badge + full date string

### ⬆️ BackToTop (Redesigned)
- `AnimatePresence` spring entrance/exit animation
- Gradient button with glow shadow

### 🏗️ Architecture
- **Zero regressions** — all Firebase/auth/admin functionality preserved
- TypeScript strict mode passes with zero errors
- Vite production build passes (1931 modules, ~325KB gzip)
- JetBrains Mono + Inter optical-size fonts

---

## [1.x.x] — Original Site (pre-April 2026)

Initial React + Vite + Firebase site with basic Tailwind styling.
See `AUDIT.md` for the pre-transformation assessment.
