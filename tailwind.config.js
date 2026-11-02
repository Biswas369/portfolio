/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  darkMode: "class",
  // `.container` is defined in css/styles.css (Bootstrap-sized widths)
  corePlugins: { container: false },
  theme: {
    // same breakpoints as the original design
    screens: { sm: "576px", md: "768px", lg: "992px", xl: "1200px", "2xl": "1400px" },
    extend: {},
  },
  plugins: [],
};
