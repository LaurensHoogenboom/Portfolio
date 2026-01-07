<script lang="ts">
	import { Save, X } from "@lucide/svelte";
	import Button from "$siteComponents/atoms/button.svelte";
	import { slide } from "svelte/transition";
	import type { Snippet } from "svelte";

    const { closeCallback, children, saveCallback } : { closeCallback: () => void, children: Snippet, saveCallback?: () => void } = $props(); 
</script>

<div class="portfolio-item-detail" transition:slide>
    <div class="content-wrapper">
        {@render children()}

        <div class="toolbar">
            <Button type="submit" style="secondary" icon={X} onclick={closeCallback} />

            {#if saveCallback}
                <Button type="submit" style="secondary" icon={Save} onclick={saveCallback} />
            {/if}
        </div>
    </div>
</div>

<style>
    .portfolio-item-detail{
        position: fixed;
        background-color: var(--white);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;

        .content-wrapper {
            position: relative;
            padding: var(--spacing-7);
            height: 100vh;
            width: 100%;

            .toolbar {
                position: absolute;
                display: flex;
                flex-direction: column;
                top: var(--spacing-7);
                right: var(--spacing-7);
                transform: translate(50%);
                z-index: 1;
                grid-gap: var(--spacing-3);

                :global(button) {
                    margin-right: 0;
                }
            }

            &:after {
                content: '';
                display: block;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: var(--spacing-7);
                background: var(--primary-background-gradient);
            }
        }
    }
</style>