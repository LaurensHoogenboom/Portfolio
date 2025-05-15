<script lang="ts">
    import type { PageData, ActionData } from '../../cms/users/$types';
    import ListItem from '$lib/components/molecules/listItem.svelte';
    import PageToolbar from '$lib/components/organisms/pageToolbar.svelte';
	import Button from '$lib/components/atoms/button.svelte';
	import EditUserDialog from './components/editUserDialog.svelte';
    import type { IUserToEdit } from './components/editUserDialog.svelte';
	import CreateUserDialog from './components/createUserDialog.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    let editFormVisible = $state(false);
    let createFormVisible = $state(false);
    let userToEdit: IUserToEdit | undefined = $state();

    const openEditDialog = (id: string) => {
        let user = data.users.find(u => u.id == id);

        if (user) {
            form = undefined;

            userToEdit = {
                id: user.id,
                username: user.username,
                securityQuestion: user.securityQuestion,
                securityQuestionAnswer: user.securityQuestionAnswer
            }

            editFormVisible = true;
        }
    }

    const openCreateForm = () => {
        form = undefined;
        createFormVisible = true;
    }

    $effect(() => {
        if (form?.succes) {
            editFormVisible = false;
            createFormVisible = false;
        }
    });
</script>

<PageToolbar>
    <Button title="Add User" type="button" style="secondary" onclick={openCreateForm} />
</PageToolbar>

<main>
    <div class="box" style="flex-direction: column;">
        {#each data.users as user}
            <ListItem title={user.username} id={user.id} editAction={() => openEditDialog(user.id)} deleteAction="/cms/users?/delete"/>
        {/each}
    </div>
</main>

{#if editFormVisible && userToEdit }
    <EditUserDialog closeCallback={() => editFormVisible = false} errorMessage={form?.error} userToEdit={userToEdit} />
{/if}

{#if createFormVisible}
    <CreateUserDialog closeCallback={() => createFormVisible = false} errorMessage={form?.error} />
{/if}