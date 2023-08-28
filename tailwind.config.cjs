import { join } from 'path'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import skeleton from '@skeletonlabs/skeleton/tailwind/skeleton.cjs'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			backgroundColor: {
				'surface-filter': 'rgba(0, 0, 0, 0.1)',
				'surface-black-filter': 'rgba(0, 0, 0, 0.5)',
				'surface-gray-filter': 'rgba(50, 50, 50, 0.5)',
				'surface-white-filter': 'rgba(255, 255, 255, 0.9)',
				'surface-filter-500': 'rgba(216,217,252, 0.7)'
			}
		},
	},
	plugins: [forms,typography,...skeleton()],
}
