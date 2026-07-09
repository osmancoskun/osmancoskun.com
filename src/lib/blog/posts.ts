import type { BlogPostMeta } from './types';

type PostMetadata = Omit<BlogPostMeta, 'slug'>;

export function getBlogPosts(
	modules: Record<string, PostMetadata | undefined>
): BlogPostMeta[] {
	return Object.entries(modules)
		.map(([path, metadata]) => {
			if (!metadata) return null;

			const slug = path.split('/').at(-2);
			if (!slug || slug.startsWith('(')) return null;

			return { slug, ...metadata };
		})
		.filter((post): post is BlogPostMeta => post !== null)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
