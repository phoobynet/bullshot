/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        business: {
          ...require('daisyui/src/colors/themes')['[data-theme=business]'],
          error: '#ff0000',
        },
      },
    ],
  },
}
