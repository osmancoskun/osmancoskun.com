import { loadGalleryAlbums } from '$lib/gallery/load';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { albums: loadGalleryAlbums() };
};
