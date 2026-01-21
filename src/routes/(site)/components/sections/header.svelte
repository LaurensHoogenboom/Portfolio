<script lang="ts">
	import AnimatedMouseWheel from '$siteComponents/atoms/header/animatedMouseWheel.svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import ContentContainer from '$siteComponents/atoms/contentContainer.svelte';
	import PortfolioPrevew from '$siteComponents/organisms/header/portfolioPrevew.svelte';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import Title from '$siteComponents/atoms/header/title.svelte';

	const { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();
</script>

<ContentContainer id="header" theme="dark-gradient">
	<div class="header-content">
		<div class="article-wrapper">
			<div class="files"></div>

			<article>
				<Title />

				<p>
					Experimenterend onderzoeken, ontwerpend overbruggen en verbeeldend tot leven wekken. Van begrijpen naar verbinden, en van
					verbinden naar beleven. En alles door elkaar, <i>natuurlijk.</i>
				</p>

				<div>
					<Button type="goto" href="#portfolio" title="Portfolio" />
					<Button type="goto" href="#contact" title="Contact" style="secondary" />
				</div>
			</article>

			<AnimatedMouseWheel CSSClass="animated-mouse-wheel-responsive" />
		</div>

		<PortfolioPrevew previewItems={portfolioItems} />
	</div>

	<AnimatedMouseWheel CSSClass="animated-mouse-wheel-desktop" />
</ContentContainer>

<style>
	:global(#header) {
		position: relative;
		z-index: 1;
		border-bottom-left-radius: var(--border-radius-3);
		border-bottom-right-radius: var(--border-radius-3);
		min-height: calc(100dvh - (var(--nav-height) + var(--spacing-6)));
		overflow: hidden;

		@media (min-height: 1000px) and (min-width: 1500px) {
			min-height: initial;
			height: calc(100dvh - (var(--nav-height) + var(--spacing-6)));
			max-height: 900px;
		}

		:global([class^='animated-mouse-wheel-'], [class*=' animated-mouse-wheel-']) {
			left: 50%;
			transform: translateX(-50%);
			position: relative;
		}

		@media (max-width: 1500px) {
			:global(.animated-mouse-wheel-desktop) {
				display: none;
			}
		}
	}

	.header-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 50px;
		height: 100%;
		align-items: center;

		.article-wrapper {
			padding-bottom: var(--spacing-6);
			padding-top: var(--spacing-6);

			.files {
				display: none;
			}

			:global(.animated-mouse-wheel-responsive) {
				display: none;
			}
		}

		@media (max-width: 1500px) {
			grid-template-columns: 1fr;

			.article-wrapper {
				display: grid;
				grid-template-rows: 1fr max-content;
				min-height: calc(100dvh - 250px);
				padding-bottom: 0;
				width: 100%;

				@media (min-height: 1000px) {
					min-height: initial;
					height: calc(100dvh - (var(--nav-height) + var(--spacing-6)));
					max-height: 650px;
				}

				@media (max-width: 680px) {
					padding-top: 0;
					min-height: calc(100dvh - 230px);
				}

				article {
					text-align: center;
					align-self: center;
					margin: 0 auto;

					@media (max-width: 680px) {

						&:before {
							display: block;
							position: relative;
							width: 2px;
							height: 10dvh;
							content: '';
							background-color: var(--primary-borders);
							left: 50%;
							margin-bottom: var(--spacing-4);
						}
					}

					:global(.button) {
						overflow: visible;

						&:first-child {
							@media (max-width: 680px) {
								margin-top: var(--spacing-4);
								margin-bottom: var(--spacing-4);
							}
						}

						&:first-child:before,
						&:last-child:after {
							content: '';
							display: block;
							position: absolute;
							height: 1px;
							width: 100vw;
							background-color: var(--primary-borders);
						}

						&:first-child:before {
							right: calc(100% + var(--spacing-4));

							@media (max-width: 680px) {
								left: 50%;
								transform: translateX(-50%);
								top: calc(100% + var(--spacing-2));
								width: 50%;
							}
						}

						&:last-child:after {
							left: calc(100% + var(--spacing-4));

							@media (max-width: 680px) {
								display: none;
							}
						}
					}
				}

				:global(.animated-mouse-wheel-responsive) {
					display: block;
					margin-top: var(--spacing-6);
				}

				.files {
					position: absolute;
					display: block;
					left: 0;
					bottom: 200px;
					z-index: -1;

					@media (max-width: 680px) {
						display: none;
					}

					&:after, &:before {
						content: '';
						height: 500px;
						aspect-ratio: 3 / 4;
						display: block;
						background-color: white;
						opacity: 14%;
						border-radius: var(--border-radius-2);
					}

					&:before {
						transform: rotate(-12deg) translateY(200px) translateX(-100px);
					}

					&:after {
						transform: translateY(-200px) rotate(-1deg) translateX(100px);
					}
				}
			}
		}
	}
</style>
