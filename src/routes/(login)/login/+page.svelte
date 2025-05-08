<script lang="ts">
    import type { PageData, ActionData } from './$types';
    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
	import Notice from '$lib/components/atoms/notice.svelte';
    import Button from '$lib/components/atoms/button.svelte';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { CircleUserRoundIcon, LogIn, User, UserRound } from '@lucide/svelte';
	import AuthenticationHeader from './components/authenticationHeader.svelte';
	import Instruction from '$lib/components/atoms/instruction.svelte';

    let { data, form }: { data: PageData, form: ActionData } = $props();

    let urlParameters: URLSearchParams | undefined = $state();
    let username: string = $state('');

    onMount(() => {
        urlParameters = new URLSearchParams(window.location.search);
        username = urlParameters.get('username') ?? '';
    });

    $effect(() => {
        if (form?.success) {
            goto("/cms/");
        }
    });
</script>

<style>
    .avatar {
        height: 50px;
        width: 50px;
        border-radius: 100%;

        .outset {
            align-items: center;
            justify-content: center;
            border-radius: 100%;
        }
    }
</style>

<form method="post" class="authentication" action="?/login" use:enhance>
    <AuthenticationHeader title="Login" url="/">
        <div class="inset avatar">
            <div class="outset">
                <UserRound size={20}/>
            </div>
        </div>
    </AuthenticationHeader>

    <div>
        <Instruction message="Please provide your credentials to login."/>

        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        <LabelInputGroup name="username" type="text" label="Username" required={true} value={username}/>
        <LabelInputGroup name="password" type="password" label="Password" required={true}/>
        <a href="/login/resetPassword/" style="float: right">Forgot password?</a>
    </div>

    <Button type="submit" style="primary" title="Login" alignment="center" icon={LogIn}/>
</form>

