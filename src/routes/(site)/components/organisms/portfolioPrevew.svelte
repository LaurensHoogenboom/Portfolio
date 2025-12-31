<script lang="ts">
    import { type IPortfolioItem } from "../sections/portfolio.svelte";
    import PortfolioItemPreviewBox from '../atoms/portfolio/portfolioItemPreviewBox.svelte';
    import TabBar from "../atoms/tabbar.svelte";
	import Button from "../atoms/button.svelte";
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";

    const { previewItems } : { previewItems: IPortfolioItem[] } = $props();

    const tabItems = [
        { title: 'Alles' },
        { title: 'Research through Design'},
        { title: 'Tekeningen'}
    ];

    let selectedIndex = $state(0);
    let boxContainer: HTMLUListElement;

    const nextItem = () => {
        if (selectedIndex < previewItems.length - 1) {
            selectedIndex++;
        }
    }

    const previousItem = () => {
        if (selectedIndex > 0) {
            selectedIndex--;
        }
    }

    $effect(() => {
        const portfolioItemInFocusId = previewItems[selectedIndex].id;
        const element = document.getElementById(portfolioItemInFocusId);

        if (!element) return;
        if (!boxContainer) return;

        boxContainer.scrollTo({left: Math.abs(boxContainer.offsetLeft - element.offsetLeft), top: 0, behavior: "smooth"});
    });
</script>

<div class="portfolio-preview">
    <div class="top-bar">
        <TabBar tabItems={tabItems}/>
        <hr />
    </div>

    <ul class="box-list" bind:this={boxContainer}>
        {#each previewItems.slice(0, 3) as pItem}
            <PortfolioItemPreviewBox portfolioItem={pItem} />
        {/each}
    </ul>

    <div class="bottom-bar">
        <hr />

        <div class="button-group">
            <Button type="submit" icon={ChevronLeft} style="transparent" onclick={previousItem}/>
            <Button type="submit" icon={ChevronRight} style="transparent" onclick={nextItem}/>
        </div>
    </div>
</div>

<style>
    .portfolio-preview {
        --extra-width: calc((100vw - 1400px) / 2);

        @media(max-width: 1400px) {
            --extra-width: 0px;
        }

        display: flex;
        width: calc(100% + (var(--extra-width) + var(--spacing-5)));
        overflow: hidden;
        flex-direction: column;
        grid-row-gap: var(--spacing-5);
    }

    .box-list {
        display: grid;
        grid-auto-flow: column;
        width: 100%;
        grid-column-gap: var(--spacing-6);
        padding-top: var(--spacing-2);
        padding-bottom: var(spacing-2);
        padding-right: 100vw;
        list-style: none;
        overflow: hidden;
    }

    .top-bar, .bottom-bar {
        display: grid;
        align-items: center;
        grid-column-gap: var(--spacing-4);
    }

    .top-bar {
        grid-template-columns: max-content 1fr;
    }

    .bottom-bar {
        grid-template-columns: max-content;
        padding-right: var(--extra-width);
        justify-content: end;

        :global(.button-group button:not(:last-of-type)) {
            margin-right: var(--spacing-3);
        }

        hr {
            position: absolute;
            width: 100vw;
            right: calc(var(--extra-width) + 90px + var(--spacing-3) + var(--spacing-4));
        }
    }
</style>