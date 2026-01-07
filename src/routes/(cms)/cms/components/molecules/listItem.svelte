<script lang="ts">
    import { enhance } from '$app/forms';
    import { fly, slide } from 'svelte/transition';
	import Button from '$cmsComponents/atoms/button.svelte';
	import { Pencil, TextCursor, Trash2 } from '@lucide/svelte';
    
    let { id, title, url, deleteAction, editAction, writeAction } : {
        id: string,
        title: string,
        url?: string,
        deleteAction?: string,
        editAction?: () => void,
        writeAction?: () => void
    } = $props();
</script>

<style>
    .list-item {
        display: flex;
        grid-gap: 10px;
        width: 100%;
        align-items: center;
        
        &:not(:last-child) {
            border-bottom: var(--default-border);
            padding-bottom: var(--padding-4);
        }

        a, p {
            width: 100%;
            padding-bottom: 0;
        }

        .actions {
            display: flex;
            flex-direction: row;
        }
    }
</style>

<div class="list-item" in:fly={{ y: 20 }} out:slide>
    {#if url}
        <a href={url}>
            {title}
        </a>
    {:else}
        <p>{title}</p>
    {/if}

    {#if (id && editAction) || (id && deleteAction)}
        <div class="actions">
            {#if id && writeAction}
                <Button type="button" style="transparent" icon={TextCursor} />
            {/if}

            {#if id && editAction}
                <Button type="button" style="transparent" icon={Pencil} onclick={editAction} />
            {/if}

            {#if id && deleteAction}
                <form method="post" action={deleteAction} use:enhance>
                    <input type="hidden" name="id" value={id}>

                    <Button type="submit" style="transparent" icon={Trash2} />
                </form>
            {/if}
        </div>
    {/if}
</div>