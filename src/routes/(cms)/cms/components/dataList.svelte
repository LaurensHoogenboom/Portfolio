<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import type { SortState, TableConfig } from '$lib/types/dataList';
	import DataListBody from '$cmsComponents/organisms/dataList/dataListBody.svelte';
	import DataListHeader from '$cmsComponents/organisms/dataList/dataListHeader.svelte';
	import DataListFooter, { type IPaginationStatus } from './organisms/dataList/dataListFooter.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	interface Props {
		data: T[];
		config: TableConfig<T>;
		itemNamePlural: string;
		totalItemCount: number;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		deleteAction?: string;
	}

	const { data, config, itemNamePlural, totalItemCount, editAction, writeAction, deleteAction }: Props = $props();

	const sortedKeys = $derived(
		(Object.keys(config) as Array<keyof T>)
			.filter((key) => config[key]?.visible)
			.sort((a, b) => (config[a]?.priority ?? 0) - (config[b]?.priority ?? 0))
	);

	const gridStyle = $derived(
		`grid-template-columns: ${sortedKeys
			.map((k) => {
				return config[k]?.maxWidth ? `${config[k].maxWidth}px` : 'minmax(0, 1fr)';
			})
			.join(' ')} ${editAction || writeAction || deleteAction ? '100px' : '0px'};`
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

	const updatePageParams = (newParams: Record<string, number | string>) => {
		const url = new URL(page.url);
		for (const [key, value] of Object.entries(newParams)) {
			url.searchParams.set(key, value.toString());
		}
		goto(url, { replaceState: true, keepFocus: true, noScroll: true });
	};

	const setPage = (index: number) => updatePageParams({ pageIndex: index });
	const setPageSize = (itemCount: number) => updatePageParams({ itemsPerPage: itemCount, pageIndex: 0 });

	const paginationStatus: IPaginationStatus = $derived({
		activePageIndex: parseInt(page.url.searchParams.get('pageIndex') ?? '0'),
		pageCount: Math.round(totalItemCount / parseInt(page.url.searchParams.get('itemsPerPage') ?? '10')),
		itemsPerPage: parseInt(page.url.searchParams.get('itemsPerPage') ?? '10')
	});
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
	<DataListFooter {setPage} {setPageSize} {paginationStatus} />
</div>

<style>
	.data-list {
		display: grid;
		grid-gap: var(--padding-1);
	}
</style>
