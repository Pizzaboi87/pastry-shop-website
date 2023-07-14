/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f5edef",
        text: "#2f2f2f",
        button: "#a96973",
        brown: "#4a3a3b",
        red: "#ce5a4f",
        green: "#9ab7ad",
        yellowdark: "#efa75c",
        yellowlight: "#eace9b",
        pinkdark: "#df919f",
        pinklight: "#f9c0b6",
        logopink: "#e45a84",
      },
      screens: {
        "3xl": "1600px",
      },
      backgroundSize: {
        logo: "120%",
      },
      backgroundImage: {
        logoimage: "url('/src/assets/logo.png')",
      },
    },
  },
  plugins: [],
};
