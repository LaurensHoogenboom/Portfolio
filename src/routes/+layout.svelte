<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Laurens Hoogenboom</title>

	<meta
		name="description"
		content="Van ontwerpend onderzoek tot tekeningen en designs. Er is van alles wat. Kijk vooral eens rond."
	/>

	<link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
	<link rel="shortcut icon" href="/favicons/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Laurens' Portfolio" />
	<link rel="manifest" href="/favicons/site.webmanifest" />
</svelte:head>

{@render children()}