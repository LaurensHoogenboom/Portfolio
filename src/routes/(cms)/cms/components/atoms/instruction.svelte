<script lang="ts">
	import { InfoIcon, TriangleAlert } from '@lucide/svelte';
	import { fly, slide } from 'svelte/transition';

	const { message, type = 'neutral' }: { message: string; type?: 'neutral' | 'warning' } = $props();
</script>

<p class="instruction {type}" style="" in:fly={{ y: -20 }} out:slide>
	{#if type == 'warning'}
		<TriangleAlert size={20} />
	{:else}
		<InfoIcon size={20} />
	{/if}

	<span>{message}</span>
</p>

<style>
	.instruction {
		display: inline-flex;
		align-items: start;
		color: var(--grey-text-1);
		margin-bottom: var(--padding-4);
		grid-gap: var(--padding-4);

		&.warning {
			color: var(--red);

            :global(svg) {
                color: var(--red);
            }
		}
	}
</style>