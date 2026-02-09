<script lang="ts">
	import type { Snippet } from 'svelte';
	import { dev } from '$app/environment';
	import Nav from '$siteComponents/sections/nav.svelte';
	import Footer from '$siteComponents/sections/footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" type="text/css" media="screen" href="{dev ? '/src' : ''}/styles/site/site.css" />
	<title>Laurens Hoogenboom</title>
</svelte:head>

<div class="site-wrapper">
	<Nav />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>
