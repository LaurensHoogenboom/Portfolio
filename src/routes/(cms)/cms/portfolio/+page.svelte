<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import EditPortfolioItemDialog, { type IPortfolioItemToEdit } from './components/editPortfolioItemDialog.svelte';
	import CreatePortfolioItemDialog from './components/createPortfolioItemDialog.svelte';
	import LabelInputGroup, { type ISelectOption } from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { portfolioSelectOptions } from './shared/portfolioSelectOptions';
	import { isPortfolioItemType } from '$lib/types/portfolio';
	import { portfolioTableUIConfig } from '$lib/configs/portfolioItems';
	import { goto } from '$app/navigation';
	import DataList from '$cmsComponents/dataList.svelte';

	let { data }: { data: PageData } = $props();

	let portfolioItemToEdit: IPortfolioItemToEdit | undefined = $state();
	let editFormVisible = $derived(!!portfolioItemToEdit);
	let createFormVisible = $state(false);

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

	let selectOptions: ISelectOption[] = [{ value: 'all', title: 'All' }, ...(portfolioSelectOptions as ISelectOption[])];
	let selectedValue: string | undefined = $state('all');
	let filteredItems = $derived(
		selectedValue && isPortfolioItemType(selectedValue) ? data.portfolioItems.filter((p) => p.type == selectedValue) : data.portfolioItems
	);
</script>

<PageToolbar>
	<LabelInputGroup type="select" label="Category" name="category" layout="horizontal" {selectOptions} bind:value={selectedValue} />
	<Button title="Add" type="button" style="primary" onclick={() => (createFormVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList
		data={filteredItems}
		config={portfolioTableUIConfig}
		itemNamePlural="portfolio items"
		totalItemCount={data.portfolioItemCount}
		editAction={openEditDialog}
		writeAction={openWriteMenu}
		deleteAction="?/delete"
	/>
</main>

{#if editFormVisible && portfolioItemToEdit}
	<EditPortfolioItemDialog {portfolioItemToEdit} closeCallback={() => (portfolioItemToEdit = undefined)} />
{/if}

{#if createFormVisible}
	<CreatePortfolioItemDialog closeCallback={() => (createFormVisible = false)} />
{/if}
