<script lang="ts">
    import ContentContainer from "../atoms/contentContainer.svelte";
    import { X } from "@lucide/svelte";

    export interface IPortfolioItem {
        type: "drawing" | "project",
        title: string,
    }

    let { portfolioItems } : { portfolioItems: IPortfolioItem[]} = $props();

    let blockScroll = $state(false);
    let isFullScreen = $state(false);

    $effect(() => {
        blockScroll = isFullScreen;
    })
</script>

<svelte:window on:wheel|nonpassive={e => {
    if(blockScroll)
        e.preventDefault()
}} />

<ContentContainer id="portfolio" fullHeight={isFullScreen}>
    <h1>Portfolio</h1>

    {#if !isFullScreen && portfolioItems.length > 2}
        <button onclick={() => isFullScreen = true}>more</button>
    {:else}
        <button onclick={() => isFullScreen = false}>
            <X/>
        </button>
    {/if}  

    <ul>
        {#if !isFullScreen}
            {#each portfolioItems.slice(0, 2) as pItem}
                <li>{pItem.title}</li>
            {/each}
        {:else}
            {#each portfolioItems as pItem}
                <li>{pItem.title}</li>
            {/each}
        {/if}
    </ul>
</ContentContainer>