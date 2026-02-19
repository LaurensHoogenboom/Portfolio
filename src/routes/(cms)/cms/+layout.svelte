<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../cms/$types';
	import { page } from '$app/state';
	import UserActions from './components/molecules/userActions.svelte';
	import NotificationContainer from './components/molecules/notificationContainer.svelte';
	import { dev } from '$app/environment';
	import Select from '$cmsComponents/atoms/inputs/select.svelte';
	import { goto } from '$app/navigation';
	import { currentWorkspace } from './shared/states/workspaces.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	$effect.pre(() => {
		currentWorkspace.userWorkspaces = data.userWorkspaces;
		currentWorkspace.userType = data.currentUser.type ?? 'default';
		if (!currentWorkspace.currentWorkspaceId) {
			currentWorkspace.currentWorkspaceId = data.currentUser.preferredWorkspaceId ?? data.userWorkspaces[0].id;
		}
	});

	$effect(() => {
		const currentNavItems = currentWorkspace.accessibleNavItems;

		if (currentNavItems.length && !currentNavItems.some((n) => n.url === page.url.pathname)) {
			goto(currentNavItems[0].url);
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="{dev ? '/src' : ''}/styles/cms/cms.css" />
	<title>CMS: Laurens Hoogenboom</title>
</svelte:head>

<div class="page">
	<div class="nav-wrapper">
		<nav>
			<div class="nav-links inset primary">
				{#each currentWorkspace.accessibleNavItems as { url, title }}
					<a href={url} class={page.url.pathname == url ? 'outset primary' : ''}>{title}</a>
				{/each}
			</div>

			{#if data.userWorkspaces.length > 1}
				<Select
					type="single"
					style="primary"
					name="workspace"
					selectOptions={currentWorkspace.workSpaceSelectOptions}
					bind:value={currentWorkspace.currentWorkspaceId}
				/>
			{/if}

			{#if data.currentUser.username}
				<UserActions user={data.currentUser} workspaces={data.userWorkspaces} adminCount={data.adminCount} />
			{/if}

			<NotificationContainer />
		</nav>
	</div>

	<div class="main-wrapper">
		{@render children()}
	</div>
</div>
