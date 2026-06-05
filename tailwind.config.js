/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ВАЖНО: все файлы с классами
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}