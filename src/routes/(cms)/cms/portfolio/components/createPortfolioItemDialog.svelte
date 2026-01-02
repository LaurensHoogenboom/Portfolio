<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/cms/atoms/button.svelte";
	import Notice from "$lib/components/cms/atoms/notice.svelte";
	import LabelInputGroup from "$lib/components/cms/molecules/labelInputGroup.svelte";
	import Dialog from "$lib/components/cms/organisms/dialog.svelte";
	import { portfolioSelectOptions } from "../shared/portfolioSelectOptions";

    const { closeCallback, errorMessage, createSuccess = false } : { closeCallback: () => void, errorMessage?: string, createSuccess?: boolean } = $props();

    let saving = $state(false);
</script>

<Dialog title="Add Portfolio Item" closeCallback={closeCallback}>
    <form method="post" action="?/create" enctype="multipart/form-data" use:enhance={() => {
        saving = true;

        return async ({ update }) => {
            await update({ reset: false });
            saving = false;
        };
    }}>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}

        <fieldset>
            <LabelInputGroup type="text" name="title" label="Title" max={120} required={true}/>

            <LabelInputGroup type="select" name="type" label="Type" required={true} selectOptions={portfolioSelectOptions}/>

            <LabelInputGroup type="textarea" name="description" label="Description" />
        </fieldset>

        <fieldset>
            <LabelInputGroup type="file" name="image" label="Image" acceptFile="image/*"/>
        </fieldset>

        <div class="box nested-box form-actions">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Add" loading={saving} succes={createSuccess} />
        </div>
    </form>
</Dialog>