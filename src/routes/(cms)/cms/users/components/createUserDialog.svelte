<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/atoms/button.svelte";
	import Notice from "$lib/components/atoms/notice.svelte";
	import LabelInputGroup from "$lib/components/molecules/labelInputGroup.svelte";
	import Dialog from "$lib/components/organisms/dialog.svelte";
	import PasswordInput from "$lib/components/organisms/passwordInput.svelte";

    let { closeCallback, errorMessage } : { closeCallback: () => void, errorMessage?: string } = $props();
</script>

<Dialog>
    <form method="post" action="?/create" use:enhance>
        {#if errorMessage}
            <Notice message={errorMessage} type="warning" />
        {/if}

        <LabelInputGroup type="text" name="username" label="Username" max={120} required={true}/>
        <PasswordInput requireCurrentPassword={false} required={true} />
        <LabelInputGroup type="text" name="securityQuestion" label="Security Question" max={250} required={true}/>
        <LabelInputGroup type="text" name="securityQuestionAnswer" label="Security Answer" max={250} required={true}/>

        <div class="box nested-box">
            <Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
            <Button type="submit" style="primary" title="Add User" />
        </div>
    </form>
</Dialog>