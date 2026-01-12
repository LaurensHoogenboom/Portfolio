<script lang="ts">
    import { CircleCheck, Info, TriangleAlert } from '@lucide/svelte';
    import { fly, slide } from 'svelte/transition';

    let { message, type } : { 
        message: string,
        type: "warning" | "success" | "neutral"
    } = $props();
</script>

<style>
    .notice {
        --color: blue;
        display: grid;
        grid-template-columns: max-content minmax(0, 1fr);
        grid-gap: var(--padding-4);
        border: 1px solid var(--color);
        border-radius: 5px;
        background-color: rgba(from var(--color) r g b / 0.2);
        margin-bottom: 15px;
        padding: var(--padding-4) var(--padding-3);
        align-items: center;

        .icon-wrapper :global(svg) {
            color: var(--color);
            height: 20px;
        }

        p {
            color: var(--color);
            padding-bottom: 2px;
        }

        &.warning {
            --color: var(--red);
        }

        &.success {
            --color: var(--green);
        }

        &.neutral {
            --color: var(--blue);
        }
    }  
</style>

<div class="notice {type}" in:fly={{ y: 20 }} out:slide>
    <div class="icon-wrapper"> 
        {#if type == "warning"}
            <TriangleAlert />
        {:else if type == "success"}
            <CircleCheck />
        {:else if type == "neutral"}
            <Info />
        {/if}
    </div>

    <p>{message}</p>
</div>