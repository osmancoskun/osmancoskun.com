import { getProjects } from '$lib/projects/items';
import type { ProjectMeta } from '$lib/projects/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const modules = import.meta.glob<Omit<ProjectMeta, 'slug'>>('./**/+page.md', {
		eager: true,
		import: 'metadata'
	});
	const projects = getProjects(modules);

	return { projects };
};
