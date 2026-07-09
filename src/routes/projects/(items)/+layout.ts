import type { LayoutLoad } from './$types';
import type { ProjectMeta } from '$lib/projects/types';
import { resolveMetadataFromGlob } from '$lib/seo/meta';
import { site } from '$lib/seo/site';

const modules = import.meta.glob<Omit<ProjectMeta, 'slug'>>('./**/+page.md', {
	eager: true,
	import: 'metadata'
});

export const load: LayoutLoad = ({ url }) => {
	const slug = url.pathname.split('/').at(-1);
	if (!slug) return {};

	const project = resolveMetadataFromGlob(modules, slug);
	if (!project) return {};

	return {
		seo: {
			title: project.title,
			description: project.description ?? site.defaultDescription,
			path: url.pathname,
			type: 'article' as const
		}
	};
};
