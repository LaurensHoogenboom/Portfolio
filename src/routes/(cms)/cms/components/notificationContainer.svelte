<script lang="ts">
	import { CircleCheck, InfoIcon, TriangleAlert } from "@lucide/svelte";
    import { GlobalNotifications } from "$lib/globalNotifications.svelte";
	import { fly, slide } from "svelte/transition";

    $effect(() => {
        GlobalNotifications.notifications.forEach(n => {
            if (n.visible !== false) {
                setTimeout(() => {
                    n.visible = false;
                }, n.duration ?? 3000);
            }
        });
    });
</script>

<div class="notification-container">
    {#each GlobalNotifications.notifications as n }
        {#if n.visible !== false}
            <div class="notification frost-glass white {n.type ? n.type : null}" in:fly|global={{ y: 20, delay: 300 }} out:slide|global>
                <div class="icon-container">
                    {#if n.type == "information"}
                        <InfoIcon />
                    {:else if n.type == "warning"}
                        <TriangleAlert />
                    {:else}
                        <CircleCheck />
                    {/if}
                </div>
                <p><strong>{n.title}</strong></p>
                <p>{n.message}</p>
            </div>
        {/if}
    {/each}
</div>

<style>
    .notification-container {
        top: 100%;
        right: 0;
        position: absolute;
        z-index: 3;
        padding-top: var(--padding-4);

        .notification {
            --notification-color: var(--blue);
            display: grid;
            grid-template-columns: 50px minmax(0, 1fr);
            min-width: 300px;
            border: var(--default-border);
            border-color: var(--notification-color);
            padding: var(--padding-5) var(--padding-1) var(--padding-5) var(--padding-5);
            border-radius: var(--border-radius-m);
            grid-column-gap: var(--padding-3);
            grid-row-gap: 3px;
            align-items: center;
            box-shadow: var(--shadow-float-2);
            margin-bottom: var(--padding-4);

            &.information {
                --notification-color: var(--blue);
            }

            &.warning {
                --notification-color: var(--red);
            }

            &.succes {
                --notification-color: var(--green);
            }

            .icon-container {
                display: flex;
                justify-content: center;
                align-items: center;
                grid-row: 1 / 3;
                grid-column: 1 / 2;
                min-height: 50px;
                height: 100%;
                background-color: var(--notification-color);
                border-radius: var(--border-radius-s);

                :global(svg) {
                    color: var(--white-text);
                }
            }

            p {
                padding-bottom: 0;

                &:first-of-type {
                    align-self: flex-end;
                }

                &:last-of-type {
                    align-self: flex-start;
                }
            }
        }
    }
</style>