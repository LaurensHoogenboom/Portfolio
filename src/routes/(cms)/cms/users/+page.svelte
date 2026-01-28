<script lang="ts">
	import type { PageData, ActionData } from '../../cms/users/$types';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import EditUserDialog from './components/editUserDialog.svelte';
	import type { IUserToEdit } from './components/editUserDialog.svelte';
	import CreateUserDialog from './components/createUserDialog.svelte';
	import { Plus } from '@lucide/svelte';
	import { isFormActionType, notifyFormActionSuccess } from '../shared/globalNotifications.svelte';
	import { usersTableUIConfig } from '$lib/configs/users';
	import DataListBody from '$cmsComponents/organisms/dataList/dataListBody.svelte';
	import DataListHeader from '$cmsComponents/organisms/dataList/dataListHeader.svelte';
	import DataList from '$cmsComponents/dataList.svelte';

	let { data, form }: { data: PageData; form: ActionData | undefined } = $props();

	let editFormVisible = $state(false);
	let createFormVisible = $state(false);
	let userToEdit: IUserToEdit | undefined = $state();

	const openEditDialog = (id: string) => {
		let user = data.users.find((u) => u.id == id);

		if (user) {
			userToEdit = {
				id: user.id,
				username: user.username,
				securityQuestion: user.securityQuestion,
				securityQuestionAnswer: user.securityQuestionAnswer
			};

			editFormVisible = true;
		}
	};

	$effect(() => {
		if (form?.succes && isFormActionType(form.action) && form.username) {
			notifyFormActionSuccess(form.action, form.username);
			createFormVisible = false;
			editFormVisible = false;
			form = undefined;
		}
	});
</script>

<PageToolbar>
	<Button title="Add" type="button" style="primary" onclick={() => (createFormVisible = true)} icon={Plus} />
</PageToolbar>

<main>
	<DataList 
		data={data.users}
		config={usersTableUIConfig}
		itemNamePlural="Users"
		editAction={openEditDialog}
		deleteAction="?/delete"
	/>
</main>

{#if editFormVisible && userToEdit}
	<EditUserDialog closeCallback={() => (editFormVisible = false)} errorMessage={form?.error} {userToEdit} />
{/if}

{#if createFormVisible}
	<CreateUserDialog closeCallback={() => (createFormVisible = false)} errorMessage={form?.error} />
{/if}
