<script lang="ts">
	import { filterProjects, getAllTags, type DateOrder } from '$lib/projects/filters';
	import ContentFilters from '$lib/components/ContentFilters.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import FolderGit2 from '@lucide/svelte/icons/folder-git-2';

	let { data } = $props();

	let selectedQueries = $state<string[]>([]);
	let searchInput = $state('');
	let dateOrder = $state<DateOrder>('desc');

	const filteredProjects = $derived(
		filterProjects(data.projects, { queries: selectedQueries, dateOrder })
	);
	const allTags = $derived(getAllTags(data.projects));
</script>

<Seo
	title="Projects"
	description="Open source work and personal projects across Linux, GNOME, and web development."
	path="/projects"
/>

<div class="space-y-6">
	<header class="space-y-1">
		<h1 class="text-2xl font-bold tracking-tight">Projects</h1>
		<p class="text-sm text-text-muted">Open source work and personal projects.</p>
	</header>

	{#if data.projects.length === 0}
		<p class="text-sm text-text-muted">No projects yet.</p>
	{:else}
		<ContentFilters {allTags} bind:selectedQueries bind:searchInput bind:dateOrder />

		<div class="min-h-[24rem]">
			{#if filteredProjects.length === 0}
				<p class="text-sm text-text-muted">No projects match your filters.</p>
			{:else}
				<ul class="list-none space-y-3 p-0 m-0">
					{#each filteredProjects as project (project.slug)}
						<li>
							<article class="rounded-lg border border-border p-4">
								<div class="flex items-start justify-between gap-4">
									<div class="min-w-0 flex-1 space-y-2">
										{#if project.url}
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm font-medium hover:text-accent transition-colors"
											>
												{project.title}
											</a>
										{:else}
											<h2 class="text-sm font-medium">{project.title}</h2>
										{/if}

										{#if project.description}
											<p class="text-xs text-text leading-relaxed">
												{project.description}
											</p>
										{/if}

										{#if project.details}
											<p class="text-xs text-text-muted leading-relaxed">
												{project.details}
											</p>
										{/if}

										{#if project.tags?.length}
											<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
												{#each project.tags as tag (tag)}
													<li
														class="text-[11px] px-1.5 py-0.5 rounded border border-border/70 text-text-muted"
													>
														{tag}
													</li>
												{/each}
											</ul>
										{/if}
									</div>

									<div class="flex shrink-0 flex-col items-end gap-2 text-xs">
										{#if project.date}
											<time datetime={project.date} class="text-text-muted">
												{new Date(project.date).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'short'
												})}
											</time>
										{/if}

										{#if project.repo || project.url}
											<div class="flex flex-col items-end gap-1">
												{#if project.repo}
													<a
														href={project.repo}
														target="_blank"
														rel="noopener noreferrer"
														class="inline-flex items-center gap-1 text-text-muted hover:text-text transition-colors"
													>
														<FolderGit2 size={14} />
														<span>Repository</span>
													</a>
												{/if}
												{#if project.url}
													<a
														href={project.url}
														target="_blank"
														rel="noopener noreferrer"
														class="inline-flex items-center gap-1 text-text-muted hover:text-text transition-colors"
													>
														<ExternalLink size={14} />
														<span>Website</span>
													</a>
												{/if}
											</div>
										{/if}
									</div>
								</div>
							</article>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
