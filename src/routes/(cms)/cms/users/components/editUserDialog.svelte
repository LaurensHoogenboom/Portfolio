<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/cms/atoms/button.svelte";
	import Notice from "$lib/components/cms/atoms/notice.svelte";
	import LabelInputGroup from "$lib/components/cms/molecules/labelInputGroup.svelte";
	import Dialog from "$lib/components/cms/organisms/dialog.svelte";
	import PasswordInput from "$lib/components/cms/organisms/passwordInput.svelte";

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

<Dialog title={`Edit ${userToEdit.username}`} closeCallback={closeCallback}>
    <form method="post" action="?/update" use:enhance={() => {
        return ({ update }) => update({ reset: false });
    }}>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}

        <input type="hidden" name="id" value={userToEdit.id}>

        <fieldset>
            <LabelInputGroup type="text" name="username" label="Username" max={120} required={true} value={userToEdit.username}/>
        </fieldset>

        <fieldset>
            <PasswordInput requireCurrentPassword={true} required={false} />
        </fieldset>
        
        <fieldset>
            <LabelInputGroup type="text" name="securityQuestion" label="Secret Question" max={250} required={true} value={userToEdit.securityQuestion}/>
            <LabelInputGroup type="text" name="securityQuestionAnswer" label="Secret Answer" max={250} required={true} value={userToEdit.securityQuestionAnswer}/>
        </fieldset>
          
        <div class="box nested-box form-actions">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Save Changes" />
        </div>
    </form>
</Dialog>