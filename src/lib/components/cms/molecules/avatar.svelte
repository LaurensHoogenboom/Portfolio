<script lang="ts">
	import { UserRound } from "@lucide/svelte";

    let { size, iconSize } : { size?: number, iconSize?: number } = $props();
</script>

<style>
    .avatar {
        height: 50px;
        aspect-ratio: 1 / 1;
        border-radius: 100%;

        .outset {
            align-items: center;
            justify-content: center;
            border-radius: 100%;
        }
    }
</style>

<div class="inset avatar" style="{size ? `height: ${size}px` : ''}">
    <div class="outset">
        <UserRound size={iconSize ? iconSize : 20}/>
    </div>
</div>