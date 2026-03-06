<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams, updatePortfolioItemStats } from '../../../utils/portfolioUtils';
	import { pushState } from '$app/navigation';
	import PortfolioItemDetailWrapper from './portfolioItemDetailWrapper.svelte';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioArticleBody from '$siteComponents/molecules/portfolio/portfolioArticleBody.svelte';
	import type { IQuickNavigatioItem } from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import PortfolioArticleQuickNavigation from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import PortfolioArtBody from '$siteComponents/molecules/portfolio/portfolioArtBody.svelte';

	const { portfolioItem }: { portfolioItem?: IPortfolioItem } = $props();

	let navigationItems: IQuickNavigatioItem[] = $state([]);
	// svelte-ignore state_referenced_locally
	let displayedItem = $state(portfolioItem);
	let isVisible = $derived(!!portfolioItem);

	const closePortfolioItem = () => {
		const state = getPortfolioState();
		state.activePortfolioItemId = '';
		state.activePortfolioItem = undefined;
		pushState(getPortfolioUrlWithParams(state), state);
	};

	$effect(() => {
		if (portfolioItem) {
			updatePortfolioItemStats(portfolioItem);
			displayedItem = portfolioItem;
		}
	});

	$effect(() => {
		if (displayedItem && displayedItem.articleContent && displayedItem.isArticle) {
			navigationItems = displayedItem.articleContent.blocks
				.filter((b) => b.type == 'header' && typeof b.id == 'string')
				.map((b) => ({ id: b.id ?? '', title: b.data.text }));
		}
	});
</script>

{#if isVisible && displayedItem}
	<PortfolioItemDetailWrapper closeCallback={closePortfolioItem}>
		{#if displayedItem.isArticle}
			<PortfolioArticleHeader portfolioItem={displayedItem} />
			{#if navigationItems.length}
				<PortfolioArticleQuickNavigation {navigationItems} />
			{/if}
			<PortfolioArticleBody portfolioItem={displayedItem} />
		{:else}
			<PortfolioArtBody portfolioItem={displayedItem} closeCallback={closePortfolioItem} />
		{/if}
	</PortfolioItemDetailWrapper>
{/if}