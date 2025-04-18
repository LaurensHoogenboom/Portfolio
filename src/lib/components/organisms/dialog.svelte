<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children, id }: { children: Snippet, id: string } = $props();
</script>

<style>
    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 300px;
        height: 600px;
        padding: 20px;
        border-radius: 10px;
    }

    dialog::backdrop {
        background-color: rgba(0,0,0, 0.6);
    }
</style>

<dialog {id}>
    {@render children()}
</dialog>

