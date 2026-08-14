import { getProjects } from './items';
import type { ProjectMeta } from './types';

const modules = import.meta.glob<Omit<ProjectMeta, 'slug'>>('./entries/*.md', {
	eager: true,
	import: 'metadata'
});

export function loadProjects(): ProjectMeta[] {
	return getProjects(modules);
}
