<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import EditDialog from '$cmsComponents/templates/editDialog.svelte';
	import type { DashboardPreviewDataType } from '$lib/types/workspaces';
	import { type INavigationItem } from '../../shared/navigation';
	import { dashboardPreviewDataTypeSelectOptions } from '../shared/dashboardPreviewDataSelectOptions';
	import { navigationItemSelectOptions } from '../shared/navigationItemSelectOptions';

	export interface IWorkspaceToEdit {
		id: string;
		title: string;
		dashboardPreviewDataType: DashboardPreviewDataType;
		navigationItems: INavigationItem[] | null;
	}

	let { closeCallback, workspaceToEdit }: { closeCallback: () => void; workspaceToEdit: IWorkspaceToEdit } = $props();

	const selectedNavigationItems = workspaceToEdit.navigationItems
		? workspaceToEdit.navigationItems.map((nItem) => {
				return nItem.id;
			})
		: [];
</script>

<EditDialog {closeCallback} itemTitle={workspaceToEdit.title} itemTitleKey="workspaceTitle">
	<input type="hidden" name="id" value={workspaceToEdit.id} />

	<fieldset>
		<LabelInputGroup type="text" name="title" label="Title" max={120} required value={workspaceToEdit.title} />
	</fieldset>

	<fieldset>
		<LabelInputGroup
			type="select"
			name="dashboardPreviewDataType"
			label="Dashboard Preview Data"
			selectOptions={dashboardPreviewDataTypeSelectOptions}
			value={workspaceToEdit.dashboardPreviewDataType}
			required
		/>
	</fieldset>

	<fieldset>
		<LabelInputGroup
			type="select-multiple"
			name="navigationItems"
			label="Pages"
			selectOptions={navigationItemSelectOptions}
			value={selectedNavigationItems}
			required
		/>
	</fieldset>
</EditDialog>
