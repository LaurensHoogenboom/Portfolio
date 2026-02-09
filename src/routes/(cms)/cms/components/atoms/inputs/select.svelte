<script lang="ts">
	import { Check } from '@lucide/svelte';

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
		{@const id = `${name}-${option.value.toString()}`}

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
	<select class="clickable-input" id={name} {name} onchange={callback} {required} bind:value>
		{#if selectOptions}
			{#each selectOptions as option}
				<option value={option.value}>{option.title}</option>
			{/each}
		{/if}
	</select>
{/if}

<style>
	.checkbox-group {
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-column-gap: var(--padding-4);
		align-items: center;

		&:not(:last-of-type) {
			padding-bottom: var(--padding-4);
		}

		input[type='checkbox'] {
			position: absolute;
			left: -1000vw;

			+ .inset .outset {
				opacity: 0;
				transition: opacity var(--default-animation-time), background-color var(--default-animation-time);
			}

			&:checked + .inset .outset {
				opacity: 1;
			}

			&:focus-visible + .inset {
				border: var(--primary-border);
				box-shadow: var(--shadow-float-3);
			}

			+ .inset {
				display: inline-block;
				height: 25px;
				aspect-ratio: 1 / 1;
				padding: var(--padding-7);
				transition:
					border-color var(--default-animation-time),
					background-color var(--default-animation-time);

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						background-color: var(--grey-background-2);
					}
				}

				.outset {
					display: flex;
					justify-content: center;
					align-items: center;

					@media (hover: hover) and (pointer: fine) {
						&:hover {
							background-color: var(--grey-background-1);
						}
					}
				}
			}
		}
	}
</style>
