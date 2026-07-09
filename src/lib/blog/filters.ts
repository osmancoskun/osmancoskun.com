import type { BlogPostMeta } from './types';
import {
	filterItems,
	getAllTags,
	type DateOrder,
	type ItemFilters
} from '$lib/content/filters';

export type { DateOrder, ItemFilters as BlogFilters };

export function filterPosts(posts: BlogPostMeta[], filters: ItemFilters): BlogPostMeta[] {
	return filterItems(posts, filters);
}

export { getAllTags };
