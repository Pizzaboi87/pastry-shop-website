/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	mode: "jit",
	theme: {
		extend: {
			colors: {
				primary: "#EBE0D0",
				text: "#2b2730",
				button: "#a96973",
				brown: "#4a3a3b",
				red: "#ce5a4f",
				green: "#49be25",
				yellowdark: "#efa75c",
				yellowlight: "#eace9b",
				yellowbg: "#ffeaad",
				pinkdark: "#df919f",
				pinklight: "#fcdfda",
				glass: "#ec9ec0cc",
				purpleglass: "#6554af90",
				purple: "#6554af",
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
				mobBackground: "350%",
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
			dropShadow: {
				textShadow: ["0 0 5px black", "5px 5px 5px white"],
			},
		},
	},
	plugins: [],
};
