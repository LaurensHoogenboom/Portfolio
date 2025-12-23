<script lang="ts">
    import ContentContainer from "../atoms/contentContainer.svelte";
    import PortfolioItemPreviewBox from "../atoms/portfolioItemPreviewBox.svelte";
    import { type IPortfolioItem } from "./portfolioSection.svelte";

    const { portfolioItems } : { portfolioItems: IPortfolioItem[] } = $props();
</script>

<ContentContainer id="header">
    <h1>Home</h1>

    {#each portfolioItems.slice(0, 2) as pItem}
        <PortfolioItemPreviewBox portfolioItem={pItem}  />
    {/each}
</ContentContainer>