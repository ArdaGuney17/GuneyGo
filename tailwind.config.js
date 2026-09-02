/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./en/*.html",
    "./tr/*.html",
    "./components/*.js",
    "./js/*.js",
  ],
  safelist: [
    // Classes toggled/added purely at runtime (not present as full literal
    // strings anywhere in the scanned files) must be listed explicitly so
    // the production build doesn't purge them.
    "hidden",
    "is-visible",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
