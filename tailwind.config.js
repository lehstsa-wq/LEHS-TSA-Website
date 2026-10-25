/** A theme color backed by the CSS variable --<name>. */
const v = (name) => ({ opacityValue }) => {
  const n = Number(opacityValue);
  if (opacityValue === undefined || Number.isNaN(n) || n >= 1) return `var(--${name})`;
  return `color-mix(in srgb, var(--${name}) ${Math.round(n * 100)}%, var(--c-bg))`;
};

/** The shade scale an accent family exposes, all mapped onto one accent. */
const scale = (name) => ({
  DEFAULT: v(name),
  50:  ({ opacityValue }) => v(name)({ opacityValue: 0.05 * (Number(opacityValue) || 1) }),
  100: ({ opacityValue }) => v(name)({ opacityValue: 0.10 * (Number(opacityValue) || 1) }),
  200: ({ opacityValue }) => v(name)({ opacityValue: 0.20 * (Number(opacityValue) || 1) }),
  300: v(name),
  400: v(name),
  500: v(name),
  600: v(`${name}-hover`),
  700: v(`${name}-hover`),
});

/** @type {import('tailwindcss').Config} */
export default {
  // Only the app's own source. A bare `./**/*` glob also crawled node_modules
  // and ruflo/, which made every CSS rebuild take 30s+ and stalled dev.
  content: [
    "./index.html",
    "./*.{ts,tsx}",
    "./{components,pages,context,lib,data}/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Gurajada for display/headings, Source Sans 3 for body and UI.
        sans:    ['"Source Sans 3"', '"Source Sans Pro"', 'Arial', 'sans-serif'],
        body:    ['"Source Sans 3"', '"Source Sans Pro"', 'Arial', 'sans-serif'],
        heading: ['Gurajada', '"Source Sans 3"', 'Arial', 'sans-serif'],
        mono:    ['"Source Sans 3"', '"Source Sans Pro"', 'Arial', 'sans-serif'],
      },
      // Every color resolves to a per-theme CSS variable (see index.css).
      // The site is fully opaque: an opacity modifier such as `bg-x/30` is
      // rendered as a solid color-mix of x into the page background, which
      // looks like the old tint without letting anything show through.
      colors: {
        'tsa-blue': scale('accent'),
        'tsa-red':  scale('cta'),
        'tsa-green':    v('p-steel'),
        'tsa-sky':      v('p-steel'),
        'tsa-pink':     v('cta'),
        'tsa-orange':   v('alert'),
        'tsa-purple':   v('accent'),
        'tsa-yellow':   v('cta'),
        'tsa-maroon':   v('alert'),
        'tsa-cobalt':   v('accent'),
        'tsa-sage':     v('p-steel'),
        'tsa-navy':     v('p-deep'),
        'tsa-charcoal': v('p-charcoal'),
        'tsa-silver':   v('p-smoke'),

        space: {
          950: v('space-950'),
          900: v('space-900'),
          800: v('space-800'),
          700: v('space-700'),
          600: v('space-600'),
          500: v('space-500'),
          400: v('space-500'),
          300: v('space-500'),
        },

        electric: scale('accent'),
        gold:     scale('cta'),
        amber:    scale('alert'),
        violet:   scale('accent'),
        green:    scale('p-steel'),
        red:      scale('alert'),
        ink: {
          DEFAULT: v('c-text'),
          dim:     v('c-text-dim'),
          muted:   v('c-text-muted'),
          ghost:   v('c-text-ghost'),
        },
        brand: {
          blue:    v('accent'),
          red:     v('cta'),
          white:   v('p-smoke'),
          navy:    v('p-deep'),
          charcoal:v('p-charcoal'),
          silver:  v('p-smoke'),
          sky:     v('p-steel'),
          green:   v('p-steel'),
          yellow:  v('cta'),
          orange:  v('alert'),
          purple:  v('accent'),
          maroon:  v('alert'),
        },
        dark: {
          bg:      v('c-bg'),
          surface: v('c-surface'),
          border:  v('c-border'),
        },
        accent: {
          blue:  v('accent'),
          hover: v('accent-hover'),
          red:   v('cta'),
          gold:  v('cta'),
        },
        text: {
          main:  v('c-text'),
          muted: v('c-text-muted'),
        },
        white: v('p-smoke'),
        black: v('p-charcoal'),
      },
      // Outlines that remain are 2px so they read clearly; filled surfaces
      // (cards, panels) carry no outline at all, see index.css.
      borderWidth: { DEFAULT: '2px' },
      backgroundImage: {
        'hero-mesh':  'none',
        'card-shine': 'none',
        'noise':      'none',
      },
      // Flat and solid: no glows, no translucent drop shadows.
      boxShadow: {
        'glow-blue':   'none',
        'glow-red':    'none',
        'glow-gold':   'none',
        'glow-amber':  'none',
        'glow-purple': 'none',
        'card':        'none',
        'card-hover':  'none',
        'nav':         'none',
        'modal':       'none',
        sm:   'none',
        DEFAULT: 'none',
        md:   'none',
        lg:   'none',
        xl:   'none',
        '2xl': 'none',
        inner: 'none',
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out forwards',
        'slide-up':       'slideUp 0.5s ease-out forwards',
        'slide-down':     'slideDown 0.3s ease-out forwards',
        'slide-left':     'slideLeft 0.4s ease-out forwards',
        'scale-in':       'scaleIn 0.3s ease-out forwards',
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 9s ease-in-out infinite',
        'pulse-slow':     'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow':     'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x':     'gradientX 6s ease infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'bounce-subtle':  'bounceSubtle 2s ease-in-out infinite',
        'spin-slow':      'spin 8s linear infinite',
        'orb-float-1':    'orbFloat1 12s ease-in-out infinite',
        'orb-float-2':    'orbFloat2 15s ease-in-out infinite',
        'orb-float-3':    'orbFloat3 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:         { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:        { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown:      { '0%': { opacity: '0', transform: 'translateY(-16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideLeft:      { '0%': { opacity: '0', transform: 'translateX(24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:        { '0%': { opacity: '0', transform: 'scale(0.92)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        float:          { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow:      { '0%, 100%': { boxShadow: 'none' } },
        gradientShift:  { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        gradientX:      { '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' }, '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' } },
        shimmer:        { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        bounceSubtle:   { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        orbFloat1: { '0%, 100%': { transform: 'translate(0, 0) scale(1)' }, '33%': { transform: 'translate(40px, -60px) scale(1.1)' }, '66%': { transform: 'translate(-30px, 40px) scale(0.9)' } },
        orbFloat2: { '0%, 100%': { transform: 'translate(0, 0) scale(1)' }, '50%': { transform: 'translate(-60px, -40px) scale(1.15)' } },
        orbFloat3: { '0%, 100%': { transform: 'translate(0, 0)' }, '33%': { transform: 'translate(50px, 30px)' }, '66%': { transform: 'translate(-40px, -20px)' } },
      },
      backdropBlur: { xs: '2px' },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
  // Nothing on the site is see-through. The stock `opacity-*` utility is
  // replaced so an element is either hidden (0) or fully shown: classes such
  // as `opacity-60` or `disabled:opacity-50` no longer fade anything. The
  // opacity scale itself is untouched because color modifiers (`bg-x/30`)
  // read it to build their solid color-mix.
  corePlugins: { opacity: false },
  plugins: [
    ({ matchUtilities, theme }) => matchUtilities(
      { opacity: (value) => ({ opacity: String(value) === '0' ? '0' : '1' }) },
      { values: theme('opacity') },
    ),
  ],
}
