/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#368727",
        primaryLight: "#cfe7a2",
        secondary: "#356f95",
        secondaryLight: "#bad8ee",
      },
    },
  },
  plugins: [],
};
