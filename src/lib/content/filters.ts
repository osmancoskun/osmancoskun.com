export type DateOrder = 'asc' | 'desc';

export type FilterableItem = {
	title?: string;
	description?: string;
	details?: string;
	date?: string;
	tags?: string[];
};

export type ItemFilters = {
	queries: string[];
	dateOrder: DateOrder;
};

export function itemMatchesQuery(item: FilterableItem, query: string): boolean {
	const normalized = query.toLowerCase();
	const title = item.title?.toLowerCase() ?? '';
	const description = item.description?.toLowerCase() ?? '';
	const details = item.details?.toLowerCase() ?? '';
	const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(normalized)) ?? false;

	return (
		title.includes(normalized) ||
		description.includes(normalized) ||
		details.includes(normalized) ||
		tagMatch
	);
}

export function itemMatchesQueries(item: FilterableItem, queries: string[]): boolean {
	if (queries.length === 0) return true;

	return queries.every((query) => itemMatchesQuery(item, query));
}

export function filterItems<T extends FilterableItem>(items: T[], filters: ItemFilters): T[] {
	const filtered = filters.queries.length
		? items.filter((item) => itemMatchesQueries(item, filters.queries))
		: items;

	return [...filtered].sort((a, b) => {
		const aTime = a.date ? new Date(a.date).getTime() : 0;
		const bTime = b.date ? new Date(b.date).getTime() : 0;
		const diff = aTime - bTime;
		return filters.dateOrder === 'asc' ? diff : -diff;
	});
}

export function parseSearchInput(input: string): string[] {
	return input
		.split(',')
		.map((term) => term.trim())
		.filter(Boolean);
}

export function mergeQueries(existing: string[], incoming: string[]): string[] {
	const result = [...existing];

	for (const term of incoming) {
		const normalized = term.toLowerCase();
		if (!result.some((item) => item.toLowerCase() === normalized)) {
			result.push(term);
		}
	}

	return result;
}

export function isKnownTag(query: string, allTags: string[]): boolean {
	return allTags.some((tag) => tag.toLowerCase() === query.toLowerCase());
}

export function toggleQuerySelection(selectedQueries: string[], query: string): string[] {
	if (selectedQueries.some((item) => item.toLowerCase() === query.toLowerCase())) {
		return selectedQueries.filter((item) => item.toLowerCase() !== query.toLowerCase());
	}

	return mergeQueries(selectedQueries, [query]);
}

export function getAllTags(items: FilterableItem[]): string[] {
	const tags = new Set<string>();

	for (const item of items) {
		for (const tag of item.tags ?? []) {
			tags.add(tag);
		}
	}

	return [...tags].sort((a, b) => a.localeCompare(b));
}
