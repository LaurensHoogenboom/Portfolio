<script lang="ts">
    import { type Icon as IconType } from "@lucide/svelte";

    const { icon, CSSClass } : { icon: typeof IconType, CSSClass?: string } = $props();
</script>

{#snippet IconComponent()}
    {@const ButtonIcon = icon}
    <ButtonIcon size={65} strokeWidth={1} />
{/snippet}

<div class="icon-square {CSSClass}">
    <IconComponent />
</div>

<style>
    .icon-square {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 130px;
        aspect-ratio: 1 / 1;
        border-radius: var(--border-radius-2);
        box-shadow: var(--primary-shadow);
        border: 1px solid var(--primary-borders);
        color: var(--primary-base);
        background-color: var(--white);
    }
</style>