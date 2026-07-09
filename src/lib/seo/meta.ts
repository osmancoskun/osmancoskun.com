export type SeoData = {
	title: string;
	description?: string;
	path?: string;
	type?: 'website' | 'article';
	noIndex?: boolean;
};

export function formatTitle(title: string, siteName: string): string {
	return title === siteName ? siteName : `${title} · ${siteName}`;
}

export function resolvePathUrl(baseUrl: string, path: string): string {
	return new URL(path, baseUrl).href;
}

export function resolveMetadataFromGlob<T extends { title: string; description?: string }>(
	modules: Record<string, T | undefined>,
	slug: string
): (T & { slug: string }) | null {
	for (const [path, metadata] of Object.entries(modules)) {
		if (!metadata) continue;

		const pathSlug = path.split('/').at(-2);
		if (!pathSlug || pathSlug.startsWith('(') || pathSlug !== slug) continue;

		return { slug, ...metadata };
	}

	return null;
}
