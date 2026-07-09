<script lang="ts">
	import {
		isKnownTag,
		mergeQueries,
		parseSearchInput,
		toggleQuerySelection,
		type DateOrder
	} from '$lib/content/filters';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';

	let {
		allTags,
		selectedQueries = $bindable<string[]>([]),
		searchInput = $bindable(''),
		dateOrder = $bindable<DateOrder>('desc')
	}: {
		allTags: string[];
		selectedQueries?: string[];
		searchInput?: string;
		dateOrder?: DateOrder;
	} = $props();

	function toggleDateOrder() {
		dateOrder = dateOrder === 'desc' ? 'asc' : 'desc';
	}

	function addQueriesFromInput() {
		const incoming = parseSearchInput(searchInput);
		if (incoming.length === 0) return;

		selectedQueries = mergeQueries(selectedQueries, incoming);
		searchInput = '';
	}

	function handleSearchInput(event: Event) {
		const value = (event.currentTarget as HTMLInputElement).value;
		if (!value.includes(',')) return;

		const parts = value.split(',');
		const toAdd = parts.slice(0, -1).map((term) => term.trim()).filter(Boolean);

		selectedQueries = mergeQueries(selectedQueries, toAdd);
		searchInput = parts.at(-1)?.trimStart() ?? '';
	}

	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter') return;

		event.preventDefault();
		addQueriesFromInput();
	}

	function toggleTag(tag: string) {
		selectedQueries = toggleQuerySelection(selectedQueries, tag);
	}

	function removeQuery(query: string) {
		selectedQueries = selectedQueries.filter((item) => item !== query);
	}

	const keywordQueries = $derived(
		selectedQueries.filter((query) => !isKnownTag(query, allTags))
	);
</script>

<div class="space-y-3">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-start">
		<div class="min-w-0 flex-1 space-y-2">
			<label class="relative block">
				<Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
				<input
					type="text"
					inputmode="search"
					placeholder="Search"
					bind:value={searchInput}
					oninput={handleSearchInput}
					onkeydown={handleSearchKeydown}
					class="w-full rounded-lg border border-border bg-transparent py-2 pl-9 pr-3 text-sm placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
				/>
			</label>

			{#if keywordQueries.length > 0}
				<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
					{#each keywordQueries as query (query)}
						<li>
							<button
								type="button"
								onclick={() => removeQuery(query)}
								class="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded border border-border/70 text-text-muted hover:border-accent/40 hover:text-text transition-colors"
							>
								<span>{query}</span>
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
					class="text-[11px] px-1.5 py-0.5 rounded border transition-colors {selectedQueries.some(
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
</div>
