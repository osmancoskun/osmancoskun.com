import { error } from '@sveltejs/kit';
import { getAlbumBySlug } from '$lib/gallery/load';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const album = getAlbumBySlug(params.album);

	if (!album) {
		error(404, 'Album not found');
	}

	return { album };
};
