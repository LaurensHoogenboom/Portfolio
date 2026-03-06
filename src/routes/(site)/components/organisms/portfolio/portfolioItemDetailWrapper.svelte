<script lang="ts">
	import { BookCheck, BookDashed, Pencil, Save, ScanEye, X } from '@lucide/svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import ScrollToTopButton from '$siteComponents/atoms/scrollToTopButton.svelte';
	import type { IArticleEditorContext } from '../../../../(editPortfolioItemArticle)/editPortfolioItemArticle/[slug]/+page.svelte';

	let overflowContainer: HTMLElement | undefined = $state();

	const {
		closeCallback,
		children,
		editorContext
	}: {
		closeCallback: () => void;
		children: Snippet;
		editorContext?: IArticleEditorContext;
	} = $props();
</script>

<div class="portfolio-item-detail" transition:slide>
	<div class="content-wrapper">
		<div class="overflow-container" bind:this={overflowContainer}>
			{@render children()}

			{#key overflowContainer}
				<ScrollToTopButton scrollContainer={overflowContainer} />
			{/key}
		</div>

		<div class="toolbar">
			<Button
				type="submit"
				style="secondary"
				icon={X}
				onclick={closeCallback}
				actionStatus={editorContext?.closingStatus}
				hiddenTitle="Close"
			/>

			{#if editorContext}
				<Button
					type="submit"
					style="secondary"
					icon={Save}
					onclick={editorContext.saveCallback}
					actionStatus={editorContext.savingStatus}
					hiddenTitle="Save"
				/>

				<Button
					type="submit"
					style="secondary"
					icon={editorContext.isPublished ? BookDashed : BookCheck}
					onclick={editorContext.togglePublishedCallback}
					actionStatus={editorContext.togglePublishStatus}
					hiddenTitle={editorContext.isPublished ? 'Unpublish' : 'Publish'}
				/>

				<Button
					type="submit"
					style="secondary"
					icon={editorContext.editorMode == 'edit' ? ScanEye : Pencil}
					onclick={editorContext.toggleEditorModeCallback}
					hiddenTitle={editorContext.editorMode == 'edit' ? 'Preview' : 'Edit'}
					actionStatus={editorContext.toggleEditModeStatus}
				/>
			{/if}
		</div>
	</div>
</div>

<style>
	.portfolio-item-detail {
		position: fixed;
		background-color: var(--white);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11;
		display: flex;
		justify-content: center;

		.content-wrapper {
			position: relative;
			height: 100dvh;
			width: 100%;
			max-width: var(--page-width);
			--extra-width: calc(100vw - var(--page-width) + var(--vertical-spacing));

			@media (max-width: 1500px) {
				--extra-width: var(--vertical-spacing);
			}

			.overflow-container {
				overflow-y: auto;
				height: 100%;
				padding: var(--spacing-7) calc(var(--vertical-spacing) * 2) var(--spacing-7) var(--vertical-spacing);

				@media (max-width: 1600px) {
					padding-right: calc(var(--vertical-spacing) * 3);
				}

				@media (max-width: 1500px) {
					padding-right: calc(var(--vertical-spacing) * 2);
					--extra-width: var(--vertical-spacing);
				}

				@media (max-width: 680px) {
					padding-right: var(--vertical-spacing);
					padding-top: var(--spacing-5);
					padding-bottom: var(--spacing-5);
				}
			}

			.toolbar {
				position: absolute;
				display: flex;
				flex-direction: column;
				top: var(--spacing-7);
				right: 0;
				transform: translate(50%);
				z-index: 1;
				grid-gap: var(--spacing-3);

				:global(button) {
					margin-right: 0;
				}

				@media (max-width: 1600px) {
					right: calc(0px + var(--vertical-spacing));
				}

				@media (max-width: 680px) {
					top: var(--spacing-3);
					right: var(--spacing-3);
					transform: initial;
				}
			}

			&:after {
				content: '';
				display: block;
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				transform: translateX(100%);
				width: var(--extra-width);
				background: var(--primary-background-gradient);
			}

			@media (max-width: 1600px) {
				&:after {
					transform: translateX(calc(100% - var(--vertical-spacing)));
				}
			}

			@media (max-width: 680px) {
				&:after {
					display: none;
				}
			}
		}
	}
</style>
