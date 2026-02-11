<script lang="ts">
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import PasswordInput from '$cmsComponents/organisms/passwordInput.svelte';
	import CreateDialog from '$cmsComponents/templates/createDialog.svelte';
	import type { Workspace } from '$lib/server/db/schema/workspaces';
	import type { UserType } from '$lib/types/users';
	import { userTypeSelectOptions } from '../shared/userTypeSelectOptions';

	let { closeCallback, workspaces }: { closeCallback: () => void; workspaces: Workspace[] } = $props();

	let selectedUserType: UserType | undefined = $state();
	let filteredWorkspaces = $derived(selectedUserType == 'default' ? workspaces.filter((n) => n.adminRequired == false) : workspaces);
	let workSpaceSelectOptions = $derived(
		[...filteredWorkspaces.map((w) => {
			return {
				title: w.title,
				value: w.id
			};
		}), { title: 'None', value: undefined }]
	);
</script>

<CreateDialog {closeCallback} itemName="user" itemTitleKey="username">
	<div class="grid-container columns-2" style="--column-min-width: 300px;">
		<div>
			<fieldset>
				<LabelInputGroup type="text" name="username" label="Username" max={120} required={true} />
			</fieldset>

			<fieldset>
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
					/>
				{/if}
			</fieldset>
		</div>

		<div>
			<fieldset>
				<PasswordInput requireCurrentPassword={false} required={true} />
			</fieldset>

			<fieldset>
				<LabelInputGroup type="text" name="securityQuestion" label="Secret Question" max={250} required={true} />
				<LabelInputGroup type="text" name="securityQuestionAnswer" label="Secret Answer" max={250} required={true} />
			</fieldset>
		</div>
	</div>
</CreateDialog>
