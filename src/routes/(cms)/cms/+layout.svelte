<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from '../cms/$types';
    import { page } from '$app/state';
	import UserActions from './components/userActions.svelte';
	import NotificationContainer from './components/notificationContainer.svelte';
	import { dev } from '$app/environment';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    {#if dev}
        <link rel="stylesheet" href="/src/styles/cms/cms.css">
    {:else}
        <link rel="stylesheet" href="/styles/cms/cms.css">
    {/if}

    <title>CMS: Laurens Hoogenboom</title>
</svelte:head>

<div class="page">
    <div class="nav-wrapper">
        <nav>
            <div class="nav-links inset primary">
                <a href="/cms/" class="{page.url.pathname === '/cms' ? 'outset primary' : ''}">Home</a>
                <a href="/cms/posts" class="{page.url.pathname.includes('/posts') ? 'outset primary' : ''}">Posts</a>
                <a href="/cms/portfolio" class="{page.url.pathname.includes('/portfolio') ? 'outset primary' : ''}">Portfolio</a>
                <a href="/cms/users" class="{page.url.pathname.includes('/users') ? 'outset primary' : ''}">Users</a>
            </div>
    
            {#if data.username}
                <UserActions username={data.username} />
            {/if}

            <NotificationContainer />
        </nav>
    </div>

    <div class="main-wrapper">
        {@render children()}
    </div>
</div>