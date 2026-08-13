import { getGalleryAlbums } from './albums';
import type { GalleryAlbum } from './types';

const modules = import.meta.glob<GalleryAlbum>('./entries/*.json', {
	eager: true,
	import: 'default'
});

export function loadGalleryAlbums(): GalleryAlbum[] {
	return getGalleryAlbums(modules);
}

export function getAlbumBySlug(slug: string): GalleryAlbum | undefined {
	return loadGalleryAlbums().find((album) => album.slug === slug);
}
