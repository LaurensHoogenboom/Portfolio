<script lang="ts">
	import { dev } from '$app/environment';
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
    {#if dev}
        <link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site/site.css">
    {:else}
        <link rel="stylesheet" type="text/css" media="screen" href="/styles/site/site.css">
    {/if}

    <title>Laurens Hoogenboom</title>
</svelte:head>


{@render children()}