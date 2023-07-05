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
				},
				accent: {
					red: "hsl(var(--accent-red) / <alpha-value>)",
					green: "hsl(var(--accent-green) / <alpha-value>)",
					yellow: "hsl(var(--accent-yellow) / <alpha-value>)",
					blue: "hsl(var(--accent-blue) / <alpha-value>)",
					orange: "hsl(var(--accent-orange) / <alpha-value>)",
				}
			}
		},
	},
	plugins: [],
};
