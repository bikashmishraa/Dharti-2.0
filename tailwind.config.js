/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d1b2a",
        light: "#fdf0d5",
      },
      fontFamily: {
        logo: ["Modern Antiqua", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
