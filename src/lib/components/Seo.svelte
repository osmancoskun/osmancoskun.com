<script lang="ts">
	import { page } from '$app/state';
	import { formatTitle, resolvePathUrl, type SeoData } from '$lib/seo/meta';
	import { site } from '$lib/seo/site';

	let {
		title,
		description = site.defaultDescription,
		path,
		type = 'website',
		noIndex = false
	}: SeoData = $props();

	const pageTitle = $derived(formatTitle(title, site.name));
	const canonicalPath = $derived(path ?? page.url.pathname);
	const canonicalUrl = $derived(resolvePathUrl(site.url, canonicalPath));
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	{#if noIndex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content={site.locale} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:creator" content={site.twitterHandle} />
</svelte:head>
