<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();
</script>

<style>
    .pageToolbar {
        --negative-padding: calc(0px - var(--padding-1));
        width: calc(100% + (2 * var(--padding-1)));
        margin: var(--negative-padding) var(--negative-padding) var(--padding-1) var(--negative-padding);

        .page-width-container {
            display: flex;
            justify-content: flex-end;
        }
    }
</style>

<div class="box toolbar integrated pageToolbar">
    <div class="page-width-container">
        {@render children()}
    </div>
</div>