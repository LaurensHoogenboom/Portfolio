<script lang="ts">
	import type { IPortfolioItem, PortfolioItemType } from '$lib/server/db/types/portfolio';
	import PortfolioItemPreviewBox from '../../atoms/portfolio/portfolioItemPreviewBox.svelte';
	import TopBar from '../../molecules/header/portfolioPreview/topBar.svelte';
	import BottomBar from '../../molecules/header/portfolioPreview/bottomBar.svelte';

	const { previewItems }: { previewItems: IPortfolioItem[] } = $props();

	let selectedPortfolioItemType: PortfolioItemType | undefined = $state();
	let visibleItems = $derived(
		selectedPortfolioItemType != undefined
			? previewItems.filter((pI) => pI.type == selectedPortfolioItemType).slice(0, 5)
			: previewItems.slice(0, 5)
	);

	let selectedIndex = $state(0);
	let portfolioItemInFocusId = $derived(visibleItems[selectedIndex].id);
	let boxContainer: HTMLUListElement;

	$effect(() => {
		const element = document.getElementById(portfolioItemInFocusId);

		if (!element) return;
		if (!boxContainer) return;

		boxContainer.scrollTo({ left: Math.abs(boxContainer.offsetLeft - element.offsetLeft), top: 0, behavior: 'smooth' });
	});
</script>

<div class="portfolio-preview">
	<TopBar
		setPortfolioItemType={(type: PortfolioItemType | undefined) => {
			selectedPortfolioItemType = type;
			selectedIndex = 0;
		}}
	/>

	<ul class="box-list" bind:this={boxContainer}>
		{#each visibleItems as pItem}
			<PortfolioItemPreviewBox portfolioItem={pItem} />
		{/each}
	</ul>

	{#key [selectedIndex, visibleItems]}
		<BottomBar
			setSelectedIndex={(index: number) => (selectedIndex = index)}
			maxIndex={visibleItems.length - 1}
			currentIndex={selectedIndex}
		/>
	{/key}
</div>

<style>
	.portfolio-preview {
		--extra-width: calc((100vw - 1400px) / 2);

		@media (max-width: 1400px) {
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
</style>
