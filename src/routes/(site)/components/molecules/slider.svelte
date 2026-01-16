<script lang="ts">
	import Button from '$siteComponents/atoms/button.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { onMount } from 'svelte';

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

	onMount(() => {
		const setLayout = async () => {
			const image = new Image();
			image.src = slides[0].imgUrl;

			await new Promise((resolve) => {
				image.onload = resolve;
			});

			const aspectRatio = image.width / image.height;
			layout = aspectRatio < 10 / 16 ? 'horizontal' : 'vertical';
		}

		setLayout();
	});

	$effect(() => {
		const slideElement = document.getElementById(currentSlideId);

		if (!slideElement) return;
		if (!slideContainer) return;

		slideContainer.scrollTo({
			left: Math.abs(slideContainer.offsetLeft - slideElement.offsetLeft),
			top: 0,
			behavior: 'smooth'
		});
	});

	const previous = () => {
		if (currentIndex > 0) currentIndex--;
	};

	const next = () => {
		if (currentIndex < slides.length - 1) currentIndex++;
	};
</script>

<div class="image-slider {layout}">
	<ul class="slide-container" bind:this={slideContainer}>
		{#each slides as s}
			<li class="slide image-wrapper" id={s.id}>
				<img src={s.imgUrl} alt={s.caption} />
			</li>
		{/each}
	</ul>
	<div class="bottom">
		{#key currentIndex}
			<Button type="submit" icon={ChevronLeft} style="secondary" onclick={previous} disabled={currentIndex == 0} />
		{/key}

		<p>{@html slides[currentIndex].caption}</p>

		{#key currentIndex}
			<Button type="submit" icon={ChevronRight} style="secondary" onclick={next} disabled={currentIndex == slides.length - 1} />
		{/key}
	</div>
</div>

<style>
	.image-slider {
		display: grid;
		grid-template-rows: 1fr max-content;
		width: 100%;
		padding-bottom: var(--spacing-3);

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
				grid-template-columns: 1fr 1fr;
				grid-row-gap: var(--spacing-5);
				grid-column-gap: var(--spacing-5);
				margin-top: var(--spacing-4);
				border-radius: var(--border-radius-3);
				border: 1px solid var(--primary-base);
				background-color: white;
				box-shadow: var(--grey-shadow-2);

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
					grid-row: 1 / 2;
					grid-column: 1 / -1;
				}

				:global(.button:first-child) {
					justify-self: end;
				}

				:global(.button:last-child) {
					justify-self: start;
				}
			}
		}

		.slide-container {
			display: flex;
			flex-direction: row;
			width: 100%;
			overflow: hidden;
			padding-bottom: 0;

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
			margin-top: var(--spacing-5);
			width: min(100%, 768px);

			p {
				padding-bottom: 0;
				text-align: center;
				align-self: center;
			}

			:global(button) {
				margin-right: 0;
			}
		}

		.image-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			grid-row-gap: var(--spacing-3);
			margin-top: var(--spacing-4);

			img {
				max-height: 70dvh;
				min-height: 200px;
				max-width: 100%;
				object-fit: cover;
				border-radius: var(--border-radius-2);
				filter: drop-shadow(var(--grey-shadow-1));
			}
		}
	}
</style>
