<script lang="ts">
    import { type Component } from 'svelte';
    import { Icon } from '@lucide/svelte'; 

    const { title, type, style, url, onclick, icon } : {
        title: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary" | "transparent",
        url?: string,
        onclick?: () => void,
        icon?: Component<Icon>
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="clickable-input {style} {icon ? "has-icon" : ""}" href="{url}">
        {title}
        {#if icon}
            {@const ButtonIcon = icon}
            <ButtonIcon />
        {/if}
    </a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {style} {icon ? "has-icon" : ""}" type={type} onclick={onclick}>
        {title}
        {#if icon}
            {@const ButtonIcon = icon}
            <ButtonIcon />
        {/if}
    </button>
{/if}