import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['github-dark', 'github-light'],
				langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'bash', 'json', 'markdown', 'ini']
			});
			
			const html = escapeSvelte(highlighter.codeToHtml(code, { 
				lang, 
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				},
				defaultColor: false,
				rootStyle: false
			}));
			
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
