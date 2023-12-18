/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SolaimanLipi: ['SolaimanLipi', 'sans-serif']
      },
    },
  },
  plugins: [],
}