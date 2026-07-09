import type { ProjectMeta } from './types';
import {
	filterItems,
	getAllTags,
	type DateOrder,
	type ItemFilters
} from '$lib/content/filters';

export type { DateOrder, ItemFilters as ProjectFilters };

export function filterProjects(
	projects: ProjectMeta[],
	filters: ItemFilters
): ProjectMeta[] {
	return filterItems(projects, filters);
}

export { getAllTags };
