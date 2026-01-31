<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$cmsComponents/atoms/button.svelte';
	import Notice from '$cmsComponents/atoms/notice.svelte';
	import LabelInputGroup, { type ISelectOption } from '$cmsComponents/molecules/labelInputGroup.svelte';
	import Dialog from '$cmsComponents/organisms/dialog.svelte';
	import type { UploadFileType } from '$lib/types/uploads';
	import { notifyFormActionSuccess } from '../../shared/globalNotifications.svelte';
	import { uploadSelectOptions } from '../shared/fileTypeSelectOptions';

	const { closeCallback }: { closeCallback: () => void } = $props();

	let saving: boolean = $state(false);
	let errorMessage: string | undefined = $state();
	let fileType: UploadFileType = $state('image');
</script>

<Dialog title="Add Upload" {closeCallback}>
	<form
		method="post"
		action="?/create"
		enctype="multipart/form-data"
		use:enhance={() => {
			saving = true;

			return async ({ update, result }) => {
				await update({ reset: false });
				saving = false;

				if (result.type == 'success') {
					notifyFormActionSuccess('create', result.data?.uploadTitle as string);
					closeCallback();
				} else if (result.type == 'failure') {
					errorMessage = result.data?.error as string;
				}
			};
		}}
	>
		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

		<div class="grid-container columns-2" style="--column-min-width: 300px">
			<div>
				<fieldset>
					<LabelInputGroup type="text" name="title" label="Title" max={120} required />
					<LabelInputGroup type="select" name="type" label="File Type" selectOptions={uploadSelectOptions} required bind:value={fileType} />
					<LabelInputGroup type="textarea" name="description" label="Description" />
				</fieldset>
			</div>
			<div>
				<fieldset>
					{#key fileType}
						<LabelInputGroup type="file" name="file" label="File" acceptFile={fileType == 'image' ? 'image/*' : '.pdf'} required />
					{/key}
				</fieldset>
			</div>
		</div>

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Add" loading={saving} />
		</div>
	</form>
</Dialog>
