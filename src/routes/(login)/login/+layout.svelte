<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<style>
    .authentication {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background: var(--grey-background-gradient);

        .authentication-form-wrapper {
            display: flex;
            flex-direction: column;
            height: calc(100vh - var(--padding-1));
            width: calc(100% - var(--padding-1));
            max-width: 400px;
            max-height: 600px;
            overflow-y: auto;
            border-radius: var(--border-radius-l);
            padding: var(--padding-4);

            .outset {
                border-radius: var(--border-radius-m);
            }
        }
    } 
</style>

<svelte:head>
    <link rel="stylesheet" href="/src/styles/cms/cms.css">
</svelte:head>

<div class="authentication">
    <div class="authentication-form-wrapper inset">
        <div class="box outset">
            {@render children()}
        </div>
    </div>
</div>