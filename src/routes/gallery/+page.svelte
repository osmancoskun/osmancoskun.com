<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { albumPlaceLabel, getCoverPhoto } from '$lib/gallery/albums';

	let { data } = $props();
</script>

<Seo
	title="Gallery"
	description="Photos grouped by month and country — places and dates from trips."
	path="/gallery"
/>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Gallery</h1>
		<p class="text-sm text-text-muted">Photos by month and country.</p>
	</header>

	{#if data.albums.length === 0}
		<p class="text-sm text-text-muted">No albums yet.</p>
	{:else}
		<ul class="list-none space-y-3 p-0 m-0">
			{#each data.albums as album (album.slug)}
				{@const cover = getCoverPhoto(album)}
				{@const place = albumPlaceLabel(album)}
				<li>
					<a
						href="/gallery/{album.slug}"
						class="group flex items-center gap-4 rounded-lg border border-border p-4 hover:border-accent/40 transition-colors"
					>
						{#if cover}
							<div
								class="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border/70 bg-bg"
							>
								<img
									src={cover.thumb}
									alt=""
									class="h-full w-full object-cover"
									loading="lazy"
									decoding="async"
								/>
							</div>
						{/if}
						<div class="min-w-0 flex-1 space-y-1">
							<h2 class="text-sm font-medium group-hover:text-accent transition-colors">
								{album.title}
							</h2>
							<p class="text-xs text-text-muted">
								{album.photos.length} photo{album.photos.length === 1 ? '' : 's'}
								{#if place}
									· {place}
								{/if}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
