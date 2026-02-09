<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import type { IConfigContext, SortState, TableConfig } from '$lib/types/dataList';
	import DataListBody from '$cmsComponents/organisms/dataList/dataListBody.svelte';
	import DataListHeader from '$cmsComponents/organisms/dataList/dataListHeader.svelte';
	import DataListFooter from './dataList/dataListFooter.svelte';
	import { page } from '$app/state';
	import { updatePageParams } from '$lib/utils/updatePageParams';

	interface Props {
		data: T[];
		config: TableConfig<T>;
		itemNamePlural: string;
		totalItemCount: number;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		deleteAction?: string;
		configContext?: IConfigContext;
	}

	const { data, config, itemNamePlural, totalItemCount, editAction, writeAction, deleteAction, configContext }: Props = $props();

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

	const sortState: SortState<T> = $derived({
		key: page.url.searchParams.get('sortBy') as keyof T | null,
		direction: (page.url.searchParams.get('sortDirection') ?? 'asc') as 'asc' | 'desc'
	});

	const toggleSort = (key: keyof T) => {
		const isCurrentKey = key == sortState.key;
		const newDirection = isCurrentKey && sortState.direction == 'asc' ? 'desc' : 'asc';
		isSorting = true;

		updatePageParams(
			{
				sortBy: key as string,
				sortDirection: newDirection
			},
			true
		);
	};

	let isSorting: boolean = $state(false);

	$effect(() => {
		if (data) isSorting = false;
	});
</script>

<div class="data-list">
	{#if data.length}
		<DataListHeader
			{config}
			{sortedKeys}
			{sortState}
			{gridStyle}
			hasActions={editAction || writeAction || deleteAction ? true : false}
			sortCallback={toggleSort}
			{isSorting}
		/>
	{/if}

	<DataListBody {data} {config} {sortedKeys} {gridStyle} {itemNamePlural} {editAction} {writeAction} {deleteAction} {configContext} />

	{#if data.length}
		<DataListFooter {totalItemCount} />
	{/if}
</div>

<style>
	.data-list {
		display: grid;
		grid-gap: var(--padding-1);
	}
</style>
