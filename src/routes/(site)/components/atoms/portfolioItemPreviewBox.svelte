<script lang="ts">
    import { type IPortfolioItem } from "../sections/portfolio.svelte";
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
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li onclick={openPortfolioItem} class="image-card">
    <b>{portfolioItem.title}</b>
    <p>{portfolioItem.type}</p>
</li>

<style>
    .image-card {
        height: 340px;
        aspect-ratio: 4 / 3;
        background-color: var(--grey-inset-background);
        border-radius: var(--border-radius-3);
        cursor: pointer;
    }
</style>
