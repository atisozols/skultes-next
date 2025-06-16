/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        alternate: 'var(--alternate)',
        accent: 'var(--accent)',
        container: 'var(--container)',
        border: 'var(--border)',
        ozols: 'var(--ozols)',
      },
    },
  },
  plugins: [require('daisyui')],
};
