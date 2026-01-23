<script lang="ts">
	import Button from '$siteComponents/atoms/button.svelte';
	import { TableOfContents } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export interface IQuickNavigatioItem {
		title: string;
		id: string;
	}

	const { navigationItems }: { navigationItems: IQuickNavigatioItem[] } = $props();

	let quickArticleNavigation: HTMLElement | undefined = $state();
	let overflowContainer: HTMLElement | undefined = $state();
	let expanded = $state(false);

	onMount(() => {
		if (!quickArticleNavigation) return;
		overflowContainer = (quickArticleNavigation.closest('.overflow-container') as HTMLElement) ?? undefined;
	});
</script>

<div class="quick-article-navigation {expanded ? 'expanded' : ''}" bind:this={quickArticleNavigation}>
	<Button type="submit" title="Inhoud" style="transparent" CSSClass="expand-button" onclick={() => (expanded = !expanded)} icon={TableOfContents} />

	<div class="navigation-items">
		{#each navigationItems as nItem}
			{#key overflowContainer}
				<Button type="goto" title={nItem.title} href="#{nItem.id}" style="inline" scrollContainer={overflowContainer} />
			{/key}
		{/each}
	</div>
</div>

<style>
	.quick-article-navigation {
		margin-top: var(--spacing-6);
		background-color: var(--grey-inset-background-light);
		border: 1px solid var(--grey-borders);
		border-radius: var(--border-radius-1);
		overflow-x: auto;

		.navigation-items {
			display: grid;
			grid-auto-flow: column;
			justify-content: center;
			width: 100%;
			grid-auto-columns: max-content;
		}

		:global(.expand-button) {
			display: none;
		}

		:global(.button) {
			height: 60px;
			padding: 0 var(--spacing-3);
			border: none;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background-color: var(--grey-inset-background);
					opacity: 1;
				}
			}
		}

		@media (max-width: 1180px) {
            grid-template-columns: 1fr auto;
            overflow: hidden;

            :global(.button) {
                width: 100%;
                text-align: center;
            }

			:global(.expand-button) {
				display: inline-flex;
                justify-content: center;
			}

			.navigation-items {
                grid-auto-flow: row;
                grid-auto-columns: 1fr;
                border-top: 1px solid var(--grey-inset-background-light);
                height: 0;
                transition: height var(--default-animation-duration);
			}

            &.expanded .navigation-items {
                border-top-color: var(--grey-borders);
                height: auto;
            }
		}
	}
</style>
