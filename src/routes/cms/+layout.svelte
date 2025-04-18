<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import { page } from '$app/state';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<style>
    a[aria-current=true] {
        font-weight: bold;
    }
</style>

<div class="nav-wrapper">
    <nav>
        <div></div>

        <div class="nav-links">
            <a href="/cms/" aria-current={page.url.pathname === '/cms'}>Home</a>
            <a href="/cms/posts" aria-current={page.url.pathname.includes('/posts')}>Posts</a>
            <a href="/cms/users" aria-current={page.url.pathname.includes('/users')}>Users</a>
        </div>

        {#if data.username}
            <div class="user-actions">
                <p>{data.username}</p>

                <form method="post" action="/login?/logout">
                    <button type="submit">Logout</button>
                </form>
            </div>
        {/if}
    </nav>
</div>

<div class="main-wrapper">
    <main>
        {@render children()}
    </main>
</div>

