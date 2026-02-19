<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { workspacesTableUIConfig } from '$lib/configs/workspaces';
	import { Plus } from '@lucide/svelte';
	import type { PageData } from './$types';
	import CreateWorkspaceDialog from './components/createWorkspaceDialog.svelte';
	import EditWorkspaceDialog, { type IWorkspaceToEdit } from './components/editWorkspaceDialog.svelte';
	import { globalUIState } from '../shared/states/globalUIState.svelte';

	let { data }: { data: PageData } = $props();

	let workspaceToEdit: IWorkspaceToEdit | undefined = $state();
	let editDialogVisible = $derived(!!workspaceToEdit);
	const ui = globalUIState;

	const openEditDialog = (id: string) => {
		let workspace = data.workspaces.find((w) => w.id == id);
		if (workspace) workspaceToEdit = { ...workspace };
	};
</script>

<PageToolbar>
    <Button type="button" title="Add" icon={Plus} onclick={() => ui.createDialogVisible = true} style="primary" />
</PageToolbar>

<main>
	<DataList
		data={data.workspaces}
		config={workspacesTableUIConfig}
		itemNamePlural="Workspaces"
		totalItemCount={data.workspaceCount?.count ?? 0}
		deleteAction="?/delete"
		editAction={openEditDialog}
	/>
</main>

{#if ui.createDialogVisible}
	<CreateWorkspaceDialog closeCallback={() => (ui.createDialogVisible = false)} />
{/if}

{#if editDialogVisible && workspaceToEdit}
	<EditWorkspaceDialog {workspaceToEdit} closeCallback={() => (workspaceToEdit = undefined)} />
{/if}