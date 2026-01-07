<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$cmsComponents/atoms/button.svelte";
	import Notice from "$cmsComponents/atoms/notice.svelte";
	import LabelInputGroup from "$cmsComponents/molecules/labelInputGroup.svelte";
	import Dialog from "$cmsComponents/organisms/dialog.svelte";
	import PasswordInput from "$cmsComponents/organisms/passwordInput.svelte";

    let { closeCallback, errorMessage } : { closeCallback: () => void, errorMessage?: string } = $props();
</script>

<Dialog title="Add User" closeCallback={closeCallback}>
    <form method="post" action="?/create" use:enhance>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}

        <fieldset>
            <LabelInputGroup type="text" name="username" label="Username" max={120} required={true}/>
        </fieldset>

        <fieldset>
            <PasswordInput requireCurrentPassword={false} required={true} />
        </fieldset>

        <fieldset>
            <LabelInputGroup type="text" name="securityQuestion" label="Secret Question" max={250} required={true}/>
            <LabelInputGroup type="text" name="securityQuestionAnswer" label="Secret Answer" max={250} required={true}/>
        </fieldset>

        <div class="box nested-box form-actions">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Add User" />
        </div>
    </form>
</Dialog>