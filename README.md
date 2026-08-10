# LEHS TSA — Little Elm High School Technology Student Association

> Production-grade website for the Little Elm High School TSA chapter.
> Built with React · TypeScript · Vite · Tailwind CSS · Firebase

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# → Fill in your Firebase config and optional API keys

# 3. Run local dev server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Tech Stack

| Layer       | Technology |
|-------------|-----------|
| Framework   | React 18 + TypeScript |
| Build tool  | Vite 5 |
| Styling     | Tailwind CSS 3.4 (custom design system) |
| Animations  | Motion / Framer Motion v12 |
| Backend     | Firebase (Firestore + Auth + Analytics) |
| Email       | Resend (via Express server) |
| Icons       | Lucide React |
| Fonts       | Inter · JetBrains Mono (Google Fonts) |

---

## Project Structure

```
/
├── components/          # Shared UI components
│   ├── Layout.tsx       # Navbar + Footer
│   ├── Countdown.tsx    # Animated event countdown
│   ├── BackToTop.tsx    # Scroll-to-top button
│   └── ...
│
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Firebase auth state
│   ├── DataContext.tsx  # Firestore data + actions
│   ├── ThemeContext.tsx # Dark/light mode toggle
│   └── ...
│
├── pages/               # Page components (one per route)
│   ├── Home.tsx         # Landing page
│   ├── About.tsx        # Chapter history + team
│   ├── Competitions.tsx # Filterable event catalog
│   ├── Events.tsx       # Calendar + event list
│   ├── Officers.tsx     # Leadership team grid
│   ├── Resources.tsx    # Links, guides, PDFs
│   ├── News.tsx         # Announcements
│   ├── Gallery.tsx      # Photo gallery
│   ├── Projects.tsx     # Project showcase
│   ├── Join.tsx         # Membership info + FAQ
│   ├── Contact.tsx      # Contact form
│   └── ...              # Auth + protected portal pages
│
├── public/assets/       # Static assets (favicon, OG image)
├── firebase.ts          # Firebase config + init
├── types.ts             # Shared TypeScript types
├── index.css            # Design system (tokens, components)
├── tailwind.config.js   # Extended Tailwind config
└── index.html           # Entry HTML
```

---

## Routing

The app uses React Router v6 with `HashRouter`.

| Route           | Page               | Access     |
|-----------------|--------------------|------------|
| `/`             | Home               | Public     |
| `/about`        | About              | Public     |
| `/competitions` | Competitions       | Public     |
| `/events`       | Events             | Public     |
| `/officers`     | Officer Team       | Public     |
| `/news`         | Announcements      | Public     |
| `/resources`    | Resources          | Public     |
| `/gallery`      | Gallery            | Public     |
| `/projects`     | Projects           | Public     |
| `/join`         | Join               | Public     |
| `/contact`      | Contact            | Public     |
| `/login`        | Sign In            | Public     |
| `/signup`       | Register           | Public     |
| `/dashboard`    | Member Dashboard   | Auth only  |
| `/updates`      | Student Updates    | Auth only  |
| `/interests`    | Competition Picker | Auth only  |
| `/settings`     | Profile Settings   | Auth only  |
| `/admin`        | Admin Panel        | Officers   |

---

## Deploying to Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

The `firebase.json` is already configured for SPA routing.

---

## Deploying to Vercel

```bash
vercel --prod
```

Add all environment variables from `.env.example` to your Vercel project dashboard.

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
# Firebase (from Firebase Console → Project Settings)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Resend (newsletter emails)
RESEND_API_KEY=

# Google GenAI (optional — AIAdvisor)
GEMINI_API_KEY=
```

---

## Content Editing Guide (Officers)

### Adding Announcements
1. Sign in → `/admin` → Announcements → "Add Announcement"

### Adding Events
1. Sign in → `/admin` → Events → fill in title, date, time, location, and category

### Managing Officers
1. Sign in → `/admin` → Officers → add name, role, grade, bio, and image URL

### Adding Resources
1. Sign in → `/admin` → Resources → paste URL, set type and access level

### Updating Site Settings (links, countdown)
1. Sign in → `/admin` → Settings → update Remind, JotForm, district, and payment links

---

## Design System

Custom dark-first design defined in `index.css` + `tailwind.config.js`.

**Colors:** `#07111e` (base) · `#3b82f6` (blue) · `#f59e0b` (gold) · `#8b5cf6` (purple)

**Key utility classes:** `.card` · `.btn-primary` · `.btn-secondary` · `.glass-card` · `.badge-*` · `.text-gradient-blue` · `.section-label` · `.orb`

---

© 2025 Little Elm High School TSA. Made with dedication by the LEHS TSA Webmaster Team.
