<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import type { TableConfig } from '$lib/types/dataList';
	import DataListBody from './organisms/dataList/dataListBody.svelte';
	import DataListHeader from './organisms/dataList/dataListHeader.svelte';

	interface Props {
		data: T[];
		config: TableConfig<T>;
		itemNamePlural: string;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		deleteAction?: string;
	}

	const { data, config, itemNamePlural, editAction, writeAction, deleteAction }: Props = $props();

	const sortedKeys = $derived(
		(Object.keys(config) as Array<keyof T>)
			.filter((key) => config[key]?.visible)
			.sort((a, b) => (config[a]?.priority ?? 0) - (config[b]?.priority ?? 0))
	);

	const gridStyle = $derived(
		`grid-template-columns: repeat(${sortedKeys.length}, minmax(0, 1fr)) ${editAction || writeAction || deleteAction ? '100px' : ''};`
	);
</script>

<div class="data-list">
	<DataListHeader {config} {sortedKeys} {gridStyle} hasActions={editAction || writeAction || deleteAction ? true : false} />
	<DataListBody {data} {config} {sortedKeys} {gridStyle} {itemNamePlural} {editAction} {writeAction} {deleteAction} />
</div>

<style>
	.data-list {
		display: grid;
		grid-gap: var(--padding-1);
	}
</style>
