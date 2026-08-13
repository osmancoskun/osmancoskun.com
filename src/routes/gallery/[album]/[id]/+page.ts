import { error } from '@sveltejs/kit';
import { getPhoto, getPhotoIndex } from '$lib/gallery/albums';
import { getAlbumBySlug } from '$lib/gallery/load';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const album = getAlbumBySlug(params.album);

	if (!album) {
		error(404, 'Album not found');
	}

	const photo = getPhoto(album, params.id);

	if (!photo) {
		error(404, 'Photo not found');
	}

	const index = getPhotoIndex(album, params.id);
	const prev = index > 0 ? album.photos[index - 1] : null;
	const next = index < album.photos.length - 1 ? album.photos[index + 1] : null;

	return { album, photo, prev, next };
};
