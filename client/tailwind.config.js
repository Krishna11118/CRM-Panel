/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js}"],
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
        400: "#60a5fa",

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
    },
    extend: {
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
