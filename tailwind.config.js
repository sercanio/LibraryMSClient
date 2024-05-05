/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
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
        tertiary: '#EEE7E4',
        fourtiery: '#655146',
        "book-card-dark": '#323239',
        "book-card--top-dark": '#433232',
        "primary-button": '#E23826',
        "secondary-button": '#F3701D',
        "disabled-button": '#7E4311',
      },
      borderColor: {
        primary: '#E23826',
        secondary: '#F3701D',
        tertiary: '#091012',
        disabled: '#7E4311'
      },
      outlineColor: {
        primary: '#E23826',
        secondary: '#F3701D',
        tertiary: '#0000FF',
        disabled: '#7E4311'
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
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#E23826",
          secondary: "#F3701D",
        },
      }, "dark"
    ],
    darkTheme: "dark",
    base: true,
    utils: false,
    logs: true,
    styled: false,
  }
}