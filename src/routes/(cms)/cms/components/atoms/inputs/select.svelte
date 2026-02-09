<script lang="ts">
	let {
		type,
		selectOptions = [],
		name,
		callback,
		required,
		value = $bindable()
	}: {
		type: 'single' | 'multiple';
		selectOptions?: ISelectOption[];
		name: string;
		callback?: (e: Event) => void;
		required: boolean;
		value?: string | string[] | File | number | null;
	} = $props();

	export interface ISelectOption {
		title: string;
		value: string | number;
	}
</script>

{#if type == 'multiple'}
	{#each selectOptions as option}
		<div class="checkbox-group">
			<input type="checkbox" {name} id="{name}-{option.value.toString()}" value={option.value} bind:group={value} onchange={callback} />
			<label for="{name}-{option.value.toString()}">{option.title}</label>
		</div>
	{/each}
{:else}
	<select class="clickable-input" id={name} {name} onchange={callback} {required} bind:value>
		{#if selectOptions}
			{#each selectOptions as option}
				<option value={option.value}>{option.title}</option>
			{/each}
		{/if}
	</select>
{/if}
