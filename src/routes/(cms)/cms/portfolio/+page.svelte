<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import EditPortfolioItemDialog, { type IPortfolioItemToEdit } from './components/editPortfolioItemDialog.svelte';
	import CreatePortfolioItemDialog from './components/createPortfolioItemDialog.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { portfolioSelectOptions } from './shared/portfolioSelectOptions';
	import { portfolioTableUIConfig } from '$lib/configs/portfolioItems';
	import { goto } from '$app/navigation';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import { updatePageParams } from '$lib/utils/updatePageParams';
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import { globalUIState } from '../shared/states/globalUIState.svelte';

	let { data }: { data: PageData } = $props();

	let portfolioItemToEdit: IPortfolioItemToEdit | undefined = $state();
	let editDialogVisible = $derived(!!portfolioItemToEdit);
	const ui = globalUIState;

	const openEditDialog = (id: string) => {
		const portfolioItem = data.portfolioItems.find((pItem) => pItem.id == id);

		if (portfolioItem) {
			portfolioItemToEdit = {
				...portfolioItem,
				image: portfolioItem.upload?.image ?? null
			};
		}
	};

	const openWriteMenu = (id: string) => {
		const portfolioItem = data.portfolioItems.find((pItem) => pItem.id == id);

		if (portfolioItem && portfolioItem.type != 'art') {
			goto(`/editPortfolioItemArticle/${portfolioItem.id}`);
		}
	};

	const selectOptions: ISelectOption[] = [{ value: 'all', title: 'All' }, ...(portfolioSelectOptions as ISelectOption[])];
</script>

<PageToolbar>
	<LabelInputGroup
		type="select"
		label="Category"
		name="category"
		layout="horizontal"
		{selectOptions}
		callback={(e) => {
			const target = e.target as HTMLSelectElement;
			updatePageParams({ category: target.value }, true);
		}}
	/>
	<Button title="Add" type="button" style="primary" onclick={() => (ui.createDialogVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList
		data={data.portfolioItems}
		config={portfolioTableUIConfig}
		itemNamePlural="portfolio items"
		totalItemCount={data.portfolioItemCount}
		editAction={openEditDialog}
		writeAction={openWriteMenu}
		deleteAction="?/delete"
	/>
</main>

{#if editDialogVisible && portfolioItemToEdit}
	<EditPortfolioItemDialog {portfolioItemToEdit} closeCallback={() => (portfolioItemToEdit = undefined)} />
{/if}

{#if ui.createDialogVisible}
	<CreatePortfolioItemDialog closeCallback={() => (ui.createDialogVisible = false)} />
{/if}
