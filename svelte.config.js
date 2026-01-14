import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter(),
		alias: {
			$cmsComponents: 'src/routes/(cms)/cms/components',
			$siteComponents: 'src/routes/(site)/components/'
		},
		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
