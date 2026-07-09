<script lang="ts">
	import { workItems } from '$lib/work/work';
</script>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Work</h1>
		<p class="text-sm text-text-muted leading-relaxed">
			Freelance fullstack web development since 2021. Delivered automation solutions across
			fintech, automotive, and enterprise sectors.
		</p>
	</header>

	<ul class="list-none space-y-3 p-0 m-0">
		{#each workItems as item (item.title)}
			<li>
				<article class="rounded-lg border border-border p-4 space-y-3">
					<div class="space-y-1">
						<h2 class="text-sm font-medium">{item.title}</h2>
						<p class="text-xs text-text-muted leading-relaxed">{item.description}</p>
					</div>

					<ul
						class="list-disc list-outside space-y-1.5 pl-5 text-xs text-text-muted leading-relaxed marker:text-text-muted"
					>
						{#each item.highlights as highlight (highlight)}
							<li>{highlight}</li>
						{/each}
					</ul>

					{#if item.tags?.length}
						<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
							{#each item.tags as tag (tag)}
								<li
									class="text-[11px] px-1.5 py-0.5 rounded border border-border/70 text-text-muted"
								>
									{tag}
								</li>
							{/each}
						</ul>
					{/if}
				</article>
			</li>
		{/each}
	</ul>
</div>
