<script lang="ts">
	import type { Snippet } from "svelte";

    const { children, itemNamePlural, itemCount } : { children: Snippet, itemNamePlural: string, itemCount: number } = $props();

    export interface IDataListKeyValuePair {
        key: string,
        value: string,
        sortByCallback?: (key: string) => void
    }
</script>

<div class="box" style="flex-direction: column;">
    {#if itemCount}
        {@render children()}
    {:else}
        <p style="text-align: center; color: var(--grey-text-1);">No {itemNamePlural}</p>
    {/if}
</div>