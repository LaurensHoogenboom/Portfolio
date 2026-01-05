<script lang="ts">
	import { ChevronLeft } from '@lucide/svelte';
	import Button from '../../atoms/button.svelte';
	import Tabbar, { type ITabItem } from '../../atoms/tabbar.svelte';
	import { pushState } from '$app/navigation';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams } from '../../../shared/portfolioUtils';

	const { hasActiveItem = false }: { hasActiveItem: boolean } = $props();

	interface IPortfolioTabItem extends ITabItem {
		type: PortfolioItemType;
	}

	const tabItems: IPortfolioTabItem[] = [
		{ title: 'Research through Design', type: 'research' },
		{ title: 'Tekeningen', type: 'art' },
		{ title: 'Designs', type: 'project' }
	];

	const closeCurrentItem = () => {
		const state = getPortfolioState();
		state.activePortfolioItemId = undefined;
		pushState(getPortfolioUrlWithParams(state), state);
	};

	const changePortfolioItemType = (i: number) => {
		const state = getPortfolioState();
		state.selectedPortfolioCategory = tabItems[i].type;
		pushState(getPortfolioUrlWithParams(state), state);
		selectedIndex = i;
	};

	let selectedIndex = $state(0);
	let toolbar: HTMLDivElement;

	$effect(() => {
		if (toolbar) {
			const toolbarIntersectionObserver = new IntersectionObserver(
				([e]) => {
					e.target.classList.toggle('sticky', e.intersectionRatio < 1);
				},
				{ threshold: [1] }
			);

			toolbarIntersectionObserver.observe(toolbar);
		}
	});
</script>

<div class="toolbar" bind:this={toolbar}>
	<div class="toolbar-content">
		{#if !hasActiveItem}
			<Tabbar {tabItems} style="tabs" CSSClass="portfolio-tabs" onSelectionChange={changePortfolioItemType} {selectedIndex} />
		{:else}
			<Button type="submit" icon={ChevronLeft} onclick={closeCurrentItem} style="secondary" />
		{/if}
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
		bottom: 45px;
		justify-items: center;
		margin-bottom: -45px;

		.toolbar-content {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			width: min(100%, var(--page-width));
			padding: 0 var(--spacing-6);
		}

		:global(&.sticky) {
			background-color: var(--white);
			border-bottom: 1px solid var(--grey-borders);
			box-shadow: var(--grey-shadow-2);
		}
	}
</style>
