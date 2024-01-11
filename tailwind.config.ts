import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customWhite: '#FFFFFF',
        customBlue: '#4CA9EE',
        customDarkGreen: '#238878',
        customLightGreen: '#5ECD81',
        customGray: '#B2B7BB',
      },
    },
  },
  plugins: [],
}
export default config
