import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: "class",
	
	theme: {

		fontWeight: {
			thin: 300,
			semibold: 600,
			extrabold: 800
		},
		colors: (theme) => {
			return {
				...theme.colors,
				neutral: {
					100: theme.colors.white,
					150: 'hsl(0, 0%, 98%)',
					500: 'hsl(0, 0%, 52%)'
				},
				darkblue: {
					900: 'hsl(200, 15%, 8%)',
					800: 'hsl(207, 26%, 17%)',
					700: 'hsl(209, 23%, 22%)'
				}
			};
		},
		extend: {
			fontFamily: {
				sans: ['Nunito Sans', defaultTheme.fontFamily.sans]
			},
			screens: {
				xs: '17rem',
				sm: '51.125rem'
			}
		}
	},
	plugins: []
};
