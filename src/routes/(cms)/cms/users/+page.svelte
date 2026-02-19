<script lang="ts">
	import type { PageData } from '../../cms/users/$types';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import EditUserDialog from './components/editUserDialog.svelte';
	import type { IUserToEdit } from './components/editUserDialog.svelte';
	import CreateUserDialog from './components/createUserDialog.svelte';
	import { Plus } from '@lucide/svelte';
	import { usersTableUIConfig } from '$lib/configs/users';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import type { IConfigContext } from '$lib/types/dataList';
	import { globalUIState } from '../shared/states/globalUIState.svelte';

	let { data }: { data: PageData } = $props();

	let userToEdit: IUserToEdit | undefined = $state();
	let editDialogVisible = $derived(!!userToEdit);
	const ui = globalUIState;

	const openEditDialog = (id: string) => {
		let user = data.users.find((u) => u.id == id);
		if (user) userToEdit = { ...user };
	};

	let configContext: IConfigContext = {
		userId: data.currentUser.id,
		userType: data.currentUser.type,
		adminCount: data.adminCount
	};
</script>

<PageToolbar>
	<Button title="Add" type="button" style="primary" onclick={() => (ui.createDialogVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList
		data={data.users}
		config={usersTableUIConfig}
		itemNamePlural="Users"
		totalItemCount={data.userCount}
		editAction={openEditDialog}
		deleteAction="?/delete"
		{configContext}
	/>
</main>

{#if editDialogVisible && userToEdit}
	<EditUserDialog
		closeCallback={() => (userToEdit = undefined)}
		{userToEdit}
		workspaces={data.workspaces}
		canEditType={data.currentUser.type == 'admin'}
	/>
{/if}

{#if ui.createDialogVisible}
	<CreateUserDialog closeCallback={() => (ui.createDialogVisible = false)} workspaces={data.workspaces} />
{/if}
