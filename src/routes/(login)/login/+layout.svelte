<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
	import CustomIcon from '$lib/components/cms/atoms/customIcons/customIcon.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="/src/styles/cms/cms.css">
</svelte:head>

<div class="authentication">
    <div class="ornament">
        <CustomIcon icon="feather" color="var(--grey-background-2)" size="120vh" />
    </div>

    <div class="authentication-center">
        <div class="authentication-form-wrapper inset">
            <div class="box outset">
                {@render children()}
            </div>
        </div>

        <p>Copyright &copy; {new Date().getFullYear()} Laureato</p>
    </div>
</div>

<style>
    .authentication {
        display: flex;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background: var(--grey-background-gradient);

        .ornament {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            z-index: 0;
        }

        .authentication-center {
            display: grid;
            grid-template-rows: 1fr max-content;
            align-items: center;
            height: 100%;
            width: 100%;
            max-width: 480px;
            padding: var(--padding-1);
            grid-gap: var(--padding-1);
            z-index: 1;

            .authentication-form-wrapper {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                max-height: 650px;
                overflow-y: auto;
                border-radius: var(--border-radius-l);
                padding: var(--padding-4);

                .outset {
                    border-radius: var(--border-radius-m);
                    overflow-y: auto;
                }
            }

            p {
                text-align: center;
                padding-bottom: 0;
            }
        }
    } 
</style>