import { loadBlogPosts } from '$lib/blog/load';
import { loadGalleryAlbums } from '$lib/gallery/load';
import { resolvePathUrl } from '$lib/seo/meta';
import { site } from '$lib/seo/site';

const staticRoutes = ['/', '/blog', '/projects', '/work', '/experience', '/gallery'];

export function getSitemapUrls(): string[] {
	const urls = staticRoutes.map((path) => resolvePathUrl(site.url, path));

	for (const post of loadBlogPosts()) {
		urls.push(resolvePathUrl(site.url, `/blog/${post.slug}`));
	}

	for (const album of loadGalleryAlbums()) {
		urls.push(resolvePathUrl(site.url, `/gallery/${album.slug}`));

		for (const photo of album.photos) {
			urls.push(resolvePathUrl(site.url, `/gallery/${album.slug}/${photo.id}`));
		}
	}

	return urls;
}

export function buildSitemapXml(urls: string[]): string {
	const entries = urls
		.map(
			(url) => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}
