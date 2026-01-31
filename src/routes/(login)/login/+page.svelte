<script lang="ts">
	import type { ActionData } from './$types';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import Notice from '$cmsComponents/atoms/notice.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { LogIn } from '@lucide/svelte';
	import AuthenticationHeader from './components/authenticationHeader.svelte';
	import Instruction from '$cmsComponents/atoms/instruction.svelte';
	import Avatar from '$cmsComponents/molecules/avatar.svelte';
	import { dispatchSuccesNotification } from '../../(cms)/cms/shared/globalNotifications.svelte';

	let urlParameters: URLSearchParams | undefined = $state();
	let username: string | undefined = $state();
	let redirectUrl: string | undefined = $state();
	let authenticating: boolean = $state(false);
    let errorMessage: string | undefined = $state();

	onMount(() => {
		urlParameters = new URLSearchParams(window.location.search);
		username = urlParameters.get('username') ?? undefined;
		redirectUrl = urlParameters.get('redirectUrl') ?? undefined;
	});
</script>

<form
	method="post"
	class="authentication"
	action="?/login"
	use:enhance={() => {
		authenticating = true;

		return async ({ update, result }) => {
			await update({ reset: false });

			authenticating = false;

			if (result.type == 'success') {
				goto(redirectUrl ?? '/cms');
				dispatchSuccesNotification(`Welcome back, ${username}!`, 'Logged In.');
			} else if (result.type == 'failure') {
				errorMessage = result.data?.error as string;
			}
		};
	}}
>
	<AuthenticationHeader title="Login" url="/">
		<Avatar />
	</AuthenticationHeader>

	<div>
		<Instruction message="Please provide your credentials to login." />

		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

		<LabelInputGroup name="username" type="text" label="Username" required={true} bind:value={username} />
		<LabelInputGroup name="password" type="password" label="Password" required={true} />
		<a href="/login/resetPassword/" style="float: right">Forgot password?</a>
	</div>

	<Button type="submit" style="primary" title="Login" alignment="center" icon={LogIn} loading={authenticating} />
</form>
