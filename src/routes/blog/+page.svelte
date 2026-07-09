<script lang="ts">
	import { filterPosts, getAllTags, type DateOrder } from '$lib/blog/filters';
	import ContentFilters from '$lib/components/ContentFilters.svelte';

	let { data } = $props();

	let selectedQueries = $state<string[]>([]);
	let searchInput = $state('');
	let dateOrder = $state<DateOrder>('desc');

	const filteredPosts = $derived(
		filterPosts(data.posts, { queries: selectedQueries, dateOrder })
	);
	const allTags = $derived(getAllTags(data.posts));
</script>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Blog</h1>
		<p class="text-sm text-text-muted">Notes, guides, and how-tos.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="text-sm text-text-muted">No posts yet.</p>
	{:else}
		<ContentFilters {allTags} bind:selectedQueries bind:searchInput bind:dateOrder />

		<div class="min-h-[24rem]">
			{#if filteredPosts.length === 0}
				<p class="text-sm text-text-muted">No posts match your filters.</p>
			{:else}
				<ul class="list-none space-y-3 p-0 m-0">
					{#each filteredPosts as post (post.slug)}
						<li>
							<a
								href="/blog/{post.slug}"
								class="group block rounded-lg border border-border p-4 hover:border-accent/40 transition-colors"
							>
								<div class="flex items-start justify-between gap-3">
									<h2 class="text-sm font-medium group-hover:text-accent transition-colors">
										{post.title}
									</h2>
									<time datetime={post.date} class="shrink-0 text-xs text-text-muted">
										{new Date(post.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})}
									</time>
								</div>
								{#if post.description}
									<p class="mt-2 text-xs text-text-muted leading-relaxed line-clamp-2">
										{post.description}
									</p>
								{/if}
								{#if post.tags?.length}
									<ul class="list-none mt-2 flex flex-wrap gap-1.5 p-0 m-0">
										{#each post.tags as tag (tag)}
											<li
												class="text-[11px] px-1.5 py-0.5 rounded border border-border/70 text-text-muted"
											>
												{tag}
											</li>
										{/each}
									</ul>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
