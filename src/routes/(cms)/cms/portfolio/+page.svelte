<script lang="ts">
	import Button from '$lib/components/cms/atoms/button.svelte';
	import PageToolbar from '$lib/components/cms/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
    import type { ActionData, PageData } from './$types';
	import ListItem from '$lib/components/cms/molecules/listItem.svelte';
	import DataList from '$lib/components/cms/organisms/dataList.svelte';
	import EditPortfolioItemDialog, { type IPortfolioItemToEdit } from './components/editPortfolioItemDialog.svelte';
	import CreatePortfolioItemDialog from './components/createPortfolioItemDialog.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    let portfolioItemToEdit: IPortfolioItemToEdit | undefined = $state();
    let editFormVisible = $derived(portfolioItemToEdit ? true : false);
    let createFormVisible = $state(false);

    const openEditDialog = (id : string) => {
        const portfolioItem = data.portfolioItems.find(pItem => pItem.id == id);

        if (portfolioItem) {
            portfolioItemToEdit = {
                id: portfolioItem.id,
                title: portfolioItem.title,
                description: portfolioItem.description,
                type: portfolioItem.type,
                image: portfolioItem.image
            }
        }
    }
</script>

<PageToolbar>
    <Button title="Portfolio Item" type="button" style="secondary" onclick={() => createFormVisible = true} icon={Plus} />
</PageToolbar>

<main>
    <DataList itemNamePlural="Portfolio Items" itemCount={data.portfolioItems.length}>
        {#each data.portfolioItems as pItem}
            <ListItem title={pItem.title} id={pItem.id} editAction={() => openEditDialog(pItem.id)} deleteAction="/cms/portfolio?/delete"/>
        {/each}
    </DataList>
</main>

{#if editFormVisible && portfolioItemToEdit}
    <EditPortfolioItemDialog portfolioItemToEdit={portfolioItemToEdit} closeCallback={() => portfolioItemToEdit = undefined} errorMessage={form?.error} />
{/if}

{#if createFormVisible}
    <CreatePortfolioItemDialog closeCallback={() => createFormVisible = false} errorMessage={form?.error}/>
{/if}