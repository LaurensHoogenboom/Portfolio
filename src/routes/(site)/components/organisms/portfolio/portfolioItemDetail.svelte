<script lang="ts">
	import type { IPortfolioItem } from "$lib/types/portfolio";
	import Button from "$siteComponents/atoms/button.svelte";
	import { getPortfolioState, getPortfolioUrlWithParams } from "../../../shared/portfolioUtils";
	import { pushState } from "$app/navigation";
	import PortfolioItemDetailWrapper from "./portfolioItemDetailWrapper.svelte";

    const { portfolioItem } : { portfolioItem: IPortfolioItem} = $props(); 

    const closePortfolioItem = () => {
        const state = getPortfolioState();
        state.activePortfolioItem = undefined;
        state.activePortfolioItemId = undefined;
        pushState(getPortfolioUrlWithParams(state), state);
    }
    
    const openSimilarItems = () => {
        const state = getPortfolioState();
        state.selectedPortfolioCategory = portfolioItem.type;
        pushState(getPortfolioUrlWithParams(state), state);

        const portfolioTop = document.getElementById('portfolio')?.getBoundingClientRect().top ?? 0;
		const scrollTop = document.documentElement.scrollTop + portfolioTop - 10;
		window.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' });

        closePortfolioItem();
    }
</script>

<PortfolioItemDetailWrapper closeCallback={closePortfolioItem}>
    {#if portfolioItem.type == 'art'}
        <div class="image-content-container">
            <img src={portfolioItem.image?.url} alt={portfolioItem.title}/>

            <div>
                <h1>{portfolioItem.title}</h1>
                <Button type="submit" title="Meer zoals dit" style="secondary" onclick={openSimilarItems}/>
            </div>
        </div>
    {/if}
</PortfolioItemDetailWrapper>

<style>
    .image-content-container {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        height: 100%;
        width: 100%;
        align-items: center;
        max-width: var(--page-width);

        img {
            height: 100%;
            width: 100%;
            min-height: 0;
            object-fit: contain;
            filter: drop-shadow(var(--grey-shadow-2));
        }

        h1 {
            max-width: 500px;
        }
    }
</style>