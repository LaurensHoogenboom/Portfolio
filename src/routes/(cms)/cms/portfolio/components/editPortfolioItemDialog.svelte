<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$cmsComponents/atoms/button.svelte';
	import Notice from '$cmsComponents/atoms/notice.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import Dialog from '$cmsComponents/organisms/dialog.svelte';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import type { IUploadedImage } from '$lib/types/uploads';
	import { portfolioSelectOptions } from '../shared/portfolioSelectOptions';

	const {
		closeCallback,
		errorMessage,
		portfolioItemToEdit,
		editSuccess
	}: { closeCallback: () => void; errorMessage?: string; portfolioItemToEdit: IPortfolioItemToEdit; editSuccess?: boolean } = $props();

	export interface IPortfolioItemToEdit {
		id: string;
		title: string;
		description: string | null;
		type: PortfolioItemType;
		image: IUploadedImage | null;
		visiblePriority: number;
	}

	let saving = $state(false);
	let portfolioItemType = $state(portfolioItemToEdit.type);
</script>

<Dialog title={`Edit ${portfolioItemToEdit.title}`} {closeCallback}>
	<form
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		use:enhance={() => {
			saving = true;

			return async ({ update }) => {
				await update({ reset: false });
				saving = false;
			};
		}}
	>
		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

		<input type="hidden" name="id" value={portfolioItemToEdit.id} />

		<div class="grid-container columns-2">
			<div>
				<fieldset>
					<LabelInputGroup type="text" name="title" label="Title" max={120} required={true} value={portfolioItemToEdit.title} />
					<LabelInputGroup
						type="select"
						name="type"
						label="Type"
						required={true}
						selectOptions={portfolioSelectOptions}
						bind:value={portfolioItemType}
					/>

					{#if portfolioItemType != 'art'}
						<LabelInputGroup type="textarea" name="description" label="Header Description" value={portfolioItemToEdit.description} />
					{/if}
				</fieldset>

				<fieldset>
					<LabelInputGroup
						type="number"
						name="visiblePriority"
						label="Visibility Priority"
						min={0}
						value={portfolioItemToEdit.visiblePriority}
						instruction="Items with a higher visible priority are shown first."
						required
					/>
				</fieldset>
			</div>

			<div>
				<fieldset>
					<LabelInputGroup
						type="file"
						name="image"
						label="Header Image"
						acceptFile="image/*"
						value={portfolioItemToEdit.image ? portfolioItemToEdit.image.thumbnail.url : undefined}
						required
					/>
				</fieldset>
			</div>
		</div>

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Save Changes" loading={saving} succes={editSuccess} />
		</div>
	</form>
</Dialog>
