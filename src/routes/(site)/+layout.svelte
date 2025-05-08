<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" media="screen" href="/src/styles/site.css">
</svelte:head>

{@render children()}

