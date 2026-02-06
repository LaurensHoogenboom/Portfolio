<script lang="ts" generics="T extends { id: string } & Record<string, unknown>">
	import DataListItem from '$cmsComponents/organisms/dataList/dataListItem.svelte';
	import type { IConfigContext, TableConfig } from '$lib/types/dataList';
	import { flip } from 'svelte/animate';
	import { navigating } from '$app/state';
	import { Circle } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';

	interface Props {
		data: T[];
		config: TableConfig<T>;
		sortedKeys: (keyof T)[];
		gridStyle: string;
		itemNamePlural: string;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		deleteAction?: string;
		configContext?: IConfigContext;
	}

	const { data, config, sortedKeys, gridStyle, itemNamePlural, editAction, writeAction, deleteAction, configContext }: Props = $props();
</script>

<div class="box list-body" style="flex-direction: column;">
	{#if navigating.to}
		<div class="loading-box" transition:fade></div>
	{/if}

	{#if data.length > 0}
		{#each data as row (row.id)}
			<div class="list-item-wrapper" animate:flip={{ duration: 400 }}>
				<DataListItem {row} {config} {sortedKeys} {gridStyle} {editAction} {writeAction} {deleteAction} {configContext} />
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
		position: relative;
	}

	.list-item-wrapper:not(:last-child) {
		border-bottom: var(--default-border);
		padding-bottom: var(--padding-4);
	}

	.loading-box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgb(from var(--white-background) r g b / 0.8);
		z-index: 2;
	}
</style>
