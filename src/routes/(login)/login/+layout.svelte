<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<style>
    @layer layouts {
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
                width: 100%;
                max-width: 500px;
                min-height: 300px;
                overflow-y: auto;
            }
        }
    }  
</style>

<svelte:head>
    <link rel="stylesheet" href="/src/styles/cms/cms.css">
</svelte:head>

<div class="authentication">
    <div class="authentication-form-wrapper box">
        {@render children()}
    </div>
</div>

