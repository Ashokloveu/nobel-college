/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nobel: {
          navy: {
            DEFAULT: '#0f2b48',
            50: '#f0f6fc',
            100: '#e1ecf8',
            200: '#c3daf1',
            300: '#94be45',
            400: '#5c9bd4',
            500: '#347bbd',
            600: '#23609d',
            700: '#1b4d80',
            800: '#18426c',
            900: '#0f2b48',
            950: '#0a1b30',
          },
          crimson: {
            DEFAULT: '#8b0000',
            50: '#fdf2f2',
            100: '#fde2e2',
            500: '#dc2626',
            600: '#b91c1c',
            700: '#8b0000',
            800: '#700000',
          },
          gold: {
            DEFAULT: '#d4af37',
            400: '#f1c40f',
            500: '#d4af37',
            600: '#b7950b',
          },
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
};
