/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17692F',
        'primary-h': '#799c29',
        'primary-a': '#104f23',
        'gold-dark': '#ba7419',
        'gold-medium': '#c79c1b',
        'gold-dark-50': '#ba741980',
        'gold-medium-50': '#f9d87780',
        'highlight-text': '#1e9641',
      },
      fontFamily: {
        'century-gothic': ['Century Gothic', 'sans-serif'],
      },
      backgroundColor: {
        'start': 'rgb(214, 219, 220)',
        'end': 'rgb(255, 255, 255)',
      },
      textColor: {
        'foreground': 'rgb(0, 0, 0)',
      },
    },
  },
  plugins: [],
}