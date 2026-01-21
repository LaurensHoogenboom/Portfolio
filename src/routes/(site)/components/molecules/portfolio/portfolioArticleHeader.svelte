<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import AnimatedMouseWheel from '$siteComponents/atoms/header/animatedMouseWheel.svelte';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();
</script>

<div class="portfolio-article-header">
	<div class="header-image" style="background-image: url({JSON.stringify(portfolioItem.image?.url)});"></div>
	<article>
		<h1>{portfolioItem.title}</h1>
		<p>{@html portfolioItem.description}</p>
	</article>
	<AnimatedMouseWheel style="position: relative; justify-self: center;" color="grey" />
</div>

<style>
	.portfolio-article-header {
		display: grid;
		grid-template-rows: 1fr max-content max-content;
		height: calc(100dvh - var(--spacing-7) - var(--spacing-6));
		min-height: 800px;
		max-height: 1000px;
		width: 100%;
		grid-row-gap: var(--spacing-6);

		@media (max-width: 900px) {
			max-height: 800px;
		}

        @media (max-width: 680px) {
            grid-row-gap: var(--spacing-5);
			min-height: 600px;
			max-height: 700px;
			padding-top: var(--spacing-6);
        }

		.header-image {
			height: 100%;
			width: 100%;
			background-size: cover;
			background-position: center;
			border-radius: var(--border-radius-2);
			max-height: 500px;
			min-height: 400px;
			filter: drop-shadow(var(--grey-shadow-1));

			@media (max-width: 1180px) {
				min-height: 300px;
			}

            @media (max-width: 680px) {
				min-height: 200px;
			}
		}

		article {
			justify-self: center;
			text-align: center;

			h1 {
				padding-bottom: var(--spacing-6);

				@media (max-width: 1180px) {
					font-size: 50px;
                    padding-bottom: var(--spacing-4);
				}

                @media (max-width: 680px) {
					font-size: 30px;
				}
			}

			p {
				max-width: 850px;
				margin: 0 auto;

                @media (max-width: 680px) {
					padding-bottom: 0;
				}
			}
		}
	}
</style>
