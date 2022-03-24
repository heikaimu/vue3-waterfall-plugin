/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-14 10:05:09
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 14:22:09
 */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './example/**/*.{vue,js,ts,jsx,tsx}', './lib/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    colors: {
      gray: colors.gray,
      green: colors.green,
      blue: colors.blue,
      red: colors.rose,
      yellow: colors.yellow,
      pink: colors.fuchsia,
      white: colors.white,
      amber: colors.amber,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
