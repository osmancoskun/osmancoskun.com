<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.jpg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/blog', label: '/blog' },
		{ href: '/projects', label: '/projects' },
		{ href: '/work', label: '/work' },
		{ href: '/experience', label: '/experience' },
		{ href: '/gallery', label: '/gallery' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/jpeg" />
</svelte:head>

<div class="min-h-screen flex flex-col max-w-3xl mx-auto px-6">
	<div class="sticky top-0 z-50 -mx-6 mb-3 border-b border-border/40 bg-bg/95 px-6 backdrop-blur-sm md:mb-8">
		<header class="flex h-16 items-center justify-between py-3 md:h-20 md:py-4">
			<a
				href="/"
				class="font-mono text-sm font-semibold tracking-tight hover:text-accent transition-colors sm:text-base"
			>
				#!/osman/coskun
			</a>
			<div class="flex items-center gap-4">
				<nav class="hidden md:flex items-center gap-3 text-sm font-mono">
					{#each navItems as item}
						<a
							href={item.href}
							class="text-text-muted hover:text-text transition-colors"
						>
							{item.label}
						</a>
					{/each}
				</nav>
				<ThemeToggle />
			</div>
		</header>

		<nav class="md:hidden flex flex-wrap gap-x-3 gap-y-2 pb-3 text-sm font-mono text-text-muted md:pb-4">
			{#each navItems as item}
				<a href={item.href} class="hover:text-text transition-colors">
					{item.label}
				</a>
			{/each}
		</nav>
	</div>

	<main class="flex-1 pt-2 pb-6 md:py-8">
		{@render children()}
	</main>

	<footer class="py-8 mt-auto border-t border-border/50 text-sm text-text-muted flex justify-between items-center">
		<p>&copy; {new Date().getFullYear()} Osman Coskun.</p>
		<a href="https://github.com/osmancoskun" target="_blank" rel="noopener noreferrer" class="hover:text-text transition-colors">GitHub</a>
	</footer>
</div>
