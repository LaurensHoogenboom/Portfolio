<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="box toolbar integrated pageToolbar">
	<div class="page-width-container">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	.pageToolbar {
		--negative-padding: calc(0px - var(--padding-1));
		width: calc(100% + (2 * var(--padding-1)));
		margin: var(--negative-padding) var(--negative-padding) var(--padding-1) var(--negative-padding);
		padding-left: var(--padding-1);
		padding-right: var(--padding-1);
		position: sticky;
		top: calc(0px - var(--padding-1));
		z-index: 3;

		.page-width-container {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>