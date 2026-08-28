<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/seo/site';

	let { data } = $props();
</script>

<Seo
	title={site.name}
	description="Software engineer, open-source contributor, and sole occupant of this corner of the internet."
/>

<div class="space-y-10">
	<div class="space-y-8">
		<h1 class="text-4xl font-bold tracking-tight">Hi, I'm Osman Coskun</h1>

		<div class="space-y-4 text-base leading-relaxed text-text-muted">
			<p>
				Software engineer. Trying to leave something behind — hoping, in my own modest way, to get
				close to what someone like Linus Torvalds has pulled off.
			</p>
			<p>
				I don't use social media and I have no patience for performative personas. So this is my
				corner of the internet: me, myself, and I (ben keyfim ve kahyası).
			</p>
			<p>
				Right now I'm at TUBITAK on the Liderahenk team, building the Ahenk agent in Go. Everything
				else is scattered below.
			</p>
		</div>
	</div>

	<section class="space-y-3">
		<h2 class="text-sm font-medium text-text">Around here</h2>
		<ul class="list-none space-y-2 p-0 m-0 text-sm leading-relaxed">
			<li>
				<a
					href="/projects"
					class="block text-text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
				>
					<span class="font-medium text-text">Projects</span>
					— open-source and personal work, mostly Linux and GNOME.
				</a>
			</li>
			<li>
				<a
					href="/work"
					class="block text-text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
				>
					<span class="font-medium text-text">Work</span>
					— freelance builds across fintech, automotive, and enterprise.
				</a>
			</li>
			<li>
				<a
					href="/experience"
					class="block text-text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
				>
					<span class="font-medium text-text">Experience</span>
					— paid employment, more or less in order.
				</a>
			</li>
			<li>
				<a
					href="/blog"
					class="block text-text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
				>
					<span class="font-medium text-text">Blog</span>
					— notes and guides when I bother writing them down.
				</a>
			</li>
			<li>
				<a
					href="/gallery"
					class="block text-text-muted underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
				>
					<span class="font-medium text-text">Gallery</span>
					— photos from trips and elsewhere.
				</a>
			</li>
		</ul>
	</section>

	{#if data.posts.length > 0}
		<section class="space-y-3">
			<div class="flex items-baseline justify-between gap-4">
				<h2 class="text-sm font-medium text-text">Recent posts</h2>
				<a
					href="/blog"
					class="text-sm text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
				>
					All posts
				</a>
			</div>
			<ul class="list-none divide-y divide-border/50 p-0 m-0">
				{#each data.posts as post (post.slug)}
					<li>
						<a
							href="/blog/{post.slug}"
							class="group -mx-3 flex flex-col gap-1 rounded-md px-3 py-3 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-6"
						>
							<time datetime={post.date} class="shrink-0 text-sm text-text-muted sm:w-28">
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</time>
							<span class="text-base font-medium transition-colors group-hover:text-accent">
								{post.title}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if data.projects.length > 0}
		<section class="space-y-3">
			<div class="flex items-baseline justify-between gap-4">
				<h2 class="text-sm font-medium text-text">Recent projects</h2>
				<a
					href="/projects"
					class="text-sm text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
				>
					All projects
				</a>
			</div>
			<ul class="list-none divide-y divide-border/50 p-0 m-0">
				{#each data.projects as project (project.slug)}
					<li>
						<div
							class="-mx-3 flex flex-col gap-1 rounded-md px-3 py-3 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-6"
						>
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
							<div class="min-w-0 space-y-1">
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
									<span class="text-base font-medium">{project.title}</span>
								{/if}
								{#if project.description}
									<p class="text-sm text-text-muted">{project.description}</p>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
