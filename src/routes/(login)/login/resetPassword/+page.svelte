<script lang="ts">
	import Notice from '$lib/components/atoms/notice.svelte';
	import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
	import Button from '$lib/components/atoms/button.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    let step = $state(1);
    let userInformation = $state({
        userId: "",
        userName: "",
        securityQuestion: ""
    });
</script>

{#if step == 1}
    <form method="post" action="?/getSecurityQuestion" use:enhance={() => {
        return async ({ result, update }) => {
            await update();

            if (result.type == "success" && form?.userId && form?.securityQuestion && form?.username) {
                step = 2;
                userInformation.userId = form.userId,
                userInformation.userName = form.username,
                userInformation.securityQuestion = form.securityQuestion
            }
		};
    }}>
        <div>
            <h1>Reset Password</h1>

            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}
    
            <LabelInputGroup name="username" type="text" label="Username" required={true}/>    
        </div>

        <div class="box nested-box">
            <Button title="Back" type="goto" style="secondary" url="/login"/>
            <Button title="Next" type="submit" style="primary"/>
        </div>
    </form>
{:else if step == 2}
    <form method="post" action="?/resetPassword" use:enhance={() => {
        return async ({ update, result}) => {
            await update();

            if (result.type == "success") {
                step = 3;
            }
        }
    }}>
        <div>
            <h1>Reset Password</h1>
            <p>Answer your secret question and provide a new password.</p>
    
            <p><strong>{userInformation.securityQuestion}</strong></p>
    
            <input type="hidden" name="id" value={userInformation.userId}>
    
            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}
    
            <LabelInputGroup name="securityQuestionAnswer" type="text" label="Answer" required={true}/>
            <LabelInputGroup name="newPassword" type="password" label="New Password" required={true}/>
        </div>

        <div class="box nested-box">
            <Button title="Reset Password" type="submit" style="primary" />
        </div>
    </form>
{:else if step == 3}
    <form>
        <div>
            <h1>Succes!</h1>

            <p>Your password has been succesfully changed, {userInformation.userName}.</p>
        </div>
        
        <div class="box nested-box">
            <Button title="Login" type="goto" url="/login?username={userInformation.userName}" style="primary"/>
        </div>
    </form>    
{/if}





