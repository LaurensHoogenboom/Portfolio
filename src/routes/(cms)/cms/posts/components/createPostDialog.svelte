<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$cmsComponents/atoms/button.svelte";
	import Notice from "$cmsComponents/atoms/notice.svelte";
	import LabelInputGroup from "$cmsComponents/molecules/labelInputGroup.svelte";
	import Dialog from "$cmsComponents/organisms/dialog.svelte";

    const { closeCallback, errorMessage } : { closeCallback: () => void, errorMessage?: string } = $props();
</script>

<Dialog title="Add Post" closeCallback={closeCallback}>
    <form method="POST" action="?/create" use:enhance>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}
    
        <LabelInputGroup type="text" name="title" label="Title" max={255} required={true}/>
        <LabelInputGroup type="text" name="slug" label="Slug" max={255} required={true}/>
        <LabelInputGroup type="text" name="tags" label="Tags" max={255} required={true}/>

        <div class="box nested-box form-actions">
            <Button type="button" title="Cancel" style="secondary" onclick={closeCallback} />
            <Button type="submit" title="Add Post" style="primary" />
        </div>
    </form>
</Dialog>