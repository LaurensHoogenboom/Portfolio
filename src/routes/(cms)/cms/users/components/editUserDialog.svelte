<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$cmsComponents/atoms/button.svelte";
	import Notice from "$cmsComponents/atoms/notice.svelte";
	import LabelInputGroup from "$cmsComponents/molecules/labelInputGroup.svelte";
	import Dialog from "$cmsComponents/organisms/dialog.svelte";
	import PasswordInput from "$cmsComponents/organisms/passwordInput.svelte";
	import { notifyFormActionSuccess } from "../../shared/globalNotifications.svelte";

    export interface IUserToEdit {
        id: string,
        username: string,
        securityQuestion: string
    }

    let { closeCallback, userToEdit } : {
        closeCallback: () => void, 
        userToEdit: IUserToEdit 
    } = $props();

    let errorMessage: string | undefined = $state();
</script>

<Dialog title={`Edit ${userToEdit.username}`} closeCallback={closeCallback}>
    <form method="post" action="?/update" use:enhance={() => {
        return async ({ update, result }) => {
            await update({ reset: false });

            if (result.type == 'success') {
                notifyFormActionSuccess('update', result.data?.username as string)
                closeCallback();
            } else if (result.type == 'failure') {
                errorMessage = result.data?.error as string
            }
        };
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
            <LabelInputGroup type="text" name="securityQuestionAnswer" label="Secret Answer" max={250} instruction="Leave blank to keep the current answer."/>
        </fieldset>
          
        <div class="box nested-box form-actions">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Save Changes" />
        </div>
    </form>
</Dialog>