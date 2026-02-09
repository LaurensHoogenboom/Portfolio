<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from '../cms/$types';
	import { page } from '$app/state';
	import UserActions from './components/molecules/userActions.svelte';
	import NotificationContainer from './components/molecules/notificationContainer.svelte';
	import { dev } from '$app/environment';
	import { navigationItems } from './shared/navigation';
	import Select, { type ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import type { Workspace } from '$lib/server/db/schema/workspaces';
	import { goto } from '$app/navigation';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const isCurrentPage = (url: string) => {
		return page.url.pathname === url;
	};

	let workspaces = data.userWorkspaces;
	let selectedWorkspaceId = $state(
		data.preferredWorkspaceId ? data.preferredWorkspaceId : workspaces.length > 0 ? workspaces[0].id : undefined
	);
	let selectedWorkspace: Workspace | undefined = $derived(workspaces.find((w) => w.id == selectedWorkspaceId));

	let visibleNavItems = $derived(
		selectedWorkspace?.navigationItems && selectedWorkspace.navigationItems.length > 0 ? selectedWorkspace.navigationItems : navigationItems
	);
	let accessibleNavItems = $derived(visibleNavItems.filter((n) => n.requiredUserType !== 'admin' || data.userType == 'admin'));

	$effect(() => {
		if (!selectedWorkspace?.navigationItems) return;

		const currentPageUrl = page.url.pathname;
		const isCurrentPageInWorkSpace = selectedWorkspace.navigationItems.some((n) => n.url == currentPageUrl);

		if (!isCurrentPageInWorkSpace) {
			goto(selectedWorkspace.navigationItems[0].url);
		}
	});

	export const workSpaceSelectOptions: ISelectOption[] = workspaces.map((wItem) => {
		return {
			title: wItem.title,
			value: wItem.id
		};
	});
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
				{#each accessibleNavItems as nItem}
					<a href={nItem.url} class={isCurrentPage(nItem.url) ? 'outset primary' : ''}>{nItem.title}</a>
				{/each}
			</div>

			{#if workspaces.length > 0}
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
