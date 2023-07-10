import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		coverage: {
			exclude: [...configDefaults.exclude, 'src/generated/**'],
		},
	},
})
