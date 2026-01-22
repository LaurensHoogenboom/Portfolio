<script lang="ts">
	import type { IPortfolioItem, PortfolioItemType } from '$lib/types/portfolio';
	import PortfolioItemPreviewBox from '$siteComponents/atoms/portfolio/portfolioItemPreviewBox.svelte';
	import TopBar from '$siteComponents/molecules/header/portfolioPreview/topBar.svelte';
	import BottomBar from '$siteComponents/molecules/header/portfolioPreview/bottomBar.svelte';
	import { onMount } from 'svelte';
	import { SliderSwipe } from '../../../utils/sliderSwipe';

	const { previewItems }: { previewItems: IPortfolioItem[] } = $props();

	let selectedPortfolioItemType: PortfolioItemType | undefined = $state();
	let visibleItems = $derived(
		selectedPortfolioItemType != undefined
			? previewItems.filter((pI) => pI.type == selectedPortfolioItemType).slice(0, 5)
			: previewItems.slice(0, 5)
	);

	let selectedIndex = $state(0);
	let selectedPortfolioItemId = $derived(visibleItems[selectedIndex].id);
	let selectedPortfolioItemElement: HTMLElement | undefined = $state();
	let boxContainer: HTMLUListElement;
	let sliderSwipe: SliderSwipe;

	onMount(() => {
		sliderSwipe = new SliderSwipe(boxContainer, (index: number) => (selectedIndex = index), previewItems.length - 1);
		sliderSwipe.run();

		return () => sliderSwipe.dispose();
	});

	$effect(() => {
		if (!sliderSwipe || !boxContainer) return;
		updateSliderScroll(selectedPortfolioItemId, selectedIndex, visibleItems);
	});

	const updateSliderScroll = (id: string, index: number, visibleItems: IPortfolioItem[]) => {
		selectedPortfolioItemElement = document.getElementById(id) ?? undefined;
		if (!selectedPortfolioItemElement) return;

		sliderSwipe.currentElementScroll = Math.abs(boxContainer.offsetLeft - selectedPortfolioItemElement.offsetLeft);
		sliderSwipe.currentIndex = index;
		sliderSwipe.maxIndex = visibleItems.length - 1;

		boxContainer.scrollTo({
			left: sliderSwipe.currentElementScroll,
			top: 0,
			behavior: 'smooth'
		});
	};

	let resizeTimeout: NodeJS.Timeout;

	const handleResize = () => {
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(() => {
			updateSliderScroll(selectedPortfolioItemId, selectedIndex, visibleItems);
		}, 200);
	};
</script>

<svelte:window onresize={handleResize} />

<div class="portfolio-preview">
	<TopBar
		setPortfolioItemType={(type: PortfolioItemType | undefined) => {
			selectedPortfolioItemType = type;
			selectedIndex = 0;
		}}
	/>

	<ul class="box-list" bind:this={boxContainer}>
		{#each visibleItems as pItem}
			<PortfolioItemPreviewBox portfolioItem={pItem} fixedSize={true} />
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
		--extra-width: calc((100vw - var(--page-width)) / 2 + var(--spacing-5));
		display: flex;
		width: calc(100% + (var(--extra-width)));
		overflow: hidden;
		flex-direction: column;
		grid-row-gap: var(--spacing-5);

		@media (max-width: 1500px) {
			--extra-width: calc(var(--vertical-spacing) * 2);
			margin-left: calc(0px - var(--vertical-spacing));
			margin-right: calc(0px - var(--vertical-spacing));
			margin-bottom: calc(0px - var(--spacing-7));
			background-color: var(--primary-base);
			padding-top: var(--spacing-7);
			padding-left: var(--vertical-spacing);
			padding-bottom: var(--spacing-7);
			border-top-left-radius: var(--border-radius-3);
			border-top-right-radius: var(--border-radius-3);
			border-top: 1px solid var(--primary-borders);
		}

		@media (max-width: 1180px) {
			padding-bottom: calc(var(--spacing-7) + var(--spacing-6));
		}

		@media (max-width: 680px) {
			padding-bottom: calc(var(--spacing-7) * 2);
		}

		@media (max-width: 420px) {
			grid-row-gap: var(--spacing-3);
			padding-bottom: var(--spacing-8);
		}
	}

	.box-list {
		display: grid;
		grid-auto-flow: column;
		width: 100%;
		grid-column-gap: var(--spacing-6);
		padding-top: var(--spacing-2);
		padding-bottom: var(--spacing-2);
		padding-right: 100vw;
		list-style: none;
		overflow: hidden;
		touch-action: pan-y pinch-zoom;

		@media (max-width: 680px) {
			grid-column-gap: var(--spacing-4);
		}
	}
</style>
