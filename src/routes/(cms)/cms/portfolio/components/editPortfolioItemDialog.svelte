<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/cms/atoms/button.svelte';
	import Notice from '$lib/components/cms/atoms/notice.svelte';
	import LabelInputGroup, { type ISelectOption } from '$lib/components/cms/molecules/labelInputGroup.svelte';
	import Dialog from '$lib/components/cms/organisms/dialog.svelte';
	import type { PortfolioItemImage, PortfolioItemType } from '$lib/server/db/types/portfolio';
	import { portfolioSelectOptions } from '../shared/portfolioSelectOptions';

	const {
		closeCallback,
		errorMessage,
		portfolioItemToEdit
	}: { closeCallback: () => void; errorMessage?: string; portfolioItemToEdit: IPortfolioItemToEdit } = $props();

	export interface IPortfolioItemToEdit {
        id: string,
        title: string,
        description: string | null,
        type: PortfolioItemType,
        image: PortfolioItemImage | null
    }
</script>

<Dialog title={`Edit ${portfolioItemToEdit.title}`} {closeCallback}>
	<form method="post" action="?/update" enctype="multipart/form-data" use:enhance={() => {
        return ({ update }) => update({reset : false});
    }}>
		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

        <input type="hidden" name="id" value={portfolioItemToEdit.id}>

		<fieldset>
			<LabelInputGroup type="text" name="title" label="Title" max={120} required={true} value={portfolioItemToEdit.title} />
			<LabelInputGroup type="select" name="type" label="Type" required={true} selectOptions={portfolioSelectOptions} value={portfolioItemToEdit.type} />
			<LabelInputGroup type="textarea" name="description" label="Description" value={portfolioItemToEdit.description} />
		</fieldset>

		<fieldset>
			<LabelInputGroup type="file" name="image" label="Image" acceptFile="image/*" value={portfolioItemToEdit.image ? portfolioItemToEdit.image.thumbnail.url : undefined} />
		</fieldset>

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Save Changes" />
		</div>
	</form>
</Dialog>
