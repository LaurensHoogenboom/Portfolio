<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';

    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
	import PageToolbar from '$lib/components/organisms/pageToolbar.svelte';
	import Button from '$lib/components/atoms/button.svelte';
	import { Save } from '@lucide/svelte';
	import { DispatchErrorNotification, DispatchSuccesNotification } from '$lib/globalNotifications.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    $effect(() => {
        if (form?.succes) {
            DispatchSuccesNotification(`Changes were succesfully saved.`);
            form = undefined;
        }

        if (form?.error) {
            DispatchErrorNotification(form.error);
            form = undefined;
        }
    });
</script>

<PageToolbar>
    <Button title="Save Post" type="submit" style="secondary" icon={Save} form="postForm" />
</PageToolbar>

<main>
    <div class="box">
        <form id="postForm" method="POST" action="?/update" use:enhance={() => {
            return ({ update }) => update({ reset: false });
        }}>        
            <input type="hidden" name="id" value={data.post ? data.post.id : ""}>
        
            <LabelInputGroup type="text" name="title" label="Title" max={255} value={data.post ? data.post.title : ""} />
            <LabelInputGroup type="textarea" name="body" label="Body" value={data.post ? data.post.body : ""}/>
            <LabelInputGroup type="text" name="tags" label="Tags" max={255} value={data.post ? data.post.tags?.toString() : ""} />
        </form>
    </div>    
</main>