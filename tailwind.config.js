/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx","./_layout.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

