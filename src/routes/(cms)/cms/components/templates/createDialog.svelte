<script lang="ts">
	import { enhance } from '$app/forms';
	import Notice from '$cmsComponents/atoms/notice.svelte';
	import Dialog from '$cmsComponents/organisms/dialog.svelte';
	import type { Snippet } from 'svelte';
	import { notifyFormActionSuccess } from '../../shared/globalNotifications.svelte';
	import Button from '$cmsComponents/atoms/button.svelte';

	let {
		closeCallback,
		children,
		itemName,
		itemTitleKey
	}: { closeCallback: () => void; children: Snippet; itemName: string; itemTitleKey: string } = $props();

	let saving = $state(false);
	let errorMessage: string | undefined = $state();
</script>

<Dialog title="Add {itemName}" {closeCallback}>
	<form
		method="post"
		action="?/create"
		enctype="multipart/form-data"
		use:enhance={() => {
			saving = true;

			return async ({ result, update }) => {
				await update({ reset: false });
				saving = false;

				if (result.type == 'success') {
					notifyFormActionSuccess('create', result.data ? (result.data[itemTitleKey] as string) : '');
					closeCallback();
				} else if (result.type == 'failure') {
					errorMessage = result.data?.error as string;
				}
			};
		}}
	>
		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

		{@render children()}

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Add {itemName}" loading={saving} />
		</div>
	</form>
</Dialog>