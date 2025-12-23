<script lang="ts">
    import ContentContainer from "../atoms/contentContainer.svelte";
    import { X, ChevronLeft } from "@lucide/svelte";
	import PortfolioItemPreviewBox from "../atoms/portfolioItemPreviewBox.svelte";
    import { portfolioSectionState as sectionState } from "../../siteState.svelte";

    export interface IPortfolioItem {
        id: string,
        type: "drawing" | "project",
        title: string,
    }

    let { portfolioItems } : { portfolioItems: IPortfolioItem[]} = $props();

    let blockScroll = $state(false);
    let visibleItems = $state(portfolioItems.slice(0, 2));

    $effect(() => {
        blockScroll = sectionState.isFullscreen;
        visibleItems = sectionState.isFullscreen ? portfolioItems : portfolioItems.slice(0, 2);
    });

    const closePortfolioSection = () => {
        sectionState.isFullscreen = false;
        sectionState.activePortfolioItem = undefined;
    }
</script>

<svelte:window on:wheel|nonpassive={e => {
    if(blockScroll)
        e.preventDefault()
}} />

<ContentContainer id="portfolio" fullHeight={sectionState.isFullscreen}>
    <h1>Portfolio</h1>

    <div>
        {#if sectionState.isFullscreen}
            <button onclick={closePortfolioSection}><X/></button>
        {/if}

        {#if sectionState.activePortfolioItem}
            <button onclick={() => sectionState.activePortfolioItem = undefined}><ChevronLeft /></button>
        {/if}
    </div>

    {#if !sectionState.activePortfolioItem}
        {#each visibleItems as vItem}
            <PortfolioItemPreviewBox portfolioItem={vItem} />
        {/each}

        {#if !sectionState.isFullscreen && portfolioItems.length > 2}
            <button onclick={() => sectionState.isFullscreen = true}>more</button>
        {/if}
    {:else}
        <PortfolioItemPreviewBox portfolioItem={sectionState.activePortfolioItem} />
    {/if}    
</ContentContainer>