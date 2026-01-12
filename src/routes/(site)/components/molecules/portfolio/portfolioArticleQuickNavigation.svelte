<script lang="ts">
	import Button from "$siteComponents/atoms/button.svelte";
	import { onMount } from "svelte";

    export interface IQuickNavigatioItem {
        title: string,
        id: string
    }

	const { navigationItems }: { navigationItems: IQuickNavigatioItem[] } = $props();

    let quickArticleNavigation: HTMLElement | undefined = $state();
    let overflowContainer: HTMLElement | undefined = $state();

    onMount(() => {
        if (!quickArticleNavigation) return;

        overflowContainer = quickArticleNavigation.closest('.overflow-container') as HTMLElement ?? undefined;
    });
</script>

<div class="quick-article-navigation" bind:this={quickArticleNavigation}>
    {#each navigationItems as nItem}
        {#key overflowContainer}
            <Button type="goto" title={nItem.title} href="#{nItem.id}" style="inline" scrollContainer={overflowContainer}/>
        {/key}
    {/each}
</div>

<style>
    .quick-article-navigation {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        margin-top: var(--spacing-6);
        background-color: var(--grey-inset-background-light);
        border: 1px solid var(--grey-borders);
        border-radius: var(--border-radius-1);

        :global(.button) {
            height: 60px;
            padding: 0 var(--spacing-3);
            border: none;

            @media (hover:hover) {
                &:hover {
                    background-color: var(--grey-inset-background);
                    opacity: 1;
                }
            }
        }
    }
</style>
