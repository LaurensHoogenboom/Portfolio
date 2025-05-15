<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/atoms/button.svelte";
	import Notice from "$lib/components/atoms/notice.svelte";
	import LabelInputGroup from "$lib/components/molecules/labelInputGroup.svelte";
	import Dialog from "$lib/components/organisms/dialog.svelte";
	import PasswordInput from "$lib/components/organisms/passwordInput.svelte";

    export interface IUserToEdit {
        id: string,
        username: string,
        securityQuestion: string,
        securityQuestionAnswer: string
    }

    let { errorMessage, closeCallback, userToEdit } : { 
        errorMessage?: string, 
        closeCallback: () => void, 
        userToEdit: IUserToEdit 
    } = $props();
</script>

<Dialog>
    <form method="post" action="?/update" use:enhance={() => {
        return ({ update }) => update({ reset: false });
    }}>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}

        <input type="hidden" name="id" value={userToEdit.id}>

        <LabelInputGroup type="text" name="username" label="Username" max={120} required={true} value={userToEdit.username}/>
        <PasswordInput requireCurrentPassword={true} required={false} />
        <LabelInputGroup type="text" name="securityQuestion" label="Security Question" max={250} required={true} value={userToEdit.securityQuestion}/>
        <LabelInputGroup type="text" name="securityQuestionAnswer" label="Security Answer" max={250} required={true} value={userToEdit.securityQuestionAnswer}/>

        <div class="box nested-box">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Save Changes" />
        </div>
    </form>
</Dialog>