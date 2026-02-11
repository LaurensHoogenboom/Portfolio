<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams, updatePortfolioItemStats } from '../../../utils/portfolioUtils';
	import { pushState } from '$app/navigation';
	import PortfolioItemDetailWrapper from './portfolioItemDetailWrapper.svelte';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioArticleBody from '$siteComponents/molecules/portfolio/portfolioArticleBody.svelte';
	import type { IQuickNavigatioItem } from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import PortfolioArticleQuickNavigation from '$siteComponents/molecules/portfolio/portfolioArticleQuickNavigation.svelte';
	import { onMount } from 'svelte';
	import PortfolioArtBody from '$siteComponents/molecules/portfolio/portfolioArtBody.svelte';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();

	let navigationItems: IQuickNavigatioItem[] = $state([]);

	const closePortfolioItem = () => {
		const state = getPortfolioState();
		state.activePortfolioItem = undefined;
		state.activePortfolioItemId = '';
		pushState(getPortfolioUrlWithParams(state), state);
	};

	onMount(() => {
		if (!portfolioItem.articleContent || portfolioItem.type == 'art') return;

		portfolioItem.articleContent.blocks.forEach((b) => {
			if (b.type == 'header' && b.id) {
				navigationItems.push({
					id: b.id,
					title: b.data.text
				});
			}
		});
	});

	$effect(() => {
		updatePortfolioItemStats(portfolioItem);
	});
</script>

<PortfolioItemDetailWrapper closeCallback={closePortfolioItem}>
	{#if portfolioItem.type == 'art'}
		<PortfolioArtBody {portfolioItem} closeCallback={closePortfolioItem} />
	{/if}

	{#if portfolioItem.type == 'project' || portfolioItem.type == 'research'}
		<PortfolioArticleHeader {portfolioItem} />
		{#if navigationItems.length}
			<PortfolioArticleQuickNavigation {navigationItems} />
		{/if}
		<PortfolioArticleBody {portfolioItem} />
	{/if}
</PortfolioItemDetailWrapper>
