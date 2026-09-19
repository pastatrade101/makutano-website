import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			alias: {
				$components: 'src/lib/components',
				$actions: 'src/lib/actions',
				$styles: 'src/lib/styles'
			}
		})
	],
	server: {
		port: 5173,
		proxy: {
			// Keeps browser requests same-origin in dev; SSR calls the API directly.
			'/api/v1': {
				target: process.env.PUBLIC_API_URL ?? 'http://localhost:5174',
				changeOrigin: true
			}
		}
	}
});
