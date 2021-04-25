module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '100%',
        'xl': '600px',
        '2xl': '800px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
