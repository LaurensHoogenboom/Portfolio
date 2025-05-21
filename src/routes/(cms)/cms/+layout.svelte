<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from '../cms/$types';
    import { page } from '$app/state';
	import UserActions from './components/userActions.svelte';
	import NotificationContainer from './components/notificationContainer.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="/src/styles/cms/cms.css">
</svelte:head>

<div class="page">
    <div class="nav-wrapper">
        <nav>
            <div class="nav-links inset primary">
                <a href="/cms/" class="{page.url.pathname === '/cms' ? 'outset primary' : ''}">Home</a>
                <a href="/cms/posts" class="{page.url.pathname.includes('/posts') ? 'outset primary' : ''}">Posts</a>
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