import { buildSitemapXml, getSitemapUrls } from '$lib/seo/sitemap';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const body = buildSitemapXml(getSitemapUrls());

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, must-revalidate'
		}
	});
};
