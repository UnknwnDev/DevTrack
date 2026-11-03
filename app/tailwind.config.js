/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update paths to target all your layout/component files
  darkMode: 'class',
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
