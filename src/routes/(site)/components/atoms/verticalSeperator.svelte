<script lang="ts">
    const { zIndex, CSSClass } : { zIndex?: number, CSSClass?: string } = $props();
</script>

<div class="vertical-seperator section-dark gradient {CSSClass}" style="{zIndex ? `z-index: ${zIndex};` : ''}"></div>

<style>
    .vertical-seperator {
        position: relative;
        width: 100%;
        height: calc(var(--spacing-8) + (2 * var(--border-radius-3)));
        margin-top: calc(0px - var(--border-radius-3));
        margin-bottom: calc(0px - var(--border-radius-3));
    }
</style>

