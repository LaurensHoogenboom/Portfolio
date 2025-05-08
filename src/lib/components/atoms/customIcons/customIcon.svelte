<script lang="ts">
    import type { CustomIconName } from "./customIconName";

    const { icon, color = "var(--grey-text-2)", size = 16 } : {
        icon: CustomIconName,
        color?: string,
        size?: number | string
    } = $props();
</script>

<span class="icon-{icon}" style="color: {color}; font-size: {typeof size == "string" ? size : `${size}px`};"></span>