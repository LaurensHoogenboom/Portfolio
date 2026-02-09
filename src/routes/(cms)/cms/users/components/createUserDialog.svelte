<script lang="ts">
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import PasswordInput from '$cmsComponents/organisms/passwordInput.svelte';
	import CreateDialog from '$cmsComponents/templates/createDialog.svelte';
	import { userTypeSelectOptions } from '../shared/userTypeSelectOptions';

	let { closeCallback }: { closeCallback: () => void } = $props();
</script>

<CreateDialog {closeCallback} itemName="user" itemTitleKey="username">
	<fieldset>
		<LabelInputGroup type="text" name="username" label="Username" max={120} required={true} />
		<LabelInputGroup type="select" name="type" label="Type" selectOptions={userTypeSelectOptions} required={true} />
	</fieldset>

	<fieldset>
		<PasswordInput requireCurrentPassword={false} required={true} />
	</fieldset>

	<fieldset>
		<LabelInputGroup type="text" name="securityQuestion" label="Secret Question" max={250} required={true} />
		<LabelInputGroup type="text" name="securityQuestionAnswer" label="Secret Answer" max={250} required={true} />
	</fieldset>
</CreateDialog>