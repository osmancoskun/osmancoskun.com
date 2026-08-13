<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';

	const status = $derived(page.status);
	const error = $derived(page.error);
	const is404 = $derived(page.status === 404);
</script>

<Seo
	title={is404 ? '404 — Page not found' : `${status} — Something went wrong`}
	description={is404 ? 'The page you requested does not exist.' : 'Something went wrong.'}
	noIndex={true}
/>

<div class="flex min-h-[70vh] items-center justify-center px-2">
	{#if is404}
		<img
			src="/404.png"
			alt="404 — Hatasız kul olmaz"
			class="w-full max-w-3xl"
			width="577"
			height="433"
			decoding="async"
		/>
	{:else}
		<div class="space-y-2 text-center">
			<h1 class="text-2xl font-bold tracking-tight">Something went wrong</h1>
			<p class="text-sm text-text-muted">
				{error && typeof error === 'object' && 'message' in error
					? String(error.message)
					: 'An unexpected error occurred.'}
			</p>
		</div>
	{/if}
</div>
