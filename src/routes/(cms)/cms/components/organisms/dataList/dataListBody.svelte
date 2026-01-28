<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import DataListItem from '$cmsComponents/molecules/DataListItem.svelte';
	import type { TableConfig } from '$lib/types/dataList';

	interface Props {
		data: T[];
		config: TableConfig<T>;
		sortedKeys: (keyof T)[];
		gridStyle: string;
		itemNamePlural: string;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		deleteAction?: string;
	}

	const { data, config, sortedKeys, gridStyle, itemNamePlural, editAction, writeAction, deleteAction }: Props = $props();
</script>

<div class="box" style="flex-direction: column;">
	{#if data.length > 0}
		{#each data as row (row.id)}
			<DataListItem {row} {config} {sortedKeys} {gridStyle} {editAction} {writeAction} {deleteAction} />
		{/each}
	{:else}
		<p style="text-align: center; color: var(--grey-text-1);">No {itemNamePlural}</p>
	{/if}
</div>
