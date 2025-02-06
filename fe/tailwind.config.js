/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        accent: '#2dd4bf',
        neutral: '#64748b'
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
