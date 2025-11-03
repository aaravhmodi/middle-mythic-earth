/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        real: {
          light: '#e6e6e6',
          medium: '#a0a0a0',
          dark: '#333333',
        },
        fantasy: {
          forest: '#123524',
          gold: '#d9b36c',
          blue: '#6dc2e8',
        },
      },
      fontFamily: {
        decorative: ['Cinzel Decorative', 'EB Garamond', 'serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

