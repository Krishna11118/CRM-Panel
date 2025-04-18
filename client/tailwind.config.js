/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      custom: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#4483F8",

        // hover or highlihgt
        500: "#384770",
        //Sidebar
        600: "#1D283C",
        // Dark
        700: "#151E2F",

        800: "#101827",
        900: "#11101D",
        950: "#172554",
      },
      weather: {
        // "sunny": "#FFA960",
        // "cloudy": "#C4C4C4",
        // "rainy": "#3C52AD",
        // "thunder": "#1A1A1A",
        // "snowy": "#ECF0F1",
        50: "#FFA960",
        100: "#C4C4C4",
        200: "#3C52AD",
        300: "#1A1A1A",
        400: "#ECF0F1",
        },
    },
    extend: {
      animation: {
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
      keyframes: {
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      backgroundColor: ["responsive", "hover", "focus", "group-hover"],
      backgroundOpacity: [
        "responsive",
        "hover",
        "focus",
        "active",
        "group-hover",
      ],
    },
  },
  variants: {
    extend: {
      backgroundColor: [
        "responsive",
        "hover",
        "focus",
        "group-hover",
        "active",
      ],
      backgroundOpacity: [
        "responsive",
        "hover",
        "focus",
        "active",
        "group-hover",
      ],
    },
  },
  plugins: [
    // ...
    require("flowbite/plugin"),
  ],
};
