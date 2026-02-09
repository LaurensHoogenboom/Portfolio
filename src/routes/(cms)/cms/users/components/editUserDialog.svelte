<script lang="ts">
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import PasswordInput from '$cmsComponents/organisms/passwordInput.svelte';
	import EditDialog from '$cmsComponents/templates/editDialog.svelte';
	import type { Workspace } from '$lib/server/db/schema/workspaces';
	import type { UserType } from '$lib/types/users';
	import { userTypeSelectOptions } from '../shared/userTypeSelectOptions';

	export interface IUserToEdit {
		id: string;
		username: string;
		type: UserType;
		securityQuestion: string;
		preferredWorkspaceId: string | null;
	}

	let { closeCallback, userToEdit, workspaces }: { closeCallback: () => void; userToEdit: IUserToEdit; workspaces: Workspace[] } = $props();

	let selectedUserType: UserType = $state(userToEdit.type);
	let filteredWorkspaces = $derived(selectedUserType == 'default' ? workspaces.filter((n) => n.adminRequired == false) : workspaces);
	let workSpaceSelectOptions = $derived(
		filteredWorkspaces.map((w) => {
			return {
				title: w.title,
				value: w.id
			};
		})
	);
</script>

<EditDialog {closeCallback} itemTitle={userToEdit.username} itemTitleKey="username">
	<input type="hidden" name="id" value={userToEdit.id} />

	<fieldset>
		<LabelInputGroup type="text" name="username" label="Username" max={120} required={true} value={userToEdit.username} />
		<LabelInputGroup
			type="select"
			name="type"
			label="Type"
			selectOptions={userTypeSelectOptions}
			required={true}
			bind:value={selectedUserType}
		/>

		{#if workSpaceSelectOptions && workSpaceSelectOptions.length > 0}
			<LabelInputGroup
				type="select"
				name="preferredWorkspaceId"
				label="Preferred Workspace"
				selectOptions={workSpaceSelectOptions}
				required={true}
				value={userToEdit.preferredWorkspaceId}
			/>
		{/if}
	</fieldset>

	<fieldset>
		<PasswordInput requireCurrentPassword={true} required={false} />
	</fieldset>

	<fieldset>
		<LabelInputGroup
			type="text"
			name="securityQuestion"
			label="Secret Question"
			max={250}
			required={true}
			value={userToEdit.securityQuestion}
		/>
		<LabelInputGroup
			type="text"
			name="securityQuestionAnswer"
			label="Secret Answer"
			max={250}
			instruction="Leave blank to keep the current answer."
		/>
	</fieldset>
</EditDialog>
