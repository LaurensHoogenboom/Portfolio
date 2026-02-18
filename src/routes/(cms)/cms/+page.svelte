<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { LogOut } from '@lucide/svelte';
	import type { PageData } from './$types';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import { usersTableUIConfig } from '$lib/configs/users';
	import { currentWorkspace } from './shared/states/workspaces.svelte';
	import type { DashboardPreviewDataType } from '$lib/types/workspaces';
	import { portfolioTableUIConfig } from '$lib/configs/portfolioItems';

	let loggingOut = $state(false);
	let { data }: { data: PageData } = $props();

	let previewDataType: DashboardPreviewDataType = $derived(
		currentWorkspace.workspace ? currentWorkspace.workspace.dashboardPreviewDataType : 'mostViewedPortfolioItems'
	);

	let dashboardUserTableUIConfig = usersTableUIConfig;
	dashboardUserTableUIConfig.lastLogin && (dashboardUserTableUIConfig.lastLogin.priority = 2);

	let dashboardPortfolioTableUIConfig = portfolioTableUIConfig;
	dashboardPortfolioTableUIConfig.clicks && (dashboardPortfolioTableUIConfig.clicks.priority = 1);
</script>

<PageToolbar>
	<form method="post" action="/login?/logout" use:enhance style="flex-grow: initial;">
		<Button style="secondary" type="submit" title="Logout" icon={LogOut} onclick={() => (loggingOut = true)} loading={loggingOut} />
	</form>
</PageToolbar>

<main>
	<div class="grid-container columns-3">
		<div class="box span-3">
			<h1>Welcome {data.username}</h1>
		</div>
		<div class="box span-2 dashboard-box">
			{#if previewDataType == 'recentLogins'}
				<div class="header">
					<h2>Recent Logins</h2>
				</div>

				<DataList
					data={data.recentLogins}
					config={dashboardUserTableUIConfig}
					totalItemCount={data.totalUserCount?.count ?? 0}
					itemNamePlural="Users"
					showFooter={false}
					numberOfColumnsVisible={4}
				/>
			{:else}
				<div class="header">
					<h2>Most viewed Portfolio Items</h2>
				</div>

				<DataList
					data={data.mostViewedPortfolioItems}
					config={portfolioTableUIConfig}
					totalItemCount={data.mostViewedPortfolioItems.length}
					itemNamePlural="Portfolio Items"
					showFooter={false}
					numberOfColumnsVisible={4}
				/>
			{/if}
		</div>
		<div class="box dashboard-box">
			<div class="header">
				<h2>Get started</h2>
			</div>
			<Button title="Add User" type="button" style="primary" alignment="center" />
			<Button title="Add Workspace" type="button" style="secondary" alignment="center" />
		</div>
	</div>
</main>

<style>
	.dashboard-box {
		flex-direction: column;
		align-self: flex-start;

		:global(.box) {
			border: none;
			box-shadow: none;
			padding: 0;
		}
	}
</style>
