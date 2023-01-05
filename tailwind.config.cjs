/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16ABF8',
        danger: '#ED4C5C',
        success: '#00A790',
        black: {
          1: '#111111',
          2: '#555555',
          3: '#888888',
        },
        priority: {
          'very-high': '#ED4C5C',
          high: '#F8A541',
          normal: '#00A790',
          low: '#428BC1',
          'very-low': '#8942C1',
        },
      },
    },
  },
  plugins: [],
};
