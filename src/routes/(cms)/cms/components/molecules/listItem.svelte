<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import Button from '$cmsComponents/atoms/button.svelte';
	import { Pencil, TextCursor, Trash2 } from '@lucide/svelte';
	import type { IDataListKeyValuePair } from '$cmsComponents/organisms/dataList.svelte';

	let {
		id,
		displayKeyValuePairs,
		url,
		deleteAction,
		editAction,
		writeAction
	}: {
		id: string;
		displayKeyValuePairs: IDataListKeyValuePair[];
		url?: string;
		deleteAction?: string;
		editAction?: () => void;
		writeAction?: () => void;
	} = $props();
</script>

<div class="list-item" in:fly={{ y: 20 }} out:slide>
	{#each displayKeyValuePairs as dItem}
		{#if url}
			<a href={url}>
				{dItem.value}
			</a>
		{:else}
			<p>{dItem.value}</p>
		{/if}
	{/each}

	{#if (id && editAction) || (id && deleteAction)}
		<div class="actions">
			{#if id && writeAction}
				<Button type="button" style="transparent" icon={TextCursor} onclick={writeAction} />
			{/if}

			{#if id && editAction}
				<Button type="button" style="transparent" icon={Pencil} onclick={editAction} />
			{/if}

			{#if id && deleteAction}
				<form method="post" action={deleteAction} use:enhance>
					<input type="hidden" name="id" value={id} />

					<Button type="submit" style="transparent" icon={Trash2} />
				</form>
			{/if}
		</div>
	{/if}
</div>

<style>
	.list-item {
		display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
		grid-gap: 10px;
		width: 100%;
        align-items: center;

		&:not(:last-child) {
			border-bottom: var(--default-border);
			padding-bottom: var(--padding-4);
		}

		a,
		p {
			width: 100%;
			padding-bottom: 0;
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
