<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';

	let { data, children } = $props();
</script>

{#if data.seo}
	<Seo {...data.seo} />
{/if}

{#if data.post}
	<header class="mb-8 space-y-3 border-b border-border/50 pb-6">
		<h1 class="text-3xl font-bold tracking-tight">{data.post.title}</h1>
		<div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-muted">
			<time datetime={data.post.date}>
				{new Date(data.post.date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
			{#if data.post.tags.length > 0}
				<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
					{#each data.post.tags as tag (tag)}
						<li class="rounded border border-border/70 px-1.5 py-0.5 text-xs text-text-muted">
							{tag}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</header>
{/if}

<article class="prose blog-prose dark:prose-invert max-w-none">
	{@render children()}
</article>
