<script lang="ts">
	import { InfoIcon } from "@lucide/svelte";

    const { message } : { message: string } = $props();
</script>

<style>
    .instruction {
        display: inline-flex;
        align-items: start;
        color: var(--grey-text-1); 
        margin-bottom: var(--padding-4);
        grid-gap: var(--padding-4);
    }
</style>

<p class="instruction" style="">
    <InfoIcon size={20} />
    <span>{message}</span>
</p>