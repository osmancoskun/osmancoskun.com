import type { LayoutLoad } from './$types';
import type { BlogPostMeta } from '$lib/blog/types';
import { resolveMetadataFromGlob } from '$lib/seo/meta';
import { site } from '$lib/seo/site';

const modules = import.meta.glob<Omit<BlogPostMeta, 'slug'>>('./**/+page.md', {
	eager: true,
	import: 'metadata'
});

export const load: LayoutLoad = ({ url }) => {
	const slug = url.pathname.split('/').at(-1);
	if (!slug) return {};

	const post = resolveMetadataFromGlob(modules, slug);
	if (!post) return {};

	return {
		post: {
			title: post.title,
			date: post.date,
			tags: post.tags ?? []
		},
		seo: {
			title: post.title,
			description: post.description ?? site.defaultDescription,
			path: url.pathname,
			type: 'article' as const
		}
	};
};
