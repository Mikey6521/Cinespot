/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./screens/**/*.{js,jsx,ts,tsx}",
  "./navigation/**/*.{js,jsx,ts,tsx}",
  "./shared/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./routes/**/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {},
  },
  plugins: [],
}

