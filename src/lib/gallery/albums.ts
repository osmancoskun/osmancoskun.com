import type { GalleryAlbum, GalleryPhoto } from './types';

export function getGalleryAlbums(
	modules: Record<string, GalleryAlbum | { default: GalleryAlbum } | undefined>
): GalleryAlbum[] {
	return Object.values(modules)
		.map((module) => (module && 'default' in module ? module.default : module))
		.filter((album): album is GalleryAlbum => album != null)
		.sort((a, b) => b.month.localeCompare(a.month));
}

export function getPhoto(album: GalleryAlbum, id: string): GalleryPhoto | undefined {
	return album.photos.find((photo) => photo.id === id);
}

export function getPhotoIndex(album: GalleryAlbum, id: string): number {
	return album.photos.findIndex((photo) => photo.id === id);
}

export function getCoverPhoto(album: GalleryAlbum): GalleryPhoto | undefined {
	return album.photos[0];
}

export function formatPhotoDay(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long'
	});
}

export function formatPhotoDateLong(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function formatAlbumDateRange(album: GalleryAlbum): string | undefined {
	if (album.photos.length === 0) return undefined;

	const times = album.photos.map((photo) => new Date(photo.takenAt).getTime());
	const start = new Date(Math.min(...times));
	const end = new Date(Math.max(...times));

	const sameDay =
		start.getFullYear() === end.getFullYear() &&
		start.getMonth() === end.getMonth() &&
		start.getDate() === end.getDate();

	if (sameDay) {
		return start.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	const sameMonth =
		start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth();

	if (sameMonth) {
		return `${start.getDate()}–${end.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})}`;
	}

	return `${start.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})} – ${end.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})}`;
}

export function albumPlaceLabel(album: GalleryAlbum): string | undefined {
	return album.place ?? album.photos.find((photo) => photo.place)?.place;
}
