<script lang="ts">
    import { type Component, type Snippet } from 'svelte';
    import { Icon } from '@lucide/svelte'; 

    const { title, type, style, alignment, url, onclick, icon, children } : {
        title?: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary" | "transparent",
        alignment?: "default" | "center",
        url?: string,
        onclick?: () => void,
        icon?: Component<Icon>,
        children?: Snippet
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="clickable-input {alignment}-alignment {style} {icon ? "has-icon" : ""}" href="{url}">
        {#if children}
            {@render children()}
        {:else}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon />
            {/if}
            {title}
        {/if}
    </a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {alignment}-alignment {style} {icon ? "has-icon" : ""}" type={type} onclick={onclick}>
        {#if children}
            {@render children()}
        {:else}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon />
            {/if}
            {title}
        {/if}
    </button>
{/if}