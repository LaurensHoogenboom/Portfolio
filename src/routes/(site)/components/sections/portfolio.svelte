<script lang="ts">
	import ContentContainer from '$siteComponents/atoms/contentContainer.svelte';
	import PortfolioItemPreviewBox from '$siteComponents/atoms/portfolio/portfolioItemPreviewBox.svelte';
	import { page } from '$app/state';
	import Toolbar from '$siteComponents/molecules/portfolio/toolbar.svelte';
	import PortfolioPreviewBanner from '$siteComponents/atoms/portfolio/portfolioPreviewBanner.svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import { pushState } from '$app/navigation';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams } from '../../utils/portfolioUtils';
	import Title from '$siteComponents/atoms/portfolio/title.svelte';

	let { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();

	let selectedPortfolioItemType = $derived(page.state.selectedPortfolioCategory ?? 'research');
	let filteredItems = $derived(portfolioItems.filter((i) => i.type == selectedPortfolioItemType));
	let visibleItems = $derived(page.state.showAllPortfolioItems 
		? filteredItems 
		: selectedPortfolioItemType == 'art' 
			? filteredItems.slice(0, 4)
			: filteredItems.slice(0, 2));

	const showAllItems = () => {
		const state = getPortfolioState();
		state.showAllPortfolioItems = true;
		pushState(getPortfolioUrlWithParams(state), state);
	};
</script>

<div class="portfolio-wrapper">
	<Toolbar />

	<div class="files-dummy">
		<div class="file"></div>
	</div>

	<div class="shadow-container">
		<ContentContainer id="portfolio">
			<Title />

			<div class="items-wrapper {selectedPortfolioItemType == 'art' ? 'art-wrapper' : ''}">
				{#if selectedPortfolioItemType == 'art'}
					{#each visibleItems as vItem}
						<PortfolioItemPreviewBox portfolioItem={vItem} showTitleBelow={true} />
					{/each}
				{:else}
					{#each visibleItems as vItem}
						<PortfolioPreviewBanner portfolioItem={vItem} />
					{/each}
				{/if}
			</div>

			{#if !page.state.showAllPortfolioItems && visibleItems.length < filteredItems.length}
				<Button type="submit" style="secondary" title="Meer weergeven" CSSClass="more-projects-button" onclick={showAllItems} />
			{/if}
		</ContentContainer>
	</div>
</div>

<style>
	.portfolio-wrapper {
		position: relative;

		--la: calc(50% - 270px);
		--lb: calc(50% - 230px);

		@media (max-width: 1500px) {
			--la: 420px;
			--lb: 460px;
		}

		@media (max-width: 900px) {
			--la: calc(100% - 330px - var(--spacing-2));
			--lb: calc(100% - 290px - var(--spacing-2));
		}

		@media (max-width: 680px) {
			--la: calc(100% - 265px - var(--spacing-2));
			--lb: calc(100% - 235px - var(--spacing-2));
		}

		.files-dummy {
			position: absolute;
			width: 100%;
			background-color: var(--primary-background-solid);
			height: 45px;
			top: 23px;
			z-index: 1;
			clip-path: polygon(var(--la) 0, 100% 0, 100% 55px, var(--lb) 100%);
			border-top-right-radius: var(--border-radius-2);
			border-top: 1px solid var(--primary-borders);
			border-right: 1px solid var(--primary-borders);
			padding-top: 13px;
			padding-right: 13px;

			.file {
				height: 20px;
				width: 100%;
				background-color: var(--primary-borders);
				border-top-right-radius: var(--border-radius-2);
			}
		}

		.shadow-container {
			position: relative;
			z-index: 1;
			filter: drop-shadow(var(--grey-shadow-2));
		}

		:global(#portfolio) {
			position: relative;
			z-index: 2;
			border-radius: var(--border-radius-3);
			clip-path: polygon(0 0, var(--la) 0, var(--lb) 55px, 100% 55px, 100% calc(100% + 30px), 0 calc(100% + 30px));
			padding-bottom: var(--spacing-2);
			padding-top: var(--spacing-2);

			@media (max-width: 680px) {
				border-top-left-radius: 0;
				clip-path: polygon(0 15px, var(--la) 15px, var(--lb) 55px, 100% 55px, 100% calc(100% + 30px), 0 calc(100% + 30px));
			}

			.items-wrapper {
				display: flex;
				flex-direction: column;
				grid-gap: var(--spacing-7);
				padding-top: var(--spacing-6);

				@media (max-width: 1180px) {
					padding-top: var(--spacing-7);
					grid-gap: var(--spacing-8);
				}

				@media (max-width: 680px) {
					padding-top: var(--spacing-7);
					grid-gap: calc(var(--spacing-7) + var(--spacing-2));
				}

				@media (max-width: 420px) {
					padding-top: var(--spacing-6);
				}

				&.art-wrapper {
					display: grid;
					grid-template-columns: repeat(5, minmax(0, 1fr));
					grid-auto-rows: 1fr;
					list-style: none;
					grid-column-gap: var(--spacing-6);
					grid-row-gap: var(--spacing-5);
					grid-auto-flow: row dense;

					@media (max-width: 1500px) {
						grid-template-columns: repeat(4, minmax(0, 1fr));
						grid-column-gap: var(--spacing-5);
						grid-row-gap: var(--spacing-4);
					}

					@media (max-width: 1180px) {
						grid-template-columns: repeat(3, minmax(0, 1fr));
						padding-top: var(--spacing-6);
					}

					@media (max-width: 900px) {
						grid-template-columns: repeat(2, minmax(0, 1fr));
						grid-column-gap: var(--spacing-4);
					}

					@media (max-width: 680px) {
						padding-top: var(--spacing-4);
					}

					@media (max-width: 420px) {
						grid-template-columns: repeat(1, minmax(0, 1fr));
						grid-auto-rows: initial;
					}
				}
			}

			:global(.more-projects-button) {
				position: absolute;
				bottom: -25px;
				left: 50%;
				transform: translateX(-50%);
				box-sizing: border-box;
				box-shadow: 0 0 0 var(--spacing-1) var(--primary-base);

				@media (hover: hover) {
					&:hover {
						background-color: var(--grey-inset-background);
						color: var(--grey-text);
					}
				}

				@media (max-width: 680px) {
					width: initial;
				}
			}
		}
	}
</style>
