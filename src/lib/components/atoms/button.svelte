<script lang="ts">
    import { type Component, type Snippet } from 'svelte';
    import { Icon } from '@lucide/svelte'; 
    import { Circle } from 'svelte-loading-spinners';
    import { fly } from 'svelte/transition';

    const { title, type, style, alignment, url, onclick, icon, children, loading = false } : {
        title?: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary" | "transparent",
        alignment?: "default" | "center",
        url?: string,
        onclick?: () => void,
        icon?: Component<Icon>,
        children?: Snippet,
        loading?: boolean
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="clickable-input {style}" href="{url}">
        {@render buttonContent()}
    </a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {style}" type={type} onclick={onclick}>
        {@render buttonContent()}
    </button>
{/if}

{#snippet buttonContent()}
    <div class="button-content {alignment}-alignment {icon ? "has-icon" : ""} {!title ? "only-icon" : ""} {loading ? "hidden" : ""}">
        {#if children}
            {@render children()}
        {:else}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon />
            {/if}
            {#if title}
                <span>
                    {title}
                </span>
            {/if}
        {/if}
    </div>

    {#if loading}
        <div class="button-content loader" transition:fly={{ y: 20 }}>
            <Circle size={20} color="white" />
        </div> 
    {/if}
{/snippet}