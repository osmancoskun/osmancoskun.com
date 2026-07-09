<script lang="ts">
	import { experienceItems } from '$lib/experience/experience';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
	title="Experience"
	description="Professional experience across Linux systems development, GNOME ecosystem work, and fullstack web platforms."
	path="/experience"
/>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Experience</h1>
		<p class="text-sm text-text-muted leading-relaxed">
			Professional roles across Linux systems development, GNOME ecosystem work, and fullstack
			web platforms.
		</p>
	</header>

	<ul class="list-none space-y-3 p-0 m-0">
		{#each experienceItems as item (item.company)}
			<li>
				<article class="rounded-lg border border-border p-4 space-y-3">
					<div class="flex items-start justify-between gap-4">
						<div class="min-w-0 space-y-1">
							<h2 class="text-sm font-medium">{item.role}</h2>
							<p class="text-xs text-text-muted">
								{#if item.companyUrl}
									<a
										href={item.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="hover:text-accent transition-colors"
									>
										{item.company}
									</a>
								{:else}
									{item.company}
								{/if}
								<span> · {item.location}</span>
							</p>
						</div>

						<div class="flex shrink-0 flex-col items-end gap-0.5 text-right text-xs text-text-muted">
							{#if item.schedule}
								<span>{item.schedule}</span>
							{/if}
							<span>{item.period}</span>
						</div>
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
