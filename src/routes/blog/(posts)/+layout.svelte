<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';

	let { data, children } = $props();
</script>

{#if data.seo}
	<Seo {...data.seo} />
{/if}

<article class="prose blog-prose dark:prose-invert max-w-none">
	{@render children()}
</article>
