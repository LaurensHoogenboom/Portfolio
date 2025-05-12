<script lang="ts">
    import { type Component, type Snippet } from 'svelte';
    import { Icon } from '@lucide/svelte'; 

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
    <a class="clickable-input {alignment}-alignment {style} {icon ? "has-icon" : ""}" href="{url}">
        {@render buttonContent()}
    </a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {alignment}-alignment {style} {icon ? "has-icon" : ""}" type={type} onclick={onclick}>
        {@render buttonContent()}
    </button>
{/if}

{#snippet buttonContent()}
    {#if loading}
        <p>Loading...</p>
    {:else}
        {#if children}
            {@render children()}
        {:else}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon />
            {/if}
            {title}
        {/if}
    {/if}
{/snippet}