<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { fade } from 'svelte/transition';
	import { openPortfolioItem } from '../../../utils/portfolioUtils';

	const {
		portfolioItem,
		showTitleBelow = false,
		fixedSize = false
	}: { portfolioItem: IPortfolioItem; showTitleBelow?: boolean; fixedSize?: boolean } = $props();

	const horizontal = !fixedSize && portfolioItem.image && portfolioItem.image.thumbnail.aspectRatio > 4 / 3 ? true : false;
	let hasPreloaded = $state(false);

	const preload = () => {
		if (hasPreloaded || !portfolioItem.image) return;
		new Image().src = portfolioItem.image.url;
		hasPreloaded = true;
	};
</script>

<li
	id={portfolioItem.id}
	class="portfolio-preview-box {horizontal ? 'horizontal' : ''}"
	transition:fade|global={{ duration: 200 }}
	ontouchstart={preload}
	onmouseenter={preload}
	onfocus={preload}
>
	<button onclick={() => openPortfolioItem(portfolioItem)} aria-label={portfolioItem.title}>
		<div
			class="image-card {fixedSize ? 'fixed-size' : ''}"
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

		:global(&.fixed-size) {
			width: initial;
			height: 340px;

			@media (max-width: 1180px) {
				height: min(380px, calc(100svh - 200px));
			}

			@media (max-width: 680px) {
				height: initial;
				width: min(380px, calc(100vw - var(--vertical-spacing) * 2));
				aspect-ratio: 3 / 4 !important;
			}
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				bottom: 10px;
			}
		}
	}
</style>
