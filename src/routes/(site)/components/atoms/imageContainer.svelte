<script lang="ts">
	import { Maximize, Minimize } from '@lucide/svelte';
	import Button from './button.svelte';
	import { hideFullScreenImage, showFullScreenImage } from '../../shared/fullScreenImageState.svelte';

	const {
		imgUrl,
		caption,
		showCaption = false,
		showShadow = false,
		canEnlarge = true,
		CSSClass,
		fullscreen = false
	}: {
		imgUrl: string;
		caption: string;
		showCaption?: boolean;
		showShadow?: boolean;
		canEnlarge?: boolean;
		CSSClass?: string;
		fullscreen?: boolean;
	} = $props();
</script>

<div class="image-container {showShadow ? 'shadow' : ''} {fullscreen ? 'fullscreen' : ''} {CSSClass}">
	<div class="image-wrapper">
		<img src={imgUrl} alt={caption} />

		{#if canEnlarge && !fullscreen}
			<Button
				type="submit"
				icon={Maximize}
				CSSClass="enlarge-button"
				onclick={() => showFullScreenImage(imgUrl, caption, showCaption, CSSClass)}
			/>
		{/if}
	</div>

	{#if fullscreen}
		<Button type="submit" icon={Minimize} CSSClass="shrink-button" onclick={hideFullScreenImage} />
	{/if}

	{#if showCaption}
		<p>{@html caption}</p>
	{/if}
</div>

<style>
	.image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		grid-row-gap: var(--spacing-3);
		margin-top: var(--spacing-4);

		:global(.enlarge-button, .shrink-button) {
			position: absolute;
			top: var(--spacing-2);
			right: var(--spacing-2);
			border: 1px solid var(--grey-borders);
			background-color: var(--black-transparent);
		}

		.image-wrapper {
			position: relative;
			display: inline-flex;
		}

		img {
			max-height: 60dvh;
			max-width: 100%;
			object-fit: cover;
			border-radius: var(--border-radius-2);
		}

		p {
			font-style: italic;
			text-align: center;
		}

		&.shadow img {
			filter: drop-shadow(var(--grey-shadow-1));
		}

		&.fullscreen {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: var(--white);
			margin-top: 0;
			z-index: 12;

			img {
				max-height: 90dvh;
				border-radius: 0;
				filter: drop-shadow(var(--grey-shadow-2));
			}
		}
	}
</style>
