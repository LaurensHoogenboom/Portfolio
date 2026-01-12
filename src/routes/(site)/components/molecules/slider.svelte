<script lang="ts">
	import Button from '$siteComponents/atoms/button.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	const { slides }: { slides: ISlide[] } = $props();

	export interface ISlide {
		id: string;
		imgUrl: string;
		caption: string;
	}

	let currentIndex = $state(0);
	let currentSlideId = $derived(slides[currentIndex].id);
	let slideContainer: HTMLUListElement;

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

<div class="image-slider">
	<ul class="slide-container" bind:this={slideContainer}>
		{#each slides as s}
			<li class="slide image-wrapper" id={s.id}>
				<img src={s.imgUrl} alt={s.caption} />
				<p>{s.caption}</p>
			</li>
		{/each}
	</ul>
	<div class="controls">
        {#key currentIndex}
            <Button type="submit" icon={ChevronLeft} style="secondary" onclick={previous} disabled={currentIndex == 0} />
		    <Button type="submit" icon={ChevronRight} style="secondary" onclick={next} disabled={currentIndex == slides.length - 1} />
        {/key}
	</div>
</div>

<style>
	.image-slider {
		display: grid;
		grid-template-rows: 1fr max-content;
		width: 100%;

		.slide-container {
			display: flex;
			flex-direction: row;
			width: 100%;
			overflow: hidden;

			.slide {
				width: 100%;
				flex-grow: 1;
				flex-shrink: 0;
				list-style: none;
			}
		}

		.controls {
			justify-self: center;
		}

		.image-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			grid-row-gap: var(--spacing-3);
			margin-top: var(--spacing-4);

			p {
				font-style: italic;
			}

			img {
				max-height: 60dvh;
				min-height: 200px;
				max-width: 100%;
				object-fit: cover;
				border-radius: var(--border-radius-2);
				filter: drop-shadow(var(--grey-shadow-1));
			}
		}
	}
</style>
