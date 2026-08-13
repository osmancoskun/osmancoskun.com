<script lang="ts">
	import GalleryPhotoGrid from '$lib/components/GalleryPhotoGrid.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { albumPlaceLabel, formatAlbumDateRange } from '$lib/gallery/albums';

	let { data } = $props();

	const place = $derived(albumPlaceLabel(data.album));
	const dateRange = $derived(formatAlbumDateRange(data.album));
</script>

<Seo
	title={data.album.title}
	description={data.album.description ?? `Photos from ${data.album.title}.`}
	path="/gallery/{data.album.slug}"
/>

<div class="space-y-6">
	<header class="space-y-3">
		<a
			href="/gallery"
			class="inline-block text-xs text-text-muted hover:text-text transition-colors"
		>
			← Gallery
		</a>

		<div class="space-y-1">
			<h1 class="text-2xl font-bold tracking-tight">{data.album.title}</h1>
			<p class="text-sm text-text-muted">
				{#if place}{place}{/if}
				{#if place && dateRange}
					·
				{/if}
				{#if dateRange}{dateRange}{/if}
			</p>
		</div>

		{#if data.album.description}
			<p class="text-sm text-text leading-relaxed">{data.album.description}</p>
		{/if}
	</header>

	<GalleryPhotoGrid album={data.album} />
</div>
