<script lang="ts">
	import type { IPortfolioItem } from '$lib/server/db/types/portfolio';
	import { pushState } from '$app/navigation';

	const { portfolioItem, showTitleBelow = false }: { portfolioItem: IPortfolioItem; showTitleBelow?: boolean } = $props();

	const openPortfolioItem = () => {
		pushState(`#portfolio?isPortfolioExpanded=true&activePortfolioItemId=${portfolioItem.id}`, {
			isPortfolioExpanded: true,
			activePortfolioItemId: portfolioItem.id
		});
	};
</script>

<li id={portfolioItem.id} class="portfolio-preview-box">
	<button onclick={openPortfolioItem}>
		<div
			class="image-card"
			style="background-image: url({JSON.stringify(portfolioItem.image?.thumbnail.url)}); aspect-ratio: {portfolioItem.image?.thumbnail
				.aspectRatio
				? portfolioItem.image.thumbnail.aspectRatio > 4 / 3
					? '4/3'
					: '3/4'
				: ''}"
		></div>

		{#if showTitleBelow}
			<p><b>{portfolioItem.title}</b></p>
		{/if}
	</button>
</li>

<style>
	.portfolio-preview-box {
		button {
			display: flex;
			flex-direction: column;
			grid-row-gap: var(--spacing-2);
			border: none;
			background: none;
			text-align: left;
		}

		p b {
			color: var(--primary-base);
			padding-left: var(--spacing-4);
			padding-bottom: 0;
		}
	}

	.image-card {
		position: relative;
		height: 340px;
		aspect-ratio: 4 / 3;
		border-radius: var(--border-radius-3);
		cursor: pointer;
		border: 1px solid var(--primary-borders);
		background-size: cover;
		background-position: center;
		box-shadow: var(--primary-shadow);
		bottom: 0;
		transition: bottom var(--default-animation-duration);

		@media (hover: hover) {
			&:hover {
				bottom: 10px;
			}
		}
	}
</style>
