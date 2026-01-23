<script lang="ts">
	import { pushState } from '$app/navigation';
	import Button from '$siteComponents/atoms/button.svelte';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { getPortfolioState, getPortfolioUrlWithParams } from '../../../utils/portfolioUtils';
	import ImageContainer from '$siteComponents/atoms/imageContainer.svelte';

	const { portfolioItem, closeCallback }: { portfolioItem: IPortfolioItem; closeCallback: () => void } = $props();

	const openSimilarItems = () => {
		const state = getPortfolioState();
		state.selectedPortfolioCategory = portfolioItem.type;
		pushState(getPortfolioUrlWithParams(state), state);

		const portfolioTop = document.getElementById('portfolio')?.getBoundingClientRect().top ?? 0;
		const scrollTop = document.documentElement.scrollTop + portfolioTop - 10;
		window.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' });

		closeCallback();
	};
</script>

<div class="image-content-container">
	{#if portfolioItem.image}
		<ImageContainer imgUrl={portfolioItem.image?.url} caption={portfolioItem.title} CSSClass="art-image-container" />
	{/if}

	<div class="description">
		<h1>{portfolioItem.title}</h1>
		<Button type="submit" title="Meer zoals dit" style="secondary" onclick={openSimilarItems} CSSClass="more-button" />
	</div>
</div>

<style>
	.image-content-container {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		height: 100%;
		width: 100%;
		align-items: center;

		@media (max-width: 1180px) {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(350px, 1fr) minmax(min-content, 0.3fr);
			align-items: center;
		}

		:global(.art-image-container:not(.fullscreen)) {
			margin-top: 0;
			height: 100%;
			overflow: hidden;
			filter: drop-shadow(var(--grey-shadow-2));

			:global(.image-wrapper) {
				max-height: 100%;
				overflow: hidden;

				:global(img) {
					height: 100%;
					width: 100%;
					min-height: 300px;
					min-height: 0;
					max-height: 100%;
					object-fit: contain;
					border-radius: 0;

					@media (max-width: 1180px) {
						padding-bottom: var(--spacing-6);
					}
				}
			}
		}

		.description {
			padding-left: var(--spacing-6);

			@media (max-width: 1180px) {
				padding-left: 0;
				text-align: center;
				align-self: start;
			}

			h1 {
				max-width: 600px;

				@media (max-width: 1180px) {
					margin: 0 auto;
					font-size: 50px;
				}

				@media (max-width: 680px) {
					font-size: 40px;
				}
			}

			:global(.more-button) {
				@media (max-width: 680px) {
					width: initial;
				}
			}
		}
	}
</style>
