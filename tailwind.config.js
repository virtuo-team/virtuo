/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        _royalblue: '#0A2463',
        _lapislazuli: '#245B98',
        _celestialblue: '#3E92CC',
        _ghostwhite: '#FFFAFF',
        _cerise: '#D8315B',
        _eerieblack: '#1E1B18',
        _jet: '#32302D',
      },
    },
  },
  plugins: [],
}

