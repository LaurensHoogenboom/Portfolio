<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import CreateDialog from '$cmsComponents/templates/createDialog.svelte';
	import type { UploadFileType } from '$lib/types/uploads';
	import { uploadSelectOptions } from '../shared/fileTypeSelectOptions';

	const { closeCallback }: { closeCallback: () => void } = $props();

	let fileType: UploadFileType = $state('image');
</script>

<CreateDialog itemName="Upload" itemTitleKey="uploadTitle" {closeCallback}>
	<div class="grid-container columns-2" style="--column-min-width: 300px">
		<div>
			<fieldset>
				<LabelInputGroup type="text" name="title" label="Title" max={120} required />
				<LabelInputGroup type="textarea" name="description" label="Description" />
			</fieldset>
		</div>
		<div>
			<fieldset>
				{#key fileType}
					<LabelInputGroup type="select" name="type" label="File Type" selectOptions={uploadSelectOptions} required bind:value={fileType} />
					<LabelInputGroup type="file" name="file" label="File" acceptFile={fileType == 'image' ? 'image/*' : '.pdf'} required />
				{/key}
			</fieldset>
		</div>
	</div>
</CreateDialog>
