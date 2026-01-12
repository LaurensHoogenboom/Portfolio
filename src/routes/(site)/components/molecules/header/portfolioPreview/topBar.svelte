<script lang="ts">
	import type { ITabItem } from "$siteComponents/atoms/tabbar.svelte";
	import TabBar from "$siteComponents/atoms/tabbar.svelte";
	import type { PortfolioItemType } from "$lib/types/portfolio";

	
    interface headerPortfolioTabItem extends ITabItem {
		type: PortfolioItemType | undefined;
	}

	const tabItems: headerPortfolioTabItem[] = [
		{ title: 'Alles', type: undefined },
		{ title: 'Research through Design', type: 'research' },
		{ title: 'Tekeningen', type: 'art' }
	];

    const { setPortfolioItemType } : { setPortfolioItemType: (type: PortfolioItemType | undefined) => void } = $props();

    const onSelectionChange = (index: number) => {
        setPortfolioItemType(tabItems[index].type);
    }
</script>

<div class="top-bar">
    <TabBar {tabItems} onSelectionChange={onSelectionChange} />
    <hr />
</div>

<style>
    .top-bar {
        display: grid;
		align-items: center;
		grid-column-gap: var(--spacing-4);
		grid-template-columns: max-content 1fr;
	}
</style>