<script lang="ts">
	import { InfoIcon } from '@lucide/svelte';

	const { message, type = 'neutral' }: { message: string; type?: 'neutral' | 'warning' } = $props();
</script>

<p class="instruction {type}" style="">
	<InfoIcon size={20} />
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