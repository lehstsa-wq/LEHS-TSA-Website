# LEHS TSA Website — Phase 0 Audit

> Conducted: April 2026 | Pre-transformation snapshot

---

## 1. Stack & Architecture

| Layer | Current |
|-------|---------|
| Framework | React 18 + TypeScript + **Vite** (SPA, Hash Router) |
| Styling | Tailwind CSS 3.4 + minimal custom CSS |
| Animation | `motion` 12.x (Framer Motion v12, via `motion/react`) |
| Backend | Firebase (Firestore real-time, Auth, Analytics) |
| Email | Resend (newsletter welcome emails via Express server) |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts, body only) |
| AI | Google GenAI (`@google/genai`) — AIAdvisor component |
| Deployment | Firebase Hosting (firebase.json) |

**Decision:** Keep React/Vite/Firebase — migrating to Next.js would break Firebase SSR compatibility and lose weeks of existing integration work. The visual transformation will be pure design-layer work.

---

## 2. File Structure (pre-transformation)

```
/
├── components/         # BackToTop, Breadcrumbs, ConfirmModal, Countdown,
│                       # Layout (Navbar+Footer), LazyImage, ProtectedRoute, SEO, AIAdvisor
├── context/            # AuthContext, DataContext, ModalContext, ThemeContext, ToastContext
├── data/               # competitions.ts (static competition catalog)
├── pages/              # 17 pages (Home, About, Events, Officers, Projects,
│                       #  Competitions, Gallery, News, Resources, Join,
│                       #  Contact, Login, Signup, Dashboard, StudentUpdates,
│                       #  AdminPanel, Settings, Interests)
├── public/assets/      # favicon.svg, robots.txt
├── scripts/            # generate-sitemap.js
├── .env.example        # Environment variable template
├── firebase.ts         # Firebase config + init
├── index.html          # Entry HTML (only Inter font loaded)
├── index.css           # Global styles (minimal)
├── tailwind.config.js  # Tailwind config (small palette)
└── vite.config.ts      # Vite config
```

---

## 3. Existing Pages

| Page | Route | Quality | Notes |
|------|-------|---------|-------|
| Home | `/` | ★★★☆☆ | Hero + news/events preview + spotlight |
| About | `/about` | ★★★☆☆ | History, mission, stats grid |
| Events | `/events` | ★★★☆☆ | Calendar list view |
| Officers | `/officers` | ★★☆☆☆ | Team grid (basic) |
| Projects | `/projects` | ★★☆☆☆ | Achievement list |
| Competitions | `/competitions` | ★★★☆☆ | Filterable grid with modal |
| Gallery | `/gallery` | ★★☆☆☆ | Masonry photo grid |
| News | `/news` | ★★☆☆☆ | Announcement list |
| Resources | `/resources` | ★★★☆☆ | Tabbed links + PDFs |
| Join | `/join` | ★★★☆☆ | Multi-step membership info |
| Contact | `/contact` | ★★★☆☆ | Form + info |
| Login/Signup | `/login`, `/signup` | ★★★☆☆ | Firebase access-code auth |
| Dashboard | `/dashboard` | ★★★★☆ | Member portal (solid) |
| Admin | `/admin` | ★★★★☆ | Officer admin panel (solid) |

---

## 4. Branding & Identity

- **Chapter:** Little Elm High School TSA (LEHS TSA)
- **Location:** 1600 Walker Lane, Little Elm, TX 75068
- **Contact:** lehstsa@gmail.com
- **Social:** Instagram @littleelmhighschooltsa, Twitter @littleelmhighschooltsa
- **School Colors:** Navy blue (#00205B) + Gold (inferred from Texas school tradition)
- **Accent:** Electric blue (#3b82f6)
- **Dark base:** #080B14

---

## 5. Content Gaps

- No blog / MDX content system for competition recaps
- No command palette (⌘K navigation)
- No animated stat counters (scroll-triggered)
- No marquee / infinite scroll elements
- No bento grid asymmetric layouts
- No terminal animation accents
- No countdown to next event on the hero
- Footer lacks sitemap depth and personality
- No competition detail sub-pages (modal exists but is basic)
- No "What's New" / changelog page
- Missing JetBrains Mono for code/terminal accents
- No glassmorphism depth on cards (only light backdrop-blur)
- Testimonial/member quote section missing on Home

---

## 6. Design Assessment

### Strengths
- Dark mode default ✓
- Firebase real-time data sync ✓
- Working auth system (access-code based) ✓
- Responsive layout ✓
- Existing motion library dependency ✓
- Good page structure and routing ✓

### Weaknesses
- Hero lacks strong visual hook — blobs feel generic
- Typography not fully leveraged (single weight hierarchy)
- Cards feel flat — lack depth, glow, layered shadows
- Color palette lacks personality — blue-only accent
- Navbar "More" dropdown is clunky
- No scroll-triggered animation choreography
- Spacing inconsistent (mix of 4px and 8px base units)
- No code/terminal accents for tech flavor
- Mobile menu is basic dropdown, not a polished drawer

---

## 7. Transformation Strategy

### Design Tokens
- **Base:** `#07111e` (deep space navy)
- **Surface:** `#0c1a2e`
- **Card:** `#102035`
- **Border:** `#1a3050`
- **Blue:** `#3b82f6` (primary accent)
- **Gold:** `#f59e0b` (school color, secondary accent)
- **Purple:** `#8b5cf6` (tertiary)
- **Text:** `#e8f0fe` (primary), `#8aa3c0` (muted)

### Priority Changes
1. **CSS design system** — tokens, animations, utilities
2. **Navbar** — glass morphism, command palette trigger, better mobile drawer
3. **Home** — animated gradient mesh hero, bento grid, marquee, stat counters
4. **All pages** — scroll-reveal animations, better card hierarchy, unified tone
5. **Footer** — multi-column sitemap, personality
6. **CommandPalette** — ⌘K quick navigation

### Preserved
- All Firebase/auth functionality (untouched)
- All routing (untouched)
- All context providers (untouched)
- All admin/dashboard functionality (untouched)
