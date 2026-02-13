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

	<main class="intro-animation">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.intro-animation {
		animation: fadeIn 0.4s ease-out forwards;
	}
</style>
