<script lang="ts">
    import type { PageData, ActionData } from '../../cms/posts/$types';
    import ListItem from '$cmsComponents/molecules/listItem.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import CreatePostDialog from './components/createPostDialog.svelte';
	import { Plus } from '@lucide/svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import { isFormActionType, notifyFormActionSuccess } from '../shared/globalNotifications.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();
    let createFormVisible = $state(false);

    $effect(() => {
        if (form?.succes && isFormActionType(form.action) && form.postTitle) {
            notifyFormActionSuccess(form.action, form.postTitle)
            createFormVisible = false;
            form = undefined;
        }
    });
</script>

<PageToolbar>
    <Button title="Add Post" type="button" style="secondary" onclick={() => createFormVisible = true} icon={Plus} />
</PageToolbar>

<main>
    <DataList itemNamePlural="Posts" itemCount={data.posts.length}>
        {#each data.posts as post}
            <ListItem title={post.title} id={post.id} url="/cms/posts/{post.slug}" deleteAction="/cms/posts?/delete" />
        {/each}
    </DataList>
</main>

{#if createFormVisible}
    <CreatePostDialog closeCallback={() => createFormVisible = false} errorMessage={form?.error} />
{/if}