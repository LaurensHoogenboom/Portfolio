<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import DataListItem from '$cmsComponents/organisms/dataList/dataListItem.svelte';
	import type { TableConfig } from '$lib/types/dataList';
	import { flip } from 'svelte/animate';

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

<div class="box list-body" style="flex-direction: column;">
	{#if data.length > 0}
		{#each data as row (row.id)}
			<div class="list-item-wrapper" animate:flip={{ duration: 400 }}>
				<DataListItem {row} {config} {sortedKeys} {gridStyle} {editAction} {writeAction} {deleteAction} />
			</div>
		{/each}
	{:else}
		<p style="text-align: center; color: var(--grey-text-1);">No {itemNamePlural}</p>
	{/if}
</div>

<style>
	.list-body {
		padding-top: var(--padding-3);
		padding-bottom: var(--padding-3);
		overflow: hidden;
	}

	.list-item-wrapper:not(:last-child) {
		border-bottom: var(--default-border);
		padding-bottom: var(--padding-4);
	}
</style>
