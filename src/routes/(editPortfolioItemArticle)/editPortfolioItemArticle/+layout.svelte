<script lang="ts">
	import { dev } from '$app/environment';
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" media="screen" href="{dev ? '/src' : ''}/styles/site/site.css" />
    <title>Laurens Hoogenboom</title>
</svelte:head>


{@render children()}