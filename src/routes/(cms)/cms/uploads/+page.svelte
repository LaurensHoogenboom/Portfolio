<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { uploadsTableUIConfig } from '$lib/configs/uploads';
	import CreateUploadDialog from './components/createUploadDialog.svelte';
	import { uploadSelectOptions } from './shared/fileTypeSelectOptions';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { updatePageParams } from '$lib/utils/updatePageParams';
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import { globalUIState } from '../shared/states/globalUIState.svelte';

	let { data }: { data: PageData } = $props();

	const ui = globalUIState;
	const selectOptions: ISelectOption[] = [{ value: 'all', title: 'All' }, ...(uploadSelectOptions as ISelectOption[])];
</script>

<PageToolbar>
	<LabelInputGroup
		{selectOptions}
		type="select"
		label="File Type"
		name="fileType"
		layout="horizontal"
		callback={(e) => {
			const target = e.target as HTMLSelectElement;
			updatePageParams({ fileType: target.value }, true);
		}}
	/>
	<Button type="button" style="primary" title="Add" icon={Plus} onclick={() => (ui.createDialogVisible = true)} />
</PageToolbar>

<main>
	<DataList
		data={data.uploads}
		config={uploadsTableUIConfig}
		itemNamePlural="Uploads"
		totalItemCount={data.uploadCount}
		deleteAction="?/delete"
	/>
</main>

{#if ui.createDialogVisible}
	<CreateUploadDialog closeCallback={() => (ui.createDialogVisible = false)} />
{/if}
