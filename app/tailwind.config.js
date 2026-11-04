/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          dark: "var(--bg-dark)",
          DEFAULT: "var(--bg)",
          light: "var(--bg-light)",
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
        },
        highlight: "var(--highlight)",
        border: {
          DEFAULT: "var(--border)",
          muted: "var(--border-muted)",
        },
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        success: "var(--success)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
};
