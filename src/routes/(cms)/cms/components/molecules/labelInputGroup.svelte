<script lang="ts">
	import FileInput from '$cmsComponents/atoms/inputs/fileInput.svelte';
	import Select from '$cmsComponents/atoms/inputs/select.svelte';
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';
	import Instruction from '$cmsComponents/atoms/instruction.svelte';

	let {
		name,
		type,
		value = $bindable(),
		label,
		min,
		max,
		callback,
		required = false,
		instruction,
		selectOptions,
		acceptFile,
		layout = 'vertical'
	}: {
		name: string;
		type: 'text' | 'textarea' | 'password' | 'select' | 'select-multiple' | 'file' | 'number';
		value?: string | string[] | File | number | null;
		label: string;
		min?: number;
		max?: number;
		callback?: (e: Event) => void;
		required?: boolean;
		instruction?: string;
		selectOptions?: ISelectOption[];
		acceptFile?: string;
		layout?: 'horizontal' | 'vertical';
	} = $props();

	let validationWarning: string | undefined = $state();
</script>

<div class="label-input-group {layout}">
	<label for={name}>{label}</label>

	{#if type == 'text' || type == 'password' || type == 'number'}
		<input id={name} class="inset" {type} {name} bind:value onchange={callback} {min} {max} {required} />
	{:else if type == 'textarea'}
		<textarea rows="5" class="inset" bind:value {name} onchange={callback} maxlength={max} {required}></textarea>
	{:else if type == 'select' || type == 'select-multiple'}
		<Select {name} {required} type={type == 'select-multiple' ? 'multiple' : 'single'} {selectOptions} {callback} bind:value />
	{:else if (type = 'file')}
		<FileInput {name} {required} {acceptFile} bind:value setValidationWarning={(message) => (validationWarning = message)} />
	{/if}

	{#if instruction || validationWarning}
		<Instruction
			message={validationWarning ? validationWarning : instruction ? instruction : ''}
			type={validationWarning ? 'warning' : 'neutral'}
		/>
	{/if}
</div>

<style>
	.label-input-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--padding-3);

		:global(p) {
			margin-bottom: var(--padding-3);
			margin-top: var(--padding-3);
		}

		&:last-child :global(.instruction) {
			margin-bottom: 0;
		}

		&.horizontal {
			flex-direction: row;
			align-items: center;
			grid-gap: var(--padding-3);
			margin-bottom: 0;

			label {
				padding-bottom: 0;
			}
		}
	}
</style>
