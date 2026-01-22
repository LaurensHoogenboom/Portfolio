<script lang="ts">
	import Button from '$siteComponents/atoms/button.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { SliderSwipe } from '../../utils/sliderSwipe';

	export interface ISlide {
		id: string;
		imgUrl: string;
		caption: string;
	}

	const { slides }: { slides: ISlide[] } = $props();

	let currentIndex = $state(0);
	let currentSlideId = $derived(slides[currentIndex].id);
	let slideContainer: HTMLUListElement;
	let layout: 'vertical' | 'horizontal' = $state('vertical');
	let sliderSwipe: SliderSwipe;

	onMount(() => {
		const setLayout = async () => {
			const image = new Image();
			image.src = slides[0].imgUrl;

			await new Promise((resolve) => {
				image.onload = resolve;
			});

			const aspectRatio = image.width / image.height;
			layout = aspectRatio < 10 / 16 ? 'horizontal' : 'vertical';
		};

		setLayout().then(() => {
			sliderSwipe = new SliderSwipe(slideContainer, (index: number) => (currentIndex = index), slides.length - 1);
			sliderSwipe.run();
		});

		return () => sliderSwipe.dispose();
	});

	$effect(() => {
		updateSliderScroll(currentSlideId);
	});

	const updateSliderScroll = (currentSlideId: string) => {
		const slideElement = document.getElementById(currentSlideId);

		if (!slideElement || !slideContainer || !sliderSwipe) return;

		sliderSwipe.currentElementScroll = Math.abs(slideContainer.offsetLeft - slideElement.offsetLeft);
		sliderSwipe.currentIndex = currentIndex;
		sliderSwipe.maxIndex = slides.length - 1;

		slideContainer.scrollTo({
			left: sliderSwipe.currentElementScroll,
			top: 0,
			behavior: 'smooth'
		});
	};

	let resizeTimeout: NodeJS.Timeout;

	const handleResize = () => {
		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(() => {
			updateSliderScroll(currentSlideId);
		}, 200);
	}
</script>

<svelte:window onresize={() => handleResize()} />

<div class="image-slider {layout}">
	<div class="shadow-container">
		<ul class="slide-container" bind:this={slideContainer}>
			{#each slides as s}
				<li class="slide image-wrapper" id={s.id}>
					<img src={s.imgUrl} alt={s.caption} />
				</li>
			{/each}
		</ul>
	</div>

	<div class="bottom">
		<div class="indicator">
			{#each { length: slides.length }, i}
				<span class={i == currentIndex ? 'current' : ''}></span>
			{/each}
		</div>

		{#key currentIndex}
			<Button
				type="submit"
				icon={ChevronLeft}
				style="secondary"
				onclick={() => {
					if (currentIndex > 0) currentIndex--;
				}}
				disabled={currentIndex == 0}
			/>
		{/key}

		<p>{@html slides[currentIndex].caption}</p>

		{#key currentIndex}
			<Button
				type="submit"
				icon={ChevronRight}
				style="secondary"
				onclick={() => {
					if (currentIndex < slides.length - 1) currentIndex++;
				}}
				disabled={currentIndex == slides.length - 1}
			/>
		{/key}
	</div>
</div>

<style>
	.image-slider {
		display: grid;
		grid-template-rows: 1fr max-content;
		width: 100%;
		padding-bottom: var(--spacing-3);

		.shadow-container {
			width: 100%;
			filter: drop-shadow(var(--grey-shadow-1));
		}

		.slide-container {
			display: flex;
			flex-direction: row;
			width: 100%;
			overflow: hidden;
			padding-bottom: 0;
			padding-left: 0;
			touch-action: pan-y pinch-zoom;

			.slide {
				width: 100%;
				flex-grow: 1;
				flex-shrink: 0;
				list-style: none;
				padding-bottom: var(--spacing-2);
				max-width: initial;
			}
		}

		.bottom {
			display: grid;
			grid-template-columns: max-content 1fr max-content;
			justify-self: center;
			grid-column-gap: var(--spacing-6);
			grid-row-gap: var(--spacing-5);
			width: min(100%, 768px);

			@media (max-width: 680px) and (pointer: coarse) {
				grid-row-gap: var(--spacing-3);
			}

			.indicator {
				display: flex;
				grid-column: 1 / -1;
				justify-content: center;
				justify-self: center;
				align-self: center;
				align-items: center;
				background-color: var(--grey-inset-background-light);
				grid-gap: var(--spacing-2);
				padding: var(--spacing-1) var(--spacing-2);
				border-radius: 15px;
				margin-top: var(--spacing-1);
				height: 24px;

				@media (max-width: 680px) {
					grid-row-start: 1;
					grid-column: 2 / 3;
				}

				span {
					display: block;
					background-color: var(--grey-borders);
					border-radius: 100%;
					height: 7px;
					aspect-ratio: 1 / 1;
					transition: height var(--default-animation-duration);

					&.current {
						background-color: var(--primary-base);
						height: 10px;
					}
				}
			}

			p {
				padding-bottom: 0;
				text-align: center;
				align-self: center;
				justify-self: center;

				@media (max-width: 680px) {
					grid-column: 1 / -1;
				}
			}

			:global(button) {
				margin-right: 0;

				@media (max-width: 680px) {
					grid-row-start: 1;
				}

				@media (max-width: 680px) and (pointer: coarse) {
					display: none;
				}
			}
		}

		.image-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			grid-row-gap: var(--spacing-3);
			margin-top: var(--spacing-4);

			img {
				max-height: 60dvh;
				min-height: 200px;
				max-width: 100%;
				object-fit: cover;
				border-radius: var(--border-radius-2);
			}
		}

		@media (min-width: 1500px) {
			&.horizontal {
				justify-content: center;
				grid-template-rows: 1fr;
				grid-template-columns: 450px 600px;
				grid-column-gap: var(--spacing-6);

				.bottom {
					position: relative;
					align-self: center;
					padding: var(--spacing-7) var(--spacing-6);
					justify-items: center;
					align-content: center;
					grid-row-gap: var(--spacing-5);
					grid-column-gap: var(--spacing-5);
					margin-top: var(--spacing-4);
					border-radius: var(--border-radius-3);
					border: 1px solid var(--primary-base);
					background-color: white;
					box-shadow: var(--grey-shadow-2);
					grid-auto-flow: column;

					&:after {
						content: '';
						position: absolute;
						display: block;
						height: 100%;
						width: 100%;
						background-color: red;
						z-index: -1;
						transform: rotate(3deg);
						border-radius: var(--border-radius-3);
						background-color: var(--primary-background-solid);
						border: 1px solid var(--primary-borders);
					}

					p {
						grid-row-start: 1;
						grid-column: 1 / -1;
					}

					.indicator {
						grid-column: 2 / 3;
					}

					:global(button) {
						grid-row-start: 2;
					}
				}
			}
		}
	}
</style>
