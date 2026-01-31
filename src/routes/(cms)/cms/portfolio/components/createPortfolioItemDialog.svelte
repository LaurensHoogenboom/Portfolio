<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$cmsComponents/atoms/button.svelte';
	import Notice from '$cmsComponents/atoms/notice.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import Dialog from '$cmsComponents/organisms/dialog.svelte';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import { notifyFormActionSuccess } from '../../shared/globalNotifications.svelte';
	import { portfolioSelectOptions } from '../shared/portfolioSelectOptions';

	const { closeCallback }: { closeCallback: () => void } = $props();

	let saving = $state(false);
	let portfolioItemCategory: PortfolioItemType = $state('research');
	let errorMessage: string | undefined = $state();
</script>

<Dialog title="Add Portfolio Item" {closeCallback}>
	<form
		method="post"
		action="?/create"
		enctype="multipart/form-data"
		use:enhance={() => {
			saving = true;

			return async ({ update, result }) => {
				await update({ reset: false });
				saving = false;

				if (result.type == 'success') {
					notifyFormActionSuccess('create', result.data?.portfolioItemTitle as string);
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

		<div class="grid-container columns-2">
			<div>
				<fieldset>
					<LabelInputGroup type="text" name="title" label="Title" max={120} required={true} />

					<LabelInputGroup
						type="select"
						name="type"
						label="Type"
						required={true}
						selectOptions={portfolioSelectOptions}
						bind:value={portfolioItemCategory}
					/>

					{#if portfolioItemCategory != 'art'}
						<LabelInputGroup type="textarea" name="description" label="Header Description" />
					{/if}
				</fieldset>

				<fieldset>
					<LabelInputGroup
						type="number"
						name="visiblePriority"
						label="Visibility Priority"
						min={0}
						value={0}
						instruction="Items with a higher visible priority are shown first."
						required
					/>
				</fieldset>
			</div>
			<div>
				<fieldset>
					<LabelInputGroup type="file" name="image" label="Header Image" acceptFile="image/*" required />
				</fieldset>
			</div>
		</div>

		<div class="box nested-box form-actions">
			<Button type="button" style="secondary" title="Cancel" onclick={closeCallback} />
			<Button type="submit" style="primary" title="Add" loading={saving} />
		</div>
	</form>
</Dialog>
