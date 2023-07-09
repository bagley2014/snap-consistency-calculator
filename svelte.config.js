import adapter from '@sveltejs/adapter-static'
import path from 'path'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'dist',
			assets: 'dist',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		alias: {
			'@': path.resolve('./src'),
			'@components': path.resolve('./src/components'),
			'@assets': path.resolve('./src/assets'),
			'@styles': path.resolve('./src/styles'),
		},
	},
}

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true
