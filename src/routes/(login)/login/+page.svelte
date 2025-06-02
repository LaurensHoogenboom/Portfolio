<script lang="ts">
    import type { ActionData } from './$types';
    import LabelInputGroup from '$lib/components/cms/molecules/labelInputGroup.svelte';
	import Notice from '$lib/components/cms/atoms/notice.svelte';
    import Button from '$lib/components/cms/atoms/button.svelte';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { LogIn } from '@lucide/svelte';
	import AuthenticationHeader from './components/authenticationHeader.svelte';
	import Instruction from '$lib/components/cms/atoms/instruction.svelte';
	import Avatar from '$lib/components/cms/molecules/avatar.svelte';
	import { DispatchSuccesNotification } from '$lib/globalNotifications.svelte';

    let { form }: { form: ActionData } = $props();

    let urlParameters: URLSearchParams | undefined = $state();
    let username: string = $state('');
    let authenticating: boolean = $state(false);

    onMount(() => {
        urlParameters = new URLSearchParams(window.location.search);
        username = urlParameters.get('username') ?? '';
    });
</script>

<form method="post" class="authentication" action="?/login" use:enhance={() => {
    authenticating = true;

    return async ({ update }) => {
        await update({ reset: false });

        authenticating = false;

        if (form?.success) {
            goto("/cms/");
            DispatchSuccesNotification(`Welcome back, ${username}!`);
        }
    }
}}>
    <AuthenticationHeader title="Login" url="/">
        <Avatar />
    </AuthenticationHeader>

    <div>
        <Instruction message="Please provide your credentials to login."/>

        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        <LabelInputGroup name="username" type="text" label="Username" required={true} bind:value={username}/>
        <LabelInputGroup name="password" type="password" label="Password" required={true}/>
        <a href="/login/resetPassword/" style="float: right">Forgot password?</a>
    </div>

    <Button type="submit" style="primary" title="Login" alignment="center" icon={LogIn} loading={authenticating}/>
</form>

