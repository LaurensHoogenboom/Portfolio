<script lang="ts">
	import ContentContainer from '../atoms/contentContainer.svelte';
	import PortfolioItemPreviewBox from '../atoms/portfolio/portfolioItemPreviewBox.svelte';
	import { page } from '$app/state';
	import Toolbar from '../organisms/portfolio/toolbar.svelte';
	import PortfolioPreviewBanner from '../atoms/portfolio/portfolioPreviewBanner.svelte';
	import Button from '../atoms/button.svelte';
	import { pushState } from '$app/navigation';

	export interface IPortfolioItem {
		id: string;
		type: 'drawing' | 'project';
		title: string;
		description?: string;
		thumbnail: {
			url: string;
			aspectRatio: string;
		};
	}

	let { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();

	let blockScroll = $state(false);
	let visibleItems = $state(portfolioItems.slice(0, 2));
	let activeItem = $state(portfolioItems.find((i) => i.id == page.state.activePortfolioItemId));

	$effect(() => {
		blockScroll = page.state.isPortfolioExpanded ?? false;
		visibleItems = page.state.isPortfolioExpanded ? portfolioItems : portfolioItems.slice(0, 2);
		activeItem = portfolioItems.find((i) => i.id == page.state.activePortfolioItemId);
	});
</script>

<svelte:window
	on:wheel|nonpassive={(e) => {
		if (blockScroll) e.preventDefault();
	}}
/>

<div class="portfolio-wrapper">
	<div class="files-dummy">
		<div class="file"></div>
	</div>

	<div class="shadow-container">
		<ContentContainer id="portfolio" fullHeight={page.state.isPortfolioExpanded}>
			<Toolbar hasActiveItem={activeItem ? true : false} />

			{#if !activeItem}
				<div class="items-wrapper">
					{#each visibleItems as vItem}
						<PortfolioPreviewBanner portfolioItem={vItem} />
					{/each}
				</div>
			{:else}
				<PortfolioItemPreviewBox portfolioItem={activeItem} />
			{/if}

			{#if !page.state.isPortfolioExpanded}
				<Button
					type="submit"
					style="secondary"
					title="Meer Projecten"
					CSSClass="more-projects-button"
					onclick={() => pushState('#portfolio?isPortfolioExpanded=true', { isPortfolioExpanded: true })}
				/>
			{/if}
		</ContentContainer>
	</div>
</div>

<style>
	.portfolio-wrapper {
		position: relative;

		--la: calc(50% - 270px);
		--lb: calc(50% - 230px);

		@media (max-width: 1400px) {
			--la: 420px;
			--lb: 460px;
		}

		.files-dummy {
			position: absolute;
			width: 100%;
			background-color: var(--grey-ornament);
			height: 30px;
			top: 20px;
			z-index: 1;
			clip-path: polygon(var(--la) 0, 100% 0, 100% 50px, var(--lb) 100%);
			border-top-right-radius: var(--border-radius-2);
			border-top: 1px solid var(--grey-borders);
			border-right: 1px solid var(--grey-borders);
			padding-top: 13px;
			padding-right: 13px;

			.file {
				height: 17px;
				width: 100%;
				background-color: var(--white);
				border-top-right-radius: var(--border-radius-2);
				border-top: 1px solid var(--grey-borders);
				border-right: 1px solid var(--grey-borders);
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
			clip-path: polygon(0 0, var(--la) 0, var(--lb) 50px, 100% 50px, 100% calc(100% + 30px), 0 calc(100% + 30px));

			.items-wrapper {
				display: flex;
				flex-direction: column;
				grid-gap: var(--spacing-7);
				padding-top: var(--spacing-6);
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
			}
		}
	}
</style>
