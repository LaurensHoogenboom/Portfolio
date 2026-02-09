<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import CreateDialog from '$cmsComponents/templates/createDialog.svelte';
	import { navigationItemSelectOptions } from '../shared/navigationItemSelectOptions';

	let { closeCallback }: { closeCallback: () => void } = $props();
</script>

<CreateDialog {closeCallback} itemName="Workspace" itemTitleKey="workspaceTitle">
	<fieldset>
		<LabelInputGroup type="text" name="title" label="Title" max={120} required />
	</fieldset>

	<fieldset>
		<LabelInputGroup
			type="select-multiple"
			name="navigationItems"
			label="Navigation Items"
			selectOptions={navigationItemSelectOptions}
			required
		/>
	</fieldset>
</CreateDialog>
