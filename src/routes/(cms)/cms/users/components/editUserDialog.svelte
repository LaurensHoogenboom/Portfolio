<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import PasswordInput from '$cmsComponents/organisms/passwordInput.svelte';
	import EditDialog from '$cmsComponents/templates/editDialog.svelte';
	import type { UserType } from '$lib/types/users';
	import { userTypeSelectOptions } from '../shared/userTypeSelectOptions';

	export interface IUserToEdit {
		id: string;
		username: string;
		type: UserType;
		securityQuestion: string;
	}

	let { closeCallback, userToEdit }: { closeCallback: () => void; userToEdit: IUserToEdit } = $props();
</script>

<EditDialog {closeCallback} itemTitle={userToEdit.username} itemTitleKey="username">
	<input type="hidden" name="id" value={userToEdit.id} />

	<fieldset>
		<LabelInputGroup type="text" name="username" label="Username" max={120} required={true} value={userToEdit.username} />
		<LabelInputGroup type="select" name="type" label="Type" selectOptions={userTypeSelectOptions} required={true} value={userToEdit.type} />
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
