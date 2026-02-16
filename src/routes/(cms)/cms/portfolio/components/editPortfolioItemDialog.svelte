<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import EditDialog from '$cmsComponents/templates/editDialog.svelte';
	import type { PortfolioItemType } from '$lib/types/portfolio';
	import type { IUploadedImage } from '$lib/types/uploads';
	import { portfolioSelectOptions } from '../shared/portfolioSelectOptions';

	const { closeCallback, portfolioItemToEdit }: { closeCallback: () => void; portfolioItemToEdit: IPortfolioItemToEdit } = $props();

	export interface IPortfolioItemToEdit {
		id: string;
		title: string;
		description: string | null;
		type: PortfolioItemType;
		image: IUploadedImage | null;
		visiblePriority: number;
		isArticle: boolean;
	}

	let portfolioItemType = $state(portfolioItemToEdit.type);
</script>

<EditDialog {closeCallback} itemTitle={portfolioItemToEdit.title} itemTitleKey="portfolioItemTitle">
	<input type="hidden" name="id" value={portfolioItemToEdit.id} />

	<div class="grid-container columns-2">
		<div>
			<fieldset>
				<LabelInputGroup type="text" name="title" label="Title" max={120} required={true} value={portfolioItemToEdit.title} />
				<LabelInputGroup
					type="select"
					name="type"
					label="Type"
					required={true}
					selectOptions={portfolioSelectOptions}
					bind:value={portfolioItemType}
				/>

				{#if portfolioItemType != 'art'}
					<LabelInputGroup type="boolean" name="isArticle" label="Item is article" value={portfolioItemToEdit.isArticle} />
					<LabelInputGroup type="textarea" name="description" label="Header Description" value={portfolioItemToEdit.description} />
				{/if}
			</fieldset>

			<fieldset>
				<LabelInputGroup
					type="number"
					name="visiblePriority"
					label="Visibility Priority"
					min={0}
					value={portfolioItemToEdit.visiblePriority}
					instruction="Items with a higher visible priority are shown first."
				/>
			</fieldset>
		</div>

		<div>
			<fieldset>
				<LabelInputGroup
					type="file"
					name="image"
					label="Image"
					acceptFile="image/*"
					value={portfolioItemToEdit.image ? portfolioItemToEdit.image.thumbnail.url : undefined}
				/>
			</fieldset>
		</div>
	</div>
</EditDialog>
