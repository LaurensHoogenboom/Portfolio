<script lang="ts">
    const { title, type, style, url, onclick } : {
        title: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary",
        url?: string,
        onclick?: () => void
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="clickable-input {style}" href="{url}">{title}</a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {style}" type={type} onclick={onclick}>{title}</button>
{/if}

