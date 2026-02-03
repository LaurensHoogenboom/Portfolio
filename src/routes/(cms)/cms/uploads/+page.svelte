<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import DataList from '$cmsComponents/dataList.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { uploadsTableUIConfig } from '$lib/configs/uploads';
	import CreateUploadDialog from './components/createUploadDialog.svelte';
	import type { ISelectOption } from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { uploadSelectOptions } from './shared/fileTypeSelectOptions';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { updatePageParams } from '$lib/utils/updatePageParams';

	let { data }: { data: PageData } = $props();

	let createFormVisible = $state(false);

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
	<Button type="button" style="primary" title="Add" icon={Plus} onclick={() => (createFormVisible = true)} />
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

{#if createFormVisible}
	<CreateUploadDialog closeCallback={() => (createFormVisible = false)} />
{/if}
