<script lang="ts">
	import { onMount } from 'svelte';

	export interface ITabItem {
		title: string;
	}

	let tabbar: HTMLUListElement;

	const {
		tabItems,
		selectedIndex = 0,
		onSelectionChange,
		CSSClass
	}: { tabItems: ITabItem[]; selectedIndex?: number; onSelectionChange?: (index: number) => void; CSSClass?: string } = $props();

	let selectedLeft = $state(7);
	let selectedWidth = $state(0);

	const changeSelection = (index: number) => {
		if (onSelectionChange) onSelectionChange(index);
		if (!tabbar) return;

		const listItems = tabbar.querySelectorAll('li');
		const selectedListItem = listItems[index];

		selectedLeft = selectedListItem.offsetLeft;
		selectedWidth = selectedListItem.offsetWidth;
	};

	onMount(() => changeSelection(selectedIndex));
</script>

<ul class="tab-bar {CSSClass}" bind:this={tabbar} style="--selected-width: {selectedWidth}px; --selected-left: {selectedLeft}px;">
	{#each tabItems as item, i}
		<li class="tab-item {i == selectedIndex ? 'selected' : ''}">
			<button onclick={() => changeSelection(i)}>
				{item.title}
			</button>
		</li>
	{/each}
</ul>

<style>
	.tab-bar {
		display: inline-grid;
		grid-auto-flow: column;
		list-style: none;
		background-color: var(--grey-inset-background);
		padding: var(--spacing-1);
		border-radius: 200px;
		border: 1px solid var(--grey-borders);
		position: relative;

		.tab-item {
			button {
				padding: 0 var(--spacing-3);
				height: 45px;
				line-height: 43px;
				white-space: nowrap;
				color: var(--grey-text);
				background: none;
				border: none;
				position: relative;
				z-index: 1;
				cursor: pointer;
			}
		}

		&:after {
			content: '';
			display: block;
			position: absolute;
			height: 45px;
			border: 1px solid var(--grey-borders);
			border-radius: 200px;
			background-color: var(--white);
			top: 7px;
			left: var(--selected-left);
			width: var(--selected-width);
			transition:
				left var(--default-animation-duration),
				width var(--default-animation-duration);
		}
	}
</style>
