<script lang="ts">
	import Button from '$siteComponents/atoms/button.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { onMount, type Snippet } from 'svelte';

	const { title, children, isOpenedByDefault = false }: { title: string; children: Snippet; isOpenedByDefault?: boolean } = $props();

	let details: HTMLDetailsElement;

	const toggleAccordion = () => {
		if (!details) return;

		if (details.hasAttribute('open')) {
			details.removeAttribute('open');
		} else {
			details.setAttribute('open', '');
		}
	};

	onMount(() => {
		if (!details) return;
		if (isOpenedByDefault) details.setAttribute('open', '');
	});
</script>

<details bind:this={details}>
	<summary>
		<p>{@html title}</p>
		<hr />
		<Button icon={ChevronDown} type="submit" style="secondary" CSSClass="summary-button" onclick={toggleAccordion} size="small" />
	</summary>

	<div class="content">
		{@render children()}
	</div>
</details>

<style>
	details {
		--extra-spacing: var(--spacing-2);

		margin-bottom: var(--spacing-1);
		margin-left: calc(0px - var(--extra-spacing) * 2);
		margin-right: calc(0px - var(--extra-spacing) * 2);
		padding-left: var(--extra-spacing);
		padding-right: var(--extra-spacing);
		overflow: hidden;

		@media (max-width: 680px) {
			--extra-spacing: var(--vertical-spacing);
			margin-left: calc(0px - var(--extra-spacing));
			margin-right: calc(0px - var(--extra-spacing));
            padding-left: 0;
            padding-right: 0;
		}

		summary {
			display: grid;
			grid-template-columns: minmax(0, max-content) minmax(30px, 1fr) max-content;
			align-items: center;
			grid-column-gap: var(--spacing-4);
			padding-left: var(--extra-spacing);
			padding-right: var(--extra-spacing);
			padding-top: var(--spacing-1);
			padding-bottom: var(--spacing-1);

			@media (max-width: 680px) {
				grid-template-columns: minmax(0, 1fr) max-content;
				grid-column-gap: var(--spacing-2);
				background-color: var(--grey-inset-background-light);
				border-top: 1px solid var(--grey-borders);
				border-bottom: 1px solid var(--grey-borders);

				hr {
					display: none;
				}
			}

			p {
				padding-bottom: 0;
				color: var(--primary-base);
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					cursor: pointer;
					background-color: var(--grey-inset-background-light);
					border-radius: var(--border-radius-2);
				}
			}

			:global(.summary-button) {
				transition: transform var(--default-animation-duration);
			}
		}

		:global(&:open > summary .summary-button) {
			transform: rotate(180deg);
		}

		:global(&::details-content) {
			block-size: 0;
			transition:
				block-size var(--default-animation-duration),
				content-visibility var(--default-animation-duration);
			transition-behavior: allow-discrete;
		}

		:global(&[open]::details-content) {
			block-size: auto;
		}

		.content {
			padding-top: var(--spacing-3);
			padding-left: var(--extra-spacing);
			padding-bottom: var(--spacing-3);
			padding-right: var(--extra-spacing);
		}
	}
</style>
