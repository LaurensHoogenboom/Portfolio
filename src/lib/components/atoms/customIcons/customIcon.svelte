<script lang="ts">
    import type { CustomIconName } from "./customIconName";

    const { icon, color, size = 16 } : {
        icon: CustomIconName,
        color: string,
        size?: number
    } = $props();
</script>

<span class="icon-{icon}" style="color: {color}; font-size: {size}px;"></span>