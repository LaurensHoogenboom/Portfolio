<script lang="ts">
	import { Check } from '@lucide/svelte';

	let {
		type = 'single',
		selectOptions = [],
		name,
		callback,
		required = false,
		value = $bindable(),
		style = 'secondary'
	}: {
		type?: 'single' | 'multiple';
		selectOptions?: ISelectOption[];
		name: string;
		callback?: (e: Event) => void;
		required?: boolean;
		value?: string | string[] | null | number;
		style?: 'secondary' | 'primary';
	} = $props();

	export interface ISelectOption {
		title: string;
		value: string | number | undefined;
	}
</script>

{#if type == 'multiple'}
	{#each selectOptions as option}
		{@const id = `${name}-${option.value ? option.value.toString() : 'unset'}`}

		<div class="checkbox-group">
			<input type="checkbox" {name} {id} value={option.value} bind:group={value} onchange={callback} />

			<label class="inset" for={id}>
				<div class="outset">
					<Check size={17} color="var(--primary-base)" />
				</div>
			</label>

			<label for={id}>{option.title}</label>
		</div>
	{/each}
{:else}
	<select class="clickable-input {style}" id={name} {name} onchange={callback} {required} bind:value>
		{#if selectOptions}
			{#each selectOptions as option}
				<option value={option.value}>{option.title}</option>
			{/each}
		{/if}
	</select>
{/if}
