<script lang="ts">
	import { CircleCheckBig, CircleX, Info } from "@lucide/svelte";
	import { slide } from "svelte/transition";

    const { type, message } : { type: 'success' | 'neutral' | 'fail', message: string } = $props();
</script>

<div class="notice {type}" transition:slide>
    {#if type == 'success'}
        <CircleCheckBig />
    {/if}

    {#if type == 'neutral'}
        <Info />
    {/if}

    {#if type == 'fail'}
        <CircleX />
    {/if}

    <p>{message}</p>
</div>

<style>
    .notice {
        --color: var(--primary-color);
        display: grid;
        grid-template-columns: 35px minmax(0, max-content);
        grid-gap: var(--spacing-3);
        grid-column: 1 / -1;
        border-radius: var(--border-radius-1);
        padding: var(--spacing-2) var(--spacing-4);
        border: 1px solid var(--color);
        align-items: center;
        margin-bottom: var(--spacing-2);
        background-color: hsl(from var(--color) h s 95%);
        justify-content: center;

        p {
            padding-bottom: 1px;
            color: var(--color);
        }

        :global(svg) {
            color: var(--color);
        }

        &.success {
            --color: var(--green);
        }

        &.fail {
            --color: var(--red);
        }
    }
</style>