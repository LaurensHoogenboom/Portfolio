<script lang="ts">
	import { enhance } from '$app/forms';
	import { CircleAlert } from '@lucide/svelte';
	import { notifyFormActionSuccess } from '../shared/globalNotifications.svelte';
	import Button from './atoms/button.svelte';
	import Notice from './atoms/notice.svelte';
	import Dialog from './organisms/dialog.svelte';

	const { closeCallback, action, itemId, itemTitle }: { closeCallback: () => void; action: string; itemId: string; itemTitle?: string } = $props();

	let deleting = $state(false);
	let errorMessage: string | undefined = $state();
</script>

<Dialog>
	<form
		method="post"
		{action}
		use:enhance={() => {
			deleting = true;

			return async ({ update, result }) => {
				await update({ reset: false });
				deleting = false;

				if (result.type == 'success') {
					notifyFormActionSuccess('delete', itemTitle as string);
					closeCallback();
				} else if (result.type == 'failure') {
					errorMessage = result.data?.error as string;
				}
			};
		}}
	>
		<div class="warning-box">
			<CircleAlert size={50} color="var(--red)"/>

			{#if itemTitle}
				<p>Do you really want to delete <b>{itemTitle}</b>?</p>
			{:else}
				<p>Do you really want to delete this item?</p>
			{/if}
		</div>

		{#if errorMessage}
			<Notice message={errorMessage} type="warning" />
		{/if}

		<input type="hidden" name="id" value={itemId} />

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Yes" loading={deleting} />
		</div>
	</form>
</Dialog>

<style>
    .warning-box {
        display: grid;
        grid-auto-flow: column;
        grid-gap: var(--padding-2);
        padding: var(--padding-1) var(--padding-3) var(--padding-4) var(--padding-4);
        align-items: center;

		p {
			max-width: 500px;
		}
    }
</style>