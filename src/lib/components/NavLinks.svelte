<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';

	type NavItem = {
		href: string;
		label: string;
		class?: string;
		activeClass?: string;
	};

	let {
		leading,
		items = [],
		class: className = '',
		itemsClass = 'flex items-center gap-3'
	}: {
		leading?: NavItem;
		items?: NavItem[];
		class?: string;
		itemsClass?: string;
	} = $props();

	let navEl = $state<HTMLElement | null>(null);
	let indicator = $state({ left: 0, top: 0, width: 0, visible: false });
	let ready = $state(false);

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
	}

	async function updateIndicator() {
		await tick();

		if (!navEl) return;

		const activeLink = navEl.querySelector<HTMLElement>('a[aria-current="page"]');
		if (!activeLink) {
			indicator = { ...indicator, visible: false };
			return;
		}

		const navRect = navEl.getBoundingClientRect();
		const linkRect = activeLink.getBoundingClientRect();

		indicator = {
			left: linkRect.left - navRect.left,
			top: linkRect.bottom - navRect.top - 2,
			width: linkRect.width,
			visible: true
		};
		ready = true;
	}

	$effect(() => {
		page.url.pathname;
		updateIndicator();
	});

	$effect(() => {
		if (!navEl) return;

		updateIndicator();

		const ro = new ResizeObserver(() => updateIndicator());
		ro.observe(navEl);

		const onResize = () => updateIndicator();
		window.addEventListener('resize', onResize);

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', onResize);
		};
	});

	function linkClass(item: NavItem) {
		return isActive(item.href)
			? (item.activeClass ?? 'font-semibold text-text')
			: (item.class ?? 'text-text-muted hover:text-text transition-colors');
	}
</script>

<nav bind:this={navEl} class="relative {className}">
	{#if leading}
		<a
			href={leading.href}
			class={linkClass(leading)}
			aria-current={isActive(leading.href) ? 'page' : undefined}
		>
			{leading.label}
		</a>
	{/if}

	{#if items.length > 0}
		<div class={itemsClass}>
			{#each items as item (item.href)}
				<a
					href={item.href}
					class={linkClass(item)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}

	<span
		class="pointer-events-none absolute h-0.5 rounded-full bg-text duration-300 ease-out"
		class:transition-[left,top,width,opacity]={ready}
		style:left="{indicator.left}px"
		style:top="{indicator.top}px"
		style:width="{indicator.width}px"
		style:opacity={indicator.visible ? 1 : 0}
		aria-hidden="true"
	></span>
</nav>
