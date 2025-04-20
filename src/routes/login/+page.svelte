<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
	import Notice from '$lib/components/atoms/notice.svelte';
    import Button from '$lib/components/atoms/button.svelte';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

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

<form method="post" action="?/login" class="modal" use:enhance>
    <div>
        <h1>Login</h1>

        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        <LabelInputGroup name="username" type="text" label="Username" required={true} value={username}/>
        <LabelInputGroup name="password" type="password" label="Password" required={true}/>
        <a href="/login/resetPassword/">Forgot password?</a>
    </div>

    <div class="box nested-box">
        <Button type="goto" style="secondary" title="Back" url="/"/>
        <Button type="submit" style="primary" title="Login"/>
    </div>
</form>

