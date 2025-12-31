// tailwind.config.js
// Tailwind CSS configuration for Spandan

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
        // Brand color - Spandan primary blue
        brand: {
          DEFAULT: '#3d3e65',
          50: '#f5f5f7',
          100: '#ebebef',
          200: '#d1d2da',
          300: '#b7b8c5',
          400: '#83849b',
          500: '#3d3e65', // Primary brand color
          600: '#37385b',
          700: '#2e2f4c',
          800: '#25263d',
          900: '#1e1f32',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155', // slate-700
            a: {
              color: '#3d3e65',
              '&:hover': {
                color: '#2e2f4c',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    // Optional: Add plugins as needed
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};