<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import LabelInputGroup from '$lib/components/molecules/labelInputGroup.svelte';
	import Notice from '$lib/components/atoms/notice.svelte';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

    let { data, form }: { data: PageData, form: ActionData } = $props();
    const urlParameters = new URLSearchParams(window.location.search);
    const username = urlParameters.get('username');

    $effect(() => {
        if (form?.success) {
            goto("/cms/");
        }
    });
</script>

<form method="post" action="?/login" class="modal" use:enhance>
    <h1>Login</h1>

    <section>
        {#if form?.error}
            <Notice message={form.error} type="warning" />
        {/if}

        <LabelInputGroup name="username" type="text" label="Username" required={true} value={username}/>
        <LabelInputGroup name="password" type="password" label="Password" required={true}/>
        <a href="/login/resetPassword/">Forgot password?</a>
    </section>

    <section>
        <button type="submit">Login</button>
        
    </section>    
</form>

