/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				MainPurple: '#635FC7',
				PurpleHover: '#A8A4FF',
				Dark: '#000112',
				VeryDarkGrey: '#20212C',
				DarkGrey: '#2B2C37',
				LinesDark: '#3E3F4E',
				MediumGrey: '#828FA3',
				LinesLight: '#E4EBFA',
				LightGrey: '#F4F7FD',
				White: '#FFFFFF',
				SoftRed: '#EA5555',
				PaleRed: '#FF9898',
			},
			fontFamily: {
				Jakarta: ['Plus Jakarta Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
