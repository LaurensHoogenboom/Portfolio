<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';
	import Nav from '$siteComponents/sections/nav.svelte';
	import Footer from '$siteComponents/sections/footer.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	{#if dev}
		<link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site/site.css" />
	{:else}
		<link rel="stylesheet" type="text/css" media="screen" href="/styles/site/site.css" />
	{/if}
</svelte:head>

<div class="site-wrapper">
	<Nav />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>
