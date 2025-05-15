<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();
</script>

<style>
    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 400px;
        height: 600px;
        background: none;
        border: none;
    }
</style>

<div class="dialog">
    <div class="box">
        {@render children()}
    </div>
</div>

