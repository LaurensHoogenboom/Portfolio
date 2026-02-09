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

	let { data }: { data: PageData } = $props();

	let createFormVisible = $state(false);
	let userToEdit: IUserToEdit | undefined = $state();
	let editFormVisible = $derived(!!userToEdit);

	const openEditDialog = (id: string) => {
		let user = data.users.find((u) => u.id == id);
		if (user) userToEdit = { ...user };
	};

	let configContext: IConfigContext = {
		userId: data.userId,
		userType: data.userType,
		adminCount: data.adminCount
	};
</script>

<PageToolbar>
	<Button title="Add" type="button" style="primary" onclick={() => (createFormVisible = true)} icon={Plus} />
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

{#if editFormVisible && userToEdit}
	<EditUserDialog closeCallback={() => (userToEdit = undefined)} {userToEdit} workspaces={data.workspaces} />
{/if}

{#if createFormVisible}
	<CreateUserDialog closeCallback={() => (createFormVisible = false)} workspaces={data.workspaces} />
{/if}
