<script lang="ts">
	import { Maximize, Minimize } from '@lucide/svelte';
	import Button from './button.svelte';

	const {
		imgUrl,
		caption,
		showCaption = false,
		showShadow = false,
		canEnlarge = true,
		CSSClass
	}: { imgUrl: string; caption: string; showCaption?: boolean; showShadow?: boolean; canEnlarge?: boolean, CSSClass?: string } = $props();

	let fullscreen = $state(false);
</script>

<div class="image-container {showShadow ? 'shadow' : ''} {fullscreen ? 'fullscreen' : ''} {CSSClass}">
	<div class="image-wrapper">
		<img src={imgUrl} alt={caption} />

		{#if canEnlarge}
			<Button type="submit" icon={fullscreen ? Minimize : Maximize} CSSClass="enlarge-button" onclick={() => (fullscreen = !fullscreen)} />
		{/if}
	</div>

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

		.image-wrapper {
			position: relative;
			display: inline-flex;

			:global(.enlarge-button) {
				position: absolute;
				top: var(--spacing-2);
				right: var(--spacing-2);
				border: 1px solid var(--grey-borders);
				background-color: var(--black-transparent);
			}
		}

		img {
			max-height: 60dvh;
			min-height: 200px;
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
				filter: drop-shadow(var(--grey-shadow-2))
			}
		}
	}
</style>
