<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableConfig } from '$lib/types/dataList';

	const {
		config,
		sortedKeys,
		gridStyle,
		hasActions
	}: { config: TableConfig<T>; sortedKeys: (keyof T)[]; gridStyle: string; hasActions: boolean } = $props();
</script>

<div class="box data-list-header" style={gridStyle}>
	{#each sortedKeys as key}
		<p>{config[key]?.label}</p>
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
		z-index: 2;

		p {
			padding-bottom: 0;
			font-weight: bold;
		}
	}
</style>
