<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { updatePortfolioItemStats } from '../../../utils/portfolioUtils';
	import PortfolioItemDetailWrapper from './portfolioItemDetailWrapper.svelte';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioArticleBody from '$siteComponents/molecules/portfolio/portfolioArticleBody.svelte';
	import type { IQuickNavigatioItem } from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import PortfolioArticleQuickNavigation from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import PortfolioArtBody from '$siteComponents/molecules/portfolio/portfolioArtBody.svelte';

	const { portfolioItem, closeCallback }: { portfolioItem: IPortfolioItem; closeCallback: () => void } = $props();

	let navigationItems: IQuickNavigatioItem[] = $state([]);

	$effect(() => {
		if (portfolioItem) updatePortfolioItemStats(portfolioItem);
	});

	$effect(() => {
		if (portfolioItem && portfolioItem.articleContent && portfolioItem.isArticle) {
			navigationItems = portfolioItem.articleContent.blocks
				.filter((b) => b.type == 'header' && typeof b.id == 'string')
				.map((b) => ({ id: b.id ?? '', title: b.data.text }));
		}
	});
</script>

<PortfolioItemDetailWrapper {closeCallback}>
	{#if portfolioItem.isArticle}
		<PortfolioArticleHeader {portfolioItem} />
		{#if navigationItems.length}
			<PortfolioArticleQuickNavigation {navigationItems} />
		{/if}
		<PortfolioArticleBody {portfolioItem} />
	{:else}
		<PortfolioArtBody {portfolioItem} closeCallback={closeCallback} />
	{/if}
</PortfolioItemDetailWrapper>