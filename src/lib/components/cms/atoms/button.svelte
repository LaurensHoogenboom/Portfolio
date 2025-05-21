<script lang="ts">
    import { type Snippet } from 'svelte';
    import { type Icon as IconType } from '@lucide/svelte'; 
    import { Circle } from 'svelte-loading-spinners';
    import { fly } from 'svelte/transition';

    const { title, type, style, alignment, url, onclick, icon, children, loading = false, form } : {
        title?: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary" | "transparent" | "inset-outset",
        alignment?: "default" | "center",
        url?: string,
        onclick?: () => void,
        icon?: typeof IconType,
        children?: Snippet,
        loading?: boolean,
        form?: string
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="{style == "inset-outset" ? "inset round" : `clickable-input ${style}`}" href="{url}">
        {#if style=="inset-outset"}
            <div class="outset">
                {@render buttonContent()}
            </div>
        {:else}
            {@render buttonContent()}
        {/if}
    </a>
{:else if type == "button" || type == "submit"}
    <button class="{style == "inset-outset" ? "inset round" : `clickable-input ${style}`}" type={type} onclick={onclick} form={form}>
        {#if style=="inset-outset"}
            <div class="outset">
                {@render buttonContent()}
            </div>
        {:else}
            {@render buttonContent()}
        {/if}
    </button>
{/if}

{#snippet buttonContent()}
    <div class="button-content {alignment}-alignment {icon ? "has-icon" : ""} {!title ? "only-icon" : ""} {loading ? "hidden" : ""}">
        {#if children}
            {@render children()}
        {:else}
            {#if title}
                <span>
                    {title}
                </span>
            {/if}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon size={16} />
            {/if}
        {/if}
    </div>

    {#if loading}
        <div class="button-content loader" transition:fly={{ y: 20 }}>
            <Circle size={20} color="white" />
        </div> 
    {/if}
{/snippet}