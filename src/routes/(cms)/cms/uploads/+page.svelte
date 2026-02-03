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
	import { isUploadFileType } from '$lib/types/uploads';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';

	let { data }: { data: PageData } = $props();

	let createFormVisible = $state(false);

	let selectOptions: ISelectOption[] = [{ value: 'all', title: 'All' }, ...(uploadSelectOptions as ISelectOption[])];
	let selectedValue: string | undefined = $state('all');
	let filteredItems = $derived(
		selectedValue && isUploadFileType(selectedValue) ? data.uploads.filter((u) => u.fileType == selectedValue) : data.uploads
	);
</script>

<PageToolbar>
	<LabelInputGroup {selectOptions} type="select" label="File Type" name="fileType" layout="horizontal" bind:value={selectedValue} />
	<Button type="button" style="primary" title="Add" icon={Plus} onclick={() => (createFormVisible = true)} />
</PageToolbar>

<main>
	<DataList
		data={filteredItems}
		config={uploadsTableUIConfig}
		itemNamePlural="Uploads"
		totalItemCount={data.uploadCount}
		deleteAction="?/delete"
	/>
</main>

{#if createFormVisible}
	<CreateUploadDialog closeCallback={() => (createFormVisible = false)} />
{/if}
