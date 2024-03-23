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
        navbarInactive: '#999999',
      },
      backgroundColor: {
        primary: '#F2F0EE',
        secondary: '#1B1B1B',
        tertiary: '##EAE7E4',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif', 'system-ui', 'BlinkMacSystemFont', '-apple-system'],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyUi: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    utils: true,
    logs: true,
    styled: true,
  }
}

