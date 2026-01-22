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

	<title>Laurens Hoogenboom</title>

	<meta
		name="description"
		content="Mijn portfolio: van ontwerpend onderzoek tot tekeningen en designs. Er is van alles wat. Kijk vooral eens rond. Wil je verder praten? Neem gerust contact op!"
	/>
</svelte:head>

<div class="site-wrapper">
	<Nav />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>
