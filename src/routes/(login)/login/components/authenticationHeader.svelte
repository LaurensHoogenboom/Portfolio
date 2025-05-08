<script lang="ts">
	import Button from "$lib/components/atoms/button.svelte";
	import { ChevronLeft } from "@lucide/svelte";
	import type { Snippet } from "svelte";

    const { title, url, children } : { title: string, url?: string, children?: Snippet } = $props()
</script>

<style>
    .authentication-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: var(--padding-2);
    }
</style>

<div class="authentication-header">
    {#if url}
        <Button type="goto" style="transparent" url={url}>
            <ChevronLeft />
            <h1 style="padding: 0 var(--padding-4) 0 var(--padding-4);">{title}</h1>
        </Button>
    {:else}
        <h1 style="padding-bottom: 0;">{title}</h1>
    {/if}

    {#if children}
        {@render children()}
    {/if}
</div>