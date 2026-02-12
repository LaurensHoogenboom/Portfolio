<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import { openPortfolioItem } from '../../../utils/portfolioUtils';
	import Button from '$siteComponents/atoms/button.svelte';
	import { fade } from 'svelte/transition';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();
</script>

<div class="portfolio-preview-banner" transition:fade={{ duration: 200 }}>
	<div class="body">
		<div class="thumbnail-wrapper">
			<div class="thumbnail" style="background-image: url({JSON.stringify(portfolioItem.image?.thumbnail.url)});"></div>
		</div>
		<div class="content">
			<article>
				<h2>{portfolioItem.title}</h2>
				<p>{@html portfolioItem.description}</p>
			</article>
			<Button type="submit" title="Meer Lezen" onclick={() => openPortfolioItem(portfolioItem)} />
		</div>
	</div>

	<div class="footer"></div>
</div>

<style>
	.portfolio-preview-banner {
		display: grid;

		.body {
			display: grid;
			grid-template-columns: 1.3fr 2fr;
			border-top-left-radius: var(--border-radius-3);
			border-top-right-radius: var(--border-radius-3);
			border: 1px solid var(--grey-borders);
			border-bottom: none;
			clip-path: polygon(-40px -40px, calc(100% + 40px) -40px, calc(100% + 40px) 100%, -40px 100%);
			box-shadow: var(--grey-shadow-2);
			position: relative;

			@media (max-width: 1500px) {
				grid-template-columns: 1.7fr 2fr;
			}

			@media (max-width: 1180px) {
				grid-template-columns: 1fr;
				clip-path: initial;
				border-bottom-left-radius: var(--border-radius-3);
				border-bottom-right-radius: var(--border-radius-3);
			}

			@media (hover: hover) and (pointer: fine) and (min-width: 1180px) {
				:global(&:has(.content button:hover)) {
					.thumbnail-wrapper .thumbnail {
						transform: rotate(-1deg) translateY(calc(-5% - 10px)) translateX(20px);
					}

					.thumbnail-wrapper .thumbnail:before {
						transform: rotate(-5deg) translateZ(-1px) translateX(-25px) translateY(20px);
					}
				}
			}
		}

		.thumbnail-wrapper {
			background-color: var(--primary-base);
			border-top-left-radius: var(--border-radius-3);

			@media (max-width: 1180px) {
				height: min(40vw, 350px);
				border-top-right-radius: var(--border-radius-3);
			}

			.thumbnail {
				position: relative;
				transform: rotate(-1deg) translateY(-5%) translateX(20px);
				border-radius: var(--border-radius-2);
				background-size: cover;
				background-position: center;
				border: 1px solid var(--primary-borders);
				box-shadow: var(--grey-shadow-1);
				transform-style: preserve-3d;
				width: 93%;
				height: 115%;
				transition: transform var(--default-animation-duration);

				@media (max-width: 1180px) {
					left: 50%;
					transform: rotate(-1deg) translateY(-10%) translateX(-50%);
					width: calc(100% - var(--spacing-5));
				}
			}

			.thumbnail:before {
				content: '';
				display: block;
				position: absolute;
				background-color: var(--grey-inset-background-light);
				transform: rotate(-3deg) translateZ(-1px) translateX(-20px) translateY(20px);
				border: 1px solid var(--grey-borders);
				border-radius: var(--border-radius-2);
				width: 100%;
				height: 100%;
				transition: transform var(--default-animation-duration);
			}
		}

		.footer {
			position: relative;
			border-top: 1px solid var(--primary-base);
			margin-left: calc(0px - var(--spacing-5));
			margin-right: calc(0px - var(--spacing-5));

			@media (max-width: 1180px) {
				display: none;
			}
		}

		.content {
			padding: var(--spacing-5) var(--spacing-6);

			@media (max-width: 1180px) {
				position: relative;
				z-index: 1;
				background-color: var(--white);
				box-shadow: var(--grey-shadow-1-top);
				border-bottom-left-radius: var(--border-radius-3);
				border-bottom-right-radius: var(--border-radius-3);

				p {
					max-width: 850px;
				}
			}

			@media (max-width: 680px) {
				padding: var(--spacing-4) var(--spacing-4);
			}
		}
	}
</style>
