<script lang="ts">
    import { type IPortfolioItem } from "../sections/portfolio.svelte";
    import PortfolioItemPreviewBox from '../atoms/portfolioItemPreviewBox.svelte';

    const { previewItems } : { previewItems: IPortfolioItem[] } = $props();
</script>

<div class="portfolio-preview">
    <ul class="box-list">
        {#each previewItems.slice(0, 2) as pItem}
            <PortfolioItemPreviewBox portfolioItem={pItem} />
        {/each}
    </ul>
</div>

<style>
    .portfolio-preview {
        display: flex;
        width: calc(100% + ((100vw - 1400px) / 2) + var(--spacing-5));
        overflow: hidden;
    }

    .box-list {
        display: grid;
        grid-auto-flow: column;
        width: 100%;
        overflow: auto;
        grid-column-gap: var(--spacing-6);
    }
</style>