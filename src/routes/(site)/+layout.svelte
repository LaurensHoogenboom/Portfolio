<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import { dev } from '$app/environment';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
    let currentYear = new Date().getFullYear();
</script>

<svelte:head>
    {#if dev}
        <link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site/site.css">
    {:else}
        <link rel="stylesheet" type="text/css" media="screen" href="/styles/site/site.css">
    {/if}
</svelte:head>

<div class="site-wrapper">
    <nav class="content-container-wrapper">
        <div class="content-container">
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
            <a href="/login/">Login</a> 
        </div>
    </nav>

    <main>
        {@render children()}
    </main>

    <footer>
        Copyright &copy; Laureato.nl {currentYear}
    </footer>
</div>