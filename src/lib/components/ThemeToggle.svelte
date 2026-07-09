<script lang="ts">
	import { onMount } from 'svelte';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';

	let isDark = $state(false);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<button
	onclick={toggleTheme}
	class="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
	aria-label="Toggle Dark Mode"
>
	{#if isDark}
		<!-- Sun icon for dark mode (click to switch to light) -->
		<Sun size={20} />
	{:else}
		<!-- Moon icon for light mode (click to switch to dark) -->
		<Moon size={20} />
	{/if}
</button>
