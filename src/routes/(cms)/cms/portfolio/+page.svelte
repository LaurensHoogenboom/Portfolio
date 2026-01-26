<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { ActionData, PageData } from './$types';
	import ListItem from '$cmsComponents/molecules/listItem.svelte';
	import DataList, { type IDataListKeyValuePair } from '$cmsComponents/organisms/dataList.svelte';
	import EditPortfolioItemDialog, { type IPortfolioItemToEdit } from './components/editPortfolioItemDialog.svelte';
	import CreatePortfolioItemDialog from './components/createPortfolioItemDialog.svelte';
	import { isFormActionType, notifyFormActionSuccess } from '../shared/globalNotifications.svelte';
	import { goto } from '$app/navigation';
	import LabelInputGroup, { type ISelectOption } from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { portfolioSelectOptions, type ISelectPortfolioType } from './shared/portfolioSelectOptions';
	import { isPortfolioItemType, type PortfolioItemType } from '$lib/types/portfolio';

	let { data, form }: { data: PageData; form: ActionData | undefined } = $props();

	let portfolioItemToEdit: IPortfolioItemToEdit | undefined = $state();
	let editFormVisible = $derived(portfolioItemToEdit ? true : false);
	let createFormVisible = $state(false);

	const openEditDialog = (id: string) => {
		const portfolioItem = data.portfolioItems.find((pItem) => pItem.id == id);

		if (portfolioItem) {
			portfolioItemToEdit = {
				id: portfolioItem.id,
				title: portfolioItem.title,
				description: portfolioItem.description,
				type: portfolioItem.type,
				image: portfolioItem.upload?.image ?? null,
				visiblePriority: portfolioItem.visiblePriority
			};
		}
	};

	let selectOptions: ISelectOption[] = [{ value: 'all', title: 'All' }].concat(portfolioSelectOptions as ISelectOption[]);
	let selectedValue: string | undefined = $state();
	let selectedCategory: PortfolioItemType | undefined = $derived(
		selectedValue && isPortfolioItemType(selectedValue) ? selectedValue : undefined
	);
	let visibleItems = $derived(selectedCategory ? data.portfolioItems.filter((p) => p.type == selectedCategory) : data.portfolioItems);

	$effect(() => {
		if (form?.succes && isFormActionType(form.action) && form.portfolioItemTitle) {
			notifyFormActionSuccess(form.action, form.portfolioItemTitle);
			createFormVisible = false;
			editFormVisible = false;
			form = undefined;
		}
	});
</script>

<PageToolbar>
	<LabelInputGroup type="select" label="Category" name="category" layout="horizontal" {selectOptions} bind:value={selectedValue} />
	<Button title="Add" type="button" style="primary" onclick={() => (createFormVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList itemNamePlural="Portfolio Items" itemCount={visibleItems.length}>
		{#each visibleItems as pItem}
			{@const writeAction = pItem.type != 'art' ? () => goto(`/editPortfolioItemArticle/${pItem.id}`) : undefined}
			{@const displayValues: IDataListKeyValuePair[] = [
				{ key: 'title', value: pItem.title },
				{ key: 'type', value: pItem.type },
				{ key: 'visible priority', value: pItem.visiblePriority.toString() }
			]}

			<ListItem
				displayKeyValuePairs={displayValues}
				id={pItem.id}
				editAction={() => openEditDialog(pItem.id)}
				{writeAction}
				deleteAction="/cms/portfolio?/delete"
			/>
		{/each}
	</DataList>
</main>

{#if editFormVisible && portfolioItemToEdit}
	<EditPortfolioItemDialog
		{portfolioItemToEdit}
		closeCallback={() => (portfolioItemToEdit = undefined)}
		errorMessage={form?.error}
		editSuccess={form?.succes}
	/>
{/if}

{#if createFormVisible}
	<CreatePortfolioItemDialog closeCallback={() => (createFormVisible = false)} errorMessage={form?.error} createSuccess={form?.succes} />
{/if}
