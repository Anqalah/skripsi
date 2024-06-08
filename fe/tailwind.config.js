/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleMain: "#7e3af2",
        purpleLight: "#a78bfa",
        blueMain: "#e0f2fe",
        textMain: "#1e293b",
      },
    },
  },
  plugins: [],
};
