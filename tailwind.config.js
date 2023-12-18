/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#ffc971',
				secondary: '#ff9505',
				inputclr: '#ffb627',
				borderclr: '#464856'
			}
		}
	},
	plugins: []
};
