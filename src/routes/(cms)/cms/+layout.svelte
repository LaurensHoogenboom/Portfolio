<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../cms/$types';
	import { page } from '$app/state';
	import UserActions from './components/userActions.svelte';
	import NotificationContainer from './components/notificationContainer.svelte';
	import { dev } from '$app/environment';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	interface INavigationItem {
		title: string;
		url: string;
	}

	const navigationItems: INavigationItem[] = [
		{ title: 'Home', url: '/cms' },
		{ title: 'Portfolio', url: '/cms/portfolio' },
		{ title: 'Uploads', url: '/cms/uploads' },
		{ title: 'Users', url: '/cms/users' }
	];

    const isCurrentPage = (url: string) => {
        return page.url.pathname === url;
    }
</script>

<svelte:head>
	{#if dev}
		<link rel="stylesheet" href="/src/styles/cms/cms.css" />
	{:else}
		<link rel="stylesheet" href="/styles/cms/cms.css" />
	{/if}

	<title>CMS: Laurens Hoogenboom</title>
</svelte:head>

<div class="page">
	<div class="nav-wrapper">
		<nav>
			<div class="nav-links inset primary">
                {#each navigationItems as nItem}
                    <a href={nItem.url} class={isCurrentPage(nItem.url) ? 'outset primary' : ''}>{nItem.title}</a>
                {/each}
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
