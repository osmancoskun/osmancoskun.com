import { getBlogPosts } from './posts';
import type { BlogPostMeta } from './types';

const modules = import.meta.glob<Omit<BlogPostMeta, 'slug'>>(
	'../../routes/blog/**/+page.md',
	{
		eager: true,
		import: 'metadata'
	}
);

export function loadBlogPosts(): BlogPostMeta[] {
	return getBlogPosts(modules);
}
