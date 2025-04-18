<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';

    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import Notice from '$lib/components/atoms/notice.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();
</script>

<form method="POST" action="?/update" use:enhance={() => {
    return ({ update }) => update({ reset: false });
}}>
    {#if form?.error}
        <Notice message={form.error} type="warning" />
    {/if}

    {#if form?.succes}
        <Notice message="Changes are succesfully saved." type="success" />
    {/if}

    <input type="hidden" name="id" value={data.post ? data.post.id : ""}>

    <LabelInputGroup type="text" name="title" label="Title" max={255} value={data.post ? data.post.title : ""} />
    <LabelInputGroup type="textarea" name="body" label="Body" value={data.post ? data.post.body : ""}/>
    <LabelInputGroup type="text" name="tags" label="Tags" max={255} value={data.post ? data.post.tags?.toString() : ""} />

    <button type="submit">Save Post</button>
</form>