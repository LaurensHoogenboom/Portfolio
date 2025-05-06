<script lang="ts">
    import type { PageData, ActionData } from '../../cms/posts/$types';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';

    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import ListItem from '$lib/components/molecules/listItem.svelte';
    import Dialog from '$lib/components/organisms/dialog.svelte';
    import Notice from '$lib/components/atoms/notice.svelte';
	import PageToolbar from '$lib/components/organisms/pageToolbar.svelte';
	import Button from '$lib/components/atoms/button.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    let dialog: HTMLDialogElement;

    onMount(() => {
        dialog = document.getElementById('add-dialog') as HTMLDialogElement;
    });
</script>

<PageToolbar>
    <Button title="Add Post" type="button" style="secondary" onclick={() => dialog.showModal()} />
</PageToolbar>

<main>
    <div class="box" style="flex-direction: column;">
        {#each data.posts as post}
            <ListItem title={post.title} id={post.id} url="/cms/posts/{post.slug}" deleteAction="/posts?/delete" />
        {/each}
    </div>
</main>

<Dialog id="add-dialog">
    <form method="POST" action="?/create" use:enhance>
        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}
    
        <LabelInputGroup type="text" name="title" label="Title" max={255} required={true}/>
        <LabelInputGroup type="text" name="slug" label="Slug" max={255} required={true}/>
        <LabelInputGroup type="text" name="tags" label="Tags" max={255} required={true}/>

        <div class="box nested-box">
            <Button type="button" title="Cancel" style="secondary" onclick={() => dialog.close()} />
            <Button type="submit" title="Add Post" style="primary" />
        </div>
    </form>
</Dialog>