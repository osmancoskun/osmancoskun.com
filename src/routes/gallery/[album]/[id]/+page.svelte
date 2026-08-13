<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { formatPhotoDateLong } from '$lib/gallery/albums';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	let { data } = $props();
</script>

<Seo
	title="{data.photo.caption ?? data.album.title} — {data.album.title}"
	description={data.photo.description ?? data.photo.caption ?? data.photo.alt ?? data.album.title}
	path="/gallery/{data.album.slug}/{data.photo.id}"
	type="article"
/>

<div class="space-y-6">
	<header class="space-y-3">
		<a
			href="/gallery/{data.album.slug}"
			class="inline-block text-xs text-text-muted hover:text-text transition-colors"
		>
			← {data.album.title}
		</a>

		<div class="space-y-1">
			{#if data.photo.caption}
				<h1 class="text-2xl font-bold tracking-tight">{data.photo.caption}</h1>
				<p class="text-sm text-text-muted">
					{[data.photo.place, formatPhotoDateLong(data.photo.takenAt)]
						.filter(Boolean)
						.join(' · ')}
				</p>
			{:else}
				<h1 class="text-2xl font-bold tracking-tight">{formatPhotoDateLong(data.photo.takenAt)}</h1>
				{#if data.photo.place}
					<p class="text-sm text-text-muted">{data.photo.place}</p>
				{/if}
			{/if}
		</div>
	</header>

	<div class="overflow-hidden rounded-lg border border-border bg-bg">
		<img
			src={data.photo.full}
			alt={data.photo.alt ?? data.album.title}
			class="mx-auto w-full object-contain"
			loading="eager"
			decoding="async"
		/>
	</div>

	{#if data.photo.description}
		<p class="text-sm text-text leading-relaxed">{data.photo.description}</p>
	{/if}

	<nav class="flex items-center justify-between gap-4 border-t border-border/50 pt-4 text-sm">
		{#if data.prev}
			<a
				href="/gallery/{data.album.slug}/{data.prev.id}"
				class="inline-flex items-center gap-1 text-text-muted hover:text-text transition-colors"
			>
				<ChevronLeft size={16} />
				<span>Previous</span>
			</a>
		{:else}
			<span></span>
		{/if}

		{#if data.next}
			<a
				href="/gallery/{data.album.slug}/{data.next.id}"
				class="inline-flex items-center gap-1 text-text-muted hover:text-text transition-colors"
			>
				<span>Next</span>
				<ChevronRight size={16} />
			</a>
		{:else}
			<span></span>
		{/if}
	</nav>
</div>
