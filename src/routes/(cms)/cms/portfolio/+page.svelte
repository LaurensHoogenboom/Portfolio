<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { ActionData, PageData } from './$types';
	import ListItem from '$cmsComponents/molecules/listItem.svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import EditPortfolioItemDialog, { type IPortfolioItemToEdit } from './components/editPortfolioItemDialog.svelte';
	import CreatePortfolioItemDialog from './components/createPortfolioItemDialog.svelte';
	import { isFormActionType, notifyFormActionSuccess } from '../shared/globalNotifications.svelte';

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
				image: portfolioItem.image
			};
		}
	};

	const openEditArticleMode = (id: string) => {};

	$effect(() => {
        if (form?.succes && isFormActionType(form.action) && form.portfolioItemTitle) {
            notifyFormActionSuccess(form.action, form.portfolioItemTitle);

            createFormVisible = false;
            form = undefined;
        }
	});
</script>

<PageToolbar>
	<Button title="Portfolio Item" type="button" style="secondary" onclick={() => (createFormVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList itemNamePlural="Portfolio Items" itemCount={data.portfolioItems.length}>
		{#each data.portfolioItems as pItem}
			{@const writeAction = pItem.type != 'art' ? () => openEditArticleMode(pItem.id) : undefined}
			<ListItem
				title={pItem.title}
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
