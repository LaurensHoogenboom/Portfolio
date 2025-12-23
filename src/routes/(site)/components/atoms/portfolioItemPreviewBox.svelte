<script lang="ts">
    import { type IPortfolioItem } from "../organisms/portfolio.svelte";
	import { pushState } from "$app/navigation";

    const { portfolioItem } : { portfolioItem: IPortfolioItem } = $props();

    const openPortfolioItem = () => {
        pushState(`#portfolio?isPortfolioExpanded=true&activePortfolioItemId=${portfolioItem.id}`, {
            isPortfolioExpanded: true,
            activePortfolioItemId: portfolioItem.id
        });
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={openPortfolioItem}>
    <b>{portfolioItem.title}</b>
    <p>{portfolioItem.type}</p>
</div>