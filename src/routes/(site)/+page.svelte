<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import About from '$siteComponents/sections/about.svelte';
	import Contact from '$siteComponents/sections/contact.svelte';
	import Header from '$siteComponents/sections/header.svelte';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import Portfolio from '$siteComponents/sections/portfolio.svelte';
	import { replaceState } from '$app/navigation';
	import VerticalSeperator from '$siteComponents/atoms/verticalSeperator.svelte';
	import { getPortfolioSearchParams, getPortfolioUrlWithParams } from './utils/portfolioUtils';
	import PortfolioItemDetail from '$siteComponents/organisms/portfolio/portfolioItemDetail.svelte';
	import { page } from '$app/state';
	import ScrollToTopButton from '$siteComponents/atoms/scrollToTopButton.svelte';
	import FullscreenImage from '$siteComponents/atoms/fullscreenImage.svelte';

	let { data }: { data: PageData; } = $props();

	onMount(async () => {
		const [hash, query] = window.location.href.split('#')[1] ? window.location.href.split('#')[1].split('?') : [undefined, undefined];

		if (!query || hash != 'portfolio') return;

		const state = getPortfolioSearchParams(new URLSearchParams(query));

		if (state.activePortfolioItemId && !state.activePortfolioItem) {
			const response = await fetch(`portfolioItem/${state.activePortfolioItemId}`);
			state.activePortfolioItem = (await response.json()) as IPortfolioItem;
		}

		setTimeout(() => {
			replaceState(getPortfolioUrlWithParams(state), state);

			if (state.selectedPortfolioCategory) {
				const portfolioTop = document.getElementById('portfolio')?.getBoundingClientRect().top ?? 0;
				const scrollTop = document.documentElement.scrollTop + portfolioTop - 10;
				window.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' });
			}
		});
	});
</script>

<Header portfolioItems={data.portfolioItems} />

<About />

<VerticalSeperator zIndex={1} CSSClass="about-portfolio-seperator" />

<Portfolio portfolioItems={data.portfolioItems} />

{#if page.state.activePortfolioItem}
	<PortfolioItemDetail portfolioItem={page.state.activePortfolioItem} />
{/if}

<Contact />

<ScrollToTopButton />

<FullscreenImage />

<style>
	:global(.about-portfolio-seperator) {
		border-top-left-radius: var(--border-radius-3);
		border-top-right-radius: var(--border-radius-3);
		height: calc(var(--spacing-7) + (2 * var(--border-radius-3)) + 50px) !important;
		margin-bottom: calc(0px - var(--border-radius-3) - 50px) !important;
	}
</style>