/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          DEFAULT: "hsl(var(--bg))",
          dark: "hsl(var(--bg-dark))",
          light: "hsl(var(--bg-light))",
        },

        // Text
        text: {
          DEFAULT: "hsl(var(--text))",
          muted: "hsl(var(--text-muted))",
        },

        // Cards and surfaces
        card: {
          DEFAULT: "hsl(var(--card))",
          hover: "hsl(var(--card-hover))",
        },

        highlight: "hsl(var(--highlight))",

        border: {
          DEFAULT: "hsl(var(--border))",
          muted: "hsl(var(--border-muted))",
        },

        // Brand colors
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        cyan: "hsl(var(--secondary))",
        purple: "hsl(var(--accent))",
        indigo: "hsl(var(--primary))",

        // Status colors
        danger: "hsl(var(--danger))",
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",

        // Charts
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        // Bottom navigation
        tab: {
          bar: "hsl(var(--tab-bar))",
          active: "hsl(var(--tab-active))",
          inactive: "hsl(var(--tab-inactive))",
        },

        // Tracker card
        tracker: {
          card: "hsl(var(--tracker-card))",
          ring: "hsl(var(--tracker-ring))",
          streak: "hsl(var(--tracker-streak))",
        },
      },
    },
  },

  plugins: [],
};
