<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import { dev } from '$app/environment';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    {#if dev}
        <link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site.css">
    {:else}
        <link rel="stylesheet" type="text/css" media="screen" href="/styles/site.css">
    {/if}
</svelte:head>

{@render children()}

