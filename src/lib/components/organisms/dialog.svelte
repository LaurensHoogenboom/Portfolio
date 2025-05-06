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
        background: none;
        border: none;
    }

    dialog::backdrop {
        background-color: rgba(0,0,0, 0.6);
    }
</style>

<dialog {id}>
    <div class="box">
        {@render children()}
    </div>
</dialog>

