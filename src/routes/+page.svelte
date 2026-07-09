<script lang="ts">
	// Home page logic can be added here if needed in the future
</script>

<div class="flex flex-col gap-12">
	<section class="space-y-6">
		<h1 class="text-4xl font-bold tracking-tight">Hi, I'm Osman Coskun</h1>
		<div class="space-y-4 text-lg text-text-muted leading-relaxed">
			<p>
				I'm a Software Engineer currently working at 
				<a href="https://www.pardus.org.tr/" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30 transition-colors">Pardus</a>, 
				a Debian-based Linux distribution. I am passionate about open-source software, Linux ecosystem, and web technologies.
			</p>
			<p>
				My daily work primarily revolves around developing system applications, GNOME extensions, and contributing to various open-source projects. 
				You can find my open-source contributions and personal projects on 
				<a href="https://github.com/osmancoskun" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30 transition-colors">GitHub</a>.
			</p>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold tracking-tight">About This Space</h2>
		<p class="text-text-muted leading-relaxed">
			This is my personal corner on the internet. It's built with a strict focus on simplicity, speed, and sustainability using SvelteKit and Markdown. 
			Here, I share my technical notes, document my experiences, and showcase my projects and freelance work without any unnecessary clutter.
		</p>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold tracking-tight">Featured Work</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="p-6 rounded-lg border border-border bg-black/5 dark:bg-white/5">
				<h3 class="font-medium mb-2">Pardus Ecosystem</h3>
				<p class="text-sm text-text-muted">
					Developing and maintaining core applications like libpardus, Pardus Gnome Greeter, and Pardus Nvidia Installer.
				</p>
			</div>
			<div class="p-6 rounded-lg border border-border bg-black/5 dark:bg-white/5">
				<h3 class="font-medium mb-2">GNOME Contributions</h3>
				<p class="text-sm text-text-muted">
					Active contributor to popular GNOME shell extensions including ArcMenu, Dash to Panel, and Pano.
				</p>
			</div>
		</div>
		<div class="pt-2">
			<a href="/projects" class="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors">
				View all projects 
				<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
				</svg>
			</a>
		</div>
	</section>
</div>
