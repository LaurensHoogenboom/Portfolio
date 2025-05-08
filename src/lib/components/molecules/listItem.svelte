<script lang="ts">
    import { enhance } from '$app/forms';
    import { fly, slide } from 'svelte/transition';
    
    let { id, title, url, deleteAction, editAction } : {
        id: string,
        title: string,
        url?: string,
        deleteAction?: string,
        editAction?: () => void
    } = $props();
</script>

<style>
    .list-item {
        display: flex;
        grid-gap: 10px;
        width: 100%;
        
        &:not(:last-child) {
            border-bottom: var(--default-border);
            padding-bottom: var(--padding-3);
        }

        a, p {
            width: 100%;
            padding-bottom: 0;
        }

        button {
            width: 50px;
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

    {#if id && editAction}
        <button onclick={editAction}>Edit</button>
    {/if}

    {#if id && deleteAction}
        <form method="post" action={deleteAction} use:enhance>
            <input type="hidden" name="id" value={id}>

            <button type="submit">delete</button>
        </form>
    {/if}
</div>