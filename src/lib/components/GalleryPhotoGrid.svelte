<script lang="ts">
	import { formatPhotoDay } from '$lib/gallery/albums';
	import type { GalleryAlbum } from '$lib/gallery/types';

	let { album }: { album: GalleryAlbum } = $props();
</script>

<ul class="list-none grid grid-cols-3 gap-2 p-0 m-0 sm:grid-cols-4">
	{#each album.photos as photo (photo.id)}
		<li>
			<a href="/gallery/{album.slug}/{photo.id}" class="group block">
				<div
					class="aspect-square overflow-hidden rounded-md border border-border bg-bg transition-colors group-hover:border-accent/40"
				>
					<img
						src={photo.thumb}
						alt={photo.alt ?? album.title}
						class="h-full w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
				<p class="mt-1.5 text-[11px] leading-snug text-text-muted">
					{formatPhotoDay(photo.takenAt)}
				</p>
				{#if photo.caption}
					<p class="text-[11px] leading-snug text-text">{photo.caption}</p>
				{:else if photo.place}
					<p class="text-[11px] leading-snug text-text-muted/80">{photo.place}</p>
				{/if}
			</a>
		</li>
	{/each}
</ul>
