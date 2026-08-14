import { loadProjects } from '$lib/projects/load';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { projects: loadProjects() };
};
