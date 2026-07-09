<script lang="ts">
	import {
		filterPosts,
		getAllTags,
		mergeTags,
		parseTagInput,
		toggleTagSelection,
		type DateOrder
	} from '$lib/blog/filters';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';

	let { data } = $props();

	let selectedTags = $state<string[]>([]);
	let tagInput = $state('');
	let dateOrder = $state<DateOrder>('desc');

	const filteredPosts = $derived(filterPosts(data.posts, { tags: selectedTags, dateOrder }));
	const allTags = $derived(getAllTags(data.posts));

	function toggleDateOrder() {
		dateOrder = dateOrder === 'desc' ? 'asc' : 'desc';
	}

	function addTagsFromInput() {
		const incoming = parseTagInput(tagInput);
		if (incoming.length === 0) return;

		selectedTags = mergeTags(selectedTags, incoming);
		tagInput = '';
	}

	function handleTagInput(event: Event) {
		const value = (event.currentTarget as HTMLInputElement).value;
		if (!value.includes(',')) return;

		const parts = value.split(',');
		const toAdd = parts.slice(0, -1).map((tag) => tag.trim()).filter(Boolean);

		selectedTags = mergeTags(selectedTags, toAdd);
		tagInput = parts.at(-1)?.trimStart() ?? '';
	}

	function handleTagKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter') return;

		event.preventDefault();
		addTagsFromInput();
	}

	function toggleTag(tag: string) {
		selectedTags = toggleTagSelection(selectedTags, tag);
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((item) => item !== tag);
	}
</script>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Blog</h1>
		<p class="text-sm text-text-muted">Notes, guides, and how-tos.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="text-sm text-text-muted">No posts yet.</p>
	{:else}
		<div class="flex flex-col gap-3 sm:flex-row sm:items-start">
			<div class="min-w-0 flex-1 space-y-2">
				<label class="relative block">
					<Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
					<input
						type="text"
						inputmode="search"
						placeholder="Add tags (comma or Enter)..."
						bind:value={tagInput}
						oninput={handleTagInput}
						onkeydown={handleTagKeydown}
						class="w-full rounded-lg border border-border bg-transparent py-2 pl-9 pr-3 text-sm placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
					/>
				</label>

				{#if selectedTags.length > 0}
					<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
						{#each selectedTags as tag (tag)}
							<li>
								<button
									type="button"
									onclick={() => removeTag(tag)}
									class="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded border border-accent text-accent hover:border-accent-hover hover:text-accent-hover transition-colors"
								>
									<span>{tag}</span>
									<X size={12} />
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<button
				type="button"
				onclick={toggleDateOrder}
				class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-text-muted hover:text-text hover:border-accent/40 transition-colors min-w-[8.75rem]"
			>
				{#if dateOrder === 'desc'}
					<ArrowDown size={14} />
					<span>Newest first</span>
				{:else}
					<ArrowUp size={14} />
					<span>Oldest first</span>
				{/if}
			</button>
		</div>

		{#if allTags.length > 0}
			<div class="flex flex-wrap gap-1.5">
				{#each allTags as tag (tag)}
					<button
						type="button"
						onclick={() => toggleTag(tag)}
						class="text-[11px] px-1.5 py-0.5 rounded border transition-colors {selectedTags.some(
							(item) => item.toLowerCase() === tag.toLowerCase()
						)
							? 'border-accent text-accent'
							: 'border-border/70 text-text-muted hover:border-accent/40 hover:text-text'}"
					>
						{tag}
					</button>
				{/each}
			</div>
		{/if}

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
