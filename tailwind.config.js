/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'fern-green': {
          50: '#F5F9F4',
          100: '#E7F3E5',
          200: '#D0E7CC',
          300: '#A9D2A3',
          400: '#7CB673',
          500: '#4AA243',
          600: '#3B8834',
          700: '#2D6927',
          800: '#1E4A1A',
          900: '#0E2B0C',
        },
      },
    },
  },
  plugins: [],
};
