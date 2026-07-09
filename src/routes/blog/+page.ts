import { getBlogPosts } from '$lib/blog/posts';
import type { BlogPostMeta } from '$lib/blog/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const modules = import.meta.glob<Omit<BlogPostMeta, 'slug'>>('./**/+page.md', {
		eager: true,
		import: 'metadata'
	});
	const posts = getBlogPosts(modules);

	return { posts };
};
