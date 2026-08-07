import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        dark: 'var(--color-dark)',
        surface: 'var(--color-surface)',
        light: 'var(--color-light)',
        'vip-gold': {
          DEFAULT: 'var(--color-vip-gold)',
          foreground: 'var(--color-vip-gold-foreground)',
        },
        // Semantic tokens
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'surface-elevated': 'var(--surface-elevated)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        ring: 'var(--ring)',
        // Variants
        restaurant: {
          accent: 'var(--restaurant-accent)',
          'accent-foreground': 'var(--restaurant-accent-foreground)',
        },
        club: {
          accent: 'var(--club-accent)',
          'accent-foreground': 'var(--club-accent-foreground)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      lineHeight: {
        base: 'var(--line-height-base)',
      },
      borderRadius: {
        'radius-sm': 'var(--radius-sm)',
        'radius-md': 'var(--radius-md)',
        'radius-lg': 'var(--radius-lg)',
        'radius-xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'shadow-sm': 'var(--shadow-sm)',
        'shadow-md': 'var(--shadow-md)',
        'shadow-lg': 'var(--shadow-lg)',
        'shadow-glow-primary': 'var(--shadow-glow-primary)',
        'shadow-glow-secondary': 'var(--shadow-glow-secondary)',
        'shadow-glow-vip': 'var(--shadow-glow-vip)',
      },
      spacing: {
        'spacing-xs': 'var(--spacing-xs)',
        'spacing-sm': 'var(--spacing-sm)',
        'spacing-md': 'var(--spacing-md)',
        'spacing-lg': 'var(--spacing-lg)',
        'spacing-xl': 'var(--spacing-xl)',
        'spacing-2xl': 'var(--spacing-2xl)',
      },
    },
  },
  plugins: [],
}

export default config
