import { loadBlogPosts } from '$lib/blog/load';
import { resolvePathUrl } from '$lib/seo/meta';
import { site } from '$lib/seo/site';

export function buildRssXml(): string {
	const posts = loadBlogPosts();

	const items = posts
		.map((post) => {
			const link = resolvePathUrl(site.url, `/blog/${post.slug}`);

			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description ?? site.defaultDescription)}</description>
    </item>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.defaultDescription)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(resolvePathUrl(site.url, '/rss.xml'))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}
