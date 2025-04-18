<script lang="ts">
    import { fly, slide } from 'svelte/transition';

    let { message, type } : { 
        message: string,
        type: "warning" | "success" | "neutral"
    } = $props();
</script>

<style>
    .notice {
        --color: blue;
        padding: 10px;
        border: 1px solid var(--color);
        border-radius: 5px;
        color: var(--color);
        background-color: rgba(var(--color), 0.2);
        margin-bottom: 15px;

        &.warning {
            --color: red;
        }

        &.success {
            --color: green;
        }

        &.neutral {
            --color: blue;
        }
    }
</style>

<div class="notice {type}" in:fly={{ y: 20 }} out:slide>
    <p>{message}</p>
</div>