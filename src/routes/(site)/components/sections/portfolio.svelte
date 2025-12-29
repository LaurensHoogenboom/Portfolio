<script lang="ts">
	import ContentContainer from '../atoms/contentContainer.svelte';
	import { X, ChevronLeft } from '@lucide/svelte';
	import PortfolioItemPreviewBox from '../atoms/portfolioItemPreviewBox.svelte';
	import { page } from '$app/state';
	import { pushState } from '$app/navigation';

	export interface IPortfolioItem {
		id: string;
		type: 'drawing' | 'project';
		title: string;
	}

	let { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();

	let blockScroll = $state(false);
	let visibleItems = $state(portfolioItems.slice(0, 2));
	let activeItem = $state(portfolioItems.find((i) => i.id == page.state.activePortfolioItemId));

	$effect(() => {
		blockScroll = page.state.isPortfolioExpanded ?? false;
		visibleItems = page.state.isPortfolioExpanded ? portfolioItems : portfolioItems.slice(0, 2);
		activeItem = portfolioItems.find((i) => i.id == page.state.activePortfolioItemId);
	});
</script>

<svelte:window
	on:wheel|nonpassive={(e) => {
		if (blockScroll) e.preventDefault();
	}}
/>

<ContentContainer id="portfolio" fullHeight={page.state.isPortfolioExpanded}>
	<h1>Portfolio</h1>

	<div>
		{#if page.state.isPortfolioExpanded}
			<button onclick={() => pushState('#portfolio', { isPortfolioExpanded: false, activePortfolioItemId: undefined })}>
                <X />
            </button>
		{/if}

		{#if activeItem}
			<button onclick={() => pushState('#portfolio?isPortfolioExpanded=true', { isPortfolioExpanded: true, activePortfolioItemId: undefined})}>
                <ChevronLeft />
            </button>
		{/if}
	</div>

	{#if !activeItem}
		{#each visibleItems as vItem}
			<PortfolioItemPreviewBox portfolioItem={vItem} />
		{/each}

		{#if !page.state.isPortfolioExpanded && portfolioItems.length > 2}
			<button onclick={() => pushState('#portfolio?isPortfolioExpanded=true', { isPortfolioExpanded: true })}>more</button>
		{/if}
	{:else}
		<PortfolioItemPreviewBox portfolioItem={activeItem} />
	{/if}
</ContentContainer>

<style>
	:global(#portfolio) {
		--la: calc(50% - 270px);
		--lb: calc(50% - 230px);

		@media (max-width: 1400px) {
			--la: 420px;
			--lb: 460px;
		}

		position: relative;
		z-index: 2;
		border-radius: var(--border-radius-3);
		clip-path: polygon(0 0, var(--la) 0, var(--lb) 50px, 100% 50px, 100% 100%, 0 100%);
	}
</style>
