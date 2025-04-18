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
        background-color: rgb(250,250,250);

        .authentication-form-wrapper {
            width: 100%;
            max-width: 500px;
            min-height: 300px;
            overflow-y: auto;
        }
    }
</style>

<div class="authentication">
    <div class="authentication-form-wrapper box">
        {@render children()}
    </div>
</div>

