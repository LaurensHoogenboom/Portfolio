<script lang="ts">
    import type { PageData, ActionData } from '../../cms/posts/$types';
    import ListItem from '$cmsComponents/molecules/listItem.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import CreatePostDialog from './components/createPostDialog.svelte';
	import { Plus } from '@lucide/svelte';
	import { DispatchSuccesNotification } from '../shared/globalNotifications.svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();
    let createPostDialogVisible = $state(false);

    $effect(() => {
        if (form?.succes) {
            switch (form.action) {
                case 'create':
                    createPostDialogVisible = false;
                    DispatchSuccesNotification(`The post "${form.postTitle}" was succesfully added.`)
                    break;
                case 'delete':
                    DispatchSuccesNotification(`The post "${form.postTitle}" was successfully removed.`);
                    break;
                default: 
                    break;
            }

            form = undefined;
        }
    });
</script>

<PageToolbar>
    <Button title="Add Post" type="button" style="secondary" onclick={() => createPostDialogVisible = true} icon={Plus} />
</PageToolbar>

<main>
    <DataList itemNamePlural="Posts" itemCount={data.posts.length}>
        {#each data.posts as post}
            <ListItem title={post.title} id={post.id} url="/cms/posts/{post.slug}" deleteAction="/cms/posts?/delete" />
        {/each}
    </DataList>
</main>

{#if createPostDialogVisible}
    <CreatePostDialog closeCallback={() => createPostDialogVisible = false} errorMessage={form?.error} />
{/if}