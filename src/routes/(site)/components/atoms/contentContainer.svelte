<script lang="ts">
	import type { Snippet } from "svelte";

    const { children, id, fullHeight = false } : { children?: Snippet, id : string, fullHeight?: boolean } = $props();

    let contentContainer: HTMLDivElement;

    $effect(() => {
        if (fullHeight) {
            contentContainer.scrollIntoView({behavior: "smooth"});
        }
    });
</script>

<div class="content-container-wrapper {fullHeight ? 'fullHeight' : ''}" id={id} bind:this={contentContainer}>
    <div class="content-container">
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>