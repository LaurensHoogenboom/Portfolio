<script lang="ts">
    import ContentContainer from "../atoms/contentContainer.svelte";
    import PortfolioItemPreviewBox from "../atoms/portfolioItemPreviewBox.svelte";
    import { type IPortfolioItem } from "./portfolio.svelte";

    const { portfolioItems } : { portfolioItems: IPortfolioItem[] } = $props();
</script>

<ContentContainer id="header" theme="dark-gradient" CSSHeight="calc(100vh - 150px)">
    <div class="header-content">
        <article>
            <h1>Home</h1>
            <p></p>
            <p></p>
            <button>Portfolio</button>
            <button>Contact</button>
        </article>

        <div class="preview-items">
            {#each portfolioItems.slice(0, 2) as pItem}
                <PortfolioItemPreviewBox portfolioItem={pItem}  />
            {/each}
        </div>
    </div>
</ContentContainer>

<style>
    :global(#header) {
        position: relative;
        z-index: 1;
        border-bottom-left-radius: var(--border-radius-3);
        border-bottom-right-radius: var(--border-radius-3);
    }

    .header-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 50px;
        height: 100%;
        align-items: center;
    }
</style>