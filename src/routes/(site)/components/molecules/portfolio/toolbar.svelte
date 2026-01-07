<script lang="ts">
	import Tabbar, { type ITabItem } from '$siteComponents/atoms/tabbar.svelte';
	import { pushState } from '$app/navigation';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams } from '../../../shared/portfolioUtils';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	interface IPortfolioTabItem extends ITabItem {
		type: PortfolioItemType;
	}

	const tabItems: IPortfolioTabItem[] = [
		{ title: 'Research through Design', type: 'research' },
		{ title: 'Tekeningen', type: 'art' },
		{ title: 'Designs', type: 'project' }
	];

	const changePortfolioItemType = (i: number) => {
		const state = getPortfolioState();
		state.selectedPortfolioCategory = tabItems[i].type;
		pushState(getPortfolioUrlWithParams(state), state);
		
		const portfolioTop = document.getElementById('portfolio')?.getBoundingClientRect().top ?? 0;
		const scrollTop = document.documentElement.scrollTop + portfolioTop - 10;
		window.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' });
	};

	let selectedIndex = $state(0);
	let toolbar: HTMLDivElement;

	onMount(() => {
		if (!toolbar) return;

		const toolbarIntersectionObserver = new IntersectionObserver(
			([e]) => {
				e.target.classList.toggle('sticky', e.intersectionRatio < 1);
			},
			{ threshold: [1] }
		);

		toolbarIntersectionObserver.observe(toolbar);
	});

	$effect(() => {
		selectedIndex = page.state.selectedPortfolioCategory 
			? tabItems.findIndex(t => t.type == page.state.selectedPortfolioCategory)
			: 0;
	});
</script>

<div class="toolbar" bind:this={toolbar}>
	<div class="toolbar-content">
		<Tabbar {tabItems} style="tabs" CSSClass="portfolio-tabs" onSelectionChange={changePortfolioItemType} {selectedIndex} />
	</div>
</div>

<style>
	.toolbar {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		position: relative;
		z-index: 10;
		position: sticky;
		top: -1px;
		bottom: 0px;
		justify-items: center;
		margin-bottom: -45px;

		.toolbar-content {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			width: min(100%, var(--page-width));
			padding: 0 var(--spacing-6);
		}

		&:after {
			content: '';
			position: absolute;
			background-color: var(--white);
			display: block;
			left: 0;
			top: 0;
			bottom: -1px;
			right: 0;
			border-bottom: 1px solid var(--grey-borders);
			box-shadow: var(--grey-shadow-2);
			opacity: 0;
			transition: opacity var(--default-animation-duration);
			border-bottom-left-radius: var(--border-radius-3);
			border-bottom-right-radius: var(--border-radius-3);
		}

		:global(&.sticky) {
			&:after {
				opacity: 1;
			}

			:global(.tab-bar) {
				grid-gap: 0;
			}

			:global(.tab-bar button) {
				box-shadow: none;
				padding: 0 var(--spacing-2);
			}
		}
	}
</style>
