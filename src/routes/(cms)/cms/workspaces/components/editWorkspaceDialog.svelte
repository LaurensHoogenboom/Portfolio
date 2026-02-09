<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import EditDialog from '$cmsComponents/templates/editDialog.svelte';
	import { type INavigationItem } from '../../shared/navigation';
	import { navigationItemSelectOptions } from '../shared/navigationItemSelectOptions';

	export interface IWorkspaceToEdit {
		id: string;
		title: string;
		navigationItems: INavigationItem[] | null;
	}

	let { closeCallback, workspaceToEdit }: { closeCallback: () => void; workspaceToEdit: IWorkspaceToEdit } = $props();

	const selectedNavigationItems = workspaceToEdit.navigationItems
		? workspaceToEdit.navigationItems.map((nItem) => {
				return nItem.id;
			})
		: [];
</script>

<EditDialog {closeCallback} itemTitle="Workspace" itemTitleKey="workspaceTitle">
	<input type="hidden" name="id" value={workspaceToEdit.id} />

	<fieldset>
		<LabelInputGroup type="text" name="title" label="Title" max={120} required value={workspaceToEdit.title} />
	</fieldset>

	<fieldset>
		<LabelInputGroup
			type="select-multiple"
			name="navigationItems"
			label="Navigation Items"
			selectOptions={navigationItemSelectOptions}
			value={selectedNavigationItems}
			required
		/>
	</fieldset>
</EditDialog>
