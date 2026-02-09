<script lang="ts" generics="T extends { id: string }">
	import { fade, fly } from 'svelte/transition';
	import Button from '$cmsComponents/atoms/button.svelte';
	import { Pencil, TextCursor, Trash2 } from '@lucide/svelte';
	import type { IConfigContext, TableConfig, UIColumn } from '$lib/types/dataList';
	import DeleteConfirmationDialog from '$cmsComponents/templates/deleteConfirmationDialog.svelte';

	interface Props {
		row: T;
		config: TableConfig<T>;
		sortedKeys: Array<keyof T>;
		gridStyle: string;
		deleteAction?: string;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
		configContext?: IConfigContext
	}

	let { row, config, sortedKeys, gridStyle, deleteAction, editAction, writeAction, configContext }: Props = $props();

	let deleteConfirmationDialogVisible = $state(false);
</script>

<div class="list-item" style={gridStyle} in:fly|local={{ y: 20, duration: 200, delay: 100 }} out:fade|local={{ duration: 200 }}>
	{#each sortedKeys as key}
		{@const column = config[key] as UIColumn<any> | undefined}
		{@const value = column?.format ? column.format(row[key]) : row[key]}

		<p>{@html value}</p>
	{/each}

	{#if writeAction || editAction || deleteAction}
		<div class="actions">
			{#if writeAction && (config.renderActions?.(row).showWrite ?? true)}
				<Button type="button" style="transparent" icon={TextCursor} onclick={() => writeAction(row.id)} />
			{/if}

			{#if editAction}
				<Button type="button" style="transparent" icon={Pencil} onclick={() => editAction(row.id)} />
			{/if}

			{#if deleteAction && (config.renderActions?.(row, configContext).showDelete ?? true)}
				<Button type="submit" style="transparent" icon={Trash2} onclick={() => (deleteConfirmationDialogVisible = true)} />
			{/if}
		</div>
	{/if}
</div>

{#if deleteConfirmationDialogVisible && deleteAction}
	{@const label = config.getLabel ? config.getLabel(row) : (row as any).title as string || undefined}

	<DeleteConfirmationDialog
		action={deleteAction}
		closeCallback={() => (deleteConfirmationDialogVisible = false)}
		itemId={row.id}
		itemTitle={label}
	/>
{/if}

<style>
	.list-item {
		display: grid;
		width: 100%;
		align-items: center;
		min-height: 30px;
		grid-gap: var(--padding-2);

		p {
			width: 100%;
			padding-bottom: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.actions {
			display: inline-flex;
			grid-auto-flow: column;
			flex-direction: row;
			justify-content: end;
		}
	}
</style>
