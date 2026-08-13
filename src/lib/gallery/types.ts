export type GalleryPhoto = {
	id: string;
	takenAt: string;
	place?: string;
	thumb: string;
	full: string;
	alt?: string;
	caption?: string;
	description?: string;
};

export type GalleryAlbum = {
	slug: string;
	title: string;
	country: string;
	place?: string;
	month: string;
	description?: string;
	photos: GalleryPhoto[];
};
