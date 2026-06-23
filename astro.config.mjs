// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	compressHTML: true,
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: true,
			minify: 'esbuild',
			rollupOptions: {
				output: {
					// Split vendor chunks for better caching
					manualChunks: undefined,
				},
			},
		},
	},
});
