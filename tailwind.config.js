/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
        },
        volt: {
          lime: 'var(--accent-lime)',
          neon: 'var(--accent-neon)',
          silver: 'var(--accent-silver)',
          glow: 'var(--accent-glow)',
        },
        flavor: {
          original: 'var(--flavor-original)',
          berry: 'var(--flavor-berry)',
          citrus: 'var(--flavor-citrus)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-lime': '0 0 25px rgba(199, 255, 0, 0.45)',
        'neon-green': '0 0 25px rgba(57, 255, 20, 0.45)',
        'neon-purple': '0 0 25px rgba(168, 85, 247, 0.45)',
        'neon-orange': '0 0 25px rgba(249, 115, 22, 0.45)',
      },
    },
  },
  plugins: [],
}
