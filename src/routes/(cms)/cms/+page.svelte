<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$cmsComponents/atoms/button.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { ChevronRight, LogOut, Settings } from '@lucide/svelte';
	import type { PageData } from './$types';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import { usersTableUIConfig } from '$lib/configs/users';
	import { currentWorkspace } from './shared/states/workspaces.svelte';
	import type { DashboardPreviewDataType } from '$lib/types/workspaces';
	import { portfolioTableUIConfig } from '$lib/configs/portfolioItems';
	import EditUserDialog from './users/components/editUserDialog.svelte';
	import DashboardBox from '$cmsComponents/molecules/dashboardBox.svelte';
	import Avatar from '$cmsComponents/molecules/avatar.svelte';

	let loggingOut = $state(false);
	let { data }: { data: PageData } = $props();

	let previewDataType: DashboardPreviewDataType = $derived(
		currentWorkspace.currentWorkspace ? currentWorkspace.currentWorkspace.dashboardPreviewDataType : 'mostViewedPortfolioItems'
	);

	let dashboardUserTableUIConfig = { ...usersTableUIConfig };
	dashboardUserTableUIConfig.lastLogin && (dashboardUserTableUIConfig.lastLogin.priority = 2);

	let dashboardPortfolioTableUIConfig = { ...portfolioTableUIConfig };
	dashboardPortfolioTableUIConfig.clicks && (dashboardPortfolioTableUIConfig.clicks.priority = 1);

	let editUserDialogVisible = $state(false);
</script>

<PageToolbar />

<main>
	<div class="grid-container columns-3">
		<div class="box span-3 user-box">
			<Avatar />
			<h2>Welcome {data.currentUser.username}</h2>
			<hr />
			<div class="actions">
				<Button style="secondary" type="button" title="Account Settings" icon={Settings} onclick={() => (editUserDialogVisible = true)} />
				<form method="post" action="/login?/logout" use:enhance style="flex-grow: initial;">
					<Button style="secondary" type="submit" title="Logout" icon={LogOut} onclick={() => (loggingOut = true)} loading={loggingOut} />
				</form>
			</div>
		</div>

		<DashboardBox title={previewDataType == 'recentLogins' ? 'Recent Logins' : 'Most viewed portfolio items'} columnCount={2}>
			{#if previewDataType == 'recentLogins'}
				<DataList
					data={data.recentLogins}
					config={dashboardUserTableUIConfig}
					totalItemCount={data.totalUserCount?.count ?? 0}
					itemNamePlural="Users"
					showFooter={false}
					numberOfColumnsVisible={4}
					enableSorting={false}
					style="transparent"
				/>
			{:else}
				<DataList
					data={data.mostViewedPortfolioItems}
					config={portfolioTableUIConfig}
					totalItemCount={data.mostViewedPortfolioItems.length}
					itemNamePlural="Portfolio Items"
					showFooter={false}
					numberOfColumnsVisible={4}
					enableSorting={false}
					style="transparent"
				/>
			{/if}
		</DashboardBox>

		<DashboardBox title="Get Started">
			<div class="quick-action-buttons">
				{#each currentWorkspace.quickActions as action, index}
					<Button
						title={action.title}
						type="button"
						onclick={action.callback}
						style={index == 0 ? 'primary' : 'secondary'}
						icon={ChevronRight}
					/>
				{/each}
			</div>
		</DashboardBox>
	</div>
</main>

{#if editUserDialogVisible}
	<EditUserDialog
		userToEdit={data.currentUser}
		closeCallback={() => (editUserDialogVisible = false)}
		workspaces={data.workspaces}
		canEditType={data.currentUser.type == 'admin' && data.adminCount > 1}
		customTitle="Account Settings"
	/>
{/if}

<style>
	.user-box {
		display: grid;
		grid-template-columns: max-content max-content 1fr max-content;
		align-items: center;
		grid-gap: var(--padding-2);

		.actions {
			display: flex;
			grid-gap: var(--padding-4);
		}
	}

	.quick-action-buttons {
		display: flex;
		flex-direction: column;
		grid-gap: var(--padding-4);
	}
</style>
