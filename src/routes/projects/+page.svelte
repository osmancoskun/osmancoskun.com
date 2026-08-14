<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import FolderGit2 from '@lucide/svelte/icons/folder-git-2';

	let { data } = $props();
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
		<ul class="list-none divide-y divide-border/50 p-0 m-0">
			{#each data.projects as project (project.slug)}
				<li class="-mx-3 rounded-md px-3 py-4 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
					<div class="flex flex-col gap-2 sm:flex-row sm:gap-6">
						{#if project.date}
							<time datetime={project.date} class="shrink-0 text-sm text-text-muted sm:w-28">
								{new Date(project.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short'
								})}
							</time>
						{:else}
							<span class="hidden shrink-0 sm:block sm:w-28"></span>
						{/if}

						<div class="min-w-0 flex-1 space-y-2">
							<div class="flex flex-wrap items-start justify-between gap-3">
								{#if project.url}
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										class="text-base font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
									>
										{project.title}
									</a>
								{:else}
									<h2 class="text-base font-medium">{project.title}</h2>
								{/if}

								{#if project.repo || project.url}
									<div class="flex shrink-0 flex-wrap items-center gap-3 text-sm">
										{#if project.repo}
											<a
												href={project.repo}
												target="_blank"
												rel="noopener noreferrer"
												class="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-text"
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
												class="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-text"
											>
												<ExternalLink size={14} />
												<span>Website</span>
											</a>
										{/if}
									</div>
								{/if}
							</div>

							{#if project.description}
								<p class="text-sm leading-relaxed text-text">{project.description}</p>
							{/if}

							{#if project.details}
								<p class="text-sm leading-relaxed text-text-muted">{project.details}</p>
							{/if}

							{#if project.tags?.length}
								<ul class="list-none flex flex-wrap gap-1.5 p-0 m-0">
									{#each project.tags as tag (tag)}
										<li
											class="rounded border border-border/70 px-1.5 py-0.5 text-xs text-text-muted"
										>
											{tag}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
