<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import type { SortState, TableConfig } from '$lib/types/dataList';
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
		`grid-template-columns: repeat(${sortedKeys.length}, minmax(0, 1fr)) ${editAction || writeAction || deleteAction ? '100px' : '0px'};`
	);

	let sortState = $state<SortState<T>>({ key: null, direction: 'asc' });
	let sortedData = $derived(() => {
		if (!sortState.key) return data;

		const { key, direction } = sortState;
		const multiplier = direction == 'asc' ? 1 : -1;

		return [...data].sort((a, b) => {
			const aValue = a[key];
			const bValue = b[key];

			if (aValue > bValue) return 1 * multiplier;
			if (aValue < bValue) return -1 * multiplier;
			return 0;
		});
	});

	const toggleSort = (key: keyof T) => {
		if (key == sortState.key) {
			sortState.direction = sortState.direction == 'asc' ? 'desc' : 'asc';
		} else {
			sortState.key = key;
			sortState.direction = 'asc';
		}
	};
</script>

<div class="data-list">
	<DataListHeader
		{config}
		{sortedKeys}
		{sortState}
		{gridStyle}
		hasActions={editAction || writeAction || deleteAction ? true : false}
		sortCallback={toggleSort}
	/>
	<DataListBody data={sortedData()} {config} {sortedKeys} {gridStyle} {itemNamePlural} {editAction} {writeAction} {deleteAction} />
</div>

<style>
	.data-list {
		display: grid;
		grid-gap: var(--padding-1);
	}
</style>
