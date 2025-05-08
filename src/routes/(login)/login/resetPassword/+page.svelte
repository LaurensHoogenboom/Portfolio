<script lang="ts">
	import Notice from '$lib/components/atoms/notice.svelte';
	import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';
	import Button from '$lib/components/atoms/button.svelte';
	import AuthenticationHeader from '../components/authenticationHeader.svelte';
	import Instruction from '$lib/components/atoms/instruction.svelte';

    let { form }: { form: ActionData } = $props();
    let step = $state(1);
    let userInformation = $state({
        userId: "",
        userName: "",
        securityQuestion: ""
    });
</script>

{#if step == 1}
    <form method="post" class="authentication" action="?/getSecurityQuestion" use:enhance={() => {
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
        <AuthenticationHeader title="Reset Password" url="/login"/>

        <div>
            <Instruction message="Please provide your username."/>

            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}
    
            <LabelInputGroup name="username" type="text" label="Username" required={true}/>    
        </div>

        <Button title="Next" type="submit" style="primary" alignment="center"/>
    </form>
{:else if step == 2}
    <form method="post" class="authentication" action="?/resetPassword" use:enhance={() => {
        return async ({ update, result}) => {
            await update();

            if (result.type == "success") {
                step = 3;
            }
        }
    }}>
        <AuthenticationHeader title="Reset Password" url="/login"/>

        <div>
            <Instruction message="Answer your secret question and choose a new password."/>
    
            <p style="margin-top: var(--padding-2);"><strong>{userInformation.securityQuestion}</strong></p>
    
            <input type="hidden" name="id" value={userInformation.userId}>
    
            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}
    
            <LabelInputGroup name="securityQuestionAnswer" type="text" label="Answer" required={true}/>
            <LabelInputGroup name="newPassword" type="password" label="New Password" required={true}/>
        </div>

        <Button title="Reset Password" type="submit" style="primary" alignment="center"/>
    </form>
{:else if step == 3}
    <form class="authentication">
        <AuthenticationHeader title="Reset Password"/>
        <Instruction message="Your password has been succesfully changed, {userInformation.userName}."/>
        <Button title="Login" type="goto" url="/login?username={userInformation.userName}" style="primary" alignment="center"/>
    </form>    
{/if}





