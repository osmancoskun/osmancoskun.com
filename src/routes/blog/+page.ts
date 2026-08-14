import { loadBlogPosts } from '$lib/blog/load';
import type { BlogPostMeta } from '$lib/blog/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { posts: loadBlogPosts() };
};
