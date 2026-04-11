/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Warm-black base system
        warm: {
          950: '#0E0C0A',
          900: '#1A1713',
          850: '#1F1C18',
          800: '#221F1B',
          700: '#2D2926',
          600: '#3D3730',
          500: '#4D4640',
          400: '#635B52',
          300: '#9C9189',
          200: '#C4B9AE',
          100: '#F2EDE4',
        },
        // Brass gold — sole accent
        gold: {
          DEFAULT: '#C5940A',
          bright:  '#D4A20B',
          muted:   'rgba(197,148,10,0.15)',
          border:  'rgba(197,148,10,0.3)',
          dim:     '#7A5C06',
        },
        // Status / semantic (desaturated, warm-toned)
        tsa: {
          blue:    '#005DAA',  // official TSA blue
          red:     '#EE3524',  // official TSA red
        },
        green:  { DEFAULT: '#4a9e6b', muted: 'rgba(74,158,107,0.12)' },
        red:    { DEFAULT: '#c94444', muted: 'rgba(201,68,68,0.12)' },
        blue:   { DEFAULT: '#4a7fc1', muted: 'rgba(74,127,193,0.12)' },
        amber:  { DEFAULT: '#c07d1a', muted: 'rgba(192,125,26,0.12)' },

        // Alias for legacy Tailwind patterns
        ink: {
          DEFAULT: '#F2EDE4',
          dim:     '#9C9189',
          muted:   '#635B52',
          ghost:   '#3D3730',
        },
      },
      backgroundColor: {
        canvas: '#0E0C0A',
      },
      borderColor: {
        DEFAULT: '#2D2926',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.02) inset',
        'card-hover': '0 4px 16px rgba(0,0,0,0.6)',
        'modal':      '0 24px 80px rgba(0,0,0,0.8)',
        'nav':        '0 1px 0 rgba(45,41,38,0.8)',
        'dropdown':   '0 8px 32px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.25s ease-out forwards',
        'scale-in':   'scaleIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      borderRadius: {
        'sm': '3px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
  plugins: [],
}
