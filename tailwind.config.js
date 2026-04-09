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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        // Deep space navy — dark layer system
        space: {
          950: '#04080f',
          900: '#07111e',
          800: '#0c1a2e',
          700: '#102035',
          600: '#152843',
          500: '#1a3050',
          400: '#254263',
          300: '#3a5a82',
        },
        // Electric blue — primary accent
        electric: {
          DEFAULT: '#3b82f6',
          50: 'rgba(59,130,246,0.05)',
          100: 'rgba(59,130,246,0.1)',
          200: 'rgba(59,130,246,0.2)',
          300: 'rgba(59,130,246,0.3)',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          glow: '0 0 24px rgba(59,130,246,0.5)',
        },
        // Chapter crimson (replaces gold as secondary accent)
        gold: {
          DEFAULT: '#e05c5c',
          50: 'rgba(224,92,92,0.05)',
          100: 'rgba(224,92,92,0.1)',
          200: 'rgba(224,92,92,0.2)',
          300: '#f5a0a0',
          400: '#ef7878',
          500: '#e05c5c',
          600: '#c44444',
          700: '#a83030',
          glow: '0 0 24px rgba(224,92,92,0.4)',
        },
        // Yellow — warm accent
        amber: {
          DEFAULT: '#eab308',
          50: 'rgba(234,179,8,0.05)',
          100: 'rgba(234,179,8,0.1)',
          200: 'rgba(234,179,8,0.2)',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          glow: '0 0 24px rgba(234,179,8,0.4)',
        },
        // Purple — tertiary
        violet: {
          DEFAULT: '#8b5cf6',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          glow: '0 0 24px rgba(139,92,246,0.4)',
        },
        // Semantic text colors
        ink: {
          DEFAULT: '#e8f0fe',
          dim: '#8aa3c0',
          muted: '#4d6a8a',
          ghost: '#2a3f58',
        },
        // Legacy compatibility
        dark: {
          bg: '#07111e',
          surface: '#0c1a2e',
          border: '#1a3050',
        },
        accent: {
          blue: '#3b82f6',
          hover: '#60a5fa',
          purple: '#8b5cf6',
          gold: '#e05c5c',
        },
        text: {
          main: '#e8f0fe',
          muted: '#8aa3c0',
        }
      },
      backgroundImage: {
        // Gradient presets
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-mesh': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.25), transparent), radial-gradient(ellipse 60% 80% at 80% 50%, rgba(139,92,246,0.15), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(224,92,92,0.12), transparent), radial-gradient(ellipse 40% 40% at 65% 85%, rgba(234,179,8,0.08), transparent)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59,130,246,0.35), 0 0 60px rgba(59,130,246,0.1)',
        'glow-gold': '0 0 20px rgba(224,92,92,0.35), 0 0 60px rgba(224,92,92,0.1)',
        'glow-amber': '0 0 20px rgba(234,179,8,0.35), 0 0 60px rgba(234,179,8,0.1)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.35), 0 0 60px rgba(139,92,246,0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
        'card-hover': '0 12px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(59,130,246,0.2)',
        'nav': '0 1px 0 rgba(30,58,95,0.6), 0 4px 24px rgba(0,0,0,0.3)',
        'modal': '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.15)',
      },
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide-left': 'slideLeft 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',

        // Ambient animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',

        // Gradient animations
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x': 'gradientX 6s ease infinite',

        // Text effects
        'shimmer': 'shimmer 2.5s linear infinite',
        'typing': 'typing 3s steps(30) infinite',

        // UI animations
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',

        // Orb ambient
        'orb-float-1': 'orbFloat1 12s ease-in-out infinite',
        'orb-float-2': 'orbFloat2 15s ease-in-out infinite',
        'orb-float-3': 'orbFloat3 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.6), 0 0 80px rgba(59,130,246,0.2)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-60px, -40px) scale(1.15)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(50px, 30px)' },
          '66%': { transform: 'translate(-40px, -20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
  plugins: [],
}
