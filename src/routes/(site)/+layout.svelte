<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import { dev } from '$app/environment';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    {#if dev}
        <link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site/site.css">
    {:else}
        <link rel="stylesheet" type="text/css" media="screen" href="/styles/site/site.css">
    {/if}
</svelte:head>

<div class="content-wrapper">
    <nav>
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
        <a href="/login/">Login</a>
    </nav>

    <main>
        {@render children()}
    </main>
</div>
