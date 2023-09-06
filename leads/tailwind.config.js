/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'cher': {
          '50': '#f0f8ff',
          '100': '#e0f1fe',
          '200': '#bae3fd',
          '300': '#7ecdfb',
          '400': '#39b5f7',
          '500': '#0f9be8',
          '600': '#0383d3',
          '700': '#0462a0',
          '800': '#085384',
          '900': '#0c466e',
          '950': '#082c49',
        },
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['PT Serif', 'serif'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
  darkMode: 'class',
}