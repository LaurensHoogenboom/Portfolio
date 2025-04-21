<script lang="ts">
    import type { PageData, ActionData } from '../../cms/users/$types';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    
    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import ListItem from '$lib/components/molecules/listItem.svelte';
    import Dialog from '$lib/components/organisms/dialog.svelte';
    import Notice from '$lib/components/atoms/notice.svelte';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();
    let userToEdit = $state(data.users[0] ? data.users[0] : undefined);
    let newPassword = $state("");
    let addDialog: HTMLDialogElement;
    let editDialog: HTMLDialogElement;

    onMount(() => {
        addDialog = document.getElementById("add-dialog") as HTMLDialogElement;
        editDialog = document.getElementById("edit-dialog") as HTMLDialogElement;
    });

    const openEditDialog = (id: string) => {
        userToEdit = undefined;
        userToEdit = data.users.find(u => u.id == id);
        form = undefined;
        newPassword = "";

        editDialog.showModal();
    }
</script>

{#each data.users as user}
    <ListItem title={user.username} id={user.id} editAction={() => openEditDialog(user.id)} deleteAction="/users?/delete"/>
{/each}

<button onclick={() => addDialog.showModal()}>Add User</button>

<Dialog id="add-dialog">
    <form method="post" action="?/create" use:enhance>
        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        <LabelInputGroup type="text" name="username" label="Username" max={120} required={true}/>
        <LabelInputGroup type="password" name="password" label="Password" max={120} required={true}/>
        <LabelInputGroup type="text" name="securityQuestion" label="Security Question" max={250} required={true}/>
        <LabelInputGroup type="text" name="securityQuestionAnswer" label="Security Answer" max={250} required={true}/>

        <button type="submit">Add User</button>
        <button onclick={() => addDialog.close()} type="button">cancel</button>
    </form>
</Dialog>

<Dialog id="edit-dialog">
    <form method="post" action="?/update" use:enhance={() => {
        return ({ update }) => update({ reset: false });
    }}>
        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        {#if form?.succes}
            <Notice message="Changes are succesfully saved." type="success" />
        {/if}

        <input type="hidden" name="id" value={userToEdit?.id}>

        <LabelInputGroup type="text" name="username" label="Username" max={120} required={true} value={userToEdit?.username}/>
        <LabelInputGroup type="password" name="newPassword" label="New Password" max={120} bind:value={newPassword}/>
        {#if newPassword.length}
            <LabelInputGroup type="password" name="currentPassword" label="Current Password" max={120}/>
        {/if}
        <LabelInputGroup type="text" name="securityQuestion" label="Security Question" max={250} required={true} value={userToEdit?.securityQuestion}/>
        <LabelInputGroup type="text" name="securityQuestionAnswer" label="Security Answer" max={250} required={true} value={userToEdit?.securityQuestionAnswer}/>

        <button type="submit">Save Changes</button>
        <button onclick={() => editDialog.close()} type="button">cancel</button>
    </form>
</Dialog>





