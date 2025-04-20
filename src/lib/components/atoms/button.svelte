<script lang="ts">
    const { title, type, style, url } : {
        title: string,
        type: "submit" | "button" | "goto",
        style: "primary" | "secondary",
        url?: string
    } = $props();
</script>

{#if type == "goto" && url}
    <a class="clickable-input {style}" href="{url}">{title}</a>
{:else if type == "button" || type == "submit"}
    <button class="clickable-input {style}" type={type}>{title}</button>
{/if}

