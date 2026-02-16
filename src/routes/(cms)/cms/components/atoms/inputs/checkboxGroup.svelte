<script lang="ts">
	import { Check } from '@lucide/svelte';

	let {
		name,
		callback,
		value = $bindable(),
		label
	}: {
		name: string;
		callback?: (e: Event) => void;
		value?: boolean | null;
		label: string;
	} = $props();
</script>

<div class="checkbox-group">
	<input type="checkbox" {name} id={name} bind:checked={value} onchange={callback} />

	<label class="inset" for={name}>
		<div class="outset">
			<Check size={17} color="var(--primary-base)" />
		</div>
	</label>

	<label for={name}>{label}</label>
</div>