<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, action, title, columnCount }: { children: Snippet; title: string; action?: () => void; columnCount?: number } = $props();
</script>

<div class="box dashboard-box span-{columnCount}">
	<div class="header">
		<h3>{title}</h3>
        <hr/>
	</div>

	{@render children()}
</div>

<style>
	.dashboard-box {
		display: grid;
        grid-auto-flow: row;
		grid-gap: var(--padding-2);
        align-items: start;
        align-self: flex-start;
        grid-auto-rows: max-content;

        .header {
            display: grid;
            grid-template-columns: max-content 1fr;
            align-items: center;
            grid-gap: var(--padding-3);
        }
	}
</style>