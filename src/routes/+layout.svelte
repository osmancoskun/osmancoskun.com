<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/work', label: 'Work' },
		{ href: '/experience', label: 'Experience' },
		{ href: '/gallery', label: 'Gallery' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col max-w-3xl mx-auto px-6">
	<header class="h-24 flex items-center justify-between py-8">
		<a href="/" class="font-bold text-lg hover:text-accent transition-colors">
			osmancoskun
		</a>
		<div class="flex items-center gap-4">
			<nav class="hidden md:flex items-center gap-6 text-sm">
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

	<!-- Mobile Nav (Simple version) -->
	<nav class="md:hidden flex flex-wrap gap-4 text-sm mb-8 text-text-muted">
		{#each navItems as item}
			<a href={item.href} class="hover:text-text transition-colors">
				{item.label}
			</a>
		{/each}
	</nav>

	<main class="flex-1 py-8">
		{@render children()}
	</main>

	<footer class="py-8 mt-auto border-t border-border/50 text-sm text-text-muted flex justify-between items-center">
		<p>&copy; {new Date().getFullYear()} Osman Coskun.</p>
		<a href="https://github.com/osmancoskun" target="_blank" rel="noopener noreferrer" class="hover:text-text transition-colors">GitHub</a>
	</footer>
</div>
