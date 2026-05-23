/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Navy Blue Theme
        'primary': {
          DEFAULT: '#1A2A4F',      // Deep Navy - Main brand color
          'dark': '#0E1A33',         // Darker navy for hover states
          'light': '#2A3D6B',        // Lighter navy for accents
          '50': '#E8ECF3',
          '100': '#C5CFE1',
          '200': '#9EADCC',
          '300': '#778BB7',
          '400': '#5A6D9E',
          '500': '#3D4F85',
          '600': '#2E3D6B',
          '700': '#1A2A4F',
          '800': '#111E3D',
          '900': '#0A1226',
        },
        'secondary': {
          DEFAULT: '#4A5568',
          'light': '#718096',
          'dark': '#2D3748',
        },
        'accent': {
          DEFAULT: '#C9A03D',       // Warm gold accent
          'light': '#DDB45E',
          'dark': '#A8822A',
        },
        'background': {
          DEFAULT: '#FFFFFF',
          'secondary': '#F8FAFC',
          'tertiary': '#F1F5F9',
        },
        'border': {
          DEFAULT: '#E2E8F0',
          'light': '#F1F5F9',
          'dark': '#CBD5E1',
        },
        'navy': {
          '50': '#E8ECF3',
          '100': '#C5CFE1',
          '200': '#9EADCC',
          '300': '#778BB7',
          '400': '#5A6D9E',
          '500': '#3D4F85',
          '600': '#2E3D6B',
          '700': '#1A2A4F',
          '800': '#111E3D',
          '900': '#0A1226',
        },
        'gold': {
          '50': '#FDF8F0',
          '100': '#F9EDD9',
          '200': '#F3DBB3',
          '300': '#EDC98D',
          '400': '#E7B767',
          '500': '#C9A03D',
          '600': '#A8822A',
          '700': '#876518',
          '800': '#66480C',
          '900': '#453005',
        },
      },
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'strong': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'navy': '0 4px 20px rgba(26, 42, 79, 0.15)',
        'gold': '0 4px 20px rgba(201, 160, 61, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #1A2A4F 0%, #2E3D6B 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A03D 0%, #DDB45E 100%)',
        'gradient-navy-gold': 'linear-gradient(135deg, #1A2A4F 0%, #C9A03D 100%)',
      },
    },
  },
  plugins: [],
}