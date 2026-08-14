<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';

	let { data } = $props();
</script>

<Seo
	title="Blog"
	description="Technical notes, guides, and how-tos on Linux, GNOME, and web development."
	path="/blog"
/>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Blog</h1>
		<p class="text-sm text-text-muted">Notes, guides, and how-tos.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="text-sm text-text-muted">No posts yet.</p>
	{:else}
		<ul class="list-none divide-y divide-border/50 p-0 m-0">
			{#each data.posts as post (post.slug)}
				<li>
					<a
						href="/blog/{post.slug}"
						class="group -mx-3 flex flex-col gap-2 rounded-md px-3 py-4 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] sm:flex-row sm:gap-6"
					>
						<time datetime={post.date} class="shrink-0 text-sm text-text-muted sm:w-28">
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</time>
						<div class="min-w-0 flex-1 space-y-1.5">
							<h2 class="text-base font-medium transition-colors group-hover:text-accent">
								{post.title}
							</h2>
							{#if post.description}
								<p class="text-sm leading-relaxed text-text-muted">{post.description}</p>
							{/if}
							{#if post.tags?.length}
								<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
									{#each post.tags as tag (tag)}
										<li
											class="rounded border border-border/70 px-1.5 py-0.5 text-xs text-text-muted"
										>
											{tag}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
