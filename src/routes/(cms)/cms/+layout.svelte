<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../cms/$types';
	import { page } from '$app/state';
	import UserActions from './components/molecules/userActions.svelte';
	import NotificationContainer from './components/molecules/notificationContainer.svelte';
	import { dev } from '$app/environment';
	import { navigationItems } from './shared/navigation';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

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
					{#if nItem.requiredRole == 'admin' && data.userType == 'admin'}
						<a href={nItem.url} class={isCurrentPage(nItem.url) ? 'outset primary' : ''}>{nItem.title}</a>
					{/if}

                    {#if nItem.requiredRole != 'admin'}
						<a href={nItem.url} class={isCurrentPage(nItem.url) ? 'outset primary' : ''}>{nItem.title}</a>
					{/if}
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
