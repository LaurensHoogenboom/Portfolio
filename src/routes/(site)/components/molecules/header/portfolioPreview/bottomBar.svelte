<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Button from '../../../atoms/button.svelte';

	const {
		setSelectedIndex,
		currentIndex,
		maxIndex
	}: { setSelectedIndex: (index: number) => void; currentIndex: number; maxIndex: number } = $props();

	const nextItem = () => {
		if (currentIndex < maxIndex) {
			setSelectedIndex(currentIndex + 1);
		}
	};

	const previousItem = () => {
		if (currentIndex > 0) {
			setSelectedIndex(currentIndex - 1);
		}
	};
</script>

<div class="bottom-bar">
	<hr />

	<div class="button-group">
		<Button type="submit" icon={ChevronLeft} style="transparent" onclick={previousItem} disabled={currentIndex == 0} />
		<Button type="submit" icon={ChevronRight} style="transparent" onclick={nextItem} disabled={currentIndex == maxIndex}/>
	</div>
</div>

<style>
	.bottom-bar {
		display: grid;
		align-items: center;
		grid-column-gap: var(--spacing-4);
	}

	.bottom-bar {
		grid-template-columns: max-content;
		padding-right: var(--extra-width);
		justify-content: end;

		:global(.button-group button:not(:last-of-type)) {
			margin-right: var(--spacing-3);
		}

		hr {
			position: absolute;
			width: 100vw;
			right: calc(var(--extra-width) + 90px + var(--spacing-3) + var(--spacing-4));
		}
	}
</style>
