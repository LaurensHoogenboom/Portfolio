<script lang="ts">
	import { ChevronLeft, Maximize2, Minimize2 } from '@lucide/svelte';
	import Button from '../../atoms/button.svelte';
	import Tabbar, { type ITabItem } from '../../atoms/tabbar.svelte';
	import { page } from '$app/state';
	import { pushState } from '$app/navigation';
	import type { PortfolioItemType } from '$lib/server/db/types/portfolio';

    const { hasActiveItem = false, changeTypeCallback }: { hasActiveItem: boolean; changeTypeCallback: (type: PortfolioItemType) => void } =
		$props();

    interface IPortfolioTabItem extends ITabItem {
        type: PortfolioItemType
    }

    const tabItems: IPortfolioTabItem[] = [
        { title: 'Research through Design', type: 'research' },
        { title: 'Tekeningen', type: 'art' },
        { title: 'Designs', type: 'project' }
    ]

	let isExpanded = $derived(page.state.isPortfolioExpanded);

	const togglePortfolioState = () => {
		if (isExpanded) {
			pushState('#portfolio', { isPortfolioExpanded: false, activePortfolioItemId: undefined });
		} else {
			pushState('#portfolio?isPortfolioExpanded=true', { isPortfolioExpanded: true });
		}
	};

	const closeCurrentItem = () => {
		pushState('#portfolio?isPortfolioExpanded=true', { isPortfolioExpanded: true, activePortfolioItemId: undefined });
	};

    const changePortfolioItemType = (i: number) => {
        changeTypeCallback(tabItems[i].type);
    }
</script>

<div class="toolbar">
	<h1>Portfolio</h1>
	<hr />
	<div class="actions">
		{#if !hasActiveItem}
			<Tabbar {tabItems} CSSClass="portfolio-tabs" onSelectionChange={changePortfolioItemType} />
		{:else}
			<Button type="submit" icon={ChevronLeft} onclick={closeCurrentItem} style="secondary" />
		{/if}

		<Button type="submit" icon={isExpanded ? Minimize2 : Maximize2} style="secondary" onclick={togglePortfolioState} />
	</div>
</div>

<style>
	.toolbar {
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		align-items: center;
		grid-gap: var(--spacing-4);

		h1::after {
			content: 'P';
		}

		.actions {
			display: grid;
			grid-auto-flow: column;
			align-items: center;

			:global(.portfolio-tabs) {
				margin-right: var(--spacing-4);
			}
		}
	}
</style>
