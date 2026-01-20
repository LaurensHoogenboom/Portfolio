<script lang="ts">
	import type { IPortfolioItem, PortfolioItemType } from '$lib/types/portfolio';
	import PortfolioItemPreviewBox from '$siteComponents/atoms/portfolio/portfolioItemPreviewBox.svelte';
	import TopBar from '$siteComponents/molecules/header/portfolioPreview/topBar.svelte';
	import BottomBar from '$siteComponents/molecules/header/portfolioPreview/bottomBar.svelte';
	import { onMount } from 'svelte';

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

	$effect(() => {
		selectedPortfolioItemElement = document.getElementById(selectedPortfolioItemId) ?? undefined;
		if (!selectedPortfolioItemElement || !boxContainer) return;

		currentElementScroll = Math.abs(boxContainer.offsetLeft - selectedPortfolioItemElement.offsetLeft);

		boxContainer.scrollTo({
			left: currentElementScroll,
			top: 0,
			behavior: 'smooth'
		});
	});

	onMount(() => {
		boxContainer.addEventListener('touchstart', touchStart);
		boxContainer.addEventListener('touchmove', touchMove);
		boxContainer.addEventListener('touchend', touchEnd);

		return () => {
			boxContainer.removeEventListener('touchstart', touchStart);
			boxContainer.removeEventListener('touchmove', touchMove);
			boxContainer.removeEventListener('touchend', touchEnd);
		};
	});

	let startX = 0;
	let currentElementScroll = 0;
	let isDragging = false;

	const touchStart = (e: TouchEvent) => {
		startX = e.touches[0].clientX;
		isDragging = true;
	};

	const touchMove = (e: TouchEvent) => {
		if (!isDragging || !boxContainer || !selectedPortfolioItemElement) return;

		e.preventDefault();

		const currentX = e.touches[0].clientX;
		const diff = currentX - startX;

		boxContainer.scrollTo({ left: currentElementScroll - diff });
	};

	const touchEnd = (e: TouchEvent) => {
		if (!isDragging || !boxContainer || !selectedPortfolioItemElement) return;

		isDragging = false;
		const endX = e.changedTouches[0].clientX;
		const diff = startX - endX;
		const threshold = 100;

		if (Math.abs(diff) > threshold) {
			switch (true) {
				case diff > 0 && selectedIndex < visibleItems.length - 1:
					selectedIndex++;
					break;
				case diff < 0 && selectedIndex > 0:
					selectedIndex--;
					break;
				default:
					snapBack();
					break;
			}
		} else snapBack();
	};

	const snapBack = () => {
		boxContainer.scrollTo({
			left: currentElementScroll,
			top: 0,
			behavior: 'smooth'
		});
	};
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

		@media (max-width: 680px) {
			grid-column-gap: var(--spacing-4);
		}
	}
</style>
