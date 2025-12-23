<script lang="ts">
    import { type IPortfolioItem } from "../organisms/portfolioSection.svelte";
    import { portfolioSectionState } from "../../siteState.svelte";

    const { portfolioItem } : { portfolioItem: IPortfolioItem } = $props();

    const openPortfolioItem = () => {
        portfolioSectionState.isFullscreen = true;
        portfolioSectionState.activePortfolioItem = portfolioItem;
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={openPortfolioItem}>
    <b>{portfolioItem.title}</b>
    <p>{portfolioItem.type}</p>
</div>