<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import CreateDialog from '$cmsComponents/templates/createDialog.svelte';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import { portfolioSelectOptions } from '../shared/portfolioSelectOptions';

	const { closeCallback }: { closeCallback: () => void } = $props();

	let portfolioItemCategory: PortfolioItemType = $state('research');
</script>

<CreateDialog {closeCallback} itemName="Portfolio Item" itemTitleKey="portfolioItemTitle">
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
</CreateDialog>