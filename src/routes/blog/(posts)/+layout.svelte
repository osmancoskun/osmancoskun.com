<script lang="ts">
	let { children } = $props();
</script>

<article class="prose dark:prose-invert max-w-none">
	{@render children()}
</article>
