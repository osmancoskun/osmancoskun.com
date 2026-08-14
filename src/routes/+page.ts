import { loadBlogPosts } from '$lib/blog/load';
import { loadProjects } from '$lib/projects/load';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const posts = loadBlogPosts().slice(0, 3);
	const projects = loadProjects().slice(0, 3);

	return { posts, projects };
};
