<script lang="ts">
	import type { Snippet } from "svelte";

    const { children } : { children: Snippet } = $props();
</script>

<div class="button-link-group">
    {@render children()}
</div>

<style>
    .button-link-group {
        display: flex;
        align-items: center;

        :global(a) {
            text-decoration: none;

            @media (hover:hover) {
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        @media (hover: hover) {
            :global(&:has(.button:hover) a) {
                color: var(--primary-base);
                text-decoration: underline;
            }

            :global(&:has(a:hover) .button.secondary) {
                background-color: var(--primary-base);
                color: var(--white);
            }
        }
    }
</style>