<script lang="ts">
	import { X } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
	import { fade, scale, slide } from 'svelte/transition';

    let { children, title, closeCallback }: { children: Snippet, title?: string, closeCallback?: () => void } = $props();
</script>

<style>
    .dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 400px;
        height: 600px;
        background: none;
        border: none;
        z-index: 100;

        > .box {
            position: relative;
            flex-direction: column;
            &:after {
                display: block;
                content: '';
                z-index: -1;
                position: absolute;
                top: calc(0px - var(--padding-4));
                bottom: calc(0px - var(--padding-4));
                left: calc(0px - var(--padding-4));
                right: calc(0px - var(--padding-4));
                background-color: rgba(from var(--white-background) r g b / 0.28);
                border-radius: var(--border-radius-l);
            }
        }

        .dialog-title {
            display: grid;
            grid-template-columns: 1fr max-content;
            align-items: center;

            p {
                padding-bottom: 0;
            }
        }
    }

    .backdrop {
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 99;
    }
</style>

<div class="dialog" in:slide={{ duration: 300 }} out:scale={{ duration: 300 }}>
    <div class="box">
        {#if title}
            <div class="box nested-box dialog-title">
                <p><strong>{title}</strong></p>

                {#if closeCallback}
                    <div class="inset">
                        <div class="outset">
                            <X size={20} />
                        </div>
                    </div>
                {/if}
            </div>
        {/if}

        {@render children()}
    </div>    
</div>

<div class="backdrop" transition:fade={{ duration: 300 }}></div>

