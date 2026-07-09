import type { BlogPostMeta } from './types';

export type DateOrder = 'asc' | 'desc';

export type BlogFilters = {
	tags: string[];
	dateOrder: DateOrder;
};

function matchesTag(postTag: string, filterTag: string): boolean {
	return postTag.toLowerCase().includes(filterTag.toLowerCase());
}

export function postMatchesTags(post: BlogPostMeta, tags: string[]): boolean {
	if (tags.length === 0) return true;

	return tags.every(
		(filterTag) => post.tags?.some((postTag) => matchesTag(postTag, filterTag)) ?? false
	);
}

export function filterPosts(posts: BlogPostMeta[], filters: BlogFilters): BlogPostMeta[] {
	const filtered = filters.tags.length
		? posts.filter((post) => postMatchesTags(post, filters.tags))
		: posts;

	return [...filtered].sort((a, b) => {
		const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
		return filters.dateOrder === 'asc' ? diff : -diff;
	});
}

export function parseTagInput(input: string): string[] {
	return input
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
}

export function mergeTags(existing: string[], incoming: string[]): string[] {
	const result = [...existing];

	for (const tag of incoming) {
		const normalized = tag.toLowerCase();
		if (!result.some((item) => item.toLowerCase() === normalized)) {
			result.push(tag);
		}
	}

	return result;
}

export function toggleTagSelection(selectedTags: string[], tag: string): string[] {
	if (selectedTags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
		return selectedTags.filter((item) => item.toLowerCase() !== tag.toLowerCase());
	}

	return mergeTags(selectedTags, [tag]);
}

export function getAllTags(posts: BlogPostMeta[]): string[] {
	const tags = new Set<string>();

	for (const post of posts) {
		for (const tag of post.tags ?? []) {
			tags.add(tag);
		}
	}

	return [...tags].sort((a, b) => a.localeCompare(b));
}
