<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import About from './components/sections/about.svelte';
	import Contact from './components/sections/contact.svelte';
	import Header from './components/sections/header.svelte';
	import type { IPortfolioItem } from '$lib/types/portfolio'
	import Portfolio from './components/sections/portfolio.svelte';
	import { replaceState } from '$app/navigation';
	import VerticalSeperator from './components/atoms/verticalSeperator.svelte';
	import { getPortfolioSearchParams, getPortfolioUrlWithParams } from './shared/portfolioUtils';

	let { data }: { data: PageData } = $props();

	const portfolioItems: IPortfolioItem[] = data.portfolioItems.map((pItem, i) => {
		return {
			id: pItem.id,
			title: pItem.title,
			type: pItem.type,
			description: pItem.description,
			image: pItem.image
		}
	});

	onMount(() => {
		const [hash, query] = window.location.href.split('#')[1] ? window.location.href.split('#')[1].split('?') : [undefined, undefined];

		if (!query || hash != 'portfolio') return;

		const state = getPortfolioSearchParams(new URLSearchParams(query));

		setTimeout(() => {
			replaceState(getPortfolioUrlWithParams(state), state);

			if (state.selectedPortfolioCategory) {
				const portfolio = document.getElementById('portfolio');
				portfolio?.scrollIntoView({behavior: 'smooth'});
			}
		});
	});
</script>

<Header {portfolioItems} />

<About />

<VerticalSeperator zIndex={1} CSSClass="about-portfolio-seperator" />

<Portfolio {portfolioItems} />

<Contact />

<style>
	:global(.about-portfolio-seperator) {
		border-top-left-radius: var(--border-radius-3);
		border-top-right-radius: var(--border-radius-3);
		height: calc(var(--spacing-7) + (2 * var(--border-radius-3)) + 50px) !important;
		margin-bottom: calc(0px - var(--border-radius-3) - 50px) !important;
	}
</style>
