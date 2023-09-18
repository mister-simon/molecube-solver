/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["dark"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

