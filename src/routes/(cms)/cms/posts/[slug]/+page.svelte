<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
    import LabelInputGroup from '$lib/components/cms/molecules/labelInputGroup.svelte';
	import PageToolbar from '$lib/components/cms/organisms/pageToolbar.svelte';
	import Button from '$lib/components/cms/atoms/button.svelte';
	import { Save } from '@lucide/svelte';
	import { DispatchWarningNotification } from '$lib/globalNotifications.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    let saving = $state(false);
    let succes = $state(false);

    $effect(() => {
        if (form?.error) {
            DispatchWarningNotification(form.error);
            form = undefined;
        }

        if (succes) {
            setTimeout(() => {
                succes = false;
                form = undefined;
            }, 2000);
        }
    });
</script>

<PageToolbar>
    <Button title="Save Post" type="submit" style="secondary" icon={Save} form="postForm" loading={saving} succes={succes} />
</PageToolbar>

<main>
    <div class="box">
        <form id="postForm" method="POST" action="?/update" use:enhance={() => {
            succes = false;
            saving = true;

            return async ({ update }) => {
                await update({ reset: false })

                setTimeout(() => {
                    saving = false;

                    if (form?.succes) {
                        succes = true;
                    }
                }, 500);
            };
        }}>        
            <input type="hidden" name="id" value={data.post ? data.post.id : ""}>
        
            <LabelInputGroup type="text" name="title" label="Title" max={255} value={data.post ? data.post.title : ""} />
            <LabelInputGroup type="textarea" name="body" label="Body" value={data.post ? data.post.body : ""}/>
            <LabelInputGroup type="text" name="tags" label="Tags" max={255} value={data.post ? data.post.tags?.toString() : ""} />
        </form>
    </div>    
</main>