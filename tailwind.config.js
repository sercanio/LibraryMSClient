/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3701D',
        secondary: '#E23826',
        tertiary: '#0000FF',
      },
      backgroundColor: {
        primary: '#F2F0EE',
        secondary: '#1B1B1B',
        tertiary: '#0000FF',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyUi:{
    themes: ["light", "dark"],
  }
}

