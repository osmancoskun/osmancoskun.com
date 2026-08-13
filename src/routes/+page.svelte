<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { site } from '$lib/seo/site';
</script>

<Seo
	title={site.name}
	description="Software engineer, open-source contributor, and sole occupant of this corner of the internet."
/>

<div class="space-y-8">
	<h1 class="text-4xl font-bold tracking-tight">Hi, I'm Osman Coskun</h1>

	<div class="space-y-4 text-text-muted leading-relaxed">
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

	<section class="space-y-3">
		<h2 class="text-sm font-medium text-text">Around here</h2>
		<ul class="list-none space-y-2 p-0 m-0 text-sm leading-relaxed">
			<li>
				<a
					href="/projects"
					class="block text-text-muted hover:text-accent transition-colors"
				>
					<span class="text-text">Projects</span>
					— open-source and personal work, mostly Linux and GNOME.
				</a>
			</li>
			<li>
				<a href="/work" class="block text-text-muted hover:text-accent transition-colors">
					<span class="text-text">Work</span>
					— freelance builds across fintech, automotive, and enterprise.
				</a>
			</li>
			<li>
				<a
					href="/experience"
					class="block text-text-muted hover:text-accent transition-colors"
				>
					<span class="text-text">Experience</span>
					— paid employment, more or less in order.
				</a>
			</li>
			<li>
				<a href="/blog" class="block text-text-muted hover:text-accent transition-colors">
					<span class="text-text">Blog</span>
					— notes and guides when I bother writing them down.
				</a>
			</li>
			<li>
				<a href="/gallery" class="block text-text-muted hover:text-accent transition-colors">
					<span class="text-text">Gallery</span>
					— photos from trips and elsewhere.
				</a>
			</li>
		</ul>
	</section>
</div>
