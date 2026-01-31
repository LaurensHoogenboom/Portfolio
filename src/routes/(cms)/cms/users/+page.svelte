<script lang="ts">
	import type { PageData } from '../../cms/users/$types';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import EditUserDialog from './components/editUserDialog.svelte';
	import type { IUserToEdit } from './components/editUserDialog.svelte';
	import CreateUserDialog from './components/createUserDialog.svelte';
	import { Plus } from '@lucide/svelte';
	import { usersTableUIConfig } from '$lib/configs/users';
	import DataList from '$cmsComponents/dataList.svelte';

	let { data }: { data: PageData; } = $props();

	let createFormVisible = $state(false);
	let userToEdit: IUserToEdit | undefined = $state();
	let editFormVisible = $derived(!!userToEdit);

	const openEditDialog = (id: string) => {
		let user = data.users.find((u) => u.id == id);
		if (user) userToEdit = {...user};
	};
</script>

<PageToolbar>
	<Button title="Add" type="button" style="primary" onclick={() => (createFormVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList data={data.users} config={usersTableUIConfig} itemNamePlural="Users" editAction={openEditDialog} deleteAction="?/delete" />
</main>

{#if editFormVisible && userToEdit}
	<EditUserDialog closeCallback={() => (userToEdit = undefined)} {userToEdit} />
{/if}

{#if createFormVisible}
	<CreateUserDialog closeCallback={() => (createFormVisible = false)} />
{/if}