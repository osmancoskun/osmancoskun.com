import type { ProjectMeta } from './types';

type ProjectMetadata = Omit<ProjectMeta, 'slug'>;

export function getProjects(
	modules: Record<string, ProjectMetadata | undefined>
): ProjectMeta[] {
	return Object.entries(modules)
		.map(([path, metadata]) => {
			if (!metadata) return null;

			const slug = path.split('/').at(-2);
			if (!slug || slug.startsWith('(')) return null;

			return { slug, ...metadata };
		})
		.filter((project): project is ProjectMeta => project !== null)
		.sort((a, b) => {
			if (a.date && b.date) {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			}

			return a.title.localeCompare(b.title);
		});
}
