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
				yellowbg: "#ffeaad",
				pinkdark: "#df919f",
				pinklight: "#fcdfda",
				logopink: "#e45a84",
			},
			screens: {
				xs: "300px",
				ms: "500px",
				"3xl": "1600px",
			},
			backgroundSize: {
				logo: "120%",
				background: "150%",
			},
			backgroundImage: {
				logoimage: "url('/src/assets/logo.png')",
				main: "url('/src/assets/background.png')",
				jam: "url('/src/assets/jam.webp')",
				stamp: "url('/src/assets/gift.webp')",
			},
			fontFamily: {
				letter: ['"Dancing Script"', "cursive"],
			},
		},
	},
	plugins: [],
};
