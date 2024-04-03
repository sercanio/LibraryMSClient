/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E23826',
        secondary: '#F3701D',
        tertiary: '#655146',
        navbarInactive: '#999999',
      },
      backgroundColor: {
        primary: '#F2F0EE',
        secondary: '#1B1B1B',
        tertiary: '##EAE7E4',
        "primary-button": '#E23826',
        "secondary-button": '#F3701D',
        "disabled-button": '#D3701D',
      },
      borderColor: {
        primary: '#E23826',
        secondary: '#F3701D',
        tertiary: '#091012',
        disabled: '#D3701D'
      },
      outlineColor: {
        primary: '#E23826',
        secondary: '#F3701D',
        tertiary: '#0000FF',
        disabled: '#D3701D'
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif', 'system-ui', 'BlinkMacSystemFont', '-apple-system'],
        title: ["'Roboto Slab'", 'sans-serif'],
        body: ["'Roboto'", 'sans-serif'],
      },
      animation: {
        fade: 'fadeIn .25s ease-in-out',
        growLine: 'growLine 0.25s ease-in-out forwards'
      }
    },
    keyframes: theme => ({
      fadeIn: {
        '0%': { opacity: theme('opacity.90') },
        '100%': { opacity: theme('opacity.100') },
      },
      growLine: {
        '0%': {
          width: 0
        },
        '100% ': {
          width: '70%'
        }
      }
    }),
  },
  plugins: [require("daisyui")],
  daisyUi: {
    themes: [
      "light", "dark"
    ],
    darkTheme: "dark",
    base: true,
    utils: false,
    logs: true,
    styled: false,
  }
}