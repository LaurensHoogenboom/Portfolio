<script lang="ts" generics="T extends Record<string, unknown>">
	import Button from '$cmsComponents/atoms/button.svelte';
	import type { SortState, TableConfig } from '$lib/types/dataList';
	import { SortAsc, SortDesc } from '@lucide/svelte';

	const {
		config,
		sortedKeys,
		sortState,
		gridStyle,
		hasActions,
		sortCallback
	}: {
		config: TableConfig<T>;
		sortedKeys: (keyof T)[];
		sortState: SortState<T>;
		gridStyle: string;
		hasActions: boolean;
		sortCallback: (key: keyof T) => void;
	} = $props();
</script>

<div class="box data-list-header" style={gridStyle}>
	{#each sortedKeys as key}
		{#if config[key]?.sortable}
			<Button
				type="button"
				style="transparent"
				icon={sortState.key == key ? (sortState.direction == 'asc' ? SortAsc : SortDesc) : undefined}
				title={config[key]?.label}
				onclick={() => sortCallback(key)}
				iconPosition="left"
			/>
		{:else}
			<p>{config[key]?.label}</p>
		{/if}
	{/each}

	{#if hasActions}
		<div></div>
	{/if}
</div>

<style>
	.data-list-header {
		display: grid;
		position: sticky;
		top: var(--padding-1);
		z-index: 3;
		padding: var(--padding-4) var(--padding-3);
		align-items: center;
		grid-gap: var(--padding-2);

		p {
			padding-bottom: 0;
			font-weight: bold;
		}

		:global(button) {
			margin-left: calc(0px - var(--padding-5));

			:global(span) {
				font-weight: bold;
			}
		}
	}
</style>
