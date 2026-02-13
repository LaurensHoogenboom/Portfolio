<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { fade } from 'svelte/transition';
	import { openPortfolioItem } from '../../../utils/portfolioUtils';
	import type { ButtonActionStatus } from '../button.svelte';
	import { Circle } from 'svelte-loading-spinners';

	const {
		portfolioItem,
		showTitleBelow = false,
		fixedSize = false
	}: { portfolioItem: IPortfolioItem; showTitleBelow?: boolean; fixedSize?: boolean } = $props();

	const horizontal = !fixedSize && portfolioItem.image && portfolioItem.image.thumbnail.aspectRatio > 4 / 3 ? true : false;
	let preloadStatus: ButtonActionStatus | undefined = $state();

	const handleClick = async () => {
		preloadStatus = 'processing';
		const image = new Image();
		image.src = portfolioItem.image ? portfolioItem.image.url : '';

		await new Promise((resolve) => {
			image.onload = resolve;
		});

		preloadStatus = undefined;
		openPortfolioItem(portfolioItem);
	};
</script>

<li id={portfolioItem.id} class="portfolio-preview-box {horizontal ? 'horizontal' : ''}" transition:fade|global={{ duration: 200 }}>
	<button onclick={handleClick} aria-label={portfolioItem.title}>
		<div
			class="image-card {fixedSize ? 'fixed-size' : ''}"
			style="background-image: url({JSON.stringify(portfolioItem.image?.thumbnail.url)}); aspect-ratio: {portfolioItem.image?.thumbnail
				.aspectRatio
				? portfolioItem.image.thumbnail.aspectRatio > 4 / 3
					? '4/3'
					: '3/4'
				: ''}"
		>
			{#if preloadStatus == 'processing'}
				<div class="loading-overlay" transition:fade={{ duration: 200 }}>
					<Circle color="var(--white)" size={30} />
				</div>
			{/if}
		</div>

		{#if showTitleBelow}
			<p><b>{portfolioItem.title}</b></p>
		{/if}
	</button>
</li>

<style>
	.portfolio-preview-box {
		padding-bottom: 0;
		max-width: initial;

		&:not(:has(.fixed-width)) {
			width: 100%;

			button {
				width: 100%;
			}
		}

		&.horizontal {
			@media (min-width: 420px) {
				grid-column: auto / span 2;
				height: 100%;

				button {
					height: 100%;
				}

				.image-card {
					height: 100%;
					aspect-ratio: initial !important;
				}
			}
		}

		button {
			display: flex;
			flex-direction: column;
			grid-row-gap: var(--spacing-2);
			border: none;
			background: none;
			text-align: left;
		}

		p {
			padding-bottom: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			b {
				color: var(--primary-base);
				padding-left: var(--border-radius-3);
				padding-bottom: 0;
			}
		}
	}

	.image-card {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: var(--border-radius-3);
		cursor: pointer;
		border: 1px solid var(--primary-borders);
		background-size: cover;
		background-position: center;
		box-shadow: var(--primary-shadow);
		bottom: 0;
		transition: bottom var(--default-animation-duration);
		overflow: hidden;

		:global(&.fixed-size) {
			width: initial;
			height: 340px;

			@media (max-width: 1180px) {
				height: min(380px, calc(100dvh - 200px));
			}

			@media (max-width: 680px) {
				height: initial;
				width: min(380px, calc(100vw - var(--vertical-spacing) * 2));
				aspect-ratio: 3 / 4 !important;
			}
		}

		.loading-overlay {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: var(--primary-base);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				bottom: 10px;
			}
		}
	}
</style>
