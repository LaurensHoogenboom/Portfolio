<script lang="ts">
	import type { IPortfolioItem } from "$lib/types/portfolio";
	import { X } from "@lucide/svelte";
	import Button from "../atoms/button.svelte";
	import { getPortfolioState, getPortfolioUrlWithParams } from "../../shared/portfolioUtils";
	import { pushState } from "$app/navigation";
	import { fly, slide } from "svelte/transition";

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

        const portfolio = document.getElementById('portfolio');
		portfolio?.scrollIntoView({behavior: 'smooth'});

        closePortfolioItem();
    }
</script>

<div class="portfolio-item-detail" transition:slide>
    <div class="content-wrapper">
        {#if portfolioItem.type == 'art'}
            <div class="image-content-container">
                <img src={portfolioItem.image?.url} alt={portfolioItem.title}/>

                <div>
                    <h1>{portfolioItem.title}</h1>
                    <Button type="submit" title="Meer zoals dit" style="secondary" onclick={openSimilarItems}/>
                </div>
            </div>
        {/if}

        <Button type="submit" style="secondary" icon={X} CSSClass="detail-close-button" onclick={closePortfolioItem} />
    </div>
</div>

<style>
    .portfolio-item-detail{
        position: fixed;
        background-color: var(--white);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;

        .content-wrapper {
            position: relative;
            padding: var(--spacing-7);
            height: 100vh;
            width: 100%;

            :global(.detail-close-button) {
                position: absolute;
                top: var(--spacing-7);
                right: var(--spacing-7);
                transform: translate(50%);
            }

            &:after {
                content: '';
                display: block;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: var(--spacing-7);
                background: var(--primary-background-gradient);
            }
        }

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
    }
</style>