<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../cms/$types';
	import { page } from '$app/state';
	import UserActions from './components/molecules/userActions.svelte';
	import NotificationContainer from './components/molecules/notificationContainer.svelte';
	import { dev } from '$app/environment';
	import { navigationItems } from './shared/navigation';
	import Select from '$cmsComponents/atoms/inputs/select.svelte';
	import { goto } from '$app/navigation';
	import { currentWorkspace } from './shared/states/workspaces.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let selectedWorkspaceId = $state(data.preferredWorkspaceId ?? data.userWorkspaces[0].id);
	let selectedWorkspace = $derived(data.userWorkspaces.find(w => w.id == selectedWorkspaceId));
	const accessibleNavItems = $derived.by(() => {
		const items = selectedWorkspace?.navigationItems?.length ? selectedWorkspace.navigationItems : navigationItems;
		return items.filter(n => n.requiredUserType !== 'admin' || data.userType == 'admin');
	});

	const workSpaceSelectOptions = $derived(data.userWorkspaces.map(w => ({ title: w.title, value: w.id})));

	$effect(() => {
		if (selectedWorkspace?.navigationItems?.length) {
			const currentInNav = selectedWorkspace.navigationItems.some(n => n.url === page.url.pathname);
			if (!currentInNav) goto(selectedWorkspace.navigationItems[0].url);
		}

		currentWorkspace.workspace = selectedWorkspace;
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
				{#each accessibleNavItems as { url, title }}
					<a href={url} class={page.url.pathname == url ? 'outset primary' : ''}>{title}</a>
				{/each}
			</div>

			{#if data.userWorkspaces.length > 1}
				<Select type="single" style="primary" name="workspace" selectOptions={workSpaceSelectOptions} bind:value={selectedWorkspaceId} />
			{/if}

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
