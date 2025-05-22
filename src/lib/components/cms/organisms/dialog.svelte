<script lang="ts">
	import { X } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import Button from '../atoms/button.svelte';

    let { children, title, closeCallback }: { children: Snippet, title?: string, closeCallback?: () => void } = $props();

    let transitioning = $state(true);
</script>

<div 
    class="dialog" 
    in:slide={{ duration: 300 }} 
    out:scale={{ duration: 300 }}
    ontransitionend={() => transitioning = false}
>
    <div class="box">
        {#if title}
            <div class="box nested-box dialog-title">
                <p><strong>{title}</strong></p>

                {#if closeCallback}
                    <Button icon={X} type="button" style="inset-outset" onclick={closeCallback} />
                {/if}
            </div>
        {/if}

        <div class={["dialog-content", {transitioning}]}>
            {@render children()}
        </div>
    </div>    
</div>

<div class="backdrop frost-glass" transition:fade={{ duration: 300 }}></div>

