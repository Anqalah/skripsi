/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        purpleMain: "#7e3af2",
        purpleLight: "#a78bfa",
        blueMain: "#e0f2fe",
        textMain: "#1e293b",
      },
      utilities: {
        ".hide-scrollbar": {
          /* Untuk browser berbasis WebKit (Chrome, Safari) */
          "-webkit-overflow-scrolling": "touch",
          "-webkit-scrollbar": "none",
          /* Untuk Firefox */
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
};
