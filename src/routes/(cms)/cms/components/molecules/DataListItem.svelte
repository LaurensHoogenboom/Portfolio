<script lang="ts" generics="T extends { id: string }">
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import Button from '$cmsComponents/atoms/button.svelte';
	import { Pencil, TextCursor, Trash2 } from '@lucide/svelte';
	import type { TableConfig, UIColumn } from '$lib/types/dataList';
	import { dispatchWarningNotification, notifyFormActionSuccess } from '../../shared/globalNotifications.svelte';

	interface Props {
		row: T;
		config: TableConfig<T>;
		sortedKeys: Array<keyof T>;
		gridStyle: string;
		deleteAction?: string;
		editAction?: (id: string) => void;
		writeAction?: (id: string) => void;
	}

	let { row, config, sortedKeys, gridStyle, deleteAction, editAction, writeAction }: Props = $props();
	let saving = $state(false);
</script>

<div class="list-item" style={gridStyle} in:fly={{ y: 20 }} out:slide>
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

			{#if deleteAction && (config.renderActions?.(row).showDelete ?? true)}
				<form
					method="post"
					action={deleteAction}
					use:enhance={() => {
						saving = true;

						return async ({ update, result }) => {
							await update({ reset: false });
							saving = false;

							if (result.type == 'success') {
								notifyFormActionSuccess('delete', result.data?.itemName as string);
							} else if (result.type == 'failure') {
								dispatchWarningNotification(result.data?.error as string);
							}
						};
					}}
				>
					<input type="hidden" name="id" value={row.id} />
					<Button type="submit" style="transparent" icon={Trash2} loading={saving} />
				</form>
			{/if}
		</div>
	{/if}
</div>

<style>
	.list-item {
		display: grid;
		width: 100%;
		align-items: center;
		min-height: 40px;
		grid-gap: var(--padding-2);

		&:not(:last-child) {
			border-bottom: var(--default-border);
			padding-bottom: var(--padding-4);
		}

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

			form {
				flex-grow: initial;
			}
		}
	}
</style>
