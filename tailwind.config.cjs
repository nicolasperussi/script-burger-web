/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: {
					primary: "hsl(var(--primary-background) / <alpha-value>)",
					secondary: "hsl(var(--secondary-background) / <alpha-value>)",
				},
				text: {
					primary: "hsl(var(--primary-text) / <alpha-value>)",
					secondary: "hsl(var(--secondary-text) / <alpha-value>)",
				}
			}
		},
	},
	plugins: [],
};
