<script lang="ts">
	import Notice from '$lib/components/atoms/notice.svelte';
	import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
    import type { PageData, ActionData } from './$types';
    import { enhance } from '$app/forms';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    let step = $state(1);
    let userInformation = $state({
        userId: "",
        userName: "",
        securityQuestion: ""
    });
</script>

{#if step == 1}
    <form class="modal" method="post" action="?/getSecurityQuestion" use:enhance={() => {
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
        <h1>Reset Password</h1>

        <section>
            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}

            <LabelInputGroup name="username" type="text" label="Username" required={true}/>
        </section>

        <section>
            <a href="/login">Back</a>
            <button type="submit">Next</button>
        </section>
    </form>
{:else if step == 2}
    <form class="modal" method="post" action="?/resetPassword" use:enhance={() => {
        return async ({ update, result}) => {
            await update();

            if (result.type == "success") {
                step = 3;
            }
        }
    }}>
        <section>
            <h1>Reset Password</h1>
            <p>Answer your secret question and provide a new password.</p>
    
            <p>{userInformation.securityQuestion}</p>
        </section>

        <section>
            <input type="hidden" name="id" value={userInformation.userId}>

            {#if form?.error}
                <Notice message={form.error} type="warning" />
            {/if}
    
            <LabelInputGroup name="securityQuestionAnswer" type="text" label="Answer" required={true}/>
            <LabelInputGroup name="newPassword" type="password" label="New Password" required={true}/>
        </section>
        
        <section>
            <button type="submit">Reset</button>
        </section>
    </form>
{:else if step == 3}
    <section>
        <h1>Succes!</h1>
    </section>

    <section>
        <p>Your password is succesfully changed, {userInformation.userName}.</p>
    </section>

    <section>
        <a href="/login?username={userInformation.userName}">Login</a>
    </section>
{/if}





