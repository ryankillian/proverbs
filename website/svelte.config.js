// svelte.config.js

// 1. Import the static adapter
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const siteVersion = process.env.PUBLIC_SITE_VERSION || 'full';
const isTextBuild = siteVersion === 'text';

console.log(`Building version: ${siteVersion}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// 2. Change the adapter to use adapter-static
		adapter: adapter({
			// pages: isTextBuild ? 'build_text' : 'build_full',
			// assets: isTextBuild ? 'build_text' : 'build_full',
			fallback: '404.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
